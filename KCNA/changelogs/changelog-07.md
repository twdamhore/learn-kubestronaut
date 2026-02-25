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

---

# Round 41 Review - Set 07

**Date:** 2026-02-21
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 19 across 13 questions

## Changes

### s07-q005 (length-balance)
- **Option D (correct):** Expanded from "removed from Service endpoints" to "removed from the Service endpoint list" (87->95 chars). Correct answer was shortest with ratio 1.126.

### s07-q046 (length-balance)
- **Option C:** Expanded from "on each node hosting the application pods" to "on each node that hosts the application pods" (102->105 chars). Ratio reduced from 1.147 to 1.114.

### s07-q061 (giveaway)
- **Option A:** Added comma-list structure ("mounts, block devices, network disks, and NFS shares") to break unique comma-list pattern in correct answer C.

### s07-q066 (length-balance)
- **Option B (correct):** Expanded from "no more pods are created" to "no more replacement pods are created" (96->108 chars). Correct answer was shortest with ratio 1.135; now ratio 1.112.

### s07-q067 (giveaway + length-balance)
- **Option A:** Added parenthetical "(e.g., a public Docker Hub repo)" to break unique parenthetical+e.g. pattern in correct answer B.
- **Option B (correct):** Expanded from "executed a shell command" to "executed an interactive shell command" (98->111 chars). Correct was shortest at 98 vs 111 longest.

### s07-q075 (giveaway)
- **Option A:** Added parenthetical "(used by the entrypoint script)" to break unique parenthetical pattern in correct answer B.
- **Option C:** Added backticks to `encryption-config` to reduce backtick imbalance (correct B had 6 vs max wrong 2).

### s07-q077 (giveaway)
- **Option A:** Added parenthetical "(e.g., ARM vs x86)" to break unique parenthetical pattern in correct answer D.

### s07-q080 (giveaway + length-balance)
- **Option A (correct):** Expanded from "Existing pods run" to "Existing pods continue to run" (110->122 chars). Was shortest with ratio 1.136.
- **Option B:** Added parenthetical "(e.g., containerd)" to break unique parenthetical pattern in correct answer A.

### s07-q086 (giveaway)
- **Option A:** Added parenthetical "(e.g., for trusted workloads)" to break unique e.g. pattern in correct answer C.
- **Option B:** Added backticks to `resources.limits` to reduce backtick imbalance (correct C had 6 vs max wrong 2).
- **Option D:** Added backticks to `automountServiceAccountToken: false` to further reduce backtick imbalance.

### s07-q089 (giveaway + length-balance)
- **Option A:** Rewrote with comma-list structure ("debugging, data patching, and schema changes") to break unique comma-list in correct D.
- **Option C:** Rewrote with comma-list ("sessions, database clients, shell access, and tunnels") to further break pattern exclusivity.

### s07-q090 (giveaway)
- **Option A:** Added backticks to `limits.memory` and `eviction-manager` to reduce backtick imbalance (correct B had 6 vs max wrong 2).
- **Option D:** Added backticks to `NoExecute`, `PodDisruptionBudget`, and `tolerationSeconds` to further reduce backtick imbalance.

### s07-q095 (giveaway)
- **Option A:** Added parenthetical "(e.g., a missing closing bracket)" to break unique parenthetical+e.g. pattern in correct answer D.

### s07-q100 (giveaway)
- **Option B:** Added parenthetical "(e.g., with backoff)" to break unique parenthetical+e.g. pattern in correct answer A.

---

# Round 42 Review - Set 07

**Date:** 2026-02-21
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 7 across 7 questions

## Changes

### s07-q001 (giveaway)
- **Problem:** Correct answer C had a unique comma-list structure ("starts, crashes, and") not present in any distractor.
- **Fix:** Rewrote option B from "The node running the pod has run out of available disk space and is actively evicting workloads" to "The node ran out of disk space, triggered eviction, and is actively removing workloads from the host" to add a matching comma-list pattern.

### s07-q048 (giveaway)
- **Problem:** Correct answer C had a unique em-dash not present in any distractor.
- **Fix:** Added em-dash to option A: changed "are immutable after pod creation and require a full pod delete" to "are immutable after pod creation—a full pod delete and recreate cycle is required".

### s07-q052 (giveaway)
- **Problem:** Correct answer D had a unique comma-and-list pattern ("kubelet, system daemons, and OS overhead") not present in any distractor.
- **Fix:** Rewrote option A from "minus the memory currently consumed by running pod workloads" to "minus memory consumed by pods, init containers, and sidecar processes" to add a matching comma-and-list pattern.

### s07-q069 (giveaway)
- **Problem:** Correct answer A had a unique em-dash not present in any distractor.
- **Fix:** Added em-dash to option B: changed "use copy-on-write semantics so each container" to "use copy-on-write semantics—each container".

### s07-q080 (giveaway)
- **Problem:** Correct answer A had a unique em-dash not present in any distractor.
- **Fix:** Added em-dash to option C: changed "are most affected because these controller loops" to "are most affected—these controller loops".

### s07-q082 (giveaway)
- **Problem:** Correct answer A had a unique em-dash not present in any distractor.
- **Fix:** Added em-dash to option D: changed "is paused due to a configured sync window restriction on this application" to "is paused—a configured sync window restriction is blocking this application".

### s07-q092 (giveaway)
- **Problem:** Correct answer C had a unique em-dash not present in any distractor.
- **Fix:** Added em-dash to option B: changed "indicates a monitoring error and the actual" to "indicates a monitoring error—the actual".

---

# Round 43 Review - Set 07

**Date:** 2026-02-21
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 5 across 5 questions

## Changes

### s07-q037 (length-balance)
- **Problem:** Option A (97 chars) was too short compared to option B (110 chars), creating a ratio of 1.134.
- **Fix:** Expanded option A from "determines when the pod first receives Service traffic" to "determines when the pod first receives Service traffic from clients" (97->110 chars). Ratio reduced from 1.134 to 1.068.

### s07-q045 (giveaway)
- **Problem:** Correct answer A had a unique "like X or Y" pattern ("like Fluentd or Loki") not present in any distractor.
- **Fix:** Added matching "like" pattern to option D: changed "which automatically captures full container logs (via the API server) on pod termination events" to "which captures full container logs like stdout and stderr on pod termination events automatically".

### s07-q067 (length-balance)
- **Problem:** Options C (98 chars) and D (99 chars) were notably shorter than A (111) and B (111), creating a ratio of 1.133.
- **Fix:** Expanded option C from "starts a shell at boot time" to "starts a shell process at container boot time" (98->116 chars). Expanded option D from "to allow root access to the system process" to "to allow elevated root access to the host system process" (99->113 chars). Ratio reduced from 1.133 to 1.045.

### s07-q091 (giveaway)
- **Problem:** Correct answer A had a unique "such as" pattern ("such as assigning an IP or setting up veth pairs") not present in any distractor.
- **Fix:** Added matching "such as" pattern to option B: changed "failed to pull the required container image from the configured registry endpoint" to "failed to pull the required container image, such as a missing tag or registry timeout".

### s07-q093 (giveaway)
- **Problem:** Correct answer B had a unique "such as" pattern ("such as a manual kill command") not present in any distractor.
- **Fix:** Added matching "such as" pattern to option A: changed "calls exit(137) in its error handler to signal a custom fatal error condition" to "calls exit(137) in its error handler, such as a custom fatal error condition sent to the orchestration layer".

---

## Round 44 — 2026-02-23
**File**: `set-07.js`
**Issues found**: 7

### s07-q032 — giveaway: "because" unique to correct answer B
- Added "because" to distractor D: changed "The pod enters `Pending` state while the scheduler waits for the ConfigMap to be updated with the missing key before proceeding with scheduling" to "The pod enters `Pending` state because the scheduler waits for the ConfigMap to be updated with the missing key before proceeding".

### s07-q039 — giveaway: "like X or Y" unique to correct answer C
- Added "like" pattern to distractor B: changed "Restarting all pods in the request chain to clear any stale connections or cached network state data" to "Restarting all pods in the request chain like Services B and C to clear any stale connections or cached state".

### s07-q047 — giveaway: "because" unique to correct answer B
- Added "because" to distractor D: changed "No, Kubernetes immediately terminates the entire pod when any container enters a crash loop back-off waiting state in the pod" to "No, Kubernetes immediately terminates the entire pod because any container entering a crash loop triggers full pod replacement".

### s07-q055 — giveaway: "including" unique to correct answer A
- Added "including" to distractor B: changed "The NetworkPolicy Ingress rule only allows traffic from app=frontend, so the database pods are denied inbound connections from the api pods entirely" to "The NetworkPolicy Ingress rule only allows traffic from app=frontend, including its replicas, so the database pods are denied inbound api connections".

### s07-q069 — giveaway: "because" unique to correct answer A
- Added "because" to distractor C: changed "Yes, different mount paths create isolated storage spaces within the same `emptyDir` volume, preventing cross-container access" to "Yes, different mount paths create isolated storage spaces because `emptyDir` segments data per mount, preventing cross-access".

### s07-q078 — giveaway: "because" unique to correct answer B
- Added "because" to distractor A: changed "All old pods are immediately terminated by the deployment controller to make room for the new replacement pod instances" to "All old pods are immediately terminated because the deployment controller needs room for the new replacement pod instances".

### s07-q081 — giveaway: "because" unique to correct answer C
- Added "because" to distractor A: changed "The writes silently fail and the application receives I/O errors after reaching the 100Mi size boundary" to "The writes silently fail because the kernel enforces a hard cap, and the application receives I/O errors". Also kept length balanced (ratio 1.040).

## Round 45 — 2026-02-23
**File**: `set-07.js`
**Issues found**: 3

### s07-q053 — giveaway: "X, Y, or Z" multi-solution pattern unique to correct answer C
- Added matching "X, Y, or Z" comma-or pattern to distractor A: changed "Increase the `limits.cpu` on the existing pods to give them more processing power for handling additional load" to "Increase `limits.cpu` on existing pods, lower `requests.memory`, or adjust QoS class for more processing power". Updated explanation for option A to reflect the new wording. Ratio 1.078.

### s07-q057 — giveaway: "like" unique to correct answer A
- Added "like" to distractor C: changed "The container runtime on the cluster nodes does not support the `OCI` image format used by this container" to "The container runtime on the cluster nodes does not support the image format like `OCI` used by this container". Ratio 1.106.

### s07-q039 — giveaway: "like X or Y" tool-enumeration pattern unique to correct answer C
- Added "like" to distractor D: changed "Adding CPU resource limits to all services to prevent noisy-neighbor problems affecting each other" to "Adding CPU resource limits to all services like B and C to prevent noisy-neighbor problems affecting each other". Now B, C, and D all contain "like". Ratio 1.088.

## Round 46 — 2026-02-24
**File**: `set-07.js`
**Issues found**: 5

### s07-q021 — giveaway: "while" unique to correct answer B
- Added "while" to distractor D: changed "The Deployment's replica count was scaled down from 3 to 2 and the excess pod is being terminated by the controller" to "The Deployment's replica count was scaled down from 3 to 2, and the excess pod is being terminated while the controller reconciles". Ratio 1.140.

### s07-q078 — giveaway: "while" unique to correct answer B
- Added "while" to distractor C: changed "Kubernetes automatically reverts to the previous Deployment revision when `maxUnavailable: 0` detects readiness failures" to "Kubernetes automatically reverts to the previous Deployment revision while `maxUnavailable: 0` detects readiness failures". Ratio 1.052.

### s07-q083 — giveaway: "since" unique to correct answer D
- Added "since" to distractor B: changed "Multiple virtual IPs allocated by the headless Service for load balancing across the StatefulSet pod instances" to "Multiple virtual IPs allocated by the headless Service, since it load-balances across all StatefulSet pod instances". Ratio 1.065.

### s07-q095 — giveaway: "or" pattern unique to correct answer D
- Added "or" to distractor C: changed "The Kubernetes version does not support the API version used in the chart manifests, causing an incompatibility validation error" to "The Kubernetes version does not support the API version or resource kind used in the chart manifests, causing a validation error". Ratio 1.113.

### s07-q099 — giveaway: "since" unique to correct answer C
- Added "since" to distractor A: changed "The kube-proxy is not updating iptables rules for the new Service, causing stale routing entries to persist across all nodes" to "The kube-proxy is not updating iptables rules for the new Service, since stale routing entries persist across all cluster nodes". Ratio 1.058.

---

# Round 47 Review - set-07.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-07.js`
**Issues fixed:** 7

---

## s07-q009 (length-balance)

**Problem:** Ratio 1.129 — option B (70 chars) and C (71 chars) were too short compared to D (79 chars).
**Change:** Expanded B from "to filter the log output" to "to filter for the log output" (70->74). Expanded C from "by name" to "by its name" (71->75). Ratio reduced from 1.129 to 1.068.

---

## s07-q021 (length-balance)

**Problem:** Ratio 1.140 — correct answer B (114 chars) was tied for shortest; D (130 chars) was longest.
**Change:** Expanded B from "while old pods (`6d8f9b`) remain" to "while the old pods (`6d8f9b`) still remain running" (114->132). Expanded C from "is unrelated to" to "is completely unrelated to" (114->125). Ratio reduced from 1.140 to 1.056.

---

## s07-q023 (length-balance)

**Problem:** Ratio 1.127 — option A (110 chars) was too short compared to B (124 chars).
**Change:** Expanded A from "to clear the internal cache entry" to "to clear its internal image cache entry" (110->117). Expanded C from "on the nodes" to "on the cluster nodes" (112->120). Ratio reduced from 1.127 to 1.060.

---

## s07-q032 (length-balance)

**Problem:** Ratio 1.140 — option A (147 chars) was too long and D (129 chars) was too short.
**Change:** Trimmed A from "causing application errors at runtime when the database URL is used" to "causing application errors when the database URL is used" (147->136). Expanded D from "before proceeding" to "before proceeding with placement" (129->144). Ratio reduced from 1.140 to 1.059.

---

## s07-q056 (length-balance)

**Problem:** Ratio 1.129 — option A (157 chars) was too long and B (139 chars) was too short.
**Change:** Trimmed A from "after sending SIGTERM before" to "after SIGTERM before" (157->149). Expanded B from "the desired count during a rolling update rollout" to "the desired replica count during a rolling update" (139->148). Ratio reduced from 1.129 to 1.069.

---

## s07-q076 (length-balance)

**Problem:** Ratio 1.127 — option B (110 chars) was too short compared to A (124 chars).
**Change:** Expanded B from "the maximum allowed by a LimitRange named compute-quota in the namespace" to "the maximum allowed per-pod by a LimitRange named compute-quota in the production namespace" (110->129). Ratio reduced from 1.127 to 1.066.

---

## s07-q082 (length-balance)

**Problem:** Ratio 1.121 — option C (116 chars) was too short compared to D (130 chars).
**Change:** Expanded C from "reached its resource quota in" to "reached its resource quota limit in" (116->126). Expanded A from "ArgoCD is not tracking" to "ArgoCD is not currently tracking" (119->129). Ratio reduced from 1.121 to 1.083.

---

## Round 47c — 2026-02-25
**File**: `set-07.js`
**Issues found**: 18 giveaway flags + 3 length-balance residuals
**Issues fixed**: 21 across 18 questions

### s07-q010 — giveaway: first-word "all" vs "the"x3 + length-balance
- Changed distractor A first word from "The" to "An": "An `imagePullSecret` is missing from the pod spec and all nodes are refusing to process the pull request from the registry". Breaks first-word pattern. Expanded from 104 to 118 chars to fix ratio from 1.163 to within threshold.

### s07-q011 — giveaway: unique `, which` in correct answer
- Added `, which` to distractor A: changed "The main application container is crashing repeatedly and the init container is attempting to restart it" to "The main application container is crashing repeatedly, which causes the init container to attempt restarting it".

### s07-q013 — giveaway: unique `, but` in correct answer + length-balance
- Added `, but` to distractor A: changed "The pod has not yet been assigned to a node by the cluster scheduler component" to "The pod has not been assigned to a node by the scheduler, but it is waiting in the queue". Trimmed from 102 to 88 chars. Trimmed B from 97 to 88 chars. Expanded D from 86 to 93 chars. Ratio reduced from 1.229 to within threshold.

### s07-q014 — giveaway: unique `, or` in correct answer
- Added `, or` to distractor A: changed "Remove the `readinessProbe` from the pod spec since it conflicts with the configured security context settings" to "Remove the `readinessProbe` from the pod spec, or adjust the security context settings that conflict with it".

### s07-q021 — giveaway: unique "but" in correct answer
- Added "but" to distractor A: changed "All three pods belong to the same ReplicaSet (`6d8f9b`) and one has developed a corrupted container filesystem causing crashes" to "All three pods belong to the same ReplicaSet (`6d8f9b`) but one has developed a corrupted container filesystem causing crashes".

### s07-q023 — giveaway: first-word "with" vs "the"x3
- Changed distractor A first word from "The" to "Because": "Because the Kubernetes API server cached the old image tag, it needs to be restarted to clear its internal image cache entry".

### s07-q044 — giveaway: first-word "kubernetes" vs "the"x3
- Changed distractor A first word from "The" to "Its": "Its pod transitions to `Completed` state and is never restarted by the kubelet regardless of its configured restart policy".

### s07-q061 — giveaway: unique `, which` in correct answer
- Added `, which` to distractor B: changed "The etcd data directory on the control plane node which stores" to "The etcd data directory on the control plane node, which stores".

### s07-q064 — giveaway: unique `, or` in correct answer
- Added `, or` to distractor C: changed "The pod needs a NetworkPolicy explicitly allowing egress traffic to the API server's endpoint IP address and port 443" to "The pod needs a NetworkPolicy explicitly allowing egress to the API server's endpoint IP address, or port 443 is blocked".

### s07-q065 — giveaway: unique `, or` in correct answer
- Added `, or` to distractor A: changed "Move the pod to the `production` namespace using `kubectl move` to place it alongside the existing Secret resource" to "Move the pod to the `production` namespace using `kubectl move`, or recreate it alongside the existing Secret resource".

### s07-q069 — giveaway: unique "both" in correct answer
- Added "both" to distractor C: changed "Yes, different mount paths create isolated storage spaces because `emptyDir` segments data per mount, preventing cross-access" to "Yes, different mount paths create isolated storage spaces for both containers because `emptyDir` segments data per mount path".

### s07-q076 — giveaway: first-word "a" vs "the"x3 + unique `, and` + length-balance
- Changed distractor A to start with "No" and added `, and`: "No node has 500m CPU available for scheduling the new pod, and the `ReplicaSet` controller cannot create it in production now". Breaks first-word pattern. Expanded from 110 to 124 chars, fixing ratio from 1.173 to within threshold.

### s07-q080 — giveaway: unique "but" in correct answer
- Added "but" to distractor D: changed "There is no impact because the scheduler takes over all controller responsibilities in a failover scenario automatically" to "There is no immediate impact, but the scheduler eventually takes over all controller responsibilities in a failover scenario".

### s07-q084 — giveaway: first-word "some" vs "the"x3
- Changed distractor B first word from "The" to "Sidecar": "Sidecar proxy containers do not have enough CPU resources allocated to handle the mTLS encryption overhead".

### s07-q085 — giveaway: unique `, and` in correct answer
- Added `, and` to distractor A: changed "The kubelet sends a SIGTERM to the application process, giving it the termination grace period to shut down properly" to "The kubelet sends a SIGTERM to the application process, and the termination grace period begins for shutdown".

### s07-q092 — giveaway: unique `, or` in correct answer
- Added `, or` to distractor A: changed "The cluster is optimally sized because it has sufficient headroom for unexpected traffic spikes and burst workloads" to "The cluster is optimally sized for unexpected traffic spikes, or the autoscaler is maintaining burst workload headroom".

### s07-q095 — giveaway: first-word "a" vs "the"x3
- Changed distractor B first word from "The" to "A": "A corrupted Helm repository index needs to be rebuilt before the chart can be installed into the target namespace".

### s07-q096 — giveaway: first-word "with" vs "the"x3
- Changed distractor D first word from "The" to "When": "When using `Local` external traffic policy, the CNI plugin silently falls back to the default `Cluster` behavior".

---

## Round 47d — 2026-02-25
**File**: `set-07.js`
**Issues found**: 27 backtick-balance flags + 1 length-balance residual
**Issues fixed**: 28 across 27 questions

### s07-q010 — backtick balance: correct D=2, distractor avg 0.7
- Added `nodeAffinity` backticks to distractor B and `Pod` backticks to distractor A. Now A=2, B=1, C=1, D=2*.

### s07-q021 — backtick balance: correct B=2, distractor avg 1.0
- Added `Deployment` backticks to distractor C. Now A=1, B=2*, C=2, D=1.

### s07-q023 — backtick balance: correct D=2, distractor avg 1.0 + length-balance residual
- Added `imagePullPolicy` backticks to distractor C. Trimmed C from "installed on" to "on" to fix length ratio from 1.151 to within threshold. Now A=1, B=1, C=2, D=2*.

### s07-q024 — backtick balance: correct A=2, distractor C=0
- Added `kubelet` backticks to distractor C. Now A=2*, B=1, C=1, D=2.

### s07-q027 — backtick balance: correct D=2, distractor A=0
- Added `PersistentVolumeClaim` backticks to distractor A, then added `StatefulSet` backticks for second round. Now A=2, B=1, C=1, D=2*.

### s07-q029 — backtick balance: correct C=2, distractors A=0, B=0
- Added `kubelet` backticks to distractor A. Added `Pod` and `Node` backticks to distractor B. Now A=1, B=2, C=2*, D=1.

### s07-q031 — backtick balance: correct D=1, distractors B=0, C=0
- Added `kube-apiserver` backticks to distractor B. Now A=1, B=1, C=0, D=1*.

### s07-q038 — backtick balance: correct A=2, distractors B=0, D=0
- Added `kubelet` and `imagePullSecrets` backticks to distractor B. Added `base64` backticks to distractor D. Now A=2*, B=2, C=1, D=1.

### s07-q041 — backtick balance: correct A=1, distractors C=0, D=0
- Added `RBAC` backticks to distractor C. Now A=1*, B=1, C=1, D=0.

### s07-q045 — backtick balance: correct A=0, all distractors=1
- Added `Fluentd` backticks to correct answer A. Now A=1*, B=1, C=1, D=1.

### s07-q047 — backtick balance: correct B=1, distractors A=0, D=0
- Added `CrashLoopBackOff` backticks to distractor D. Now A=0, B=1*, C=1, D=1.

### s07-q055 — backtick balance: correct A=2, distractors B=0, D=0
- Added `NetworkPolicy` backticks to distractor B. Added `CNI` backticks to distractor D. Added `NetworkPolicies` backticks to distractor C for second round. Now A=2*, B=1, C=2, D=1.

### s07-q057 — backtick balance: correct A=2, distractors B=0, D=0
- Added `securityContext` backticks to distractor D. Added `Kubernetes` and `Docker` backticks to distractor B. Now A=2*, B=2, C=1, D=1.

### s07-q061 — backtick balance: correct C=1, distractors B=0, D=0
- Added `CSI` backticks to distractor D. Now A=1, B=0, C=1*, D=1.

### s07-q062 — backtick balance: correct B=1, distractors A=0, C=0
- Added `kubelet` backticks to distractor A. Now A=1, B=1*, C=0, D=1.

### s07-q064 — backtick balance: correct A=1, distractors C=0, D=0
- Added `NetworkPolicy` backticks to distractor C. Now A=1*, B=1, C=1, D=0.

### s07-q067 — backtick balance: correct B=2, distractors A=0, D=0
- Added `Docker Hub` backticks to distractor A. Added `securityContext` backticks to distractor D. Now A=1, B=2*, C=2, D=1.

### s07-q070 — backtick balance: correct C=1, distractors B=0, D=0
- Added `scheduler` backticks to distractor B. Now A=1, B=1, C=1*, D=0.

### s07-q071 — backtick balance: correct A=2, distractor B=0
- Added `Prometheus` backticks to distractor B. Now A=2*, B=1, C=1, D=2.

### s07-q075 — backtick balance: correct B=3, distractor avg 1.3
- Added `entrypoint` backticks to distractor A. Added `kube-apiserver` backticks to distractor D. Now A=2, B=3*, C=2, D=2.

### s07-q076 — backtick balance: correct C=2, distractors B=0, D=0
- Added `LimitRange` backticks to distractor B. Added `Pods` backticks to distractor D. Added `Node` backticks to distractor A for second round. Now A=2, B=1, C=2*, D=1.

### s07-q078 — backtick balance: correct B=2, distractor A=0
- Added `Deployment` and `ReplicaSet` backticks to distractor A. Now A=2, B=2*, C=1, D=1.

### s07-q079 — backtick balance: correct A=1, distractors C=0, D=0
- Added `Deployment` backticks to distractor C. Now A=1*, B=1, C=1, D=0.

### s07-q082 — backtick balance: correct A=1, distractors C=0, D=0
- Added `ResourceQuota` backticks to distractor C. Now A=1*, B=1, C=1, D=0.

### s07-q085 — backtick balance: correct B=1, distractors A=0, C=0
- Added `kubelet` backticks to distractor A. Now A=1, B=1*, C=0, D=1.

### s07-q086 — backtick balance: correct C=3, distractor avg 1.3
- Added `restricted` backticks to distractor A. Now A=2, B=1, C=3*, D=2.

### s07-q096 — backtick balance: correct C=1, distractor avg 2.0 (fewer)
- Added `kube-proxy` backticks to correct answer C. Now A=2, B=2, C=2*, D=2.
