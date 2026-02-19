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
