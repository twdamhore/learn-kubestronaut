#!/usr/bin/env node
//
// check_length_balance.js — flag questions where option lengths differ by more than a threshold
//
// Usage:  node check_length_balance.js [threshold]
//   threshold = max allowed ratio between longest and shortest option (default 1.15)
//
// Examples:
//   node check_length_balance.js          # uses 1.15 (15%)
//   node check_length_balance.js 1.10     # stricter 10% check
//

const fs = require("fs");
const path = require("path");

const THRESHOLD = parseFloat(process.argv[2]) || 1.15;
const DATA_DIR = __dirname;

// Collect all set files
const setFiles = fs
  .readdirSync(DATA_DIR)
  .filter((f) => /^set-\d+\.js$/.test(f))
  .sort();

if (setFiles.length === 0) {
  console.error("No set-*.js files found in", DATA_DIR);
  process.exit(1);
}

let totalQuestions = 0;
let totalFlagged = 0;
const flagged = [];

for (const file of setFiles) {
  const filePath = path.join(DATA_DIR, file);
  const src = fs.readFileSync(filePath, "utf8");

  // Extract the questions array by evaluating the file in a sandboxed scope
  let questions;
  try {
    const fn = new Function(
      src + "\nreturn questions;"
    );
    questions = fn();
  } catch (e) {
    console.error(`Failed to parse ${file}: ${e.message}`);
    continue;
  }

  for (const q of questions) {
    totalQuestions++;
    const lengths = q.options.map((o) => o.length);
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);
    if (min === 0) continue;
    const ratio = max / min;

    if (ratio > THRESHOLD) {
      totalFlagged++;
      const correctIdx = q.answer;
      const correctLen = lengths[correctIdx];
      const isCorrectOutlier =
        correctLen === max || correctLen === min;

      flagged.push({
        file,
        id: q.id,
        lengths,
        min,
        max,
        ratio: ratio.toFixed(3),
        correctIdx,
        correctLen,
        correctIsOutlier: isCorrectOutlier
          ? correctLen === max
            ? "LONGEST"
            : "SHORTEST"
          : "middle",
      });
    }
  }
}

// Report
console.log(`\nLength Balance Check (threshold: ${THRESHOLD})`);
console.log(`${"=".repeat(50)}`);
console.log(`Files checked:     ${setFiles.length}`);
console.log(`Questions checked: ${totalQuestions}`);
console.log(`Flagged:           ${totalFlagged}`);
console.log();

if (flagged.length === 0) {
  console.log("All questions pass length balance check.");
} else {
  // Group by file
  const byFile = {};
  for (const f of flagged) {
    if (!byFile[f.file]) byFile[f.file] = [];
    byFile[f.file].push(f);
  }

  for (const [file, items] of Object.entries(byFile)) {
    console.log(`--- ${file} (${items.length} flagged) ---`);
    for (const item of items) {
      const labels = ["A", "B", "C", "D"];
      const lengthStr = item.lengths
        .map(
          (l, i) =>
            `${labels[i]}=${l}${i === item.correctIdx ? "*" : ""}`
        )
        .join("  ");
      const warning =
        item.correctIsOutlier !== "middle"
          ? ` ⚠ correct is ${item.correctIsOutlier}`
          : "";
      console.log(
        `  ${item.id}  ratio=${item.ratio}  ${lengthStr}${warning}`
      );
    }
    console.log();
  }
}

process.exit(totalFlagged > 0 ? 1 : 0);
