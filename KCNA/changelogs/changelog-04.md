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

---

# Round 41 Review - Set 04

**Date:** 2026-02-21
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 11 across 9 questions

## Changes

### s04-q009 (length-balance)
- **Option B:** Changed "`Deleted`" to "`Archived`" (43->44 chars) to narrow gap with other options.
- **Option C:** Changed "`Available`" (end) to "`Ready`" (50->46 chars) to bring ratio from 1.16 to 1.07.
- **Explanation B/C:** Updated to reference new fake phase names ("Archived", "Ready") instead of old ones.

### s04-q030 (giveaway)
- **Option D:** Added parenthetical "(one port per pod)" to break unique parenthetical in correct answer A. Changed from "that exposes each Cassandra replica on a unique port on every cluster node" to "(one port per pod) exposing each Cassandra replica on every cluster node".

### s04-q053 (length-balance)
- **Option A:** Expanded from 84 to 89 chars by adding "five" before "pods".
- **Option C:** Shortened from 100 to 94 chars by replacing "`pod-0`, `pod-1`, and `pod-2`" with "`pod-0` through `pod-2`". Ratio improved from 1.19 to 1.11.

### s04-q059 (giveaway)
- **Option D:** Changed from "It depends entirely on the StorageClass configuration and its provisioner's binding behavior rules" to "No, unless the StorageClass provisioner explicitly enables multi-PVC binding in its configuration" to break lone "No" polarity giveaway (was 2 Yes + 1 No + 1 neutral; now 2 Yes + 2 No).
- **Explanation D:** Updated to match new option text about StorageClass provisioners.

### s04-q065 (length-balance)
- **Option C:** Expanded from 94 to 99 chars by changing "the trade-off in availability" to "the reduced availability trade-off".
- **Option D:** Shortened from 110 to 102 chars by removing "given" and changing "cloud providers" to "providers". Ratio improved from 1.17 to 1.03.

### s04-q069 (giveaway)
- **Option A:** Added parenthetical "(per claim)" to break unique parenthetical in correct answer B. Changed from "The size of PersistentVolumes that the container can claim from the cluster's available storage pool" to "The size of PersistentVolumes (per claim) that the container can request from the cluster's storage pool".
- **Option D:** Added parenthetical "(medium: Memory)" to further break uniqueness. Changed from "The RAM allocation for tmpfs-backed `emptyDir` volumes mounted inside the container's filesystem" to "The RAM allocation for tmpfs-backed `emptyDir` volumes (medium: Memory) mounted in the container".

### s04-q071 (giveaway)
- **Option D:** Changed from "The scheduler splits the pod's containers across both nodes to satisfy the two volume requirements" to "No, the scheduler detects the conflict and splits the pod's containers across both nodes automatically" to break lone "No" polarity giveaway (was 2 Yes + 1 No + 1 neutral; now 2 Yes + 2 No).

### s04-q073 (accuracy)
- **Question stem:** Changed "a CNCF project" to "an open-source backup tool" because Velero is not formally a CNCF sandbox/incubating/graduated project; it is listed in the CNCF landscape but is maintained by VMware/Broadcom.

### s04-q074 (giveaway)
- **Option C:** Added backtick-quoted term by changing "cumulative counter per namespace" to "per-namespace `counter` metric" to reduce backtick density gap with correct answer B (which has 3 backtick terms).
- **Option D:** Added backtick-quoted term by changing "as reported by the underlying CSI driver" to "as reported by the CSI driver's `volume_stats` endpoint".
- **Explanation C/D:** Updated to match revised option text.

---

# Round 42 Review - Set 04

**Date:** 2026-02-21
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 20 across 17 questions

## Changes

### s04-q003 (giveaway)
- **Option D:** Changed "for example" to "e.g." and added "per replica" suffix to break unique "e.g." pattern in correct answer B and balance length (was 87 chars, now 99).

### s04-q006 (length-balance)
- **Option C (correct):** Trimmed from 113 to 108 chars by removing "code" from "without code changes".
- **Option D:** Expanded from 100 to 104 chars by adding "any" before "reliance". Ratio improved from 1.13 to 1.06.

### s04-q010 (length-balance)
- **Option D (correct):** Expanded from 98 to 108 chars by adding "projected" before "files". Ratio improved from 1.14 to 1.13.

### s04-q013 (length-balance)
- **Option B:** Expanded from 79 to 88 chars by adding "designed" before "for".
- **Option C (correct):** Expanded from 78 to 90 chars by adding "deploys and" before "manages".
- **Option D:** Expanded from 79 to 85 chars by adding "local" before "block volumes". Ratio improved from 1.13 to 1.06.

### s04-q016 (length-balance)
- **Option A:** Trimmed from 117 to 103 chars by removing "automatically" to "is replicated".
- **Option D (correct):** Expanded from 103 to 106 chars by changing "have" to "include". Ratio improved from 1.14 to 1.06.

### s04-q033 (length-balance)
- **Option A:** Expanded from 76 to 87 chars by adding "per volume" suffix.
- **Option B:** Expanded from 74 to 85 chars by adding "per device" suffix. Ratio improved from 1.12 to 1.10.

### s04-q037 (length-balance)
- **Option A (correct):** Expanded from 75 to 81 chars by changing "the request" to "the PVC's request". Ratio improved from 1.11 to 1.02.

### s04-q040 (length-balance)
- **Option A (correct):** Expanded from 95 to 106 chars by adding "explicitly" before "prohibits". Ratio improved from 1.11 to 1.07.

### s04-q041 (length-balance)
- **Option C (correct):** Trimmed from 108 to 103 chars by removing "same" from "the same zone".
- **Option D:** Expanded from 96 to 105 chars by adding "the binding step" instead of "binding". Ratio improved from 1.13 to 1.05.

### s04-q047 (length-balance)
- **Option D:** Expanded from 69 to 80 chars by adding "(exported)" suffix. Ratio improved from 1.13 to 1.10.

### s04-q048 (length-balance)
- **Option C:** Trimmed from 110 to 96 chars by shortening "the disk pressure condition is resolved" to "disk pressure is resolved".
- **Option D (correct):** Expanded from 96 to 102 chars by adding "space" after "disk". Ratio improved from 1.15 to 1.06.

### s04-q053 (length-balance)
- **Option B (correct):** Expanded from 85 to 98 chars by restructuring to "receive the new revision; pods below the partition value keep the old one". Ratio improved from 1.11 to 1.11 (correct moved from shortest to balanced middle).

### s04-q063 (length-balance)
- **Option B (correct):** Expanded from 96 to 106 chars by changing "the pod" to "the replacement pod". Ratio improved from 1.14 to 1.12.

### s04-q065 (giveaway)
- **Option A:** Added comma-list "for compute, storage, and networking" to break unique comma-list pattern in correct answer B. Changed from "cheapest storage tier that meets baseline SLAs" to "cheapest tier for compute, storage, and networking".

### s04-q068 (length-balance)
- **Option C (correct):** Expanded from 97 to 103 chars by adding "stale" before "`VolumeAttachment`". Ratio improved from 1.12 to 1.10.

### s04-q074 (giveaway)
- **Option A:** Added backtick-quoted terms `read_bytes` and `write_bytes` to increase backtick count from 2 to 6, matching correct answer B's backtick density. Changed from "measured in bytes per second from" to "(`read_bytes`, `write_bytes`) of each PVC from".
- **Explanation A:** Updated to reference "read/write byte metrics" instead of "throughput".

### s04-q087 (length-balance)
- **Option B (correct):** Expanded from 101 to 109 chars by adding "storage" before "issues". Ratio improved from 1.11 to 1.09.

---

# Round 43 Review - Set 04

**Date:** 2026-02-21
**File:** `KCNA/data/set-04.js`
**Issues fixed:** 10 across 7 questions

## Changes

### s04-q013 (accuracy)
- **Explanation:** Changed OpenEBS from "CNCF incubating" to "CNCF sandbox project (re-accepted October 2024)". OpenEBS was archived and re-accepted to CNCF sandbox in Oct 2024; it was never promoted to incubating. The Round 38 change was based on incorrect information.

### s04-q018 (giveaway)
- **Option D:** Added backtick-quoted `kube-apiserver` to break unique backtick pattern in correct answer A (was A=2, B=0, C=0, D=0; now A=2, D=2).

### s04-q046 (giveaway)
- **Option A:** Added backtick-quoted `Delete` to break backtick imbalance (was A=0, B=0, C=4, D=2; now A=2, B=2, C=4, D=2). Also trimmed to 95 chars.
- **Option B:** Added backtick-quoted `Archived` to further balance backticks. Trimmed from 109 to 98 chars. Ratio improved from 1.13 to 1.11.

### s04-q067 (giveaway)
- **Option C:** Added backtick-quoted `kubectl delete` to break backtick imbalance (was C=0; now C=2).
- **Option D:** Added backtick-quoted `replicas: 0` to break backtick imbalance (was D=0; now D=2). All four options now have backticks (A=4, B=2, C=2, D=2).

### s04-q068 (giveaway)
- **Option D:** Added backtick-quoted `NodeUnstageVolume` to break unique backtick pattern in correct answer C (was C=2, all others 0; now C=2, D=2). Changed "graceful unmount" to "graceful `NodeUnstageVolume` call".
- **Explanation D:** Updated to reference "missing NodeUnstageVolume call" instead of "graceful unmount".

### s04-q089 (giveaway)
- **Option A:** Added em-dash to break unique em-dash in correct answer C (was only C had em-dash; now A and C both have em-dashes). Restructured from comma-separated to em-dash clause.

### s04-q099 (giveaway)
- **Option A:** Added em-dash and backtick-quoted `gp3` and `iops` to break unique em-dash and reduce backtick density gap in correct answer C (was C only had em-dash, C=4 backticks vs A=0; now A and C both have em-dashes, A=4 and C=4 backticks).
- **Explanation A:** Updated to reference "queue depth mechanism" to match revised option text.

---

## Round 44 — 2026-02-23
**File**: `set-04.js`
**Issues found**: 9

### s04-q006 (giveaway)
- **Option B:** Added "like JDBC connectors" to break unique "like" pattern in correct answer C. Changed from "Embed database drivers directly into the application binary to avoid any external service dependencies" to "Embed database drivers like JDBC connectors directly into the binary to avoid external dependencies".

### s04-q020 (giveaway)
- **Option C:** Added "like a Secret volume" to break unique "like" pattern in correct answer A. Changed from "The `hostPath` volume is encrypted by default so there is no meaningful security concern for the host" to "The `hostPath` volume is encrypted like a Secret volume so there is no meaningful security concern".
- **Explanation C:** Updated to reference "like Secret volumes" to match revised option text.

### s04-q022 (giveaway)
- **Option A:** Added "like host-attached SSDs" to break unique "like" pattern in correct answer B. Changed from "Use local node storage combined with manual backup scripts that are run periodically via cron jobs" to "Use local node storage like host-attached SSDs combined with manual backup scripts run via cron jobs".

### s04-q023 (giveaway)
- **Option B:** Added "because" to break unique "because" pattern in correct answer D. Changed from "New `PVCs` are created at `20Gi` while old PVCs are deleted and their underlying storage is reclaimed" to "New `PVCs` are created at `20Gi` because the controller deletes old PVCs and reclaims their storage".
- **Explanation B:** Updated to match revised option text.

### s04-q030 (giveaway)
- **Option B:** Added backtick-quoted `sessionAffinity: ClientIP` to break unique colon-enum pattern in correct answer A (which has `clusterIP: None`). Changed from "A `ClusterIP` Service with session affinity enabled to route traffic to consistent replicas" to "A `ClusterIP` Service with `sessionAffinity: ClientIP` to route traffic to consistent replicas".
- **Explanation B:** Updated to reference "sessionAffinity" to match revised option text.

### s04-q031 (giveaway)
- **Option D:** Added "like `/data/pod-0`" to break unique "like" pattern in correct answer A. Changed from "Each pod replica must write to a separate directory on the same `ReadWriteOnce` volume to avoid conflicts" to "Each pod replica must write to a separate directory like `/data/pod-0` on the same `ReadWriteOnce` volume".

### s04-q040 (giveaway)
- **Option D:** Added "because" to break unique "because" pattern in correct answer A. Changed from "The `restricted` profile only limits CPU and memory resource usage, it does not restrict volume types" to "The `restricted` profile passes because it only limits CPU and memory resource usage, not volume types".
- **Explanation D:** Updated to reference security contexts and privilege escalation to match revised option text.

### s04-q068 (giveaway)
- **Option B:** Added "because" to break unique "because" pattern in correct answer C. Changed from "The PVC was accidentally deleted during the node reboot process and no longer exists in the cluster" to "The PVC was accidentally deleted because the node reboot process triggered a cleanup that removed it".
- **Explanation B:** Updated to clarify that node reboots do not trigger PVC deletion.

### s04-q093 (giveaway)
- **Option D:** Added colon-enumeration to break unique colon pattern in correct answer C. Changed from "StatefulSets do not use ControllerRevision objects; they track updates via pod template hash labels instead" to "StatefulSets track updates differently: they use pod template hash labels on pods instead of ControllerRevisions".
- **Explanation D:** Updated to reference that pod template hash labels are used by Deployments, not StatefulSets.

### s04-q094 (giveaway)
- **Option C:** Added "like a monthly quota" to break unique "like" pattern in correct answer B. Changed from "Assign each team a fixed storage budget with no actual tracking or enforcement of usage against limits" to "Assign each team a fixed storage budget like a monthly quota with no tracking or enforcement of usage".

---

## Round 45 — 2026-02-23
**File**: `set-04.js`
**Issues found**: 5

### s04-q007 — polarity giveaway
- **Option C:** Changed from "The PVC is waiting for a pod to reference it before the volume binding process can be triggered by the controller" to "No binding occurs yet because the PVC is waiting for a pod to reference it before the volume binding process starts" to break lone "No" polarity in correct answer A (was 1 "No" + 0 others; now 1 "No" + 1 "No").

### s04-q014 — polarity giveaway
- **Option D:** Changed from "The PVC is rejected because `WaitForFirstConsumer` requires a pod reference to be specified at creation time" to "No PVC is accepted without a pod reference because `WaitForFirstConsumer` requires one at creation time" to break lone "No" polarity in correct answer C (was 1 "No" + 0 others; now 1 "No" + 1 "No").

### s04-q039 — giveaway (unique colon in correct)
- **Option A:** Changed from "Pods are terminated in ascending order starting with `pod-0` and `pod-1` before the higher ordinals" to "Pods are terminated in ascending ordinal order: `pod-0` is removed first, then `pod-1` before higher ordinals" to break unique colon in correct answer C.

### s04-q044 — length-balance
- **Option D:** Expanded from 84 to ~98 chars by adding "the" and "directory" to the sentence. Ratio improved from 1.14 to 1.10.

### s04-q083 — polarity giveaway
- **Option D:** Changed from "The StatefulSet rejects the update until all existing pods are drained from their current nodes" to "No update proceeds until all existing pods are drained from their current nodes by the controller" to break lone "No" polarity in correct answer A (was 1 "No" + 0 others; now 1 "No" + 1 "No").
