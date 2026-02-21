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

---

# Round 39 Review - Set 07

**Date:** 2026-02-21
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 17 across 15 questions

## Changes

### s07-q016 (length-balance residual)
- **Option B:** Expanded from "in metadata" to "in the pod's metadata section" (78->96).
- **Option D:** Expanded from "under the container resources spec" to "under the container resources specification section" (77->94). Ratio reduced from 1.286 to 1.053.

### s07-q018 (length-balance)
- **All options:** Added descriptive suffixes to all command options to reduce ratio from 1.744 to 1.054. Previously correct B (43 chars) was drastically shorter than A (75 chars). Now A=97, B=92, C=95, D=93.

### s07-q023 (length-balance)
- **Option D (correct):** Expanded from "the node uses its cached" to "the node uses its locally cached" to reduce ratio from 1.159 to 1.127 (D: 107->121).

### s07-q029 (length-balance)
- **Option B:** Expanded from "Kubernetes will delete the failed pod and then schedule" to "Kubernetes will delete the failed pod automatically and schedule" (101->110).
- **Option C (correct):** Trimmed from "prevents any automatic restarts by the kubelet" to "prevents any restarts by the kubelet" to avoid over-expansion (kept at ~113).
- **Option D:** Trimmed from "clear its resource allocation from the node" to "clear its resource allocation" (122->108). Ratio reduced from 1.245 to 1.056.

### s07-q031 (length-balance)
- **Option D (correct):** Expanded from "relaying an OCI runtime error from `runc`" to "relaying an OCI runtime error from the low-level `runc` runtime" (96->118). Ratio reduced from 1.167 to 1.093.

### s07-q036 (length-balance)
- **Option A (correct):** Trimmed from "pushing its own memory usage past its 256Mi limit" to "pushing memory usage past 256Mi" (137->119).
- **Option C:** Expanded from "than other nodes which" to "than the other nodes which" (116->118). Ratio reduced from 1.202 to 1.044.

### s07-q044 (length-balance)
- **Option B (correct):** Expanded from "means it restarts regardless of exit code" to "means it restarts regardless of the exit code value" (107->117). Ratio reduced from 1.159 to 1.060.

### s07-q055 (length-balance residual)
- **Option A (correct):** Trimmed from "without defining any egress rules" to "without defining egress rules" and "including DNS resolution" to "including DNS" (164->149).
- **Option B:** Expanded with "entirely" suffix (139->148). Ratio reduced from 1.180 to 1.049.

### s07-q056 (length-balance)
- **Option C:** Trimmed "number of" to save chars (165->155).
- **Option D (correct):** Expanded from "marking it as failed" to "reporting the condition as failed" (138->151). Ratio reduced from 1.196 to 1.129.

### s07-q065 (length-balance)
- **Option C (correct):** Trimmed from "Create the `db-credentials` Secret in the `staging` namespace" to "Create `db-credentials` in the `staging` namespace" and adjusted operator wording (108->115).
- **Option D:** Expanded from "for Secret access" to "to access the Secret" (129->116). Ratio reduced from 1.194 to 1.018.

### s07-q068 (length-balance)
- **Option A:** Trimmed from "which differs from eviction because it targets a single container" to "which targets a single container" (144->111).
- **Option B:** Expanded with "a" article (112->114). Ratio reduced from 1.286 to 1.072.

### s07-q080 (length-balance)
- **Option C:** Trimmed from "these controller loops have higher reconciliation frequency than ReplicaSet controllers" to "these controller loops reconcile more frequently than ReplicaSet controllers" (136->125).
- **Option D:** Expanded with "automatically" (106->120). Ratio reduced from 1.283 to 1.136.

### s07-q082 (length-balance residual)
- **Option A (correct):** Trimmed from "verify the `targetRevision` field in" to "verify `targetRevision` in" (129->119).
- **Option B:** Expanded from "requires a manual" to "caches...indefinitely and requires a manual" (108->120). Ratio reduced from 1.194 to 1.103.

### s07-q086 (length-balance)
- **Option A:** Expanded from "permits it for trusted workloads" to "permits host networking for trusted workloads" (101->114). Ratio reduced from 1.158 to 1.035.

### s07-q099 (length-balance)
- **Option D:** Trimmed from "and allow transparent IP resolution for clients" to "and resolve IPs transparently" (143->125). Ratio reduced from 1.192 to 1.042.

---

# Round 40 Review - Set 07

**Date:** 2026-02-21
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 17 across 16 questions

## Changes

### s07-q006 (length-balance)
- **All options:** Added descriptive suffixes to all four command options ("to stream output", "for a shell", "to join stdin", "for a tunnel") to reduce ratio from 1.206 to 1.102.

### s07-q010 (length-balance)
- **Option B:** Expanded from "based on their current labels" to "based on their current assigned labels in the cluster" (97->121). Ratio reduced from 1.206 to 1.090.

### s07-q015 (length-balance)
- **Option A (correct):** Expanded from "waits for new pods before" to "waits for new pods to be healthy before" (110->124). Answer was shortest with gap=10; now within 3 chars of the longest.

### s07-q031 (giveaway)
- **Option C:** Added parenthetical "(e.g., Calico)" to break the unique parenthetical pattern that was only present in the correct answer D.

### s07-q039 (giveaway + length-balance)
- **Option A:** Added parenthetical "(e.g., double each tier)" and rewrote to match correct answer's structure.
- **Option C (correct):** Removed parenthetical "(e.g., Jaeger or Zipkin)" and rewrote as "with tools like Jaeger or Zipkin" to eliminate unique structural giveaway.

### s07-q045 (giveaway)
- **Option A (correct):** Removed parenthetical "(e.g., `Fluentd`, `Loki`)" and rewrote as "like Fluentd or Loki" to eliminate unique structural giveaway.
- **Option D:** Added parenthetical "(via the API server)" to break pattern exclusivity.

### s07-q048 (length-balance)
- **Option C (correct):** Expanded from "from disk" to "from the mounted path" then trimmed to 126 chars. Answer was shortest at 119 with gap=10; now gap reduced to 5.

### s07-q049 (length-balance)
- **Option A (correct):** Expanded from "desired state in Git" to "desired state declared in Git" (84->93). Answer was shortest with gap=6; now within 3 chars of others.

### s07-q057 (giveaway)
- **Option A (correct):** Replaced parenthetical "(e.g., `linux/arm64`)" with inline "like `linux/arm64`" to eliminate unique structural pattern.
- **Option B:** Added parenthetical "(e.g., v20 vs v24)" to break pattern exclusivity across options.

### s07-q069 (length-balance)
- **All options:** Rebalanced from 124-145 spread (ratio 1.169) to 121-126 spread (ratio 1.041).

### s07-q070 (length-balance)
- **Options A, B, D:** Padded distractors to reduce gap with correct answer C (was longest at 122, gap=9). Now all options within 117-122 range (ratio 1.043).

### s07-q078 (length-balance)
- **Option A:** Expanded "by the controller" to "by the deployment controller" (108->119).
- **Option C:** Trimmed "readiness check failures" to "readiness failures" (126->120). Ratio reduced from 1.167 to 1.034.

### s07-q088 (giveaway)
- **Option A:** Added semicolon to break unique semicolon pattern in correct answer C. Changed "with SIGKILL and creates" to "with SIGKILL; it then creates".

### s07-q090 (length-balance)
- **Option B (correct):** Trimmed "triggering eviction after 5 minutes" to "triggering eviction" (138->122). Answer was longest with gap=9; now shortest by only 1 char.

### s07-q096 (giveaway)
- **Option A:** Added semicolon structure to break unique semicolon pattern in correct answer C. Rewrote to include "; NodePort Services must use `Cluster` instead".

### s07-q097 (length-balance)
- **Option C:** Expanded from 47 to 58 chars by adding "app=web:v2" to make it a plausible but incorrect full command.
- **Option D:** Expanded from 45 to 53 chars by adding "--prune" flag. Ratio reduced from 1.178 to 1.094.
- **Explanation:** Updated option D explanation to reference the added --prune flag.
