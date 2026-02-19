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
