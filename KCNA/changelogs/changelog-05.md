# Round 36 Review - set-05.js

**Date:** 2026-02-19
**Issues found:** 3
**Issues fixed:** 3

## Fixes

### s05-q006 (length-balance)
- **Problem:** Option C (117 chars) was 33% longer than the other options (82-89 chars).
- **Fix:** Shortened option C from "Projected tokens mounted via `automountServiceAccountToken` are long-lived and do not require separate Secret creation" to "Projected tokens from `automountServiceAccountToken` are already long-lived by default" (~85 chars).

### s05-q068 (accuracy/explanation)
- **Problem:** The explanation for option D stated "While the baseline profile does prohibit hostPath volumes, it does not merely restrict them to read-only access -- it forbids them outright." This was factually wrong. The baseline PSS does NOT prohibit or restrict hostPath at all; only the restricted profile prohibits hostPath.
- **Fix:** Changed the D explanation to: "The baseline profile does not restrict hostPath volumes at all; only the restricted profile prohibits hostPath volumes entirely, so the claim about baseline is incorrect." Also corrected the main explanation paragraph which contained the same factual error about the baseline profile.

### s05-q068 (length-balance)
- **Problem:** Option D (82 chars) was 25% longer than options A-C (65-67 chars).
- **Fix:** Shortened option D from "No, and the `baseline` profile also restricts hostPath volumes to read-only access" to "No, the `baseline` profile also restricts `hostPath` volumes" (~60 chars).

---

# Round 37 Review - set-05.js

**Date:** 2026-02-19
**Issues found:** 5
**Issues fixed:** 5
**Questions affected:** 4

## Fixes

### s05-q013 (giveaway)
- **Problem:** Options A and B both made the same wrong claim (that `CAP_NET_ADMIN` is in the default runtime set), creating a giveaway since two identical distractors are obviously wrong.
- **Fix:** Replaced option B from "CAP_NET_ADMIN is granted because it is included in the runtime default list" to "The container inherits CAP_NET_ADMIN from the host kernel automatically at startup". Updated B explanation accordingly.

### s05-q013 (length-balance)
- **Problem:** Option A (91 chars) was ~30% longer than options C/D (~70 chars).
- **Fix:** Shortened option A from "Most common capabilities including `CAP_NET_ADMIN` are granted by the default runtime config" to "`CAP_NET_ADMIN` is among the common capabilities in the default runtime set".

### s05-q004 (length-balance)
- **Problem:** Option A (72 chars) was noticeably longer than B and D (47 chars each).
- **Fix:** Rebalanced options A, B, and D. A: "During scheduling, after the PodSecurity admission phase completes". B: "During the image pull phase on the assigned worker node". D: "At runtime enforcement by the container runtime on the node".

### s05-q048 (explanation - contradictory wording)
- **Problem:** Option A said "read-only and write access" which is contradictory.
- **Fix:** Changed option A from "`admin` — grants read-only and write access within a namespace" to "`admin` — grants full read and write access within a namespace".

### s05-q064 (accuracy)
- **Problem:** Explanation incorrectly cited "Kubernetes 1.14" for the view ClusterRole excluding Secrets; this version reference is not accurate.
- **Fix:** Changed "Since Kubernetes 1.14, the built-in view ClusterRole excludes Secrets." to "The built-in view ClusterRole excludes Secrets by design."

---

# Round 38 Review - Set 05

**Date:** 2026-02-19
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s05-q012 (length-balance)
- **Options B, C, D:** Rebalanced. Shortened B and D, lengthened C to close 38.5% gap.

### s05-q043 (length-balance)
- **Option A:** Expanded. **Option D:** Shortened. Reduced 27.3% gap to ~11%.

### s05-q048 (length-balance)
- **Option C (correct):** Expanded "most resources" to "most namespace resources". **Option A:** Shortened "within" to "in".

### s05-q053 (length-balance)
- **Option A:** Shortened from ~82 to ~71 chars.

### s05-q089 (length-balance)
- **Option C:** Shortened from ~90 to ~77 chars.

### s05-q098 (length-balance)
- **Option A:** Shortened from ~80 to ~67 chars.

### s05-q086 (length-balance)
- **Options B, C, D:** Rebalanced. Shortened B and D, expanded C.

---

# Round 39 Review - Set 05

**Date:** 2026-02-21
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s05-q004 (length-balance - MEDIUM)
- **Problem:** Correct option C (52 chars) was shortest; A was 66 chars.
- **Fix:** Shortened A from "During scheduling, after the PodSecurity admission phase completes" to "During scheduling, after the PodSecurity admission phase". Expanded C (correct) from "During admission by the PodSecurity admission plugin" to "During the admission phase by the PodSecurity admission plugin".

### s05-q082 (structural giveaway - MEDIUM)
- **Problem:** Correct option D had a unique 3-item enum plus semicolon structure, making it stand out.
- **Fix:** Added enum structure to C: "Environment variables are injected once at startup, never refreshed, and become stale on rotation". Simplified D (correct): "Env vars leak through process listings and crash dumps while volume-mounted files do not".

### s05-q097 (length-balance - MEDIUM)
- **Problem:** Correct option B (60 chars) was shortest; A was 73 chars.
- **Fix:** Shortened A from "Only `app-config` is returned because `resourceNames` filters the listing" to "Only `app-config` is returned because `resourceNames` filters the list". Expanded B (correct) from "The request returns 403 Forbidden because `list` is required" to "The request returns 403 Forbidden because the `list` verb is required".

### s05-q022 (structural giveaway - LOW)
- **Problem:** Correct option B had a unique 3-comma structure.
- **Fix:** Simplified B (correct) from "A policy with `podSelector: {}`, `policyTypes: [Ingress]`, and no `ingress` field" to "A policy with `podSelector: {}` and `policyTypes: [Ingress]` but no ingress rules".

### s05-q033 (length-balance - LOW)
- **Problem:** Wrong option B was 78 chars; others were 63-65 chars.
- **Fix:** Shortened B from "`apiserver_audit_event_total` filtered with the stage label `ResponseComplete`" to "`apiserver_audit_event_total` filtered by stage `ResponseComplete`".

### s05-q007 (length-balance - LOW)
- **Problem:** Wrong option C was 78 chars; others were 63-71 chars.
- **Fix:** Shortened C from "Nothing, because ClusterRoles are only valid when bound by ClusterRoleBindings" to "Nothing, because a ClusterRole needs a ClusterRoleBinding to work".

### s05-q052 (length-balance - LOW)
- **Problem:** Wrong option D was 77 chars; others were 63-67 chars.
- **Fix:** Shortened D from "Each authenticator is assigned to specific API groups and evaluated per-group" to "Each authenticator is assigned to specific API groups for evaluation".

---

# Round 40 Review - Set 05

**Date:** 2026-02-21
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 11 across 11 questions

## Changes

### s05-q003 (length-balance)
- **Option A:** Shortened from "The container runs as root, overriding the pod-level `securityContext` setting" (78 chars) to "The container runs as root, overriding the pod-level security setting" (69 chars). Ratio was 1.182, now 1.045.

### s05-q008 (length-balance)
- **Option B:** Expanded from "Fluentd log aggregation paired with regex pattern matching" (58) to "Fluentd log aggregation paired with regex-based pattern matching" (64). **Option D (correct):** Expanded from "Falco with custom rules for runtime security monitoring" (55) to "Falco with custom rules for monitoring runtime syscall activity" (63). Correct was shortest at ratio 1.145, now mid-range at 1.085.

### s05-q029 (length-balance)
- **Option C (correct):** Expanded from "DNS fails because UDP port 53 is not permitted by the egress rule" (65) to "DNS fails because UDP port 53 is not allowed by the egress policy rule" (70). Correct was shortest at ratio 1.138, now mid-range at 1.104.

### s05-q044 (length-balance)
- **Options A, C, D:** Rebalanced. A (correct) expanded from 71 to 75, C shortened from 80 to 75, D expanded from 68 to 74. Ratio was 1.176, now 1.027.

### s05-q049 (length-balance)
- **Option A:** Expanded from 73 to 77 chars. **Option C (correct):** Shortened from "Attackers cannot install persistent backdoors since changes are lost on restart" (79) to "Attackers cannot persist backdoors since all changes are lost on restart" (72). Correct was longest at ratio 1.113, now mid-range at 1.085.

### s05-q060 (length-balance)
- **Option B (correct):** Shortened from "If the gateway is compromised, all backend services are accessible unauthenticated" (82) to "If the gateway is compromised, all backend services become accessible directly" (78). Correct was longest at ratio 1.079, now mid-range at 1.039.

### s05-q067 (length-balance)
- **Option B:** Shortened from "An error is raised because of the conflicting automount settings" (64) to "An error is raised because of conflicting automount configuration" (65). **Option C (correct):** Expanded from "The Pod spec setting takes precedence and the token is mounted" (62) to "The Pod spec setting takes precedence and a token is mounted normally" (69). Correct was shortest at ratio 1.081, now within range at 1.095.

### s05-q073 (length-balance)
- **Option A:** Expanded from "A `nodeSelector` entry matching the `security: high` node label" (63) to "A `nodeSelector` entry matching the `security: high` label on nodes" (67). **Option B (correct):** Expanded from "A `toleration` matching the taint `security=high:NoSchedule`" (60) to "A `toleration` for the taint `security=high:NoSchedule` in the spec" (67). Correct was shortest at ratio 1.133, now tied at 1.075.

### s05-q077 (length-balance)
- **Option C (correct):** Adjusted from "An HTTP 200 with a `TokenReview` response containing user identity" (66) to "An HTTP 200 with a `TokenReview` response that contains user identity" (69). **Option D:** Adjusted from "An HTTP 200 response with a plain-text `username` string in the body" (68) to "An HTTP 200 response with a plain-text `username` value in the body" (67). Correct was shortest at ratio 1.091, now mid-range at 1.075.

### s05-q085 (length-balance)
- **Option C (correct):** Expanded from "Access to the API server's `/healthz` and `/metrics` HTTP endpoints" (67) to "Access to the API server's own `/healthz` and `/metrics` HTTP endpoints" (71). **Option D:** Shortened from "Read-only access to all `CustomResourceDefinition` objects across the cluster" (77) to "Read-only access to all `CustomResourceDefinition` objects in the cluster" (73). Correct was shortest at ratio 1.149, now mid-range at 1.074.

### s05-q087 (length-balance)
- **Option A:** Expanded from "The update succeeds but triggers an automatic Pod restart cycle" (63) to "The update succeeds but triggers an automatic Pod restart cycle for consumers" (77). **Option C:** Shortened from "The `immutable` field is advisory only and does not enforce any restriction" (75) to "The `immutable` field is advisory and does not enforce any restriction" (70). Ratio was 1.190, now 1.132.

---

# Round 41 Review - Set 05

**Date:** 2026-02-21
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 12 across 12 questions

## Changes

### s05-q004 (length-balance)
- **Options A, B, C, D:** Rebalanced all four options. A from "During scheduling, after the PodSecurity admission phase" (56) to "During scheduling, after the admission check completes" (54). B from "During the image pull phase on the assigned worker node" (55, unchanged). C (correct) from "During the admission phase by the PodSecurity admission plugin" (62) to "During API admission by the PodSecurity admission plugin" (56). D unchanged at 55. Ratio was 1.127 with correct longest, now 1.037 with correct mid-range.

### s05-q007 (length-balance)
- **Option B (correct):** Expanded from "Create and delete Deployments only in the `dev` namespace scope" (63) to "Create and delete Deployments only within the `dev` namespace scope" (67). **Option D:** Shortened from "Create Deployments in `dev` but delete them across all other namespaces" (71) to "Create Deployments in `dev` but delete them in all other namespaces" (67). Ratio was 1.127 with correct shortest, now 1.031.

### s05-q013 (length-balance)
- **Options A, B, C, D:** Rebalanced. A from 75 to 67. B shortened from 84 to 70. C (correct) reworded to "The default capability set granted by the runtime excludes `CAP_NET_ADMIN`" (74). D shortened from 77 to 73. Ratio was 1.120 with correct shortest, now 1.100 with correct mid-range.

### s05-q023 (length-balance)
- **Options A, B, C, D:** Reformatted all options for consistent structure: "The `X` set to `Y`" pattern. Ratio was 1.098 with correct longest, now 1.071 with correct still longest but within threshold.

### s05-q043 (length-balance)
- **Option C (correct):** Reworded from "A breach in one service's database does not expose other services' data" (71) to "A breach in one service's database does not expose data from other services" (75). **Option D:** Shortened from "Per-service databases reduce the total network connections that need monitoring" (79) to "Per-service databases reduce the total network connections needing monitoring" (77). Ratio was 1.113 with correct shortest, now 1.040 with correct mid-range.

### s05-q052 (structural-giveaway)
- **Option C (correct):** Removed unique semicolon. Changed from "All configured authenticators are tried; the first success is used" to "All configured authenticators are tried and the first success wins".

### s05-q055 (structural-giveaway)
- **Option D (correct):** Removed unique semicolon. Changed from "It encrypts data with a public key; only the in-cluster controller decrypts" to "It encrypts data with a public key and only the in-cluster controller decrypts".

### s05-q057 (structural-giveaway + length-balance)
- **Option D (correct):** Removed unique semicolon and reduced from longest. Changed from "Existing mounted data remains temporarily; the kubelet logs errors on the next sync attempt" (91) to "Existing mounted data remains temporarily and the kubelet logs errors on the next sync" (86). Now mid-range rather than tied-longest.

### s05-q059 (structural-giveaway + length-balance)
- **Option A (correct):** Removed unique semicolon and shortened. Changed from "Tags are mutable and can be repointed to a different image; digests are immutable" to "Tags are mutable and can point to different images while digests are immutable" (78). Was longest at 84, now mid-range.

### s05-q066 (structural-giveaway)
- **Option D (correct):** Removed unique parenthetical. Changed from "In the Istio proxy (Envoy) container's access logs for denials" to "In the sidecar proxy container's access logs for policy denials". Explanation still correctly references Envoy/Istio.

### s05-q072 (length-balance)
- **Options A, B, C, D:** Rebalanced all four. B (correct) expanded from 63 to 69. A expanded from 66 to 70. D expanded from 63 to 67. Ratio was 1.111 with correct shortest, now 1.045 with correct mid-range.

### s05-q079 (structural-giveaway)
- **Option A (correct):** Removed unique semicolon. Changed from "Secrets cannot be used across namespaces; it must exist in the Pod's namespace" (78) to "Secrets cannot be used across namespaces and the Secret must exist in `production`" (82). Also improved specificity by referencing the namespace from the question.

---

# Round 42 Review - Set 05

**Date:** 2026-02-21
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 7 across 5 questions

## Changes

### s05-q002 (backtick-density giveaway + length-balance)
- **Options A, B, C, D:** Correct option A had 10 backticks (5 backtick-pairs) vs max 6 in others, creating a structural giveaway. Removed backticks from namespace name literals (already identified in question stem) across all options and added `podSelector`/`namespaceSelector` backtick terms to C and D for balance. A: bt 10->6, B: bt 6->4, C: bt 4->4, D: bt 6->4. Ratio was 1.096, now 1.106 (within bounds).

### s05-q018 (length-balance)
- **Option A:** Expanded from "`None` — disables all audit logging for the matched resource" (60) to "`None` — disables all audit logging for the matched resource entirely" (69). Ratio was 1.150, now 1.062.

### s05-q040 (length-balance)
- **Option C:** Expanded from "View Pod execution logs across the entire cluster scope" (55) to "View Pod execution logs across the entire cluster-wide scope" (60). **Option D:** Shortened from "Create Pods but not execute commands inside existing containers" (63) to "Create new Pods but not execute commands inside existing ones" (61). Ratio was 1.145, now 1.089.

### s05-q080 (length-balance)
- **Option D:** Shortened from "A workload secrets management system designed to replace native Kubernetes Secrets" (82) to "A workload secrets management system that replaces native Kubernetes Secrets" (76). Ratio was 1.123, now 1.041.

### s05-q087 (length-balance)
- **Option A:** Shortened from "The update succeeds but triggers an automatic Pod restart cycle for consumers" (77) to "The update succeeds but triggers an automatic Pod restart cycle afterward" (73). Ratio was 1.132, now 1.074.

---

# Round 43 Review - Set 05

**Date:** 2026-02-21
**File:** `KCNA/data/set-05.js`
**Issues fixed:** 4 across 4 questions

## Changes

### s05-q001 (unique-because giveaway)
- **Option D:** Changed from "The ClusterRoleBinding escalates the Role permissions to apply cluster-wide" to "The ClusterRoleBinding escalates the Role because it is a cluster-level binding". Added "because" clause to balance the structural pattern where only the correct answer (A) used "because" reasoning. Updated D explanation accordingly.

### s05-q051 (unique-because giveaway)
- **Option C:** Changed from "The RoleBinding is created but the `delete nodes` permission is silently ignored by the API" to "The RoleBinding is created but `delete nodes` is ignored because nodes are cluster-scoped". Added "because" clause to balance the structural pattern where only the correct answer (B) used "because" reasoning. Updated C explanation accordingly.

### s05-q087 (unique-because giveaway)
- **Option A:** Changed from "The update succeeds but triggers an automatic Pod restart cycle afterward" to "The update succeeds because `immutable` does not block data-field changes". Added "because" clause to balance the structural pattern where only the correct answer (D) used "because" reasoning. Updated A explanation accordingly.

### s05-q100 (unique-because giveaway)
- **Option A:** Changed from "The ClusterRoleBinding is created successfully without any restriction or warning" to "The ClusterRoleBinding is created because the SA has `create` on ClusterRoleBindings". Added "because" clause to balance the structural pattern where only the correct answer (B) used "because" reasoning. Updated A explanation accordingly.

---

## Round 44 — 2026-02-23
**File**: `set-05.js`
**Issues found**: 4

### s05-q044 (unique-including giveaway)
- **Option A (correct):** Changed from "Receive a real-time stream of Secret objects including full data on changes" to "Receive a real-time stream of Secret objects with full data on every change". Removed unique "including" from the correct answer, which was not present in any distractor.

### s05-q091 (unique-like giveaway)
- **Option B:** Changed from "Managing RBAC certificates used for user authentication to the API server" to "Managing RBAC certificates like client certs used for API server auth". Added "like" to distractor B to balance the pattern where only the correct answer (A) used "like".

### s05-q017 (unique-both/not-just giveaway)
- **Option D (correct):** Changed from "mTLS authenticates both client and server, not just the server side" to "mTLS verifies the identity of the client and server in each connection". Removed unique "both...not just" contrast pattern from the correct answer, which made it structurally distinct from all distractors.

### s05-q059 (unique-while giveaway)
- **Option A (correct):** Changed from "Tags are mutable and can point to different images while digests are immutable" to "Tags are mutable and can be repointed to a different image; digests are immutable". Removed unique "while" contrast pattern. Added semicolon to distractor D ("Digests are required by default admission controllers; tags are being deprecated") to balance the semicolon usage.

---

## Round 45 — 2026-02-23
**File**: `set-05.js`
**Issues found**: 3

### s05-q045 (length-balance)
- **Option D:** Shortened from "After the Secret is deleted and recreated as a new resource in the namespace" (76 chars) to "After the Secret is first deleted and then recreated as a new resource" (70 chars). Ratio was 1.118 (D longest at 76 vs A/B at 68), now 1.029.

### s05-q068 (length-balance)
- **Option D:** Expanded from "No, the `baseline` profile also restricts `hostPath` volumes" (60 chars) to "No, the `baseline` profile also restricts `hostPath` volume mounts" (66 chars). Ratio was 1.133 (D shortest at 60 vs A at 68), now 1.046.

### s05-q082 (length-balance)
- **Option C:** Shortened from "Environment variables are injected once at startup, never refreshed, and become stale on rotation" (97 chars) to "Environment variables are injected at startup and are never refreshed on rotation" (81 chars). Ratio was 1.115 (C longest at 97 vs B at 87), now 1.099.
