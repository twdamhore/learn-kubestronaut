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

---

# Round 37 Review - Set 10

**Date:** 2026-02-19
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 9 across 9 questions

## Fixes

### s10-q022 (length-balance/giveaway)
- **Option A (correct):** Shortened from recipe-like detail to concise form. Changed from "Disable `automountServiceAccountToken` and use a projected volume with `serviceAccountToken` source, `expirationSeconds: 3600`, and the API audience" to "Disable automount and use a projected volume with `serviceAccountToken` source specifying 3600-second expiration".
- **Option B:** Expanded to balance lengths. Changed from "Use a TokenRequest API call from an init container to generate a short-lived token, store it in a shared `emptyDir`, and read it from the app container" to "Use a TokenRequest API call from an init container to generate a 1-hour token, store it in a shared `emptyDir` volume, and read it from the main app container".

### s10-q047 (length-balance/giveaway)
- **Option D (correct):** Expanded from shortest option. Changed from "The API server reads the `v1alpha1` object from etcd, calls the conversion webhook to convert it, and returns `v1beta1`" to "The API server reads the `v1alpha1` object from etcd, invokes the conversion webhook to transform it to the requested version, and returns `v1beta1`".
- **Option A:** Trimmed. Changed from "The API server bypasses the conversion webhook and reads the `v1alpha1` object from etcd, returning it directly since both versions are listed in the CRD spec" to "The API server bypasses the conversion webhook and reads the `v1alpha1` object from etcd, returning it directly as-is".

### s10-q062 (length-balance/giveaway)
- **Option D (correct):** Trimmed from longest with two strategies mentioned. Changed from "Move dev workloads to spot/preemptible nodes using `taints` and tolerations, and right-size resource requests based on VPA recommendations for each workload" to "Move dev workloads to spot/preemptible nodes using taints and tolerations, and right-size requests using VPA recommendations".
- **Option C:** Expanded. Changed from "Set ResourceQuotas in development namespaces to cap total CPU requests at 30% of current levels and add `LimitRange` with strict `max` constraints on pods" to "Set ResourceQuotas in development namespaces to cap total CPU requests at 30% of current levels and add `LimitRange` with strict `max` constraints on all pod containers".

### s10-q020 (length-balance/giveaway)
- **Option A (correct):** Shortened from longest with embedded rationale. Changed from "The pod's `ndots:5` setting causes the resolver to try search-domain expansion for the FQDN because it has only 4 dots, which is less than ndots" to "The pod's `ndots:5` setting causes search-domain expansion for the FQDN because the name has fewer than 5 dots".
- **Option C:** Expanded. Changed from "...does not include `team-b` in its allowed zone list" to "...does not include `team-b` in its allowed namespace zone list".
- **Option D:** Expanded. Changed from "...matches the forward plugin catch-all rule" to "...matches the forward plugin's catch-all upstream rule".

### s10-q074 (giveaway)
- **Option A (correct):** Removed explicit calculation that acted as giveaway. Changed from "KEDA calculates 50 replicas (500 messages / 10 per replica), but the `maxReplicaCount` caps the result at 20" to "KEDA calculates 50 desired replicas, but the `maxReplicaCount` caps the actual target at 20".
- **Option D:** Added calculation detail to balance. Changed from "KEDA computes 50 replicas but scales to 20 in a single step, then pauses scaling until the next evaluation run" to "KEDA computes 50 replicas (500 / 10 threshold), scales to 20 in a single step, then pauses until the next evaluation run".

### s10-q027 (explanation accuracy)
- **Option B explanation:** Corrected inaccurate claim about container network namespace. Changed from "TCP TIME_WAIT between restarts of the same container is unlikely because the container network namespace is recreated" to "TCP TIME_WAIT on hostNetwork is possible but resolves within seconds; persistent EADDRINUSE on every restart points to a different process or pod occupying the port".

### s10-q001 (accuracy)
- **Explanation:** Added caveat about StatefulSetAutoDeletePVC feature. Appended after the sentence about StorageClass reclaimPolicy: "Note: since Kubernetes 1.27+, the `persistentVolumeClaimRetentionPolicy` field in the StatefulSet spec can change this default behavior, but the default policy (`Retain`) preserves PVCs on scale-down."

### s10-q043 (giveaway)
- **Option A (correct):** Restructured to remove embedded reasoning. Changed from "IPVS round-robin is per-connection, not per-packet; the NAT gateway reuses connections, skewing pod distribution" to "IPVS round-robin distributes per-connection; the NAT gateway's persistent connections concentrate traffic on a subset of pods".
- **Option B:** Added detail. Changed from "IPVS in `rr` mode has a warmup period favoring the first registered backend until all backends receive at least one connection" to "IPVS in `rr` mode has a warmup period that favors the first registered backend endpoint until all backends receive at least one initial connection".

### s10-q084 (giveaway)
- **Option A:** Added comparable security detail to match correct answer's specificity. Changed from "No, `get`/`list`/`watch` only provide read access; the user cannot modify or delete secrets, so it is significantly less privileged than cluster-admin" to "No, `get`/`list`/`watch` only provide read access to secret metadata; the user cannot modify, delete, or escalate privileges via secrets".

---

# Round 38 Review - Set 10

**Date:** 2026-02-19
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s10-q004 (clarity)
- **Question text:** Added "but the existing pod on that node has not yet been evicted" to remove ambiguity about topology calculations.

### s10-q037 (giveaway/length-balance)
- **Option A:** Added comparable detail ("without delay", "to 2 of 6"). **Option D (correct):** Slightly trimmed.

### s10-q039 (explanation quality)
- **Option A explanation:** Now addresses the incorrect claim about deletions being unaffected.

### s10-q042 (formatting)
- **Option C:** Changed double dash `--` to em dash `—` for consistency.

### s10-q066 (explanation quality)
- **Option A explanation:** Now acknowledges page cache in cgroup memory and explains why worker processes point to child process memory.

### s10-q088 (accuracy)
- **Question text:** Added Cilium `io.cilium/global-service: "true"` annotation to justify global sharing behavior.

### s10-q097 (explanation quality)
- **Option A explanation:** Clarified that default-deny only applies to explicitly listed policyTypes, not all directions.
