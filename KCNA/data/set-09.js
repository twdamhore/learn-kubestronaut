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
    explanation: "When a liveness probe targets port 8080 but the application listens on port 9090, every health check returns a connection refused error. The kubelet interprets this as an unhealthy container and restarts it according to the Pod's `restartPolicy`. Readiness probe failures affect traffic routing, not restarts.",
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
    explanation: "With `maxSurge: 1` and 5 desired replicas, Kubernetes can create at most 1 extra Pod above the desired count during a rolling update, resulting in a maximum of 6 Pods. The `maxUnavailable: 0` setting ensures all 5 original replicas remain available until a new Pod is ready.",
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
      "ClusterIP addresses are only accessible from outside the cluster via the external load balancer",
      "The order-service container image does not include the libraries required for DNS-based resolution",
      "ClusterIP Services cannot be used for direct inter-Pod communication within the cluster network"
    ],
    answer: 0,
    explanation: "Kubernetes DNS follows the pattern `<service>.<namespace>.svc.cluster.local`. If the payment-service is not in the `billing` namespace, the short DNS name `payment-service.billing` will fail to resolve. ClusterIP Services are the standard mechanism for internal communication between Pods.",
    verify: "kubectl get svc payment-service -n billing"
  },
  {
    id: "s09-q004",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Your organization is evaluating CNCF projects for a new observability stack. The architect wants to use a single vendor-neutral telemetry collection framework that supports traces, metrics, and logs. Which CNCF project best fits this requirement?",
    diagram: null,
    options: [
      "Prometheus, because it natively supports collecting traces and logs alongside its core metrics pipeline",
      "Jaeger, because it provides a unified collection pipeline for all telemetry types including metrics",
      "OpenTelemetry, because it provides unified APIs, SDKs, and collectors for traces, metrics, and logs",
      "Fluentd, because it can collect and forward all three signal types with built-in trace correlation"
    ],
    answer: 2,
    explanation: "OpenTelemetry is the CNCF project specifically designed to provide a single, vendor-neutral framework for collecting traces, metrics, and logs. Prometheus focuses on metrics, Jaeger on distributed tracing, and Fluentd on log aggregation. OpenTelemetry merges the capabilities of OpenTracing and OpenCensus.",
    verify: null
  },
  {
    id: "s09-q005",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform team configures Prometheus to scrape metrics from application Pods. They add the annotation <code>prometheus.io/scrape: \"true\"</code> to their Pod spec, but Prometheus is not collecting metrics. The Prometheus configuration uses <code>kubernetes_sd_configs</code> with role <code>pod</code>. What should they check first?",
    diagram: null,
    options: [
      "Whether the Prometheus server has enough CPU and memory resources allocated to scrape all configured targets",
      "Whether the application Pods have a readiness probe defined that gates the scraping of metrics endpoints",
      "Whether the Prometheus Operator CRDs are correctly installed and reconciled within the current cluster",
      "Whether the relabeling rules filter on the <code>prometheus.io/scrape</code> annotation and the correct port"
    ],
    answer: 3,
    explanation: "Prometheus service discovery with `kubernetes_sd_configs` discovers targets but requires relabeling rules to filter based on annotations like `prometheus.io/scrape`. Additionally, the `prometheus.io/port` annotation must match the port where the application exposes its `/metrics` endpoint. Without proper relabeling, discovered targets are dropped.",
    verify: "kubectl get pods -l app=prometheus -o yaml | grep -A10 relabel"
  },
  {
    id: "s09-q006",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "An SRE team adopts Argo CD for GitOps-based deployments. After pushing a manifest change to the Git repository, Argo CD shows the application status as <code>OutOfSync</code> but does not automatically deploy the change. What is the most likely reason?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="70" width="100" height="50" rx="8" fill="#2196F3" stroke="#1565C0" stroke-width="2"/><text x="60" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Git Repo</text><rect x="150" y="70" width="100" height="50" rx="8" fill="#FF9800" stroke="#E65100" stroke-width="2"/><text x="200" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Argo CD</text><rect x="290" y="70" width="100" height="50" rx="8" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/><text x="340" y="100" text-anchor="middle" fill="white" font-size="12" font-weight="bold">K8s Cluster</text><line x1="110" y1="95" x2="148" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow9a)"/><line x1="250" y1="95" x2="288" y2="95" stroke="#999" stroke-width="2" stroke-dasharray="6,3"/><text x="270" y="85" text-anchor="middle" fill="#D32F2F" font-size="10">blocked?</text><text x="200" y="155" text-anchor="middle" fill="#333" font-size="11">Sync Policy: Manual</text><defs><marker id="arrow9a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Argo CD requires Flux to be installed as a co-controller for enabling automatic sync operations",
      "The application sync policy is set to <code>manual</code> rather than <code>automated</code>",
      "Git webhooks are not supported by Argo CD for detecting repository changes automatically",
      "The Argo CD application manifest is missing the required <code>repoURL</code> field in the source"
    ],
    answer: 1,
    explanation: "By default, Argo CD applications use a manual sync policy, meaning it detects drift (showing `OutOfSync`) but waits for an operator to trigger the sync. Setting the sync policy to `automated` enables Argo CD to automatically apply changes when the Git repository state diverges from the live cluster state.",
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
      "Verify the Service selector labels match Pod labels using <code>kubectl get endpoints</code>",
      "Increase the <code>nodePort</code> range in the API server startup configuration parameters"
    ],
    answer: 2,
    explanation: "When Pods are healthy but a Service is not routing traffic, the first diagnostic step is to verify that the Service's selector matches the Pod labels. Running `kubectl get endpoints <service>` shows whether the Service has discovered any backing Pods. An empty Endpoints list confirms a selector mismatch.",
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
    explanation: "Kubernetes uses a leader election mechanism, typically backed by a Lease object in the `kube-system` namespace, to ensure only one kube-controller-manager instance is active at a time. The other instances remain on standby and will take over if the current leader loses its lease.",
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
      "Configure a <code>Pod Security Admission</code> controller with the <code>restricted</code> profile on the namespace",
      "Create a <code>ResourceQuota</code> that limits the total number of containers running as root in the namespace",
      "Set <code>privileged: false</code> in the container's resource limits section to prevent root-level access"
    ],
    answer: 1,
    explanation: "Pod Security Admission (PSA) is the built-in Kubernetes admission controller that enforces Pod Security Standards. The `restricted` profile requires containers to run as non-root, drop all capabilities, and set a Seccomp profile, among other constraints. It can be applied at the namespace level using labels.",
    verify: "kubectl label namespace production pod-security.kubernetes.io/enforce=restricted"
  },
  {
    id: "s09-q010",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A cloud-native e-commerce platform has decomposed its monolith into 15 microservices. The team notices that a failure in the payment service causes cascading timeouts across the order, inventory, and notification services. Which pattern best addresses this problem?",
    diagram: null,
    options: [
      "Adding a circuit breaker pattern to fail fast when a downstream service is unavailable and prevent cascading failures",
      "Merging the payment and order services back into a single monolith to reduce inter-service network hops",
      "Implementing synchronous retries with exponential backoff and jitter across all dependent services",
      "Deploying all services onto a single node to eliminate network latency between microservice containers entirely"
    ],
    answer: 0,
    explanation: "The circuit breaker pattern monitors failures to a downstream service and, after a threshold is reached, trips the circuit to return errors immediately instead of waiting for timeouts. This prevents cascading failures by isolating the unhealthy service. Libraries like Istio's outlier detection or Resilience4j implement this pattern.",
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
      "The Pod remains in <code>Pending</code> state because no node matches the label <code>accelerator: nvidia-tesla-a100</code>",
      "The Pod is scheduled on a V100 node but the container fails to start due to incompatible GPU driver versions",
      "The scheduler automatically creates the missing label on the most suitable node that has available GPU resources"
    ],
    answer: 1,
    explanation: "A `nodeSelector` enforces an exact label match. Since the cluster nodes have `accelerator=nvidia-tesla-v100` but the Pod requests `accelerator=nvidia-tesla-a100`, no node satisfies the constraint. The Pod remains `Pending` with a `FailedScheduling` event until a matching node becomes available.",
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
      "The kubelet only creates containers during Pod initialization and then hands them off to the kernel scheduler",
      "Docker and containerd share the same container store but <code>docker ps</code> requires root-level privileges",
      "Containerd manages containers independently of the Docker daemon, so <code>docker ps</code> does not list them"
    ],
    answer: 3,
    explanation: "When Kubernetes uses containerd directly (via the CRI plugin), containers are managed by containerd without involving the Docker daemon. Therefore, `docker ps` which queries the Docker daemon shows no containers. The correct tool to inspect containers is `crictl ps` or `ctr`.",
    verify: "crictl ps"
  },
  {
    id: "s09-q013",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A distributed tracing system using Jaeger shows incomplete traces for requests that pass through 4 microservices. The first two services show spans, but the last two do not. All services are instrumented with OpenTelemetry SDKs. What is the most likely cause?",
    diagram: null,
    options: [
      "Service 2 is not propagating trace context headers (e.g., <code>traceparent</code>) in its outgoing requests to Service 3, breaking the trace chain",
      "Jaeger does not support more than 2 spans per trace due to its default storage configuration limits",
      "The Jaeger collector has run out of available storage space and is dropping newly received span data",
      "OpenTelemetry only supports tracing for gRPC-based services and cannot instrument HTTP-based endpoints"
    ],
    answer: 0,
    explanation: "Distributed tracing requires that trace context (such as the W3C `traceparent` header) is propagated between services. Since spans appear for Services 1 and 2 but not 3 and 4, the break point is between Services 2 and 3 — Service 2 is not forwarding trace context headers in its outgoing requests. Without those headers, Services 3 and 4 create new independent traces instead of joining the original one. This is the most common cause of incomplete traces.",
    verify: null
  },
  {
    id: "s09-q014",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An application team creates a ConfigMap named <code>app-config</code> and mounts it as a volume in their Pod at <code>/etc/config</code>. They update the ConfigMap data using <code>kubectl edit configmap app-config</code>. After a few minutes, the files in the mounted volume reflect the new values. However, the application still uses the old configuration. Why?",
    diagram: null,
    options: [
      "ConfigMap volume mounts are immutable after Pod creation and never update their contents on disk",
      "Updated ConfigMaps require a new PersistentVolumeClaim to propagate the changed data to the Pod",
      "The application reads configuration only at startup and does not watch for file changes on disk",
      "The kubelet only syncs ConfigMap updates during scheduled node restarts or maintenance windows"
    ],
    answer: 2,
    explanation: "When a ConfigMap is mounted as a volume, the kubelet periodically syncs the files (typically within 30-60 seconds). However, most applications read configuration files only at startup. Unless the application is designed to watch for file changes or the Pod is restarted, it continues using the old values held in memory.",
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
    explanation: "Kubernetes retains PVCs created by a StatefulSet's `volumeClaimTemplate` even when the corresponding Pods are deleted during scale-down. This ensures that data is preserved and can be reattached to the same Pod identity when the StatefulSet scales back up. Manual deletion is required to remove orphaned PVCs.",
    verify: "kubectl get pvc -l app=<statefulset-name>"
  },
  {
    id: "s09-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A CronJob is configured with <code>concurrencyPolicy: Forbid</code> and a schedule of <code>*/5 * * * *</code>. A Job triggered at 10:00 takes 7 minutes to complete. What happens at 10:05 when the next scheduled run is due?",
    diagram: null,
    options: [
      "A second Job is created and runs concurrently alongside the still-active first Job instance",
      "The CronJob controller terminates the running 10:00 Job and immediately starts the 10:05 Job",
      "The 10:05 Job is queued in a pending state and starts after the 10:00 Job finishes running",
      "The 10:05 run is skipped entirely because the previous Job is still active under Forbid policy"
    ],
    answer: 3,
    explanation: "With `concurrencyPolicy: Forbid`, the CronJob controller skips a scheduled run if a previous Job is still active. The 10:05 invocation is simply not created. This prevents overlapping executions, which is important for Jobs that access shared resources or have side effects that are not idempotent.",
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
    explanation: "Factor VI (Processes) states that twelve-factor processes are stateless and share-nothing. Any data that needs to persist must be stored in a stateful backing service such as a database or Redis. Writing session state to local disk violates this principle and prevents horizontal scaling.",
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
    explanation: "Since other Pods can connect to the database, the issue is likely specific to this Pod. The hostname `db-host` might not match the actual Service name, or the container image might be missing the required database client library. Verifying DNS resolution from within the Pod and checking Service naming are the most targeted diagnostic steps.",
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
      "Disabling etcd authentication entirely to reduce per-request processing overhead on the cluster nodes",
      "Configuring etcd to use an in-memory store instead of persistent storage for improved write throughput"
    ],
    answer: 0,
    explanation: "Etcd is highly sensitive to disk I/O latency because every write operation must be committed to a write-ahead log (WAL) before being acknowledged. Using fast SSD storage is the single most impactful optimization. Increasing members beyond 3 or 5 actually increases consensus latency. Disabling auth or using in-memory storage are not production-appropriate solutions.",
    verify: "kubectl exec -n kube-system etcd-master -- etcdctl endpoint status --write-out=table"
  },
  {
    id: "s09-q020",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A team manages their application using a Helm chart. After running <code>helm upgrade my-release ./my-chart</code>, they discover a critical bug in the new version. They need to immediately revert to the previous working state. What is the fastest correct action?",
    diagram: null,
    options: [
      "Run <code>helm delete my-release</code> and then <code>helm install</code> with the previous chart version to redeploy",
      "Run <code>helm rollback my-release 1</code> to roll back to the first revision, which is the original install before any upgrades",
      "Run <code>helm rollback my-release</code> to revert to the previous release revision stored in the history",
      "Manually edit each Kubernetes resource to match the previous chart's templates and desired configuration"
    ],
    answer: 2,
    explanation: "The `helm rollback my-release` command (without specifying a revision number) reverts to the previous release revision. This is the fastest way to restore the previous state because Helm maintains a history of all release revisions and can re-apply the previous manifests. Deleting and reinstalling would cause unnecessary downtime.",
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
      "The ResourceQuota configuration is automatically adjusted to accommodate the new Pod's requirements",
      "The Pod is created but remains in <code>Pending</code> state until a LimitRange is defined in the namespace",
      "The API server rejects Pod creation because containers must specify CPU requests and limits under a quota"
    ],
    answer: 3,
    explanation: "When a ResourceQuota specifying compute resources (CPU or memory) exists in a namespace, all Pods must explicitly declare requests and limits for those resources. If not specified, the API server rejects the Pod creation. A LimitRange can be configured to automatically inject defaults, preventing this rejection.",
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
      "A ServiceAccount with elevated cluster-wide privileges assigned to the Prometheus Pod for scraping",
      "A NetworkPolicy with a `namespaceSelector` for monitoring and a `podSelector` matching the scraper"
    ],
    answer: 3,
    explanation: "NetworkPolicies support cross-namespace access control using `namespaceSelector` combined with `podSelector`. To allow the Prometheus Pod in the `monitoring` namespace to reach backend Pods, a new ingress rule must specify both the namespace and the Pod labels. Annotations and ServiceAccounts do not override NetworkPolicy enforcement.",
    verify: "kubectl get networkpolicy -n backend -o yaml"
  },
  {
    id: "s09-q023",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Kubernetes cluster runs CoreDNS for service discovery. An application Pod attempts to resolve the DNS name <code>my-svc.my-ns.svc.cluster.local</code> but receives <code>NXDOMAIN</code>. The Service <code>my-svc</code> exists in namespace <code>my-ns</code>. Which of the following could cause this?",
    diagram: null,
    options: [
      "The Service type must be set to LoadBalancer for DNS records to be created by CoreDNS",
      "CoreDNS does not support the <code>svc.cluster.local</code> DNS suffix for resolving internal Service names",
      "DNS resolution only works with Service ClusterIP addresses and does not support name-based lookups",
      "The Pod's <code>dnsPolicy</code> is set to <code>None</code> without a custom <code>dnsConfig</code> pointing to CoreDNS"
    ],
    answer: 3,
    explanation: "When a Pod's `dnsPolicy` is set to `None`, Kubernetes does not configure any default DNS servers for the Pod. Without a `dnsConfig` that includes the CoreDNS ClusterIP as a nameserver, the Pod cannot resolve cluster-internal DNS names. This results in `NXDOMAIN` even though the Service exists.",
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
    explanation: "Knative Serving supports scale-to-zero, where Pods are terminated after a configurable idle period. When a new request arrives, Knative's activator component holds the request while the autoscaler provisions a new Pod. This cold start includes pulling the image (if not cached), starting the container, and waiting for health checks to pass.",
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
      "Add a toleration for <code>dedicated=monitoring:NoSchedule</code> to the DaemonSet's Pod template spec",
      "Set the DaemonSet's <code>updateStrategy</code> to <code>OnDelete</code> to trigger rescheduling on the new node",
      "Remove the DaemonSet's resource requests so the Pod fits on any node regardless of available capacity"
    ],
    answer: 1,
    explanation: "Taints prevent Pods from being scheduled on a node unless the Pod has a matching toleration. For a DaemonSet to place Pods on a tainted node, its Pod template must include a toleration that matches the taint's key, value, and effect. Adding `tolerations: [{key: \"dedicated\", value: \"monitoring\", effect: \"NoSchedule\"}]` resolves this.",
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
    explanation: "An `emptyDir` volume is tied to the Pod's lifecycle, not to individual containers. When a container within the Pod crashes and restarts, the `emptyDir` volume and its contents persist. The volume is only deleted when the Pod itself is removed from the node. This makes `emptyDir` suitable for sharing data between sidecar containers.",
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
      "A PriorityClass that assigns higher scheduling priority to <code>app-a</code> Pods over <code>app-b</code> Pods",
      "Pod anti-affinity with <code>requiredDuringSchedulingIgnoredDuringExecution</code> and the hostname topology key"
    ],
    answer: 3,
    explanation: "Pod anti-affinity with `requiredDuringSchedulingIgnoredDuringExecution` creates a hard constraint that prevents co-location. Using `kubernetes.io/hostname` as the topology key ensures the anti-affinity rule is evaluated at the individual node level, guaranteeing that Pods with matching labels are never scheduled on the same node.",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.affinity.podAntiAffinity}'"
  },
  {
    id: "s09-q028",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Kubernetes cluster stores TLS certificates for mutual TLS between microservices. The team currently uses Kubernetes Secrets of type <code>kubernetes.io/tls</code>. A security review finds that etcd is not encrypted at rest. What is the recommended remediation?",
    diagram: null,
    options: [
      "Enable encryption at rest by configuring an <code>EncryptionConfiguration</code> with an appropriate provider",
      "Switch to using environment variables instead of mounted Secrets to avoid storing credentials in etcd",
      "Move all TLS certificates to ConfigMaps, which are automatically encrypted at rest by default in Kubernetes",
      "Deploy a separate dedicated etcd cluster exclusively for Secret storage with its own encryption enabled"
    ],
    answer: 0,
    explanation: "By default, Kubernetes Secrets are stored as base64-encoded plaintext in etcd. To protect sensitive data, administrators should configure an `EncryptionConfiguration` on the kube-apiserver, specifying a provider like `aescbc`, `aesgcm`, or an external KMS. ConfigMaps are also unencrypted, and environment variables do not address the at-rest encryption concern.",
    verify: null
  },
  {
    id: "s09-q029",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform engineering team is building an internal developer platform and wants to use a CNCF project that provides a declarative, GitOps-compatible way to define CI/CD pipelines as Kubernetes custom resources. Which project should they evaluate?",
    diagram: null,
    options: [
      "Tekton, which defines CI/CD components (Tasks, Pipelines, PipelineRuns) as Kubernetes CRDs",
      "Prometheus, which provides pipeline monitoring through its configurable alerting rules engine",
      "Envoy, which routes CI/CD pipeline traffic between build stages via its proxy configuration",
      "Harbor, which stores pipeline definitions alongside container images in its artifact registry"
    ],
    answer: 0,
    explanation: "Tekton is a CNCF project that provides Kubernetes-native CI/CD building blocks. It uses Custom Resource Definitions (CRDs) such as Task, Pipeline, and PipelineRun to define and execute CI/CD workflows declaratively. Being Kubernetes-native, Tekton pipelines can be stored in Git and managed with GitOps workflows.",
    verify: null
  },
  {
    id: "s09-q030",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A platform team deploys Fluent Bit as a DaemonSet to collect container logs from every node. They configure Fluent Bit to read from <code>/var/log/containers/*.log</code> and forward to Elasticsearch. After a node restart, Fluent Bit re-sends all existing logs, creating duplicates. How should they prevent this?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="120" height="50" rx="8" fill="#455A64" stroke="#263238" stroke-width="2"/><text x="70" y="40" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Node Logs</text><text x="70" y="52" text-anchor="middle" fill="#B0BEC5" font-size="9">/var/log/containers/</text><rect x="10" y="90" width="120" height="50" rx="8" fill="#0288D1" stroke="#01579B" stroke-width="2"/><text x="70" y="120" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Fluent Bit</text><rect x="250" y="90" width="140" height="50" rx="8" fill="#388E3C" stroke="#1B5E20" stroke-width="2"/><text x="320" y="120" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Elasticsearch</text><line x1="70" y1="60" x2="70" y2="88" stroke="#333" stroke-width="2" marker-end="url(#arrow9b)"/><line x1="130" y1="115" x2="248" y2="115" stroke="#333" stroke-width="2" marker-end="url(#arrow9b)"/><rect x="10" y="170" width="120" height="50" rx="8" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="70" y="192" text-anchor="middle" fill="white" font-size="10" font-weight="bold">DB/File Offset</text><text x="70" y="207" text-anchor="middle" fill="white" font-size="9">Position tracking</text><line x1="70" y1="140" x2="70" y2="168" stroke="#F57F17" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrow9b)"/><text x="200" y="200" fill="#333" font-size="10" font-style="italic">Stores read position</text><text x="200" y="215" fill="#333" font-size="10" font-style="italic">to prevent duplicates</text><defs><marker id="arrow9b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Enable the <code>DB</code> parameter on Fluent Bit's tail input to persist file read offsets across restarts",
      "Switch from Fluent Bit to Fluentd, which automatically handles log file offset tracking by default",
      "Configure Elasticsearch to deduplicate log entries automatically using unique document IDs per entry",
      "Reduce Fluent Bit's buffer size to minimize the volume of re-sent logs after each node restart event"
    ],
    answer: 0,
    explanation: "Fluent Bit's tail input plugin supports a `DB` parameter that stores file read positions (offsets) in a local SQLite database. When Fluent Bit restarts, it resumes reading from the last recorded position rather than the beginning. Setting `storage.type` to `filesystem` also persists in-flight data to disk to prevent data loss.",
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
      "It encrypts all Pod-to-Pod traffic using mutual TLS certificates that are managed by the cluster's CA",
      "It monitors node health and reports detailed status information back to the kube-controller-manager",
      "It maintains network rules on each node (iptables or IPVS) that enable Service-based routing to Pods"
    ],
    answer: 3,
    explanation: "kube-proxy runs on every node and is responsible for implementing the Kubernetes Service abstraction. It watches the API server for Service and Endpoints changes and programs iptables rules (or IPVS rules) on the node to route traffic destined for a Service's ClusterIP to the appropriate backend Pods.",
    verify: "kubectl get daemonset kube-proxy -n kube-system"
  },
  {
    id: "s09-q032",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "An engineer runs <code>kubectl top pods</code> in a namespace and receives the error: <code>error: Metrics API not available</code>. The cluster was set up using kubeadm. What component is most likely missing?",
    diagram: null,
    options: [
      "The Metrics Server, which implements the resource metrics API (<code>metrics.k8s.io</code>) for the cluster",
      "The Prometheus server, which provides the Metrics API endpoint for resource usage data collection",
      "The kube-state-metrics exporter, which exposes Pod-level resource usage as Prometheus-format metrics",
      "The cAdvisor binary, which must be installed separately on each node to collect container-level stats"
    ],
    answer: 0,
    explanation: "The `kubectl top` command queries the Kubernetes resource metrics API (`metrics.k8s.io`), which is served by the Metrics Server. This component is not installed by default with kubeadm. It collects CPU and memory usage from the kubelet's summary API on each node. Prometheus and kube-state-metrics serve different purposes.",
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
      "ConfigMaps do not support labels in Kubernetes and therefore cannot be filtered using label selectors",
      "The <code>-l</code> flag only works with workload resources like Deployments, not configuration resources"
    ],
    answer: 0,
    explanation: "The `kubectl get all` command returns only a predefined set of resource types (Pods, Services, Deployments, ReplicaSets, StatefulSets, DaemonSets, Jobs, CronJobs). ConfigMaps, Secrets, PVCs, and many other resource types are not included. To find labeled ConfigMaps, you must explicitly run `kubectl get configmap -l env=production`.",
    verify: "kubectl get configmap -l env=production"
  },
  {
    id: "s09-q034",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team wants to deploy a new version of their API server using a blue-green deployment strategy on Kubernetes. They currently have a <code>v1</code> Deployment behind a Service. Which approach correctly implements blue-green?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="40" rx="8" fill="#7B1FA2" stroke="#4A148C" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Service</text><rect x="20" y="80" width="150" height="55" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="95" y="105" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Blue (v1) Deploy</text><text x="95" y="120" text-anchor="middle" fill="#90CAF9" font-size="10">version: v1</text><rect x="230" y="80" width="150" height="55" rx="8" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/><text x="305" y="105" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Green (v2) Deploy</text><text x="305" y="120" text-anchor="middle" fill="#A5D6A7" font-size="10">version: v2</text><line x1="175" y1="45" x2="95" y2="78" stroke="#1565C0" stroke-width="2" marker-end="url(#arrow9c)"/><line x1="225" y1="45" x2="305" y2="78" stroke="#999" stroke-width="2" stroke-dasharray="5,3"/><text x="200" y="170" text-anchor="middle" fill="#333" font-size="10">Switch selector from version:v1 to version:v2</text><rect x="100" y="185" width="200" height="25" rx="5" fill="#FFF3E0" stroke="#E65100" stroke-width="1"/><text x="200" y="202" text-anchor="middle" fill="#E65100" font-size="10">Instant traffic cutover</text><defs><marker id="arrow9c" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#1565C0"/></marker></defs></svg>',
    options: [
      "Use a single Deployment and perform a rolling update with <code>maxSurge: 100%</code> to replace all Pods at once",
      "Create a <code>v2</code> Deployment with <code>version: v2</code> label, verify health, then switch the Service selector",
      "Use a CronJob to periodically swap traffic between v1 and v2 Pods based on a configured time schedule",
      "Deploy v2 Pods into a separate namespace and use an ExternalName Service to redirect all incoming traffic"
    ],
    answer: 1,
    explanation: "Blue-green deployment involves running two identical environments (blue for current, green for new). In Kubernetes, this is achieved by creating a second Deployment with a distinct version label, validating it, and then switching the Service selector to point to the new version. This provides instant rollback by simply reverting the selector.",
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
    explanation: "With `completions: 10` and `parallelism: 3`, the Job controller ensures that failed Pods are replaced to reach the target number of successful completions. A single Pod failure does not fail the entire Job unless the `backoffLimit` is exceeded. The controller creates a new Pod to replace the failed one, maintaining up to 3 concurrent Pods.",
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
      "gVisor (runsc), which interposes a user-space kernel to intercept system calls for application-level sandboxing",
      "Kata Containers, which runs each container inside a lightweight VM while implementing the CRI via containerd shims",
      "Docker-in-Docker, which nests Docker engines inside containers to provide process-level workload isolation"
    ],
    answer: 2,
    explanation: "Kata Containers provides VM-level isolation by running each Pod inside a lightweight virtual machine with its own kernel. It integrates with containerd through a CRI-compatible shim (`containerd-shim-kata-v2`), making it transparent to Kubernetes. gVisor provides sandbox isolation but not full VM-level isolation. runc provides standard container isolation only.",
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
      "The request routes to <code>api-service:8080</code> because <code>/api/v1/users</code> matches the <code>/api</code> prefix",
      "The request is load-balanced equally between both backends based on the round-robin algorithm"
    ],
    answer: 2,
    explanation: "With `pathType: Prefix`, the Ingress controller matches the request path against the defined prefixes. Since `/api/v1/users` starts with `/api`, it matches the rule for `api-service:8080`. The full path (including `/v1/users`) is forwarded to the backend service. Prefix matching is the most common path type used in Ingress resources.",
    verify: "kubectl describe ingress <ingress-name>"
  },
  {
    id: "s09-q038",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is containerizing their application and debating how to handle configuration. One engineer suggests baking database credentials into the container image for simplicity. According to cloud-native best practices, why is this problematic?",
    diagram: null,
    options: [
      "Container images cannot contain text files, so credentials must always be injected at runtime through volume mounts or environment variables",
      "Baking credentials into the image violates separating config from code, creates security risk, and requires rebuilding per environment",
      "Container registries automatically strip any files identified as credentials from uploaded images during the push process",
      "Kubernetes does not mount the container filesystem at runtime, so embedded files are completely inaccessible to the application"
    ],
    answer: 1,
    explanation: "Cloud-native applications should externalize configuration, especially secrets, from the container image. Embedding credentials in the image means the same image cannot be used across environments without rebuilding, the credentials are exposed to anyone with image pull access, and rotation requires a new image build and deployment cycle. Kubernetes Secrets or external secret managers should be used instead.",
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
      "It deletes the node object from the cluster, permanently removing it from the API server's node registry",
      "It live-migrates all running containers from the node to other available nodes without restarting them"
    ],
    answer: 0,
    explanation: "`kubectl drain` first cordons the node (marks it as unschedulable) and then evicts all Pods except DaemonSet Pods and mirror Pods. It respects PodDisruptionBudgets during eviction, which may cause the drain to block if evicting a Pod would violate the budget. The node object remains in the cluster with an unschedulable taint.",
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
    explanation: "To compute the error rate as a percentage, you divide the rate of 5xx errors by the rate of all requests and multiply by 100. Using `sum()` aggregates across all label dimensions to produce a single numerator and denominator. The `rate()` function is necessary because `http_requests_total` is a counter, and `count()` would return the number of time series, not request rates.",
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
    explanation: "Readiness probes determine whether a Pod should receive traffic through a Service. Until the TCP socket check on port 5432 succeeds (meaning the database connection pool is ready), the Pod's IP is not added to the Service's Endpoints object. This prevents routing traffic to Pods that are not yet capable of handling requests. Unlike liveness probes, readiness probe failures do not trigger restarts.",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s09-q042",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A multi-tenant Kubernetes cluster has two teams, each with their own namespace: <code>team-alpha</code> and <code>team-beta</code>. By default, Pods in both namespaces can communicate freely. The cluster admin wants to implement a default-deny ingress policy for the <code>team-beta</code> namespace. Which NetworkPolicy achieves this?",
    diagram: null,
    options: [
      "Deleting the default ServiceAccount in the <code>team-beta</code> namespace to revoke network access",
      "A NetworkPolicy selecting all Pods with <code>policyTypes: [\"Egress\"]</code> and no egress rules defined",
      "A NetworkPolicy with empty <code>podSelector</code> and empty <code>ingress</code> array applied to <code>team-beta</code>",
      "Adding an annotation <code>network-isolation: enabled</code> to the <code>team-beta</code> namespace object"
    ],
    answer: 2,
    explanation: "A NetworkPolicy with `podSelector: {}` (matching all Pods) and `policyTypes: [\"Ingress\"]` creates a default-deny ingress rule for the entire namespace. Either omitting the `ingress` field entirely or setting it to an empty array (`ingress: []`) achieves the same default-deny effect — both result in no ingress being allowed. This blocks all incoming traffic to Pods in that namespace unless other NetworkPolicies explicitly allow specific traffic. Annotations alone have no effect on network isolation.",
    verify: "kubectl get networkpolicy -n team-beta -o yaml"
  },
  {
    id: "s09-q043",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A service mesh is deployed using Istio in a Kubernetes cluster. The platform team wants to implement traffic mirroring to test a new version of the <code>recommendation-service</code> with production traffic without affecting users. Which Istio resource supports this?",
    diagram: null,
    options: [
      "A <code>Gateway</code> resource configured with dual upstream backends for mirroring production traffic to the canary",
      "A <code>DestinationRule</code> with <code>trafficPolicy.loadBalancer.simple: ROUND_ROBIN</code> distributing across versions",
      "A <code>PeerAuthentication</code> policy that routes all mTLS-encrypted traffic directly to the test version only",
      "A <code>VirtualService</code> with a <code>mirror</code> field that duplicates traffic to the new version while serving from stable"
    ],
    answer: 3,
    explanation: "Istio's `VirtualService` supports a `mirror` field that sends a copy of live traffic to a mirrored service. The responses from the mirrored service are discarded, ensuring no impact on end users. This is also known as shadow traffic or dark launching, and it allows testing with real production traffic patterns without risk.",
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
    explanation: "The `kubectl rollout undo deployment/my-app --to-revision=3` command reverts the Deployment to a specific historical revision. Kubernetes stores rollout history (up to the limit set by `revisionHistoryLimit`) as ReplicaSets. The `--to-revision` flag specifies which revision to restore, making it possible to roll back to any previously recorded state.",
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
    explanation: "The scheduler filters nodes based on whether they have sufficient allocatable resources to satisfy the Pod's requests. Node-1 (4 cores) and node-2 (8 cores) can accommodate a 3 CPU request, while node-3 (2 cores) cannot. CPU requests can be specified as whole numbers or millicores (e.g., `3` is equivalent to `3000m`). The scheduler then scores eligible nodes to select the best fit.",
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
      "The <code>kubectl apply</code> command is deprecated and will be removed in upcoming future Kubernetes versions",
      "The kubectl apply command cannot handle container images built by CI/CD pipelines because of registry authentication restrictions",
      "Container registries cannot be accessed from within CI/CD pipelines due to network isolation constraints"
    ],
    answer: 0,
    explanation: "Directly calling `kubectl apply` from CI/CD pipelines (push-based deployment) requires the pipeline to have cluster credentials, which is a security risk. It also means the cluster state may drift from what is in version control if manual changes are made. GitOps approaches (pull-based, using tools like Argo CD or Flux) mitigate these issues by making Git the single source of truth.",
    verify: null
  },
  {
    id: "s09-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A headless Service (with <code>clusterIP: None</code>) is created for a StatefulSet named <code>cassandra</code> in the <code>database</code> namespace. The StatefulSet has 3 replicas. Which DNS records does Kubernetes create for this configuration?",
    diagram: null,
    options: [
      "A single A record for the Service name that load-balances across all Pod IPs using kube-proxy rules in round-robin fashion",
      "Only SRV records are created for headless Services; A records are not supported for Pods managed by StatefulSets",
      "No DNS records are created because headless Services do not participate in the Kubernetes DNS resolution system",
      "Individual A records for each Pod (e.g., <code>cassandra-0.cassandra.database.svc.cluster.local</code>) plus a Service A record"
    ],
    answer: 3,
    explanation: "A headless Service combined with a StatefulSet creates stable DNS entries for each Pod. Each Pod gets a predictable hostname (`<pod-name>.<service-name>.<namespace>.svc.cluster.local`). The Service DNS name itself returns A records for all Pod IPs. This provides stable network identities essential for stateful workloads like databases.",
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
      "The CPU limit is set equal to the specified request value: <code>200m</code> to match the request",
      "The LimitRange default of <code>500m</code> is applied since the developer did not specify a limit",
      "Pod creation fails because both requests and limits must be explicitly specified under a quota"
    ],
    answer: 2,
    explanation: "A LimitRange injects default values for any resource field not specified by the user. Since the developer specified a CPU request but not a CPU limit, the LimitRange fills in the default limit of `500m`. If neither request nor limit were specified, the LimitRange would inject both defaults. The LimitRange also enforces min/max constraints if configured.",
    verify: "kubectl describe limitrange -n <namespace>"
  },
  {
    id: "s09-q049",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A Kubernetes cluster uses a StorageClass with <code>reclaimPolicy: Delete</code>. A developer deletes a PersistentVolumeClaim (PVC) that was bound to a PersistentVolume (PV) dynamically provisioned by this StorageClass. What happens to the PV and the underlying storage?",
    diagram: null,
    options: [
      "The PV transitions to <code>Released</code> state and can be rebound to a new PVC after manual cleanup",
      "The PV is retained in the cluster but the underlying storage volume is wiped clean by the provisioner",
      "The PV remains bound to the deleted PVC indefinitely until an administrator performs manual cleanup",
      "The PV and its underlying storage are automatically deleted by the provisioner upon PVC deletion"
    ],
    answer: 3,
    explanation: "When a PVC bound to a dynamically provisioned PV is deleted, the `reclaimPolicy` determines what happens. With `Delete`, the PV object and the underlying storage resource (e.g., an AWS EBS volume or GCE PD) are both automatically deleted. This prevents orphaned storage but means data is permanently lost unless backed up.",
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
      "Grafana Agent, which replaces both Prometheus and Elasticsearch with a unified collection pipeline"
    ],
    answer: 2,
    explanation: "Grafana supports multiple data sources, allowing a single dashboard to include panels that query different backends. You can have one panel querying Prometheus for metrics and another querying Elasticsearch for logs. Each panel specifies its data source, and Grafana handles the different query languages (PromQL, Lucene, etc.) natively.",
    verify: null
  },
  {
    id: "s09-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer runs <code>kubectl apply -f deployment.yaml</code> and the Deployment is created. Minutes later, another team member runs <code>kubectl edit deployment my-app</code> and changes the replica count. The next time the first developer runs <code>kubectl apply -f deployment.yaml</code> (which still has the original replica count), what happens to the replica count?",
    diagram: null,
    options: [
      "The replica count stays at the <code>kubectl edit</code> value because <code>kubectl apply</code> uses the last-applied annotation to detect changes",
      "The command fails with a conflict error because the live cluster state differs from the local manifest file that was applied",
      "Kubernetes automatically chooses the higher replica count to avoid disruption to the currently running workload in the cluster",
      "The replica count reverts to the file value because <code>kubectl apply</code> uses a three-way merge of the file, annotation, and live state"
    ],
    answer: 3,
    explanation: "`kubectl apply` performs a three-way merge between the local file, the `last-applied-configuration` annotation, and the live object. Since the replica count is explicitly declared in the YAML file and was part of the last-applied configuration, the three-way merge detects the field was not intentionally removed and applies the value from the file, overwriting the manual edit.",
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
      "Cluster-admin privileges because <code>kubectl exec</code> always requires cluster-wide RBAC access"
    ],
    answer: 2,
    explanation: "In Kubernetes RBAC, `kubectl exec` creates an exec subresource on the Pod. The required permission is the `create` verb on the `pods/exec` subresource, not a verb on the `pods` resource itself. Similarly, `kubectl port-forward` requires `create` on `pods/portforward`, and `kubectl logs` requires `get` on `pods/log`.",
    verify: "kubectl auth can-i create pods/exec -n dev --as=<user>"
  },
  {
    id: "s09-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team configures a Horizontal Pod Autoscaler (HPA) targeting 70% average CPU utilization for their Deployment with <code>minReplicas: 2</code> and <code>maxReplicas: 10</code>. Current average CPU utilization across 4 replicas is 90%. How does the HPA calculate the desired replica count?",
    diagram: null,
    options: [
      "It doubles the current replica count from 4 to 8 replicas to bring utilization below the target threshold",
      "It adds 1 replica at a time in successive reconciliation cycles until utilization drops below the 70% target",
      "It immediately scales to <code>maxReplicas</code> (10) because current utilization exceeds the configured target",
      "It computes <code>ceil(currentReplicas * (currentUtilization / targetUtilization))</code> = <code>ceil(4 * 90/70) = 6</code>"
    ],
    answer: 3,
    explanation: "The HPA uses the formula `desiredReplicas = ceil(currentReplicas * (currentMetricValue / desiredMetricValue))`. With 4 replicas at 90% utilization targeting 70%, this gives `ceil(4 * 90/70) = ceil(5.14) = 6`. The HPA scales to 6 replicas, then re-evaluates. It does not jump to max or add one at a time.",
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
      "The Jaeger metric aggregator, which computes average and percentile latency breakdowns for each service",
      "The Jaeger log correlator, which links structured log entries to specific trace spans for investigation"
    ],
    answer: 1,
    explanation: "Jaeger's trace timeline view displays a Gantt-style chart showing each span's duration, start time, and parent-child relationships across services. This visualization makes it immediately clear which service or operation contributes the most latency to the overall request. It is the primary tool for identifying bottlenecks in distributed traces.",
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
      "The service mesh disables TCP connection reuse, forcing a new TCP handshake for every single request"
    ],
    answer: 0,
    explanation: "Envoy sidecar proxies intercept both inbound and outbound traffic for each Pod. Each hop involves the source Pod's Envoy (egress), network transit, and the destination Pod's Envoy (ingress). The proxy adds latency for TLS handshakes, header parsing, load balancing decisions, and metrics collection. This 2-5ms overhead per hop is typical and is the trade-off for the features a service mesh provides.",
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
      "The kube-apiserver stops accepting new Pod creation requests until the scheduler recovers fully",
      "All Services lose their ClusterIP addresses because the scheduler is responsible for allocating them",
      "New Pods remain <code>Pending</code> with no node assignment, but existing running Pods are unaffected"
    ],
    answer: 3,
    explanation: "The kube-scheduler is responsible only for assigning Pods to nodes. If it is unavailable, newly created Pods that do not specify a `nodeName` remain in `Pending` state. Existing Pods that are already running on nodes are managed by the kubelet and are not affected. The API server continues to accept requests normally.",
    verify: "kubectl get pods --field-selector status.phase=Pending"
  },
  {
    id: "s09-q057",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team practices infrastructure as code (IaC) and stores all Kubernetes manifests in a Git repository. They want to ensure that any manual change made to the cluster (e.g., via <code>kubectl edit</code>) is detected and reverted automatically. Which approach achieves this?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="70" width="90" height="50" rx="8" fill="#2196F3" stroke="#1565C0" stroke-width="2"/><text x="55" y="100" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Git Repo</text><rect x="155" y="70" width="90" height="50" rx="8" fill="#FF9800" stroke="#E65100" stroke-width="2"/><text x="200" y="93" text-anchor="middle" fill="white" font-size="10" font-weight="bold">GitOps</text><text x="200" y="107" text-anchor="middle" fill="white" font-size="10" font-weight="bold">Controller</text><rect x="300" y="70" width="90" height="50" rx="8" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/><text x="345" y="100" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Cluster</text><line x1="100" y1="95" x2="153" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow9d)"/><line x1="245" y1="85" x2="298" y2="85" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow9d)"/><line x1="298" y1="105" x2="245" y2="105" stroke="#F44336" stroke-width="2" marker-end="url(#arrow9e)"/><text x="270" y="75" fill="#4CAF50" font-size="9">reconcile</text><text x="270" y="125" fill="#F44336" font-size="9">detect drift</text><text x="200" y="160" text-anchor="middle" fill="#333" font-size="10" font-style="italic">Continuous reconciliation loop</text><defs><marker id="arrow9d" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="arrow9e" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#F44336"/></marker></defs></svg>',
    options: [
      "Use a CronJob that periodically runs <code>kubectl apply</code> against all manifests stored in the Git repository",
      "Deploy a GitOps controller (Argo CD or Flux) with automated sync and self-healing to reconcile drift",
      "Configure RBAC to prevent all manual changes by removing edit permissions from every cluster user",
      "Set all Kubernetes resources to immutable using finalizers to block any modifications after creation"
    ],
    answer: 1,
    explanation: "GitOps controllers like Argo CD (with auto-sync and self-heal) or Flux continuously compare the desired state in Git with the actual state in the cluster. When drift is detected (e.g., from a manual `kubectl edit`), the controller automatically reverts the change to match the Git-defined state. This provides a reliable drift detection and remediation mechanism.",
    verify: null
  },
  {
    id: "s09-q058",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster has nodes in three availability zones: <code>zone-a</code>, <code>zone-b</code>, and <code>zone-c</code>. A Deployment with 6 replicas needs Pods spread evenly across zones. Which Kubernetes feature achieves this?",
    diagram: null,
    options: [
      "Pod affinity rules with <code>topologyKey: topology.kubernetes.io/zone</code> to colocate replicas in each zone",
      "Topology spread constraints with <code>maxSkew: 1</code> and <code>topologyKey: topology.kubernetes.io/zone</code>",
      "Node affinity rules that prefer nodes in each availability zone equally using weighted preferences",
      "Setting <code>replicas: 2</code> in three separate Deployments, with one Deployment targeted to each zone"
    ],
    answer: 1,
    explanation: "Topology spread constraints allow you to control how Pods are distributed across topology domains (like zones or nodes). Setting `maxSkew: 1` with `topologyKey: topology.kubernetes.io/zone` ensures that the difference in Pod count between any two zones is at most 1, resulting in 2 Pods per zone for 6 replicas across 3 zones.",
    verify: "kubectl get pods -o wide --sort-by='{.spec.nodeName}'"
  },
  {
    id: "s09-q059",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "An operations team notices that a container keeps getting OOM-killed despite the application process using only 500MB of memory. The container has a 2GB memory limit and uses an <code>emptyDir</code> with <code>medium: Memory</code>. What explains the OOM kills?",
    diagram: null,
    options: [
      "Memory-backed <code>emptyDir</code> volumes count against the container's memory limit, and the kernel OOM killer will terminate the container",
      "Memory limits in Kubernetes are advisory only and are never actually enforced by the container runtime or kernel cgroup settings",
      "The <code>tmpfs</code> mount completely bypasses cgroup memory accounting and is not tracked by the kernel memory controller",
      "Memory-backed <code>emptyDir</code> volumes count against Pod-level overhead, not the container limit, inflating node-level metrics"
    ],
    answer: 0,
    explanation: "When `emptyDir` uses `medium: Memory`, data is stored in a `tmpfs` filesystem that consumes RAM. This memory usage is charged to the container's cgroup and counts against its memory limit. Even though the application process itself uses only 500MB, if the tmpfs-backed emptyDir consumes enough data to push the combined total past 2GB, the kernel's OOM killer terminates the container.",
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
    explanation: "Certificate warnings typically occur when the common name (CN) or Subject Alternative Name (SAN) in the TLS certificate does not match the hostname the client is connecting to. If the `tls.hosts` field in the Ingress lists `app.example.com` but the certificate is issued for `*.other.com`, browsers display a warning. The Secret format itself is correct if it contains valid `tls.crt` and `tls.key` entries.",
    verify: "kubectl get secret <tls-secret> -o jsonpath='{.data.tls\\.crt}' | base64 -d | openssl x509 -noout -subject -dates"
  },
  {
    id: "s09-q061",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Prometheus instance is configured with a <code>scrape_interval</code> of 15 seconds and a <code>scrape_timeout</code> of 10 seconds. One target consistently takes 12 seconds to respond to scrape requests. What is the impact on Prometheus metrics collection for this target?",
    diagram: null,
    options: [
      "Prometheus waits the full 12 seconds and successfully collects the metrics from the slow target endpoint",
      "Prometheus automatically increases the timeout for targets that consistently respond slowly to scrapes",
      "The scrape fails because the 12-second response exceeds the 10-second `scrape_timeout` and `up` reads 0",
      "The target is permanently removed from the scrape configuration after three consecutive timeout failures"
    ],
    answer: 2,
    explanation: "When a scrape target's response time exceeds the configured `scrape_timeout`, Prometheus records the scrape as failed. The `up` metric for this target is set to `0`, indicating the target is unreachable. Prometheus does not auto-adjust timeouts. The solution is either to optimize the target's `/metrics` endpoint or increase the `scrape_timeout` in the Prometheus configuration.",
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
      "Change the image tag from <code>v2.0</code> to <code>latest</code> since private registries only serve the latest tag",
      "Add the registry URL to the CoreDNS configuration as a custom upstream resolver for private registry lookups"
    ],
    answer: 0,
    explanation: "The `unauthorized` error indicates that the container runtime cannot authenticate to the private registry. Kubernetes uses `imagePullSecrets` (Secrets of type `kubernetes.io/dockerconfigjson`) to provide registry credentials. These can be referenced directly in the Pod spec or attached to the default ServiceAccount in the namespace for automatic injection.",
    verify: "kubectl get secret -n <namespace> --field-selector type=kubernetes.io/dockerconfigjson"
  },
  {
    id: "s09-q063",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Kubernetes cluster runs version 1.28. A developer creates a Pod using the <code>apps/v1</code> API group for a Deployment and the <code>v1</code> API group for a ConfigMap. What determines which API group and version is used for a particular resource?",
    diagram: null,
    options: [
      "The developer can freely choose any API group for any resource type during manifest creation in the cluster",
      "The API group used for each resource is determined by the namespace in which the resource is being created",
      "All resources default to the <code>v1</code> API group and other API groups are deprecated in recent versions",
      "Each resource type belongs to a specific API group, and the API server only accepts the correct group"
    ],
    answer: 3,
    explanation: "Each Kubernetes resource type is defined in a specific API group. For example, Deployments belong to `apps/v1`, ConfigMaps to `v1` (core group), and NetworkPolicies to `networking.k8s.io/v1`. The API server validates that the resource type matches its expected API group and version, rejecting requests that use incorrect combinations.",
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
      "Shared database tables where each consumer service polls for new records on a scheduled interval",
      "gRPC bidirectional streaming configured between each pair of producer and consumer services"
    ],
    answer: 1,
    explanation: "The publish-subscribe pattern using a message broker decouples producers from consumers. A service publishes events to a topic, and multiple independent consumers subscribe to process those events asynchronously. This enables loose coupling, independent scaling, and fault isolation. NATS and Kafka are popular CNCF-adjacent choices for this pattern in cloud-native architectures.",
    verify: null
  },
  {
    id: "s09-q065",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a Deployment with <code>revisionHistoryLimit: 3</code>. After performing 7 rolling updates, how many old ReplicaSets are retained in the cluster?",
    diagram: null,
    options: [
      "3 old ReplicaSets as specified by <code>revisionHistoryLimit</code>, plus the current active ReplicaSet",
      "0 old ReplicaSets, because Kubernetes automatically cleans up all inactive ReplicaSets after updates",
      "7 old ReplicaSets are retained in the cluster, one for each historical revision of the Deployment",
      "1 old ReplicaSet is retained, representing only the immediately previous version of the Deployment"
    ],
    answer: 0,
    explanation: "The `revisionHistoryLimit` field controls how many old ReplicaSets (with 0 replicas) are kept for rollback purposes. With a limit of 3, Kubernetes retains the 3 most recent old ReplicaSets plus the current active one. Older ReplicaSets beyond the limit are garbage collected. This allows rolling back to any of the last 3 revisions.",
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
    explanation: "Setting `automountServiceAccountToken: false` prevents Kubernetes from automatically mounting the ServiceAccount's API token into the container. Without this token, processes inside the container cannot authenticate to the kube-apiserver using the ServiceAccount identity. This is a security hardening measure for Pods that do not need to interact with the Kubernetes API.",
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
      "The kubelet automatically restarts all Pods on the node to attempt reconnection to the API server endpoint",
      "All Pods on the node are immediately terminated by the container runtime when the network partition occurs",
      "The Pods are instantly rescheduled to other available nodes in the cluster without any termination delay"
    ],
    answer: 0,
    explanation: "When the kubelet loses contact with the API server, existing Pods keep running because the container runtime operates independently. However, the node's Lease object is not renewed, and the node controller marks the node as `NotReady`. After the configured toleration period (default 5 minutes via `node.kubernetes.io/not-ready` toleration), the control plane starts evicting Pods from the unreachable node.",
    verify: "kubectl get node <node-name> -o jsonpath='{.status.conditions[?(@.type==\"Ready\")].status}'"
  },
  {
    id: "s09-q068",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team implements a canary deployment by running 1 canary Pod alongside 9 stable Pods behind the same Service. They notice that the canary receives approximately 10% of traffic, which is expected. After monitoring for 30 minutes with no errors, they want to gradually increase canary traffic to 50% without changing the number of Pods. Which approach allows this?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="130" y="5" width="140" height="40" rx="8" fill="#7B1FA2" stroke="#4A148C" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Ingress / Mesh</text><rect x="20" y="80" width="160" height="50" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="100" y="105" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Stable (v1) - 9 Pods</text><text x="100" y="120" text-anchor="middle" fill="#90CAF9" font-size="10">50% traffic</text><rect x="220" y="80" width="160" height="50" rx="8" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="300" y="105" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Canary (v2) - 1 Pod</text><text x="300" y="120" text-anchor="middle" fill="#FFF9C4" font-size="10">50% traffic</text><line x1="170" y1="45" x2="100" y2="78" stroke="#1565C0" stroke-width="2" marker-end="url(#arrow9f)"/><line x1="230" y1="45" x2="300" y2="78" stroke="#F57F17" stroke-width="2" marker-end="url(#arrow9f)"/><text x="120" y="65" fill="#1565C0" font-size="10">50%</text><text x="265" y="65" fill="#F57F17" font-size="10">50%</text><rect x="50" y="170" width="300" height="50" rx="8" fill="#E8EAF6" stroke="#5C6BC0" stroke-width="1"/><text x="200" y="190" text-anchor="middle" fill="#333" font-size="10">Weighted routing decouples traffic split</text><text x="200" y="205" text-anchor="middle" fill="#333" font-size="10">from replica count</text><defs><marker id="arrow9f" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Scale the canary Deployment to 9 replicas to achieve an even 50/50 Pod ratio behind the shared Service",
      "Use a service mesh or Ingress controller with weighted routing to send 50% of traffic to the canary",
      "Modify the Kubernetes Service to use <code>sessionAffinity: ClientIP</code> with a 50% hash ring split",
      "Create two separate Services and configure DNS-based round-robin load balancing between them both"
    ],
    answer: 1,
    explanation: "Kubernetes Services distribute traffic roughly proportionally to the number of endpoints. To decouple traffic percentage from Pod count, you need a service mesh (Istio VirtualService with weight-based routing) or a smart Ingress controller (like NGINX with canary annotations). These tools allow precise traffic splitting such as sending 50% to the canary Pod regardless of replica count.",
    verify: null
  },
  {
    id: "s09-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses <code>kubectl create secret generic db-creds --from-literal=password=MyS3cret</code> to create a Secret. They later inspect the Secret with <code>kubectl get secret db-creds -o yaml</code> and see the value <code>TXlTM2NyZXQ=</code>. Is the password securely encrypted?",
    diagram: null,
    options: [
      "Yes, Kubernetes automatically encrypts all Secret values using AES-256 before storing them in etcd",
      "Yes, the Secret is encrypted using the cluster's built-in PKI infrastructure managed by the CA",
      "No, the value is only base64-encoded (not encrypted); encryption at rest must be configured separately",
      "No, the value is hashed with a one-way function, so the original password cannot be recovered"
    ],
    answer: 2,
    explanation: "Kubernetes Secrets are stored as base64-encoded strings by default, which is an encoding scheme, not encryption. Anyone with read access to Secrets can decode the value with `echo TXlTM2NyZXQ= | base64 -d`. For actual encryption, administrators must enable encryption at rest via an `EncryptionConfiguration` on the API server or use an external secrets manager.",
    verify: "kubectl get secret db-creds -o jsonpath='{.data.password}' | base64 -d"
  },
  {
    id: "s09-q070",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After upgrading a Deployment's container image, all new Pods are stuck in <code>Pending</code> state. Running <code>kubectl describe pod</code> shows: <code>0/3 nodes are available: 3 Insufficient cpu</code>. The existing Pods from the old ReplicaSet are still running. What is happening?",
    diagram: null,
    options: [
      "The new container image requires a different CPU architecture than the cluster's current worker nodes support",
      "The cluster has run out of available IP addresses in the Pod CIDR range configured for the cluster network",
      "The new Pod spec requests more CPU than available, and <code>maxUnavailable: 0</code> blocks old Pod termination",
      "The kube-scheduler is not running and therefore cannot assign any new Pods to the available cluster nodes"
    ],
    answer: 2,
    explanation: "With `maxUnavailable: 0` in the rolling update strategy, old Pods are not terminated until new Pods are ready. If the new Pod spec requests more CPU than the cluster has available (because the old Pods still occupy resources), the new Pods cannot be scheduled, creating a deadlock. The fix is to either reduce the CPU request, add node capacity, or temporarily set `maxUnavailable` to a non-zero value.",
    verify: "kubectl describe deployment <name> | grep -E 'Replicas|RollingUpdateStrategy'"
  },
  {
    id: "s09-q071",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An application team creates an <code>ExternalName</code> Service pointing to <code>db.legacy-datacenter.example.com</code>. A Pod resolves this Service name and attempts to connect. What does Kubernetes return for a DNS lookup of this Service?",
    diagram: null,
    options: [
      "The ClusterIP address of the Service, which the kube-proxy then forwards to the external hostname endpoint",
      "An A record containing the pre-resolved IP address of the external hostname as cached by the CoreDNS server",
      "A CNAME record pointing to <code>db.legacy-datacenter.example.com</code>, which the client then resolves",
      "The Service returns an error because ExternalName Services cannot resolve external hostnames in Kubernetes"
    ],
    answer: 2,
    explanation: "An ExternalName Service creates a CNAME DNS record that maps the Service name to the specified external hostname. When a Pod queries the Service DNS name, CoreDNS returns a CNAME record. The client (or resolver) then follows the CNAME to resolve the actual IP address. No proxying or ClusterIP is involved.",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.type}'"
  },
  {
    id: "s09-q072",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A security team wants to scan container images for known vulnerabilities before they are deployed to the Kubernetes cluster. They need a CNCF-hosted solution that integrates with their existing CI/CD pipeline and container registry. Which project should they consider?",
    diagram: null,
    options: [
      "Falco, which detects runtime security threats and anomalous behavior in running containers on the cluster",
      "Trivy, which scans container images, filesystems, and Git repos for vulnerabilities and misconfigurations",
      "OPA Gatekeeper, which enforces admission control policies on Kubernetes resources during API requests",
      "cert-manager, which automates the management and renewal of TLS certificates for cluster workloads"
    ],
    answer: 1,
    explanation: "Trivy (by Aqua Security, donated to CNCF) is a comprehensive vulnerability scanner that can scan container images, filesystems, and IaC files. It integrates easily into CI/CD pipelines and can be used as a registry scanning tool. Falco focuses on runtime threat detection, OPA Gatekeeper on policy enforcement, and cert-manager on certificate management.",
    verify: null
  },
  {
    id: "s09-q073",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A developer creates a PersistentVolumeClaim requesting <code>10Gi</code> of storage with <code>accessModes: [ReadWriteMany]</code>. The only available StorageClass provisions AWS EBS volumes. What happens?",
    diagram: null,
    options: [
      "The PVC is bound to a 10Gi EBS volume that supports ReadWriteMany access mode across multiple nodes",
      "The provisioner automatically creates an NFS share on top of the EBS volume to support shared access",
      "The PVC is created with <code>ReadWriteOnce</code> mode, silently ignoring the requested access mode",
      "The PVC stays `Pending` because AWS EBS only supports `ReadWriteOnce`, not `ReadWriteMany`"
    ],
    answer: 3,
    explanation: "AWS EBS volumes are block storage devices that can only be attached to a single EC2 instance at a time, supporting only `ReadWriteOnce` (RWO) access mode. A PVC requesting `ReadWriteMany` (RWX) cannot be satisfied by an EBS-backed StorageClass. The PVC stays `Pending` until a compatible volume (such as EFS or an NFS provisioner) becomes available.",
    verify: "kubectl get pvc -o wide"
  },
  {
    id: "s09-q074",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team uses an init container to pre-populate a shared volume with configuration data before the main application container starts. The init container exits with code 0, but the main container fails to find the expected files. What is the most likely issue?",
    diagram: null,
    options: [
      "Init containers cannot share any volumes with the main container due to Kubernetes isolation requirements for initialization",
      "The init and main containers mount different volumes or <code>mountPath</code> values, so files are written to one path and read from another",
      "Init container data is automatically cleared by the kubelet when the main container starts to ensure a clean filesystem state",
      "The init container's exit code 0 actually indicates it encountered an error during execution and did not write files successfully"
    ],
    answer: 1,
    explanation: "Init containers and main containers can share volumes, but they must reference the same volume name and the paths must align. If the init container writes to a volume mounted at `/data` but the main container mounts a different volume (or the same volume at a different path), the files will not be found. Verifying that both containers reference the same `volumeMounts` entry is key.",
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
    explanation: "When a high-priority Pod cannot be scheduled due to resource constraints, the scheduler identifies lower-priority Pods whose eviction would free enough resources. Those Pods are preempted (sent a termination signal), and once their resources are released, the high-priority Pod is scheduled. This is Kubernetes' priority-based preemption mechanism, controlled by PriorityClasses.",
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
    explanation: "All containers in a Pod share the same network namespace, meaning they share the same IP address and port space. If two containers attempt to listen on the same port, the second one fails with a \"port already in use\" error and crashes. This is why containers within a Pod must use different ports.",
    verify: "kubectl logs <pod-name> -c <container-name>"
  },
  {
    id: "s09-q077",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster uses Calico as the CNI plugin with <code>NetworkPolicy</code> enforcement enabled. A developer creates a Pod in the <code>app</code> namespace but does not create any NetworkPolicies in that namespace. What is the default network behavior for that Pod?",
    diagram: null,
    options: [
      "All ingress and egress traffic is denied by default when a CNI plugin with NetworkPolicy support is installed in the cluster",
      "Only egress traffic is allowed by default; all ingress traffic requires an explicit NetworkPolicy to be permitted in the namespace",
      "The Pod can only communicate with other Pods in the same namespace because cross-namespace traffic is blocked by default",
      "All traffic is allowed because no NetworkPolicy selects this Pod; Kubernetes follows a default-allow model until a policy applies"
    ],
    answer: 3,
    explanation: "Kubernetes uses a default-allow networking model. If no NetworkPolicy selects a Pod, all ingress and egress traffic to and from that Pod is permitted. Network isolation only begins when at least one NetworkPolicy selects the Pod. At that point, only traffic explicitly allowed by the policy rules is permitted; all other traffic matching the policy type is denied.",
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
      "Neither; these features should be implemented directly in each microservice's application code for maximum control and flexibility",
      "A DNS-based load balancer, because it natively supports mTLS and retry logic at the DNS resolution layer for all service traffic"
    ],
    answer: 1,
    explanation: "A service mesh is designed for managing east-west (service-to-service) communication in microservices architectures. It deploys sidecar proxies alongside each service to transparently handle mTLS, retries, circuit breaking, and observability. An API gateway is better suited for north-south (client-to-cluster) traffic. For 50+ services, a mesh scales better than routing all internal traffic through a centralized gateway.",
    verify: null
  },
  {
    id: "s09-q079",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A platform team wants to implement structured logging across all microservices in their Kubernetes cluster. Currently, some services log in JSON format while others use unstructured plain text. They use Fluentd to collect and parse logs. What is the primary benefit of standardizing on JSON-formatted structured logs?",
    diagram: null,
    options: [
      "JSON logs consume significantly less storage space than plain text logs due to their compact and compressed format",
      "Fluentd cannot parse plain text log formats under any circumstances and requires all input to be valid JSON",
      "Structured JSON logs enable consistent parsing and querying in log aggregation systems without custom regex",
      "JSON is the only format supported by Elasticsearch for log indexing and all other formats are rejected outright"
    ],
    answer: 2,
    explanation: "Structured JSON logs provide key-value pairs that log aggregation systems can parse automatically and consistently. This enables reliable filtering (e.g., by severity, request ID, or user) and indexing without custom regex patterns per service. While Fluentd can parse various formats, inconsistent unstructured logs require per-service parser configurations that are fragile and hard to maintain.",
    verify: null
  },
  {
    id: "s09-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster administrator wants to understand the flow of a Pod creation request. They submit a Deployment manifest via <code>kubectl apply</code>. In which order do the control plane components process this request?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="35" rx="6" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="200" y="27" text-anchor="middle" fill="white" font-size="10" font-weight="bold">kubectl apply</text><rect x="140" y="55" width="120" height="35" rx="6" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/><text x="200" y="77" text-anchor="middle" fill="white" font-size="10" font-weight="bold">API Server</text><rect x="20" y="110" width="100" height="35" rx="6" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="70" y="130" text-anchor="middle" fill="white" font-size="9" font-weight="bold">etcd</text><rect x="150" y="110" width="100" height="35" rx="6" fill="#7B1FA2" stroke="#4A148C" stroke-width="2"/><text x="200" y="127" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Controller</text><text x="200" y="139" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Manager</text><rect x="280" y="110" width="100" height="35" rx="6" fill="#C62828" stroke="#B71C1C" stroke-width="2"/><text x="330" y="132" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Scheduler</text><rect x="280" y="180" width="100" height="35" rx="6" fill="#00695C" stroke="#004D40" stroke-width="2"/><text x="330" y="202" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Kubelet</text><line x1="200" y1="40" x2="200" y2="53" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9g)"/><line x1="160" y1="90" x2="90" y2="108" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9g)"/><line x1="200" y1="90" x2="200" y2="108" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9g)"/><line x1="240" y1="90" x2="310" y2="108" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9g)"/><line x1="330" y1="145" x2="330" y2="178" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9g)"/><text x="50" y="100" fill="#333" font-size="8">persist</text><text x="175" y="100" fill="#333" font-size="8">watch</text><text x="290" y="100" fill="#333" font-size="8">bind</text><text x="345" y="165" fill="#333" font-size="8">run</text><text x="200" y="240" text-anchor="middle" fill="#555" font-size="9" font-style="italic">API Server &#8594; etcd &#8594; Controller Mgr &#8594; Scheduler &#8594; Kubelet</text><defs><marker id="arrow9g" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "kubectl sends the manifest to the scheduler, which forwards it to the API server for validation and storage in etcd",
      "API server stores the Deployment in etcd; controllers create ReplicaSet and Pods; scheduler assigns nodes; kubelet starts containers",
      "The kubelet directly receives the manifest from kubectl, creates the Pods locally, and reports status back to the API server",
      "etcd receives the manifest first, triggers the controller manager to process it, which then notifies the API server of changes"
    ],
    answer: 1,
    explanation: "The request flow is: (1) `kubectl` sends the manifest to the API server, which authenticates, authorizes, and validates it. (2) The API server persists the Deployment to etcd. (3) The Deployment controller (in kube-controller-manager) detects the new Deployment and creates a ReplicaSet, which in turn creates Pod objects. (4) The scheduler detects unassigned Pods and binds them to nodes. (5) The kubelet on each node starts the containers.",
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
      "Exactly 5 minutes after the broken manifest was deployed, regardless of when the fix was pushed later",
      "The fix is never applied automatically; Flux requires manual approval for all changes after a failure"
    ],
    answer: 1,
    explanation: "Flux reconciles on a configurable interval (5 minutes in this case). Without a Git webhook configured, Flux polls the repository at each interval. The fix will be applied at the next reconciliation cycle, which could be up to 5 minutes after the push. Configuring a webhook notification from Git to Flux triggers immediate reconciliation upon push, reducing the delay.",
    verify: "kubectl get gitrepository -A -o jsonpath='{.items[*].spec.interval}'"
  },
  {
    id: "s09-q082",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team runs a Deployment with a <code>strategy.type: Recreate</code>. They update the container image. What is the behavior during the update?",
    diagram: null,
    options: [
      "New Pods are created first, then old Pods are terminated only once the new ones pass their readiness checks",
      "Pods are replaced one at a time, similar to a rolling update strategy but with longer grace periods applied",
      "All existing Pods are terminated simultaneously, then new Pods are created, causing a brief downtime period",
      "The Deployment is paused until a cluster administrator manually reviews and approves the pending update"
    ],
    answer: 2,
    explanation: "The `Recreate` strategy terminates all existing Pods before creating new ones. This results in downtime between the old Pods being terminated and the new Pods becoming ready. It is used when the application cannot handle multiple versions running simultaneously, such as when there are database schema migration constraints or port conflicts.",
    verify: "kubectl get deployment <name> -o jsonpath='{.spec.strategy.type}'"
  },
  {
    id: "s09-q083",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A cluster administrator needs to restrict which container registries can be used for pulling images in the production namespace. They want to enforce that only images from <code>registry.company.com</code> are allowed. Which approach is most effective?",
    diagram: null,
    options: [
      "Configure <code>imagePullPolicy: Never</code> on all Pods to completely prevent pulling from any external registries",
      "Set a NetworkPolicy that blocks outbound traffic to all registries except <code>registry.company.com</code>",
      "Create a ResourceQuota that limits the number of images pulled from external container registries",
      "Use an admission controller (OPA Gatekeeper or Kyverno) to validate the image repository on Pod creation"
    ],
    answer: 3,
    explanation: "Admission controllers like OPA Gatekeeper or Kyverno can inspect Pod specs during creation and reject those with images from unauthorized registries. A policy can enforce that all image references start with `registry.company.com/`. NetworkPolicies could block traffic but are less precise and may break other functionality. `imagePullPolicy: Never` only works if the image is pre-cached on the node.",
    verify: "kubectl get constrainttemplate"
  },
  {
    id: "s09-q084",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team configures a Service of type <code>LoadBalancer</code> in a bare-metal Kubernetes cluster (no cloud provider). After creation, the Service shows <code>EXTERNAL-IP</code> as <code>&lt;pending&gt;</code> indefinitely. What is the likely cause and solution?",
    diagram: null,
    options: [
      "The Service YAML is malformed and needs the <code>loadBalancerIP</code> field explicitly specified in the spec",
      "The kube-proxy DaemonSet needs to be restarted to detect the new LoadBalancer Service type correctly",
      "Bare-metal clusters lack a cloud load balancer; MetalLB or similar must be installed to allocate IPs",
      "LoadBalancer Services are only supported in Kubernetes versions 1.25 and above with the feature gate"
    ],
    answer: 2,
    explanation: "The `LoadBalancer` Service type relies on an external cloud provider's load balancer integration to provision an external IP. In bare-metal environments, no such integration exists by default, so the external IP remains `<pending>`. MetalLB is a popular solution that provides a network load balancer implementation for bare-metal clusters, enabling IP address allocation for LoadBalancer Services.",
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
    explanation: "An API gateway (for north-south traffic) or service mesh (for east-west traffic) centralizes cross-cutting concerns at the infrastructure layer. This means individual services do not need to implement authentication, rate limiting, or logging themselves. The mesh/gateway handles these transparently via sidecar proxies or gateway pods, ensuring consistent enforcement without code duplication.",
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
      "Assigning each team a dedicated node pool and billing based on node count regardless of utilization",
      "Monitoring only the number of Pods per team since all Pods are assumed to consume equal resources"
    ],
    answer: 1,
    explanation: "Accurate cost allocation requires tracking actual resource usage (CPU and memory) per team. Using labels and namespaces to organize workloads, combined with tools like Kubecost or OpenCost (a CNCF sandbox project), enables granular cost reporting. These tools correlate resource usage with cloud billing data to provide per-team, per-application cost breakdowns.",
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
    explanation: "With `restartPolicy: Never`, the kubelet does not restart containers regardless of exit code. Since the container exited with a non-zero code (1), the Pod's phase is set to `Failed`. The Pod object remains in the cluster until manually deleted or cleaned up by a TTL controller (if configured). `Succeeded` status requires all containers to exit with code 0.",
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
      "<code>redis-0</code> is updated regardless of <code>redis-1</code> status because ordering is not enforced",
      "<code>redis-0</code> is not updated because the controller processes Pods in reverse ordinal and waits"
    ],
    answer: 3,
    explanation: "StatefulSet rolling updates proceed in reverse ordinal order (highest to lowest) by default. The controller updates one Pod at a time and waits for it to become ready before moving to the next. Since `redis-1` is not ready, the controller blocks and does not proceed to update `redis-0`. This ordered approach protects stateful workloads from cascading failures.",
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
      "Use <code>helm install --set replicaCount=1</code> or provide a separate <code>-f staging-values.yaml</code> to override",
      "Create a Kustomize overlay that patches the Helm template output after rendering to change the replica count",
      "Set an environment variable <code>HELM_REPLICA_COUNT=1</code> before running <code>helm install</code> for staging"
    ],
    answer: 1,
    explanation: "Helm allows overriding default values at install or upgrade time using `--set` flags or `-f` with a custom values file. The `--set replicaCount=1` flag overrides the chart's `values.yaml` without modifying it. Using a separate `staging-values.yaml` file is preferred for complex overrides, as it is version-controllable and easier to maintain than inline `--set` flags.",
    verify: "helm get values my-release"
  },
  {
    id: "s09-q090",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node in the cluster has the taint <code>node.kubernetes.io/memory-pressure:NoSchedule</code> applied automatically by the kubelet. What caused this taint to appear?",
    diagram: null,
    options: [
      "An administrator manually tainted the node during a scheduled maintenance window for workload draining",
      "The kube-scheduler applied the taint because too many Pods were already running on the node at capacity",
      "The kubelet detected available memory fell below the eviction threshold and applied the taint automatically",
      "The taint was added by the kube-controller-manager due to a failed node health check on memory status"
    ],
    answer: 2,
    explanation: "The kubelet automatically applies condition-based taints when it detects resource pressure. The `node.kubernetes.io/memory-pressure:NoSchedule` taint indicates that available memory is below the configured eviction threshold. This prevents new Pods from being scheduled on the node while existing Pods may be evicted based on their QoS class and priority.",
    verify: "kubectl describe node <node-name> | grep -A5 'Taints'"
  },
  {
    id: "s09-q091",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A Kubernetes cluster is configured with multiple RuntimeClasses: <code>runc</code> (default), <code>gvisor</code>, and <code>kata</code>. A Pod spec includes <code>runtimeClassName: gvisor</code>. What does this configure?",
    diagram: null,
    options: [
      "The Pod's containers use gVisor (runsc) for user-space kernel sandboxing instead of the default runc runtime",
      "The Pod is scheduled only on nodes that have gVisor hardware acceleration capabilities and kernel support",
      "The Pod uses gVisor's built-in container image format instead of OCI-compliant images for its containers",
      "The kubelet downloads and installs the gVisor runtime on the node automatically before starting the Pod"
    ],
    answer: 0,
    explanation: "The `runtimeClassName` field in a Pod spec selects which container runtime handler processes the Pod. When set to `gvisor`, the containerd (or CRI-O) runtime uses the gVisor (runsc) handler instead of the default runc. gVisor intercepts system calls in user space, providing an additional isolation layer. The RuntimeClass must be pre-configured on the cluster with the corresponding handler.",
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
      "The kubelet immediately kills the container and waits 60 seconds before removing the Pod object from the API server",
      "The Pod continues to receive new traffic from the Service for 60 seconds before being removed from Endpoints"
    ],
    answer: 0,
    explanation: "When a Pod is terminated, the kubelet first sends SIGTERM to the container's main process. The container then has `terminationGracePeriodSeconds` (60 seconds in this case) to perform cleanup operations like finishing in-flight requests, closing connections, and flushing buffers. If the container has not exited after 60 seconds, the kubelet sends SIGKILL to forcefully terminate it.",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.terminationGracePeriodSeconds}'"
  },
  {
    id: "s09-q093",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team evaluates KEDA (Kubernetes Event-Driven Autoscaling) for their event-processing workload that consumes messages from an Apache Kafka topic. How does KEDA differ from the standard Horizontal Pod Autoscaler?",
    diagram: null,
    options: [
      "KEDA replaces the HPA entirely and cannot coexist with it in the same Kubernetes cluster installation",
      "KEDA scales on external event sources (Kafka lag, queue depth) and supports scaling to zero replicas",
      "KEDA only supports scaling CronJobs and cannot be used with Deployments or StatefulSet workloads",
      "KEDA provides faster scaling by bypassing the Kubernetes API server and directly managing Pod counts"
    ],
    answer: 1,
    explanation: "KEDA extends Kubernetes autoscaling by providing scalers for external event sources like Kafka, RabbitMQ, Azure Queue, AWS SQS, and many others. Unlike the standard HPA (which scales based on CPU/memory or custom metrics with a minimum of 1 replica), KEDA can scale workloads to and from zero based on event-driven triggers. KEDA actually creates and manages HPA objects under the hood.",
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
      "Node CPU utilization and memory usage at the hardware level collected from system-level exporters",
      "Container-level resource consumption metrics such as CPU throttling and memory working set size",
      "Network bandwidth metrics for inter-Pod communication measured at the container network interface"
    ],
    answer: 0,
    explanation: "kube-state-metrics generates metrics about the state of Kubernetes objects by watching the API server. It exposes information like the number of desired vs. available replicas in a Deployment, Pod phase (Pending, Running, Failed), Job success/failure counts, and node conditions. These are complementary to node_exporter (hardware metrics) and cAdvisor (container resource metrics).",
    verify: "kubectl get deployment kube-state-metrics -n kube-system"
  },
  {
    id: "s09-q095",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator uses <code>kubectl annotate pod my-pod description=\"web server\"</code> to add an annotation. Another team member tries to use this annotation in a <code>nodeSelector</code> to influence scheduling. Does this work?",
    diagram: null,
    options: [
      "Yes, annotations and labels are interchangeable for scheduling purposes in all Kubernetes versions",
      "Yes, but only if the annotation key follows the DNS naming convention required for node selectors",
      "No, annotations can only be added to namespace-scoped objects like namespaces, not individual Pods",
      "No, annotations are metadata not used by selectors or scheduling; only labels support selection"
    ],
    answer: 3,
    explanation: "Annotations and labels serve different purposes in Kubernetes. Labels are key-value pairs used for identification and selection by controllers, Services, and scheduling constraints. Annotations are key-value pairs for storing arbitrary non-identifying metadata (such as descriptions, tool configurations, or build information). They cannot be used in selectors, `nodeSelector`, or affinity rules.",
    verify: "kubectl get pod my-pod -o jsonpath='{.metadata.annotations}'"
  },
  {
    id: "s09-q096",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team runs a Pod with <code>hostNetwork: true</code> in its spec. The application inside the Pod binds to port 80. What are the networking implications?",
    diagram: null,
    options: [
      "The Pod receives a dedicated ClusterIP that routes traffic on port 80 through the kube-proxy rules",
      "The Pod creates a virtual network interface on the host that NATs all traffic to port 80 via iptables",
      "The Pod shares the host network namespace, binding to the node's IP on port 80, one Pod per node",
      "The Pod can only communicate with other Pods using <code>hostNetwork: true</code> in the same cluster"
    ],
    answer: 2,
    explanation: "When `hostNetwork: true` is set, the Pod uses the node's network namespace directly instead of getting its own. The container binds to the node's IP address on port 80, making it accessible via `<node-ip>:80`. This also means only one Pod with this configuration can bind to port 80 per node, since the port is occupied at the host level.",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.hostNetwork}'"
  },
  {
    id: "s09-q097",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team uses Kustomize to manage environment-specific configurations. They have a base Deployment manifest and overlays for <code>dev</code>, <code>staging</code>, and <code>production</code>. The production overlay needs to change the replica count from 1 (base) to 5 and add a production-specific environment variable. How does Kustomize handle this?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="40" rx="8" fill="#455A64" stroke="#263238" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="white" font-size="11" font-weight="bold">base/</text><rect x="20" y="90" width="100" height="40" rx="8" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><text x="70" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">dev/</text><rect x="150" y="90" width="100" height="40" rx="8" fill="#F57F17" stroke="#E65100" stroke-width="2"/><text x="200" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">staging/</text><rect x="280" y="90" width="100" height="40" rx="8" fill="#C62828" stroke="#B71C1C" stroke-width="2"/><text x="330" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">production/</text><line x1="170" y1="45" x2="80" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9h)"/><line x1="200" y1="45" x2="200" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9h)"/><line x1="230" y1="45" x2="320" y2="88" stroke="#333" stroke-width="1.5" marker-end="url(#arrow9h)"/><text x="200" y="165" text-anchor="middle" fill="#333" font-size="10">Overlays patch the base without modifying it</text><rect x="250" y="140" width="160" height="30" rx="5" fill="#FFEBEE" stroke="#C62828" stroke-width="1"/><text x="330" y="160" text-anchor="middle" fill="#C62828" font-size="9">replicas: 5, env vars added</text><defs><marker id="arrow9h" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs></svg>',
    options: [
      "Overlays contain patches applied on top of base resources at build time, producing environment-specific output",
      "Kustomize directly modifies the base manifest files in place for each environment during the build process",
      "Kustomize generates Helm charts from the base and injects environment-specific values per overlay directory",
      "Each overlay must contain a complete copy of all base manifests with the required modifications pre-applied"
    ],
    answer: 0,
    explanation: "Kustomize uses a layered approach where the base directory contains shared manifests and each overlay contains patches (strategic merge patches or JSON patches) plus a `kustomization.yaml` referencing the base. Running `kubectl kustomize overlays/production` merges the patches with the base at build time, producing the final manifests. The base files are never modified.",
    verify: "kubectl kustomize overlays/production"
  },
  {
    id: "s09-q098",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A Kubernetes cluster uses the <code>admission webhook</code> mechanism. A ValidatingWebhookConfiguration is configured to validate all Pod creation requests. If the webhook endpoint is unreachable, what happens to Pod creation attempts by default?",
    diagram: null,
    options: [
      "It depends on <code>failurePolicy</code>: <code>Fail</code> rejects the request; <code>Ignore</code> lets it proceed",
      "The API server retries the webhook indefinitely until the endpoint becomes available and responds back",
      "All admission webhooks in the cluster are automatically disabled when any single webhook is unreachable",
      "Pod creation proceeds normally because validating admission webhooks are advisory only and never block"
    ],
    answer: 0,
    explanation: "The `failurePolicy` field in a webhook configuration determines behavior when the webhook endpoint is unreachable. The default is `Fail`, which rejects the API request to ensure that validation cannot be bypassed. Setting it to `Ignore` allows the request to proceed, which is less secure but prevents webhook outages from blocking cluster operations.",
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
      "The startup probe completely replaces both the liveness and readiness probes for the lifetime of the container",
      "The startup probe runs first (up to 300s); liveness and readiness probes start only after it succeeds",
      "The startup probe only affects the readiness probe; the liveness probe runs independently from container start"
    ],
    answer: 2,
    explanation: "The startup probe is designed for applications with long initialization times. It disables both liveness and readiness probes until it succeeds. With `failureThreshold: 30` and `periodSeconds: 10`, the application has up to 300 seconds to start. Once the startup probe succeeds, it is never run again, and the liveness and readiness probes take over for ongoing health monitoring.",
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
    explanation: "OPA Gatekeeper and Kyverno are Kubernetes-native policy engines that operate as admission webhooks. They evaluate resource creation and modification requests against declarative policies and can reject non-compliant resources before they are persisted. Gatekeeper uses Rego language for policies, while Kyverno uses Kubernetes-native YAML-based policies. Both are CNCF projects that provide audit and enforcement capabilities.",
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
