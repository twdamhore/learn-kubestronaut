# Round 36 Review - set-06.js

**Date:** 2026-02-19
**Issues found:** 10
**Issues fixed:** 10

## Fixes

### s06-q016 (accuracy)
- **Problem:** Option D said "`kubectl drain` skips DaemonSet-managed Pods by default" but drain actually errors out unless `--ignore-daemonsets` is passed.
- **Fix:** Reworded option D to: "`kubectl drain` refuses to proceed when DaemonSet-managed Pods exist unless `--ignore-daemonsets` is passed".

### s06-q034 (accuracy)
- **Problem:** Question asked "What happens" but the correct answer is about best practice ("must be drained first"), creating a mismatch in intent.
- **Fix:** Rephrased the question to: "During a node upgrade, the container runtime needs to be upgraded. What is the recommended practice for handling running containers on that node?"

### s06-q037 (length-balance/giveaway)
- **Problem:** Correct answer B (105 chars) was much longer/more detailed than options A (82 chars) and C (81 chars), making it a giveaway.
- **Fix:** Shortened option B from "prints a tabular summary of certificate validity and remaining time" to "lists all managed certificates and their expiry dates" (~82 chars).

### s06-q039 (length-balance/giveaway)
- **Problem:** Correct answer C (62 chars) was ~59% longer than wrong options averaging 39 chars.
- **Fix:** Balanced all option lengths: A to "etcd-operator, an etcd lifecycle management tool", B to "Longhorn, a cloud-native distributed storage system", C to "Velero, a backup and disaster-recovery project", D to "Stash, a third-party backup and restore toolkit".

### s06-q056 (explanation)
- **Problem:** The explanation for why option B is wrong was weak -- it did not leverage the information given in the question stem.
- **Fix:** Updated the B explanation to: "The question states the container runtime is healthy; additionally, the NetworkUnavailable condition specifically indicates a network plugin issue, not a runtime issue."

### s06-q067 (length-balance)
- **Problem:** Option D (~108 chars) was significantly longer than other options (~77-84 chars).
- **Fix:** Shortened D from "The `globalDefault` field applies retroactively -- existing Pods inherit the new value during the next sync cycle" to "`globalDefault` applies retroactively -- existing Pods inherit the new value automatically" (~85 chars).

### s06-q085 (length-balance)
- **Problem:** Option C (113 chars) was 73% longer than the other options (~65 chars).
- **Fix:** Shortened option C from "Only taints with key `special-taint` and an empty string value, because Exists matches empty values by default" to "Only taints with key `special-taint` and an empty string value by default" (~77 chars).

### s06-q093 (explanation)
- **Problem:** The distinction between options A and C was not well explained -- the A explanation was too brief.
- **Fix:** Clarified the A explanation to: "Option A focuses narrowly on deletion of resources, which is only one aspect of reconciliation and depends on pruning configuration. Option C correctly describes the broader reconciliation behavior: applying resources from Git, updating drifted resources, and potentially pruning -- making it the most complete and accurate description."

### s06-q095 (explanation)
- **Problem:** The explanation for why B is wrong said pausing for stability is not recommended, but validation after each step is actually reasonable -- the real issue is ambiguity about the sequential path.
- **Fix:** Rewrote the B explanation to: "While upgrading to v1.28 first is correct, this option implies pausing only after v1.28 and then proceeding to v1.29 and v1.30 together, which is ambiguous. Option D explicitly shows the full sequential path through every minor version."

### s06-q098 (explanation minor)
- **Problem:** Option C about Helm auto-rollback did not mention the `--atomic` flag nuance.
- **Fix:** Added to the C explanation: "Without the `--atomic` flag, Helm does not automatically roll back; the release is simply marked FAILED. The `--atomic` flag would enable automatic rollback, but it is not the default behavior."

---

# Round 37 Review - set-06.js

**Date:** 2026-02-19
**Issues found:** 14
**Issues fixed:** 14

## Fixes

### s06-q002 (label-ordering)
- **Problem:** Options array had labels in order C, B, A, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 0 to 2 (correct answer: C).

### s06-q003 (label-ordering)
- **Problem:** Options array had labels in order B, A, C, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 1 to 0 (correct answer: A).

### s06-q006 (label-ordering)
- **Problem:** Options array had labels in order C, B, A, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 0 to 2 (correct answer: C).

### s06-q009 (label-ordering)
- **Problem:** Options array had labels in order A, D, C, B instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 1 to 3 (correct answer: D).

### s06-q014 (label-ordering)
- **Problem:** Options array had labels in order A, D, C, B instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 3 to 1 (correct answer: B).

### s06-q023 (label-ordering)
- **Problem:** Options array had labels in order D, B, C, A instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 0 to 3 (correct answer: D).

### s06-q048 (label-ordering)
- **Problem:** Options array had labels in order A, C, B, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 2 to 1 (correct answer: B).

### s06-q053 (label-ordering)
- **Problem:** Options array had labels in order D, B, C, A instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 0 to 3 (correct answer: D).

### s06-q063 (label-ordering)
- **Problem:** Options array had labels in order B, A, C, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 1 to 0 (correct answer: A).

### s06-q075 (label-ordering)
- **Problem:** Options array had labels in order C, B, A, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 0 to 2 (correct answer: C).

### s06-q079 (label-ordering)
- **Problem:** Options array had labels in order C, B, A, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 2 to 0 (correct answer: A).

### s06-q082 (label-ordering)
- **Problem:** Options array had labels in order D, B, C, A instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 3 to 0 (correct answer: A).

### s06-q090 (label-ordering)
- **Problem:** Options array had labels in order C, B, A, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 0 to 2 (correct answer: C).

### s06-q098 (label-ordering)
- **Problem:** Options array had labels in order A, C, B, D instead of A, B, C, D.
- **Fix:** Reordered options to A, B, C, D; updated answer index from 2 to 1 (correct answer: B).

---

# Round 38 Review - Set 06

**Date:** 2026-02-19
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 3 across 3 questions

## Changes

### s06-q016 (length-balance/giveaway)
- **Option A:** Expanded from ~67 to ~78 chars. **Option D (correct):** Shortened from ~111 to ~88 chars.

### s06-q072 (explanation quality)
- **Option B explanation:** Now addresses the actual claim about eviction order rather than just stating "evicted normally".

### s06-q061 (accuracy)
- **Option B explanation:** Changed "PodSecurityPolicy is deprecated" to "was removed in Kubernetes 1.25".

---

# Round 39 Review - Set 06

**Date:** 2026-02-21
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 11 across 11 questions

## Changes

### s06-q015 (length-balance)
- **All options:** Balanced lengths from range 31-44 (ratio 1.42) to 39-42 (ratio 1.08). Expanded A/C/D with minor wording additions, trimmed B.

### s06-q026 (length-balance)
- **Option D:** Shortened from 88 to 68 chars by removing "across all zones" to bring ratio from 1.26 to 1.03.

### s06-q032 (fictitious-term, length-balance)
- **Option C:** Replaced fictitious "SoftConstraintViolation" event name with generic "scheduling warning event". Balanced lengths from range 69-96 (ratio 1.39) to 78-84 (ratio 1.08). Updated explanation to match new wording.

### s06-q037 (length-balance)
- **Option B (correct):** Trimmed "all" from "lists all managed certificates". **Option D:** Shortened from 98 to 79 chars by condensing wording. Ratio improved from 1.26 to 1.09.

### s06-q044 (length-balance)
- **Option C:** Added "taint" before "effect" for consistency with A/B. **Option D:** Removed "as" for cleaner phrasing. Ratio improved from 1.33 to 1.29 (residual due to intrinsic keyword length of `PreferNoSchedule`).

### s06-q055 (length-balance/giveaway)
- **Option A (correct):** Expanded from 60 to 80 chars by adding "matching app labels". Correct answer was shortest; now longest. Ratio improved from 1.27 to 1.23.

### s06-q061 (length-balance/giveaway)
- **Options A/C/D:** Reworded for balance. Correct answer C was shortest at 32 chars; expanded to 37 ("per-container defaults"). Ratio improved from 1.31 to 1.11.

### s06-q084 (length-balance/giveaway)
- **All options:** Balanced lengths from range 46-72 (ratio 1.57, worst in set) to 55-59 (ratio 1.07). Trimmed B/C padding, expanded D slightly.

### s06-q090 (length-balance)
- **Options B/D:** Expanded from 30/28 to 36/34 chars by adding specificity ("availability", "order"). Ratio improved from 1.43 to 1.18.

### s06-q092 (length-balance/giveaway)
- **Options A/B/C:** Trimmed to reduce spread. Correct answer D was shortest at 72 chars; now tied for longest. Ratio improved from 1.25 to 1.14.

### s06-q095 (length-balance)
- **Option B:** Shortened from 94 to 64 chars by condensing "pause for stability validation before proceeding to v1.29 and v1.30" to "pause for validation, then jump to v1.30". **Option D (correct):** Reworded from 69 to 66 chars. Ratio improved from 1.36 to 1.14.

### s06-q100 (length-balance/giveaway)
- **All options:** Balanced from range 51-75 (ratio 1.47) to 52-59 (ratio 1.13). Correct answer C was shortest; now tied for longest. Shortened D from 75 to 55 chars.

---

# Round 40 Review - Set 06

**Date:** 2026-02-21
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 16 across 16 questions

## Changes

### s06-q016 (length-balance)
- **Options A/B/D:** Reworded for balance. Trimmed B from 89 to 78 chars, trimmed D from 85 to 80 chars, expanded A from 75 to 78 chars. Ratio improved from 1.19 to 1.03.

### s06-q021 (length-balance/giveaway)
- **Option C (correct):** Expanded from 39 to 46 chars by adding "policy" to "preemption policy enabled". Correct answer was shortest; now tied for longest. Ratio improved from 1.18 to 1.10.

### s06-q034 (length-balance)
- **Option D:** Shortened from 99 to 84 chars by replacing "by kubelet after the upgrade; others remain stopped" with "automatically; others remain stopped". Ratio improved from 1.21 to 1.06.

### s06-q035 (length-balance/giveaway)
- **All options:** Balanced by adding "metric"/"from kubelet"/etc. suffixes. Correct A was shortest at 47; now 54 (longest). Ratio improved from 1.19 to 1.10.

### s06-q044 (length-balance)
- **All options:** Prepended "The" and added "applied to a node"/"on a node" suffixes to balance inherently different keyword lengths (`PreferNoSchedule` vs `NoExecute`). Ratio improved from 1.29 to 1.04.

### s06-q047 (length-balance)
- **Option A:** Expanded from 57 to 62 chars by adding "the". **Option D:** Trimmed from 66 to 62 chars. Ratio improved from 1.16 to 1.05.

### s06-q054 (length-balance)
- **Options A/B:** Expanded slightly ("available nodes", "runtime state"). **Option C:** Trimmed from 73 to 66 chars. Ratio improved from 1.16 to 1.14.

### s06-q055 (length-balance/giveaway)
- **All options:** Reworded for balance. Correct A (longest at 80) trimmed to 77. D (shortest at 65) expanded to 74. Ratio improved from 1.23 to 1.04.

### s06-q056 (length-balance)
- **Options B/C/D:** Expanded with minor wording additions ("daemon", "all Pods", "setup"). Ratio improved from 1.17 to 1.04.

### s06-q058 (length-balance/giveaway)
- **All options:** Balanced by adding "replica"/"node-level"/"setting"/"request" qualifiers. Correct D (longest at 49) trimmed to 48. B (shortest at 40) expanded to 48. Ratio improved from 1.23 to 1.06.

### s06-q060 (length-balance/giveaway)
- **Options A/C/D:** Expanded to balance with B. Correct A (shortest at 64) expanded to 75. Ratio improved from 1.17 to 1.09.

### s06-q062 (length-balance/giveaway)
- **Options B/C:** Expanded with "rules"/"available" to close gap. Correct D (longest at 68) unchanged. Ratio improved from 1.15 to 1.01.

### s06-q068 (length-balance)
- **All options:** Added "project"/"framework"/"and admission tool"/"for AI" suffixes. Ratio improved from 1.22 to 1.07.

### s06-q078 (length-balance)
- **Option C:** Expanded from 72 to 83 chars by adding "a fully mandatory constraint". Ratio improved from 1.18 to 1.08.

### s06-q080 (length-balance)
- **Options B/C/D:** Expanded with "CNI plugin binary"/"directory path"/"config" additions. Ratio improved from 1.22 to 1.10.

### s06-q085 (length-balance/giveaway)
- **Options A/C/D:** Reworded. Correct D (shortest at 61) expanded to 70 by adding "assigned". C trimmed from 73 to 70. Ratio improved from 1.20 to 1.09.

### s06-q086 (length-balance/giveaway)
- **Option B (correct):** Expanded from 65 to 78 chars by adding "network-attached PV is moved to". Correct answer was shortest; now tied for longest. Ratio improved from 1.20 to 1.05.

### s06-q096 (length-balance/giveaway)
- **Options C/D:** Expanded for balance. Correct C (shortest at 68) expanded to 78. D expanded from 71 to 77. Ratio improved from 1.16 to 1.03.

---

# Round 41 Review - Set 06

**Date:** 2026-02-21
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 10 across 9 questions

## Changes

### s06-q005 (giveaway/length-balance)
- **Options A/B/C:** Added commas to wrong options to match the comma-list pattern in correct answer D. Rebalanced lengths: A 72, B 68, C 71, D 70. Ratio improved from 1.14 to 1.06. Comma-list giveaway eliminated.

### s06-q051 (length-balance)
- **Option B:** Trimmed from 78 to 73 chars by removing "rule" ("the hard anti-affinity" instead of "the hard anti-affinity rule"). Ratio improved from 1.15 to 1.07.

### s06-q054 (length-balance)
- **Options A/B:** Trimmed "other" and "their full" to reduce correct answer A from 75 to 70, B from 74 to 69. Ratio improved from 1.14 to 1.07.

### s06-q067 (length-balance)
- **Option A (correct):** Minor rewording ("was defined" instead of "definition") for +1 char. **Option D:** Trimmed from 90 to 76 chars by removing "automatically". **Option C:** Trimmed from 84 to 82 chars. Ratio improved from 1.14 to 1.09.

### s06-q068 (giveaway/length-balance)
- **Option A (correct):** Removed parenthetical "(scheduling-plugins)" unique structural giveaway; rewording to "the custom scheduler extension project". **Options B/C/D:** Expanded with "and eviction"/"resource"/"workloads" to balance. Ratio improved from 1.22 to 1.10.

### s06-q075 (length-balance)
- **Option C (correct):** Expanded from 60 to 66 chars ("with no node bound" instead of ", unscheduled"). Ratio improved from 1.13 to 1.10.

### s06-q086 (keyword-echo)
- **Option B (correct):** Replaced "network-attached PV" with "underlying PV" to remove keyword echo from question stem ("network-attached storage"). Length preserved at 78 chars.

### s06-q088 (length-balance)
- **All options:** Rebalanced by trimming A/C/D and expanding B. A from 90 to 84, B from 78 to 82, C from 87 to 84, D from 89 to 86. Ratio improved from 1.15 to 1.05.

### s06-q090 (length-balance/keyword-echo)
- **Option C (correct):** Replaced "namespace-level totals" with "aggregate consumption" to remove keyword echo from question stem. **Options B/D:** Added "Pod" for balance. Ratio improved from 1.18 to 1.05.

---

# Round 42 Review - Set 06

**Date:** 2026-02-21
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 11 across 10 questions

## Changes

### s06-q001 (length-balance)
- **Option A:** Trimmed from 84 to 80 chars by removing "rule". **Option B (correct):** Expanded from 73 to 77 chars by replacing "specified" with "for matching". Correct answer was shortest; now in mid-range. Ratio improved from 1.15 to 1.08.

### s06-q002 (length-balance)
- **Option A:** Trimmed from 78 to 74 chars by removing "status". **Option C (correct):** Expanded from 69 to 73 chars by adding "for it". Correct answer was shortest; now tied for mid-range. Ratio improved from 1.13 to 1.04.

### s06-q007 (length-balance)
- **All options:** Rewrote all four options to balance lengths. Option A from 59 to 79 (removed escaped quotes, restructured). B from 81 to 75. C (correct) from 85 to 78. D from 87 to 75. Ratio improved from 1.47 to 1.08.

### s06-q039 (length-balance)
- **Option C (correct):** Expanded from 46 to 51 chars by adding "CNCF" before "backup". Correct answer was shortest; now in mid-range. Ratio improved from 1.11 to 1.04.

### s06-q042 (backtick-density giveaway)
- **Option C (correct):** Removed backticks from "Allocatable" and "Allocated resources" to reduce backtick count from 6 (3 pairs) to 2 (1 pair), matching other options. Previously the only option with 3 backtick pairs vs 1 pair in all others.

### s06-q044 (length-balance)
- **Option C:** Expanded from 43 to 44 chars by adding "a" ("on a node" instead of "on node"). Ratio improved from 1.12 to 1.10.

### s06-q064 (length-balance)
- **All options:** Reworded for balance. A from 62 to 66 ("of the two taints"), B from 61 to 65 ("label set"), C (correct) from 56 to 64 ("every taint...to be scheduled"), D from 60 to 65 ("here"). Correct answer was shortest; now in mid-range. Ratio improved from 1.11 to 1.03.

### s06-q068 (length-balance)
- **Option A (correct):** Trimmed from 57 to 56 chars ("scheduling" instead of "scheduler"). **Option C:** Expanded from 51 to 54 chars ("system" instead of "tool"). Correct answer was longest; now tied. Ratio improved from 1.12 to 1.04.

### s06-q092 (length-balance)
- **Option B:** Expanded from 63 to 67 chars by adding "new". **Option D (correct):** Trimmed from 72 to 69 chars by removing "it". Correct answer was longest; now tied with A. Ratio improved from 1.14 to 1.07.

### s06-q095 (length-balance)
- **Option B:** Expanded from 64 to 70 chars ("jump ahead to"). **Option C:** Trimmed from 73 to 69 chars (removed "all"). Ratio improved from 1.14 to 1.08.

### s06-q100 (length-balance/giveaway)
- **Option B:** Expanded from 52 to 55 chars ("matched by it"). **Option C (correct):** Trimmed from 59 to 55 chars ("by this wildcard form"). Correct answer was longest; now tied. Ratio improved from 1.13 to 1.05.

---

# Round 43 Review - Set 06

**Date:** 2026-02-21
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 1 across 1 question

## Changes

### s06-q037 (structural giveaway — dash character inconsistency)
- **Problem:** Correct answer B used `--` (two ASCII hyphens) as the structural separator between the command name and description, while all three wrong options (A, C, D) used `—` (Unicode em-dash U+2014). This created a visual structural giveaway where the correct option looked different from the others.
- **Fix:** Changed option B separator from `--` to `—` to match the em-dash character used in options A, C, and D. Length changed from 85 to 84 chars; ratio improved from 1.09 to 1.08.

---

## Round 44 — 2026-02-23
**File**: `set-06.js`
**Issues found**: 7

### s06-q002 — giveaway: "because" unique to correct answer
- **Problem:** Correct answer C uniquely contained the word "because" ("The scheduler skips node1 because the Pod lacks..."), which no distractor used. This causal conjunction can signal the correct answer.
- **Fix:** Changed "because" to "since" in option C.

### s06-q023 — giveaway: "because" unique to correct answer
- **Problem:** Correct answer D uniquely contained "because" ("The cluster continues normally because 2 of 3 members form a quorum").
- **Fix:** Changed "because" to "as" in option D.

### s06-q038 — giveaway: "because" unique to correct answer
- **Problem:** Correct answer D uniquely contained "because" ("The Pod continues running because the rule is `IgnoredDuringExecution`").
- **Fix:** Changed "because" to "since" in option D.

### s06-q059 — giveaway: comma-list unique to correct + length imbalance
- **Problem:** Correct answer B listed 3 comma-separated flags while all distractors listed 2 flags with "and" (0 commas). Original ratio was 1.09 but the structural pattern was a giveaway. Additionally, after making all options 3-item lists, a length imbalance emerged (ratio 1.27+).
- **Fix:** Rewrote all four options as 3-item comma-separated flag lists with balanced lengths: A (36), B (33), C (37), D (37). Ratio: 1.12. Updated explanation to match new distractor flag names.

### s06-q065 — giveaway: "like" unique to correct answer
- **Problem:** Correct answer D uniquely contained "like" ("A policy engine like `OPA Gatekeeper` or `Kyverno`"), providing examples that no distractor offered.
- **Fix:** Restructured D to "`OPA Gatekeeper` or `Kyverno` policy engine with a custom constraint", removing the "like" exemplary pattern. Also minor rewording of A/B/C for consistency.

### s06-q087 — giveaway: comma-list unique to correct answer
- **Problem:** Correct answer C had 2 commas (listing sequential steps) while all distractors had 0 commas, creating a structural giveaway.
- **Fix:** Added commas to distractors A and B by restructuring their phrasing (A: "simultaneously, without validation, for fast consistency"; B: "only, validate it, then leave workers on the old version").

---

## Round 45 — 2026-02-23
**File**: `set-06.js`
**Issues found**: 3

### s06-q002 — giveaway: "since" unique to correct answer
- **Problem:** Round 44 changed "because" to "since" in the correct answer C, but "since" is still a causal conjunction giveaway when no distractor uses it.
- **Fix:** Rewrote option C from "The scheduler skips node1 since the Pod lacks a matching toleration for it" to "The scheduler skips node1 and the Pod stays pending without a toleration for it", removing the causal conjunction entirely.

### s06-q005 — giveaway: comma-density unique to correct answer + length imbalance
- **Problem:** Correct answer D had 3 commas (4-item list: "cordon, drain, upgrade, and uncordon") while all distractors had only 1 comma each, creating a structural giveaway. After adding commas to distractors, length imbalance emerged.
- **Fix:** Rewrote options A and B to also contain comma-separated lists (A: "skipping cordon, drain, and validation"; B: "control plane, verifying health, then leaving"). Expanded C with additional clause. Ratio improved from 1.23 to 1.06; comma counts now A=3, B=2, C=2, D=3.

### s06-q038 — giveaway: "since" unique to correct answer
- **Problem:** Round 44 changed "because" to "since" in the correct answer D, but "since" is still a causal conjunction giveaway when no distractor uses it.
- **Fix:** Changed "since" to "as" in option D: "The Pod continues running as the rule is `IgnoredDuringExecution`".

---

## Round 46 — 2026-02-24
**File**: `set-06.js`
**Issues found**: 1

### s06-q038 — giveaway: "as" causal conjunction still unique to correct answer
- **Problem:** Round 45 changed "since" to "as" in correct answer D, but "as" used causally ("The Pod continues running as the rule is...") remains a causal conjunction giveaway when no distractor uses any causal conjunction.
- **Fix:** Restructured option D to eliminate the causal conjunction entirely: changed from "The Pod continues running as the rule is `IgnoredDuringExecution`" to "The Pod continues running under the `IgnoredDuringExecution` behavior". Length changed from 65 to 69 chars; ratio remains 1.09.

---

# Round 47 Review - set-06.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 1

---

## s06-q088 (backtick-density giveaway)

**Problem:** Correct answer D had 4 backticks (2 pairs: `kubectl get nodes` and `Ready`), option A had 2 backticks, and options B and C had 0 backticks. The correct answer stood out as the most "technical-looking" option with the highest backtick density.
**Change:** Added backticks to B (`staging`) and C (`CI/CD`) so all wrong options now have 2 backticks each, reducing the visual contrast with the correct answer's 4 backticks. Also minor wording adjustments: B trimmed from 82 to 80 chars ("schedule set" to "schedule"), C trimmed from 84 to 82 chars ("inspects cluster health" to "checks health"). Ratio improved from 1.05 to 1.07 (negligible change).

---

# Round 47c Review - set-06.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-06.js`
**Issues fixed:** 5

---

## s06-q014 (keyword "but" giveaway)

**Problem:** Only the correct answer B contained the word "but" ("evicted but its data..."), making it uniquely identifiable by structural pattern.
**Change:** Rewrote option D from "Local volumes are automatically replicated across all nodes, so there is no data loss" to "Local volumes are replicated across all nodes, but only after a considerable sync delay". This adds "but" to a distractor, eliminating the giveaway. Length rebalanced (D from 88 to 90 chars; ratio 1.10).

---

## s06-q017 (keyword "both" giveaway)

**Problem:** Only the correct answer B contained the word "both" ("Both constraints must be satisfied..."), making it uniquely identifiable.
**Change:** Rewrote option D from "The scheduler picks whichever constraint matches the most nodes" to "The scheduler evaluates both and picks whichever matches more nodes". This adds "both" to a distractor. Trimmed D from 74 to 70 chars to maintain ratio under 1.15.

---

## s06-q052 (keyword "but" giveaway)

**Problem:** Only the correct answer B contained the word "but" ("but etcd still uses the old one"), making it uniquely identifiable.
**Change:** Rewrote option D from "The restored snapshot was encrypted with a different key that does not match today" to "The restored snapshot was encrypted with a key but it does not match the current one". This adds "but" to a distractor.

---

## s06-q071 (keyword "automatically" giveaway)

**Problem:** Only the correct answer A contained the word "automatically" ("Services and DNS automatically resolve..."), making it uniquely identifiable.
**Change:** Rewrote option D from "The CNI plugin broadcasts the new IP address to all other nodes in the cluster" to "The CNI plugin automatically broadcasts the new IP address to all other nodes". This adds "automatically" to a distractor.

---

## s06-q095 (keyword ", and" giveaway)

**Problem:** Only the correct answer D contained the compound clause ", and" ("v1.28, v1.29, and v1.30"), making it structurally unique.
**Change:** Added a comma before "and" in option C: "Build a new v1.30 cluster from scratch, and migrate existing workloads". This adds ", and" to a distractor, eliminating the giveaway.

---
