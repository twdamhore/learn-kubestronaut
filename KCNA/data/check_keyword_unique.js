#!/usr/bin/env node
//
// check_keyword_unique.js — flag questions where the correct answer contains
// a keyword/phrase not present in ANY distractor
//
// Usage:  node check_keyword_unique.js [--verbose]
//
// Uses word-boundary matching (not substring with trailing space) to catch
// keywords before commas, periods, end-of-string, etc.
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

// ── Keyword definitions ──────────────────────────────────────────────
// Each entry: [regex, label]
// Using word boundaries (\b) to avoid trailing-space issues

const KEYWORDS = [
  // Causal / contrast connectors
  [/\bautomatically\b/i, "automatically"],
  [/\bbecause\b/i, "because"],
  [/\bsince\b/i, "since"],
  [/\balthough\b/i, "although"],
  [/\bhowever\b/i, "however"],
  [/\btherefore\b/i, "therefore"],
  [/\brather than\b/i, "rather than"],
  [/\binstead of\b/i, "instead of"],

  // Scope / inclusion words
  [/\bboth\b/i, "both"],
  [/\bincluding\b/i, "including"],
  [/\bsuch as\b/i, "such as"],
  [/\be\.g\./i, "e.g."],
  [/\bi\.e\./i, "i.e."],

  // Conjunctive phrases (inside options, not inside backticks)
  [/, which /i, ", which"],
  [/, and /i, ", and"],
  [/, but /i, ", but"],
  [/, or /i, ", or"],

  // Contrast / qualification
  [/\bbut\b/i, "but"],
  [/\bwhile\b/i, "while"],
  [/\blike\b/i, "like"],

  // Other signal words
  [/\bspecifically\b/i, "specifically"],
  [/\bnatively\b/i, "natively"],
  [/\bdynamically\b/i, "dynamically"],
  [/\bimmediately\b/i, "immediately"],
];

function stripBackticks(s) {
  return s.replace(/`[^`]*`/g, "CODEFENCE");
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
    const cleaned = q.options.map(stripBackticks);
    const findings = [];

    for (const [regex, label] of KEYWORDS) {
      const matches = cleaned.map((o) => regex.test(o));
      // Flag only if correct answer has it and NO distractor does
      if (matches[q.answer] && matches.filter(Boolean).length === 1) {
        findings.push(`only correct answer contains "${label}"`);
      }
    }

    if (findings.length > 0) {
      totalFlagged++;
      flagged.push({
        file,
        id: q.id,
        correctIdx: q.answer,
        findings,
      });
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────

console.log(`\nUnique Keyword Check`);
console.log(`${"=".repeat(50)}`);
console.log(`Files checked:     ${setFiles.length}`);
console.log(`Questions checked: ${totalQuestions}`);
console.log(`Flagged:           ${totalFlagged}`);
console.log();

if (flagged.length === 0) {
  console.log("All questions pass unique keyword check.");
} else {
  const byFile = {};
  for (const f of flagged) {
    if (!byFile[f.file]) byFile[f.file] = [];
    byFile[f.file].push(f);
  }

  for (const [file, items] of Object.entries(byFile)) {
    console.log(`--- ${file} (${items.length} flagged) ---`);
    for (const item of items) {
      for (const f of item.findings) {
        console.log(`  ${item.id}  ${f}`);
      }
    }
    console.log();
  }

  if (VERBOSE) {
    const byKw = {};
    for (const f of flagged) {
      for (const finding of f.findings) {
        const kw = finding.match(/"(.+)"/)?.[1] || finding;
        byKw[kw] = (byKw[kw] || 0) + 1;
      }
    }
    console.log("--- Summary by keyword ---");
    for (const [k, v] of Object.entries(byKw).sort((a, b) => b[1] - a[1])) {
      console.log(`  "${k}": ${v}`);
    }
  }
}

process.exit(totalFlagged > 0 ? 1 : 0);
