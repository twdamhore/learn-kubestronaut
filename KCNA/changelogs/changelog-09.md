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

---

# Round 38 Review - Set 09

**Date:** 2026-02-19
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 18 across 16 questions

## Changes

### s09-q011 (length-balance)
- **Option B (answer):** Expanded ~97→~108 chars. **Option D:** Trimmed ~120→~108 chars.

### s09-q013 (length-balance)
- **Option C:** Expanded ~100→~112 chars. **Option D:** Trimmed ~126→~114 chars.

### s09-q016 (length-balance)
- **Option A:** Expanded ~91→~100 chars. **Option C:** Trimmed ~111→~100 chars.

### s09-q020 (length-balance)
- **Option A:** Expanded ~92→~102 chars. **Option B:** Trimmed ~116→~105 chars.

### s09-q023 (length-balance)
- **Option D (answer):** Expanded ~81→~92 chars.

### s09-q027 (length-balance)
- **Option C:** Expanded ~85→~97 chars.

### s09-q028 (length-balance)
- **Option A (answer):** Expanded ~96→~105 chars. **Option C:** Trimmed ~116→~105 chars.

### s09-q047 (length-balance, residual)
- **Options A, B:** Trimmed. **Option D (answer):** Expanded.

### s09-q058 (length-balance, residual)
- **Option A:** Trimmed. **Option D:** Expanded.

### s09-q061 (length-balance)
- **Option A:** Trimmed. **Option D:** Expanded.

### s09-q063 (length-balance)
- **Option A:** Trimmed. **Option C:** Expanded.

### s09-q065 (length-balance)
- **Option A (answer):** Expanded. **Option C:** Trimmed.

### s09-q073 (length-balance, residual)
- **Option C:** Expanded. **Option B:** Trimmed.

### s09-q089 (length-balance)
- **Option D:** Expanded. **Option C:** Trimmed.

### s09-q095 (length-balance, residual)
- **Options A, B:** Expanded. **Option C:** Trimmed.

### s09-q059 (giveaway)
- **Option B:** Added concrete mechanism name (node eviction manager).

### s09-q053 (giveaway)
- **Option C:** Added percentage comparison to match correct answer's formula.

---

# Round 39 Review - Set 09

**Date:** 2026-02-21
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 8 across 8 questions

## Changes

### s09-q023 (length-balance)
- **Option A:** Expanded ~85->96 chars. Reworded to "for CoreDNS to generate DNS records for the Service".
- **Option D (answer):** Trimmed ~105->96 chars. Shortened "without a custom dnsConfig specifying a nameserver pointing to CoreDNS" to remove "specifying a nameserver".

### s09-q028 (length-balance)
- **Option A (answer):** Trimmed ~125->101 chars. Changed "with an appropriate encryption provider" to "with a provider".
- **Option B:** Restored to original 101 chars (removed "sensitive" added during over-expansion).

### s09-q029 (accuracy)
- **Question text:** Changed "a CNCF project" to "a Kubernetes-native project" since Tekton is a CDF (Continuous Delivery Foundation) project, not CNCF.
- **Explanation:** Changed "Tekton is a CNCF project" to "Tekton is a Continuous Delivery Foundation (CDF) project" and added clarifying note.

### s09-q034 (explanation)
- **Option A explanation:** Changed inaccurate "it still progressively replaces Pods" to "maxSurge: 100% creates all new Pods at once, but old Pods are still removed progressively and there is no explicit traffic-switch step, so it is not blue-green".

### s09-q070 (length-balance)
- **Option A:** Trimmed ~115->107 chars. Changed "the cluster's current amd64" to "the cluster's amd64".
- **Option C (answer):** Expanded ~99->104 chars. Changed "than available" to "than is available" and "blocks" to "prevents".

### s09-q071 (length-balance)
- **Option A:** Trimmed ~102->93 chars. Removed "endpoint" at end.
- **Option B:** Trimmed ~107->96 chars. Changed "the CoreDNS server" to "CoreDNS".
- **Option C (answer):** Expanded ~91->99 chars. Changed "which the client then resolves" to "which the client resolver then follows".

### s09-q086 (accuracy)
- **Explanation:** Changed "OpenCost (a CNCF sandbox project)" to "OpenCost (a CNCF Incubating project)" to reflect current maturity level as of Feb 2026.

### s09-q098 (length-balance)
- **Option A (answer):** Trimmed ~101->97 chars. Changed "The failurePolicy field" to "The webhook's failurePolicy field" and simplified end clause.
- **Option D:** Trimmed ~118->102 chars. Replaced "ValidatingWebhookConfiguration resources are advisory and do not block requests" with "validating webhook configurations are advisory and non-blocking".

---

# Round 40 Review - Set 09

**Date:** 2026-02-21
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 14 across 12 questions

## Changes

### s09-q006 (length-balance)
- **Option A:** Trimmed ~110->94 chars. Changed "Argo CD requires Flux to be installed as" to "Argo CD requires Flux as".
- **Option B (answer):** Expanded ~95->100 chars. Changed "not applied" to "not auto-applied".

### s09-q033 (giveaway)
- **Option D:** Added semicolon to match structural pattern of correct answer A. Changed "not configuration resources" to "; configuration resources like ConfigMaps are excluded".

### s09-q059 (length-balance)
- **Option B:** Trimmed ~133->118 chars. Shortened "are tracked separately, and the node eviction manager reclaims them" to "are tracked separately by the node eviction manager".

### s09-q062 (length-balance)
- **Option C:** Expanded ~91->100 chars. Added "images" after "older tagged".
- **Option D:** Trimmed ~108->100 chars. Removed "The cluster's" prefix, starting with "CoreDNS".

### s09-q069 (giveaway)
- **Option D:** Added semicolon to match structural pattern of correct answer C. Changed "so the original" to "; the original".

### s09-q077 (giveaway)
- **Option B:** Added semicolon to match structural pattern of correct answer D. Changed "by default while" to "by default;".

### s09-q080 (giveaway)
- **Option A:** Added semicolon to match structural pattern of correct answer B. Changed "which validates it, forwards it" to "which validates it; the scheduler forwards it".

### s09-q084 (giveaway + length-balance)
- **Option A:** Added semicolon to match structural pattern of correct answer C. Changed "is malformed and needs" to "is malformed; the".
- **Option D:** Trimmed ~111->97 chars. Removed "The cluster's" prefix, starting with "CoreDNS".

### s09-q092 (giveaway)
- **Option C:** Added semicolon to match structural pattern of correct answer A. Changed "and waits" to "; it then waits".

### s09-q093 (giveaway)
- **Option A:** Added parenthetical "(separate from the HPA)" to match the parenthetical enumeration pattern in correct answer B.

### s09-q095 (giveaway)
- **Option C:** Added semicolon to match structural pattern of correct answer D. Changed "objects and cannot" to "objects; they cannot". Also expanded to ~120 chars by appending "like Pods".

### s09-q099 (length-balance + giveaway)
- **Option B:** Added parenthetical "(liveness and readiness)" to match parenthetical in correct answer C. Expanded ~110->115 chars.
- **Option C (answer):** Changed semicolon to "and" to reduce structural uniqueness. Expanded ~101->104 chars.

---

# Round 41 Review - Set 09

**Date:** 2026-02-21
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 28 across 22 questions

## Changes

### s09-q004 (giveaway)
- **Option A:** Added comma-list "traces, logs, and spans" to match the comma-heavy structure of correct answer C.
- **Option D:** Added comma-list "collect, transform, and forward" to match comma pattern.

### s09-q012 (length-balance)
- **Option B:** Trimmed ~109->104 chars. Removed "then" before "hands them off".
- **Option D (answer):** Expanded ~97->104 chars. Changed "does not list them" to "does not list any of them".

### s09-q021 (length-balance)
- **Option C:** Expanded ~94->103 chars. Added "suitable" before "LimitRange".
- **Option D (answer):** Trimmed ~105->99 chars. Changed "containers must specify CPU requests and limits" to "CPU requests and limits must be specified".

### s09-q029 (giveaway)
- **Option B:** Added parenthetical "(Alertmanager rules)" to match answer A's parenthetical "(Tasks, Pipelines, PipelineRuns)".

### s09-q030 (length-balance)
- **Option A (answer):** Expanded ~95->102 chars. Added "plugin" after "tail input".
- **Option C:** Trimmed ~107->99 chars. Restructured wording and removed "unique" before "_id".

### s09-q031 (giveaway)
- **Option B:** Added parenthetical "(X.509)" to match answer D's parenthetical "(iptables or IPVS)".

### s09-q032 (giveaway)
- **Option B:** Added parenthetical "(custom.metrics.k8s.io)" to match answer A's parenthetical "(metrics.k8s.io)".

### s09-q034 (length-balance)
- **Option B (answer):** Expanded ~94->100 chars. Added "a" before "version: v2" and "its" before "health".
- **Option D:** Trimmed ~105->101 chars. Removed "all" before "incoming traffic".

### s09-q037 (length-balance)
- **Option C (answer):** Expanded ~84->91 chars. Changed "routes to" to "is routed to" and "matches" to "starts with".

### s09-q042 (length-balance)
- **Option C (answer):** Expanded ~81->89 chars. Changed "in that namespace" to "applied in that namespace".
- **Option D:** Expanded ~83->90 chars. Added "labels" after "metadata".

### s09-q047 (giveaway)
- **Option A:** Added parenthetical "(round-robin)" to match answer D's parenthetical "(by ordinal)".

### s09-q050 (giveaway)
- **Option D:** Added parenthetical "(Prometheus and Elasticsearch)" to match answer C's parenthetical "(Prometheus, Elasticsearch)".

### s09-q054 (giveaway)
- **Option C:** Restructured to include parenthetical "(average and percentile)" to match answer B's "(Gantt chart)".

### s09-q056 (length-balance)
- **Option D (answer):** Expanded ~89->94 chars. Changed "are unaffected" to "continue unaffected".

### s09-q057 (giveaway)
- **Option A:** Added parenthetical "(or similar)" to match answer B's "(Argo CD or Flux)".

### s09-q064 (giveaway)
- **Option D:** Added parenthetical "(client and server)" to match answer B's "(NATS, Kafka, or RabbitMQ)".

### s09-q069 (giveaway)
- **Option A:** Added parenthetical "(symmetric encryption)" to match answer C's "(not encrypted)".

### s09-q080 (length-balance)
- **Option A:** Trimmed ~148->132 chars. Replaced "and the API server persists it in etcd" with "for persistence in etcd".

### s09-q083 (giveaway)
- **Option A:** Added parenthetical "(any origin)" to match answer D's "(OPA Gatekeeper or Kyverno)".

### s09-q088 (length-balance)
- **Option C:** Expanded ~80->87 chars. Added "strict" before "ordering".

### s09-q091 (giveaway)
- **Option B:** Added parenthetical "(KVM)" to match answer A's "(runsc)".

### s09-q096 (length-balance)
- **Option D:** Trimmed ~107->93 chars. Changed "communicates primarily with" to "communicates only with" and "has limited access to cluster-networked Pods" to "cannot reach cluster-networked Pods".

### s09-q099 (length-balance)
- **Option B:** Trimmed ~115->104 chars. Removed "completely" before "replaces".
- **Option C (answer):** Expanded ~104->109 chars. Added "both" before "liveness and readiness".

### s09-q020 (giveaway)
- **Option B:** Added parenthetical "(the original install state)" to match answer C's parenthetical by restructuring "which is the original install state".

### s09-q004 note
- Comma-list giveaway: answer C had 5 commas while distractors had 1 each. Added comma-lists to options A and D to balance the structural pattern.

---

# Round 42 Review - Set 09

**Date:** 2026-02-21
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 22 across 18 questions

## Changes

### s09-q007 (length-balance)
- **Option C (answer):** Expanded ~79->88 chars. Added "that" before "the Service selector" for natural phrasing.
- **Option D:** Expanded ~78->89 chars. Added "to allow higher ports" at end.

### s09-q013 (length-balance)
- **Option C:** Trimmed ~124->102 chars. Removed "of available" and "from traces" to reduce outlier length.

### s09-q014 (length-balance)
- **Option A:** Trimmed ~107->93 chars. Removed "their contents" to reduce outlier length.

### s09-q016 (length-balance)
- **Option B:** Expanded ~92->97 chars. Changed "the running" to "the still-running" for consistency with option A wording.

### s09-q025 (length-balance)
- **Option B (answer):** Trimmed ~108->93 chars. Changed "so the DaemonSet Pod is permitted onto the tainted node" to "so the DaemonSet Pod tolerates the taint".
- **Option C:** Expanded ~95->96 chars. Added "all" before "tainted nodes".

### s09-q047 (length-balance)
- **Option C:** Trimmed ~119->99 chars. Removed "Kubernetes" and "entirely" to reduce outlier length.
- **Option D (answer):** Trimmed ~117->98 chars. Changed "that returns all Pod IPs in the response" to "returning all Pod IPs".

### s09-q048 (length-balance)
- **Option B:** Expanded ~84->100 chars. Added "automatically" before "set equal" and "of" after "value".
- **Option C (answer):** Expanded ~85->91 chars. Added "limit" after "default".

### s09-q049 (length-balance)
- **Option A:** Expanded ~89->94 chars. Added "data" before "cleanup".

### s09-q053 (length-balance)
- **Option A:** Trimmed ~110->103 chars. Changed "the target threshold" to "the threshold".

### s09-q068 (length-balance)
- **Option C:** Expanded ~89->97 chars. Added "traffic" after "50% hash ring".

### s09-q069 (length-balance)
- **Option B:** Expanded ~94->102 chars. Added "cluster" before "CA".

### s09-q073 (length-balance + giveaway)
- **Option C:** Expanded ~95->103 chars. Added "setting" at end.
- **Option D (answer):** Trimmed ~105->101 chars. Changed "AWS EBS" to "EBS".

### s09-q079 (length-balance)
- **Option A:** Expanded ~96->105 chars. Added "log formats" after "plain text".
- **Option B:** Trimmed ~109->99 chars. Changed "for large clusters" to "at scale".

### s09-q081 (length-balance)
- **Option D:** Expanded ~94->109 chars. Added "reconciliation" before "dashboard".

### s09-q083 (length-balance + giveaway)
- **Option B:** Expanded ~94->98 chars. Added "all" before "outbound traffic".
- **Option D (answer):** Trimmed ~104->98 chars. Changed "on Pod creation" to "at creation".

### s09-q089 (length-balance)
- **Option C:** Expanded ~92->101 chars. Added "rendered" before "Helm template".

### s09-q091 (length-balance + giveaway)
- **Option A (answer):** Trimmed ~108->106 chars. Changed "use gVisor" to "run under gVisor" and "instead of the default runc runtime" to "instead of the default runc".
- **Option C:** Trimmed ~104->100 chars. Removed "its" before "containers".
- **Option D:** Trimmed ~103->100 chars. Changed "the Pod" to "Pods" at end.

### s09-q095 (length-balance + giveaway)
- **Option C:** Trimmed ~120->103 chars. Changed "namespace-scoped resources like Pods" to "Pods or Deployments".
- **Option D (answer):** Trimmed ~115->108 chars. Changed "annotations are non-identifying metadata not used by" to "annotations store non-identifying metadata not used by" and "labels are required for selection" to "labels handle selection".

---

# Round 43 Review - Set 09

**Date:** 2026-02-23
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 5 across 3 questions

## Changes

### s09-q005 (giveaway - code tag imbalance)
- **Option A:** Added `<code>kubernetes_sd_configs</code>` to balance code tag presence across options. Trimmed "allocated" to keep length under ratio 1.15.
- **Option C:** Added `<code>ServiceMonitor</code>` to balance code tag presence. Trimmed trailing phrase for length balance.
- Previously only the correct answer (D) had a `<code>` tag, making it visually distinct. Now A, C, and D all have code formatting.

### s09-q023 (giveaway - code density imbalance)
- **Option A:** Added `<code>LoadBalancer</code>` around the Service type to add a code tag (was 0, now 1).
- **Option C:** Added `<code>ClusterIP</code>` around the address type to add a code tag (was 0, now 1).
- Previously A and C had 0 code tags while the correct answer D had 3. Now all four options have at least 1 code tag.

### s09-q098 (giveaway - code tag imbalance)
- **Option B:** Added `<code>timeoutSeconds</code>` to balance code tag presence. Changed "until the endpoint becomes reachable" to "until the timeoutSeconds value expires" to naturally incorporate the code term.
- Previously only the correct answer (A) had a `<code>` tag. Now A and B both have code formatting.

---

## Round 44 — 2026-02-23
**File**: `set-09.js`
**Issues found**: 11

### s09-q011 — giveaway: "because" uniquely in correct answer
- **Option C:** Changed "due to" to "because of" so that B (correct) is no longer the only option containing "because".

### s09-q016 — giveaway: "because" uniquely in correct answer
- **Option A:** Reworded to include "because" ("runs concurrently because the Forbid policy allows overlapping runs") so D (correct) is not the only option with "because". Trimmed to 95 chars for length balance.

### s09-q021 — giveaway: "because" uniquely in correct answer
- **Option B:** Reworded to include "because" ("automatically adjusted because the API server detects unset resource fields") so D (correct) is not the only option with "because".

### s09-q029 — giveaway: comma-list uniquely in correct answer
- **Option C:** Added comma-separated list "build, test, and deploy" (was "build stages") to balance the comma-heavy pattern of correct answer A ("Tasks, Pipelines, PipelineRuns"). Trimmed "pipeline" to keep length under ratio.

### s09-q055 — giveaway: comma-list uniquely in correct answer
- **Option D:** Added comma-separated list "handshakes, slow starts, and teardowns" to balance correct answer A's "TLS, routing, and telemetry". Trimmed "TCP" and "every single" to keep length under ratio.

### s09-q061 — giveaway: "because" uniquely in correct answer
- **Option D:** Reworded to include "because" ("dropped from the scrape configuration because three consecutive timeouts trigger its removal") so C (correct) is not the only option with "because". Trimmed to 106 chars for length balance.

### s09-q072 — giveaway: comma-list uniquely in correct answer
- **Option A:** Added comma-separated list "threats, anomalous syscalls, and policy violations" to balance correct answer B's "images, filesystems, and Git repos". Trimmed trailing "on the cluster" for length balance.

### s09-q073 — giveaway: "because" uniquely in correct answer
- **Option A:** Reworded to include "because" ("bound to a 10Gi EBS volume because EBS natively supports") so D (correct) is not the only option with "because".

### s09-q078 — giveaway: comma-list uniquely in correct answer
- **Option C:** Restructured to include "mTLS, retries, and circuit breaking" comma-list matching correct answer B's pattern. Shortened from 130 to 123 chars.

### s09-q086 — giveaway: "like" uniquely in correct answer
- **Option C:** Added "like a GPU or compute tier" to balance correct answer B's "like Kubecost". Trimmed "regardless of utilization" for length balance.

### s09-q094 — giveaway: "like" uniquely in correct answer (only "such as" in C)
- **Option D:** Added "like bytes sent and received" to balance correct answer A's "like Deployment replicas". Now A and D both use "like" while C uses "such as".

---

## Round 45 — 2026-02-23
**File**: `set-09.js`
**Issues found**: 6

### s09-q034 — giveaway: comma-separated clauses uniquely in correct answer
- **Option D:** Restructured from "Deploy v2 Pods into a separate namespace and use an ExternalName Service to redirect incoming traffic" to "Deploy v2 Pods into a separate namespace, configure an ExternalName Service, and redirect incoming traffic" to add comma-separated clauses matching correct answer B's multi-clause structure.

### s09-q064 — giveaway: comma-list uniquely in correct answer
- **Option C:** Changed "polls for new records on a scheduled interval" to "polls for inserts, updates, and deletes on a timer" to add a three-item comma-list matching correct answer B's "(NATS, Kafka, or RabbitMQ)" pattern.

### s09-q067 — giveaway: comma-separated clauses uniquely in correct answer
- **Option B:** Restructured from "The kubelet automatically restarts all Pods on the node to attempt reconnection to the API server endpoint" to "The kubelet restarts all Pods on the node, clears their caches, and reattempts connection to the API server" to add comma-separated clauses matching correct answer A's multi-clause structure.

### s09-q094 — giveaway: comma-list uniquely in correct answer
- **Option B:** Changed "Node CPU utilization and memory usage at the hardware level collected from system-level exporters" to "Node CPU utilization, memory usage, and disk I/O at the hardware level from system-level exporters" to add a three-item comma-list matching correct answer A's "Deployment replicas, Pod phase, and Job status" pattern. Updated explanation to match.

### s09-q096 — giveaway: comma-separated clauses uniquely in correct answer
- **Option A:** Restructured from "The Pod receives a dedicated ClusterIP that routes traffic on port 80 through the kube-proxy rules" to "The Pod receives a dedicated ClusterIP, routes traffic on port 80, and uses kube-proxy iptables rules" to add comma-separated clauses matching correct answer C's multi-clause structure.

### s09-q048 — giveaway: "since" uniquely in correct answer
- **Option C (correct):** Changed "The LimitRange default limit of `500m` is applied since the developer did not specify a limit" to "The LimitRange default limit of `500m` is applied when the developer does not specify a limit". The causal conjunction "since" was uniquely present in the correct answer, providing a structural giveaway to test-savvy students.

---

## Round 46 — 2026-02-24
**File**: `set-09.js`
**Issues found**: 5

### s09-q036 — giveaway: "while" uniquely in correct answer
- **Option B:** Changed "which interposes a user-space kernel to intercept all system calls for application-level sandboxing" to "which interposes a user-space kernel to intercept system calls while providing sandbox isolation" so that the correct answer C is no longer the only option containing the contrast connector "while".

### s09-q039 — giveaway: "while" uniquely in correct answer
- **Option D:** Changed "It live-migrates all running containers from the node to other available nodes without restarting them" to "It live-migrates all running containers to other available nodes while preserving their in-memory state" so that the correct answer A is no longer the only option containing "while".

### s09-q043 — giveaway: "while" uniquely in correct answer
- **Option A:** Changed "A Gateway resource configured with dual upstream backends for mirroring production traffic to the canary" to "A Gateway resource configured with dual upstream backends for mirroring traffic while routing to the canary" so that the correct answer D is no longer the only option containing "while".

### s09-q077 — giveaway: "until" uniquely in correct answer
- **Option A:** Changed "All ingress and egress traffic is denied by default when a CNI plugin with NetworkPolicy support is installed in the cluster" to "All ingress and egress traffic is denied by default until the CNI plugin with NetworkPolicy support completes its initialization" so that the correct answer D is no longer the only option containing the conditional qualifier "until".

### s09-q081 — giveaway: "unless" uniquely in correct answer
- **Option C:** Changed "Exactly 5 minutes after the broken manifest was deployed, regardless of when the fix was pushed later" to "Exactly 5 minutes after the broken manifest was deployed, unless Flux detects a faster polling source" so that the correct answer B is no longer the only option containing the conditional qualifier "unless".

---

# Round 47 Review - set-09.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-09.js`
**Issues fixed:** 7

---

## s09-q009 (length-balance)

**Problem:** Correct answer B (90 chars) was the shortest option in a set with ratio 1.11, making it stand out as an outlier.
**Change:** Expanded B from ~90 to ~99 chars by adding "enforced" before "on the namespace".

---

## s09-q016 (length-balance)

**Problem:** Correct answer D (94 chars) was the shortest option in a set with ratio 1.11.
**Change:** Expanded D from ~94 to ~98 chars by changing "under Forbid policy" to "under the Forbid policy".

---

## s09-q021 (length-balance)

**Problem:** Correct answer D (99 chars) was the shortest, while B (110 chars) was the longest, giving ratio 1.11.
**Change:** Trimmed B from ~110 to ~96 chars by changing "The ResourceQuota configuration" to "The ResourceQuota".

---

## s09-q029 (length-balance)

**Problem:** Correct answer A (90 chars) was the shortest option in a set with ratio 1.11.
**Change:** Expanded A from ~90 to ~97 chars by adding "native" before "Kubernetes CRDs".

---

## s09-q032 (length-balance)

**Problem:** Correct answer A (94 chars) was the shortest option in a set with ratio 1.11.
**Change:** Expanded A from ~94 to ~102 chars by changing "for the cluster" to "required by the cluster".

---

## s09-q047 (length-balance)

**Problem:** Correct answer D (98 chars) was the shortest, while A (110 chars) was the longest outlier, giving ratio 1.12.
**Change:** Trimmed A from ~110 to ~102 chars by removing "routing" from "routing rules".

---

## s09-q089 (length-balance)

**Problem:** Correct answer B (94 chars) was the shortest option in a set with ratio 1.11.
**Change:** Expanded B from ~94 to ~99 chars by adding "file" after "staging-values.yaml".
