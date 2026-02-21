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
