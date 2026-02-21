# Round 36 Review - set-05.js

**Date:** 2026-02-19
**Issues found:** 3
**Issues fixed:** 3

## Fixes

### s05-q006 (length-balance)
- **Problem:** Option C (117 chars) was 33% longer than the other options (82-89 chars).
- **Fix:** Shortened option C from "Projected tokens mounted via `automountServiceAccountToken` are long-lived and do not require separate Secret creation" to "Projected tokens from `automountServiceAccountToken` are already long-lived by default" (~85 chars).

### s05-q068 (accuracy/explanation)
- **Problem:** The explanation for option D stated "While the baseline profile does prohibit hostPath volumes, it does not merely restrict them to read-only access -- it forbids them outright." This was factually wrong. The baseline PSS does NOT prohibit or restrict hostPath at all; only the restricted profile prohibits hostPath.
- **Fix:** Changed the D explanation to: "The baseline profile does not restrict hostPath volumes at all; only the restricted profile prohibits hostPath volumes entirely, so the claim about baseline is incorrect." Also corrected the main explanation paragraph which contained the same factual error about the baseline profile.

### s05-q068 (length-balance)
- **Problem:** Option D (82 chars) was 25% longer than options A-C (65-67 chars).
- **Fix:** Shortened option D from "No, and the `baseline` profile also restricts hostPath volumes to read-only access" to "No, the `baseline` profile also restricts `hostPath` volumes" (~60 chars).

---

# Round 37 Review - set-05.js

**Date:** 2026-02-19
**Issues found:** 5
**Issues fixed:** 5
**Questions affected:** 4

## Fixes

### s05-q013 (giveaway)
- **Problem:** Options A and B both made the same wrong claim (that `CAP_NET_ADMIN` is in the default runtime set), creating a giveaway since two identical distractors are obviously wrong.
- **Fix:** Replaced option B from "CAP_NET_ADMIN is granted because it is included in the runtime default list" to "The container inherits CAP_NET_ADMIN from the host kernel automatically at startup". Updated B explanation accordingly.

### s05-q013 (length-balance)
- **Problem:** Option A (91 chars) was ~30% longer than options C/D (~70 chars).
- **Fix:** Shortened option A from "Most common capabilities including `CAP_NET_ADMIN` are granted by the default runtime config" to "`CAP_NET_ADMIN` is among the common capabilities in the default runtime set".

### s05-q004 (length-balance)
- **Problem:** Option A (72 chars) was noticeably longer than B and D (47 chars each).
- **Fix:** Rebalanced options A, B, and D. A: "During scheduling, after the PodSecurity admission phase completes". B: "During the image pull phase on the assigned worker node". D: "At runtime enforcement by the container runtime on the node".

### s05-q048 (explanation - contradictory wording)
- **Problem:** Option A said "read-only and write access" which is contradictory.
- **Fix:** Changed option A from "`admin` — grants read-only and write access within a namespace" to "`admin` — grants full read and write access within a namespace".

### s05-q064 (accuracy)
- **Problem:** Explanation incorrectly cited "Kubernetes 1.14" for the view ClusterRole excluding Secrets; this version reference is not accurate.
- **Fix:** Changed "Since Kubernetes 1.14, the built-in view ClusterRole excludes Secrets." to "The built-in view ClusterRole excludes Secrets by design."

---

# Round 38 Review - Set 05

**Date:** 2026-02-19
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s05-q012 (length-balance)
- **Options B, C, D:** Rebalanced. Shortened B and D, lengthened C to close 38.5% gap.

### s05-q043 (length-balance)
- **Option A:** Expanded. **Option D:** Shortened. Reduced 27.3% gap to ~11%.

### s05-q048 (length-balance)
- **Option C (correct):** Expanded "most resources" to "most namespace resources". **Option A:** Shortened "within" to "in".

### s05-q053 (length-balance)
- **Option A:** Shortened from ~82 to ~71 chars.

### s05-q089 (length-balance)
- **Option C:** Shortened from ~90 to ~77 chars.

### s05-q098 (length-balance)
- **Option A:** Shortened from ~80 to ~67 chars.

### s05-q086 (length-balance)
- **Options B, C, D:** Rebalanced. Shortened B and D, expanded C.

---

# Round 39 Review - Set 05

**Date:** 2026-02-21
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s05-q004 (length-balance - MEDIUM)
- **Problem:** Correct option C (52 chars) was shortest; A was 66 chars.
- **Fix:** Shortened A from "During scheduling, after the PodSecurity admission phase completes" to "During scheduling, after the PodSecurity admission phase". Expanded C (correct) from "During admission by the PodSecurity admission plugin" to "During the admission phase by the PodSecurity admission plugin".

### s05-q082 (structural giveaway - MEDIUM)
- **Problem:** Correct option D had a unique 3-item enum plus semicolon structure, making it stand out.
- **Fix:** Added enum structure to C: "Environment variables are injected once at startup, never refreshed, and become stale on rotation". Simplified D (correct): "Env vars leak through process listings and crash dumps while volume-mounted files do not".

### s05-q097 (length-balance - MEDIUM)
- **Problem:** Correct option B (60 chars) was shortest; A was 73 chars.
- **Fix:** Shortened A from "Only `app-config` is returned because `resourceNames` filters the listing" to "Only `app-config` is returned because `resourceNames` filters the list". Expanded B (correct) from "The request returns 403 Forbidden because `list` is required" to "The request returns 403 Forbidden because the `list` verb is required".

### s05-q022 (structural giveaway - LOW)
- **Problem:** Correct option B had a unique 3-comma structure.
- **Fix:** Simplified B (correct) from "A policy with `podSelector: {}`, `policyTypes: [Ingress]`, and no `ingress` field" to "A policy with `podSelector: {}` and `policyTypes: [Ingress]` but no ingress rules".

### s05-q033 (length-balance - LOW)
- **Problem:** Wrong option B was 78 chars; others were 63-65 chars.
- **Fix:** Shortened B from "`apiserver_audit_event_total` filtered with the stage label `ResponseComplete`" to "`apiserver_audit_event_total` filtered by stage `ResponseComplete`".

### s05-q007 (length-balance - LOW)
- **Problem:** Wrong option C was 78 chars; others were 63-71 chars.
- **Fix:** Shortened C from "Nothing, because ClusterRoles are only valid when bound by ClusterRoleBindings" to "Nothing, because a ClusterRole needs a ClusterRoleBinding to work".

### s05-q052 (length-balance - LOW)
- **Problem:** Wrong option D was 77 chars; others were 63-67 chars.
- **Fix:** Shortened D from "Each authenticator is assigned to specific API groups and evaluated per-group" to "Each authenticator is assigned to specific API groups for evaluation".
