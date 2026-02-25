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

---

# Round 39 Review - Set 10

**Date:** 2026-02-21
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 9 across 9 questions

## Changes

### s10-q022 (length-balance)
- **Option A (correct):** Expanded from 112 to 139 chars. Added "and the pod's API audience" for technical accuracy and length.
- **Option B:** Trimmed from 158 to 153 chars. Changed "main app container" to "app container".

### s10-q047 (length-balance)
- **Option A:** Expanded from 117 to 138 chars. Changed "returning it directly as-is" to "returning it directly without version conversion".
- **Option B:** Trimmed from 141 to 141 chars (minor wording). Changed "was updated" to "was changed".
- **Option D (correct):** Expanded from 121 to 137 chars (was R37 overcorrection). Changed to "invokes the conversion webhook to transform it to `v1beta1`, and returns the result".

### s10-q062 (length-balance)
- **Option C:** Trimmed from 168 to 154 chars. Changed "on all pod containers" to "on pods".
- **Option D (correct):** Expanded from 124 to 158 chars. Changed to "right-size resource requests based on VPA recommendation data for each workload".

### s10-q074 (length-balance)
- **Option A (correct):** Expanded from 91 to 115 chars. Added "from the metric" for context.
- **Option B:** Expanded from 107 to 117 chars. Added "the" and "limit" for naturalness.
- **Option D:** Trimmed from 120 to 107 chars. Removed "(500 / 10 threshold)" calculation detail.

### s10-q100 (length-balance)
- **Option A:** Trimmed from 138 to 135 chars. Changed "is not recognized" to "is not counted".
- **Option D (correct):** Expanded from 102 to 132 chars. Added "criteria" and changed to "closed-loop observability-driven remediation".

### s10-q087 (length-balance)
- **Option A:** Trimmed from 154 to 143 chars. Removed "containers" for conciseness.
- **Option D (correct):** Expanded from 123 to 136 chars. Added "phase" and changed "deletion" to "manual deletion".

### s10-q054 (length-balance)
- **Option B (correct):** Expanded from 117 to 121 chars. Added "available" for clarity.
- **Option D:** Trimmed from 141 to 116 chars. Removed ", blocking all scheduling" clause.

### s10-q080 (polarity giveaway)
- **All options:** Removed leading "Yes"/"No" polarity pattern that made the lone "No" answer (B) stand out. Options A and C reworded from "Yes, ..." to declarative statements. Option B reworded from "No, ..." to "The snapshot is only crash-consistent".

### s10-q029 (length-balance)
- **Option B:** Trimmed from 138 to 129 chars. Removed "by users" at end.
- **Option C (correct):** Expanded from 115 to 128 chars. Added "all" and "priority" for completeness.

---

# Round 40 Review - Set 10

**Date:** 2026-02-21
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 52 option adjustments across 20 questions

## Changes

### s10-q002 (length-balance)
- **Option B:** Trimmed from 135 to 133 chars. Removed backticks around `RuntimeDefault` or `Localhost`.
- **Option C (correct):** Expanded from 120 to 125 chars. Added "value" for length balance.

### s10-q004 (length-balance)
- **Option B:** Trimmed from 112 to 109 chars. Removed "the" before "skew".
- **Option C:** Trimmed from 115 to 108 chars. Removed "entirely".
- **Option D (correct):** Trimmed from 126 to 114 chars. Shortened "its skew calculation" from "in its skew calculation".

### s10-q012 (length-balance)
- **Option A (correct):** Expanded from 113 to 120 chars. Changed "encryption at rest in etcd" to "etcd encryption at rest for secrets".
- **Option C:** Trimmed from 125 to 123 chars. Removed "a" before "vault".

### s10-q013 (length-balance)
- **Option A:** Expanded from 108 to 113 chars. Added "delay" after "tolerationSeconds".
- **Option C (correct):** Expanded from 107 to 117 chars. Added "the taint" for clarity.

### s10-q017 (length-balance)
- **Option A (correct):** Expanded from 134 to 140 chars. Added "resource" before "with `handler: runsc`".
- **Option B:** Trimmed from 146 to 139 chars. Changed "sandbox runtime" to "sandbox mode".
- **Option C:** Trimmed from 143 to 136 chars. Changed "containerd runtime handler" to "containerd handler".
- **Option D:** Trimmed from 151 to 140 chars. Changed "the kubelet service" to "kubelet".

### s10-q020 (length-balance)
- **Option A (correct):** Expanded from 110 to 121 chars. Changed "has fewer than 5 dots" to "contains fewer than 5 dots total".

### s10-q022 (length-balance)
- **Option A (correct):** Expanded from 139 to 151 chars. Added "and pod binding" for technical detail.
- **Option D:** Trimmed from 155 to 150 chars. Changed "1 hour" to "1h".

### s10-q023 (length-balance)
- **Option A (correct):** Trimmed from 149 to 109 chars. Removed verbose parenthetical detail, shortened to core claim.
- **Option B:** Trimmed from 127 to 116 chars. Changed "even with evictions" to "with evictions".
- **Option C:** Trimmed from 136 to 115 chars. Shortened with abbreviation "PDBs".
- **Option D:** Trimmed from 138 to 115 chars. Simplified phrasing.

### s10-q035 (length-balance)
- **Option A:** Expanded from 108 to 114 chars. Added "fully" for balance.
- **Option B (correct):** Expanded from 113 to 114 chars. Changed "simultaneously" to "together".
- **Option C:** Expanded from 101 to 113 chars. Added "constraints" for specificity.
- **Option D:** Trimmed from 121 to 113 chars. Removed "it" at end.

### s10-q037 (length-balance)
- **Option A:** Trimmed from 139 to 127 chars. Rewording for conciseness.
- **Option B:** Trimmed from 136 to 126 chars. Changed "all running pods to complete before creating new pods" to shorter form.
- **Option D (correct):** Expanded from 120 to 128 chars. Changed "2 of 6" to "2 out of 6".

### s10-q043 (length-balance)
- **Option A (correct):** Expanded from 125 to 132 chars. Added "backend" before "pods".
- **Option B:** Trimmed from 146 to 129 chars. Simplified phrasing.

### s10-q056 (length-balance)
- **Option A:** Expanded from 102 to 115 chars. Added "the quota-compute definition" for specificity.
- **Option D:** Changed em dash to semicolon for consistency.

### s10-q061 (length-balance)
- **Option A (correct):** Expanded from 112 to 116 chars. Added "path" before "prefix".
- **Option B:** Trimmed from 114 to 109 chars. Removed "path" at end.
- **Option D:** Trimmed from 126 to 111 chars. Shortened ending.

### s10-q064 (length-balance)
- **Option A:** Trimmed from 114 to 108 chars. Removed "instance".
- **Option B (correct):** Changed "read-write" to "writable" (117 to 114 chars).
- **Option C:** Changed "first container's" to "that container's" (123 to 121 chars).
- **Option D:** Trimmed from 132 to 118 chars. Removed "for isolation".

### s10-q072 (length-balance)
- **Option A:** Expanded from 113 to 119 chars. Added "set to" before "`Local`".
- **Option B (correct):** Expanded from 111 to 121 chars. Added "on another node" for clarity.
- **Option C:** Trimmed from 131 to 118 chars. Removed "on that node".

### s10-q079 (length-balance)
- **Option D:** Trimmed from 142 to 126 chars. Shortened "between admission requests, not within the same request" to "between admission requests, not within one".

### s10-q083 (length-balance)
- **Option B:** Expanded from 103 to 109 chars. Added "nodes" at end.
- **Option D:** Expanded from 111 to 115 chars. Added "only" at end.

### s10-q088 (length-balance)
- **Option A:** Trimmed from 136 to 118 chars. Changed "over remote endpoints by default in merged services" to "over remote ones by default".
- **Option B (correct):** Expanded from 117 to 126 chars. Added "backend" before "endpoints".

### s10-q095 (length-balance)
- **Option A:** Trimmed from 128 to 119 chars. Removed "overall".
- **Option B (correct):** Expanded from 112 to 122 chars. Added "atomically" for precision.
- **Option C:** Trimmed from 123 to 115 chars. Removed "call" at end.

### s10-q097 (length-balance)
- **Option A:** Trimmed from 141 to 133 chars. Removed "implicitly".
- **Option B (correct):** Expanded from 125 to 131 chars. Added "all" before "egress".
- **Option D:** Expanded from 121 to 129 chars. Changed "cluster default policy" to "cluster-level default policy".

---

# Round 41 Review - Set 10

**Date:** 2026-02-21
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 22 option adjustments across 18 questions

## Changes

### s10-q001 (giveaway — unique semicolon in correct)
- **Option D (correct):** Replaced semicolon with ", and" to match structural pattern of other options. Changed "must be manually deleted; underlying PVs" to "must be manually deleted, and underlying PVs".

### s10-q006 (giveaway — unique semicolon in correct)
- **Option C (correct):** Replaced semicolon with ", and". Changed "is removed; the next request" to "is removed, and the next request".

### s10-q009 (giveaway — unique semicolon in correct)
- **Option A:** Added "the" before "quota" for minor expansion. **Option D (correct):** Replaced semicolon with "and". Changed "are created; the third" to "are created and the third".

### s10-q023 (giveaway — unique parentheticals in correct)
- **Option A (correct):** Removed parenthetical "(s)" from "pod(s)". Changed to "the lowest-priority pods" and "applying" instead of "with".

### s10-q026 (giveaway — unique semicolon in correct + correct shortest)
- **Option A (correct):** Expanded from 106 to 112 chars. Replaced semicolon with ", so". Changed to "One new pod from the surge is created but never becomes Ready, so the 5 old pods keep running".
- **Option B:** Added semicolon to balance structural pattern. Changed to "`maxUnavailable: 0` only prevents old pod deletions".

### s10-q033 (giveaway — unique semicolon in correct)
- **Option D (correct):** Replaced semicolon with ", and". Changed "informer cache; the" to "informer cache, and the".

### s10-q043 (giveaway — unique semicolon in correct + correct longest)
- **Option A (correct):** Replaced semicolon with ", so" and trimmed. Reduced from 133 to ~130 chars.
- **Option B:** Added semicolon to balance. Changed "until all backends receive at least one connection" to "; all other backends wait for initial connections".
- **Option C:** Added ", and" for structural consistency.

### s10-q052 (giveaway — unique semicolon in correct)
- **Option A (correct):** Replaced semicolon with "because". Changed "at `/var/log/app`; the read-only" to "at `/var/log/app` because the read-only".

### s10-q054 (giveaway — unique parentheticals in correct)
- **Option A:** Changed em dash to "because" for structural balance. **Option B (correct):** Removed parenthetical "(one per node)". Changed to "3 replicas are scheduled across the 3 nodes and the 4th remains Pending".

### s10-q058 (giveaway — unique semicolon in correct)
- **Option D (correct):** Replaced semicolon with ", and". Changed "in `kube-system`; only" to "in `kube-system`, and only".

### s10-q063 (giveaway — unique semicolon + unique parentheticals in correct)
- **Option A (correct):** Replaced semicolon with ", while". Kept parentheticals but added matching parens to B and D.
- **Option B:** Added parenthetical "(one batch per cycle)" and semicolon to structurally match correct answer.
- **Option C:** Added semicolon to balance. Changed comma to "; then pods 3 and 4".
- **Option D:** Added parenthetical "(lower and upper)" to balance correct answer's parens.

### s10-q065 (giveaway — unique semicolon in correct)
- **Option B (correct):** Replaced semicolon with ", but". Changed "succeeds; the second" to "succeeds, but the second".

### s10-q080 (giveaway — unique semicolon in correct)
- **Option B (correct):** Replaced semicolon with ", so". Changed "crash-consistent; data" to "crash-consistent, so data".

### s10-q081 (giveaway — unique semicolon in correct)
- **Option C (correct):** Replaced semicolon with ", as". Changed "implementation; the spec" to "implementation, as the spec".

### s10-q082 (giveaway — unique parentheticals in correct)
- **Option A:** Replaced semicolon with ", but" for consistency. **Option D (correct):** Removed parenthetical. Changed "(unique URLs create unique values)" to "because unique URLs create unique label values".

### s10-q087 (giveaway — unique semicolon + unique parentheticals in correct)
- **Option A:** Added parenthetical "(including exit code 0)" to balance D's parens. **Option B:** Added semicolon to balance D's semicolon. Changed "replacement to meet" to "replacement; it must meet".
- **Option D (correct):** Changed "(exit 0 = success)" to "(exit 0 means success)" for naturalness. Semicolon no longer unique since B now has one.

### s10-q088 (length-balance — correct longest)
- **Option A:** Expanded from 112 to 120 chars. Added "always" and "because" for detail. **Option B (correct):** Trimmed from 125 to 121 chars. Changed "backend endpoints" to "backend pods".

### s10-q091 (length-balance — correct shortest, ratio 1.118)
- **Option A:** Trimmed from 142 to 136 chars. Removed "are applied" at end. **Option B (correct):** Expanded from 127 to 133 chars. Changed "which has a sidecar" to "which includes a sidecar".
- **Option D:** Trimmed from 129 to 126 chars. Removed "then" before "the pod".

### s10-q096 (giveaway — unique semicolon in correct)
- **Option B (correct):** Replaced semicolon with ", so". Changed "CI and CD; compromised" to "CI and CD, so compromised".

---

# Round 42 Review - Set 10

**Date:** 2026-02-21
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 15 option adjustments across 10 questions

## Changes

### s10-q015 (backtick density giveaway)
- **Option A:** Added backtick around `WAL` to balance correct answer's backtick density. Changed "Increase Prometheus memory allocation and enable WAL compression" to "Increase Prometheus memory allocation and enable `WAL` compression". Also changed "time series data" to "series data".
- **Option B:** Added backtick around `TSDB` to balance. Changed "to a time-series database" to "to a `TSDB`". Also changed "Switch to a push-based metrics model" to "Switch to a push-based metrics model" (kept) and trimmed "natively" wording.

### s10-q018 (backtick density imbalance — correct A had 8 backticks, D had only 2)
- **Option D:** Added backtick around `SIEM` to increase D's backtick count from 2 to 4, reducing the gap with correct A's 8.

### s10-q027 (length-balance — correct C shortest at 107, ratio 1.093)
- **Option B:** Expanded from 112 to 121 chars. Changed "and the restart is too fast" to "and the restart interval is too fast".
- **Option C (correct):** Expanded from 107 to 111 chars. Changed "another pod on the same node is already bound to port 8080 on the host" to "another pod or host process on the same node is already bound to port 8080".

### s10-q031 (backtick density — D had 0 backticks while correct B had 6)
- **Option D:** Added backtick around `egress` to give D at least 2 backticks, reducing structural imbalance.

### s10-q039 (length-balance — A outlier at 141, correct C shortest at 129)
- **Option A:** Trimmed from 141 to 133 chars. Changed "continue to work normally" to "continue normally".

### s10-q041 (length-balance — correct D shortest at 115 vs C at 126)
- **Option C:** Trimmed from 126 to 122 chars. Changed "before firing during deployments" to "before firing during deploy windows".
- **Option D (correct):** Expanded from 115 to 122 chars. Changed "Add a minimum request rate condition:" to "Add a minimum request rate guard:" and appended "per second".

### s10-q046 (backtick density — correct C had 8, D had only 2)
- **Option D:** Added backticks around `Task` and `params`. Changed "to evaluate each task output and dynamically inject the parameters" to "to evaluate each `Task` output and dynamically inject `params`".

### s10-q069 (length-balance — correct A shortest at 114, D longest at 127, ratio 1.114)
- **Option A (correct):** Expanded from 114 to 118 chars. Changed "succeeds only if" to "succeeds only if the re-pushed image carries a valid cosign signature".
- **Option C:** Expanded from 118 to 126 chars. Changed "at policy creation, not pod admission" to "at policy creation time, not at pod admission".
- **Option D:** Trimmed from 127 to 128 chars. Changed "flags a supply chain risk" to "flags a supply chain issue".

### s10-q073 (length-balance — A outlier at 144, correct B shortest at 131)
- **Option A:** Trimmed from 144 to 126 chars. Removed "via deletion entries" from end.

### s10-q078 (length-balance — correct B shortest at 114, ratio 1.105)
- **Option A:** Trimmed from 126 to 116 chars. Changed "for customer data, using a read-only database connection pool" to "for customer data using a read-only connection pool".
- **Option B (correct):** Expanded from 114 to 120 chars. Changed "in Orders" to "in Orders" and added "domain" before "data models".

### s10-q083 (correct longest at 119 + backtick density giveaway)
- **Option A (correct):** Trimmed from 119 to 113 chars. Changed "still honors" to "honors".
- **Option B:** Added backticks around `zone-b` and `zone-c` to balance A's backtick density. Changed "based solely on" to "based on".
- **Option C:** Added backtick around `DoNotSchedule` to balance backtick density.

---

# Round 43 Review - Set 10

**Date:** 2026-02-21
**File:** `KCNA/data/set-10.js`
**Issues fixed:** 10 option adjustments across 7 questions

## Changes

### s10-q016 (length-balance — C outlier at 156, others ~138, ratio 1.139)
- **Option C:** Trimmed from 156 to 139 chars. Changed "which is below the 100-miss threshold" to "below the 100-miss threshold" and "immediately after" to "once".

### s10-q024 (length-balance — ratio 1.137, A=117 vs D=133)
- **Option A:** Expanded from 117 to 125 chars. Added "cluster" before "routing".
- **Option D:** Trimmed from 133 to 119 chars. Changed "regardless of health check results" to "ignoring health checks".

### s10-q031 (giveaway — unique em-dash in correct B)
- **Option B (correct):** Replaced em-dash with ", so". Changed "form an AND condition — both must match" to "form an AND condition, so both must match".

### s10-q036 (giveaway — unique em-dash in correct C)
- **Option C (correct):** Replaced em-dash with colon. Changed "depends on the Rego policy — if it only" to "depends on the Rego policy: if it only".

### s10-q045 (giveaway — unique "because" in correct A)
- **Option C:** Added "because" to balance. Changed "if actual memory consumption exceeds" to "because actual memory consumption may exceed".

### s10-q052 (giveaway — unique "because" in correct A)
- **Option D:** Added "because" to balance. Changed "which bypasses the read-only constraint" to "because subPath bypasses the read-only constraint".

### s10-q061 (correct A longest at 117 + backtick density imbalance — D had 0 backticks)
- **Option A (correct):** Trimmed from 117 to 112 chars. Changed "the original path `/v2/users`, but `api-v2` expects requests at `/users` without the path prefix" to "the original `/v2/users` path, but `api-v2` expects requests at `/users` without the prefix".
- **Option D:** Added backticks around `/v2/users` and `api-v1` to balance backtick density (0 to 4 backticks).

---

## Round 44 — 2026-02-23
**File**: `set-10.js`
**Issues found**: 3

### s10-q028 — unique colon-enumeration in correct answer
- **Option D:** Added colon-enumeration to balance correct B's unique colon pattern. Changed "to ensure an atomic reversal" to ": lock all resources, then atomically reverse".

### s10-q039 — unique "including" in correct answer
- **Option A:** Added "including" to balance correct C's unique use. Changed "read operations and deletions continue normally" to "read operations including GET and LIST continue normally".

### s10-q084 — unique "including" in correct answer
- **Option B:** Added "including" to balance correct C's unique use. Changed "No, secret values are redacted in `list` and `watch` responses by the API server; only a `get` on a specific secret returns actual encoded data" to "No, secret values including encoded data are redacted in `list` and `watch` responses; only `get` on a specific secret returns the full values".

---

## Round 45 — 2026-02-23
**File**: `set-10.js`
**Issues found**: 4

### s10-q036 — unique structural colon in correct answer
- **Option A:** Added colon to balance correct C's unique structural colon (introduced in R43 when em-dash was changed to colon). Changed "The pod is admitted because Gatekeeper only validates the primary container specifications, not init containers in the pod spec" to "The pod is admitted because Gatekeeper validates only primary containers: init and ephemeral containers are excluded from the check".

### s10-q041 — unique structural colon in correct answer
- **Option A:** Added colon to balance correct D's unique structural colon pattern ("guard: only fire when..."). Changed "Change the alert threshold from 5% to 10% to account for statistical insignificance during low-traffic deployment windows" to "Raise the alert threshold: change from 5% to 10% to account for statistical insignificance during low-traffic deployment windows".

### s10-q044 — accuracy: Kyverno maturity level outdated
- **Explanation:** Changed "Kyverno is a CNCF Incubating project" to "Kyverno is a CNCF Graduated project (graduated July 2024)". Kyverno graduated from CNCF in July 2024.

### s10-q089 — accuracy: Kyverno maturity level outdated
- **Explanation:** Changed "Kyverno (CNCF Incubating)" to "Kyverno (CNCF Graduated)". Same maturity update as q044.

---

## Round 46 — 2026-02-24
**File**: `set-10.js`
**Issues found**: 3

### s10-q007 — unique "like" in correct answer B
- **Option A:** Added "like" to balance correct B's unique use. Changed "The write succeeds but the pod is evicted by the kubelet when it detects the volume exceeds its size limit" to "The write succeeds but the pod is evicted by the kubelet, like an ephemeral storage violation, when size is exceeded".

### s10-q058 — unique "while" in correct answer D
- **Option B:** Added "while" to balance correct D's unique use. Changed "Each instance watches a partitioned subset of namespaces, dividing the workload using consistent hashing strategy" to "Each instance watches a partitioned namespace subset, while other instances handle the remaining namespace partitions".

### s10-q063 — unique "while" in correct answer A
- **Option C:** Added "while" to balance correct A's unique use. Changed "Pods 0, 1, and 2 are updated first; then pods 3 and 4 are updated only once the first group is fully ready" to "Pods 0, 1, and 2 are updated first, while pods 3 and 4 wait; then pods 3 and 4 update once the first group is ready".

---

## Round 47 — 2026-02-25
**File**: `set-10.js`
**Issues found**: 8

### s10-q064 — length-balance (ratio 1.124, A shortest at 105)
- **Option A:** Expanded from 105 to 119 chars. Changed "Each container gets its own full copy of all image layers, consuming 3x the storage of a single container" to "Each container gets its own full copy of all image layers independently, consuming 3x the storage of a single container".

### s10-q080 — length-balance (ratio 1.120, D shortest at 108)
- **Option D:** Expanded from 108 to 121 chars. Changed "which must be set explicitly" to "which must be set explicitly in the class".

### s10-q015 — length-balance (ratio 1.117, B shortest at 120, D longest at 134)
- **Option B:** Expanded from 120 to 128 chars. Changed "directly to a `TSDB` that handles" to "directly to a `TSDB` backend that handles".
- **Option D:** Trimmed from 134 to 128 chars. Changed "and configure recording rules" to "and use recording rules".

### s10-q029 — length-balance (ratio 1.112, D shortest at 116)
- **Option D:** Expanded from 116 to 130 chars. Changed "about an ambiguous default priority class" to "about an ambiguous default priority class configuration".

### s10-q039 — length-balance (ratio 1.101, correct C shortest at 129, A longest at 142)
- **Option A:** Trimmed from 142 to 125 chars. Changed "Only create and update operations on matched resources are blocked; read operations including GET and LIST continue normally in all namespaces" to "Only create and update operations are blocked; read operations including GET and LIST continue normally across all namespaces".

### s10-q044 — length-balance (ratio 1.107, D longest at 145)
- **Option D:** Trimmed from 145 to 141 chars. Changed "and generates resources through its decision log integration" to "and generates resources through decision log integration".

### s10-q045 — length-balance (ratio 1.109, C longest at 132)
- **Option C:** Trimmed from 132 to 126 chars. Changed "actual memory consumption may exceed" to "actual memory usage may exceed".

### s10-q048 — length-balance (ratio 1.103, D shortest at 107)
- **Option D:** Expanded from 107 to 117 chars. Added "hostnames" before "in the default namespace".
