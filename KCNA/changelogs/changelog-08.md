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

---

# Round 41 Review - Set 08

**Date:** 2026-02-21
**File:** `KCNA/data/set-08.js`
**Issues fixed:** 14 across 14 questions

## Changes

### s08-q005 (length-balance)
- **Option D:** Extended from 86 to 97 chars by changing "services are packaged together to reduce network overhead cost" to "all services are packaged together in one unit to reduce network overhead". Ratio improved from 1.116 to 1.043.

### s08-q006 (length-balance)
- **Option A:** Trimmed from 118 to 112 chars by removing "proxy" at end. **Option B:** Extended from 105 to 113 chars by adding "cluster" before "Pods". Ratio improved from 1.124 to 1.045.

### s08-q012 (giveaway)
- **Option A:** Added "(e.g., Kong or Ambassador)" to eliminate unique e.g./parenthetical pattern that was only present in correct option C. Structural giveaway removed.

### s08-q020 (giveaway)
- **Option B:** Added "(CPU, memory)" parenthetical to eliminate unique parenthetical enumeration pattern that was only present in correct option D "(ReplicaSet, Deployment, Node controllers)". Structural giveaway removed.

### s08-q026 (length-balance)
- **Option B:** Extended from 85 to 98 chars by adding "the API path" phrasing. **Option C:** Extended from 88 to 101 chars by adding "non-standard" before "API path". Ratio improved from 1.118 to 1.088.

### s08-q033 (giveaway)
- **Option C:** Changed to include "(e.g., via iptables or IPVS)" to eliminate unique e.g./parenthetical pattern that was only present in correct option B. Structural giveaway removed.

### s08-q036 (giveaway)
- **Option A:** Added backticks to `Workflow` and `WorkflowTemplate` (now 2 backtick items). **Option D:** Changed to reference `GitRepository` and `Kustomization` (now 2 backtick items). Reduces contrast with correct C which has 3 backtick items. Excess backtick density giveaway mitigated.

### s08-q040 (giveaway)
- **Option A:** Changed to include `preferredDuringSchedulingIgnoredDuringExecution` backtick field (now 2 backtick items). **Option C:** Changed to include `requiredDuringSchedulingIgnoredDuringExecution` backtick field (now 2 backtick items). Reduces excess backtick density contrast with correct B (4 items vs previous max of 1, now max of 2).

### s08-q045 (length-balance)
- **Option A:** Extended from 117 to 128 chars by adding "production". **Option B:** Trimmed and reworded from 129 to 120 chars. **Option D:** Trimmed from 130 to 116 chars by removing "automatically". Ratio improved from 1.111 to 1.103; correct C no longer near longest.

### s08-q056 (length-balance/giveaway)
- **Option A:** Extended from 111 to 119 chars by adding "cluster" at end. **Option B:** Extended from 110 to 116 chars by adding "logic" at end. Correct D (119) no longer sole longest; ratio improved from 1.082 to 1.044.

### s08-q058 (length-balance)
- **Option C:** Extended from 105 to 110 chars by adding "full" before "Prometheus query compatibility". Ratio improved from 1.124 to 1.073.

### s08-q085 (giveaway)
- **Option B:** Added "(e.g., HikariCP)" to eliminate unique e.g. pattern that was only present in correct option A. Structural giveaway removed.

### s08-q088 (length-balance)
- **Option A:** Extended from 102 to 108 chars by adding "scope". **Option B:** Trimmed from 111 to 107 chars by removing "all". **Option D:** Extended from 99 to 104 chars by changing "any writes to the root filesystem path" to "any write operations to the root filesystem". Ratio improved from 1.121 to 1.038.

### s08-q094 (length-balance)
- **Option C:** Extended from 99 to 104 chars by adding "path" at end. Ratio improved from 1.111 to 1.068.

---

# Round 42 Review - Set 08

**Date:** 2026-02-21
**File:** `KCNA/data/set-08.js`
**Issues fixed:** 14 across 14 questions

## Changes

### s08-q010 (length-balance)
- **Option A (correct):** Reworded from "reconcile cluster resources from Git state" to "reconcile cluster resources with declared Git state" (94 chars). **Option D:** Extended from 89 to 93 chars by adding "app" before "source code". Correct no longer shortest; ratio improved from 1.082 to 1.033.

### s08-q012 (giveaway)
- **Option B:** Added commas by rewriting to "Add mTLS libraries to each microservice codebase, implement retry logic, and configure traffic shifting in code". **Option D:** Added commas by rewriting to "Use Kubernetes NetworkPolicies to encrypt traffic, configure retries, and manage routing via Pod annotations". Eliminates unique comma-list pattern that was only present in correct option C. Structural giveaway removed.

### s08-q019 (length-balance)
- **Option B:** Extended from 84 to 87 chars by changing "tasks" to "purposes". **Option C (correct):** Extended from 80 to 88 chars by changing "routes log data" to "parses, and routes log data to backends". Correct no longer shortest; ratio improved from 1.075 to 1.048.

### s08-q029 (giveaway)
- **Options B, C, D:** Added commas to all distractors to match comma-list structure in correct A. B: "serving as a container runtime for managing workloads on cluster nodes". C: "scrapes, aggregates, and stores metrics from app endpoints". D: "DNS resolution, service discovery, and routing for clusters". Eliminates unique comma-heavy pattern. Ratio improved from 1.032 to 1.010.

### s08-q040 (giveaway)
- **Option B (correct):** Reduced backtick density from 8 to 4 by removing backticks from `maxSkew: 1` (now "maxSkew 1") and `DoNotSchedule` format. **Option D:** Added backticks to `Pods` to increase its backtick count. Reduces backtick contrast from 8-vs-4 to 4-vs-4. Backtick density giveaway eliminated.

### s08-q049 (length-balance)
- **Option A (correct):** Extended from 105 to 112 chars by adding "native" before "apps". Correct no longer shortest; ratio improved from 1.057 to 1.028.

### s08-q057 (giveaway)
- **Option D (correct):** Reworded from "vendor-neutral APIs, SDKs, and collectors for traces, metrics, and logs" to "vendor-neutral APIs plus SDKs and collectors for all telemetry signals" (122 chars). Eliminates unique 4-comma pattern not present in other options.

### s08-q071 (length-balance)
- **Option A (correct):** Extended from 102 to 108 chars by adding "on it" at end. **Option D:** Trimmed from 109 to 107 chars by removing "the" before "application". Correct no longer shortest; ratio improved from 1.069 to 1.029.

### s08-q076 (length-balance/giveaway)
- **Option A:** Added parenthetical "(3)" to match parenthetical in correct D. Extended from 104 to 109 chars. **Option D (correct):** Trimmed from 109 to 104 chars by removing parenthetical "(3 existing + 2 new)" and rephrasing to "5 cores, exceeding the namespace quota of 4". Correct no longer longest; unique parenthetical giveaway eliminated.

### s08-q080 (length-balance)
- **Option B (correct):** Extended from 100 to 105 chars by adding "files" after "log". Correct no longer shortest; ratio improved from 1.060 to 1.019.

### s08-q091 (giveaway/length-balance)
- **Option C (correct):** Reworded from "Pod scheduling, image pulls, probe failures, scaling" (comma-list) to "state changes and lifecycle transitions for cluster resources such as scheduling and scaling" (106 chars). Eliminates unique 3-comma pattern not present in other options. Ratio improved from 1.058 to 1.058 but correct moved from shortest to middle.

### s08-q092 (length-balance)
- **Option A:** Trimmed from 116 to 113 chars by removing "The" prefix and adjusting wording. **Option B:** Trimmed from 118 to 114 chars by swapping "default empty" to "empty default". **Option C:** Trimmed from 115 to 111 chars by removing "the" before "missing". **Option D (correct):** Trimmed from 122 to 113 chars by changing "mandatory env var references to non-existent Secrets" to "env var references to a non-existent Secret". Ratio improved from 1.061 to 1.027.

### s08-q094 (length-balance)
- **Option B (correct):** Extended from 103 to 108 chars by adding "while" and changing "fully replaced" to "fully migrated". Correct no longer shortest; ratio improved from 1.068 to 1.058.

### s08-q096 (giveaway)
- **Option B (correct):** Reworded from "runtime, orchestration, observability, and the wider ecosystem" to "categories such as runtime and orchestration and observability" (126 chars). Eliminates unique 3-comma pattern not present in other options.

---

# Round 43 Review - Set 08

**Date:** 2026-02-21
**File:** `KCNA/data/set-08.js`
**Issues fixed:** 11 across 11 questions

## Changes

### s08-q017 (giveaway)
- **Problem:** Correct option D had unique "including" pattern not present in other options.
- **Fix:** Added "including" to option A: "missing runtime binaries including `curl` and TLS libraries needed for HTTPS connections". Eliminates unique keyword pattern.

### s08-q031 (giveaway)
- **Problem:** Correct option B had unique parenthetical "(or selected subset of)" and unique em-dash not present in other options.
- **Fix:** Added em-dashes and parentheticals to options A, C, D: A now "Deployment — ... adjusted (scaled) ...", C now "StatefulSet — ...", D now "Job — ... (full) node count". Eliminates unique structural patterns.

### s08-q052 (giveaway)
- **Problem:** Correct option A had unique parenthetical pattern with "O(1)" while other options had no parentheticals.
- **Fix:** Added parenthetical to option B: "mutual TLS (mTLS)" to balance parenthetical usage.

### s08-q060 (giveaway)
- **Problem:** Correct option A had unique parenthetical "(Sentry)" while other options had no parentheticals.
- **Fix:** Added parentheticals to options B "(AES)" and C "(KVM)" to balance structural patterns.

### s08-q063 (giveaway/length-balance)
- **Problem:** Correct option B had unique parentheticals "(500m)" and "(256Mi)" while other options had none.
- **Fix:** Added parentheticals to options A "(closest)" and D "(A and B)". Trimmed A from 111 to 101 chars and adjusted D to avoid ratio exceeding 1.15.

### s08-q064 (giveaway)
- **Problem:** Correct option B had unique "including" pattern not present in other options.
- **Fix:** Added "including" to option A: "using lighter-weight databases including SQLite in development". Eliminates unique keyword pattern.

### s08-q075 (giveaway)
- **Problem:** Correct option B had unique parenthetical "(Network File System)" while other options had none.
- **Fix:** Added parentheticals to options A "(Elastic Block Store)" and C "(Persistent Volume)". Eliminates unique parenthetical in correct answer.

### s08-q085 (giveaway)
- **Problem:** Correct option A had unique em-dash pattern; options C and D lacked em-dashes entirely.
- **Fix:** Added em-dashes to options C and D: C now "inside the same container as the application — minimize network latency...", D now "in the application source — ensure reliability...". Eliminates unique em-dash giveaway.

### s08-q087 (giveaway)
- **Problem:** Correct option A had unique parenthetical "(reserved capacity)" while other options had none.
- **Fix:** Added parentheticals to options B "(unschedulable remainder)" and C "(CFS)". Eliminates unique parenthetical in correct answer.

### s08-q091 (giveaway)
- **Problem:** Correct option C had unique "such as" pattern not present in other options (introduced in R42 rewording).
- **Fix:** Added "such as" to option A: "record audit logs of API server decisions such as authentication and authorization". Eliminates unique "such as" pattern.

### s08-q096 (giveaway)
- **Problem:** Correct option B had unique "such as" pattern not present in other options (introduced in R42 rewording).
- **Fix:** Added "such as" to option A: "only officially hosted CNCF projects such as graduated and incubating". Eliminates unique "such as" pattern.
