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

---

# Round 39 Review - set-02.js

**Date:** 2026-02-21
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 7 (5 MEDIUM, 2 LOW)

---

## Changes

### s02-q041 (giveaway - MEDIUM)
- **Problem:** Correct option D listed 4 source types while wrong options listed 0-1, creating a giveaway.
- **Option A:** Added a list of sources. Changed from `"An emptyDir volume with an init container that copies data from each of the ConfigMaps and the Secret source"` to `"An emptyDir volume with an init container that copies data from ConfigMaps, Secrets, and other sources into a shared directory"`.
- **Option D (correct):** Trimmed the source list. Changed from `"A projected volume combining ConfigMaps, Secrets, Downward API, and token sources in one mount"` to `"A projected volume combining multiple ConfigMap, Secret, and Downward API sources into a single mount point"`.

### s02-q043 (length-balance - MEDIUM)
- **Problem:** Correct option B was the shortest at 94 characters while option A was 136 characters.
- **Option A:** Trimmed. Changed from `"ConfigMaps are generally scoped to a single Deployment and are not designed to be shared across different Deployments within a namespace"` to `"ConfigMaps are scoped to a single Deployment and are not designed to be shared across different Deployments"`.
- **Option B (correct):** Expanded. Changed from `"Sharing ConfigMaps creates tight coupling; changes to Service B's config could break Service A"` to `"Sharing ConfigMaps between services creates tight coupling; changes to Service B's config could unexpectedly break Service A"`.

### s02-q070 (giveaway - MEDIUM)
- **Problem:** Correct option A had unique parenthetical enumerations not present in other options.
- **Option A (correct):** Simplified parentheticals. Changed from `"Yes — the mesh handles network config (routing, mTLS, retries) but app config (DB URLs, flags) still needs ConfigMaps"` to `"Yes — the mesh handles network config like routing and mTLS, but app config such as DB URLs still needs ConfigMaps"`.
- **Option B:** Added parenthetical list to match structure. Changed from `"No — the service mesh manages all configuration including application-specific settings like database URLs and feature flags"` to `"No — the service mesh manages all configuration including application-specific settings (database URLs, feature flags, and logging levels)"`.

### s02-q092 (length-balance - MEDIUM)
- **Problem:** Correct option D was the shortest at 106 characters while others averaged 130 characters.
- **Option D (correct):** Expanded. Changed from `"ConfigMaps and Secrets should be version-controlled, reviewed, tested, and deployed via the CI/CD pipeline"` to `"ConfigMaps and Secrets should be version-controlled, peer-reviewed, tested in staging, and deployed through a CI/CD pipeline"`.
- **Option B:** Trimmed. Changed from `"Environment variables are the preferred cloud-native configuration mechanism, while file-based configuration requires additional tooling"` to `"Environment variables are the preferred cloud-native configuration mechanism, while file-based configuration requires tooling"`.

### s02-q095 (length-balance - MEDIUM)
- **Problem:** Correct option B was the shortest at 104 characters while others were 133-135 characters.
- **Option B (correct):** Expanded. Changed from `"ConfigMaps in Git provide version history, diff capability, and rollback through standard Git operations"` to `"ConfigMaps in Git provide version history, diff capability, and rollback through standard Git operations and code review workflows"`.
- **Option A:** Trimmed. Changed from `"ConfigMaps are stored in etcd which automatically versions all changes, enabling kubectl rollback configmap to restore prior versions"` to `"ConfigMaps are stored in etcd which automatically versions all changes, enabling kubectl rollback configmap to restore versions"`.

### s02-q020 (length-balance - LOW)
- **Problem:** Correct option A was the longest while options C and D were approximately 30% shorter.
- **Option C:** Expanded. Changed from `"Fluentd collects Secret data from application logs and injects them into destination pods"` to `"Fluentd collects Secret data from application logs and injects them into destination pods for configuration management"`.
- **Option D:** Expanded. Changed from `"Prometheus can monitor and rotate Secrets automatically across multiple cluster environments"` to `"Prometheus can monitor and rotate Secrets automatically across multiple cluster environments using built-in rotation policies"`.

### s02-q085 (length-balance - LOW)
- **Problem:** Option A was a 148-character outlier compared to other options.
- **Option A:** Trimmed. Changed from `"The ResourceQuota rejects the pod because it has no memory specification, since the LimitRange injects defaults only after the quota check completes"` to `"The ResourceQuota rejects the pod because the LimitRange injects defaults only after the quota check completes"`.

---

# Round 40 Review - Set 02

**Date:** 2026-02-21
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 17 across 12 questions

## Changes

### s02-q043 (giveaway/length-balance)
- **Problem:** Correct option B was the longest (124 chars, ratio 1.253) and used a semicolon structure unique among the options.
- **Option B (correct):** Replaced semicolon with comma. Changed from `"Sharing ConfigMaps between services creates tight coupling; changes to Service B's config could unexpectedly break Service A"` to `"Sharing ConfigMaps between services creates tight coupling, so changes to Service B's config could break Service A"`.
- **Option C:** Added semicolon for structural balance. Changed from `"Kubernetes rate-limits ConfigMap read operations so sharing would cause pod performance degradation"` to `"Kubernetes rate-limits ConfigMap read operations per namespace; sharing would cause pod performance degradation"`.
- **Option D:** Expanded for length balance. Changed from `"Shared ConfigMaps are automatically replicated across namespaces causing eventual data inconsistency"` to `"Shared ConfigMaps are automatically replicated across namespaces by the controller, causing eventual data inconsistency"`.

### s02-q048 (length-balance)
- **Problem:** Correct option A was the longest (123 chars, ratio 1.242) due to R37 padding; C and D were only 99 chars each.
- **Option A (correct):** Trimmed. Changed `"for per-container memory usage and limit data"` to `"for per-container memory and limit data"`.
- **Options C, D:** Expanded slightly. Added `"event"` to C and `"throttle"` to D.

### s02-q071 (giveaway)
- **Problem:** Correct option A was the longest (109 chars, ratio 1.172) and had a unique parenthetical `(e.g., Vault)` and `e.g.` not present in other options.
- **Option A (correct):** Removed parenthetical example. Changed from `"Use an external secrets operator that syncs from a shared store (e.g., Vault) into each cluster independently"` to `"Use an external secrets operator that syncs from a shared external store into each cluster independently"`.
- **Option D:** Added parenthetical to balance structure. Changed from `"Store Secrets in a shared NFS volume that is mounted by both clusters for synchronized access"` to `"Store Secrets in a shared NFS volume (e.g., EFS) that is mounted by both clusters for synchronized access"`.

### s02-q038 (length-balance)
- **Problem:** Correct option D and B were tied at 113 chars while A and C were both 96 chars (ratio 1.177).
- **Option A:** Expanded. Changed `"mounted in place"` to `"mounted in the container"`.
- **Option C:** Expanded. Changed `"to override mount mode"` to `"to override the default mount mode"`.

### s02-q046 (giveaway)
- **Problem:** Correct option D had a unique parenthetical `(e.g., \`SIGHUP\`)` not present in other options.
- **Option D (correct):** Removed parenthetical. Changed from `"Use a sidecar that watches the mounted ConfigMap volume and signals (e.g., \`SIGHUP\`) the main process"` to `"Use a sidecar that watches the mounted ConfigMap volume for changes and signals the main process to reload"`.
- **Option A:** Added parenthetical to balance. Changed from `"Configure the kubelet \`--sync-frequency\` to a lower interval so volume-mounted ConfigMaps propagate to pods instantly"` to `"Configure the kubelet \`--sync-frequency\` (e.g., \`5s\`) so volume-mounted ConfigMaps propagate to pods instantly"`.

### s02-q059 (giveaway)
- **Problem:** Correct option C had a unique comma-list structure (`first, then ..., then ...`) while wrong options had zero commas.
- **Option D:** Added matching comma-list structure with reversed (incorrect) order. Changed from `"\`Guaranteed\` pods are evicted first because they consume the most predictable and reserved resources"` to `"\`Guaranteed\` pods are evicted first, then \`Burstable\`, then \`BestEffort\` as reserved resources are reclaimed"`.
- **Explanation D:** Updated to address the reversed order.

### s02-q060 (giveaway)
- **Problem:** Correct option B had a triple giveaway: unique parenthetical `(e.g., \`DB_HOST\`)`, unique semicolon, and unique `e.g.` usage.
- **Option B (correct):** Removed parenthetical and semicolon. Changed from `"\`--from-env-file\` creates one key per line (e.g., \`DB_HOST\`); \`--from-file\` stores the whole file as one key"` to `"\`--from-env-file\` creates one key per line like \`DB_HOST\`, while \`--from-file\` stores the whole file as one key"`.
- **Option C:** Added semicolon for structural balance. Changed from `"\`--from-env-file\` only supports \`.env\` file extensions while \`--from-file\` supports any arbitrary file extension"` to `"\`--from-env-file\` only supports \`.env\` file extensions; \`--from-file\` supports any arbitrary file extension format"`.

### s02-q076 (giveaway)
- **Problem:** Correct option C had a unique comma-list structure with 2 commas while wrong options had zero commas.
- **Option A:** Added comma-list structure to match. Changed from `"Define one volume with the full ConfigMap and mount it in both containers; each reads only its own file from the directory"` to `"Define one volume with the full ConfigMap, mount it in both containers, and let each read only its own file"`.

### s02-q024 (giveaway)
- **Problem:** Correct option D had a unique parenthetical `(e.g., \`values-dev.yaml\`, \`values-prod.yaml\`)` not present in other options.
- **Option D (correct):** Removed parenthetical. Changed from `"In separate values files (e.g., \`values-dev.yaml\`, \`values-prod.yaml\`) passed with \`-f\` flag"` to `"In separate values files like \`values-dev.yaml\` and \`values-prod.yaml\` passed with the \`-f\` flag"`.
- **Option A:** Added parenthetical to balance. Changed from `"In the \`Chart.yaml\` file, which supports per-environment overrides natively within Helm's schema"` to `"In the \`Chart.yaml\` file (e.g., \`chart-dev.yaml\`, \`chart-prod.yaml\`) using per-environment overrides"`.

### s02-q019 (length-balance)
- **Problem:** Ratio 1.227 due to option C being an outlier at 119 chars while correct B was 97 chars.
- **Option C:** Trimmed. Changed from `"Store all configurations in a single large ConfigMap managed by Kustomize, shared across every service in the namespace"` to `"Store all configurations in a single large ConfigMap managed by Kustomize, shared across every service"`.

### s02-q034 (length-balance)
- **Problem:** Ratio 1.250 due to wrong options B (131), C (126), and D (140) being outliers vs correct A (112).
- **Option B:** Trimmed. Changed from `"Delete all existing Secrets and recreate them from scratch — Kubernetes will re-encrypt on creation using the new key automatically"` to `"Delete all existing Secrets and recreate them — Kubernetes will re-encrypt on creation using the new key"`.
- **Option C:** Trimmed. Changed from `"Run \`kubectl rotate-keys --provider=aescbc\` which handles the full key rotation process automatically without any manual steps"` to `"Run \`kubectl rotate-keys --provider=aescbc\` which handles the full key rotation process automatically"`.
- **Option D:** Trimmed. Changed from `"Replace the old key with the new one in \`EncryptionConfiguration\`, restart the API server, then wait for data to re-encrypt on the next read"` to `"Replace the old key with the new one in \`EncryptionConfiguration\`, restart the API server, then wait for re-encryption on read"`.

### s02-q035 (length-balance)
- **Problem:** Ratio 1.191 due to option B being an outlier at 131 chars while correct A was 110 chars.
- **Option B:** Trimmed. Changed from `"Split the dataset across approximately two ConfigMaps and merge them inside the container at startup using an init container script"` to `"Split the dataset across two ConfigMaps and merge them inside the container at startup using an init container"`.

---

# Round 41 Review - Set 02

**Date:** 2026-02-21
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 20 across 17 questions

## Changes

### s02-q001 (length-balance)
- **Problem:** Correct option D was the shortest (78 chars) with ratio 1.167.
- **Option A:** Trimmed. Changed `"for sensitive workloads"` to `"for workloads"`.
- **Option D (correct):** Expanded. Changed `"in the pod"` to `"in the pod spec"`.

### s02-q002 (giveaway)
- **Problem:** Correct option B had a unique semicolon not present in other options.
- **Option A:** Added semicolon. Changed `"by default so the update"` to `"by default; the update"`.

### s02-q011 (length-balance)
- **Problem:** Ratio 1.312 due to option A outlier at 101 chars.
- **Option A:** Trimmed. Changed `"derived from the flag name by default"` to `"derived from the flag"`.
- **Option B:** Expanded. Changed `"for uniqueness"` to `"for content uniqueness"`.

### s02-q013 (length-balance)
- **Problem:** Correct option A was the shortest (89 chars) with ratio 1.202 due to B outlier at 107 chars.
- **Option B:** Trimmed. Removed `"with cluster-level keys"` from the end.

### s02-q015 (giveaway/length-balance)
- **Problem:** Correct option B had a unique semicolon. Option D was shortest at 73 chars (ratio 1.178).
- **Option A:** Added semicolon. Changed `"should not matter — the issue"` to `"should not matter; the issue"`.
- **Option D:** Expanded. Changed `"a \`secretNamespace\` field to"` to `"a \`secretNamespace\` field in the spec to"`.

### s02-q017 (length-balance)
- **Problem:** Option A was an outlier at 101 chars (ratio 1.247).
- **Option A:** Trimmed. Changed `"not updated after pod creation"` to `"not updated after creation"`.

### s02-q025 (giveaway)
- **Problem:** Correct option B had a unique semicolon not present in other options.
- **Option D:** Added semicolon. Changed `"Avoid storing Secrets in Git and instead create"` to `"Avoid storing Secrets in Git entirely; instead create"`.

### s02-q026 (giveaway)
- **Problem:** Correct option B had a unique semicolon not present in other options.
- **Option D:** Added semicolon. Changed `"using \`SHA-256\`, so recovering"` to `"using \`SHA-256\`; recovering"`.

### s02-q027 (giveaway)
- **Problem:** Correct option D had a unique semicolon not present in other options.
- **Option B:** Added semicolon. Changed `"as a Secret since Secrets support"` to `"as a Secret; Secrets support"`.

### s02-q028 (giveaway)
- **Problem:** Correct option D had a unique semicolon not present in other options.
- **Option C:** Added semicolon. Changed `"1.5 cores because CPU limits are"` to `"1.5 cores; CPU limits are"`. Also expanded with `"by the runtime"`.

### s02-q034 (length-balance)
- **Problem:** Option D remained an outlier at 123 chars after R40 fix (ratio 1.255).
- **Option D:** Trimmed. Changed `"then wait for re-encryption on read"` to `"and data re-encrypts on read"`.

### s02-q041 (length-balance)
- **Problem:** Option A was an outlier at 125 chars (ratio 1.316).
- **Option A:** Trimmed. Removed `"and other sources"` from the middle of the sentence.

### s02-q052 (length-balance)
- **Problem:** Option D was an outlier at 115 chars (ratio 1.337).
- **Option D:** Trimmed. Changed `"when limits are defined in the spec"` to `"when limits are set"`.

### s02-q066 (giveaway)
- **Problem:** Correct option C had a unique semicolon not present in other options.
- **Option A:** Added semicolon. Changed `"The pod fails to start because duplicate"` to `"The pod fails to start; duplicate"`.

### s02-q070 (length-balance)
- **Problem:** Option B was an outlier at 135 chars (ratio 1.227).
- **Option B:** Trimmed. Removed `"and logging levels"` from the parenthetical list.

### s02-q081 (giveaway)
- **Problem:** Correct option D had a unique semicolon not present in other options.
- **Option B:** Added semicolon. Changed `"immutable after creation and can"` to `"immutable after creation; they can"`.

### s02-q086 (giveaway)
- **Problem:** Correct option D had a unique semicolon not present in other options.
- **Option A:** Added semicolon. Changed `"as encrypted strings while \`data\`"` to `"as encrypted strings; \`data\`"`.

---

# Round 42 Review - Set 02

**Date:** 2026-02-21
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 14 across 8 questions

## Changes

### s02-q003 (giveaway/backtick-density)
- **Problem:** Correct option A had 6 backticks while options B, C, and D each had only 2, creating a backtick density giveaway.
- **Option B:** Added backtick term. Changed `"the general-purpose Secret type that accepts any arbitrary key-value pair"` to `"the general-purpose Secret type that accepts arbitrary \`data\` key-value pairs"`.
- **Option C:** Added backtick term. Changed `"intended for storing container registry credentials"` to `"stores registry credentials in the \`.dockerconfigjson\` key"`.
- **Option D:** Added backtick term and adjusted wording. Changed `"stores SSH private keys, not X.509 certificate material"` to `"stores SSH private keys in the \`ssh-privatekey\` field only"`. Updated explanation bullet accordingly.

### s02-q009 (giveaway/backtick-density)
- **Problem:** Correct option A had 4 backticks while options C and D had 0, creating a backtick density imbalance.
- **Option C:** Added backtick term. Changed `"it has a memory limit set which prevents any OOM killing action"` to `"it has a \`limits.memory\` value set which prevents OOM killing"`.
- **Option D:** Added backtick term. Changed `"The pod with the higher absolute memory limit"` to `"The pod with the higher absolute \`limits.memory\` value"`.

### s02-q012 (giveaway/backtick-density)
- **Problem:** Correct option A had 6 backticks while options B and D had 0, creating a backtick density giveaway.
- **Option D:** Added backtick formatting to path and field names. Changed `"Mount the ConfigMap volume at /app/config using items to select settings.yaml, implying read-only"` to `"Mount the ConfigMap volume at \`/app/config\` using \`items\` to select \`settings.yaml\` as read-only"`.

### s02-q018 (length-balance)
- **Problem:** Correct option A was the shortest at 83 chars while others ranged 91-93 (ratio 1.120).
- **Option A (correct):** Expanded. Changed `"Store config in environment variables injected at runtime via ConfigMaps or Secrets"` to `"Store configuration in environment variables injected at runtime via ConfigMaps or Secrets"`.

### s02-q025 (giveaway)
- **Problem:** Correct option B had a unique parenthetical `(Bitnami)` not present in other options.
- **Option A:** Added parenthetical to balance. Changed `"Commit Secrets as base64-encoded values since Git does not display binary data in plain diffs"` to `"Commit Secrets as base64-encoded values (not plaintext) since Git does not display binary data in diffs"`.

### s02-q030 (length-balance)
- **Problem:** Option D was an outlier at 106 chars while others ranged 92-95 (ratio 1.152).
- **Option D:** Trimmed. Changed `"The pod creation fails because the LimitRange requires the developer to explicitly specify resource values"` to `"The pod creation fails because LimitRange requires developers to explicitly specify resource values"`.

### s02-q034 (length-balance)
- **Problem:** Option D was an outlier at 119 chars (ratio 1.178 with min C=101).
- **Option C:** Expanded slightly. Changed `"the full key rotation process automatically"` to `"the full key rotation lifecycle automatically"`.
- **Option D:** Trimmed. Changed `"restart the API server, and data re-encrypts on read"` to `"restart the API server, and let data re-encrypt"`.

### s02-q090 (giveaway/backtick-density)
- **Problem:** Correct option A had 6 backticks while options B had 2, C had 2, and D had 0.
- **Option B:** Added backtick term. Changed `"to prevent reading any resource data including Secret contents"` to `"to prevent \`kubectl get\` from reading Secret data contents"`.
- **Option D:** Added backtick term. Changed `"Remove all Secret permissions from the Role"` to `"Remove all Secret permissions from the \`Role\`"`.

### s02-q092 (giveaway/comma-list)
- **Problem:** Correct option D had a unique 3-comma list structure while other options had 0-2 commas.
- **Option A:** Added 3rd comma to match structure. Changed `"validated at build time, and cached for runtime performance"` to `"validated at build, cached for performance, and versioned internally"`.

---

# Round 43 Review - Set 02

**Date:** 2026-02-21
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 3 across 2 questions

## Changes

### s02-q062 (giveaway/polarity)
- **Problem:** Correct option A was the lone "No" answer among 2 "Yes" options and 1 "It depends" option, creating a polarity giveaway.
- **Option D:** Changed from `"It depends on whether the existing pods have CPU limits set in addition to their resource requests"` to `"No — but only because existing pods have CPU limits set, which the scheduler counts toward allocatable"`. This creates a 2-No / 2-Yes distribution.
- **Explanation D:** Updated bullet to address the new wording. Changed `"CPU limits do not affect scheduling decisions; only requests matter for node placement"` to `"The scheduler does not count limits toward allocatable capacity; only requests matter for placement"`.

### s02-q070 (giveaway/such-as)
- **Problem:** Correct option A had a unique "such as" phrasing not present in any other option, creating a structural giveaway.
- **Option B:** Added "such as" to balance the pattern. Changed `"No — the service mesh manages all configuration including application-specific settings (database URLs and feature flags)"` to `"No — the service mesh manages all configuration including application-specific settings such as database URLs and flags"`.

---

## Round 44 — 2026-02-23
**File**: `set-02.js`
**Issues found**: 10

### s02-q006 — giveaway ("because" unique to correct)
- **Option A:** Added "because" to balance the pattern. Changed `"The pod is created and Kubernetes auto-assigns"` to `"The pod is created because Kubernetes auto-assigns"`.

### s02-q011 — giveaway ("because" unique to correct)
- **Option A:** Added "because" to balance the pattern. Changed `"The key will be \`data\` since \`--from-file\` uses"` to `"The key will be \`data\` because \`--from-file\` uses"`.

### s02-q019 — giveaway ("like" unique to correct)
- **Option A:** Added "like" to balance the pattern. Changed `"Merge all 30 services into a single monolith managed by Helm to reduce the total number of ConfigMaps needed"` to `"Merge all 30 services into a monolith managed by tools like Helm to reduce the total ConfigMap count"`.

### s02-q020 — giveaway ("like" unique to correct)
- **Option B:** Added "like" to balance the pattern. Changed `"Argo CD integrates with external vaults to encrypt Secrets during GitOps synchronization when deploying to target clusters"` to `"Argo CD integrates with external vaults like HashiCorp Vault to encrypt Secrets during GitOps synchronization to clusters"`.

### s02-q024 — giveaway ("like" unique to correct)
- **Option C:** Added "like" to balance the pattern. Changed `"Directly in manifests inside \`templates/\` with \`if/else\` blocks to handle each environment path"` to `"Directly in template manifests inside \`templates/\` with \`if/else\` blocks like environment conditionals"`.

### s02-q036 — giveaway ("because" unique to correct)
- **Option A:** Added "because" to balance the pattern. Changed `"The pod is created but placed in \`Pending\` state until other pods are evicted"` to `"The pod is created but placed in \`Pending\` state because other pods must be evicted"`.

### s02-q039 — giveaway ("like" unique to correct)
- **Option D:** Added "like" to balance the pattern. Changed `"Configuring RBAC to deny \`get\` verb access to Secrets for all users within the namespace scope"` to `"Configuring RBAC to deny verbs like \`get\` on Secrets for all users within the namespace scope"`.

### s02-q052 — length-balance (ratio 1.151)
- **Option D:** Trimmed from 99 to 97 chars. Changed `"when limits are set"` to `"when limits exist"` to bring ratio under 1.15.

### s02-q060 — giveaway ("like" unique to correct)
- **Option C:** Added "like" to balance the pattern. Changed `"\`--from-env-file\` only supports \`.env\` file extensions; \`--from-file\` supports any arbitrary file extension format"` to `"\`--from-env-file\` only supports file extensions like \`.env\`; \`--from-file\` supports any arbitrary file extension"`.

### s02-q070 — giveaway ("like" unique to correct, residual from R43)
- **Option C:** Added "like" to balance the pattern. Changed `"No — Istio's VirtualService resources replace ConfigMaps"` to `"No — Istio resources like VirtualService replace ConfigMaps"`.

## Round 45 — 2026-02-23
**File**: `set-02.js`
**Issues found**: 4

### s02-q025 — length-balance (ratio 1.146, correct B shortest)
- **Option B (correct):** Padded from 89 to 103 chars. Changed `"Use Sealed Secrets (Bitnami) to encrypt Secrets before committing; only the cluster decrypts"` to `"Use Sealed Secrets (Bitnami) to encrypt Secrets before committing; only the in-cluster controller decrypts"`.

### s02-q052 — giveaway (unique colon in correct B)
- **Option A:** Added colon to balance the pattern. Changed `"Zero is assigned as the request and the pod becomes \`BestEffort\` quality of service class"` to `"Zero is assigned as the memory request: the pod becomes \`BestEffort\` quality of service class"`.

### s02-q069 — giveaway (unique colon in correct B)
- **Option C:** Added colon to balance the pattern. Changed `"Using if/else logic in the application would require a full code review for every single environment configuration change"` to `"Using if/else logic in the application requires a full code review: every environment configuration change needs approval"`.

### s02-q088 — length-balance (ratio 1.138, correct C shortest)
- **Option C (correct):** Padded from 94 to 101 chars. Changed `"An \`emptyDir\` volume shared between the init container and the main container within the same pod"` to `"An \`emptyDir\` volume shared between the init container and the main application container within the pod"`.

## Round 46 — 2026-02-24
**File**: `set-02.js`
**Issues found**: 2

### s02-q035 — giveaway ("since" unique to correct)
- **Option B:** Added "since" clause to balance the pattern. Changed `"Split the dataset across two ConfigMaps and merge them inside the container at startup using an init container"` to `"Split the dataset across two ConfigMaps and merge them at startup using an init container, since each holds 1 MiB"`.

### s02-q046 — giveaway (correct D lacks backticks while all distractors have them)
- **Option D (correct):** Added backtick-formatted term to match distractors' code formatting density. Changed `"Use a sidecar that watches the mounted ConfigMap volume for changes and signals the main process to reload"` to `"Use a sidecar that watches the mounted ConfigMap volume for changes and sends a \`SIGHUP\` signal to reload"`.

## Round 47 — 2026-02-25
**File**: `set-02.js`
**Issues found**: 5

### s02-q041 — giveaway (comma-list unique to correct)
- **Problem:** Correct option D had 2 commas listing "ConfigMap, Secret, and Downward API" while all wrong options had 0 commas, creating a structural giveaway.
- **Option A:** Added comma-list to balance the pattern. Changed `"An \`emptyDir\` volume with an init container that copies data from ConfigMaps and Secrets into a shared directory"` to `"An \`emptyDir\` volume with an init container that copies ConfigMaps, Secrets, and tokens into one directory"`.

### s02-q049 — length-balance (ratio 1.140)
- **Problem:** Option C was noticeably shorter (93 chars) compared to options A (105) and B (106), with a ratio of 1.140.
- **Option C:** Padded from 93 to 108 chars. Changed `"Edit the running Deployment manually with \`kubectl edit\` to update both fields simultaneously"` to `"Edit the running Deployment manually with \`kubectl edit\` to update both fields simultaneously in one session"`.

### s02-q067 — length-balance (ratio 1.111, correct shortest)
- **Problem:** Correct option D was the shortest (54 chars) while others ranged 58-60, making the correct answer structurally distinct as the most concise.
- **Option D (correct):** Padded from 54 to 64 chars. Changed `"\`512\` — the value in the unit specified by the divisor"` to `"\`512\` — the value expressed in the unit specified by the divisor"`.

### s02-q069 — giveaway ("while" unique to correct)
- **Problem:** Correct option B had a unique "while" conjunction not present in any other option, creating a structural giveaway.
- **Option D:** Added "while" to balance the pattern. Changed `"ConfigMaps per environment use less cluster memory and etcd storage than a single ConfigMap with embedded conditionals"` to `"ConfigMaps per environment use less cluster memory and etcd storage, while a single ConfigMap with conditionals is heavier"`.

### s02-q076 — length-balance (ratio 1.137)
- **Problem:** Option B was the longest (116 chars) while option D was the shortest (102 chars), with a ratio of 1.137.
- **Option B:** Trimmed from 116 to 110 chars. Changed `"Use \`subPath\` in the ConfigMap definition to split the ConfigMap into per-container sections based on container name"` to `"Use \`subPath\` in the ConfigMap definition to split the ConfigMap into per-container sections by container name"`.

## Round 47c — 2026-02-25
**File**: `set-02.js`
**Issues fixed**: 16

### s02-q004 — giveaway: "both" unique to correct answer
- Option D: Added "both" by rewriting from `"\`Guaranteed\` — because Kubernetes rounds up partial specs to meet the Guaranteed threshold"` to `"\`Guaranteed\` — because Kubernetes rounds up partial specs for both CPU and memory automatically"`.

### s02-q006 — giveaway: first-word (correct "pod", all distractors "the") + "but" unique to correct
- Option B: Changed first word from `"The pod is scheduled but placed in pending state..."` to `"No scheduling occurs and the pod stays in pending state until the administrator adds a LimitRange object"`.
- Option C: Added "but" by changing `"...and its resources do not count against the quota"` to `"...but its resources do not count against the quota"`.

### s02-q008 — giveaway: first-word (correct "etcd,", all distractors "the")
- Option B: Changed first word from `"The kube-apiserver's..."` to `"Inside the kube-apiserver's in-memory store, which is cleared each time the server is restarted"`.

### s02-q032 — giveaway: "both" unique to correct answer
- Option B: Added "both" by rewriting from `"\`Burstable\` — because the containers each have different resource values from one another"` to `"\`Burstable\` — because both the request and limit values differ across the containers"`.

### s02-q040 — giveaway: `, or` unique to correct answer + length-balance
- Option C: Added `, or` by rewriting from `"Delete the ResourceQuota in the namespace to remove the memory restriction from the pods"` to `"Delete the ResourceQuota in the namespace, or remove the memory restriction from the pods"`.
- Option A (correct): Padded from 80 to 91 chars by adding "allocatable" before "memory".

### s02-q052 — giveaway: "automatically" unique to correct answer
- Option C: Added "automatically" by rewriting from `"Kubernetes defaults to half the limit for requests, so the request would be set to \`128Mi\`"` to `"Kubernetes automatically defaults to half the limit for requests, so the request would be \`128Mi\`"`.

### s02-q055 — giveaway: first-word (correct "pod", all distractors "the")
- Option B: Changed first word from `"The LimitRange is ignored..."` to `"CPU-specific LimitRanges are ignored because CPU constraints require a separate CpuLimitRange resource"`.

### s02-q061 — giveaway: `, but` and "but" unique to correct answer
- Option C: Added `, but` by rewriting from `"All pod creation is blocked across the entire cluster until the controller manager fully recovers"` to `"All pod creation is blocked across the entire cluster, but existing pods continue to run until recovery"`.

### s02-q064 — giveaway: "both" unique to correct answer
- Option A: Added "both" by rewriting from `"No — \`args\` does not support variable substitution; the \`command\` field is the supported location in pod specs"` to `"No — \`args\` does not support variable substitution in both literal and reference forms; only \`command\` does"`.

### s02-q070 — giveaway: `, but` unique to correct answer
- Option B: Added `, but` by rewriting from `"No — the service mesh manages all configuration including application-specific settings such as database URLs and flags"` to `"No — the service mesh manages all configuration such as database URLs and flags, but only after sidecar injection"`.

### s02-q072 — giveaway: `, which` unique to correct answer
- Option B: Changed `"Store credentials in the Kafka topic metadata where the Knative eventing system reads them on connect"` to `"Store credentials in the Kafka topic metadata, which the Knative eventing system reads on connect"`.

### s02-q075 — giveaway: `, which` unique to correct answer
- Option D: Changed `"Base64 encoding in templates causes Helm to double-encode the value when creating the Kubernetes Secret"` to `"Base64 encoding in templates causes Helm to double-encode the value, which corrupts the Kubernetes Secret"`.

### s02-q083 — giveaway: `, and` unique to correct answer
- Option C: Changed `"The container continues running but Kubernetes logs a warning and triggers an alert to the cluster administrator"` to `"The container continues running, and Kubernetes logs a warning then triggers an alert to the cluster administrator"`.

### s02-q088 — giveaway: first-word (correct "an", all distractors "a")
- Option B: Changed first word from `"A \`configMap\` volume..."` to `"Using a \`configMap\` volume that the init container populates at runtime by writing into the mounted path"`.

### s02-q095 — giveaway: `, and` unique to correct answer
- Option C: Changed `"Kubernetes automatically creates ConfigMap snapshots before every change, stored in a dedicated backup volume attached to the cluster"` to `"Kubernetes automatically creates ConfigMap snapshots before every change, and stores them in a dedicated backup volume on the cluster"`.

### s02-q100 — giveaway: first-word (correct "any", all distractors "it") + `, which` unique to correct
- Option D: Fixed both issues by rewriting from `"It validates ConfigMap content against a known checksum and blocks the deployment if the content is corrupted or tampered"` to `"The annotation validates ConfigMap content against a known checksum, which blocks the deployment if corruption occurs"`.

## Round 47d — 2026-02-25
**File**: `set-02.js`
**Issues fixed**: 15 backtick-balance fixes across 13 questions

### s02-q005 — backtick balance: correct 2x more than distractor avg
- Option D: Added backtick formatting to `key-value`. Changed `"...containing both key-value pairs merged"` to `"...containing both \`key-value\` pairs merged"`.

### s02-q009 — backtick balance: correct 2x more than distractor avg
- Option C: Added backtick formatting to `OOM`. Changed `"...which prevents OOM killing"` to `"...which prevents \`OOM\` killing"`.

### s02-q012 — backtick balance: correct 2.3x more than distractor avg
- Option B: Added backtick formatting to `ConfigMap` and `emptyDir`. Changed `"Use an init container to copy ConfigMap data to an emptyDir..."` to `"Use an init container to copy \`ConfigMap\` data to an \`emptyDir\`..."`.

### s02-q022 — backtick balance: correct 3x more than distractor avg
- Option C: Added backtick formatting to `ResourceQuota`. Changed `"...to capture ResourceQuota-related events"` to `"...to capture \`ResourceQuota\`-related events"`.

### s02-q027 — backtick balance: correct 3x more than distractor avg
- Option B: Added backtick formatting to `Secret`. Changed `"...store it as a Secret; Secrets support..."` to `"...store it as a \`Secret\`; Secrets support..."`.

### s02-q050 — backtick balance: correct 3x more than distractor avg
- Option C: Added backtick formatting to `ConfigMap`. Changed `"Use a single ConfigMap and toggle..."` to `"Use a single \`ConfigMap\` and toggle..."`.
- Option D: Added backtick formatting to `ConfigMap`. Changed `"Use a single ConfigMap and rely..."` to `"Use a single \`ConfigMap\` and rely..."`.

### s02-q056 — backtick balance: correct 3x more than distractor avg
- Option B: Added backtick formatting to `data`. Changed `"...of the binary data with no additional encoding..."` to `"...of the binary \`data\` with no additional encoding..."`.

### s02-q059 — backtick balance: correct 3x more than distractor avg
- Option A: Added backtick formatting to `Pods`. Changed `"Pods are evicted alphabetically..."` to `"\`Pods\` are evicted alphabetically..."`.
- Option B: Added backtick formatting to `Pods`. Changed `"Pods are evicted randomly..."` to `"\`Pods\` are evicted randomly..."`.

### s02-q065 — backtick balance: correct 2x more than distractor avg
- Option A: Added backtick formatting to `ConfigMap`. Changed `"The ConfigMap is immutable..."` to `"The \`ConfigMap\` is immutable..."`.

### s02-q066 — backtick balance: correct 2x more than distractor avg
- Option A: Added backtick formatting to `projected`. Changed `"...not allowed in projected volume source definitions"` to `"...not allowed in \`projected\` volume source definitions"`.

### s02-q076 — backtick balance: correct 3x more than distractor avg
- Option A: Added backtick formatting to `ConfigMap`. Changed `"Define one volume with the full ConfigMap..."` to `"Define one volume with the full \`ConfigMap\`..."`.

### s02-q089 — backtick balance: correct 3x more than distractor avg
- Option D: Added backtick formatting to `container runtimes`. Changed `"...not allowed in container runtimes"` to `"...not allowed in \`container runtimes\`"`.

### s02-q090 — backtick balance: correct 2.3x more than distractor avg
- Option C: Added backtick formatting to `Secret`. Changed `"Enable Secret encryption at rest..."` to `"Enable \`Secret\` encryption at rest..."`.

## Round 48 Review - set-02.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-02.js`
**Issues fixed:** 0

---
No issues found. All 100 questions pass length balance (threshold 1.15), giveaway pattern, and backtick balance checks. Manual review confirmed accuracy, correct answer indices, and balanced answer distribution (A=26, B=26, C=24, D=24).

## Round 48b — 2026-02-25
**File**: `set-02.js`
**Issues fixed**: 13 giveaway flags (first-word patterns) + 1 backtick-balance fix

### s02-q002 — giveaway: first-word cluster "the" (2x) vs correct "env"
- Option C: Changed first word from `"The kubelet refreshes..."` to `"Kubelet refreshes env vars every 60 seconds so the operator just needs to wait a bit longer"`.

### s02-q004 — giveaway: first-word cluster "guaranteed" (2x) vs correct "burstable"
- Option D: Changed first word from `` "`Guaranteed` — because Kubernetes rounds up..." `` to `"Kubernetes assigns \`Guaranteed\` — because it rounds up partial specs for both CPU and memory"`.

### s02-q006 — giveaway: first-word cluster "the" (2x) vs correct "pod"
- Option A: Changed first word from `"The pod is created because..."` to `"Kubernetes creates the pod and auto-assigns default CPU values derived from the ResourceQuota"`.
- Option B: Added "because" to break new keyword-"because" flag. Changed `"No scheduling occurs and the pod stays..."` to `"No scheduling occurs because the pod stays in pending state until the administrator adds a LimitRange"`.

### s02-q008 — giveaway: first-word cluster "the" (2x) vs correct "etcd"
- Option D: Changed first word from `"The container runtime's internal..."` to `"Within the container runtime's internal image layer filesystem storage on the scheduling node"`.

### s02-q031 — giveaway: first-word cluster "the" (2x) vs correct "mounting"
- Option B: Changed first word from `"The container runtime performs..."` to `"During startup the container runtime cleans any directory where a ConfigMap volume is mounted"`.

### s02-q037 — giveaway: first-word cluster "guaranteed" (2x) vs correct "burstable"
- Option D: Changed first word from `` "`Guaranteed` — because Kubernetes defaults..." `` to `"Kubernetes assigns \`Guaranteed\` — because it defaults CPU to match memory specs"`. Also trims length to fix ratio from 1.173 to within 1.15.

### s02-q050 — giveaway: first-word cluster "use" (2x) vs correct "create"
- Option C: Changed first word from `"Use a single \`ConfigMap\` and toggle..."` to `"Place all feature flags in a single \`ConfigMap\` and toggle them with environment variables per pod"`.

### s02-q055 — giveaway: first-word cluster "the" (2x) vs correct "pod"
- Option A: Changed first word from `"The pod is created but the CPU limit is automatically capped..."` to `"Kubernetes creates the pod but automatically caps the CPU limit at 2 cores via the LimitRange"`.

### s02-q059 — giveaway: first-word cluster "pods" (2x) vs correct "besteffort"
- Option A: Changed first word from `` "`Pods` are evicted alphabetically..." `` to `"Eviction occurs alphabetically by \`Pod\` name to ensure deterministic and repeatable behavior on nodes"`. Added backtick formatting to `Pod` to also fix backtick-balance flag (correct had 2.3x more backtick-terms than distractor average).

### s02-q088 — giveaway: first-word cluster "a" (2x) vs correct "an"
- Option D: Changed first word from `"A \`persistentVolumeClaim\`..."` to `"Provisioning a \`persistentVolumeClaim\` that the init container writes to and the main container reads"`.

### s02-q092 — giveaway: first-word cluster "configuration" (2x) vs correct "configmaps"
- Option A: Changed first word from `"Configuration files should be compiled..."` to `"All configuration files should be compiled into the application binary, validated at build, cached, and versioned internally"`.

### s02-q096 — giveaway: first-word cluster "fluentd" (2x) vs correct "the"
- Option D: Changed first word from `"Fluentd reads the node's kubelet configuration file..."` to `"Reading the node's kubelet configuration file lets Fluentd determine pod resource limits for enrichment"`. Also trims option A length to fix ratio from 1.194 to within 1.15.

### s02-q100 — giveaway: first-word cluster "it" (2x) vs correct "any"
- Option A: Changed first word from `"It embeds the ConfigMap content directly..."` to `"Embedding the ConfigMap content directly in the pod template reduces the need for a separate ConfigMap resource"`. Expands length to fix ratio from 1.168 to within 1.15.

## Round 49 — 2026-02-25
**File**: `set-02.js`
**Issues found**: 0

No changes needed. All 100 questions pass all five automated checkers (length balance at 1.15 threshold, giveaway patterns, backtick balance, first-word patterns, unique keywords) with 0 flags. Manual accuracy review confirmed all questions and correct answers are technically accurate. Answer distribution is balanced (A=26, B=26, C=24, D=24).

## Round 50 — 2026-02-25
**File**: `set-02.js`
**Issues found**: 0

No changes needed. All 100 questions pass all five automated checkers (length balance at 1.15 threshold, giveaway patterns, backtick balance, first-word patterns, unique keywords) with 0 flags. Full manual accuracy review of all 100 questions confirmed: correct answers are technically accurate, explanations are sound, no new giveaway patterns or structural issues detected. Answer distribution remains balanced (A=26, B=26, C=24, D=24).
