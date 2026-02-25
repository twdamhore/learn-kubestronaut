#!/usr/bin/env node
//
// check_backtick_balance.js — flag questions where backtick usage is uneven across options
//
// Usage:  node check_backtick_balance.js [--verbose]
//
// Checks for:
//   1. Correct answer has unique backtick count (no other option shares it)
//      AND differs by >2 from the nearest other option
//   2. Correct answer has backticks while zero distractors do (or vice versa)
//   3. Large backtick gap: correct answer has 2x+ more backticks than the
//      distractor average (or 2x+ fewer)
//

const fs = require("fs");
const path = require("path");

const VERBOSE = process.argv.includes("--verbose");
const DATA_DIR = __dirname;

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

  let questions;
  try {
    const fn = new Function(src + "\nreturn questions;");
    questions = fn();
  } catch (e) {
    console.error(`Failed to parse ${file}: ${e.message}`);
    continue;
  }

  for (const q of questions) {
    totalQuestions++;
    const counts = q.options.map((o) => (o.match(/`/g) || []).length / 2); // pairs = number of backtick-wrapped terms
    const correctCount = counts[q.answer];
    const otherCounts = counts.filter((_, i) => i !== q.answer);
    const findings = [];

    // Check 1: correct has backticks, no distractor does
    if (correctCount > 0 && otherCounts.every((c) => c === 0)) {
      findings.push(
        `correct has ${correctCount} backtick-terms but NO distractor has any`
      );
    }

    // Check 2: correct has zero backticks, all distractors have them
    if (correctCount === 0 && otherCounts.every((c) => c > 0)) {
      findings.push(
        `correct has 0 backtick-terms but ALL distractors have them (${otherCounts.join(",")})`
      );
    }

    // Check 3: correct count is unique AND differs by >1 term from nearest
    if (correctCount > 0) {
      const othersSet = new Set(otherCounts);
      if (!othersSet.has(correctCount)) {
        const nearest = otherCounts.reduce((best, c) =>
          Math.abs(c - correctCount) < Math.abs(best - correctCount)
            ? c
            : best
        );
        const gap = Math.abs(correctCount - nearest);
        if (gap > 1) {
          findings.push(
            `correct has unique count of ${correctCount} backtick-terms (nearest distractor: ${nearest}, gap: ${gap})`
          );
        }
      }
    }

    // Check 4: large ratio — correct has 2x+ more or fewer than distractor average
    const avgOther =
      otherCounts.reduce((a, b) => a + b, 0) / otherCounts.length;
    if (avgOther > 0 && correctCount > 0) {
      const ratio = correctCount / avgOther;
      if (ratio >= 2.0) {
        findings.push(
          `correct has ${correctCount} backtick-terms, distractor avg is ${avgOther.toFixed(1)} (${ratio.toFixed(1)}x more)`
        );
      } else if (ratio <= 0.5) {
        findings.push(
          `correct has ${correctCount} backtick-terms, distractor avg is ${avgOther.toFixed(1)} (${(1 / ratio).toFixed(1)}x fewer)`
        );
      }
    }

    if (findings.length > 0) {
      totalFlagged++;
      flagged.push({
        file,
        id: q.id,
        correctIdx: q.answer,
        counts,
        findings,
      });
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────

console.log(`\nBacktick Balance Check`);
console.log(`${"=".repeat(50)}`);
console.log(`Files checked:     ${setFiles.length}`);
console.log(`Questions checked: ${totalQuestions}`);
console.log(`Flagged:           ${totalFlagged}`);
console.log();

if (flagged.length === 0) {
  console.log("All questions pass backtick balance check.");
} else {
  const byFile = {};
  for (const f of flagged) {
    if (!byFile[f.file]) byFile[f.file] = [];
    byFile[f.file].push(f);
  }

  const labels = ["A", "B", "C", "D"];
  for (const [file, items] of Object.entries(byFile)) {
    console.log(`--- ${file} (${items.length} flagged) ---`);
    for (const item of items) {
      const countStr = item.counts
        .map(
          (c, i) =>
            `${labels[i]}=${c}${i === item.correctIdx ? "*" : ""}`
        )
        .join("  ");
      console.log(`  ${item.id}  [${countStr}]`);
      for (const f of item.findings) {
        console.log(`    -> ${f}`);
      }
    }
    console.log();
  }
}

process.exit(totalFlagged > 0 ? 1 : 0);
