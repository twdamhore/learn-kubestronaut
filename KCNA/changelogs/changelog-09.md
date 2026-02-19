# Round 36 Review - Set 09

**Date:** 2026-02-19
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 14 across 13 questions

## Changes

### s09-q005 (length-balance)
- **Option A:** Trimmed from 133 to ~92 chars. Removed verbose phrasing about annotated targets.
- **Option D (correct):** Expanded from 95 to ~101 chars. Added "metrics" before "port" for clarity.

### s09-q006 (length-balance)
- **Option C:** Shortened from 149 to ~101 chars. Removed redundant phrasing about "separate third-party integration" and "repository change detection".
- **Option D:** Expanded from 84 to ~97 chars. Added "specification" to the end.

### s09-q025 (length-balance)
- **Option B (correct):** Expanded from 89 to ~113 chars. Added "so it can be scheduled on the tainted node" for context.
- **Option C:** Trimmed from 127 to ~95 chars. Removed the repeated full taint name.

### s09-q047 (length-balance/giveaway)
- **Option A:** Added DNS example (`cassandra.database.svc.cluster.local`) to match the specificity of the correct answer.
- **Option B:** Added "in CoreDNS" for specificity and reworded slightly.
- **Option C:** Added `clusterIP: None` reference for specificity.
- **Option D (correct):** Removed the long DNS example to reduce from 142 to ~97 chars. All options now have comparable detail.

### s09-q048 (explanation)
- **Option A explanation:** Changed from "without it the Pod would be rejected by the ResourceQuota" to "the Pod would not run without a CPU limit only if a ResourceQuota were also present" since no ResourceQuota is mentioned in the question.

### s09-q058 (length-balance)
- **Option B (correct):** Expanded from 88 to ~100 chars. Added "in the Pod spec" for completeness.

### s09-q062 (length-balance)
- **Option C:** Shortened from 135 to ~92 chars. Removed "primarily cache the latest tag and" and "reliably".

### s09-q073 (length-balance)
- **Option D (correct):** Expanded from 84 to ~100 chars. Changed "only supports" to "volumes only support" and "not" to "and cannot satisfy".

### s09-q080 (length-balance/giveaway)
- **Option A:** Expanded from 115 to ~126 chars. Added ", and the API server persists it in etcd" for more (incorrect) detail.
- **Option C:** Expanded from 124 to ~130 chars. Added ", starts containers" for more (incorrect) detail.
- **Option D:** Expanded from 126 to ~130 chars. Added "to create Pods" and "state" for more (incorrect) detail.

### s09-q081 (length-balance)
- **Option D:** Expanded from 76 to ~92 chars. Added "in the Flux dashboard" and changed "being" to "it can be".

### s09-q093 (length-balance)
- **Option A:** Trimmed from 142 to ~98 chars. Removed "for Kafka and other sources" and "they should not be configured for the same workload" phrasing.

### s09-q093 (explanation)
- **Option A explanation:** Revised from "KEDA does not run an independent scaling loop separate from HPA" to a more accurate statement acknowledging that KEDA handles 0-to-1 scaling independently while using HPA for 1-to-N scaling.

### s09-q095 (length-balance)
- **Option C:** Trimmed from 129 to ~82 chars. Removed verbose "and are not available on namespace-scoped resources like individual".
- **Option D (correct):** Expanded from 95 to ~109 chars. Added "non-identifying" before "metadata".
