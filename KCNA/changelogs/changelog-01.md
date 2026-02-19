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
