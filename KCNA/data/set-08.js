var EXAM_SET = 8;
var EXAM_TITLE = "KCNA Practice Exam - Set 08: Cloud Native Ecosystem & Architecture";
var questions = [
  // ── Batch 1: q001–q025  (K8s=11, CO=6, CNA=4, CNO=2, CAD=2) ──
  {
    id: "s08-q001",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Your organization is evaluating CNCF projects for production adoption. A colleague asks which maturity level indicates the highest degree of adoption, a proven track record, and conformance to CNCF governance. Which CNCF project maturity stage does this describe?",
    diagram: null,
    options: [
      "Sandbox — early-stage projects with minimal adoption and limited production readiness requirements",
      "Incubating — projects demonstrating growing adoption, healthy contributors, and open governance",
      "Graduated — projects with thriving adoption, open governance, and community sustainability",
      "Archived — formerly graduated projects retired from active maintenance and contributor support"
    ],
    answer: 2,
    explanation: "CNCF Graduated projects have met the highest bar of maturity, demonstrating thriving adoption, an open governance process, and adherence to CNCF best practices. Projects such as Kubernetes, Prometheus, and Envoy hold this status. Incubating projects are on the path but have not yet met the full graduation criteria.\n\nWhy other options are wrong:\n- A: Sandbox is the earliest stage with minimal production requirements, not the highest maturity\n- B: Incubating indicates growing adoption but has not yet met full graduation criteria\n- D: Archived projects are retired from active maintenance, not the highest maturity level\n\nReference: https://www.cncf.io/projects/",
    verify: null
  },
  {
    id: "s08-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A DevOps engineer notices that after a Kubernetes cluster upgrade, all DNS resolution inside Pods continues to work seamlessly. Which CNCF graduated project is responsible for providing in-cluster DNS services by default in modern Kubernetes distributions?",
    diagram: null,
    options: [
      "CoreDNS, the default cluster DNS provider since Kubernetes version 1.13",
      "Envoy, acting as a sidecar proxy that intercepts and resolves DNS queries",
      "etcd, which stores DNS records as key-value pairs for Pod name lookups",
      "NATS, which publishes DNS record updates via its messaging bus system"
    ],
    answer: 0,
    explanation: "CoreDNS replaced kube-dns as the default DNS provider starting with Kubernetes 1.13. It is a CNCF graduated project that serves as a flexible, plugin-based DNS server. Envoy is a proxy, etcd is the cluster state store, and NATS is a messaging system.\n\nWhy other options are wrong:\n- B: Envoy is an L7 proxy, not a DNS resolver; it does not intercept DNS queries\n- C: etcd stores cluster state (Pods, Services) not DNS records; CoreDNS reads Service info from API server\n- D: NATS is a messaging system for pub/sub communication, unrelated to DNS resolution\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/coredns/",
    verify: "kubectl get pods -n kube-system -l k8s-app=kube-dns"
  },
  {
    id: "s08-q003",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "Your team is migrating from Docker Engine to a CRI-compliant runtime. The cluster already uses `containerd` as the underlying runtime. After removing Docker, which component serves as the interface between the kubelet and `containerd`?",
    diagram: null,
    options: [
      "The CRI plugin built into `containerd` itself, speaking CRI gRPC directly",
      "A separate `cri-o` daemon that translates CRI calls to `containerd` commands",
      "The `runc` binary, which implements the full CRI specification on its own",
      "The Docker shim (`dockershim`) that was built directly into the kubelet binary"
    ],
    answer: 0,
    explanation: "Since containerd 1.1, a built-in CRI plugin allows containerd to communicate directly with the kubelet via the CRI gRPC interface. The `dockershim` was removed in Kubernetes 1.24. CRI-O is an alternative CRI runtime, not a translation layer for containerd. `runc` is an OCI runtime that creates containers but does not implement CRI.\n\nWhy other options are wrong:\n- B: CRI-O is an independent CRI runtime, not a translation layer between kubelet and containerd\n- C: runc is an OCI runtime that creates containers but does not implement the CRI gRPC interface\n- D: dockershim was removed in Kubernetes 1.24; it is no longer available as an interface\n\nReference: https://kubernetes.io/docs/concepts/architecture/cri/",
    verify: "kubectl get nodes -o wide"
  },
  {
    id: "s08-q004",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An SRE team is debugging a situation where the Kubernetes API server is returning stale data. They suspect the backing datastore is experiencing latency. Which CNCF graduated project serves as the primary datastore for all Kubernetes cluster state?",
    diagram: null,
    options: [
      "Consul, a service mesh and key-value store commonly used for service discovery",
      "Redis, an in-memory data structure store commonly used for caching app data",
      "etcd, a distributed key-value store providing consistent available storage",
      "CockroachDB, a distributed SQL database offering strong data consistency now"
    ],
    answer: 2,
    explanation: "etcd is the CNCF graduated distributed key-value store used by Kubernetes to persist all cluster state, including Pod definitions, ConfigMaps, Secrets, and service accounts. High latency in etcd can cause the API server to return stale data or experience timeouts. Consul, Redis, and CockroachDB are not used as the Kubernetes backing store.\n\nWhy other options are wrong:\n- A: Consul is a HashiCorp service discovery/mesh tool, not the Kubernetes backing store\n- B: Redis is an in-memory cache/data store, not used as K8s cluster state storage\n- D: CockroachDB is a distributed SQL database not used as the Kubernetes datastore\n\nReference: https://kubernetes.io/docs/concepts/overview/components/#etcd",
    verify: "kubectl get pods -n kube-system -l component=etcd"
  },
  {
    id: "s08-q005",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A development team is decomposing a monolithic application into microservices. They need each service to be independently deployable, own its data, and communicate over well-defined APIs. Which design principle is MOST critical for ensuring services can evolve independently?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1e293b" stroke="#334155"/><rect x="30" y="40" width="100" height="50" rx="6" fill="#0f766e" stroke="#14b8a6"/><text x="80" y="70" text-anchor="middle" fill="white" font-size="11">Service A</text><rect x="150" y="40" width="100" height="50" rx="6" fill="#0f766e" stroke="#14b8a6"/><text x="200" y="70" text-anchor="middle" fill="white" font-size="11">Service B</text><rect x="270" y="40" width="100" height="50" rx="6" fill="#0f766e" stroke="#14b8a6"/><text x="320" y="70" text-anchor="middle" fill="white" font-size="11">Service C</text><rect x="30" y="120" width="100" height="40" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="80" y="145" text-anchor="middle" fill="white" font-size="10">DB-A</text><rect x="150" y="120" width="100" height="40" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="200" y="145" text-anchor="middle" fill="white" font-size="10">DB-B</text><rect x="270" y="120" width="100" height="40" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="320" y="145" text-anchor="middle" fill="white" font-size="10">DB-C</text><line x1="80" y1="90" x2="80" y2="120" stroke="#14b8a6" stroke-width="2"/><line x1="200" y1="90" x2="200" y2="120" stroke="#14b8a6" stroke-width="2"/><line x1="320" y1="90" x2="320" y2="120" stroke="#14b8a6" stroke-width="2"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Database-per-Service Pattern</text></svg>',
    options: [
      "Loose coupling — each service exposes a stable API and hides internal implementation",
      "Shared database — all services access a single relational database for consistency",
      "Synchronous RPC only — all inter-service calls must be blocking HTTP requests only",
      "Monolithic deployment — services are packaged together to reduce network overhead cost"
    ],
    answer: 0,
    explanation: "Loose coupling is the foundational principle for microservices independence. Each service owns its data store (database-per-service pattern) and communicates through well-defined API contracts. Shared databases create tight coupling, synchronous-only communication reduces resilience, and monolithic deployment defeats the purpose of microservices.\n\nWhy other options are wrong:\n- B: Shared database creates tight coupling between services, the opposite of independent evolution\n- C: Synchronous-only RPC reduces resilience and creates temporal coupling between services\n- D: Monolithic deployment defeats the purpose of independently deployable microservices\n\nReference: https://kubernetes.io/docs/concepts/services-networking/",
    verify: null
  },
  {
    id: "s08-q006",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A platform engineer is configuring a Kubernetes cluster that uses Cilium as the CNI plugin. They want to enforce network policies at Layer 7 (HTTP). Which statement about Cilium is accurate?",
    diagram: null,
    options: [
      "Cilium relies exclusively on iptables rules and cannot inspect any Layer 7 traffic at all",
      "Cilium is a CNCF incubating project that requires Envoy sidecars in every Pod for basic L3/L4 networking",
      "Cilium replaces kube-proxy but cannot enforce any form of Kubernetes NetworkPolicy rules",
      "Cilium leverages eBPF for networking, observability, and Layer 7 policy enforcement"
    ],
    answer: 3,
    explanation: "Cilium is a CNCF graduated project that uses eBPF (extended Berkeley Packet Filter) technology in the Linux kernel to provide high-performance networking, security, and observability. It can enforce both Layer 3/4 and Layer 7 policies without requiring sidecar proxies. While Cilium can optionally integrate with Envoy for advanced L7 features, it does not mandate sidecars.\n\nWhy other options are wrong:\n- A: Cilium uses eBPF, not exclusively iptables; it can inspect L7 traffic using eBPF and optionally Envoy\n- B: Cilium is CNCF graduated (not incubating) and does not require Envoy sidecars for basic L3/L4\n- C: Cilium can replace kube-proxy AND enforce Kubernetes NetworkPolicy rules\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get pods -n kube-system -l k8s-app=cilium"
  },
  {
    id: "s08-q007",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "Your security team wants runtime threat detection for all containers in the Kubernetes cluster. They need to detect suspicious system calls such as unexpected shell spawns or sensitive file access. Which CNCF graduated project is specifically designed for this purpose?",
    diagram: null,
    options: [
      "OPA (Open Policy Agent) — a general-purpose policy engine for Kubernetes admission control decisions",
      "Falco — a cloud native runtime security tool detecting anomalous behavior via kernel events",
      "Notary — a project for cryptographic signing and verification of container image artifacts integrity",
      "Trivy — a vulnerability scanner for container images, filesystem content, and IaC configuration files"
    ],
    answer: 1,
    explanation: "Falco is a CNCF graduated project that monitors kernel system calls and Kubernetes audit logs to detect runtime threats. It uses rules to identify suspicious activity such as unexpected shell execution, sensitive file reads, or privilege escalation. OPA focuses on policy enforcement at admission time, not runtime syscall monitoring.\n\nWhy other options are wrong:\n- A: OPA is a policy engine for admission control, not runtime syscall monitoring\n- C: Notary is for signing and verifying container image integrity, not runtime threat detection\n- D: Trivy is a vulnerability scanner (by Aqua Security), not a runtime behavior detection tool\n\nReference: https://falco.org/docs/",
    verify: null
  },
  {
    id: "s08-q008",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team is deploying a stateless web application that must maintain exactly 5 replicas. During a rolling update, no more than 1 Pod should be unavailable and up to 2 extra Pods may be created. Which Deployment strategy configuration achieves this?",
    diagram: null,
    options: [
      "`strategy: { type: Recreate }` with `replicas: 5` which terminates all Pods before updating",
      "`strategy: { type: RollingUpdate, rollingUpdate: { maxUnavailable: 5, maxSurge: 0 } }`",
      "`strategy: { type: RollingUpdate, rollingUpdate: { maxUnavailable: 1, maxSurge: 2 } }`",
      "`strategy: { type: BlueGreen, rollingUpdate: { maxUnavailable: 0, maxSurge: 5 } }`"
    ],
    answer: 2,
    explanation: "The `RollingUpdate` strategy with `maxUnavailable: 1` ensures at most one Pod is taken down at a time, while `maxSurge: 2` allows up to two additional Pods beyond the desired count during the update. `Recreate` terminates all Pods before creating new ones. `BlueGreen` is not a native Kubernetes strategy type.\n\nWhy other options are wrong:\n- A: Recreate terminates all Pods first causing downtime; does not allow granular control of unavailability\n- B: maxUnavailable:5 would allow all Pods to be unavailable at once, maxSurge:0 prevents extras\n- D: BlueGreen is not a valid native Kubernetes Deployment strategy type\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl describe deployment <name> | grep -A5 RollingUpdate"
  },
  {
    id: "s08-q009",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A site reliability engineer needs to collect time-series metrics from all microservices running in a Kubernetes cluster. The monitoring system should use a pull-based model, scraping HTTP endpoints exposed by each service. Which CNCF graduated project fits this requirement?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="190" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Prometheus Pull-Based Monitoring</text><rect x="140" y="40" width="120" height="45" rx="6" fill="#b45309" stroke="#f59e0b" stroke-width="2"/><text x="200" y="67" text-anchor="middle" fill="white" font-size="10">Prometheus Server</text><rect x="20" y="130" width="80" height="35" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="60" y="148" text-anchor="middle" fill="white" font-size="9">Svc A /metrics</text><rect x="160" y="130" width="80" height="35" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="200" y="148" text-anchor="middle" fill="white" font-size="9">Svc B /metrics</text><rect x="300" y="130" width="80" height="35" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="340" y="148" text-anchor="middle" fill="white" font-size="9">Svc C /metrics</text><line x1="170" y1="85" x2="60" y2="130" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrProm)"/><line x1="200" y1="85" x2="200" y2="130" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrProm)"/><line x1="230" y1="85" x2="340" y2="130" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrProm)"/><text x="100" y="110" text-anchor="middle" fill="#fcd34d" font-size="8">scrape</text><text x="225" y="110" text-anchor="middle" fill="#fcd34d" font-size="8">scrape</text><text x="300" y="110" text-anchor="middle" fill="#fcd34d" font-size="8">scrape</text><defs><marker id="arrProm" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#f59e0b"/></marker></defs></svg>',
    options: [
      "Fluentd — a unified logging layer that collects and forwards log data to backends",
      "Jaeger — a distributed tracing platform for monitoring microservice request flows",
      "Prometheus — a monitoring system that scrapes metrics from targets via HTTP endpoints",
      "Thanos — a long-term storage solution extending Prometheus with global query capability"
    ],
    answer: 2,
    explanation: "Prometheus is a CNCF graduated monitoring project that uses a pull-based model to scrape metrics from HTTP endpoints (typically `/metrics`). It stores time-series data and provides PromQL for querying. Fluentd handles logs, Jaeger handles tracing, and Thanos extends Prometheus for long-term storage but does not replace its scraping function.\n\nWhy other options are wrong:\n- A: Fluentd is a log aggregation tool, not a metrics collection system\n- B: Jaeger is a distributed tracing platform for request flow analysis, not metrics scraping\n- D: Thanos extends Prometheus with long-term storage but does not replace its scraping function\n\nReference: https://prometheus.io/docs/introduction/overview/",
    verify: "kubectl get pods -n monitoring -l app=prometheus"
  },
  {
    id: "s08-q010",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "Your platform team is implementing GitOps for continuous deployment. They want a Kubernetes-native controller that watches a Git repository and automatically reconciles the cluster state to match the declared manifests. Which pair of CNCF graduated projects are purpose-built for this workflow?",
    diagram: null,
    options: [
      "Argo CD and Flux — GitOps controllers that reconcile cluster resources from Git state",
      "Jenkins and Spinnaker — CI/CD pipelines that push deployment changes to Kubernetes clusters",
      "Helm and Kustomize — templating tools that generate Kubernetes manifests from template files",
      "Tekton and Buildpacks — CI tools that build and package container images from source code"
    ],
    answer: 0,
    explanation: "Argo and Flux are both CNCF graduated projects designed specifically for GitOps workflows. They run as controllers inside the cluster, continuously watching Git repositories and reconciling cluster state to match the declared manifests. Helm and Kustomize are manifest management tools, not GitOps controllers. Jenkins and Spinnaker follow a push-based CI/CD model.\n\nWhy other options are wrong:\n- B: Jenkins and Spinnaker use push-based CI/CD models, not pull-based GitOps reconciliation\n- C: Helm and Kustomize are manifest templating/management tools, not GitOps controllers\n- D: Tekton is a CI/CD pipeline engine and Buildpacks build images; neither is a GitOps controller\n\nReference: https://www.cncf.io/projects/argo/",
    verify: null
  },
  {
    id: "s08-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A data processing team needs to ensure that two Pods are always scheduled on different nodes for high availability. They do not want to use node selectors or taints. Which scheduling feature should they use?",
    diagram: null,
    options: [
      "`podAffinity` with `preferredDuringSchedulingIgnoredDuringExecution` to co-locate Pods on the same node",
      "`nodeAffinity` with `requiredDuringSchedulingIgnoredDuringExecution` specifying a list of node names",
      "`topologySpreadConstraints` with `whenUnsatisfiable: DoNotSchedule` and `maxSkew: 100`",
      "`podAntiAffinity` with `requiredDuringSchedulingIgnoredDuringExecution` matching Pod labels"
    ],
    answer: 3,
    explanation: "Pod anti-affinity with `requiredDuringSchedulingIgnoredDuringExecution` is a hard constraint that prevents Pods matching certain labels from being co-located on the same node. This guarantees the two Pods land on different nodes. Pod affinity co-locates Pods. Node affinity targets specific nodes. A `maxSkew` of 100 would not meaningfully spread Pods.\n\nWhy other options are wrong:\n- A: podAffinity co-locates Pods on the same node, which is the opposite of the requirement\n- B: nodeAffinity targets specific nodes by label, but does not guarantee Pods land on different nodes\n- C: maxSkew:100 is far too large to enforce meaningful distribution across nodes\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.affinity}'"
  },
  {
    id: "s08-q012",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "An architect is designing inter-service communication for a microservices platform on Kubernetes. They need mutual TLS between services, traffic shifting for canary deployments, and per-route retry policies — all without modifying application code. Which approach best addresses these requirements?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="240" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Service Mesh Architecture</text><rect x="30" y="40" width="150" height="80" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-dasharray="4"/><text x="105" y="55" text-anchor="middle" fill="#93c5fd" font-size="9">Pod A</text><rect x="40" y="62" width="60" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="70" y="79" text-anchor="middle" fill="white" font-size="9">App</text><rect x="110" y="62" width="60" height="25" rx="4" fill="#7c3aed" stroke="#a78bfa"/><text x="140" y="79" text-anchor="middle" fill="white" font-size="9">Proxy</text><rect x="220" y="40" width="150" height="80" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-dasharray="4"/><text x="295" y="55" text-anchor="middle" fill="#93c5fd" font-size="9">Pod B</text><rect x="230" y="62" width="60" height="25" rx="4" fill="#7c3aed" stroke="#a78bfa"/><text x="260" y="79" text-anchor="middle" fill="white" font-size="9">Proxy</text><rect x="300" y="62" width="60" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="330" y="79" text-anchor="middle" fill="white" font-size="9">App</text><line x1="140" y1="87" x2="260" y2="87" stroke="#a78bfa" stroke-width="2" marker-end="url(#arrowPurple)"/><text x="200" y="105" text-anchor="middle" fill="#a78bfa" font-size="9">mTLS</text><rect x="120" y="150" width="160" height="40" rx="6" fill="#4a1d96" stroke="#a78bfa"/><text x="200" y="175" text-anchor="middle" fill="white" font-size="10">Control Plane</text><line x1="140" y1="120" x2="180" y2="150" stroke="#a78bfa" stroke-width="1" stroke-dasharray="4"/><line x1="260" y1="120" x2="220" y2="150" stroke="#a78bfa" stroke-width="1" stroke-dasharray="4"/><defs><marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#a78bfa"/></marker></defs></svg>',
    options: [
      "Deploy an API gateway at the cluster ingress to handle all internal service-to-service communication traffic",
      "Add mTLS libraries to each microservice codebase and implement retry logic in application middleware code",
      "Implement a service mesh (e.g., Linkerd or Istio) with sidecar proxies handling mTLS, shifting, and retries",
      "Use Kubernetes NetworkPolicies to encrypt all traffic and configure retries via Pod annotation declarations"
    ],
    answer: 2,
    explanation: "A service mesh injects sidecar proxies alongside each application container, providing mTLS, traffic management (canary shifting, retries), and observability without application code changes. API gateways typically handle north-south traffic, not east-west. NetworkPolicies control traffic flow but do not provide encryption or retry logic natively.\n\nWhy other options are wrong:\n- A: API gateways handle north-south (external) traffic, not east-west (inter-service) communication\n- B: Adding mTLS libraries to each service requires application code changes, violating the requirement\n- D: NetworkPolicies control traffic flow but do not provide encryption, traffic shifting, or retries\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service-mesh/",
    verify: null
  },
  {
    id: "s08-q013",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A junior engineer asks why Kubernetes uses a declarative model rather than an imperative one for managing workloads. Which explanation best captures the advantage of the declarative approach?",
    diagram: null,
    options: [
      "Declarative configuration requires fewer YAML lines, making manifests faster to write and maintain across environments",
      "Users define desired end state, and controllers continuously reconcile actual state, enabling self-healing operations",
      "Imperative commands are unsupported by `kubectl`; only declarative YAML manifests can be applied to the cluster",
      "Declarative configuration bypasses the Kubernetes API server, allowing resources to be written to etcd directly"
    ],
    answer: 1,
    explanation: "The declarative model is central to Kubernetes design. Users specify the desired state (e.g., in YAML manifests), and controllers in the control plane continuously reconcile the actual state to match. This enables self-healing, drift detection, and idempotent apply operations. Imperative commands like `kubectl run` do exist but are not recommended for production management.\n\nWhy other options are wrong:\n- A: Declarative config is not about fewer YAML lines; it is about expressing desired end state\n- C: Imperative commands like kubectl run and kubectl create do exist and are supported\n- D: Declarative config goes through the API server; nothing bypasses it to write directly to etcd\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/",
    verify: null
  },
  {
    id: "s08-q014",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A database team needs to run PostgreSQL on Kubernetes with persistent storage that survives Pod rescheduling. They want storage to be dynamically provisioned when a PersistentVolumeClaim is created. Which Kubernetes resource triggers dynamic provisioning?",
    diagram: null,
    options: [
      "A `PersistentVolume` manually created by the administrator with a matching `storageClassName` field value",
      "A `ConfigMap` that contains the storage backend connection string and credentials for the kubelet daemon",
      "A `VolumeSnapshot` that restores an existing disk to a new PersistentVolume automatically on creation",
      "A `StorageClass` that defines a provisioner, creating PersistentVolumes when PVCs reference its name"
    ],
    answer: 3,
    explanation: "A `StorageClass` defines a provisioner (e.g., `kubernetes.io/aws-ebs`, `pd.csi.storage.gke.io`) and parameters for dynamic volume provisioning. When a PVC references a StorageClass, the provisioner automatically creates a PersistentVolume. Manually created PVs are static provisioning. VolumeSnapshots restore data but require an existing StorageClass for the new PV.\n\nWhy other options are wrong:\n- A: Manually created PVs are static provisioning, not dynamic; the admin pre-creates PVs\n- B: ConfigMaps store configuration data, not storage backend parameters for provisioning\n- C: VolumeSnapshots restore existing data but require an existing StorageClass for the new PV\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/",
    verify: "kubectl get storageclass"
  },
  {
    id: "s08-q015",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A solutions architect is reviewing an application against the twelve-factor app methodology. The application reads its database URL from an environment variable, logs to stdout, and runs the same container image across staging and production. Which twelve-factor principle is violated if the team stores configuration in a checked-in `config.yaml` inside the container image?",
    diagram: null,
    options: [
      "Factor III (Config) — config varying between deploys should be stored in the environment",
      "Factor I (Codebase) — there must be exactly one codebase tracked in version control per app",
      "Factor VI (Processes) — the application should execute as one or more stateless processes",
      "Factor XII (Admin processes) — admin and management tasks should run as one-off processes"
    ],
    answer: 0,
    explanation: "Factor III (Config) of the twelve-factor methodology requires that configuration which varies between environments (database URLs, credentials, feature flags) be stored in environment variables or external configuration stores, not baked into the codebase or container image. Embedding `config.yaml` in the image couples configuration to the build artifact, violating this principle.\n\nWhy other options are wrong:\n- B: Factor I (Codebase) is about one codebase per app in version control, not config management\n- C: Factor VI (Processes) is about stateless processes, not configuration storage\n- D: Factor XII (Admin processes) is about running admin tasks as one-off processes\n\nReference: https://12factor.net/config",
    verify: null
  },
  {
    id: "s08-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team has a CronJob that runs every hour to process batch data. Occasionally, the previous run has not completed when the next one is scheduled. They want to skip the new run if the previous one is still active. Which `concurrencyPolicy` setting achieves this?",
    diagram: null,
    options: [
      "`Allow` — permits concurrent Job runs without any scheduling restriction",
      "`Replace` — terminates the currently running Job and starts the new one",
      "`Forbid` — skips the new Job run if a previous run is still active now",
      "`Queue` — enqueues the new Job to run after the current one completes it"
    ],
    answer: 2,
    explanation: "Setting `concurrencyPolicy: Forbid` on a CronJob causes the scheduler to skip creating a new Job if the previous run is still active. `Allow` lets multiple runs overlap, `Replace` kills the current run, and `Queue` is not a valid concurrencyPolicy value in Kubernetes.\n\nWhy other options are wrong:\n- A: Allow permits concurrent Jobs to overlap without restriction\n- B: Replace terminates the currently running Job and starts the new one immediately\n- D: Queue is not a valid concurrencyPolicy value in Kubernetes CronJob spec\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#concurrency-policy",
    verify: "kubectl get cronjob <name> -o jsonpath='{.spec.concurrencyPolicy}'"
  },
  {
    id: "s08-q017",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod is stuck in `CrashLoopBackOff`. The application logs show it cannot connect to a required external API on port 443. The Pod runs in a namespace with a `default-deny` NetworkPolicy for egress. What is the most likely cause?",
    diagram: null,
    options: [
      "The container image is missing the `curl` binary and TLS libraries needed for outbound HTTPS connections",
      "The Pod's `readinessProbe` is failing because port 443 is not exposed as a containerPort in the Pod spec",
      "Kubernetes DNS cannot resolve the external API hostname due to a missing entry in the CoreDNS ConfigMap",
      "The `default-deny` egress NetworkPolicy blocks all outbound traffic including HTTPS to the external API"
    ],
    answer: 3,
    explanation: "A `default-deny` egress NetworkPolicy blocks all outbound traffic from Pods in the namespace unless explicitly allowed by another policy. The application cannot reach the external API on port 443 because no egress rule permits it. The fix is to create a NetworkPolicy allowing egress to the external API's CIDR on port 443, and also to port 53 for DNS resolution.\n\nWhy other options are wrong:\n- A: Missing curl/TLS libraries would cause application errors, not connectivity blocks from network policy\n- B: readinessProbe failures affect traffic routing, not outbound HTTPS connectivity to external APIs\n- C: DNS resolution issues would show specific DNS errors, not general connection failures to port 443\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n <namespace>"
  },
  {
    id: "s08-q018",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer creates a Service of type `ClusterIP` and notices it is only reachable from within the cluster. They need the service to be accessible from outside the cluster on every node's IP at a static port. Which Service type should they switch to?",
    diagram: null,
    options: [
      "`ExternalName` — maps the Service to an external DNS name via a CNAME record entry",
      "`LoadBalancer` — provisions a cloud load balancer that also allocates a NodePort value",
      "`NodePort` — exposes the Service on a static port on each node's IP address directly",
      "`Headless` — removes the ClusterIP and returns individual Pod IPs directly in DNS"
    ],
    answer: 2,
    explanation: "A `NodePort` Service exposes the application on a static port (default range 30000-32767) on every node's IP address. Traffic sent to `<NodeIP>:<NodePort>` is forwarded to the Service's backing Pods. `LoadBalancer` also works but provisions additional cloud infrastructure. `ExternalName` maps to a CNAME record and `Headless` services return Pod IPs directly.\n\nWhy other options are wrong:\n- A: ExternalName maps a Service to a CNAME DNS record, does not expose on node IPs\n- B: LoadBalancer provisions a cloud LB; while it allocates a NodePort, it adds extra infrastructure\n- D: Headless removes ClusterIP and returns Pod IPs; it does not expose on node IP:port\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.type}'"
  },
  {
    id: "s08-q019",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "An operations team needs a unified logging pipeline that collects logs from all containers, enriches them with Kubernetes metadata, and forwards them to Elasticsearch. Which CNCF graduated project is designed for this log aggregation role?",
    diagram: null,
    options: [
      "Prometheus — scrapes application metrics endpoints and stores them as time-series data",
      "Jaeger — collects distributed traces across microservices for latency analysis tasks",
      "Fluentd — a unified logging layer that collects, transforms, and routes log data",
      "Grafana — a visualization and dashboarding tool for metrics, alerts, and log queries"
    ],
    answer: 2,
    explanation: "Fluentd is a CNCF graduated project that serves as a unified logging layer. It collects logs from various sources, applies filters and transformations (including Kubernetes metadata enrichment), and routes them to backends like Elasticsearch, S3, or Kafka. Prometheus handles metrics, Jaeger handles traces, and Grafana is a visualization tool.\n\nWhy other options are wrong:\n- A: Prometheus scrapes metrics endpoints, not log data\n- B: Jaeger collects distributed traces for latency analysis, not logs\n- D: Grafana is a visualization and dashboarding tool, not a log collection agent\n\nReference: https://www.fluentd.org/architecture",
    verify: "kubectl get pods -n logging -l app=fluentd"
  },
  {
    id: "s08-q020",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "During a control plane audit, an engineer needs to understand the role of the `kube-controller-manager`. Which statement accurately describes its function?",
    diagram: null,
    options: [
      "It serves as the front-end REST API for all cluster operations and authenticates every incoming request to the cluster",
      "It assigns Pods to nodes by evaluating resource requests, taints, tolerations, and affinity rules for optimal placement",
      "It manages the lifecycle of container images by pulling them from registries, caching them on nodes, and garbage collecting",
      "It runs core control loops (ReplicaSet, Deployment, Node controllers) that reconcile actual state toward desired state"
    ],
    answer: 3,
    explanation: "The `kube-controller-manager` runs a set of controller loops that continuously watch the cluster state through the API server and take action to reconcile actual state with desired state. Examples include the ReplicaSet controller (maintains Pod count), the Node controller (detects node failures), and the Deployment controller (manages rollouts). The API server handles requests; the scheduler assigns Pods to nodes.\n\nWhy other options are wrong:\n- A: The API server serves REST API and handles authentication, not the controller manager\n- B: The kube-scheduler assigns Pods to nodes, not the controller manager\n- C: Image management (pull, cache, GC) is handled by the kubelet and container runtime on each node\n\nReference: https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager",
    verify: "kubectl get pods -n kube-system -l component=kube-controller-manager"
  },
  {
    id: "s08-q021",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses Helm to deploy a complex application stack. After running `helm install`, they notice the chart created multiple Kubernetes resources. Which CNCF graduated project is Helm, and what is its primary role?",
    diagram: null,
    options: [
      "Helm is a CNCF graduated project serving as the Kubernetes package manager using charts for applications",
      "Helm is a CNCF sandbox project providing container image building capabilities without requiring Docker",
      "Helm is a CNCF incubating project that manages service mesh configurations and traffic routing policies",
      "Helm is a CNCF graduated project that provides persistent storage management for stateful cluster workloads"
    ],
    answer: 0,
    explanation: "Helm is a CNCF graduated project and the de facto package manager for Kubernetes. It uses charts — collections of templated YAML files — to define, install, version, and upgrade complex Kubernetes applications. Helm simplifies repeatable deployments and enables sharing of application definitions via chart repositories.\n\nWhy other options are wrong:\n- B: Helm is graduated (not sandbox) and is a package manager, not an image builder\n- C: Helm is graduated (not incubating) and manages charts, not service mesh configurations\n- D: Helm manages application charts, not persistent storage; storage is handled by CSI drivers\n\nReference: https://helm.sh/docs/",
    verify: "helm version"
  },
  {
    id: "s08-q022",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A DevOps engineer needs to customize a Helm chart's default configuration without modifying the chart source. They want to override the `replicaCount` and `image.tag` values. What is the recommended approach?",
    diagram: null,
    options: [
      "Edit the `Chart.yaml` file inside the chart archive to change the default version and image tag settings",
      "Modify the chart's `templates/` directory directly and repackage the chart archive before installing it",
      "Pass a custom values file via `helm install -f custom-values.yaml` or use `--set` for overrides",
      "Use `kubectl patch` on the deployed resources after `helm install` completes to override the values"
    ],
    answer: 2,
    explanation: "Helm supports value overrides through custom values files (`-f` / `--values`) or inline `--set` flags. This allows users to customize chart behavior without modifying the chart source. Editing `Chart.yaml` changes chart metadata, not configuration values. Patching resources after install bypasses Helm's release management and can cause drift.\n\nWhy other options are wrong:\n- A: Chart.yaml contains chart metadata (name, version, description), not runtime configuration values\n- B: Modifying templates directly and repackaging violates the principle of chart reusability\n- D: kubectl patch bypasses Helm release management and causes drift between Helm state and cluster\n\nReference: https://helm.sh/docs/chart_template_guide/values_files/",
    verify: "helm get values <release-name>"
  },
  {
    id: "s08-q023",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster administrator wants to reserve a pool of GPU nodes exclusively for machine learning workloads. No other Pods should be scheduled on these nodes. Which mechanism is most appropriate?",
    diagram: null,
    options: [
      "Add a label `gpu=true` and use `nodeSelector` on ML Pods — but this alone does not repel non-ML Pods from GPU nodes",
      "Set `priorityClassName: high` on ML Pods so they always preempt lower-priority workloads from GPU-labeled nodes",
      "Use `podAntiAffinity` on all non-ML Pods to repel them from GPU nodes, requiring changes to every non-ML workload",
      "Apply a taint `gpu=true:NoSchedule` to GPU nodes and add a matching toleration only to ML workload Pod specs"
    ],
    answer: 3,
    explanation: "Taints and tolerations are the correct mechanism for node reservation. A taint with `NoSchedule` effect prevents any Pod that lacks a matching toleration from being scheduled on the node. Only ML Pods with the corresponding toleration can be placed on GPU nodes. `nodeSelector` attracts ML Pods but does not repel others. Priority classes affect preemption, not initial scheduling restrictions.\n\nWhy other options are wrong:\n- A: nodeSelector attracts ML Pods to GPU nodes but does not repel non-ML Pods from them\n- B: priorityClassName affects preemption order, not initial scheduling restrictions on specific nodes\n- C: podAntiAffinity on all non-ML Pods requires modifying every non-ML workload, which is impractical\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    verify: "kubectl describe node <gpu-node> | grep -i taint"
  },
  {
    id: "s08-q024",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security auditor requires that all Pods in a production namespace run as a non-root user and drop all Linux capabilities. With Pod Security Standards (PSS) enforced via the built-in admission controller, which profile meets this requirement?",
    diagram: null,
    options: [
      "`restricted` — requires non-root execution, drops all capabilities, disallows escalation",
      "`baseline` — prevents known privilege escalations but permits containers to run as root",
      "`privileged` — allows unrestricted Pod access with no security restrictions or enforcement",
      "`audit` — logs security violations in the API server logs but does not enforce any rules"
    ],
    answer: 0,
    explanation: "The `restricted` Pod Security Standard is the most hardened built-in profile. It requires containers to run as non-root, drop all capabilities, and disallow privilege escalation. Note that `readOnlyRootFilesystem` is recommended but not required by the restricted profile — it is a best practice rather than an enforced control. The `baseline` profile prevents known escalation vectors but is less strict. `audit` is an enforcement mode, not a profile level.\n\nWhy other options are wrong:\n- B: Baseline prevents known escalations but permits running as root, which is less strict\n- C: Privileged allows unrestricted access with no security enforcement at all\n- D: Audit is an enforcement mode (alongside enforce and warn), not a security profile level\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
    verify: "kubectl get namespace <ns> -o jsonpath='{.metadata.labels}'"
  },
  {
    id: "s08-q025",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team wants to deploy event-driven workloads on Kubernetes that automatically scale to zero when idle and scale up on incoming HTTP requests or CloudEvents. Which CNCF graduated project provides this serverless capability on top of Kubernetes?",
    diagram: null,
    options: [
      "Knative — a CNCF graduated project providing serverless Serving and Eventing with scale-to-zero on Kubernetes",
      "Argo Workflows — orchestrates multi-step DAG-based CI/CD workflows on Kubernetes pods",
      "KEDA — a CNCF graduated event-driven autoscaler triggering Pod scaling from external sources",
      "OpenFaaS — an open-source serverless framework deploying functions as containers on K8s"
    ],
    answer: 0,
    explanation: "Knative is a CNCF graduated project that extends Kubernetes with serverless capabilities. Knative Serving handles request-driven auto-scaling (including scale-to-zero) natively from HTTP requests, while Knative Eventing provides a framework for event-driven architectures using CloudEvents. While both Knative and KEDA are CNCF graduated, KEDA is an autoscaler that plugs into Deployments/Jobs and requires add-ons (like the KEDA HTTP add-on) for HTTP-triggered scale-to-zero. Knative provides the full serverless platform (Serving + Eventing) out of the box.\n\nWhy other options are wrong:\n- B: Argo Workflows orchestrates DAG-based CI/CD pipelines, not serverless workloads with scale-to-zero\n- C: KEDA is an event-driven autoscaler but needs add-ons for HTTP scale-to-zero; not a full serverless platform\n- D: OpenFaaS is an open-source FaaS framework but is not a CNCF graduated project\n\nReference: https://knative.dev/docs/",
    verify: "kubectl get pods -n knative-serving"
  },
  // ── Batch 2: q026–q050  (K8s=12, CO=5, CNA=4, CNO=2, CAD=2) ──
  {
    id: "s08-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A platform engineer examines the Kubernetes API server's RESTful interface. They need to list all Pods across every namespace using a single API call. Which `kubectl` flag achieves this, and what API path does it correspond to?",
    diagram: null,
    options: [
      "`kubectl get pods --all-namespaces` which corresponds to `GET /api/v1/pods`",
      "`kubectl get pods --namespace=*` which corresponds to `GET /api/v1/namespaces/*/pods`",
      "`kubectl get pods --global` which corresponds to `GET /apis/global/v1/pods`",
      "`kubectl get pods --cluster-scope` which corresponds to `GET /api/v1/cluster/pods`"
    ],
    answer: 0,
    explanation: "The `--all-namespaces` (or `-A`) flag instructs kubectl to list resources across all namespaces. Under the hood, this maps to the API path `GET /api/v1/pods` without a namespace qualifier, which returns Pods from every namespace. The other flags (`--namespace=*`, `--global`, `--cluster-scope`) do not exist in kubectl.\n\nWhy other options are wrong:\n- B: --namespace=* is not a valid kubectl flag; wildcard namespace syntax is not supported\n- C: --global is not a valid kubectl flag; no such API path exists\n- D: --cluster-scope is not a valid kubectl flag; Pods are namespace-scoped resources\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_get/",
    verify: "kubectl get pods --all-namespaces"
  },
  {
    id: "s08-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An SRE is reviewing the control plane components after a cluster upgrade. They notice that `kube-scheduler` is responsible for Pod placement decisions. Which factor does the scheduler NOT consider when selecting a node for a new Pod?",
    diagram: null,
    options: [
      "Node resource capacity and existing resource requests from already scheduled Pods",
      "Taints configured on the node and corresponding tolerations declared on the Pod",
      "Pod affinity and anti-affinity rules specified in the Pod's scheduling spec fields",
      "The container image pull time from the registry to each candidate node on the list"
    ],
    answer: 3,
    explanation: "The `kube-scheduler` evaluates node resources, taints/tolerations, affinity/anti-affinity rules, topology spread constraints, and priority/preemption. It does not consider container image pull time or network latency to registries. Image pulling happens after scheduling, when the kubelet on the chosen node pulls the image.\n\nWhy other options are wrong:\n- A: Node resource capacity and existing requests are core factors the scheduler evaluates (it does consider this)\n- B: Taints and tolerations are a key filter in the scheduler's filtering phase (it does consider this)\n- C: Pod affinity and anti-affinity rules are evaluated during both filtering and scoring phases (it does consider this)\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/",
    verify: "kubectl get pods -n kube-system -l component=kube-scheduler"
  },
  {
    id: "s08-q028",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A team is troubleshooting container startup failures. They learn that `containerd` delegates the actual creation of Linux containers to a lower-level OCI runtime. Which binary does `containerd` invoke by default to create and run containers?",
    diagram: null,
    options: [
      "`runc` — the reference OCI runtime specification implementation binary",
      "`dockerd` — the Docker daemon that manages full container lifecycle ops",
      "`cri-o` — an alternative CRI runtime implementation for Kubernetes nodes",
      "`podman` — a daemonless container engine for running OCI containers cli"
    ],
    answer: 0,
    explanation: "`containerd` uses `runc` as its default OCI runtime to create and run containers. `runc` is the reference implementation of the OCI Runtime Specification, handling the low-level Linux kernel operations (namespaces, cgroups, seccomp). `dockerd` is the Docker daemon, `cri-o` is a separate CRI implementation, and `podman` is a standalone container engine.\n\nWhy other options are wrong:\n- B: dockerd is the Docker daemon, a higher-level runtime; containerd does not invoke it\n- C: CRI-O is an alternative CRI runtime implementation, not a binary invoked by containerd\n- D: podman is a standalone daemonless container engine, not invoked by containerd\n\nReference: https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd",
    verify: "ctr --version && runc --version"
  },
  {
    id: "s08-q029",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A company uses Envoy as their edge proxy and also as sidecar proxies within their service mesh. Which statement about Envoy is correct?",
    diagram: null,
    options: [
      "Envoy is a CNCF graduated L7 proxy with service discovery, load balancing, TLS, and gRPC support",
      "Envoy is a CNCF incubating project used as a container runtime for managing workloads on K8s nodes",
      "Envoy is a CNCF graduated monitoring tool that scrapes and aggregates metrics from app endpoints",
      "Envoy is a CNCF sandbox project that provides DNS resolution and service discovery for clusters"
    ],
    answer: 0,
    explanation: "Envoy is a CNCF graduated high-performance L4/L7 proxy originally developed at Lyft. It supports dynamic configuration via xDS APIs, advanced load balancing, circuit breaking, TLS termination, and native support for HTTP/2 and gRPC. It is widely used as a data plane proxy in service meshes like Istio and as an edge/API gateway.\n\nWhy other options are wrong:\n- B: Envoy is graduated (not incubating) and is a proxy, not a container runtime\n- C: Envoy is a proxy, not a monitoring tool; Prometheus is the CNCF monitoring project\n- D: Envoy is graduated (not sandbox) and is a proxy, not a DNS/service discovery tool\n\nReference: https://www.envoyproxy.io/docs/envoy/latest/",
    verify: null
  },
  {
    id: "s08-q030",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A distributed e-commerce platform uses the Saga pattern to handle a multi-step order process: reserve inventory, charge payment, and ship order. A central order service coordinates the multi-step process, directing each service when to act. If the payment step fails, the system must compensate by releasing the reserved inventory. Which type of Saga is described here?",
    diagram: null,
    options: [
      "Choreography-based Saga — each service listens for events and performs its step or compensation autonomously",
      "Orchestration-based Saga — a central orchestrator directs each step and triggers compensations on failure",
      "Two-phase commit — a coordinator locks all resources across services until all participants agree to commit",
      "Event sourcing — all state changes are stored as immutable events and replayed to determine current state"
    ],
    answer: 1,
    explanation: "The scenario describes an orchestration-based Saga where a central controller directs the sequence of steps and triggers compensating actions (releasing inventory) when a step fails. In choreography-based Sagas, services react to events without a central coordinator. Two-phase commit uses distributed locking (not compensation). Event sourcing is a data persistence pattern, not a transaction coordination pattern.\n\nWhy other options are wrong:\n- A: Choreography-based Sagas have no central coordinator; services react autonomously to events\n- C: Two-phase commit uses distributed locking, not compensation; it is a blocking protocol\n- D: Event sourcing is a data persistence pattern storing state changes as events, not a coordination pattern\n\nReference: https://microservices.io/patterns/data/saga.html",
    verify: null
  },
  {
    id: "s08-q031",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team needs to run a log collection agent on every node in the cluster, including nodes added later. If a node is removed, the agent Pod should be cleaned up automatically. Which workload resource is designed for this pattern?",
    diagram: null,
    options: [
      "Deployment with `replicas` set to the current node count and manually adjusted as nodes change",
      "DaemonSet — ensures exactly one Pod copy runs on every (or selected subset of) cluster node(s)",
      "StatefulSet with `podManagementPolicy: Parallel` and replicas matching the current node count",
      "Job with `completions` equal to the number of nodes and `parallelism` set to the total node count"
    ],
    answer: 1,
    explanation: "A DaemonSet ensures that a copy of a Pod runs on every node in the cluster (or a subset, when using node selectors or tolerations). When nodes are added, the DaemonSet controller automatically schedules a Pod. When nodes are removed, the Pod is garbage collected. Deployments do not automatically match the node count, and Jobs are for finite workloads.\n\nWhy other options are wrong:\n- A: Deployment replicas must be manually adjusted when nodes change; no auto-tracking of node count\n- C: StatefulSet maintains stable identities but does not auto-match node count or track node changes\n- D: Job is for finite workloads with a defined end; it does not run continuously on every node\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/",
    verify: "kubectl get daemonset -n kube-system"
  },
  {
    id: "s08-q032",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A microservices team is debugging a latency spike in their order processing pipeline. They need to visualize the full request path across 8 services, identifying which service introduces the most delay. Which CNCF graduated project provides distributed tracing for this use case?",
    diagram: null,
    options: [
      "Jaeger — a distributed tracing system for monitoring and troubleshooting microservices",
      "Fluentd — aggregates container log data and forwards it to centralized storage backends",
      "Prometheus — collects time-series metrics from service endpoints via HTTP scrape targets",
      "Cortex — provides horizontally scalable long-term storage for Prometheus metric series"
    ],
    answer: 0,
    explanation: "Jaeger is a CNCF graduated distributed tracing platform that helps monitor request flows across microservices. It captures trace spans for each service hop, enabling engineers to identify latency bottlenecks, dependency issues, and error propagation. Prometheus collects metrics, Fluentd handles logs, and Cortex is a Prometheus long-term storage backend.\n\nWhy other options are wrong:\n- B: Fluentd aggregates logs, not distributed traces\n- C: Prometheus collects time-series metrics, not request-level traces\n- D: Cortex provides scalable Prometheus storage, not distributed tracing\n\nReference: https://www.jaegertracing.io/docs/",
    verify: null
  },
  {
    id: "s08-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An engineer is configuring an Ingress resource to route traffic from `app.example.com/api` to an `api-service` and `app.example.com/web` to a `web-service`. Which Kubernetes resource works alongside the Ingress to actually process the routing rules?",
    diagram: null,
    options: [
      "A NetworkPolicy that allows inbound traffic on port 80 and 443 from external client source IPs",
      "An Ingress Controller (e.g., NGINX or Envoy-based) that reads Ingress rules and configures proxy",
      "The `kube-proxy` component that implements Service routing via iptables or IPVS on each cluster node",
      "CoreDNS, which resolves `app.example.com` to the cluster's external IP address for traffic routing"
    ],
    answer: 1,
    explanation: "An Ingress resource is just a set of routing rules. An Ingress Controller — such as the NGINX Ingress Controller, Traefik, or an Envoy-based controller — must be deployed to read these rules and configure a reverse proxy to handle traffic routing. Without an Ingress Controller, Ingress resources have no effect. `kube-proxy` handles Service-level routing, not HTTP path-based routing.\n\nWhy other options are wrong:\n- A: NetworkPolicies control Pod-to-Pod traffic, not HTTP path-based routing from external clients\n- C: kube-proxy handles Service-level L4 routing, not HTTP path-based L7 routing for Ingress\n- D: CoreDNS resolves DNS names but does not process HTTP path-based routing rules\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/",
    verify: "kubectl get ingress"
  },
  {
    id: "s08-q034",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A Kubernetes cluster uses Calico as the CNI plugin. An engineer notices that Pods on different nodes can communicate without NAT. Which fundamental Kubernetes networking requirement does this demonstrate?",
    diagram: null,
    options: [
      "Every Pod must share the same IP address as its host node to avoid unnecessary routing complexity across the cluster",
      "Pods must use a Service ClusterIP to communicate with Pods on other nodes since direct Pod-to-Pod traffic is blocked",
      "Only Pods in the same namespace can communicate directly; any cross-namespace traffic requires an Ingress resource rule",
      "All Pods can communicate across nodes without NAT, and each Pod receives its own unique cluster-routable IP address"
    ],
    answer: 3,
    explanation: "The Kubernetes networking model requires that every Pod gets its own unique IP address and that all Pods can communicate with each other across nodes without NAT. This flat networking model is implemented by CNI plugins like Calico, Cilium, Flannel, and Weave Net. Services provide stable endpoints, but direct Pod-to-Pod communication is the baseline requirement.\n\nWhy other options are wrong:\n- A: Pods get their own unique IP, not the host node's IP; Pod IPs are distinct from node IPs\n- B: Direct Pod-to-Pod communication is the baseline requirement; Services provide stable endpoints on top\n- C: Cross-namespace Pod communication is allowed by default; no Ingress resource is needed\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    verify: "kubectl get pods -o wide"
  },
  {
    id: "s08-q035",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer deploys a Pod with two containers: an application container and a sidecar that collects logs. Both containers share the same network namespace. What does this shared network namespace mean in practice?",
    diagram: null,
    options: [
      "Both containers share the same IP address and can communicate via `localhost`, but they must use different ports",
      "Both containers share the same filesystem and can access each other's files without requiring any volume mounts",
      "Both containers share CPU and memory limits so resource requests apply to the Pod as a whole not individual containers",
      "Both containers are automatically restarted together if either container fails a configured health check probe"
    ],
    answer: 0,
    explanation: "Containers within the same Pod share the network namespace, meaning they share the same IP address and port space. They can communicate with each other using `localhost` but must bind to different ports to avoid conflicts. Filesystems are separate unless shared via volumes. Resource requests are specified per container, not per Pod.\n\nWhy other options are wrong:\n- B: Containers have separate filesystems; sharing requires explicit emptyDir or other volume mounts\n- C: Resource requests and limits are specified per container, not shared at the Pod level\n- D: Container restarts are managed individually; a failing liveness probe restarts only that container\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/#pod-networking",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.podIP}'"
  },
  {
    id: "s08-q036",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A team is building a CI/CD pipeline that must run inside the Kubernetes cluster as a series of steps, each in its own container. They want a Kubernetes-native pipeline engine. Which project provides custom resources like `Task`, `Pipeline`, and `PipelineRun`?",
    diagram: null,
    options: [
      "Jenkins X — an opinionated CI/CD platform using Jenkins pipelines with Kubernetes cluster integration",
      "Argo CD — a GitOps continuous delivery tool that syncs Git repository state to Kubernetes clusters",
      "Tekton — a Kubernetes-native CI/CD framework defining pipelines via CRDs like `Task` and `Run`",
      "Flux — a GitOps toolkit that reconciles Kubernetes cluster state from Git repositories continuously"
    ],
    answer: 2,
    explanation: "Tekton is a Kubernetes-native CI/CD framework (a CD Foundation project) that defines pipeline components as Custom Resources: `Task` (a sequence of steps), `Pipeline` (a graph of Tasks), `TaskRun` and `PipelineRun` (execution instances). Each step runs in its own container within a Pod. Argo CD and Flux are GitOps tools, not pipeline engines.\n\nWhy other options are wrong:\n- A: Jenkins X uses Jenkins pipelines with K8s integration but is not Kubernetes-native CRD-based\n- B: Argo CD is a GitOps tool that syncs Git to clusters, not a CI/CD pipeline engine with Task CRDs\n- D: Flux is a GitOps reconciliation toolkit, not a pipeline engine with Task/PipelineRun resources\n\nReference: https://tekton.dev/docs/",
    verify: "kubectl get tasks.tekton.dev"
  },
  {
    id: "s08-q037",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team wants to release a new version of their API to exactly 10% of production traffic, monitor error rates for 30 minutes, and then either promote or roll back. Which deployment strategy best fits this requirement?",
    diagram: null,
    options: [
      "Recreate — terminate all old Pods before launching new ones, resulting in a brief downtime window period",
      "Canary — shift a small traffic percentage to the new version while monitoring metrics before rollout",
      "Blue-green — run two full environments simultaneously and switch the load balancer at once for cutover",
      "Rolling update — replace Pods one by one in sequence until all instances are running the new version"
    ],
    answer: 1,
    explanation: "A canary deployment sends a small percentage of traffic (e.g., 10%) to the new version while the majority continues hitting the stable version. This allows the team to monitor error rates, latency, and other SLIs before deciding to promote or roll back. Blue-green switches all traffic at once, and rolling updates incrementally replace all Pods without fine-grained traffic control.\n\nWhy other options are wrong:\n- A: Recreate terminates all old Pods before creating new ones, causing downtime not traffic percentage control\n- C: Blue-green switches all traffic at once via selector change, not gradual percentage-based shifting\n- D: Rolling update replaces Pods sequentially but without fine-grained traffic percentage control\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment",
    verify: null
  },
  {
    id: "s08-q038",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A machine learning team deploys a model training Job that occasionally fails due to transient GPU errors. They want the Job to retry up to 4 times before being marked as failed. Which Job spec field controls this behavior?",
    diagram: null,
    options: [
      "`activeDeadlineSeconds: 240` — limits the total Job runtime to exactly 4 minutes",
      "`completions: 4` — requires 4 successful completions before the Job is finished",
      "`parallelism: 4` — runs 4 Pods simultaneously to increase success probability",
      "`backoffLimit: 4` — allows the Job to retry up to 4 times before marking failed"
    ],
    answer: 3,
    explanation: "The `backoffLimit` field specifies the number of retries before a Job is considered failed. Setting `backoffLimit: 4` means Kubernetes will retry the Job up to 4 times with exponential backoff. `activeDeadlineSeconds` limits total runtime, `completions` sets the required number of successful completions, and `parallelism` controls concurrent Pod execution.\n\nWhy other options are wrong:\n- A: activeDeadlineSeconds limits total Job runtime duration, not retry count\n- B: completions sets the number of successful completions needed, not the retry count\n- C: parallelism controls concurrent Pod count, not retry behavior on failure\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#pod-backoff-failure-policy",
    verify: "kubectl get job <job-name> -o jsonpath='{.spec.backoffLimit}'"
  },
  {
    id: "s08-q039",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "An organization uses Open Policy Agent (OPA) Gatekeeper to enforce custom policies in their Kubernetes cluster. A policy requires that all container images come from an approved registry (`registry.corp.com`). At which point in the request lifecycle does Gatekeeper evaluate this policy?",
    diagram: null,
    options: [
      "At runtime, by monitoring running container processes and blocking any unauthorized container images",
      "At scheduling time, when the kube-scheduler assigns the Pod to a specific node in the cluster",
      "At image pull time, when the kubelet on the node attempts to download the image from the registry",
      "During admission, as a validating webhook that intercepts API requests before persistence to etcd"
    ],
    answer: 3,
    explanation: "OPA Gatekeeper operates as a Kubernetes validating admission webhook. It intercepts API requests (such as Pod creation) during the admission phase — after authentication and authorization but before the resource is persisted to etcd. If the container image does not match the approved registry pattern, Gatekeeper rejects the request. This prevents non-compliant resources from ever being created.\n\nWhy other options are wrong:\n- A: Gatekeeper operates at admission time, not at runtime monitoring of running containers\n- B: The scheduler assigns Pods to nodes after admission; Gatekeeper acts before scheduling\n- C: Image pull happens after admission and scheduling; Gatekeeper blocks before persistence to etcd\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
    verify: "kubectl get constrainttemplates"
  },
  {
    id: "s08-q040",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster has nodes labeled `topology.kubernetes.io/zone=us-east-1a` and `topology.kubernetes.io/zone=us-east-1b`. A team wants to spread their 6-replica Deployment evenly across zones, tolerating at most 1 Pod imbalance. Which feature achieves this?",
    diagram: null,
    options: [
      "`nodeAffinity` with preferred scheduling that weights zone labels equally across all available nodes in the cluster",
      "`topologySpreadConstraints` with `maxSkew: 1`, `topologyKey: topology.kubernetes.io/zone`, and `DoNotSchedule`",
      "`podAntiAffinity` with required scheduling to prevent any two Pods from being placed in the same availability zone",
      "`resourceQuota` per zone namespace to limit the maximum number of Pods allowed in each availability zone segment"
    ],
    answer: 1,
    explanation: "`topologySpreadConstraints` allow fine-grained control over how Pods are distributed across topology domains (zones, nodes, regions). Setting `maxSkew: 1` means the difference in Pod count between any two zones cannot exceed 1. With `whenUnsatisfiable: DoNotSchedule`, the scheduler will not place a Pod if it would violate the constraint. Pod anti-affinity with `required` would prevent any co-location, which is too restrictive for 6 replicas across 2 zones.\n\nWhy other options are wrong:\n- A: nodeAffinity preferred weights attract Pods to nodes but do not enforce even distribution across zones\n- C: podAntiAffinity required would prevent any two Pods in the same zone, too restrictive for 6 replicas/2 zones\n- D: ResourceQuota limits aggregate resource usage in a namespace, not Pod count per topology zone\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    verify: "kubectl get pods -o wide -l app=<app-name>"
  },
  {
    id: "s08-q041",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is refactoring their application to follow the twelve-factor app methodology. Factor VI states that the app should execute as one or more stateless processes. Which practice violates this factor?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="170" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Factor VI: Stateless Processes</text><rect x="30" y="45" width="90" height="40" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="75" y="62" text-anchor="middle" fill="white" font-size="9">Instance 1</text><text x="75" y="75" text-anchor="middle" fill="#fca5a5" font-size="7">session in mem</text><rect x="155" y="45" width="90" height="40" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="200" y="62" text-anchor="middle" fill="white" font-size="9">Instance 2</text><text x="200" y="75" text-anchor="middle" fill="#fca5a5" font-size="7">session in mem</text><rect x="280" y="45" width="90" height="40" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="325" y="62" text-anchor="middle" fill="white" font-size="9">Instance 3</text><text x="325" y="75" text-anchor="middle" fill="#fca5a5" font-size="7">session in mem</text><text x="200" y="105" text-anchor="middle" fill="#ef4444" font-size="10">X Violation: sticky sessions</text><rect x="120" y="120" width="160" height="35" rx="6" fill="#1e40af" stroke="#3b82f6"/><text x="200" y="142" text-anchor="middle" fill="white" font-size="9">Redis (shared session store)</text><text x="200" y="162" text-anchor="middle" fill="#6ee7b7" font-size="9">Correct: externalize state</text></svg>',
    options: [
      "Storing session data in a Redis cluster shared by all running application instances in the environment",
      "Keeping user session data in local process memory, causing session loss if the instance is restarted",
      "Using environment variables to inject configuration values into the application process at startup",
      "Writing application logs to stdout so they can be captured by external logging infrastructure tools"
    ],
    answer: 1,
    explanation: "Factor VI (Processes) requires that applications execute as stateless processes. Any data that needs to persist must be stored in a stateful backing service (e.g., a database or Redis). Keeping session data in local process memory (sticky sessions) violates this principle because the data is lost when the process restarts or is rescheduled. Using Redis for sessions, environment-based config, and stdout logging all conform to twelve-factor principles.\n\nWhy other options are wrong:\n- A: Storing session data in Redis is correct because it externalizes state to a backing service\n- C: Using environment variables for config injection is Factor III compliance, not a violation\n- D: Writing logs to stdout follows Factor XI (Logs) and does not violate Factor VI\n\nReference: https://12factor.net/processes",
    verify: null
  },
  {
    id: "s08-q042",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team is configuring Prometheus to scrape metrics from a new microservice. The service exposes a `/metrics` endpoint returning data in Prometheus exposition format. To enable automatic discovery, they add Pod annotations. Which annotation pair does Prometheus (with standard Kubernetes SD configuration) typically look for?",
    diagram: null,
    options: [
      "`prometheus.io/scrape: \"true\"` and `prometheus.io/port: \"8080\"` on the Pod metadata annotations",
      "`monitoring.k8s.io/enabled: \"true\"` and `monitoring.k8s.io/endpoint: \"/metrics\"` on the Service",
      "`observability.cncf.io/type: prometheus` and `observability.cncf.io/interval: 30s` on the Deployment",
      "`metrics.kubernetes.io/scrape: \"true\"` and `metrics.kubernetes.io/path: \"/metrics\"` on the Namespace"
    ],
    answer: 0,
    explanation: "The standard Prometheus Kubernetes service discovery configuration uses relabeling rules that look for `prometheus.io/scrape: \"true\"` to enable scraping and `prometheus.io/port` to specify the metrics port. Additional annotations like `prometheus.io/path` can override the default `/metrics` path. These are conventions, not built-in Kubernetes features, and must be configured in the Prometheus scrape config.\n\nWhy other options are wrong:\n- B: monitoring.k8s.io/enabled is not a standard Prometheus annotation convention\n- C: observability.cncf.io/type is not a real annotation; CNCF does not define such annotations\n- D: metrics.kubernetes.io/scrape is not a standard Prometheus annotation; it is fabricated\n\nReference: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.metadata.annotations}'"
  },
  {
    id: "s08-q043",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer creates a headless Service (`clusterIP: None`) for a StatefulSet running a distributed database. What behavior does the headless Service provide that a normal ClusterIP Service does not?",
    diagram: null,
    options: [
      "It returns individual Pod IP addresses in DNS A/AAAA records instead of a single virtual IP address",
      "It exposes the Service on every node's IP address on a random high port for external access to Pods",
      "It forwards traffic to Pods in other namespaces by creating cross-namespace endpoint slice resources",
      "It load-balances traffic across Pods using round-robin at the kernel level via iptables or IPVS rules"
    ],
    answer: 0,
    explanation: "A headless Service (`clusterIP: None`) does not allocate a virtual IP. Instead, DNS queries for the Service return the IP addresses of all backing Pods as individual A/AAAA records. For StatefulSets, each Pod also gets a stable DNS name (e.g., `pod-0.service.namespace.svc.cluster.local`). This allows clients to discover and connect to specific Pods, which is essential for stateful applications.\n\nWhy other options are wrong:\n- B: Headless Services do not expose on node IPs; that is NodePort behavior\n- C: Headless Services do not create cross-namespace endpoints; they return Pod IPs in the same namespace\n- D: Headless Services do not perform kernel-level load balancing; there is no virtual IP to balance on\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.clusterIP}'"
  },
  {
    id: "s08-q044",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team runs an Elasticsearch cluster on Kubernetes using a StatefulSet with PersistentVolumeClaims. When they scale down from 5 to 3 replicas, they notice the PVCs for the removed Pods still exist. What is the default behavior regarding PVC retention when scaling down a StatefulSet?",
    diagram: null,
    options: [
      "PVCs are automatically deleted when the corresponding StatefulSet Pod is removed during scale-down",
      "PVCs are archived to a backup StorageClass and can be restored with a `kubectl restore` command",
      "PVCs are retained by default when Pods are removed, preserving data for future scale-up operations",
      "PVCs are orphaned and become unbound PersistentVolumes that must be manually reclaimed"
    ],
    answer: 2,
    explanation: "By default, Kubernetes retains PVCs created by a StatefulSet's `volumeClaimTemplates` when Pods are deleted or the StatefulSet is scaled down. This preserves data so that when the StatefulSet scales back up, the new Pods reattach to their original PVCs. Kubernetes 1.27+ introduced `persistentVolumeClaimRetentionPolicy` to allow configuring automatic PVC deletion on scale-down or StatefulSet deletion.\n\nWhy other options are wrong:\n- A: PVCs are NOT automatically deleted on scale-down; they are retained by default\n- B: There is no backup StorageClass or kubectl restore command for automatic PVC archival\n- D: PVCs remain bound to the PVs; they are not orphaned or made unbound on scale-down\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get pvc -l app=elasticsearch"
  },
  {
    id: "s08-q045",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An engineer is investigating why a ConfigMap change is not reflected in a running Pod. The Pod mounts the ConfigMap as an environment variable. Which statement explains this behavior?",
    diagram: null,
    options: [
      "ConfigMap updates are never propagated to running Pods regardless of how they are consumed by containers in the Pod specification",
      "ConfigMap changes require deleting and recreating the ConfigMap resource from scratch before any updates will take effect in Pods",
      "Env vars from ConfigMaps are set at Pod creation and not updated without restart; volume mounts are eventually refreshed",
      "The kubelet polls ConfigMap changes every 5 seconds and automatically refreshes both environment variables and volume-mounted data"
    ],
    answer: 2,
    explanation: "When a ConfigMap is consumed as an environment variable, the value is injected at Pod startup and remains static for the Pod's lifetime. A Pod restart is required to pick up changes. In contrast, ConfigMaps mounted as volumes are updated by the kubelet periodically (with a configurable sync period, defaulting to about 60 seconds). This is a key distinction for configuration management.\n\nWhy other options are wrong:\n- A: Volume-mounted ConfigMaps ARE eventually propagated to running Pods; not all methods are static\n- B: ConfigMaps can be updated in place; deleting and recreating is not required\n- D: The kubelet sync period defaults to ~60s, not 5s; and env vars are never refreshed automatically\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: "kubectl describe pod <pod-name>"
  },
  {
    id: "s08-q046",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "After a network partition isolates a worker node from the control plane, the node controller marks the node as `NotReady` and applies a `node.kubernetes.io/unreachable:NoExecute` taint. What happens to the Pods on that node once their `tolerationSeconds` (default 300 seconds) expires?",
    diagram: null,
    options: [
      "The node controller evicts Pods by setting status to `Terminating` and the ReplicaSet creates replacements",
      "The kube-scheduler immediately reschedules all Pods to other available nodes without waiting for any timeout period",
      "The Pods continue running indefinitely on the isolated node and are never rescheduled to other healthy cluster nodes",
      "The kubelet on the isolated node detects the network partition itself and gracefully shuts down all running Pods"
    ],
    answer: 0,
    explanation: "When a node becomes `NotReady` after the node-monitor-grace-period (default 40s), the node controller almost immediately applies the `node.kubernetes.io/unreachable:NoExecute` taint. Once the taint is applied, each Pod's `tolerationSeconds` (default 300s) countdown begins. When that timer expires, the Pod is evicted — marked as `Terminating` — and controllers like ReplicaSet create replacement Pods on healthy nodes. The actual containers on the isolated node may continue running until the partition heals and the kubelet processes the deletion.\n\nWhy other options are wrong:\n- B: The scheduler does not immediately reschedule; it waits for tolerationSeconds (default 300s) to expire\n- C: Pods are eventually evicted after tolerationSeconds expires; they do not run indefinitely\n- D: The kubelet on the isolated node cannot detect the partition itself; the control plane manages eviction\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#taint-based-evictions",
    verify: "kubectl get nodes"
  },
  {
    id: "s08-q047",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod is in `ImagePullBackOff` state. The container spec shows `image: internal-registry.corp.com/app:v2.1`. The image exists in the registry. What is the most likely cause?",
    diagram: null,
    options: [
      "The container port specified in the Pod spec conflicts with another container in the same Pod causing a bind error",
      "The `kube-scheduler` cannot find a node with enough available resources to schedule and pull the image properly",
      "The node lacks network access to `internal-registry.corp.com` or the Pod lacks a valid `imagePullSecret` for it",
      "The `containerd` runtime does not support pulling images from private registries that require authentication creds"
    ],
    answer: 2,
    explanation: "`ImagePullBackOff` occurs when the kubelet cannot pull the container image. For private registries, the most common causes are: the node cannot reach the registry (network/firewall), or the registry requires authentication and no valid `imagePullSecret` is configured on the Pod or its ServiceAccount. Port conflicts cause runtime errors, not image pull failures. Containerd fully supports private registries.\n\nWhy other options are wrong:\n- A: Port conflicts cause runtime errors (CrashLoopBackOff), not ImagePullBackOff\n- B: Resource insufficiency causes Pending state, not ImagePullBackOff\n- D: containerd fully supports private registries with authentication credentials\n\nReference: https://kubernetes.io/docs/concepts/containers/images/#imagepullbackoff",
    verify: "kubectl describe pod <pod-name> | grep -A5 Events"
  },
  {
    id: "s08-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team is deploying a web application that requires initialization — specifically, running database migrations before the main application starts. Which Kubernetes feature allows them to run a container to completion before the main containers start?",
    diagram: null,
    options: [
      "A `postStart` lifecycle hook on the main application container that runs a migration script",
      "A sidecar container that continuously runs alongside the application container in the Pod",
      "An init container in the Pod spec that runs and completes before any app containers start",
      "A `readinessProbe` that delays traffic routing until the database migration fully completes"
    ],
    answer: 2,
    explanation: "Init containers run to completion in order before any application containers start. They are ideal for initialization tasks like database migrations, configuration file generation, or waiting for dependencies. `postStart` hooks run after the container starts but do not block other containers. Sidecar containers run alongside the app. Readiness probes control Service traffic, not container startup order.\n\nWhy other options are wrong:\n- A: postStart hooks run after the container starts but do not block other containers from starting\n- B: Sidecar containers run continuously alongside the app; they do not run-to-completion before app start\n- D: readinessProbe controls traffic routing to the Pod but does not delay container startup order\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.initContainers[*].name}'"
  },
  {
    id: "s08-q049",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team is evaluating NATS for inter-service communication. Which statement correctly describes NATS in the CNCF ecosystem?",
    diagram: null,
    options: [
      "NATS is a CNCF incubating messaging system supporting pub/sub, request/reply, and streaming for cloud apps",
      "NATS is a CNCF graduated distributed tracing system that collects spans from microservices across the cluster",
      "NATS is a CNCF graduated container runtime that competes with containerd for CRI compliance on Kubernetes nodes",
      "NATS is a CNCF sandbox secret management tool that stores and distributes encrypted credentials for workloads"
    ],
    answer: 0,
    explanation: "NATS is a CNCF incubating project that provides a high-performance, lightweight messaging system. It supports multiple communication patterns including publish/subscribe, request/reply, and persistent streaming (via JetStream). NATS is designed for cloud native environments where low-latency, high-throughput messaging is needed between microservices.\n\nWhy other options are wrong:\n- B: NATS is incubating (not graduated) and is a messaging system, not a tracing system\n- C: NATS is incubating (not graduated) and is not a container runtime; it is a messaging system\n- D: NATS is incubating (not sandbox) and is a messaging system, not a secret management tool\n\nReference: https://www.cncf.io/projects/nats/",
    verify: null
  },
  {
    id: "s08-q050",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A new team member notices that Secrets in Kubernetes are stored as base64-encoded data. They assume this means Secrets are encrypted. Which clarification is correct?",
    diagram: null,
    options: [
      "Base64 encoding IS encryption — it uses the AES-256 cipher to protect Secret data stored in the etcd datastore",
      "Secrets are encrypted by default in etcd using a Kubernetes-managed encryption key without any extra configuration",
      "Base64 is encoding, not encryption; Secrets are stored unencrypted in etcd unless encryption at rest is configured",
      "Secrets are only protected in transit between API server and kubelet via TLS; they are stored as plaintext in etcd"
    ],
    answer: 2,
    explanation: "Base64 is a reversible encoding, not encryption. By default, Kubernetes stores Secrets as base64-encoded data in etcd without encryption. To encrypt Secrets at rest, administrators must configure an `EncryptionConfiguration` on the API server, specifying a provider like `aescbc`, `aesgcm`, or a KMS plugin. TLS protects data in transit, but etcd encryption requires explicit configuration.\n\nWhy other options are wrong:\n- A: Base64 is a reversible encoding, not encryption; AES-256 is a separate encryption mechanism\n- B: Secrets are NOT encrypted by default in etcd; encryption at rest requires explicit EncryptionConfiguration\n- D: While TLS protects in-transit data, this option omits that encryption at rest IS available via configuration\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#encrypting-secret-data-at-rest",
    verify: null
  },
  // ── Batch 3: q051–q075  (K8s=12, CO=6, CNA=4, CNO=2, CAD=1) ──
  {
    id: "s08-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer runs `kubectl apply -f deployment.yaml` and later modifies the YAML to change the image tag. When they run `kubectl apply` again, Kubernetes performs a three-way merge. What are the three sources compared in this merge?",
    diagram: null,
    options: [
      "The local file, the live object in the cluster, and the last-applied-configuration annotation",
      "The local file, the Helm release secret, and the etcd snapshot from the previous backup hour",
      "The local file, the container runtime image cache, and the kubelet's in-memory state on the node",
      "The Git repository HEAD, the staging branch, and the production branch of the main repository"
    ],
    answer: 0,
    explanation: "When `kubectl apply` is used, Kubernetes performs a three-way strategic merge patch. It compares: (1) the new manifest from the local file, (2) the live object currently stored in the cluster, and (3) the `kubectl.kubernetes.io/last-applied-configuration` annotation on the object, which records the previous apply state. This allows Kubernetes to correctly handle field additions, modifications, and deletions.\n\nWhy other options are wrong:\n- B: Helm release secrets and etcd snapshots are not part of the kubectl apply three-way merge\n- C: Container image cache and kubelet memory state are not compared during kubectl apply\n- D: Git branches are not involved in the kubectl apply merge process\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/#server-side-apply",
    verify: "kubectl get deployment <name> -o jsonpath='{.metadata.annotations}'"
  },
  {
    id: "s08-q052",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster uses `kube-proxy` in IPVS mode instead of the default iptables mode. What advantage does IPVS mode provide for large-scale clusters?",
    diagram: null,
    options: [
      "IPVS offers O(1) connection processing via hash lookups, improving performance for large clusters",
      "IPVS encrypts all Service traffic using mutual TLS without requiring a service mesh or extra certs",
      "IPVS replaces CoreDNS entirely by performing DNS resolution for Service names at the kernel level",
      "IPVS eliminates the need for ClusterIP addresses by routing traffic directly to Pod IPs using BGP"
    ],
    answer: 0,
    explanation: "IPVS (IP Virtual Server) uses hash tables in the Linux kernel for Service routing decisions, providing O(1) time complexity regardless of the number of Services. In contrast, iptables rules are processed sequentially (O(n)), which causes performance degradation as the number of Services grows. IPVS also supports multiple load-balancing algorithms (round-robin, least connections, etc.).\n\nWhy other options are wrong:\n- B: IPVS does not encrypt traffic with mTLS; encryption requires a service mesh or TLS certificates\n- C: IPVS does not replace CoreDNS; it handles Service routing, not DNS resolution\n- D: IPVS still uses ClusterIP addresses; it does not eliminate them or use BGP for routing\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/#proxy-mode-ipvs",
    verify: "kubectl get configmap kube-proxy -n kube-system -o yaml | grep mode"
  },
  {
    id: "s08-q053",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "An architect is implementing the circuit breaker pattern in a microservices system. The payment service calls an external fraud-detection API. When the API starts timing out, the circuit breaker trips to the open state. What does the open state mean?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="190" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Circuit Breaker States</text><circle cx="80" cy="110" r="35" fill="#065f46" stroke="#10b981" stroke-width="2"/><text x="80" y="107" text-anchor="middle" fill="white" font-size="10">Closed</text><text x="80" y="120" text-anchor="middle" fill="#6ee7b7" font-size="8">(normal)</text><circle cx="200" cy="110" r="35" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/><text x="200" y="107" text-anchor="middle" fill="white" font-size="10">Open</text><text x="200" y="120" text-anchor="middle" fill="#fca5a5" font-size="8">(failing)</text><circle cx="320" cy="110" r="35" fill="#713f12" stroke="#f59e0b" stroke-width="2"/><text x="320" y="107" text-anchor="middle" fill="white" font-size="10">Half-Open</text><text x="320" y="120" text-anchor="middle" fill="#fcd34d" font-size="8">(testing)</text><path d="M115,100 L165,100" stroke="#ef4444" stroke-width="2" marker-end="url(#arrRed)"/><text x="140" y="93" text-anchor="middle" fill="#fca5a5" font-size="7">failures</text><path d="M235,100 L285,100" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrYel)"/><text x="260" y="93" text-anchor="middle" fill="#fcd34d" font-size="7">timeout</text><path d="M320,145 C320,170 80,170 80,145" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrGrn)"/><text x="200" y="175" text-anchor="middle" fill="#6ee7b7" font-size="7">success → close</text><defs><marker id="arrRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker><marker id="arrYel" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#f59e0b"/></marker><marker id="arrGrn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#10b981"/></marker></defs></svg>',
    options: [
      "All requests are forwarded to the external API normally while logging each failure for later analysis and review",
      "Requests to the external API are immediately rejected without attempting the call, returning a fallback or error",
      "A single probe request is sent to the external API while all other requests are queued until it responds back",
      "The service retries the external API call indefinitely with exponential backoff until a success is returned"
    ],
    answer: 1,
    explanation: "When a circuit breaker enters the open state, it immediately rejects all outgoing requests to the failing dependency without attempting the call. This prevents cascading failures and resource exhaustion. After a configured timeout, the circuit transitions to half-open, where a limited number of probe requests test whether the dependency has recovered. If successful, the circuit closes; if not, it reopens.\n\nWhy other options are wrong:\n- A: Forwarding all requests normally describes the closed (normal) state, not the open state\n- C: Sending a single probe request describes the half-open state, not the open state\n- D: Retrying indefinitely with backoff is a retry pattern, not the circuit breaker open state behavior\n\nReference: https://microservices.io/patterns/reliability/circuit-breaker.html",
    verify: null
  },
  {
    id: "s08-q054",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team is migrating a distributed database that requires stable network identities, ordered deployment, and persistent storage per replica. Which workload resource should they use?",
    diagram: null,
    options: [
      "Deployment — provides declarative updates and rolling rollouts for stateless application workloads",
      "StatefulSet — provides stable Pod identities, ordered deployment, and persistent storage",
      "DaemonSet — ensures one Pod per node for infrastructure agents and system-level daemon processes",
      "ReplicaSet — maintains a specified number of identical Pod replicas for a given template selector"
    ],
    answer: 1,
    explanation: "StatefulSets are designed for stateful workloads that require stable network identities (predictable Pod names like `db-0`, `db-1`), ordered deployment and scaling, and persistent storage that follows the Pod across rescheduling. Each Pod in a StatefulSet is assigned a persistent identifier that is maintained across restarts. Deployments are for stateless workloads.\n\nWhy other options are wrong:\n- A: Deployment is for stateless workloads; it does not provide stable network identities or ordered deployment\n- C: DaemonSet runs one Pod per node for system daemons, not for stateful distributed databases\n- D: ReplicaSet maintains identical Pod replicas without stable identities or ordered deployment\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
    verify: "kubectl get statefulset"
  },
  {
    id: "s08-q055",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security engineer needs to restrict which API resources a specific ServiceAccount can access in a namespace. They create a Role with `rules` allowing `get`, `list`, `watch` on Pods. What must they create to bind this Role to the ServiceAccount?",
    diagram: null,
    options: [
      "A ClusterRoleBinding that binds the Role to the ServiceAccount across all cluster namespaces",
      "A NetworkPolicy that allows the ServiceAccount to access the API server network endpoint",
      "A RoleBinding in the same namespace referencing the Role and ServiceAccount as a subject",
      "A PodSecurityPolicy that grants the ServiceAccount access to Pod resources in the cluster"
    ],
    answer: 2,
    explanation: "A RoleBinding binds a Role (namespace-scoped permissions) to a subject (User, Group, or ServiceAccount) within a specific namespace. The RoleBinding must be in the same namespace as the Role. A ClusterRoleBinding would grant cluster-wide permissions. NetworkPolicies control Pod network traffic, not API access. PodSecurityPolicies (deprecated in 1.25) controlled security contexts, not API access.\n\nWhy other options are wrong:\n- A: ClusterRoleBinding grants cluster-wide permissions; a namespace-scoped Role needs a RoleBinding\n- B: NetworkPolicies control Pod network traffic, not API server access for ServiceAccounts\n- D: PodSecurityPolicies are deprecated (removed in 1.25) and controlled security contexts, not API access\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding",
    verify: "kubectl get rolebinding -n <namespace>"
  },
  {
    id: "s08-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A platform team is configuring the Kubernetes Gateway API as a replacement for the Ingress resource. Which improvement does the Gateway API provide over the traditional Ingress?",
    diagram: null,
    options: [
      "The Gateway API removes the need for any controller — all routing is handled entirely by kube-proxy on each node in the cluster",
      "The Gateway API replaces Services and Endpoints with a single resource combining routing, load balancing, and backend selection",
      "The Gateway API encrypts all cluster network traffic by default without requiring any TLS certificates or additional configuration",
      "The Gateway API provides a role-oriented model with separate Gateway, HTTPRoute, and policy resources for multi-tenancy"
    ],
    answer: 3,
    explanation: "The Gateway API improves upon Ingress by introducing a role-oriented resource model: `GatewayClass` (infrastructure provider), `Gateway` (load balancer instance), and `HTTPRoute`/`TLSRoute`/etc. (routing rules). This separation enables better multi-tenancy, cross-namespace routing, and more expressive routing capabilities like header-based matching, traffic splitting, and request mirroring.\n\nWhy other options are wrong:\n- A: Gateway API still requires a controller implementation; kube-proxy does not handle L7 routing\n- B: Gateway API does not replace Services/Endpoints; it provides additional routing resources on top\n- C: Gateway API does not encrypt traffic by default; TLS still requires certificates and configuration\n\nReference: https://gateway-api.sigs.k8s.io/",
    verify: "kubectl get gateways.gateway.networking.k8s.io"
  },
  {
    id: "s08-q057",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A team is adopting OpenTelemetry to instrument their Go microservices. They want to send traces to Jaeger and metrics to Prometheus from the same instrumentation library. Which statement about OpenTelemetry is accurate?",
    diagram: null,
    options: [
      "OpenTelemetry only supports distributed tracing; separate libraries are needed for metrics collection and log aggregation",
      "OpenTelemetry is a proprietary standard owned by Jaeger that only supports data export in Jaeger's native format",
      "OpenTelemetry replaces Prometheus entirely and cannot export metrics data in the Prometheus exposition text format",
      "OpenTelemetry is a CNCF graduated project providing vendor-neutral APIs and SDKs for traces, metrics, and logs"
    ],
    answer: 3,
    explanation: "OpenTelemetry (OTel) is a CNCF graduated project that provides a unified, vendor-neutral framework for instrumentation. It offers APIs and SDKs for traces, metrics, and logs, and supports exporting data to multiple backends simultaneously — for example, traces to Jaeger and metrics in Prometheus format. It merged the OpenTracing and OpenCensus projects.\n\nWhy other options are wrong:\n- A: OTel supports traces, metrics, AND logs; it is not limited to tracing only\n- B: OTel is vendor-neutral and CNCF graduated, not proprietary to Jaeger; supports multiple export formats\n- C: OTel complements Prometheus and can export metrics in Prometheus format; it does not replace it\n\nReference: https://opentelemetry.io/docs/",
    verify: null
  },
  {
    id: "s08-q058",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "An operations team wants to extend their Prometheus monitoring with long-term storage and a global query view across multiple Prometheus instances. Which CNCF incubating project provides this capability?",
    diagram: null,
    options: [
      "Grafana Loki — a horizontally scalable log aggregation system designed for cost efficiency and simplicity",
      "Cortex — a horizontally scalable Prometheus-compatible TSDB that is now part of the Mimir project lineage",
      "VictoriaMetrics — a high-performance open-source time-series database with Prometheus query compatibility",
      "Thanos — extends Prometheus with long-term storage, global querying, and downsampling capabilities"
    ],
    answer: 3,
    explanation: "Thanos is a CNCF incubating project that extends Prometheus for long-term metric storage and global querying. It adds components like Thanos Sidecar (ships blocks to object storage), Thanos Query (federates queries across Prometheus instances), and Thanos Compactor (downsamples old data). Cortex and VictoriaMetrics offer similar capabilities but have different project lineages and CNCF statuses.\n\nWhy other options are wrong:\n- A: Grafana Loki is a log aggregation system, not a Prometheus long-term storage solution\n- B: Cortex is now part of the Grafana Mimir lineage; it has a different CNCF and project status\n- C: VictoriaMetrics is not a CNCF project; it is an independent open-source TSDB\n\nReference: https://www.cncf.io/projects/thanos/",
    verify: null
  },
  {
    id: "s08-q059",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team has a multi-container Pod where one container generates log files on disk and another container processes them. They need both containers to access the same directory. Which volume type is most appropriate for sharing temporary data between containers in the same Pod?",
    diagram: null,
    options: [
      "`persistentVolumeClaim` — provisions a network-attached disk from a StorageClass for persistent data",
      "`hostPath` — mounts a directory from the host node's filesystem into the Pod for shared node access",
      "`emptyDir` — creates a temporary directory that exists for the Pod's lifetime shared by containers",
      "`configMap` — mounts configuration data from a ConfigMap resource as files in the container's paths"
    ],
    answer: 2,
    explanation: "An `emptyDir` volume is created when a Pod is assigned to a node and exists as long as the Pod runs on that node. It is shared by all containers in the Pod, making it ideal for inter-container data sharing. When the Pod is removed, the `emptyDir` data is deleted. `persistentVolumeClaim` is for data that must survive Pod restarts. `hostPath` exposes host directories and poses security risks.\n\nWhy other options are wrong:\n- A: PersistentVolumeClaim provisions network-attached storage, overkill for temporary inter-container sharing\n- B: hostPath mounts host directories posing security risks and is not specifically for inter-container sharing\n- D: ConfigMap mounts read-only configuration data, not suitable for writing temporary data between containers\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes}'"
  },
  {
    id: "s08-q060",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A security-conscious organization wants to run containers with stronger isolation than standard Linux namespaces provide. They are considering gVisor (`runsc`) as an OCI runtime. How does gVisor improve container isolation?",
    diagram: null,
    options: [
      "gVisor interposes a user-space kernel (Sentry) intercepting system calls, reducing host attack surface",
      "gVisor encrypts all container filesystem data at rest using hardware-backed encryption on the host storage",
      "gVisor runs each container inside a full virtual machine using QEMU for complete hardware-level isolation",
      "gVisor disables all Linux capabilities and seccomp profiles entirely, making containers fully unprivileged"
    ],
    answer: 0,
    explanation: "gVisor provides an additional layer of isolation by running a user-space kernel (called Sentry) that intercepts container system calls. Instead of allowing containers to make direct syscalls to the host kernel, gVisor implements a subset of the Linux system call interface in user space. This significantly reduces the host kernel's attack surface. Kata Containers use full VMs, while gVisor uses a user-space kernel approach.\n\nWhy other options are wrong:\n- B: gVisor does not encrypt filesystem data; it interposes syscalls for isolation\n- C: gVisor does not use full VMs/QEMU; that describes Kata Containers which use lightweight VMs\n- D: gVisor does not simply disable capabilities/seccomp; it runs a user-space kernel intercepting syscalls\n\nReference: https://gvisor.dev/docs/",
    verify: null
  },
  {
    id: "s08-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An administrator needs to backup the entire Kubernetes cluster state. They decide to take a snapshot of etcd. Which `etcdctl` command creates a snapshot of the etcd database?",
    diagram: null,
    options: [
      "`etcdctl member list --endpoints=https://127.0.0.1:2379` to display all current cluster members list",
      "`etcdctl snapshot save /backup/etcd-snapshot.db --endpoints=... --cacert=... --cert=... --key=...`",
      "`etcdctl defrag --endpoints=https://127.0.0.1:2379` to reclaim fragmented storage on the database",
      "`etcdctl put /backup/trigger true --endpoints=https://127.0.0.1:2379` to write a backup signal key"
    ],
    answer: 1,
    explanation: "`etcdctl snapshot save` creates a point-in-time snapshot of the etcd database, which contains all cluster state including Pods, Services, ConfigMaps, and Secrets. The command requires TLS certificate parameters when etcd is configured with client certificate authentication. `member list` shows cluster members, `defrag` compacts the database, and `put` writes a key-value pair.\n\nWhy other options are wrong:\n- A: member list displays cluster members, it does not create a backup snapshot\n- C: defrag reclaims fragmented storage space, it does not create a backup snapshot\n- D: put writes a key-value pair to etcd, it does not create a backup snapshot\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#snapshot-using-etcdctl-options",
    verify: "ETCDCTL_API=3 etcdctl snapshot status /backup/etcd-snapshot.db"
  },
  {
    id: "s08-q062",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team deploys a gRPC-based microservice behind a Kubernetes Service. They notice that all traffic is going to a single Pod despite having 3 replicas. What is the most likely cause?",
    diagram: null,
    options: [
      "gRPC is not a supported protocol for Kubernetes Services and always requires an external third-party load balancer",
      "The Pods have different resource limits configured, causing the kube-scheduler to prefer one Pod over the others",
      "gRPC uses HTTP/2 persistent connections; `kube-proxy` does L4 balancing per connection so one connection routes to one Pod",
      "The Service `sessionAffinity` is set to `ClientIP` by default, which pins all traffic from one client to a single Pod"
    ],
    answer: 2,
    explanation: "gRPC uses HTTP/2, which multiplexes multiple requests over a single persistent TCP connection. Since `kube-proxy` performs Layer 4 (TCP connection-level) load balancing, all requests on the same connection go to the same backend Pod. To properly load-balance gRPC, teams need L7 load balancing (e.g., via a service mesh like Linkerd or an Envoy-based ingress controller) that can distribute individual gRPC requests across Pods.\n\nWhy other options are wrong:\n- A: gRPC is supported by K8s Services; the issue is L4 vs L7 load balancing, not protocol support\n- B: Resource limits affect Pod performance, not Service load balancing connection distribution\n- D: sessionAffinity defaults to None, not ClientIP; the issue is HTTP/2 persistent connections\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s08-q063",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod specification requests 500m CPU and 256Mi memory. The scheduler finds two candidate nodes: Node A has 400m CPU available, and Node B has 600m CPU and 512Mi memory available. Where does the scheduler place the Pod?",
    diagram: null,
    options: [
      "Node A, because the scheduler uses a best-effort approach and places Pods on partially matching nodes",
      "Node B, because it is the only node meeting both CPU (500m) and memory (256Mi) resource requests",
      "Neither node — the Pod remains `Pending` because neither node has exactly the requested resources",
      "The scheduler splits the Pod across both nodes, running the CPU-intensive portion on Node B only"
    ],
    answer: 1,
    explanation: "The Kubernetes scheduler only places a Pod on a node that satisfies all resource requests. Node A has only 400m CPU available, which is insufficient for the 500m CPU request. Node B has 600m CPU and 512Mi memory, both exceeding the Pod's requests. Pods cannot be split across nodes. If no node meets the requirements, the Pod stays `Pending`.\n\nWhy other options are wrong:\n- A: The scheduler does not use best-effort on partial matches; it requires all resource requests to be met\n- C: The Pod does not stay Pending because Node B meets requirements; 'exactly matching' is not required\n- D: Pods cannot be split across nodes; a Pod runs entirely on a single node\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/#kube-scheduler",
    verify: "kubectl describe node <node-name> | grep -A5 'Allocated resources'"
  },
  {
    id: "s08-q064",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An architect is reviewing Factor X (Dev/prod parity) of the twelve-factor app methodology. The team runs PostgreSQL 14 in production but uses SQLite in development. Which statement correctly identifies the violation?",
    diagram: null,
    options: [
      "There is no violation — using lighter databases in development improves iteration speed without any meaningful consequence at all",
      "Factor X requires minimizing gaps between dev and prod including backing services; different databases cause subtle bugs",
      "Factor X only applies to the application source code itself and does not extend to backing services like databases or caches used",
      "Factor X requires that development and production environments share the exact same physical hardware infrastructure and servers"
    ],
    answer: 1,
    explanation: "Factor X (Dev/prod parity) states that the gap between development and production should be kept small across time (deploy frequently), personnel (developers deploy), and tools (use the same backing services). Using SQLite in dev and PostgreSQL in production introduces behavioral differences (e.g., type handling, locking semantics) that lead to bugs that only manifest in production. Containers and tools like Docker Compose make it easy to run the same database in both environments.\n\nWhy other options are wrong:\n- A: Using different databases does cause real issues; behavioral differences lead to production-only bugs\n- C: Factor X explicitly includes backing services like databases and caches, not just application code\n- D: Factor X is about minimizing tooling/service gaps, not about sharing identical physical hardware\n\nReference: https://12factor.net/dev-prod-parity",
    verify: null
  },
  {
    id: "s08-q065",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Prometheus query `rate(http_requests_total{status=~\"5..\"}[5m])` returns a time series. What does this expression calculate?",
    diagram: null,
    options: [
      "The total cumulative count of HTTP 5xx errors since the application started",
      "The per-second rate of HTTP 5xx errors averaged over a 5-minute window",
      "The maximum number of HTTP 5xx errors observed in any single 5-minute interval",
      "The percentage of HTTP requests that returned 5xx errors out of all requests"
    ],
    answer: 1,
    explanation: "The `rate()` function in PromQL calculates the per-second average rate of increase of a counter over the specified time window. `rate(http_requests_total{status=~\"5..\"}[5m])` computes how many HTTP 5xx errors occur per second, averaged over the last 5 minutes. To get a percentage, you would need to divide by the total request rate. The raw counter gives cumulative count.\n\nWhy other options are wrong:\n- A: The raw counter gives cumulative count; rate() calculates per-second rate, not total count\n- C: rate() returns per-second average over the window, not the maximum in any interval\n- D: To get percentage, you must divide by total request rate; rate() alone gives per-second error count\n\nReference: https://prometheus.io/docs/prometheus/latest/querying/functions/#rate",
    verify: null
  },
  {
    id: "s08-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team deploys a StatefulSet with 3 replicas and `podManagementPolicy: OrderedReady`. In what order are the Pods created during initial deployment?",
    diagram: null,
    options: [
      "All 3 Pods are created simultaneously for fast startup regardless of individual Pod readiness status",
      "Pods are created in reverse order: `pod-2` is created first, then `pod-1`, and finally `pod-0`",
      "Pods are created in random order determined by the scheduler's scoring algorithm for the nodes",
      "Pods are created sequentially: `pod-0` must be Running and Ready before `pod-1` starts creating"
    ],
    answer: 3,
    explanation: "With `podManagementPolicy: OrderedReady` (the default), StatefulSet Pods are created sequentially in ordinal order. `pod-0` must reach Running and Ready state before `pod-1` is created. This ordered startup is important for distributed systems that require a primary node to be available before replicas join. `Parallel` policy would create all Pods simultaneously.\n\nWhy other options are wrong:\n- A: Simultaneous creation is the Parallel policy, not OrderedReady\n- B: Pods are created in ascending order (0, 1, 2), not reverse order\n- C: Pod creation order is deterministic (sequential ascending), not random\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.podManagementPolicy}'"
  },
  {
    id: "s08-q067",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A DevSecOps team wants to scan running containers for known CVEs in their installed packages. They also want to scan Kubernetes manifests for misconfigurations. Which open-source tool covers both container image vulnerability scanning and Kubernetes IaC misconfiguration scanning?",
    diagram: null,
    options: [
      "Falco — detects runtime anomalies and security threats by monitoring kernel-level system calls in real time",
      "Trivy — an all-in-one scanner detecting vulnerabilities in images and misconfigurations in K8s manifests",
      "kube-bench — checks Kubernetes cluster node configuration against CIS security benchmark requirements",
      "OPA Gatekeeper — enforces custom admission policies on Kubernetes API requests via constraint templates"
    ],
    answer: 1,
    explanation: "Trivy (by Aqua Security) is a comprehensive security scanner that detects OS and language package vulnerabilities in container images, misconfigurations in Kubernetes YAML, Terraform, Dockerfiles, and more. Falco focuses on runtime detection, kube-bench audits cluster setup against CIS benchmarks, and OPA Gatekeeper enforces admission policies.\n\nWhy other options are wrong:\n- A: Falco monitors runtime syscalls, not static image vulnerabilities or IaC misconfigurations\n- C: kube-bench audits cluster configuration against CIS benchmarks, not container image vulnerabilities\n- D: OPA Gatekeeper enforces admission policies, not image vulnerability scanning or IaC checks\n\nReference: https://trivy.dev/latest/docs/",
    verify: null
  },
  {
    id: "s08-q068",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer sets `resources.limits.cpu: \"2\"` and `resources.requests.cpu: \"500m\"` on a container. What happens if the container attempts to use 3 CPU cores?",
    diagram: null,
    options: [
      "The container is throttled by the CFS scheduler; it cannot exceed 2 CPU cores but is not killed",
      "The container is immediately terminated (OOMKilled) for exceeding its configured CPU limit value",
      "The kubelet evicts the Pod because it has exceeded the CPU allocation available on the node",
      "Nothing happens — CPU limits are advisory only and have no enforcement mechanism in Kubernetes"
    ],
    answer: 0,
    explanation: "CPU limits in Kubernetes are enforced by the Linux kernel's Completely Fair Scheduler (CFS) via cgroup bandwidth controls. When a container tries to exceed its CPU limit, it is throttled (its CPU time is restricted) but not killed. This differs from memory, where exceeding the limit triggers an OOMKill. CPU requests are used for scheduling decisions, while limits cap actual usage.\n\nWhy other options are wrong:\n- B: OOMKilled is for memory limit violations, not CPU; CPU is throttled, not killed\n- C: CPU limit violations are handled by CFS throttling; the kubelet does not evict for CPU limit exceeded\n- D: CPU limits are enforced via CFS bandwidth controls in cgroups; they are not advisory\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: "kubectl top pod <pod-name>"
  },
  {
    id: "s08-q069",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team uses Flux to manage their Kubernetes deployments via GitOps. They push a new Deployment manifest to the Git repository. Which Flux component detects the Git change and reconciles the cluster?",
    diagram: null,
    options: [
      "Flux Helm Controller — watches HelmRepository sources for new chart versions and reconciles releases",
      "Flux Notification Controller — sends alerts and notifications when Git commits are pushed to the repo",
      "Flux Image Automation Controller — scans container registries and updates image tags in Git repos",
      "Flux Source Controller monitors Git repos and Kustomize Controller applies manifests to the cluster"
    ],
    answer: 3,
    explanation: "Flux uses a modular controller architecture. The Source Controller monitors Git repositories (and other sources like Helm repos and S3 buckets) and creates artifacts from them. The Kustomize Controller then takes these artifacts, runs Kustomize if needed, and applies the resulting manifests to the cluster. Together they implement the GitOps reconciliation loop.\n\nWhy other options are wrong:\n- A: Helm Controller watches HelmRepository/HelmRelease resources, not Git repo changes for plain manifests\n- B: Notification Controller sends alerts on events; it does not detect Git changes or apply manifests\n- C: Image Automation Controller updates image tags in Git; it does not detect manifest changes or apply them\n\nReference: https://fluxcd.io/flux/components/",
    verify: "kubectl get gitrepositories.source.toolkit.fluxcd.io"
  },
  {
    id: "s08-q070",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An application running in a Pod needs to communicate with the Kubernetes API server to list all Pods in its namespace. Which mechanism provides the Pod with the credentials and API server endpoint for this purpose?",
    diagram: null,
    options: [
      "The ServiceAccount token is auto-mounted at `/var/run/secrets/kubernetes.io/serviceaccount/` with `ca.crt`",
      "The kubelet injects the API server's TLS certificate into every container's `/etc/ssl/` directory automatically",
      "The kube-proxy provides an unauthenticated API gateway on `localhost:8080` that forwards all requests",
      "The developer must hard-code the API server URL and a static bearer token in the application configuration"
    ],
    answer: 0,
    explanation: "By default, Kubernetes mounts a ServiceAccount token at `/var/run/secrets/kubernetes.io/serviceaccount/` in every Pod. This directory contains `token` (a JWT for API authentication), `ca.crt` (the cluster CA certificate), and `namespace` (the Pod's namespace). The API server address is available via the `KUBERNETES_SERVICE_HOST` and `KUBERNETES_SERVICE_PORT` environment variables.\n\nWhy other options are wrong:\n- B: The kubelet does not inject API server TLS certs into /etc/ssl/; the SA mount includes ca.crt\n- C: kube-proxy does not provide an unauthenticated API gateway; it handles Service routing\n- D: Hard-coding credentials is insecure and unnecessary; Kubernetes provides auto-mounted SA tokens\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/",
    verify: "kubectl exec <pod-name> -- ls /var/run/secrets/kubernetes.io/serviceaccount/"
  },
  {
    id: "s08-q071",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod enters `OOMKilled` status repeatedly. The container has `resources.limits.memory: 256Mi` set, and application profiling shows it uses up to 300Mi under load. What is the correct remediation?",
    diagram: null,
    options: [
      "Increase the memory limit to at least 300Mi with headroom to prevent the kernel OOM killer from acting",
      "Set `restartPolicy: Never` on the Pod to prevent Kubernetes from restarting the killed container instance",
      "Add a `livenessProbe` that checks memory usage and restarts the container before it gets OOMKilled by cgroup",
      "Increase the CPU limit so the application can process memory allocations and garbage collection cycles faster"
    ],
    answer: 0,
    explanation: "OOMKilled occurs when a container's memory usage exceeds its cgroup memory limit. The Linux kernel's OOM killer terminates the process. The fix is to increase `resources.limits.memory` to accommodate the application's actual memory needs with appropriate headroom. CPU limits do not affect memory behavior. Setting `restartPolicy: Never` does not solve the root cause. Liveness probes cannot prevent OOM kills.\n\nWhy other options are wrong:\n- B: Setting restartPolicy:Never stops restarts but does not fix the OOM root cause\n- C: livenessProbe cannot detect or prevent kernel OOM kills; OOM kills happen at the cgroup level\n- D: CPU limits do not affect memory allocation or garbage collection speed in a meaningful way\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits",
    verify: "kubectl describe pod <pod-name> | grep -A2 'Last State'"
  },
  {
    id: "s08-q072",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A multi-master Kubernetes cluster runs 3 etcd instances. During a network partition, one etcd member becomes isolated. Can the remaining two members still accept writes?",
    diagram: null,
    options: [
      "No — all 3 etcd members must be available and reachable for the cluster to accept any read or write operations",
      "Yes — etcd uses Raft consensus requiring a majority quorum; with 2 of 3 members the quorum is maintained",
      "Yes — etcd switches to an eventual consistency mode during network partitions and reconciles data afterward",
      "No — etcd immediately promotes one of the remaining members to operate as a standalone single-node instance"
    ],
    answer: 1,
    explanation: "etcd uses the Raft consensus algorithm, which requires a majority (quorum) of members to process writes. For a 3-member cluster, quorum is 2 (majority of 3). With 2 members still connected, the cluster can continue accepting reads and writes. The isolated member cannot process requests on its own since it lacks quorum. This is why 3 or 5 member clusters are recommended (tolerating 1 or 2 failures respectively).\n\nWhy other options are wrong:\n- A: etcd does not require all members; it requires only a majority quorum for reads and writes\n- C: etcd uses strong consistency via Raft, not eventual consistency; there is no 'eventual consistency mode'\n- D: etcd does not promote a member to standalone; isolated members cannot serve requests without quorum\n\nReference: https://etcd.io/docs/v3.5/faq/#what-is-failure-tolerance",
    verify: "ETCDCTL_API=3 etcdctl member list"
  },
  {
    id: "s08-q073",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team is implementing an API gateway for their microservices platform. The gateway must handle authentication, rate limiting, request routing, and protocol translation. Which architectural pattern does this represent?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="210" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">API Gateway Pattern</text><rect x="20" y="50" width="80" height="40" rx="6" fill="#374151" stroke="#6b7280"/><text x="60" y="75" text-anchor="middle" fill="white" font-size="10">Clients</text><rect x="140" y="40" width="120" height="60" rx="6" fill="#7c3aed" stroke="#a78bfa" stroke-width="2"/><text x="200" y="65" text-anchor="middle" fill="white" font-size="10">API Gateway</text><text x="200" y="80" text-anchor="middle" fill="#c4b5fd" font-size="8">Auth | Rate Limit | Route</text><rect x="300" y="40" width="80" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="340" y="57" text-anchor="middle" fill="white" font-size="9">Svc A</text><rect x="300" y="75" width="80" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="340" y="92" text-anchor="middle" fill="white" font-size="9">Svc B</text><rect x="300" y="110" width="80" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="340" y="127" text-anchor="middle" fill="white" font-size="9">Svc C</text><line x1="100" y1="70" x2="140" y2="70" stroke="#a78bfa" stroke-width="2" marker-end="url(#arrGw)"/><line x1="260" y1="55" x2="300" y2="55" stroke="#14b8a6" stroke-width="1.5"/><line x1="260" y1="70" x2="300" y2="87" stroke="#14b8a6" stroke-width="1.5"/><line x1="260" y1="85" x2="300" y2="120" stroke="#14b8a6" stroke-width="1.5"/><defs><marker id="arrGw" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#a78bfa"/></marker></defs></svg>',
    options: [
      "Sidecar pattern — inject a proxy container alongside each service to handle cross-cutting concerns locally",
      "Backend for Frontend (BFF) — build a separate backend service tailored per client type (mobile, web app)",
      "API Gateway pattern — a single entry point handling auth, rate limiting, and routing for backend services",
      "Service mesh pattern — distribute proxy functionality across all service instances via sidecar injection"
    ],
    answer: 2,
    explanation: "The API Gateway pattern provides a single entry point for all external clients. It handles cross-cutting concerns such as authentication, rate limiting, request routing, protocol translation, and response aggregation before forwarding requests to the appropriate backend services. This reduces complexity for clients and centralizes operational concerns. Service meshes handle east-west traffic, while API gateways typically handle north-south traffic.\n\nWhy other options are wrong:\n- A: Sidecar pattern handles concerns locally per service, not centrally at a single entry point\n- B: BFF creates per-client-type backends, not a single unified entry point for all clients\n- D: Service mesh distributes proxy functionality across services for east-west traffic, not centralized north-south\n\nReference: https://microservices.io/patterns/apigateway.html",
    verify: null
  },
  {
    id: "s08-q074",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team notices that their Namespace has a `LimitRange` resource configured. What does a `LimitRange` enforce?",
    diagram: null,
    options: [
      "It sets the maximum number of Pods that can exist in the namespace at any given time during operations",
      "It defines default, min, and max resource requests and limits for containers and Pods in the namespace",
      "It restricts which container images can be pulled by Pods deployed within the namespace by registry URL",
      "It limits the number of API requests per second that can be made to resources within that namespace"
    ],
    answer: 1,
    explanation: "A `LimitRange` sets resource constraints at the container/Pod level within a namespace. It can define default requests and limits (applied when containers do not specify their own), minimum and maximum resource values, and max ratio between limit and request. It differs from `ResourceQuota`, which limits the aggregate resource consumption of the entire namespace.\n\nWhy other options are wrong:\n- A: Maximum Pod count in a namespace is controlled by ResourceQuota, not LimitRange\n- C: Image restriction by registry URL requires admission controllers like OPA Gatekeeper, not LimitRange\n- D: API rate limiting is handled by API server flags, not LimitRange resources\n\nReference: https://kubernetes.io/docs/concepts/policy/limit-range/",
    verify: "kubectl get limitrange -n <namespace>"
  },
  {
    id: "s08-q075",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "An application requires a PersistentVolume with `ReadWriteMany` (RWX) access mode so multiple Pods on different nodes can write to it simultaneously. Which storage backend commonly supports RWX?",
    diagram: null,
    options: [
      "AWS EBS — block storage that can be attached to a single EC2 instance at a time supporting RWO access only",
      "NFS (Network File System) — a network filesystem supporting concurrent read/write from multiple nodes",
      "Local PV — uses local disks on a specific node and is inherently limited to that single node RWO only",
      "Azure Managed Disks — premium block storage that supports single-node attachment with RWO access only"
    ],
    answer: 1,
    explanation: "NFS supports `ReadWriteMany` (RWX) because it is a network filesystem that allows multiple clients (nodes) to mount and write to the same share simultaneously. Block storage solutions like AWS EBS, Azure Managed Disks, and Local PVs only support `ReadWriteOnce` (RWO) — a single node at a time. Other RWX options include CephFS, GlusterFS, and cloud-native file storage services.\n\nWhy other options are wrong:\n- A: AWS EBS is block storage supporting only RWO (single node attachment), not RWX\n- C: Local PV uses local node disks limited to that single node, only RWO\n- D: Azure Managed Disks are block storage supporting only RWO (single node), not RWX\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: "kubectl get pv -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.spec.accessModes}{\"\\n\"}{end}'"
  },
  // ── Batch 4: q076–q100  (K8s=11, CO=5, CNA=4, CNO=2, CAD=3) ──
  {
    id: "s08-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team creates a ResourceQuota in the `dev` namespace that sets `requests.cpu: 4` and `limits.cpu: 8`. A developer tries to create a Pod with `requests.cpu: 2` and `limits.cpu: 3` when 3 CPU of requests are already consumed. What happens?",
    diagram: null,
    options: [
      "The Pod is created successfully because the CPU limit of 3 is still under the namespace quota limit of 8",
      "The Pod is created but throttled to use only 1 CPU request since that is all the remaining quota allows",
      "The ResourceQuota is ignored because it only applies to Deployments and ReplicaSets, not individual Pods",
      "Pod creation is rejected because total CPU requests would be 5 (3 + 2), exceeding the quota of 4 total"
    ],
    answer: 3,
    explanation: "ResourceQuotas enforce aggregate resource constraints across all resources in a namespace. With 3 CPU requests already consumed and the new Pod requesting 2, the total would be 5, exceeding the `requests.cpu: 4` quota. The API server rejects the Pod creation at admission time. ResourceQuotas apply to all resource types (Pods, Deployments, Services, etc.) within the namespace.\n\nWhy other options are wrong:\n- A: ResourceQuota checks both requests AND limits; even though limit is under 8, requests exceed 4\n- B: ResourceQuota does not throttle; it either admits or rejects the resource creation entirely\n- C: ResourceQuota applies to all resource types in the namespace, including individual Pods\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: "kubectl describe resourcequota -n dev"
  },
  {
    id: "s08-q077",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A team is comparing CRI-O and containerd as CRI-compliant runtimes. Which statement correctly distinguishes CRI-O's design philosophy?",
    diagram: null,
    options: [
      "CRI-O supports both the Kubernetes CRI and Docker API, making it a drop-in replacement for Docker Engine on nodes",
      "CRI-O uses its own proprietary image format that is incompatible with OCI container images and Docker registries",
      "CRI-O is purpose-built for Kubernetes, implementing only the CRI interface without Docker-specific build features",
      "CRI-O bundles its own container storage driver and cannot leverage the host filesystem or existing storage config"
    ],
    answer: 2,
    explanation: "CRI-O is a lightweight, Kubernetes-specific container runtime that implements only the CRI (Container Runtime Interface) needed by the kubelet. Unlike containerd (which also supports Docker workflows), CRI-O focuses solely on running OCI-compliant containers for Kubernetes. It does not include image building or pushing capabilities. Both CRI-O and containerd use OCI-compliant images and can invoke OCI runtimes like `runc`.\n\nWhy other options are wrong:\n- A: CRI-O does not support the Docker API; it implements only the Kubernetes CRI interface\n- B: CRI-O uses standard OCI images, not a proprietary format; it is fully OCI-compatible\n- D: CRI-O uses containers/storage library and works with host filesystem; it does not bundle a proprietary driver\n\nReference: https://cri-o.io/",
    verify: null
  },
  {
    id: "s08-q078",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A DevOps team uses gRPC for high-performance inter-service communication. Which statement correctly describes gRPC's relationship with the CNCF ecosystem?",
    diagram: null,
    options: [
      "gRPC is a CNCF incubating high-performance RPC framework using Protocol Buffers and HTTP/2 for transport",
      "gRPC is a CNCF graduated project serving as a REST API replacement by using XML over HTTP/1.1 protocol",
      "gRPC is not part of the CNCF — it is a proprietary Google technology with no open-source governance body",
      "gRPC is a CNCF sandbox project providing a durable messaging queue for asynchronous communication use"
    ],
    answer: 0,
    explanation: "gRPC is a CNCF incubating project originally developed at Google. Despite being one of the most widely adopted CNCF projects, gRPC remains at the incubating maturity level as of 2025, which is a commonly tested fact. It is a high-performance RPC framework that uses Protocol Buffers (protobuf) for efficient binary serialization and HTTP/2 for transport, enabling features like bidirectional streaming, flow control, and multiplexing.\n\nWhy other options are wrong:\n- B: gRPC is incubating (not graduated) and uses Protocol Buffers over HTTP/2, not XML over HTTP/1.1\n- C: gRPC is part of the CNCF as an incubating project; it is not proprietary Google-only technology\n- D: gRPC is incubating (not sandbox) and is an RPC framework, not a messaging queue\n\nReference: https://www.cncf.io/projects/grpc/",
    verify: null
  },
  {
    id: "s08-q079",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team runs a batch processing system on Kubernetes. They need to process exactly 100 items, with up to 10 Pods running in parallel at any time. Each Pod processes one item and exits. Which Job configuration achieves this?",
    diagram: null,
    options: [
      "`completions: 100, parallelism: 10` — creates Pods in batches of 10 until 100 completions are reached",
      "`completions: 10, parallelism: 100` — creates 100 Pods simultaneously but only counts 10 completions",
      "`completions: 100, parallelism: 100` — creates all 100 Pods simultaneously on available cluster nodes",
      "`completions: 1, parallelism: 10` — runs up to 10 Pods in parallel but only needs 1 to succeed total"
    ],
    answer: 0,
    explanation: "Setting `completions: 100` tells Kubernetes that 100 successful Pod completions are required for the Job to finish. Setting `parallelism: 10` means up to 10 Pods run concurrently at any time. Kubernetes creates new Pods as existing ones complete, maintaining the parallelism level until all 100 completions are achieved.\n\nWhy other options are wrong:\n- B: completions:10,parallelism:100 would only require 10 completions, not 100 items processed\n- C: completions:100,parallelism:100 creates all Pods at once, exceeding the 10 parallel limit\n- D: completions:1 only requires 1 successful completion, insufficient for processing 100 items\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#parallel-jobs",
    verify: "kubectl get job <job-name> -o jsonpath='{.spec.completions},{.spec.parallelism}'"
  },
  {
    id: "s08-q080",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A team wants to collect logs from all containers running in a Kubernetes cluster without modifying any application code. They deploy a logging agent as a DaemonSet that reads container log files from the node. Which log collection pattern does this describe?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="190" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Node-Level Logging Agent Pattern</text><rect x="15" y="40" width="180" height="110" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-dasharray="4"/><text x="105" y="56" text-anchor="middle" fill="#93c5fd" font-size="9">Node</text><rect x="25" y="65" width="60" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="55" y="82" text-anchor="middle" fill="white" font-size="8">Pod A</text><rect x="95" y="65" width="60" height="25" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="125" y="82" text-anchor="middle" fill="white" font-size="8">Pod B</text><rect x="30" y="105" width="55" height="20" rx="3" fill="#374151" stroke="#6b7280"/><text x="57" y="119" text-anchor="middle" fill="#9ca3af" font-size="7">/var/log</text><rect x="100" y="105" width="80" height="30" rx="4" fill="#b45309" stroke="#f59e0b"/><text x="140" y="124" text-anchor="middle" fill="white" font-size="8">Fluentd Agent</text><line x1="55" y1="90" x2="55" y2="105" stroke="#6b7280" stroke-width="1"/><line x1="125" y1="90" x2="85" y2="105" stroke="#6b7280" stroke-width="1"/><line x1="85" y1="115" x2="100" y2="118" stroke="#f59e0b" stroke-width="1.5"/><rect x="250" y="70" width="130" height="45" rx="6" fill="#1e40af" stroke="#3b82f6"/><text x="315" y="92" text-anchor="middle" fill="white" font-size="9">Elasticsearch / Backend</text><line x1="180" y1="120" x2="250" y2="92" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrLog)"/><text x="220" y="100" text-anchor="middle" fill="#fcd34d" font-size="7">forward</text><defs><marker id="arrLog" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#f59e0b"/></marker></defs></svg>',
    options: [
      "Sidecar logging — a logging container is injected into every Pod to capture and forward application logs",
      "Node-level logging agent — a DaemonSet reads container logs from `/var/log/containers/` on each node",
      "Application-level logging — each application writes logs directly to a remote centralized logging service",
      "Event-driven logging — a controller watches Kubernetes Events and forwards them as structured log entries"
    ],
    answer: 1,
    explanation: "The node-level logging agent pattern deploys a DaemonSet (e.g., Fluentd, Fluent Bit, or Filebeat) on every node. The agent reads container log files from the standard node path (`/var/log/containers/`) where the container runtime writes stdout/stderr output. This approach requires no application changes and provides cluster-wide log collection. Sidecar logging adds containers per Pod, which uses more resources.\n\nWhy other options are wrong:\n- A: Sidecar logging injects a container per Pod, not a DaemonSet reading node-level log files\n- C: Application-level logging requires code changes to write directly to a remote service\n- D: Event-driven logging watches K8s Events, not container stdout/stderr log files\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/logging/#using-a-node-logging-agent",
    verify: "kubectl get daemonset -n logging"
  },
  {
    id: "s08-q081",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster admin wants to temporarily prevent scheduling new Pods on a node for maintenance while allowing existing Pods to continue running. Which `kubectl` command achieves this?",
    diagram: null,
    options: [
      "`kubectl cordon <node>` — marks the node as unschedulable without evicting running Pods",
      "`kubectl delete node <node>` — removes the node from the cluster entirely and permanently",
      "`kubectl drain <node>` — cordons the node AND evicts all non-DaemonSet Pods from the node",
      "`kubectl taint nodes <node> maintenance=true:NoExecute` — evicts Pods lacking toleration"
    ],
    answer: 0,
    explanation: "`kubectl cordon` marks a node as `SchedulingDisabled` (unschedulable), preventing new Pods from being assigned to it while allowing existing Pods to continue running. This is useful for preparation before maintenance. `kubectl drain` both cordons and evicts Pods. A `NoExecute` taint would actively evict running Pods. Deleting the node removes it from the cluster entirely.\n\nWhy other options are wrong:\n- B: kubectl delete node permanently removes the node from the cluster, not a temporary prevention\n- C: kubectl drain also evicts Pods from the node; the requirement is to keep existing Pods running\n- D: NoExecute taint evicts Pods lacking toleration; the requirement is to keep existing Pods running\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cordon/",
    verify: "kubectl get nodes"
  },
  {
    id: "s08-q082",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A team is building container images as part of their CI pipeline inside a Kubernetes cluster. They want to build OCI-compliant images without running a Docker daemon. Which tool can build container images in an unprivileged Pod?",
    diagram: null,
    options: [
      "Docker-in-Docker (DinD) — runs a full Docker daemon inside a privileged container for building images",
      "Kaniko — builds OCI container images from a Dockerfile inside a container without a Docker daemon",
      "`kubectl build` — a built-in kubectl subcommand for building container images on cluster worker nodes",
      "`containerd build` — uses the containerd runtime to build OCI container images directly on the node"
    ],
    answer: 1,
    explanation: "Kaniko (a Google open-source project) builds container images from Dockerfiles inside a container or Kubernetes Pod without requiring a Docker daemon or privileged access. It executes each Dockerfile command in user space and produces an OCI-compliant image that can be pushed to a registry. Docker-in-Docker requires privileged mode, which is a security concern. `kubectl build` and `containerd build` are not real commands.\n\nWhy other options are wrong:\n- A: Docker-in-Docker requires a full Docker daemon running in a privileged container, a security concern\n- C: kubectl build is not a real kubectl subcommand; it does not exist\n- D: containerd build is not a real command; containerd does not have a build subcommand\n\nReference: https://github.com/GoogleContainerTools/kaniko",
    verify: null
  },
  {
    id: "s08-q083",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A team needs to implement a NetworkPolicy that allows ingress traffic to their `web` Pods only from Pods labeled `role: frontend` in the same namespace and from any Pod in the `monitoring` namespace. Which NetworkPolicy spec achieves this?",
    diagram: null,
    options: [
      "A single `from` entry with both `podSelector` and `namespaceSelector`, requiring both conditions true simultaneously for every match",
      "A `to` rule with `podSelector` matching `web` Pods and `namespaceSelector` matching `monitoring` namespace for outbound traffic",
      "An `egress` rule allowing traffic from `frontend` Pods to `web` Pods and from `monitoring` namespace Pods for egress controls",
      "Two `from` entries: one with `podSelector: {matchLabels: {role: frontend}}`, another with `namespaceSelector` for `monitoring`"
    ],
    answer: 3,
    explanation: "NetworkPolicy `from` rules use an array of entries. When `podSelector` and `namespaceSelector` are in the same entry, they form an AND condition. To express OR logic (from `frontend` Pods in the same namespace OR from any Pod in `monitoring`), they must be separate entries in the `from` array. The `to` field is for egress rules. Ingress policies require `from` entries.\n\nWhy other options are wrong:\n- A: A single from entry with both selectors creates an AND condition, requiring both to match simultaneously\n- B: The to field is for egress rules, not ingress; and the requirement is about incoming traffic\n- C: Egress rules control outbound traffic from Pods; the requirement is about inbound (ingress) traffic\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#behavior-of-to-and-from-selectors",
    verify: "kubectl get networkpolicy -n <namespace> -o yaml"
  },
  {
    id: "s08-q084",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer creates a Service with no `selector` field and manually creates an Endpoints resource with the same name. What use case does this serve?",
    diagram: null,
    options: [
      "It creates a headless Service that does not forward any traffic to any backend Pod endpoints at all",
      "It creates a Service that load-balances traffic across all Pods in the cluster regardless of labels",
      "It allows the Service to proxy traffic to external endpoints not running as Pods in the cluster",
      "It is an invalid configuration — Services without selectors are rejected by the Kubernetes API server"
    ],
    answer: 2,
    explanation: "A Service without a selector does not automatically create Endpoints. By manually creating an Endpoints resource with the same name, you can point the Service to arbitrary IP addresses — including external systems not running in Kubernetes. This is useful for integrating external databases, third-party APIs, or services in other clusters through the standard Kubernetes Service abstraction.\n\nWhy other options are wrong:\n- A: A Service without selector can still forward traffic when manual Endpoints are created\n- B: Without a selector, the Service does not auto-discover Pods; it does not load-balance across all Pods\n- D: Services without selectors are valid; the API server accepts them for manual endpoint configuration\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#services-without-selectors",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s08-q085",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An architect is reviewing Factor IV (Backing services) of the twelve-factor app methodology. The application connects to PostgreSQL, Redis, and an SMTP service. Which practice aligns with this factor?",
    diagram: null,
    options: [
      "Treat backing services as attached resources swappable via config — e.g., swap local PostgreSQL for RDS by changing a URL",
      "Embed the database driver and connection pool directly in the application binary to avoid any external runtime dependencies",
      "Run all backing services inside the same container as the application process to achieve the lowest possible network latency",
      "Hard-code backing service connection strings in the application source code to ensure reliability and avoid config drift issues"
    ],
    answer: 0,
    explanation: "Factor IV (Backing services) states that backing services (databases, caches, SMTP, message queues) should be treated as attached resources, accessed via URLs or credentials stored in configuration. The application should be able to swap a local PostgreSQL for a managed cloud database (like Amazon RDS) by changing a configuration value without any code changes. This promotes loose coupling and environment portability.\n\nWhy other options are wrong:\n- B: Embedding drivers is fine, but connection pool/config should not be baked in; backing services should be swappable\n- C: Running all services in the same container violates separation and makes swapping impossible\n- D: Hard-coding connection strings couples the app to specific instances, violating the swappable resource principle\n\nReference: https://12factor.net/backing-services",
    verify: null
  },
  {
    id: "s08-q086",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A multi-cluster setup uses the `cloud-controller-manager` to integrate with AWS. Which responsibilities does this component handle?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="190" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Controller Manager</text><rect x="140" y="40" width="120" height="40" rx="6" fill="#4a1d96" stroke="#a78bfa"/><text x="200" y="65" text-anchor="middle" fill="white" font-size="10">cloud-controller-mgr</text><rect x="20" y="120" width="100" height="40" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="70" y="145" text-anchor="middle" fill="white" font-size="9">Node Controller</text><rect x="150" y="120" width="100" height="40" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="200" y="145" text-anchor="middle" fill="white" font-size="9">Route Controller</text><rect x="280" y="120" width="100" height="40" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="330" y="145" text-anchor="middle" fill="white" font-size="9">Service Controller</text><line x1="170" y1="80" x2="70" y2="120" stroke="#a78bfa" stroke-width="1.5"/><line x1="200" y1="80" x2="200" y2="120" stroke="#a78bfa" stroke-width="1.5"/><line x1="230" y1="80" x2="330" y2="120" stroke="#a78bfa" stroke-width="1.5"/></svg>',
    options: [
      "Scheduling Pods to nodes, managing CronJobs, running admission webhooks, and handling resource quota enforcement in all namespaces",
      "Managing cloud controllers: Node controller for instance checks, Route controller for routes, Service controller for LBs",
      "Running etcd backups to cloud object storage, encrypting Secrets with cloud KMS, and managing cloud-based certificate issuance",
      "Building container images using cloud-native build services and pushing finished images to cloud container registry endpoints"
    ],
    answer: 1,
    explanation: "The `cloud-controller-manager` runs cloud-provider-specific control loops that were previously part of the `kube-controller-manager`. It includes: the Node controller (checks cloud provider if nodes still exist), the Route controller (configures cloud networking routes), and the Service controller (provisions cloud load balancers for `LoadBalancer` Services). This separation allows cloud providers to evolve independently of core Kubernetes.\n\nWhy other options are wrong:\n- A: Scheduling, CronJobs, admission webhooks, and quota enforcement are handled by other components\n- C: etcd backups, KMS encryption, and certificate issuance are separate operations, not cloud-controller-manager tasks\n- D: Container image building and pushing are CI/CD tasks, not cloud-controller-manager responsibilities\n\nReference: https://kubernetes.io/docs/concepts/architecture/cloud-controller/",
    verify: "kubectl get pods -n kube-system -l component=cloud-controller-manager"
  },
  {
    id: "s08-q087",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A FinOps team needs to understand Kubernetes cluster cost allocation by namespace and workload. They find that many Pods request far more CPU and memory than they actually use. What is this gap between requested and used resources called?",
    diagram: null,
    options: [
      "Resource slack — the gap between resource requests (reserved capacity) and actual utilization, representing waste",
      "Resource fragmentation — unused capacity on nodes that cannot fit any additional Pod due to scheduling constraints",
      "Resource throttling — the gap between resource limits and actual usage when the kernel restricts CPU time slices",
      "Resource contention — multiple Pods competing for the same finite node resources causing performance degradation"
    ],
    answer: 0,
    explanation: "Resource slack (or resource waste) refers to the difference between what Pods request (reserve) and what they actually consume. Over-requesting resources leads to underutilized nodes and higher infrastructure costs. FinOps practices involve right-sizing resource requests based on actual usage data from monitoring tools like Prometheus and the Vertical Pod Autoscaler's recommendation engine.\n\nWhy other options are wrong:\n- B: Resource fragmentation is unused capacity that cannot fit Pods due to scheduling, not request vs usage gap\n- C: Resource throttling is kernel CPU restriction when hitting limits, not the gap between requests and usage\n- D: Resource contention is Pods competing for resources causing degradation, not request vs usage gap\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: null
  },
  {
    id: "s08-q088",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A team wants to enforce that all containers in their cluster use read-only root filesystems. Which Kubernetes security mechanism can enforce this at the container level?",
    diagram: null,
    options: [
      "Configuring a NetworkPolicy that blocks filesystem write operations on containers within the namespace",
      "Setting `readOnly: true` on the PersistentVolumeClaim attached to the container to prevent writes",
      "Setting `readOnlyRootFilesystem: true` in each container's `securityContext` to make the root filesystem read-only",
      "Using a `ConfigMap` mounted with `readOnly: true` to prevent any writes to the root filesystem path"
    ],
    answer: 2,
    explanation: "The securityContext.readOnlyRootFilesystem: true setting makes the container root filesystem read-only at the kernel level via the OCI runtime. To enforce this across a namespace, teams can use policy engines like OPA Gatekeeper or Kyverno, since the built-in PSS restricted profile only recommends (but does not require) readOnlyRootFilesystem. Writable directories can still be provided via emptyDir volume mounts.\n\nWhy other options are wrong:\n- A: NetworkPolicies control network traffic, not filesystem write operations at the container level\n- B: PVC readOnly makes the volume read-only, not the root filesystem; root FS and PVC are separate\n- D: ConfigMap readOnly makes the ConfigMap mount read-only, not the container's root filesystem\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].securityContext.readOnlyRootFilesystem}'"
  },
  {
    id: "s08-q089",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team uses Horizontal Pod Autoscaler (HPA) to scale their web application. The HPA is configured with `minReplicas: 2`, `maxReplicas: 10`, and `targetCPUUtilizationPercentage: 70`. Current average CPU utilization is 140%. Approximately how many replicas will the HPA scale to?",
    diagram: null,
    options: [
      "4 replicas — the HPA doubles the current count to halve utilization, but this ignores the standard formula",
      "The HPA calculates `ceil(currentReplicas * (currentUtilization / target))` = `ceil(2 * 140/70)` = 4",
      "10 replicas — the HPA scales to the maximum immediately whenever utilization exceeds the target value",
      "2 replicas — the HPA cannot scale above the current count until the next scheduled evaluation period"
    ],
    answer: 1,
    explanation: "The HPA uses the formula: `desiredReplicas = ceil(currentReplicas * (currentMetricValue / targetMetricValue))`. With 2 current replicas and 140% average utilization against a 70% target: `ceil(2 * (140/70))` = `ceil(2 * 2)` = 4 replicas. The HPA scales proportionally to bring utilization close to the target, bounded by minReplicas and maxReplicas.\n\nWhy other options are wrong:\n- A: Doubling the count is coincidentally correct here but ignores the standard formula; the answer description is misleading\n- C: HPA scales proportionally using the formula, not always to max on any target exceedance\n- D: HPA evaluates on a configurable period (default 15s) and can scale above current count immediately\n\nReference: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details",
    verify: "kubectl get hpa"
  },
  {
    id: "s08-q090",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team wants to perform a blue-green deployment for their frontend application. They have the current (blue) version running behind a Service. How do they switch traffic to the new (green) version in Kubernetes?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="210" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">Blue-Green Deployment</text><rect x="30" y="50" width="150" height="70" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/><text x="105" y="70" text-anchor="middle" fill="#93c5fd" font-size="10">Blue (v1)</text><rect x="50" y="85" width="45" height="25" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="72" y="102" text-anchor="middle" fill="white" font-size="9">Pod</text><rect x="110" y="85" width="45" height="25" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="132" y="102" text-anchor="middle" fill="white" font-size="9">Pod</text><rect x="220" y="50" width="150" height="70" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="2"/><text x="295" y="70" text-anchor="middle" fill="#6ee7b7" font-size="10">Green (v2)</text><rect x="240" y="85" width="45" height="25" rx="4" fill="#065f46" stroke="#10b981"/><text x="262" y="102" text-anchor="middle" fill="white" font-size="9">Pod</text><rect x="300" y="85" width="45" height="25" rx="4" fill="#065f46" stroke="#10b981"/><text x="322" y="102" text-anchor="middle" fill="white" font-size="9">Pod</text><rect x="120" y="155" width="160" height="35" rx="6" fill="#7c3aed" stroke="#a78bfa"/><text x="200" y="178" text-anchor="middle" fill="white" font-size="10">Service (selector switch)</text><line x1="200" y1="155" x2="105" y2="120" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6"/><line x1="200" y1="155" x2="295" y2="120" stroke="#10b981" stroke-width="2.5"/></svg>',
    options: [
      "Use `kubectl rollout undo` to switch traffic from the blue Deployment replicas to the green version pods",
      "Deploy green as a separate Deployment, then update the Service selector to match green Pods for a switch",
      "Scale the blue Deployment to 0 and create a new Deployment with the same name but the green image tag",
      "Use a CronJob that periodically checks for new versions and automatically switches the Service selector"
    ],
    answer: 1,
    explanation: "In a blue-green deployment on Kubernetes, both versions run simultaneously as separate Deployments with different labels (e.g., `version: blue` and `version: green`). The Service's `selector` initially points to the blue Pods. To switch traffic, you update the Service selector to match the green Pods. This provides instant cutover and easy rollback by switching the selector back.\n\nWhy other options are wrong:\n- A: kubectl rollout undo reverts to a previous revision within the same Deployment, not blue-green switching\n- C: Scaling blue to 0 causes downtime; blue-green avoids downtime by running both versions simultaneously\n- D: CronJob-based selector switching is not a standard Kubernetes pattern for blue-green deployments\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.selector}'"
  },
  {
    id: "s08-q091",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses `kubectl get events --sort-by='.lastTimestamp'` to troubleshoot cluster issues. What type of information do Kubernetes Events provide?",
    diagram: null,
    options: [
      "Events record audit logs of all API server authentication and authorization decisions for security compliance",
      "Events store persistent application logs from container stdout and stderr streams for long-term retention",
      "Events record state changes for cluster resources: Pod scheduling, image pulls, probe failures, scaling",
      "Events track network packet flows between Pods for security auditing and network performance monitoring"
    ],
    answer: 2,
    explanation: "Kubernetes Events are objects that record significant occurrences in the cluster lifecycle. They capture information about Pod scheduling (`Scheduled`), image pulling (`Pulling`, `Pulled`), container lifecycle (`Created`, `Started`, `Killing`), probe failures (`Unhealthy`), and controller actions (`ScalingReplicaSet`). Events are short-lived by default (retained for 1 hour) and are crucial for troubleshooting.\n\nWhy other options are wrong:\n- A: Events are not audit logs; audit logs are separate API server feature configured via audit policy\n- B: Events are not application logs; container stdout/stderr are separate from Kubernetes Events\n- D: Events do not track network packet flows; network monitoring requires separate tools like Hubble\n\nReference: https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/",
    verify: "kubectl get events --sort-by='.lastTimestamp'"
  },
  {
    id: "s08-q092",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team deploys an application but the Pod shows `CreateContainerConfigError`. The container spec references a Secret named `app-creds` as an environment variable source. The Secret does not exist in the namespace. What is the expected behavior?",
    diagram: null,
    options: [
      "The Pod starts normally with empty environment variables since the referenced Secret resource is not found in the namespace",
      "The kubelet creates the missing Secret automatically with default empty values and proceeds to start the container Pod",
      "The Pod is scheduled but transitions to `CrashLoopBackOff` as the application fails to read the missing credentials",
      "The container cannot start because mandatory env var references to non-existent Secrets cause `CreateContainerConfigError`"
    ],
    answer: 3,
    explanation: "When a container references a Secret (or ConfigMap) via `envFrom` or `env.valueFrom.secretKeyRef` and the referenced resource does not exist, the container cannot be configured and the Pod enters `CreateContainerConfigError`. The container never starts. To make a reference optional, set `optional: true` on the reference, allowing the container to start even if the Secret is missing.\n\nWhy other options are wrong:\n- A: The Pod does NOT start normally; mandatory Secret references cause CreateContainerConfigError\n- B: The kubelet does NOT auto-create missing Secrets; the reference must exist or be marked optional\n- C: The container never starts so it cannot crash; CrashLoopBackOff requires the container to start first\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables",
    verify: "kubectl describe pod <pod-name> | grep -A5 Error"
  },
  {
    id: "s08-q093",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster uses CoreDNS. A Pod in the `backend` namespace tries to reach a Service named `cache-svc` in the `data` namespace. Which DNS name should the Pod use?",
    diagram: null,
    options: [
      "`cache-svc` — short names automatically resolve across all namespaces without further qualification",
      "`cache-svc.cluster.local` — namespace is not needed since Service names are globally unique in DNS",
      "`data.cache-svc.svc.cluster.local` — the namespace prefix comes before the service name in the FQDN",
      "`cache-svc.data.svc.cluster.local` — the FQDN includes service name, namespace, and cluster domain"
    ],
    answer: 3,
    explanation: "Kubernetes DNS follows the pattern `<service-name>.<namespace>.svc.<cluster-domain>`. To reach `cache-svc` in the `data` namespace, the FQDN is `cache-svc.data.svc.cluster.local`. Short names like `cache-svc` only resolve within the same namespace. The cross-namespace form `cache-svc.data` also works due to DNS search domains, but the FQDN is the most explicit and reliable.\n\nWhy other options are wrong:\n- A: Short names only resolve within the same namespace; cross-namespace requires at minimum name.namespace\n- B: Service names are scoped to namespaces and are not globally unique; namespace qualification is needed\n- C: The DNS format is service.namespace.svc.cluster.local, not namespace.service.svc.cluster.local\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl exec <pod-name> -- nslookup cache-svc.data.svc.cluster.local"
  },
  {
    id: "s08-q094",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team is implementing the strangler fig pattern to migrate from a monolith to microservices. What does this pattern involve?",
    diagram: null,
    options: [
      "Rewriting the entire monolith from scratch in a new language and framework then deploying it all at once",
      "Incrementally replacing monolith features with microservices, routing via a facade until fully replaced",
      "Running the monolith and microservices on separate clusters with no shared traffic or communication",
      "Splitting the monolithic database into shards while keeping the existing application code unchanged"
    ],
    answer: 1,
    explanation: "The strangler fig pattern (named after the strangler fig tree) involves gradually replacing parts of a monolithic application with microservices. A facade or API gateway routes requests to either the monolith or the new microservice based on the functionality being requested. Over time, as more features are migrated, the monolith shrinks until it can be decommissioned entirely. This approach reduces risk compared to a full rewrite.\n\nWhy other options are wrong:\n- A: Rewriting from scratch is a big-bang approach with high risk, not the incremental strangler fig pattern\n- C: Running on separate clusters with no shared traffic does not incrementally replace monolith functionality\n- D: Database sharding is a data partitioning technique, not a monolith-to-microservices migration pattern\n\nReference: https://microservices.io/patterns/refactoring/strangler-application.html",
    verify: null
  },
  {
    id: "s08-q095",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod is stuck in `Pending` state. Running `kubectl describe pod` shows the event: `0/5 nodes are available: 2 node(s) had taint {node-role.kubernetes.io/control-plane: }, 3 node(s) didn't match Pod's node affinity/selector`. What does this indicate?",
    diagram: null,
    options: [
      "The Pod's container image cannot be found in the configured container registry endpoint on any node",
      "The Pod has a `nodeSelector` or `nodeAffinity` not matching any worker node, plus control-plane taints",
      "The cluster has no worker nodes available; all 5 nodes are tainted control-plane nodes in the cluster",
      "The Pod's resource requests exceed the total combined capacity of all 5 nodes in the cluster group"
    ],
    answer: 1,
    explanation: "The scheduling message indicates two issues: (1) the 2 control-plane nodes have taints that the Pod does not tolerate, making them ineligible, and (2) the remaining 3 worker nodes do not match the Pod's `nodeSelector` or `nodeAffinity` requirements. To fix this, either update the Pod's node affinity to match available worker node labels or add the expected labels to worker nodes.\n\nWhy other options are wrong:\n- A: Image not found would show ImagePullBackOff, not scheduling failure messages about node matching\n- C: The message shows 2 control-plane + 3 worker nodes = 5 total, not all 5 being control-plane nodes\n- D: Insufficient resources would show 'Insufficient cpu/memory' messages, not node affinity mismatch\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
    verify: "kubectl describe pod <pod-name> | grep -A10 Events"
  },
  {
    id: "s08-q096",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team uses the CNCF Cloud Native Landscape to evaluate projects for their platform. Which statement accurately describes the CNCF landscape?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="240" rx="8" fill="#1e293b" stroke="#334155"/><text x="200" y="25" text-anchor="middle" fill="#94a3b8" font-size="11">CNCF Landscape Categories (Simplified)</text><rect x="20" y="40" width="170" height="30" rx="4" fill="#7c3aed" stroke="#a78bfa"/><text x="105" y="60" text-anchor="middle" fill="white" font-size="9">App Definition &amp; Development</text><rect x="210" y="40" width="170" height="30" rx="4" fill="#0f766e" stroke="#14b8a6"/><text x="295" y="60" text-anchor="middle" fill="white" font-size="9">Orchestration &amp; Management</text><rect x="20" y="80" width="170" height="30" rx="4" fill="#1e40af" stroke="#3b82f6"/><text x="105" y="100" text-anchor="middle" fill="white" font-size="9">Runtime</text><rect x="210" y="80" width="170" height="30" rx="4" fill="#b45309" stroke="#f59e0b"/><text x="295" y="100" text-anchor="middle" fill="white" font-size="9">Provisioning</text><rect x="20" y="120" width="170" height="30" rx="4" fill="#be123c" stroke="#f43f5e"/><text x="105" y="140" text-anchor="middle" fill="white" font-size="9">Observability &amp; Analysis</text><rect x="210" y="120" width="170" height="30" rx="4" fill="#374151" stroke="#6b7280"/><text x="295" y="140" text-anchor="middle" fill="white" font-size="9">Platform</text><rect x="20" y="160" width="360" height="30" rx="4" fill="#064e3b" stroke="#10b981"/><text x="200" y="180" text-anchor="middle" fill="white" font-size="9">Serverless | Security | Storage | Networking</text><text x="200" y="220" text-anchor="middle" fill="#64748b" font-size="9">landscape.cncf.io</text></svg>',
    options: [
      "The CNCF landscape only includes officially hosted CNCF projects and explicitly excludes all commercial products and vendors",
      "The CNCF landscape categorizes cloud native technologies across runtime, orchestration, observability, and the wider ecosystem",
      "The CNCF landscape is a certification program that validates vendor products for Kubernetes compatibility and conformance testing",
      "The CNCF landscape is a dependency graph showing which CNCF projects depend on each other for build and runtime dependencies"
    ],
    answer: 1,
    explanation: "The CNCF Cloud Native Landscape (landscape.cncf.io) is a comprehensive map that organizes cloud native technologies into categories such as App Definition & Development, Orchestration & Management, Runtime, Provisioning, Observability & Analysis, and more. It includes both CNCF-hosted projects (graduated, incubating, sandbox) and the broader ecosystem of commercial and open-source tools. It helps teams evaluate and select technologies for their platform.\n\nWhy other options are wrong:\n- A: The landscape includes both CNCF-hosted projects AND commercial/third-party products and vendors\n- C: The landscape is a map of technologies, not a certification program; conformance testing is separate\n- D: The landscape categorizes technologies, not their build/runtime dependency relationships\n\nReference: https://landscape.cncf.io/",
    verify: null
  },
  {
    id: "s08-q097",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team has multiple environments (dev, staging, production) in the same Kubernetes cluster. They use Namespaces to isolate each environment. Which resources are NOT namespaced and therefore shared across the entire cluster?",
    diagram: null,
    options: [
      "Pods, Services, and ConfigMaps — these are all namespace-scoped and isolated per namespace boundary",
      "Deployments and DaemonSets — these exist at the cluster level and reference namespaces via labels",
      "Nodes, PersistentVolumes, ClusterRoles, and Namespaces themselves — these are cluster-scoped",
      "Secrets and ServiceAccounts — these are cluster-scoped to allow easy cross-namespace access paths"
    ],
    answer: 2,
    explanation: "Certain Kubernetes resources are cluster-scoped, meaning they are not bound to any namespace. Examples include Nodes, PersistentVolumes, ClusterRoles, ClusterRoleBindings, Namespaces, StorageClasses, and CustomResourceDefinitions. Resources like Pods, Services, ConfigMaps, Secrets, Deployments, and ServiceAccounts are namespace-scoped.\n\nWhy other options are wrong:\n- A: Pods, Services, ConfigMaps are indeed namespace-scoped, but this option is correct, not a wrong answer to select\n- B: Deployments and DaemonSets are namespace-scoped, not cluster-scoped\n- D: Secrets and ServiceAccounts are namespace-scoped, not cluster-scoped\n\nReference: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/",
    verify: "kubectl api-resources --namespaced=false"
  },
  {
    id: "s08-q098",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A team runs `kubectl logs <pod-name>` for a Pod that has restarted 5 times. The command only shows logs from the current container instance. How can they view logs from the previous container instance?",
    diagram: null,
    options: [
      "`kubectl logs <pod-name> --all-containers` — shows logs from all container restarts and sidecar containers",
      "`kubectl logs <pod-name> --since=1h` — shows all logs from the past hour across all container restarts",
      "`kubectl describe pod <pod-name>` — the describe output includes full container logs from all restart cycles",
      "`kubectl logs <pod-name> --previous` — shows logs from the previous container instance for crash debugging"
    ],
    answer: 3,
    explanation: "The `--previous` flag (`-p`) on `kubectl logs` retrieves logs from the previous instance of a container. This is essential for debugging `CrashLoopBackOff` situations where the container has restarted and the current logs are empty or show only startup messages. Note that only one previous instance's logs are retained by the kubelet. For long-term log retention, a logging pipeline (Fluentd, Fluent Bit) is needed.\n\nWhy other options are wrong:\n- A: --all-containers shows all containers in the current instance, not previous restart cycles\n- B: --since filters by time but only for the current container instance, not across restarts\n- C: kubectl describe shows Events and container states but not full container logs\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/",
    verify: "kubectl logs <pod-name> --previous"
  },
  {
    id: "s08-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team deploys a Deployment with `strategy.type: Recreate`. What happens during an update?",
    diagram: null,
    options: [
      "All existing Pods are terminated first, then new Pods with the updated spec are created, causing brief downtime",
      "New Pods are created alongside old Pods and traffic is gradually shifted from old version to new version pods",
      "Pods are updated in-place without restarting — the container image is swapped while the Pod continues running",
      "A new ReplicaSet is created and scaled up while simultaneously scaling down the old ReplicaSet one Pod at a time"
    ],
    answer: 0,
    explanation: "The `Recreate` strategy terminates all existing Pods before creating new ones with the updated specification. This results in a period of downtime where no Pods are available. It is typically used for applications that cannot run multiple versions simultaneously (e.g., applications with incompatible database schema changes). `RollingUpdate` (the default) performs a gradual replacement to maintain availability.\n\nWhy other options are wrong:\n- B: Creating new Pods alongside old ones with gradual traffic shift describes canary or rolling update\n- C: In-place container image swap without restart is not supported in standard Kubernetes\n- D: Creating a new ReplicaSet and scaling down the old one describes the RollingUpdate strategy\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#recreate-deployment",
    verify: "kubectl get deployment <name> -o jsonpath='{.spec.strategy.type}'"
  },
  {
    id: "s08-q100",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team is comparing Argo CD and Flux for their GitOps implementation. Both are CNCF graduated projects. Which statement correctly identifies a key architectural difference?",
    diagram: null,
    options: [
      "Argo CD uses a push-based model while Flux uses a pull-based model representing fundamentally different approaches",
      "Argo CD can only deploy Helm charts while Flux can only deploy plain Kubernetes manifests from Git repositories",
      "Argo CD requires a separate Git server component while Flux connects directly to external Git hosting providers",
      "Argo CD has a built-in web UI for app state visualization; Flux uses a CLI-first controller-based architecture"
    ],
    answer: 3,
    explanation: "Both Argo CD and Flux are pull-based GitOps tools. A key difference is that Argo CD includes a rich web UI for application visualization, sync management, and RBAC, making it popular for teams that value visual management. Flux is modular and CLI-first, composed of separate controllers (Source, Kustomize, Helm, Notification, Image Automation), which some teams prefer for its composability and infrastructure-as-code approach. Both support Helm, Kustomize, and plain manifests.\n\nWhy other options are wrong:\n- A: Both Argo CD and Flux use pull-based (not push-based) GitOps models; they are architecturally similar\n- B: Both Argo CD and Flux support Helm, Kustomize, and plain manifests; neither is limited to one\n- C: Neither requires a separate Git server; both connect to external Git providers like GitHub, GitLab\n\nReference: https://www.cncf.io/projects/argo/",
    verify: null
  }
];

var labExercises = [
  {
    title: "Lab 1: Exploring CNCF Components in a MicroK8s Cluster",
    description: "Examine the CNCF graduated projects running inside a MicroK8s Kubernetes cluster, including CoreDNS for service discovery and containerd as the container runtime.",
    commands: [
      "<span class='prompt'>$</span> kubectl get pods -n kube-system -l k8s-app=kube-dns",
      "# Observe the CoreDNS Pods that handle in-cluster DNS resolution",
      "",
      "<span class='prompt'>$</span> kubectl get pods -n kube-system -l k8s-app=kube-dns -o wide",
      "# Note the node each CoreDNS Pod runs on and its IP address",
      "",
      "<span class='prompt'>$</span> kubectl describe configmap coredns -n kube-system",
      "# Review the CoreDNS Corefile configuration, including plugins like 'kubernetes', 'forward', and 'cache'",
      "",
      "<span class='prompt'>$</span> kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.nodeInfo.containerRuntimeVersion}{\"\\n\"}{end}'",
      "# Check the container runtime version on each node — should show containerd",
      "",
      "<span class='prompt'>$</span> kubectl run dns-test --image=busybox:1.36 --restart=Never --rm -it -- nslookup kubernetes.default.svc.cluster.local",
      "# Test DNS resolution by looking up the kubernetes API Service"
    ],
    expectedOutput: "You should see CoreDNS Pods running in the kube-system namespace, the Corefile configuration showing Kubernetes DNS plugin enabled, containerd listed as the container runtime on each node, and successful DNS resolution of the `kubernetes.default.svc.cluster.local` Service to a ClusterIP address."
  },
  {
    title: "Lab 2: Deploying a Microservices Sample Application",
    description: "Deploy a multi-service application consisting of a frontend, backend API, and Redis cache. Observe how Kubernetes Services enable inter-service communication following microservices principles.",
    commands: [
      "<span class='prompt'>$</span> kubectl create namespace microservices-demo",
      "",
      "<span class='prompt'>$</span> kubectl apply -n microservices-demo -f - <<'EOF'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: redis\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: redis\n  template:\n    metadata:\n      labels:\n        app: redis\n    spec:\n      containers:\n      - name: redis\n        image: redis:7-alpine\n        ports:\n        - containerPort: 6379\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\n          limits:\n            cpu: 100m\n            memory: 128Mi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: redis\nspec:\n  selector:\n    app: redis\n  ports:\n  - port: 6379\n    targetPort: 6379\nEOF",
      "# Deploy Redis as a backing service with its own Service for discovery",
      "",
      "<span class='prompt'>$</span> kubectl apply -n microservices-demo -f - <<'EOF'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: backend-api\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: backend-api\n  template:\n    metadata:\n      labels:\n        app: backend-api\n    spec:\n      containers:\n      - name: api\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\n          limits:\n            cpu: 100m\n            memory: 128Mi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: backend-api\nspec:\n  selector:\n    app: backend-api\n  ports:\n  - port: 80\n    targetPort: 80\nEOF",
      "# Deploy the backend API with 2 replicas and a ClusterIP Service",
      "",
      "<span class='prompt'>$</span> kubectl get all -n microservices-demo",
      "# Verify all Deployments, Pods, and Services are running",
      "",
      "<span class='prompt'>$</span> kubectl run test-client -n microservices-demo --image=busybox:1.36 --restart=Never --rm -it -- wget -qO- http://backend-api.microservices-demo.svc.cluster.local",
      "# Test inter-service DNS resolution and connectivity",
      "",
      "<span class='prompt'>$</span> kubectl delete namespace microservices-demo",
      "# Clean up all resources"
    ],
    expectedOutput: "You should see a Redis Pod, 2 backend-api Pods, and their corresponding Services running in the microservices-demo namespace. The test client should successfully reach the backend-api Service via its DNS name, demonstrating Kubernetes service discovery for microservices communication."
  },
  {
    title: "Lab 3: Examining the Container Runtime (containerd)",
    description: "Explore containerd as the CRI-compliant container runtime. Use crictl to inspect containers, images, and runtime configuration on a cluster node.",
    commands: [
      "<span class='prompt'>$</span> kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.nodeInfo.containerRuntimeVersion}{\"\\n\"}{end}'",
      "# Verify the container runtime on each node",
      "",
      "<span class='prompt'>$</span> sudo crictl info | head -30",
      "# Display containerd runtime info via CRI (run on a cluster node)",
      "",
      "<span class='prompt'>$</span> sudo crictl pods --namespace kube-system",
      "# List all CRI pods in the kube-system namespace",
      "",
      "<span class='prompt'>$</span> sudo crictl images | head -20",
      "# List container images cached on the node",
      "",
      "<span class='prompt'>$</span> sudo crictl ps --latest",
      "# Show the most recently created container",
      "",
      "<span class='prompt'>$</span> sudo crictl stats",
      "# Display resource usage statistics for running containers",
      "",
      "<span class='prompt'>$</span> sudo crictl inspect $(sudo crictl ps -q | head -1) | head -40",
      "# Inspect the first running container to see its OCI runtime spec details"
    ],
    expectedOutput: "You should see containerd listed as the runtime, a list of CRI sandbox pods in kube-system, cached container images, running container details, and resource stats. The inspect output reveals the OCI runtime specification including namespaces, cgroups, and mounts configured for the container."
  },
  {
    title: "Lab 4: Working with Helm to Install a Chart",
    description: "Use Helm — the CNCF graduated package manager — to add a chart repository, inspect chart values, install a release, and manage its lifecycle.",
    commands: [
      "<span class='prompt'>$</span> helm version",
      "# Verify Helm is installed and check the version",
      "",
      "<span class='prompt'>$</span> helm repo add bitnami https://charts.bitnami.com/bitnami",
      "# Add the Bitnami chart repository",
      "",
      "<span class='prompt'>$</span> helm repo update",
      "# Update the local chart repository index",
      "",
      "<span class='prompt'>$</span> helm search repo bitnami/nginx --versions | head -10",
      "# Search for available NGINX chart versions",
      "",
      "<span class='prompt'>$</span> helm show values bitnami/nginx | head -40",
      "# Inspect the default values for the NGINX chart",
      "",
      "<span class='prompt'>$</span> helm install my-nginx bitnami/nginx --set replicaCount=2 --set service.type=ClusterIP --namespace helm-demo --create-namespace",
      "# Install the NGINX chart with custom values",
      "",
      "<span class='prompt'>$</span> helm list -n helm-demo",
      "# List Helm releases in the namespace",
      "",
      "<span class='prompt'>$</span> helm get values my-nginx -n helm-demo",
      "# View the user-supplied values for the release",
      "",
      "<span class='prompt'>$</span> kubectl get all -n helm-demo",
      "# Verify the Kubernetes resources created by Helm",
      "",
      "<span class='prompt'>$</span> helm uninstall my-nginx -n helm-demo && kubectl delete namespace helm-demo",
      "# Clean up the Helm release and namespace"
    ],
    expectedOutput: "You should see Helm install an NGINX chart with 2 replicas using ClusterIP Service type. The `helm list` command shows the release with status 'deployed'. The `kubectl get all` output shows the Deployment, Pods, Service, and ReplicaSet created by the chart. After uninstall, all resources are cleaned up."
  },
  {
    title: "Lab 5: Exploring etcd with etcdctl",
    description: "Use etcdctl to interact with the etcd datastore that backs the Kubernetes API. Practice listing keys, reading cluster state, and creating a snapshot backup.",
    commands: [
      "<span class='prompt'>$</span> kubectl get pods -n kube-system -l component=etcd",
      "# Verify etcd is running as a static Pod in the control plane",
      "",
      "<span class='prompt'>$</span> kubectl exec -n kube-system etcd-$(hostname) -- etcdctl version",
      "# Check the etcdctl version (may need TLS flags depending on setup)",
      "",
      "<span class='prompt'>$</span> sudo ETCDCTL_API=3 etcdctl \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/var/snap/microk8s/current/certs/ca.crt \\\n  --cert=/var/snap/microk8s/current/certs/server.crt \\\n  --key=/var/snap/microk8s/current/certs/server.key \\\n  member list -w table",
      "# List etcd cluster members (adjust cert paths for your distribution)",
      "",
      "<span class='prompt'>$</span> sudo ETCDCTL_API=3 etcdctl \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/var/snap/microk8s/current/certs/ca.crt \\\n  --cert=/var/snap/microk8s/current/certs/server.crt \\\n  --key=/var/snap/microk8s/current/certs/server.key \\\n  get /registry/namespaces --prefix --keys-only | head -20",
      "# List keys under /registry/namespaces to see how Kubernetes stores namespace objects",
      "",
      "<span class='prompt'>$</span> sudo ETCDCTL_API=3 etcdctl \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/var/snap/microk8s/current/certs/ca.crt \\\n  --cert=/var/snap/microk8s/current/certs/server.crt \\\n  --key=/var/snap/microk8s/current/certs/server.key \\\n  endpoint health",
      "# Check the health of the etcd endpoint",
      "",
      "<span class='prompt'>$</span> sudo ETCDCTL_API=3 etcdctl \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/var/snap/microk8s/current/certs/ca.crt \\\n  --cert=/var/snap/microk8s/current/certs/server.crt \\\n  --key=/var/snap/microk8s/current/certs/server.key \\\n  snapshot save /tmp/etcd-backup.db",
      "# Create a snapshot backup of the etcd database",
      "",
      "<span class='prompt'>$</span> sudo ETCDCTL_API=3 etcdctl snapshot status /tmp/etcd-backup.db -w table",
      "# Verify the snapshot by displaying its metadata"
    ],
    expectedOutput: "You should see the etcd cluster member(s) listed in a table, keys under `/registry/namespaces` showing how Kubernetes persists namespace objects, a healthy endpoint status, and a successful snapshot save. The snapshot status shows the hash, revision, total keys, and total size of the backup."
  },
  {
    title: "Lab 6: Setting Up a Basic Service Mesh Concept with Multiple Services",
    description: "Simulate a service mesh concept by deploying three interconnected services (frontend, catalog, and orders). Observe east-west traffic patterns and understand where a service mesh proxy would be injected.",
    commands: [
      "<span class='prompt'>$</span> kubectl create namespace mesh-demo",
      "",
      "<span class='prompt'>$</span> kubectl apply -n mesh-demo -f - <<'EOF'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: catalog-svc\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: catalog\n  template:\n    metadata:\n      labels:\n        app: catalog\n        version: v1\n    spec:\n      containers:\n      - name: catalog\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: catalog-svc\nspec:\n  selector:\n    app: catalog\n  ports:\n  - port: 80\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orders-svc\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: orders\n  template:\n    metadata:\n      labels:\n        app: orders\n        version: v1\n    spec:\n      containers:\n      - name: orders\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: orders-svc\nspec:\n  selector:\n    app: orders\n  ports:\n  - port: 80\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: frontend\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: frontend\n  template:\n    metadata:\n      labels:\n        app: frontend\n        version: v1\n    spec:\n      containers:\n      - name: frontend\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: frontend\nspec:\n  selector:\n    app: frontend\n  ports:\n  - port: 80\nEOF",
      "# Deploy three services: frontend, catalog, and orders",
      "",
      "<span class='prompt'>$</span> kubectl get pods -n mesh-demo -o wide --show-labels",
      "# View all Pods with their IPs and labels — notice each Pod has only 1 container (no sidecar)",
      "",
      "<span class='prompt'>$</span> kubectl exec -n mesh-demo deploy/frontend -- wget -qO- http://catalog-svc.mesh-demo.svc.cluster.local",
      "# Test east-west traffic: frontend calls catalog-svc",
      "",
      "<span class='prompt'>$</span> kubectl exec -n mesh-demo deploy/frontend -- wget -qO- http://orders-svc.mesh-demo.svc.cluster.local",
      "# Test east-west traffic: frontend calls orders-svc",
      "",
      "<span class='prompt'>$</span> kubectl get pods -n mesh-demo -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t containers: \"}{range .spec.containers[*]}{.name}{\" \"}{end}{\"\\n\"}{end}'",
      "# Show that each Pod has only 1 container — with a service mesh, each Pod would have an additional sidecar proxy container",
      "",
      "<span class='prompt'>$</span> echo '--- In a real service mesh (e.g., Linkerd or Istio), each Pod would have 2 containers: the app + a proxy sidecar ---'",
      "# The sidecar proxy would handle mTLS, traffic shifting, retries, and observability transparently",
      "",
      "<span class='prompt'>$</span> kubectl delete namespace mesh-demo",
      "# Clean up"
    ],
    expectedOutput: "You should see 5 Pods (2 catalog, 2 orders, 1 frontend) running with 1 container each. The wget commands demonstrate successful east-west service-to-service communication. The container list confirms no sidecar proxies are present. In a service mesh deployment, each Pod would show 2 containers (the application plus an Envoy or Linkerd proxy sidecar) that transparently handle mTLS, retries, and traffic management."
  }
];
