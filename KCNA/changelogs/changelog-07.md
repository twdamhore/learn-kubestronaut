# Round 36 Review - set-07.js

**Date:** 2026-02-19
**Issues found:** 5
**Issues fixed:** 5

## Fixes

### s07-q036 (explanation)
- **Problem:** Option A's phrase "compete for memory" is misleading. OOMKilled means the container exceeded its own cgroup limit, not that other pods stole memory.
- **Fix:** Reworded option A from "Whether additional workloads on that node compete for memory, causing the DaemonSet pod to hit its limit under pressure" to "Whether additional workloads on that node cause the DaemonSet pod to process more data, pushing its own memory usage past its 256Mi limit".

### s07-q066 (length-balance)
- **Problem:** Correct answer B (65 chars) was significantly shorter than option A (98 chars) - 33.7% spread.
- **Fix:** Expanded option B from "The Job is marked as `Failed` and no more pods are created for it" to "The Job is marked as Failed and no more pods are created by the Job controller for this resource" (~95 chars).

### s07-q085 (explanation)
- **Problem:** The explanation for option A said "liveness triggers SIGKILL after threshold" which is inaccurate. Liveness failure triggers a container restart which involves SIGTERM then SIGKILL.
- **Fix:** Changed the A explanation from "SIGTERM is sent during pod termination, not by liveness probes; liveness triggers SIGKILL after threshold" to "SIGTERM is part of the container kill process, but liveness probe failures cause a full container restart, not just a graceful signal. The key behavior is restart, not just signaling".

### s07-q087 (accuracy)
- **Problem:** The command `kubectl logs -l app=payment -n payments --prefix` was missing `-f` for streaming. The question says "stream logs" but the command did not include `--follow`/`-f`.
- **Fix:** Added `-f` to the command in option A, updated the explanation to mention the `-f` flag enabling streaming (follow mode), and updated the verify field to include `-f`.

### s07-q009 (explanation)
- **Problem:** Version references were wrong - the explanation stated the feature of defaulting to first container was available in 1.24, but it was actually beta in 1.28 and GA in 1.29.
- **Fix:** Replaced the version note from "in Kubernetes versions before 1.24, omitting `-c` ... In Kubernetes 1.24+, omitting `-c` defaults to the first container" to "In older Kubernetes versions, omitting -c in a multi-container pod returns an error. Starting in Kubernetes 1.28 (beta) and 1.29 (GA), omitting -c defaults to the first container in the pod spec, but using -c explicitly is the recommended practice."

---

# Round 37 Review - set-07.js

**Date:** 2026-02-19
**Issues found:** 6
**Issues fixed:** 6

## Fixes

### s07-q066 (length-balance residual)
- **Problem:** Options C (75 chars) and D (67 chars) were too short compared to A (98) and B (96).
- **Fix:** Padded C from "Kubernetes sends an alert to the cluster administrator via the event system" to "Kubernetes sends an alert to the cluster administrator via the event system and pauses the Job for review". Padded D from "The Job controller deletes the Job resource and all associated pods" to "The Job controller automatically deletes the Job resource and all of its associated completed and failed pods".

### s07-q016 (length-balance/giveaway)
- **Problem:** Correct option C (71 chars) was the shortest, creating a potential giveaway.
- **Fix:** Padded C from "A toleration for the taint `gpu=true:NoSchedule` to allow pod placement" to "A toleration for the taint `gpu=true:NoSchedule` so the scheduler allows pod placement on that node".

### s07-q090 (explanation quality)
- **Problem:** Option A explanation was a strawman that did not address the actual distinction between kubelet eviction and OOMKill.
- **Fix:** Replaced A explanation from "OOMKill shows exit code 137 with OOMKilled reason, not an eviction after exactly 5 minutes" to "Kubelet eviction occurs due to node-level resource pressure (e.g., memory.available below threshold), not because an individual pod exceeds its own limits. A pod exceeding its memory limit is OOMKilled by the cgroup, not evicted by the eviction-manager".

### s07-q082 (length-balance)
- **Problem:** Correct option A (104 chars) was shorter than D (128 chars).
- **Fix:** Padded A from "The change was pushed to a branch ArgoCD is not tracking—verify `targetRevision` in the Application spec" to "The change was pushed to a different branch that ArgoCD is not tracking—verify the `targetRevision` field in the Application spec".

### s07-q032 (question text accuracy)
- **Problem:** Question text said "DATABASE_URL is empty" but the correct answer says the pod never starts (CreateContainerConfigError). The scenario contradicted the answer.
- **Fix:** Rewrote the question from "A 12-factor application running in Kubernetes fails because an environment variable `DATABASE_URL` is empty. The pod spec references a ConfigMap that exists but does not contain the key `DATABASE_URL`. What is the pod's expected behavior?" to "A 12-factor application's pod spec references a ConfigMap that exists but does not contain the key `DATABASE_URL`. The team expects the environment variable to be injected from this ConfigMap. What is the pod's expected behavior?"

### s07-q093 (explanation quality)
- **Problem:** Option A explanation conceded that A is technically possible, weakening the question.
- **Fix:** Replaced A explanation from "While an application could call exit(137), this exit code conventionally indicates SIGKILL (128+9); the question context points to an external signal, not an application-chosen exit code" to "An application calling exit(137) is technically possible but extremely unusual; the Reason: Error status set by the container runtime combined with exit code 137 specifically indicates the process was killed by signal 9 (SIGKILL), not a voluntary exit".

---

# Round 38 Review - Set 07

**Date:** 2026-02-19
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 4 across 4 questions

## Changes

### s07-q018 (accuracy)
- **Option A:** Fixed invalid field path `--sort-by=restartCount` to `--sort-by='.status.containerStatuses[0].restartCount'`.

### s07-q055 (length-balance/giveaway)
- **Option A (correct):** Expanded from ~125 to ~163 chars to match distractors B, C, D (~139-143 chars).

### s07-q056 (option text accuracy)
- **Option C:** Changed confusing "not failed" to "by the controller".

### s07-q092 (explanation quality)
- **Option D explanation:** Now addresses the actual comparative claim about node-level vs pod-level metrics.
