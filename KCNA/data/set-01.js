var EXAM_SET = 1;
var EXAM_TITLE = "KCNA Practice Exam - Set 01: Foundations & Core Concepts";
var questions = [
  {
    id: "s01-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A startup is deploying its first application on Kubernetes. The team needs to run a single instance of their web server container. A junior engineer suggests creating a standalone container directly on a node. What is the correct Kubernetes approach to run this workload?",
    diagram: null,
    options: [
      "Use `docker run` directly on the worker node to start the container outside Kubernetes control",
      "Add the container definition to the kubelet's static configuration directory without a Pod spec",
      "SSH into the node and use `containerd` to start the container with the correct namespace set",
      "Create a Pod manifest that wraps the container and submit it to the API server for scheduling"
    ],
    answer: 3,
    explanation: "In Kubernetes, the Pod is the smallest deployable unit, and every container must run inside a Pod. The correct approach is to define a Pod manifest specifying the container image and submit it to the API server via `kubectl apply`. Running containers directly via `docker run` or `containerd` bypasses the Kubernetes control plane entirely. While static pods exist, they still require a Pod spec, not a bare container definition.",
    verify: "microk8s kubectl run test-pod --image=nginx --dry-run=client -o yaml"
  },
  {
    id: "s01-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A platform team is troubleshooting why newly created Pods remain in a `Pending` state. They discover that no worker nodes are registered with the cluster. Which control plane component is responsible for assigning Pods to nodes once they become available?",
    diagram: null,
    options: [
      "The `kube-controller-manager`, which monitors node health and assigns workloads",
      "The `kube-scheduler`, which watches for unscheduled Pods and binds them to nodes",
      "The `etcd` datastore, which triggers scheduling events when Pod objects are created",
      "The `kube-proxy`, which routes Pod creation requests to available worker nodes"
    ],
    answer: 1,
    explanation: "The `kube-scheduler` is the control plane component responsible for watching for newly created Pods that have no node assigned and selecting appropriate nodes for them to run on. The `kube-controller-manager` runs controllers like the node controller but does not directly schedule Pods. `etcd` is a key-value store for cluster state, and `kube-proxy` handles network rules for Services, not scheduling.",
    verify: "microk8s kubectl get pods -n kube-system -l component=kube-scheduler"
  },
  {
    id: "s01-q003",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An SRE team notices that when a container inside a Pod crashes, Kubernetes automatically restarts it. They want to understand this behavior better. Which component running on each node is directly responsible for ensuring containers within Pods are running as specified?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#2d2d2d" stroke="#555" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#ccc" font-size="14" font-weight="bold">Worker Node</text><rect x="30" y="50" width="140" height="45" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="100" y="78" text-anchor="middle" fill="white" font-size="13">???</text><rect x="30" y="110" width="140" height="45" rx="6" fill="#555" stroke="#aaa" stroke-width="1.5"/><text x="100" y="138" text-anchor="middle" fill="white" font-size="13">Container Runtime</text><rect x="220" y="50" width="150" height="105" rx="6" fill="#444" stroke="#aaa" stroke-width="1.5"/><text x="295" y="75" text-anchor="middle" fill="#ccc" font-size="12">Pod</text><rect x="235" y="85" width="120" height="25" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="295" y="103" text-anchor="middle" fill="white" font-size="11">Container (crashed)</text><rect x="235" y="120" width="120" height="25" rx="4" fill="#4CAF50" stroke="#fff" stroke-width="1"/><text x="295" y="138" text-anchor="middle" fill="white" font-size="11">Container (restarting)</text><line x1="170" y1="72" x2="220" y2="100" stroke="#FFD700" stroke-width="2" stroke-dasharray="5,3"/><text x="195" y="80" fill="#FFD700" font-size="10">manages</text></svg>',
    options: [
      "The `kube-scheduler`, which reschedules crashed containers on the same worker node",
      "The container runtime interface daemon, which independently monitors and restarts them",
      "The `kubelet`, which ensures containers described in PodSpecs are running and healthy",
      "The `kube-controller-manager` via the ReplicaSet controller and its reconciliation loop"
    ],
    answer: 2,
    explanation: "The `kubelet` is the primary node agent that runs on each worker node. It watches for PodSpecs assigned to its node and ensures the containers described in those specs are running and healthy. When a container crashes, the kubelet detects this and restarts it according to the Pod's restart policy. The scheduler only assigns Pods to nodes initially. The CRI runtime executes containers but does not make restart decisions independently.",
    verify: "microk8s kubectl get nodes -o wide"
  },
  {
    id: "s01-q004",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A DevOps engineer is setting up a new Kubernetes cluster and needs to choose a container runtime. The cluster must comply with the Kubernetes Container Runtime Interface (CRI). Which of the following is a valid CRI-compliant runtime that Kubernetes can use natively since v1.24?",
    diagram: null,
    options: [
      "`dockerd` using the built-in dockershim adapter",
      "`rkt` (Rocket) with the appc specification",
      "`containerd` with the CRI plugin enabled",
      "`LXC` with the Kubernetes bridge module"
    ],
    answer: 2,
    explanation: "`containerd` is a CRI-compliant container runtime that Kubernetes supports natively. Since Kubernetes v1.24, the dockershim was removed, so `dockerd` cannot be used directly without an external adapter like `cri-dockerd`. `rkt` was deprecated and is no longer maintained. `LXC` is a Linux container technology but does not implement the CRI specification and has no Kubernetes bridge module.",
    verify: "microk8s kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.containerRuntimeVersion}'"
  },
  {
    id: "s01-q005",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team is debugging network connectivity between two Pods running on different nodes in their cluster. Pod A on Node 1 cannot reach Pod B on Node 2. Which Kubernetes networking requirement states that all Pods must be able to communicate with each other without NAT?",
    diagram: null,
    options: [
      "The Service mesh specification, which requires all inter-pod traffic to pass through sidecar proxies on each node",
      "The network namespace isolation rule, which requires explicit NetworkPolicy objects to allow cross-node traffic",
      "The NodePort requirement, which mandates that all Pod traffic routes through the node's external IP address range",
      "The Kubernetes flat networking model, where every Pod gets a unique cluster-wide IP and can reach any other Pod"
    ],
    answer: 3,
    explanation: "Kubernetes mandates a flat networking model where every Pod receives its own unique IP address and can communicate with any other Pod across any node without NAT. This is a fundamental requirement that CNI plugins must implement. Service meshes are optional overlays. NodePort is a Service type, not a networking requirement. NetworkPolicy is opt-in — by default, all Pod-to-Pod traffic is allowed.",
    verify: null
  },
  {
    id: "s01-q006",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A CTO is evaluating whether to adopt cloud native principles for their organization's software platform. They want to understand the core benefit that distinguishes cloud native applications from traditional monolithic deployments. Which statement best describes the primary advantage?",
    diagram: null,
    options: [
      "Cloud native applications always cost less because they exclusively use serverless infrastructure for workloads",
      "Cloud native applications must be written in Go or Rust to achieve the required performance characteristics",
      "Cloud native applications eliminate the need for operational staff because they are fully self-healing systems",
      "Cloud native applications are loosely coupled, resilient, and scalable, enabling reliable changes via automation"
    ],
    answer: 3,
    explanation: "According to the CNCF definition, cloud native technologies enable organizations to build and run scalable applications that are loosely coupled, resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably. Cloud native does not mandate specific languages, does not eliminate operations teams, and does not guarantee lower costs in all cases.",
    verify: null
  },
  {
    id: "s01-q007",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A development team is breaking a monolithic e-commerce application into microservices on Kubernetes. They are deciding how to handle the product catalog, which is currently a module within the monolith. What is the recommended microservices approach for this component?",
    diagram: null,
    options: [
      "Deploy the catalog as a separate service with its own database, communicating via well-defined APIs",
      "Keep the catalog module in the monolith but expose it through a Kubernetes Service to simulate independence",
      "Deploy the catalog code as a sidecar container inside every Pod that needs access to product data",
      "Create a shared library for the catalog logic and embed it in all consuming microservices at build time"
    ],
    answer: 0,
    explanation: "The core microservices principle is that each service should own its data and expose functionality through well-defined APIs. Deploying the catalog as an independent service with its own database ensures loose coupling and independent deployability. Keeping it in the monolith defeats the purpose. A sidecar pattern is for cross-cutting concerns like logging, not business logic. Shared libraries create tight coupling between services.",
    verify: null
  },
  {
    id: "s01-q008",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "An operations team has deployed a Kubernetes cluster and wants to set up monitoring for cluster-level metrics such as CPU usage, memory consumption, and Pod counts. Which tool from the CNCF ecosystem is the de facto standard for collecting and querying time-series metrics in Kubernetes environments?",
    diagram: null,
    options: [
      "Fluentd, which collects and forwards metric data from nodes to a central backend",
      "Grafana, which collects metrics directly from kubelets and stores them internally",
      "Prometheus, which scrapes metric endpoints and stores time-series data natively",
      "Jaeger, which provides distributed metrics collection and aggregation pipelines"
    ],
    answer: 2,
    explanation: "Prometheus is the CNCF graduated project that serves as the standard for metrics collection in Kubernetes. It uses a pull-based model to scrape metric endpoints and stores data as time series. Fluentd is for log aggregation, not metrics. Jaeger is for distributed tracing. Grafana is a visualization tool that queries data sources like Prometheus but does not collect or store metrics itself.",
    verify: null
  },
  {
    id: "s01-q009",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A platform team needs to deploy a complex application stack consisting of multiple Deployments, Services, ConfigMaps, and Ingress resources. They want a repeatable, parameterized way to package and deploy this stack across multiple environments. Which tool is most appropriate?",
    diagram: null,
    options: [
      "Use `kubectl apply -f` with a directory of static YAML manifests for each environment",
      "Use `kubectl create` with `--dry-run` to generate environment-specific manifests manually",
      "Use `kubectl patch` to modify a single base manifest at deploy time for each environment",
      "Use Helm charts with templated manifests and environment-specific `values.yaml` files"
    ],
    answer: 3,
    explanation: "Helm is the Kubernetes package manager that allows teams to define, version, and deploy applications as charts. Charts contain templated manifests that can be parameterized using `values.yaml` files, making it easy to deploy the same application with different configurations across environments. Static YAML lacks parameterization. `kubectl patch` is for modifying existing resources, not packaging. `--dry-run` is for validation, not deployment.",
    verify: null
  },
  {
    id: "s01-q010",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A data processing team needs to run a batch job that processes a dataset and then exits. They want Kubernetes to ensure the job runs to completion, retrying on failure up to 3 times. Which workload resource should they use?",
    diagram: null,
    options: [
      "A Deployment with `replicas: 1` and a restart policy set to `Always`",
      "A standalone Pod with `restartPolicy: OnFailure` and manual monitoring",
      "A DaemonSet configured to run on nodes with the `batch-processing` label",
      "A Job resource with `backoffLimit: 3` and the default restart policy"
    ],
    answer: 3,
    explanation: "A Kubernetes Job is designed for batch workloads that run to completion. Setting `backoffLimit: 3` tells Kubernetes to retry the Job up to 3 times if it fails. A Deployment is for long-running services and would restart the Pod indefinitely. A DaemonSet ensures a Pod runs on every matching node, which is not suitable for batch processing. A standalone Pod lacks the retry management that the Job controller provides.",
    verify: "microk8s kubectl create job test-job --image=busybox --dry-run=client -o yaml -- echo done"
  },
  {
    id: "s01-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team has deployed a web application as a Deployment with 3 replicas. Internal services in the cluster need to access this application using a stable DNS name. Which Service type provides a stable internal cluster IP and DNS entry without exposing the application outside the cluster?",
    diagram: null,
    options: [
      "A `NodePort` Service, which assigns a static port on all cluster worker nodes",
      "A `LoadBalancer` Service with the `internal` annotation set to value `true`",
      "An `ExternalName` Service, which creates a CNAME record for the Deployment",
      "A `ClusterIP` Service, the default type providing a stable internal virtual IP"
    ],
    answer: 3,
    explanation: "A `ClusterIP` Service is the default Service type in Kubernetes. It allocates a virtual IP address reachable only within the cluster and creates a DNS entry in the form `<service-name>.<namespace>.svc.cluster.local`. NodePort exposes the service externally on a static port. LoadBalancer provisions an external load balancer. ExternalName maps to an external DNS name, not to internal Pods.",
    verify: "microk8s kubectl expose deployment nginx --port=80 --type=ClusterIP --dry-run=client -o yaml"
  },
  {
    id: "s01-q012",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security audit reveals that containers in a production cluster are running as the root user by default. The security team mandates that no container should run as root. Which Kubernetes feature should be configured to enforce this requirement at the Pod level?",
    diagram: null,
    options: [
      "Set `privileged: true` in the container's `securityContext` to enable user isolation",
      "Configure a `securityContext` with `runAsNonRoot: true` on the Pod or container spec",
      "Apply a `ResourceQuota` that limits the number of containers running as root per namespace",
      "Create a `LimitRange` object that sets the default user ID to a non-root value"
    ],
    answer: 1,
    explanation: "The `securityContext` field in a Pod or container spec allows you to set `runAsNonRoot: true`, which tells the kubelet to reject any container that attempts to run as UID 0. Setting `privileged: true` actually grants more permissions, not less. `ResourceQuota` controls resource consumption like CPU and memory limits. `LimitRange` sets default resource requests and limits, not security settings.",
    verify: null
  },
  {
    id: "s01-q013",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "During a disaster recovery drill, the team shuts down the `etcd` cluster to simulate a failure. They observe that the API server becomes unresponsive, but existing Pods on worker nodes continue running. Why do the Pods keep running despite `etcd` being down?",
    diagram: null,
    options: [
      "Worker nodes cache the full cluster state locally and operate independently of the entire control plane",
      "The `kube-proxy` takes over Pod management duties when the control plane becomes unavailable to the cluster",
      "The `kubelet` on each node continues managing running Pods using local state, without control plane access",
      "Pods are managed by the container runtime, which has no dependency on any Kubernetes control plane component"
    ],
    answer: 2,
    explanation: "The `kubelet` on each worker node manages Pods on that node and maintains local knowledge of the Pods it is running. When the control plane (including `etcd`) goes down, the kubelet continues to keep existing Pods running based on its last known state. However, no new Pods can be scheduled and no changes can be made. Worker nodes do not cache the full cluster state. `kube-proxy` handles networking, not Pod management. The container runtime executes containers but relies on the kubelet for orchestration decisions.",
    verify: null
  },
  {
    id: "s01-q014",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A stateful application requires persistent storage that survives Pod restarts and rescheduling. The team wants to decouple the storage request from the actual storage provisioning. Which pair of Kubernetes resources provides this abstraction?",
    diagram: null,
    options: [
      "`ConfigMap` for storage configuration paired with `Secret` for the storage credentials",
      "`PersistentVolume` (PV) for actual storage and `PersistentVolumeClaim` (PVC) for requests",
      "`StorageClass` for provisioning configuration and `VolumeSnapshot` for requesting the data",
      "`emptyDir` volume for temporary storage combined with `hostPath` volume for persistent data"
    ],
    answer: 1,
    explanation: "Kubernetes uses `PersistentVolume` (PV) to represent actual storage resources and `PersistentVolumeClaim` (PVC) as a user's request for storage. This separation decouples the storage consumer from the provider. ConfigMaps and Secrets store configuration data, not persistent storage. StorageClass defines how to provision PVs but is not a storage request. `emptyDir` is ephemeral and `hostPath` ties storage to a specific node.",
    verify: "microk8s kubectl get pv,pvc --all-namespaces"
  },
  {
    id: "s01-q015",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A company is evaluating CNCF projects for their cloud native stack. They want to adopt only projects that have demonstrated widespread production adoption and meet the CNCF's highest maturity standard. What is the highest maturity level a CNCF project can achieve?",
    diagram: null,
    options: [
      "Incubating, which indicates the project is production-ready and widely adopted by users",
      "Graduated, which signifies the project has met rigorous maturity and adoption criteria",
      "Stable, which means the project's API is frozen and no breaking changes will ever occur",
      "Enterprise, which certifies the project for regulated industry use and compliance needs"
    ],
    answer: 1,
    explanation: "The CNCF has three maturity levels: Sandbox, Incubating, and Graduated. Graduated is the highest level and indicates that a project has demonstrated thriving adoption, a healthy rate of changes, and strong governance. Incubating is the middle tier. There are no maturity levels called 'Stable' or 'Enterprise' in the CNCF framework.",
    verify: null
  },
  {
    id: "s01-q016",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "An SRE team needs to aggregate logs from all containers running across a Kubernetes cluster into a centralized logging backend. They want the solution to run automatically on every node without manual scheduling. Which Kubernetes pattern and resource combination is most appropriate?",
    diagram: null,
    options: [
      "Deploy a logging agent as a sidecar container inside every application Pod",
      "Deploy a single logging Deployment with `replicas` equal to the node count",
      "Run a logging agent as a DaemonSet so one instance runs on each node automatically",
      "Configure the kubelet to forward all container logs to the backend service directly"
    ],
    answer: 2,
    explanation: "Running a logging agent (like Fluentd or Fluent Bit) as a DaemonSet ensures that exactly one agent Pod runs on every node in the cluster, automatically handling node additions and removals. The agent collects logs from all containers on its node. A sidecar per Pod adds overhead and complexity. A Deployment does not guarantee one Pod per node. The kubelet writes logs to disk but does not natively forward them to external backends.",
    verify: "microk8s kubectl get daemonsets -n kube-system"
  },
  {
    id: "s01-q017",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team wants to adopt GitOps for managing their Kubernetes deployments. They want the cluster state to always match the desired state defined in a Git repository, with automatic reconciliation when drift is detected. Which describes the core GitOps principle?",
    diagram: null,
    options: [
      "Developers push changes to Git, and a CI pipeline runs `kubectl apply` to deploy changes directly to the cluster",
      "Operations staff manually review Git diffs and apply approved changes using `kubectl` during maintenance windows",
      "The Git repository triggers webhooks that invoke the Kubernetes API server directly to create or update resources",
      "An agent in the cluster continuously reconciles the actual state with the desired state declared in Git"
    ],
    answer: 3,
    explanation: "The core GitOps principle involves a cluster-resident agent (like Argo CD or Flux) that continuously watches a Git repository and reconciles the cluster state to match the declared desired state. This pull-based approach is more secure than push-based CI pipelines because the cluster pulls changes rather than external systems pushing to it. Direct webhook invocations and manual operations do not provide continuous reconciliation.",
    verify: null
  },
  {
    id: "s01-q018",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer defines a Pod with two containers: an application container and a logging sidecar that reads the application's log files from a shared volume. What is this multi-container pattern called, and how do the containers within the Pod communicate?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="360" height="160" rx="10" fill="#333" stroke="#326CE5" stroke-width="2"/><text x="200" y="45" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Pod</text><rect x="40" y="60" width="140" height="50" rx="6" fill="#0db7ed" stroke="#fff" stroke-width="1.5"/><text x="110" y="90" text-anchor="middle" fill="white" font-size="12">App Container</text><rect x="220" y="60" width="140" height="50" rx="6" fill="#FF9800" stroke="#fff" stroke-width="1.5"/><text x="290" y="90" text-anchor="middle" fill="white" font-size="12">Sidecar Container</text><rect x="100" y="130" width="200" height="35" rx="6" fill="#4CAF50" stroke="#fff" stroke-width="1.5"/><text x="200" y="152" text-anchor="middle" fill="white" font-size="12">Shared Volume (emptyDir)</text><line x1="110" y1="110" x2="160" y2="130" stroke="#aaa" stroke-width="1.5"/><line x1="290" y1="110" x2="240" y2="130" stroke="#aaa" stroke-width="1.5"/></svg>',
    options: [
      "The sidecar pattern; containers share the same network namespace and can share volumes",
      "The ambassador pattern; containers communicate via Kubernetes Service DNS with proxying",
      "The adapter pattern; containers communicate through a shared ConfigMap updated in real time",
      "The init container pattern; the logging container runs first then passes control to the app"
    ],
    answer: 0,
    explanation: "This is the sidecar pattern, where a helper container runs alongside the main application container within the same Pod. Containers in the same Pod share the network namespace (they can communicate via `localhost`) and can mount shared volumes. The ambassador pattern handles proxying external connections. The adapter pattern normalizes output. Init containers run to completion before the main containers start, so they are not suitable for ongoing log collection.",
    verify: null
  },
  {
    id: "s01-q019",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A team has a machine learning workload that requires GPU nodes. They want to ensure these Pods are scheduled only on nodes equipped with GPUs, while other workloads avoid those nodes. Which combination of Kubernetes scheduling features should they use?",
    diagram: null,
    options: [
      "Apply `nodeSelector` on ML Pods to target GPU nodes, and add taints to GPU nodes with tolerations",
      "Use a `ResourceQuota` to reserve GPU nodes exclusively for machine learning workloads in the cluster",
      "Set `nodeName` directly in the ML Pod specs to hardcode specific GPU node names for scheduling",
      "Configure the `kube-scheduler` with a custom profile that only considers GPU nodes for all Pods"
    ],
    answer: 0,
    explanation: "The correct approach combines `nodeSelector` (or node affinity) to direct ML Pods to GPU nodes, and taints on GPU nodes to repel non-ML workloads, with tolerations on the ML Pods so they can be scheduled on tainted nodes. `ResourceQuota` manages resource consumption per namespace, not node scheduling. Hardcoding `nodeName` bypasses the scheduler and is fragile. A custom scheduler profile would affect all Pods, not just ML workloads.",
    verify: "microk8s kubectl get nodes --show-labels"
  },
  {
    id: "s01-q020",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod is stuck in `CrashLoopBackOff` status. The operations team needs to investigate why the container keeps crashing. What is the most effective first step to diagnose the issue?",
    diagram: null,
    options: [
      "Delete the Pod and recreate it, since `CrashLoopBackOff` is usually a transient scheduling error",
      "Scale the Deployment to zero replicas and back to one to trigger a fresh pull of the container image",
      "Check the container logs with `kubectl logs <pod-name>` and use the `--previous` flag for crash data",
      "Edit the Pod spec to add `restartPolicy: Never` so the container does not restart before investigation"
    ],
    answer: 2,
    explanation: "The first diagnostic step for a `CrashLoopBackOff` is to examine the container logs. Using `kubectl logs <pod-name> --previous` shows the logs from the last crashed container instance, which typically reveals the error. Deleting and recreating the Pod without understanding the root cause will likely result in the same crash. Scaling does not help diagnose the issue. You cannot edit a running Pod's restart policy.",
    verify: "microk8s kubectl get pods --field-selector=status.phase!=Running"
  },
  {
    id: "s01-q021",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A Kubernetes administrator needs to understand the relationship between the kubelet and the container runtime. Which interface specification defines how the kubelet communicates with container runtimes like `containerd` and `CRI-O`?",
    diagram: null,
    options: [
      "The Container Storage Interface (CSI), which manages runtime lifecycle and storage operations",
      "The Open Container Initiative (OCI) Runtime Specification for container execution standards",
      "The Container Network Interface (CNI), which handles networking and runtime communication",
      "The Container Runtime Interface (CRI), a gRPC-based API defined by the Kubernetes project"
    ],
    answer: 3,
    explanation: "The Container Runtime Interface (CRI) is a plugin interface that defines the gRPC API the kubelet uses to communicate with container runtimes. Both `containerd` and `CRI-O` implement this interface. The OCI specification defines container image and runtime standards but is lower-level than CRI. CNI handles network configuration for containers. CSI handles storage provisioning, not runtime communication.",
    verify: null
  },
  {
    id: "s01-q022",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team wants to store non-sensitive application configuration such as database hostnames and feature flags, and inject them into multiple Pods without hardcoding values in the Pod spec. Which Kubernetes resource is designed for this purpose?",
    diagram: null,
    options: [
      "A `Secret` with `type: Opaque` to store the configuration as key-value pairs securely",
      "An `Annotation` on the Deployment object containing the configuration values in JSON",
      "A `PersistentVolumeClaim` that references a shared configuration file on network storage",
      "A `ConfigMap` that stores configuration as key-value pairs, mountable as volumes or envs"
    ],
    answer: 3,
    explanation: "A `ConfigMap` is the Kubernetes resource designed to store non-sensitive configuration data as key-value pairs. It can be consumed by Pods as environment variables, command-line arguments, or configuration files in a mounted volume. Secrets are for sensitive data like passwords. PersistentVolumeClaims are for storage, not configuration. Annotations store metadata about objects but cannot be injected into containers directly.",
    verify: "microk8s kubectl create configmap test-config --from-literal=key=value --dry-run=client -o yaml"
  },
  {
    id: "s01-q023",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An architect is designing a cloud native application that must handle variable traffic loads efficiently. During peak hours traffic increases 10x, and during off-hours the application is nearly idle. Which cloud native design principle directly addresses this requirement?",
    diagram: null,
    options: [
      "Horizontal scalability — designing stateless services that scale out by adding instances to handle load",
      "Immutability — building container images that cannot be modified at runtime ensures consistent scaling behavior",
      "Infrastructure as Code — defining all infrastructure in version-controlled templates enables faster provisioning",
      "Circuit breaking — automatically stopping traffic to failing services prevents cascade failures during peak load"
    ],
    answer: 0,
    explanation: "Horizontal scalability is the cloud native principle that directly addresses variable load by allowing the system to add or remove service instances based on demand. Designing services to be stateless enables them to scale out easily. Immutability is about consistency, not load handling. Infrastructure as Code helps with provisioning but does not inherently handle traffic variability. Circuit breaking is a resilience pattern for failure handling, not scaling.",
    verify: null
  },
  {
    id: "s01-q024",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to deploy a new version of their application with zero downtime. They currently have a Deployment running 5 replicas. They want Kubernetes to gradually replace old Pods with new ones, ensuring at least 4 Pods are always available during the update. Which strategy and configuration should they use?",
    diagram: null,
    options: [
      "Set the Deployment strategy to `Recreate` with a `minReadySeconds` value of 30 for safe transitions",
      "Use a StatefulSet instead of a Deployment because StatefulSets support ordered rolling updates",
      "Create a new Deployment alongside the old one and shift traffic using a Service selector change",
      "Set the Deployment strategy to `RollingUpdate` with `maxUnavailable: 1` and `maxSurge: 1`"
    ],
    answer: 3,
    explanation: "The `RollingUpdate` strategy with `maxUnavailable: 1` ensures that at most 1 Pod is taken down at a time during the update, keeping at least 4 of the 5 replicas available. `maxSurge: 1` allows one extra Pod to be created during the rollout. The `Recreate` strategy terminates all Pods before creating new ones, causing downtime. Manual traffic shifting is error-prone and unnecessary. StatefulSets are for stateful applications and are not needed here.",
    verify: "microk8s kubectl get deployment -o jsonpath='{.items[*].spec.strategy}'"
  },
  {
    id: "s01-q025",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer deploys a Service of type `ClusterIP` for their backend application and tries to access it from their local workstation using the ClusterIP address. The connection times out. Why can't they reach the service?",
    diagram: null,
    options: [
      "The `kube-proxy` must be manually configured to allow external traffic to ClusterIP Services",
      "The Service has not been assigned a DNS name yet and requires a full `kube-dns` restart",
      "ClusterIP Services require a corresponding Ingress resource to handle any incoming traffic",
      "The `ClusterIP` Service is only accessible within the cluster network, not external hosts"
    ],
    answer: 3,
    explanation: "A `ClusterIP` Service creates a virtual IP address that is only routable within the cluster's internal network. External clients, including developer workstations, cannot reach it directly. To access the service externally, the team would need a `NodePort`, `LoadBalancer`, or `Ingress` resource. DNS assignment is automatic and does not require restarts. Ingress is not required for ClusterIP to function within the cluster. `kube-proxy` does not have external traffic configuration for ClusterIP.",
    verify: "microk8s kubectl get svc -o wide"
  },
  {
    id: "s01-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A DevOps team is writing Kubernetes manifests for workload resources like Deployments and Services. Which set of top-level fields is mandatory in most Kubernetes resource manifests?",
    diagram: null,
    options: [
      "`apiVersion`, `kind`, `metadata`, and `spec`",
      "`apiVersion`, `kind`, `metadata`, and `status`",
      "`version`, `type`, `metadata`, and `spec`",
      "`apiVersion`, `kind`, `name`, and `labels`"
    ],
    answer: 0,
    explanation: "Most Kubernetes resource manifests require `apiVersion` (the API group and version), `kind` (the type of resource), `metadata` (including at minimum a name), and `spec` (the desired state specification). Note that some resources like ConfigMap and Secret use `data` instead of `spec`. The `status` field is managed by Kubernetes and should not be set by users. `name` and `labels` go inside `metadata`, not at the top level. `version` and `type` are not valid top-level Kubernetes manifest fields.",
    verify: null
  },
  {
    id: "s01-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A company is designing a highly available Kubernetes control plane. They need to understand which component serves as the single source of truth for all cluster state. Which component stores all cluster data persistently?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="10" width="200" height="40" rx="8" fill="#326CE5" stroke="#fff" stroke-width="2"/><text x="200" y="36" text-anchor="middle" fill="white" font-size="13">API Server</text><rect x="10" y="80" width="120" height="40" rx="8" fill="#555" stroke="#aaa" stroke-width="1.5"/><text x="70" y="106" text-anchor="middle" fill="white" font-size="11">Scheduler</text><rect x="270" y="80" width="120" height="40" rx="8" fill="#555" stroke="#aaa" stroke-width="1.5"/><text x="330" y="106" text-anchor="middle" fill="white" font-size="11">Controller Mgr</text><rect x="130" y="160" width="140" height="50" rx="8" fill="#FF9800" stroke="#FFD700" stroke-width="2"/><text x="200" y="190" text-anchor="middle" fill="white" font-size="14" font-weight="bold">???</text><line x1="200" y1="50" x2="70" y2="80" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="50" x2="330" y2="80" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="50" x2="200" y2="160" stroke="#FFD700" stroke-width="2" stroke-dasharray="5,3"/><text x="220" y="110" fill="#FFD700" font-size="11">reads/writes</text></svg>',
    options: [
      "The `kube-apiserver`, which stores state in its internal memory cache for fast access",
      "The `kube-controller-manager`, which maintains a distributed state database across controllers",
      "The `etcd` key-value store, which persistently stores all cluster configuration and state data",
      "The `kubelet` on the first control plane node, which acts as the primary state repository"
    ],
    answer: 2,
    explanation: "`etcd` is a distributed, consistent key-value store that serves as Kubernetes' backing store for all cluster data. The API server is the only component that communicates directly with `etcd`. The API server itself is stateless and relies on `etcd` for persistence. The controller manager runs control loops but does not store state. Kubelets run on worker nodes and do not serve as cluster-wide state repositories.",
    verify: "microk8s kubectl get pods -n kube-system -l component=etcd"
  },
  {
    id: "s01-q028",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team manages a Redis cache that requires stable network identities and ordered deployment. When scaling from 3 to 5 replicas, new instances must be created sequentially (redis-3, then redis-4) and each must have its own persistent storage. Which workload resource should they use?",
    diagram: null,
    options: [
      "A Deployment with a `PersistentVolumeClaim` template defined in the Pod spec",
      "A DaemonSet with node affinity rules to place one Redis instance per node",
      "A StatefulSet with a `volumeClaimTemplates` section and a headless Service",
      "A ReplicaSet with `podManagementPolicy: OrderedReady` and individual PVCs"
    ],
    answer: 2,
    explanation: "A StatefulSet provides stable, unique network identifiers (redis-0, redis-1, etc.), ordered deployment and scaling, and stable persistent storage through `volumeClaimTemplates`. A headless Service enables direct DNS resolution to individual Pods. Deployments do not guarantee ordering or stable identities. DaemonSets run one Pod per node, not per replica count. ReplicaSets do not have a `podManagementPolicy` field — that is a StatefulSet feature.",
    verify: "microk8s kubectl get statefulsets --all-namespaces"
  },
  {
    id: "s01-q029",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A Kubernetes cluster uses a CNI plugin for Pod networking. A network engineer notices that Pods can communicate across nodes but wonders how each Pod receives its IP address. Which component is responsible for allocating IP addresses to Pods?",
    diagram: null,
    options: [
      "The `kube-proxy`, which assigns IPs from the Service CIDR range to each new Pod created",
      "The `kubelet`, which generates random IPs from the node's host network range for Pods",
      "The `kube-apiserver`, which pre-assigns Pod IPs during the scheduling phase of a Pod",
      "The CNI plugin, which allocates IPs from the configured Pod CIDR when Pods are created"
    ],
    answer: 3,
    explanation: "The CNI (Container Network Interface) plugin is responsible for setting up Pod networking, including IP address allocation from the configured Pod CIDR range. When a new Pod is created, the kubelet invokes the CNI plugin to configure the network namespace and assign an IP. `kube-proxy` manages Service IP routing rules, not Pod IP assignment. The API server does not assign Pod IPs. The kubelet delegates networking to the CNI plugin rather than handling it directly.",
    verify: null
  },
  {
    id: "s01-q030",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A team stores database passwords in Kubernetes `Secret` objects. A security reviewer points out that Secrets are only base64-encoded, not encrypted, by default. What additional measure should the team implement to protect Secret data at rest in `etcd`?",
    diagram: null,
    options: [
      "Enable encryption at rest for `etcd` by configuring an `EncryptionConfiguration` on the API server",
      "Configure RBAC to restrict access to Secrets, which automatically enables AES encryption in etcd",
      "Store Secrets as `ConfigMaps` instead, since ConfigMaps support native encryption in the `etcd` store",
      "Use `kubectl create secret --encrypt` flag to encrypt the Secret data before storing it in etcd"
    ],
    answer: 0,
    explanation: "By default, Secrets are stored as base64-encoded plaintext in `etcd`. To protect them at rest, you must configure an `EncryptionConfiguration` on the API server, which specifies encryption providers (like `aescbc`, `aesgcm`, or KMS) for encrypting Secret data before it is written to `etcd`. RBAC controls access permissions but does not encrypt data. ConfigMaps do not support encryption. There is no `--encrypt` flag for `kubectl create secret`.",
    verify: null
  },
  {
    id: "s01-q031",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After deploying a new application, a Pod is stuck in `ImagePullBackOff` status. The team verifies that the image name is correct and the registry is accessible from their laptops. What is the most likely cause within the cluster context?",
    diagram: null,
    options: [
      "The node's container runtime has reached its maximum image cache size and cannot pull any new images",
      "The cluster nodes cannot reach the container registry, or the Pod lacks required `imagePullSecrets`",
      "The `kube-scheduler` has placed the Pod on a node that does not support the container image format",
      "The `ImagePullBackOff` status always indicates the image tag does not exist in the remote registry"
    ],
    answer: 1,
    explanation: "The `ImagePullBackOff` status means the kubelet failed to pull the container image. Even if the image exists and the registry is accessible from outside the cluster, the cluster nodes themselves need network access to the registry. For private registries, the Pod or ServiceAccount must have `imagePullSecrets` configured. Container runtimes do not have a maximum cache size that blocks pulls. Image format incompatibility is extremely rare with modern runtimes. The error can occur for multiple reasons, not just missing tags.",
    verify: "microk8s kubectl get events --field-selector reason=Failed --sort-by=.metadata.creationTimestamp"
  },
  {
    id: "s01-q032",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A startup wants to run event-driven functions on Kubernetes that automatically scale to zero when idle and scale up on incoming requests. They want to avoid managing infrastructure for scaling. Which CNCF project enables serverless workloads on Kubernetes?",
    diagram: null,
    options: [
      "Istio, which provides automatic scaling and traffic management for serverless workloads",
      "Helm, which packages serverless functions as charts for easy deployment and scaling",
      "Prometheus, which triggers auto-scaling events based on custom metric thresholds",
      "Knative, which provides serving and eventing for serverless workloads on Kubernetes"
    ],
    answer: 3,
    explanation: "Knative is a Kubernetes-based platform that provides components for deploying, running, and managing serverless workloads. Knative Serving handles request-driven auto-scaling including scale-to-zero, while Knative Eventing provides event-driven architecture. Istio is a service mesh, not a serverless platform. Prometheus collects metrics but does not manage serverless workloads. Helm is a package manager, not a serverless runtime.",
    verify: null
  },
  {
    id: "s01-q033",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is adopting the twelve-factor app methodology for their cloud native applications. They need to decide how to handle application configuration that varies between environments (development, staging, production). What does the twelve-factor methodology recommend?",
    diagram: null,
    options: [
      "Store configuration in code alongside the application, using branches for different environments",
      "Use a centralized configuration server that the application queries at startup for its settings",
      "Bundle environment-specific configuration files into the container image at build time per stage",
      "Store configuration in the environment, strictly separated from the application code itself"
    ],
    answer: 3,
    explanation: "The twelve-factor app methodology states that configuration should be stored in the environment, strictly separated from code. In Kubernetes, this maps to using ConfigMaps and Secrets injected as environment variables or mounted files. Storing config in code violates this principle. Bundling config in images means rebuilding for each environment. While configuration servers exist, the twelve-factor methodology specifically advocates for environment-based configuration.",
    verify: null
  },
  {
    id: "s01-q034",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A microservices team is troubleshooting high latency in a request that flows through 5 services. They need to identify which service is causing the bottleneck. Which observability technique allows them to track a single request as it propagates through multiple services?",
    diagram: null,
    options: [
      "Centralized logging with correlated timestamps across all services in the system",
      "Health check endpoints on each service that report response times back to callers",
      "Distributed tracing, which propagates trace context across service boundaries",
      "Metric dashboards showing average latency per service over the last hour of data"
    ],
    answer: 2,
    explanation: "Distributed tracing (implemented by tools like Jaeger or Zipkin) propagates a trace context (trace ID and span IDs) across service boundaries. This allows engineers to visualize the entire request path and identify exactly where latency is introduced. Centralized logging can correlate events but lacks built-in request flow visualization. Health checks show service status, not per-request latency. Metric dashboards show aggregates, not individual request paths.",
    verify: null
  },
  {
    id: "s01-q035",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A team is building a CI/CD pipeline for their Kubernetes application. They want the pipeline to automatically build a container image on every commit, run tests, and deploy to a staging cluster. Which step should occur immediately BEFORE deploying to the cluster?",
    diagram: null,
    options: [
      "Push the built container image to a registry so the cluster can pull it for deployment",
      "Scale down the staging cluster to zero nodes to prevent conflicts during the deployment",
      "Manually approve the build artifacts in a change management system before any deploy",
      "Run `kubectl delete` on the existing deployment to ensure a clean target environment"
    ],
    answer: 0,
    explanation: "In a CI/CD pipeline, after building and testing the container image, it must be pushed to a container registry (like Docker Hub, ECR, or Harbor) before deployment. The Kubernetes cluster pulls the image from the registry when creating Pods. Deleting existing deployments causes downtime and is unnecessary with rolling updates. Manual approval is not automatic CI/CD. Scaling down the cluster would disrupt all workloads, not just the one being deployed.",
    verify: null
  },
  {
    id: "s01-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer notices that their application Pod has been assigned to a node but the container is not yet running. The Pod status shows `Init:0/2`. What does this status indicate?",
    diagram: null,
    options: [
      "The Pod has 2 regular containers and neither has started yet due to node resource constraints",
      "The Pod is waiting for 2 ConfigMap dependencies that have not been created in the namespace",
      "The Pod requires 2 volumes to be mounted and neither is currently available on the assigned node",
      "The Pod has 2 init containers that must complete before main containers start; none have finished"
    ],
    answer: 3,
    explanation: "The `Init:0/2` status means the Pod has 2 init containers, and 0 of them have completed so far. Init containers run sequentially before any regular containers start. Each init container must complete successfully before the next one begins. This status does not relate to regular containers, volumes, or ConfigMaps. Init containers are commonly used for tasks like waiting for dependencies, running database migrations, or copying configuration files.",
    verify: null
  },
  {
    id: "s01-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A platform team wants to ensure that two replicas of their web application Pod never run on the same node, to improve availability during node failures. Which scheduling feature should they configure?",
    diagram: null,
    options: [
      "Pod anti-affinity with `topologyKey: kubernetes.io/hostname` to spread Pods across nodes",
      "A `nodeSelector` with unique labels on each node targeted individually by each replica Pod",
      "A `PodDisruptionBudget` with `maxUnavailable: 1` configured to prevent any co-location",
      "A taint on each node that only tolerates a single Pod from the Deployment's workload set"
    ],
    answer: 0,
    explanation: "Pod anti-affinity with `topologyKey: kubernetes.io/hostname` prevents Pods matching a label selector from being scheduled on the same node. This ensures replicas are spread across different nodes. `nodeSelector` targets specific nodes but does not prevent co-location. `PodDisruptionBudget` controls voluntary disruptions but does not influence scheduling decisions. Taints repel Pods but cannot limit the count per node in this manner.",
    verify: null
  },
  {
    id: "s01-q038",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A frontend application needs to discover and communicate with a backend Service named `inventory-api` in the `production` namespace. The frontend is deployed in the same namespace. What DNS name should the frontend use to reach the backend?",
    diagram: null,
    options: [
      "`inventory-api.production.pod.cluster.local`",
      "`inventory-api.cluster.local` as short name",
      "`production.inventory-api.svc.cluster.local`",
      "`inventory-api` or the FQDN `.svc` suffix"
    ],
    answer: 3,
    explanation: "Within the same namespace, a Service can be reached using just its name (`inventory-api`). The fully qualified domain name (FQDN) follows the pattern `<service-name>.<namespace>.svc.cluster.local`. So `inventory-api.production.svc.cluster.local` is the FQDN. The first option incorrectly uses `pod` instead of `svc`. The second option (`inventory-api.cluster.local`) omits the namespace and `svc` components, making it an invalid DNS name for Kubernetes Services. The third option reverses the namespace and service name order.",
    verify: "microk8s kubectl get svc -n production 2>/dev/null || echo 'namespace may not exist yet'"
  },
  {
    id: "s01-q039",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A monitoring team needs to deploy a log collector agent on every node in the cluster, including new nodes that are added later. The agent should run exactly one instance per node. Which workload resource should they use?",
    diagram: null,
    options: [
      "A Deployment with `replicas` set to the node count and a `podAntiAffinity` scheduling rule",
      "A StatefulSet with node affinity rules targeting each node by its individual hostname label",
      "A DaemonSet, which automatically schedules exactly one Pod on every node in the cluster",
      "A CronJob that periodically checks for new nodes and creates Pods on unmonitored ones"
    ],
    answer: 2,
    explanation: "A DaemonSet ensures that a copy of a Pod runs on every node (or a subset of nodes using node selectors). When new nodes are added to the cluster, the DaemonSet controller automatically schedules a Pod on them. A Deployment with anti-affinity is fragile and does not automatically adapt to node additions. A StatefulSet does not guarantee one Pod per node. A CronJob would be overly complex and would not provide continuous monitoring.",
    verify: "microk8s kubectl get daemonsets --all-namespaces"
  },
  {
    id: "s01-q040",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster administrator wants to restrict network traffic so that only frontend Pods can communicate with backend Pods in the same namespace. All other traffic to the backend should be denied. Which Kubernetes resource should they create?",
    diagram: null,
    options: [
      "A `NetworkPolicy` with ingress rules allowing traffic only from Pods with the frontend label",
      "A `Service` with a selector that only matches frontend Pods to restrict backend accessibility",
      "An `Ingress` resource with path-based routing rules configured for frontend traffic routing",
      "A `ResourceQuota` that limits the network bandwidth available to all non-frontend Pod traffic"
    ],
    answer: 0,
    explanation: "A `NetworkPolicy` is the Kubernetes resource for controlling network traffic at the Pod level. By creating a NetworkPolicy that selects backend Pods and specifies an ingress rule allowing traffic only from Pods with a frontend label, all other ingress traffic to the backend is denied. Services route traffic but do not restrict it. Ingress handles external HTTP routing. ResourceQuotas manage compute resources, not network traffic rules.",
    verify: "microk8s kubectl get networkpolicies --all-namespaces"
  },
  {
    id: "s01-q041",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A developer creates a Pod with an `emptyDir` volume shared between two containers. Later, the Pod is rescheduled to a different node. What happens to the data stored in the `emptyDir` volume?",
    diagram: null,
    options: [
      "The data is automatically migrated to the new node by the kubelet during Pod rescheduling",
      "The data persists on the original node and can be manually mounted on the new node later",
      "The data is preserved in `etcd` and restored automatically when the Pod starts on the new node",
      "The data is lost because `emptyDir` volumes share the same lifecycle as the Pod they belong to"
    ],
    answer: 3,
    explanation: "An `emptyDir` volume is created when a Pod is assigned to a node and exists as long as that Pod runs on that node. When the Pod is deleted or rescheduled, the `emptyDir` volume and its contents are permanently deleted. Data is not migrated, stored in `etcd`, or preserved on the original node. For data that must survive Pod rescheduling, a `PersistentVolume` should be used instead.",
    verify: null
  },
  {
    id: "s01-q042",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team operating a microservices architecture on Kubernetes notices that when the payment service goes down, the order service also fails because it synchronously calls the payment service. This creates a cascading failure across the entire system. Which pattern should they implement to prevent this?",
    diagram: null,
    options: [
      "Deploy both services in the same Pod so they share a network namespace and avoid network failures",
      "Add more replicas of the payment service to ensure it has enough capacity and never goes down",
      "Increase the timeout value on the order service's HTTP client to give the payment service more time",
      "Implement the circuit breaker pattern in the order service to fail fast when payment is unavailable"
    ],
    answer: 3,
    explanation: "The circuit breaker pattern prevents cascading failures by monitoring calls to a downstream service and 'tripping' when failures exceed a threshold. Once tripped, subsequent calls fail fast without waiting, allowing the system to degrade gracefully. Co-locating services in a Pod does not prevent application-level failures. Increasing timeouts makes the problem worse by holding resources longer. More replicas improve availability but do not eliminate the possibility of failure.",
    verify: null
  },
  {
    id: "s01-q043",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform engineering team is evaluating service mesh solutions for their Kubernetes cluster. They need features like mutual TLS, traffic management, and observability between services. Which CNCF project provides a comprehensive service mesh for Kubernetes?",
    diagram: null,
    options: [
      "Envoy, which provides a complete service mesh with a built-in control plane",
      "Linkerd, a CNCF graduated lightweight service mesh designed for Kubernetes",
      "Calico, which provides service mesh capabilities through its CNI plugin",
      "CoreDNS, which handles service-to-service routing and mTLS for Kubernetes"
    ],
    answer: 1,
    explanation: "Linkerd is a CNCF graduated service mesh that provides mutual TLS, traffic management, observability, and reliability features specifically designed for Kubernetes. Envoy is a proxy used by several service meshes (including Istio) but is not itself a complete service mesh with a control plane. Calico is a CNI plugin for network policy, not a service mesh. CoreDNS provides DNS resolution, not service mesh features.",
    verify: null
  },
  {
    id: "s01-q044",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team has Prometheus running in their cluster and wants to set up alerts when Pod CPU usage exceeds 80% for more than 5 minutes. Which component in the Prometheus ecosystem is responsible for handling alerting rules and sending notifications?",
    diagram: null,
    options: [
      "The Prometheus server itself, which sends email and Slack notifications directly when rules trigger",
      "Grafana, which evaluates Prometheus alerting rules and dispatches notification messages to channels",
      "Alertmanager, which receives alerts from Prometheus, handling deduplication, grouping, and routing",
      "Node Exporter, which monitors node-level metrics and triggers alerts when thresholds are exceeded"
    ],
    answer: 2,
    explanation: "Alertmanager is the dedicated component in the Prometheus ecosystem that handles alerts fired by the Prometheus server. It manages deduplication, grouping, silencing, and routing of alerts to notification channels like email, Slack, or PagerDuty. The Prometheus server evaluates alerting rules but delegates notification delivery to Alertmanager. Grafana can also alert but is not part of the Prometheus ecosystem. Node Exporter only exposes node metrics.",
    verify: null
  },
  {
    id: "s01-q045",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A product team wants to test a new feature with 5% of their production traffic before rolling it out to all users. They need to route a small percentage of requests to the new version while keeping 95% on the stable version. Which deployment strategy best supports this?",
    diagram: null,
    options: [
      "A blue-green deployment with two full environments and a DNS switch targeting 5% of traffic",
      "A canary deployment where a small number of new version Pods receive controlled traffic",
      "A rolling update with `maxSurge: 5%` to gradually replace old Pods with new versions",
      "An A/B test using client-side feature flags with no underlying infrastructure changes"
    ],
    answer: 1,
    explanation: "A canary deployment directs a small percentage of production traffic to the new version while the majority continues going to the stable version. This can be achieved with weighted routing (via a service mesh or Ingress controller). Blue-green swaps all traffic at once, not a percentage. A rolling update's `maxSurge` controls how many extra Pods are created, not traffic percentage. Client-side feature flags test features but do not validate infrastructure-level changes.",
    verify: null
  },
  {
    id: "s01-q046",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operations team wants to organize cluster resources by project. They need to isolate the resources of Project A from Project B so that each team can only see and manage their own resources. Which Kubernetes concept provides this resource isolation boundary?",
    diagram: null,
    options: [
      "Labels and selectors, which logically group resources and restrict visibility to teams",
      "Annotations, which tag resources with project ownership metadata for access controls",
      "Resource quotas, which isolate resources by limiting CPU and memory usage per project",
      "Namespaces, which scope resource names and pair with RBAC to enforce access controls"
    ],
    answer: 3,
    explanation: "Namespaces provide logical isolation within a Kubernetes cluster. Resources in different namespaces can have the same name, and RBAC policies can be applied per namespace to restrict team access. Labels group resources but do not provide namespace-level isolation or access boundaries. Resource quotas limit consumption within a namespace but do not provide isolation by themselves. Annotations store metadata and do not affect access control.",
    verify: "microk8s kubectl get namespaces"
  },
  {
    id: "s01-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "During a cluster upgrade, the team needs to understand the order of component upgrades. The Kubernetes documentation recommends a specific upgrade order for control plane components. Which component should typically be upgraded first?",
    diagram: null,
    options: [
      "The `kube-scheduler`, because it must understand new scheduling features before other components",
      "The `kubelet` on worker nodes, because they must be ready to handle new Pod specifications first",
      "The `kube-apiserver`, because all components communicate through it and need the new API version",
      "The `etcd` cluster, because it must support the new data schema before any component can be upgraded"
    ],
    answer: 2,
    explanation: "The recommended Kubernetes upgrade order starts with the `kube-apiserver` because all other control plane components and kubelets communicate through it. The API server must be able to serve the new API versions that upgraded components will use. After the API server, you upgrade the `kube-controller-manager` and `kube-scheduler`, then the `kubelet` and `kube-proxy` on nodes. `etcd` upgrades are often performed before the API server (as kubeadm does automatically), but etcd is sometimes considered a backing store rather than a control plane component proper. Among the core control plane components (API server, controller manager, scheduler), the API server should be upgraded first.",
    verify: "microk8s kubectl version"
  },
  {
    id: "s01-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to run a database migration script exactly once before their main application starts in each Pod. The migration must complete successfully before the application container begins. Which Kubernetes feature provides this sequential startup behavior?",
    diagram: null,
    options: [
      "An init container that runs the migration and must exit successfully before main ones",
      "A Job resource that runs the migration before the Deployment is created by the team",
      "A `postStart` lifecycle hook on the application container that runs the migration task",
      "A sidecar container with a higher `priority` value to ensure it starts before the app"
    ],
    answer: 0,
    explanation: "Init containers are specialized containers that run before the main application containers in a Pod. They run sequentially, and each must complete successfully (exit code 0) before the next init container or main container starts. `postStart` hooks run after the container starts and do not block other containers. A separate Job would need external orchestration. Sidecar containers run concurrently with the main container, and there is no priority-based startup ordering for regular containers.",
    verify: null
  },
  {
    id: "s01-q049",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team wants to expose their web application to external traffic. They set up a Service of type `NodePort`. After deployment, the Service is assigned NodePort 31234. How can external clients access the application?",
    diagram: null,
    options: [
      "By sending requests to `<any-node-ip>:31234`, as `kube-proxy` routes to Pods",
      "By sending requests to `<cluster-ip>:31234` from outside the cluster network",
      "Only through a DNS lookup of `<service-name>.svc.cluster.local:31234`",
      "By connecting to the Pod IP directly on port 31234 from external clients"
    ],
    answer: 0,
    explanation: "A `NodePort` Service opens the specified port (31234) on every node in the cluster. External clients can reach the application by sending requests to any node's IP address on that port. `kube-proxy` on each node forwards the traffic to the appropriate backing Pods. The cluster IP is internal only. The `svc.cluster.local` DNS is only resolvable within the cluster. Pod IPs are internal and the application port differs from the NodePort.",
    verify: "microk8s kubectl get svc --all-namespaces -o wide"
  },
  {
    id: "s01-q050",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A security team requires that all container images in the cluster must conform to the OCI (Open Container Initiative) image specification. What does the OCI image specification define?",
    diagram: null,
    options: [
      "The runtime behavior of containers including CPU and memory limits enforcement policies",
      "The format for container images including the manifest, filesystem layers, and config",
      "The network security policies that container images must embed for Kubernetes compliance",
      "The signing and verification process for container images in production registries"
    ],
    answer: 1,
    explanation: "The OCI Image Specification defines a standard format for container images, including the image manifest (which lists layers and configuration), the filesystem layer format (how layers are packaged), and the image configuration (runtime defaults). It does not define runtime resource limits, network policies, or image signing processes. Image signing is addressed by separate projects like Sigstore/cosign and Notary.",
    verify: null
  },
  {
    id: "s01-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer wants to pass sensitive information like API keys to their application running in a Pod. They consider using environment variables but are concerned about security. Which Kubernetes resource is specifically designed for storing and injecting sensitive data?",
    diagram: null,
    options: [
      "A `ConfigMap` with a `sensitive: true` annotation to enable encryption for stored data",
      "An `Annotation` on the Pod with sensitive data, which is hidden from `kubectl get` output",
      "A `PersistentVolume` containing an encrypted file with the credentials for the application",
      "A `Secret`, which stores base64-encoded data and can be mounted as volumes or env vars"
    ],
    answer: 3,
    explanation: "Kubernetes `Secrets` are designed to hold sensitive data such as passwords, tokens, and keys. While they are only base64-encoded by default, they integrate with RBAC for access control and can be encrypted at rest in `etcd`. ConfigMaps do not have a `sensitive` annotation. PersistentVolumes are for persistent storage, not credential management. Annotations are visible in API responses and provide no security features.",
    verify: "microk8s kubectl create secret generic test-secret --from-literal=key=value --dry-run=client -o yaml"
  },
  {
    id: "s01-q052",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A new team member asks what role `kube-proxy` plays in the cluster. They observe that every node runs a `kube-proxy` Pod. What is the primary function of `kube-proxy`?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="180" height="230" rx="8" fill="#2d2d2d" stroke="#555" stroke-width="2"/><text x="100" y="35" text-anchor="middle" fill="#ccc" font-size="13" font-weight="bold">Node 1</text><rect x="210" y="10" width="180" height="230" rx="8" fill="#2d2d2d" stroke="#555" stroke-width="2"/><text x="300" y="35" text-anchor="middle" fill="#ccc" font-size="13" font-weight="bold">Node 2</text><rect x="30" y="50" width="140" height="35" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="100" y="73" text-anchor="middle" fill="white" font-size="12">kube-proxy</text><rect x="230" y="50" width="140" height="35" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="300" y="73" text-anchor="middle" fill="white" font-size="12">kube-proxy</text><rect x="30" y="100" width="65" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="62" y="125" text-anchor="middle" fill="white" font-size="10">Pod A</text><rect x="105" y="100" width="65" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="137" y="125" text-anchor="middle" fill="white" font-size="10">Pod B</text><rect x="250" y="100" width="65" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="282" y="125" text-anchor="middle" fill="white" font-size="10">Pod C</text><rect x="100" y="170" width="200" height="30" rx="6" fill="#FF9800" stroke="#FFD700" stroke-width="1.5"/><text x="200" y="190" text-anchor="middle" fill="white" font-size="11">Service: my-app (ClusterIP)</text><line x1="100" y1="85" x2="100" y2="100" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="300" y1="85" x2="300" y2="100" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="4,2"/><line x1="200" y1="170" x2="62" y2="140" stroke="#4CAF50" stroke-width="1.5"/><line x1="200" y1="170" x2="137" y2="140" stroke="#4CAF50" stroke-width="1.5"/><line x1="200" y1="170" x2="282" y2="140" stroke="#4CAF50" stroke-width="1.5"/></svg>',
    options: [
      "It maintains network rules on nodes implementing Service abstractions, routing to Pod endpoints",
      "It serves as a reverse proxy that load-balances external traffic destined for the API server",
      "It assigns IP addresses to Pods and manages the Pod network namespace lifecycle on each node",
      "It monitors Pod health on each worker node and reports node status to the control plane layer"
    ],
    answer: 0,
    explanation: "`kube-proxy` runs on every node and is responsible for implementing Service abstractions. It watches the API server for Service and Endpoint objects and programs network rules (using iptables, IPVS, or nftables) to route traffic destined for a Service's ClusterIP to the correct backend Pods. It does not proxy external traffic to the API server. IP assignment is handled by the CNI plugin. Health monitoring and node status reporting is done by the kubelet.",
    verify: "microk8s kubectl get pods -n kube-system -l k8s-app=kube-proxy"
  },
  {
    id: "s01-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a Deployment with 3 replicas running version `v1.0` of their application. They update the image to `v1.1`, but the new version has a critical bug. They need to quickly revert to the previous working version. What is the fastest way to rollback?",
    diagram: null,
    options: [
      "Delete the Deployment and recreate it with the `v1.0` image tag specified in the manifest",
      "Manually edit each Pod to change the image back to `v1.0` using `kubectl edit pod`",
      "Use `kubectl rollout undo deployment/<name>` to revert to the previous revision",
      "Scale the Deployment to 0 replicas, update the image to `v1.0`, then scale back to 3"
    ],
    answer: 2,
    explanation: "`kubectl rollout undo` is the built-in mechanism to revert a Deployment to its previous revision. Kubernetes maintains a revision history for Deployments, allowing instant rollbacks. Deleting and recreating the Deployment causes unnecessary downtime. You cannot edit individual Pods managed by a Deployment since the controller will reconcile them back. Scaling to zero causes downtime and is unnecessarily complex.",
    verify: "microk8s kubectl rollout history deployment --all-namespaces 2>/dev/null"
  },
  {
    id: "s01-q054",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A cluster administrator needs to control which actions users and service accounts can perform within the cluster. They want to grant a developer read-only access to Pods in the `staging` namespace but no access to other namespaces. Which Kubernetes authorization mechanism should they use?",
    diagram: null,
    options: [
      "Create a `NetworkPolicy` that restricts the developer's Pod access to the `staging` namespace",
      "Create a `ServiceAccount` in the `staging` namespace, which automatically limits all access to that namespace",
      "Add the developer's credentials to the `kube-apiserver` configuration file with namespace restrictions",
      "Configure Role-Based Access Control (RBAC) with a `Role` and `RoleBinding` in the `staging` namespace"
    ],
    answer: 3,
    explanation: "RBAC is the standard Kubernetes authorization mechanism. A `Role` defines permissions (like `get`, `list`, `watch` on Pods) within a specific namespace, and a `RoleBinding` grants that Role to a user or ServiceAccount. NetworkPolicies control network traffic, not API access. API server configuration does not support per-user namespace restrictions. Creating a ServiceAccount does not automatically limit access — it must be paired with RBAC bindings.",
    verify: "microk8s kubectl get roles,rolebindings -n kube-system"
  },
  {
    id: "s01-q055",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team deploys an Ingress resource to route HTTP traffic to different backend Services based on URL paths. The Ingress routes `/api` to the API service and `/web` to the frontend service. However, traffic is not being routed. What additional component is required for Ingress resources to function?",
    diagram: null,
    options: [
      "A `LoadBalancer` Service for each backend that the Ingress resource routes traffic to",
      "A `kube-proxy` upgrade to support HTTP path-based routing natively on cluster nodes",
      "An Ingress controller such as NGINX that watches Ingress resources and configures routing",
      "A DNS server running inside the cluster that maps Ingress hostnames to individual Pod IPs"
    ],
    answer: 2,
    explanation: "An Ingress resource by itself is just a set of routing rules. An Ingress controller (like NGINX, Traefik, or HAProxy) must be running in the cluster to watch for Ingress resources and implement the actual routing. Without an Ingress controller, Ingress resources have no effect. Backend services do not need to be LoadBalancer type. `kube-proxy` does not handle HTTP routing. Cluster DNS (CoreDNS) resolves Service names but does not implement Ingress routing.",
    verify: "microk8s kubectl get ingress --all-namespaces"
  },
  {
    id: "s01-q056",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod is in the `Pending` state and has been for several minutes. Running `kubectl describe pod` shows the event: `0/3 nodes are available: 3 Insufficient memory`. What is the root cause and how should the team resolve it?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="35" rx="6" fill="#f44336" stroke="#fff" stroke-width="1.5"/><text x="200" y="28" text-anchor="middle" fill="white" font-size="12">Pod (Pending)</text><text x="200" y="55" text-anchor="middle" fill="#f44336" font-size="11">requests: 4Gi memory</text><rect x="10" y="80" width="110" height="60" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="65" y="100" text-anchor="middle" fill="#ccc" font-size="10">Node 1</text><text x="65" y="118" text-anchor="middle" fill="#FF9800" font-size="9">Alloc: 2Gi/4Gi</text><text x="65" y="132" text-anchor="middle" fill="#f44336" font-size="9">Available: 2Gi</text><rect x="145" y="80" width="110" height="60" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="200" y="100" text-anchor="middle" fill="#ccc" font-size="10">Node 2</text><text x="200" y="118" text-anchor="middle" fill="#FF9800" font-size="9">Alloc: 3Gi/4Gi</text><text x="200" y="132" text-anchor="middle" fill="#f44336" font-size="9">Available: 1Gi</text><rect x="280" y="80" width="110" height="60" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="335" y="100" text-anchor="middle" fill="#ccc" font-size="10">Node 3</text><text x="335" y="118" text-anchor="middle" fill="#FF9800" font-size="9">Alloc: 3.5Gi/4Gi</text><text x="335" y="132" text-anchor="middle" fill="#f44336" font-size="9">Available: 0.5Gi</text><text x="200" y="170" text-anchor="middle" fill="#f44336" font-size="12">Insufficient memory on all nodes</text></svg>',
    options: [
      "The Pod's image is too large for the nodes' disk space; the team should use a smaller base image",
      "The Pod's memory request exceeds allocatable memory on all nodes; reduce the request or add nodes",
      "The Pod is waiting for a PersistentVolume with sufficient memory capacity to be bound and mounted",
      "The `kube-scheduler` is misconfigured and cannot calculate memory availability correctly on nodes"
    ],
    answer: 1,
    explanation: "The event `Insufficient memory` means the Pod's memory request cannot be satisfied by any node in the cluster. The scheduler checks whether the node has enough allocatable memory (total memory minus reserved) to satisfy the Pod's `resources.requests.memory`. The solution is to reduce the memory request, free resources by removing other workloads, or add nodes with more memory. This is not about disk space, PersistentVolumes, or scheduler misconfiguration.",
    verify: "microk8s kubectl describe nodes | grep -A5 'Allocated resources'"
  },
  {
    id: "s01-q057",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team needs dynamically provisioned storage for their PostgreSQL StatefulSet. They want the storage to be automatically created when a PVC is submitted, without an administrator manually creating PersistentVolumes. Which Kubernetes resource enables this?",
    diagram: null,
    options: [
      "A `PersistentVolume` with `reclaimPolicy: Retain` that is pre-provisioned by an administrator",
      "A `VolumeAttachment` resource that connects cloud storage to Pods on demand when requested",
      "A `ConfigMap` that maps PVC names to cloud provider volume IDs for automatic volume binding",
      "A `StorageClass` with a provisioner that dynamically creates PersistentVolumes for PVCs"
    ],
    answer: 3,
    explanation: "A `StorageClass` defines a provisioner (such as `kubernetes.io/aws-ebs` or `kubernetes.io/gce-pd`) and parameters for dynamically provisioning PersistentVolumes. When a PVC references a StorageClass, the provisioner automatically creates the underlying storage and a matching PV. Pre-provisioned PVs are static provisioning, not dynamic. ConfigMaps are for configuration data. VolumeAttachments are internal objects managed by the attach/detach controller.",
    verify: "microk8s kubectl get storageclass"
  },
  {
    id: "s01-q058",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team practices immutable infrastructure by building new container images for every code change instead of modifying running containers. A colleague questions this approach, arguing it wastes time rebuilding images. What is the primary benefit of immutable infrastructure?",
    diagram: null,
    options: [
      "It reduces container image sizes because only changed layers need to be rebuilt each time",
      "It eliminates the need for version control since each image is a complete deployment artifact",
      "It ensures consistency and reproducibility — every deployment uses a known, tested artifact",
      "It allows faster rollbacks because the container runtime can hot-swap layers without restarts"
    ],
    answer: 2,
    explanation: "Immutable infrastructure ensures that every deployment uses the exact same artifact that was built and tested, eliminating configuration drift and 'works on my machine' problems. If an issue arises, you deploy the previous known-good image rather than trying to fix a modified running system. Image layer caching is about build efficiency, not immutability. Version control is still essential. Container runtimes do not support hot-swapping layers.",
    verify: null
  },
  {
    id: "s01-q059",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team is designing an API gateway for their microservices architecture on Kubernetes. The gateway should handle cross-cutting concerns like authentication, rate limiting, and request routing. Which Kubernetes resource type is commonly used as the entry point for external HTTP/HTTPS traffic to microservices?",
    diagram: null,
    options: [
      "A `ClusterIP` Service with external traffic policy set to `Local` for ingress routing control",
      "An `Ingress` resource with an Ingress controller that handles routing and TLS termination",
      "A `DaemonSet` running an HTTP proxy on every node with `hostNetwork: true` for direct access",
      "A `ConfigMap` that defines routing rules consumed by `kube-proxy` for HTTP load balancing"
    ],
    answer: 1,
    explanation: "An Ingress resource, backed by an Ingress controller (like NGINX or Traefik), is the standard Kubernetes mechanism for managing external HTTP/HTTPS access. Ingress controllers can handle TLS termination, path-based routing, rate limiting, and integrate with authentication plugins. `ClusterIP` is internal-only. A DaemonSet-based proxy bypasses Kubernetes networking abstractions. `kube-proxy` does not handle HTTP-level routing or load balancing.",
    verify: null
  },
  {
    id: "s01-q060",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team is evaluating whether to use serverless functions or traditional Kubernetes Deployments for a new event-processing pipeline. The pipeline receives bursts of events every few hours but is idle most of the time. Which characteristic makes serverless the better fit for this workload?",
    diagram: null,
    options: [
      "Serverless platforms scale to zero during idle periods, reducing costs for bursty workloads",
      "Serverless functions have lower cold-start latency than traditional containers in Kubernetes",
      "Serverless functions support stateful processing with built-in persistent storage backends",
      "Serverless runtimes provide stronger process isolation guarantees than container Deployments"
    ],
    answer: 0,
    explanation: "Serverless platforms excel at bursty, event-driven workloads because they can scale to zero when idle, meaning you pay nothing during inactive periods, and scale up automatically when events arrive. Cold-start latency is actually a drawback of serverless, not an advantage. Serverless functions are typically stateless. Isolation depends on the specific serverless implementation and is not universally stronger than containers.",
    verify: null
  },
  {
    id: "s01-q061",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team needs a lightweight, Kubernetes-native way to handle DNS resolution within their cluster. Which CNCF graduated project serves as the default DNS server for Kubernetes clusters?",
    diagram: null,
    options: [
      "BIND9, configured as a Kubernetes add-on for internal DNS resolution in clusters",
      "PowerDNS, which is bundled with Kubernetes distributions for service discovery",
      "ExternalDNS, which manages DNS records for Kubernetes Services and Ingresses",
      "CoreDNS, a flexible DNS server that is the default cluster DNS in Kubernetes"
    ],
    answer: 3,
    explanation: "CoreDNS is a CNCF graduated project and the default DNS server in Kubernetes clusters since version 1.13. It provides service discovery by resolving Service names to ClusterIPs within the cluster. BIND9 is a general-purpose DNS server not used as a Kubernetes default. ExternalDNS synchronizes Kubernetes resources with external DNS providers but is not the internal cluster DNS. PowerDNS is not bundled with Kubernetes.",
    verify: "microk8s kubectl get pods -n kube-system -l k8s-app=kube-dns"
  },
  {
    id: "s01-q062",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A team needs to understand where container logs are stored on a Kubernetes node by default. When a developer runs `kubectl logs <pod-name>`, where does the kubelet retrieve those logs from?",
    diagram: null,
    options: [
      "From `etcd`, where all container stdout/stderr output is stored as part of the Pod status object",
      "From a centralized logging service that the kubelet queries via the Kubernetes API on demand",
      "From the container runtime's log files on the node, typically under `/var/log/containers/`",
      "From the Pod's `emptyDir` volume, which Kubernetes automatically creates for log storage data"
    ],
    answer: 2,
    explanation: "By default, container runtimes write stdout and stderr to log files on the node. The kubelet reads these logs (typically found at `/var/log/containers/`, which are symlinks to `/var/log/pods/` and ultimately to the runtime's log directory) when serving `kubectl logs` requests. Logs are not stored in `etcd`, which only stores cluster state. There is no centralized logging service by default. Kubernetes does not automatically create `emptyDir` volumes for logs.",
    verify: null
  },
  {
    id: "s01-q063",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A team is running multiple projects on a shared Kubernetes cluster and needs to track resource consumption per project for cost allocation. Which combination of Kubernetes features helps them attribute costs to specific teams or projects?",
    diagram: null,
    options: [
      "Use separate clusters for each project to ensure complete cost isolation across all teams",
      "Use namespaces per project with `ResourceQuotas` and labels, plus tools like Kubecost",
      "Use `PodDisruptionBudgets` per project to control spending during disruption events in prod",
      "Use `PriorityClasses` to assign cost tiers where higher-priority Pods cost more per project"
    ],
    answer: 1,
    explanation: "Namespaces provide logical boundaries for organizing resources by project, and `ResourceQuotas` limit consumption within each namespace. Labels can further categorize workloads. Tools like Kubecost or cloud provider cost management integrate with these Kubernetes primitives to provide cost attribution. Separate clusters add operational overhead. PodDisruptionBudgets manage availability, not costs. PriorityClasses affect scheduling priority, not cost tracking.",
    verify: "microk8s kubectl get resourcequotas --all-namespaces"
  },
  {
    id: "s01-q064",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A team is using Helm to manage their Kubernetes deployments. They need to understand the structure of a Helm chart. Which file within a Helm chart defines the default configuration values that templates use during rendering?",
    diagram: null,
    options: [
      "`values.yaml`, which defines default configuration values overridden at install time",
      "`Chart.yaml`, which contains both metadata and default configuration value entries",
      "`requirements.yaml`, which lists chart dependencies and their default config settings",
      "`templates/defaults.yaml`, a special template file that initializes all chart values"
    ],
    answer: 0,
    explanation: "`values.yaml` is the file in a Helm chart that defines default configuration values. These values are injected into templates during rendering and can be overridden using `--set` flags or custom values files at install or upgrade time. `Chart.yaml` contains chart metadata (name, version, description) but not configuration values. `requirements.yaml` (now `Chart.yaml` dependencies) lists chart dependencies. There is no special `templates/defaults.yaml` file.",
    verify: null
  },
  {
    id: "s01-q065",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer attaches labels `app: frontend` and `tier: web` to their Pod. Later, they need to query all Pods with the label `app: frontend` but NOT `tier: api`. Which `kubectl` command correctly filters using these label selectors?",
    diagram: null,
    options: [
      "`kubectl get pods -l app=frontend,tier!=api`",
      "`kubectl get pods -l app=frontend OR tier!=api`",
      "`kubectl get pods --labels app=frontend --no tier`",
      "`kubectl get pods -l app=frontend --exclude tier=api`"
    ],
    answer: 0,
    explanation: "The `-l` flag supports both equality-based (`app=frontend`) and inequality-based (`tier!=api`) selectors, separated by commas for AND logic. The comma means both conditions must be true. There is no `OR` operator in label selectors. The `--labels` and `--exclude` flags do not exist in kubectl for label filtering.",
    verify: "microk8s kubectl get pods -l app=frontend,tier!=api --all-namespaces 2>/dev/null"
  },
  {
    id: "s01-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A team notices that their Pods are being evicted from nodes during memory pressure events. They want to protect critical Pods from eviction. Which field in the Pod spec influences eviction priority, and what value makes a Pod least likely to be evicted?",
    diagram: null,
    options: [
      "Set `spec.priority` to a high value; the scheduler never evicts high-priority Pods from any node",
      "Set resource `requests` equal to `limits` (Guaranteed QoS), making the Pod least likely to be evicted",
      "Set `spec.terminationGracePeriodSeconds` to a very high value to delay the eviction process entirely",
      "Add the annotation `eviction.kubernetes.io/protected: true` to prevent eviction during memory pressure"
    ],
    answer: 1,
    explanation: "Kubernetes assigns a Quality of Service (QoS) class based on resource requests and limits. When `requests` equals `limits` for all containers, the Pod receives the `Guaranteed` QoS class, making it the last to be evicted during resource pressure. Pods with `Burstable` or `BestEffort` QoS are evicted first. While Pod priority can influence eviction order within the same QoS class, the QoS class itself is the primary factor the kubelet considers during eviction, making Guaranteed QoS the strongest protection. `terminationGracePeriodSeconds` only affects the shutdown process. The mentioned annotation does not exist.",
    verify: "microk8s kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.qosClass}{\"\\n\"}{end}' --all-namespaces 2>/dev/null"
  },
  {
    id: "s01-q067",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team deploys a LoadBalancer Service in a cloud-managed Kubernetes cluster. They notice that the Service has both a ClusterIP and an external IP. A new engineer is confused about how the LoadBalancer type relates to other Service types. Which statement is correct?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="120" y="5" width="160" height="35" rx="6" fill="#FF5722" stroke="#fff" stroke-width="1.5"/><text x="200" y="28" text-anchor="middle" fill="white" font-size="12">External LoadBalancer</text><rect x="120" y="60" width="160" height="35" rx="6" fill="#FF9800" stroke="#fff" stroke-width="1.5"/><text x="200" y="83" text-anchor="middle" fill="white" font-size="12">NodePort (auto)</text><rect x="120" y="115" width="160" height="35" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="200" y="138" text-anchor="middle" fill="white" font-size="12">ClusterIP (auto)</text><rect x="50" y="180" width="90" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="95" y="205" text-anchor="middle" fill="white" font-size="11">Pod A</text><rect x="155" y="180" width="90" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="200" y="205" text-anchor="middle" fill="white" font-size="11">Pod B</text><rect x="260" y="180" width="90" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="305" y="205" text-anchor="middle" fill="white" font-size="11">Pod C</text><line x1="200" y1="40" x2="200" y2="60" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="95" x2="200" y2="115" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="150" x2="95" y2="180" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="150" x2="200" y2="180" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="150" x2="305" y2="180" stroke="#aaa" stroke-width="1.5"/></svg>',
    options: [
      "LoadBalancer builds on NodePort, which builds on ClusterIP, so a LoadBalancer Service has all three",
      "LoadBalancer is independent of ClusterIP and NodePort; it creates a completely separate traffic path",
      "LoadBalancer replaces ClusterIP with an external IP, so the Service is no longer internally accessible",
      "LoadBalancer only works with headless Services that have no ClusterIP assigned in the cluster config"
    ],
    answer: 0,
    explanation: "Kubernetes Service types are hierarchical. A `LoadBalancer` Service automatically provisions a cloud load balancer, a `NodePort`, and a `ClusterIP`. Traffic can reach the Pods via the external load balancer, any node's IP on the NodePort, or the internal ClusterIP. They are not independent paths. The ClusterIP is not replaced. Headless Services (no ClusterIP) are incompatible with LoadBalancer type.",
    verify: "microk8s kubectl get svc -o wide --all-namespaces"
  },
  {
    id: "s01-q068",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to run a report-generation task every day at midnight. The task should create a Pod, run the report, and then the Pod should terminate. If the task fails, it should retry up to 2 times. Which Kubernetes resource should they use?",
    diagram: null,
    options: [
      "A Deployment with a custom cron script inside the container to trigger runs",
      "A CronJob that creates a Job on the defined schedule with `backoffLimit: 2`",
      "A DaemonSet with a sleep loop that checks the system time and runs at midnight",
      "A Pod with `restartPolicy: Always` and a crontab entry inside the container"
    ],
    answer: 1,
    explanation: "A CronJob creates Job objects on a cron schedule. Each Job runs a Pod to completion. Setting `backoffLimit: 2` on the Job template allows up to 2 retries on failure. A Deployment is for long-running services. Using a DaemonSet with a sleep loop wastes resources on every node. A Pod with `restartPolicy: Always` never terminates and does not have built-in scheduling capabilities.",
    verify: "microk8s kubectl get cronjobs --all-namespaces"
  },
  {
    id: "s01-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer uses `kubectl apply -f deployment.yaml` to create a Deployment. A few minutes later, they modify the YAML file and run the same command again. What happens?",
    diagram: null,
    options: [
      "Kubernetes rejects the command because the Deployment already exists and cannot be modified with `apply`",
      "Kubernetes deletes the existing Deployment and creates a new one from the updated YAML manifest file",
      "Kubernetes performs a three-way merge comparing the last applied config, live state, and new file",
      "Kubernetes creates a duplicate Deployment with an auto-generated suffix to avoid name conflicts"
    ],
    answer: 2,
    explanation: "`kubectl apply` uses a declarative approach with a three-way merge strategy. It compares the new configuration, the last-applied-configuration annotation (stored on the object), and the current live state to determine what changes to make. This allows it to update only the fields that changed. It does not reject existing resources, create duplicates, or delete and recreate the resource.",
    verify: null
  },
  {
    id: "s01-q070",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security-conscious team wants to prevent any Pod from running with escalated privileges in their cluster. They need a cluster-wide policy that rejects Pod specs with `privileged: true` or capabilities like `SYS_ADMIN`. Which approach is recommended in modern Kubernetes?",
    diagram: null,
    options: [
      "Configure `PodSecurityPolicy` (PSP) objects to define allowed security contexts for the cluster",
      "Use Pod Security Admission (PSA) with the `restricted` profile enforced at the namespace level",
      "Deploy a custom webhook that intercepts all Pod creation requests and inspects security contexts",
      "Set `allowPrivilegeEscalation: false` in the kubelet configuration to block all privileged Pods"
    ],
    answer: 1,
    explanation: "Pod Security Admission (PSA) is the successor to PodSecurityPolicy (which was removed in Kubernetes v1.25). PSA defines three profiles — `privileged`, `baseline`, and `restricted` — that can be enforced, audited, or warned at the namespace level. The `restricted` profile prohibits privileged containers and dangerous capabilities. PodSecurityPolicies are deprecated and removed. Custom webhooks work but add complexity. The kubelet does not have a global privilege-blocking configuration.",
    verify: null
  },
  {
    id: "s01-q071",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team is running a service mesh in their cluster and notices that each application Pod has an additional container they did not define. This container intercepts all network traffic to and from the application container. What is this pattern called?",
    diagram: null,
    options: [
      "The init container pattern, which sets up network rules before the application container starts",
      "The ambassador pattern, where an external proxy runs as a separate Deployment outside the Pod",
      "The sidecar proxy pattern, where an injected container like Envoy handles service communication",
      "The adapter pattern, which transforms outgoing traffic to a standard protocol for other services"
    ],
    answer: 2,
    explanation: "Service meshes like Istio and Linkerd use the sidecar proxy pattern, injecting a proxy container (commonly Envoy for Istio, linkerd-proxy for Linkerd) into each Pod. This proxy intercepts all inbound and outbound traffic to handle mTLS, load balancing, retries, and observability transparently. Init containers run only at startup. The ambassador pattern in its original definition uses a local proxy for outbound access but is not the term used for service mesh injection. The adapter pattern normalizes interfaces.",
    verify: null
  },
  {
    id: "s01-q072",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After creating a Deployment, the team notices that the desired number of replicas is 3 but only 2 Pods are running. The third Pod shows a status of `Pending`. Running `kubectl describe pod` reveals no events. What should they check next?",
    diagram: null,
    options: [
      "Check whether the namespace has a `ResourceQuota` that has been exceeded, blocking the Pod",
      "Restart the `kube-scheduler` to force re-evaluation of all Pods currently pending in the queue",
      "Delete the other 2 running Pods so the ReplicaSet recreates all 3 at once from the template",
      "Check the Deployment's `maxSurge` setting, which may be limiting the number of running Pods"
    ],
    answer: 0,
    explanation: "When a Pod is `Pending` with no events, it often means the Pod was not even submitted to the scheduler. A `ResourceQuota` in the namespace can prevent Pod creation if the quota for CPU, memory, or Pod count is exceeded. Restarting the scheduler is drastic and unlikely to help if the Pod was not submitted. Deleting running Pods does not solve the underlying quota issue. `maxSurge` only applies during rolling updates, not steady-state.",
    verify: "microk8s kubectl get resourcequotas --all-namespaces"
  },
  {
    id: "s01-q073",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team needs to understand how the various control plane components interact. When a user runs `kubectl create deployment nginx --image=nginx`, which sequence of events correctly describes what happens in the control plane?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><text x="10" y="20" fill="#ccc" font-size="11">1.</text><rect x="30" y="5" width="100" height="30" rx="5" fill="#326CE5" stroke="#fff" stroke-width="1"/><text x="80" y="25" text-anchor="middle" fill="white" font-size="10">API Server</text><text x="150" y="25" fill="#ccc" font-size="10">stores Deployment in etcd</text><text x="10" y="60" fill="#ccc" font-size="11">2.</text><rect x="30" y="45" width="100" height="30" rx="5" fill="#555" stroke="#aaa" stroke-width="1"/><text x="80" y="65" text-anchor="middle" fill="white" font-size="10">Controller Mgr</text><text x="150" y="65" fill="#ccc" font-size="10">creates ReplicaSet → Pods</text><text x="10" y="100" fill="#ccc" font-size="11">3.</text><rect x="30" y="85" width="100" height="30" rx="5" fill="#4CAF50" stroke="#fff" stroke-width="1"/><text x="80" y="105" text-anchor="middle" fill="white" font-size="10">Scheduler</text><text x="150" y="105" fill="#ccc" font-size="10">assigns Pods to nodes</text><text x="10" y="140" fill="#ccc" font-size="11">4.</text><rect x="30" y="125" width="100" height="30" rx="5" fill="#FF9800" stroke="#fff" stroke-width="1"/><text x="80" y="145" text-anchor="middle" fill="white" font-size="10">Kubelet</text><text x="150" y="145" fill="#ccc" font-size="10">starts containers on node</text></svg>',
    options: [
      "API server creates the Deployment in etcd, scheduler assigns it to a node, then kubelet creates Pods and starts containers",
      "Scheduler receives the request first, assigns nodes, then API server creates the Deployment and Pods, kubelet starts containers",
      "API server stores Deployment in etcd, controller creates ReplicaSet and Pods, scheduler binds them, kubelet starts containers",
      "API server creates Pods directly in etcd, scheduler assigns them to available nodes, then controller manager monitors health"
    ],
    answer: 2,
    explanation: "The correct sequence is: the API server receives the request and stores the Deployment object in `etcd`. The Deployment controller (in `kube-controller-manager`) detects the new Deployment and creates a ReplicaSet. The ReplicaSet controller then creates the specified number of Pod objects. The scheduler detects unscheduled Pods and assigns them to nodes. Finally, the kubelet on each assigned node starts the containers via the container runtime. Each component watches for changes through the API server.",
    verify: null
  },
  {
    id: "s01-q074",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team wants to check the health of their application running in a Pod. They configure a `livenessProbe` that sends an HTTP GET request to `/healthz` on port 8080 every 10 seconds. If the probe fails 3 consecutive times, what action does Kubernetes take?",
    diagram: null,
    options: [
      "Kubernetes kills the container and restarts it according to the Pod's restart policy",
      "Kubernetes removes the Pod from the Service endpoints but keeps the container running",
      "Kubernetes marks the Pod as `Unhealthy` and sends an alert to the cluster administrator",
      "Kubernetes reschedules the Pod to a different node that may have better connectivity"
    ],
    answer: 0,
    explanation: "When a `livenessProbe` fails the specified number of times (controlled by `failureThreshold`, default 3), the kubelet kills the container and restarts it according to the Pod's `restartPolicy`. This ensures that unhealthy containers are replaced. Removing from Service endpoints is the behavior of a `readinessProbe`, not a liveness probe. Kubernetes does not send alerts natively. Rescheduling to a different node does not occur — the Pod stays on the same node.",
    verify: null
  },
  {
    id: "s01-q075",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team operates a Deployment with `replicas: 5`. During a planned maintenance window, they need to ensure at least 3 Pods remain running at all times while nodes are being drained. Which resource should they configure?",
    diagram: null,
    options: [
      "A `HorizontalPodAutoscaler` with a minimum replica count of 3",
      "A `PodDisruptionBudget` with `minAvailable: 3` for disruptions",
      "A `ResourceQuota` with a `pods: 3` minimum set in the namespace",
      "A node taint with `NoExecute` and a `tolerationSeconds` of 3600"
    ],
    answer: 1,
    explanation: "A `PodDisruptionBudget` (PDB) specifies the minimum number of Pods that must remain available during voluntary disruptions like node drains. Setting `minAvailable: 3` ensures that `kubectl drain` will not evict Pods if it would bring the count below 3. HPAs handle scaling based on metrics, not disruption limits. ResourceQuotas set maximum limits, not minimums. Taints and tolerations control scheduling, not disruption budgets.",
    verify: "microk8s kubectl get pdb --all-namespaces"
  },
  {
    id: "s01-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team configures a `readinessProbe` on their application Pods. The probe checks if the application has loaded its cache and is ready to serve traffic. What happens when the readiness probe fails?",
    diagram: null,
    options: [
      "The kubelet restarts the container to force the application to reinitialize its state",
      "The Deployment scales up an additional replica to compensate for the unready Pod status",
      "The Pod is deleted and rescheduled on another node that has more available resources",
      "The Pod is removed from Service endpoints, stopping traffic until the probe passes"
    ],
    answer: 3,
    explanation: "When a `readinessProbe` fails, the Pod's IP is removed from the endpoints of Services that select it. This means the Pod stops receiving traffic, but the container is NOT restarted (that is the behavior of a `livenessProbe`). Once the probe passes again, the Pod is added back to the Service endpoints. The Pod is not deleted or rescheduled. The Deployment controller does not scale based on readiness status.",
    verify: null
  },
  {
    id: "s01-q077",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team is designing a multi-node Kubernetes cluster. They want to understand which components run on worker nodes versus control plane nodes. Which set of components runs on every worker node?",
    diagram: null,
    options: [
      "`kube-apiserver`, `kubelet`, and container runtime",
      "`kubelet`, `kube-proxy`, and `kube-scheduler`",
      "`kubelet`, `kube-proxy`, and a container runtime",
      "`etcd`, `kubelet`, and `kube-proxy` on each node"
    ],
    answer: 2,
    explanation: "Every worker node runs the `kubelet` (which manages Pods on the node), `kube-proxy` (which implements Service networking rules), and a container runtime (like `containerd` or `CRI-O`) to execute containers. The `kube-scheduler` runs only on control plane nodes. The `kube-apiserver` is a control plane component. `etcd` runs on control plane nodes (or dedicated etcd nodes).",
    verify: "microk8s kubectl get pods -n kube-system -o wide"
  },
  {
    id: "s01-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A team wants to ensure their Pod is scheduled on a node in the `us-east-1a` availability zone. They have labeled their nodes with `topology.kubernetes.io/zone=us-east-1a`. Which Pod spec configuration achieves this without bypassing the scheduler?",
    diagram: null,
    options: [
      "Set `spec.nodeName` to one of the nodes in the `us-east-1a` zone",
      "Add an annotation `scheduler.kubernetes.io/zone: us-east-1a` to the Pod",
      "Use `spec.nodeSelector` with `topology.kubernetes.io/zone: us-east-1a`",
      "Configure `PodAffinity` to attract the Pod to the `us-east-1a` zone label"
    ],
    answer: 2,
    explanation: "`nodeSelector` is the simplest way to constrain a Pod to nodes with specific labels. Setting `nodeSelector` with the zone label ensures the scheduler only considers nodes in the specified availability zone. `nodeName` bypasses the scheduler entirely. Annotations do not affect scheduling decisions. `PodAffinity` matches based on other Pods' labels and locations, not node labels directly — `nodeAffinity` would be the affinity-based alternative.",
    verify: null
  },
  {
    id: "s01-q079",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to scale their web application based on CPU utilization. When average CPU usage across all Pods exceeds 70%, they want Kubernetes to automatically add more replicas. Which resource automates this?",
    diagram: null,
    options: [
      "A `VerticalPodAutoscaler` that increases the CPU requests of existing Pods automatically",
      "A `CronJob` that periodically checks CPU usage and runs `kubectl scale` commands to adjust",
      "A `HorizontalPodAutoscaler` (HPA) targeting 70% average CPU utilization for Deployment",
      "A `ResourceQuota` with a CPU threshold that triggers scaling events when it is exceeded"
    ],
    answer: 2,
    explanation: "A `HorizontalPodAutoscaler` (HPA) automatically adjusts the number of Pod replicas based on observed metrics like CPU utilization. Setting the target average CPU utilization to 70% causes the HPA to scale out when usage exceeds this threshold and scale in when it drops below. A `VerticalPodAutoscaler` adjusts resource requests per Pod, not replica count. CronJobs are manual automation. ResourceQuotas do not trigger scaling.",
    verify: "microk8s kubectl get hpa --all-namespaces"
  },
  {
    id: "s01-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team creates a headless Service by setting `clusterIP: None`. They want to understand how this differs from a regular ClusterIP Service. What is the behavior of a headless Service?",
    diagram: null,
    options: [
      "It does not create any DNS records, so Pods must discover each other using environment variables only",
      "It creates a ClusterIP but hides it from `kubectl get svc` output for additional security purposes",
      "DNS queries for the Service return individual Pod IPs instead of a virtual IP, enabling direct access",
      "It disables load balancing entirely, routing all traffic to only the first Pod in the endpoint list"
    ],
    answer: 2,
    explanation: "A headless Service (`clusterIP: None`) does not get a virtual IP. Instead, DNS queries for the Service name return A records for all the Pod IPs backing the Service. This allows clients to discover and connect to individual Pods directly, which is essential for stateful applications like databases. Headless Services still create DNS records. The ClusterIP is not hidden. Traffic is not limited to one Pod.",
    verify: null
  },
  {
    id: "s01-q081",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer wants to understand the relationship between a ReplicaSet and a Deployment. They notice that creating a Deployment also creates a ReplicaSet. Should they ever create ReplicaSets directly?",
    diagram: null,
    options: [
      "Yes, ReplicaSets should be created directly when you need more than 10 replicas for performance reasons",
      "No, because ReplicaSets are deprecated and will be removed in a future Kubernetes version release",
      "Yes, ReplicaSets are required for stateful applications where Deployments cannot be used at all",
      "No, Deployments manage ReplicaSets and add rolling update and rollback capabilities on top of them"
    ],
    answer: 3,
    explanation: "Deployments are the recommended higher-level abstraction that manages ReplicaSets. A Deployment creates and manages ReplicaSets, adding rolling update and rollback functionality. Creating ReplicaSets directly is almost never necessary, as you lose these management features. The replica count limit is not a reason. StatefulSets (not ReplicaSets) are for stateful workloads. ReplicaSets are not deprecated — they are actively used by Deployments internally.",
    verify: "microk8s kubectl get replicasets --all-namespaces"
  },
  {
    id: "s01-q082",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A team is building container images and wants to ensure they follow best practices for minimal image size and security. Which approach produces the smallest and most secure container image?",
    diagram: null,
    options: [
      "Use a multi-stage build with a minimal base image like `distroless` or `alpine` for the final stage",
      "Use a full Ubuntu base image and remove unnecessary packages with `apt-get remove` in the final layer",
      "Build the application on the host machine and copy the binary into a `latest` tagged base image",
      "Use the `--squash` flag to compress all layers into one, eliminating all unused files entirely"
    ],
    answer: 0,
    explanation: "Multi-stage builds allow you to use a full build environment in an early stage and copy only the compiled artifacts into a minimal final stage (like `distroless` or `alpine`). This produces small, secure images without build tools or unnecessary packages. Removing packages from a full image still leaves layer history. Building on the host introduces inconsistencies. The `--squash` flag is experimental and does not selectively remove files from earlier layers.",
    verify: null
  },
  {
    id: "s01-q083",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A cluster administrator needs to create a service account that can list and get Pods in the `development` namespace but cannot delete or create them. Which RBAC resources should they create?",
    diagram: null,
    options: [
      "A `ClusterRole` with `get` and `list` verbs on Pods, and a `ClusterRoleBinding` to the service account",
      "A `Role` in `development` with `get` and `list` on Pods, and a `RoleBinding` to the service account",
      "A `Role` with all verbs on Pods, then create a `NetworkPolicy` to restrict any write operations from it",
      "A `ServiceAccount` annotated with `rbac.authorization.kubernetes.io/verbs: get,list` for automatic binding"
    ],
    answer: 1,
    explanation: "For namespace-scoped permissions, you create a `Role` (which defines verbs like `get` and `list` on resources like `pods`) and a `RoleBinding` (which binds the Role to a subject like a ServiceAccount) in the target namespace. A `ClusterRole` with a `ClusterRoleBinding` would grant access across all namespaces. NetworkPolicies control network traffic, not API permissions. ServiceAccount annotations do not control RBAC permissions.",
    verify: "microk8s kubectl get roles,rolebindings -n default"
  },
  {
    id: "s01-q084",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A team deploys a new Pod, but it enters the `RunContainerError` state. Running `kubectl describe pod` shows the error: `failed to create containerd task: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: \"/app/start.sh\": permission denied`. What is the issue?",
    diagram: null,
    options: [
      "The container runtime does not have permission to pull the image from the private registry",
      "The Pod's `securityContext` has `readOnlyRootFilesystem: true`, preventing script execution",
      "The entrypoint script `/app/start.sh` lacks execute permissions inside the container image",
      "The `kubelet` does not have permission to create containers on this particular worker node"
    ],
    answer: 2,
    explanation: "The error `permission denied` for the entrypoint script indicates that the file `/app/start.sh` inside the container image does not have execute permissions. This is a build-time issue — the Dockerfile should include `RUN chmod +x /app/start.sh` or the file should be added with correct permissions. This is not a registry pull issue, a `readOnlyRootFilesystem` issue (which prevents writes, not execution), or a kubelet permission problem.",
    verify: null
  },
  {
    id: "s01-q085",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team has a PersistentVolumeClaim that is stuck in `Pending` state. Running `kubectl describe pvc` shows the event: `no persistent volumes available for this claim and no storage class is set`. What is the most likely cause?",
    diagram: null,
    options: [
      "The PVC requests more storage than any node has available disk space for provisioning",
      "The `kube-scheduler` cannot find a node with the requested volume type for the PVC",
      "The PVC has no `storageClassName`, there is no default StorageClass, and no PV matches",
      "The PVC is in a different namespace than the PersistentVolume it should bind to for use"
    ],
    answer: 2,
    explanation: "The error message indicates two issues: no dynamic provisioning (no StorageClass set) and no existing PV matches the claim. For dynamic provisioning, the PVC needs a `storageClassName` referencing a StorageClass, or a default StorageClass must exist. For static provisioning, a PV must match the PVC's access modes, capacity, and storage class. PVs are cluster-scoped (not namespaced), so namespace mismatch is not possible. The scheduler is not involved in PVC binding.",
    verify: "microk8s kubectl get sc"
  },
  {
    id: "s01-q086",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is debating whether to use declarative or imperative approaches for managing their Kubernetes resources. The senior engineer advocates for declarative management. What is the key advantage of the declarative approach?",
    diagram: null,
    options: [
      "Declarative commands execute faster because they skip validation against the API server entirely",
      "Declarative config describes the desired end state, enabling version control and reproducibility",
      "Declarative manifests automatically retry failed operations until the desired state is fully achieved",
      "Declarative management eliminates the need for YAML files by using command-line flags exclusively"
    ],
    answer: 1,
    explanation: "Declarative management (using `kubectl apply` with YAML/JSON manifests) describes the desired state rather than the steps to get there. This enables version control of infrastructure, audit trails through Git history, and reproducible deployments across environments. Declarative commands do not skip validation. Retry logic is handled by controllers, not the declarative approach itself. Declarative management relies on manifest files (YAML/JSON), not command-line flags.",
    verify: null
  },
  {
    id: "s01-q087",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team is migrating from a monolith to microservices and needs to decide how services communicate. They need reliable asynchronous communication where messages are not lost if a service is temporarily down. Which pattern should they adopt?",
    diagram: null,
    options: [
      "Asynchronous messaging through a broker like NATS or RabbitMQ that persists messages",
      "Synchronous REST API calls with retry logic and exponential backoff between services",
      "Shared database tables where services write messages for each other to read and process",
      "gRPC streaming connections that buffer messages in memory during service downtime periods"
    ],
    answer: 0,
    explanation: "A message broker (like NATS, RabbitMQ, or Kafka) provides durable, asynchronous communication between services. Messages are persisted in the broker, so if a consuming service is down, messages queue up and are delivered when it recovers. Synchronous REST calls fail when the target is down, even with retries. Shared database tables create tight coupling. gRPC in-memory buffers are lost if either side restarts.",
    verify: null
  },
  {
    id: "s01-q088",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team needs to collect OpenTelemetry traces, metrics, and logs from their Kubernetes applications. They want a vendor-neutral, unified collection pipeline that can export data to multiple backends. Which CNCF project provides this?",
    diagram: null,
    options: [
      "Prometheus, which supports traces, metrics, and logs through its multi-signal receiver",
      "OpenTelemetry Collector, which receives, processes, and exports telemetry neutrally",
      "Grafana Loki, which provides unified collection of all three telemetry signal types",
      "Fluentd, which has been extended to handle traces and metrics alongside log streams"
    ],
    answer: 1,
    explanation: "The OpenTelemetry Collector is a vendor-neutral agent that can receive, process, and export traces, metrics, and logs. It supports multiple input formats and can export to various backends (Jaeger, Prometheus, Zipkin, commercial vendors). Prometheus primarily handles metrics, not traces or logs. Grafana Loki handles logs, not all three signals. Fluentd handles logs primarily and does not natively process traces and metrics.",
    verify: null
  },
  {
    id: "s01-q089",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team is evaluating Function-as-a-Service (FaaS) platforms that run on Kubernetes. They want to write small functions triggered by HTTP requests or events without managing Pods or Deployments. Which characteristic is fundamental to the FaaS model?",
    diagram: null,
    options: [
      "Functions are short-lived, event-driven compute units scaled automatically by the platform",
      "Functions are long-running processes that handle multiple requests concurrently in a thread pool",
      "Functions must be compiled to WebAssembly (Wasm) for compatibility with Kubernetes runtimes",
      "Functions require dedicated nodes with specialized hardware to execute efficiently at scale"
    ],
    answer: 0,
    explanation: "In the FaaS model, functions are short-lived, event-driven units of compute. The platform handles all infrastructure concerns, including automatic scaling (including to zero when idle) and execution lifecycle. Functions are typically stateless and triggered by events or HTTP requests. They are not long-running processes. WebAssembly is an emerging runtime option but not a requirement. No specialized hardware is needed.",
    verify: null
  },
  {
    id: "s01-q090",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team deploys the Kubernetes Metrics Server in their cluster. They notice that `kubectl top pods` now shows CPU and memory usage. Which resource metrics does the Metrics Server collect, and what is its primary consumer?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="100" height="40" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="80" y="35" text-anchor="middle" fill="#ccc" font-size="11">Kubelet</text><rect x="30" y="70" width="100" height="40" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="80" y="95" text-anchor="middle" fill="#ccc" font-size="11">Kubelet</text><rect x="160" y="40" width="120" height="40" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="220" y="55" text-anchor="middle" fill="white" font-size="10">Metrics Server</text><text x="220" y="70" text-anchor="middle" fill="white" font-size="9">CPU + Memory</text><rect x="310" y="10" width="80" height="35" rx="6" fill="#4CAF50" stroke="#fff" stroke-width="1"/><text x="350" y="32" text-anchor="middle" fill="white" font-size="10">HPA</text><rect x="310" y="55" width="80" height="35" rx="6" fill="#FF9800" stroke="#fff" stroke-width="1"/><text x="350" y="77" text-anchor="middle" fill="white" font-size="10">kubectl top</text><line x1="130" y1="30" x2="160" y2="55" stroke="#aaa" stroke-width="1.5"/><line x1="130" y1="90" x2="160" y2="65" stroke="#aaa" stroke-width="1.5"/><line x1="280" y1="50" x2="310" y2="30" stroke="#4CAF50" stroke-width="1.5"/><line x1="280" y1="65" x2="310" y2="72" stroke="#FF9800" stroke-width="1.5"/><text x="145" y="45" fill="#aaa" font-size="8">scrape</text><text x="295" y="42" fill="#aaa" font-size="8">query</text></svg>',
    options: [
      "It collects disk I/O and network metrics, primarily used by Prometheus for alerting on node health",
      "It collects CPU and memory usage from kubelets, consumed by the HorizontalPodAutoscaler and top",
      "It collects all container metrics including GPU utilization, primarily used by the kube-scheduler",
      "It collects application-level metrics via HTTP scraping, primarily used by Grafana dashboards"
    ],
    answer: 1,
    explanation: "The Metrics Server collects resource metrics (CPU and memory) from the kubelet's Summary API on each node. Its primary consumers are the `HorizontalPodAutoscaler` (for scaling decisions) and `kubectl top` (for displaying current resource usage). It does not collect disk, network, or GPU metrics. It does not scrape application endpoints — that is Prometheus' role. The scheduler does not use Metrics Server data directly.",
    verify: "microk8s kubectl top pods --all-namespaces 2>/dev/null"
  },
  {
    id: "s01-q091",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A team is instrumenting their microservices for distributed tracing. They need to propagate trace context across service boundaries so that all spans from a single request are correlated. How is trace context typically propagated between services?",
    diagram: null,
    options: [
      "Through HTTP headers like `traceparent` from W3C Trace Context forwarded to downstream calls",
      "Through shared environment variables that all Pods in the cluster can read during execution",
      "Through Kubernetes annotations on Pod objects that services query via the API server at runtime",
      "Through the CNI plugin, which embeds trace IDs in the IP packet headers for network-level tracing"
    ],
    answer: 0,
    explanation: "Trace context is propagated via HTTP headers. The W3C Trace Context standard defines the `traceparent` header, which carries the trace ID and span ID. Each service extracts this header from incoming requests, creates its own span, and forwards the header to downstream calls. Environment variables are static. Pod annotations are not updated per request. The CNI plugin handles network configuration, not application-level trace data.",
    verify: null
  },
  {
    id: "s01-q092",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A team wants to ensure their container images do not contain known security vulnerabilities before deploying to production. At which stage of the CI/CD pipeline should vulnerability scanning occur?",
    diagram: null,
    options: [
      "Only during the build stage, because scanning at other stages would slow down the entire pipeline",
      "Only in production, where a runtime scanner monitors containers for vulnerabilities after deployment",
      "At multiple stages: during the build, before deployment via admission control, and in the registry",
      "Only when developers request it manually, to avoid blocking any automated deployment pipeline processes"
    ],
    answer: 2,
    explanation: "A defense-in-depth approach scans at multiple stages. During the build, the CI pipeline scans the newly built image. Before deployment, an admission controller (like OPA Gatekeeper or Kyverno) can reject images with critical vulnerabilities. Registries can continuously scan stored images for newly discovered CVEs. Scanning only at build misses new vulnerabilities discovered later. Scanning only in production is too late. Manual scanning is unreliable.",
    verify: null
  },
  {
    id: "s01-q093",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team uses Argo CD for GitOps-based deployments. They notice that after manually editing a Deployment in the cluster using `kubectl edit`, Argo CD shows the application as `OutOfSync`. What does this status mean?",
    diagram: null,
    options: [
      "The Git repository has been updated with new changes that have not yet been applied to the cluster",
      "The live cluster state differs from the desired state in Git because manual edits introduced drift",
      "Argo CD has lost connectivity to the Git repository and cannot verify the current application state",
      "The application has errors and Argo CD cannot determine what the correct cluster state should be"
    ],
    answer: 1,
    explanation: "In GitOps, the Git repository is the source of truth. When someone manually modifies a resource in the cluster (like using `kubectl edit`), the live state drifts from the desired state in Git. Argo CD detects this difference and reports the application as `OutOfSync`. The fix is either to sync the application (reverting the manual change) or update Git to reflect the desired change. This is not about Git repository changes, connectivity issues, or application errors.",
    verify: null
  },
  {
    id: "s01-q094",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team wants to perform a blue-green deployment for their application on Kubernetes. They have the current version (blue) running and want to deploy the new version (green) alongside it, then switch all traffic at once. How can they implement this using native Kubernetes resources?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="80" width="120" height="50" rx="8" fill="#2196F3" stroke="#fff" stroke-width="1.5"/><text x="70" y="100" text-anchor="middle" fill="white" font-size="11">Blue (v1)</text><text x="70" y="118" text-anchor="middle" fill="white" font-size="10">3 replicas</text><rect x="270" y="80" width="120" height="50" rx="8" fill="#4CAF50" stroke="#fff" stroke-width="1.5"/><text x="330" y="100" text-anchor="middle" fill="white" font-size="11">Green (v2)</text><text x="330" y="118" text-anchor="middle" fill="white" font-size="10">3 replicas</text><rect x="140" y="10" width="120" height="40" rx="8" fill="#FF9800" stroke="#FFD700" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="white" font-size="12">Service</text><line x1="170" y1="50" x2="70" y2="80" stroke="#2196F3" stroke-width="2"/><line x1="230" y1="50" x2="330" y2="80" stroke="#4CAF50" stroke-width="1.5" stroke-dasharray="5,3"/><text x="200" y="170" text-anchor="middle" fill="#ccc" font-size="11">Switch selector: version=v1 → version=v2</text></svg>',
    options: [
      "Use a single Deployment and update the image tag, which performs a blue-green switch automatically per rollout",
      "Deploy two Deployments (blue and green) and switch traffic by updating the Service selector to the green Pods",
      "Use an Ingress resource with weighted routing rules set to 0% blue traffic and 100% green traffic for cutover",
      "Scale the blue Deployment to zero and the green Deployment to the desired count simultaneously for the switch"
    ],
    answer: 1,
    explanation: "Blue-green deployment on Kubernetes involves running two separate Deployments. Both run simultaneously, with the Service selector pointing to the blue (current) Deployment. Once the green (new) Deployment is verified, you update the Service selector to point to the green Pods, switching all traffic instantly. Updating a Deployment's image performs a rolling update, not blue-green. Weighted routing is canary-style. Scaling down blue before green is ready causes downtime.",
    verify: null
  },
  {
    id: "s01-q095",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team needs to add metadata to their Pod that is used by external tooling but should not affect Kubernetes scheduling or routing. They want to store information like the Git commit SHA and the team responsible for the application. Which Kubernetes feature should they use?",
    diagram: null,
    options: [
      "Labels, which are used for organizing and selecting resources within the cluster",
      "Annotations, which store arbitrary non-identifying metadata for external tools",
      "Finalizers, which attach metadata that persists until explicitly removed by a process",
      "Environment variables in the Pod spec that external tools read via the Kubernetes API"
    ],
    answer: 1,
    explanation: "Annotations are designed to store arbitrary non-identifying metadata on Kubernetes objects. They can hold information like build details, Git SHAs, team ownership, and tool-specific configuration. Unlike labels, annotations are not used for selection or scheduling. Labels should be used for identifying and selecting resources. Finalizers are for controlling deletion behavior, not metadata storage. Environment variables are inside containers and not easily accessible to external tools.",
    verify: null
  },
  {
    id: "s01-q096",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a Deployment with `replicas: 3` and a resource request of 500m CPU per Pod. The cluster has 2 nodes, each with 1 CPU allocatable. The team tries to scale to 5 replicas. What happens?",
    diagram: null,
    options: [
      "All 5 replicas start successfully because resource requests are only treated as soft limits",
      "Only 4 replicas can be scheduled (2 per node at 500m each); the 5th Pod remains Pending",
      "Kubernetes automatically provisions a new node to handle the additional requested replicas",
      "The scale operation is rejected by the API server because it exceeds the cluster capacity"
    ],
    answer: 1,
    explanation: "With 2 nodes of 1 CPU each, the cluster has 2000m total allocatable CPU. Each Pod requests 500m, so 4 Pods can be scheduled (2 per node). The 5th Pod remains in `Pending` state because there is insufficient CPU to satisfy its request. Resource requests are guaranteed allocations, not soft limits. Kubernetes does not auto-provision nodes (that requires a cluster autoscaler). The API server accepts the scale request; scheduling is a separate concern.",
    verify: "microk8s kubectl describe nodes | grep -A5 Allocatable"
  },
  {
    id: "s01-q097",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team creates an `ExternalName` Service pointing to `legacy-db.example.com`. When Pods query this Service by its internal name, what response do they receive from the cluster DNS?",
    diagram: null,
    options: [
      "The ClusterIP assigned to the Service, which proxies traffic to the external hostname",
      "A CNAME record resolving to `legacy-db.example.com`, with no ClusterIP or proxy used",
      "A direct TCP connection to the external hostname, handled by `kube-proxy` on the node",
      "An error, because Services cannot reference external resources outside the cluster network"
    ],
    answer: 1,
    explanation: "An `ExternalName` Service creates a CNAME record in the cluster DNS that maps the Service name to the specified external hostname. No ClusterIP is allocated, and no proxying occurs through kube-proxy. The DNS resolution simply returns the CNAME, and the client connects directly to the external host. This is useful for integrating external services into the Kubernetes service discovery mechanism.",
    verify: null
  },
  {
    id: "s01-q098",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer is debugging their application and needs to execute a shell command inside a running container. Which `kubectl` command allows them to open an interactive terminal session in the container?",
    diagram: null,
    options: [
      "`kubectl attach <pod-name> --stdin --tty` to connect to the running process's stdin",
      "`kubectl exec -it <pod-name> -- /bin/sh` to start an interactive shell in the container",
      "`kubectl debug <pod-name> --copy-to=debug-pod` to create a debug copy of the Pod spec",
      "`kubectl logs -f <pod-name>` to follow the container's interactive output in real time"
    ],
    answer: 1,
    explanation: "`kubectl exec -it` is the standard command for executing a command inside a running container. The `-i` flag passes stdin, `-t` allocates a TTY, and `-- /bin/sh` starts a shell. `kubectl attach` connects to an already running process, which may not be a shell. `kubectl debug` creates an ephemeral or copy-based debugging environment, which is useful but not the simplest approach. `kubectl logs` only reads output and cannot execute commands.",
    verify: null
  },
  {
    id: "s01-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team is investigating API server authentication. They discover that Pods can authenticate to the Kubernetes API using tokens. Which mechanism provides these tokens to Pods automatically?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="160" height="50" rx="8" fill="#333" stroke="#326CE5" stroke-width="2"/><text x="100" y="50" text-anchor="middle" fill="white" font-size="12">Pod</text><rect x="220" y="20" width="160" height="50" rx="8" fill="#326CE5" stroke="#fff" stroke-width="2"/><text x="300" y="50" text-anchor="middle" fill="white" font-size="12">API Server</text><rect x="20" y="120" width="160" height="50" rx="8" fill="#FF9800" stroke="#FFD700" stroke-width="1.5"/><text x="100" y="140" text-anchor="middle" fill="white" font-size="11">ServiceAccount</text><text x="100" y="158" text-anchor="middle" fill="white" font-size="10">+ projected token</text><line x1="100" y1="70" x2="100" y2="120" stroke="#FFD700" stroke-width="1.5"/><text x="115" y="100" fill="#FFD700" font-size="10">mounts</text><line x1="180" y1="45" x2="220" y2="45" stroke="#4CAF50" stroke-width="2"/><text x="200" y="38" fill="#4CAF50" font-size="10">auth</text></svg>',
    options: [
      "The `kube-proxy` generates and distributes authentication tokens to all Pods in the cluster",
      "The `ServiceAccount` mechanism, which mounts a projected token volume into each Pod",
      "The kubelet generates a unique API key for each Pod and stores it in an environment variable",
      "The container runtime creates a certificate for each container signed by the cluster CA"
    ],
    answer: 1,
    explanation: "Every Pod is associated with a ServiceAccount (the `default` ServiceAccount if none is specified). Kubernetes automatically mounts a projected service account token as a volume at `/var/run/secrets/kubernetes.io/serviceaccount/`. This token can be used to authenticate to the API server. `kube-proxy` does not generate tokens. The kubelet does not create API keys. The container runtime does not handle authentication.",
    verify: "microk8s kubectl get serviceaccounts --all-namespaces"
  },
  {
    id: "s01-q100",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team wants to understand the different ways to create Kubernetes resources. They compare `kubectl create` and `kubectl apply`. A colleague argues they are interchangeable. Which statement correctly describes the difference?",
    diagram: null,
    options: [
      "They are identical in behavior; `create` is simply an alias for `apply` with the same semantics and output",
      "`kubectl create` is imperative and fails if the resource exists; `kubectl apply` is declarative and updates",
      "`kubectl create` is for initial creation only and `kubectl apply` is for updates only; neither can do both",
      "`kubectl apply` requires YAML input while `kubectl create` works only with command-line flags for resources"
    ],
    answer: 1,
    explanation: "`kubectl create` is an imperative command that creates a resource and returns an error if it already exists. `kubectl apply` is declarative — it creates the resource if it does not exist, or updates it if it does, by comparing the desired state with the current state. They are not interchangeable. Both can accept YAML input. `kubectl create` can also work with generators (like `kubectl create deployment`), and `kubectl apply` always requires a manifest file or stdin.",
    verify: null
  }
];
var labExercises = [
  {
    title: "Lab 1: Exploring Control Plane Components in kube-system",
    description: "Discover what runs in the kube-system namespace and identify the key control plane components that keep a Kubernetes cluster operational.",
    commands: "<span class='prompt'>$</span> kubectl get pods -n kube-system<br><span class='prompt'>$</span> kubectl get pods -n kube-system -o wide<br><span class='prompt'>$</span> kubectl get pods -n kube-system -l tier=control-plane<br><span class='prompt'>$</span> kubectl describe pod -n kube-system -l component=kube-apiserver",
    expected: "You should see Pods for the API server, etcd, scheduler, controller-manager, CoreDNS, and kube-proxy. The describe output shows the API server's container image, command flags, and resource usage."
  },
  {
    title: "Lab 2: Creating and Inspecting a Basic Pod",
    description: "Create a simple Pod running an NGINX container and inspect its structure, status, and logs to understand Pod anatomy.",
    commands: "<span class='prompt'>$</span> kubectl run my-nginx --image=nginx:latest --port=80<br><span class='prompt'>$</span> kubectl get pod my-nginx -o wide<br><span class='prompt'>$</span> kubectl describe pod my-nginx<br><span class='prompt'>$</span> kubectl logs my-nginx<br><span class='prompt'>$</span> kubectl get pod my-nginx -o yaml | head -50<br><span class='prompt'>$</span> kubectl delete pod my-nginx",
    expected: "The Pod should start in Pending, then ContainerCreating, then Running. The describe output shows events like Scheduled, Pulling, Pulled, Created, Started. The YAML output reveals the full Pod spec including the auto-assigned serviceAccount, default tolerations, and QoS class."
  },
  {
    title: "Lab 3: Understanding Namespaces",
    description: "Create namespaces, deploy resources into them, and observe how namespaces provide isolation boundaries for Kubernetes resources.",
    commands: "<span class='prompt'>$</span> kubectl get namespaces<br><span class='prompt'>$</span> kubectl create namespace dev-team<br><span class='prompt'>$</span> kubectl create namespace qa-team<br><span class='prompt'>$</span> kubectl run web --image=nginx -n dev-team<br><span class='prompt'>$</span> kubectl run web --image=nginx -n qa-team<br><span class='prompt'>$</span> kubectl get pods --all-namespaces | grep web<br><span class='prompt'>$</span> kubectl get pods -n dev-team<br><span class='prompt'>$</span> kubectl delete namespace dev-team<br><span class='prompt'>$</span> kubectl delete namespace qa-team",
    expected: "Both namespaces can have a Pod named 'web' without conflict. The --all-namespaces flag shows Pods across all namespaces. Deleting a namespace removes all resources within it."
  },
  {
    title: "Lab 4: Working with Labels and Selectors",
    description: "Apply labels to Pods and use selectors to filter and organize resources, demonstrating how Kubernetes uses labels for grouping and selection.",
    commands: "<span class='prompt'>$</span> kubectl run app1 --image=nginx --labels='app=frontend,tier=web,env=prod'<br><span class='prompt'>$</span> kubectl run app2 --image=nginx --labels='app=backend,tier=api,env=prod'<br><span class='prompt'>$</span> kubectl run app3 --image=nginx --labels='app=frontend,tier=web,env=staging'<br><span class='prompt'>$</span> kubectl get pods --show-labels<br><span class='prompt'>$</span> kubectl get pods -l app=frontend<br><span class='prompt'>$</span> kubectl get pods -l env=prod,tier=web<br><span class='prompt'>$</span> kubectl get pods -l 'env in (prod,staging)'<br><span class='prompt'>$</span> kubectl label pod app1 version=v1<br><span class='prompt'>$</span> kubectl get pods -l version=v1<br><span class='prompt'>$</span> kubectl delete pods -l app=frontend<br><span class='prompt'>$</span> kubectl delete pod app2",
    expected: "Labels allow filtering Pods by any combination of key-value pairs. Equality-based selectors (=, !=) and set-based selectors (in, notin) both work. Labels can be added after creation. Deleting by label selector removes all matching Pods at once."
  },
  {
    title: "Lab 5: Examining the Cluster with kubectl describe",
    description: "Use kubectl describe to deeply inspect nodes, Pods, and Services to understand resource details, events, and conditions.",
    commands: "<span class='prompt'>$</span> kubectl get nodes<br><span class='prompt'>$</span> kubectl describe node $(kubectl get nodes -o jsonpath='{.items[0].metadata.name}')<br><span class='prompt'>$</span> kubectl run inspect-me --image=nginx<br><span class='prompt'>$</span> kubectl describe pod inspect-me<br><span class='prompt'>$</span> kubectl describe service kubernetes<br><span class='prompt'>$</span> kubectl get events --sort-by=.metadata.creationTimestamp<br><span class='prompt'>$</span> kubectl delete pod inspect-me",
    expected: "Node describe shows capacity, allocatable resources, conditions (Ready, MemoryPressure, DiskPressure), running Pods, and allocated resources. Pod describe shows containers, volumes, conditions, and events. The kubernetes Service in default namespace is the API server endpoint. Events show a timeline of cluster operations."
  },
  {
    title: "Lab 6: Understanding Pod Lifecycle and States",
    description: "Observe different Pod states by creating Pods that succeed, fail, and crash, then examine how Kubernetes handles each case.",
    commands: "<span class='prompt'>$</span> kubectl run success-pod --image=nginx<br><span class='prompt'>$</span> kubectl run fail-pod --image=busybox -- /bin/sh -c 'exit 1'<br><span class='prompt'>$</span> kubectl run completed-pod --image=busybox --restart=Never -- echo 'Job done'<br><span class='prompt'>$</span> kubectl get pods -w &<br><span class='prompt'>$</span> sleep 30<br><span class='prompt'>$</span> kubectl get pods<br><span class='prompt'>$</span> kubectl describe pod fail-pod | tail -20<br><span class='prompt'>$</span> kubectl logs completed-pod<br><span class='prompt'>$</span> kubectl logs fail-pod --previous<br><span class='prompt'>$</span> kubectl delete pod success-pod fail-pod completed-pod",
    expected: "success-pod reaches Running and stays there. fail-pod enters CrashLoopBackOff as the container exits with code 1 and the kubelet keeps restarting it with increasing backoff delays. completed-pod reaches Succeeded/Completed because restartPolicy is Never and the command exits successfully. The --previous flag shows logs from the last crashed container instance."
  }
];
