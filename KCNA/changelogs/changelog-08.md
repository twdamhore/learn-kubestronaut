# Round 36 Review — set-08.js

**Date:** 2026-02-19
**Issues fixed:** 7

## Changes

### s08-q025 (accuracy)
- **Problem:** The question asked about generic serverless capability, but KEDA is also a valid CNCF graduated project for scale-to-zero, making the Knative answer ambiguous.
- **Fix:** Rephrased the question stem to explicitly mention "HTTP request-driven serverless workloads with built-in scale-to-zero" to make Knative the unambiguous correct answer vs. KEDA.

### s08-q036 (accuracy)
- **Problem:** Option A incorrectly attributed the `Task` CRD to Argo Workflows. Argo Workflows uses `Workflow` and `WorkflowTemplate` CRDs, not `Task`.
- **Fix:** Rewrote option A to: "Argo Workflows -- uses Workflow and WorkflowTemplate CRDs to define multi-step container-native DAG pipelines".

### s08-q046 (length-balance/giveaway)
- **Problem:** Correct answer A (103 chars) was notably longer than option C (88 chars), a 17% gap that could serve as a giveaway.
- **Fix:** Lengthened option C to: "The Pods continue running indefinitely on the isolated node and are never automatically rescheduled to other healthy nodes".

### s08-q049 (accuracy)
- **Problem:** NATS graduated from CNCF in March 2025, but the question still described it as "incubating".
- **Fix:** Updated option A to say "NATS is a CNCF graduated messaging system" and updated the explanation and wrong-answer explanations to reflect NATS's graduated status.

### s08-q083 (length-balance)
- **Problem:** Correct answer D (108 chars) was the shortest option, about 10% shorter than option A (120 chars).
- **Fix:** Extended option D to: "Two separate `from` entries: one with `podSelector: {matchLabels: {role: frontend}}`, and another with `namespaceSelector` for `monitoring`".

### s08-q094 (length-balance)
- **Problem:** Option D (80 chars) was noticeably shorter than others (88-91 chars).
- **Fix:** Extended option D to: "Splitting the monolithic database into horizontal shards while keeping all existing application code unchanged".

### s08-q096 (length-balance/giveaway)
- **Problem:** Option A (82 chars) was significantly shorter than others (99-108 chars), making it easy to eliminate.
- **Fix:** Extended option A to: "It catalogs only officially hosted CNCF projects and strictly filters out all commercial products from the listing entirely".

---

# Round 37 Review — set-08.js

**Date:** 2026-02-19
**Issues fixed:** 16 (across 16 questions)

## Changes

### s08-q005 (length-balance)
- **Problem:** Option C was 24% longer than others, creating a visual imbalance.
- **Fix:** Shortened C from "Synchronous RPC — inter-service calls should use blocking HTTP requests to ensure reliable data delivery" to "Synchronous RPC — inter-service calls should always use blocking HTTP requests for data delivery". Lengthened A from "Loose coupling — each service exposes a stable API and hides internal implementation" to "Loose coupling — each service exposes a stable API contract and hides internal implementation details".

### s08-q038 (length-balance/giveaway - HIGH)
- **Problem:** Correct D (98 chars) was 21% longer than others, serving as a giveaway.
- **Fix:** Shortened D from "`backoffLimit: 4` — specifies the number of failed Pod attempts before the Job is marked as failed" to "`backoffLimit: 4` — allows up to 4 failed Pod attempts before the Job is marked failed". Lengthened A, B, and C to close the gap.

### s08-q054 (length-balance - HIGH)
- **Problem:** Correct B (88 chars) was 20% shorter than other options.
- **Fix:** Extended B from "StatefulSet — provides stable Pod identities, ordered deployment, and persistent storage" to "StatefulSet — provides stable Pod identities, ordered deployment, and per-replica persistent storage for stateful apps".

### s08-q058 (length-balance)
- **Problem:** Correct D was shorter than option A.
- **Fix:** Extended D from "Thanos — extends Prometheus with a sidecar that ships blocks to object storage and a global query layer" to "Thanos — extends Prometheus with a sidecar that ships TSDB blocks to object storage and provides a global query layer".

### s08-q057 (length-balance)
- **Problem:** Correct D was the shortest option.
- **Fix:** Extended D from "OpenTelemetry is a CNCF graduated project providing vendor-neutral APIs and SDKs for traces, metrics, and logs" to "OpenTelemetry is a CNCF graduated project providing vendor-neutral APIs, SDKs, and collectors for traces, metrics, and logs".

### s08-q072 (length-balance)
- **Problem:** Correct B was shorter than other options.
- **Fix:** Extended B from "Yes — etcd uses Raft consensus requiring a majority quorum; with 2 of 3 members the quorum is maintained" to "Yes — etcd uses Raft consensus requiring a majority quorum; with 2 of 3 members available the quorum is still maintained".

### s08-q056 (length-balance)
- **Problem:** C was too short and B was too long, creating imbalance.
- **Fix:** Extended C from "It encrypts cluster network traffic at the transport layer using built-in TLS certificate management" to "It encrypts all cluster network traffic at the transport layer using built-in automatic TLS certificate management". Shortened B from "The Gateway API replaces Services and Endpoints with a single resource combining routing, load balancing, and backend selection" to "The Gateway API replaces Services and Endpoints with a single resource combining routing and backend selection".

### s08-q023 (length-balance)
- **Problem:** Correct D was the shortest option, B was the longest.
- **Fix:** Extended D from "Apply a taint `gpu=true:NoSchedule` to GPU nodes and add a matching toleration only to ML workload Pod specs" to "Apply a taint `gpu=true:NoSchedule` to GPU nodes and add a corresponding matching toleration only to ML workload Pod specs". Shortened B from "Set `priorityClassName: high` on ML Pods so they preempt lower-priority workloads; combine with `NoSchedule` taint for full isolation" to "Set `priorityClassName: high` on ML Pods so they preempt lower-priority workloads on the reserved GPU nodes".

### s08-q088 (length-balance/giveaway - HIGH)
- **Problem:** Correct C was the longest (114 chars), B was the shortest (97 chars), creating a giveaway.
- **Fix:** Shortened C from "Setting `readOnlyRootFilesystem: true` in each container's `securityContext` to make the root filesystem read-only" to "Setting `readOnlyRootFilesystem: true` in the container's `securityContext` for a read-only root filesystem". Extended B from "Setting `readOnly: true` on the PersistentVolumeClaim attached to the container to prevent writes" to "Setting `readOnly: true` on the PersistentVolumeClaim attached to the container to prevent all write operations".

### s08-q036 (length-balance)
- **Problem:** Correct C was the shortest (94 chars).
- **Fix:** Extended C from "Tekton — a Kubernetes-native CI/CD framework defining pipelines via CRDs like `Task` and `Run`" to "Tekton — a Kubernetes-native CI/CD framework defining pipelines via CRDs like `Task`, `Pipeline`, and `PipelineRun`".

### s08-q065 (length-balance - LOW)
- **Problem:** Correct B was slightly shorter than other options.
- **Fix:** Extended B from "The per-second rate of HTTP 5xx errors averaged over a 5-minute window" to "The per-second rate of HTTP 5xx errors averaged over a sliding 5-minute window".

### s08-q076 (length-balance)
- **Problem:** C was too long and D (correct) was too short.
- **Fix:** Shortened C from "The ResourceQuota is ignored because it primarily targets Deployments and ReplicaSets rather than individual Pod resources" to "The ResourceQuota is ignored because it primarily targets Deployments and ReplicaSets, not individual Pods". Extended D from "Pod creation is rejected because total CPU requests would be 5 (3 + 2), exceeding the quota of 4 total" to "Pod creation is rejected because total CPU requests would be 5 (3 existing + 2 new), exceeding the quota of 4".

### s08-q041 (giveaway)
- **Problem:** Correct B was the longest option; A was notably shorter.
- **Fix:** Extended A from "Storing session data in a Redis cluster shared by all running application instances in the environment" to "Storing session data in an external Redis cluster shared by all running application instances across the environment".

### s08-q046 (length-balance residual from R36)
- **Problem:** Correct A became the shortest option after the R36 fix to C.
- **Fix:** Extended A from "The node controller evicts Pods by setting status to `Terminating` and the ReplicaSet creates replacements" to "The node controller evicts the Pods by setting their status to `Terminating` and the owning ReplicaSet creates replacements on healthy nodes".

### s08-q009 (length-balance)
- **Problem:** A was 27% longer than B, creating imbalance.
- **Fix:** Trimmed A from "Datadog — a SaaS platform that deploys agents to scrape and forward cluster metrics to a hosted backend" to "Datadog — a SaaS platform deploying agents to scrape and forward cluster metrics to a hosted backend". Extended B from "Jaeger — a distributed tracing platform for monitoring microservice request flows" to "Jaeger — a distributed tracing platform for monitoring and analyzing microservice request flows".

### s08-q083 (giveaway residual from R36)
- **Problem:** Correct D became the longest option after R36 extension; C was too short.
- **Fix:** Trimmed D from "Two separate `from` entries: one with `podSelector: {matchLabels: {role: frontend}}`, and another with `namespaceSelector` for `monitoring`" to "Two separate `from` entries: one with `podSelector` matching `role: frontend`, and another with `namespaceSelector` for `monitoring`". Extended C from "An `egress` rule allowing traffic from `frontend` Pods to `web` Pods and from `monitoring` namespace Pods for egress controls" to "An `egress` rule allowing traffic from `frontend` Pods to `web` Pods and from all `monitoring` namespace Pods for egress traffic controls".

---

# Round 38 Review - Set 08

**Date:** 2026-02-19
**File:** `KCNA/data/set-08.js`
**Issues fixed:** 10 across 10 questions

## Changes

### s08-q046 (length-balance/giveaway)
- **Option A (correct):** Trimmed from ~140 to ~120 chars. **Option D:** Extended from ~112 to ~120 chars.

### s08-q054 (length-balance/giveaway)
- **Option B (correct):** Trimmed from ~118 to ~110 chars. **Option C:** Extended from ~96 to ~107 chars.

### s08-q005 (length-balance)
- **Option A (correct):** Trimmed from ~101 to ~91 chars. **Option B:** Extended from ~82 to ~93 chars.

### s08-q011 (length-balance)
- **Options C, D:** Extended to close gap with A and B.

### s08-q009 (length-balance)
- **Option C (correct):** Extended from ~85 to ~98 chars with "pull-based".

### s08-q067 (length-balance)
- **Option A:** Trimmed from ~119 to ~106 chars.

### s08-q044 (length-balance)
- **Option D:** Extended from ~86 to ~96 chars.

### s08-q064 (length-balance)
- **Option A:** Trimmed from ~134 to ~123 chars.

### s08-q078 (accuracy)
- **Explanation:** Removed "as of 2025" from gRPC maturity reference.

### s08-q084 (length-balance)
- **Option C (correct):** Extended from ~95 to ~103 chars.

---

# Round 39 Review - Set 08

**Date:** 2026-02-21
**File:** `KCNA/data/set-08.js`
**Issues fixed:** 9 across 9 questions

## Changes

### s08-q007 (length-balance)
- **Option B (correct):** Extended from 91 to 101 chars by adding "container" before "behavior" to close gap with A/C/D (~100-101 chars). Ratio improved from 1.110 to 1.010.

### s08-q016 (length-balance/giveaway)
- **Options A, B, D:** Extended by 10-11 chars each to close gap with correct C (79 chars, previously longest at ratio 1.113). A: added "on overlap"; B: reworded to "starts a new one in its place"; C: reworded to "skips new Job creation entirely"; D: reworded to "run sequentially after". Ratio improved from 1.113 to 1.037.

### s08-q022 (length-balance)
- **Option C (correct):** Extended from 95 to 102 chars by adding "inline" before `--set`. Closes gap with A (104) and B (103). Ratio improved from 1.095 to 1.051.

### s08-q025 (length-balance/giveaway)
- **Option A (correct):** Trimmed from 95 to 90 chars by removing "with scale-to-zero" (redundant with question stem). **Option B:** Extended from 85 to 94 chars by adding "as containers on Kubernetes". Correct answer no longer longest; ratio improved from 1.118 to 1.080.

### s08-q026 (length-balance)
- **Option A (correct):** Reworded from "which corresponds to" to "maps to" for conciseness. **Option C:** Extended from 75 to 88 chars by adding "the API path" phrasing. **Option D:** Extended from 82 to 95 chars by adding "the API path". Correct answer no longer shortest; ratio improved from 1.133 to 1.118 with correct in middle.

### s08-q060 (length-balance)
- **Option A (correct):** Reworded from "system calls" to "container syscalls" (108 chars). **Option D:** Trimmed from 113 to 109 chars by removing "the" before "container privilege" and adding "set". Correct answer no longer shortest; ratio improved from 1.108 to 1.038.

### s08-q086 (length-balance)
- **Option A:** Trimmed from 130 to 130 chars (minor rewording "in all" to "across"). **Option B (correct):** Extended from 120 to 129 chars by adding "cloud-specific" before "controllers". Ratio improved from 1.083 to 1.040.

### s08-q097 (length-balance)
- **Option C (correct):** Extended from 92 to 99 chars by adding "all of" before "these are cluster-scoped". Now tied with A (99), no longer shortest. Ratio improved from 1.076 to 1.021.

### s08-q100 (length-balance)
- **Option D (correct):** Extended from 110 to 118 chars by expanding "app" to "application" in "app state visualization". No longer shortest; ratio improved from 1.091 to 1.081.

---

# Round 40 Review - Set 08

**Date:** 2026-02-21
**File:** `KCNA/data/set-08.js`
**Issues fixed:** 10 across 10 questions

## Changes

### s08-q009 (length-balance)
- **Option D:** Extended from 87 to 95 chars by adding "a" and "layer" to close gap with A (100). Ratio improved from 1.149 to 1.053.

### s08-q023 (length-balance/giveaway)
- **Option B:** Reworded "reserved GPU nodes" to "reserved GPU node pool" (111 chars). **Option D (correct):** Trimmed from 122 to 112 chars by removing "corresponding" and restructuring to "add a matching toleration to only the ML workload Pod specs". Correct answer no longer longest; ratio improved from 1.140 to 1.036.

### s08-q038 (length-balance)
- **Option D (correct):** Extended from 86 to 89 chars by changing "marked failed" to "marked as failed". Still shortest but ratio improved from 1.105 to 1.067.

### s08-q045 (giveaway)
- **Option C (correct):** Replaced unique semicolon with comma-based phrasing: "not updated without restart, while volume mounts are eventually refreshed". Eliminates structural giveaway.

### s08-q062 (giveaway/length-balance)
- **Option A:** Trimmed from 126 to 125 chars by changing "do not support" to "cannot handle". **Option B:** Extended from 112 to 119 chars by adding "routing to". **Option C (correct):** Restructured from semicolon to comma phrasing: "and `kube-proxy` balances at L4 per connection, so one connection goes to one Pod" (121 chars). Eliminates unique semicolon giveaway; ratio improved from 1.125 to 1.068.

### s08-q064 (giveaway)
- **Option B (correct):** Replaced unique semicolon with comma: "including backing services, and different databases cause subtle bugs". Eliminates structural giveaway.

### s08-q068 (giveaway/length-balance)
- **Option A (correct):** Replaced semicolon with "so" phrasing: "throttled by the CFS scheduler so it cannot exceed 2 CPU cores, but it is not killed" (101 chars). **Option C:** Extended from 91 to 99 chars by adding "from the node" and restructuring. **Option D:** Trimmed from 104 to 100 chars by changing "configured threshold" to "configured limit". Eliminates unique semicolon; ratio improved from 1.143 to 1.052.

### s08-q072 (length-balance/giveaway)
- **Option B (correct):** Replaced semicolon with comma: "requiring a majority quorum, and with 2 of 3 members available the quorum is maintained" (118 chars). **Option C:** Extended from 107 to 123 chars by adding "all data afterward on recovery". **Option D:** Extended from 107 to 121 chars by adding "fully" and "cluster". Eliminates unique semicolon; ratio improved from 1.150 to 1.042.

### s08-q075 (length-balance)
- **Option C:** Extended from 90 to 97 chars by adding "single" before "node". Ratio improved from 1.133 to 1.052.

### s08-q100 (length-balance/giveaway)
- **Option C:** Extended from 111 to 123 chars by adding "like GitHub". **Option D (correct):** Trimmed from 118 to 115 chars by replacing "controller-based" with "modular" and removing semicolon (replaced with ", while"). Correct answer no longer longest; ratio improved from 1.081 to 1.079.
