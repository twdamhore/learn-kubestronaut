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
    explanation: "In Kubernetes, the Pod is the smallest deployable unit, and every container must run inside a Pod. The correct approach is to define a Pod manifest specifying the container image and submit it to the API server via `kubectl apply`. Running containers directly via `docker run` or `containerd` bypasses the Kubernetes control plane entirely. While static pods exist, they still require a Pod spec, not a bare container definition.\n\nWhy other options are wrong:\n- A: `docker run` bypasses the Kubernetes control plane entirely, leaving the container unmanaged.\n- B: Static pods still require a complete Pod spec — you cannot use a bare container definition.\n- C: Using `containerd` directly also circumvents scheduling and lifecycle management.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/",
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
    explanation: "The `kube-scheduler` is the control plane component responsible for watching for newly created Pods that have no node assigned and selecting appropriate nodes for them to run on. The `kube-controller-manager` runs controllers like the node controller but does not directly schedule Pods. `etcd` is a key-value store for cluster state, and `kube-proxy` handles network rules for Services, not scheduling.\n\nWhy other options are wrong:\n- A: The controller-manager runs controllers (e.g. node controller) but does not assign Pods to nodes.\n- C: etcd is a passive key-value store; it does not trigger scheduling events.\n- D: kube-proxy manages network rules for Services, not Pod scheduling.\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
    verify: "microk8s kubectl get pods -n kube-system -l component=kube-scheduler"
  },
  {
    id: "s01-q003",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An SRE team notices that when a container inside a Pod crashes, Kubernetes automatically restarts it. They want to understand this behavior better. Which component running on each node is directly responsible for ensuring containers within Pods are running as specified?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#2d2d2d" stroke="#555" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#ccc" font-size="14" font-weight="bold">Worker Node</text><rect x="30" y="50" width="140" height="45" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="100" y="78" text-anchor="middle" fill="white" font-size="13">???</text><rect x="30" y="110" width="140" height="45" rx="6" fill="#555" stroke="#aaa" stroke-width="1.5"/><text x="100" y="138" text-anchor="middle" fill="white" font-size="13">Container Runtime</text><rect x="220" y="50" width="150" height="105" rx="6" fill="#444" stroke="#aaa" stroke-width="1.5"/><text x="295" y="75" text-anchor="middle" fill="#ccc" font-size="12">Pod</text><rect x="235" y="85" width="120" height="25" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="295" y="103" text-anchor="middle" fill="white" font-size="11">Container (crashed)</text><rect x="235" y="120" width="120" height="25" rx="4" fill="#4CAF50" stroke="#fff" stroke-width="1"/><text x="295" y="138" text-anchor="middle" fill="white" font-size="11">Container (restarting)</text><line x1="170" y1="72" x2="220" y2="100" stroke="#FFD700" stroke-width="2" stroke-dasharray="5,3"/></svg>',
    options: [
      "The `kube-scheduler`, which reschedules crashed containers on the same worker node",
      "The container runtime interface daemon, which independently monitors and restarts them",
      "The `kubelet`, which ensures containers described in PodSpecs are running and healthy",
      "The `kube-controller-manager` via the ReplicaSet controller and its reconciliation loop"
    ],
    answer: 2,
    explanation: "The `kubelet` is the primary node agent that runs on each worker node. It watches for PodSpecs assigned to its node and ensures the containers described in those specs are running and healthy. When a container crashes, the kubelet detects this and restarts it according to the Pod's restart policy. The scheduler only assigns Pods to nodes initially. The CRI runtime executes containers but does not make restart decisions independently.\n\nWhy other options are wrong:\n- A: The scheduler assigns Pods to nodes initially; it does not restart crashed containers.\n- B: The container runtime executes containers but does not independently decide to restart them.\n- D: The controller-manager handles higher-level reconciliation (e.g. ReplicaSet), not per-container restarts.\n\nReference: https://kubernetes.io/docs/concepts/architecture/nodes/",
    verify: "microk8s kubectl get nodes -o wide"
  },
  {
    id: "s01-q004",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A DevOps engineer is setting up a new Kubernetes cluster and needs to choose a container runtime. The cluster must comply with the Kubernetes Container Runtime Interface (CRI). Which of the following is a valid CRI-compliant runtime that Kubernetes can use natively since v1.24?",
    diagram: null,
    options: [
      "`dockerd` bypassing the CRI layer via the built-in dockershim adapter and its socket interface",
      "`rkt` (Rocket) with a pre-CRI container format based on the appc specification",
      "`containerd` with the CRI plugin enabled, communicating via the standard gRPC interface",
      "`LXC` with a custom Kubernetes bridge module for container lifecycle management"
    ],
    answer: 2,
    explanation: "`containerd` is a CRI-compliant container runtime that Kubernetes supports natively. Since Kubernetes v1.24, the dockershim was removed, so `dockerd` cannot be used directly without an external adapter like `cri-dockerd`. `rkt` was deprecated and is no longer maintained. `LXC` is a Linux container technology but does not implement the CRI specification and has no Kubernetes bridge module.\n\nWhy other options are wrong:\n- A: dockershim was removed in Kubernetes v1.24, so dockerd cannot be used directly without cri-dockerd.\n- B: rkt (Rocket) is deprecated and no longer maintained.\n- D: LXC does not implement the CRI specification and has no Kubernetes bridge module.\n\nReference: https://kubernetes.io/docs/concepts/containers/runtime-class/",
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
    explanation: "Kubernetes mandates a flat networking model where every Pod receives its own unique IP address and can communicate with any other Pod across any node without NAT. This is a fundamental requirement that CNI plugins must implement. Service meshes are optional overlays. NodePort is a Service type, not a networking requirement. NetworkPolicy is opt-in — by default, all Pod-to-Pod traffic is allowed.\n\nWhy other options are wrong:\n- A: A service mesh is an optional overlay, not a fundamental Kubernetes networking requirement.\n- B: NetworkPolicy is opt-in; by default all Pod-to-Pod traffic is allowed without explicit policies.\n- C: NodePort is a Service type for external access, not a Pod networking requirement.\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    verify: null
  },
  {
    id: "s01-q006",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A CTO is evaluating whether to adopt cloud native principles for their organization's software platform. They want to understand the core benefit that distinguishes cloud native applications from traditional monolithic deployments. Which statement best describes the primary advantage?",
    diagram: null,
    options: [
      "Cloud native applications reduce costs by favoring serverless infrastructure and pay-per-use billing models",
      "Cloud native applications benefit most from languages like Go or Rust due to their concurrency characteristics",
      "Cloud native applications reduce the need for operational staff by relying on self-healing system behaviors",
      "Cloud native applications are loosely coupled, resilient, and scalable, enabling reliable changes via automation"
    ],
    answer: 3,
    explanation: "According to the CNCF definition, cloud native technologies enable organizations to build and run scalable applications that are loosely coupled, resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably. Cloud native does not mandate specific languages, does not eliminate operations teams, and does not guarantee lower costs in all cases.\n\nWhy other options are wrong:\n- A: Cloud native does not guarantee lower costs and is not limited to serverless infrastructure.\n- B: Cloud native does not mandate or favor any specific programming language.\n- C: Cloud native does not eliminate or significantly reduce the need for operational staff; it empowers them with automation.\n\nReference: https://www.cncf.io/about/who-we-are/",
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
    explanation: "The core microservices principle is that each service should own its data and expose functionality through well-defined APIs. Deploying the catalog as an independent service with its own database ensures loose coupling and independent deployability. Keeping it in the monolith defeats the purpose. A sidecar pattern is for cross-cutting concerns like logging, not business logic. Shared libraries create tight coupling between services.\n\nWhy other options are wrong:\n- B: Keeping the catalog in the monolith while exposing it through a Service defeats the purpose of decomposition.\n- C: Sidecars are for cross-cutting concerns (logging, proxying), not business logic like a product catalog.\n- D: Shared libraries create tight compile-time coupling between services, violating microservice independence.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s01-q008",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "An operations team has deployed a Kubernetes cluster and wants to set up monitoring for cluster-level metrics such as CPU usage, memory consumption, and Pod counts. Which tool from the CNCF ecosystem is the de facto standard for collecting and querying time-series metrics in Kubernetes environments?",
    diagram: null,
    options: [
      "Fluentd, which collects and forwards time-series metric data from nodes to a backend",
      "Grafana, which collects metrics directly from kubelets and stores them internally",
      "Prometheus, which scrapes metric endpoints on targets and stores time-series data natively",
      "Jaeger, which provides distributed metrics collection and aggregation pipelines"
    ],
    answer: 2,
    explanation: "Prometheus is the CNCF graduated project that serves as the standard for metrics collection in Kubernetes. It uses a pull-based model to scrape metric endpoints and stores data as time series. Fluentd is for log aggregation, not metrics. Jaeger is for distributed tracing. Grafana is a visualization tool that queries data sources like Prometheus but does not collect or store metrics itself.\n\nWhy other options are wrong:\n- A: Fluentd is for log aggregation, not metrics collection.\n- B: Grafana is a visualization/dashboard tool that queries data sources like Prometheus; it does not collect or store metrics.\n- D: Jaeger is a distributed tracing system, not a metrics collection tool.\n\nReference: https://prometheus.io/docs/introduction/overview/",
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
    explanation: "Helm is the Kubernetes package manager that allows teams to define, version, and deploy applications as charts. Charts contain templated manifests that can be parameterized using `values.yaml` files, making it easy to deploy the same application with different configurations across environments. Static YAML lacks parameterization. `kubectl patch` is for modifying existing resources, not packaging. `--dry-run` is for validation, not deployment.\n\nWhy other options are wrong:\n- A: Static YAML directories lack parameterization and templating for multi-environment use.\n- B: `kubectl create --dry-run` is for validation/generation, not for deployment or parameterization.\n- C: `kubectl patch` modifies existing resources but is not a packaging or templating solution.\n\nReference: https://helm.sh/docs/",
    verify: null
  },
  {
    id: "s01-q010",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A data processing team needs to run a batch job that processes a dataset and then exits. They want Kubernetes to ensure the job runs to completion, retrying on failure a configurable number of times. Which workload resource should they use?",
    diagram: null,
    options: [
      "A Deployment with `replicas: 1` and a restart policy set to `Always`",
      "A standalone Pod with `restartPolicy: OnFailure` and manual monitoring",
      "A DaemonSet configured to run on nodes with the `batch-processing` label",
      "A Job resource with `backoffLimit: 3` and the default restart policy"
    ],
    answer: 3,
    explanation: "A Kubernetes Job is designed for batch workloads that run to completion. The `backoffLimit` field (e.g., `backoffLimit: 3`) tells Kubernetes how many times to retry the Job if it fails. A Deployment is for long-running services and would restart the Pod indefinitely. A DaemonSet ensures a Pod runs on every matching node, which is not suitable for batch processing. A standalone Pod lacks the retry management that the Job controller provides.\n\nWhy other options are wrong:\n- A: A Deployment with restartPolicy Always keeps running indefinitely; it is designed for long-lived services, not batch jobs.\n- B: A standalone Pod lacks the retry management that the Job controller provides.\n- C: A DaemonSet runs one Pod per node and is not suitable for batch processing.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/",
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
    explanation: "A `ClusterIP` Service is the default Service type in Kubernetes. It allocates a virtual IP address reachable only within the cluster and creates a DNS entry in the form `<service-name>.<namespace>.svc.cluster.local`. NodePort exposes the service externally on a static port. LoadBalancer provisions an external load balancer. ExternalName maps to an external DNS name, not to internal Pods.\n\nWhy other options are wrong:\n- A: NodePort exposes the service externally on a static port on all nodes, not just internally.\n- B: LoadBalancer provisions an external load balancer, exposing the service outside the cluster.\n- C: ExternalName maps to an external DNS name via CNAME, not to internal Pods.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
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
    explanation: "The `securityContext` field in a Pod or container spec allows you to set `runAsNonRoot: true`, which tells the kubelet to reject any container that attempts to run as UID 0. Setting `privileged: true` actually grants more permissions, not less. `ResourceQuota` controls resource consumption like CPU and memory limits. `LimitRange` sets default resource requests and limits, not security settings.\n\nWhy other options are wrong:\n- A: Setting privileged: true grants MORE permissions, not less — this is the opposite of the requirement.\n- C: ResourceQuota controls resource consumption (CPU, memory, Pod count), not security settings.\n- D: LimitRange sets default resource requests and limits, not user IDs or security contexts.\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/",
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
    explanation: "The `kubelet` on each worker node manages Pods on that node and maintains local knowledge of the Pods it is running. When the control plane (including `etcd`) goes down, the kubelet continues to keep existing Pods running based on its last known state. However, no new Pods can be scheduled and no changes can be made. Worker nodes do not cache the full cluster state. `kube-proxy` handles networking, not Pod management. The container runtime executes containers but relies on the kubelet for orchestration decisions.\n\nWhy other options are wrong:\n- A: Worker nodes do not cache the full cluster state; they only know about their own assigned Pods.\n- B: kube-proxy handles Service networking rules, not Pod management.\n- D: The container runtime executes containers but relies on the kubelet for restart and lifecycle decisions.\n\nReference: https://kubernetes.io/docs/concepts/architecture/nodes/",
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
    explanation: "Kubernetes uses `PersistentVolume` (PV) to represent actual storage resources and `PersistentVolumeClaim` (PVC) as a user's request for storage. This separation decouples the storage consumer from the provider. ConfigMaps and Secrets store configuration data, not persistent storage. StorageClass defines how to provision PVs but is not a storage request. `emptyDir` is ephemeral and `hostPath` ties storage to a specific node.\n\nWhy other options are wrong:\n- A: ConfigMaps and Secrets store configuration data, not persistent block/file storage.\n- C: StorageClass defines provisioning parameters and VolumeSnapshot captures data snapshots, but neither represents the request/provision abstraction pair.\n- D: emptyDir is ephemeral (lost on Pod deletion) and hostPath ties storage to a specific node.\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
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
      "Stable, which means the project has reached API maturity and guarantees backward compatibility",
      "Enterprise, which certifies the project for regulated industry use and compliance needs"
    ],
    answer: 1,
    explanation: "The CNCF has three maturity levels: Sandbox, Incubating, and Graduated. Graduated is the highest level and indicates that a project has demonstrated thriving adoption, a healthy rate of changes, and strong governance. Incubating is the middle tier. There are no maturity levels called 'Stable' or 'Enterprise' in the CNCF framework.\n\nWhy other options are wrong:\n- A: Incubating is the middle maturity tier, not the highest.\n- C: There is no CNCF maturity level called \"Stable.\"\n- D: There is no CNCF maturity level called \"Enterprise.\"\n\nReference: https://www.cncf.io/projects/",
    verify: null
  },
  {
    id: "s01-q016",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "An SRE team needs to aggregate logs from all containers running across a Kubernetes cluster into a centralized logging backend. They want the solution to run automatically on every node without manual scheduling. Which Kubernetes pattern and resource combination is most appropriate?",
    diagram: null,
    options: [
      "Deploy a logging agent as a sidecar container inside every application Pod in the cluster",
      "Deploy a single logging Deployment with `replicas` equal to the node count that adjusts",
      "A DaemonSet, which guarantees a single Pod copy is present on all cluster nodes as they join",
      "Configure the kubelet to forward all container logs to the backend service directly"
    ],
    answer: 2,
    explanation: "Running a logging agent (like Fluentd or Fluent Bit) as a DaemonSet ensures that exactly one agent Pod runs on every node in the cluster, automatically handling node additions and removals. The agent collects logs from all containers on its node. A sidecar per Pod adds overhead and complexity. A Deployment does not guarantee one Pod per node. The kubelet writes logs to disk but does not natively forward them to external backends.\n\nWhy other options are wrong:\n- A: A sidecar per Pod adds overhead and complexity; it does not automatically cover every node.\n- B: A Deployment with replicas equal to node count does not guarantee one Pod per node and does not adapt to node changes.\n- D: The kubelet writes logs to disk but does not natively forward them to external backends.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/",
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
      "Operations staff manually review Git diffs and reconcile the desired state by applying approved changes during windows",
      "The Git repository triggers webhooks that invoke the Kubernetes API server directly to create or update resources",
      "An agent in the cluster continuously watches Git and corrects any drift between the live and declared configuration"
    ],
    answer: 3,
    explanation: "The core GitOps principle involves a cluster-resident agent (like Argo CD or Flux) that continuously watches a Git repository and reconciles the cluster state to match the declared desired state. This pull-based approach is more secure than push-based CI pipelines because the cluster pulls changes rather than external systems pushing to it. Direct webhook invocations and manual operations do not provide continuous reconciliation.\n\nWhy other options are wrong:\n- A: A CI pipeline pushing via kubectl apply is push-based, not GitOps-style continuous reconciliation.\n- B: Manual review and application during maintenance windows is not automated or continuously reconciled.\n- C: Webhooks invoking the API server directly are push-based and do not provide ongoing drift detection.\n\nReference: https://opengitops.dev/",
    verify: null
  },
  {
    id: "s01-q018",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer defines a Pod with two containers: an application container and a helper container that reads the application's log files from a shared volume. What is this multi-container pattern called, and how do the containers within the Pod communicate?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="360" height="160" rx="10" fill="#333" stroke="#326CE5" stroke-width="2"/><text x="200" y="45" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Pod</text><rect x="40" y="60" width="140" height="50" rx="6" fill="#0db7ed" stroke="#fff" stroke-width="1.5"/><text x="110" y="90" text-anchor="middle" fill="white" font-size="12">App Container</text><rect x="220" y="60" width="140" height="50" rx="6" fill="#FF9800" stroke="#fff" stroke-width="1.5"/><text x="290" y="90" text-anchor="middle" fill="white" font-size="12">Helper Container</text><rect x="100" y="130" width="200" height="35" rx="6" fill="#4CAF50" stroke="#fff" stroke-width="1.5"/><text x="200" y="152" text-anchor="middle" fill="white" font-size="12">Shared Volume (emptyDir)</text><line x1="110" y1="110" x2="160" y2="130" stroke="#aaa" stroke-width="1.5"/><line x1="290" y1="110" x2="240" y2="130" stroke="#aaa" stroke-width="1.5"/></svg>',
    options: [
      "The sidecar pattern; containers share the same network namespace and can share volumes",
      "The ambassador pattern; containers communicate via Kubernetes Service DNS with proxying",
      "The adapter pattern; containers communicate through a shared ConfigMap updated in real time",
      "The init container pattern; the logging container runs first then passes control to the app"
    ],
    answer: 0,
    explanation: "This is the sidecar pattern, where a helper container runs alongside the main application container within the same Pod. Containers in the same Pod share the network namespace (they can communicate via `localhost`) and can mount shared volumes. The ambassador pattern handles proxying external connections. The adapter pattern normalizes output. Init containers run to completion before the main containers start, so they are not suitable for ongoing log collection.\n\nWhy other options are wrong:\n- B: The ambassador pattern handles proxying external connections, not shared-volume log reading.\n- C: The adapter pattern normalizes output formats; containers do not communicate through a shared ConfigMap.\n- D: Init containers run to completion before main containers start, so they cannot provide ongoing log collection.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers",
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
      "Use a `ResourceQuota` to reserve GPU nodes for ML workloads by capping resource usage per namespace",
      "Set `nodeName` directly in the ML Pod specs to hardcode specific GPU node names for scheduling",
      "Configure the `kube-scheduler` with a custom profile that only considers GPU nodes for all Pods"
    ],
    answer: 0,
    explanation: "The correct approach combines `nodeSelector` (or node affinity) to direct ML Pods to GPU nodes, and taints on GPU nodes to repel non-ML workloads, with tolerations on the ML Pods so they can be scheduled on tainted nodes. `ResourceQuota` manages resource consumption per namespace, not node scheduling. Hardcoding `nodeName` bypasses the scheduler and is fragile. A custom scheduler profile would affect all Pods, not just ML workloads.\n\nWhy other options are wrong:\n- B: ResourceQuota manages resource consumption per namespace, not node-level scheduling.\n- C: Hardcoding nodeName bypasses the scheduler entirely and is fragile if that node goes down.\n- D: A custom scheduler profile would affect all Pods, not just ML workloads.\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
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
    explanation: "The first diagnostic step for a `CrashLoopBackOff` is to examine the container logs. Using `kubectl logs <pod-name> --previous` shows the logs from the last crashed container instance, which typically reveals the error. Deleting and recreating the Pod without understanding the root cause will likely result in the same crash. Scaling does not help diagnose the issue. You cannot edit a running Pod's restart policy.\n\nWhy other options are wrong:\n- A: Deleting and recreating the Pod without understanding the root cause will likely repeat the crash.\n- B: Scaling to zero and back does not help diagnose the issue.\n- D: You cannot edit a running Pod's restartPolicy; Pods are largely immutable after creation.\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
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
    explanation: "The Container Runtime Interface (CRI) is a plugin interface that defines the gRPC API the kubelet uses to communicate with container runtimes. Both `containerd` and `CRI-O` implement this interface. The OCI specification defines container image and runtime standards but is lower-level than CRI. CNI handles network configuration for containers. CSI handles storage provisioning, not runtime communication.\n\nWhy other options are wrong:\n- A: CSI (Container Storage Interface) handles storage provisioning, not runtime communication.\n- B: OCI defines container image and runtime standards at a lower level; it is not the kubelet-to-runtime API.\n- C: CNI (Container Network Interface) handles network configuration for containers, not runtime communication.\n\nReference: https://kubernetes.io/docs/concepts/containers/cri/",
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
    explanation: "A `ConfigMap` is the Kubernetes resource designed to store non-sensitive configuration data as key-value pairs. It can be consumed by Pods as environment variables, command-line arguments, or configuration files in a mounted volume. Secrets are for sensitive data like passwords. PersistentVolumeClaims are for storage, not configuration. Annotations store metadata about objects but cannot be injected into containers directly.\n\nWhy other options are wrong:\n- A: Secrets are intended for sensitive data like passwords, not for non-sensitive configuration like hostnames.\n- B: Annotations store metadata about objects but cannot be injected into containers as environment variables.\n- C: PersistentVolumeClaims are for persistent storage (block/file), not for configuration data.\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
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
    explanation: "Horizontal scalability is the cloud native principle that directly addresses variable load by allowing the system to add or remove service instances based on demand. Designing services to be stateless enables them to scale out easily. Immutability is about consistency, not load handling. Infrastructure as Code helps with provisioning but does not inherently handle traffic variability. Circuit breaking is a resilience pattern for failure handling, not scaling.\n\nWhy other options are wrong:\n- B: Immutability ensures consistency of artifacts but does not address dynamic scaling to handle load.\n- C: Infrastructure as Code helps with provisioning but does not inherently handle runtime traffic variability.\n- D: Circuit breaking is a resilience pattern for failure handling, not for scaling to meet demand.\n\nReference: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/",
    verify: null
  },
  {
    id: "s01-q024",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to deploy a new version of their application with zero downtime. They currently have a Deployment running 5 replicas. They want Kubernetes to gradually replace old Pods with new ones, ensuring minimal disruption during updates. Which strategy and configuration should they use?",
    diagram: null,
    options: [
      "Set the Deployment strategy to `Recreate` with a `minReadySeconds` value of 30 for safe transitions",
      "Use a `StatefulSet` instead of a `Deployment` because `StatefulSets` support ordered rolling updates",
      "Create a new `Deployment` alongside the old one and shift traffic using a `Service` selector change",
      "Set the Deployment strategy to `RollingUpdate` with `maxUnavailable: 1` and `maxSurge: 1`"
    ],
    answer: 3,
    explanation: "The `RollingUpdate` strategy with `maxUnavailable: 1` ensures that at most 1 Pod is taken down at a time during the update, keeping at least 4 of the 5 replicas available. `maxSurge: 1` allows one extra Pod to be created during the rollout. The `Recreate` strategy terminates all Pods before creating new ones, causing downtime. Manual traffic shifting is error-prone and unnecessary. StatefulSets are for stateful applications and are not needed here.\n\nWhy other options are wrong:\n- A: The Recreate strategy terminates all Pods before creating new ones, causing downtime.\n- B: StatefulSets are for stateful applications; they are not needed for a simple zero-downtime rolling update.\n- C: Manual traffic shifting via a second Deployment and Service selector is error-prone and unnecessary.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
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
    explanation: "A `ClusterIP` Service creates a virtual IP address that is only routable within the cluster's internal network. External clients, including developer workstations, cannot reach it directly. To access the service externally, the team would need a `NodePort`, `LoadBalancer`, or `Ingress` resource. DNS assignment is automatic and does not require restarts. Ingress is not required for ClusterIP to function within the cluster. `kube-proxy` does not have external traffic configuration for ClusterIP.\n\nWhy other options are wrong:\n- A: kube-proxy does not have a special configuration to allow external traffic to ClusterIP services.\n- B: DNS assignment for Services is automatic and does not require restarting kube-dns.\n- C: Ingress is not required for ClusterIP to function within the cluster; ClusterIP works internally on its own.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip",
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
    explanation: "Most Kubernetes resource manifests require `apiVersion` (the API group and version), `kind` (the type of resource), `metadata` (including at minimum a name), and `spec` (the desired state specification). Note that some resources like ConfigMap and Secret use `data` instead of `spec`. The `status` field is managed by Kubernetes and should not be set by users. `name` and `labels` go inside `metadata`, not at the top level. `version` and `type` are not valid top-level Kubernetes manifest fields.\n\nWhy other options are wrong:\n- B: The `status` field is managed by Kubernetes at runtime and should not be set by users in manifests.\n- C: `version` and `type` are not valid top-level Kubernetes manifest fields.\n- D: `name` and `labels` belong inside the `metadata` field, not at the top level.\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/",
    verify: null
  },
  {
    id: "s01-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A company is designing a highly available Kubernetes control plane. They need to understand which component serves as the single source of truth for all cluster state. Which component stores all cluster data?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="10" width="200" height="40" rx="8" fill="#326CE5" stroke="#fff" stroke-width="2"/><text x="200" y="36" text-anchor="middle" fill="white" font-size="13">API Server</text><rect x="10" y="80" width="120" height="40" rx="8" fill="#555" stroke="#aaa" stroke-width="1.5"/><text x="70" y="106" text-anchor="middle" fill="white" font-size="11">Scheduler</text><rect x="270" y="80" width="120" height="40" rx="8" fill="#555" stroke="#aaa" stroke-width="1.5"/><text x="330" y="106" text-anchor="middle" fill="white" font-size="11">Controller Mgr</text><rect x="130" y="160" width="140" height="50" rx="8" fill="#FF9800" stroke="#FFD700" stroke-width="2"/><text x="200" y="190" text-anchor="middle" fill="white" font-size="14" font-weight="bold">???</text><line x1="200" y1="50" x2="70" y2="80" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="50" x2="330" y2="80" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="50" x2="200" y2="160" stroke="#FFD700" stroke-width="2" stroke-dasharray="5,3"/><text x="220" y="110" fill="#FFD700" font-size="11">reads/writes</text></svg>',
    options: [
      "The `kube-apiserver`, which stores state in its internal memory cache for fast access",
      "The `kube-controller-manager`, which maintains a distributed state database across controllers",
      "The `etcd` key-value store, which persistently stores all cluster configuration and state data",
      "The `kubelet` on the first control plane node, which acts as the primary state repository"
    ],
    answer: 2,
    explanation: "`etcd` is a distributed, consistent key-value store that serves as Kubernetes' backing store for all cluster data. The API server is the only component that communicates directly with `etcd`. The API server itself is stateless and relies on `etcd` for persistence. The controller manager runs control loops but does not store state. Kubelets run on worker nodes and do not serve as cluster-wide state repositories.\n\nWhy other options are wrong:\n- A: The API server is stateless; it does not store state in memory — it relies on etcd for persistence.\n- B: The controller-manager runs control loops but does not maintain a state database.\n- D: Kubelets are node agents that manage local Pods; they are not cluster-wide state repositories.\n\nReference: https://kubernetes.io/docs/concepts/overview/components/#etcd",
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
    explanation: "A StatefulSet provides stable, unique network identifiers (redis-0, redis-1, etc.), ordered deployment and scaling, and stable persistent storage through `volumeClaimTemplates`. A headless Service enables direct DNS resolution to individual Pods. Deployments do not guarantee ordering or stable identities. DaemonSets run one Pod per node, not per replica count. ReplicaSets do not have a `podManagementPolicy` field — that is a StatefulSet feature.\n\nWhy other options are wrong:\n- A: Deployments do not guarantee ordered deployment, stable identities, or per-replica persistent storage.\n- B: DaemonSets run one Pod per node, not per replica count.\n- D: ReplicaSets do not have a `podManagementPolicy` field — that is a StatefulSet feature.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
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
      "The `CNI` plugin, which allocates IPs from the configured Pod CIDR when Pods are created"
    ],
    answer: 3,
    explanation: "The CNI (Container Network Interface) plugin is responsible for setting up Pod networking, including IP address allocation from the configured Pod CIDR range. When a new Pod is created, the kubelet invokes the CNI plugin to configure the network namespace and assign an IP. `kube-proxy` manages Service IP routing rules, not Pod IP assignment. The API server does not assign Pod IPs. The kubelet delegates networking to the CNI plugin rather than handling it directly.\n\nWhy other options are wrong:\n- A: kube-proxy manages Service IP routing rules (iptables/IPVS), not Pod IP assignment.\n- B: The kubelet delegates networking to the CNI plugin; it does not generate random IPs itself.\n- C: The API server does not pre-assign Pod IPs during scheduling.\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
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
    explanation: "By default, Secrets are stored as base64-encoded plaintext in `etcd`. To protect them at rest, you must configure an `EncryptionConfiguration` on the API server, which specifies encryption providers (like `aescbc`, `aesgcm`, or KMS) for encrypting Secret data before it is written to `etcd`. RBAC controls access permissions but does not encrypt data. ConfigMaps do not support encryption. There is no `--encrypt` flag for `kubectl create secret`.\n\nWhy other options are wrong:\n- B: RBAC controls access permissions but does not encrypt data at rest in etcd.\n- C: ConfigMaps do not support native encryption; they are even less protected than Secrets.\n- D: There is no `--encrypt` flag for `kubectl create secret`.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/",
    verify: null
  },
  {
    id: "s01-q031",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After deploying a new application, a Pod is stuck in `ImagePullBackOff` status. The team verifies that the image name is correct and the registry is accessible from their laptops. What is the most likely cause within the cluster context?",
    diagram: null,
    options: [
      "The node's `containerd` runtime has reached its maximum image cache size and cannot pull any new images",
      "The cluster nodes cannot reach the container registry, or the Pod lacks required `imagePullSecrets`",
      "The `kube-scheduler` has placed the Pod on a node that does not support the container image format",
      "The `ImagePullBackOff` status most commonly indicates the image tag does not exist in the remote registry"
    ],
    answer: 1,
    explanation: "The `ImagePullBackOff` status means the kubelet failed to pull the container image. Even if the image exists and the registry is accessible from outside the cluster, the cluster nodes themselves need network access to the registry. For private registries, the Pod or ServiceAccount must have `imagePullSecrets` configured. Container runtimes do not have a maximum cache size that blocks pulls. Image format incompatibility is extremely rare with modern runtimes. The error can occur for multiple reasons, not just missing tags.\n\nWhy other options are wrong:\n- A: Container runtimes do not have a maximum image cache size that blocks new pulls.\n- C: Modern container runtimes support standard OCI images; format incompatibility is extremely rare.\n- D: ImagePullBackOff can occur for multiple reasons (network, auth, missing tag), not just missing tags.\n\nReference: https://kubernetes.io/docs/concepts/containers/images/#image-pull-policy",
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
    explanation: "Knative is a CNCF graduated project and Kubernetes-based platform that provides components for deploying, running, and managing serverless workloads. Knative Serving handles request-driven auto-scaling including scale-to-zero, while Knative Eventing provides event-driven architecture. Istio is a service mesh, not a serverless platform. Prometheus collects metrics but does not manage serverless workloads. Helm is a package manager, not a serverless runtime.\n\nWhy other options are wrong:\n- A: Istio is a service mesh for traffic management and mTLS, not a serverless platform.\n- B: Helm is a package manager for Kubernetes charts; it does not provide serverless runtime or auto-scaling.\n- C: Prometheus collects and stores metrics; it does not manage or auto-scale serverless workloads.\n\nReference: https://knative.dev/docs/",
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
    explanation: "The twelve-factor app methodology states that configuration should be stored in the environment, strictly separated from code. In Kubernetes, this maps to using ConfigMaps and Secrets injected as environment variables or mounted files. Storing config in code violates this principle. Bundling config in images means rebuilding for each environment. While configuration servers exist, the twelve-factor methodology specifically advocates for environment-based configuration.\n\nWhy other options are wrong:\n- A: Storing config in code and using branches violates the strict separation principle.\n- B: While configuration servers exist, the twelve-factor methodology specifically advocates for environment-based configuration, not centralized servers.\n- C: Bundling environment-specific config into the image means rebuilding for each environment.\n\nReference: https://12factor.net/config",
    verify: null
  },
  {
    id: "s01-q034",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A microservices team is troubleshooting high latency in a request that flows through 5 services. They need to identify which service is causing the bottleneck. Which observability technique allows them to track a single request as it traverses multiple services?",
    diagram: null,
    options: [
      "Centralized logging with correlated timestamps and request IDs across all services in the system",
      "Health check endpoints on each service that report response times and error rates to callers",
      "Distributed tracing, which propagates context headers across service boundaries in a request chain",
      "Metric dashboards showing per-service average latency aggregated over the last hour of observations"
    ],
    answer: 2,
    explanation: "Distributed tracing (implemented by tools like Jaeger or Zipkin) propagates a trace context (trace ID and span IDs) across service boundaries. This allows engineers to visualize the entire request path and identify exactly where latency is introduced. Centralized logging can correlate events but lacks built-in request flow visualization. Health checks show service status, not per-request latency. Metric dashboards show aggregates, not individual request paths.\n\nWhy other options are wrong:\n- A: Centralized logging with correlated timestamps can correlate events but lacks built-in request flow visualization.\n- B: Health check endpoints report general service status, not per-request latency across a chain.\n- D: Metric dashboards show aggregate latency over time, not individual request paths through services.\n\nReference: https://www.jaegertracing.io/docs/",
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
    explanation: "In a CI/CD pipeline, after building and testing the container image, it must be pushed to a container registry (like Docker Hub, ECR, or Harbor) before deployment. The Kubernetes cluster pulls the image from the registry when creating Pods. Deleting existing deployments causes downtime and is unnecessary with rolling updates. Manual approval is not automatic CI/CD. Scaling down the cluster would disrupt all workloads, not just the one being deployed.\n\nWhy other options are wrong:\n- B: Scaling down the staging cluster to zero nodes would disrupt all workloads, not just the one being deployed.\n- C: Manual approval is not part of an automatic CI/CD pipeline; it adds a human gate.\n- D: Deleting the existing deployment causes downtime and is unnecessary with rolling updates.\n\nReference: https://kubernetes.io/docs/concepts/containers/images/",
    verify: null
  },
  {
    id: "s01-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer notices that their application Pod has been assigned to a node but the container is not yet running. The Pod status shows `Init:0/2`. What does this status indicate?",
    diagram: null,
    options: [
      "The Pod's 2 containers are stuck in their initialization phase; node resource constraints block them",
      "The init process (PID 1) inside each of the Pod's 2 containers failed to start properly",
      "The Pod requires 2 volumes to be mounted and neither is currently available on the assigned node",
      "The Pod has 2 init containers that must complete before main containers start; none have finished"
    ],
    answer: 3,
    explanation: "The `Init:0/2` status means the Pod has 2 init containers, and 0 of them have completed so far. Init containers run sequentially before any regular containers start. Each init container must complete successfully before the next one begins. This status does not relate to regular containers, volumes, or ConfigMaps. Init containers are commonly used for tasks like waiting for dependencies, running database migrations, or copying configuration files.\n\nWhy other options are wrong:\n- A: The `Init:` prefix specifically refers to Kubernetes init containers, not regular containers stuck during their startup phase.\n- B: The `Init:` prefix refers to Kubernetes init containers, not the PID 1 init process inside regular containers.\n- C: This status is unrelated to volume mounting; it shows init container completion progress.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/",
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
    explanation: "Pod anti-affinity with `topologyKey: kubernetes.io/hostname` prevents Pods matching a label selector from being scheduled on the same node. This ensures replicas are spread across different nodes. `nodeSelector` targets specific nodes but does not prevent co-location. `PodDisruptionBudget` controls voluntary disruptions but does not influence scheduling decisions. Taints repel Pods but cannot limit the count per node in this manner.\n\nWhy other options are wrong:\n- B: Using nodeSelector with unique labels per node is brittle and does not dynamically prevent co-location.\n- C: PodDisruptionBudgets control voluntary disruptions (e.g. drains) but do not influence scheduling decisions.\n- D: Taints repel Pods but cannot directly limit the count of a specific workload per node.\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity",
    verify: null
  },
  {
    id: "s01-q038",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A frontend application needs to discover and communicate with a backend Service named `inventory-api` in the `production` namespace. The frontend is deployed in the same namespace. What DNS name should the frontend use to reach the backend?",
    diagram: null,
    options: [
      "`inventory-api.production.pod.cluster.local`, using the Pod DNS subdomain for namespace",
      "`inventory-api.cluster.local`, as the minimal short-form name from any namespace",
      "`production.inventory-api.svc.cluster.local`, following the namespace-first DNS convention",
      "`inventory-api`, because the Service resides in the same namespace as the frontend Pod"
    ],
    answer: 3,
    explanation: "Within the same namespace, a Service can be reached using just its name (`inventory-api`). The fully qualified domain name (FQDN) follows the pattern `<service-name>.<namespace>.svc.cluster.local`. So `inventory-api.production.svc.cluster.local` is the FQDN. The first option incorrectly uses `pod` instead of `svc`. The second option (`inventory-api.cluster.local`) omits the namespace and `svc` components, making it an invalid DNS name for Kubernetes Services. The third option reverses the namespace and service name order.\n\nWhy other options are wrong:\n- A: Uses `.pod.cluster.local` instead of `.svc.cluster.local` — this is the Pod DNS format, not Service DNS.\n- B: `inventory-api.cluster.local` omits the namespace and `svc` segments, making it invalid for Service DNS.\n- C: Reverses the namespace and service name order — the correct order is `<service>.<namespace>.svc.cluster.local`.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "microk8s kubectl get svc -n production 2>/dev/null || echo 'namespace may not exist yet'"
  },
  {
    id: "s01-q039",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A monitoring team needs to deploy a log collector agent on every node in the cluster, including new nodes that are added later. The agent should run exactly one instance per node. Which workload resource should they use?",
    diagram: null,
    options: [
      "A Deployment with `replicas` set to the node count and a `podAntiAffinity` rule to spread Pods",
      "A StatefulSet with node affinity rules targeting each node by its individual hostname label",
      "A DaemonSet, which ensures a single Pod copy is placed on each cluster node as nodes join",
      "A CronJob that periodically checks for new nodes and creates Pods on unmonitored ones"
    ],
    answer: 2,
    explanation: "A DaemonSet ensures that a copy of a Pod runs on every node (or a subset of nodes using node selectors). When new nodes are added to the cluster, the DaemonSet controller automatically schedules a Pod on them. A Deployment with anti-affinity is fragile and does not automatically adapt to node additions. A StatefulSet does not guarantee one Pod per node. A CronJob would be overly complex and would not provide continuous monitoring.\n\nWhy other options are wrong:\n- A: A Deployment with anti-affinity is fragile, does not adapt automatically to node additions, and may not guarantee exactly one per node.\n- B: A StatefulSet with per-node affinity does not automatically schedule on new nodes as they join.\n- D: A CronJob is overly complex and would not provide continuous, immediate coverage of new nodes.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/",
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
    explanation: "A `NetworkPolicy` is the Kubernetes resource for controlling network traffic at the Pod level. By creating a NetworkPolicy that selects backend Pods and specifies an ingress rule allowing traffic only from Pods with a frontend label, all other ingress traffic to the backend is denied. Services route traffic but do not restrict it. Ingress handles external HTTP routing. ResourceQuotas manage compute resources, not network traffic rules.\n\nWhy other options are wrong:\n- B: Services route traffic based on selectors but do not restrict which Pods can communicate.\n- C: Ingress handles external HTTP routing, not Pod-to-Pod network traffic restriction.\n- D: ResourceQuotas manage compute resources (CPU, memory, Pod count), not network traffic rules.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "microk8s kubectl get networkpolicies --all-namespaces"
  },
  {
    id: "s01-q041",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A developer creates a Pod with an `emptyDir` volume shared between two containers. Later, the Pod is rescheduled to a different node. What happens to the data stored in the `emptyDir` volume?",
    diagram: null,
    options: [
      "The emptyDir data is automatically migrated to the new node by the kubelet during Pod rescheduling",
      "The data persists on the original node and can be manually mounted on the new node later",
      "The data is preserved in `etcd` and restored automatically when the Pod starts on the new node",
      "The data is lost because `emptyDir` volumes share the same lifecycle as the Pod they belong to"
    ],
    answer: 3,
    explanation: "An `emptyDir` volume is created when a Pod is assigned to a node and exists as long as that Pod runs on that node. When the Pod is deleted or rescheduled, the `emptyDir` volume and its contents are permanently deleted. Data is not migrated, stored in `etcd`, or preserved on the original node. For data that must survive Pod rescheduling, a `PersistentVolume` should be used instead.\n\nWhy other options are wrong:\n- A: emptyDir data is not migrated by the kubelet during rescheduling.\n- B: emptyDir data does not persist on the original node after Pod deletion; it is cleaned up.\n- C: emptyDir data is not stored in etcd; etcd only stores cluster state objects.\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
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
      "Add more replicas of the payment service to increase its availability and reduce the likelihood of downtime",
      "Increase the timeout value on the order service's HTTP client to give the payment service more time",
      "Implement the circuit breaker pattern in the order service to fail fast when payment is unavailable"
    ],
    answer: 3,
    explanation: "The circuit breaker pattern prevents cascading failures by monitoring calls to a downstream service and 'tripping' when failures exceed a threshold. Once tripped, subsequent calls fail fast without waiting, allowing the system to degrade gracefully. Co-locating services in a Pod does not prevent application-level failures. Increasing timeouts makes the problem worse by holding resources longer. More replicas improve availability but do not eliminate the possibility of failure.\n\nWhy other options are wrong:\n- A: Co-locating services in the same Pod does not prevent application-level failures between them.\n- B: Adding replicas improves availability but does not eliminate the possibility of cascading failure.\n- C: Increasing timeouts makes the problem worse by holding resources longer while waiting for a down service.\n\nReference: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker",
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
      "Linkerd, a lightweight service mesh designed specifically for Kubernetes clusters",
      "Calico, which provides service mesh capabilities through its CNI plugin",
      "CoreDNS, which handles service-to-service routing and mTLS for Kubernetes"
    ],
    answer: 1,
    explanation: "Linkerd is a CNCF graduated service mesh that provides mutual TLS, traffic management, observability, and reliability features specifically designed for Kubernetes. Envoy is a proxy used by several service meshes (including Istio) but is not itself a complete service mesh with a control plane. Calico is a CNI plugin for network policy, not a service mesh. CoreDNS provides DNS resolution, not service mesh features.\n\nWhy other options are wrong:\n- A: Envoy is a proxy used by service meshes (like Istio) but is not itself a complete service mesh with its own control plane.\n- C: Calico is a CNI plugin for network policy enforcement, not a service mesh.\n- D: CoreDNS provides cluster DNS resolution and service discovery, not mTLS or traffic management.\n\nReference: https://linkerd.io/",
    verify: null
  },
  {
    id: "s01-q044",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team has Prometheus running in their cluster and wants to set up alerts when Pod CPU usage exceeds 80% for more than 5 minutes. Which component in the Prometheus ecosystem is responsible for handling alerting rules and sending notifications?",
    diagram: null,
    options: [
      "The Prometheus server itself, which sends email, Slack, and PagerDuty notifications directly when rules trigger",
      "Grafana, which evaluates Prometheus alerting rules, deduplicates them, and dispatches notifications",
      "Alertmanager, which receives alerts from Prometheus, handling deduplication, grouping, and routing",
      "Node Exporter, which monitors node-level metrics and triggers alerts when thresholds are exceeded"
    ],
    answer: 2,
    explanation: "Alertmanager is the dedicated component in the Prometheus ecosystem that handles alerts fired by the Prometheus server. It manages deduplication, grouping, silencing, and routing of alerts to notification channels like email, Slack, or PagerDuty. The Prometheus server evaluates alerting rules but delegates notification delivery to Alertmanager. Grafana can also alert but is not part of the Prometheus ecosystem. Node Exporter only exposes node metrics.\n\nWhy other options are wrong:\n- A: Prometheus evaluates alerting rules but delegates notification delivery to Alertmanager.\n- B: Grafana can alert but is a visualization tool, not a core part of the Prometheus alerting ecosystem.\n- D: Node Exporter only exposes node-level hardware and OS metrics; it does not trigger alerts.\n\nReference: https://prometheus.io/docs/alerting/latest/alertmanager/",
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
    explanation: "A canary deployment directs a small percentage of production traffic to the new version while the majority continues going to the stable version. This can be achieved with weighted routing (via a service mesh or Ingress controller). Blue-green swaps all traffic at once, not a percentage. A rolling update's `maxSurge` controls how many extra Pods are created, not traffic percentage. Client-side feature flags test features but do not validate infrastructure-level changes.\n\nWhy other options are wrong:\n- A: Blue-green deployment swaps all traffic at once between two full environments, not a percentage.\n- C: A rolling update's maxSurge controls how many extra Pods are created during update, not traffic percentage.\n- D: Client-side feature flags test features at the application level but do not validate infrastructure changes.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment",
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
    explanation: "Namespaces provide logical isolation within a Kubernetes cluster. Resources in different namespaces can have the same name, and RBAC policies can be applied per namespace to restrict team access. Labels group resources but do not provide namespace-level isolation or access boundaries. Resource quotas limit consumption within a namespace but do not provide isolation by themselves. Annotations store metadata and do not affect access control.\n\nWhy other options are wrong:\n- A: Labels logically group resources but do not provide isolation boundaries or access control.\n- B: Annotations store metadata but do not affect access control or resource visibility.\n- C: ResourceQuotas limit consumption within a namespace but do not provide isolation by themselves.\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/",
    verify: "microk8s kubectl get namespaces"
  },
  {
    id: "s01-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "During a cluster upgrade, the team needs to understand the order of component upgrades. After etcd has been upgraded separately, the Kubernetes documentation recommends a specific upgrade order for the remaining non-etcd control plane components (API server, controller-manager, scheduler). Which of these components should typically be upgraded first?",
    diagram: null,
    options: [
      "The `kube-scheduler`, because it needs to understand new scheduling features before other components",
      "The `kubelet` on worker nodes, because they should be ready to handle new Pod specifications first",
      "The `kube-apiserver`, because all components communicate through it and need the new API version",
      "The `kube-controller-manager`, because controllers must reconcile resources before the API server"
    ],
    answer: 2,
    explanation: "After etcd is upgraded separately (which kubeadm handles automatically before other components), the recommended upgrade order for the remaining control plane components starts with the `kube-apiserver` because all other components and kubelets communicate through it. The API server must be able to serve the new API versions that upgraded components will use. After the API server, you upgrade the `kube-controller-manager` and `kube-scheduler`, then the `kubelet` and `kube-proxy` on nodes.\n\nWhy other options are wrong:\n- A: The scheduler should be upgraded after the API server, not before.\n- B: Kubelets on worker nodes are upgraded last, not first.\n- D: The controller-manager is upgraded after the API server, not before it.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/cluster-upgrade/",
    verify: "microk8s kubectl version"
  },
  {
    id: "s01-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to run a database migration script exactly once before their main application starts in each Pod. The migration must complete successfully before the application container begins. Which Kubernetes feature provides this sequential startup behavior?",
    diagram: null,
    options: [
      "An init container that runs the migration to completion before the app containers start",
      "A Job resource that runs the migration as a separate workload before the Deployment is created",
      "A `postStart` lifecycle hook on the application container that runs the migration task",
      "A sidecar container with a higher `priority` value to ensure it starts before the app"
    ],
    answer: 0,
    explanation: "Init containers are specialized containers that run before the main application containers in a Pod. They run sequentially, and each must complete successfully (exit code 0) before the next init container or main container starts. `postStart` hooks run concurrently with the container's ENTRYPOINT, so there is no guarantee the migration finishes before the app process begins. A separate Job would need external orchestration. Sidecar containers run concurrently with the main container, and there is no priority-based startup ordering for regular containers.\n\nWhy other options are wrong:\n- B: A separate Job requires external orchestration to coordinate timing with the Deployment.\n- C: A postStart hook runs concurrently with the container's ENTRYPOINT, so it cannot guarantee the migration completes before the app starts.\n- D: Sidecar containers run concurrently with the main container; there is no priority-based startup ordering for regular containers.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/",
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
      "Through a DNS lookup of `<service-name>.svc.cluster.local:31234` from any network",
      "By connecting to the Pod IP directly on port 31234 from external clients"
    ],
    answer: 0,
    explanation: "A `NodePort` Service opens the specified port (31234) on every node in the cluster. External clients can reach the application by sending requests to any node's IP address on that port. `kube-proxy` on each node forwards the traffic to the appropriate backing Pods. The cluster IP is internal only. The `svc.cluster.local` DNS is only resolvable within the cluster. Pod IPs are internal and the application port differs from the NodePort.\n\nWhy other options are wrong:\n- B: The ClusterIP is only routable within the cluster; external clients cannot use it.\n- C: The `.svc.cluster.local` DNS is only resolvable within the cluster, not from external hosts.\n- D: Pod IPs are internal to the cluster and the application port differs from the NodePort.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
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
    explanation: "The OCI Image Specification defines a standard format for container images, including the image manifest (which lists layers and configuration), the filesystem layer format (how layers are packaged), and the image configuration (runtime defaults). It does not define runtime resource limits, network policies, or image signing processes. Image signing is addressed by separate projects like Sigstore/cosign and Notary.\n\nWhy other options are wrong:\n- A: The OCI image spec defines image format, not runtime resource limits enforcement.\n- C: Network security policies are not embedded in container images by the OCI spec.\n- D: Image signing and verification are handled by separate projects like Sigstore/cosign and Notary, not the OCI image spec.\n\nReference: https://opencontainers.org/",
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
    explanation: "Kubernetes `Secrets` are designed to hold sensitive data such as passwords, tokens, and keys. While they are only base64-encoded by default, they integrate with RBAC for access control and can be encrypted at rest in `etcd`. ConfigMaps do not have a `sensitive` annotation. PersistentVolumes are for persistent storage, not credential management. Annotations are visible in API responses and provide no security features.\n\nWhy other options are wrong:\n- A: ConfigMaps do not have a `sensitive: true` annotation; they are not designed for sensitive data.\n- B: Annotations are visible in API responses and provide no security features.\n- C: PersistentVolumes are for persistent block/file storage, not for managing credentials.\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/",
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
    explanation: "`kube-proxy` runs on every node and is responsible for implementing Service abstractions. It watches the API server for Service and Endpoint objects and programs network rules (using iptables, IPVS, or nftables) to route traffic destined for a Service's ClusterIP to the correct backend Pods. It does not proxy external traffic to the API server. IP assignment is handled by the CNI plugin. Health monitoring and node status reporting is done by the kubelet.\n\nWhy other options are wrong:\n- B: kube-proxy does not serve as a reverse proxy for the API server.\n- C: IP address assignment to Pods is handled by the CNI plugin, not kube-proxy.\n- D: Pod health monitoring and node status reporting are performed by the kubelet, not kube-proxy.\n\nReference: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/",
    verify: "microk8s kubectl get pods -n kube-system -l k8s-app=kube-proxy"
  },
  {
    id: "s01-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a Deployment with 3 replicas running version `v1.0` of their application. They update the image to `v1.1`, but the new version has a critical bug. They need to quickly restore the last known-good version. What is the fastest way to rollback?",
    diagram: null,
    options: [
      "Delete the Deployment and recreate it with the `v1.0` image tag specified in the manifest",
      "Manually edit each Pod to change the image back to `v1.0` using `kubectl edit pod`",
      "Use `kubectl rollout undo deployment/<name>` to revert to the previous revision",
      "Scale the Deployment to 0 replicas, update the image to `v1.0`, then scale back to 3"
    ],
    answer: 2,
    explanation: "`kubectl rollout undo` is the built-in mechanism to revert a Deployment to its previous revision. Kubernetes maintains a revision history for Deployments, allowing instant rollbacks. Deleting and recreating the Deployment causes unnecessary downtime. You cannot edit individual Pods managed by a Deployment since the controller will reconcile them back. Scaling to zero causes downtime and is unnecessarily complex.\n\nWhy other options are wrong:\n- A: Deleting and recreating the Deployment causes unnecessary downtime.\n- B: You cannot edit individual Pods managed by a Deployment; the controller will reconcile them back.\n- D: Scaling to zero and back causes downtime and is unnecessarily complex compared to rollout undo.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment",
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
    explanation: "RBAC is the standard Kubernetes authorization mechanism. A `Role` defines permissions (like `get`, `list`, `watch` on Pods) within a specific namespace, and a `RoleBinding` grants that Role to a user or ServiceAccount. NetworkPolicies control network traffic, not API access. API server configuration does not support per-user namespace restrictions. Creating a ServiceAccount does not automatically limit access — it must be paired with RBAC bindings.\n\nWhy other options are wrong:\n- A: NetworkPolicies control network traffic between Pods, not API access permissions.\n- B: Creating a ServiceAccount does not automatically limit access — RBAC bindings are required.\n- C: The API server configuration does not support per-user namespace restrictions for individual developers.\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
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
    explanation: "An Ingress resource by itself is just a set of routing rules. An Ingress controller (like NGINX, Traefik, or HAProxy) must be running in the cluster to watch for Ingress resources and implement the actual routing. Without an Ingress controller, Ingress resources have no effect. Backend services do not need to be LoadBalancer type. `kube-proxy` does not handle HTTP routing. Cluster DNS (CoreDNS) resolves Service names but does not implement Ingress routing.\n\nWhy other options are wrong:\n- A: Backend Services do not need to be LoadBalancer type; ClusterIP is sufficient for Ingress routing.\n- B: kube-proxy handles L4 Service routing (iptables/IPVS) and does not support HTTP path-based routing.\n- D: Cluster DNS (CoreDNS) resolves Service names but does not implement Ingress routing rules.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/",
    verify: "microk8s kubectl get ingress --all-namespaces"
  },
  {
    id: "s01-q056",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod is in the `Pending` state and has been for several minutes. Running `kubectl describe pod` shows the event: `0/3 nodes are available: 3 Insufficient memory`. What is the root cause and how should the team resolve it?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="35" rx="6" fill="#f44336" stroke="#fff" stroke-width="1.5"/><text x="200" y="28" text-anchor="middle" fill="white" font-size="12">Pod (Pending)</text><text x="200" y="55" text-anchor="middle" fill="#f44336" font-size="11">requests: 4Gi memory</text><rect x="10" y="80" width="110" height="60" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="65" y="100" text-anchor="middle" fill="#ccc" font-size="10">Node 1</text><text x="65" y="118" text-anchor="middle" fill="#FF9800" font-size="9">Alloc: 2Gi/4Gi</text><text x="65" y="132" text-anchor="middle" fill="#f44336" font-size="9">Available: 2Gi</text><rect x="145" y="80" width="110" height="60" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="200" y="100" text-anchor="middle" fill="#ccc" font-size="10">Node 2</text><text x="200" y="118" text-anchor="middle" fill="#FF9800" font-size="9">Alloc: 3Gi/4Gi</text><text x="200" y="132" text-anchor="middle" fill="#f44336" font-size="9">Available: 1Gi</text><rect x="280" y="80" width="110" height="60" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="335" y="100" text-anchor="middle" fill="#ccc" font-size="10">Node 3</text><text x="335" y="118" text-anchor="middle" fill="#FF9800" font-size="9">Alloc: 3.5Gi/4Gi</text><text x="335" y="132" text-anchor="middle" fill="#f44336" font-size="9">Available: 0.5Gi</text><text x="200" y="170" text-anchor="middle" fill="#f44336" font-size="12">Why is this Pod Pending?</text></svg>',
    options: [
      "The Pod's image is too large for the nodes' disk space; the team should use a smaller base image",
      "The Pod's memory request exceeds allocatable memory on all nodes; reduce the request or add nodes",
      "The Pod is waiting for a PersistentVolume with sufficient memory capacity to be bound and mounted",
      "The `kube-scheduler` is misconfigured and cannot calculate memory availability correctly on nodes"
    ],
    answer: 1,
    explanation: "The event `Insufficient memory` means the Pod's memory request cannot be satisfied by any node in the cluster. The scheduler checks whether the node has enough allocatable memory (total memory minus reserved) to satisfy the Pod's `resources.requests.memory`. The solution is to reduce the memory request, free resources by removing other workloads, or add nodes with more memory. This is not about disk space, PersistentVolumes, or scheduler misconfiguration.\n\nWhy other options are wrong:\n- A: The error is about memory, not disk space; image size is unrelated to this scheduling failure.\n- C: PersistentVolumes are for persistent storage and do not have \"memory capacity\" for scheduling.\n- D: The scheduler is working correctly; it is accurately reporting that no node has sufficient memory.\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: "microk8s kubectl describe nodes | grep -A5 'Allocated resources'"
  },
  {
    id: "s01-q057",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team needs on-demand provisioned storage for their PostgreSQL StatefulSet. They want the storage to be automatically created when a PVC is submitted, without an administrator manually creating PersistentVolumes. Which Kubernetes resource enables this?",
    diagram: null,
    options: [
      "A `PersistentVolume` with `reclaimPolicy: Retain` that is pre-provisioned by an administrator",
      "A `VolumeAttachment` resource that connects cloud storage to Pods on demand when requested",
      "A `ConfigMap` that maps PVC names to cloud provider volume IDs for automatic volume binding",
      "A `StorageClass` with a provisioner that dynamically creates PersistentVolumes for PVCs"
    ],
    answer: 3,
    explanation: "A `StorageClass` defines a provisioner (such as `kubernetes.io/aws-ebs` or `kubernetes.io/gce-pd`) and parameters for dynamically provisioning PersistentVolumes. When a PVC references a StorageClass, the provisioner automatically creates the underlying storage and a matching PV. Pre-provisioned PVs are static provisioning, not dynamic. ConfigMaps are for configuration data. VolumeAttachments are internal objects managed by the attach/detach controller.\n\nWhy other options are wrong:\n- A: Pre-provisioned PVs are static provisioning, not dynamic — an admin must manually create them.\n- B: VolumeAttachments are internal objects managed by the attach/detach controller, not user-facing.\n- C: ConfigMaps store configuration key-value pairs, not volume provisioning mappings.\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/",
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
      "It reduces the need for version control since each image is a self-contained deployment artifact",
      "It ensures consistency and reproducibility — every deployment uses a known, tested artifact",
      "It allows faster rollbacks because the container runtime can hot-swap layers without restarts"
    ],
    answer: 2,
    explanation: "Immutable infrastructure ensures that every deployment uses the exact same artifact that was built and tested, eliminating configuration drift and 'works on my machine' problems. If an issue arises, you deploy the previous known-good image rather than trying to fix a modified running system. Image layer caching is about build efficiency, not immutability. Version control is still essential. Container runtimes do not support hot-swapping layers.\n\nWhy other options are wrong:\n- A: Image layer caching is about build efficiency, not the core benefit of immutability.\n- B: Version control is still essential for tracking changes; immutable images do not replace it.\n- D: Container runtimes do not support hot-swapping layers without a full container restart.\n\nReference: https://kubernetes.io/docs/concepts/containers/images/",
    verify: null
  },
  {
    id: "s01-q059",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team is designing an API gateway for their microservices architecture on Kubernetes. The gateway should handle cross-cutting concerns like authentication, rate limiting, and request routing. Which Kubernetes resource type is commonly used as the entry point for external HTTP/HTTPS traffic to microservices?",
    diagram: null,
    options: [
      "A `ClusterIP` Service with annotation-based routing rules to handle external HTTP traffic directly",
      "An `Ingress` resource with an Ingress controller that handles routing and TLS termination",
      "A `DaemonSet` running an HTTP proxy on every node with `hostNetwork: true` for direct access",
      "A `ConfigMap` that defines routing rules consumed by `kube-proxy` for HTTP load balancing"
    ],
    answer: 1,
    explanation: "An Ingress resource, backed by an Ingress controller (like NGINX or Traefik), is the standard Kubernetes mechanism for managing external HTTP/HTTPS access. Ingress controllers can handle TLS termination, path-based routing, rate limiting, and integrate with authentication plugins. `ClusterIP` is internal-only. A DaemonSet-based proxy bypasses Kubernetes networking abstractions. `kube-proxy` does not handle HTTP-level routing or load balancing.\n\nWhy other options are wrong:\n- A: A ClusterIP Service is internal-only and does not support annotation-based HTTP routing; it cannot serve as an external entry point.\n- C: A DaemonSet-based proxy with hostNetwork bypasses Kubernetes networking abstractions and is not the standard pattern.\n- D: kube-proxy does not handle HTTP-level routing or load balancing; ConfigMaps cannot configure it for this purpose.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
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
    explanation: "Serverless platforms excel at bursty, event-driven workloads because they can scale to zero when idle, meaning you pay nothing during inactive periods, and scale up automatically when events arrive. Cold-start latency is actually a drawback of serverless, not an advantage. Serverless functions are typically stateless. Isolation depends on the specific serverless implementation and is not universally stronger than containers.\n\nWhy other options are wrong:\n- B: Cold-start latency is actually a drawback of serverless, not an advantage over containers.\n- C: Serverless functions are typically stateless; they do not include built-in persistent storage backends.\n- D: Isolation guarantees depend on the specific runtime and are not universally stronger in serverless.\n\nReference: https://knative.dev/docs/serving/autoscaling/scale-to-zero/",
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
    explanation: "CoreDNS is a CNCF graduated project and the default DNS server in Kubernetes clusters since version 1.13. It provides service discovery by resolving Service names to ClusterIPs within the cluster. BIND9 is a general-purpose DNS server not used as a Kubernetes default. ExternalDNS synchronizes Kubernetes resources with external DNS providers but is not the internal cluster DNS. PowerDNS is not bundled with Kubernetes.\n\nWhy other options are wrong:\n- A: BIND9 is a general-purpose DNS server, not used as a Kubernetes cluster DNS default.\n- B: PowerDNS is not bundled with or used by Kubernetes distributions.\n- C: ExternalDNS synchronizes Kubernetes resources with external DNS providers but is not the internal cluster DNS.\n\nReference: https://coredns.io/",
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
    explanation: "By default, container runtimes write stdout and stderr to log files on the node. The kubelet reads these logs (typically found at `/var/log/containers/`, which are symlinks to `/var/log/pods/` and ultimately to the runtime's log directory) when serving `kubectl logs` requests. Logs are not stored in `etcd`, which only stores cluster state. There is no centralized logging service by default. Kubernetes does not automatically create `emptyDir` volumes for logs.\n\nWhy other options are wrong:\n- A: etcd stores cluster state (API objects), not container stdout/stderr output.\n- B: There is no centralized logging service by default; the kubelet reads local node log files.\n- D: Kubernetes does not automatically create emptyDir volumes for log storage.\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/logging/",
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
    explanation: "Namespaces provide logical boundaries for organizing resources by project, and `ResourceQuotas` limit consumption within each namespace. Labels can further categorize workloads. Tools like Kubecost or cloud provider cost management integrate with these Kubernetes primitives to provide cost attribution. Separate clusters add operational overhead. PodDisruptionBudgets manage availability, not costs. PriorityClasses affect scheduling priority, not cost tracking.\n\nWhy other options are wrong:\n- A: Separate clusters add significant operational overhead and are not necessary for cost tracking.\n- C: PodDisruptionBudgets manage availability during voluntary disruptions, not cost tracking.\n- D: PriorityClasses affect scheduling priority and preemption, not cost tracking or allocation.\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
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
    explanation: "`values.yaml` is the file in a Helm chart that defines default configuration values. These values are injected into templates during rendering and can be overridden using `--set` flags or custom values files at install or upgrade time. `Chart.yaml` contains chart metadata (name, version, description) but not configuration values. `requirements.yaml` (now `Chart.yaml` dependencies) lists chart dependencies. There is no special `templates/defaults.yaml` file.\n\nWhy other options are wrong:\n- B: Chart.yaml contains chart metadata (name, version, description), not configuration values.\n- C: requirements.yaml (now dependencies in Chart.yaml) lists chart dependencies, not default config.\n- D: There is no special `templates/defaults.yaml` file in the Helm chart structure.\n\nReference: https://helm.sh/docs/chart_template_guide/values_files/",
    verify: null
  },
  {
    id: "s01-q065",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer attaches labels `app: frontend` and `tier: web` to their Pod. Later, they need to query all Pods with the label `app: frontend` but NOT `tier: api`. Which `kubectl` command correctly filters using these label selectors?",
    diagram: null,
    options: [
      "`kubectl get pods -l app=frontend,tier!=api` with comma-separated selectors",
      "`kubectl get pods -l app=frontend OR tier!=api` with an OR keyword",
      "`kubectl get pods --labels app=frontend --no tier` with a --no flag",
      "`kubectl get pods -l app=frontend --exclude tier=api` with --exclude"
    ],
    answer: 0,
    explanation: "The `-l` flag supports both equality-based (`app=frontend`) and inequality-based (`tier!=api`) selectors, separated by commas for AND logic. The comma means both conditions must be true. There is no `OR` operator in label selectors. The `--labels` and `--exclude` flags do not exist in kubectl for label filtering.\n\nWhy other options are wrong:\n- B: There is no `OR` operator in kubectl label selectors; commas provide AND logic.\n- C: `--labels` and `--no` are not valid kubectl flags for label filtering.\n- D: `--exclude` is not a valid kubectl flag for label filtering.\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/",
    verify: "microk8s kubectl get pods -l app=frontend,tier!=api --all-namespaces 2>/dev/null"
  },
  {
    id: "s01-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A team notices that their Pods are being evicted from nodes during memory pressure events. They want to protect critical Pods from eviction. Which configuration provides the strongest protection against eviction?",
    diagram: null,
    options: [
      "Set `spec.priority` to a high value; the scheduler avoids evicting high-priority Pods during resource pressure events",
      "Set resource `requests` equal to `limits` (Guaranteed QoS), making the Pod least likely to be evicted",
      "Set `spec.terminationGracePeriodSeconds` to a very high value to delay the eviction process entirely",
      "Add the annotation `eviction.kubernetes.io/protected: true` to prevent eviction during memory pressure"
    ],
    answer: 1,
    explanation: "Kubernetes assigns a Quality of Service (QoS) class based on resource requests and limits. When `requests` equals `limits` for all containers, the Pod receives the `Guaranteed` QoS class, making it the last to be evicted during resource pressure. Pods with `Burstable` or `BestEffort` QoS are evicted first. While Pod priority can influence eviction order within the same QoS class, the QoS class itself is the primary factor the kubelet considers during eviction, making Guaranteed QoS the strongest protection. `terminationGracePeriodSeconds` only affects the shutdown process. The mentioned annotation does not exist.\n\nWhy other options are wrong:\n- A: High priority influences eviction order within the same QoS class, but does not override QoS class -- a high-priority BestEffort Pod is still evicted before a low-priority Guaranteed Pod.\n- C: terminationGracePeriodSeconds only affects the shutdown process after eviction is decided, not eviction order.\n- D: The annotation `eviction.kubernetes.io/protected: true` does not exist in Kubernetes.\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/",
    verify: "microk8s kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.qosClass}{\"\\n\"}{end}' --all-namespaces 2>/dev/null"
  },
  {
    id: "s01-q067",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team deploys a LoadBalancer Service in a cloud-managed Kubernetes cluster. They notice that the Service has both a ClusterIP and an external IP. A new engineer is confused about how the LoadBalancer type relates to other Service types. Which statement is correct?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="120" y="5" width="160" height="60" rx="8" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="200" y="25" text-anchor="middle" fill="white" font-size="12">Service (type: ?)</text><text x="200" y="42" text-anchor="middle" fill="#adf" font-size="10">IP: ?</text><text x="200" y="56" text-anchor="middle" fill="#fda" font-size="10">Behavior: ?</text><text x="200" y="85" text-anchor="middle" fill="#ccc" font-size="12">? How do these relate ?</text><rect x="50" y="160" width="90" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="95" y="185" text-anchor="middle" fill="white" font-size="11">Pod A</text><rect x="155" y="160" width="90" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="200" y="185" text-anchor="middle" fill="white" font-size="11">Pod B</text><rect x="260" y="160" width="90" height="40" rx="4" fill="#0db7ed" stroke="#fff" stroke-width="1"/><text x="305" y="185" text-anchor="middle" fill="white" font-size="11">Pod C</text><line x1="200" y1="65" x2="95" y2="160" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="65" x2="200" y2="160" stroke="#aaa" stroke-width="1.5"/><line x1="200" y1="65" x2="305" y2="160" stroke="#aaa" stroke-width="1.5"/></svg>',
    options: [
      "LoadBalancer includes NodePort and ClusterIP functionality, so the Service exposes all three access methods",
      "LoadBalancer is independent of ClusterIP and NodePort; it creates a completely separate traffic path",
      "LoadBalancer replaces ClusterIP with an external IP, so the Service is no longer internally accessible",
      "LoadBalancer requires a headless Service with no ClusterIP, as the external IP replaces the virtual cluster IP"
    ],
    answer: 0,
    explanation: "Kubernetes Service types are hierarchical. A `LoadBalancer` Service automatically provisions a cloud load balancer, a `NodePort`, and a `ClusterIP`. Traffic can reach the Pods via the external load balancer, any node's IP on the NodePort, or the internal ClusterIP. They are not independent paths. The ClusterIP is not replaced. Headless Services (no ClusterIP) are incompatible with LoadBalancer type.\n\nWhy other options are wrong:\n- B: LoadBalancer is not independent — it builds on NodePort and ClusterIP hierarchically.\n- C: LoadBalancer does not replace the ClusterIP; the service remains internally accessible via ClusterIP.\n- D: Headless Services (clusterIP: None) are incompatible with LoadBalancer type.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer",
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
    explanation: "A CronJob creates Job objects on a cron schedule. Each Job runs a Pod to completion. Setting `backoffLimit: 2` on the Job template allows up to 2 retries on failure. A Deployment is for long-running services. Using a DaemonSet with a sleep loop wastes resources on every node. A Pod with `restartPolicy: Always` never terminates and does not have built-in scheduling capabilities.\n\nWhy other options are wrong:\n- A: A Deployment runs continuously and is not designed for scheduled, run-to-completion tasks.\n- C: A DaemonSet with a sleep loop wastes resources on every node and is not a scheduling mechanism.\n- D: A Pod with restartPolicy Always never terminates and does not have built-in cron scheduling.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/",
    verify: "microk8s kubectl get cronjobs --all-namespaces"
  },
  {
    id: "s01-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer uses `kubectl apply -f deployment.yaml` to create a Deployment. A few minutes later, they modify the YAML file and run the same command again. What happens?",
    diagram: null,
    options: [
      "Kubernetes rejects the command because the Deployment already exists and requires `edit` to modify",
      "Kubernetes deletes the existing Deployment and recreates it from the updated YAML manifest definitions",
      "Kubernetes performs a three-way merge comparing the last applied config, live state, and new file",
      "Kubernetes creates a duplicate Deployment with an auto-generated suffix to prevent naming conflicts"
    ],
    answer: 2,
    explanation: "`kubectl apply` uses a declarative approach with a three-way merge strategy. It compares the new configuration, the last-applied-configuration annotation (stored on the object), and the current live state to determine what changes to make. This allows it to update only the fields that changed. It does not reject existing resources, create duplicates, or delete and recreate the resource.\n\nWhy other options are wrong:\n- A: `kubectl apply` is designed to update existing resources; it does not reject them.\n- B: `kubectl apply` does not delete and recreate resources; it performs an in-place merge.\n- D: Kubernetes does not create duplicate resources with auto-generated suffixes from `kubectl apply`.\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#in-place-updates-of-resources",
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
      "Use Pod Security Admission (PSA) with the `restricted` profile enforced across all namespaces",
      "Deploy a custom webhook that intercepts all Pod creation requests and inspects security contexts",
      "Set `allowPrivilegeEscalation: false` in the kubelet configuration to block all privileged Pods"
    ],
    answer: 1,
    explanation: "Pod Security Admission (PSA) is the successor to PodSecurityPolicy (which was removed in Kubernetes v1.25). PSA defines three profiles — `privileged`, `baseline`, and `restricted` — that can be enforced, audited, or warned per namespace, or configured cluster-wide via admission defaults. The `restricted` profile prohibits privileged containers and dangerous capabilities. PodSecurityPolicies are deprecated and removed. Custom webhooks work but add complexity. The kubelet does not have a global privilege-blocking configuration.\n\nWhy other options are wrong:\n- A: PodSecurityPolicy (PSP) was removed in Kubernetes v1.25 and is no longer available.\n- C: Custom webhooks work but add significant complexity compared to the built-in PSA mechanism.\n- D: The kubelet does not have a global configuration to block all privileged containers.\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/",
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
    explanation: "Service meshes like Istio and Linkerd use the sidecar proxy pattern, injecting a proxy container (commonly Envoy for Istio, linkerd-proxy for Linkerd) into each Pod. This proxy intercepts all inbound and outbound traffic to handle mTLS, load balancing, retries, and observability transparently. Init containers run only at startup. The ambassador pattern in its original definition uses a local proxy for outbound access but is not the term used for service mesh injection. The adapter pattern normalizes interfaces.\n\nWhy other options are wrong:\n- A: Init containers run only at startup and exit; they do not intercept ongoing traffic.\n- B: The ambassador pattern traditionally runs a proxy within the same Pod (not a separate Deployment) for outbound access.\n- D: The adapter pattern normalizes or transforms data formats; it does not describe traffic interception by a mesh proxy.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/",
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
    explanation: "When a Pod is `Pending` with no events, it often means the Pod was not even submitted to the scheduler. A `ResourceQuota` in the namespace can prevent Pod creation if the quota for CPU, memory, or Pod count is exceeded. Restarting the scheduler is drastic and unlikely to help if the Pod was not submitted. Deleting running Pods does not solve the underlying quota issue. `maxSurge` only applies during rolling updates, not steady-state.\n\nWhy other options are wrong:\n- B: Restarting the scheduler is drastic and unlikely to help if the Pod was never submitted for scheduling.\n- C: Deleting running Pods does not solve the underlying quota issue and may worsen the situation.\n- D: maxSurge only applies during rolling updates, not steady-state replica management.\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: "microk8s kubectl get resourcequotas --all-namespaces"
  },
  {
    id: "s01-q073",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team needs to understand how the various control plane components interact. When a user runs `kubectl create deployment nginx --image=nginx`, which sequence of events correctly describes what happens in the control plane?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="35" rx="6" fill="#555" stroke="#aaa" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="white" font-size="11">etcd</text><rect x="280" y="100" width="110" height="35" rx="6" fill="#555" stroke="#aaa" stroke-width="1"/><text x="335" y="122" text-anchor="middle" fill="white" font-size="10">Scheduler</text><rect x="230" y="200" width="120" height="35" rx="6" fill="#555" stroke="#aaa" stroke-width="1"/><text x="290" y="222" text-anchor="middle" fill="white" font-size="10">Kubelet</text><rect x="50" y="200" width="120" height="35" rx="6" fill="#555" stroke="#aaa" stroke-width="1"/><text x="110" y="222" text-anchor="middle" fill="white" font-size="10">Controller Mgr</text><rect x="10" y="100" width="110" height="35" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="65" y="122" text-anchor="middle" fill="white" font-size="11">API Server</text><text x="200" y="135" text-anchor="middle" fill="#FFD700" font-size="13" font-weight="bold">? What is the order ?</text></svg>',
    options: [
      "API server stores the Deployment in etcd, scheduler assigns it to a node, kubelet creates the Pod, and containers start via the runtime",
      "Scheduler receives the request first, assigns nodes, then API server creates the Deployment and Pods, kubelet starts containers",
      "API server stores Deployment in etcd, controller creates ReplicaSet and Pods, scheduler binds them, kubelet starts containers",
      "API server creates Pods directly in etcd, scheduler assigns them to nodes, kubelet starts containers, and controller manager monitors health"
    ],
    answer: 2,
    explanation: "The correct sequence is: the API server receives the request and stores the Deployment object in `etcd`. The Deployment controller (in `kube-controller-manager`) detects the new Deployment and creates a ReplicaSet. The ReplicaSet controller then creates the specified number of Pod objects. The scheduler detects unscheduled Pods and assigns them to nodes. Finally, the kubelet on each assigned node starts the containers via the container runtime. Each component watches for changes through the API server.\n\nWhy other options are wrong:\n- A: Incorrectly skips the controller-manager step — the scheduler does not directly receive the Deployment.\n- B: The scheduler does not receive requests first; all requests go through the API server.\n- D: The API server does not create Pods directly — the controller-manager creates ReplicaSets which create Pods.\n\nReference: https://kubernetes.io/docs/concepts/overview/components/",
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
    explanation: "When a `livenessProbe` fails the specified number of times (controlled by `failureThreshold`, default 3), the kubelet kills the container and restarts it according to the Pod's `restartPolicy`. This ensures that unhealthy containers are replaced. Removing from Service endpoints is the behavior of a `readinessProbe`, not a liveness probe. Kubernetes does not send alerts natively. Rescheduling to a different node does not occur — the Pod stays on the same node.\n\nWhy other options are wrong:\n- B: Removing from Service endpoints is the behavior of a readinessProbe, not a livenessProbe.\n- C: Kubernetes does not natively send alerts; liveness probe failure triggers container restart.\n- D: Kubernetes does not reschedule the Pod to a different node on liveness failure; it restarts the container in place.\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
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
    explanation: "A `PodDisruptionBudget` (PDB) specifies the minimum number of Pods that must remain available during voluntary disruptions like node drains. Setting `minAvailable: 3` ensures that `kubectl drain` will not evict Pods if it would bring the count below 3. HPAs handle scaling based on metrics, not disruption limits. ResourceQuotas set maximum limits, not minimums. Taints and tolerations control scheduling, not disruption budgets.\n\nWhy other options are wrong:\n- A: HPA handles scaling based on metrics, not disruption limits during maintenance.\n- C: ResourceQuotas set maximum limits on resource consumption, not minimum Pod availability.\n- D: Taints and tolerations control scheduling preferences, not disruption budgets.\n\nReference: https://kubernetes.io/docs/tasks/run-application/configure-pdb/",
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
    explanation: "When a `readinessProbe` fails, the Pod's IP is removed from the endpoints of Services that select it. This means the Pod stops receiving traffic, but the container is NOT restarted (that is the behavior of a `livenessProbe`). Once the probe passes again, the Pod is added back to the Service endpoints. The Pod is not deleted or rescheduled. The Deployment controller does not scale based on readiness status.\n\nWhy other options are wrong:\n- A: Restarting the container is the behavior of a livenessProbe failure, not a readinessProbe failure.\n- B: The Deployment controller does not scale up additional replicas based on readiness probe status.\n- C: The Pod is not deleted or rescheduled; it remains on the same node but is removed from Service endpoints.\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes",
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
    explanation: "Every worker node runs the `kubelet` (which manages Pods on the node), `kube-proxy` (which implements Service networking rules), and a container runtime (like `containerd` or `CRI-O`) to execute containers. The `kube-scheduler` runs only on control plane nodes. The `kube-apiserver` is a control plane component. `etcd` runs on control plane nodes (or dedicated etcd nodes).\n\nWhy other options are wrong:\n- A: kube-apiserver runs only on control plane nodes, not worker nodes.\n- B: kube-scheduler runs only on control plane nodes, not worker nodes.\n- D: etcd runs on control plane nodes (or dedicated etcd nodes), not on every worker node.\n\nReference: https://kubernetes.io/docs/concepts/overview/components/#node-components",
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
    explanation: "`nodeSelector` is the simplest way to constrain a Pod to nodes with specific labels. Setting `nodeSelector` with the zone label ensures the scheduler only considers nodes in the specified availability zone. `nodeName` bypasses the scheduler entirely. Annotations do not affect scheduling decisions. `PodAffinity` matches based on other Pods' labels and locations, not node labels directly — `nodeAffinity` would be the affinity-based alternative.\n\nWhy other options are wrong:\n- A: Setting nodeName bypasses the scheduler entirely, which the question explicitly asks to avoid.\n- B: Annotations do not affect scheduling decisions; they are metadata only.\n- D: PodAffinity matches based on other Pods' labels and locations, not node labels — nodeAffinity would be the affinity-based alternative.\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector",
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
      "A `CronJob` that periodically checks CPU utilization and runs `kubectl scale` commands to adjust",
      "A `HorizontalPodAutoscaler` (HPA) targeting 70% average CPU utilization for Deployment",
      "A `ResourceQuota` with a CPU threshold that triggers scaling events when it is exceeded"
    ],
    answer: 2,
    explanation: "A `HorizontalPodAutoscaler` (HPA) automatically adjusts the number of Pod replicas based on observed metrics like CPU utilization. Setting the target average CPU utilization to 70% causes the HPA to scale out when usage exceeds this threshold and scale in when it drops below. A `VerticalPodAutoscaler` adjusts resource requests per Pod, not replica count. CronJobs are manual automation. ResourceQuotas do not trigger scaling.\n\nWhy other options are wrong:\n- A: VerticalPodAutoscaler adjusts resource requests per Pod (CPU/memory), not replica count.\n- B: A CronJob running kubectl scale is manual automation, not native Kubernetes auto-scaling.\n- D: ResourceQuotas cap resource consumption; they do not trigger scaling events.\n\nReference: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
    verify: "microk8s kubectl get hpa --all-namespaces"
  },
  {
    id: "s01-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team creates a headless Service by setting `clusterIP: None`. They want to understand how this differs from a regular ClusterIP Service. What is the behavior of a headless Service?",
    diagram: null,
    options: [
      "It does not create DNS records, so Pods rely on environment variables injected by the kubelet for discovery",
      "It creates a ClusterIP but hides it from `kubectl get svc` output for additional security purposes",
      "DNS queries for the Service return individual Pod IPs instead of a virtual IP, enabling direct access",
      "It routes all client traffic to a single Pod selected from the endpoint list, bypassing round-robin distribution"
    ],
    answer: 2,
    explanation: "A headless Service (`clusterIP: None`) does not get a virtual IP. Instead, DNS queries for the Service name return A records for all the Pod IPs backing the Service. This allows clients to discover and connect to individual Pods directly, which is essential for stateful applications like databases. Headless Services still create DNS records. The ClusterIP is not hidden. Traffic is not limited to one Pod.\n\nWhy other options are wrong:\n- A: Headless Services do create DNS records — they return individual Pod IP A records.\n- B: The ClusterIP is not hidden; it is explicitly set to None, meaning no virtual IP is allocated.\n- D: Traffic is not limited to one Pod; DNS returns all Pod IPs for client-side selection.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
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
      "Yes, ReplicaSets provide finer-grained control over Pod identity and ordering than Deployments",
      "No, Deployments manage ReplicaSets and add rolling update and rollback capabilities on top of them"
    ],
    answer: 3,
    explanation: "Deployments are the recommended higher-level abstraction that manages ReplicaSets. A Deployment creates and manages ReplicaSets, adding rolling update and rollback functionality. Creating ReplicaSets directly is almost never necessary, as you lose these management features. The replica count limit is not a reason. StatefulSets (not ReplicaSets) are for stateful workloads. ReplicaSets are not deprecated — they are actively used by Deployments internally.\n\nWhy other options are wrong:\n- A: There is no replica count limit that requires direct ReplicaSet creation.\n- B: ReplicaSets are not deprecated; they are actively used internally by Deployments.\n- C: StatefulSets handle stateful applications, not ReplicaSets; this claim is incorrect.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/",
    verify: "microk8s kubectl get replicasets --all-namespaces"
  },
  {
    id: "s01-q082",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A team is building container images and wants to ensure they follow best practices for minimal image size and security. Which approach produces the smallest and most secure container image?",
    diagram: null,
    options: [
      "Use a multi-stage build with a minimal base image like `distroless` or `alpine` for the final production stage",
      "Use a full Ubuntu or Debian base image and remove unnecessary packages with `apt-get remove` in the final Dockerfile layer",
      "Build the application on the host machine with native compilers and copy the binary into a `latest` tagged base image",
      "Use the `--squash` flag to compress all layers into one, which removes most unused files from the image"
    ],
    answer: 0,
    explanation: "Multi-stage builds allow you to use a full build environment in an early stage and copy only the compiled artifacts into a minimal final stage (like `distroless` or `alpine`). This produces small, secure images without build tools or unnecessary packages. Removing packages from a full image still leaves layer history. Building on the host introduces inconsistencies. The `--squash` flag is experimental and does not selectively remove files from earlier layers.\n\nWhy other options are wrong:\n- B: Removing packages from a full image still leaves layer history and produces a larger image.\n- C: Building on the host introduces environment inconsistencies and may include unnecessary dependencies.\n- D: The --squash flag is experimental and does not selectively remove files from earlier layers.\n\nReference: https://docs.docker.com/build/building/multi-stage/",
    verify: null
  },
  {
    id: "s01-q083",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A cluster administrator needs to create a service account that can list and get Pods in the `development` namespace but cannot delete or create them. Which RBAC resources should they create?",
    diagram: null,
    options: [
      "A `ClusterRole` with `get` and `list` on Pods, bound via a `ClusterRoleBinding` to the `development` namespace",
      "A `Role` in `development` with `get` and `list` on Pods, and a `RoleBinding` to the service account",
      "A `Role` with all verbs on Pods, then create a `NetworkPolicy` to restrict any write operations from it",
      "A `ServiceAccount` annotated with `rbac.authorization.kubernetes.io/verbs: get,list` for automatic binding"
    ],
    answer: 1,
    explanation: "For namespace-scoped permissions, you create a `Role` (which defines verbs like `get` and `list` on resources like `pods`) and a `RoleBinding` (which binds the Role to a subject like a ServiceAccount) in the target namespace. A `ClusterRole` with a `ClusterRoleBinding` would grant access across all namespaces. NetworkPolicies control network traffic, not API permissions. ServiceAccount annotations do not control RBAC permissions.\n\nWhy other options are wrong:\n- A: A ClusterRoleBinding is always cluster-wide and cannot be scoped to a single namespace; this would grant Pod read access across ALL namespaces.\n- C: NetworkPolicies control network traffic, not API permissions; a Role with all verbs would be overly permissive.\n- D: The annotation `rbac.authorization.kubernetes.io/verbs` does not exist for automatic RBAC binding.\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
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
    explanation: "The error `permission denied` for the entrypoint script indicates that the file `/app/start.sh` inside the container image does not have execute permissions. This is a build-time issue — the Dockerfile should include `RUN chmod +x /app/start.sh` or the file should be added with correct permissions. This is not a registry pull issue, a `readOnlyRootFilesystem` issue (which prevents writes, not execution), or a kubelet permission problem.\n\nWhy other options are wrong:\n- A: The error is about execute permissions inside the container, not registry pull authentication.\n- B: readOnlyRootFilesystem prevents writes to the filesystem, not execution of existing files.\n- D: The error is from the container runtime (runc), not a kubelet permission issue.\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/",
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
    explanation: "The error message indicates two issues: no dynamic provisioning (no StorageClass set) and no existing PV matches the claim. For dynamic provisioning, the PVC needs a `storageClassName` referencing a StorageClass, or a default StorageClass must exist. For static provisioning, a PV must match the PVC's access modes, capacity, and storage class. PVs are cluster-scoped (not namespaced), so namespace mismatch is not possible. The scheduler is not involved in PVC binding.\n\nWhy other options are wrong:\n- A: The error mentions no StorageClass and no matching PV, not insufficient disk space.\n- B: The kube-scheduler is not involved in PVC binding; PV binding is handled by the PV controller.\n- D: PersistentVolumes are cluster-scoped (not namespaced), so namespace mismatch cannot occur.\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim",
    verify: "microk8s kubectl get sc"
  },
  {
    id: "s01-q086",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is debating whether to use declarative or imperative approaches for managing their Kubernetes resources. The senior engineer advocates for declarative management. What is the key advantage of the declarative approach?",
    diagram: null,
    options: [
      "Declarative commands execute faster because they bypass most of the validation checks performed by the API server",
      "Declarative config describes the desired end state, enabling version control, audit trails, and reproducibility",
      "Declarative manifests automatically retry failed operations, rollback on errors, and converge to desired state",
      "Declarative management infers the desired state from command-line flags instead of requiring manifest files"
    ],
    answer: 1,
    explanation: "Declarative management (using `kubectl apply` with YAML/JSON manifests) describes the desired state rather than the steps to get there. This enables version control of infrastructure, audit trails through Git history, and reproducible deployments across environments. Declarative commands do not skip validation. Retry logic is handled by controllers, not the declarative approach itself. Declarative management relies on manifest files (YAML/JSON), not command-line flags.\n\nWhy other options are wrong:\n- A: Declarative commands do not skip validation; they are fully validated by the API server.\n- C: Retry logic is handled by Kubernetes controllers, not inherently by the declarative approach itself.\n- D: Declarative management relies on manifest files (YAML/JSON), not command-line flags.\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/",
    verify: null
  },
  {
    id: "s01-q087",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team is migrating from a monolith to microservices and needs to decide how services communicate. They need reliable, decoupled communication where messages are not lost if a service is temporarily down. Which pattern should they adopt?",
    diagram: null,
    options: [
      "Asynchronous messaging through a broker like RabbitMQ or Kafka that persists messages",
      "Synchronous REST API calls with retry logic and exponential backoff between services",
      "Shared database tables where services write messages for each other to read and process",
      "gRPC streaming connections that buffer messages in memory during service downtime periods"
    ],
    answer: 0,
    explanation: "A message broker (like RabbitMQ, Kafka, or NATS JetStream) provides durable, asynchronous communication between services. Messages are persisted in the broker, so if a consuming service is down, messages queue up and are delivered when it recovers. Synchronous REST calls fail when the target is down, even with retries. Shared database tables create tight coupling. gRPC in-memory buffers are lost if either side restarts.\n\nWhy other options are wrong:\n- B: Synchronous REST calls fail when the target is down; retry logic does not solve message persistence during outages.\n- C: Shared database tables create tight coupling between services and are an anti-pattern.\n- D: gRPC in-memory buffers are lost if either side restarts, failing the durability requirement.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s01-q088",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team needs to collect distributed traces, metrics, and logs from their Kubernetes applications. They want a vendor-neutral, unified collection pipeline that can export data to multiple backends. Which CNCF project provides this?",
    diagram: null,
    options: [
      "Prometheus, which offers vendor-neutral collection of traces, metrics, and logs in one pipeline",
      "OpenTelemetry Collector, which receives, processes, and exports telemetry data in a vendor-neutral way",
      "Grafana Loki, which provides unified collection and indexing of all three telemetry signal types",
      "Fluentd, which has been extended to collect and export traces and metrics alongside log streams"
    ],
    answer: 1,
    explanation: "The OpenTelemetry Collector is a vendor-neutral agent that can receive, process, and export traces, metrics, and logs. It supports multiple input formats and can export to various backends (Jaeger, Prometheus, Zipkin, commercial vendors). Prometheus primarily handles metrics, not traces or logs. Grafana Loki handles logs, not all three signals. Fluentd handles logs primarily and does not natively process traces and metrics.\n\nWhy other options are wrong:\n- A: Prometheus primarily handles metrics; it does not natively support traces or logs.\n- C: Grafana Loki handles logs only, not all three telemetry signal types.\n- D: Fluentd handles log aggregation primarily; it does not natively process distributed traces or metrics.\n\nReference: https://opentelemetry.io/docs/collector/",
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
      "Functions are compiled to WebAssembly (Wasm) for efficient cold-start performance on Kubernetes",
      "Functions require dedicated nodes with specialized hardware to execute efficiently at scale"
    ],
    answer: 0,
    explanation: "In the FaaS model, functions are short-lived, event-driven units of compute. The platform handles all infrastructure concerns, including automatic scaling (including to zero when idle) and execution lifecycle. Functions are typically stateless and triggered by events or HTTP requests. They are not long-running processes. WebAssembly is an emerging runtime option but not a requirement. No specialized hardware is needed.\n\nWhy other options are wrong:\n- B: FaaS functions are short-lived and event-driven, not long-running processes with thread pools.\n- C: WebAssembly is an emerging option but not a requirement for FaaS on Kubernetes.\n- D: FaaS functions run on standard nodes; no specialized hardware is needed.\n\nReference: https://kubernetes.io/docs/reference/glossary/?fundamental=true",
    verify: null
  },
  {
    id: "s01-q090",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team deploys the Kubernetes Metrics Server in their cluster. They notice that `kubectl top pods` now shows CPU and memory usage. Which resource metrics does the Metrics Server collect, and what is its primary consumer?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="100" height="40" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="80" y="35" text-anchor="middle" fill="#ccc" font-size="11">Node Agent</text><rect x="30" y="70" width="100" height="40" rx="6" fill="#2d2d2d" stroke="#555" stroke-width="1.5"/><text x="80" y="95" text-anchor="middle" fill="#ccc" font-size="11">Node Agent</text><rect x="160" y="40" width="120" height="40" rx="6" fill="#326CE5" stroke="#fff" stroke-width="1.5"/><text x="220" y="55" text-anchor="middle" fill="white" font-size="10">Metrics Server</text><text x="220" y="70" text-anchor="middle" fill="white" font-size="9">???</text><rect x="310" y="10" width="80" height="35" rx="6" fill="#4CAF50" stroke="#fff" stroke-width="1"/><text x="350" y="32" text-anchor="middle" fill="white" font-size="10">Consumer A</text><rect x="310" y="55" width="80" height="35" rx="6" fill="#FF9800" stroke="#fff" stroke-width="1"/><text x="350" y="77" text-anchor="middle" fill="white" font-size="10">Consumer B</text><line x1="130" y1="30" x2="160" y2="55" stroke="#aaa" stroke-width="1.5"/><line x1="130" y1="90" x2="160" y2="65" stroke="#aaa" stroke-width="1.5"/><line x1="280" y1="50" x2="310" y2="30" stroke="#4CAF50" stroke-width="1.5"/><line x1="280" y1="65" x2="310" y2="72" stroke="#FF9800" stroke-width="1.5"/><text x="145" y="45" fill="#aaa" font-size="8">scrape</text><text x="295" y="42" fill="#aaa" font-size="8">query</text></svg>',
    options: [
      "It collects disk I/O and network metrics, primarily used by Prometheus for alerting on node health",
      "It collects CPU and memory usage from kubelets, consumed by the HorizontalPodAutoscaler and top",
      "It collects all container metrics including GPU utilization, primarily used by the kube-scheduler",
      "It collects application-level metrics via HTTP scraping, primarily used by Grafana dashboards"
    ],
    answer: 1,
    explanation: "The Metrics Server collects resource metrics (CPU and memory) from the kubelet's Summary API on each node. Its primary consumers are the `HorizontalPodAutoscaler` (for scaling decisions) and `kubectl top` (for displaying current resource usage). It does not collect disk, network, or GPU metrics. It does not scrape application endpoints — that is Prometheus' role. The scheduler does not use Metrics Server data directly.\n\nWhy other options are wrong:\n- A: Metrics Server collects CPU and memory, not disk I/O or network metrics; its primary consumer is HPA, not Prometheus.\n- C: Metrics Server does not collect GPU utilization or all container metrics; the scheduler does not consume its data.\n- D: Metrics Server collects resource metrics from kubelets, not application-level metrics via HTTP scraping.\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
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
      "Through shared environment variables like `TRACE_ID` that all Pods in the cluster can read",
      "Through Kubernetes annotations on Pod objects that carry trace context, queried via the API server",
      "Through the CNI plugin, which embeds trace IDs in the IP packet headers for network-level tracing"
    ],
    answer: 0,
    explanation: "Trace context is propagated via HTTP headers. The W3C Trace Context standard defines the `traceparent` header, which carries the trace ID and span ID. Each service extracts this header from incoming requests, creates its own span, and forwards the header to downstream calls. Environment variables are static. Pod annotations are not updated per request. The CNI plugin handles network configuration, not application-level trace data.\n\nWhy other options are wrong:\n- B: Environment variables are static and set at Pod startup; they cannot carry per-request trace context.\n- C: Kubernetes annotations on Pods are not updated per request and cannot propagate trace context.\n- D: The CNI plugin handles network configuration, not application-level trace data in IP headers.\n\nReference: https://www.w3.org/TR/trace-context/",
    verify: null
  },
  {
    id: "s01-q092",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A team wants to ensure their container images do not contain known security vulnerabilities before deploying to production. At which stage of the CI/CD pipeline should vulnerability scanning occur?",
    diagram: null,
    options: [
      "During the build and testing stages, where scanning blocks the pipeline if critical vulnerabilities are found",
      "After deployment in production, where a runtime scanner monitors containers for newly found vulnerabilities",
      "At multiple stages: during the build, before deployment via admission control, and in the registry",
      "When developers request it manually, to avoid blocking the automated deployment pipeline with extra scans"
    ],
    answer: 2,
    explanation: "A defense-in-depth approach scans at multiple stages. During the build, the CI pipeline scans the newly built image. Before deployment, an admission controller (like OPA Gatekeeper or Kyverno) can reject images with critical vulnerabilities. Registries can continuously scan stored images for newly discovered CVEs. Scanning only at build misses new vulnerabilities discovered later. Scanning only in production is too late. Manual scanning is unreliable.\n\nWhy other options are wrong:\n- A: Scanning only at build and testing stages misses new vulnerabilities discovered after the image is built and stored in a registry.\n- B: Scanning only in production is too late; vulnerable images should be caught before deployment.\n- D: Manual scanning is unreliable and does not scale with automated deployment pipelines.\n\nReference: https://kubernetes.io/docs/concepts/security/overview/",
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
      "The application has errors and Argo CD reports a health check failure for the deployed resources"
    ],
    answer: 1,
    explanation: "In GitOps, the Git repository is the source of truth. When someone manually modifies a resource in the cluster (like using `kubectl edit`), the live state drifts from the desired state in Git. Argo CD detects this difference and reports the application as `OutOfSync`. The fix is either to sync the application (reverting the manual change) or update Git to reflect the desired change. This is not about Git repository changes, connectivity issues, or application errors.\n\nWhy other options are wrong:\n- A: OutOfSync in this scenario is caused by manual cluster edits, not by new Git changes.\n- C: Argo CD connectivity issues would show a different status, not OutOfSync.\n- D: Application errors produce a \"Degraded\" health status, not an OutOfSync sync status.\n\nReference: https://argo-cd.readthedocs.io/en/stable/user-guide/app_status/",
    verify: null
  },
  {
    id: "s01-q094",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team wants to perform a blue-green deployment for their application on Kubernetes. They have the current version (blue) running and want to deploy the new version (green) alongside it, then switch all traffic at once. How can they implement this using native Kubernetes resources?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="80" width="120" height="50" rx="8" fill="#2196F3" stroke="#fff" stroke-width="1.5"/><text x="70" y="100" text-anchor="middle" fill="white" font-size="11">Blue (v1)</text><text x="70" y="118" text-anchor="middle" fill="white" font-size="10">3 replicas</text><rect x="270" y="80" width="120" height="50" rx="8" fill="#4CAF50" stroke="#fff" stroke-width="1.5"/><text x="330" y="100" text-anchor="middle" fill="white" font-size="11">Green (v2)</text><text x="330" y="118" text-anchor="middle" fill="white" font-size="10">3 replicas</text><rect x="140" y="10" width="120" height="40" rx="8" fill="#FF9800" stroke="#FFD700" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="white" font-size="12">???</text><line x1="170" y1="50" x2="70" y2="80" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,3"/><line x1="230" y1="50" x2="330" y2="80" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,3"/><text x="200" y="170" text-anchor="middle" fill="#ccc" font-size="12">? How does traffic switch ?</text></svg>',
    options: [
      "Use a single Deployment and update the image tag, which performs a blue-green switch automatically per rollout",
      "Deploy two Deployments (blue and green) and switch traffic by updating the Service selector to the green Pods",
      "Use an Ingress resource with weighted routing rules set to 0% blue traffic and 100% green traffic for cutover",
      "Scale the blue Deployment to zero and the green Deployment to the desired count simultaneously for the switch"
    ],
    answer: 1,
    explanation: "Blue-green deployment on Kubernetes involves running two separate Deployments. Both run simultaneously, with the Service selector pointing to the blue (current) Deployment. Once the green (new) Deployment is verified, you update the Service selector to point to the green Pods, switching all traffic instantly. Updating a Deployment's image performs a rolling update, not blue-green. Weighted routing is canary-style. Scaling down blue before green is ready causes downtime.\n\nWhy other options are wrong:\n- A: Updating the image on a single Deployment performs a rolling update, not a blue-green switch.\n- C: Weighted routing via Ingress is more characteristic of canary deployments, not blue-green.\n- D: Scaling down blue before green is verified causes downtime; blue-green requires both running simultaneously.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
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
    explanation: "Annotations are designed to store arbitrary non-identifying metadata on Kubernetes objects. They can hold information like build details, Git SHAs, team ownership, and tool-specific configuration. Unlike labels, annotations are not used for selection or scheduling. Labels should be used for identifying and selecting resources. Finalizers are for controlling deletion behavior, not metadata storage. Environment variables are inside containers and not easily accessible to external tools.\n\nWhy other options are wrong:\n- A: Labels are used for identifying and selecting resources in queries and controllers, not for arbitrary metadata.\n- C: Finalizers control deletion behavior by blocking garbage collection until a process clears them, not for metadata storage.\n- D: Environment variables are inside containers and not easily accessible to external tools inspecting API objects.\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/",
    verify: null
  },
  {
    id: "s01-q096",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a Deployment with `replicas: 3` and a resource request of 500m CPU per Pod. The cluster has 2 nodes, each with 1 CPU allocatable. The team tries to scale to 5 replicas. What happens?",
    diagram: null,
    options: [
      "All 5 replicas start successfully because Kubernetes overcommits CPU (fitting 3 per node at 500m each)",
      "Only 4 replicas can be scheduled; the 5th Pod remains in Pending state without sufficient resources",
      "Kubernetes automatically provisions a new node; the 5th Pod schedules once the node joins",
      "The scale operation is rejected by the API server because it exceeds the cluster capacity"
    ],
    answer: 1,
    explanation: "With 2 nodes of 1 CPU each, the cluster has 2000m total allocatable CPU. Each Pod requests 500m, so 4 Pods can be scheduled (2 per node). The 5th Pod remains in `Pending` state because there is insufficient CPU to satisfy its request. Resource requests are guaranteed allocations, not soft limits. Kubernetes does not auto-provision nodes (that requires a cluster autoscaler). The API server accepts the scale request; scheduling is a separate concern.\n\nWhy other options are wrong:\n- A: Resource requests are guaranteed allocations; 3 × 500m = 1500m exceeds a single node's 1000m capacity, so only 2 Pods fit per node.\n- C: Kubernetes does not automatically provision new nodes; that requires a separate cluster autoscaler.\n- D: The API server accepts the scale request; scheduling is a separate concern handled after.\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
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
      "An error, because Services are generally limited to routing traffic within the cluster network"
    ],
    answer: 1,
    explanation: "An `ExternalName` Service creates a CNAME record in the cluster DNS that maps the Service name to the specified external hostname. No ClusterIP is allocated, and no proxying occurs through kube-proxy. The DNS resolution simply returns the CNAME, and the client connects directly to the external host. This is useful for integrating external services into the Kubernetes service discovery mechanism.\n\nWhy other options are wrong:\n- A: ExternalName Services do not get a ClusterIP and do not proxy traffic.\n- C: kube-proxy does not handle ExternalName resolution; it is purely a DNS CNAME response.\n- D: Services can reference external resources via ExternalName; it is a supported feature.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#externalname",
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
    explanation: "`kubectl exec -it` is the standard command for executing a command inside a running container. The `-i` flag passes stdin, `-t` allocates a TTY, and `-- /bin/sh` starts a shell. `kubectl attach` connects to an already running process, which may not be a shell. `kubectl debug` creates an ephemeral or copy-based debugging environment, which is useful but not the simplest approach. `kubectl logs` only reads output and cannot execute commands.\n\nWhy other options are wrong:\n- A: `kubectl attach` connects to the stdin of an already running process, which may not be a shell.\n- C: `kubectl debug` creates an ephemeral or copy-based debugging environment, which is more complex than exec.\n- D: `kubectl logs` only reads container output; it cannot execute commands inside the container.\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/",
    verify: null
  },
  {
    id: "s01-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team is investigating API server authentication. They discover that Pods can authenticate to the Kubernetes API using tokens. Which mechanism provides these tokens to Pods automatically?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="160" height="50" rx="8" fill="#333" stroke="#326CE5" stroke-width="2"/><text x="100" y="50" text-anchor="middle" fill="white" font-size="12">Pod</text><rect x="220" y="20" width="160" height="50" rx="8" fill="#326CE5" stroke="#fff" stroke-width="2"/><text x="300" y="50" text-anchor="middle" fill="white" font-size="12">API Server</text><rect x="20" y="120" width="160" height="50" rx="8" fill="#FF9800" stroke="#FFD700" stroke-width="1.5"/><text x="100" y="148" text-anchor="middle" fill="white" font-size="11">Auth Mechanism ?</text><line x1="100" y1="70" x2="100" y2="120" stroke="#aaa" stroke-width="1.5"/><line x1="180" y1="45" x2="220" y2="45" stroke="#4CAF50" stroke-width="2"/><text x="200" y="38" fill="#4CAF50" font-size="10">auth</text></svg>',
    options: [
      "The `kube-proxy` generates and distributes authentication tokens to all Pods in the cluster",
      "The `ServiceAccount` resource, which mounts a projected token volume into each Pod",
      "The kubelet generates a unique API key for each Pod and stores it in an environment variable",
      "The container runtime creates a certificate for each container signed by the cluster CA"
    ],
    answer: 1,
    explanation: "Every Pod is associated with a ServiceAccount (the `default` ServiceAccount if none is specified). Kubernetes automatically mounts a projected service account token as a volume at `/var/run/secrets/kubernetes.io/serviceaccount/`. This token can be used to authenticate to the API server. `kube-proxy` does not generate tokens. The kubelet does not create API keys. The container runtime does not handle authentication.\n\nWhy other options are wrong:\n- A: kube-proxy manages network rules for Services; it does not generate or distribute authentication tokens.\n- C: The kubelet does not create API keys for Pods; it mounts projected service account tokens.\n- D: The container runtime executes containers but does not handle authentication or certificate creation.\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/",
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
      "`kubectl create` handles initial creation while `kubectl apply` handles updates, each optimized for its stage",
      "`kubectl apply` only accepts YAML file input; `kubectl create` primarily uses command-line generators for resources"
    ],
    answer: 1,
    explanation: "`kubectl create` is an imperative command that creates a resource and returns an error if it already exists. `kubectl apply` is declarative — it creates the resource if it does not exist, or updates it if it does, by comparing the desired state with the current state. They are not interchangeable. Both can accept YAML input. `kubectl create` can also work with generators (like `kubectl create deployment`), and `kubectl apply` always requires a manifest file or stdin.\n\nWhy other options are wrong:\n- A: They are not identical; `create` is imperative and `apply` is declarative with different behaviors.\n- C: Both can create resources; `kubectl apply` creates if absent and updates if present.\n- D: Both `kubectl create` and `kubectl apply` can accept YAML input; `create` also supports generators.\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/",
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
