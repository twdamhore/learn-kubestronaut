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
