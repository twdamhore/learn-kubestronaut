# Round 36 Review - set-04.js

**Date:** 2026-02-19
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 7

## Changes

### 1. s04-q020 (explanation)
- **Type:** Explanation did not address the actual option text
- **Problem:** Explanation for option D said "The pod does not crash due to /etc being protected" but option D is about read-only access from default securityContext restrictions.
- **Fix:** Changed explanation for D to: "There are no default securityContext restrictions that force hostPath mounts to read-only; hostPath volumes are read-write by default unless explicitly configured otherwise."

### 2. s04-q026 (explanation)
- **Type:** Explanation did not address the actual option text
- **Problem:** Explanation for option D said "PVCs can and must include a storageClassName field" but did not address D's claim that the PV capacity must also equal the PVC request.
- **Fix:** Changed explanation for D to: "The PV capacity does not need to exactly equal the PVC request; a PV with capacity greater than or equal to the PVC request is a valid match."

### 3. s04-q031 (explanation)
- **Type:** Explanation did not address the actual option text
- **Problem:** Explanation for option C said "Horizontal scaling is possible with RWX storage" but did not address C's claim about the scheduler transparently creating separate RWO PV copies.
- **Fix:** Changed explanation for C to: "The scheduler does not transparently create separate copies of a ReadWriteOnce PV for each pod; a single RWO PV can only be mounted on one node at a time."

### 4. s04-q049 (length-balance)
- **Type:** Option length imbalance between B (147 chars) and C (97 chars)
- **Problem:** 52% character count difference between options B and C.
- **Fix:** Shortened option B by removing "standard" and "function" qualifiers; padded option C by adding "automatically" and "running" to narrow the gap.

### 5. s04-q068 (explanation)
- **Type:** Explanation did not address the actual option text
- **Problem:** Explanation for option D said "RWO PVs can be moved between nodes" but did not address D's specific claim about CSI driver requiring graceful unmount.
- **Fix:** Changed explanation for D to: "The Multi-Attach error is caused by a stale VolumeAttachment object, not a CSI driver design requirement for graceful unmount; the old node was rebooting and could not perform a graceful detach."

### 6. s04-q087 (explanation)
- **Type:** Explanation did not address the actual option text
- **Problem:** Explanation for option A said "StatefulSet pod logs differ per replica" but did not address A's claim about log collectors stripping ordinal information.
- **Fix:** Changed explanation for A to: "Log collectors do not strip ordinal information; they preserve the full pod name (including ordinal) as metadata, which is essential for filtering and correlating logs by replica."

### 7. s04-q098 (accuracy)
- **Type:** Missing clarity on alpha feature status
- **Problem:** The `maxUnavailable` feature for StatefulSets is alpha and gated behind `MaxUnavailableStatefulSet`, but this was not clearly stated upfront.
- **Fix:** Added a prominent note at the beginning of the explanation: "Note: `maxUnavailable` for StatefulSets is an alpha feature (as of Kubernetes 1.32) gated behind the `MaxUnavailableStatefulSet` feature gate, which is disabled by default."

---

# Round 37 Review - set-04.js

**Date:** 2026-02-19
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 8

## Changes

### 1. s04-q018 (giveaway)
- **Type:** Correct answer lists 3 debugging sources, wrong options list 1 each
- **Problem:** Option B ("Check only the Elasticsearch application logs inside the container for `IOException` stack trace details") was too obviously wrong with the word "only" and a single source.
- **Fix:** Changed option B to: "Check Elasticsearch application logs, JVM heap dumps, and container restart counts for storage errors". Updated B explanation to: "Application-level diagnostics like logs and heap dumps do not reveal infrastructure storage failures at the CSI or kubelet layer."

### 2. s04-q042 (giveaway)
- **Type:** Wrong options are absurdly implausible
- **Problem:** Option B ("It reduces storage costs by compressing and deduplicating all events into a single compacted record") was obviously wrong.
- **Fix:** Changed option B to: "It simplifies rollback by letting any service independently revert to a prior state without coordination". Updated B explanation to: "Event Sourcing does not enable independent uncoordinated rollback; reversing state requires compensating events that must be applied in sequence."

### 3. s04-q045 (accuracy)
- **Type:** Dimensionally nonsensical Prometheus expression
- **Problem:** Option C had `node_filesystem_size_bytes - node_filesystem_free_bytes > 0.9` which compares bytes to a fraction (0.9), making no dimensional sense.
- **Fix:** Changed option C to: "`(node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes > 0.9` (per node)". Updated C explanation to: "This ratio measures node-level filesystem utilization, not per-PV disk usage; PV monitoring requires kubelet_volume_stats metrics."

### 4. s04-q055 (length-balance)
- **Type:** Option A (142 chars) significantly longer than others (104-113 chars)
- **Problem:** Option A was too long compared to the other options.
- **Fix:** Shortened option A from "Managed database services are typically more cost-effective than self-hosted databases, making cost the primary factor favoring managed options" to: "Managed services are always cheaper than self-hosted databases, making cost the deciding factor."

### 5. s04-q065 (giveaway)
- **Type:** Correct answer is the only nuanced option; wrong options are simplistic
- **Problem:** Option A ("Prioritize the cheapest storage option to minimize infrastructure costs even if performance differs") was too obviously wrong.
- **Fix:** Changed option A to: "Balance cost against performance by defaulting to the cheapest storage tier that meets baseline SLAs". Updated A explanation to: "Defaulting to the cheapest tier ignores I/O patterns and durability requirements that vary significantly across workloads."

### 6. s04-q079 (giveaway)
- **Type:** Wrong options use extreme/absolute language
- **Problem:** Option A ("Saga eliminates the need for any form of data consistency guarantees across distributed service boundaries") used absolute language making it an obvious throwaway.
- **Fix:** Changed option A to: "Saga provides strong consistency by coordinating writes across services through a central transaction broker". Updated A explanation to: "Saga provides eventual consistency, not strong consistency; there is no central broker coordinating writes across services."

### 7. s04-q036 (explanation)
- **Type:** Explanation does not explicitly state that B reverses the relationship
- **Problem:** Option B explanation ("Longhorn primarily provides ReadWriteOnce block volumes; RWX support is secondary via NFS") did not call out that option B reverses the primary/secondary relationship.
- **Fix:** Changed B explanation to: "Option B reverses the relationship; Longhorn primarily provides ReadWriteOnce block storage, with ReadWriteMany as a secondary capability exposed through an NFS layer."

### 8. s04-q082 (giveaway)
- **Type:** Correct answer has 3 precise K8s terms; wrong options have weak setups
- **Problem:** Option A ("A Deployment with 1 replica running the migration container that restarts if the script fails on error") lacked specific Kubernetes terminology.
- **Fix:** Changed option A to: "A Deployment with `replicas: 1` and `restartPolicy: Always` that retries the migration on container failure."

---

# Round 38 Review - Set 04

**Date:** 2026-02-19
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 9 across 9 questions

## Changes

### s04-q045 (length-balance)
- **Option B:** Expanded metric name to full `kube_pod_container_resource_requests`. **Option C:** Removed `(per node)` suffix.

### s04-q044 (length-balance)
- **Option D:** Shortened from ~118 to ~85 chars.

### s04-q013 (accuracy)
- **Explanation:** Updated OpenEBS from "CNCF sandbox" to "CNCF incubating" (promoted Aug 2024).

### s04-q056 (length-balance)
- **Option B:** Shortened from ~123 to ~100 chars.

### s04-q046 (length-balance)
- **Option A:** Expanded from ~80 to ~108 chars.

### s04-q069 (explanation)
- **Option C explanation:** Added reasoning about node-level image caching.

### s04-q098 (accuracy)
- **Explanation:** Updated maxUnavailable from "alpha (disabled by default)" to "beta (enabled by default) since K8s 1.31".

### s04-q041 (length-balance)
- **Option D:** Shortened from ~128 to ~96 chars.

### s04-q011 (length-balance)
- **Option B:** Shortened from ~128 to ~107 chars.

---

# Round 39 Review - Set 04

**Date:** 2026-02-21
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 10 across 10 questions

## Changes

### s04-q006 (length-balance - MEDIUM)
- **Option C (correct):** Expanded from ~88 to ~102 chars by adding ", accessed via configuration and".
- **Option D:** Shortened from ~114 to ~79 chars by trimming to "primary data strategy" and "entirely".

### s04-q025 (length-balance - MEDIUM)
- **Option D (correct):** Expanded by adding "A records" suffix to match other option lengths.
- **Option B:** Trimmed from ~111 to ~104 chars by removing "direct" from "each pod gets a direct cluster-level DNS entry".

### s04-q055 (giveaway - MEDIUM)
- **Option A:** Added comma list "for compute, storage, and networking" to match the comma-list pattern in correct option B.

### s04-q068 (length-balance - MEDIUM)
- **Option D:** Shortened from ~121 to ~99 chars by restructuring the sentence to lead with "The CSI driver".

### s04-q075 (length-balance - MEDIUM)
- **Option A (correct):** Expanded from ~88 to ~97 chars by adding "entire" and "individual".
- **Option B:** Shortened from ~111 to ~96 chars by trimming "preserving data independently" to "from the cluster".

### s04-q031 (length-balance - LOW-MEDIUM)
- **Option C:** Shortened from ~133 to ~96 chars by removing "Horizontal scaling requires" prefix.

### s04-q086 (length-balance - LOW-MEDIUM)
- **Option B:** Shortened from ~121 to ~104 chars by replacing "NFS export volumes" with "NFS volumes" and "permissions" with "access".

### s04-q045 (length-balance - LOW-MEDIUM)
- **Option A (correct):** Added "(per PV)" suffix to balance against other options that have parenthetical suffixes.

### s04-q036 (length-balance - LOW-MEDIUM)
- **Option B:** Shortened from ~122 to ~108 chars by removing "provisioning" from the sentence.

### s04-q042 (length-balance - LOW-MEDIUM)
- **Option A:** Trimmed from ~117 to ~99 chars by removing "for each read" suffix.
- **Option D (correct):** Expanded from ~99 to ~107 chars by changing "full" to "complete" and adding "full" before "state reconstruction".

---

# Round 40 Review - Set 04

**Date:** 2026-02-21
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 19 across 16 questions

## Changes

### s04-q006 (length-balance)
- **Option A:** Expanded from ~95 to ~106 chars by adding "persistent" before "data".
- **Option C (correct):** Trimmed from ~120 to ~113 chars by changing "accessed via configuration and swapped" to "configured via URLs and swapped".
- **Option D:** Expanded from ~97 to ~100 chars by restructuring to "and avoid reliance on external backing services".

### s04-q020 (length-balance)
- **Option A (correct):** Expanded from ~97 to ~109 chars by adding "potentially" before "enabling".
- **Option B:** Trimmed from ~115 to ~101 chars by removing "the" before "read-only" and "for node configuration" to "for the node".
- **Option D:** Trimmed from ~114 to ~107 chars by removing "mounts" at the end.

### s04-q023 (length-balance)
- **Option A:** Trimmed from ~119 to ~97 chars by removing "all" and "by the controller".

### s04-q043 (length-balance)
- **Option B:** Changed "before the PVC exists" to "before the PVC is created" (94 chars, no change).
- **Option C:** Trimmed from ~114 to ~95 chars by removing "acts as a node-level selector" prefix, rephrasing.

### s04-q045 (length-balance)
- **Option B:** Added "(per pod)" suffix to balance parenthetical pattern across options.
- **Option D:** Changed "(per pod)" to "(per container)" for accuracy (container_memory metrics are per-container).

### s04-q049 (length-balance)
- **Option B:** Trimmed from ~129 to ~119 chars by removing comma and "pod templates" to "pods".
- **Option C:** Trimmed from ~119 to ~114 chars by removing "down" from "scale down".
- **Option D:** Trimmed from ~126 to ~112 chars by changing "additional" to "extra" and "function pods" to "pods".

### s04-q052 (giveaway)
- **Option B:** Changed from "Registering the CSI driver with the Kubernetes API server using the node-driver-registrar sidecar" to "Registering the CSI driver with the kubelet (via the registration socket) using the node-driver-registrar" to add parenthetical structure matching correct answer D, breaking the unique parenthetical giveaway.
- **Explanation B:** Updated "API server" to "kubelet" to match revised option text.

### s04-q074 (giveaway)
- **Option C:** Changed from "The total number of PVCs that have been created since the cluster was first started and initialized" to "The total number of PVCs created since cluster initialization (cumulative counter per namespace)" to add parenthetical structure matching correct answer B, breaking the unique parenthetical giveaway.

### s04-q078 (giveaway)
- **Option B:** Changed from "...immediately because etcd has lost all quorum members" to "...immediately; etcd has lost all quorum members" to add semicolon matching correct answer A, breaking the unique semicolon giveaway.

### s04-q093 (length-balance + giveaway)
- **Option A:** Expanded from ~99 to ~103 chars by adding "each" before "update".
- **Option B:** Trimmed from ~109 to ~103 chars and restructured; added "(initial plus 8 updates)" parenthetical to break unique parenthetical in correct answer C.
- **Option C (correct):** Changed parenthetical format from "(...)" to colon format "...: 5 historical plus the current" to reduce giveaway signal. Trimmed from ~109 to ~109 chars.
- **Option D:** Expanded from ~94 to ~107 chars by adding "instead" at end.

### s04-q095 (giveaway)
- **Option A:** Changed from "...for manual cleanup by a cluster administrator at a later time" to "...for manual cleanup (e.g., removing the claimRef) by an admin" to add parenthetical structure matching correct answer B, breaking the unique parenthetical giveaway.

### s04-q053 (giveaway)
- **Option C:** Added semicolon by changing "because they are below the partition value" to "; pods at or above the partition keep the old revision" to break unique semicolon in correct answer B.

### s04-q063 (giveaway)
- **Option D:** Added semicolon by changing "does not have RBAC permissions to delete PVCs so they remain" to "lacks RBAC permissions to delete PVCs; they remain in the namespace" to break unique semicolon in correct answer B.

### s04-q076 (giveaway)
- **Option B:** Added semicolon by changing "as soon as that specific PVC object is first created" to "; deletion is triggered when the referenced PVC is created" to break unique semicolon in correct answer A.

### s04-q083 (giveaway)
- **Option B:** Added semicolon by changing "in reverse ordinal order as part of the standard rolling update" to "in reverse ordinal order; each waits for readiness before proceeding" to break unique semicolon in correct answer A.

### s04-q098 (length-balance)
- **Option B (correct):** Trimmed from ~119 to ~102 chars by changing "allows two pods to be updated simultaneously during the rollout" to "allows two pods to be updated at the same time".

### s04-q100 (giveaway)
- **Option D:** Added semicolon by changing "indefinitely using exponential backoff until" to "with exponential backoff; it keeps retrying until" to break unique semicolon in correct answer B.
