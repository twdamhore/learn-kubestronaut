# Round 36 Review - set-01.js

**Date:** 2026-02-19
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 6

---

## s01-q059 (accuracy)

**Problem:** Option A referenced `externalTrafficPolicy` on a ClusterIP Service, which is not a valid setting for that Service type. This made it too easy to eliminate as a distractor for anyone familiar with Service types.

**Change:** Rewrote option A from `"A ClusterIP Service with external traffic policy set to Local for ingress routing control"` to `"A ClusterIP Service with annotation-based routing rules to handle external HTTP traffic directly"`. Updated the corresponding explanation bullet to match.

---

## s01-q069 (giveaway)

**Problem:** The correct answer (C) was the most technically specific with "three-way merge" terminology, making it structurally stand out from the shorter, simpler wrong options.

**Change:** Expanded options B and D to have similar technical depth. Option B changed from `"Kubernetes deletes the existing Deployment and creates a new one from the updated YAML manifest file"` to `"Kubernetes deletes the existing Deployment entirely and recreates a fresh one from the updated YAML manifest definitions"`. Option D changed from `"Kubernetes creates a duplicate Deployment with an auto-generated suffix to avoid name conflicts"` to `"Kubernetes creates a duplicate Deployment with an auto-generated suffix appended to the name to prevent conflicts"`.

---

## s01-q073 (giveaway)

**Problem:** The correct answer (C) listed 4 steps while wrong answers listed only 3, creating a "most complete = correct" pattern that test-savvy students could exploit.

**Change:** Expanded options A and D to also list 4 steps. Option A changed from `"API server creates the Deployment in etcd, scheduler assigns it to a node, then kubelet creates Pods and starts containers"` to `"API server creates the Deployment in etcd, scheduler evaluates nodes and assigns it, kubelet creates the Pod, and containers start via the runtime"`. Option D changed from `"API server creates Pods directly in etcd, scheduler assigns them to available nodes, then controller manager monitors health"` to `"API server creates Pods directly in etcd, scheduler evaluates and assigns them to available nodes, kubelet starts containers, then controller manager monitors health"`.

---

## s01-q082 (giveaway)

**Problem:** The correct answer (A) named specific best-practice tools (`distroless`, `alpine`) giving it a more authoritative tone than the generic-sounding distractors.

**Change:** Added similar specificity to options B and C. Option B changed from `"Use a full Ubuntu base image and remove unnecessary packages with apt-get remove in the final layer"` to `"Use a full Ubuntu or Debian base image and remove unnecessary packages with apt-get remove in the final Dockerfile layer"`. Option C changed from `"Build the application on the host machine and copy the binary into a latest tagged base image"` to `"Build the application on the host machine with native compilers and copy the binary into a latest tagged base image"`.

---

## s01-q092 (giveaway)

**Problem:** The correct answer (C) "At multiple stages..." read as an "all of the above" comprehensive answer pattern, standing out from the single-stage options.

**Change:** Made option A also reference multiple stages. Changed from `"During the build stage, since runtime scanning introduces unacceptable latency to the delivery pipeline"` to `"During the build and testing stages, where scanning blocks the pipeline if critical vulnerabilities are found"`. Updated the corresponding explanation bullet to reflect the new wording.

---

## s01-q096 (giveaway)

**Problem:** The correct answer (B) included a parenthetical calculation `"(2 per node at 500m each)"` that made it stand out as more educational/explanatory compared to the other options.

**Change:** Moved the parenthetical style to option A and removed it from option B. Option A changed from `"All 5 replicas start successfully because Kubernetes overcommits, fitting 3 per node at 500m each"` to `"All 5 replicas start successfully because Kubernetes overcommits CPU (fitting 3 per node at 500m each)"`. Option B changed from `"Only 4 replicas can be scheduled (2 per node at 500m each); the 5th Pod remains Pending"` to `"Only 4 replicas can be scheduled; the 5th Pod remains in Pending state without sufficient resources"`.

---

# Round 37 Review - set-01.js

**Date:** 2026-02-19
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 6

---

## s01-q048 (length-balance + giveaway)

**Problem:** The correct answer (A) was noticeably longer (~105 chars) than option B (~83 chars), creating a length-based giveaway pattern where the most detailed option is correct.

**Change:** Shortened option A from `"An init container that performs the migration and terminates with exit code 0 before app containers start"` to `"An init container that runs the migration to completion before the app containers start"`. Expanded option B from `"A Job resource that runs the migration before the Deployment is created by the team"` to `"A Job resource that runs the migration as a separate workload before the Deployment is created"`.

---

## s01-q048 (explanation)

**Problem:** The explanation incorrectly stated that `postStart` hooks "run after the container starts and do not block other containers." In reality, `postStart` runs concurrently with the container's ENTRYPOINT, and it does block the kubelet from reporting the container as ready.

**Change:** Updated the main explanation sentence to: "`postStart` hooks run concurrently with the container's ENTRYPOINT, so there is no guarantee the migration finishes before the app process begins." Updated the C wrong-answer bullet to: "A postStart hook runs concurrently with the container's ENTRYPOINT, so it cannot guarantee the migration completes before the app starts."

---

## s01-q070 (accuracy)

**Problem:** The question asks for a "cluster-wide" policy but the correct answer (B) said "enforced at the namespace level," creating a contradiction that could confuse test-takers.

**Change:** Changed option B from `"Use Pod Security Admission (PSA) with the 'restricted' profile enforced at the namespace level"` to `"Use Pod Security Admission (PSA) with the 'restricted' profile enforced across all namespaces"`. Updated the explanation from "at the namespace level" to "per namespace, or configured cluster-wide via admission defaults."

---

## s01-q087 (accuracy)

**Problem:** NATS core does not persist messages; only NATS JetStream provides message persistence. Listing plain "NATS" alongside RabbitMQ in a context about message persistence is inaccurate.

**Change:** Changed option A from `"Asynchronous messaging through a broker like NATS or RabbitMQ that persists messages"` to `"Asynchronous messaging through a broker like RabbitMQ or Kafka that persists messages"`. Updated the explanation from `"A message broker (like NATS, RabbitMQ, or Kafka)"` to `"A message broker (like RabbitMQ, Kafka, or NATS JetStream)"`.

---

## s01-q024 (giveaway - formatting asymmetry)

**Problem:** Options A and D used backtick formatting for Kubernetes terms, but options B and C did not, creating a visual asymmetry that could signal which answers are correct or wrong.

**Change:** Added backtick formatting to options B and C. Option B changed from `"Use a StatefulSet instead of a Deployment because StatefulSets support ordered rolling updates"` to `"Use a \`StatefulSet\` instead of a \`Deployment\` because \`StatefulSets\` support ordered rolling updates"`. Option C changed from `"Create a new Deployment alongside the old one and shift traffic using a Service selector change"` to `"Create a new \`Deployment\` alongside the old one and shift traffic using a \`Service\` selector change"`.

---

## s01-q099 (giveaway - keyword echo with diagram)

**Problem:** The diagram contains the label "Auth Mechanism ?" and the correct answer (B) was the only option using the word "mechanism," creating a keyword echo that gives away the answer.

**Change:** Changed option B from `"The \`ServiceAccount\` mechanism, which mounts a projected token volume into each Pod"` to `"The \`ServiceAccount\` resource, which mounts a projected token volume into each Pod"`.

---

# Round 38 Review - Set 01

**Date:** 2026-02-19
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s01-q004 (giveaway)
- **Option A:** Added "and its socket interface" to match the technical specificity of the correct answer C.

### s01-q043 (giveaway)
- **Option B (correct):** Removed "CNCF graduated" authority signal. Changed to "Linkerd, a lightweight service mesh designed specifically for Kubernetes clusters".

### s01-q066 (explanation quality)
- **Option A explanation:** Updated to acknowledge priority influences eviction order within the same QoS class, rather than implying it is irrelevant.

### s01-q083 (explanation quality)
- **Option A:** Reworded to clarify ClusterRoleBinding misconception.
- **Option A explanation:** Now states ClusterRoleBinding is always cluster-wide and cannot be namespace-scoped.

### s01-q088 (option style)
- **Option B (correct):** Changed "exports telemetry neutrally" to "exports telemetry data in a vendor-neutral way" for natural phrasing.

### s01-q034 (giveaway)
- **Option C (correct):** Expanded from "across service boundaries" to "across service boundaries in a request chain" to reduce named-concept giveaway.

### s01-q067 (giveaway)
- **Option A (correct):** Rephrased from hierarchical teaching structure to "LoadBalancer includes NodePort and ClusterIP functionality, so a LoadBalancer Service exposes all three access methods".

---

# Round 39 Review - Set 01

**Date:** 2026-02-21
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s01-q034 (length-balance - MEDIUM)
- **Option A:** Added "and request IDs" to expand from ~79ch to ~92ch.
- **Option C (correct):** Shortened from "trace context headers" to "context headers" to reduce from ~104ch to ~93ch.
- **Option D:** Expanded from "average latency per service over the last hour of data" to "per-service average latency aggregated over the last hour of observations".

### s01-q088 (length-balance - MEDIUM)
- **Option C:** Added "and indexing" to expand length closer to correct answer B.
- **Option D:** Added "collect and" before "export" to expand length closer to correct answer B.

### s01-q067 (length-balance - LOW-MEDIUM)
- **Option A (correct):** Trimmed "a LoadBalancer Service" to "the Service" to reduce from 118ch to ~99ch.

### s01-q082 (length-balance - LOW-MEDIUM)
- **Option A (correct):** Added "production" before "stage" to expand from ~87ch to ~98ch, closer to option B (122ch).

### s01-q032 (accuracy - LOW)
- **Explanation:** Updated opening from "Knative is a Kubernetes-based platform" to "Knative is a CNCF graduated project and Kubernetes-based platform" to reflect Oct 2025 graduation.

### s01-q086 (structural giveaway - LOW)
- **Option C:** Added "rollback on errors, and converge" to give option C a multi-item list structure, matching the 3-item list in correct answer B.

### s01-q100 (structural giveaway - LOW-MEDIUM)
- **Option D:** Changed from "requires YAML input" / "primarily uses" to "only accepts YAML file input" / "primarily uses" with semicolon separator, giving it a dual-contrast structure similar to correct answer B.

---

# Round 40 Review - Set 01

**Date:** 2026-02-21
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 21 across 18 questions

## Changes

### s01-q004 (length-balance)
- **Option A:** Trimmed "entirely" from "bypassing the CRI layer entirely" to reduce from 103ch to 94ch. Ratio improved from 1.321 to 1.205.

### s01-q008 (length-balance)
- **Option A:** Trimmed "central" from "to a central backend" to reduce from 92ch to 84ch.
- **Option C (correct):** Added "on targets" after "metric endpoints" to expand from 79ch to 90ch. Correct answer no longer shortest.

### s01-q016 (length-balance)
- **Option A:** Added "in the cluster" to expand from 74ch to 84ch.
- **Option B:** Trimmed "automatically" from "that automatically adjusts" to reduce from 101ch to 91ch. Ratio improved from 1.365 to 1.095.

### s01-q034 (length-balance)
- **Option B:** Added "and error rates" to expand from 81ch to 97ch. Ratio improved from 1.222 to 1.148.

### s01-q036 (structural giveaway)
- **Option A:** Restructured to include a semicolon ("initialization phase; node resource constraints block them"), matching the semicolon structure in correct answer D.

### s01-q038 (length-balance)
- **Option A:** Trimmed "for the" to "for" to reduce from 91ch to 87ch.
- **Option D (correct):** Expanded from "since" phrasing to "because the Service resides in" to expand from 78ch to 86ch. Ratio improved from 1.167 to 1.125.

### s01-q039 (length-balance)
- **Option A:** Trimmed "automatically spreads Pods" to "to spread Pods" to reduce from 111ch to 98ch. Ratio improved from 1.306 to 1.153.

### s01-q044 (structural giveaway)
- **Option A:** Added "Slack, and PagerDuty" comma-list to match the 3-item comma-list in correct answer C.
- **Option B:** Added "deduplicates them, and" to give option B a comma-list structure matching correct answer C.

### s01-q065 (length-balance)
- **All options:** Added descriptive suffixes ("with comma-separated selectors", "with an OR keyword", etc.) to bring options closer in length. Ratio improved from 1.205 to 1.136.

### s01-q069 (length-balance)
- **Option B:** Trimmed "entirely" and "a fresh one" to reduce from 120ch to 102ch.
- **Option D:** Trimmed "with an auto-generated suffix appended to the name to prevent" to "with an auto-generated suffix to prevent naming" to reduce from 113ch to 99ch. Ratio improved from 1.237 to 1.052.

### s01-q073 (length-balance)
- **Option A:** Trimmed "creates" to "stores" and "evaluates nodes and assigns" to "assigns" to reduce from 146ch to 135ch.
- **Option D:** Trimmed "evaluates and assigns them to available nodes" to "assigns them to nodes" to reduce from 165ch to 140ch. Ratio improved from 1.320 to 1.120.

### s01-q081 (length-balance)
- **Option C:** Trimmed "that Deployments do not support natively" to "than Deployments" to reduce from 118ch to 94ch. Ratio improved from 1.216 to 1.096.

### s01-q083 (length-balance)
- **Option A:** Trimmed "verbs on" to "on" and "for" to "to" to reduce from 117ch to 110ch. Ratio improved from 1.182 to 1.111.

### s01-q086 (length-balance)
- **Option C:** Trimmed "until the desired state is achieved" to "to desired state" to reduce from 129ch to 116ch. Ratio improved from 1.206 to 1.084.

### s01-q089 (length-balance)
- **Option C:** Trimmed "on Kubernetes runtimes" to "on Kubernetes" to reduce from 104ch to 95ch. Ratio improved from 1.156 to 1.067.

### s01-q091 (length-balance)
- **Option B:** Trimmed "during execution" to reduce from 107ch to 90ch. Ratio improved from 1.163 to 1.089.

### s01-q096 (structural giveaway)
- **Option C:** Restructured to include a semicolon ("provisions a new node; the 5th Pod schedules once the node joins"), matching the semicolon in correct answer B. Updated explanation bullet for option C to match.

### s01-q100 (length-balance)
- **Option C:** Trimmed "resource creation" to "creation" and "subsequent updates" to "updates" to reduce from 129ch to 109ch. Ratio improved from 1.217 to 1.085.

---

# Round 41 Review - Set 01

**Date:** 2026-02-21
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 18 across 15 questions

## Changes

### s01-q004 (length-balance)
- **Option A:** Trimmed "and its socket interface" to "on the node" to reduce from 94ch to 81ch.
- **Option B:** Added "image" before "specification" to expand from 78ch to 84ch. Ratio improved from 1.205 to 1.101.

### s01-q006 (giveaway - unique comma-list)
- **Option C:** Changed from "reduce the need for operational staff by relying on self-healing system behaviors" to "are self-healing, automated, and observable, reducing the need for operational staff" to give it a 3-item comma-list matching correct answer D's structure.

### s01-q012 (length-balance)
- **Option D:** Added "for Pods" to expand from 78ch to 87ch. Ratio improved from 1.154 to 1.071.

### s01-q014 (giveaway - unique parenthetical)
- **Option C:** Changed "`StorageClass` for provisioning" to "`StorageClass` (SC) for provisioning" to add a parenthetical abbreviation, matching the (PV)/(PVC) style in correct answer B.

### s01-q043 (length-balance)
- **Option C:** Added "network" before "CNI plugin" to expand from 71ch to 79ch.
- **Option D:** Changed "and mTLS for Kubernetes" to "and mTLS within Kubernetes" to expand from 73ch to 76ch. Ratio improved from 1.141 to 1.080.

### s01-q053 (length-balance)
- **Option C (correct):** Added "known-good" before "revision" to expand from 79ch to 90ch. Correct answer no longer shortest; ratio improved from 1.127 to 1.098.

### s01-q054 (length-balance + giveaway)
- **Option A:** Added "resources in" before "the `staging` namespace" to expand from 93ch to 106ch. Ratio improved from 1.172 to 1.079.
- **Option C:** Changed "the `kube-apiserver` configuration file" to "the API server (`kube-apiserver`) configuration" to add a parenthetical, matching the (RBAC) parenthetical in correct answer D.

### s01-q065 (length-balance)
- **Option B:** Added "operator" after "OR keyword" to expand from 66ch to 75ch.
- **Option C:** Changed "a --no flag" to "a --no exclusion flag" to expand from 67ch to 77ch.
- **Option D:** Changed "with --exclude" to "with an --exclude flag" to expand from 68ch to 76ch. Ratio improved from 1.136 to 1.027.

### s01-q066 (length-balance)
- **Option A:** Changed "the scheduler avoids" to "the kubelet avoids" and "resource pressure events" to "pressure events" to reduce from 117ch to 108ch. Ratio improved from 1.170 to 1.080.

### s01-q079 (length-balance + giveaway)
- **Option A:** Changed "A `VerticalPodAutoscaler`" to "A `VerticalPodAutoscaler` (VPA)" to add a parenthetical matching the (HPA) in correct answer C.
- **Option C (correct):** Added "the" before "Deployment" to expand from 86ch to 90ch. Updated explanation to match VPA abbreviation.

### s01-q082 (length-balance)
- **Option B:** Trimmed "in the final Dockerfile layer" to "in a final layer" to reduce from 122ch to 113ch.
- **Option D:** Changed "from the image" to "from the output" and added "image" after "all" to expand from 103ch to 110ch. Ratio improved from 1.184 to 1.062.

### s01-q092 (length-balance)
- **Option C (correct):** Added "image" before "registry" to expand from 98ch to 104ch. Ratio improved from 1.112 to 1.048.

### s01-q094 (giveaway - unique parenthetical)
- **Option D:** Added "(v1)" after "blue Deployment" to add a parenthetical, matching the "(blue and green)" in correct answer B.

### s01-q097 (length-balance)
- **Option D:** Removed "generally" to reduce from 94ch to 84ch. Ratio improved from 1.119 to 1.012.

### s01-q099 (length-balance)
- **Option B (correct):** Added "automatically" at end to expand from 82ch to 96ch. Correct answer no longer shortest; ratio improved from 1.122 to 1.103.

---

# Round 42 Review - Set 01

**Date:** 2026-02-21
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 14 across 10 questions

## Changes

### s01-q008 (length-balance)
- **Option D:** Added "support" after "pipeline" to expand from 79ch to 86ch. Ratio improved from 1.139 to 1.111.

### s01-q024 (length-balance)
- **Option D (correct):** Added "configured" at end to expand from 89ch to 100ch. Correct answer no longer shortest; ratio improved from 1.124 to 1.010.

### s01-q036 (length-balance)
- **Option A:** Removed "node" from "node resource constraints" to reduce from 100ch to 95ch.
- **Option B:** Added "up" after "start" to expand from 87ch to 90ch. Ratio improved from 1.149 to 1.078.

### s01-q044 (length-balance)
- **Option A:** Removed "directly" from "notifications directly when rules trigger" to reduce from 111ch to 102ch. Ratio improved from 1.144 to 1.052.

### s01-q055 (giveaway - unique example phrase)
- **Option D:** Changed from "A DNS server running inside the cluster that maps Ingress hostnames to individual Pod IPs" to "A DNS server such as CoreDNS that maps Ingress hostnames to individual Pod IPs directly", adding a named example to match the "such as NGINX" in correct answer C. Updated explanation bullet to match.

### s01-q066 (giveaway - unique parenthetical)
- **Option C:** Changed from "Set `spec.terminationGracePeriodSeconds` to a very high value to delay the eviction process entirely" to "Set `spec.terminationGracePeriodSeconds` (grace period) to a very high value to delay eviction entirely", adding a parenthetical to match the "(Guaranteed QoS)" in correct answer B.

### s01-q073 (length-balance)
- **Option C (correct):** Expanded "scheduler binds them" to "scheduler binds Pods to nodes" to expand from 125ch to 134ch. Correct answer no longer shortest.
- **Option D:** Trimmed "and controller manager monitors health" to "then controller manager monitors" to reduce from 140ch to 134ch. Ratio improved from 1.120 to 1.063.

### s01-q078 (length-balance)
- **Option A:** Added "directly" after "nodeName" to expand from 64ch to 73ch. Ratio improved from 1.141 to 1.043.

### s01-q080 (length-balance)
- **Option B:** Added "the" before "kubectl" to expand from 98ch to 102ch.
- **Option D:** Removed "client" from "all client traffic" to reduce from 112ch to 105ch. Ratio improved from 1.143 to 1.059.

### s01-q096 (length-balance)
- **Option C:** Added "via the autoscaler" and changed "the 5th Pod schedules once the node joins" to "the 5th Pod schedules once it joins" to expand from 89ch to 102ch.
- **Option D:** Added "total" before "cluster capacity" to expand from 89ch to 95ch. Ratio improved from 1.146 to 1.074.

---

# Round 43 Review - Set 01

**Date:** 2026-02-21
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 8 across 5 questions

## Changes

### s01-q050 (giveaway - unique comma-list)
- **Option A:** Changed from `"The runtime behavior of containers including CPU and memory limits enforcement policies"` to `"The runtime behavior of containers including CPU limits, memory limits, and enforcement"`, adding a 3-item comma-list to match the comma-list structure in correct answer B.
- **Option D:** Changed from `"The signing and verification process for container images in production registries"` to `"The signing, verification, and trust process for container images in production registries"`, adding a 3-item comma-list.

### s01-q058 (giveaway - unique em-dash)
- **Option A:** Changed from `"It reduces container image sizes because only changed layers need to be rebuilt each time"` to `"It reduces container image sizes — only the changed layers need to be rebuilt each time"`, adding an em-dash to match the em-dash structure in correct answer C.

### s01-q069 (giveaway - unique comma-list)
- **Option B:** Changed from `"Kubernetes deletes the existing Deployment and recreates it from the updated YAML manifest definitions"` to `"Kubernetes deletes the existing Deployment, its ReplicaSet, and all Pods, then recreates from the new YAML"`, adding a 3-item comma-list to match the comma-list in correct answer C. Updated explanation bullet for option B to match.

### s01-q085 (giveaway - unique comma-list + length-balance)
- **Option A:** Changed from `"The PVC requests more storage than any node has available disk space for provisioning"` to `"The PVC requests more capacity than available disk space, storage quota, or node resources"`, adding a 3-item comma-list to match the comma-list in correct answer C.
- **Option B:** Added "suitable" before "node" to expand from 82ch to 91ch, improving overall length balance. Ratio improved from 1.061 to 1.058.

### s01-q092 (giveaway - unique colon + comma-list)
- **Option D:** Changed from `"When developers request it manually, to avoid blocking the automated deployment pipeline with extra scans"` to `"Only when developers request it: before a release, during hotfixes, or when external audits require verification"`, adding both a colon-enumeration and a 3-item comma-list to match the structural pattern in correct answer C. Updated explanation bullet for option D to match.

---

## Round 44 — 2026-02-23
**File**: `set-01.js`
**Issues found**: 8

### s01-q038 (giveaway - unique "because" keyword)
- **Option B:** Changed from `"inventory-api.cluster.local, as the minimal short-form name from any namespace"` to `"inventory-api.cluster.local, because it is the minimal short-form name from any namespace"`, adding "because" to match the keyword in correct answer D.

### s01-q041 (giveaway - unique "because" keyword)
- **Option A:** Changed from `"The emptyDir data is automatically migrated to the new node by the kubelet during Pod rescheduling"` to `"The emptyDir data is migrated to the new node because the kubelet handles Pod rescheduling"`, adding "because" to match the keyword in correct answer D.

### s01-q063 (giveaway - unique "like" keyword)
- **Option C:** Changed from `"Use PodDisruptionBudgets per project to control spending during disruption events in prod"` to `"Use PodDisruptionBudgets per project like a spending cap to control costs during disruptions"`, adding "like" to match the keyword in correct answer B.

### s01-q071 (giveaway - unique "like" keyword)
- **Option A:** Changed from `"The init container pattern, which sets up network rules before the application container starts"` to `"The init container pattern, where a container like istio-init sets up network rules at startup"`, adding "like" with a named example to match the pattern in correct answer C.

### s01-q082 (giveaway - unique "like" keyword)
- **Option D:** Changed from `"Use the --squash flag to compress all image layers into one, which removes most unused files from the output"` to `"Use a build flag like --squash to compress all image layers into one, removing most unused files from the output"`, adding "like" to match the keyword in correct answer A.

### s01-q087 (giveaway - unique "like" keyword)
- **Option D:** Changed from `"gRPC streaming connections that buffer messages in memory during service downtime periods"` to `"gRPC streaming like bidirectional streams that buffer messages in memory during downtime"`, adding "like" to match the keyword in correct answer A.

### s01-q092 (giveaway - unique 3-item comma-list + length-balance)
- **Option B:** Changed from `"After deployment in production, where a runtime scanner monitors containers for newly found vulnerabilities"` to `"After deployment to production, where a runtime scanner monitors containers, flags issues, and reports vulnerabilities"`, adding a 3-item comma-list to match the structure in correct answer C. Also reduces length ratio from pre-fix levels.

### s01-q093 (giveaway - unique "because" keyword)
- **Option A:** Changed from `"The Git repository has been updated with new changes that have not yet been applied to the cluster"` to `"The Git repository has been updated with new changes that are pending because they have not yet been applied"`, adding "because" to match the keyword in correct answer B.

---

## Round 45 — 2026-02-23
**File**: `set-01.js`
**Issues found**: 0

No issues found. All 100 questions were reviewed for option length balance (max/min ratio > 1.15), giveaway patterns (unique keywords, structural elements, polarity, backtick density, parentheticals), factual accuracy (CNCF project maturity levels, Kubernetes features as of Feb 2026), and explanation quality. No actionable issues remain after 9 previous rounds of refinement (Rounds 36-44).

---

## Round 46 — 2026-02-24
**File**: `set-01.js`
**Issues found**: 2

### s01-q049 — giveaway: causal "as" unique to correct answer
- Option A (correct) used ", as `kube-proxy` routes to Pods" where the causal conjunction "as" (meaning "since/because") was not present in any distractor. Changed "as" to "where" to remove the causal conjunction signal: `"By sending requests to \`<any-node-ip>:31234\`, where \`kube-proxy\` routes to Pods"`.

### s01-q092 — giveaway: "At multiple stages" comprehensive-answer pattern
- Option C (correct) began with "At multiple stages:" which is a strong "all of the above" signal that test-savvy students can exploit without domain knowledge. Rephrased to remove the comprehensive flag while preserving accuracy: changed from `"At multiple stages: during the build, before deployment via admission control, and in the image registry"` to `"In the CI build pipeline, before deployment via admission control, and continuously in the image registry"`. Ratio unchanged at 1.124.

---

# Round 47 Review - set-01.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-01.js`
**Issues fixed:** 6

---

## s01-q011 (giveaway - unique "default" keyword)

**Problem:** The correct answer (D) was the only option containing the word "default" (`the default type`). Since "default" signals standard/expected behavior, test-savvy students could use this keyword as a heuristic.
**Change:** Added "default" to option A: changed `"A \`NodePort\` Service, which assigns a static port on all cluster worker nodes"` to `"A \`NodePort\` Service, which assigns a default static port on all cluster worker nodes"`. The word "default" now refers to the default NodePort range (30000-32767), which is accurate.

---

## s01-q016 (giveaway - unique ", which" relative clause)

**Problem:** The correct answer (C) was the only option using a `, which` relative clause (`A DaemonSet, which guarantees...`), creating a structural pattern unique to the correct answer.
**Change:** Added a `, which` relative clause to option D: changed `"Configure the kubelet to forward all container logs to the backend service directly"` to `"Configure the kubelet, which writes logs to disk, to forward all container logs to the backend"`. Ratio improved from 1.138 to 1.080.

---

## s01-q039 (giveaway - unique ", which" relative clause)

**Problem:** The correct answer (C) was the only option using a `, which` relative clause (`A DaemonSet, which ensures...`), making it structurally distinct from other options.
**Change:** Added a `, which` relative clause to option B: changed `"A StatefulSet with node affinity rules targeting each node by its individual hostname label"` to `"A StatefulSet, which uses node affinity rules targeting each node by its individual hostname"`. Ratio unchanged at 1.106.

---

## s01-q061 (giveaway - unique "default" keyword echo)

**Problem:** The question asks about "the default DNS server" and the correct answer (D) was the only option echoing the word "default" back (`the default cluster DNS`). This keyword echo between question stem and correct answer is a well-known giveaway pattern.
**Change:** Added "default" to option B: changed `"PowerDNS, which is bundled with Kubernetes distributions for service discovery"` to `"PowerDNS, which is the default DNS bundled with Kubernetes distributions for discovery"`. Updated explanation bullet for B to match.

---

## s01-q089 (giveaway - unique "automatically" keyword)

**Problem:** The correct answer (A) was the only option using "automatically" (`scaled automatically by the platform`), which signals the key FaaS differentiator and could be used as a heuristic.
**Change:** Added "automatically" to option B: changed `"Functions are long-running processes that handle multiple requests concurrently in a thread pool"` to `"Functions are long-running processes that automatically handle multiple requests in a thread pool"`. Ratio changed from 1.067 to 1.078.

---

## s01-q099 (giveaway - unique ", which" relative clause)

**Problem:** The correct answer (B) was the only option using a `, which` relative clause (`The \`ServiceAccount\` resource, which mounts...`), making it structurally distinct.
**Change:** Added a `, which` relative clause to option C: changed `"The kubelet generates a unique API key for each Pod and stores it in an environment variable"` to `"The kubelet, which generates a unique API key per Pod and stores it in an environment variable"`. Ratio improved from 1.103 to 1.103 (unchanged).
