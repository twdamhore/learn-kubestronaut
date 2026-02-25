var EXAM_SET = 9;
var EXAM_TITLE = "KCNA Practice Exam - Set 09: Observability & Application Delivery";
var questions = [
  {
    id: "s09-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer notices that a Pod in the <code>monitoring</code> namespace has been restarting repeatedly. The Pod spec includes a liveness probe that performs an HTTP GET on <code>/healthz</code> at port 8080. The application inside the container actually listens on port 9090. What is the most likely cause of the restarts?",
    diagram: null,
    options: [
      "The readiness probe is misconfigured, preventing traffic routing to the Pod on the expected port",
      "The liveness probe targets the wrong port, so health checks fail and the kubelet restarts the container",
      "The container runtime is crashing due to an incompatible image format on the designated registry",
      "The scheduler is evicting the Pod because of sustained resource pressure detected on the worker node"
    ],
    answer: 1,
    explanation: "When a liveness probe targets port 8080 but the application listens on port 9090, every health check returns a connection refused error. The kubelet interprets this as an unhealthy container and restarts it according to the Pod's `restartPolicy`. Readiness probe failures affect traffic routing, not restarts.\n\nWhy other options are wrong:\n- A: Readiness probe failures affect traffic routing via Endpoints, not container restarts\n- C: A registry/image format issue would show ImagePullBackOff or ErrImagePull, not repeated restarts\n- D: Resource-pressure evictions are reported as Evicted status and unrelated to probe configuration\n\nReference: https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/",
    verify: "kubectl describe pod <pod-name> -n monitoring | grep -A5 'Liveness'"
  },
  {
    id: "s09-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "Your team runs a Deployment with 5 replicas and <code>maxSurge: 1</code>, <code>maxUnavailable: 0</code>. During a rolling update, what is the maximum number of Pods that can exist at any point?",
    diagram: null,
    options: [
      "6 Pods",
      "7 Pods",
      "5 Pods",
      "4 Pods"
    ],
    answer: 0,
    explanation: "With `maxSurge: 1` and 5 desired replicas, Kubernetes can create at most 1 extra Pod above the desired count during a rolling update, resulting in a maximum of 6 Pods. The `maxUnavailable: 0` setting ensures all 5 original replicas remain available until a new Pod is ready.\n\nWhy other options are wrong:\n- B: 7 Pods would require maxSurge: 2 with 5 replicas; maxSurge: 1 allows only 1 extra Pod\n- C: 5 Pods would mean no surge at all, contradicting maxSurge: 1 which permits one extra\n- D: 4 Pods would violate maxUnavailable: 0 which requires all 5 original replicas stay available\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl describe deployment <name> | grep -E 'RollingUpdateStrategy|Replicas'"
  },
  {
    id: "s09-q003",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A microservices application uses a ClusterIP Service for internal communication between the <code>order-service</code> and <code>payment-service</code>. The order-service tries to reach the payment-service using the DNS name <code>payment-service.billing</code>, but receives a connection timeout. Both services are healthy. Which of the following is the most likely cause?",
    diagram: null,
    options: [
      "The payment-service is in a different namespace than <code>billing</code>, so the DNS name does not resolve",
      "<code>ClusterIP</code> addresses are only accessible from outside the cluster via the external load balancer",
      "The order-service container image does not include the libraries required for DNS-based resolution",
      "ClusterIP Services cannot be used for direct inter-Pod communication within the cluster network"
    ],
    answer: 0,
    explanation: "Kubernetes DNS follows the pattern `<service>.<namespace>.svc.cluster.local`. If the payment-service is not in the `billing` namespace, the short DNS name `payment-service.billing` will fail to resolve. ClusterIP Services are the standard mechanism for internal communication between Pods.\n\nWhy other options are wrong:\n- B: ClusterIP Services are designed for internal cluster access, not external-only via load balancer\n- C: Standard container images include DNS resolver libraries; this is not a missing-library issue\n- D: ClusterIP Services are the standard mechanism for direct inter-Pod communication within a cluster\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl get svc payment-service -n billing"
  },
  {
    id: "s09-q004",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Your organization is evaluating CNCF projects for a new observability stack. The architect wants to use a single vendor-neutral telemetry collection framework that supports all three pillars of observability. Which CNCF project best fits this requirement?",
    diagram: null,
    options: [
      "Prometheus, because it natively supports collecting traces, logs, and spans alongside its metrics pipeline",
      "Jaeger, because it provides a unified collection pipeline for all telemetry types including metrics",
      "OpenTelemetry, because it provides unified APIs, SDKs, and collectors for traces, metrics, and logs",
      "Fluentd, because it can collect, transform, and forward all signal types with built-in trace correlation"
    ],
    answer: 2,
    explanation: "OpenTelemetry is the CNCF project specifically designed to provide a single, vendor-neutral framework for collecting traces, metrics, and logs. Prometheus focuses on metrics, Jaeger on distributed tracing, and Fluentd on log aggregation. OpenTelemetry merges the capabilities of OpenTracing and OpenCensus.\n\nWhy other options are wrong:\n- A: Prometheus focuses on metrics collection and does not natively support traces or logs\n- B: Jaeger is a distributed tracing system and does not collect metrics or logs\n- D: Fluentd is a log aggregator and does not provide built-in trace correlation or metrics collection\n\nReference: https://opentelemetry.io/docs/what-is-opentelemetry/",
    verify: null
  },
  {
    id: "s09-q005",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform team configures Prometheus to scrape metrics from application Pods. They add the annotation <code>prometheus.io/scrape: \"true\"</code> to their Pod spec, but Prometheus is not collecting metrics. The Prometheus configuration uses <code>kubernetes_sd_configs</code> with role <code>pod</code>. What should they check first?",
    diagram: null,
    options: [
      "Whether the Prometheus server has enough CPU and memory to scrape all <code>kubernetes_sd_configs</code> targets",
      "Whether the application Pods have a readiness probe defined that gates the scraping of metrics endpoints",
      "Whether the Prometheus Operator CRDs like <code>ServiceMonitor</code> are correctly installed and reconciled",
      "Whether the relabeling rules filter on the <code>prometheus.io/scrape</code> annotation and the correct metrics port"
    ],
    answer: 3,
    explanation: "Prometheus service discovery with `kubernetes_sd_configs` discovers targets but requires relabeling rules to filter based on annotations like `prometheus.io/scrape`. Additionally, the `prometheus.io/port` annotation must match the port where the application exposes its `/metrics` endpoint. Without proper relabeling, discovered targets are dropped.\n\nWhy other options are wrong:\n- A: Insufficient Prometheus resources would cause scrape timeouts or dropped scrapes, not total absence of target discovery\n- B: Readiness probes do not gate Prometheus scraping; scraping depends on SD config and relabeling\n- C: Prometheus Operator CRDs are not required when using raw kubernetes_sd_configs in a ConfigMap\n\nReference: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config",
    verify: "kubectl get configmap prometheus-config -n monitoring -o yaml | grep -A10 relabel"
  },
  {
    id: "s09-q006",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "An SRE team adopts Argo CD for GitOps-based deployments. After pushing a manifest change to the Git repository, Argo CD shows the application status as <code>OutOfSync</code> but does not automatically deploy the change. What is the most likely reason?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="70" width="100" height="50" rx="8" fill="#2196F3" stroke="#1565C0" stroke-width="2"/><text x="60" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Git Repo</text><rect x="150" y="70" width="100" height="50" rx="8" fill="#FF9800" stroke="#E65100" stroke-width="2"/><text x="200" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Argo CD</text><rect x="290" y="70" width="100" height="50" rx="8" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/><text x="340" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">K8s Cluster</text><line x1="110" y1="95" x2="148" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow9a)"/><line x1="250" y1="95" x2="288" y2="95" stroke="#999" stroke-width="2" stroke-dasharray="6,3"/><text x="200" y="155" text-anchor="middle" fill="#555" font-size="11" font-style="italic">Why no auto-deploy?</text><defs><marker id="arrow9a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Argo CD requires Flux as a co-controller for enabling automatic sync operations on the cluster",
      "The sync policy is set to <code>manual</code> rather than <code>automated</code>, so changes are detected but not auto-applied",
      "Git webhooks must be configured through a third-party integration because Argo CD relies solely on polling",
      "The Argo CD application manifest is missing the required <code>repoURL</code> field in the source specification"
    ],
    answer: 1,
    explanation: "By default, Argo CD applications use a manual sync policy, meaning it detects drift (showing `OutOfSync`) but waits for an operator to trigger the sync. Setting the sync policy to `automated` enables Argo CD to automatically apply changes when the Git repository state diverges from the live cluster state.\n\nWhy other options are wrong:\n- A: Argo CD operates independently of Flux; they are separate GitOps tools that do not require each other\n- C: Argo CD does support Git webhooks for faster detection; webhooks supplement but are not required for sync\n- D: If repoURL were missing, the application would fail to create, not show OutOfSync status\n\nReference: https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/",
    verify: "kubectl get application <app-name> -n argocd -o jsonpath='{.spec.syncPolicy}'"
  },
  {
    id: "s09-q007",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team has a Service of type <code>NodePort</code> configured for their web application. The Service's <code>nodePort</code> is set to 30080, and the target Pod listens on port 8080. A user accesses <code>http://&lt;node-ip&gt;:30080</code> but receives no response. The Pods are running and pass readiness checks. Which action would most effectively diagnose this issue?",
    diagram: null,
    options: [
      "Change the Service type from NodePort to LoadBalancer to provision an external IP address",
      "Restart the kube-proxy DaemonSet to force a complete refresh of the iptables routing rules",
      "Verify that the Service selector labels match the Pod labels using <code>kubectl get endpoints</code>",
      "Increase the <code>nodePort</code> range in the API server startup configuration to allow higher ports"
    ],
    answer: 2,
    explanation: "When Pods are healthy but a Service is not routing traffic, the first diagnostic step is to verify that the Service's selector matches the Pod labels. Running `kubectl get endpoints <service>` shows whether the Service has discovered any backing Pods. An empty Endpoints list confirms a selector mismatch.\n\nWhy other options are wrong:\n- A: Changing Service type does not diagnose the issue; it changes the access method entirely\n- B: Restarting kube-proxy is a heavy-handed action unlikely to fix a selector mismatch problem\n- D: Increasing nodePort range is irrelevant since port 30080 is already within the default 30000-32767 range\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
    verify: "kubectl get endpoints <service-name> -o wide"
  },
  {
    id: "s09-q008",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "In a highly available Kubernetes control plane, multiple instances of the kube-controller-manager run across different master nodes. How does Kubernetes ensure that only one instance actively reconciles resources at a time?",
    diagram: null,
    options: [
      "Each controller-manager instance is assigned a unique subset of resource types to manage independently across the cluster",
      "The kube-apiserver serializes all controller-manager requests and routes them to a single designated active instance",
      "The instances use leader election via a Lease object so only the elected leader performs active reconciliation",
      "A separate etcd watcher process distributes reconciliation work across controller-manager instances using round-robin"
    ],
    answer: 2,
    explanation: "Kubernetes uses a leader election mechanism, typically backed by a Lease object in the `kube-system` namespace, to ensure only one kube-controller-manager instance is active at a time. The other instances remain on standby and will take over if the current leader loses its lease.\n\nWhy other options are wrong:\n- A: Controller-manager instances are not partitioned by resource type; the leader handles all resources\n- B: The API server does not route or serialize controller requests to a single instance\n- D: etcd does not distribute work; it stores data while leader election uses Lease objects in kube-system\n\nReference: https://kubernetes.io/docs/concepts/architecture/leases/",
    verify: "kubectl get lease -n kube-system"
  },
  {
    id: "s09-q009",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security audit reveals that Pods in the <code>production</code> namespace are running containers as the root user. The team wants to enforce that all containers must run as a non-root user. Which Kubernetes mechanism should they use?",
    diagram: null,
    options: [
      "Add a <code>NetworkPolicy</code> that blocks all network traffic originating from containers running as root user",
      "Configure a <code>Pod Security Admission</code> controller with the <code>restricted</code> profile enforced on the namespace",
      "Create a <code>ResourceQuota</code> that limits the total number of containers running as root in the namespace",
      "Set <code>privileged: false</code> in the container's resource limits section to prevent root-level access"
    ],
    answer: 1,
    explanation: "Pod Security Admission (PSA) is the built-in Kubernetes admission controller that enforces Pod Security Standards. The `restricted` profile requires containers to run as non-root, drop all capabilities, and set a Seccomp profile, among other constraints. It can be applied at the namespace level using labels.\n\nWhy other options are wrong:\n- A: NetworkPolicy controls network traffic, not user identity or container security contexts\n- C: ResourceQuota limits aggregate resource consumption, not security attributes like runAsNonRoot\n- D: There is no privileged field in resource limits; security context fields are separate from resource specs\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-admission/",
    verify: "kubectl label namespace production pod-security.kubernetes.io/enforce=restricted"
  },
  {
    id: "s09-q010",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A cloud-native e-commerce platform has decomposed its monolith into 15 microservices. The team notices that a failure in the payment service causes cascading timeouts across the order, inventory, and notification services. Which pattern best addresses this problem?",
    diagram: null,
    options: [
      "Adding a circuit breaker pattern to fail fast when a downstream service is unavailable or unresponsive",
      "Merging the payment and order services back into a single monolith to reduce inter-service network hops",
      "Implementing synchronous retries with exponential backoff and jitter across all dependent upstream services",
      "Deploying most services onto a shared node to reduce network latency between microservice containers"
    ],
    answer: 0,
    explanation: "The circuit breaker pattern monitors failures to a downstream service and, after a threshold is reached, trips the circuit to return errors immediately instead of waiting for timeouts. This prevents cascading failures by isolating the unhealthy service. Libraries like Istio's outlier detection or Resilience4j implement this pattern.\n\nWhy other options are wrong:\n- B: Re-merging into a monolith reverses the microservices migration and does not address the resilience issue\n- C: Retries with backoff can worsen cascading failures by adding more load to an already failing service\n- D: Deploying all services on one node creates a single point of failure and does not fix cascading timeouts\n\nReference: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker",
    verify: null
  },
  {
    id: "s09-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A data-processing Pod requires a GPU node for its workload. The cluster has nodes labeled <code>accelerator=nvidia-tesla-v100</code>. The Pod spec uses a <code>nodeSelector</code> with <code>accelerator: nvidia-tesla-a100</code>. What happens when this Pod is submitted?",
    diagram: null,
    options: [
      "The scheduler assigns it to one of the V100 nodes since both are NVIDIA GPUs with compatible compute capabilities",
      "The Pod remains in <code>Pending</code> state with a FailedScheduling event because no node matches <code>accelerator: nvidia-tesla-a100</code>",
      "The Pod is scheduled on a V100 node but the container fails to start because of incompatible GPU driver versions",
      "The scheduler automatically creates the missing <code>accelerator</code> label on the most suitable node with GPU resources"
    ],
    answer: 1,
    explanation: "A `nodeSelector` enforces an exact label match. Since the cluster nodes have `accelerator=nvidia-tesla-v100` but the Pod requests `accelerator=nvidia-tesla-a100`, no node satisfies the constraint. The Pod remains `Pending` with a `FailedScheduling` event until a matching node becomes available.\n\nWhy other options are wrong:\n- A: nodeSelector requires exact label match; v100 and a100 are different values regardless of GPU family\n- C: The Pod never gets scheduled, so there is no container start or driver compatibility issue\n- D: The scheduler never creates labels; it only evaluates existing node labels against Pod constraints\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector",
    verify: "kubectl get events --field-selector reason=FailedScheduling"
  },
  {
    id: "s09-q012",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A Kubernetes cluster uses containerd as the container runtime. An operator notices that <code>docker ps</code> on a worker node shows no running containers despite multiple Pods being active. Why is this expected?",
    diagram: null,
    options: [
      "The Pods are using a virtual machine runtime like Kata Containers instead of Docker for workload isolation",
      "The kubelet only creates containers during Pod initialization and hands them off to the kernel scheduler",
      "Docker and containerd share the same container store but <code>docker ps</code> requires root-level privileges",
      "Containerd manages containers independently of the Docker daemon, so <code>docker ps</code> does not list any of them"
    ],
    answer: 3,
    explanation: "When Kubernetes uses containerd directly (via the CRI plugin), containers are managed by containerd without involving the Docker daemon. Therefore, `docker ps` which queries the Docker daemon shows no containers. The correct tool to inspect containers is `crictl ps` or `ctr`.\n\nWhy other options are wrong:\n- A: No evidence suggests Kata Containers is in use; the question states containerd is the runtime\n- B: The kubelet does not hand off containers to the kernel scheduler; it manages them through the CRI\n- C: Docker and containerd have separate container stores; docker ps does not require special privileges\n\nReference: https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd",
    verify: "crictl ps"
  },
  {
    id: "s09-q013",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A distributed tracing system using Jaeger shows incomplete traces for requests that pass through 4 microservices. The first two services show spans, but the last two do not. All services are instrumented with OpenTelemetry SDKs. What is the most likely cause?",
    diagram: null,
    options: [
      "Service 2 is not propagating trace context headers in its outgoing requests to Service 3, so the trace is broken",
      "Jaeger does not support more than 2 spans per trace due to its default Badger storage backend configuration limits",
      "The Jaeger collector has run out of storage space and is selectively dropping newly received span data",
      "OpenTelemetry focuses primarily on tracing gRPC-based services and provides limited HTTP endpoint instrumentation"
    ],
    answer: 0,
    explanation: "Distributed tracing requires that trace context (such as the W3C `traceparent` header) is propagated between services. Since spans appear for Services 1 and 2 but not 3 and 4, the break point is between Services 2 and 3 — Service 2 is not forwarding trace context headers in its outgoing requests. Without those headers, Services 3 and 4 create new independent traces instead of joining the original one. This is the most common cause of incomplete traces.\n\nWhy other options are wrong:\n- B: Jaeger has no such 2-span limit; traces can contain thousands of spans\n- C: Storage issues would cause random span loss across all traces, not a clean break at a specific service\n- D: OpenTelemetry supports both gRPC and HTTP instrumentation, plus many other protocols\n\nReference: https://opentelemetry.io/docs/concepts/context-propagation/",
    verify: null
  },
  {
    id: "s09-q014",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An application team creates a ConfigMap named <code>app-config</code> and mounts it as a volume in their Pod at <code>/etc/config</code>. They update the ConfigMap data using <code>kubectl edit configmap app-config</code>. After a few minutes, the files in the mounted volume reflect the new values. However, the application still uses the old configuration. Why?",
    diagram: null,
    options: [
      "ConfigMap volume mounts are cached at creation time and rarely refresh without a pod restart",
      "Updated ConfigMaps require a new PersistentVolumeClaim to propagate the changed data to the Pod",
      "The application reads configuration only at startup and does not watch for file changes on disk",
      "The kubelet only syncs ConfigMap updates during scheduled node restarts or maintenance windows"
    ],
    answer: 2,
    explanation: "When a ConfigMap is mounted as a volume, the kubelet periodically syncs the files (typically within 30-60 seconds). However, most applications read configuration files only at startup. Unless the application is designed to watch for file changes or the Pod is restarted, it continues using the old values held in memory.\n\nWhy other options are wrong:\n- A: Volume-mounted ConfigMaps do update automatically; the kubelet syncs them periodically\n- B: ConfigMap updates do not require PersistentVolumeClaims; the volume mount syncs in-place\n- D: The kubelet syncs ConfigMap updates on its regular sync interval, not during maintenance windows\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: "kubectl exec <pod-name> -- cat /etc/config/<key>"
  },
  {
    id: "s09-q015",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A StatefulSet with 3 replicas uses a <code>volumeClaimTemplate</code> to provision PersistentVolumeClaims. When the StatefulSet is scaled down from 3 to 1 replica, what happens to the PVCs associated with the removed Pods?",
    diagram: null,
    options: [
      "All three PVCs are deleted and automatically reprovisioned when the StatefulSet scales back up later",
      "The PVCs associated with removed Pods are migrated to the remaining Pod to consolidate storage",
      "The PVCs for removed Pods are retained, preserving data if the StatefulSet is later scaled back up",
      "The PVCs are marked as <code>Released</code> and the underlying storage is immediately reclaimed by the provisioner"
    ],
    answer: 2,
    explanation: "Kubernetes retains PVCs created by a StatefulSet's `volumeClaimTemplate` even when the corresponding Pods are deleted during scale-down. This ensures that data is preserved and can be reattached to the same Pod identity when the StatefulSet scales back up. Manual deletion is required to remove orphaned PVCs.\n\nWhy other options are wrong:\n- A: PVCs are retained by default on scale-down, not deleted; this preserves stateful data\n- B: PVCs are not migrated between Pods; each PVC is bound to a specific Pod ordinal identity\n- D: PVCs remain Bound (not Released) to the PV; the PVC object itself is retained in the namespace\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get pvc -l app=<statefulset-name>"
  },
  {
    id: "s09-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A CronJob is configured with <code>concurrencyPolicy: Forbid</code> and a schedule of <code>*/5 * * * *</code>. A Job triggered at 10:00 takes 7 minutes to complete. What happens at 10:05 when the next scheduled run is due?",
    diagram: null,
    options: [
      "A second Job is created and runs concurrently because the Forbid policy allows overlapping runs",
      "The CronJob controller terminates the still-running 10:00 Job and immediately starts the 10:05 Job",
      "The 10:05 Job is queued in a pending state by the Forbid policy and starts after the 10:00 Job completes",
      "The 10:05 run is skipped entirely because the previous Job is still active under the Forbid policy"
    ],
    answer: 3,
    explanation: "With `concurrencyPolicy: Forbid`, the CronJob controller skips a scheduled run if a previous Job is still active. The 10:05 invocation is simply not created. This prevents overlapping executions, which is important for Jobs that access shared resources or have side effects that are not idempotent.\n\nWhy other options are wrong:\n- A: Forbid policy prevents concurrent runs; a second Job is not created alongside the active one\n- B: Forbid does not terminate running Jobs; the Replace policy would do that\n- C: Forbid does not queue Jobs; it simply skips the scheduled run when the previous Job is still active\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#concurrency-policy",
    verify: "kubectl get cronjob <name> -o jsonpath='{.spec.concurrencyPolicy}'"
  },
  {
    id: "s09-q017",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is migrating a legacy application to a cloud-native architecture. The application writes session state to local disk and requires sticky sessions via IP affinity. According to the twelve-factor app methodology, which principle is being violated?",
    diagram: null,
    options: [
      "Factor VI (Processes) -- apps should be stateless and share-nothing, storing session data in a backing service",
      "Factor III (Config) -- configuration values should be stored in environment variables, not in application code",
      "Factor XI (Logs) -- all application logs should be treated as continuous event streams sent to standard output",
      "Factor IX (Disposability) -- processes should be designed to start fast and shut down gracefully on termination"
    ],
    answer: 0,
    explanation: "Factor VI (Processes) states that twelve-factor processes are stateless and share-nothing. Any data that needs to persist must be stored in a stateful backing service such as a database or Redis. Writing session state to local disk violates this principle and prevents horizontal scaling.\n\nWhy other options are wrong:\n- B: Factor III (Config) is about externalizing config, not about session state or stickiness\n- C: Factor XI (Logs) is about treating logs as event streams, unrelated to session management\n- D: Factor IX (Disposability) is about fast startup and graceful shutdown, not statelessness\n\nReference: https://12factor.net/processes",
    verify: null
  },
  {
    id: "s09-q018",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod is in <code>CrashLoopBackOff</code> state. Running <code>kubectl logs</code> shows the message: <code>Error: failed to connect to database at db-host:5432</code>. The database Pod is running and accessible from other Pods in the same namespace. What should you investigate next?",
    diagram: null,
    options: [
      "Increase the database Pod's CPU and memory limits to handle additional concurrent client connections",
      "Restart the kube-dns Pods to force a complete DNS cache refresh and re-resolution of all service records",
      "Check whether <code>db-host</code> resolves to the correct Service and the container has the right database driver",
      "Delete and recreate the crashing Pod since <code>CrashLoopBackOff</code> is a terminal unrecoverable state"
    ],
    answer: 2,
    explanation: "Since other Pods can connect to the database, the issue is likely specific to this Pod. The hostname `db-host` might not match the actual Service name, or the container image might be missing the required database client library. Verifying DNS resolution from within the Pod and checking Service naming are the most targeted diagnostic steps.\n\nWhy other options are wrong:\n- A: Increasing database resources is speculative; other Pods connect fine, so the DB is not overloaded\n- B: Restarting kube-dns is a blunt action; the issue is likely Pod-specific hostname or driver mismatch\n- D: CrashLoopBackOff is not terminal; it indicates repeated failures with exponential backoff retries\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
    verify: "kubectl exec <pod-name> -- nslookup db-host"
  },
  {
    id: "s09-q019",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An administrator notices that the <code>kube-apiserver</code> is responding slowly to requests. Upon investigation, etcd latency is significantly elevated. Which of the following is the most impactful optimization for etcd performance in a production cluster?",
    diagram: null,
    options: [
      "Running etcd on nodes with fast SSD storage to reduce disk I/O latency for write-ahead log operations",
      "Increasing the number of etcd cluster members from 3 to 7 to better distribute the incoming read load",
      "Disabling etcd authentication to reduce per-request processing overhead on the cluster nodes",
      "Configuring etcd to use an in-memory store instead of persistent storage for improved write throughput"
    ],
    answer: 0,
    explanation: "Etcd is highly sensitive to disk I/O latency because every write operation must be committed to a write-ahead log (WAL) before being acknowledged. Using fast SSD storage is the single most impactful optimization. Increasing members beyond 3 or 5 actually increases consensus latency. Disabling auth or using in-memory storage are not production-appropriate solutions.\n\nWhy other options are wrong:\n- B: Increasing etcd members beyond 3 or 5 increases consensus latency due to more Raft round trips\n- C: Disabling authentication is a security risk and not appropriate for production environments\n- D: In-memory storage loses all data on restart, making it unsuitable for production Kubernetes clusters\n\nReference: https://etcd.io/docs/v3.5/op-guide/hardware/",
    verify: "kubectl exec -n kube-system etcd-master -- etcdctl endpoint status --write-out=table"
  },
  {
    id: "s09-q020",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A team manages their application using a Helm chart. After running <code>helm upgrade my-release ./my-chart</code>, they discover a critical bug in the new version. They need to immediately revert to the previous working state. What is the fastest correct action?",
    diagram: null,
    options: [
      "Run <code>helm delete my-release</code> and then <code>helm install</code> with the previous chart version to redeploy the release",
      "Run <code>helm rollback my-release 1</code> to roll back to the first revision (the original install state)",
      "Run <code>helm rollback my-release 0</code> to revert to the previous release (revision 0 means \"previous release\")",
      "Manually edit each Kubernetes resource to match the previous chart's templates and desired configuration"
    ],
    answer: 2,
    explanation: "The `helm rollback my-release 0` command uses revision 0, which is a special value meaning \"roll back to the immediately previous release.\" This is the fastest way to restore the previous state because Helm maintains a history of all release revisions and can re-apply the previous manifests. Option B targets revision 1 specifically, which is the very first install and may not be the immediately previous release if multiple upgrades have occurred. Deleting and reinstalling would cause unnecessary downtime.\n\nWhy other options are wrong:\n- A: Deleting and reinstalling causes unnecessary downtime and loses release history\n- B: Revision 1 is the first install, which may not be the immediately previous release after multiple upgrades\n- D: Manually editing resources is error-prone, slow, and does not leverage Helm's release management\n\nReference: https://helm.sh/docs/helm/helm_rollback/",
    verify: "helm history my-release"
  },
  {
    id: "s09-q021",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A namespace called <code>staging</code> has a ResourceQuota configured with <code>requests.cpu: 4</code> and <code>limits.cpu: 8</code>. A developer tries to create a Pod without specifying any CPU requests or limits. What happens?",
    diagram: null,
    options: [
      "The Pod is created successfully with default CPU values automatically assigned by the cluster scheduler",
      "The ResourceQuota is automatically adjusted because the API server detects unset resource fields",
      "The Pod is created but remains in <code>Pending</code> state until a suitable LimitRange is defined in the namespace",
      "The API server rejects Pod creation because CPU requests and limits must be specified under a quota"
    ],
    answer: 3,
    explanation: "When a ResourceQuota specifying compute resources (CPU or memory) exists in a namespace, all Pods must explicitly declare requests and limits for those resources. If not specified, the API server rejects the Pod creation. A LimitRange can be configured to automatically inject defaults, preventing this rejection.\n\nWhy other options are wrong:\n- A: Default values are not assigned automatically by the scheduler; a LimitRange would be needed for that\n- B: ResourceQuota is not auto-adjusted; it is a fixed constraint that must be explicitly modified\n- C: The Pod is rejected immediately by the API server, not left in Pending state waiting for a LimitRange\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/#compute-resource-quota",
    verify: "kubectl describe resourcequota -n staging"
  },
  {
    id: "s09-q022",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A NetworkPolicy is applied to the <code>backend</code> namespace that allows ingress traffic only from Pods with the label <code>role: frontend</code>. A Pod in the <code>monitoring</code> namespace with the label <code>role: prometheus</code> needs to scrape metrics from backend Pods. What must be added to allow this traffic?",
    diagram: null,
    options: [
      "A DNS policy exception added in the CoreDNS ConfigMap to allow cross-namespace metric collection",
      "An annotation on the Prometheus Pod to bypass all NetworkPolicy restrictions in the backend namespace",
      "A <code>ServiceAccount</code> with elevated cluster-wide privileges assigned to the Prometheus Pod for scraping",
      "A NetworkPolicy with a <code>namespaceSelector</code> for monitoring and a <code>podSelector</code> matching the scraper"
    ],
    answer: 3,
    explanation: "NetworkPolicies support cross-namespace access control using `namespaceSelector` combined with `podSelector`. To allow the Prometheus Pod in the `monitoring` namespace to reach backend Pods, a new ingress rule must specify both the namespace and the Pod labels. Annotations and ServiceAccounts do not override NetworkPolicy enforcement.\n\nWhy other options are wrong:\n- A: DNS policies in CoreDNS do not override NetworkPolicy enforcement at the network layer\n- B: Annotations cannot bypass NetworkPolicy; enforcement is done at the CNI level, not by annotation\n- C: ServiceAccount privileges control API access, not network-level traffic allowed by NetworkPolicy\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#behavior-of-to-and-from-selectors",
    verify: "kubectl get networkpolicy -n backend -o yaml"
  },
  {
    id: "s09-q023",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Kubernetes cluster runs CoreDNS for service discovery. An application Pod attempts to resolve the DNS name <code>my-svc.my-ns.svc.cluster.local</code> but receives <code>NXDOMAIN</code>. The Service <code>my-svc</code> exists in namespace <code>my-ns</code>. Which of the following could cause this?",
    diagram: null,
    options: [
      "The Service type must be set to <code>LoadBalancer</code> for CoreDNS to generate DNS records for the Service",
      "CoreDNS does not support the <code>svc.cluster.local</code> DNS suffix for resolving internal Service names",
      "CoreDNS maps <code>ClusterIP</code> addresses to IP ranges and does not support hostname-based Service lookups",
      "The Pod's <code>dnsPolicy</code> is set to <code>None</code> without a custom <code>dnsConfig</code> pointing to the CoreDNS nameserver"
    ],
    answer: 3,
    explanation: "When a Pod's `dnsPolicy` is set to `None`, Kubernetes does not configure any default DNS servers for the Pod. Without a `dnsConfig` that includes the CoreDNS ClusterIP as a nameserver, the Pod cannot resolve cluster-internal DNS names. This results in `NXDOMAIN` even though the Service exists.\n\nWhy other options are wrong:\n- A: DNS records are created for all Service types including ClusterIP; LoadBalancer is not required\n- B: CoreDNS fully supports the svc.cluster.local suffix; it is the standard cluster DNS domain\n- C: DNS resolution works with Service names; name-based lookups are the primary use case for CoreDNS\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.dnsPolicy}'"
  },
  {
    id: "s09-q024",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A startup uses Knative Serving to deploy a serverless API on Kubernetes. The API handles bursty traffic with periods of zero requests. After a period of inactivity, the first request to the API takes 8 seconds to complete. Subsequent requests take 200ms. What explains this behavior?",
    diagram: null,
    options: [
      "Knative's load balancer requires 8 seconds to reconfigure its internal routing tables after a period of inactivity",
      "The Knative autoscaler scaled to zero during inactivity, causing a cold start delay when the first request arrives",
      "The Kubernetes DNS cache expired during the idle period and required a full 8 seconds to repopulate entries",
      "The container image is re-pulled from the remote registry on every cold start, adding significant download latency"
    ],
    answer: 1,
    explanation: "Knative Serving supports scale-to-zero, where Pods are terminated after a configurable idle period. When a new request arrives, Knative's activator component holds the request while the autoscaler provisions a new Pod. This cold start includes pulling the image (if not cached), starting the container, and waiting for health checks to pass.\n\nWhy other options are wrong:\n- A: Knative's routing reconfiguration takes milliseconds, not 8 seconds\n- C: DNS cache expiry does not cause 8-second delays; DNS resolution is fast within a cluster\n- D: Images are typically cached on nodes; even if re-pulled, this is one factor of cold start, not the sole cause\n\nReference: https://knative.dev/docs/serving/autoscaling/scale-to-zero/",
    verify: null
  },
  {
    id: "s09-q025",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team deploys a DaemonSet that runs a log collector agent on every node. They add a new node to the cluster with the taint <code>dedicated=monitoring:NoSchedule</code>. The DaemonSet Pod is not scheduled on the new node. What change to the DaemonSet spec would fix this?",
    diagram: null,
    options: [
      "Add a <code>nodeSelector</code> matching the new node's hostname label to target that specific node for scheduling",
      "Add a toleration for <code>dedicated=monitoring:NoSchedule</code> so the DaemonSet Pod tolerates the taint",
      "Set the DaemonSet's <code>updateStrategy</code> to <code>OnDelete</code> to force a rescheduling pass on all tainted nodes",
      "Remove the DaemonSet's resource requests so the Pod fits on any node regardless of available capacity"
    ],
    answer: 1,
    explanation: "Taints prevent Pods from being scheduled on a node unless the Pod has a matching toleration. For a DaemonSet to place Pods on a tainted node, its Pod template must include a toleration that matches the taint's key, value, and effect. Adding `tolerations: [{key: \"dedicated\", value: \"monitoring\", effect: \"NoSchedule\"}]` resolves this.\n\nWhy other options are wrong:\n- A: nodeSelector targets nodes but does not override taints; the Pod still needs a matching toleration\n- C: updateStrategy OnDelete controls update behavior, not initial scheduling on tainted nodes\n- D: Removing resource requests does not bypass taints; taints and resource scheduling are separate mechanisms\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    verify: "kubectl get daemonset <name> -o jsonpath='{.spec.template.spec.tolerations}'"
  },
  {
    id: "s09-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer creates a Pod with two containers: an <code>nginx</code> web server and a <code>fluentbit</code> sidecar for log shipping. The fluentbit container reads logs from a shared <code>emptyDir</code> volume. If the nginx container crashes and restarts, what happens to the log data in the <code>emptyDir</code> volume?",
    diagram: null,
    options: [
      "The <code>emptyDir</code> volume is deleted and recreated each time any container in the Pod restarts",
      "The data is lost because <code>emptyDir</code> volumes are bound to individual containers, not the Pod",
      "The <code>emptyDir</code> persists for the Pod's lifetime, so data remains intact across container restarts",
      "The kubelet moves the <code>emptyDir</code> data to a PersistentVolume before the container is restarted"
    ],
    answer: 2,
    explanation: "An `emptyDir` volume is tied to the Pod's lifecycle, not to individual containers. When a container within the Pod crashes and restarts, the `emptyDir` volume and its contents persist. The volume is only deleted when the Pod itself is removed from the node. This makes `emptyDir` suitable for sharing data between sidecar containers.\n\nWhy other options are wrong:\n- A: emptyDir is not recreated on container restart; it persists for the Pod's entire lifetime\n- B: emptyDir volumes are bound to the Pod, not individual containers; all containers share them\n- D: The kubelet does not move emptyDir data to PersistentVolumes; there is no such automatic migration\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl describe pod <pod-name> | grep -A3 'Volumes'"
  },
  {
    id: "s09-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster administrator wants to ensure that Pods from two different applications, <code>app-a</code> and <code>app-b</code>, are never placed on the same node. Which scheduling mechanism should they use?",
    diagram: null,
    options: [
      "Taints applied on all cluster nodes with tolerations granted to only one application at any given time",
      "Node affinity with <code>preferredDuringSchedulingIgnoredDuringExecution</code> targeting different node labels",
      "A PriorityClass that assigns higher scheduling priority to <code>app-a</code> Pods over <code>app-b</code> Pods during contention",
      "Pod anti-affinity with <code>requiredDuringSchedulingIgnoredDuringExecution</code> and the hostname topology key"
    ],
    answer: 3,
    explanation: "Pod anti-affinity with `requiredDuringSchedulingIgnoredDuringExecution` creates a hard constraint that prevents co-location. Using `kubernetes.io/hostname` as the topology key ensures the anti-affinity rule is evaluated at the individual node level, guaranteeing that Pods with matching labels are never scheduled on the same node.\n\nWhy other options are wrong:\n- A: Taints work on a per-node basis and would be complex to manage for mutual exclusion between apps\n- B: preferredDuringScheduling is a soft constraint and does not guarantee Pods are never co-located\n- C: PriorityClass affects scheduling priority and preemption, not co-location constraints between Pods\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.affinity.podAntiAffinity}'"
  },
  {
    id: "s09-q028",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Kubernetes cluster stores TLS certificates for mutual TLS between microservices. The team currently uses Kubernetes Secrets of type <code>kubernetes.io/tls</code>. A security review finds that etcd is not encrypted at rest. What is the recommended remediation?",
    diagram: null,
    options: [
      "Enable encryption at rest by configuring an <code>EncryptionConfiguration</code> with a provider on the API server",
      "Switch to using environment variables instead of mounted Secrets to avoid storing credentials in etcd",
      "Move all TLS certificates to <code>ConfigMap</code> resources, which are automatically encrypted at rest by default",
      "Deploy a separate dedicated etcd cluster exclusively for Secret storage with its own encryption enabled"
    ],
    answer: 0,
    explanation: "By default, Kubernetes Secrets are stored as base64-encoded plaintext in etcd. To protect sensitive data, administrators should configure an `EncryptionConfiguration` on the kube-apiserver, specifying a provider like `aescbc`, `aesgcm`, or an external KMS. ConfigMaps are also unencrypted, and environment variables do not address the at-rest encryption concern.\n\nWhy other options are wrong:\n- B: Environment variables are also stored in the Pod spec in etcd; this does not address at-rest encryption\n- C: ConfigMaps are not encrypted at rest by default; they are stored as plaintext just like Secrets\n- D: A separate etcd cluster adds complexity without solving the core issue; encryption config is the solution\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/",
    verify: null
  },
  {
    id: "s09-q029",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform engineering team is building an internal developer platform and wants to use a Kubernetes-native project that provides a declarative, GitOps-compatible way to define CI/CD pipelines as custom resources. Which project should they evaluate?",
    diagram: null,
    options: [
      "Tekton, which defines CI/CD components (Tasks, Pipelines, PipelineRuns) as native Kubernetes CRDs",
      "Prometheus, which provides pipeline monitoring through its alerting engine (Alertmanager rules)",
      "Envoy, which routes CI/CD traffic between build, test, and deploy stages via its proxy configuration",
      "Harbor, which stores pipeline definitions alongside container images in its artifact registry"
    ],
    answer: 0,
    explanation: "Tekton is a Continuous Delivery Foundation (CDF) project that provides Kubernetes-native CI/CD building blocks. It uses Custom Resource Definitions (CRDs) such as Task, Pipeline, and PipelineRun to define and execute CI/CD workflows declaratively. Being Kubernetes-native, Tekton pipelines can be stored in Git and managed with GitOps workflows. Note: Tekton is governed by the CDF, not the CNCF.\n\nWhy other options are wrong:\n- B: Prometheus is a monitoring system for metrics, not a CI/CD pipeline tool\n- C: Envoy is a service proxy for traffic management, not a CI/CD pipeline orchestrator\n- D: Harbor is a container registry for storing images, not a CI/CD pipeline definition tool\n\nReference: https://tekton.dev/docs/",
    verify: null
  },
  {
    id: "s09-q030",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A platform team deploys Fluent Bit as a DaemonSet to collect container logs from every node. They configure Fluent Bit to read from <code>/var/log/containers/*.log</code> and forward to Elasticsearch. After a node restart, Fluent Bit re-sends all existing logs, creating duplicates. How should they prevent this?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="120" height="50" rx="8" fill="#455A64" stroke="#263238" stroke-width="2"/><text x="70" y="40" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Node Logs</text><text x="70" y="52" text-anchor="middle" fill="#B0BEC5" font-size="9">/var/log/containers/</text><rect x="10" y="90" width="120" height="50" rx="8" fill="#0288D1" stroke="#01579B" stroke-width="2"/><text x="70" y="120" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Fluent Bit</text><rect x="250" y="90" width="140" height="50" rx="8" fill="#388E3C" stroke="#1B5E20" stroke-width="2"/><text x="320" y="120" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Elasticsearch</text><line x1="70" y1="60" x2="70" y2="88" stroke="#333" stroke-width="2" marker-end="url(#arrow9b)"/><line x1="130" y1="115" x2="248" y2="115" stroke="#333" stroke-width="2" marker-end="url(#arrow9b)"/><text x="70" y="185" text-anchor="middle" fill="#F57F17" font-size="16" font-weight="bold">?</text><defs><marker id="arrow9b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Enable the <code>DB</code> parameter on Fluent Bit's tail input plugin to persist file read offsets across restarts",
      "Switch from Fluent Bit to Fluentd, which automatically handles log file offset tracking by default",
      "Configure Elasticsearch to deduplicate incoming log entries automatically using <code>_id</code> document fields",
      "Reduce Fluent Bit's buffer size to minimize the volume of re-sent logs after each node restart event"
    ],
    answer: 0,
    explanation: "Fluent Bit's tail input plugin supports a `DB` parameter that stores file read positions (offsets) in a local SQLite database. When Fluent Bit restarts, it resumes reading from the last recorded position rather than the beginning. Setting `storage.type` to `filesystem` also persists in-flight data to disk to prevent data loss.\n\nWhy other options are wrong:\n- B: Fluentd does not automatically handle offset tracking by default; it also requires explicit configuration\n- C: Elasticsearch deduplication is possible but complex and shifts the burden downstream\n- D: Reducing buffer size does not prevent re-reading from the beginning of log files after restart\n\nReference: https://docs.fluentbit.io/manual/pipeline/inputs/tail#keep-state",
    verify: null
  },
  {
    id: "s09-q031",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A junior engineer asks why the Kubernetes control plane runs <code>kube-proxy</code> on every node as a DaemonSet. What is the primary role of <code>kube-proxy</code>?",
    diagram: null,
    options: [
      "It acts as a reverse proxy for the kube-apiserver, load-balancing API requests across control plane instances",
      "It encrypts all Pod-to-Pod traffic using mutual TLS certificates (X.509) managed by the cluster's CA",
      "It monitors node health and reports detailed status information back to the kube-controller-manager",
      "It maintains network rules on each node (iptables or IPVS) that enable Service-based routing to Pods"
    ],
    answer: 3,
    explanation: "kube-proxy runs on every node and is responsible for implementing the Kubernetes Service abstraction. It watches the API server for Service and Endpoints changes and programs iptables rules (or IPVS rules) on the node to route traffic destined for a Service's ClusterIP to the appropriate backend Pods.\n\nWhy other options are wrong:\n- A: kube-proxy does not proxy API server requests; it handles Service-to-Pod routing only\n- B: kube-proxy does not handle encryption or mTLS; that is the role of a service mesh or CNI plugin\n- C: Node health monitoring is done by the kubelet and node controller, not kube-proxy\n\nReference: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/",
    verify: "kubectl get daemonset kube-proxy -n kube-system"
  },
  {
    id: "s09-q032",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "An engineer runs <code>kubectl top pods</code> in a namespace and receives the error: <code>error: Metrics API not available</code>. The cluster was set up using kubeadm. What component is most likely missing?",
    diagram: null,
    options: [
      "The Metrics Server, which implements the resource metrics API (<code>metrics.k8s.io</code>) required by the cluster",
      "The Prometheus server, which provides the Metrics API endpoint (custom.metrics.k8s.io) for resource data",
      "The kube-state-metrics exporter, which exposes Pod-level resource usage as Prometheus-format metrics",
      "The <code>cAdvisor</code> binary, which must be installed separately on each node to collect container-level stats"
    ],
    answer: 0,
    explanation: "The `kubectl top` command queries the Kubernetes resource metrics API (`metrics.k8s.io`), which is served by the Metrics Server. This component is not installed by default with kubeadm. It collects CPU and memory usage from the kubelet's summary API on each node. Prometheus and kube-state-metrics serve different purposes.\n\nWhy other options are wrong:\n- B: Prometheus provides a custom metrics API, not the core resource metrics API used by kubectl top\n- C: kube-state-metrics exposes Kubernetes object state, not container-level CPU/memory usage\n- D: cAdvisor is embedded in the kubelet since Kubernetes 1.12 and does not need separate installation\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
    verify: "kubectl get apiservice v1beta1.metrics.k8s.io"
  },
  {
    id: "s09-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses labels extensively for organizing resources. They apply the label <code>env: production</code> to Pods, Services, and Deployments. An operator runs <code>kubectl get all -l env=production</code> but notices that ConfigMaps with the same label are not listed. Why?",
    diagram: null,
    options: [
      "<code>kubectl get all</code> does not include ConfigMaps; it returns only a predefined subset of resource types",
      "Label selectors cannot filter ConfigMaps because they are namespace-scoped rather than cluster-scoped",
      "ConfigMaps have limited label support and are not commonly filtered using label selectors in production",
      "The <code>-l</code> flag only works with workload resources; configuration resources like ConfigMaps are excluded"
    ],
    answer: 0,
    explanation: "The `kubectl get all` command returns only a predefined set of resource types (Pods, Services, Deployments, ReplicaSets, StatefulSets, DaemonSets, Jobs, CronJobs). ConfigMaps, Secrets, PVCs, and many other resource types are not included. To find labeled ConfigMaps, you must explicitly run `kubectl get configmap -l env=production`.\n\nWhy other options are wrong:\n- B: Label selectors work on all resource types including namespace-scoped resources like ConfigMaps\n- C: ConfigMaps fully support labels; they can be created, queried, and filtered using label selectors\n- D: The -l flag works with all resource types, not just workloads; the issue is with 'get all' scope\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
    verify: "kubectl get configmap -l env=production"
  },
  {
    id: "s09-q034",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team wants to deploy a new version of their API server using a blue-green deployment strategy on Kubernetes. They currently have a <code>v1</code> Deployment behind a Service. Which approach correctly implements blue-green?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="40" rx="8" fill="#7B1FA2" stroke="#4A148C" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Service</text><rect x="20" y="80" width="150" height="55" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="95" y="105" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Blue (v1) Deploy</text><text x="95" y="120" text-anchor="middle" fill="#90CAF9" font-size="10">version: v1</text><rect x="230" y="80" width="150" height="55" rx="8" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/><text x="305" y="105" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Green (v2) Deploy</text><text x="305" y="120" text-anchor="middle" fill="#A5D6A7" font-size="10">version: v2</text><line x1="175" y1="45" x2="95" y2="78" stroke="#1565C0" stroke-width="2" marker-end="url(#arrow9c)"/><line x1="225" y1="45" x2="305" y2="78" stroke="#999" stroke-width="2" stroke-dasharray="5,3"/><text x="200" y="170" text-anchor="middle" fill="#333" font-size="10">How to switch traffic?</text><rect x="100" y="185" width="200" height="25" rx="5" fill="#FFF3E0" stroke="#E65100" stroke-width="1"/><text x="200" y="202" text-anchor="middle" fill="#E65100" font-size="10">?</text><defs><marker id="arrow9c" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#1565C0"/></marker></defs></svg>',
    options: [
      "Use a single Deployment and perform a rolling update with <code>maxSurge: 100%</code> to replace all Pods at once",
      "Create a <code>v2</code> Deployment with a <code>version: v2</code> label, verify its health, then switch the Service selector",
      "Use a CronJob to periodically swap traffic between v1 and v2 Pods based on a configured time schedule",
      "Deploy v2 Pods into a separate namespace, configure an ExternalName Service, and redirect incoming traffic"
    ],
    answer: 1,
    explanation: "Blue-green deployment involves running two identical environments (blue for current, green for new). In Kubernetes, this is achieved by creating a second Deployment with a distinct version label, validating it, and then switching the Service selector to point to the new version. This provides instant rollback by simply reverting the selector.\n\nWhy other options are wrong:\n- A: maxSurge: 100% creates all new Pods at once, but old Pods are still removed progressively and there is no explicit traffic-switch step, so it is not blue-green\n- C: CronJob-based traffic swapping is not a recognized deployment pattern and lacks reliability\n- D: ExternalName Services create CNAME DNS records and cannot handle cross-namespace routing properly\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.selector}'"
  },
  {
    id: "s09-q035",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A batch processing system uses Kubernetes Jobs with <code>completions: 10</code> and <code>parallelism: 3</code>. After 7 successful completions, one of the running Pods fails. What does the Job controller do?",
    diagram: null,
    options: [
      "The entire Job is marked as failed and all remaining Pods are terminated by the controller immediately",
      "The failed Pod is restarted in place by the kubelet without the Job controller creating any new Pod",
      "The Job controller creates a replacement Pod to maintain progress toward 10 total completions",
      "The Job pauses all execution and waits for manual administrative intervention before continuing"
    ],
    answer: 2,
    explanation: "With `completions: 10` and `parallelism: 3`, the Job controller ensures that failed Pods are replaced to reach the target number of successful completions. A single Pod failure does not fail the entire Job unless the `backoffLimit` is exceeded. The controller creates a new Pod to replace the failed one, maintaining up to 3 concurrent Pods.\n\nWhy other options are wrong:\n- A: A single Pod failure does not fail the entire Job unless backoffLimit is exceeded\n- B: With restartPolicy: Never (the default), the kubelet does not restart in-place; the Job controller creates a new Pod. With restartPolicy: OnFailure, the kubelet restarts in-place but the Job controller still tracks completions\n- D: Jobs do not pause for manual intervention; the controller automatically handles failures and replacements\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#parallel-jobs",
    verify: "kubectl describe job <job-name> | grep -E 'Completions|Parallelism|Failed'"
  },
  {
    id: "s09-q036",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A security-focused organization requires strong workload isolation and considers using a sandbox container runtime. Their Kubernetes cluster uses containerd. Which runtime option provides VM-level isolation while remaining compatible with the Kubernetes CRI?",
    diagram: null,
    options: [
      "runc, because it uses Linux namespaces and cgroups that provide complete VM-equivalent workload isolation",
      "gVisor (runsc), which interposes a user-space kernel to intercept system calls while providing sandbox isolation",
      "Kata Containers, which runs each container inside a lightweight VM while remaining compatible with the CRI",
      "Docker-in-Docker, which nests Docker engines inside containers to provide process-level workload isolation"
    ],
    answer: 2,
    explanation: "Kata Containers provides VM-level isolation by running each Pod inside a lightweight virtual machine with its own kernel. It integrates with containerd through a CRI-compatible shim (`containerd-shim-kata-v2`), making it transparent to Kubernetes. gVisor provides sandbox isolation but not full VM-level isolation. runc provides standard container isolation only.\n\nWhy other options are wrong:\n- A: runc uses namespaces and cgroups which provide process-level isolation, not VM-level isolation\n- B: gVisor provides user-space kernel sandboxing, which is application-level isolation, not full VM isolation\n- D: Docker-in-Docker is a development pattern, not a security sandbox runtime for production workloads\n\nReference: https://katacontainers.io/",
    verify: null
  },
  {
    id: "s09-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An Ingress resource is configured with the following rules: path <code>/api</code> routes to <code>api-service:8080</code> and path <code>/web</code> routes to <code>web-service:3000</code>. A user sends a request to <code>/api/v1/users</code>. With the default <code>pathType: Prefix</code>, which backend receives the request?",
    diagram: null,
    options: [
      "Neither backend receives the request because <code>/api/v1/users</code> is not an exact match for <code>/api</code>",
      "The Ingress controller returns a 404 because the path <code>/api/v1/users</code> is not explicitly defined",
      "The request is routed to <code>api-service:8080</code> because <code>/api/v1/users</code> starts with the <code>/api</code> prefix",
      "The request is load-balanced equally between both backends based on the round-robin algorithm"
    ],
    answer: 2,
    explanation: "With `pathType: Prefix`, the Ingress controller matches the request path against the defined prefixes. Since `/api/v1/users` starts with `/api`, it matches the rule for `api-service:8080`. The full path (including `/v1/users`) is forwarded to the backend service. Prefix matching is the most common path type used in Ingress resources.\n\nWhy other options are wrong:\n- A: Prefix pathType matches any path that starts with the defined prefix, not just exact matches\n- B: The Ingress controller routes to the matching prefix rule, not return 404 for sub-paths\n- D: Requests are routed to the single matching backend, not load-balanced across all backends\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types",
    verify: "kubectl describe ingress <ingress-name>"
  },
  {
    id: "s09-q038",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is containerizing their application and debating how to handle configuration. One engineer suggests baking database credentials into the container image for simplicity. According to cloud-native best practices, why is this problematic?",
    diagram: null,
    options: [
      "Baking credentials into the image is acceptable as long as the container registry enforces TLS for pulls",
      "It violates config-from-code separation and creates security risks that require rebuilds per environment",
      "Container registries scan and automatically redact embedded credentials from image layers during push",
      "Embedding credentials is acceptable if the image is stored in a private registry with access controls"
    ],
    answer: 1,
    explanation: "Cloud-native applications should externalize configuration, especially secrets, from the container image. Embedding credentials in the image means the same image cannot be used across environments without rebuilding, the credentials are exposed to anyone with image pull access, and rotation requires a new image build and deployment cycle. Kubernetes Secrets or external secret managers should be used instead.\n\nWhy other options are wrong:\n- A: TLS protects images in transit but does not protect credentials embedded inside image layers from anyone with pull access\n- C: Container registries store images as-is and do not scan or redact embedded credentials from layers\n- D: Storing an image in a private registry limits who can pull it but does not address credential rotation, environment coupling, or layer inspection risks\n\nReference: https://12factor.net/config",
    verify: null
  },
  {
    id: "s09-q039",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "During a cluster upgrade, an administrator needs to safely remove a node for maintenance. They run <code>kubectl drain node-3</code>. What actions does this command perform?",
    diagram: null,
    options: [
      "It cordons the node and evicts all non-DaemonSet, non-mirror Pods while respecting PodDisruptionBudgets",
      "It stops the kubelet process on the node, archives all container logs, and marks the node as unavailable",
      "It deletes the node object from the cluster, removing it from the scheduler's active node registry until re-added",
      "It live-migrates all running containers to other available nodes while preserving their in-memory state"
    ],
    answer: 0,
    explanation: "`kubectl drain` first cordons the node (marks it as unschedulable) and then evicts all Pods except DaemonSet Pods and mirror Pods. It respects PodDisruptionBudgets during eviction, which may cause the drain to block if evicting a Pod would violate the budget. The node object remains in the cluster with an unschedulable taint.\n\nWhy other options are wrong:\n- B: kubectl drain does not stop the kubelet or archive logs; those are separate manual operations\n- C: kubectl drain does not delete the node object; it only cordons and evicts Pods from the node\n- D: Kubernetes does not live-migrate containers; Pods are terminated and rescheduled as new instances\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/",
    verify: "kubectl get node node-3 -o jsonpath='{.spec.unschedulable}'"
  },
  {
    id: "s09-q040",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Prometheus query <code>rate(http_requests_total{status=~\"5..\"}[5m])</code> returns the per-second rate of HTTP 5xx errors over the last 5 minutes. The SRE team wants to calculate the error rate as a percentage of total requests. Which PromQL expression correctly computes this?",
    diagram: null,
    options: [
      "<code>rate(http_requests_total{status=~\"5..\"}[5m]) * 100</code> to get the absolute error rate as a percentage",
      "<code>sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100</code>",
      "<code>count(http_requests_total{status=~\"5..\"}) / count(http_requests_total) * 100</code> for error ratio",
      "<code>histogram_quantile(0.99, rate(http_requests_total[5m]))</code> for the 99th percentile error rate"
    ],
    answer: 1,
    explanation: "To compute the error rate as a percentage, you divide the rate of 5xx errors by the rate of all requests and multiply by 100. Using `sum()` aggregates across all label dimensions to produce a single numerator and denominator. The `rate()` function is necessary because `http_requests_total` is a counter, and `count()` would return the number of time series, not request rates.\n\nWhy other options are wrong:\n- A: Multiplying the error rate by 100 gives a scaled absolute rate, not a percentage of total requests\n- C: count() returns the number of time series, not request rates; it is not suitable for rate calculations\n- D: histogram_quantile is for histogram metrics and does not compute error ratios from counter metrics\n\nReference: https://prometheus.io/docs/prometheus/latest/querying/functions/#rate",
    verify: null
  },
  {
    id: "s09-q041",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An application Pod has a readiness probe configured as a TCP socket check on port 5432. The container starts but the application takes 30 seconds to initialize its database connection pool. During those 30 seconds, what is the Pod's status from the Service's perspective?",
    diagram: null,
    options: [
      "The Pod receives traffic immediately because it is in <code>Running</code> state and has a valid ClusterIP",
      "The Service sends traffic to the Pod but marks all responses from it as degraded until probes pass",
      "The Pod is terminated after 30 seconds due to the readiness probe continuously failing its TCP check",
      "The Pod is not added to the Service's Endpoints until the readiness probe succeeds, blocking traffic"
    ],
    answer: 3,
    explanation: "Readiness probes determine whether a Pod should receive traffic through a Service. Until the TCP socket check on port 5432 succeeds (meaning the database connection pool is ready), the Pod's IP is not added to the Service's Endpoints object. This prevents routing traffic to Pods that are not yet capable of handling requests. Unlike liveness probes, readiness probe failures do not trigger restarts.\n\nWhy other options are wrong:\n- A: Running state alone does not mean traffic is sent; readiness probes gate Endpoints inclusion\n- B: Services do not mark responses as degraded; the Pod is either in Endpoints or not\n- C: Readiness probe failures do not terminate the Pod; only liveness probe failures trigger restarts\n\nReference: https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/#readiness-probes",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s09-q042",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A multi-tenant Kubernetes cluster has two teams, each with their own namespace: <code>team-alpha</code> and <code>team-beta</code>. By default, Pods in both namespaces can communicate freely. The cluster admin wants to implement a default-deny ingress policy for the <code>team-beta</code> namespace. Which NetworkPolicy achieves this?",
    diagram: null,
    options: [
      "Deleting the default ServiceAccount in the <code>team-beta</code> namespace to revoke all network access",
      "A NetworkPolicy selecting all Pods with <code>policyTypes: [\"Egress\"]</code> and no egress rules defined",
      "A <code>NetworkPolicy</code> with <code>podSelector: {}</code> and <code>policyTypes: [Ingress]</code> applied in that namespace",
      "Adding an annotation <code>network-isolation: enabled</code> to the <code>team-beta</code> namespace metadata labels"
    ],
    answer: 2,
    explanation: "A NetworkPolicy with `podSelector: {}` (matching all Pods) and `policyTypes: [\"Ingress\"]` creates a default-deny ingress rule for the entire namespace. Either omitting the `ingress` field entirely or setting it to an empty array (`ingress: []`) achieves the same default-deny effect — both result in no ingress being allowed. This blocks all incoming traffic to Pods in that namespace unless other NetworkPolicies explicitly allow specific traffic. Annotations alone have no effect on network isolation.\n\nWhy other options are wrong:\n- A: Deleting the default ServiceAccount does not affect network access; ServiceAccounts control API auth\n- B: A policy with policyTypes Egress and no egress rules denies egress, not ingress traffic\n- D: Annotations on namespaces do not enforce network isolation; only NetworkPolicy objects do\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#default-deny-all-ingress-traffic",
    verify: "kubectl get networkpolicy -n team-beta -o yaml"
  },
  {
    id: "s09-q043",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A service mesh is deployed using Istio in a Kubernetes cluster. The platform team wants to implement traffic mirroring to test a new version of the <code>recommendation-service</code> with production traffic without affecting users. Which Istio resource supports this?",
    diagram: null,
    options: [
      "A <code>Gateway</code> resource configured with dual upstream backends for mirroring traffic while routing to the canary",
      "A <code>DestinationRule</code> with <code>trafficPolicy.loadBalancer.simple: ROUND_ROBIN</code> distributing across versions",
      "A <code>PeerAuthentication</code> policy that routes all mTLS-encrypted traffic directly to the test version only",
      "A <code>VirtualService</code> with a <code>mirror</code> field that duplicates traffic to the new version while serving from stable"
    ],
    answer: 3,
    explanation: "Istio's `VirtualService` supports a `mirror` field that sends a copy of live traffic to a mirrored service. The responses from the mirrored service are discarded, ensuring no impact on end users. This is also known as shadow traffic or dark launching, and it allows testing with real production traffic patterns without risk.\n\nWhy other options are wrong:\n- A: Gateway resources handle ingress traffic entry, not traffic mirroring between service versions\n- B: DestinationRule with ROUND_ROBIN distributes traffic, not mirrors it to a separate version\n- C: PeerAuthentication configures mTLS policies, not traffic routing or mirroring behavior\n\nReference: https://istio.io/latest/docs/tasks/traffic-management/mirroring/",
    verify: "kubectl get virtualservice <name> -o yaml | grep mirror"
  },
  {
    id: "s09-q044",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment with the annotation <code>deployment.kubernetes.io/revision: \"5\"</code> has been updated multiple times. The team wants to roll back to revision 3. Which command achieves this?",
    diagram: null,
    options: [
      "<code>kubectl rollout undo deployment/my-app --to-revision=3</code> to restore the specified revision",
      "<code>kubectl rollout restart deployment/my-app --revision=3</code> to restart at the target revision",
      "<code>kubectl apply -f deployment-v3.yaml --force</code> to overwrite the current running deployment",
      "<code>kubectl set image deployment/my-app --rollback=3</code> to revert to the third image version"
    ],
    answer: 0,
    explanation: "The `kubectl rollout undo deployment/my-app --to-revision=3` command reverts the Deployment to a specific historical revision. Kubernetes stores rollout history (up to the limit set by `revisionHistoryLimit`) as ReplicaSets. The `--to-revision` flag specifies which revision to restore, making it possible to roll back to any previously recorded state.\n\nWhy other options are wrong:\n- B: rollout restart triggers a new rollout by updating the Pod template, not reverting to a specific revision\n- C: kubectl apply --force overwrites with a file, not a specific revision, and requires the old YAML\n- D: kubectl set image --rollback is not a valid command; the rollback flag does not exist on set image\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment",
    verify: "kubectl rollout history deployment/my-app"
  },
  {
    id: "s09-q045",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Kubernetes cluster has three nodes with the following allocatable CPU: node-1 (4 cores), node-2 (8 cores), node-3 (2 cores). A new Pod requests <code>resources.requests.cpu: 3</code>. Which nodes are eligible for scheduling this Pod (ignoring all other constraints)?",
    diagram: null,
    options: [
      "Only node-2, because it has the most available CPU resources among all three cluster nodes",
      "All three nodes, because the scheduler overcommits resources based on the configured limits",
      "None of the nodes, because CPU requests must be specified using millicore unit notation",
      "node-1 and node-2, because both have at least 3 allocatable CPU cores for the Pod request"
    ],
    answer: 3,
    explanation: "The scheduler filters nodes based on whether they have sufficient allocatable resources to satisfy the Pod's requests. Node-1 (4 cores) and node-2 (8 cores) can accommodate a 3 CPU request, while node-3 (2 cores) cannot. CPU requests can be specified as whole numbers or millicores (e.g., `3` is equivalent to `3000m`). The scheduler then scores eligible nodes to select the best fit.\n\nWhy other options are wrong:\n- A: node-2 is not the only eligible node; node-1 also has sufficient CPU (4 cores >= 3 requested)\n- B: The scheduler does not overcommit based on limits; scheduling uses requests for filtering\n- C: CPU requests accept both whole numbers and millicores; 3 is valid notation equivalent to 3000m\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/#kube-scheduler-implementation",
    verify: "kubectl describe node | grep -A5 'Allocatable'"
  },
  {
    id: "s09-q046",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A development team uses a CI/CD pipeline that builds container images, pushes them to a registry, and then directly calls <code>kubectl apply</code> to update Deployments in the production cluster. A senior engineer raises concerns about this approach. What is the primary risk?",
    diagram: null,
    options: [
      "CI/CD pipelines bypass audit trails and allow cluster state to diverge from version-controlled manifests",
      "The <code>kubectl apply</code> command is deprecated and scheduled for removal in upcoming Kubernetes releases",
      "The <code>kubectl apply</code> command does not verify container image signatures before updating Deployments",
      "Push-based deployments add latency because kubectl waits for image pulls on every node before returning"
    ],
    answer: 0,
    explanation: "Directly calling `kubectl apply` from CI/CD pipelines (push-based deployment) requires the pipeline to have cluster credentials, which is a security risk. It also means the cluster state may drift from what is in version control if manual changes are made. GitOps approaches (pull-based, using tools like Argo CD or Flux) mitigate these issues by making Git the single source of truth.\n\nWhy other options are wrong:\n- B: kubectl apply is not deprecated; it remains a core kubectl command in all current versions\n- C: Image signature verification is a supply-chain concern, not the primary risk of push-based deployment itself\n- D: kubectl apply returns once the API server accepts the manifest; it does not wait for image pulls on every node\n\nReference: https://www.gitops.tech/",
    verify: null
  },
  {
    id: "s09-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A headless Service (with <code>clusterIP: None</code>) is created for a StatefulSet named <code>cassandra</code> in the <code>database</code> namespace. The StatefulSet has 3 replicas. Which DNS records does Kubernetes create for this configuration?",
    diagram: null,
    options: [
      "A single A record for the Service that load-balances across Pod IPs via <code>kube-proxy</code> (round-robin) rules",
      "Only SRV records are created for headless Services; A records require extra DNS configuration in CoreDNS",
      "No DNS records are created because headless Services with <code>clusterIP: None</code> opt out of the DNS system",
      "Individual A records for each Pod (by ordinal) plus a Service-level A record returning all Pod IPs"
    ],
    answer: 3,
    explanation: "A headless Service combined with a StatefulSet creates stable DNS entries for each Pod. Each Pod gets a predictable hostname (`<pod-name>.<service-name>.<namespace>.svc.cluster.local`). The Service DNS name itself returns A records for all Pod IPs. This provides stable network identities essential for stateful workloads like databases.\n\nWhy other options are wrong:\n- A: Headless Services do not use kube-proxy or ClusterIP; they return Pod IPs directly in DNS\n- B: Both A records and SRV records are created for headless Services backed by StatefulSets\n- C: Headless Services do participate in DNS; they return A records for all matching Pod IPs\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#srv-records",
    verify: "kubectl exec -it <pod> -- nslookup cassandra.database.svc.cluster.local"
  },
  {
    id: "s09-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator creates a Namespace with the label <code>environment: production</code> and applies a LimitRange that sets default CPU requests to <code>100m</code> and default CPU limits to <code>500m</code>. A developer deploys a Pod in this namespace specifying only <code>resources.requests.cpu: 200m</code> but no limits. What CPU limit is applied to the Pod?",
    diagram: null,
    options: [
      "No CPU limit is applied to the container; the Pod runs without any enforced limit on CPU usage",
      "The CPU limit is automatically set equal to the specified request value of <code>200m</code> to match the request",
      "The LimitRange default limit of <code>500m</code> is applied when the developer does not specify a limit",
      "Pod creation fails because both requests and limits must be explicitly specified under a quota"
    ],
    answer: 2,
    explanation: "A LimitRange injects default values for any resource field not specified by the user. Since the developer specified a CPU request but not a CPU limit, the LimitRange fills in the default limit of `500m`. If neither request nor limit were specified, the LimitRange would inject both defaults. The LimitRange also enforces min/max constraints if configured.\n\nWhy other options are wrong:\n- A: A LimitRange does inject defaults when they are not specified; the Pod would not run without a CPU limit only if a ResourceQuota were also present\n- B: The limit is not set to the request value; the LimitRange default limit is used independently\n- D: Pod creation does not fail because the LimitRange provides the missing limit value automatically\n\nReference: https://kubernetes.io/docs/concepts/policy/limit-range/",
    verify: "kubectl describe limitrange -n <namespace>"
  },
  {
    id: "s09-q049",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A Kubernetes cluster uses a StorageClass with <code>reclaimPolicy: Delete</code>. A developer deletes a PersistentVolumeClaim (PVC) that was bound to a PersistentVolume (PV) dynamically provisioned by this StorageClass. What happens to the PV and the underlying storage?",
    diagram: null,
    options: [
      "The PV transitions to <code>Released</code> state and can be rebound to a new PVC after manual data cleanup",
      "The PV is retained in the cluster but the underlying storage volume is wiped clean by the provisioner",
      "The PV remains bound to the deleted PVC indefinitely until an administrator performs manual cleanup",
      "The PV and its underlying storage are automatically deleted by the provisioner upon PVC deletion"
    ],
    answer: 3,
    explanation: "When a PVC bound to a dynamically provisioned PV is deleted, the `reclaimPolicy` determines what happens. With `Delete`, the PV object and the underlying storage resource (e.g., an AWS EBS volume or GCE PD) are both automatically deleted. This prevents orphaned storage but means data is permanently lost unless backed up.\n\nWhy other options are wrong:\n- A: With Delete policy, the PV does not transition to Released; both PV and storage are deleted\n- B: The PV is not retained with a wipe; the Delete policy removes the PV object entirely\n- C: The PV does not remain bound; the Delete reclaim policy triggers immediate cleanup\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#reclaim-policy",
    verify: "kubectl get storageclass -o jsonpath='{.items[*].reclaimPolicy}'"
  },
  {
    id: "s09-q050",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A DevOps team uses Grafana for visualization and needs to create dashboards that show both Prometheus metrics and Elasticsearch logs in a unified view. Which Grafana feature enables this?",
    diagram: null,
    options: [
      "Grafana Mimir, which converts all telemetry data into a single unified format before visualization",
      "Grafana Alertmanager integration, which unifies data from all sources into a single consolidated alert",
      "Grafana data sources, which allow querying multiple backends (Prometheus, Elasticsearch) in one dashboard",
      "Grafana Agent, which replaces both backends (Prometheus and Elasticsearch) with a unified pipeline"
    ],
    answer: 2,
    explanation: "Grafana supports multiple data sources, allowing a single dashboard to include panels that query different backends. You can have one panel querying Prometheus for metrics and another querying Elasticsearch for logs. Each panel specifies its data source, and Grafana handles the different query languages (PromQL, Lucene, etc.) natively.\n\nWhy other options are wrong:\n- A: Grafana Mimir is a long-term metrics storage backend, not a unified data format converter\n- B: Alertmanager integration handles alerts, not data unification across different backend sources\n- D: Grafana Agent collects telemetry but does not replace Prometheus or Elasticsearch as backends\n\nReference: https://grafana.com/docs/grafana/latest/datasources/",
    verify: null
  },
  {
    id: "s09-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer runs <code>kubectl apply -f deployment.yaml</code> and the Deployment is created. Minutes later, another team member runs <code>kubectl edit deployment my-app</code> and changes the replica count. The next time the first developer runs <code>kubectl apply -f deployment.yaml</code> (which still has the original replica count), what happens to the replica count?",
    diagram: null,
    options: [
      "The replica count stays at the <code>kubectl edit</code> value because <code>kubectl apply</code> performs a three-way merge and the file has not changed",
      "The command fails with a conflict error because the live cluster state differs from the local manifest file that was applied",
      "Kubernetes automatically chooses the higher replica count to avoid disruption to the currently running workload in the cluster",
      "The replica count reverts to the file value because <code>kubectl apply</code> uses a three-way merge of the file, annotation, and live state"
    ],
    answer: 0,
    explanation: "`kubectl apply` performs a three-way strategic-merge-patch between the local file, the `last-applied-configuration` annotation, and the live object. Since the replica count in the file has not changed relative to the last-applied annotation, the three-way diff does not generate a patch for that field. The live value (set by `kubectl edit`) is therefore preserved. Only fields that differ between the current file and the last-applied annotation produce a patch entry. This is why `kubectl apply` is safe to use alongside manual edits — it only overwrites fields that the file author intentionally changed.\n\nWhy other options are wrong:\n- B: kubectl apply does not fail with conflict errors; it performs a three-way merge patch\n- C: Kubernetes does not choose the higher replica count; the three-way diff determines the outcome\n- D: The replica count does not revert because the file value has not changed relative to last-applied\n\nReference: https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/",
    verify: "kubectl get deployment my-app -o jsonpath='{.metadata.annotations.kubectl\\.kubernetes\\.io/last-applied-configuration}'"
  },
  {
    id: "s09-q052",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Kubernetes cluster uses RBAC for access control. A developer has a Role that grants <code>get</code>, <code>list</code>, and <code>watch</code> permissions on Pods in the <code>dev</code> namespace. They attempt to run <code>kubectl exec -it my-pod -- /bin/bash</code> in that namespace but receive a <code>Forbidden</code> error. What additional permission is needed?",
    diagram: null,
    options: [
      "The <code>exec</code> verb on the <code>pods</code> resource in the Role within the <code>dev</code> namespace",
      "The <code>update</code> verb on the <code>pods</code> resource in the Role within the <code>dev</code> namespace",
      "The <code>create</code> verb on the <code>pods/exec</code> subresource in the Role for this namespace",
      "The <code>delete</code> verb on the <code>pods</code> resource in the Role for the <code>dev</code> namespace"
    ],
    answer: 2,
    explanation: "In Kubernetes RBAC, `kubectl exec` creates an exec subresource on the Pod. The required permission is the `create` verb on the `pods/exec` subresource, not a verb on the `pods` resource itself. Similarly, `kubectl port-forward` requires `create` on `pods/portforward`, and `kubectl logs` requires `get` on `pods/log`.\n\nWhy other options are wrong:\n- A: There is no exec verb on pods resource; exec is a subresource requiring create on pods/exec\n- B: The update verb on pods allows modifying Pod specs, not executing commands inside containers\n- D: The delete verb on pods allows deleting Pods, not executing commands inside containers\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i create pods/exec -n dev --as=<user>"
  },
  {
    id: "s09-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team configures a Horizontal Pod Autoscaler (HPA) targeting 70% average CPU utilization for their Deployment with <code>minReplicas: 2</code> and <code>maxReplicas: 10</code>. Current average CPU utilization across 4 replicas is 90%. How does the HPA calculate the desired replica count?",
    diagram: null,
    options: [
      "It doubles the current count (<code>2 * currentReplicas = 2 * 4 = 8</code>) to bring utilization below the threshold",
      "It adds 1 replica at a time in successive reconciliation cycles until utilization drops below the 70% target",
      "It scales to <code>maxReplicas</code> (10) because 90% > 70% triggers a full scale-up to the configured ceiling",
      "It computes <code>ceil(currentReplicas * (currentUtilization / targetUtilization))</code> = <code>ceil(4 * 90/70) = 6</code>"
    ],
    answer: 3,
    explanation: "The HPA uses the formula `desiredReplicas = ceil(currentReplicas * (currentMetricValue / desiredMetricValue))`. With 4 replicas at 90% utilization targeting 70%, this gives `ceil(4 * 90/70) = ceil(5.14) = 6`. The HPA scales to 6 replicas, then re-evaluates. It does not jump to max or add one at a time.\n\nWhy other options are wrong:\n- A: The HPA does not simply double replicas; it uses a specific mathematical formula for scaling\n- B: The HPA does not add 1 replica at a time; it calculates the exact desired count in one step\n- C: The HPA does not immediately jump to maxReplicas; it computes the proportional count needed\n\nReference: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details",
    verify: "kubectl get hpa <name> -o jsonpath='{.status.desiredReplicas}'"
  },
  {
    id: "s09-q054",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "An engineering team instruments their microservices with OpenTelemetry and exports traces to Jaeger. They notice that a particular API endpoint has high latency but cannot identify which downstream service is the bottleneck. Which Jaeger feature helps them most?",
    diagram: null,
    options: [
      "The Jaeger alerting system, which sends notifications to on-call engineers when latency exceeds a threshold",
      "The trace timeline view (Gantt chart), which shows span duration and nesting across services per request",
      "The Jaeger metric aggregator, which computes latency breakdowns (average and percentile) for each service",
      "The Jaeger log correlator, which links structured log entries to specific trace spans for investigation"
    ],
    answer: 1,
    explanation: "Jaeger's trace timeline view displays a Gantt-style chart showing each span's duration, start time, and parent-child relationships across services. This visualization makes it immediately clear which service or operation contributes the most latency to the overall request. It is the primary tool for identifying bottlenecks in distributed traces.\n\nWhy other options are wrong:\n- A: Jaeger does not have a built-in alerting system; alerting is handled by tools like Prometheus\n- C: Jaeger does not aggregate metrics; it focuses on trace storage, query, and visualization\n- D: Jaeger does not have a native log correlator; log correlation requires external integration\n\nReference: https://www.jaegertracing.io/docs/latest/frontend-ui/",
    verify: null
  },
  {
    id: "s09-q055",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team deploys a Service mesh using Envoy sidecars injected into every Pod. They notice that inter-service latency has increased by 2-5ms per hop. What is the most likely explanation for this latency increase?",
    diagram: null,
    options: [
      "Each request is proxied through the Envoy sidecar, adding overhead for TLS, routing, and telemetry",
      "Envoy replaces kube-proxy iptables rules, causing slower network packet processing on each node",
      "Envoy sidecars consume all available CPU on the node, starving the application containers of resources",
      "The service mesh disables connection reuse, forcing new handshakes, slow starts, and teardowns per request"
    ],
    answer: 0,
    explanation: "Envoy sidecar proxies intercept both inbound and outbound traffic for each Pod. Each hop involves the source Pod's Envoy (egress), network transit, and the destination Pod's Envoy (ingress). The proxy adds latency for TLS handshakes, header parsing, load balancing decisions, and metrics collection. This 2-5ms overhead per hop is typical and is the trade-off for the features a service mesh provides.\n\nWhy other options are wrong:\n- B: Envoy does not replace kube-proxy; both operate independently in a service mesh deployment\n- C: Sidecars have resource limits and do not consume all CPU; 2-5ms overhead is from proxying, not starvation\n- D: Service meshes support connection pooling and reuse; they do not disable TCP connection reuse\n\nReference: https://istio.io/latest/docs/ops/deployment/performance-and-scalability/",
    verify: null
  },
  {
    id: "s09-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster administrator runs <code>kubectl get componentstatuses</code> (deprecated) and sees that the scheduler component shows as <code>Unhealthy</code>. Which impact does a non-functioning kube-scheduler have on the cluster?",
    diagram: null,
    options: [
      "Existing running Pods are immediately terminated because the scheduler manages their full lifecycle",
      "The <code>kube-apiserver</code> stops accepting new Pod creation requests until the scheduler recovers fully",
      "All Services lose their ClusterIP addresses because the scheduler is responsible for allocating them",
      "New Pods remain <code>Pending</code> with no node assignment, but existing running Pods continue unaffected"
    ],
    answer: 3,
    explanation: "The kube-scheduler is responsible only for assigning Pods to nodes. If it is unavailable, newly created Pods that do not specify a `nodeName` remain in `Pending` state. Existing Pods that are already running on nodes are managed by the kubelet and are not affected. The API server continues to accept requests normally.\n\nWhy other options are wrong:\n- A: Existing running Pods are managed by the kubelet and are not terminated when the scheduler is down\n- B: The API server continues accepting requests normally; scheduler unavailability does not block the API\n- C: ClusterIP addresses are allocated by the API server, not the scheduler\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
    verify: "kubectl get pods --field-selector status.phase=Pending"
  },
  {
    id: "s09-q057",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team practices infrastructure as code (IaC) and stores all Kubernetes manifests in a Git repository. They want to ensure that any manual change made to the cluster (e.g., via <code>kubectl edit</code>) is detected and reverted automatically. Which approach achieves this?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="70" width="90" height="50" rx="8" fill="#2196F3" stroke="#1565C0" stroke-width="2"/><text x="55" y="100" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Git Repo</text><rect x="155" y="70" width="90" height="50" rx="8" fill="#FF9800" stroke="#E65100" stroke-width="2"/><text x="200" y="100" text-anchor="middle" fill="white" font-size="10" font-weight="bold">???</text><rect x="300" y="70" width="90" height="50" rx="8" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/><text x="345" y="100" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Cluster</text><line x1="100" y1="95" x2="153" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow9d)"/><line x1="245" y1="85" x2="298" y2="85" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow9d)"/><line x1="298" y1="105" x2="245" y2="105" stroke="#F44336" stroke-width="2" marker-end="url(#arrow9e)"/><text x="270" y="75" fill="#4CAF50" font-size="9">?</text><text x="270" y="125" fill="#F44336" font-size="9">?</text><text x="200" y="160" text-anchor="middle" fill="#333" font-size="10" font-style="italic">How to detect and revert manual changes?</text><defs><marker id="arrow9d" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="arrow9e" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#F44336"/></marker></defs></svg>',
    options: [
      "Use a CronJob that periodically runs <code>kubectl apply</code> (or similar) against manifests in the Git repository",
      "Deploy a GitOps controller (Argo CD or Flux) with automated sync and self-healing to reconcile drift",
      "Configure RBAC to prevent all manual changes by removing edit permissions from every cluster user",
      "Set all Kubernetes resources to immutable using finalizers to block any modifications after creation"
    ],
    answer: 1,
    explanation: "GitOps controllers like Argo CD (with auto-sync and self-heal) or Flux continuously compare the desired state in Git with the actual state in the cluster. When drift is detected (e.g., from a manual `kubectl edit`), the controller automatically reverts the change to match the Git-defined state. This provides a reliable drift detection and remediation mechanism.\n\nWhy other options are wrong:\n- A: A CronJob running kubectl apply is fragile, lacks drift detection, and is not a proper reconciliation loop\n- C: Removing all edit permissions is impractical and does not detect or revert drift from other sources\n- D: Finalizers prevent deletion but do not make resources immutable or block modifications\n\nReference: https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/#automatic-self-healing",
    verify: null
  },
  {
    id: "s09-q058",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster has nodes in three availability zones: <code>zone-a</code>, <code>zone-b</code>, and <code>zone-c</code>. A Deployment with 6 replicas needs Pods spread evenly across zones. Which Kubernetes feature achieves this?",
    diagram: null,
    options: [
      "Pod affinity rules to co-locate replicas using <code>topologyKey: topology.kubernetes.io/zone</code> within each zone",
      "Topology spread constraints with <code>maxSkew: 1</code> and <code>topologyKey: topology.kubernetes.io/zone</code> in the Pod spec",
      "Node affinity rules that prefer nodes in each availability zone equally using weighted preferences",
      "Setting <code>replicas: 2</code> in three separate Deployments, with one Deployment targeted to each availability zone"
    ],
    answer: 1,
    explanation: "Topology spread constraints allow you to control how Pods are distributed across topology domains (like zones or nodes). Setting `maxSkew: 1` with `topologyKey: topology.kubernetes.io/zone` ensures that the difference in Pod count between any two zones is at most 1, resulting in 2 Pods per zone for 6 replicas across 3 zones.\n\nWhy other options are wrong:\n- A: Pod affinity co-locates Pods together, which is the opposite of spreading them across zones\n- C: Node affinity with preferred weights is a soft constraint and does not guarantee even distribution\n- D: Three separate Deployments add management overhead and break the single-Deployment abstraction\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    verify: "kubectl get pods -o wide --sort-by='{.spec.nodeName}'"
  },
  {
    id: "s09-q059",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "An operations team notices that a container keeps getting OOM-killed despite the application process using only 500MB of memory. The container has a 2GB memory limit and uses an <code>emptyDir</code> with <code>medium: Memory</code>. What explains the OOM kills?",
    diagram: null,
    options: [
      "Memory-backed <code>emptyDir</code> volumes count against the Pod's memory budget, and the kernel OOM killer will terminate the container",
      "Memory limits apply to the main process only; tmpfs-backed mounts are tracked separately by the node eviction manager",
      "The <code>tmpfs</code> mount is charged to the node's system-reserved allocation rather than the container's cgroup memory limit",
      "Memory-backed <code>emptyDir</code> volumes count against Pod-level overhead, not the container limit, inflating node-level metrics"
    ],
    answer: 0,
    explanation: "When `emptyDir` uses `medium: Memory`, data is stored in a `tmpfs` filesystem that consumes RAM. This memory usage is charged to the Pod's cgroup and counts toward the Pod's overall memory budget (which, for a single-container Pod, equals the container's memory limit). Even though the application process itself uses only 500MB, if the tmpfs-backed emptyDir consumes enough data to push the combined total past 2GB, the kernel's OOM killer terminates the container.\n\nWhy other options are wrong:\n- B: tmpfs-backed emptyDir memory is charged to the same cgroup as the container process, not tracked separately; the node eviction manager does not handle them independently\n- C: tmpfs memory is charged to the container's cgroup memory limit, not to the node's system-reserved allocation\n- D: tmpfs memory counts against the container's cgroup limit, not a separate Pod-level overhead\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl describe pod <pod-name> | grep -A3 'Last State'"
  },
  {
    id: "s09-q060",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team creates an Ingress resource with TLS termination. The Ingress references a Secret of type <code>kubernetes.io/tls</code> containing <code>tls.crt</code> and <code>tls.key</code>. Users report certificate warnings when accessing the site via HTTPS. Which of the following is the most likely cause?",
    diagram: null,
    options: [
      "The Ingress controller does not support TLS termination and requires an external load balancer for HTTPS traffic",
      "Kubernetes Secrets cannot store TLS certificates or private keys that are larger than 1KB in total encoded size",
      "The certificate in the Secret does not match the hostname in <code>tls.hosts</code>, causing a hostname mismatch error",
      "The Ingress resource requires a separate <code>CertificateSigningRequest</code> object to enable TLS for the hostname"
    ],
    answer: 2,
    explanation: "Certificate warnings typically occur when the common name (CN) or Subject Alternative Name (SAN) in the TLS certificate does not match the hostname the client is connecting to. If the `tls.hosts` field in the Ingress lists `app.example.com` but the certificate is issued for `*.other.com`, browsers display a warning. The Secret format itself is correct if it contains valid `tls.crt` and `tls.key` entries.\n\nWhy other options are wrong:\n- A: Standard Ingress controllers (NGINX, Traefik) support TLS termination natively\n- B: Kubernetes Secrets have a 1MB size limit, far larger than typical TLS certificates\n- D: CertificateSigningRequest is for in-cluster CA signing, not required for Ingress TLS configuration\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#tls",
    verify: "kubectl get secret <tls-secret> -o jsonpath='{.data.tls\\.crt}' | base64 -d | openssl x509 -noout -subject -dates"
  },
  {
    id: "s09-q061",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Prometheus instance is configured with a <code>scrape_interval</code> of 15 seconds and a <code>scrape_timeout</code> of 10 seconds. One target consistently takes 12 seconds to respond to scrape requests. What is the impact on Prometheus metrics collection for this target?",
    diagram: null,
    options: [
      "Prometheus waits the full 12 seconds and collects the metrics since the response is within <code>scrape_interval</code>",
      "Prometheus automatically increases the timeout for targets that consistently respond slowly to scrapes",
      "The scrape fails because the 12-second response exceeds the 10-second <code>scrape_timeout</code> and <code>up</code> reads 0",
      "The target is dropped from the scrape configuration because three consecutive timeouts trigger its removal"
    ],
    answer: 2,
    explanation: "When a scrape target's response time exceeds the configured `scrape_timeout`, Prometheus records the scrape as failed. The `up` metric for this target is set to `0`, indicating the target is unreachable. Prometheus does not auto-adjust timeouts. The solution is either to optimize the target's `/metrics` endpoint or increase the `scrape_timeout` in the Prometheus configuration.\n\nWhy other options are wrong:\n- A: Prometheus does not wait beyond scrape_timeout; the scrape is aborted and marked as failed\n- B: Prometheus does not auto-adjust timeouts; configuration changes must be made manually\n- D: Prometheus does not drop targets from config after timeouts; they remain and are retried each interval\n\nReference: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config",
    verify: null
  },
  {
    id: "s09-q062",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "An engineer deploys a new Pod and it enters <code>ImagePullBackOff</code> state. Running <code>kubectl describe pod</code> shows the event: <code>Failed to pull image \"registry.internal.com/app:v2.0\": rpc error: code = Unknown desc = Error response from daemon: unauthorized</code>. What is the most likely fix?",
    diagram: null,
    options: [
      "Create or update an <code>imagePullSecret</code> in the namespace and reference it in the Pod spec or ServiceAccount",
      "Recreate the Pod with <code>hostNetwork: true</code> to allow direct network access to the private registry endpoint",
      "Change the image tag from <code>v2.0</code> to <code>latest</code> since private registries may not retain older tagged images",
      "Add the registry URL to the CoreDNS configuration as a custom upstream resolver for registry lookups"
    ],
    answer: 0,
    explanation: "The `unauthorized` error indicates that the container runtime cannot authenticate to the private registry. Kubernetes uses `imagePullSecrets` (Secrets of type `kubernetes.io/dockerconfigjson`) to provide registry credentials. These can be referenced directly in the Pod spec or attached to the default ServiceAccount in the namespace for automatic injection.\n\nWhy other options are wrong:\n- B: hostNetwork does not solve authentication issues; it changes network namespace, not registry credentials\n- C: Private registries serve any valid tag; the latest tag is not special for authentication purposes\n- D: CoreDNS configuration is for DNS resolution, not registry authentication or authorization\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/",
    verify: "kubectl get secret -n <namespace> --field-selector type=kubernetes.io/dockerconfigjson"
  },
  {
    id: "s09-q063",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Kubernetes cluster runs version 1.28. A developer creates a Pod using the <code>apps/v1</code> API group for a Deployment and the <code>v1</code> API group for a ConfigMap. What determines which API group and version is used for a particular resource?",
    diagram: null,
    options: [
      "The developer can select from multiple compatible API groups for each resource type during manifest creation",
      "The API group used for each resource is determined by the namespace in which the resource is being created",
      "All resources default to the <code>v1</code> API group and other API groups are deprecated in recent Kubernetes versions",
      "Each resource type belongs to a specific API group, and the API server only accepts the correct group"
    ],
    answer: 3,
    explanation: "Each Kubernetes resource type is defined in a specific API group. For example, Deployments belong to `apps/v1`, ConfigMaps to `v1` (core group), and NetworkPolicies to `networking.k8s.io/v1`. The API server validates that the resource type matches its expected API group and version, rejecting requests that use incorrect combinations.\n\nWhy other options are wrong:\n- A: Developers cannot freely choose API groups; each resource type has a fixed API group assignment\n- B: The API group is determined by the resource type definition, not the namespace of the resource\n- C: Not all resources use v1; many resources use other API groups like apps/v1, batch/v1, etc.\n\nReference: https://kubernetes.io/docs/concepts/overview/kubernetes-api/#api-groups-and-versioning",
    verify: "kubectl api-resources --sort-by=name | head -20"
  },
  {
    id: "s09-q064",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team migrates from a monolithic REST API to microservices. They need a communication pattern where a service publishes events that multiple consumer services can process independently and asynchronously. Which pattern is most appropriate?",
    diagram: null,
    options: [
      "Synchronous HTTP request-response between all services with retry logic built into each caller",
      "Event-driven architecture using a message broker (NATS, Kafka, or RabbitMQ) with publish-subscribe",
      "Shared database tables where each consumer service polls for inserts, updates, and deletes on a timer",
      "gRPC bidirectional streaming (client and server) configured between each producer and consumer service"
    ],
    answer: 1,
    explanation: "The publish-subscribe pattern using a message broker decouples producers from consumers. A service publishes events to a topic, and multiple independent consumers subscribe to process those events asynchronously. This enables loose coupling, independent scaling, and fault isolation. NATS and Kafka are popular CNCF-adjacent choices for this pattern in cloud-native architectures.\n\nWhy other options are wrong:\n- A: Synchronous HTTP request-response creates tight coupling and does not support fan-out to multiple consumers\n- C: Shared database polling creates tight coupling, does not scale well, and introduces polling latency\n- D: gRPC bidirectional streaming requires point-to-point connections, not publish-subscribe fan-out\n\nReference: https://www.cncf.io/projects/nats/",
    verify: null
  },
  {
    id: "s09-q065",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a Deployment with <code>revisionHistoryLimit: 3</code>. After performing 7 rolling updates, how many old ReplicaSets are retained in the cluster?",
    diagram: null,
    options: [
      "3 old ReplicaSets are retained as specified by <code>revisionHistoryLimit</code>, plus the current active ReplicaSet",
      "0 old ReplicaSets, because Kubernetes automatically cleans up all inactive ReplicaSets after updates",
      "7 old ReplicaSets are retained because <code>revisionHistoryLimit</code> caps ReplicaSets older than 30 days",
      "1 old ReplicaSet is retained, representing only the immediately previous version of the Deployment"
    ],
    answer: 0,
    explanation: "The `revisionHistoryLimit` field controls how many old ReplicaSets (with 0 replicas) are kept for rollback purposes. With a limit of 3, Kubernetes retains the 3 most recent old ReplicaSets plus the current active one. Older ReplicaSets beyond the limit are garbage collected. This allows rolling back to any of the last 3 revisions.\n\nWhy other options are wrong:\n- B: Kubernetes does not clean up all inactive ReplicaSets; it retains them up to revisionHistoryLimit\n- C: revisionHistoryLimit does not use an age-based cap; it always retains exactly the specified number of old ReplicaSets\n- D: More than 1 old ReplicaSet is retained; the limit of 3 means the 3 most recent old ones are kept\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#revision-history-limit",
    verify: "kubectl get replicaset -l app=<deployment-name>"
  },
  {
    id: "s09-q066",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Pod spec includes <code>automountServiceAccountToken: false</code>. What is the effect of this setting?",
    diagram: null,
    options: [
      "The Pod cannot communicate with any other Pods in the cluster due to missing authentication credentials",
      "The Pod uses the default ServiceAccount but with read-only permissions limiting its API server access",
      "The Pod is prevented from pulling images from any private container registries that require credentials",
      "The ServiceAccount token is not mounted, preventing automatic API server authentication for the Pod"
    ],
    answer: 3,
    explanation: "Setting `automountServiceAccountToken: false` prevents Kubernetes from automatically mounting the ServiceAccount's API token into the container. Without this token, processes inside the container cannot authenticate to the kube-apiserver using the ServiceAccount identity. This is a security hardening measure for Pods that do not need to interact with the Kubernetes API.\n\nWhy other options are wrong:\n- A: Pod-to-Pod communication uses the CNI network, not ServiceAccount tokens; it is unaffected\n- B: The ServiceAccount is still associated; its token is simply not mounted as a volume in the Pod\n- C: imagePullSecrets are configured separately on the ServiceAccount and are not affected by this setting\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting",
    verify: "kubectl exec <pod-name> -- ls /var/run/secrets/kubernetes.io/serviceaccount/ 2>&1"
  },
  {
    id: "s09-q067",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The kubelet on a worker node cannot reach the kube-apiserver due to a network partition. What happens to the Pods running on that node?",
    diagram: null,
    options: [
      "Pods keep running, the node is marked <code>NotReady</code>, and the control plane begins evicting Pods after timeout",
      "The kubelet restarts all Pods on the node, clears their caches, and reattempts connection to the API server",
      "All Pods on the node are immediately terminated by the container runtime when the network partition occurs",
      "The Pods are instantly marked <code>Failed</code> and rescheduled to other available nodes without any termination delay"
    ],
    answer: 0,
    explanation: "When the kubelet loses contact with the API server, existing Pods keep running because the container runtime operates independently. However, the node's Lease object is not renewed, and the node controller marks the node as `NotReady` (Ready condition becomes `Unknown`). The `node.kubernetes.io/unreachable:NoExecute` taint is applied, and after the configured toleration period (default 5 minutes), the control plane starts evicting Pods from the unreachable node.\n\nWhy other options are wrong:\n- B: The kubelet does not restart Pods to reconnect to the API server; Pods continue running\n- C: Pods are not immediately terminated; the container runtime operates independently of the API connection\n- D: Pods are not instantly marked Failed or rescheduled; there is a toleration timeout (default 300s) before eviction begins\n\nReference: https://kubernetes.io/docs/concepts/architecture/nodes/#node-status",
    verify: "kubectl get node <node-name> -o jsonpath='{.status.conditions[?(@.type==\"Ready\")].status}'"
  },
  {
    id: "s09-q068",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team implements a canary deployment by running 1 canary Pod alongside 9 stable Pods behind the same Service. They notice that the canary receives approximately 10% of traffic, which is expected. After monitoring for 30 minutes with no errors, they want to gradually increase canary traffic to 50% without changing the number of Pods. Which approach allows this?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="130" y="5" width="140" height="40" rx="8" fill="#7B1FA2" stroke="#4A148C" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Traffic Router</text><rect x="20" y="80" width="160" height="50" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="100" y="100" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Stable (v1) - 9 Pods</text><rect x="220" y="80" width="160" height="50" rx="8" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="300" y="100" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Canary (v2) - 1 Pod</text><line x1="170" y1="45" x2="100" y2="78" stroke="#1565C0" stroke-width="2" marker-end="url(#arrow9f)"/><line x1="230" y1="45" x2="300" y2="78" stroke="#F57F17" stroke-width="2" marker-end="url(#arrow9f)"/><text x="120" y="65" fill="#1565C0" font-size="10">?%</text><text x="265" y="65" fill="#F57F17" font-size="10">?%</text><defs><marker id="arrow9f" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Scale the canary Deployment to 9 replicas to achieve an even 50/50 Pod ratio behind the shared Service",
      "Use a service mesh or Ingress controller with weighted routing to send 50% of traffic to the canary",
      "Modify the Kubernetes Service to use <code>sessionAffinity: ClientIP</code> with a 50% hash ring traffic split",
      "Create two separate Services and configure DNS-based round-robin load balancing between them both"
    ],
    answer: 1,
    explanation: "Kubernetes Services distribute traffic roughly proportionally to the number of endpoints. To decouple traffic percentage from Pod count, you need a service mesh (Istio VirtualService with weight-based routing) or a smart Ingress controller (like NGINX with canary annotations). These tools allow precise traffic splitting such as sending 50% to the canary Pod regardless of replica count.\n\nWhy other options are wrong:\n- A: Scaling changes the Pod count and traffic proportionally, not independently of replica count\n- C: sessionAffinity does not support percentage-based traffic splitting between service versions\n- D: DNS-based round-robin cannot provide fine-grained percentage-based traffic control\n\nReference: https://istio.io/latest/docs/concepts/traffic-management/#routing-rules",
    verify: null
  },
  {
    id: "s09-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses <code>kubectl create secret generic db-creds --from-literal=password=MyS3cret</code> to create a Secret. They later inspect the Secret with <code>kubectl get secret db-creds -o yaml</code> and see the value <code>TXlTM2NyZXQ=</code>. Is the password securely encrypted?",
    diagram: null,
    options: [
      "Yes, Kubernetes encrypts all Secret values using AES-256 (symmetric encryption) before storing them in etcd",
      "Yes, the Secret is encrypted using the cluster's built-in PKI infrastructure managed by the cluster CA",
      "No, the value is only base64-encoded (not encrypted); encryption at rest must be configured separately",
      "No, the value is hashed with a one-way function; the original password cannot be recovered from it"
    ],
    answer: 2,
    explanation: "Kubernetes Secrets are stored as base64-encoded strings by default, which is an encoding scheme, not encryption. Anyone with read access to Secrets can decode the value with `echo TXlTM2NyZXQ= | base64 -d`. For actual encryption, administrators must enable encryption at rest via an `EncryptionConfiguration` on the API server or use an external secrets manager.\n\nWhy other options are wrong:\n- A: Kubernetes does not automatically encrypt Secrets with AES-256; encryption at rest must be configured\n- B: Secrets are not encrypted with PKI; they are base64-encoded, which is reversible encoding\n- D: The value is not hashed; base64 is a reversible encoding, and the original value can be easily decoded\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#risks",
    verify: "kubectl get secret db-creds -o jsonpath='{.data.password}' | base64 -d"
  },
  {
    id: "s09-q070",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After upgrading a Deployment's container image, all new Pods are stuck in <code>Pending</code> state. Running <code>kubectl describe pod</code> shows: <code>0/3 nodes are available: 3 Insufficient cpu</code>. The existing Pods from the old ReplicaSet are still running. What is happening?",
    diagram: null,
    options: [
      "The new container image requires a different CPU architecture than the cluster's <code>amd64</code> worker nodes support",
      "The cluster has run out of available IP addresses in the Pod CIDR range configured for the cluster network",
      "The new Pod spec requests more CPU than is available, and <code>maxUnavailable: 0</code> prevents old Pod termination",
      "The kube-scheduler is not running and therefore cannot assign any new Pods to the available cluster nodes"
    ],
    answer: 2,
    explanation: "With `maxUnavailable: 0` in the rolling update strategy, old Pods are not terminated until new Pods are ready. If the new Pod spec requests more CPU than the cluster has available (because the old Pods still occupy resources), the new Pods cannot be scheduled, creating a deadlock. The fix is to either reduce the CPU request, add node capacity, or temporarily set `maxUnavailable` to a non-zero value.\n\nWhy other options are wrong:\n- A: CPU architecture mismatch would cause a different error, not Insufficient cpu scheduling failure\n- B: IP address exhaustion would show a different error message, not Insufficient cpu\n- D: If the scheduler were not running, the error would be different and affect all Pods, not just new ones\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl describe deployment <name> | grep -E 'Replicas|RollingUpdateStrategy'"
  },
  {
    id: "s09-q071",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An application team creates an <code>ExternalName</code> Service pointing to <code>db.legacy-datacenter.example.com</code>. A Pod resolves this Service name and attempts to connect. What does Kubernetes return for a DNS lookup of this Service?",
    diagram: null,
    options: [
      "The <code>ClusterIP</code> address of the Service, which kube-proxy then forwards to the external hostname",
      "An A record containing the pre-resolved IP address of the external hostname as cached by CoreDNS",
      "A CNAME record pointing to <code>db.legacy-datacenter.example.com</code>, which the client resolver then follows",
      "ExternalName Services add latency to external hostname resolution by routing through kube-proxy"
    ],
    answer: 2,
    explanation: "An ExternalName Service creates a CNAME DNS record that maps the Service name to the specified external hostname. When a Pod queries the Service DNS name, CoreDNS returns a CNAME record. The client (or resolver) then follows the CNAME to resolve the actual IP address. No proxying or ClusterIP is involved.\n\nWhy other options are wrong:\n- A: ExternalName Services have no ClusterIP; they do not use kube-proxy for forwarding\n- B: ExternalName returns a CNAME record, not a pre-resolved A record; the client resolves the CNAME\n- D: ExternalName Services do not route through kube-proxy; they return CNAME records directly via DNS\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#externalname",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.type}'"
  },
  {
    id: "s09-q072",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A security team wants to scan container images for known vulnerabilities before they are deployed to the Kubernetes cluster. They need a cloud-native open-source solution that integrates with their existing CI/CD pipeline and container registry. Which project should they consider?",
    diagram: null,
    options: [
      "Falco, which detects runtime threats, anomalous syscalls, and policy violations in running containers",
      "Trivy, which scans container images, filesystems, and Git repos for vulnerabilities and misconfigurations",
      "OPA Gatekeeper, which enforces admission control policies on Kubernetes resources during API requests",
      "cert-manager, which automates the management and renewal of TLS certificates for cluster workloads"
    ],
    answer: 1,
    explanation: "Trivy (by Aqua Security) is a widely adopted open-source vulnerability scanner that can scan container images, filesystems, and IaC files. It integrates easily into CI/CD pipelines and can be used as a registry scanning tool. Falco focuses on runtime threat detection, OPA Gatekeeper on policy enforcement, and cert-manager on certificate management.\n\nWhy other options are wrong:\n- A: Falco detects runtime threats in running containers, not pre-deployment image vulnerabilities\n- C: OPA Gatekeeper enforces admission policies on Kubernetes resources, not image vulnerability scanning\n- D: cert-manager manages TLS certificates, not container image security scanning\n\nReference: https://trivy.dev/latest/",
    verify: null
  },
  {
    id: "s09-q073",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A developer creates a PersistentVolumeClaim requesting <code>10Gi</code> of storage with <code>accessModes: [ReadWriteMany]</code>. The only available StorageClass provisions AWS EBS volumes. What happens?",
    diagram: null,
    options: [
      "The PVC is bound to a 10Gi EBS volume because EBS natively supports <code>ReadWriteMany</code> access mode across nodes",
      "The provisioner automatically creates an NFS share on top of the <code>EBS</code> volume for <code>ReadWriteMany</code> access",
      "The PVC is created with <code>ReadWriteOnce</code> mode, silently downgrading from the requested access mode setting",
      "The PVC stays <code>Pending</code> because EBS volumes only support <code>ReadWriteOnce</code> and cannot satisfy <code>ReadWriteMany</code>"
    ],
    answer: 3,
    explanation: "AWS EBS volumes are block storage devices that can only be attached to a single EC2 instance at a time, supporting only `ReadWriteOnce` (RWO) access mode. A PVC requesting `ReadWriteMany` (RWX) cannot be satisfied by an EBS-backed StorageClass. The PVC stays `Pending` until a compatible volume (such as EFS or an NFS provisioner) becomes available.\n\nWhy other options are wrong:\n- A: EBS volumes only support ReadWriteOnce; they cannot provide ReadWriteMany access mode\n- B: The provisioner does not automatically create NFS on top of EBS; these are separate storage types\n- C: The PVC is not silently downgraded; it stays Pending because the access mode cannot be satisfied\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: "kubectl get pvc -o wide"
  },
  {
    id: "s09-q074",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team uses an init container to pre-populate a shared volume with configuration data before the main application container starts. The init container exits with code 0, but the main container fails to find the expected files. What is the most likely issue?",
    diagram: null,
    options: [
      "Init containers write data to a temporary staging area that is not accessible by the main container without explicit binding",
      "The init and main containers mount different volumes or <code>mountPath</code> values, so files are written to one path and read from another",
      "Init container data is automatically cleared from the <code>emptyDir</code> volume when the main container starts to ensure a clean state",
      "The init container exited before its filesystem writes were flushed to the volume, so the data was lost during container handoff"
    ],
    answer: 1,
    explanation: "Init containers and main containers can share volumes, but they must reference the same volume name and the paths must align. If the init container writes to a volume mounted at `/data` but the main container mounts a different volume (or the same volume at a different path), the files will not be found. Verifying that both containers reference the same `volumeMounts` entry is key.\n\nWhy other options are wrong:\n- A: Init containers share volumes directly with the main container through standard volumeMounts; there is no separate staging area requiring special binding\n- C: The kubelet does not clear emptyDir or other volume data between init and main containers; volumes persist across container transitions\n- D: Filesystem writes are flushed before the container process exits; exit code 0 confirms the init container completed successfully\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.initContainers[*].volumeMounts}'"
  },
  {
    id: "s09-q075",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod has a <code>PriorityClass</code> with a value of 1000000, while most other Pods in the cluster use the default priority of 0. When the cluster is at full capacity and this high-priority Pod is submitted, what does the scheduler do?",
    diagram: null,
    options: [
      "The Pod is placed in a pending queue and waits for existing capacity to free up naturally through eviction",
      "The scheduler preempts lower-priority Pods to make room for the high-priority Pod on a suitable node",
      "The Pod is rejected by the API server because the cluster currently has no available compute resources",
      "The scheduler splits the Pod's resource requests across multiple nodes using distributed scheduling"
    ],
    answer: 1,
    explanation: "When a high-priority Pod cannot be scheduled due to resource constraints, the scheduler identifies lower-priority Pods whose eviction would free enough resources. Those Pods are preempted (sent a termination signal), and once their resources are released, the high-priority Pod is scheduled. This is Kubernetes' priority-based preemption mechanism, controlled by PriorityClasses.\n\nWhy other options are wrong:\n- A: The high-priority Pod does not wait passively; the scheduler actively preempts lower-priority Pods\n- C: The API server accepts the Pod creation; scheduling constraints cause Pending, not rejection\n- D: Kubernetes does not split Pod resource requests across multiple nodes; Pods run on a single node\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/",
    verify: "kubectl get priorityclass"
  },
  {
    id: "s09-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer defines a Pod with two containers that both try to bind to port 8080. The Pod is created but one container enters a <code>CrashLoopBackOff</code> state. Why does this happen?",
    diagram: null,
    options: [
      "Kubernetes randomly selects which container gets the port binding and immediately terminates the other container",
      "Containers in the same Pod share a network namespace, so the second container fails to bind to the used port",
      "Each container in a Pod gets its own IP address and network namespace, so port conflicts are not possible",
      "The kube-proxy detects the port conflict at runtime and automatically reassigns one container to a free port"
    ],
    answer: 1,
    explanation: "All containers in a Pod share the same network namespace, meaning they share the same IP address and port space. If two containers attempt to listen on the same port, the second one fails with a \"port already in use\" error and crashes. This is why containers within a Pod must use different ports.\n\nWhy other options are wrong:\n- A: Kubernetes does not randomly select port bindings; the first container to bind succeeds, second fails\n- C: Containers in the same Pod share one IP and network namespace; they do not get separate IPs\n- D: kube-proxy does not detect or resolve port conflicts within a Pod; it handles Service routing only\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/#pod-networking",
    verify: "kubectl logs <pod-name> -c <container-name>"
  },
  {
    id: "s09-q077",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster uses Calico as the CNI plugin with <code>NetworkPolicy</code> enforcement enabled. A developer creates a Pod in the <code>app</code> namespace but does not create any NetworkPolicies in that namespace. What is the default network behavior for that Pod?",
    diagram: null,
    options: [
      "All ingress and egress traffic is denied by default until the CNI plugin with NetworkPolicy support completes its initialization",
      "Egress traffic is allowed by default; all ingress traffic requires an explicit NetworkPolicy to be permitted in the namespace",
      "The Pod can only communicate with other Pods in the same namespace because cross-namespace traffic is blocked by default",
      "All traffic is allowed because no NetworkPolicy selects this Pod; Kubernetes follows a default-allow model until a policy applies"
    ],
    answer: 3,
    explanation: "Kubernetes uses a default-allow networking model. If no NetworkPolicy selects a Pod, all ingress and egress traffic to and from that Pod is permitted. Network isolation only begins when at least one NetworkPolicy selects the Pod. At that point, only traffic explicitly allowed by the policy rules is permitted; all other traffic matching the policy type is denied.\n\nWhy other options are wrong:\n- A: Installing a CNI with NetworkPolicy support does not enable default-deny; explicit policies are needed\n- B: Both ingress and egress are allowed by default; there is no ingress-only default restriction\n- C: Cross-namespace traffic is allowed by default; namespace boundaries do not block network traffic\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#default-policies",
    verify: "kubectl get networkpolicy -n app"
  },
  {
    id: "s09-q078",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A company is designing a new cloud-native platform and debates between using a monolithic API gateway versus a service mesh for managing inter-service communication. For a microservices architecture with 50+ services requiring mutual TLS, retries, and circuit breaking, which approach is more suitable and why?",
    diagram: null,
    options: [
      "A monolithic API gateway, because it provides a single control point for all traffic policies and is simpler to manage across services",
      "A service mesh, because it embeds mTLS, retries, and circuit breaking into sidecar proxies without requiring application code changes",
      "Neither; mTLS, retries, and circuit breaking should be implemented directly in each microservice's code for maximum control",
      "A DNS-based load balancer, because it natively supports mTLS and retry logic at the DNS resolution layer for all service traffic"
    ],
    answer: 1,
    explanation: "A service mesh is designed for managing east-west (service-to-service) communication in microservices architectures. It deploys sidecar proxies alongside each service to transparently handle mTLS, retries, circuit breaking, and observability. An API gateway is better suited for north-south (client-to-cluster) traffic. For 50+ services, a mesh scales better than routing all internal traffic through a centralized gateway.\n\nWhy other options are wrong:\n- A: A monolithic gateway becomes a bottleneck for 50+ services and is designed for north-south traffic\n- C: Implementing features in each service creates code duplication and inconsistent enforcement\n- D: DNS-based load balancers do not natively support mTLS, retries, or circuit breaking at the DNS layer\n\nReference: https://istio.io/latest/docs/concepts/what-is-istio/",
    verify: null
  },
  {
    id: "s09-q079",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A platform team wants to implement structured logging across all microservices in their Kubernetes cluster. Currently, some services log in JSON format while others use unstructured plain text. They use Fluentd to collect and parse logs. What is the primary benefit of standardizing on JSON-formatted structured logs?",
    diagram: null,
    options: [
      "Structured JSON logs consume less storage space than plain text log formats due to their compact encoding",
      "Fluentd requires custom Lua scripts to parse plain text log formats, making it impractical at scale",
      "Structured JSON logs enable consistent parsing and querying in log aggregation systems without custom regex",
      "Elasticsearch indexes JSON logs natively but requires additional ingest pipelines for non-JSON formats"
    ],
    answer: 2,
    explanation: "Structured JSON logs provide key-value pairs that log aggregation systems can parse automatically and consistently. This enables reliable filtering (e.g., by severity, request ID, or user) and indexing without custom regex patterns per service. While Fluentd can parse various formats, inconsistent unstructured logs require per-service parser configurations that are fragile and hard to maintain.\n\nWhy other options are wrong:\n- A: JSON is typically larger than plain text due to key names; it does not save storage space\n- B: Fluentd parses plain text via built-in parser plugins, not Lua scripts; it works well at scale\n- D: Elasticsearch can index non-JSON data without extra ingest pipelines using its built-in processors\n\nReference: https://docs.fluentd.org/",
    verify: null
  },
  {
    id: "s09-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster administrator wants to understand the flow of a Pod creation request. They submit a Deployment manifest via <code>kubectl apply</code>. In which order do the control plane components process this request?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="80" width="110" height="35" rx="6" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="65" y="102" text-anchor="middle" fill="white" font-size="10" font-weight="bold">kubectl apply</text><rect x="145" y="10" width="110" height="35" rx="6" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/><text x="200" y="32" text-anchor="middle" fill="white" font-size="10" font-weight="bold">Component A</text><rect x="145" y="80" width="110" height="35" rx="6" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="200" y="102" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Component B</text><rect x="280" y="10" width="110" height="35" rx="6" fill="#7B1FA2" stroke="#4A148C" stroke-width="2"/><text x="335" y="32" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Component C</text><rect x="280" y="80" width="110" height="35" rx="6" fill="#C62828" stroke="#B71C1C" stroke-width="2"/><text x="335" y="102" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Component D</text><rect x="145" y="155" width="110" height="35" rx="6" fill="#00695C" stroke="#004D40" stroke-width="2"/><text x="200" y="177" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Component E</text><line x1="120" y1="93" x2="145" y2="93" stroke="#333" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="200" y1="45" x2="200" y2="80" stroke="#333" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="255" y1="27" x2="280" y2="27" stroke="#333" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="255" y1="97" x2="280" y2="97" stroke="#333" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="200" y1="115" x2="200" y2="155" stroke="#333" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="335" y1="45" x2="335" y2="80" stroke="#333" stroke-width="1.5" stroke-dasharray="4,3"/><text x="200" y="145" text-anchor="middle" fill="#333" font-size="8" font-style="italic">order: ???</text></svg>',
    options: [
      "kubectl sends the manifest to the scheduler, which validates it; the scheduler forwards it to the API server for persistence in etcd",
      "API server stores the Deployment in etcd; controllers create ReplicaSet and Pods; scheduler assigns nodes; kubelet starts containers",
      "The kubelet directly receives the manifest from kubectl, creates the Pods locally, starts containers, and reports status to the API server",
      "etcd receives the manifest first, triggers the controller manager to create Pods, which then notifies the API server of state changes"
    ],
    answer: 1,
    explanation: "The request flow is: (1) `kubectl` sends the manifest to the API server, which authenticates, authorizes, and validates it. (2) The API server persists the Deployment to etcd. (3) The Deployment controller (in kube-controller-manager) detects the new Deployment and creates a ReplicaSet, which in turn creates Pod objects. (4) The scheduler detects unassigned Pods and binds them to nodes. (5) The kubelet on each node starts the containers.\n\nWhy other options are wrong:\n- A: kubectl sends requests to the API server, not the scheduler; the scheduler watches the API server\n- C: The kubelet does not receive manifests from kubectl; it watches the API server for Pod assignments\n- D: etcd does not receive manifests first; the API server is the sole gateway to etcd\n\nReference: https://kubernetes.io/docs/concepts/overview/components/",
    verify: "kubectl get events --sort-by='.lastTimestamp'"
  },
  {
    id: "s09-q081",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team uses Flux CD for GitOps-based deployments. They store their Kubernetes manifests in a Git repository and configure Flux to reconcile every 5 minutes. A developer accidentally pushes a broken manifest that causes Pod crashes. The team fixes the issue and pushes a corrected manifest. What is the maximum time before Flux applies the fix?",
    diagram: null,
    options: [
      "Immediately, because Flux receives a Git webhook notification for every push event to the repository branch",
      "Up to 5 minutes matching the reconciliation interval, unless a webhook or manual trigger is configured",
      "Exactly 5 minutes after the broken manifest was deployed, unless Flux detects a faster polling source",
      "The fix requires manual approval in the Flux reconciliation dashboard before it can be applied to the cluster"
    ],
    answer: 1,
    explanation: "Flux reconciles on a configurable interval (5 minutes in this case). Without a Git webhook configured, Flux polls the repository at each interval. The fix will be applied at the next reconciliation cycle, which could be up to 5 minutes after the push. Configuring a webhook notification from Git to Flux triggers immediate reconciliation upon push, reducing the delay.\n\nWhy other options are wrong:\n- A: Webhook notifications supplement the reconciliation interval; they are not configured in this scenario\n- C: The timing is based on when the fix is pushed relative to the next reconciliation, not the broken push\n- D: Flux does not require manual approval after failures; it reconciles automatically on each interval\n\nReference: https://fluxcd.io/flux/concepts/",
    verify: "kubectl get gitrepository -A -o jsonpath='{.items[*].spec.interval}'"
  },
  {
    id: "s09-q082",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team runs a Deployment with a <code>strategy.type: Recreate</code>. They update the container image. What is the behavior during the update?",
    diagram: null,
    options: [
      "New Pods are created first, then old Pods are terminated after the new ones pass their readiness checks",
      "Pods are replaced one at a time, similar to a rolling update strategy but with longer grace periods applied",
      "All existing Pods are terminated simultaneously, then new Pods are created, causing a brief downtime period",
      "The Deployment is paused until a cluster administrator manually reviews and approves the pending update"
    ],
    answer: 2,
    explanation: "The `Recreate` strategy terminates all existing Pods before creating new ones. This results in downtime between the old Pods being terminated and the new Pods becoming ready. It is used when the application cannot handle multiple versions running simultaneously, such as when there are database schema migration constraints or port conflicts.\n\nWhy other options are wrong:\n- A: Recreate terminates old Pods first, then creates new ones; it does not create new Pods first\n- B: Recreate terminates all Pods at once, not one at a time; it is not a gradual replacement\n- D: Recreate does not require manual approval; it proceeds automatically through the termination and creation cycle\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#recreate-deployment",
    verify: "kubectl get deployment <name> -o jsonpath='{.spec.strategy.type}'"
  },
  {
    id: "s09-q083",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A cluster administrator needs to restrict which container registries can be used for pulling images in the production namespace. They want to enforce that only images from <code>registry.company.com</code> are allowed. Which approach is most effective?",
    diagram: null,
    options: [
      "Configure <code>imagePullPolicy: Never</code> on all Pods to prevent pulling from external registries (any origin)",
      "Set a NetworkPolicy that blocks all outbound traffic to registries except <code>registry.company.com</code>",
      "Create a ResourceQuota that limits the number of images pulled from external container registries",
      "Use an admission controller (OPA Gatekeeper or Kyverno) to validate image repositories at creation"
    ],
    answer: 3,
    explanation: "Admission controllers like OPA Gatekeeper or Kyverno can inspect Pod specs during creation and reject those with images from unauthorized registries. A policy can enforce that all image references start with `registry.company.com/`. NetworkPolicies could block traffic but are less precise and may break other functionality. `imagePullPolicy: Never` only works if the image is pre-cached on the node.\n\nWhy other options are wrong:\n- A: imagePullPolicy: Never prevents pulling but does not validate which registries are allowed\n- B: NetworkPolicy blocks traffic but cannot inspect image references in Pod specs during creation\n- C: ResourceQuota limits resource consumption quantities, not image source registries\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
    verify: "kubectl get constrainttemplate"
  },
  {
    id: "s09-q084",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team configures a Service of type <code>LoadBalancer</code> in a bare-metal Kubernetes cluster (no cloud provider). After creation, the Service shows <code>EXTERNAL-IP</code> as <code>&lt;pending&gt;</code> indefinitely. What is the likely cause and solution?",
    diagram: null,
    options: [
      "The Service YAML is malformed; the <code>loadBalancerIP</code> field must be explicitly specified in the spec",
      "The kube-proxy DaemonSet needs to be restarted to detect the new LoadBalancer Service type correctly",
      "Bare-metal clusters lack a cloud load balancer; MetalLB or similar must be installed to allocate IPs",
      "CoreDNS must be configured with an external DNS provider before LoadBalancer IPs can be allocated"
    ],
    answer: 2,
    explanation: "The `LoadBalancer` Service type relies on an external cloud provider's load balancer integration to provision an external IP. In bare-metal environments, no such integration exists by default, so the external IP remains `<pending>`. MetalLB is a popular solution that provides a network load balancer implementation for bare-metal clusters, enabling IP address allocation for LoadBalancer Services.\n\nWhy other options are wrong:\n- A: The YAML is valid; loadBalancerIP is optional and the issue is the lack of a load balancer controller\n- B: Restarting kube-proxy does not provision external IPs; kube-proxy handles iptables, not IP allocation\n- D: CoreDNS handles service discovery, not IP allocation; LoadBalancer IP provisioning requires a load balancer controller\n\nReference: https://metallb.io/",
    verify: "kubectl get svc <service-name> -o jsonpath='{.status.loadBalancer}'"
  },
  {
    id: "s09-q085",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team has 12 microservices that each need to implement authentication, rate limiting, and request logging. Rather than duplicating this logic in every service, which cloud-native pattern centralizes these cross-cutting concerns?",
    diagram: null,
    options: [
      "Using an API gateway or service mesh to handle auth, rate limiting, and logging at the infrastructure layer",
      "Deploying a single monolithic proxy that all external and internal cluster traffic must traverse for routing",
      "Implementing a shared library that all services import and compile into their binaries for cross-cutting logic",
      "Adding authentication, rate limiting, and logging features as init containers in each Pod specification"
    ],
    answer: 0,
    explanation: "An API gateway (for north-south traffic) or service mesh (for east-west traffic) centralizes cross-cutting concerns at the infrastructure layer. This means individual services do not need to implement authentication, rate limiting, or logging themselves. The mesh/gateway handles these transparently via sidecar proxies or gateway pods, ensuring consistent enforcement without code duplication.\n\nWhy other options are wrong:\n- B: A single monolithic proxy becomes a bottleneck and single point of failure for all traffic\n- C: Shared libraries require code changes, language-specific implementations, and consistent upgrades\n- D: Init containers run once at startup and cannot handle ongoing request-level cross-cutting concerns\n\nReference: https://istio.io/latest/docs/concepts/what-is-istio/",
    verify: null
  },
  {
    id: "s09-q086",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A FinOps team wants to track Kubernetes cluster costs by team and application. They need to attribute compute costs (CPU and memory) to individual teams. Which approach provides the most accurate cost allocation?",
    diagram: null,
    options: [
      "Dividing the total cluster cost equally among all teams regardless of their actual resource consumption",
      "Using namespace resource quotas and labels with tools like Kubecost to map actual usage to team costs",
      "Assigning each team a dedicated node pool like a GPU or compute tier and billing based on node count",
      "Monitoring only the number of Pods per team since all Pods are assumed to consume equal resources"
    ],
    answer: 1,
    explanation: "Accurate cost allocation requires tracking actual resource usage (CPU and memory) per team. Using labels and namespaces to organize workloads, combined with tools like Kubecost or OpenCost (a CNCF Incubating project), enables granular cost reporting. These tools correlate resource usage with cloud billing data to provide per-team, per-application cost breakdowns.\n\nWhy other options are wrong:\n- A: Equal cost division is inaccurate and does not reflect actual resource consumption differences\n- C: Dedicated node pools waste resources and do not account for variable utilization within nodes\n- D: Pod count alone is meaningless for cost; Pods vary widely in resource consumption\n\nReference: https://www.opencost.io/",
    verify: null
  },
  {
    id: "s09-q087",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer creates a Pod with <code>restartPolicy: Never</code> that runs a data processing script. The script encounters an error and the container exits with code 1. What happens to the Pod?",
    diagram: null,
    options: [
      "The Pod is automatically deleted by the garbage collector after the container exits with an error",
      "The kubelet restarts the container using exponential backoff until the script completes successfully",
      "The Pod stays in <code>Failed</code> status and the container is not restarted because the policy is <code>Never</code>",
      "The Pod transitions to <code>Succeeded</code> status because the container completed its execution run"
    ],
    answer: 2,
    explanation: "With `restartPolicy: Never`, the kubelet does not restart containers regardless of exit code. Since the container exited with a non-zero code (1), the Pod's phase is set to `Failed`. The Pod object remains in the cluster until manually deleted or cleaned up by a TTL controller (if configured). `Succeeded` status requires all containers to exit with code 0.\n\nWhy other options are wrong:\n- A: The Pod object is not auto-deleted; it remains in the cluster with Failed status until manually cleaned\n- B: restartPolicy: Never means the kubelet does not restart the container regardless of exit code\n- D: Succeeded requires all containers to exit with code 0; a non-zero exit code results in Failed phase\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.phase}'"
  },
  {
    id: "s09-q088",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A StatefulSet named <code>redis</code> with 3 replicas performs a rolling update. <code>redis-2</code> updates successfully, but <code>redis-1</code> fails readiness checks and remains in a crash loop. What happens to <code>redis-0</code>?",
    diagram: null,
    options: [
      "<code>redis-0</code> is updated at the same time as <code>redis-1</code> since both are in the same update batch",
      "<code>redis-0</code> is terminated preemptively to free resources for <code>redis-1</code> to complete its update",
      "<code>redis-0</code> is updated regardless of <code>redis-1</code> status because strict ordering is not enforced",
      "<code>redis-0</code> is not updated because the controller processes Pods in reverse ordinal and waits"
    ],
    answer: 3,
    explanation: "StatefulSet rolling updates proceed in reverse ordinal order (highest to lowest) by default. The controller updates one Pod at a time and waits for it to become ready before moving to the next. Since `redis-1` is not ready, the controller blocks and does not proceed to update `redis-0`. This ordered approach protects stateful workloads from cascading failures.\n\nWhy other options are wrong:\n- A: StatefulSet rolling updates process one Pod at a time in reverse ordinal, not in batches\n- B: redis-0 is not terminated to free resources; the controller blocks and waits for redis-1 to be ready\n- C: StatefulSet rolling updates enforce strict ordering by default and wait for readiness before proceeding\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies",
    verify: "kubectl rollout status statefulset/redis"
  },
  {
    id: "s09-q089",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A team maintains a Helm chart with a <code>values.yaml</code> that sets <code>replicaCount: 3</code>. For their staging environment, they want to override this to 1 replica without modifying the chart. What is the correct approach?",
    diagram: null,
    options: [
      "Edit the <code>values.yaml</code> file in the chart source and change <code>replicaCount</code> to 1 directly in the repository",
      "Use <code>helm install --set replicaCount=1</code> or provide a separate <code>-f staging-values.yaml</code> file to override",
      "Create a Kustomize overlay that patches the rendered Helm template output to change the replica count",
      "Set an environment variable <code>HELM_REPLICA_COUNT=1</code> before running <code>helm install</code> for the staging environment"
    ],
    answer: 1,
    explanation: "Helm allows overriding default values at install or upgrade time using `--set` flags or `-f` with a custom values file. The `--set replicaCount=1` flag overrides the chart's `values.yaml` without modifying it. Using a separate `staging-values.yaml` file is preferred for complex overrides, as it is version-controllable and easier to maintain than inline `--set` flags.\n\nWhy other options are wrong:\n- A: Editing values.yaml in the chart source modifies the chart itself, which the question wants to avoid\n- C: Kustomize overlays can post-process Helm output but add unnecessary complexity for simple overrides\n- D: Helm does not read environment variables for value injection; --set or -f flags are the correct mechanism\n\nReference: https://helm.sh/docs/chart_template_guide/values_files/",
    verify: "helm get values my-release"
  },
  {
    id: "s09-q090",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node shows the taint <code>node.kubernetes.io/memory-pressure:NoSchedule</code>. No administrator has touched this node. What caused this taint?",
    diagram: null,
    options: [
      "An administrator manually tainted the node during a scheduled maintenance window for workload draining",
      "The kube-scheduler applied the taint because too many Pods were already running on the node at capacity",
      "The kubelet detected available memory fell below the eviction threshold and applied the taint automatically",
      "The taint was added by the kube-controller-manager due to a failed node health check on memory status"
    ],
    answer: 2,
    explanation: "The kubelet automatically applies condition-based taints when it detects resource pressure. The `node.kubernetes.io/memory-pressure:NoSchedule` taint indicates that available memory is below the configured eviction threshold. This prevents new Pods from being scheduled on the node while existing Pods may be evicted based on their QoS class and priority.\n\nWhy other options are wrong:\n- A: This taint is applied automatically by the kubelet, not manually by an administrator\n- B: The kube-scheduler does not apply resource pressure taints; this is a kubelet responsibility\n- D: The kube-controller-manager applies unreachable/not-ready taints, not resource pressure taints\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
    verify: "kubectl describe node <node-name> | grep -A5 'Taints'"
  },
  {
    id: "s09-q091",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A Kubernetes cluster is configured with multiple RuntimeClasses: <code>runc</code> (default), <code>gvisor</code>, and <code>kata</code>. A Pod spec includes <code>runtimeClassName: gvisor</code>. What does this configure?",
    diagram: null,
    options: [
      "The Pod's containers run under gVisor (runsc) for user-space kernel sandboxing instead of the default runc",
      "The Pod is scheduled only on nodes that have gVisor hardware acceleration (KVM) and full kernel support",
      "The Pod uses gVisor's built-in container image format instead of OCI-compliant images for containers",
      "The kubelet downloads and installs the gVisor runtime on the node automatically before starting Pods"
    ],
    answer: 0,
    explanation: "The `runtimeClassName` field in a Pod spec selects which container runtime handler processes the Pod. When set to `gvisor`, the containerd (or CRI-O) runtime uses the gVisor (runsc) handler instead of the default runc. gVisor intercepts system calls in user space, providing an additional isolation layer. The RuntimeClass must be pre-configured on the cluster with the corresponding handler.\n\nWhy other options are wrong:\n- B: RuntimeClass does not restrict scheduling by hardware; use nodeSelector or tolerations for that\n- C: gVisor uses standard OCI images; it does not have its own container image format\n- D: The kubelet does not install runtimes; they must be pre-installed and configured on the node\n\nReference: https://kubernetes.io/docs/concepts/containers/runtime-class/",
    verify: "kubectl get runtimeclass"
  },
  {
    id: "s09-q092",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Pod spec includes a <code>terminationGracePeriodSeconds: 60</code> setting. The Pod receives a termination signal due to a Deployment scale-down. What happens during these 60 seconds?",
    diagram: null,
    options: [
      "The container receives SIGTERM and has 60 seconds to shut down; if it does not exit, the kubelet sends SIGKILL",
      "The scheduler waits 60 seconds before attempting to find a replacement node for the Pod on another cluster node",
      "The kubelet immediately kills the container; it then waits 60 seconds before removing the Pod object from the API server",
      "The Pod continues to receive new traffic from the Service for 60 seconds before being removed from Endpoints"
    ],
    answer: 0,
    explanation: "When a Pod is terminated, the kubelet first sends SIGTERM to the container's main process. The container then has `terminationGracePeriodSeconds` (60 seconds in this case) to perform cleanup operations like finishing in-flight requests, closing connections, and flushing buffers. If the container has not exited after 60 seconds, the kubelet sends SIGKILL to forcefully terminate it.\n\nWhy other options are wrong:\n- B: The scheduler is not involved in termination; it handles placement, not shutdown processes\n- C: The kubelet sends SIGTERM first, not an immediate kill; the grace period allows graceful shutdown\n- D: The Pod is removed from Service Endpoints promptly; it does not keep receiving traffic for 60 seconds\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.terminationGracePeriodSeconds}'"
  },
  {
    id: "s09-q093",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team evaluates KEDA (Kubernetes Event-Driven Autoscaling) for their event-processing workload that consumes messages from an Apache Kafka topic. How does KEDA differ from the standard Horizontal Pod Autoscaler?",
    diagram: null,
    options: [
      "KEDA manages its own scaling loop (separate from the HPA), so both should not target the same workload",
      "KEDA scales on external event sources (Kafka lag, queue depth) and supports scaling to zero replicas",
      "KEDA is primarily designed for batch workloads and provides limited support for long-running Deployments",
      "KEDA provides faster scaling by bypassing the Kubernetes API server and directly managing Pod counts"
    ],
    answer: 1,
    explanation: "KEDA extends Kubernetes autoscaling by providing scalers for external event sources like Kafka, RabbitMQ, Azure Queue, AWS SQS, and many others. Unlike the standard HPA (which scales based on CPU/memory or custom metrics with a minimum of 1 replica), KEDA can scale workloads to and from zero based on event-driven triggers. KEDA actually creates and manages HPA objects under the hood.\n\nWhy other options are wrong:\n- A: KEDA creates and manages HPA objects under the hood for 1-to-N scaling. While KEDA does handle 0-to-1 scaling independently, its primary scaling mechanism uses HPA, so calling it fully independent is inaccurate\n- C: KEDA fully supports Deployments, StatefulSets, Jobs, and custom resources; it is not limited to batch workloads\n- D: KEDA works through the Kubernetes API server and Metrics API; it does not bypass them\n\nReference: https://keda.sh/docs/latest/concepts/",
    verify: null
  },
  {
    id: "s09-q094",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team deploys kube-state-metrics in their cluster alongside Prometheus. What type of metrics does kube-state-metrics expose that Prometheus node_exporter and cAdvisor do not?",
    diagram: null,
    options: [
      "Kubernetes object state metrics like Deployment replicas, Pod phase, and Job status from the API",
      "Node CPU utilization, memory usage, and disk I/O at the hardware level from system-level exporters",
      "Container-level resource consumption metrics such as CPU throttling and memory working set size",
      "Network bandwidth metrics like bytes sent and received for inter-Pod communication at the network interface"
    ],
    answer: 0,
    explanation: "kube-state-metrics generates metrics about the state of Kubernetes objects by watching the API server. It exposes information like the number of desired vs. available replicas in a Deployment, Pod phase (Pending, Running, Failed), Job success/failure counts, and node conditions. These are complementary to node_exporter (hardware metrics) and cAdvisor (container resource metrics).\n\nWhy other options are wrong:\n- B: Node CPU, memory, and disk I/O usage is provided by node_exporter and cAdvisor, not kube-state-metrics\n- C: Container-level resource metrics are exposed by cAdvisor, not kube-state-metrics\n- D: Network bandwidth metrics are from node_exporter or cAdvisor, not kube-state-metrics\n\nReference: https://github.com/kubernetes/kube-state-metrics",
    verify: "kubectl get deployment kube-state-metrics -n kube-system"
  },
  {
    id: "s09-q095",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator uses <code>kubectl annotate pod my-pod description=\"web server\"</code> to add an annotation. Another team member tries to use this annotation in a <code>nodeSelector</code> to influence scheduling. Does this work?",
    diagram: null,
    options: [
      "Yes, annotations and labels are interchangeable and usable for scheduling purposes in all Kubernetes versions",
      "Yes, but only if the annotation key strictly follows the DNS subdomain naming convention for node selectors",
      "No, annotations are restricted to cluster-scoped objects; they cannot be applied to Pods or Deployments",
      "No, annotations store non-identifying metadata not used by selectors or scheduling; labels handle selection"
    ],
    answer: 3,
    explanation: "Annotations and labels serve different purposes in Kubernetes. Labels are key-value pairs used for identification and selection by controllers, Services, and scheduling constraints. Annotations are key-value pairs for storing arbitrary non-identifying metadata (such as descriptions, tool configurations, or build information). They cannot be used in selectors, `nodeSelector`, or affinity rules.\n\nWhy other options are wrong:\n- A: Annotations and labels are not interchangeable; labels are for identification and selection\n- B: DNS naming convention is irrelevant; annotations fundamentally cannot be used in selectors\n- C: Annotations can be added to any Kubernetes object including Pods and Deployments, not just cluster-scoped objects\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/",
    verify: "kubectl get pod my-pod -o jsonpath='{.metadata.annotations}'"
  },
  {
    id: "s09-q096",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team runs a Pod with <code>hostNetwork: true</code> in its spec. The application inside the Pod binds to port 80. What are the networking implications?",
    diagram: null,
    options: [
      "The Pod receives a dedicated ClusterIP, routes traffic on port 80, and uses kube-proxy iptables rules",
      "The Pod creates a virtual network interface on the host that NATs all traffic to port 80 via iptables",
      "The Pod shares the host network namespace, binding to the node's IP on port 80, one Pod per node",
      "The Pod communicates only with other hostNetwork Pods and cannot reach cluster-networked Pods"
    ],
    answer: 2,
    explanation: "When `hostNetwork: true` is set, the Pod uses the node's network namespace directly instead of getting its own. The container binds to the node's IP address on port 80, making it accessible via `<node-ip>:80`. This also means only one Pod with this configuration can bind to port 80 per node, since the port is occupied at the host level.\n\nWhy other options are wrong:\n- A: hostNetwork Pods do not get a ClusterIP; they use the node's IP address directly\n- B: No virtual interface or NAT is created; the Pod directly uses the host network namespace\n- D: hostNetwork Pods can communicate with all Pods; they are not restricted to other hostNetwork Pods\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/#pod-networking",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.hostNetwork}'"
  },
  {
    id: "s09-q097",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team uses Kustomize to manage environment-specific configurations. They have a base Deployment manifest and overlays for <code>dev</code>, <code>staging</code>, and <code>production</code>. The production overlay needs to change the replica count from 1 (base) to 5 and add a production-specific environment variable. How does Kustomize handle this?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="40" rx="8" fill="#455A64" stroke="#263238" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="white" font-size="11" font-weight="bold">base/</text><rect x="20" y="90" width="100" height="40" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="70" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">dev/</text><rect x="150" y="90" width="100" height="40" rx="8" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="200" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">staging/</text><rect x="280" y="90" width="100" height="40" rx="8" fill="#C62828" stroke="#B71C1C" stroke-width="2"/><text x="330" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">production/</text><line x1="170" y1="45" x2="80" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9h)"/><line x1="200" y1="45" x2="200" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9h)"/><line x1="230" y1="45" x2="320" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9h)"/><text x="200" y="165" text-anchor="middle" fill="#333" font-size="10">How are environment-specific changes applied?</text><rect x="250" y="140" width="160" height="30" rx="5" fill="#FFEBEE" stroke="#C62828" stroke-width="1"/><text x="330" y="160" text-anchor="middle" fill="#C62828" font-size="9">???</text><defs><marker id="arrow9h" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Overlays contain patches applied on top of base resources at build time, producing environment-specific output",
      "Kustomize directly modifies the base manifest files in place for each environment during the build process",
      "Kustomize generates Helm charts from the base and injects environment-specific values per overlay directory",
      "Each overlay must contain a complete copy of all base manifests with the required modifications pre-applied"
    ],
    answer: 0,
    explanation: "Kustomize uses a layered approach where the base directory contains shared manifests and each overlay contains patches (strategic merge patches or JSON patches) plus a `kustomization.yaml` referencing the base. Running `kubectl kustomize overlays/production` merges the patches with the base at build time, producing the final manifests. The base files are never modified.\n\nWhy other options are wrong:\n- B: Kustomize never modifies base files; overlays produce output without changing the source\n- C: Kustomize does not generate Helm charts; they are separate configuration management tools\n- D: Overlays contain only patches, not complete copies; the base provides the shared foundation\n\nReference: https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/",
    verify: "kubectl kustomize overlays/production"
  },
  {
    id: "s09-q098",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A Kubernetes cluster uses the <code>admission webhook</code> mechanism. A ValidatingWebhookConfiguration is configured to validate all Pod creation requests. If the webhook endpoint is unreachable, what happens to Pod creation attempts by default?",
    diagram: null,
    options: [
      "The webhook's <code>failurePolicy</code> field determines whether the API server rejects or allows the request",
      "The API server retries the webhook call with exponential backoff until the <code>timeoutSeconds</code> value expires",
      "All admission webhooks in the cluster are automatically disabled when any single webhook is unreachable",
      "Pod creation proceeds normally because validating webhook configurations are advisory and non-blocking"
    ],
    answer: 0,
    explanation: "The `failurePolicy` field in a webhook configuration determines behavior when the webhook endpoint is unreachable. The default is `Fail`, which rejects the API request to ensure that validation cannot be bypassed. Setting it to `Ignore` allows the request to proceed, which is less secure but prevents webhook outages from blocking cluster operations.\n\nWhy other options are wrong:\n- B: The API server does not retry webhooks indefinitely; it respects the failurePolicy setting\n- C: Other webhooks are not affected; each webhook's failurePolicy is evaluated independently\n- D: Validating webhooks can block requests with Fail policy; they are not advisory-only by default\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#failure-policy",
    verify: "kubectl get validatingwebhookconfiguration -o yaml | grep failurePolicy"
  },
  {
    id: "s09-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team deploys a Pod with a <code>startupProbe</code> that checks <code>/ready</code> on port 8080 with <code>failureThreshold: 30</code> and <code>periodSeconds: 10</code>. The application takes approximately 4 minutes to initialize. How does the startup probe interact with the liveness and readiness probes?",
    diagram: null,
    options: [
      "All three probes run simultaneously from the moment the container starts, checking the same endpoint concurrently",
      "The startup probe replaces both probes (liveness and readiness) for the entire lifetime of the container",
      "The startup probe runs first (up to 300s) and both liveness and readiness probes begin only after it succeeds",
      "The startup probe only affects the readiness probe; the liveness probe runs independently from container start"
    ],
    answer: 2,
    explanation: "The startup probe is designed for applications with long initialization times. It disables both liveness and readiness probes until it succeeds. With `failureThreshold: 30` and `periodSeconds: 10`, the application has up to 300 seconds to start. Once the startup probe succeeds, it is never run again, and the liveness and readiness probes take over for ongoing health monitoring.\n\nWhy other options are wrong:\n- A: Probes do not run simultaneously; the startup probe disables liveness and readiness until it passes\n- B: The startup probe does not replace other probes; it only delays them until initialization completes\n- D: The startup probe disables both liveness and readiness probes, not just the readiness probe\n\nReference: https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/#startup-probes",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Startup'"
  },
  {
    id: "s09-q100",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team wants to implement policy-as-code for their Kubernetes cluster. They need to enforce rules such as \"all Pods must have resource limits\" and \"no privileged containers in production namespaces.\" Which CNCF approach is most appropriate?",
    diagram: null,
    options: [
      "Writing custom shell scripts that run as CronJobs to scan the cluster and delete any non-compliant resources",
      "Configuring RBAC rules to prevent users from creating Pods that lack properly specified resource limits",
      "Adding NetworkPolicies that block all traffic from Pods that do not comply with the defined security rules",
      "Using OPA Gatekeeper or Kyverno with admission controllers to validate resources declaratively at creation"
    ],
    answer: 3,
    explanation: "OPA Gatekeeper and Kyverno are Kubernetes-native policy engines that operate as admission webhooks. They evaluate resource creation and modification requests against declarative policies and can reject non-compliant resources before they are persisted. Gatekeeper uses Rego language for policies, while Kyverno uses Kubernetes-native YAML-based policies. Both are CNCF projects that provide audit and enforcement capabilities.\n\nWhy other options are wrong:\n- A: CronJob scripts are reactive (delete after creation), not preventive; they cannot block non-compliant resources\n- B: RBAC cannot inspect Pod spec fields like resource limits; it controls access to API verbs and resources\n- C: NetworkPolicies control network traffic, not resource compliance or Pod security attributes\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-admission/",
    verify: "kubectl get constrainttemplate"
  }
];

var labExercises = [
  {
    title: "Lab 1: Deploying and Querying Prometheus Metrics",
    description: "In this lab, you will deploy a simple application that exposes Prometheus metrics, then use <code>kubectl port-forward</code> to access the metrics endpoint and explore the output format.",
    commands: [
      "<span class='prompt'>$</span> kubectl create deployment metrics-app --image=prom/prometheus --port=9090 -n monitoring",
      "<span class='prompt'>$</span> kubectl expose deployment metrics-app --port=9090 --target-port=9090 --name=metrics-svc -n monitoring",
      "<span class='prompt'>$</span> kubectl port-forward svc/metrics-svc 9090:9090 -n monitoring &",
      "<span class='prompt'>$</span> curl -s http://localhost:9090/metrics | head -20",
      "<span class='prompt'>$</span> # Observe the Prometheus exposition format:",
      "<span class='prompt'>$</span> # HELP prometheus_build_info A metric with a constant '1' value labeled by version...",
      "<span class='prompt'>$</span> # TYPE prometheus_build_info gauge",
      "<span class='prompt'>$</span> # prometheus_build_info{...} 1",
      "<span class='prompt'>$</span> curl -s http://localhost:9090/api/v1/targets | python3 -m json.tool | head -30",
      "<span class='prompt'>$</span> # Review target health status and scrape configuration",
      "<span class='prompt'>$</span> kill %1  # Stop the port-forward"
    ],
    expectedOutput: "You should see Prometheus metrics in the exposition format with lines starting with # HELP, # TYPE, and metric_name{labels} value. The /api/v1/targets endpoint returns JSON showing configured scrape targets and their health status (up/down)."
  },
  {
    title: "Lab 2: Examining Container Logs with kubectl logs",
    description: "This lab demonstrates how to use <code>kubectl logs</code> to inspect container output, follow live logs, and examine logs from previous container instances and multi-container Pods.",
    commands: [
      "<span class='prompt'>$</span> kubectl create deployment logger --image=busybox -- /bin/sh -c 'while true; do echo \"$(date) - Processing request\"; sleep 5; done'",
      "<span class='prompt'>$</span> kubectl get pods -l app=logger",
      "<span class='prompt'>$</span> # Wait for Pod to be Running, then view logs:",
      "<span class='prompt'>$</span> kubectl logs deployment/logger",
      "<span class='prompt'>$</span> # View last 5 log lines:",
      "<span class='prompt'>$</span> kubectl logs deployment/logger --tail=5",
      "<span class='prompt'>$</span> # Follow logs in real time (Ctrl+C to stop):",
      "<span class='prompt'>$</span> kubectl logs deployment/logger -f --tail=3",
      "<span class='prompt'>$</span> # View logs from the previous container instance (if restarted):",
      "<span class='prompt'>$</span> kubectl logs deployment/logger --previous 2>/dev/null || echo 'No previous container'",
      "<span class='prompt'>$</span> # View logs with timestamps:",
      "<span class='prompt'>$</span> kubectl logs deployment/logger --timestamps --tail=5",
      "<span class='prompt'>$</span> kubectl delete deployment logger"
    ],
    expectedOutput: "You should see timestamped log lines showing 'Processing request' messages. The --tail flag limits output to the most recent lines. The -f flag streams new log entries in real time. The --timestamps flag prepends RFC3339 timestamps to each log line."
  },
  {
    title: "Lab 3: Performing a Rolling Update Deployment",
    description: "This lab walks through performing a rolling update on a Deployment, observing the update progress, and understanding how Kubernetes manages old and new ReplicaSets during the transition.",
    commands: [
      "<span class='prompt'>$</span> kubectl create deployment web-app --image=nginx:1.24 --replicas=4",
      "<span class='prompt'>$</span> kubectl rollout status deployment/web-app",
      "<span class='prompt'>$</span> # Verify the current image:",
      "<span class='prompt'>$</span> kubectl get deployment web-app -o jsonpath='{.spec.template.spec.containers[0].image}'",
      "<span class='prompt'>$</span> # Perform the rolling update:",
      "<span class='prompt'>$</span> kubectl set image deployment/web-app nginx=nginx:1.25",
      "<span class='prompt'>$</span> # Immediately watch the rollout progress:",
      "<span class='prompt'>$</span> kubectl rollout status deployment/web-app",
      "<span class='prompt'>$</span> # Observe the ReplicaSets (old scaled down, new scaled up):",
      "<span class='prompt'>$</span> kubectl get replicasets -l app=web-app",
      "<span class='prompt'>$</span> # View rollout history:",
      "<span class='prompt'>$</span> kubectl rollout history deployment/web-app",
      "<span class='prompt'>$</span> # Verify the updated image:",
      "<span class='prompt'>$</span> kubectl get deployment web-app -o jsonpath='{.spec.template.spec.containers[0].image}'",
      "<span class='prompt'>$</span> kubectl delete deployment web-app"
    ],
    expectedOutput: "The rollout status command shows Pods being replaced incrementally. After completion, 'kubectl get replicasets' shows the old ReplicaSet with 0 replicas and the new ReplicaSet with 4 replicas. The rollout history shows two revisions."
  },
  {
    title: "Lab 4: Working with Helm (Install, Upgrade, Rollback)",
    description: "This lab demonstrates the Helm workflow: installing a chart, upgrading with new values, inspecting release history, and performing a rollback when issues are detected.",
    commands: [
      "<span class='prompt'>$</span> helm repo add bitnami https://charts.bitnami.com/bitnami",
      "<span class='prompt'>$</span> helm repo update",
      "<span class='prompt'>$</span> # Install nginx with custom replica count:",
      "<span class='prompt'>$</span> helm install my-nginx bitnami/nginx --set replicaCount=2 --wait",
      "<span class='prompt'>$</span> # Verify the installation:",
      "<span class='prompt'>$</span> helm list",
      "<span class='prompt'>$</span> kubectl get pods -l app.kubernetes.io/instance=my-nginx",
      "<span class='prompt'>$</span> # Upgrade to 3 replicas:",
      "<span class='prompt'>$</span> helm upgrade my-nginx bitnami/nginx --set replicaCount=3 --wait",
      "<span class='prompt'>$</span> # View release history:",
      "<span class='prompt'>$</span> helm history my-nginx",
      "<span class='prompt'>$</span> # Simulate issue - rollback to revision 1:",
      "<span class='prompt'>$</span> helm rollback my-nginx 1 --wait",
      "<span class='prompt'>$</span> # Verify rollback (should show 2 replicas again):",
      "<span class='prompt'>$</span> kubectl get pods -l app.kubernetes.io/instance=my-nginx",
      "<span class='prompt'>$</span> helm history my-nginx",
      "<span class='prompt'>$</span> helm uninstall my-nginx"
    ],
    expectedOutput: "After install, 2 Pods run. After upgrade, 3 Pods run. 'helm history' shows revision 1 (install) and revision 2 (upgrade). After rollback, 2 Pods run again, and history shows revision 3 (rollback to 1). Each revision records its status and description."
  },
  {
    title: "Lab 5: Simulating a Canary Deployment",
    description: "This lab simulates a canary deployment by running two Deployments (stable and canary) behind the same Service, using label selectors to control traffic distribution based on Pod count.",
    commands: [
      "<span class='prompt'>$</span> # Create the stable (v1) deployment with 4 replicas:",
      "<span class='prompt'>$</span> kubectl create deployment web-stable --image=nginx:1.24 --replicas=4",
      "<span class='prompt'>$</span> kubectl label deployment web-stable version=v1",
      "<span class='prompt'>$</span> kubectl label pods -l app=web-stable version=v1 app=web",
      "<span class='prompt'>$</span> # Create a Service selecting app=web (matches both deployments):",
      "<span class='prompt'>$</span> kubectl expose deployment web-stable --name=web-svc --port=80 --target-port=80 --selector=app=web",
      "<span class='prompt'>$</span> # Create the canary (v2) deployment with 1 replica:",
      "<span class='prompt'>$</span> kubectl create deployment web-canary --image=nginx:1.25 --replicas=1",
      "<span class='prompt'>$</span> kubectl label pods -l app=web-canary version=v2 app=web",
      "<span class='prompt'>$</span> # Verify endpoints include both stable and canary Pods:",
      "<span class='prompt'>$</span> kubectl get endpoints web-svc",
      "<span class='prompt'>$</span> # Traffic distribution is ~80% stable (4 pods), ~20% canary (1 pod)",
      "<span class='prompt'>$</span> kubectl get pods -l app=web --show-labels",
      "<span class='prompt'>$</span> # After validation, promote canary by scaling stable to 0 and canary to 5:",
      "<span class='prompt'>$</span> kubectl scale deployment web-stable --replicas=0",
      "<span class='prompt'>$</span> kubectl scale deployment web-canary --replicas=5",
      "<span class='prompt'>$</span> kubectl get endpoints web-svc",
      "<span class='prompt'>$</span> kubectl delete deployment web-stable web-canary && kubectl delete svc web-svc"
    ],
    expectedOutput: "Initially the Endpoints object shows 5 IPs (4 stable + 1 canary). After promotion, it shows 5 canary IPs. Traffic is distributed approximately proportional to the number of backing Pods for each version."
  },
  {
    title: "Lab 6: Using kubectl rollout to Manage Deployments",
    description: "This lab explores the <code>kubectl rollout</code> subcommand to check status, pause/resume updates, view history, and undo deployments.",
    commands: [
      "<span class='prompt'>$</span> kubectl create deployment rollout-demo --image=nginx:1.23 --replicas=3",
      "<span class='prompt'>$</span> kubectl rollout status deployment/rollout-demo",
      "<span class='prompt'>$</span> # Record the initial revision:",
      "<span class='prompt'>$</span> kubectl rollout history deployment/rollout-demo",
      "<span class='prompt'>$</span> # Start an update and immediately pause it:",
      "<span class='prompt'>$</span> kubectl set image deployment/rollout-demo nginx=nginx:1.24",
      "<span class='prompt'>$</span> kubectl rollout pause deployment/rollout-demo",
      "<span class='prompt'>$</span> # Observe the partially updated state:",
      "<span class='prompt'>$</span> kubectl get replicasets -l app=rollout-demo",
      "<span class='prompt'>$</span> kubectl rollout status deployment/rollout-demo",
      "<span class='prompt'>$</span> # Resume the rollout:",
      "<span class='prompt'>$</span> kubectl rollout resume deployment/rollout-demo",
      "<span class='prompt'>$</span> kubectl rollout status deployment/rollout-demo",
      "<span class='prompt'>$</span> # Perform another update:",
      "<span class='prompt'>$</span> kubectl set image deployment/rollout-demo nginx=nginx:1.25",
      "<span class='prompt'>$</span> kubectl rollout status deployment/rollout-demo",
      "<span class='prompt'>$</span> # View all revisions:",
      "<span class='prompt'>$</span> kubectl rollout history deployment/rollout-demo",
      "<span class='prompt'>$</span> # Undo to the first revision:",
      "<span class='prompt'>$</span> kubectl rollout undo deployment/rollout-demo --to-revision=1",
      "<span class='prompt'>$</span> kubectl rollout status deployment/rollout-demo",
      "<span class='prompt'>$</span> kubectl get deployment rollout-demo -o jsonpath='{.spec.template.spec.containers[0].image}'",
      "<span class='prompt'>$</span> kubectl delete deployment rollout-demo"
    ],
    expectedOutput: "When paused, 'rollout status' shows the deployment is paused. After resume, the update completes. 'rollout history' shows 3 revisions. After 'rollout undo --to-revision=1', the image reverts to nginx:1.23 and a new revision 4 is created."
  }
];
