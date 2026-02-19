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
