#!/usr/bin/env node
//
// check_giveaway.js — flag questions where the correct answer has unique structural patterns
//
// Usage:  node check_giveaway.js [--verbose]
//
// Checks for patterns that appear ONLY in the correct answer (not in any distractor),
// which lets test-savvy students identify the answer without domain knowledge.
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
    name: "first-word",
    desc: "correct answer's first word is unique and distractors cluster",
    fn(opts, correctIdx) {
      const firstWords = opts.map((o) => o.split(/\s/)[0].toLowerCase().replace(/[^a-z0-9-]/g, ""));
      const correctFirst = firstWords[correctIdx];
      const others = firstWords.filter((_, i) => i !== correctIdx);
      // 3-vs-1: all distractors share same first word, correct differs
      if (
        others[0] === others[1] &&
        others[1] === others[2] &&
        correctFirst !== others[0]
      ) {
        return [
          `3-vs-1: correct starts with "${correctFirst}" but all 3 distractors start with "${others[0]}"`,
        ];
      }
      // 2-1-1: correct's first word is unique, and at least 2 distractors share a word
      const correctSharedByOthers = others.filter((w) => w === correctFirst).length;
      if (correctSharedByOthers === 0) {
        const freq = {};
        for (const w of others) freq[w] = (freq[w] || 0) + 1;
        const hasPair = Object.values(freq).some((c) => c >= 2);
        if (hasPair) {
          const pairs = Object.entries(freq)
            .filter(([, c]) => c >= 2)
            .map(([w, c]) => `"${w}" (${c}x)`)
            .join(", ");
          return [
            `2-1-1: correct starts with unique "${correctFirst}"; distractors cluster: ${pairs}`,
          ];
        }
      }
      return [];
    },
  },
  {
    name: "backtick-density",
    desc: "correct answer has unique backtick count (differs by >2 from all others)",
    fn(opts, correctIdx) {
      const counts = opts.map((o) => (o.match(/`/g) || []).length);
      const correctCount = counts[correctIdx];
      const otherCounts = counts.filter((_, i) => i !== correctIdx);
      const minOther = Math.min(...otherCounts);
      const maxOther = Math.max(...otherCounts);
      // Correct has notably more backticks than all others
      if (correctCount > maxOther + 2) {
        return [
          `correct has ${correctCount} backticks, others have ${otherCounts.join(",")}`,
        ];
      }
      // Correct has notably fewer
      if (correctCount < minOther - 2) {
        return [
          `correct has ${correctCount} backticks, others have ${otherCounts.join(",")}`,
        ];
      }
      return [];
    },
  },
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
  // ── Unique keyword/phrase checks ──────────────────────────────────
  // Flag when a keyword appears ONLY in the correct answer
  // Uses regex with word boundaries to catch keywords before punctuation/end-of-string
  ...makeKeywordChecks([
    [/, which /i, "relative clause `, which`"],
    [/, and /i, "compound clause `, and`"],
    [/, but /i, "contrast clause `, but`"],
    [/, or /i, "alternative clause `, or`"],
    [/\bbecause\b/i, `"because"`],
    [/\bsince\b/i, `"since"`],
    [/\bwhile\b/i, `"while"`],
    [/\bbut\b/i, `"but"`],
    [/\bsuch as\b/i, `"such as"`],
    [/\bincluding\b/i, `"including"`],
    [/e\.g\./i, `"e.g."`],
    [/\blike\b/i, `"like"`],
    [/\bboth\b/i, `"both"`],
    [/\bautomatically\b/i, `"automatically"`],
    [/\brather than\b/i, `"rather than"`],
    [/\binstead of\b/i, `"instead of"`],
    [/\bimmediately\b/i, `"immediately"`],
    [/\bnatively\b/i, `"natively"`],
    [/\bdynamically\b/i, `"dynamically"`],
    [/\bspecifically\b/i, `"specifically"`],
    [/\balthough\b/i, `"although"`],
    [/\bhowever\b/i, `"however"`],
    [/\btherefore\b/i, `"therefore"`],
  ]),
];

function makeKeywordChecks(keywords) {
  return keywords.map(([regex, label]) => ({
    name: `keyword-${label}`,
    desc: `only the correct answer contains ${label}`,
    fn(opts, correctIdx) {
      const has = opts.map((o) => regex.test(o));
      if (has[correctIdx] && has.filter(Boolean).length === 1) {
        return [`only correct answer contains ${label}`];
      }
      return [];
    },
  }));
}

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
      const labels = ["A", "B", "C", "D"];
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
