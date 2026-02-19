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
