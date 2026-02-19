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
