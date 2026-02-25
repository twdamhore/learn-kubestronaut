#!/usr/bin/env node
//
// check_giveaway.js — flag questions where the correct answer has unique punctuation patterns
//
// Usage:  node check_giveaway.js [--verbose]
//
// Checks for punctuation patterns that appear ONLY in the correct answer (not in any
// distractor). First-word, keyword, and backtick checks are handled by their dedicated
// scripts (check_first_word.js, check_keyword_unique.js, check_backtick_balance.js).
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

// ── Pattern definitions ──────────────────────────────────────────────
// Each check returns an array of finding strings (empty = pass)

function stripBackticks(s) {
  // Remove backtick-delimited content so we don't flag colons/etc inside code
  return s.replace(/`[^`]*`/g, "CODEFENCE");
}

const checks = [
  {
    name: "semicolon",
    desc: "only the correct answer contains a semicolon",
    fn(opts, correctIdx) {
      const cleaned = opts.map(stripBackticks);
      const has = cleaned.map((o) => o.includes(";"));
      if (has[correctIdx] && has.filter(Boolean).length === 1) {
        return ["only correct answer contains a semicolon"];
      }
      return [];
    },
  },
  {
    name: "parenthetical",
    desc: "only the correct answer contains parentheses",
    fn(opts, correctIdx) {
      const cleaned = opts.map(stripBackticks);
      const has = cleaned.map((o) => /\(.*?\)/.test(o));
      if (has[correctIdx] && has.filter(Boolean).length === 1) {
        return ["only correct answer contains parentheses"];
      }
      return [];
    },
  },
  {
    name: "em-dash",
    desc: "only the correct answer contains an em-dash",
    fn(opts, correctIdx) {
      const cleaned = opts.map(stripBackticks);
      const has = cleaned.map((o) => o.includes("—") || o.includes(" -- "));
      if (has[correctIdx] && has.filter(Boolean).length === 1) {
        return ["only correct answer contains an em-dash"];
      }
      return [];
    },
  },
  {
    name: "colon",
    desc: "only the correct answer contains a colon (outside backticks)",
    fn(opts, correctIdx) {
      const cleaned = opts.map(stripBackticks);
      const has = cleaned.map((o) => o.includes(":"));
      if (has[correctIdx] && has.filter(Boolean).length === 1) {
        return ["only correct answer contains a colon"];
      }
      return [];
    },
  },
  {
    name: "comma-count",
    desc: "correct answer has 2+ more commas than every distractor",
    fn(opts, correctIdx) {
      const counts = opts.map(
        (o) => (stripBackticks(o).match(/,/g) || []).length
      );
      const correctCount = counts[correctIdx];
      const maxOther = Math.max(
        ...counts.filter((_, i) => i !== correctIdx)
      );
      if (correctCount >= maxOther + 2) {
        return [
          `correct has ${correctCount} commas, others have ${counts.filter((_, i) => i !== correctIdx).join(",")}`,
        ];
      }
      return [];
    },
  },
];

// ── Main scan ────────────────────────────────────────────────────────

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
    const findings = [];

    for (const check of checks) {
      const results = check.fn(q.options, q.answer);
      for (const r of results) {
        findings.push({ check: check.name, detail: r });
      }
    }

    if (findings.length > 0) {
      totalFlagged++;
      flagged.push({ file, id: q.id, correctIdx: q.answer, findings });
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────

console.log(`\nGiveaway Pattern Check`);
console.log(`${"=".repeat(50)}`);
console.log(`Files checked:     ${setFiles.length}`);
console.log(`Questions checked: ${totalQuestions}`);
console.log(`Flagged:           ${totalFlagged}`);
console.log();

if (flagged.length === 0) {
  console.log("All questions pass giveaway pattern check.");
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
        console.log(
          `  ${item.id}  [${f.check}] ${f.detail}`
        );
      }
    }
    console.log();
  }

  if (VERBOSE) {
    // Summary by check type
    const byCk = {};
    for (const f of flagged) {
      for (const finding of f.findings) {
        byCk[finding.check] = (byCk[finding.check] || 0) + 1;
      }
    }
    console.log("--- Summary by check type ---");
    for (const [k, v] of Object.entries(byCk).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${k}: ${v}`);
    }
  }
}

process.exit(totalFlagged > 0 ? 1 : 0);
