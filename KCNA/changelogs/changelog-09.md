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

---

# Round 37 Review - Set 09

**Date:** 2026-02-19
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 8 across 8 questions

## Changes

### s09-q010 (length-balance/giveaway)
- **Option A (correct):** Trimmed from ~117 to ~101 chars. Changed "unavailable and prevent cascading failures" to "unavailable or unresponsive".
- **Option C:** Expanded slightly. Added "upstream" before "services".

### s09-q025 (length-balance residual)
- **Option B (correct):** Trimmed from ~132 to ~111 chars. Replaced "to the DaemonSet's Pod template spec so it can be scheduled on the tainted node" with "so the DaemonSet Pod is permitted onto the tainted node".
- **Option C:** Expanded slightly. Changed "to trigger rescheduling" to "to force a rescheduling pass".

### s09-q036 (giveaway)
- **Option C (correct):** Trimmed. Replaced "implementing the CRI via containerd shims" with "remaining compatible with the CRI" to reduce unique technical detail in the correct answer.
- **Option B:** Expanded slightly. Added "all" before "system calls".

### s09-q035 (explanation)
- **Option B explanation:** Clarified restartPolicy behavior. Now explains both restartPolicy: Never (kubelet does not restart; Job controller creates new Pod) and restartPolicy: OnFailure (kubelet restarts in-place; Job controller still tracks completions).

### s09-q074 (length-balance)
- **Option A:** Trimmed from ~154 to ~119 chars. Removed "directly" and "volume binding configuration" shortened to "binding".
- **Option D:** Trimmed from ~144 to ~130 chars. Changed "during the handoff to the main container" to "during container handoff".

### s09-q079 (length-balance)
- **Option A:** Trimmed from ~125 to ~93 chars. Removed "significantly" and "and compressed".
- **Option B:** Expanded from ~97 to ~104 chars. Added "log formats" after "plain text".

### s09-q095 (length-balance residual)
- **Option C:** Expanded from ~86 to ~112 chars. Changed "cannot be applied to Pods" to "cannot be applied to namespace-scoped resources like Pods".
- **Option D (correct):** Slightly trimmed. Changed "only labels support selection" to "labels are required for selection".

### s09-q098 (giveaway)
- **Option B:** Added "with exponential backoff" to make B also conditional/nuanced, reducing the giveaway that A was the only non-absolute option.
