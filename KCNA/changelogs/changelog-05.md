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
