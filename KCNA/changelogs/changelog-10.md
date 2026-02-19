# Round 36 Review - Set 10

**Date:** 2026-02-19
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 26 across 26 questions

## Non-label fixes (5)

### s10-q007 (accuracy)
- **Explanation:** Corrected SizeMemoryBackedVolumes timeline from "GA since 1.32" to "beta (enabled by default) in 1.22, and GA in 1.28".

### s10-q042 (giveaway)
- **Option C (correct):** Rephrased from "three failures occur but the first probe runs at time 0, so it only takes 2 additional intervals total" to "three consecutive failed probes at 5-second intervals complete the failureThreshold at time T=10". Removes the explanatory reasoning that acted as a giveaway.

### s10-q045 (explanation)
- **Option D explanation:** Changed from "BestEffort pods are evicted first during memory pressure, then Burstable, then Guaranteed; the order in option D is reversed" to "The eviction order is BestEffort first, then Burstable, then Guaranteed last; option D reverses the positions of BestEffort and Guaranteed". Clarifies exactly what is wrong with the option.

### s10-q068 (explanation)
- **Option C explanation:** Changed from "RemoveDuplicates handles pods from the same ReplicaSet on the same node, which is exactly this scenario; it does apply here" to "RemoveDuplicates does handle pods from the same ReplicaSet on the same node -- and in this scenario there ARE 2 replicas on one node, so it does take action; option C incorrectly concludes it does nothing". Clarifies the contradiction in option C.

### s10-q100 (length-balance/giveaway)
- **Option A:** Expanded from ~96 to ~110 chars. Added specificity about logging, metrics, and tracing.
- **Option D (correct):** Shortened from ~107 to ~85 chars. Removed "observability-driven response like Keptn" detail, replacing with "closed-loop remediation".

## Label scrambling fixes (21)

Options were reordered so labels match array positions (A=index 0, B=index 1, C=index 2, D=index 3). Answer indices updated accordingly.

### s10-q005
- **Before:** D, B, C, A (answer: 0 -> "D."). **After:** A, B, C, D (answer: 3 -> "D.").

### s10-q009
- **Before:** A, D, C, B (answer: 1 -> "D."). **After:** A, B, C, D (answer: 3 -> "D.").

### s10-q016
- **Before:** A, D, C, B (answer: 0 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q017
- **Before:** D, B, C, A (answer: 3 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q021
- **Before:** B, A, C, D (answer: 1 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q025
- **Before:** D, B, C, A (answer: 3 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q028
- **Before:** B, A, C, D (answer: 0 -> "B."). **After:** A, B, C, D (answer: 1 -> "B.").

### s10-q030
- **Before:** D, B, C, A (answer: 3 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q036
- **Before:** C, B, A, D (answer: 0 -> "C."). **After:** A, B, C, D (answer: 2 -> "C.").

### s10-q038
- **Before:** A, D, C, B (answer: 3 -> "B."). **After:** A, B, C, D (answer: 1 -> "B.").

### s10-q040
- **Before:** B, A, C, D (answer: 0 -> "B."). **After:** A, B, C, D (answer: 1 -> "B.").

### s10-q044
- **Before:** A, B, D, C (answer: 3 -> "C."). **After:** A, B, C, D (answer: 2 -> "C.").

### s10-q045
- **Before:** C, B, A, D (answer: 2 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q046
- **Before:** A, B, D, C (answer: 3 -> "C."). **After:** A, B, C, D (answer: 2 -> "C.").

### s10-q053
- **Before:** B, A, C, D (answer: 1 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q056
- **Before:** A, C, B, D (answer: 1 -> "C."). **After:** A, B, C, D (answer: 2 -> "C.").

### s10-q058
- **Before:** A, D, C, B (answer: 1 -> "D."). **After:** A, B, C, D (answer: 3 -> "D.").

### s10-q067
- **Before:** A, B, D, C (answer: 3 -> "C."). **After:** A, B, C, D (answer: 2 -> "C.").

### s10-q069
- **Before:** D, B, C, A (answer: 3 -> "A."). **After:** A, B, C, D (answer: 0 -> "A.").

### s10-q073
- **Before:** B, A, C, D (answer: 0 -> "B."). **After:** A, B, C, D (answer: 1 -> "B.").

### s10-q091
- **Before:** B, A, C, D (answer: 0 -> "B."). **After:** A, B, C, D (answer: 1 -> "B.").
