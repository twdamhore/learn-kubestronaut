#!/usr/bin/env node
//
// check_first_word.js — flag questions where the correct answer's first word
// stands out from the distractors
//
// Usage:  node check_first_word.js [--verbose]
//
// Flags when:
//   1. All 3 distractors share the same first word, correct differs (3-vs-1)
//   2. 2 distractors share a first word, the 3rd has another, and correct
//      has a unique first word not shared by any distractor (2-1-1 with correct unique)
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
    const labels = ["A", "B", "C", "D"];
    const firstWords = q.options.map((o) => o.split(/\s/)[0].toLowerCase().replace(/[^a-z0-9-]/g, ""));
    const correctFirst = firstWords[q.answer];
    const otherFirstWords = firstWords.filter((_, i) => i !== q.answer);
    const findings = [];

    // Check 1: 3-vs-1 — all distractors share same first word, correct differs
    if (
      otherFirstWords[0] === otherFirstWords[1] &&
      otherFirstWords[1] === otherFirstWords[2] &&
      correctFirst !== otherFirstWords[0]
    ) {
      findings.push(
        `3-vs-1: correct (${labels[q.answer]}) starts with "${correctFirst}" but all 3 distractors start with "${otherFirstWords[0]}"`
      );
    }

    // Check 2: 2-1-1 — correct's first word is unique (not shared by ANY other option)
    // and at least 2 distractors share the same first word
    if (findings.length === 0) {
      const correctSharedByOthers = otherFirstWords.filter((w) => w === correctFirst).length;
      if (correctSharedByOthers === 0) {
        // correct's first word is unique — check if distractors have a pair
        const freq = {};
        for (const w of otherFirstWords) {
          freq[w] = (freq[w] || 0) + 1;
        }
        const hasPair = Object.values(freq).some((c) => c >= 2);
        if (hasPair) {
          const pairs = Object.entries(freq)
            .filter(([, c]) => c >= 2)
            .map(([w, c]) => `"${w}" (${c}x)`)
            .join(", ");
          findings.push(
            `2-1-1: correct (${labels[q.answer]}) starts with unique "${correctFirst}"; distractors cluster: ${pairs}`
          );
        }
      }
    }

    if (findings.length > 0) {
      totalFlagged++;
      flagged.push({
        file,
        id: q.id,
        correctIdx: q.answer,
        firstWords,
        findings,
      });
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────

console.log(`\nFirst-Word Pattern Check`);
console.log(`${"=".repeat(50)}`);
console.log(`Files checked:     ${setFiles.length}`);
console.log(`Questions checked: ${totalQuestions}`);
console.log(`Flagged:           ${totalFlagged}`);
console.log();

if (flagged.length === 0) {
  console.log("All questions pass first-word pattern check.");
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
      const wordStr = item.firstWords
        .map((w, i) => `${labels[i]}="${w}"${i === item.correctIdx ? "*" : ""}`)
        .join("  ");
      console.log(`  ${item.id}  [${wordStr}]`);
      for (const f of item.findings) {
        console.log(`    -> ${f}`);
      }
    }
    console.log();
  }
}

process.exit(totalFlagged > 0 ? 1 : 0);
