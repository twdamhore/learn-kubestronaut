# Round 36 Review - set-02.js

**Date:** 2026-02-19
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 10

---

## s02-q012 (accuracy)

**Problem:** The distinction between options A and D was weak. Using `subPath` has the important caveat of preventing automatic ConfigMap updates, which was not mentioned. Without additional context, option D (mounting with `items`) was a reasonable alternative.

**Change:** Added to the question text that other files already exist at `/app/config` that must be preserved, justifying the `subPath` answer. Question changed from `"...but the file must be read-only. The configuration is stored in a ConfigMap."` to `"...but the file must be read-only. Other files already exist at /app/config that must be preserved. The configuration is stored in a ConfigMap."`.

---

## s02-q020 (length-balance)

**Problem:** The correct answer (option A) was noticeably shorter than option B, creating a length imbalance.

**Change:** Padded option A from `"External Secrets Operator syncs secrets from stores like AWS Secrets Manager into clusters"` to `"External Secrets Operator syncs secrets from external stores like AWS Secrets Manager into Kubernetes clusters automatically"`.

---

## s02-q021 (length-balance/giveaway)

**Problem:** The correct answer (option D) was noticeably longer and more detailed than the other options, creating a giveaway pattern.

**Change:** Trimmed option D from `"Create a new versioned ConfigMap, then trigger a Deployment rollout by updating the pod template reference"` to `"Create a versioned ConfigMap and update the Deployment pod template reference to trigger a rollout"`.

---

## s02-q038 (length-balance)

**Problem:** The correct answer (option D) was the shortest with a definitive-sounding statement, making it structurally distinct.

**Change:** Padded option D from `"Set defaultMode: 0400 on the Secret volume definition in the pod spec to control permissions"` to `"Set defaultMode: 0400 on the Secret volume definition in the pod spec to control file permissions at mount time"`.

---

## s02-q044 (giveaway)

**Problem:** The correct answer (option C) listed multiple capabilities ("dynamic secret generation, fine-grained access control, audit logging, and automatic rotation") while wrong options were vague, creating a classic giveaway pattern.

**Change:** Redistributed detail across wrong options. Option A changed from `"Vault stores secrets in etcd alongside Kubernetes Secrets so there is no real architectural difference between them"` to `"Vault stores secrets in its own encrypted backend but uses etcd as a fallback for Kubernetes-native integration"`. Option B changed from `"Vault replaces Kubernetes RBAC for access control policies across the cluster"` to `"Vault replaces Kubernetes RBAC with its own policy engine for cluster-wide access control and authorization"`. Option D changed from `"Vault is a CNCF-graduated project for secret management and is recommended for CKS certification preparation"` to `"Vault is a CNCF-graduated project providing encrypted storage, audit logging, and certified rotation APIs"`. Updated corresponding explanation bullets to match.

---

## s02-q074 (giveaway)

**Problem:** The correct answer (option A) listed THREE metrics while wrong answers listed only TWO each, creating a structural giveaway.

**Change:** Added a third metric to option B. Changed from `"node_memory_MemAvailable_bytes and node_cpu_seconds_total to track overall node health including OOM pressure, capacity, and saturation levels"` to `"node_memory_MemAvailable_bytes, node_cpu_seconds_total, and node_memory_Buffers_bytes to track overall node health including OOM pressure and capacity"`.

---

## s02-q090 (length-balance)

**Problem:** The correct answer (option A) was the longest with the most specific actionable detail.

**Change:** Trimmed option A from `"Remove get and list verbs for Secrets from the Role, but keep create and pod creation that references Secrets"` to `"Remove get and list verbs for Secrets from the Role, keeping create and pod reference permissions"`.

---

## s02-q094 (explanation)

**Problem:** The explanation about Downward API in option D could be clearer about pod-level vs namespace-level annotations.

**Change:** Updated the explanation bullet for option D from `"Namespace annotations cannot be consumed as pod configuration via the Downward API"` to `"The Downward API can expose pod-level labels and annotations, but cannot access namespace-level annotations or metadata from other objects"`.

---

## s02-q096 (length-balance)

**Problem:** The correct answer (option B) was the longest and named a specific plugin, while wrong options lacked similar specificity.

**Change:** Added a specific tool/component name to option A. Changed from `"Fluentd reads resource limits directly from the container's /proc/cgroups file on the node filesystem for enrichment"` to `"Fluentd reads resource limits directly from the container's /proc/cgroups file using the cgroup parser plugin on the node"`.

---

## s02-q066 (accuracy minor)

**Problem:** The explanation did not mention that API validation for duplicate keys in projected volumes may differ in newer Kubernetes versions.

**Change:** Added a note to the explanation: `"Note: behavior may vary with API validation settings in newer Kubernetes versions."` appended after the existing explanation text about last-source-wins behavior.

---
---

# Round 37 Review - set-02.js

**Date:** 2026-02-19
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 7

---

## s02-q048 (length-balance)

**Problem:** Correct answer A was noticeably shorter (~83 chars) than option B (~100 chars), creating a length imbalance that could signal the answer.

**Change:** Padded option A from `"container_memory_working_set_bytes and kube_pod_container_resource_limits for memory data"` to `"container_memory_working_set_bytes and kube_pod_container_resource_limits for per-container memory usage and limit data"`.

---

## s02-q063 (giveaway)

**Problem:** Correct answer B offered TWO solutions joined by "or" (defaultMode or fsGroup), while wrong options each described a single action. This created a classic giveaway pattern.

**Change:** Reduced option B to a single solution. Changed from `"Use defaultMode: 0444 on the Secret volume to make files world-readable, or set fsGroup in securityContext"` to `"Set defaultMode: 0444 on the Secret volume definition to make the mounted files readable by all users"`. The fsGroup alternative is still mentioned in the explanation.

---

## s02-q044 (giveaway residual)

**Problem:** Correct answer C still listed FOUR capabilities (dynamic secret generation, fine-grained access control, audit logging, and automatic rotation) while other options listed fewer, creating a residual giveaway from the Round 36 fix.

**Change:** Reduced to three capabilities. Changed from `"Vault provides dynamic secret generation, fine-grained access control, audit logging, and automatic rotation"` to `"Vault provides dynamic secret generation, fine-grained access control, and automatic secret rotation"`.

---

## s02-q095 (length-balance/giveaway)

**Problem:** Correct answer B was the longest option with a dual-benefit "while" structure that made it structurally distinct from the other options.

**Change:** Removed the second clause. Changed from `"ConfigMaps in Git provide version history, diff capability, and rollback through Git ops, while Deployment rollbacks restore config versions"` to `"ConfigMaps in Git provide version history, diff capability, and rollback through standard Git operations"`.

---

## s02-q085 (giveaway)

**Problem:** Correct answer D described a precise two-step process, while wrong options described single actions. Option A needed to also present a two-step process to reduce the structural giveaway.

**Change:** Rewrote option A to describe a two-step (incorrect) sequence. Changed from `"The ResourceQuota rejects the pod because it has no memory specification such as 128Mi, and the LimitRange rarely runs its admission logic beforehand"` to `"The ResourceQuota rejects the pod because it has no memory specification, since the LimitRange injects defaults only after the quota check completes"`.

---

## s02-q034 (giveaway)

**Problem:** Correct answer A had a 3-step structure while wrong options had 1-2 steps. Option D needed step structure added to reduce the structural giveaway.

**Change:** Reformatted option D to use a 3-step structure. Changed from `"Replace the old key with the new one in the EncryptionConfiguration and restart the API server; data re-encrypts on the next read"` to `"Replace the old key with the new one in EncryptionConfiguration, restart the API server, then wait for data to re-encrypt on the next read"`.

---

## s02-q034 (length-balance on correct answer)

**Problem:** Correct answer A was the longest option with a verbose trailing clause.

**Change:** Trimmed option A. Changed from `"Add the new key first in EncryptionConfiguration, restart the API server, then re-encrypt all Secrets with a replace command"` to `"Add the new key first in EncryptionConfiguration, restart the API server, then re-encrypt all existing Secrets"`.

---

# Round 38 Review - Set 02

**Date:** 2026-02-19
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 5 across 5 questions

## Changes

### s02-q046 (giveaway)
- **Options A, B, C:** Replaced fictitious Kubernetes features with real but misapplied concepts. Updated explanations accordingly.

### s02-q076 (accuracy/ambiguity)
- **Question text:** Added file-isolation requirement ("neither container should see the other's configuration file") to make option A clearly wrong.

### s02-q092 (giveaway)
- **Options A, C:** Added multi-step detail to match the correct answer's multi-activity structure.

### s02-q019 (giveaway)
- **Options A, C:** Added specific tool names (Helm, Kustomize) to match the correct answer's specificity.

### s02-q064 (length-balance)
- **Options C, D:** Expanded "Yes" options to reduce structural clustering between "Yes" (shorter) and "No" (longer) options.
