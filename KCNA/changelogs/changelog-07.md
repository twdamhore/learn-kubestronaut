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
