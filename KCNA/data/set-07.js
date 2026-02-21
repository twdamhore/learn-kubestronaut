var EXAM_SET = 7;
var EXAM_TITLE = "KCNA Practice Exam - Set 07: Troubleshooting & Debugging";
var questions = [
  {
    id: "s07-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A pod named `api-server` is repeatedly restarting. Running `kubectl get pods` shows the STATUS column as `CrashLoopBackOff` with RESTARTS at 14. What does this status indicate?",
    diagram: null,
    options: [
      "The container image cannot be pulled from the registry and the pod enters ImagePullBackOff status",
      "The node running the pod has run out of available disk space and is actively evicting workloads",
      "The container starts, crashes, and Kubernetes restarts it with exponential back-off delays",
      "The pod's readiness probe is failing so it is being removed from the Service endpoint list"
    ],
    answer: 2,
    explanation: "`CrashLoopBackOff` means the container process starts but then exits with a non-zero code (or is killed). Kubernetes restarts it automatically, but adds increasing back-off delays (10s, 20s, 40s, up to 5 minutes) between attempts. This is distinct from `ImagePullBackOff` (image issues) or probe failures (which affect traffic routing, not restarts in the same way).\n\nWhy other options are wrong:\n- A: ImagePullBackOff is a separate status caused by image pull failures, not container crashes\n- B: Disk pressure causes pod eviction with status Evicted, not CrashLoopBackOff\n- D: Readiness probe failures remove pods from endpoints but do not cause CrashLoopBackOff status\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-restarts",
    verify: "kubectl describe pod api-server | grep -A5 'State:'"
  },
  {
    id: "s07-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "You deploy a pod and it remains in the `Pending` state for over 10 minutes. Running `kubectl describe pod` shows the event: `0/3 nodes are available: 3 Insufficient cpu`. What is the most likely cause?",
    diagram: null,
    options: [
      "The container image specified in the pod manifest does not exist in the registry",
      "A `NetworkPolicy` is blocking the pod from communicating with the API server",
      "The pod's CPU request exceeds allocatable CPU on every node in the cluster",
      "The pod has a `nodeSelector` that does not match any available node labels"
    ],
    answer: 2,
    explanation: "The scheduler message `0/3 nodes are available: 3 Insufficient cpu` explicitly states that none of the three nodes have enough allocatable CPU to satisfy the pod's resource request. The pod stays `Pending` because the scheduler cannot find a suitable node. Reducing the CPU request or adding nodes with more capacity would resolve this.\n\nWhy other options are wrong:\n- A: A missing image produces ImagePullBackOff or ErrImagePull, not Pending with Insufficient cpu\n- B: NetworkPolicy affects pod traffic, not scheduling; a blocked pod would still be scheduled\n- D: A nodeSelector mismatch produces a different message mentioning node label match failure\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: "kubectl describe pod <pod-name> | grep -A10 Events"
  },
  {
    id: "s07-q003",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "After deploying a new version of your application, `kubectl get pods` shows one pod with STATUS `ImagePullBackOff`. The `Events` section of `kubectl describe pod` shows `Failed to pull image \"myapp:v2.1\": rpc error: code = NotFound`. Which action would most directly resolve this?",
    diagram: null,
    options: [
      "Restart the kubelet service on the node where the pod has been scheduled to run currently",
      "Delete the pod's `ServiceAccount` resource and then recreate it from the original manifest",
      "Increase the pod's memory limits in its resource spec to allow the image to be pulled down",
      "Verify that image `myapp:v2.1` exists in the container registry with the correct tag"
    ],
    answer: 3,
    explanation: "`ImagePullBackOff` with a `NotFound` error code means the container runtime could not locate the specified image and tag in the registry. The most direct fix is to confirm the image name and tag are correct and that the image has been pushed to the registry. Memory limits do not affect image pulls, and kubelet restarts rarely fix missing images.\n\nWhy other options are wrong:\n- A: Restarting kubelet does not fix a missing image in the registry\n- B: Deleting a ServiceAccount is unrelated to image pull failures\n- C: Memory limits do not affect image pulling; the pull uses kubelet resources, not the container's\n\nReference: https://kubernetes.io/docs/concepts/containers/images/",
    verify: "kubectl describe pod <pod-name> | grep -i 'image\\|pull'"
  },
  {
    id: "s07-q004",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod's container is being `OOMKilled` repeatedly. The `kubectl describe pod` output shows `Last State: Terminated` with `Reason: OOMKilled` and `Exit Code: 137`. What does this tell you about the container?",
    diagram: '<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="120" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Container Lifecycle</text><rect x="40" y="55" width="100" height="40" rx="6" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="90" y="79" text-anchor="middle" fill="#e0e0e0" font-size="11">Running</text><line x1="140" y1="75" x2="200" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arrow4)"/><text x="170" y="68" text-anchor="middle" fill="#aaa" font-size="10">?</text><rect x="200" y="55" width="150" height="40" rx="6" fill="#7b2d26" stroke="#e63946" stroke-width="1.5"/><text x="275" y="79" text-anchor="middle" fill="#e0e0e0" font-size="10">Terminated (Exit Code 137)</text><defs><marker id="arrow4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/></marker></defs></svg>',
    options: [
      "The container's `livenessProbe` timed out and Kubernetes terminated the running process",
      "The node ran out of available disk space causing the container to be evicted by kubelet",
      "The container exceeded its configured `limits.memory` and the Linux kernel killed it",
      "The container failed its startup probe check and was terminated by the kubelet process"
    ],
    answer: 2,
    explanation: "`OOMKilled` with exit code 137 means the Linux kernel's OOM killer terminated the process because it exceeded the cgroup memory limit set by `limits.memory`. Exit code 137 equals 128 + SIGKILL(9). The fix is to either optimize the application's memory usage or increase the memory limit in the pod spec.\n\nWhy other options are wrong:\n- A: Liveness probe timeout causes a restart with Reason: Killing, not OOMKilled with exit code 137\n- B: Disk space exhaustion causes DiskPressure eviction, not OOMKilled\n- D: Startup probe failure causes restart with a different reason, not OOMKilled\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#exceed-a-container-s-memory-limit",
    verify: "kubectl describe pod <pod-name> | grep -A3 'Last State'"
  },
  {
    id: "s07-q005",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "Users report intermittent 503 errors when accessing your service. Some pods behind the Service are in `Running` state but their `READY` column shows `0/1`. What is the most likely explanation?",
    diagram: null,
    options: [
      "The pods have no resource limits configured in their spec and are being CPU-throttled by cgroups",
      "The pods are running on nodes that have been cordoned by the cluster administrator recently",
      "DNS resolution for the Service name is intermittently failing across the cluster nodes in the mesh",
      "The readiness probe is failing on those pods so they are removed from Service endpoints"
    ],
    answer: 3,
    explanation: "When a pod shows `0/1` in the READY column while in `Running` state, it means the readiness probe is failing. Kubernetes removes pods with failing readiness probes from the Service's Endpoints, so traffic is not routed to them. This causes 503 errors when not enough healthy pods remain to handle the load.\n\nWhy other options are wrong:\n- A: Missing resource limits causes throttling but does not make READY show 0/1 while Running\n- B: Cordoned nodes prevent new scheduling; existing Running pods remain and stay Ready\n- C: DNS resolution failures would cause application-level errors, not 0/1 READY status\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s07-q006",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "You need to inspect the filesystem of a running container to check if a configuration file was mounted correctly. Which command allows you to open an interactive shell inside the container?",
    diagram: null,
    options: [
      "`kubectl logs <pod-name> --follow`",
      "`kubectl exec -it <pod-name> -- /bin/sh`",
      "`kubectl attach <pod-name> --stdin`",
      "`kubectl port-forward <pod-name> 8080:80`"
    ],
    answer: 1,
    explanation: "`kubectl exec -it <pod-name> -- /bin/sh` starts an interactive shell session inside the running container. The `-i` flag keeps stdin open and `-t` allocates a TTY. This lets you navigate the filesystem, inspect files, check environment variables, and run diagnostic commands directly inside the container.\n\nWhy other options are wrong:\n- A: kubectl logs shows container stdout/stderr output, not an interactive shell\n- C: kubectl attach connects to the main process stdin, not a new shell session\n- D: kubectl port-forward creates a network tunnel, not a shell session\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/get-shell-running-container/",
    verify: "kubectl exec -it <pod-name> -- /bin/sh -c 'ls /etc/config'"
  },
  {
    id: "s07-q007",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "Your team is adopting a cloud native troubleshooting strategy. A microservice pod keeps crashing, but the application does not write meaningful logs to stdout. According to cloud native best practices, what should the team prioritize?",
    diagram: null,
    options: [
      "Refactor the application to emit structured logs to stdout/stderr for `kubectl logs` and aggregators",
      "SSH into the node and read the application log files directly from the container's `overlay2` filesystem layer",
      "Mount a persistent volume to store application log files and set up a cron job to periodically collect them",
      "Disable container restart policies so the crashed container's filesystem persists for postmortem analysis"
    ],
    answer: 0,
    explanation: "The twelve-factor app methodology and cloud native best practices recommend that applications write logs as event streams to stdout/stderr. This enables `kubectl logs` to work natively and allows log aggregation systems like Fluentd or Loki to collect logs without custom file-path configurations.\n\nWhy other options are wrong:\n- B: SSHing into nodes bypasses Kubernetes abstractions and does not scale in cloud native environments\n- C: Persistent volumes for logs add complexity; cron-based collection is fragile and not cloud native\n- D: Disabling restarts loses self-healing and container filesystems are ephemeral anyway\n\nReference: https://12factor.net/logs",
    verify: null
  },
  {
    id: "s07-q008",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "After a node reboot, several pods are stuck in `Terminating` state and will not delete. Running `kubectl delete pod <name>` hangs indefinitely. What is the recommended approach to forcefully remove these pods?",
    diagram: null,
    options: [
      "`kubectl delete pod <name> --grace-period=0 --force` to bypass graceful shutdown",
      "`kubectl drain <node-name> --ignore-daemonsets` to evict all non-DaemonSet pods",
      "`kubectl cordon <node-name>` followed by `kubectl uncordon <node-name>` to reset",
      "`kubectl rollout restart deployment <deployment-name>` to recreate all managed pods"
    ],
    answer: 0,
    explanation: "When a pod is stuck in `Terminating` state (often because the node is unreachable and cannot confirm container shutdown), `kubectl delete pod <name> --grace-period=0 --force` instructs the API server to immediately remove the pod object from etcd without waiting for kubelet confirmation. This is a last-resort action because it bypasses graceful shutdown.\n\nWhy other options are wrong:\n- B: kubectl drain evicts pods but cannot force-remove pods stuck in Terminating on unreachable nodes\n- C: cordon/uncordon controls scheduling, not stuck Terminating pods\n- D: rollout restart creates new pods but does not remove stuck Terminating pod objects from etcd\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination-forced",
    verify: "kubectl get pods --field-selector=status.phase=Running"
  },
  {
    id: "s07-q009",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A multi-container pod has two containers: `app` and `sidecar-logger`. You want to view only the logs from the `app` container. Which command is correct?",
    diagram: null,
    options: [
      "`kubectl logs <pod-name>` which defaults to the first container only listed",
      "`kubectl describe pod <pod-name> | grep logs` to filter the log output",
      "`kubectl logs <pod-name> -c app` to select a specific container by name",
      "`kubectl exec <pod-name> -- cat /var/log/app.log` to read the log file directly"
    ],
    answer: 2,
    explanation: "In a multi-container pod, the `-c` flag lets you specify which container's logs to view. The `-c app` flag targets only the `app` container's stdout/stderr stream. In older Kubernetes versions, omitting -c in a multi-container pod returns an error. Starting in Kubernetes 1.28 (beta) and 1.29 (GA), omitting -c defaults to the first container in the pod spec, but using -c explicitly is the recommended practice.\n\nWhy other options are wrong:\n- A: Without -c in multi-container pods, older versions error out; newer versions default to first container, not necessarily the desired one\n- B: kubectl describe does not show container logs; it shows events and resource metadata\n- D: kubectl exec cat reads files inside the container, but the app may not write to that path and this is not the kubectl logs mechanism\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
    verify: "kubectl logs <pod-name> -c app --tail=20"
  },
  {
    id: "s07-q010",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A deployment's pods fail to start with the event: `Warning FailedScheduling: 0/5 nodes are available: 5 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn't tolerate`. What does this mean?",
    diagram: null,
    options: [
      "The pod's `imagePullSecret` is missing and all nodes are refusing to process the pull request from the registry",
      "The pod's nodeAffinity rules exclude nodes with the not-ready taint based on their current labels",
      "The cluster's admission controller is blocking pod creation due to a configured security policy enforcement violation",
      "All five nodes are `NotReady` and the pods lack a toleration for the `not-ready` taint applied by the node controller"
    ],
    answer: 3,
    explanation: "When nodes are in `NotReady` state, Kubernetes automatically applies the taint `node.kubernetes.io/not-ready`. Pods without a matching toleration cannot be scheduled onto tainted nodes. The message indicates all five nodes are unavailable, likely due to network partitions, kubelet failures, or node resource exhaustion.\n\nWhy other options are wrong:\n- A: Missing image pull secrets cause ImagePullBackOff, not taint-related scheduling failure\n- B: nodeAffinity mismatch produces a different scheduling message about affinity rules, not taints\n- C: Admission controller blocks produce Forbidden errors at API level, not scheduling failures\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#taint-based-evictions",
    verify: "kubectl get nodes && kubectl describe node <node-name> | grep Taint"
  },
  {
    id: "s07-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod has an init container that must complete before the main application container starts. The pod is stuck in `Init:CrashLoopBackOff`. What does this status mean?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Init Container Lifecycle</text><rect x="30" y="55" width="90" height="40" rx="6" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="75" y="79" text-anchor="middle" fill="#e0e0e0" font-size="11">Init Start</text><line x1="120" y1="75" x2="150" y2="75" stroke="#888" stroke-width="1.5" marker-end="url(#arr11)"/><rect x="150" y="55" width="90" height="40" rx="6" fill="#7b2d26" stroke="#e63946" stroke-width="1.5"/><text x="195" y="72" text-anchor="middle" fill="#e0e0e0" font-size="10">Init Crashes</text><text x="195" y="85" text-anchor="middle" fill="#e0e0e0" font-size="10">(exit != 0)</text><path d="M195 95 Q195 130 75 130 Q30 130 30 95" stroke="#e76f51" stroke-width="1.5" fill="none" marker-end="url(#arr11)"/><text x="115" y="125" text-anchor="middle" fill="#e76f51" font-size="9">?</text><rect x="270" y="55" width="100" height="40" rx="6" fill="#264653" stroke="#555" stroke-width="1.5" stroke-dasharray="4,3"/><text x="320" y="72" text-anchor="middle" fill="#666" font-size="10">Main Container</text><text x="320" y="85" text-anchor="middle" fill="#666" font-size="10">(status?)</text><text x="200" y="170" text-anchor="middle" fill="#aaa" font-size="10">What is the status of the main container?</text><defs><marker id="arr11" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/></marker></defs></svg>',
    options: [
      "The main application container is crashing repeatedly and the init container is attempting to restart it",
      "The init container keeps crashing and restarting, which prevents the main container from ever starting",
      "The init container completed successfully but the main container cannot locate the files it produced",
      "The pod was evicted due to node resource pressure and is being rescheduled on a different cluster node"
    ],
    answer: 1,
    explanation: "`Init:CrashLoopBackOff` indicates the init container is repeatedly failing. Kubernetes requires all init containers to complete successfully (exit code 0) in order before starting any main containers. Until the init container succeeds, the main containers are blocked from starting.\n\nWhy other options are wrong:\n- A: Init containers do not manage or restart main containers; they run before main containers start\n- C: If init completed successfully, the status would not be Init:CrashLoopBackOff\n- D: Eviction shows status Evicted, not Init:CrashLoopBackOff\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/",
    verify: "kubectl describe pod <pod-name> | grep -A10 'Init Containers'"
  },
  {
    id: "s07-q012",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "In a microservices architecture, Service A depends on Service B. After deploying a new version of Service B, Service A starts returning timeout errors. The pods for Service B are `Running` and `Ready`. What should you check first?",
    diagram: null,
    options: [
      "Whether Service B's container image was built using the correct base image version and dependencies",
      "Whether the Kubernetes scheduler inadvertently moved Service B pods to a different cluster namespace",
      "Whether Service A's pod security policy was accidentally modified during the recent deployment rollout",
      "Whether Service B's new version changed its API contract or response time, causing request timeouts"
    ],
    answer: 3,
    explanation: "When pods are `Running` and `Ready` but downstream consumers experience timeouts, the issue is likely at the application layer. A new version of Service B may have introduced slower response times, changed endpoint paths, or modified the API contract. Checking response latency and API compatibility between the two services is the most productive first step.\n\nWhy other options are wrong:\n- A: Base image issues would cause build or startup failures, not timeouts from running healthy pods\n- B: The scheduler does not move pods between namespaces; namespaces are metadata, not placement\n- C: Pod security policies do not cause timeout errors between services\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
    verify: "kubectl logs <service-a-pod> | grep -i timeout"
  },
  {
    id: "s07-q013",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You run `kubectl describe pod web-app` and see the following under Conditions:\n\n```\nConditions:\n  Type     Status\n  PodScheduled   True\n  Initialized    True\n  ContainersReady False\n  Ready          False\n```\n\nWhat can you conclude?",
    diagram: null,
    options: [
      "The pod has not yet been assigned to a node by the cluster scheduler component",
      "The pod's init containers have not completed execution of their initialization tasks",
      "The pod is scheduled and initialized, but a main container is not passing readiness",
      "The pod's volumes have failed to mount and all containers are stuck in a waiting state"
    ],
    answer: 2,
    explanation: "`PodScheduled: True` means a node was assigned. `Initialized: True` means all init containers completed. `ContainersReady: False` and `Ready: False` together mean at least one container's readiness probe is not passing. The pod is running but not considered ready to serve traffic.\n\nWhy other options are wrong:\n- A: PodScheduled=True contradicts this; the pod is already assigned to a node\n- B: Initialized=True contradicts this; all init containers have completed\n- D: Volume mount failures typically prevent Initialized from becoming True or show ContainerCreating status\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-conditions",
    verify: "kubectl get pod web-app -o jsonpath='{.status.conditions}'"
  },
  {
    id: "s07-q014",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A pod fails to start with the event: `Error: container has runAsNonRoot and image will run as root`. What must you change to fix this?",
    diagram: null,
    options: [
      "Remove the `readinessProbe` from the pod spec since it conflicts with the configured security context settings",
      "Add a `ClusterRoleBinding` that grants the pod's ServiceAccount root access to bypass the security restriction",
      "Ensure the container image runs as a non-root user, or set `runAsUser` to a non-zero UID in `securityContext`",
      "Set `privileged: true` in the container's security context to completely bypass the runAsNonRoot restriction"
    ],
    answer: 2,
    explanation: "The `runAsNonRoot` security context setting prevents containers from running as UID 0. If the image's default user is root, you must either rebuild the image with a non-root USER directive in the Dockerfile or explicitly set `securityContext.runAsUser` to a non-zero UID in the pod spec. Setting `privileged: true` would be a security anti-pattern.\n\nWhy other options are wrong:\n- A: Readiness probes are unrelated to securityContext runAsNonRoot settings\n- B: ClusterRoleBinding grants API access, not OS-level root bypass for containers\n- D: privileged: true is a severe security anti-pattern that escalates privileges rather than fixing root cause\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].securityContext}'"
  },
  {
    id: "s07-q015",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "After a rolling update, some pods from the new ReplicaSet are in `CrashLoopBackOff` while old pods were terminated. Users are experiencing downtime. What deployment setting could have prevented this scenario?",
    diagram: null,
    options: [
      "Configuring `minReadySeconds` and a readiness probe so the rollout waits for new pods before removing old ones",
      "Setting `spec.strategy.type` to `Recreate` so all existing pods are replaced simultaneously during each deployment update",
      "Increasing `terminationGracePeriodSeconds` to give the old pods more time to complete in-flight requests before shutdown",
      "Adding a `PodDisruptionBudget` with `maxUnavailable: 100%` to allow the deployment controller to remove all pods at once"
    ],
    answer: 0,
    explanation: "Setting `minReadySeconds` combined with a readiness probe ensures that new pods must be healthy for the specified duration before the deployment controller considers them available. This prevents the premature termination of old pods when new ones are crashing. Without readiness probes, Kubernetes may consider new pods ready immediately after starting.\n\nWhy other options are wrong:\n- B: Recreate strategy causes downtime by terminating all old pods before creating new ones\n- C: terminationGracePeriodSeconds helps in-flight requests but does not prevent premature old pod termination\n- D: PDB with maxUnavailable 100% removes all protection and worsens the scenario\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#min-ready-seconds",
    verify: "kubectl describe deployment <name> | grep -i strategy"
  },
  {
    id: "s07-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod is stuck in `Pending` state. The events show: `0/3 nodes are available: 1 node(s) had taint {gpu=true: NoSchedule}, 2 node(s) had taint {maintenance: NoSchedule}`. The pod needs to run on the GPU node. What should you add to the pod spec?",
    diagram: null,
    options: [
      "A nodeSelector matching the GPU node's labels to override the taint and direct scheduling there",
      "An annotation `scheduler.alpha.kubernetes.io/gpu-required: \"true\"` in the pod's metadata section",
      "A toleration for the taint `gpu=true:NoSchedule` so the scheduler allows pod placement on that node",
      "A resource request for `nvidia.com/gpu: 1` under the container resources specification section"
    ],
    answer: 2,
    explanation: "The scheduler message shows the GPU node has a `NoSchedule` taint. For the pod to be scheduled there, it must include a matching toleration in its spec. While a `nodeSelector` or resource request might help target the GPU node, the taint is the blocking factor here. Without the toleration, the scheduler will not place the pod on that node regardless of other settings.\n\nWhy other options are wrong:\n- A: nodeSelector targets a node but cannot override the NoSchedule taint blocking placement\n- B: This annotation is not a valid Kubernetes scheduling mechanism\n- D: GPU resource request helps with device allocation but does not overcome the taint\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    verify: "kubectl describe node <gpu-node> | grep Taints"
  },
  {
    id: "s07-q017",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod can reach other pods by IP address but DNS lookups for Service names fail. Running `kubectl exec <pod> -- nslookup kubernetes.default` returns `connection timed out; no servers could be reached`. Which component should you investigate?",
    diagram: null,
    options: [
      "The `kube-scheduler`, as it may have placed the pod on a network-isolated cluster node",
      "The `kube-proxy` DaemonSet, which manages the iptables rules for routing Service traffic",
      "The CoreDNS pods in `kube-system`, which provide cluster DNS resolution for all pods",
      "The `etcd` cluster, which stores all DNS records and network configuration for the cluster"
    ],
    answer: 2,
    explanation: "DNS resolution within a Kubernetes cluster is handled by CoreDNS (or kube-dns in older clusters) running in the `kube-system` namespace. If DNS lookups time out but direct IP communication works, the CoreDNS pods are likely down, misconfigured, or unreachable. Checking their status and logs is the correct first step.\n\nWhy other options are wrong:\n- A: kube-scheduler handles pod placement, not DNS; IP connectivity working rules out network isolation\n- B: kube-proxy manages Service iptables/IPVS rules, not DNS resolution\n- D: etcd stores cluster state, not DNS records; CoreDNS reads from the API server, not etcd directly\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/",
    verify: "kubectl get pods -n kube-system -l k8s-app=kube-dns"
  },
  {
    id: "s07-q018",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "You want to monitor pod restarts in real-time across all namespaces to identify unstable workloads. Which command provides a continuously updating view?",
    diagram: null,
    options: [
      "`kubectl get pods -A --sort-by='.status.containerStatuses[0].restartCount'` for a sorted snapshot",
      "`kubectl get pods --all-namespaces --watch` to stream live pod status changes as they happen",
      "`kubectl top pods --all-namespaces --containers` to display current CPU and memory usage totals",
      "`kubectl get events -A --field-selector reason=Killing` to list historical termination events"
    ],
    answer: 1,
    explanation: "`kubectl get pods -A --watch` streams real-time updates for all pods across all namespaces. Whenever a pod's status changes (including restarts), a new line is printed. The `-A` flag is shorthand for `--all-namespaces`. While sorting by restart count shows a snapshot, it does not provide live updates.\n\nWhy other options are wrong:\n- A: sort-by gives a one-time snapshot, not a continuously updating view\n- C: kubectl top --containers shows CPU/memory metrics, not restart counts or status changes\n- D: field-selector on events shows historical events, not live pod status updates\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
    verify: "kubectl get pods -A --watch"
  },
  {
    id: "s07-q019",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A container's liveness probe is configured as an HTTP GET to `/healthz` on port 8080. The application takes 30 seconds to initialize, but the probe starts checking at container start with `initialDelaySeconds: 5`. What will happen?",
    diagram: null,
    options: [
      "The pod will enter `ImagePullBackOff` because the health endpoint is not responsive during container initialization phase",
      "The container will be marked as not ready but will continue running until it eventually passes the configured readiness probe",
      "The liveness probe will automatically wait for the readiness probe to pass first before it begins performing any health checks",
      "The kubelet kills and restarts the container because the liveness probe fails during initialization, causing a crash loop"
    ],
    answer: 3,
    explanation: "With `initialDelaySeconds: 5` but a 30-second startup time, the liveness probe starts firing at second 5. Since the application is not yet serving `/healthz`, the probe fails. After `failureThreshold` consecutive failures, the kubelet kills the container. This creates a restart loop because the app never gets enough time to start. The fix is to increase `initialDelaySeconds` or use a `startupProbe`.\n\nWhy other options are wrong:\n- A: ImagePullBackOff is about image pulling, completely unrelated to probe behavior\n- B: This describes readiness probe behavior, not liveness; liveness failures cause restarts, not just readiness changes\n- C: Liveness and readiness probes operate independently; liveness does not wait for readiness\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-http-request",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Liveness'"
  },
  {
    id: "s07-q020",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Your team needs to debug a production container that was built from a minimal/distroless image with no shell or debugging tools. Which Kubernetes feature allows you to attach a debugging container to the running pod?",
    diagram: null,
    options: [
      "`kubectl debug <pod-name> --image=busybox --target=<container-name>` for ephemeral debugging",
      "`kubectl cp` to copy a debug binary into the running container's writable overlay filesystem layer",
      "`kubectl exec <pod-name> -- /bin/sh` to start a shell in the existing minimal distroless container",
      "`kubectl replace --force` to redeploy the pod with a different image that contains debug tools"
    ],
    answer: 0,
    explanation: "Ephemeral containers, created via `kubectl debug`, allow you to attach a container with debugging tools to an existing pod without restarting it. The `--target` flag shares the process namespace with the specified container. This is especially useful for distroless images that lack shells and common utilities.\n\nWhy other options are wrong:\n- B: kubectl cp cannot work if the container has no shell or tar binary to receive files\n- C: kubectl exec fails on distroless images because there is no shell binary to execute\n- D: replace --force restarts the pod entirely, losing the current runtime state being debugged\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container",
    verify: "kubectl debug <pod-name> --image=busybox --target=<container-name> -it"
  },
  {
    id: "s07-q021",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment with 3 replicas shows the following after `kubectl get pods`:\n\n```\nNAME                   READY   STATUS             RESTARTS   AGE\nweb-6d8f9b-abc12       1/1     Running            0          2d\nweb-6d8f9b-def34       1/1     Running            0          2d\nweb-7c4e2a-ghi56       0/1     CrashLoopBackOff   8          12m\n```\n\nWhat can you infer about the deployment?",
    diagram: null,
    options: [
      "All three pods belong to the same ReplicaSet (`6d8f9b`) and one has developed a corrupted container filesystem causing crashes",
      "A rolling update created a new ReplicaSet (`7c4e2a`) but the new pod is crashing, while old pods (`6d8f9b`) remain",
      "The third pod was manually created outside of the Deployment controller and is unrelated to the current ReplicaSet",
      "The Deployment's replica count was scaled down from 3 to 2 and the excess pod is being terminated by the controller"
    ],
    answer: 1,
    explanation: "The pod name template in Kubernetes Deployments is `<deployment>-<replicaset-hash>-<pod-hash>`. Two pods share the hash `6d8f9b` (old ReplicaSet) and one has `7c4e2a` (new ReplicaSet). This indicates a rolling update is in progress, but the new revision is failing. The Deployment controller pauses the rollout when new pods crash.\n\nWhy other options are wrong:\n- A: Different ReplicaSet hashes (6d8f9b vs 7c4e2a) prove pods belong to different ReplicaSets\n- C: Deployment-managed pods follow the naming pattern; the third pod matches the deployment name\n- D: A scale-down terminates pods gracefully, not with CrashLoopBackOff status\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl rollout status deployment/web && kubectl get rs"
  },
  {
    id: "s07-q022",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A pod is stuck in `Pending` with the event: `persistentvolumeclaim \"data-pvc\" not found`. The PVC exists in the cluster but the pod remains unscheduled. What is the most likely cause?",
    diagram: null,
    options: [
      "The PVC and the pod are in different namespaces so the pod cannot find the claim",
      "The PVC's storage class does not support dynamic provisioning of persistent volumes",
      "The PVC is in `Bound` state to another pod and cannot be used by this additional pod",
      "The node where the pod would be scheduled does not have enough available disk space"
    ],
    answer: 0,
    explanation: "PVCs are namespace-scoped resources. If the pod references a PVC named `data-pvc` but the PVC exists in a different namespace, the pod's namespace lookup will fail with `not found`. Pods can only mount PVCs that exist in the same namespace. Moving the PVC to the pod's namespace or updating the pod to use the correct namespace resolves this.\n\nWhy other options are wrong:\n- B: Storage class provisioning issues cause Pending PVC status, not pod-level PVC not found\n- C: PVCs with ReadWriteOnce can be bound to one node but the error says not found, not already bound\n- D: Disk space on nodes is not related to PVC not found errors\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim",
    verify: "kubectl get pvc -A | grep data-pvc"
  },
  {
    id: "s07-q023",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "Your CI/CD pipeline deploys a new image tag but the pods still run the old version. The Deployment spec uses `image: myapp:latest` and `imagePullPolicy: IfNotPresent`. What explains this behavior?",
    diagram: null,
    options: [
      "The Kubernetes API server cached the old image tag and needs to be restarted to clear the internal cache entry",
      "The deployment controller ignores `imagePullPolicy: IfNotPresent` when the image name and tag string remain exactly the same",
      "The container runtime installed on the nodes does not support pulling images using the mutable `latest` tag name",
      "With `imagePullPolicy: IfNotPresent`, the node uses its locally cached `myapp:latest` image instead of pulling the update"
    ],
    answer: 3,
    explanation: "With `imagePullPolicy: IfNotPresent`, the kubelet only pulls an image if it is not already present on the node. Since the tag `latest` did not change in the Deployment spec, no rollout is triggered, and the cached image is reused. Using unique image tags (e.g., commit SHA) or setting `imagePullPolicy: Always` prevents this stale-image problem.\n\nWhy other options are wrong:\n- A: The API server does not cache container images; image caching happens at the node level\n- B: The deployment controller does detect spec changes, but the tag string did not change here\n- C: All container runtimes support the latest tag; this is not a runtime limitation\n\nReference: https://kubernetes.io/docs/concepts/containers/images/#image-pull-policy",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].imagePullPolicy}'"
  },
  {
    id: "s07-q024",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team discovers that a failing pod emits zero logs via `kubectl logs`, making debugging impossible. Investigating the container reveals the application writes logs to `/var/log/app.log` inside the container. Which pattern would improve observability without modifying the application code?",
    diagram: null,
    options: [
      "Deploy a sidecar that tails `/var/log/app.log` to stdout, exposing logs via `kubectl logs -c <sidecar>`",
      "Mount a `hostPath` volume so the log file is written directly to the node's filesystem for external collection",
      "Configure the kubelet to automatically detect and forward log files written inside running container filesystems",
      "Set the pod's `restartPolicy` to `Never` so the container's filesystem is preserved after a failure for analysis"
    ],
    answer: 0,
    explanation: "The sidecar logging pattern deploys an additional container that reads log files from a shared volume and streams them to stdout. This makes the logs accessible via `kubectl logs -c <sidecar>` and compatible with cluster-level log aggregation. It avoids modifying the application while following cloud native observability practices.\n\nWhy other options are wrong:\n- B: hostPath volumes couple logs to node filesystem, creating node dependency and security risks\n- C: kubelet does not have built-in auto-detection of application log files inside containers\n- D: restartPolicy Never prevents self-healing; container filesystem is ephemeral and lost on pod deletion\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/logging/#sidecar-container-with-logging-agent",
    verify: null
  },
  {
    id: "s07-q025",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "After upgrading the cluster, `kubectl get nodes` shows one node as `NotReady`. Running `kubectl describe node` shows the condition `KubeletNotReady` with message `runtime network not ready: NetworkReady=false`. What component is likely misconfigured?",
    diagram: null,
    options: [
      "The `kube-apiserver`, which cannot communicate with the node's kubelet after the upgrade process",
      "The `kube-scheduler`, which failed to properly register the node after the cluster upgrade completed",
      "The `CNI` plugin on the node, which provides pod networking and reports network readiness to kubelet",
      "The `etcd` instance on that node, which stores the node's persistent network configuration records"
    ],
    answer: 2,
    explanation: "The message `NetworkReady=false` indicates the Container Network Interface (CNI) plugin on that node has not initialized properly. The kubelet reports `NotReady` when the CNI plugin fails to configure networking. This commonly happens after upgrades when the CNI binary or configuration is missing or incompatible. Reinstalling or reconfiguring the CNI plugin typically resolves the issue.\n\nWhy other options are wrong:\n- A: kube-apiserver communication issues produce different errors like connection refused, not NetworkReady=false\n- B: kube-scheduler does not register nodes; kubelet self-registers with the API server\n- D: Worker nodes do not run etcd; etcd is on control plane nodes and does not store network readiness state\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
    verify: "kubectl describe node <node-name> | grep -A5 Conditions"
  },
  {
    id: "s07-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You run `kubectl get events --sort-by='.lastTimestamp'` and see repeated `BackOff` events for a pod. The event message says `Back-off restarting failed container`. What information should you check next to determine why the container is failing?",
    diagram: null,
    options: [
      "The pod's `metadata.annotations` for any error codes that may have been injected by the scheduler",
      "The container's exit code and logs from the previous run via `kubectl logs <pod> --previous`",
      "The node's kubelet certificate expiry date which may cause authentication failures for the pod",
      "The pod's `ownerReferences` field to identify the parent controller that manages this workload"
    ],
    answer: 1,
    explanation: "When a container keeps restarting, the most direct debugging step is to check the exit code (via `kubectl describe pod`) and the logs from the previous container instance using `kubectl logs <pod> --previous`. The `--previous` flag retrieves logs from the last terminated container, which often reveals the crash reason (segfault, uncaught exception, missing config, etc.).\n\nWhy other options are wrong:\n- A: Pod annotations do not contain error codes injected by the scheduler\n- C: Kubelet certificate issues would prevent the entire node from functioning, not cause individual pod crashes\n- D: ownerReferences identify the parent but do not explain why the container is crashing\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
    verify: "kubectl logs <pod-name> --previous"
  },
  {
    id: "s07-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet pod `db-0` is in `CrashLoopBackOff`. You discover the application fails because it cannot write to `/data`. Running `kubectl exec db-0 -- ls -la /data` shows the directory is owned by `root` but the container runs as UID `1000`. What is the fix?",
    diagram: null,
    options: [
      "Delete the PersistentVolumeClaim and let the StatefulSet recreate it with the correct ownership permissions",
      "Change the StatefulSet's `replicas` to 0 and then back to 1 to trigger a completely fresh volume mount",
      "Set `imagePullPolicy: Always` to force a fresh image pull with the correct file permissions configured",
      "Add an `initContainer` that runs as root to execute `chown 1000:1000 /data` before the main container"
    ],
    answer: 3,
    explanation: "When a PersistentVolume is provisioned, its root directory is often owned by root. If the main container runs as a non-root user, it cannot write to the volume. An init container running as root can fix the ownership with `chown` before the main container starts. Alternatively, you can set `securityContext.fsGroup` on the pod to have Kubernetes adjust group ownership automatically.\n\nWhy other options are wrong:\n- A: Deleting PVC loses all data; StatefulSet recreates PVC but the new volume still has root ownership\n- B: Scaling to 0 and back does not change volume ownership; the same PVC is reattached\n- C: imagePullPolicy has nothing to do with file permissions on mounted volumes\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod",
    verify: "kubectl get pod db-0 -o jsonpath='{.spec.initContainers}'"
  },
  {
    id: "s07-q028",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service of type `ClusterIP` is created for a Deployment, but `curl <service-ip>:<port>` from within the cluster returns `connection refused`. The pods are `Running` and `Ready`. What should you verify?",
    diagram: null,
    options: [
      "That the Service's `spec.selector` matches the pod labels and `targetPort` matches the application's listen port",
      "That a `NetworkPolicy` with an explicit `allow` rule exists for the ClusterIP Service address in the namespace",
      "That the `kube-apiserver` has the `--enable-aggregator-routing` flag enabled in its static pod configuration",
      "That the pods have a `ClusterIP` annotation in their metadata section that references the correct Service resource"
    ],
    answer: 0,
    explanation: "A `connection refused` error when pods are healthy usually means the Service is not correctly routing to the pods. Two common causes are: the selector labels not matching the pod labels (so the Endpoints list is empty), or the `targetPort` not matching the actual port the application is listening on inside the container.\n\nWhy other options are wrong:\n- B: NetworkPolicy is not needed for ClusterIP Service access by default; it would only matter if deny-all policies exist\n- C: --enable-aggregator-routing is for API aggregation, not Service routing\n- D: Pods do not need ClusterIP annotations; the Service selector is what links Services to pods\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
    verify: "kubectl get endpoints <service-name> && kubectl get svc <service-name> -o yaml"
  },
  {
    id: "s07-q029",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod shows `STATUS: Error` and `Exit Code: 1` after running to completion. The pod's `restartPolicy` is `Never`. What will Kubernetes do with this pod?",
    diagram: null,
    options: [
      "The kubelet restarts the container after a back-off delay because exit code 1 indicates a transient failure",
      "Kubernetes will delete the failed pod automatically and schedule a replacement pod on a different cluster node",
      "The pod remains in `Error` state indefinitely because `restartPolicy: Never` prevents any restarts by the kubelet",
      "The `restartPolicy: Never` causes the kubelet to mark the pod as succeeded and clear its resource allocation"
    ],
    answer: 2,
    explanation: "With `restartPolicy: Never`, Kubernetes does not restart failed containers. The pod stays in `Error` (or `Failed`) phase with its logs and status preserved for debugging. This policy is typically used for Jobs or one-shot tasks where you want to inspect failures rather than retry automatically.\n\nWhy other options are wrong:\n- A: Exit code 1 does not cause the kubelet to treat the failure as transient; restartPolicy: Never is honoured and no restart occurs\n- B: Kubernetes does not delete and reschedule the pod; it remains in Failed state for inspection\n- D: A failed container (exit code 1) is not marked as succeeded; restartPolicy: Never keeps the pod in Failed state, it does not change the pod phase to Succeeded\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.restartPolicy}'"
  },
  {
    id: "s07-q030",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod remains `Pending` with the event: `0/4 nodes are available: 2 Insufficient memory, 2 node(s) didn't match Pod's node affinity/selector`. How many distinct issues prevent scheduling?",
    diagram: null,
    options: [
      "Two distinct issues: two nodes lack sufficient memory, and two other nodes fail the pod's affinity or selector rules",
      "One issue: all four nodes have insufficient memory because node affinity overrides the scheduler's memory capacity checks",
      "Three issues: memory shortage, affinity mismatch, and an implicit CPU shortage that the scheduler is not explicitly reporting",
      "One issue: the node selector is misconfigured which causes the scheduler to misreport memory availability on those two nodes"
    ],
    answer: 0,
    explanation: "The scheduler evaluates each node independently. Two nodes were rejected because they do not have enough allocatable memory for the pod's request. The other two nodes were rejected because they do not satisfy the pod's `nodeAffinity` or `nodeSelector` rules. These are two separate constraints affecting different nodes.\n\nWhy other options are wrong:\n- B: Node affinity does not override memory checks; these are independent constraints on different nodes\n- C: The scheduler message explicitly lists only two issues; there is no hidden third issue\n- D: nodeSelector misconfiguration would not cause false memory reports on other nodes\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
    verify: "kubectl describe pod <pod-name> | grep -A3 Events"
  },
  {
    id: "s07-q031",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A pod fails with the event: `Failed to create pod sandbox: rpc error: code = Unknown desc = failed to start sandbox container: Error response from daemon: OCI runtime create failed`. Which layer of the container stack is reporting this error?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="200" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Container Stack Layers</text><rect x="50" y="50" width="300" height="32" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="200" y="71" text-anchor="middle" fill="#e0e0e0" font-size="11">kubelet</text><rect x="50" y="90" width="300" height="32" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="200" y="111" text-anchor="middle" fill="#e0e0e0" font-size="11">Layer 2 (???)</text><rect x="50" y="130" width="300" height="32" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="200" y="151" text-anchor="middle" fill="#e0e0e0" font-size="11">Layer 3 (???)</text><rect x="50" y="170" width="300" height="32" rx="5" fill="#264653" stroke="#555" stroke-width="1.5"/><text x="200" y="191" text-anchor="middle" fill="#e0e0e0" font-size="11">Linux Kernel (cgroups, namespaces)</text></svg>',
    options: [
      "The `kube-scheduler`, which could not find a valid node placement for the pod sandbox container creation request",
      "The kube-apiserver, which rejected the pod spec during the admission control processing phase of the request",
      "The CNI plugin, which failed to assign a valid network namespace to the new pod sandbox container on the node",
      "The CRI (e.g., containerd) relaying an OCI runtime error from the low-level `runc` runtime during pod sandbox creation"
    ],
    answer: 3,
    explanation: "The error message `OCI runtime create failed` indicates the low-level OCI-compliant runtime (typically `runc`) failed to create the container process. This is reported through the CRI layer (containerd or CRI-O) back to the kubelet. Common causes include invalid security context settings, missing kernel capabilities, or corrupted container filesystem bundles.\n\nWhy other options are wrong:\n- A: kube-scheduler operates at the API level and does not interact with OCI runtimes\n- B: kube-apiserver admission happens before scheduling; OCI errors occur during container creation on nodes\n- C: CNI errors produce different messages about network setup, not OCI runtime create failures\n\nReference: https://kubernetes.io/docs/concepts/architecture/cri/",
    verify: "journalctl -u containerd --since '5 minutes ago' | grep -i error"
  },
  {
    id: "s07-q032",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A 12-factor application's pod spec references a ConfigMap that exists but does not contain the key `DATABASE_URL`. The team expects the environment variable to be injected from this ConfigMap. What is the pod's expected behavior?",
    diagram: null,
    options: [
      "The pod starts normally but the environment variable is set to an empty string, causing application errors at runtime when the database URL is used",
      "The pod fails with a `CreateContainerConfigError` status because the referenced key does not exist in the ConfigMap, blocking container startup",
      "The pod starts but Kubernetes automatically injects a default value of `localhost` for any missing ConfigMap keys referenced in the pod spec",
      "The pod enters `Pending` state while the scheduler waits for the ConfigMap to be updated with the missing key before proceeding with scheduling"
    ],
    answer: 1,
    explanation: "When a pod spec uses `configMapKeyRef` to reference a specific key in a ConfigMap and that key does not exist, the container creation fails with `CreateContainerConfigError`. The pod will not start until the ConfigMap is updated to include the missing key or the reference is marked as `optional: true`.\n\nWhy other options are wrong:\n- A: An empty string would occur if the key exists but is empty; a missing key causes CreateContainerConfigError\n- C: Kubernetes never injects default values for missing ConfigMap keys\n- D: The scheduler does not wait for ConfigMap keys; this is a kubelet container creation error\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#restrictions",
    verify: "kubectl describe pod <pod-name> | grep -i error"
  },
  {
    id: "s07-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You notice a pod with `STATUS: Completed` and `RESTARTS: 0` in `kubectl get pods`. The pod belongs to a Job resource. Is this pod healthy?",
    diagram: null,
    options: [
      "No, `Completed` means the pod crashed after finishing its work and should be investigated",
      "No, the pod should show `Running` status if the Job actually succeeded and finished correctly",
      "Yes, `Completed` with exit code 0 means the Job's container ran successfully and exited",
      "Yes, but only if the Job's `backoffLimit` has not been reached during the execution run"
    ],
    answer: 2,
    explanation: "A `Completed` status means the container exited with code 0, indicating success. For Job pods, this is the expected terminal state. Unlike long-running Deployment pods that should remain `Running`, Job pods are designed to run to completion. Zero restarts confirms the pod succeeded on its first attempt.\n\nWhy other options are wrong:\n- A: Completed with exit code 0 means success, not a crash; a crash would show Error or Failed\n- B: Job pods are supposed to terminate; Running would be abnormal for a completed Job\n- D: backoffLimit only matters for failed runs; a Completed pod with 0 restarts clearly succeeded on first attempt\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.containerStatuses[0].state}'"
  },
  {
    id: "s07-q034",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "You want to identify which pods are consuming the most CPU and memory in a namespace. Which command provides live resource usage metrics?",
    diagram: null,
    options: [
      "`kubectl describe pods -n <namespace>` and look for the resource usage fields in the output section",
      "`kubectl get pods -n <namespace> -o wide` combined with the `--show-metrics` display flag for usage",
      "`kubectl top pods -n <namespace> --sort-by=cpu` for real-time resource usage from Metrics API",
      "`kubectl get resourcequota -n <namespace>` to see the per-pod resource consumption totals listed"
    ],
    answer: 2,
    explanation: "`kubectl top pods` queries the Metrics Server (or Metrics API) to show current CPU and memory usage of each pod. The `--sort-by=cpu` flag orders results by CPU consumption. This requires the Metrics Server to be installed in the cluster. `kubectl describe` shows resource requests and limits, not actual usage.\n\nWhy other options are wrong:\n- A: kubectl describe shows resource requests/limits, not actual real-time usage\n- B: --show-metrics is not a valid kubectl flag; kubectl get does not display resource usage\n- D: ResourceQuota shows namespace-level allocation limits, not per-pod real-time consumption\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_top_pod/",
    verify: "kubectl top pods -n <namespace> --sort-by=cpu"
  },
  {
    id: "s07-q035",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod running a web server is accessible from within the cluster but not from external traffic through a `NodePort` Service. The Service is correctly configured with `type: NodePort` and `nodePort: 30080`. What should you check on the nodes?",
    diagram: null,
    options: [
      "Whether the pod has an explicit `externalTrafficPolicy` annotation value set to `Local` in its spec",
      "Whether the pod's container has the `NET_ADMIN` Linux capability listed in its security context",
      "Whether the pod's `hostNetwork` field is set to `true` which would bypass the NodePort routing entirely",
      "Whether the node's firewall or cloud security group allows inbound traffic on port `30080` from outside"
    ],
    answer: 3,
    explanation: "When a NodePort Service is correctly configured and the pod is accessible internally but not externally, the issue is usually at the infrastructure layer. Node firewalls, cloud security groups, or network ACLs may be blocking inbound traffic on the NodePort range (default 30000-32767). Verifying that port 30080 is open on the node's firewall is the essential check.\n\nWhy other options are wrong:\n- A: externalTrafficPolicy is a Service-level field, not a pod annotation\n- B: NET_ADMIN capability is for network administration, not required for NodePort functionality\n- C: hostNetwork bypasses pod networking but does not directly relate to NodePort external access issues\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.type},{.spec.ports[0].nodePort}'"
  },
  {
    id: "s07-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A DaemonSet pod on a specific node keeps getting `OOMKilled`. Other DaemonSet pods on different nodes are running fine. The pod's memory limit is 256Mi. What should you investigate on that specific node?",
    diagram: null,
    options: [
      "Whether additional workloads on that node cause the DaemonSet pod to process more data, pushing memory usage past 256Mi",
      "Whether the DaemonSet's update strategy is set to `OnDelete` instead of `RollingUpdate` for pod replacement policy",
      "Whether the node has a different container runtime version than the other nodes which may cause memory overhead issues",
      "Whether the `kube-proxy` instance running on that specific node is consuming excessive memory from system resources"
    ],
    answer: 0,
    explanation: "If the same DaemonSet pod works on other nodes but gets `OOMKilled` on one, the issue is likely node-specific. Other workloads on that node may cause the DaemonSet pod to handle more work (e.g., more network traffic, logging, or monitoring data), pushing its own memory usage past the 256Mi cgroup limit. Note that `OOMKilled` means the container exceeded its own cgroup memory limit (set by `limits.memory`), which is distinct from kubelet eviction due to overall node memory pressure. Checking `kubectl top pods` on that node and comparing workload patterns is the right approach.\n\nWhy other options are wrong:\n- B: DaemonSet update strategy affects how updates roll out, not memory usage on a specific node\n- C: Different container runtime versions do not typically cause significant memory overhead differences\n- D: kube-proxy uses minimal memory and is unlikely to cause OOMKill of other pods\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: "kubectl top node <node-name> && kubectl top pods --all-namespaces --field-selector spec.nodeName=<node-name>"
  },
  {
    id: "s07-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A `startupProbe` is configured on a container with `failureThreshold: 30` and `periodSeconds: 10`. The application takes about 3 minutes to initialize. What is the purpose of the `startupProbe` in this scenario?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Startup Probe Timeline</text><line x1="40" y1="80" x2="370" y2="80" stroke="#555" stroke-width="2"/><rect x="40" y="65" width="200" height="30" rx="4" fill="#6b2c3b" stroke="#e76f51" stroke-width="1.5"/><text x="140" y="84" text-anchor="middle" fill="#e0e0e0" font-size="10">Startup Probe Active (???)</text><rect x="240" y="65" width="60" height="30" rx="4" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="270" y="84" text-anchor="middle" fill="#e0e0e0" font-size="9">??? probe(s)</text><rect x="305" y="65" width="60" height="30" rx="4" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="335" y="84" text-anchor="middle" fill="#e0e0e0" font-size="9">??? probe(s)</text><text x="40" y="120" fill="#aaa" font-size="10">failureThreshold: 30</text><text x="40" y="138" fill="#aaa" font-size="10">periodSeconds: 10</text><text x="40" y="156" fill="#aaa" font-size="10">Max startup time: ???</text><text x="40" y="174" fill="#e76f51" font-size="10">Liveness + Readiness behavior: ???</text></svg>',
    options: [
      "It takes over from the readiness probe and determines when the pod first receives Service traffic",
      "It continuously monitors the application process and restarts it if startup takes longer than 30 seconds total",
      "It gives the application up to 300 seconds to start before liveness and readiness probes begin checking",
      "It signals the scheduler to delay placing additional pods on the same node until this one becomes healthy"
    ],
    answer: 2,
    explanation: "The `startupProbe` protects slow-starting containers from being killed by liveness probes during initialization. With `failureThreshold: 30` and `periodSeconds: 10`, the container has up to 300 seconds (5 minutes) to start. Until the startup probe succeeds, liveness and readiness probes are disabled. Once it passes, the other probes take over.\n\nWhy other options are wrong:\n- A: startupProbe does not take over from the readiness probe; it temporarily disables both liveness and readiness\n- B: startupProbe allows up to 300s (30x10), not 30s; it does not continuously monitor after success\n- D: startupProbe has no interaction with the scheduler; it runs on the kubelet, not during scheduling\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-startup-probes",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Startup'"
  },
  {
    id: "s07-q038",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A pod fails to pull an image from a private container registry. The event shows: `Failed to pull image: unauthorized: authentication required`. The correct `imagePullSecrets` was created but the pod still cannot authenticate. What is a common mistake?",
    diagram: null,
    options: [
      "The Secret was created with `type: Opaque` instead of required `type: kubernetes.io/dockerconfigjson`",
      "The node's kubelet is configured to ignore image pull secrets for security compliance policy enforcement",
      "The container image tag is set to `latest` which bypasses authentication checks on all private registries",
      "The Secret's data field must be base64-encoded twice for proper Docker registry authentication to succeed"
    ],
    answer: 0,
    explanation: "Image pull secrets must be of type `kubernetes.io/dockerconfigjson` to be recognized by the kubelet for registry authentication. If the Secret was created as `type: Opaque`, the kubelet cannot parse the registry credentials from it, even if the data content is correct. Additionally, the secret must be referenced in the pod's `imagePullSecrets` field or in the ServiceAccount.\n\nWhy other options are wrong:\n- B: kubelet does not have a setting to ignore image pull secrets\n- C: The latest tag does not bypass authentication on private registries\n- D: Secret data only needs to be base64-encoded once; double encoding would corrupt the credentials\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/",
    verify: "kubectl get secret <secret-name> -o jsonpath='{.type}'"
  },
  {
    id: "s07-q039",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "In a distributed microservices system, a chain of calls (A -> B -> C) is experiencing intermittent failures. Service C's pods are healthy, but Service B logs show `context deadline exceeded` when calling Service C. What technique would help pinpoint the latency source?",
    diagram: null,
    options: [
      "Scale up replicas across the distributed service chain to handle the increased load and reduce latency",
      "Restarting all pods in the request chain to clear any stale connections or cached network state data",
      "Implementing distributed tracing (e.g., Jaeger or Zipkin) to visualize latency across each hop",
      "Adding CPU resource limits to all services to prevent noisy-neighbor problems affecting each other"
    ],
    answer: 2,
    explanation: "Distributed tracing propagates a correlation ID through each service in a request chain, recording timing at each hop. Tools like Jaeger or Zipkin visualize the end-to-end trace, making it easy to identify which service or network hop introduces the latency. This is more effective than guessing or restarting pods for intermittent issues.\n\nWhy other options are wrong:\n- A: Scaling replicas across the distributed chain might help if the issue is load, but does not identify the latency source\n- B: Restarting pods is a shotgun approach that does not diagnose the root cause of intermittent failures\n- D: CPU limits can cause throttling but adding them does not diagnose the existing latency problem\n\nReference: https://www.jaegertracing.io/docs/latest/getting-started/",
    verify: null
  },
  {
    id: "s07-q040",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "After running `helm upgrade myrelease ./mychart`, several pods are in `CrashLoopBackOff`. You need to quickly restore the last known working version. Which Helm command achieves this?",
    diagram: null,
    options: [
      "`helm rollback myrelease` to revert to the previous working release revision",
      "`helm uninstall myrelease` then `helm install myrelease ./mychart` to redeploy",
      "`helm template myrelease ./mychart | kubectl delete -f -` to remove resources",
      "`helm repo update && helm upgrade myrelease --reset-values ./mychart` to reset"
    ],
    answer: 0,
    explanation: "`helm rollback myrelease` reverts the release to the previous revision. Helm stores release history, and rollback restores the previously deployed manifests. By default, it rolls back to the immediately preceding revision. You can also specify a revision number with `helm rollback myrelease <revision>`. This is faster and safer than uninstalling and reinstalling.\n\nWhy other options are wrong:\n- B: Uninstall then install loses release history and is disruptive; rollback is faster and preserves history\n- C: helm template + kubectl delete removes resources but does not restore the previous version\n- D: --reset-values resets to chart defaults, not to the previous working release revision\n\nReference: https://helm.sh/docs/helm/helm_rollback/",
    verify: "helm history myrelease"
  },
  {
    id: "s07-q041",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "Running `kubectl` commands from your workstation returns: `Unable to connect to the server: dial tcp <ip>:6443: connect: connection refused`. The cluster was working an hour ago. What should you check first?",
    diagram: null,
    options: [
      "Whether the `kube-apiserver` process is running on the control plane node host",
      "Whether the `etcd` data directory has been encrypted causing connection failures",
      "Whether a new RBAC policy is blocking your specific user account from cluster access",
      "Whether the cluster's Ingress controller is healthy and properly forwarding requests"
    ],
    answer: 0,
    explanation: "A `connection refused` error on port 6443 means nothing is accepting TCP connections on the API server's port. The most direct cause is that the `kube-apiserver` process has stopped or crashed. Checking its status (e.g., `systemctl status kube-apiserver` or `crictl ps` for static pods) is the first diagnostic step. RBAC issues would produce HTTP 403 errors, not connection refused.\n\nWhy other options are wrong:\n- B: etcd encryption does not cause connection refused on port 6443\n- C: RBAC failures return HTTP 403 Forbidden, not TCP connection refused\n- D: Ingress controllers handle external HTTP traffic, not kubectl API server communication\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/",
    verify: null
  },
  {
    id: "s07-q042",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod can resolve DNS names for Services in its own namespace using short names (e.g., `my-service`) but fails to resolve Services in other namespaces. What is the correct DNS format to reach a Service in a different namespace?",
    diagram: null,
    options: [
      "`<service-name>/<namespace>` which uses slash-based notation for cross-namespace DNS lookups",
      "`<namespace>/<service-name>` which uses path-based notation for cross-namespace DNS lookups",
      "`<service-name>--<namespace>.cluster.local` using double-dash as the namespace separator",
      "`<service-name>.<namespace>.svc.cluster.local` the standard fully qualified DNS name"
    ],
    answer: 3,
    explanation: "Kubernetes DNS follows the pattern `<service-name>.<namespace>.svc.cluster.local` for cross-namespace resolution. Within the same namespace, the short name works because the pod's `/etc/resolv.conf` includes search domains. For other namespaces, you need at minimum `<service-name>.<namespace>` or the full FQDN.\n\nWhy other options are wrong:\n- A: Slash-based notation is not used in Kubernetes DNS\n- B: namespace/service-name path notation is not a DNS format\n- C: Double-dash notation is not part of Kubernetes DNS naming conventions\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl exec <pod-name> -- nslookup <service-name>.<namespace>.svc.cluster.local"
  },
  {
    id: "s07-q043",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod enters `CrashLoopBackOff` immediately after starting. The `kubectl logs` output is empty, and `kubectl logs --previous` also returns nothing. What does the absence of logs suggest?",
    diagram: null,
    options: [
      "The application is writing logs to stderr instead of stdout and `kubectl logs` does not capture stderr output streams",
      "The pod's log rotation policy deleted the logs before you could view them during the troubleshooting investigation",
      "The container process crashes before producing any output, likely during entrypoint or command execution at startup",
      "The kubelet on the node has logging disabled via a configuration flag preventing any log capture from containers"
    ],
    answer: 2,
    explanation: "Empty logs from both current and previous container instances indicate the process crashes immediately during startup, before any output is written. Common causes include a missing or non-executable entrypoint binary, a missing shared library, or a segmentation fault in the first instructions. Checking the exit code via `kubectl describe pod` and verifying the image's entrypoint are the next steps.\n\nWhy other options are wrong:\n- A: kubectl logs captures both stdout and stderr; empty logs means neither stream received output\n- B: Log rotation does not delete previous container logs that quickly; kubelet retains them\n- D: kubelet does not have a flag to disable container log capture\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/determine-reason-pod-failure/",
    verify: "kubectl describe pod <pod-name> | grep -A3 'Last State'"
  },
  {
    id: "s07-q044",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod has `restartPolicy: Always` and its single container exits with code 0. What does Kubernetes do?",
    diagram: null,
    options: [
      "The pod transitions to `Completed` state and is never restarted by the kubelet regardless of its configured restart policy",
      "Kubernetes restarts the container because `restartPolicy: Always` means it restarts regardless of the exit code value",
      "The pod is deleted and a new replacement pod is created by the ReplicaSet controller on a potentially different cluster node",
      "The kubelet marks the pod as `Failed` because containers should not exit with code 0 under the Always restart policy rules"
    ],
    answer: 1,
    explanation: "With `restartPolicy: Always` (the default for pods managed by Deployments), the kubelet restarts the container after any exit, including a successful exit with code 0. This is why long-running processes that accidentally exit normally still get restarted. The back-off delay applies to repeated restarts.\n\nWhy other options are wrong:\n- A: restartPolicy Always means the container is always restarted, never reaching terminal Completed\n- C: The kubelet restarts the container in place; the ReplicaSet does not create a new pod for restarts\n- D: Exit code 0 is a valid success exit; kubelet does not mark it as Failed under Always policy\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.restartPolicy}'"
  },
  {
    id: "s07-q045",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "You need to retrieve logs from a pod that crashed and was replaced 2 hours ago. The new pod has the same name. `kubectl logs <pod> --previous` shows logs from the current pod's previous restart, not from the pod that was replaced. How can you retrieve the old logs?",
    diagram: null,
    options: [
      "The old pod's logs are permanently lost unless a cluster-level log aggregation system (e.g., `Fluentd`, `Loki`) collected them",
      "Use `kubectl logs <pod> --since=3h` to reach back in time to the old pod's logs from before the replacement occurred",
      "Run `kubectl describe pod <pod>` which stores the last 1000 log lines from all previous pod instances in the cluster",
      "Use `kubectl get events` which automatically captures full container logs on termination and stores them in the API server"
    ],
    answer: 0,
    explanation: "`kubectl logs --previous` only retrieves logs from the previous container instance within the same pod. When a pod is deleted and replaced, its logs are lost from the node. Cluster-level log aggregation (using tools like Fluentd, Fluent Bit, or Grafana Loki) captures and stores logs externally, making them available after pod deletion.\n\nWhy other options are wrong:\n- B: --since only filters logs within the current or previous container instance, not across replaced pods\n- C: kubectl describe does not store log lines; it shows events and resource metadata only\n- D: kubectl get events captures event objects, not full container log output\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/logging/#cluster-level-logging-architectures",
    verify: null
  },
  {
    id: "s07-q046",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Your team uses Prometheus to monitor Kubernetes workloads. A pod's memory usage steadily climbs until it gets `OOMKilled`, then restarts and repeats the pattern. What Prometheus metric would help you detect this memory leak before the OOM event?",
    diagram: null,
    options: [
      "`kube_pod_status_phase` filtered to `Failed` to detect pods entering terminal failure states before OOM events occur",
      "`container_memory_working_set_bytes` tracked over time, showing continuous upward trend approaching the limit",
      "`node_memory_MemAvailable_bytes` to monitor available memory on each node hosting the application pods",
      "`kube_pod_container_status_restarts_total` to count the number of container restarts and correlate with memory trends"
    ],
    answer: 1,
    explanation: "`container_memory_working_set_bytes` tracks the actual memory being used by a container. A continuously increasing value over time is the signature of a memory leak. You can create a Prometheus alert that fires when this metric exceeds a percentage of the container's memory limit, giving you time to investigate before the OOM kill occurs.\n\nWhy other options are wrong:\n- A: kube_pod_status_phase shows pod phase, not memory usage trends for detecting leaks\n- C: node_memory_MemAvailable_bytes is node-level and lacks per-container granularity\n- D: restart count is reactive and only increases after OOM has already occurred\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
    verify: null
  },
  {
    id: "s07-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A pod with two containers shows `READY: 1/2`. One container is in `Waiting` state with reason `CrashLoopBackOff`. Can the healthy container continue to serve traffic through a Service?",
    diagram: null,
    options: [
      "Yes, Services route traffic to individual containers independently, so the healthy one still receives incoming requests normally",
      "No, the pod is removed from the Service's Endpoints because overall pod readiness is `False` when any container is not ready",
      "Yes, but only if the Service has `sessionAffinity: ClientIP` configured which allows partial pod readiness to serve traffic",
      "No, Kubernetes immediately terminates the entire pod when any container enters a crash loop back-off waiting state in the pod"
    ],
    answer: 1,
    explanation: "A pod's overall readiness is the logical AND of all its containers' readiness states. Since one container is crashing (not ready), the pod condition `Ready` is `False`. Kubernetes removes pods with `Ready: False` from Service Endpoints. This means even the healthy container will not receive Service traffic until the other container is also ready.\n\nWhy other options are wrong:\n- A: Services route to pods, not individual containers; if the pod is not ready, no traffic is sent\n- C: sessionAffinity: ClientIP affects session routing, not partial readiness behavior\n- D: Kubernetes does not terminate the entire pod when one container crashes; it restarts just that container\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-readiness-gate",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s07-q048",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "You apply a ConfigMap change and restart the pods, but the application still reads old configuration values. The ConfigMap is mounted as a volume (not as environment variables). What could explain this?",
    diagram: null,
    options: [
      "ConfigMap volume mounts are immutable after pod creation and require a full pod delete and recreate cycle to update the mounted data",
      "ConfigMap changes are only propagated by the kubelet at a fixed 24-hour synchronization interval, regardless of any manual restarts",
      "The application caches config at startup and does not re-read from disk—verify the pod actually restarted with new data",
      "The `kube-controller-manager` must be restarted for ConfigMap changes to propagate across the cluster to all affected pod volumes"
    ],
    answer: 2,
    explanation: "ConfigMap volume mounts are eventually updated by the kubelet (typically within the sync period of ~60 seconds), and pod restarts would pick up changes immediately. If the application still shows old values after a claimed restart, verify the pods actually restarted (check AGE or RESTARTS columns). The application may also cache config at startup and never re-read the file.\n\nWhy other options are wrong:\n- A: ConfigMap volume mounts are updated automatically by the kubelet, not immutable after creation\n- B: The kubelet sync period is approximately 60 seconds, not 24 hours\n- D: kube-controller-manager does not need restarting for ConfigMap propagation\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: "kubectl get pods -o wide | grep <deployment-name>"
  },
  {
    id: "s07-q049",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps tool (e.g., ArgoCD) shows a Deployment as `OutOfSync` after someone manually ran `kubectl scale deployment web --replicas=5` in the cluster. The Git repository defines `replicas: 3`. What will happen on the next sync?",
    diagram: null,
    options: [
      "ArgoCD will revert the Deployment to `replicas: 3` to match the desired state in Git",
      "ArgoCD will preserve the manual change and then update the Git repository to `replicas: 5`",
      "ArgoCD will compute an average of the values and set the `replicas: 4` as a compromise state",
      "ArgoCD will mark the Deployment as failed and then stop syncing until it is manually resolved"
    ],
    answer: 0,
    explanation: "In GitOps, the Git repository is the single source of truth. When ArgoCD detects drift between the live state and Git, it marks the resource as `OutOfSync`. On the next sync (automatic or manual), it reconciles the cluster to match Git, reverting the replica count to 3. This is a core GitOps principle: manual cluster changes are overwritten by the declared state.\n\nWhy other options are wrong:\n- B: ArgoCD does not update Git; Git is the source of truth in GitOps, not the cluster state\n- C: ArgoCD does not compute averages; it enforces the exact state declared in Git\n- D: ArgoCD does not mark as failed for drift; it marks as OutOfSync and reconciles on next sync\n\nReference: https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/",
    verify: null
  },
  {
    id: "s07-q050",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A CronJob runs every hour but you notice some Jobs are missing from the expected schedule. The CronJob's `concurrencyPolicy` is set to `Forbid`. What does this policy cause?",
    diagram: null,
    options: [
      "It prevents the CronJob from running if any other Job in the namespace is currently active",
      "It terminates the currently running Job immediately in order to start the new scheduled Job run",
      "It queues the new Job and executes it immediately after the current one finishes its processing",
      "It skips a new Job run if the previous Job from this CronJob has not yet completed execution"
    ],
    answer: 3,
    explanation: "With `concurrencyPolicy: Forbid`, the CronJob controller does not create a new Job if a previous run is still active. The scheduled run is simply skipped. This prevents overlapping executions but can cause missed runs if Jobs take longer than the cron interval. The `Replace` policy would terminate the running Job, and `Allow` (default) would let them run concurrently.\n\nWhy other options are wrong:\n- A: Forbid only checks previous Jobs from the same CronJob, not all Jobs in the namespace\n- B: Terminating the running Job describes the Replace policy, not Forbid\n- C: Forbid does not queue; it simply skips the scheduled run entirely\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#concurrency-policy",
    verify: "kubectl get cronjob <name> -o jsonpath='{.spec.concurrencyPolicy}'"
  },
  {
    id: "s07-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You run `kubectl describe pod payment-svc` and see a `Warning` event: `Readiness probe failed: HTTP probe failed with statuscode: 503`. The pod is `Running` but `READY: 0/1`. What is the operational impact?",
    diagram: null,
    options: [
      "The pod will be killed and restarted by the kubelet after the configured failure threshold is reached",
      "The pod continues running but is excluded from Service Endpoints, so it receives no client traffic",
      "The pod will be evicted from the current node and rescheduled on a healthier node in the cluster",
      "Readiness probes provide supplementary health data but do not influence the Pod's traffic routing"
    ],
    answer: 1,
    explanation: "Readiness probe failures do not cause container restarts (that is the liveness probe's role). Instead, the kubelet marks the container as not ready, and the Endpoints controller removes the pod from the Service's endpoint list. The pod keeps running but receives no traffic. Once the probe passes again, the pod is added back to Endpoints.\n\nWhy other options are wrong:\n- A: Liveness probe failures cause restarts, not readiness failures; this is a readiness probe scenario\n- C: Readiness failures do not cause eviction or rescheduling\n- D: Readiness probes have direct operational impact by controlling Service endpoint membership\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes",
    verify: "kubectl get endpoints payment-svc"
  },
  {
    id: "s07-q052",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod with `resources.requests.memory: 8Gi` is `Pending` in a cluster where the largest node has 16Gi total memory but only 6Gi allocatable. What does 'allocatable' mean in this context?",
    diagram: null,
    options: [
      "The total physical RAM installed on the node minus the memory currently consumed by running pod workloads",
      "The memory limit specified in the node's LimitRange resource that restricts individual pod memory requests",
      "The maximum memory that a single pod can request according to the namespace's ResourceQuota configuration",
      "The memory available for pods after reserving resources for the kubelet, system daemons, and OS overhead"
    ],
    answer: 3,
    explanation: "A node's `Allocatable` capacity is its total capacity minus resources reserved for the kubelet (`--kube-reserved`), system daemons (`--system-reserved`), and an eviction threshold. The scheduler uses `Allocatable`, not total capacity, when determining if a node can satisfy a pod's resource request. Since 8Gi exceeds 6Gi allocatable, the pod cannot be scheduled.\n\nWhy other options are wrong:\n- A: Allocatable is not total minus current usage; it is total minus reserved amounts, calculated at node startup\n- B: LimitRange restricts per-pod limits, not the node-level allocatable value\n- C: ResourceQuota is a namespace-level constraint, not a node-level allocatable property\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/",
    verify: "kubectl describe node <node-name> | grep -A5 Allocatable"
  },
  {
    id: "s07-q053",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After scaling a Deployment from 3 to 10 replicas, 7 new pods stay in `Pending`. The events show `0/5 nodes are available: 5 Insufficient cpu`. The existing 3 pods use `requests.cpu: 500m` each. What is the most effective resolution?",
    diagram: null,
    options: [
      "Increase the `limits.cpu` on the existing pods to give them more processing power for handling additional load",
      "Change the Deployment strategy from `RollingUpdate` to `Recreate` so all pods are replaced simultaneously",
      "Reduce `requests.cpu` per pod, add nodes with more CPU, or enable the cluster autoscaler for new nodes",
      "Set `priorityClassName: system-node-critical` on the Deployment to preempt lower-priority existing workloads"
    ],
    answer: 2,
    explanation: "When pods are `Pending` due to `Insufficient cpu`, the cluster lacks enough allocatable CPU across all nodes to satisfy the pod requests. The options are: reduce the per-pod CPU request (if safe), add more nodes, or enable the cluster autoscaler. Using `system-node-critical` priority would preempt other pods, which is not appropriate for application workloads.\n\nWhy other options are wrong:\n- A: Increasing limits does not free up schedulable CPU; requests are what the scheduler uses\n- B: Recreate strategy does not add capacity; it would cause downtime and does not solve Insufficient cpu\n- D: system-node-critical priority is for system components, not application workloads; misuse causes disruption\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: "kubectl describe nodes | grep -A5 'Allocated resources'"
  },
  {
    id: "s07-q054",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A container's readiness probe is configured as a TCP socket check on port 5432. The application (PostgreSQL) takes 15 seconds to start accepting connections. During those 15 seconds, what is the readiness probe result?",
    diagram: null,
    options: [
      "The TCP check succeeds immediately because the kernel binds the port as soon as the container process starts up",
      "The TCP check fails because no process is listening on port 5432 yet, so the pod is marked as not ready",
      "The TCP check is deferred until the container's liveness probe passes its first successful health check",
      "The TCP check times out and the kubelet kills the container for failing the readiness probe failure threshold"
    ],
    answer: 1,
    explanation: "A TCP readiness probe attempts to open a connection to the specified port. If no process is listening on port 5432 (because PostgreSQL has not started accepting connections yet), the TCP handshake fails and the probe returns failure. The pod remains not ready during this period, which is the desired behavior—traffic should not be sent until the database is truly ready.\n\nWhy other options are wrong:\n- A: The kernel binds the port only when the application calls listen(); the process must be ready to accept connections\n- C: Readiness and liveness probes operate independently; readiness does not gate the TCP check\n- D: Readiness probe failures do not cause the kubelet to kill the container; that is the liveness probe's role\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-tcp-liveness-probe",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Readiness'"
  },
  {
    id: "s07-q055",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "After deploying a `NetworkPolicy` with `policyTypes: [Ingress, Egress]` that selects pods with label `app=api`, those pods can no longer communicate with any other pods. The NetworkPolicy only defines an `ingress` rule allowing traffic from `app=frontend` but has no `egress` rules. What caused the complete communication breakdown?",
    diagram: '<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="120" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">NetworkPolicy Effect</text><rect x="30" y="55" width="100" height="40" rx="6" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="80" y="79" text-anchor="middle" fill="#e0e0e0" font-size="10">frontend</text><rect x="150" y="55" width="100" height="40" rx="6" fill="#264653" stroke="#e76f51" stroke-width="1.5"/><text x="200" y="79" text-anchor="middle" fill="#e0e0e0" font-size="10">api (selected)</text><rect x="270" y="55" width="100" height="40" rx="6" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="320" y="79" text-anchor="middle" fill="#e0e0e0" font-size="10">database</text><line x1="130" y1="75" x2="148" y2="75" stroke="#7a8a99" stroke-width="2" marker-end="url(#a55)"/><text x="139" y="68" fill="#7a8a99" font-size="9">?</text><line x1="250" y1="75" x2="268" y2="75" stroke="#7a8a99" stroke-width="2" marker-end="url(#b55)"/><text x="259" y="68" fill="#7a8a99" font-size="9">?</text><defs><marker id="a55" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7a8a99"/></marker><marker id="b55" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7a8a99"/></marker></defs></svg>',
    options: [
      "Listing `Egress` in `policyTypes` without defining egress rules creates a default-deny for all outbound traffic from the selected pods, including DNS",
      "The NetworkPolicy Ingress rule only allows traffic from app=frontend, so the database pods are denied inbound connections from the api pods entirely",
      "NetworkPolicies require a corresponding `allow-all` egress rule to be created in a separate resource for outbound traffic to function correctly",
      "The CNI plugin installed on this particular cluster does not support NetworkPolicy enforcement, so the policy object is being silently ignored"
    ],
    answer: 0,
    explanation: "When a NetworkPolicy selects a pod, it creates a default-deny posture for the policy types specified. If `policyTypes: [Ingress, Egress]` is set (or implied), only explicitly allowed traffic is permitted. Without an egress rule, all outbound traffic (including DNS on port 53) is blocked. The fix is to add egress rules or change `policyTypes` to `[Ingress]` only.\n\nWhy other options are wrong:\n- B: The NetworkPolicy selects app=api pods, not database pods; the ingress rule controls who can reach api pods, not who can reach database pods\n- C: Egress rules are defined in the same NetworkPolicy resource, not in a separate required resource\n- D: If the CNI did not support NetworkPolicy, traffic would flow freely, not be blocked\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -o yaml"
  },
  {
    id: "s07-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment's rollout is stuck. Running `kubectl rollout status deployment/app` shows `Waiting for deployment \"app\" rollout to finish: 1 out of 3 new replicas have been updated...`. The single new pod is in `CrashLoopBackOff`. What parameter controls how long Kubernetes waits before marking the rollout as failed?",
    diagram: null,
    options: [
      "`spec.template.spec.terminationGracePeriodSeconds` — defines how long the kubelet waits after sending SIGTERM before forcefully killing the container process",
      "`spec.strategy.rollingUpdate.maxSurge` — defines the maximum number of pods created above the desired count during a rolling update rollout",
      "`spec.minReadySeconds` — defines the minimum seconds a newly created pod must be ready without crashing before it is considered available by the controller",
      "`spec.progressDeadlineSeconds` — defines the maximum time the Deployment controller waits for rollout progress before reporting the condition as failed"
    ],
    answer: 3,
    explanation: "`spec.progressDeadlineSeconds` (default 600 seconds) defines how long the Deployment controller waits for progress before reporting the Deployment as `Failed` in its conditions. If no new pods become ready within this period, the condition `Progressing` is set to `False` with reason `ProgressDeadlineExceeded`. Note that Kubernetes does not automatically roll back—it just reports the failure.\n\nWhy other options are wrong:\n- A: terminationGracePeriodSeconds controls shutdown time, not rollout timeout detection\n- B: maxSurge controls how many extra pods are created during update, not the failure timeout\n- C: minReadySeconds controls when a pod is considered available, not when a rollout is marked failed\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#progress-deadline-seconds",
    verify: "kubectl get deployment app -o jsonpath='{.spec.progressDeadlineSeconds}'"
  },
  {
    id: "s07-q057",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is debugging an application that works locally in Docker but fails in Kubernetes with `exec format error`. The cluster nodes run on `linux/amd64`. What is the most likely cause?",
    diagram: null,
    options: [
      "The container image was built for a different CPU architecture (e.g., `linux/arm64`) incompatible with `amd64`",
      "The Kubernetes version is incompatible with the Docker version that was used to build the container image",
      "The container runtime on the cluster nodes does not support the `OCI` image format used by this container",
      "The pod's security context prevents execution of the container's entrypoint binary on the scheduled node"
    ],
    answer: 0,
    explanation: "`exec format error` occurs when the Linux kernel cannot execute a binary because it was compiled for a different CPU architecture. If the image was built on an ARM machine (e.g., Apple M1/M2) without multi-arch support, the binaries inside are `arm64` and will not run on `amd64` nodes. Building a multi-platform image with `docker buildx` resolves this.\n\nWhy other options are wrong:\n- B: Kubernetes version and Docker build version compatibility is not a cause of exec format error\n- C: All modern runtimes support OCI image format; exec format error is about binary architecture\n- D: Security context does not cause exec format error; it would produce permission denied or similar\n\nReference: https://kubernetes.io/docs/concepts/containers/images/#multi-architecture-images-with-image-indexes",
    verify: "kubectl describe pod <pod-name> | grep -A2 'State:'"
  },
  {
    id: "s07-q058",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A pod in a StatefulSet named `cache-2` fails and is recreated. Unlike Deployments, the new pod has the exact same name `cache-2`. Why does this matter for troubleshooting?",
    diagram: null,
    options: [
      "It simplifies log analysis because pod names appear in log entries, but has no impact on storage or network identity",
      "It causes DNS conflicts because two pods with the same name temporarily exist during the StatefulSet replacement cycle",
      "The stable identity means the pod reattaches to its PersistentVolumeClaim and DNS hostname, preserving data and identity",
      "The kubelet refuses to create a pod with a name that was previously used, causing the StatefulSet controller to stall out"
    ],
    answer: 2,
    explanation: "StatefulSet pods have stable, predictable identities. When `cache-2` is recreated, it automatically binds to the same PVC (`data-cache-2`) and gets the same DNS name (`cache-2.cache-headless.namespace.svc`). This is important for debugging because data from the failed instance persists on the volume, and other services can still reach the pod at the same address.\n\nWhy other options are wrong:\n- A: Pod names in StatefulSets are functional, not just for logs; they determine PVC binding and DNS hostname\n- B: The old pod is fully deleted before the new one is created; there is no overlap or DNS conflict\n- D: Kubelet does not refuse previously used names; StatefulSets specifically reuse ordinal names\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id",
    verify: "kubectl get pvc | grep cache-2"
  },
  {
    id: "s07-q059",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You see this event in `kubectl describe pod`: `Warning  Unhealthy  Liveness probe failed: Get \"http://10.244.1.5:8080/healthz\": dial tcp 10.244.1.5:8080: connect: connection refused`. The container was previously running fine. What should you check?",
    diagram: null,
    options: [
      "Whether the application inside the container crashed or stopped listening on port 8080 after running",
      "Whether the CNI plugin has revoked the pod's IP address causing network connectivity to be lost",
      "Whether the Kubernetes API server can reach the pod's IP address directly on the internal network",
      "Whether the liveness probe URL path `/healthz` was renamed in the pod spec during a recent update"
    ],
    answer: 0,
    explanation: "`connection refused` on the liveness probe means no process is accepting connections on port 8080 inside the container. Since it was working before, the application likely crashed, hung, or stopped its HTTP listener. Checking the application logs with `kubectl logs` is the immediate next step. The liveness probe will eventually restart the container if it keeps failing.\n\nWhy other options are wrong:\n- B: CNI does not revoke pod IPs during normal operation; IP is stable for the pod's lifetime\n- C: The API server does not directly reach pod IPs for liveness probes; the kubelet performs probes locally\n- D: The liveness probe path is in the running pod spec; it would not change without a pod update\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
    verify: "kubectl logs <pod-name> --tail=50"
  },
  {
    id: "s07-q060",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservice mesh experiences cascading failures: when Service D becomes slow, Services C, B, and A all start timing out. What approach should be implemented to prevent this cascade?",
    diagram: null,
    options: [
      "Increasing the timeout values in all upstream services to wait longer for slow responses from Service D",
      "Adding more replicas to Service D so the circuit breaker threshold is never reached under normal load",
      "Deploying all four services in the same pod to eliminate any network latency between service-to-service calls",
      "Implementing the circuit breaker pattern so upstream services fail fast when Service D becomes unhealthy"
    ],
    answer: 3,
    explanation: "The circuit breaker pattern monitors downstream failures and opens the circuit (stops sending requests) when a failure threshold is reached. This prevents upstream services from waiting on slow/failing downstream calls, breaking the cascade. Service meshes like Istio provide circuit breaker functionality out of the box. Increasing timeouts would actually worsen the cascade.\n\nWhy other options are wrong:\n- A: Increasing timeouts worsens cascading failures by keeping more connections open longer\n- B: Adding replicas may reduce load, but does not implement the circuit breaker pattern itself; a genuinely slow service still causes cascading waits\n- C: Deploying all services in one pod violates microservice principles and creates a single point of failure\n\nReference: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker",
    verify: null
  },
  {
    id: "s07-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A node reports `DiskPressure: True` in its conditions. Pods on this node start getting evicted with `The node was low on resource: ephemeral-storage`. What type of storage is being exhausted?",
    diagram: null,
    options: [
      "The `PersistentVolume` mounts that are attached to the pods running on that particular node in the cluster",
      "The etcd data directory on the control plane node which stores the cluster's key-value state data",
      "The node's root filesystem, which stores container images, writable layers, logs, and `emptyDir`s",
      "The network-attached storage volumes used by the CSI driver to provision persistent volume claims"
    ],
    answer: 2,
    explanation: "Ephemeral storage refers to the node's local filesystem used for container images, container writable layers, `emptyDir` volumes (unless backed by memory), and container log files. When this fills up, the kubelet sets `DiskPressure: True` and starts evicting pods. This is separate from PersistentVolumes, which have their own lifecycle.\n\nWhy other options are wrong:\n- A: PersistentVolumes are separate from ephemeral storage and have their own lifecycle\n- B: etcd is on control plane nodes and its data directory is not related to node DiskPressure\n- D: Network-attached CSI volumes are not ephemeral storage; they are persistent and externally managed\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#local-ephemeral-storage",
    verify: "kubectl describe node <node-name> | grep -A3 'Conditions'"
  },
  {
    id: "s07-q062",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A pod shows `STATUS: ContainerCreating` for an unusually long time. `kubectl describe pod` shows the event: `Warning FailedMount: MountVolume.SetUp failed for volume \"config-vol\": configmap \"app-config\" not found`. What must you do?",
    diagram: null,
    options: [
      "Restart the kubelet service on the node to clear its internal volume mount cache entry",
      "Create the missing ConfigMap named `app-config` in the same namespace as the pod",
      "Delete the pod's ServiceAccount which is blocking the volume mount from completing",
      "Add a `volumeClaimTemplate` to the pod spec to dynamically provision the ConfigMap"
    ],
    answer: 1,
    explanation: "The pod is stuck in `ContainerCreating` because it references a ConfigMap volume named `app-config` that does not exist in the pod's namespace. The kubelet cannot set up the volume mount, so the container cannot be created. Creating the ConfigMap in the correct namespace resolves the issue. Alternatively, marking the volume as `optional: true` would allow the pod to start without it.\n\nWhy other options are wrong:\n- A: Restarting kubelet does not create a missing ConfigMap; the ConfigMap must exist\n- C: ServiceAccount does not block volume mounts; it is unrelated to ConfigMap mounting\n- D: volumeClaimTemplate is for PVC provisioning, not ConfigMaps\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/",
    verify: "kubectl get configmap app-config -n <namespace>"
  },
  {
    id: "s07-q063",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "An HTTP request to your application takes 5 seconds, but the application's own processing time is only 200ms. You suspect the delay is in the network or sidecar proxy layer. Which observability technique would best identify where the 4.8 seconds are spent?",
    diagram: null,
    options: [
      "Increasing log verbosity to `DEBUG` level in the application to capture more timing details in the output",
      "Examining distributed trace spans that break the request into timed segments across each network component",
      "Monitoring CPU usage metrics of all pods in the request path using the Metrics Server or Prometheus tooling",
      "Running `kubectl top pods` during the request to find resource bottlenecks that may indicate latency sources"
    ],
    answer: 1,
    explanation: "Distributed tracing instruments each component with timing spans, creating a waterfall view of the entire request lifecycle. You can see exactly how long each segment takes: ingress controller, sidecar proxy, application code, database call, and return path. This pinpoints the 4.8-second gap that metrics and logs alone cannot easily reveal.\n\nWhy other options are wrong:\n- A: Debug logging adds volume but does not show timing across network components and proxies\n- C: CPU metrics show resource usage but cannot explain request-level latency across network hops\n- D: kubectl top shows aggregate pod metrics, not per-request timing through the network stack\n\nReference: https://opentelemetry.io/docs/concepts/signals/traces/",
    verify: null
  },
  {
    id: "s07-q064",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod cannot reach the Kubernetes API server from within the cluster. Running `kubectl exec <pod> -- curl https://kubernetes.default.svc:443` returns a TLS handshake error. What might be wrong?",
    diagram: null,
    options: [
      "The pod's ServiceAccount CA bundle does not match the API server's TLS certificate, or the `kubernetes` Service is missing",
      "The pod does not have its `ServiceAccount` token volume mounted, so mutual TLS authentication with the API server fails",
      "The pod needs a NetworkPolicy explicitly allowing egress traffic to the API server's endpoint IP address and port 443",
      "The API server restricts connections to the control plane network by default, blocking requests from pods in worker nodes"
    ],
    answer: 0,
    explanation: "Pods access the API server through the `kubernetes` Service in the `default` namespace. A TLS error suggests the certificate chain is not trusted. The ServiceAccount token volume mounts the CA bundle at `/var/run/secrets/kubernetes.io/serviceaccount/ca.crt`. If this CA does not match the API server's certificate (e.g., after a certificate rotation), TLS verification fails.\n\nWhy other options are wrong:\n- B: Missing SA token volume causes authentication failures (401), not TLS handshake errors\n- C: NetworkPolicy blocking would cause connection timeout, not TLS handshake error\n- D: The API server accepts connections from pods on worker nodes by default via the kubernetes Service\n\nReference: https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/",
    verify: "kubectl exec <pod-name> -- cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
  },
  {
    id: "s07-q065",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A pod fails to start with: `Error: secret \"db-credentials\" not found`. The Secret exists in the `production` namespace, but the pod runs in the `staging` namespace. How should this be resolved?",
    diagram: null,
    options: [
      "Move the pod to the `production` namespace using `kubectl move` to place it alongside the existing Secret resource",
      "Add a cross-namespace reference in the pod spec using `secretRef.namespace: production` to access the remote Secret",
      "Create `db-credentials` in the `staging` namespace, or use an ExternalSecrets operator to sync it across namespaces",
      "Grant the `staging` pod's ServiceAccount read access to all namespaces via a ClusterRoleBinding to access the Secret"
    ],
    answer: 2,
    explanation: "Secrets, like ConfigMaps and PVCs, are namespace-scoped. A pod can only reference Secrets in its own namespace. There is no `secretRef.namespace` field in the pod spec. The solution is to create the Secret in the pod's namespace. Tools like ExternalSecrets Operator or Sealed Secrets can automate cross-namespace secret distribution.\n\nWhy other options are wrong:\n- A: kubectl move is not a valid command; pods cannot be moved between namespaces\n- B: secretRef.namespace does not exist in the pod spec; Secrets are namespace-scoped\n- D: ClusterRoleBinding grants API access but pods can only mount Secrets from their own namespace\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/",
    verify: "kubectl get secret db-credentials -n staging"
  },
  {
    id: "s07-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Job has `backoffLimit: 3` and its pod keeps failing. After the third failure, what happens?",
    diagram: null,
    options: [
      "The Job continues retrying with increasing `backoffLimit` delay intervals beyond the third failure",
      "The Job is marked as Failed and no more pods are created by the Job controller for this resource",
      "Kubernetes sends an alert to the cluster administrator via the event system and pauses the Job for review",
      "The Job controller automatically deletes the Job resource and all of its associated completed and failed pods"
    ],
    answer: 1,
    explanation: "The `backoffLimit` field specifies the number of retries before considering a Job as failed. After 3 failed pod attempts, the Job controller marks the Job's condition as `Failed` and stops creating new pods. The failed pods remain for log inspection unless `ttlSecondsAfterFinished` is configured to clean them up automatically.\n\nWhy other options are wrong:\n- A: The Job stops retrying at backoffLimit; it does not continue beyond the specified limit\n- C: Kubernetes does not send alerts via the event system for Job failures; it marks the Job as Failed\n- D: The Job controller does not auto-delete the Job resource; it remains for inspection\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#pod-backoff-failure-policy",
    verify: "kubectl get job <job-name> -o jsonpath='{.status.conditions}'"
  },
  {
    id: "s07-q067",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Your team uses Falco, a CNCF runtime security tool, and receives an alert: `Terminal shell in container (user=root, container=web-app)`. What event triggered this alert?",
    diagram: null,
    options: [
      "A new container image was pulled from an untrusted or unapproved external container registry source",
      "Someone executed a shell command (e.g., via `kubectl exec`) inside the running `web-app` container",
      "The `web-app` container's Dockerfile includes a `CMD` instruction that starts a shell at boot time",
      "The container's security context was modified at runtime to allow root access to the system process"
    ],
    answer: 1,
    explanation: "Falco monitors system calls at runtime and triggers alerts based on predefined rules. The alert `Terminal shell in container` fires when a shell process (e.g., `/bin/sh`, `/bin/bash`) is spawned inside a running container, typically via `kubectl exec`. This is a security-relevant event because it could indicate unauthorized access to a production container.\n\nWhy other options are wrong:\n- A: Pulling images from untrusted registries triggers different Falco rules, not the terminal shell rule\n- C: CMD starting a shell at boot is the container's normal entrypoint, not an interactive terminal session\n- D: Security context cannot be modified at runtime; this is not what triggers the terminal shell alert\n\nReference: https://falco.org/docs/rules/default-rules/",
    verify: null
  },
  {
    id: "s07-q068",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You need to check why a pod named `worker-7` was terminated. `kubectl describe pod worker-7` shows `Reason: Evicted` and `Message: The node was low on resource: memory`. What triggered this eviction?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Pod Termination Flow</text><rect x="30" y="55" width="110" height="35" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="85" y="77" text-anchor="middle" fill="#e0e0e0" font-size="10">Node Memory</text><line x1="140" y1="72" x2="165" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a68)"/><rect x="165" y="55" width="110" height="35" rx="5" fill="#6b2c3b" stroke="#e76f51" stroke-width="1.5"/><text x="220" y="70" text-anchor="middle" fill="#e0e0e0" font-size="9">???</text><text x="220" y="83" text-anchor="middle" fill="#e0e0e0" font-size="9"></text><line x1="275" y1="72" x2="295" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a68)"/><rect x="295" y="55" width="80" height="35" rx="5" fill="#7b2d26" stroke="#e63946" stroke-width="1.5"/><text x="335" y="77" text-anchor="middle" fill="#e0e0e0" font-size="10">???</text><text x="200" y="120" text-anchor="middle" fill="#aaa" font-size="10">Termination priority: ???</text><text x="200" y="140" text-anchor="middle" fill="#aaa" font-size="10">Selection criteria: ???</text><text x="200" y="165" text-anchor="middle" fill="#e76f51" font-size="10">What mechanism triggered this termination?</text><defs><marker id="a68" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/></marker></defs></svg>',
    options: [
      "The pod exceeded its own memory limit and was killed by the cgroup OOM killer, which targets a single container",
      "The HorizontalPodAutoscaler scaled down the deployment and selected this specific pod for a controlled termination",
      "A PodDisruptionBudget was violated and the pod was preempted by a higher-priority workload scheduled on the node",
      "The kubelet's eviction manager detected node memory fell below the eviction threshold and evicted the pod to reclaim it"
    ],
    answer: 3,
    explanation: "Node-level eviction is triggered by the kubelet's eviction manager when available resources fall below configured thresholds (e.g., `memory.available < 100Mi`). Unlike OOMKill (which targets a specific container exceeding its limit), eviction is a node-level decision. The kubelet selects pods to evict based on their priority, QoS class, and resource usage relative to requests.\n\nWhy other options are wrong:\n- A: OOMKill shows Reason: OOMKilled with exit code 137; eviction shows Reason: Evicted with a different message\n- B: HPA scaling down shows normal pod termination, not Evicted status with resource pressure message\n- C: PDB violations block evictions; they do not cause evictions with resource pressure messages\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
    verify: "kubectl describe node <node-name> | grep -A5 'Conditions'"
  },
  {
    id: "s07-q069",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A pod with two containers shares an `emptyDir` volume. Container A writes a file to the volume, but Container B cannot find it. Both containers mount the volume but at different `mountPath` values. Is this expected behavior?",
    diagram: null,
    options: [
      "No, both containers see the same files because `emptyDir` is shared storage—the file should be visible, so check the exact file paths",
      "No, emptyDir volumes use copy-on-write semantics so each container sees an independent snapshot of the data rather than the same underlying files",
      "Yes, different mount paths create isolated storage spaces within the same `emptyDir`, preventing cross-container file visibility",
      "Yes, `emptyDir` volumes are read-only by default so Container B lacks the necessary write permissions to see mutable content"
    ],
    answer: 0,
    explanation: "An `emptyDir` volume is a shared directory at the pod level. All containers that mount it see the same underlying data, regardless of the mount path. If Container A writes `/mnt/data/file.txt` and Container B mounts the same volume at `/shared/data`, it should see the file at `/shared/data/file.txt`. If the file is missing, verify the exact paths and that both containers mount the same volume name.\n\nWhy other options are wrong:\n- B: emptyDir does not use copy-on-write; all containers share the same underlying directory and see identical files\n- C: Different mount paths access the same underlying volume data; the mount path is just the view into the pod\n- D: emptyDir volumes are read-write by default, not read-only\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl exec <pod-name> -c <container-b> -- ls <mount-path>"
  },
  {
    id: "s07-q070",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod has `priorityClassName: high-priority` set. During a resource crunch, the scheduler preempts a lower-priority pod to make room. What happens to the preempted pod?",
    diagram: null,
    options: [
      "It is `Paused` in place and automatically resumed when cluster resources become available again after rebalancing",
      "It is moved to a different node automatically by the scheduler without any interruption to the running process",
      "It is gracefully terminated and its owner controller creates a replacement that may stay `Pending` if resources are scarce",
      "It is terminated along with its owning controller, requiring the operator to redeploy both resources afterward"
    ],
    answer: 2,
    explanation: "Preemption gracefully terminates the lower-priority pod (respecting its `terminationGracePeriodSeconds`). If the pod is managed by a controller like a Deployment or ReplicaSet, the controller creates a replacement pod. However, the replacement may also end up `Pending` if cluster resources remain constrained. Preemption does not migrate pods—it terminates them.\n\nWhy other options are wrong:\n- A: Kubernetes does not pause pods; preempted pods are terminated\n- B: Pod migration is not a Kubernetes feature; pods are terminated and recreated, not live-migrated\n- D: Preemption only terminates the pod, not its owning controller; the controller persists and creates replacements\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/",
    verify: "kubectl get events --field-selector reason=Preempted"
  },
  {
    id: "s07-q071",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Kubernetes cluster has Metrics Server installed but `kubectl top nodes` returns `error: Metrics API not available`. What should you verify?",
    diagram: null,
    options: [
      "That the `metrics-server` Deployment in `kube-system` is running and its pods are healthy and serving",
      "That Prometheus is installed as a prerequisite for the Metrics API to function in the cluster properly",
      "That each node has the `monitoring=enabled` label applied which the Metrics Server uses for discovery",
      "That the `kube-apiserver` has the `--enable-top-command` flag set in its static pod manifest file"
    ],
    answer: 0,
    explanation: "The Metrics Server provides the `metrics.k8s.io` API that `kubectl top` relies on. If the Metrics Server pods are not running, crashing, or unreachable, the API is unavailable. Common issues include Metrics Server pods in `CrashLoopBackOff` (often due to TLS certificate issues with the kubelet) or misconfigured API service registration.\n\nWhy other options are wrong:\n- B: Prometheus is not a prerequisite for Metrics Server; they are independent systems\n- C: Metrics Server does not use node labels for discovery; it uses the kubelet's metrics endpoint\n- D: There is no --enable-top-command flag for kube-apiserver\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
    verify: "kubectl get deployment metrics-server -n kube-system && kubectl get pods -n kube-system -l k8s-app=metrics-server"
  },
  {
    id: "s07-q072",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "You create a Service but `kubectl get endpoints <svc-name>` shows `<none>`. The pods targeted by the Service are `Running` and `Ready`. What is the most likely cause?",
    diagram: null,
    options: [
      "The Service's `spec.ports[].protocol` does not match the pod's protocol configuration",
      "The pods are running in a different cluster than the Service resource was created in",
      "The `kube-proxy` on the nodes is not forwarding traffic correctly to pod endpoints",
      "The Service's `spec.selector` labels do not match any of the target pod's labels set"
    ],
    answer: 3,
    explanation: "The Endpoints controller populates a Service's endpoints by matching the Service's `spec.selector` against pod labels. If the labels do not match (e.g., a typo like `app: web-app` vs `app: webapp`), the Endpoints list will be empty even though matching pods exist. Always verify label consistency between Services and pods.\n\nWhy other options are wrong:\n- A: Protocol mismatch is rare and would not produce empty endpoints; endpoints are based on selector match\n- B: Running in a different cluster is not plausible if the Service was created in this cluster\n- C: kube-proxy routes traffic after endpoints are populated; empty endpoints means the selector does not match\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
    verify: "kubectl get svc <svc-name> -o jsonpath='{.spec.selector}' && kubectl get pods --show-labels"
  },
  {
    id: "s07-q073",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod has two init containers: `init-db` and `init-cache`. `init-db` completes successfully, but `init-cache` is in `CrashLoopBackOff`. In what order do init containers run, and can `init-cache` see data produced by `init-db`?",
    diagram: null,
    options: [
      "Init containers run sequentially in spec order, so `init-cache` can access shared volumes that were written by `init-db`",
      "Init containers run in parallel, so `init-cache` cannot see `init-db`'s data because they execute simultaneously in the pod",
      "Init containers run in reverse order (last defined runs first), so `init-cache` actually ran before `init-db` in this pod",
      "Init containers run in random order determined by the scheduler, so the execution sequence is unpredictable for each run"
    ],
    answer: 0,
    explanation: "Init containers execute sequentially in the order they are listed in `spec.initContainers`. Each must complete successfully (exit 0) before the next one starts. If they share a volume, later init containers can access data written by earlier ones. Since `init-db` completed first, `init-cache` can read from any shared volume that `init-db` wrote to.\n\nWhy other options are wrong:\n- B: Init containers run sequentially, not in parallel; each must complete before the next starts\n- C: Init containers run in forward order as listed in the spec, not reverse\n- D: Init container execution order is deterministic based on spec order, never random\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#understanding-init-containers",
    verify: "kubectl describe pod <pod-name> | grep -A15 'Init Containers'"
  },
  {
    id: "s07-q074",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "During a canary deployment, 5% of traffic is routed to the new version. Users hitting the canary report `500 Internal Server Error`. What is the correct response in a canary deployment workflow?",
    diagram: null,
    options: [
      "Increase the canary percentage to 50% to gather more error data and improve the statistical analysis of failures",
      "Wait for the canary's auto-healing mechanism to resolve the 500 errors through automatic retry and recovery logic",
      "Delete the entire Deployment resource and redeploy from scratch to clear any corrupted state in the new revision",
      "Halt the rollout immediately and route 100% of traffic back to the stable version, then investigate the canary"
    ],
    answer: 3,
    explanation: "The purpose of canary deployments is to detect issues before they affect all users. When the canary version produces errors, the correct response is to immediately roll back traffic to the stable version (shift 100% away from canary). Then investigate the root cause using logs, metrics, and traces from the canary pods before attempting another rollout.\n\nWhy other options are wrong:\n- A: Increasing canary percentage exposes more users to errors, the opposite of risk mitigation\n- B: There is no built-in auto-healing mechanism for application-level 500 errors in canary deployments\n- C: Deleting and redeploying is disruptive and does not investigate root cause first\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment",
    verify: null
  },
  {
    id: "s07-q075",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "Running `kubectl get pod my-pod -o jsonpath='{.status.containerStatuses[0].state}'` returns `{\"waiting\":{\"reason\":\"CreateContainerConfigError\",\"message\":\"secret \\\"api-key\\\" not found\"}}`. The pod shows `STATUS: CreateContainerConfigError`. What is happening?",
    diagram: null,
    options: [
      "The container image is missing the `api-key` binary that is required for the application startup sequence to complete",
      "The pod spec references a Secret named `api-key` (via `envFrom` or `env.valueFrom`) that is missing in the namespace",
      "The node's container runtime cannot decrypt the `api-key` Secret due to missing cluster encryption provider keys",
      "The API server rejected the pod because the Secret name `api-key` is a reserved identifier in the Kubernetes system"
    ],
    answer: 1,
    explanation: "`CreateContainerConfigError` occurs when the kubelet cannot configure the container environment. The message explicitly states the Secret `api-key` is not found. This happens when the pod spec uses `secretKeyRef` or `secretRef` to inject Secret data as environment variables, but the Secret does not exist. The pod will not start until the Secret is created.\n\nWhy other options are wrong:\n- A: api-key is a Secret name reference, not a binary; the error message explicitly says secret not found\n- C: Encryption at rest does not cause not found errors; it would cause decryption errors if misconfigured\n- D: api-key is not a reserved name in Kubernetes; any valid string can be used as a Secret name\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/",
    verify: "kubectl get secret api-key -n <namespace>"
  },
  {
    id: "s07-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You run `kubectl get events -n production --sort-by='.lastTimestamp'` and see: `Warning  FailedCreate  replicaset/api-7f8c9d  Error creating: pods \"api-7f8c9d-\" is forbidden: exceeded quota: compute-quota, requested: cpu=500m, used: 3600m, limited: 4000m`. What is preventing pod creation?",
    diagram: null,
    options: [
      "The node does not have 500m CPU available for scheduling the new pod that the `ReplicaSet` is trying to create in production",
      "The pod's CPU request of 500m exceeds the maximum allowed by a LimitRange named compute-quota in the namespace",
      "A `ResourceQuota` named `compute-quota` limits total CPU requests in the namespace, and this pod would exceed the 4000m cap",
      "The cluster-wide CPU capacity has been fully allocated and no additional pods can be scheduled on any node in the cluster"
    ],
    answer: 2,
    explanation: "The event message shows a `ResourceQuota` named `compute-quota` with a CPU limit of 4000m. Current usage is 3600m, and the new pod requests 500m, which would bring the total to 4100m—exceeding the 4000m limit. ResourceQuotas enforce per-namespace resource consumption limits.\n\nWhy other options are wrong:\n- A: The error explicitly mentions exceeded quota, not insufficient node resources\n- B: LimitRange restricts individual pod limits, not namespace-wide totals; the error names compute-quota\n- D: Cluster-wide capacity is separate from namespace ResourceQuota enforcement\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: "kubectl get resourcequota compute-quota -n production -o yaml"
  },
  {
    id: "s07-q077",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After deploying a pod, `kubectl describe pod` shows `Warning  FailedScheduling  0/3 nodes are available: 3 node(s) didn't match pod topology spread constraints`. What are topology spread constraints?",
    diagram: null,
    options: [
      "Constraints that prevent pods from being scheduled on nodes with specific CPU architectures or hardware configs",
      "Limits on the total number of pods that can run on a single node regardless of available resources or capacity",
      "Security rules that restrict pod-to-pod network communication based on the physical node topology layout",
      "Constraints controlling how pods distribute across failure domains (nodes, zones) for high availability"
    ],
    answer: 3,
    explanation: "Pod topology spread constraints define how pods should be distributed across topology domains (nodes, availability zones, regions). They specify a `maxSkew` that limits how unevenly pods can be spread. If the constraint cannot be satisfied (e.g., not enough nodes in each zone), the pod stays `Pending`. This promotes high availability by preventing all replicas from landing on the same node or zone.\n\nWhy other options are wrong:\n- A: Architecture-based constraints use nodeSelector or nodeAffinity, not topology spread constraints\n- B: Pod count limits per node use node resource capacity, not topology spread constraints\n- C: Network communication restrictions use NetworkPolicy, not topology spread constraints\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.topologySpreadConstraints}'"
  },
  {
    id: "s07-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment has `maxUnavailable: 0` and `maxSurge: 1` in its rolling update strategy. During an update, you observe that the old pods are not terminated until the new pod is `Ready`. What happens if the new pod enters `CrashLoopBackOff`?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Rolling Update: maxUnavailable=0, maxSurge=1</text><rect x="30" y="55" width="70" height="30" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="65" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">old-1 OK</text><rect x="110" y="55" width="70" height="30" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="145" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">old-2 OK</text><rect x="190" y="55" width="70" height="30" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="225" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">old-3 OK</text><rect x="280" y="55" width="90" height="30" rx="5" fill="#7b2d26" stroke="#e63946" stroke-width="1.5"/><text x="325" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">new-1 CRASH</text><text x="200" y="120" text-anchor="middle" fill="#e76f51" font-size="11">Rollout status: ???</text><text x="200" y="140" text-anchor="middle" fill="#aaa" font-size="10">Old pods: ???</text><text x="200" y="160" text-anchor="middle" fill="#aaa" font-size="10">What is the impact on old pods and the rollout?</text></svg>',
    options: [
      "All old pods are immediately terminated by the controller to make room for the new replacement pod instances",
      "The rollout stalls because `maxUnavailable: 0` prevents terminating old pods while the new pod never becomes `Ready`",
      "Kubernetes automatically reverts to the previous Deployment revision when `maxUnavailable: 0` detects readiness check failures",
      "The Deployment controller increases `maxSurge` to create additional new pods to compensate for the crashing instance"
    ],
    answer: 1,
    explanation: "With `maxUnavailable: 0`, the Deployment controller will not terminate any old pod until a new pod is `Ready`. Since the new pod is in `CrashLoopBackOff` and never becomes Ready, no old pods are removed and no further new pods are created (only 1 surge allowed). The rollout is effectively stalled. Users experience no downtime because old pods continue serving, but the update makes no progress.\n\nWhy other options are wrong:\n- A: maxUnavailable: 0 explicitly prevents terminating old pods before new ones are Ready\n- C: Kubernetes does not automatically revert; it only reports failure via progressDeadlineSeconds\n- D: The Deployment controller does not dynamically increase maxSurge; it follows the configured strategy\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl rollout status deployment/<name>"
  },
  {
    id: "s07-q079",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A serverless function running on Knative fails with cold start timeouts. The container takes 8 seconds to initialize, but the default request timeout is 5 seconds. How should you address this in a cloud native way?",
    diagram: null,
    options: [
      "Keep a minimum warm instance by setting Knative's `minScale: 1` to avoid cold starts for this function",
      "Increase the Knative Service's `resources.limits.cpu` to speed up JIT compilation and reduce initialization time",
      "Convert the function to a long-running Deployment to avoid the serverless model's cold start limitations",
      "Disable health checks entirely so the container is not killed during its lengthy initialization sequence"
    ],
    answer: 0,
    explanation: "Setting `minScale: 1` in Knative's scaling configuration keeps at least one pod instance running at all times, eliminating cold starts. While this sacrifices some serverless cost benefits, it is the pragmatic cloud native solution for latency-sensitive functions. Additionally, you could increase the request timeout or optimize the container's startup time.\n\nWhy other options are wrong:\n- B: Increasing CPU limits on the Knative Service may help but does not eliminate cold starts when scaling from zero\n- C: Converting to a Deployment abandons serverless benefits; minScale: 1 preserves the serverless model\n- D: Disabling health checks removes safety mechanisms and does not address the timeout during cold start\n\nReference: https://knative.dev/docs/serving/autoscaling/scale-bounds/",
    verify: null
  },
  {
    id: "s07-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The `kube-controller-manager` pod is in `CrashLoopBackOff` on the control plane node. What impact does this have on the cluster?",
    diagram: null,
    options: [
      "Existing pods run but controllers (Deployment, ReplicaSet, Job) cannot reconcile—crashed pods are not replaced",
      "All pods in the cluster immediately stop because the controller manager manages the container runtime directly",
      "DaemonSet and Job pods are most affected because these controller loops reconcile more frequently than ReplicaSet controllers",
      "There is no impact because the scheduler takes over all controller responsibilities in a failover scenario automatically"
    ],
    answer: 0,
    explanation: "The `kube-controller-manager` runs all built-in controllers (ReplicaSet, Deployment, Job, Node, etc.). When it is down, existing pods continue to run (the kubelet manages running containers), but no reconciliation occurs. Dead pods are not replaced, scaling does not happen, and new Deployment rollouts stall. The scheduler and controller manager are separate components with distinct responsibilities.\n\nWhy other options are wrong:\n- B: Existing containers keep running under kubelet management; kube-controller-manager does not control the runtime\n- C: All controllers are equally affected; there is no difference in reconciliation frequency between DaemonSet, Job, and ReplicaSet controllers\n- D: The scheduler handles pod placement only; it does not take over controller responsibilities\n\nReference: https://kubernetes.io/docs/concepts/architecture/controller/",
    verify: null
  },
  {
    id: "s07-q081",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A pod has an `emptyDir` volume with `sizeLimit: 100Mi`. The application writes 150Mi of data to it. What happens?",
    diagram: null,
    options: [
      "The writes silently fail and the application receives I/O errors after reaching the 100Mi size boundary",
      "The `emptyDir` volume automatically expands to accommodate the extra data beyond the configured limit",
      "The kubelet evicts the pod because it exceeded the ephemeral storage limit for the `emptyDir` volume",
      "The `sizeLimit` serves as a soft guideline and the kubelet logs a warning rather than evicting the Pod"
    ],
    answer: 2,
    explanation: "When `sizeLimit` is set on an `emptyDir` volume, the kubelet monitors its usage. If the volume exceeds the limit, the kubelet evicts the pod to reclaim resources. The pod's status will show `Evicted` with a message about exceeding ephemeral storage limits. This enforcement depends on the kubelet's periodic checks, so there may be a brief delay before eviction.\n\nWhy other options are wrong:\n- A: Writes do not silently fail; the data is written but the kubelet detects the overage and evicts\n- B: emptyDir volumes do not auto-expand; sizeLimit is a hard enforcement boundary\n- D: sizeLimit is enforced by the kubelet; it is not merely advisory\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl describe pod <pod-name> | grep -i evict"
  },
  {
    id: "s07-q082",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A developer pushes a change to the Git repository, but ArgoCD shows the application as `Synced` with the old version. The Git webhook is configured correctly. What is a common cause?",
    diagram: null,
    options: [
      "The change was pushed to a different branch that ArgoCD is not tracking—verify `targetRevision` in the Application spec",
      "ArgoCD caches the last-known Git state indefinitely and requires a manual `argocd app refresh` to detect any new commits",
      "The Kubernetes cluster has reached its resource quota in the target namespace, preventing new rollouts from starting",
      "ArgoCD detected the change but its reconciliation loop is paused due to a configured sync window restriction on this application"
    ],
    answer: 0,
    explanation: "ArgoCD's Application resource specifies a `targetRevision` (branch, tag, or commit) to track. If the developer pushed to a different branch than what ArgoCD monitors, the application will remain `Synced` with the old state. Verifying the branch configuration and commit history on the tracked branch is the correct troubleshooting step.\n\nWhy other options are wrong:\n- B: ArgoCD automatically refreshes via polling (default 3 minutes) and webhooks; a manual refresh is not required\n- C: Resource quotas block pod creation, not ArgoCD's sync detection; the app would show OutOfSync, not Synced\n- D: A sync window restriction would show the app as OutOfSync with sync blocked, not as Synced with the old version\n\nReference: https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/",
    verify: null
  },
  {
    id: "s07-q083",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A headless Service (`clusterIP: None`) is created for a StatefulSet. When you run `nslookup <service-name>` from a pod, it returns multiple IP addresses. What do these IPs represent?",
    diagram: null,
    options: [
      "The IP addresses of the nodes where the StatefulSet pods are running, returned through the cluster DNS system",
      "Multiple virtual IPs allocated by the headless Service for load balancing across the StatefulSet pod instances",
      "The IP addresses of the `kube-proxy` instances on each node that handle traffic routing for this Service type",
      "The individual pod IPs of each StatefulSet member, since a headless Service returns pod IPs instead of a VIP"
    ],
    answer: 3,
    explanation: "A headless Service (`clusterIP: None`) does not get a virtual IP. Instead, DNS queries return A records for each pod that matches the Service's selector. For StatefulSets, each pod also gets its own DNS record (`<pod-name>.<service-name>.<namespace>.svc.cluster.local`). This enables direct pod-to-pod communication, which is essential for stateful workloads like databases.\n\nWhy other options are wrong:\n- A: Headless Services return pod IPs, not node IPs\n- B: Headless Services have no cluster IP at all (clusterIP: None), so no VIPs are allocated\n- C: kube-proxy instances are not exposed via DNS for any Service type\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
    verify: "kubectl exec <pod-name> -- nslookup <headless-service-name>"
  },
  {
    id: "s07-q084",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A service mesh (e.g., Istio) is deployed and sidecar containers are injected into all pods. After enabling `STRICT` mTLS, some pods start failing with `upstream connect error or disconnect/reset before headers`. What is the likely cause?",
    diagram: null,
    options: [
      "Some pods lack the sidecar proxy, so they cannot participate in mTLS and their plaintext connections are rejected",
      "The sidecar proxy containers do not have enough CPU resources allocated to handle the mTLS encryption overhead",
      "The Kubernetes API server does not support mTLS between pods and requires a separate certificate management tool",
      "The Service definitions need to be updated to specify TLS ports explicitly in each port mapping configuration"
    ],
    answer: 0,
    explanation: "With `STRICT` mTLS in Istio, all traffic must be encrypted. If some pods do not have the Envoy sidecar (e.g., they were deployed before sidecar injection was enabled, or they are in a namespace without injection), they send plaintext requests that the receiving sidecar rejects. The fix is to ensure all communicating pods have sidecars, or use `PERMISSIVE` mode during migration.\n\nWhy other options are wrong:\n- B: mTLS encryption overhead is minimal; CPU is unlikely to be the cause of connection reset errors\n- C: The API server is not involved in pod-to-pod mTLS; the sidecar proxies handle it\n- D: Service port definitions do not need TLS annotations; the sidecar proxy transparently handles mTLS\n\nReference: https://istio.io/latest/docs/concepts/security/#peer-authentication",
    verify: null
  },
  {
    id: "s07-q085",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A pod's liveness probe uses a command: `exec: [\"cat\", \"/tmp/healthy\"]`. The application creates this file on startup and deletes it when it detects a fatal error. What happens after the file is deleted?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="160" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Exec Liveness Probe Flow</text><rect x="25" y="55" width="85" height="35" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="67" y="70" text-anchor="middle" fill="#e0e0e0" font-size="9">/tmp/healthy</text><text x="67" y="82" text-anchor="middle" fill="#2a9d8f" font-size="9">(exit ???)</text><line x1="110" y1="72" x2="130" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a85)"/><rect x="130" y="55" width="85" height="35" rx="5" fill="#6b2c3b" stroke="#e76f51" stroke-width="1.5"/><text x="172" y="70" text-anchor="middle" fill="#e0e0e0" font-size="9">File deleted</text><text x="172" y="82" text-anchor="middle" fill="#e76f51" font-size="9">cat fails (exit ???)</text><line x1="215" y1="72" x2="235" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a85)"/><rect x="235" y="55" width="70" height="35" rx="5" fill="#3d405b" stroke="#888" stroke-width="1.5"/><text x="270" y="70" text-anchor="middle" fill="#e0e0e0" font-size="9">Failures</text><text x="270" y="82" text-anchor="middle" fill="#e0e0e0" font-size="9">counted</text><line x1="305" y1="72" x2="320" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a85)"/><rect x="320" y="55" width="60" height="35" rx="5" fill="#7b2d26" stroke="#e63946" stroke-width="1.5"/><text x="350" y="70" text-anchor="middle" fill="#e0e0e0" font-size="9">???</text><text x="350" y="82" text-anchor="middle" fill="#e0e0e0" font-size="9"></text><text x="200" y="125" text-anchor="middle" fill="#aaa" font-size="10">What happens after repeated probe failures?</text><text x="200" y="145" text-anchor="middle" fill="#aaa" font-size="10">App self-signals unhealthy by removing the marker file</text><defs><marker id="a85" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/></marker></defs></svg>',
    options: [
      "The kubelet sends a SIGTERM to the application process, giving it the termination grace period to shut down properly",
      "The probe command returns a non-zero exit code, and after `failureThreshold` failures the kubelet restarts the container",
      "The pod is removed from Service endpoints but the container continues running indefinitely in a degraded serving state",
      "The kubelet waits indefinitely for the `/tmp/healthy` file to be recreated before taking any corrective restart action"
    ],
    answer: 1,
    explanation: "When `cat /tmp/healthy` fails (because the file no longer exists), the command returns exit code 1 (non-zero). The kubelet counts consecutive failures. Once `failureThreshold` is reached (default 3), the kubelet kills the container and restarts it according to `restartPolicy`. This is a common pattern for applications to signal the need for a restart.\n\nWhy other options are wrong:\n- A: SIGTERM is part of the container kill process, but liveness probe failures cause a full container restart, not just a graceful signal. The key behavior is restart, not just signaling\n- C: This describes readiness probe behavior, not liveness; liveness failures cause container restart, not endpoint removal\n- D: The kubelet does not wait indefinitely; it checks at each periodSeconds and counts failures toward the threshold\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Liveness'"
  },
  {
    id: "s07-q086",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A pod fails admission with: `Error from server (Forbidden): pods \"test\" is forbidden: violates PodSecurity \"restricted:latest\"`. The pod spec has `runAsNonRoot: true` and `allowPrivilegeEscalation: false`. What else might the `restricted` policy require?",
    diagram: null,
    options: [
      "The pod should set `hostNetwork: true` because the restricted policy permits host networking for trusted workloads",
      "The pod must have resource limits set to zero to meet the restricted policy's compute allocation constraints spec",
      "The pod must drop all capabilities (`capabilities.drop: [\"ALL\"]`) and set a `seccompProfile` (e.g., `RuntimeDefault`)",
      "The pod must use the `default` ServiceAccount and not a custom one to satisfy the restricted policy identity checks"
    ],
    answer: 2,
    explanation: "The Pod Security Standard `restricted` profile requires several security settings: `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, dropping all capabilities (`drop: [\"ALL\"]`), and setting a seccomp profile (e.g., `RuntimeDefault`). Missing any of these causes the admission controller to reject the pod. The `hostNetwork` must be `false`, not `true`.\n\nWhy other options are wrong:\n- A: hostNetwork: true violates the restricted profile; it must be false or unset\n- B: Resource limits set to zero is not a requirement; the restricted profile does not mandate specific limit values\n- D: The restricted profile does not require the default ServiceAccount; custom ServiceAccounts are allowed\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
    verify: "kubectl label namespace <ns> pod-security.kubernetes.io/enforce=restricted --dry-run=server"
  },
  {
    id: "s07-q087",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "You need to stream logs from all pods matching the label `app=payment` in the `payments` namespace simultaneously. Which approach is most efficient?",
    diagram: null,
    options: [
      "Run `kubectl logs -f -l app=payment -n payments --prefix` to stream from all matching pods with name prefixes",
      "Open individual `kubectl logs` commands for each pod in separate terminal windows and monitor them independently",
      "Use `kubectl get pods -l app=payment` and pipe the output to a custom script matching pod names for log aggregation",
      "Deploy a new DaemonSet that captures logs from pods with the `payment` label and forwards them to a collector"
    ],
    answer: 0,
    explanation: "`kubectl logs -f -l app=payment -n payments --prefix` uses the label selector to target all matching pods in the `payments` namespace, the `-f` flag enables streaming (follow mode), and the `--prefix` flag prepends each log line with the pod name for identification. Note that `kubectl logs` does not support `--all-namespaces`; you must specify a single namespace with `-n`. This is the most direct way to stream multiple pod logs simultaneously. For persistent log collection, a dedicated aggregation system is better, but for ad-hoc debugging this is efficient.\n\nWhy other options are wrong:\n- B: Opening individual terminal windows is manual, tedious, and does not scale well\n- C: Piping kubectl get pods output to a script adds unnecessary complexity vs the built-in -l selector\n- D: Deploying a new DaemonSet is heavy-weight for ad-hoc debugging and takes time to set up\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
    verify: "kubectl logs -f -l app=payment -n payments --prefix --tail=10"
  },
  {
    id: "s07-q088",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod has `terminationGracePeriodSeconds: 30`. When a rolling update begins, what happens during those 30 seconds?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="160" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">Pod Termination Lifecycle</text><rect x="20" y="55" width="65" height="30" rx="5" fill="#264653" stroke="#2a9d8f" stroke-width="1.5"/><text x="52" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">Signal ?</text><line x1="85" y1="70" x2="105" y2="70" stroke="#888" stroke-width="1.5" marker-end="url(#a88)"/><rect x="105" y="55" width="130" height="30" rx="5" fill="#3d405b" stroke="#888" stroke-width="1.5"/><text x="170" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">Grace period (30s)</text><line x1="235" y1="70" x2="260" y2="70" stroke="#888" stroke-width="1.5" marker-end="url(#a88)"/><rect x="260" y="55" width="65" height="30" rx="5" fill="#7b2d26" stroke="#e63946" stroke-width="1.5"/><text x="292" y="74" text-anchor="middle" fill="#e0e0e0" font-size="9">Signal ?</text><text x="170" y="115" text-anchor="middle" fill="#aaa" font-size="10">What happens at each stage?</text><text x="170" y="135" text-anchor="middle" fill="#aaa" font-size="10">What signal is sent if the process is still running?</text><defs><marker id="a88" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/></marker></defs></svg>',
    options: [
      "The kubelet immediately kills the container with SIGKILL and creates the new replacement container on the same node",
      "The container continues serving traffic for the full 30 seconds while the new version starts running alongside it",
      "The kubelet sends SIGTERM giving the container 30 seconds to shut down gracefully; then SIGKILL is sent if needed",
      "The pod's readiness probe is suspended for the 30-second window to allow the container to drain active connections"
    ],
    answer: 2,
    explanation: "When a pod is being terminated, the kubelet first sends SIGTERM to the container's main process. The application has `terminationGracePeriodSeconds` (30 seconds in this case) to perform cleanup: finish in-flight requests, close database connections, flush buffers. If the process has not exited after 30 seconds, the kubelet sends SIGKILL, which terminates it immediately.\n\nWhy other options are wrong:\n- A: The kubelet sends SIGTERM first, not SIGKILL; immediate SIGKILL only happens after the grace period\n- B: The pod is removed from endpoints at the start of termination; it does not continue serving for the full period\n- D: Readiness probe is not suspended; the pod is marked as terminating and removed from endpoints\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.terminationGracePeriodSeconds}'"
  },
  {
    id: "s07-q089",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team runs `kubectl exec -it production-db-0 -- psql` to manually fix data in production. From a cloud native operations perspective, what is wrong with this approach?",
    diagram: null,
    options: [
      "Nothing is wrong—interactive debugging of production databases is considered a standard cloud native practice today",
      "The `kubectl exec` command does not support interactive database clients like `psql` due to TTY protocol limits",
      "The pod's network policy automatically blocks interactive sessions in production namespaces as a security measure",
      "Manual changes via `kubectl exec` bypass version control, audit trails, and automation, violating declarative ops"
    ],
    answer: 3,
    explanation: "Cloud native principles emphasize declarative configuration, automation, and auditability. Manual `kubectl exec` sessions create undocumented, unreproducible changes that cannot be tracked, reviewed, or rolled back. For production databases, changes should go through migration scripts, CI/CD pipelines, or GitOps workflows that maintain a full audit trail.\n\nWhy other options are wrong:\n- A: Manual production changes are widely considered an anti-pattern in cloud native operations\n- B: kubectl exec fully supports interactive clients like psql with -it flags\n- C: NetworkPolicy does not automatically block interactive sessions based on namespace naming\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#in-place-updates-of-resources",
    verify: null
  },
  {
    id: "s07-q090",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod is scheduled to a node and runs successfully for 5 minutes, but then is evicted. The pod had a toleration for `node.kubernetes.io/not-ready` with `tolerationSeconds: 300`. What happened?",
    diagram: null,
    options: [
      "The pod exceeded its resource limits after 5 minutes, so the kubelet's `eviction-manager` terminated it to reclaim node resources",
      "The node became `NotReady` and the pod's `NoExecute` toleration with `tolerationSeconds: 300` expired, triggering eviction after 5 minutes",
      "The scheduler detected a better node for the pod and performed a live migration after the 300-second warm-up period elapsed",
      "The pod's NoExecute toleration expired because the PodDisruptionBudget overrides tolerationSeconds after a 300-second window"
    ],
    answer: 1,
    explanation: "When a `NoExecute` taint is applied to a node (e.g., `node.kubernetes.io/not-ready` when the node's `Ready` condition becomes `False`), pods that tolerate the taint with a `tolerationSeconds` value will remain on the node only for that duration. After 300 seconds (5 minutes), the toleration expires and the pod is evicted. Without `tolerationSeconds`, a tolerating pod would stay indefinitely; without any toleration, the pod would be evicted immediately.\n\nWhy other options are wrong:\n- A: Kubelet eviction occurs due to node-level resource pressure (e.g., memory.available below threshold), not because an individual pod exceeds its own limits. A pod exceeding its memory limit is OOMKilled by the cgroup, not evicted by the eviction-manager\n- C: Kubernetes does not perform live pod migration; pods are terminated and recreated\n- D: PDB does not have a minimum uptime threshold; it protects against voluntary disruptions\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#taint-based-evictions",
    verify: "kubectl get events --field-selector reason=TaintManagerEviction"
  },
  {
    id: "s07-q091",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A pod is stuck with `STATUS: ContainerCreating` and the describe output shows: `Warning  FailedCreatePodSandBox: rpc error: code = Unknown desc = failed to set up sandbox container network: NetworkPlugin cni failed to set up pod network`. Which component failed?",
    diagram: null,
    options: [
      "The CNI plugin failed to configure pod sandbox networking, such as assigning an IP or setting up veth pairs",
      "The container runtime failed to pull the required container image from the configured registry endpoint",
      "The kubelet process failed to authenticate with the API server using its current client certificate pair",
      "The kube-proxy could not create the required iptables rules for routing traffic to the new pod sandbox"
    ],
    answer: 0,
    explanation: "The error `NetworkPlugin cni failed to set up pod network` indicates the CNI (Container Network Interface) plugin encountered an error while configuring the pod's network namespace. This could be due to IP address exhaustion in the pod CIDR range, a misconfigured CNI binary, or the CNI plugin DaemonSet not running on the node. Checking the CNI plugin logs on the affected node is the next step.\n\nWhy other options are wrong:\n- B: Image pull failure shows different event messages about pull errors, not network plugin failures\n- C: Kubelet authentication issues prevent node registration, not pod sandbox creation\n- D: kube-proxy creates iptables rules for Services, not for pod sandbox network setup\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
    verify: "kubectl get pods -n kube-system -l k8s-app=calico-node"
  },
  {
    id: "s07-q092",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A team notices their Kubernetes costs are 3x higher than expected. Running `kubectl top nodes` shows all nodes at 15-20% CPU and 30% memory utilization. What does this suggest about the cluster's resource efficiency?",
    diagram: null,
    options: [
      "The cluster is optimally sized because it has sufficient headroom for unexpected traffic spikes and burst workloads",
      "The low utilization indicates a monitoring error and the actual real-time resource usage is likely much higher overall",
      "The cluster is over-provisioned—resource requests are likely much higher than actual usage, or there are too many nodes",
      "Node-level metrics provide limited value for cost optimization compared to pod-level metrics for workload planning"
    ],
    answer: 2,
    explanation: "Low node utilization (15-20% CPU, 30% memory) combined with high costs strongly suggests over-provisioning. Common causes include overly generous resource requests, the cluster autoscaler not scaling down, or right-sizing not being performed. Tools like the Kubernetes Vertical Pod Autoscaler (VPA) can recommend better resource requests, and the cluster autoscaler can remove underutilized nodes.\n\nWhy other options are wrong:\n- A: 15-20% utilization at 3x expected cost is not optimal; it indicates significant waste\n- B: Low utilization from kubectl top is from the Metrics Server, which is reliable when installed\n- D: While pod-level metrics are useful for right-sizing individual workloads, the question specifically shows node-level utilization at 15-20%, which directly reveals cluster-wide over-provisioning and excess nodes\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: "kubectl top nodes"
  },
  {
    id: "s07-q093",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A pod's container exits with code 137 but there is no `OOMKilled` reason in the pod status. The container's `State` shows `Reason: Error`. What else could cause exit code 137?",
    diagram: null,
    options: [
      "The application explicitly calls exit(137) in its error handler to signal a custom fatal error condition to the orchestration layer",
      "The container received a SIGKILL (signal 9) from an external source such as a manual kill command or system-level memory pressure",
      "The container exceeded its configured CPU limits, causing the kernel to throttle and eventually terminate the process with SIGKILL",
      "The kubelet sent SIGTERM (signal 15) because the container exceeded its terminationGracePeriodSeconds, producing exit code 143 (128+15)"
    ],
    answer: 1,
    explanation: "Exit code 137 = 128 + 9, meaning the process received SIGKILL (signal 9). While `OOMKilled` is the most common cause, SIGKILL can also come from a manual `kill -9` command or the kernel OOM killer acting on system-level memory pressure. If OOMKilled is not listed, check container events and system logs (`dmesg`) for clues.\n\nWhy other options are wrong:\n- A: An application calling exit(137) is technically possible but extremely unusual; the Reason: Error status set by the container runtime combined with exit code 137 specifically indicates the process was killed by signal 9 (SIGKILL), not a voluntary exit\n- C: CPU limit exceeded causes throttling (reduced CPU cycles), not SIGKILL; the kernel never kills processes for exceeding CPU limits\n- D: Exit code 143 indicates SIGTERM (128+15), not SIGKILL; the question states exit code 137 which is SIGKILL (128+9)\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/determine-reason-pod-failure/",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Last State'"
  },
  {
    id: "s07-q094",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "You see `Unable to register node with API server` in the kubelet logs of a new node being added to the cluster. What is the most common cause?",
    diagram: null,
    options: [
      "The kubelet's bootstrap token has expired or is invalid, preventing authentication to the API server",
      "The node's hostname already exists in the cluster from a previous registration and conflicts with it",
      "The API server has reached its maximum node limit and is rejecting all new registration requests",
      "The node does not have a container runtime installed which is a prerequisite for kubelet startup"
    ],
    answer: 0,
    explanation: "When a node joins a cluster, the kubelet uses a bootstrap token to authenticate with the API server and register itself. If this token has expired, been revoked, or is incorrect, the registration fails. Other causes include network connectivity issues to the API server or incorrect API server address in the kubelet configuration.\n\nWhy other options are wrong:\n- B: Hostname conflicts are possible but much less common; the error typically mentions the specific cause\n- C: Kubernetes API server does not have a maximum node limit that would reject registrations\n- D: Missing container runtime prevents kubelet from starting containers but not from registering with the API server\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/bootstrap-tokens/",
    verify: null
  },
  {
    id: "s07-q095",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "You run `helm install myrelease ./mychart` and get: `Error: INSTALLATION FAILED: rendered manifests contain a resource that already exists. Unable to continue with install`. What happened?",
    diagram: null,
    options: [
      "The Helm chart has a syntax error in one of its rendered templates that prevents the manifest from being applied correctly",
      "The Helm repository index is corrupted and needs to be rebuilt before the chart can be installed into the target namespace",
      "The Kubernetes version does not support the API version used in the chart manifests, causing an incompatibility validation error",
      "A resource in the chart (e.g., Service or ConfigMap) already exists in the namespace from a previous manual or Helm deployment"
    ],
    answer: 3,
    explanation: "Helm refuses to install when it finds existing resources that match what the chart would create, to avoid overwriting unmanaged resources. This commonly happens when resources were created manually with `kubectl apply` or by another Helm release. You can either delete the conflicting resources first, use `helm upgrade --install` to adopt them, or annotate the existing resources with `meta.helm.sh/release-name` and `meta.helm.sh/release-namespace` plus label `app.kubernetes.io/managed-by: Helm` to adopt them into the new release.\n\nWhy other options are wrong:\n- A: Template syntax errors produce different error messages about rendering failures\n- B: Repository index corruption is unrelated to local chart installation from a directory path\n- C: API version incompatibility produces errors about unknown API versions, not resource already exists\n\nReference: https://helm.sh/docs/helm/helm_install/",
    verify: "helm list -A"
  },
  {
    id: "s07-q096",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "Traffic to a Service with `externalTrafficPolicy: Local` is not reaching pods on some nodes. Requests to those nodes' NodePort return `connection refused`. What explains this?",
    diagram: null,
    options: [
      "The `Local` external traffic policy is deprecated and no longer supported in recent Kubernetes versions for NodePort Services",
      "The `Local` external traffic policy requires all pods to have `hostNetwork: true` enabled in the pod spec to function properly",
      "With `externalTrafficPolicy: Local`, kube-proxy only routes to pods on the same node; nodes without a pod drop the traffic",
      "The CNI plugin does not support the `Local` external traffic policy and silently falls back to the default `Cluster` behavior"
    ],
    answer: 2,
    explanation: "With `externalTrafficPolicy: Local`, a node only routes incoming traffic to pods running on that specific node. If no matching pod exists on a node, the traffic is dropped (connection refused). This policy preserves the client's source IP address but requires an external load balancer that only sends traffic to nodes with healthy pods, typically using health check node ports.\n\nWhy other options are wrong:\n- A: externalTrafficPolicy: Local is not deprecated; it is actively supported and commonly used\n- B: hostNetwork: true is not required for Local policy; they are independent settings\n- D: CNI plugins handle pod networking, not Service traffic policy; kube-proxy handles externalTrafficPolicy\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#external-traffic-policy",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.externalTrafficPolicy}'"
  },
  {
    id: "s07-q097",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment's revision history shows 5 revisions via `kubectl rollout history deployment/web`. You want to roll back to revision 2 specifically. Which command is correct?",
    diagram: null,
    options: [
      "`kubectl rollout undo deployment/web --to-revision=2`",
      "`kubectl rollout restart deployment/web --revision=2`",
      "`kubectl set image deployment/web --revision=2`",
      "`kubectl apply -f deployment-v2.yaml --force`"
    ],
    answer: 0,
    explanation: "`kubectl rollout undo deployment/web --to-revision=2` rolls the Deployment back to the specific revision number 2. Without `--to-revision`, it rolls back to the immediately previous revision. The rollout history is maintained by keeping old ReplicaSets (controlled by `revisionHistoryLimit`). Each undo creates a new revision entry in the history.\n\nWhy other options are wrong:\n- B: rollout restart creates a new revision, not a rollback to a specific old revision\n- C: kubectl set image changes the image but does not support a --revision flag for rollback\n- D: kubectl apply with a YAML file requires having the correct version manifest and --force is disruptive\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout_undo/",
    verify: "kubectl rollout history deployment/web"
  },
  {
    id: "s07-q098",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team wants to set up policy-as-code to prevent deploying containers with the `latest` tag in production namespaces. Which CNCF tool is designed for this use case?",
    diagram: null,
    options: [
      "Helm, which can validate image tags during chart rendering and block deployments that use the `latest` tag in templates",
      "Prometheus, which can alert when pods use the `latest` tag by monitoring container image metadata exposed as metrics",
      "Falco, which detects policy violations at runtime by monitoring system calls and container events on each cluster node",
      "OPA Gatekeeper or Kyverno, which enforce admission control policies that reject resources violating image tag rules"
    ],
    answer: 3,
    explanation: "OPA Gatekeeper and Kyverno are Kubernetes admission controllers that evaluate policies against incoming API requests. A policy can reject any pod spec containing `image: *:latest` or images without explicit tags. These tools enforce governance rules at admission time, before the resource is created, making them ideal for preventing misconfigurations in production namespaces.\n\nWhy other options are wrong:\n- A: Helm validates chart syntax, not runtime admission; it cannot block kubectl apply or other tools\n- B: Prometheus monitors metrics, not admission control; it can alert but cannot prevent deployment\n- C: Falco detects runtime violations after deployment, not at admission time; it cannot prevent creation\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-admission/",
    verify: null
  },
  {
    id: "s07-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "After deleting and recreating a Service, existing pods that cached the old Service ClusterIP are getting `connection refused` errors when trying to connect. Why is this happening, and how should clients discover Services?",
    diagram: null,
    options: [
      "The kube-proxy is not updating iptables rules for the new Service, causing stale routing entries to persist across all nodes",
      "The pods need to be restarted for the new iptables rules to take effect because they cache network state at startup time",
      "The Service got a new ClusterIP. Clients should use DNS names instead of hardcoded IPs, since DNS resolves to the new IP",
      "Switching the Service to `type: ExternalName` would decouple the Service from a fixed ClusterIP and resolve IPs transparently"
    ],
    answer: 2,
    explanation: "When a Service is deleted and recreated, it typically gets a new ClusterIP (unless explicitly specified). Clients that cached the old IP will fail. Using DNS names ensures clients always resolve to the current Service IP. DNS records are updated by CoreDNS automatically when Services are created or modified.\n\nWhy other options are wrong:\n- A: kube-proxy does update iptables for new Services; the issue is client-side IP caching, not kube-proxy\n- B: Pods do not need restarts for iptables; DNS resolution happens per-request and adapts to new IPs\n- D: ExternalName maps a Service to an external DNS name via CNAME; it is not a solution for internal ClusterIP changes\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.clusterIP}'"
  },
  {
    id: "s07-q100",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI pipeline builds a container image and pushes it to a registry, then updates the Deployment image tag. However, the pipeline sometimes deploys an image that has not finished being pushed, causing `ImagePullBackOff`. What practice prevents this race condition?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="230" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1.5"/><text x="200" y="35" text-anchor="middle" fill="#e0e0e0" font-size="13" font-weight="bold">CI/CD Image Push Race Condition</text><rect x="30" y="55" width="100" height="35" rx="5" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="80" y="76" text-anchor="middle" fill="#e0e0e0" font-size="10">Build Image</text><line x1="130" y1="72" x2="155" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a100)"/><rect x="155" y="55" width="100" height="35" rx="5" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="205" y="76" text-anchor="middle" fill="#e0e0e0" font-size="10">Push Image</text><line x1="255" y1="72" x2="275" y2="72" stroke="#888" stroke-width="1.5" marker-end="url(#a100)"/><rect x="275" y="55" width="100" height="35" rx="5" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="325" y="76" text-anchor="middle" fill="#e0e0e0" font-size="10">Deploy</text><rect x="30" y="115" width="100" height="35" rx="5" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="80" y="136" text-anchor="middle" fill="#e0e0e0" font-size="10">Build Image</text><rect x="155" y="115" width="100" height="35" rx="5" fill="#264653" stroke="#7a8a99" stroke-width="1.5"/><text x="205" y="130" text-anchor="middle" fill="#e0e0e0" font-size="9">Push Image</text><text x="205" y="143" text-anchor="middle" fill="#e0e0e0" font-size="9">(still running)</text><rect x="200" y="115" width="100" height="35" rx="5" fill="#264653" stroke="#7a8a99" stroke-width="1.5" opacity="0.5"/><text x="250" y="136" text-anchor="middle" fill="#e0e0e0" font-size="9">Deploy (overlap)</text><text x="200" y="180" text-anchor="middle" fill="#aaa" font-size="10">Scenario 1: Sequential approach</text><text x="200" y="200" text-anchor="middle" fill="#aaa" font-size="10">Scenario 2: Deploy before push completes</text><text x="200" y="225" text-anchor="middle" fill="#aaa" font-size="10">Which scenario avoids the race condition?</text><defs><marker id="a100" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/></marker></defs></svg>',
    options: [
      "Ensuring the pipeline verifies the image push is complete (e.g., by pulling the digest) before updating the Deployment",
      "Using `imagePullPolicy: Always` in the pipeline so Kubernetes retries pulling until the image becomes available in the registry",
      "Setting a long `initialDelaySeconds` on the readiness probe to give the registry time to propagate the image to all nodes",
      "Configuring the container runtime to cache all images locally before deploying any workload updates to the cluster nodes"
    ],
    answer: 0,
    explanation: "The race condition occurs when the deploy step runs before the push step finishes. The fix is to make the pipeline sequential: build, push, verify the push (e.g., check the image digest), then deploy. Using image digests (`image: myapp@sha256:abc123`) instead of mutable tags provides cryptographic guarantees that the exact image is available and immutable.\n\nWhy other options are wrong:\n- B: imagePullPolicy: Always retries but introduces latency and does not guarantee the image exists yet\n- C: initialDelaySeconds on probes is unrelated to image availability in the registry\n- D: Pre-caching all images on nodes is impractical and does not solve the race between push and deploy\n\nReference: https://kubernetes.io/docs/concepts/containers/images/#image-pull-policy",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.containerStatuses[0].imageID}'"
  },
];

var labExercises = [
  {
    title: "Lab 1: Debugging a CrashLoopBackOff Pod",
    description: "In this lab you will deploy a pod that crashes on startup, then use kubectl commands to diagnose and fix the issue. The pod has a misconfigured command that causes it to exit immediately.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: crashloop-debug\nspec:\n  containers:\n  - name: app\n    image: busybox:1.36\n    command: [\"/bin/sh\", \"-c\", \"exit 1\"]\nEOF",
      "<span class='prompt'>$</span> kubectl get pods crashloop-debug --watch",
      "<span class='prompt'>$</span> kubectl describe pod crashloop-debug | grep -A10 'State:'",
      "<span class='prompt'>$</span> kubectl logs crashloop-debug --previous",
      "<span class='prompt'>$</span> # Fix: update the command to a long-running process",
      "<span class='prompt'>$</span> kubectl delete pod crashloop-debug",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: crashloop-debug\nspec:\n  containers:\n  - name: app\n    image: busybox:1.36\n    command: [\"/bin/sh\", \"-c\", \"echo 'App started'; sleep 3600\"]\nEOF",
      "<span class='prompt'>$</span> kubectl get pods crashloop-debug"
    ],
    expectedOutput: "After the fix, the pod should show STATUS: Running with READY: 1/1 and RESTARTS: 0. The kubectl describe output for the fixed pod should show State: Running."
  },
  {
    title: "Lab 2: Diagnosing ImagePullBackOff Errors",
    description: "Deploy a pod that references a non-existent container image and practice identifying the image pull error using kubectl describe and events.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: imagepull-debug\nspec:\n  containers:\n  - name: app\n    image: nginx:nonexistent-tag-12345\nEOF",
      "<span class='prompt'>$</span> kubectl get pods imagepull-debug",
      "<span class='prompt'>$</span> kubectl describe pod imagepull-debug | grep -A5 Events",
      "<span class='prompt'>$</span> # Look for: Failed to pull image, ErrImagePull, ImagePullBackOff",
      "<span class='prompt'>$</span> # Fix: correct the image tag",
      "<span class='prompt'>$</span> kubectl set image pod/imagepull-debug app=nginx:1.25-alpine",
      "<span class='prompt'>$</span> kubectl get pods imagepull-debug --watch"
    ],
    expectedOutput: "Initially, kubectl describe shows events with 'Failed to pull image' and reason 'ErrImagePull' or 'ImagePullBackOff'. After fixing the image tag with kubectl set image, the pod transitions to Running status."
  },
  {
    title: "Lab 3: Troubleshooting a Pending Pod (Insufficient Resources)",
    description: "Create a pod with an extremely high CPU request that cannot be satisfied by any node in the cluster. Observe the Pending state and scheduler events.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: pending-debug\nspec:\n  containers:\n  - name: app\n    image: nginx:1.25-alpine\n    resources:\n      requests:\n        cpu: \"100\"\n        memory: \"128Mi\"\nEOF",
      "<span class='prompt'>$</span> kubectl get pods pending-debug",
      "<span class='prompt'>$</span> kubectl describe pod pending-debug | grep -A10 Events",
      "<span class='prompt'>$</span> # Observe: FailedScheduling with 'Insufficient cpu'",
      "<span class='prompt'>$</span> kubectl describe nodes | grep -A5 'Allocated resources'",
      "<span class='prompt'>$</span> # Fix: reduce the CPU request to a reasonable value",
      "<span class='prompt'>$</span> kubectl delete pod pending-debug",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: pending-debug\nspec:\n  containers:\n  - name: app\n    image: nginx:1.25-alpine\n    resources:\n      requests:\n        cpu: \"100m\"\n        memory: \"128Mi\"\nEOF",
      "<span class='prompt'>$</span> kubectl get pods pending-debug"
    ],
    expectedOutput: "The initial pod stays in Pending status. kubectl describe shows 'FailedScheduling' events with 'Insufficient cpu'. After reducing the CPU request from 100 cores to 100m (0.1 cores), the pod is successfully scheduled and transitions to Running."
  },
  {
    title: "Lab 4: Using kubectl exec to Inspect a Running Container",
    description: "Deploy a pod and use kubectl exec to inspect its filesystem, environment variables, network configuration, and running processes from inside the container.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: exec-debug\nspec:\n  containers:\n  - name: app\n    image: nginx:1.25-alpine\n    env:\n    - name: APP_ENV\n      value: \"production\"\n    - name: DB_HOST\n      value: \"postgres.default.svc.cluster.local\"\nEOF",
      "<span class='prompt'>$</span> kubectl wait --for=condition=Ready pod/exec-debug --timeout=60s",
      "<span class='prompt'>$</span> # Inspect environment variables",
      "<span class='prompt'>$</span> kubectl exec exec-debug -- env | grep -E 'APP_ENV|DB_HOST'",
      "<span class='prompt'>$</span> # Check if nginx config is present",
      "<span class='prompt'>$</span> kubectl exec exec-debug -- cat /etc/nginx/nginx.conf",
      "<span class='prompt'>$</span> # Check network configuration",
      "<span class='prompt'>$</span> kubectl exec exec-debug -- cat /etc/resolv.conf",
      "<span class='prompt'>$</span> # Check running processes",
      "<span class='prompt'>$</span> kubectl exec exec-debug -- ps aux",
      "<span class='prompt'>$</span> # Interactive shell session",
      "<span class='prompt'>$</span> kubectl exec -it exec-debug -- /bin/sh -c 'echo \"Hostname: $(hostname)\"; echo \"IP: $(hostname -i)\"'",
      "<span class='prompt'>$</span> kubectl delete pod exec-debug"
    ],
    expectedOutput: "kubectl exec shows APP_ENV=production and DB_HOST=postgres.default.svc.cluster.local. The resolv.conf shows the cluster DNS nameserver and search domains. ps aux shows the nginx master and worker processes. The interactive shell shows the pod's hostname and IP address."
  },
  {
    title: "Lab 5: Configuring and Testing Readiness/Liveness Probes",
    description: "Deploy a pod with readiness and liveness probes. Observe how a failing readiness probe removes the pod from Service endpoints, and how a failing liveness probe triggers a container restart.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: probe-debug\n  labels:\n    app: probe-test\nspec:\n  containers:\n  - name: app\n    image: busybox:1.36\n    command: [\"/bin/sh\", \"-c\", \"touch /tmp/ready; touch /tmp/healthy; while true; do sleep 1; done\"]\n    readinessProbe:\n      exec:\n        command: [\"cat\", \"/tmp/ready\"]\n      periodSeconds: 5\n    livenessProbe:\n      exec:\n        command: [\"cat\", \"/tmp/healthy\"]\n      periodSeconds: 5\n      failureThreshold: 3\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: probe-svc\nspec:\n  selector:\n    app: probe-test\n  ports:\n  - port: 80\n    targetPort: 80\nEOF",
      "<span class='prompt'>$</span> kubectl get pods probe-debug",
      "<span class='prompt'>$</span> kubectl get endpoints probe-svc",
      "<span class='prompt'>$</span> # Simulate readiness failure by removing the file",
      "<span class='prompt'>$</span> kubectl exec probe-debug -- rm /tmp/ready",
      "<span class='prompt'>$</span> sleep 15 && kubectl get pods probe-debug",
      "<span class='prompt'>$</span> kubectl get endpoints probe-svc",
      "<span class='prompt'>$</span> # Pod shows READY: 0/1 and endpoints are empty",
      "<span class='prompt'>$</span> # Restore readiness",
      "<span class='prompt'>$</span> kubectl exec probe-debug -- touch /tmp/ready",
      "<span class='prompt'>$</span> sleep 10 && kubectl get endpoints probe-svc",
      "<span class='prompt'>$</span> # Now simulate liveness failure",
      "<span class='prompt'>$</span> kubectl exec probe-debug -- rm /tmp/healthy",
      "<span class='prompt'>$</span> sleep 20 && kubectl get pods probe-debug",
      "<span class='prompt'>$</span> # Pod shows RESTARTS: 1 after liveness probe fails",
      "<span class='prompt'>$</span> kubectl describe pod probe-debug | grep -A5 'Liveness'",
      "<span class='prompt'>$</span> kubectl delete pod probe-debug && kubectl delete svc probe-svc"
    ],
    expectedOutput: "Initially the pod is READY 1/1 and appears in Service endpoints. After removing /tmp/ready, the pod shows READY 0/1 and disappears from endpoints. After restoring the file, the pod returns to endpoints. After removing /tmp/healthy, the liveness probe fails and the container is restarted (RESTARTS count increases)."
  },
  {
    title: "Lab 6: Using kubectl logs and Events for Debugging",
    description: "Deploy a multi-container pod where one container logs normally and another produces errors. Practice using kubectl logs with various flags and kubectl events to piece together the debugging story.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: logs-debug\nspec:\n  initContainers:\n  - name: init-setup\n    image: busybox:1.36\n    command: [\"/bin/sh\", \"-c\", \"echo 'Init: setting up config...'; sleep 2; echo 'Init: done'\"]\n  containers:\n  - name: app\n    image: busybox:1.36\n    command: [\"/bin/sh\", \"-c\", \"i=0; while true; do i=$((i+1)); echo \\\"[INFO] Request $i processed\\\"; if [ $((i % 5)) -eq 0 ]; then echo \\\"[ERROR] Connection to database timed out\\\" >&2; fi; sleep 2; done\"]\n  - name: sidecar\n    image: busybox:1.36\n    command: [\"/bin/sh\", \"-c\", \"while true; do echo \\\"[SIDECAR] Health check passed\\\"; sleep 10; done\"]\nEOF",
      "<span class='prompt'>$</span> kubectl wait --for=condition=Ready pod/logs-debug --timeout=60s",
      "<span class='prompt'>$</span> # View init container logs",
      "<span class='prompt'>$</span> kubectl logs logs-debug -c init-setup",
      "<span class='prompt'>$</span> # View app container logs (last 10 lines)",
      "<span class='prompt'>$</span> kubectl logs logs-debug -c app --tail=10",
      "<span class='prompt'>$</span> # View sidecar logs",
      "<span class='prompt'>$</span> kubectl logs logs-debug -c sidecar --tail=5",
      "<span class='prompt'>$</span> # Stream app logs in real-time (Ctrl+C to stop)",
      "<span class='prompt'>$</span> kubectl logs logs-debug -c app --follow --since=30s &",
      "<span class='prompt'>$</span> sleep 10 && kill %1 2>/dev/null",
      "<span class='prompt'>$</span> # View all containers' logs with prefixes",
      "<span class='prompt'>$</span> kubectl logs logs-debug --all-containers --prefix --tail=5",
      "<span class='prompt'>$</span> # View cluster events for the pod",
      "<span class='prompt'>$</span> kubectl get events --field-selector involvedObject.name=logs-debug --sort-by='.lastTimestamp'",
      "<span class='prompt'>$</span> # View pod conditions and container states",
      "<span class='prompt'>$</span> kubectl get pod logs-debug -o jsonpath='{range .status.conditions[*]}{.type}: {.status}{\"\\n\"}{end}'",
      "<span class='prompt'>$</span> kubectl delete pod logs-debug"
    ],
    expectedOutput: "Init container logs show the setup messages. App container logs show alternating INFO and periodic ERROR messages (every 5th request). Sidecar logs show periodic health check messages. The --all-containers flag shows logs from both containers with name prefixes. Events show the pod lifecycle: Scheduled, Pulling, Pulled, Created, Started for each container."
  }
];
