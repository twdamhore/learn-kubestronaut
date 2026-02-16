var EXAM_SET = 6;
var EXAM_TITLE = "KCNA Practice Exam - Set 06: Scheduling & Cluster Operations";
var questions = [
  {
    id: "s06-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A team wants to ensure their GPU-intensive workload runs only on nodes with NVIDIA GPUs. They have already labeled those nodes with <code>gpu=nvidia</code>. Which Pod spec field is the simplest way to target these nodes?",
    diagram: null,
    options: [
      "A. `spec.affinity.nodeAffinity` with a `requiredDuringScheduling` match expression rule",
      "B. `spec.nodeSelector` with the label key-value pair `gpu: nvidia` specified",
      "C. `spec.tolerations` with key `gpu`, value `nvidia`, and the `NoSchedule` effect",
      "D. `spec.nodeName` hardcoded to the specific hostname of the target GPU node"
    ],
    answer: 1,
    explanation: "`nodeSelector` is the simplest mechanism for constraining Pods to nodes with specific labels. It requires an exact label match and is easier to configure than node affinity. Tolerations address taints, not labels, and `nodeName` bypasses the scheduler entirely, making it inflexible.",
    verify: "kubectl explain pod.spec.nodeSelector"
  },
  {
    id: "s06-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You apply a taint <code>kubectl taint nodes node1 dedicated=ml:NoSchedule</code>. A data-processing Pod without any tolerations is pending. What happens when the scheduler evaluates node1?",
    diagram: null,
    options: [
      "C. The scheduler skips node1 because the Pod lacks a matching toleration",
      "B. The Pod is scheduled on node1 with a taint-mismatch warning event recorded",
      "A. The Pod is scheduled on node1 but immediately enters `CrashLoopBackOff` status",
      "D. The taint is ignored when the Pod has a `nodeSelector` matching node1 labels"
    ],
    answer: 0,
    explanation: "A `NoSchedule` taint prevents any Pod without a matching toleration from being scheduled on that node. The scheduler filters out node1 during the filtering phase. Even if `nodeSelector` matches node1, the taint still blocks scheduling, leaving the Pod pending.",
    verify: "kubectl describe node node1 | grep -i taint"
  },
  {
    id: "s06-q003",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After upgrading the control plane, a cluster administrator notices that several Pods are stuck in <code>Pending</code>. The nodes show status <code>Ready,SchedulingDisabled</code>. What is the most likely cause?",
    diagram: null,
    options: [
      "B. The kubelet process on each worker node has crashed during the upgrade",
      "A. The nodes were cordoned during the upgrade and were never uncordoned",
      "C. The kube-scheduler Pod failed to restart properly after the upgrade",
      "D. The Pods exceed the configured cluster-wide resource quota settings"
    ],
    answer: 1,
    explanation: "The `Ready,SchedulingDisabled` status indicates the nodes were cordoned with `kubectl cordon`. This prevents new Pods from being scheduled on them. After a rolling upgrade, administrators must run `kubectl uncordon` on each node to re-enable scheduling.",
    verify: "kubectl get nodes"
  },
  {
    id: "s06-q004",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An SRE team must back up the cluster state before a major upgrade. Which component stores all cluster configuration and state data that needs to be backed up?",
    diagram: null,
    options: [
      "A. kube-apiserver, the cluster API frontend",
      "B. kube-controller-manager, the loop runner",
      "C. etcd, the cluster key-value data store",
      "D. kube-scheduler, the Pod placement engine"
    ],
    answer: 2,
    explanation: "etcd is the distributed key-value store that holds all Kubernetes cluster state including resource definitions, secrets, and config maps. Backing up etcd with `etcdctl snapshot save` captures the entire cluster state. The API server and other components are stateless and read from etcd.",
    verify: "kubectl -n kube-system get pods -l component=etcd"
  },
  {
    id: "s06-q005",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team is designing their cluster upgrade strategy. They want zero-downtime deployments and the ability to roll back quickly. Which approach best aligns with cloud-native principles?",
    diagram: null,
    options: [
      "A. In-place upgrade of all nodes simultaneously without any workload migration",
      "B. Upgrading only the control plane and leaving workers on the old version",
      "C. Creating a new cluster and migrating all workloads to it in one batch",
      "D. Rolling upgrade with cordon, drain, upgrade, and uncordon per node"
    ],
    answer: 3,
    explanation: "A rolling upgrade strategy processes one node at a time: cordon to prevent new scheduling, drain to evict existing Pods, upgrade the node, then uncordon. This ensures workload availability throughout the process and allows rollback by stopping the procedure.",
    verify: "kubectl get nodes -o wide"
  },
  {
    id: "s06-q006",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You need a Pod to prefer nodes in availability zone <code>us-east-1a</code> but still schedule elsewhere if those nodes are full. Which scheduling construct should you use?",
    diagram: null,
    options: [
      "C. `preferredDuringSchedulingIgnoredDuringExecution` node affinity",
      "B. `requiredDuringSchedulingIgnoredDuringExecution` node affinity rule",
      "A. `nodeSelector` with `topology.kubernetes.io/zone: us-east-1a` label",
      "D. A taint on all non-`us-east-1a` nodes with a `NoSchedule` effect"
    ],
    answer: 0,
    explanation: "`preferredDuringSchedulingIgnoredDuringExecution` is a soft requirement that tells the scheduler to try to place the Pod on matching nodes but allows scheduling elsewhere if no matching nodes are available. `nodeSelector` and `required` affinity are hard constraints that would leave the Pod pending.",
    verify: "kubectl explain pod.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution"
  },
  {
    id: "s06-q007",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security policy requires that only infrastructure Pods run on control-plane nodes. The control-plane nodes already have the taint <code>node-role.kubernetes.io/control-plane:NoSchedule</code>. How should the infrastructure Pods be configured?",
    diagram: null,
    options: [
      "A. Add `nodeSelector: node-role.kubernetes.io/control-plane: \"\"` to match labels",
      "B. Set `spec.nodeName` to the hostname of each individual control-plane node in turn",
      "C. Add a toleration for key `node-role.kubernetes.io/control-plane`, effect `NoSchedule`",
      "D. Remove the taint from the control-plane nodes and enforce isolation via `NetworkPolicy`"
    ],
    answer: 2,
    explanation: "To schedule Pods on tainted nodes, the Pods must carry a matching toleration. Adding a toleration with the correct key and effect allows the scheduler to consider control-plane nodes. A `nodeSelector` alone does not bypass taints, and removing the taint would defeat the isolation purpose.",
    verify: "kubectl describe node <control-plane-node> | grep Taints"
  },
  {
    id: "s06-q008",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A microservices application has a web frontend and a cache service. The team wants both Pods to be scheduled on the same node for low latency. Which mechanism achieves this?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="35" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">Pod Affinity – Same Node</text><rect x="50" y="55" width="130" height="60" rx="6" fill="#0d2137" stroke="#326ce5" stroke-width="1.5"/><text x="115" y="82" text-anchor="middle" fill="#ccc" font-size="11">web-frontend</text><text x="115" y="100" text-anchor="middle" fill="#888" font-size="9">app=frontend</text><rect x="220" y="55" width="130" height="60" rx="6" fill="#0d2137" stroke="#326ce5" stroke-width="1.5"/><text x="285" y="82" text-anchor="middle" fill="#ccc" font-size="11">cache-service</text><text x="285" y="100" text-anchor="middle" fill="#888" font-size="9">app=cache</text><line x1="180" y1="85" x2="220" y2="85" stroke="#4caf50" stroke-width="2" stroke-dasharray="5,3"/><text x="200" y="78" text-anchor="middle" fill="#4caf50" font-size="9">affinity</text><rect x="30" y="130" width="340" height="40" rx="6" fill="#0d2137" stroke="#555" stroke-width="1"/><text x="200" y="155" text-anchor="middle" fill="#aaa" font-size="11">Node (topologyKey: kubernetes.io/hostname)</text></svg>',
    options: [
      "A. Pod anti-affinity with `topologyKey: kubernetes.io/hostname` specified",
      "B. Pod affinity with `topologyKey: kubernetes.io/hostname` specified",
      "C. Node affinity targeting a specific label applied to certain nodes",
      "D. Setting `hostNetwork: true` on both the frontend and cache Pods"
    ],
    answer: 1,
    explanation: "Pod affinity with `topologyKey: kubernetes.io/hostname` tells the scheduler to place the Pod on a node where a Pod matching the label selector is already running. This co-locates the web frontend and cache on the same node. Pod anti-affinity does the opposite, spreading Pods apart.",
    verify: "kubectl explain pod.spec.affinity.podAffinity"
  },
  {
    id: "s06-q009",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "After draining a node for maintenance, you want to verify that all Pods have been successfully evicted. Which command provides the most direct confirmation?",
    diagram: null,
    options: [
      "A. `kubectl top node <node-name>` to check resource usage after the eviction",
      "D. `kubectl get pods --all-namespaces --field-selector spec.nodeName=<n>`",
      "C. `kubectl describe node <node-name>` and then check the Conditions section",
      "B. `kubectl get events --field-selector involvedObject.name=<node-name>` list"
    ],
    answer: 1,
    explanation: "Filtering Pods by `spec.nodeName` shows exactly which Pods remain on the drained node. DaemonSet Pods with appropriate tolerations may still appear. `kubectl top` shows resource usage but not Pod presence, and node conditions do not reflect individual Pod status.",
    verify: "kubectl get pods --all-namespaces --field-selector spec.nodeName=<node-name>"
  },
  {
    id: "s06-q010",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "During a cluster upgrade, the administrator must upgrade components in a specific order. Which sequence is correct for upgrading a kubeadm-managed cluster?",
    diagram: null,
    options: [
      "A. kubelet -> kube-apiserver -> kube-controller-manager -> kube-scheduler -> kube-proxy",
      "B. kube-apiserver -> kube-controller-manager -> kube-scheduler -> kubelet -> kube-proxy",
      "C. etcd -> kubelet -> kube-apiserver -> kube-proxy -> kube-controller-manager component",
      "D. kube-scheduler -> kube-controller-manager -> kube-apiserver -> kubelet -> kube-proxy"
    ],
    answer: 1,
    explanation: "Kubernetes requires upgrading control-plane components first in a specific order: kube-apiserver, then kube-controller-manager and kube-scheduler, followed by kubelet and kube-proxy on worker nodes. This ensures API compatibility throughout the process.",
    verify: "kubeadm upgrade plan"
  },
  {
    id: "s06-q011",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod with resource requests of <code>cpu: 4</code> and <code>memory: 8Gi</code> is stuck in <code>Pending</code>. The cluster has 3 nodes each with 4 CPU cores and 8Gi memory, but all have existing workloads consuming about 1 CPU. What is the issue?",
    diagram: null,
    options: [
      "A. The Pod requests exceed the total cluster capacity across all the nodes",
      "B. No single node has enough unreserved CPU to satisfy the Pod request",
      "C. The memory request is too high for the allocatable memory on the nodes",
      "D. The Pod is missing a `priorityClassName` needed for large Pod requests"
    ],
    answer: 1,
    explanation: "Each node has 4 CPUs but existing workloads already consume about 1 CPU each, leaving roughly 3 allocatable CPUs per node. The Pod requests 4 CPUs, which no single node can satisfy. The scheduler cannot split requests across nodes; a Pod must fit entirely on one node.",
    verify: "kubectl describe pod <pod-name> | grep -A5 Events"
  },
  {
    id: "s06-q012",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "What is the effect of the taint <code>node.kubernetes.io/unreachable:NoExecute</code> that Kubernetes automatically applies to a node that loses connectivity?",
    diagram: null,
    options: [
      "A. New Pods are prevented from scheduling but existing Pods continue to run on the node",
      "B. Pods without a matching toleration are evicted after the tolerationSeconds period",
      "C. The node is immediately removed from the cluster and all running Pods are terminated",
      "D. Only DaemonSet-managed Pods are evicted from the node when it goes offline entirely"
    ],
    answer: 1,
    explanation: "`NoExecute` taints not only prevent new Pod scheduling but also evict existing Pods that lack a matching toleration. Pods can specify `tolerationSeconds` to remain for a grace period before eviction. This mechanism ensures workloads are moved off unhealthy nodes automatically.",
    verify: "kubectl describe node <node-name> | grep Taints"
  },
  {
    id: "s06-q013",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A company uses a Kubernetes ecosystem project to manage their cluster lifecycle, including provisioning, upgrading, and scaling Kubernetes clusters declaratively. Which project is this?",
    diagram: null,
    options: [
      "A. Cluster API, for lifecycle management",
      "B. Helm, for chart packaging and templates",
      "C. Argo CD, for GitOps delivery flow ops",
      "D. Flux, for continuous reconciliation sync"
    ],
    answer: 0,
    explanation: "Cluster API is a Kubernetes SIG project that provides declarative APIs for cluster creation, configuration, and management. It enables treating cluster infrastructure as Kubernetes resources, supporting lifecycle operations like upgrades and scaling across multiple providers.",
    verify: null
  },
  {
    id: "s06-q014",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "Before draining a node, you notice a Pod using a local PersistentVolume. What should you consider about the drain operation?",
    diagram: null,
    options: [
      "A. The drain command will automatically migrate the local volume data to a different node in turn",
      "D. Local volumes are automatically replicated across all nodes, so there is no data loss whatsoever",
      "C. The drain command will fail unless the `--force` flag is used for Pods with local volumes here",
      "B. The Pod is evicted but its data on the local volume is inaccessible from the new node"
    ],
    answer: 3,
    explanation: "Local PersistentVolumes are bound to a specific node. When a Pod using a local PV is evicted during drain, the rescheduled Pod cannot access the data unless it lands on the same node. This is a critical consideration for stateful workloads using local storage during maintenance.",
    verify: "kubectl get pv -o wide"
  },
  {
    id: "s06-q015",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "During a cluster upgrade, the platform team uses a strategy where they create a new node pool with the upgraded version, migrate workloads, then decommission the old pool. Which pattern does this follow?",
    diagram: null,
    options: [
      "A. Blue-green node pool replacement",
      "B. In-place rolling update on nodes",
      "C. Canary deployment of new version",
      "D. Recreate strategy replacing all"
    ],
    answer: 0,
    explanation: "This is a blue-green node replacement strategy where a new set of nodes (green) is provisioned alongside existing nodes (blue). Workloads are migrated by cordoning and draining old nodes. Once verified, old nodes are decommissioned, enabling quick rollback by keeping them temporarily.",
    verify: "kubectl get nodes --show-labels"
  },
  {
    id: "s06-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A DaemonSet Pod runs a log collector on every node. During a drain operation, you notice the DaemonSet Pod is not evicted. Why?",
    diagram: null,
    options: [
      "A. DaemonSet Pods have a higher scheduling priority than other Pods",
      "B. DaemonSet Pods automatically include tolerations for all taints",
      "C. The drain command cannot evict any Pods in the `kube-system` namespace",
      "D. `kubectl drain` refuses to evict DaemonSet-managed Pods and requires the `--ignore-daemonsets` flag to proceed"
    ],
    answer: 3,
    explanation: "`kubectl drain` skips DaemonSet-managed Pods by default because they are expected to run on every node. The `--ignore-daemonsets` flag must be passed to acknowledge this behavior. Without it, the drain command will report an error about DaemonSet Pods.",
    verify: "kubectl drain <node-name> --ignore-daemonsets --dry-run=client"
  },
  {
    id: "s06-q017",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You configure a Pod with both a <code>nodeSelector</code> and a <code>nodeAffinity</code> rule. How does the scheduler evaluate them?",
    diagram: null,
    options: [
      "A. `nodeSelector` takes precedence and `nodeAffinity` is ignored",
      "B. Both constraints must be satisfied for the node to be eligible",
      "C. `nodeAffinity` takes precedence and `nodeSelector` is ignored",
      "D. The scheduler picks whichever constraint matches the most nodes"
    ],
    answer: 1,
    explanation: "When both `nodeSelector` and `nodeAffinity` are specified, a node must satisfy both constraints to be eligible. They act as an AND condition. The scheduler first filters by `nodeSelector` labels, then applies `nodeAffinity` rules to the remaining candidates.",
    verify: "kubectl explain pod.spec.nodeSelector"
  },
  {
    id: "s06-q018",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "After performing an etcd backup, you want to verify the snapshot file is valid. Which command checks the integrity of the backup?",
    diagram: null,
    options: [
      "A. `etcdctl snapshot verify backup.db`",
      "B. `etcdctl snapshot status backup.db`",
      "C. `etcdctl check backup.db --integrity`",
      "D. `etcdctl endpoint health --snapshot`"
    ],
    answer: 1,
    explanation: "`etcdctl snapshot status` displays metadata about the snapshot including hash, revision, total keys, and size, allowing you to verify the backup is valid and contains data. There is no `snapshot verify` subcommand in etcdctl.",
    verify: "ETCDCTL_API=3 etcdctl snapshot status backup.db --write-out=table"
  },
  {
    id: "s06-q019",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A node is being drained, and a Service backed by a Deployment has Pods on that node. What ensures traffic is not sent to the evicted Pods during the drain?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="240" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">Service Endpoint Updates During Drain</text><rect x="140" y="42" width="120" height="35" rx="6" fill="#0d2137" stroke="#326ce5" stroke-width="1.5"/><text x="200" y="64" text-anchor="middle" fill="#ccc" font-size="11">Service</text><rect x="30" y="110" width="100" height="50" rx="6" fill="#0d2137" stroke="#4caf50" stroke-width="1.5"/><text x="80" y="132" text-anchor="middle" fill="#4caf50" font-size="10">Pod (healthy)</text><text x="80" y="148" text-anchor="middle" fill="#888" font-size="9">Node A</text><rect x="150" y="110" width="100" height="50" rx="6" fill="#0d2137" stroke="#4caf50" stroke-width="1.5"/><text x="200" y="132" text-anchor="middle" fill="#4caf50" font-size="10">Pod (healthy)</text><text x="200" y="148" text-anchor="middle" fill="#888" font-size="9">Node B</text><rect x="270" y="110" width="100" height="50" rx="6" fill="#0d2137" stroke="#f44336" stroke-width="1.5" stroke-dasharray="5,3"/><text x="320" y="132" text-anchor="middle" fill="#f44336" font-size="10">Pod (evicting)</text><text x="320" y="148" text-anchor="middle" fill="#888" font-size="9">Node C (drain)</text><line x1="175" y1="77" x2="80" y2="110" stroke="#4caf50" stroke-width="1.5"/><line x1="200" y1="77" x2="200" y2="110" stroke="#4caf50" stroke-width="1.5"/><line x1="225" y1="77" x2="320" y2="110" stroke="#f44336" stroke-width="1.5" stroke-dasharray="4,3"/><text x="280" y="95" fill="#f44336" font-size="9">removed</text><rect x="70" y="185" width="260" height="35" rx="6" fill="#1a2a1a" stroke="#4caf50" stroke-width="1"/><text x="200" y="207" text-anchor="middle" fill="#4caf50" font-size="10">Endpoint controller removes evicted Pod from Endpoints</text></svg>',
    options: [
      "A. The kube-proxy component immediately blocks all traffic to the drained node",
      "B. The endpoint controller removes the terminating Pod from Service Endpoints",
      "C. The PodDisruptionBudget prevents any traffic loss during drain operations",
      "D. The Service automatically reroutes traffic based on periodic node health checks"
    ],
    answer: 1,
    explanation: "When a Pod begins terminating, the endpoint controller removes it from the Service's Endpoints object. kube-proxy then updates iptables or IPVS rules, stopping new traffic from reaching the evicted Pod. This is the standard Kubernetes mechanism for graceful Pod removal.",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s06-q020",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster uses PodDisruptionBudgets (PDBs). A PDB for a StatefulSet specifies <code>minAvailable: 2</code> and the StatefulSet has 3 replicas. How many Pods can be simultaneously disrupted by a drain operation?",
    diagram: null,
    options: [
      "A. 0",
      "B. 1",
      "C. 2",
      "D. 3"
    ],
    answer: 1,
    explanation: "With `minAvailable: 2` and 3 replicas, only 1 Pod can be disrupted at a time. The eviction API respects the PDB and will not allow more evictions until the disrupted Pod is replaced and running. This ensures the StatefulSet maintains at least 2 healthy replicas.",
    verify: "kubectl get pdb"
  },
  {
    id: "s06-q021",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform engineer wants to ensure that critical monitoring Pods are scheduled before batch processing Pods when cluster resources are constrained. Which Kubernetes feature should they use?",
    diagram: null,
    options: [
      "A. Resource quotas applied at the namespace level",
      "B. Pod affinity rules targeting monitoring nodes",
      "C. PriorityClasses with preemption enabled",
      "D. LimitRanges applied to batch workload Pods"
    ],
    answer: 2,
    explanation: "PriorityClasses assign scheduling priority to Pods. When resources are scarce, higher-priority Pods can preempt lower-priority ones. Setting monitoring Pods to a higher PriorityClass ensures they are scheduled before batch Pods and can even evict them if necessary.",
    verify: "kubectl get priorityclasses"
  },
  {
    id: "s06-q022",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "You run <code>kubectl drain node2 --ignore-daemonsets</code> but it fails with <code>Cannot evict pod as it would violate the pod's disruption budget</code>. What should you do?",
    diagram: null,
    options: [
      "A. Scale up replicas so the PDB allows eviction, then retry the drain",
      "B. Add `--force` flag to the drain command to bypass the PDB directly",
      "C. Delete the PDB first, then drain the node, and recreate PDB after it",
      "D. Use `--delete-emptydir-data` to attempt overriding PDB restrictions"
    ],
    answer: 0,
    explanation: "Scaling up replicas increases the number of available Pods, allowing the PDB's `minAvailable` or `maxUnavailable` threshold to be met during eviction. The `--disable-eviction` flag bypasses PDBs by using delete instead of the eviction API, but risks service disruption. The `--force` flag only handles standalone pods not managed by a controller. Deleting the PDB removes an important safety mechanism.",
    verify: "kubectl get pdb -A"
  },
  {
    id: "s06-q023",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "In a highly available cluster with 3 etcd members, one member goes down. What is the impact on cluster operations?",
    diagram: null,
    options: [
      "D. The cluster continues normally because 2 of 3 members form a quorum",
      "B. All write operations fail but reads still succeed from the other members",
      "C. The kube-apiserver switches to an in-memory store as its fallback mode",
      "A. The cluster becomes read-only until the failed etcd member fully recovers"
    ],
    answer: 0,
    explanation: "etcd uses the Raft consensus algorithm requiring a majority (quorum) of members to agree on writes. With 3 members, a quorum is 2, so losing 1 member still allows normal read and write operations. Losing a second member would make the cluster unable to reach consensus.",
    verify: "ETCDCTL_API=3 etcdctl endpoint status --cluster"
  },
  {
    id: "s06-q024",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps pipeline automatically applies cluster configurations. Before a scheduled maintenance window, the team wants to prevent any automated changes. What is the recommended approach?",
    diagram: null,
    options: [
      "A. Delete the GitOps controller deployment from the cluster entirely",
      "B. Revoke the GitOps controller's RBAC permissions during the window",
      "C. Suspend the GitOps sync or reconciliation for affected resources",
      "D. Disconnect the cluster from the Git repository during maintenance"
    ],
    answer: 2,
    explanation: "Both Flux and Argo CD support suspending synchronization, which temporarily pauses automated reconciliation without losing configuration. This is the safest approach for maintenance windows. Deleting controllers or revoking permissions risks configuration drift and recovery complexity.",
    verify: null
  },
  {
    id: "s06-q025",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "During a rolling node upgrade, you want to ensure the kube-proxy Pods on upgraded nodes are also running the new version. How does kube-proxy typically get upgraded on worker nodes?",
    diagram: null,
    options: [
      "A. kube-proxy runs as a static Pod managed by the kubelet on each node",
      "B. kube-proxy must be manually upgraded on each node via SSH connection",
      "C. kube-proxy is compiled directly into the kubelet binary on each node",
      "D. kube-proxy runs as a DaemonSet and upgrades via `kubeadm upgrade`"
    ],
    answer: 3,
    explanation: "In kubeadm-managed clusters, kube-proxy runs as a DaemonSet in the `kube-system` namespace. When you run `kubeadm upgrade apply`, it updates the kube-proxy DaemonSet image, and Kubernetes automatically rolls out new Pods on each node.",
    verify: "kubectl -n kube-system get daemonset kube-proxy"
  },
  {
    id: "s06-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You want to spread replicas of a Deployment across different failure domains. You set <code>topologySpreadConstraints</code> with <code>maxSkew: 1</code> and <code>topologyKey: topology.kubernetes.io/zone</code>. If zone A has 3 Pods and zone B has 1 Pod, can the scheduler place the next Pod in zone A?",
    diagram: null,
    options: [
      "A. No, placing in zone A would make the skew 3 which exceeds `maxSkew: 1`",
      "B. Yes, `maxSkew` only applies to scaling down, not during new scheduling",
      "C. Yes, but only when zone A has significantly more allocatable resources",
      "D. No, `topologySpreadConstraints` always requires strictly equal distribution"
    ],
    answer: 0,
    explanation: "With zone A at 3 Pods and zone B at 1 Pod, the current skew is 2 (3-1). Adding another Pod to zone A would increase it to 3 (4-1), violating `maxSkew: 1`. The scheduler must place the Pod in zone B to keep the skew within bounds. The `whenUnsatisfiable` field controls behavior when constraints cannot be met.",
    verify: "kubectl explain pod.spec.topologySpreadConstraints"
  },
  {
    id: "s06-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "Which Kubernetes component is responsible for watching newly created Pods that have no assigned node and selecting a node for them to run on?",
    diagram: null,
    options: [
      "A. kube-controller-manager, the control loop runner",
      "B. kube-scheduler, the Pod-to-node assignment unit",
      "C. kubelet, the per-node container runtime manager",
      "D. kube-proxy, the network rules management daemon"
    ],
    answer: 1,
    explanation: "The kube-scheduler watches for Pods with an empty `spec.nodeName` and assigns them to suitable nodes based on filtering and scoring. The kubelet runs Pods after assignment, and the controller-manager manages controllers but does not make scheduling decisions.",
    verify: "kubectl -n kube-system get pods -l component=kube-scheduler"
  },
  {
    id: "s06-q028",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod has the toleration <code>key: node.kubernetes.io/unreachable, effect: NoExecute, tolerationSeconds: 30</code>. The node becomes unreachable. What happens to the Pod?",
    diagram: null,
    options: [
      "A. The Pod is immediately evicted and rescheduled to a different node",
      "B. The Pod continues running indefinitely on the unreachable node state",
      "C. The Pod is evicted after 30 seconds if the node remains unreachable",
      "D. The Pod is rescheduled to a new node but the old instance keeps running"
    ],
    answer: 2,
    explanation: "The `tolerationSeconds` field specifies how long the Pod tolerates the taint before being evicted. After 30 seconds, if the node is still unreachable, the Pod is marked for eviction by the node controller. Without `tolerationSeconds`, the Pod would tolerate the taint indefinitely.",
    verify: "kubectl describe pod <pod-name> | grep -i toleration"
  },
  {
    id: "s06-q029",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You create a PriorityClass with <code>value: 1000000</code> and <code>preemptionPolicy: Never</code>. What behavior does this produce?",
    diagram: null,
    options: [
      "A. High-priority Pods using this class are scheduled first but never preempt others",
      "B. The PriorityClass is invalid because preemption cannot be disabled in the spec",
      "C. Pods with this class can only preempt Pods that have a value below one hundred",
      "D. Lower-priority Pods are evicted from the node but their containers are not killed"
    ],
    answer: 0,
    explanation: "Setting `preemptionPolicy: Never` means Pods with this PriorityClass are placed ahead in the scheduling queue but will not trigger eviction of running lower-priority Pods. They wait until resources become available naturally. This is useful for important but non-urgent workloads.",
    verify: "kubectl get priorityclass"
  },
  {
    id: "s06-q030",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices platform runs payment and fraud-detection services. The team wants to ensure these Pods never share a node due to resource contention concerns. Which scheduling feature should they use?",
    diagram: null,
    options: [
      "A. Node affinity rules targeting distinct and dedicated node pools per service",
      "B. Taints on dedicated nodes combined with matching tolerations per service",
      "C. Pod anti-affinity with `topologyKey: kubernetes.io/hostname` configured",
      "D. Separate namespaces with resource quotas to isolate the two workloads"
    ],
    answer: 2,
    explanation: "Pod anti-affinity with `topologyKey: kubernetes.io/hostname` ensures that Pods matching the label selector are not co-located on the same node. This directly prevents the payment and fraud-detection Pods from sharing a node without requiring dedicated node pools.",
    verify: "kubectl explain pod.spec.affinity.podAntiAffinity"
  },
  {
    id: "s06-q031",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A company's disaster recovery plan requires restoring a Kubernetes cluster from scratch. Which backup must be restored first before any other cluster components can function?",
    diagram: null,
    options: [
      "A. The etcd snapshot with all cluster state",
      "B. The PersistentVolume data for workloads",
      "C. The kubelet config files on each node ID",
      "D. The container image registry and contents"
    ],
    answer: 0,
    explanation: "etcd stores all cluster state, including resource definitions, RBAC policies, and secrets. Restoring the etcd snapshot is the first step in disaster recovery because all other components depend on this data. Without etcd, the API server has no state to serve.",
    verify: "ETCDCTL_API=3 etcdctl snapshot restore backup.db"
  },
  {
    id: "s06-q032",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node has the taint <code>special-hardware=fpga:PreferNoSchedule</code>. A Pod without any tolerations is submitted. What happens?",
    diagram: null,
    options: [
      "A. The Pod is never scheduled on this node under any circumstances whatsoever",
      "B. The Pod is scheduled on this node but receives a warning annotation on it",
      "C. The taint is invalid because `PreferNoSchedule` is not a recognized effect",
      "D. The Pod can be scheduled on this node if no other nodes are available"
    ],
    answer: 3,
    explanation: "`PreferNoSchedule` is a soft version of `NoSchedule`. The scheduler tries to avoid placing Pods without matching tolerations on this node, but it will do so if no better options exist. Unlike `NoSchedule`, it does not hard-block scheduling.",
    verify: "kubectl describe node <node-name> | grep Taints"
  },
  {
    id: "s06-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "You need to run a log-shipping agent on every node, including nodes that are tainted with <code>NoSchedule</code>. Which workload type automatically handles this?",
    diagram: null,
    options: [
      "A. Deployment with replicas equal to node count",
      "B. StatefulSet with pod anti-affinity configured",
      "C. DaemonSet with appropriate tolerations added",
      "D. Job with parallelism equal to the node count"
    ],
    answer: 2,
    explanation: "A DaemonSet ensures exactly one Pod runs on every eligible node. By adding tolerations for the `NoSchedule` taints, DaemonSet Pods can be scheduled on tainted nodes. Deployments and StatefulSets cannot guarantee per-node placement.",
    verify: "kubectl get daemonset -n kube-system"
  },
  {
    id: "s06-q034",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "During a node upgrade, the container runtime is upgraded from one version to another. What happens to running containers on that node during the runtime upgrade?",
    diagram: null,
    options: [
      "A. Containers continue running because the runtime upgrade is fully transparent to them",
      "B. All containers are stopped and must be restarted individually by the kubelet process",
      "C. The node must be drained first because runtime upgrades need no running containers",
      "D. Only Pods with `restartPolicy: Always` survive through the container runtime upgrade"
    ],
    answer: 2,
    explanation: "Upgrading the container runtime typically requires stopping the runtime service, which stops all containers. Best practice is to drain the node first, upgrade the runtime, then uncordon the node. This prevents unexpected container termination and data loss.",
    verify: "kubectl drain <node-name> --ignore-daemonsets"
  },
  {
    id: "s06-q035",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "You want to monitor the scheduling latency of Pods in your cluster. Which metric exposed by the kube-scheduler is most relevant?",
    diagram: null,
    options: [
      "A. `scheduler_scheduling_attempt_duration_seconds`",
      "B. `kubelet_pod_start_duration_seconds` metric name",
      "C. `apiserver_request_duration_seconds` metric name",
      "D. `etcd_request_duration_seconds` metric name type"
    ],
    answer: 0,
    explanation: "`scheduler_scheduling_attempt_duration_seconds` measures the end-to-end scheduling latency for a Pod, from arrival in the scheduling queue to a node being selected. This directly reflects scheduling latency. The kubelet metric measures Pod startup time after scheduling, which is a different phase. Note: the older `scheduler_e2e_scheduling_duration_seconds` metric was deprecated in Kubernetes 1.19 and removed in 1.23.",
    verify: null
  },
  {
    id: "s06-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "When the kube-scheduler evaluates nodes for a Pod, it performs two phases: filtering and scoring. What happens during the filtering phase?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="190" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">Scheduler: Filter then Score</text><rect x="20" y="45" width="80" height="35" rx="5" fill="#0d2137" stroke="#326ce5" stroke-width="1.5"/><text x="60" y="67" text-anchor="middle" fill="#ccc" font-size="10">New Pod</text><line x1="100" y1="62" x2="135" y2="62" stroke="#7ec8e3" stroke-width="1.5" marker-end="url(#arrowB2)"/><rect x="135" y="45" width="100" height="35" rx="5" fill="#1a2a1a" stroke="#4caf50" stroke-width="1.5"/><text x="185" y="67" text-anchor="middle" fill="#4caf50" font-size="10">Filter Phase</text><line x1="235" y1="62" x2="270" y2="62" stroke="#7ec8e3" stroke-width="1.5" marker-end="url(#arrowB2)"/><rect x="270" y="45" width="100" height="35" rx="5" fill="#2a1a1a" stroke="#ff9800" stroke-width="1.5"/><text x="320" y="67" text-anchor="middle" fill="#ff9800" font-size="10">Score Phase</text><rect x="30" y="110" width="60" height="30" rx="4" fill="#0d2137" stroke="#555" stroke-width="1"/><text x="60" y="129" text-anchor="middle" fill="#aaa" font-size="9">Node A</text><rect x="100" y="110" width="60" height="30" rx="4" fill="#0d2137" stroke="#555" stroke-width="1"/><text x="130" y="129" text-anchor="middle" fill="#aaa" font-size="9">Node B</text><rect x="170" y="110" width="60" height="30" rx="4" fill="#0d2137" stroke="#f44336" stroke-width="1" stroke-dasharray="4,3"/><text x="200" y="129" text-anchor="middle" fill="#f44336" font-size="9">Node C</text><rect x="240" y="110" width="60" height="30" rx="4" fill="#0d2137" stroke="#555" stroke-width="1"/><text x="270" y="129" text-anchor="middle" fill="#aaa" font-size="9">Node D</text><text x="200" y="165" text-anchor="middle" fill="#888" font-size="9">Filter removes ineligible nodes; Score ranks the rest</text><line x1="200" y1="140" x2="200" y2="152" stroke="#f44336" stroke-width="1" stroke-dasharray="3,2"/><text x="200" y="182" text-anchor="middle" fill="#f44336" font-size="8">Node C: filtered out (taint, resource, etc.)</text><defs><marker id="arrowB2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#7ec8e3"/></marker></defs></svg>',
    options: [
      "A. Nodes are ranked by their available resource capacity and utilization",
      "B. Nodes that do not meet the Pod's hard constraints are eliminated",
      "C. Nodes are randomly sampled to reduce the overall evaluation cost now",
      "D. Nodes are checked for live network connectivity to the scheduled Pod"
    ],
    answer: 1,
    explanation: "During the filtering phase, the scheduler eliminates nodes that cannot satisfy the Pod's hard constraints such as resource requests, node selectors, taints, and affinity rules. Only nodes passing all filters advance to the scoring phase where they are ranked by preference criteria.",
    verify: "kubectl describe pod <pod-name> | grep -A10 Events"
  },
  {
    id: "s06-q037",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "During a cluster upgrade, the certificates used by etcd and the API server may expire. What tool in a kubeadm cluster checks certificate expiration?",
    diagram: null,
    options: [
      "A. `kubectl certificate list` displays all cluster certs",
      "B. `kubeadm certs check-expiration` shows all PKI dates",
      "C. `openssl x509 -in` on the cert file shows expiry dates",
      "D. Both B and C can check certificate expiration dates"
    ],
    answer: 3,
    explanation: "Both `kubeadm certs check-expiration` and `openssl x509` can verify certificate expiration dates. The kubeadm command provides a convenient summary of all cluster certificates, while openssl allows checking individual certificate files directly.",
    verify: "kubeadm certs check-expiration"
  },
  {
    id: "s06-q038",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You define a <code>requiredDuringSchedulingIgnoredDuringExecution</code> node affinity rule that matches nodes with label <code>disk=ssd</code>. Later, the label is removed from the node where the Pod is running. What happens to the Pod?",
    diagram: null,
    options: [
      "A. The Pod is immediately evicted and rescheduled to a matching node",
      "B. The Pod enters a `Pending` state until a new node with the label exists",
      "C. The kubelet terminates the Pod during its next regular sync cycle run",
      "D. The Pod continues running because the rule is `IgnoredDuringExecution`"
    ],
    answer: 3,
    explanation: "The `IgnoredDuringExecution` suffix means the affinity rule is only evaluated at scheduling time. Once a Pod is running, changes to node labels do not trigger eviction. The Pod continues on the node even if it no longer matches the affinity rule.",
    verify: "kubectl get pod <pod-name> -o wide"
  },
  {
    id: "s06-q039",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Which CNCF project provides backup and restore capabilities for Kubernetes cluster resources and persistent volumes?",
    diagram: null,
    options: [
      "A. etcd-operator from the CoreOS project",
      "B. Longhorn, a distributed storage tool",
      "C. Velero, a backup and restore project",
      "D. Stash, a backup and recovery tooling"
    ],
    answer: 2,
    explanation: "Velero is a CNCF project that provides backup and restore capabilities for Kubernetes cluster resources and persistent volumes via the Kubernetes API. It enables disaster recovery, data migration, and cluster portability. Velero does not manage etcd directly but works at the Kubernetes resource level.",
    verify: null
  },
  {
    id: "s06-q040",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An etcd cluster is configured with 5 members. What is the maximum number of simultaneous member failures the cluster can tolerate while still maintaining a quorum?",
    diagram: null,
    options: [
      "A. 1",
      "B. 2",
      "C. 3",
      "D. 4"
    ],
    answer: 1,
    explanation: "An etcd cluster with N members requires a quorum of (N/2)+1 members. For 5 members, the quorum is 3. Therefore, the cluster can tolerate 2 simultaneous member failures and still process reads and writes normally.",
    verify: "ETCDCTL_API=3 etcdctl member list"
  },
  {
    id: "s06-q041",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A team configures <code>topologySpreadConstraints</code> with <code>whenUnsatisfiable: DoNotSchedule</code>. The constraint cannot be satisfied because all zones already exceed the <code>maxSkew</code>. What happens?",
    diagram: null,
    options: [
      "A. The Pod remains in `Pending` state until constraints are met",
      "B. The Pod is scheduled on the least loaded zone automatically",
      "C. The scheduler ignores the constraint and schedules it normally",
      "D. The Pod is scheduled but a warning event is emitted on the Pod"
    ],
    answer: 0,
    explanation: "`DoNotSchedule` is a hard constraint: if the topology spread cannot be satisfied, the Pod remains Pending. The alternative `ScheduleAnyway` would allow scheduling even when the constraint is violated, choosing the topology that minimizes the skew.",
    verify: "kubectl describe pod <pod-name> | grep -A5 Events"
  },
  {
    id: "s06-q042",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "After cordoning a node, you want to check how many allocatable resources remain across the cluster. Which approach gives the most accurate picture?",
    diagram: null,
    options: [
      "A. `kubectl top nodes` to view current resource usage per node in the cluster",
      "B. `kubectl get nodes -o wide` and check the STATUS column for each node entry",
      "C. `kubectl describe nodes` and sum `Allocatable` minus `Allocated resources`",
      "D. `kubectl get pods --all-namespaces | wc -l` to count the running Pod total"
    ],
    answer: 2,
    explanation: "`kubectl describe nodes` shows both `Allocatable` resources (total available for Pods) and `Allocated resources` (currently requested). The difference represents remaining capacity. `kubectl top` shows actual usage, not allocatable capacity, which is different from schedulable capacity.",
    verify: "kubectl describe nodes | grep -A5 'Allocated resources'"
  },
  {
    id: "s06-q043",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "During a rolling upgrade, some Pods on the old node version report DNS resolution failures. The CoreDNS Pods are running on upgraded nodes. What could cause this issue?",
    diagram: null,
    options: [
      "A. The old kubelet version cannot communicate correctly with the newer CoreDNS version",
      "B. CoreDNS requires a matching kubelet version on all nodes in order to resolve DNS ok",
      "C. The Pod network CIDR was changed during the upgrade process causing connectivity loss",
      "D. kube-proxy on old nodes has incompatible iptables rules after the partial upgrade"
    ],
    answer: 3,
    explanation: "During partial upgrades, kube-proxy on old nodes may have stale or incompatible iptables/IPVS rules if the kube-proxy DaemonSet was already updated. This can cause DNS resolution failures because Service ClusterIP routing depends on kube-proxy rules being correct.",
    verify: "kubectl -n kube-system get pods -l k8s-app=kube-dns -o wide"
  },
  {
    id: "s06-q044",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "Which taint effect allows already-running Pods to remain but prevents new Pods without a matching toleration from being scheduled?",
    diagram: null,
    options: [
      "A. `NoSchedule` taint effect",
      "B. `NoExecute` taint effect",
      "C. `PreferNoSchedule` effect",
      "D. `EvictExisting` as effect"
    ],
    answer: 0,
    explanation: "`NoSchedule` prevents new Pods without a matching toleration from being scheduled on the node, but existing Pods remain unaffected. `NoExecute` would additionally evict running Pods. `PreferNoSchedule` is a soft constraint. `EvictExisting` is not a valid taint effect.",
    verify: "kubectl taint --help"
  },
  {
    id: "s06-q045",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart for a database uses <code>nodeSelector</code> values that differ between staging and production. How should this be managed across environments?",
    diagram: null,
    options: [
      "A. Create separate Helm charts for each distinct deployment environment used",
      "B. Hard-code the `nodeSelector` values directly in the chart template files",
      "C. Use Helm values files with environment-specific `nodeSelector` overrides",
      "D. Use Helm hooks to modify the `nodeSelector` value after each deployment"
    ],
    answer: 2,
    explanation: "Helm values files allow overriding template variables per environment. Using `values-staging.yaml` and `values-production.yaml` with different `nodeSelector` entries keeps the chart reusable. `helm install -f values-production.yaml` applies the correct configuration per environment.",
    verify: "helm show values <chart-name>"
  },
  {
    id: "s06-q046",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You want to temporarily prevent a node from accepting new Pods without evicting existing ones. Which command achieves this?",
    diagram: null,
    options: [
      "A. `kubectl drain <node-name>` to evict all the Pods",
      "B. `kubectl taint nodes <node-name> key=v:NoExecute`",
      "C. `kubectl cordon <node-name>` to mark unschedulable",
      "D. `kubectl delete node <node-name>` from the cluster"
    ],
    answer: 2,
    explanation: "`kubectl cordon` marks a node as unschedulable, preventing new Pods from being placed on it while leaving existing Pods running. This is ideal for preparing a node for maintenance. `drain` also evicts existing Pods, which goes beyond the requirement.",
    verify: "kubectl get nodes"
  },
  {
    id: "s06-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A critical system Pod uses the built-in PriorityClass <code>system-node-critical</code>. What scheduling priority does this grant?",
    diagram: null,
    options: [
      "A. Priority value of 1000, scheduled before default-priority Pods only",
      "B. Priority value of 2000001000, the highest built-in priority class",
      "C. Same as default priority but with guaranteed resource allocation",
      "D. Priority value of 100000000, ranked above the cluster-critical one"
    ],
    answer: 1,
    explanation: "`system-node-critical` has a priority value of 2000001000, making it one of the highest built-in priority classes. It is intended for Pods essential to node operation such as kube-proxy. `system-cluster-critical` has a slightly lower value of 2000000000.",
    verify: "kubectl get priorityclass system-node-critical"
  },
  {
    id: "s06-q048",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An organization operates multiple Kubernetes clusters and wants to standardize their etcd backup procedure. Which practice aligns with cloud-native operational principles?",
    diagram: null,
    options: [
      "A. Manual SSH into each control-plane node to run etcd backup scripts on a weekly basis",
      "C. Relying on the cloud provider to handle full VM backups including the etcd data volume",
      "B. Automated CronJobs that run `etcdctl snapshot save` and store backups in object store",
      "D. Taking etcd backups only before planned maintenance windows and major upgrade events"
    ],
    answer: 2,
    explanation: "Automating etcd backups via CronJobs with remote storage follows cloud-native principles of automation, reproducibility, and resilience. Regular automated backups ensure consistent recovery points. VM-level backups may not capture a consistent etcd state.",
    verify: "kubectl get cronjobs -n kube-system"
  },
  {
    id: "s06-q049",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "Before draining a node with Pods using <code>emptyDir</code> volumes, you run <code>kubectl drain node3</code> and receive an error about Pods with local data. What flag resolves this?",
    diagram: null,
    options: [
      "A. `--force` flag on the drain command",
      "B. `--delete-emptydir-data` on drain",
      "C. `--ignore-daemonsets` on the drain",
      "D. `--grace-period=0` on drain command"
    ],
    answer: 1,
    explanation: "The `--delete-emptydir-data` flag (previously `--delete-local-data`) acknowledges that evicting Pods with `emptyDir` volumes will discard their data. Without this flag, the drain command refuses to proceed to prevent accidental data loss.",
    verify: "kubectl drain --help"
  },
  {
    id: "s06-q050",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod specifies resource requests but no limits. In which QoS class does Kubernetes place this Pod?",
    diagram: null,
    options: [
      "A. `Guaranteed`",
      "B. `BestEffort`",
      "C. `Standard`",
      "D. `Burstable`"
    ],
    answer: 3,
    explanation: "A Pod with resource requests but no matching limits (or limits different from requests) is classified as `Burstable`. `Guaranteed` requires requests equal to limits for all containers. `BestEffort` applies when no requests or limits are set. QoS class affects eviction priority under resource pressure.",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.qosClass}'"
  },
  {
    id: "s06-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You want to ensure that two replicas of a Redis cache are never on the same node. You configure pod anti-affinity with <code>requiredDuringSchedulingIgnoredDuringExecution</code>. If the cluster only has 1 node, what happens to the second replica?",
    diagram: null,
    options: [
      "A. Both replicas run on the same node with a scheduling warning event",
      "B. The scheduler converts the hard anti-affinity rule to a soft preference",
      "C. The second replica remains in `Pending` state until a new node joins",
      "D. The second replica is placed on the same node but marked as degraded"
    ],
    answer: 2,
    explanation: "`requiredDuringSchedulingIgnoredDuringExecution` is a hard constraint. If no node satisfies the anti-affinity rule, the Pod stays Pending indefinitely. The scheduler does not downgrade hard constraints to soft preferences. Adding another node would resolve the issue.",
    verify: "kubectl get pods -o wide"
  },
  {
    id: "s06-q052",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After restoring an etcd snapshot on a single-node control plane, the API server shows stale data from before the backup. Other control plane Pods are running. What is the most likely issue?",
    diagram: null,
    options: [
      "A. The kube-apiserver in-memory cache needs to be flushed by restarting the process",
      "B. The etcd restore created a new data directory but etcd still uses the old one",
      "C. The kube-controller-manager is reconciling the cluster back to a newer state now",
      "D. The restored snapshot was encrypted with a different key that does not match today"
    ],
    answer: 1,
    explanation: "`etcdctl snapshot restore` creates a new data directory. If the etcd static Pod manifest still points to the old directory, etcd will serve old data. The etcd configuration in `/etc/kubernetes/manifests/etcd.yaml` must reference the new data directory path.",
    verify: "kubectl -n kube-system get pod etcd-<node-name> -o yaml | grep data-dir"
  },
  {
    id: "s06-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod has both a `nodeSelector` for <code>env=production</code> and a toleration for the taint <code>team=backend:NoSchedule</code>. Which nodes can this Pod be scheduled on?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="210" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">nodeSelector + Toleration Evaluation</text><rect x="20" y="45" width="170" height="65" rx="6" fill="#0d2137" stroke="#326ce5" stroke-width="1.5"/><text x="105" y="62" text-anchor="middle" fill="#ccc" font-size="10">Node A</text><text x="105" y="78" text-anchor="middle" fill="#4caf50" font-size="9">label: env=production</text><text x="105" y="94" text-anchor="middle" fill="#ff9800" font-size="9">taint: team=backend:NoSchedule</text><rect x="210" y="45" width="170" height="65" rx="6" fill="#0d2137" stroke="#555" stroke-width="1.5"/><text x="295" y="62" text-anchor="middle" fill="#ccc" font-size="10">Node B</text><text x="295" y="78" text-anchor="middle" fill="#4caf50" font-size="9">label: env=production</text><text x="295" y="94" text-anchor="middle" fill="#888" font-size="9">no taint</text><rect x="20" y="125" width="170" height="65" rx="6" fill="#0d2137" stroke="#555" stroke-width="1.5" stroke-dasharray="5,3"/><text x="105" y="142" text-anchor="middle" fill="#ccc" font-size="10">Node C</text><text x="105" y="158" text-anchor="middle" fill="#f44336" font-size="9">label: env=staging</text><text x="105" y="174" text-anchor="middle" fill="#ff9800" font-size="9">taint: team=backend:NoSchedule</text><rect x="210" y="125" width="170" height="65" rx="6" fill="#0d2137" stroke="#555" stroke-width="1.5" stroke-dasharray="5,3"/><text x="295" y="142" text-anchor="middle" fill="#ccc" font-size="10">Node D</text><text x="295" y="158" text-anchor="middle" fill="#f44336" font-size="9">label: env=staging</text><text x="295" y="174" text-anchor="middle" fill="#888" font-size="9">no taint</text><text x="105" y="200" text-anchor="middle" fill="#326ce5" font-size="10">Eligible: A, B</text></svg>',
    options: [
      "D. Any node with label `env=production`, regardless of the backend taint key",
      "B. Any node with the taint `team=backend:NoSchedule` regardless of its labels",
      "C. Only nodes without any taints at all that have the label `env=production`",
      "A. Only nodes with label `env=production` and taint `team=backend:NoSchedule`"
    ],
    answer: 0,
    explanation: "The `nodeSelector` requires `env=production`, filtering out nodes without that label. The toleration allows (but does not require) scheduling on nodes with the `team=backend:NoSchedule` taint. So the Pod can schedule on any `env=production` node, whether or not it has the taint.",
    verify: "kubectl describe pod <pod-name> | grep 'Node-Selectors\\|Tolerations'"
  },
  {
    id: "s06-q054",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "What happens to Pods managed by a ReplicaSet when the node they are running on is drained?",
    diagram: null,
    options: [
      "A. The ReplicaSet controller creates replacement Pods on other nodes",
      "B. The Pods are moved to another node with their full state preserved",
      "C. The Pods are terminated and must then be manually recreated",
      "D. The ReplicaSet is scaled to zero until the drained node returns"
    ],
    answer: 0,
    explanation: "When Pods are evicted during drain, the ReplicaSet controller detects that the desired replica count is not met and creates new Pods. The scheduler places these new Pods on other available nodes. Pod state is not preserved; the replacement Pods start fresh.",
    verify: "kubectl get rs"
  },
  {
    id: "s06-q055",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A distributed tracing system requires its collector Pods to run in the same availability zone as the application Pods they collect from. Which approach ensures zone-local collection?",
    diagram: null,
    options: [
      "A. Pod affinity with `topologyKey: topology.kubernetes.io/zone`",
      "B. Deploy collectors as a DaemonSet to run across all cluster nodes",
      "C. Set `hostNetwork: true` on collector Pods for direct node access",
      "D. Configure a headless Service for the collector Pod endpoint group"
    ],
    answer: 0,
    explanation: "Pod affinity with `topologyKey: topology.kubernetes.io/zone` ensures collector Pods are scheduled in the same zone as the Pods they target via the label selector. A DaemonSet places one Pod per node regardless of zone locality, which is a different distribution pattern.",
    verify: "kubectl get pods -o wide --show-labels"
  },
  {
    id: "s06-q056",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A newly joined worker node shows <code>NotReady</code> status. The kubelet is running and the node is reachable. Which component on the node is most likely misconfigured?",
    diagram: null,
    options: [
      "A. kube-proxy, the network rules component",
      "B. The container runtime such as containerd",
      "C. CoreDNS, the cluster DNS resolver Pod",
      "D. The CNI plugin for Pod network setup"
    ],
    answer: 3,
    explanation: "The kubelet reports a node as `NotReady` when the container runtime or network plugin is not functioning. A missing or misconfigured CNI plugin is a common cause because the kubelet checks that the network is ready. CoreDNS runs as a cluster add-on, not a node-level component.",
    verify: "kubectl describe node <node-name> | grep -A5 Conditions"
  },
  {
    id: "s06-q057",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A multi-tenant cluster uses node pools with taints: <code>tenant=team-a:NoSchedule</code> and <code>tenant=team-b:NoSchedule</code>. How should team-a's Pods be configured to run only on their nodes?",
    diagram: null,
    options: [
      "A. Add a toleration for `tenant=team-a:NoSchedule` only, without adding a node selector",
      "B. Add tolerations for both tenant taints and also use `nodeSelector` for the team-a label",
      "C. Add a toleration for `tenant=team-a:NoSchedule` and `nodeSelector: tenant=team-a`",
      "D. Use only a `nodeSelector` for the `tenant=team-a` label without adding any tolerations"
    ],
    answer: 2,
    explanation: "A toleration alone allows scheduling on tainted nodes but does not prevent scheduling on untainted nodes. Combining a toleration (to allow team-a's nodes) with a `nodeSelector` (to require team-a's label) ensures Pods only run on team-a's dedicated node pool.",
    verify: "kubectl get nodes -l tenant=team-a"
  },
  {
    id: "s06-q058",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A cluster has nodes of varying sizes. Some workloads waste resources because they request far more than they use. Which Kubernetes feature helps right-size Pod resource requests?",
    diagram: null,
    options: [
      "A. Horizontal Pod Autoscaler (HPA) for scaling",
      "B. Cluster Autoscaler for node provisioning",
      "C. LimitRange for default resource boundaries",
      "D. Vertical Pod Autoscaler (VPA) for sizing"
    ],
    answer: 3,
    explanation: "The Vertical Pod Autoscaler analyzes actual resource usage and recommends or automatically adjusts Pod resource requests and limits. This right-sizing reduces waste and improves scheduling efficiency. HPA scales replica count, not individual Pod resources.",
    verify: "kubectl get vpa -A"
  },
  {
    id: "s06-q059",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "During an etcd backup, the <code>etcdctl</code> command requires specific flags to authenticate. Which set of flags is required when TLS is enabled?",
    diagram: null,
    options: [
      "A. `--username` and `--password` flags",
      "B. `--cacert`, `--cert`, and `--key`",
      "C. `--token` and `--endpoint` flags",
      "D. `--kubeconfig` and `--context` flag"
    ],
    answer: 1,
    explanation: "When TLS is enabled on etcd (standard for kubeadm clusters), `etcdctl` requires `--cacert` (CA certificate), `--cert` (client certificate), and `--key` (client key) for mutual TLS authentication. These certificates are typically found in `/etc/kubernetes/pki/etcd/`.",
    verify: "ls /etc/kubernetes/pki/etcd/"
  },
  {
    id: "s06-q060",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "After upgrading containerd on a node, the kubelet fails to start Pods with the error <code>failed to create containerd task</code>. What should you check first?",
    diagram: null,
    options: [
      "A. The kubelet config for the correct CRI socket path to containerd",
      "B. Whether the node has sufficient disk space for container operations",
      "C. The container image registry network connectivity and pull access",
      "D. The kernel version compatibility with the new containerd version"
    ],
    answer: 0,
    explanation: "After upgrading containerd, the CRI socket path may have changed or the containerd configuration may require updates. The kubelet must be configured with the correct `--container-runtime-endpoint` pointing to the containerd socket, typically `unix:///run/containerd/containerd.sock`.",
    verify: "systemctl status containerd"
  },
  {
    id: "s06-q061",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team implements resource requests and limits for all namespaces. Which Kubernetes object enforces default resource requests for Pods that do not specify them?",
    diagram: null,
    options: [
      "A. ResourceQuota for namespace limits",
      "B. PodSecurityPolicy for security rules",
      "C. LimitRange for default resources",
      "D. NetworkPolicy for traffic controls"
    ],
    answer: 2,
    explanation: "A LimitRange in a namespace can set default resource requests and limits that are automatically applied to containers that do not specify their own. ResourceQuota limits total resource consumption per namespace but does not set per-Pod defaults.",
    verify: "kubectl get limitrange -n <namespace>"
  },
  {
    id: "s06-q062",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You observe that the scheduler assigns most Pods to the same node despite having 5 nodes with equal resources. Which scoring plugin might explain this behavior if it has high weight?",
    diagram: null,
    options: [
      "A. `NodeResourcesBalancedAllocation` — favors balanced CPU/memory ratio",
      "B. `InterPodAffinity` — favors nodes with matching Pod affinities",
      "C. `NodeResourcesFit` — favors nodes with sufficient resources",
      "D. `ImageLocality` — favors nodes that already have the container image"
    ],
    answer: 3,
    explanation: "The `ImageLocality` scoring plugin gives higher scores to nodes that already have the required container images cached. If one node has all images cached, it consistently scores highest, causing Pod concentration. This is common after initial deployments when only one node has pulled the images.",
    verify: "kubectl describe pod <pod-name> | grep 'Node:'"
  },
  {
    id: "s06-q063",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "During a cluster upgrade, you need to rotate the etcd encryption key used for encrypting Secrets at rest. What is the correct procedure?",
    diagram: null,
    options: [
      "B. Delete and recreate all Secrets with the new key by reapplying each manifest individually",
      "A. Add the new key as first entry in encryption config, restart API server, re-encrypt all",
      "C. Stop etcd completely, replace the encryption key file, then restart all etcd member nodes",
      "D. Run `kubeadm certs renew` to rotate all encryption keys and certificates automatically"
    ],
    answer: 1,
    explanation: "To rotate encryption keys, add the new key as the first provider in the EncryptionConfiguration, restart the API server to use it for new writes, then re-encrypt existing Secrets with `kubectl get secrets --all-namespaces -o json | kubectl replace -f -`. The old key must remain for reading existing data until re-encryption completes.",
    verify: null
  },
  {
    id: "s06-q064",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node has two taints: <code>gpu=true:NoSchedule</code> and <code>zone=restricted:NoSchedule</code>. A Pod tolerates only <code>gpu=true:NoSchedule</code>. Can this Pod be scheduled on the node?",
    diagram: null,
    options: [
      "A. Yes, tolerating one of the taints is sufficient for scheduling",
      "B. Yes, but only if the `nodeSelector` also matches a node label",
      "C. No, the Pod must tolerate all taints present on the node",
      "D. No, unless `operator: Exists` is used to tolerate all taints"
    ],
    answer: 2,
    explanation: "A Pod must tolerate all `NoSchedule` taints on a node to be scheduled there. Tolerating only one of multiple taints is insufficient. Each taint acts as an independent gate, and all must be satisfied. The Pod would need to add a second toleration for `zone=restricted:NoSchedule`.",
    verify: "kubectl describe node <node-name> | grep Taints"
  },
  {
    id: "s06-q065",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline must validate that a Kubernetes manifest does not schedule Pods on control-plane nodes. Which tool can perform this validation before deployment?",
    diagram: null,
    options: [
      "A. `kubectl apply --dry-run=server` to simulate the deployment result",
      "B. `kubectl auth can-i` to check user permissions for the operation",
      "C. `helm lint` to validate the chart syntax and template rendering",
      "D. A policy engine like OPA Gatekeeper or Kyverno with a constraint"
    ],
    answer: 3,
    explanation: "Policy engines like OPA Gatekeeper or Kyverno can enforce policies that reject manifests scheduling Pods on control-plane nodes. These can run as admission webhooks in the cluster or as CLI tools in CI pipelines. `--dry-run=server` validates syntax but not scheduling policies.",
    verify: null
  },
  {
    id: "s06-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "The Kubernetes version skew policy states that the kubelet must not be newer than the kube-apiserver. If the API server is at v1.29, which kubelet versions are supported on worker nodes?",
    diagram: null,
    options: [
      "A. v1.29 only, no older versions",
      "B. v1.27 through v1.29 inclusive",
      "C. v1.28 and v1.29 versions only",
      "D. v1.26 through v1.29 inclusive"
    ],
    answer: 3,
    explanation: "Since Kubernetes 1.28, the version skew policy allows kubelets to be up to three minor versions older than the API server (for kubelet >= 1.25). With API server at v1.29, supported kubelet versions are v1.26, v1.27, v1.28, and v1.29. The kubelet must never be newer than the API server. Note: kubelets older than v1.25 are limited to a two-version skew.",
    verify: "kubectl get nodes -o wide"
  },
  {
    id: "s06-q067",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A PriorityClass with <code>value: 1000000</code> and <code>globalDefault: true</code> was created. Existing Pods without an explicit `priorityClassName` report priority 0 in their spec. Why?",
    diagram: null,
    options: [
      "A. `globalDefault` only applies to Pods created after the PriorityClass definition",
      "B. Existing Pods need to be restarted to pick up the newly set global default priority",
      "C. The PriorityClass value exceeds the maximum value allowed for any global default set",
      "D. `globalDefault` is not a recognized valid field in the PriorityClass resource spec"
    ],
    answer: 0,
    explanation: "The `globalDefault: true` field on a PriorityClass sets it as the default for Pods created after the PriorityClass exists. It does not retroactively update existing Pods. Their priority was set at creation time by the admission controller and remains at the old default (0).",
    verify: "kubectl get priorityclass"
  },
  {
    id: "s06-q068",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Which Kubernetes SIG project extends the Kubernetes scheduler with custom scheduling plugins, allowing teams to implement domain-specific scheduling logic?",
    diagram: null,
    options: [
      "A. Scheduler Plugins (scheduling-plugins)",
      "B. Descheduler, the Pod rebalancing tool",
      "C. Kueue, the job queueing orchestrator",
      "D. Volcano, the batch scheduling system"
    ],
    answer: 0,
    explanation: "The Kubernetes Scheduler Plugins project provides a framework for extending the default scheduler with custom filter, score, and other plugins. It uses the scheduler framework API, allowing teams to add domain-specific logic without replacing the entire scheduler.",
    verify: null
  },
  {
    id: "s06-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster administrator runs <code>kubectl taint nodes --all node-role.kubernetes.io/control-plane-</code> (with trailing dash). What does this command do?",
    diagram: null,
    options: [
      "A. Adds the `control-plane` taint to all nodes in the cluster with NoSchedule effect",
      "B. Lists all nodes that currently have the `control-plane` taint and their taint effects",
      "C. Removes the `control-plane` taint from all nodes, allowing workloads to schedule",
      "D. Sets the `control-plane` taint effect to `PreferNoSchedule` on all matching nodes"
    ],
    answer: 2,
    explanation: "The trailing dash (`-`) in a taint command removes the taint with that key from the specified nodes. Using `--all` applies it to every node. This is commonly done in single-node or development clusters to allow regular workloads on control-plane nodes.",
    verify: "kubectl describe nodes | grep Taints"
  },
  {
    id: "s06-q070",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "You want to be alerted when the etcd database size approaches its default storage limit. What is etcd's default maximum database size?",
    diagram: null,
    options: [
      "A. 1 GB",
      "B. 4 GB",
      "C. 8 GB",
      "D. 2 GB"
    ],
    answer: 3,
    explanation: "etcd's default maximum database size (quota) is 2 GB. When this limit is reached, etcd stops accepting write requests and returns `NOSPACE` alarms. Monitoring the `etcd_mvcc_db_total_size_in_bytes` metric helps detect approaching limits before writes fail.",
    verify: null
  },
  {
    id: "s06-q071",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "During node maintenance, a Pod is evicted and rescheduled. The Pod's IP address changes. How do other Pods discover the new IP?",
    diagram: null,
    options: [
      "A. Services and DNS automatically resolve to the new Pod IP via endpoint updates",
      "B. The old IP address is preserved through a transparent IP address migration step",
      "C. Other Pods must be restarted to discover the newly assigned IP of the new Pod",
      "D. The CNI plugin broadcasts the new IP address to all other nodes in the cluster"
    ],
    answer: 0,
    explanation: "When a new Pod is created, it gets a new IP. The endpoint controller updates the Service's Endpoints object with the new Pod IP, and CoreDNS resolves the Service name to the updated endpoints. Other Pods using the Service DNS name or ClusterIP transparently reach the new Pod.",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s06-q072",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet has <code>podManagementPolicy: Parallel</code>. During a drain, how does this affect the restart behavior compared to the default <code>OrderedReady</code> policy?",
    diagram: null,
    options: [
      "A. Pods are evicted in strict reverse ordinal order regardless of the management policy",
      "B. With `Parallel` policy, Pods are never evicted during a drain operation on the node",
      "C. With `Parallel`, replacement Pods can start simultaneously instead of sequentially",
      "D. There is no difference during drain operations, the policy only affects initial creation"
    ],
    answer: 2,
    explanation: "With `Parallel` pod management, StatefulSet replacement Pods can be created simultaneously without waiting for previous ordinals to be ready. With `OrderedReady`, each Pod must be running and ready before the next is created, which slows recovery after drain.",
    verify: "kubectl get statefulset <name> -o yaml | grep podManagementPolicy"
  },
  {
    id: "s06-q073",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cluster runs workloads with very different resource profiles: small API Pods and large ML training Pods. Which node management strategy optimizes cost and scheduling?",
    diagram: null,
    options: [
      "A. Use a single large node type that is big enough to accommodate all cluster workloads",
      "B. Overcommit resources on all nodes to maximize the overall cluster utilization level",
      "C. Run all workloads exclusively on spot or preemptible instances to reduce total costs",
      "D. Use multiple node pools with different instance types and taints or nodeSelectors"
    ],
    answer: 3,
    explanation: "Multiple node pools with different instance sizes allow right-sizing infrastructure to workload needs. Taints and nodeSelectors ensure ML Pods land on GPU/large nodes while API Pods use smaller, cheaper nodes. This optimizes both cost and scheduling efficiency.",
    verify: "kubectl get nodes --show-labels"
  },
  {
    id: "s06-q074",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After a failed etcd restore, the API server logs show <code>etcdserver: mvcc: database is out of date</code>. What is the most likely cause?",
    diagram: null,
    options: [
      "A. The snapshot file was originally taken from a completely different cluster altogether",
      "B. The `--initial-cluster-token` was not changed during restore, causing conflict",
      "C. The API server version is incompatible with the etcd version in the restored backup",
      "D. The etcd TLS certificates have expired and must be reissued before the restore step"
    ],
    answer: 1,
    explanation: "When restoring an etcd snapshot, a new `--initial-cluster-token` must be specified to prevent the restored member from joining the old cluster. Without a unique token, the restored etcd may attempt to reconcile with stale cluster state, causing database conflicts.",
    verify: "ETCDCTL_API=3 etcdctl snapshot restore --help"
  },
  {
    id: "s06-q075",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod uses <code>spec.schedulerName: custom-scheduler</code>. The custom scheduler is not deployed. What happens to the Pod?",
    diagram: null,
    options: [
      "C. The Pod remains in `Pending` state indefinitely, unscheduled",
      "B. The API server rejects the Pod creation due to invalid config",
      "A. The default scheduler picks up the Pod after a timeout period",
      "D. The Pod is assigned to a random node directly by the kubelet"
    ],
    answer: 0,
    explanation: "When a Pod specifies a `schedulerName`, only that scheduler will process it. If the named scheduler is not running, no scheduler watches for or binds the Pod, leaving it in `Pending` state. The default scheduler ignores Pods assigned to other schedulers.",
    verify: "kubectl get pod <pod-name> -o yaml | grep schedulerName"
  },
  {
    id: "s06-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node affinity rule uses the <code>In</code> operator: <code>key: kubernetes.io/os, operator: In, values: [linux, windows]</code>. What does this match?",
    diagram: null,
    options: [
      "A. Nodes where `kubernetes.io/os` is either `linux` or `windows`",
      "B. Nodes where `kubernetes.io/os` is exactly `linux, windows`",
      "C. Nodes where `kubernetes.io/os` contains the substring `linux`",
      "D. Nodes that have both `linux` and `windows` labels simultaneously"
    ],
    answer: 0,
    explanation: "The `In` operator in node affinity matches nodes whose label value is in the specified list. It acts as an OR condition across the values array. A node with `kubernetes.io/os=linux` or `kubernetes.io/os=windows` satisfies this rule.",
    verify: "kubectl get nodes --show-labels | grep kubernetes.io/os"
  },
  {
    id: "s06-q077",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "You attempt <code>kubectl drain node4</code> but get <code>error: unable to drain node, pods not managed by ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet</code>. What caused this?",
    diagram: null,
    options: [
      "A. The node has static Pods managed by the kubelet that cannot be drained",
      "B. The Pods have a `terminationGracePeriodSeconds` value that is set too high",
      "C. Standalone Pods not managed by any controller exist on the target node",
      "D. The node's kubelet process is not responding to the eviction API requests"
    ],
    answer: 2,
    explanation: "Standalone Pods (created directly, not by a controller) will not be recreated if evicted. The drain command refuses to evict them by default to prevent data loss. The `--force` flag must be used to evict these Pods, acknowledging they will be permanently deleted.",
    verify: "kubectl drain node4 --force --dry-run=client"
  },
  {
    id: "s06-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You set a weight of <code>100</code> on one <code>preferredDuringSchedulingIgnoredDuringExecution</code> node affinity term and <code>1</code> on another. How does the scheduler use these weights?",
    diagram: null,
    options: [
      "A. The weight=100 rule must be fully satisfied; the weight=1 rule is treated as optional",
      "B. Only the highest-weight rule is evaluated by the scheduler, lower ones are discarded",
      "C. Weights are percentages, so weight=100 means the rule is always strictly enforced",
      "D. Nodes matching weight=100 score 100x higher for that term than weight=1 matches"
    ],
    answer: 3,
    explanation: "Weights in preferred node affinity range from 1 to 100 and are used as multipliers in the scoring phase. A node matching the weight=100 term receives 100 points for that term versus 1 point for the other. The scheduler sums all scores to rank nodes, making higher-weight preferences more influential.",
    verify: "kubectl explain pod.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution"
  },
  {
    id: "s06-q079",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team runs a multi-region Kubernetes federation. They want to ensure that each region's API gateway has local database Pods. Which scheduling concept addresses this requirement?",
    diagram: null,
    options: [
      "C. Cross-cluster PersistentVolume replication and sync",
      "B. Global load balancing via a service mesh component",
      "A. Pod affinity with a zone or region topology key",
      "D. DNS-based geographic routing to the nearest region"
    ],
    answer: 2,
    explanation: "Pod affinity with a region-level topology key ensures database Pods are co-located in the same region as API gateway Pods. This reduces cross-region latency and keeps data access local. Other options address traffic routing or storage but not Pod placement.",
    verify: "kubectl get nodes --show-labels | grep topology.kubernetes.io/region"
  },
  {
    id: "s06-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "In a kubeadm cluster, where are the static Pod manifests for control-plane components stored by default?",
    diagram: null,
    options: [
      "A. `/var/lib/kubelet/config.yaml` file",
      "B. `/opt/cni/bin/` plugin directory",
      "C. `/etc/kubernetes/manifests/` path",
      "D. `/etc/containerd/config.toml` file"
    ],
    answer: 2,
    explanation: "kubeadm places static Pod manifests for kube-apiserver, kube-controller-manager, kube-scheduler, and etcd in `/etc/kubernetes/manifests/`. The kubelet watches this directory and automatically creates or updates Pods when manifests change.",
    verify: "ls /etc/kubernetes/manifests/"
  },
  {
    id: "s06-q081",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "During a complex scheduling issue, you want to trace why a specific Pod was placed on a particular node. Which kube-scheduler feature provides this information?",
    diagram: null,
    options: [
      "A. Scheduler extender logs and their plugin output entries",
      "B. Distributed tracing with Jaeger and OpenTelemetry spans",
      "C. Pod status conditions and their latest transition times",
      "D. Verbose scheduler logging at level 10 and Pod events"
    ],
    answer: 3,
    explanation: "The kube-scheduler emits events on Pods with scheduling decisions and reasons. Increasing verbosity (`--v=10`) provides detailed logs about filter and score plugin results. Pod events show which node was selected and why, making them the primary debugging tool.",
    verify: "kubectl describe pod <pod-name> | grep -A5 Events"
  },
  {
    id: "s06-q082",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A cluster upgrade requires updating RBAC rules. The existing ClusterRole for the scheduler includes custom permissions. What risk does upgrading with <code>kubeadm upgrade apply</code> pose to this ClusterRole?",
    diagram: null,
    options: [
      "D. kubeadm deletes all RBAC objects then recreates them from default templates only",
      "B. kubeadm always overwrites all ClusterRoles with their default values on upgrade",
      "C. Custom ClusterRoles are preserved because kubeadm never modifies existing RBAC",
      "A. kubeadm may overwrite system ClusterRoles it manages, removing custom rules"
    ],
    answer: 3,
    explanation: "kubeadm manages specific system ClusterRoles and may overwrite them during upgrades. Custom permissions added to these managed roles can be lost. Best practice is to create separate ClusterRoles for custom permissions and bind them independently.",
    verify: "kubectl get clusterrole system:kube-scheduler -o yaml"
  },
  {
    id: "s06-q083",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "What is the purpose of the <code>--pod-eviction-timeout</code> flag (or equivalent setting) on the kube-controller-manager in relation to node failures?",
    diagram: null,
    options: [
      "A. It sets the maximum time for a graceful Pod shutdown during eviction operations now",
      "B. It controls the rate at which Pods are evicted from nodes during a drain operation run",
      "C. It defines how long the controller waits before evicting Pods from `NotReady` nodes",
      "D. It sets the timeout for Pod readiness probes before marking Pods as not available yet"
    ],
    answer: 2,
    explanation: "The pod eviction timeout (default 5 minutes) determines how long the node lifecycle controller waits after a node becomes `NotReady` before evicting its Pods. This grace period accounts for transient network issues and prevents unnecessary Pod disruption. Note: the `--pod-eviction-timeout` flag was deprecated and removed in Kubernetes 1.27+. In modern clusters, eviction is controlled via NoExecute taints applied automatically to NotReady nodes and the `tolerationSeconds` field on Pod tolerations (default 300s).",
    verify: null
  },
  {
    id: "s06-q084",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team uses Knative to run event-driven workloads. During cluster maintenance, Knative Pods scale to zero. After maintenance, traffic arrives but Pods take 30 seconds to start. Which scheduling optimization could reduce this cold-start time?",
    diagram: null,
    options: [
      "A. Setting `minScale: 1` to keep at least one Pod warm",
      "B. Using `PreferNoSchedule` taints on maintenance nodes",
      "C. Configuring pod anti-affinity across availability zones",
      "D. Increasing the `terminationGracePeriodSeconds`"
    ],
    answer: 0,
    explanation: "Setting `minScale: 1` in Knative prevents the revision from scaling to zero, keeping at least one Pod running at all times. This eliminates cold-start latency at the cost of maintaining a warm instance. This is a common trade-off for latency-sensitive serverless workloads.",
    verify: null
  },
  {
    id: "s06-q085",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod's toleration uses <code>operator: Exists</code> with <code>key: special-taint</code> and no <code>value</code> field. Which taints does this toleration match?",
    diagram: null,
    options: [
      "A. Only taints with key `special-taint` and an empty string value",
      "B. All taints on the node regardless of their key, value, or effect",
      "C. No taints at all, because a value field must always be specified",
      "D. All taints with key `special-taint` regardless of their value"
    ],
    answer: 3,
    explanation: "The `Exists` operator matches all taints with the specified key, regardless of their value. If no key is specified with `Exists`, it matches all taints. This is useful when you want to tolerate a taint key without caring about the specific value assigned.",
    verify: "kubectl explain pod.spec.tolerations"
  },
  {
    id: "s06-q086",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A StatefulSet uses <code>volumeClaimTemplates</code> with a StorageClass that provisions network-attached storage. After draining a node and the Pod is rescheduled, what happens to the PersistentVolumeClaim?",
    diagram: null,
    options: [
      "A. A new PVC is created for the rescheduled Pod and the old data is abandoned",
      "B. The existing PVC is reused and the PV is attached to the new node",
      "C. The PVC is deleted and the data stored on the PersistentVolume is then lost",
      "D. The Pod cannot start until it is manually rebound to the original target node"
    ],
    answer: 1,
    explanation: "StatefulSet PVCs persist across Pod rescheduling. The existing PVC maintains its binding to the PV. Since the storage is network-attached, the PV can be detached from the old node and attached to the new node where the Pod is rescheduled, preserving data.",
    verify: "kubectl get pvc"
  },
  {
    id: "s06-q087",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "During a rolling cluster upgrade, you want to validate that the new node version works correctly before upgrading all nodes. Which strategy achieves this?",
    diagram: '<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="220" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">Canary Node Upgrade Strategy</text><rect x="20" y="45" width="80" height="40" rx="5" fill="#0d2137" stroke="#555" stroke-width="1.5"/><text x="60" y="62" text-anchor="middle" fill="#aaa" font-size="9">Node 1</text><text x="60" y="76" text-anchor="middle" fill="#888" font-size="8">v1.28</text><rect x="110" y="45" width="80" height="40" rx="5" fill="#0d2137" stroke="#555" stroke-width="1.5"/><text x="150" y="62" text-anchor="middle" fill="#aaa" font-size="9">Node 2</text><text x="150" y="76" text-anchor="middle" fill="#888" font-size="8">v1.28</text><rect x="200" y="45" width="80" height="40" rx="5" fill="#0d2137" stroke="#555" stroke-width="1.5"/><text x="240" y="62" text-anchor="middle" fill="#aaa" font-size="9">Node 3</text><text x="240" y="76" text-anchor="middle" fill="#888" font-size="8">v1.28</text><rect x="290" y="45" width="80" height="40" rx="5" fill="#0d2137" stroke="#4caf50" stroke-width="2"/><text x="330" y="62" text-anchor="middle" fill="#4caf50" font-size="9">Node 4</text><text x="330" y="76" text-anchor="middle" fill="#4caf50" font-size="8">v1.29 (canary)</text><line x1="200" y1="100" x2="200" y2="115" stroke="#7ec8e3" stroke-width="1" stroke-dasharray="3,3"/><text x="200" y="130" text-anchor="middle" fill="#ff9800" font-size="10">1. Upgrade one node first</text><text x="200" y="150" text-anchor="middle" fill="#ff9800" font-size="10">2. Migrate subset of workloads</text><text x="200" y="170" text-anchor="middle" fill="#ff9800" font-size="10">3. Validate health and metrics</text><text x="200" y="190" text-anchor="middle" fill="#4caf50" font-size="10">4. If OK, proceed with remaining</text><text x="200" y="210" text-anchor="middle" fill="#f44336" font-size="10">5. If not, rollback the canary node</text></svg>',
    options: [
      "A. Upgrade all worker nodes simultaneously for version consistency across the cluster",
      "B. Upgrade the control plane components only and skip the worker node upgrades fully",
      "C. Upgrade one canary node first, validate its workloads, then proceed with the rest",
      "D. Run two separate clusters during the transition and migrate workloads between them"
    ],
    answer: 2,
    explanation: "Upgrading a single canary node first allows validation of the new version with real workloads before committing to a full rollout. If issues are found, only one node needs to be rolled back. This minimizes risk while providing confidence in the upgrade process.",
    verify: "kubectl get nodes -o wide"
  },
  {
    id: "s06-q088",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline must verify that node maintenance operations complete successfully before deploying new application versions. Which approach best integrates cluster readiness checks into the pipeline?",
    diagram: null,
    options: [
      "A. Skip pre-deployment checks entirely and rely on Kubernetes self-healing for recovery instead",
      "B. Deploy to a separate staging cluster that never undergoes any scheduled maintenance procedures",
      "C. Add a manual approval gate where an operator visually inspects the full cluster readiness state",
      "D. Run `kubectl get nodes` in the pipeline and assert all nodes are `Ready` before deploying"
    ],
    answer: 3,
    explanation: "Automated pre-deployment checks in CI/CD pipelines ensure the cluster is healthy before deploying. Asserting all nodes are `Ready` prevents deployments to clusters mid-maintenance where scheduling constraints might cause failures. This follows the principle of automated validation gates.",
    verify: "kubectl get nodes"
  },
  {
    id: "s06-q089",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Which Kubernetes ecosystem project specifically addresses re-balancing Pod placement after scheduling decisions become suboptimal over time due to node additions, removals, or policy changes?",
    diagram: null,
    options: [
      "A. Descheduler for rebalancing Pods",
      "B. kube-scheduler for initial placing",
      "C. Cluster Autoscaler for node sizing",
      "D. kube-state-metrics for monitoring"
    ],
    answer: 0,
    explanation: "The Descheduler identifies Pods that violate scheduling policies or are suboptimally placed and evicts them so the scheduler can make better placement decisions. It runs periodically or on-demand, addressing issues like uneven distribution that develop over time.",
    verify: null
  },
  {
    id: "s06-q090",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A cluster administrator wants to prevent namespaces from consuming more than their allocated share of CPU and memory. Which Kubernetes resource enforces namespace-level aggregate resource limits?",
    diagram: null,
    options: [
      "C. ResourceQuota for aggregates",
      "B. PodDisruptionBudget for uptime",
      "A. LimitRange for per-Pod defaults",
      "D. PriorityClass for scheduling"
    ],
    answer: 0,
    explanation: "ResourceQuota sets aggregate resource limits per namespace, controlling the total CPU, memory, storage, and object counts that can be consumed. LimitRange sets per-Pod or per-container defaults and constraints, not namespace-wide totals.",
    verify: "kubectl get resourcequota -n <namespace>"
  },
  {
    id: "s06-q091",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A high-priority Pod preempts a lower-priority Pod, but the preempted Pod's `terminationGracePeriodSeconds` is set to 300. The high-priority Pod needs the resources immediately. What happens?",
    diagram: null,
    options: [
      "A. The high-priority Pod waits up to 300 seconds for the preempted Pod to terminate",
      "B. The preempted Pod is killed immediately, ignoring its configured grace period time",
      "C. The scheduler finds an alternative node to avoid waiting the long grace period out",
      "D. The preempted Pod's grace period is automatically reduced to a default 30 seconds"
    ],
    answer: 0,
    explanation: "Preemption respects the victim Pod's `terminationGracePeriodSeconds`. The nominated high-priority Pod must wait until the preempted Pod terminates (up to its full grace period) before resources are freed. This can delay scheduling of the high-priority Pod.",
    verify: "kubectl describe pod <preempted-pod> | grep -i grace"
  },
  {
    id: "s06-q092",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud-native platform team automates node lifecycle management. When a node is cordoned via <code>kubectl cordon</code>, which field on the Node object is modified to signal the scheduler?",
    diagram: null,
    options: [
      "A. `metadata.labels` gains a `node.kubernetes.io/unschedulable: true` entry",
      "B. `status.conditions` adds a new `Schedulable: False` condition to the node",
      "C. `metadata.annotations` gains `scheduler.alpha.kubernetes.io/disabled: true`",
      "D. `spec.unschedulable` is set to `true` signaling the scheduler to skip it"
    ],
    answer: 3,
    explanation: "`kubectl cordon` sets `spec.unschedulable: true` on the Node object. The scheduler checks this field during the filtering phase and excludes unschedulable nodes from consideration. This declarative approach to node lifecycle aligns with cloud-native infrastructure-as-code principles.",
    verify: "kubectl get node <node-name> -o jsonpath='{.spec.unschedulable}'"
  },
  {
    id: "s06-q093",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "After restoring a cluster from an etcd backup, the GitOps controller detects drift between the Git repository and the cluster state. What is the expected behavior?",
    diagram: null,
    options: [
      "A. The GitOps controller deletes resources not present in the Git repository state",
      "B. The cluster state takes precedence and the Git repository state is left as stale",
      "C. The GitOps controller reconciles the cluster to match the Git repository state",
      "D. The GitOps controller pauses sync and requires manual intervention from admin"
    ],
    answer: 2,
    explanation: "GitOps controllers like Flux and Argo CD continuously reconcile cluster state to match the Git repository. After a restore from backup, any drift (resources present in Git but different or missing in the cluster) triggers the controller to reapply the desired state from Git.",
    verify: null
  },
  {
    id: "s06-q094",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod anti-affinity rule specifies <code>topologyKey: topology.kubernetes.io/zone</code> with <code>requiredDuringSchedulingIgnoredDuringExecution</code>. If all zones already have a matching Pod, what happens?",
    diagram: null,
    options: [
      "A. The Pod remains in `Pending` state until more zones become available",
      "B. The Pod is scheduled in the zone with the fewest matching Pods present",
      "C. A new zone is automatically provisioned to satisfy the spread constraint",
      "D. The anti-affinity rule is relaxed to use hostname-level topology instead"
    ],
    answer: 0,
    explanation: "With a hard anti-affinity (`required`) at the zone topology level, if every zone already has a matching Pod, no zone satisfies the constraint. The Pod stays Pending until a zone becomes available or the constraint is changed. The scheduler does not automatically relax the topology.",
    verify: "kubectl describe pod <pod-name> | grep -A3 Warning"
  },
  {
    id: "s06-q095",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is deciding between upgrading Kubernetes one minor version at a time versus skipping versions. The cluster is at v1.27 and they want v1.30. What does the Kubernetes project recommend?",
    diagram: null,
    options: [
      "A. Skip directly to v1.30 to reduce the total number of maintenance windows",
      "B. Upgrade to v1.29 first since skipping one version is allowed, then v1.30",
      "C. Build a new v1.30 cluster from scratch and migrate all existing workloads",
      "D. Upgrade sequentially: v1.27 -> v1.28 -> v1.29 -> v1.30, one at a time"
    ],
    answer: 3,
    explanation: "Kubernetes supports upgrading one minor version at a time. Skipping minor versions is not supported because each upgrade may include migration steps, API deprecations, and data format changes that must be applied sequentially. The kubeadm upgrade tool enforces this constraint.",
    verify: "kubeadm upgrade plan"
  },
  {
    id: "s06-q096",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "During preemption, the scheduler selects victim Pods to evict. Which factor has the highest priority when choosing victims?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="240" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">Preemption Victim Selection</text><rect x="30" y="45" width="340" height="35" rx="5" fill="#1a2a1a" stroke="#4caf50" stroke-width="1.5"/><text x="200" y="67" text-anchor="middle" fill="#4caf50" font-size="11">1. Lowest PriorityClass value selected first</text><rect x="30" y="90" width="340" height="35" rx="5" fill="#0d2137" stroke="#ff9800" stroke-width="1.5"/><text x="200" y="112" text-anchor="middle" fill="#ff9800" font-size="11">2. Minimize number of PDB violations</text><rect x="30" y="135" width="340" height="35" rx="5" fill="#0d2137" stroke="#7ec8e3" stroke-width="1.5"/><text x="200" y="157" text-anchor="middle" fill="#7ec8e3" font-size="11">3. Lowest priority victims evicted first</text><rect x="30" y="180" width="340" height="35" rx="5" fill="#0d2137" stroke="#888" stroke-width="1.5"/><text x="200" y="202" text-anchor="middle" fill="#aaa" font-size="11">4. Minimize total resources freed</text><text x="200" y="235" text-anchor="middle" fill="#888" font-size="9">Scheduler picks the node requiring fewest/lowest-priority evictions</text></svg>',
    options: [
      "A. Pod age is the primary factor and older Pods are always evicted first",
      "B. Pod resource usage is checked and Pods using the most are evicted first",
      "C. Pod priority value is the main factor, lowest-priority Pods go first",
      "D. Pod namespace is checked and Pods in non-system namespaces go first"
    ],
    answer: 2,
    explanation: "The scheduler prefers to evict the lowest-priority Pods first. Among candidate nodes, it chooses the one where the fewest evictions or the lowest-priority evictions are needed. PDB violations are also minimized. Pod age and namespace are not primary factors.",
    verify: "kubectl get priorityclass"
  },
  {
    id: "s06-q097",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "After draining and upgrading a node, you uncordon it. New Pods are scheduled but cannot reach ClusterIP Services. kube-proxy is running. What should you check?",
    diagram: null,
    options: [
      "A. Whether the node's iptables rules were flushed during the upgrade process",
      "B. Whether CoreDNS Pods are running on this specific recently upgraded node",
      "C. Whether the Service ClusterIP has changed after the upgrade was completed",
      "D. Whether the Pod network interface has the correct MTU after the node update"
    ],
    answer: 0,
    explanation: "If iptables rules were cleared during the node upgrade, kube-proxy may not have fully reprogrammed them yet. Restarting the kube-proxy Pod on that node forces a full sync of iptables rules from the current Service/Endpoint state, restoring ClusterIP routing.",
    verify: "kubectl -n kube-system get pods -l k8s-app=kube-proxy -o wide"
  },
  {
    id: "s06-q098",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart includes a <code>Job</code> with a <code>helm.sh/hook: pre-upgrade</code> annotation that backs up the database before upgrades. During a cluster upgrade, the Job fails. What happens to the Helm release?",
    diagram: null,
    options: [
      "A. The Helm upgrade proceeds anyway and the hook failure is logged but ignored",
      "C. Helm automatically rolls back to the previous release version on hook failure",
      "B. The upgrade is aborted and the release remains at its previous chart version",
      "D. The hook Job is retried three times before the upgrade is marked as a failure"
    ],
    answer: 2,
    explanation: "When a pre-upgrade hook fails, Helm marks the upgrade as FAILED and the previously deployed release remains the active one. The hook must succeed for the upgrade to proceed. This safety mechanism ensures prerequisites (like backups) complete before changes are applied.",
    verify: "helm history <release-name>"
  },
  {
    id: "s06-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An etcd member is replaced in a 3-member cluster. What is the correct procedure?",
    diagram: null,
    options: [
      "A. Add the new member first, then remove the old member from the existing cluster",
      "B. Remove the old member first, then add the new one to maintain quorum safely",
      "C. Stop all members, replace the failed one, and restart the full cluster together",
      "D. Restore from backup on the new member without modifying the cluster membership"
    ],
    answer: 1,
    explanation: "To replace an etcd member safely, first remove the failed member using `etcdctl member remove`, then add the new member with `etcdctl member add`. Removing first prevents the cluster from attempting to replicate to the failed member and avoids split-brain scenarios.",
    verify: "ETCDCTL_API=3 etcdctl member list"
  },
  {
    id: "s06-q100",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A Pod has the toleration <code>operator: Exists</code> with no key, value, or effect specified. What does this toleration match?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="390" height="190" rx="8" fill="#1a1a2e" stroke="#444" stroke-width="1"/><text x="200" y="28" text-anchor="middle" fill="#7ec8e3" font-size="13" font-weight="bold">Wildcard Toleration: operator=Exists (no key)</text><rect x="30" y="50" width="100" height="50" rx="5" fill="#0d2137" stroke="#ff9800" stroke-width="1.5"/><text x="80" y="72" text-anchor="middle" fill="#ff9800" font-size="9">Taint: gpu=true</text><text x="80" y="88" text-anchor="middle" fill="#888" font-size="8">NoSchedule</text><rect x="150" y="50" width="100" height="50" rx="5" fill="#0d2137" stroke="#ff9800" stroke-width="1.5"/><text x="200" y="72" text-anchor="middle" fill="#ff9800" font-size="9">Taint: team=ops</text><text x="200" y="88" text-anchor="middle" fill="#888" font-size="8">NoExecute</text><rect x="270" y="50" width="100" height="50" rx="5" fill="#0d2137" stroke="#ff9800" stroke-width="1.5"/><text x="320" y="72" text-anchor="middle" fill="#ff9800" font-size="9">Taint: any=any</text><text x="320" y="88" text-anchor="middle" fill="#888" font-size="8">PreferNoSchedule</text><rect x="100" y="125" width="200" height="40" rx="6" fill="#1a2a1a" stroke="#4caf50" stroke-width="1.5"/><text x="200" y="149" text-anchor="middle" fill="#4caf50" font-size="11">All taints matched</text><line x1="80" y1="100" x2="200" y2="125" stroke="#4caf50" stroke-width="1" stroke-dasharray="3,3"/><line x1="200" y1="100" x2="200" y2="125" stroke="#4caf50" stroke-width="1" stroke-dasharray="3,3"/><line x1="320" y1="100" x2="200" y2="125" stroke="#4caf50" stroke-width="1" stroke-dasharray="3,3"/><text x="200" y="185" text-anchor="middle" fill="#888" font-size="9">Pod can schedule on any node regardless of taints</text></svg>',
    options: [
      "A. Only taints with the `NoSchedule` effect are matched",
      "B. Only taints that have no value set are matched by it",
      "C. All taints are matched, it is a wildcard toleration",
      "D. No taints are matched since a key is always required"
    ],
    answer: 2,
    explanation: "A toleration with `operator: Exists` and no key specified acts as a wildcard that matches every possible taint. This means the Pod can be scheduled on any node regardless of its taints. This is sometimes used for infrastructure Pods that must run everywhere.",
    verify: "kubectl explain pod.spec.tolerations"
  }
];

var labExercises = [
  {
    title: "Lab 1: Using nodeSelector and Node Labels",
    description: "Learn how to label nodes and use <code>nodeSelector</code> to constrain Pod scheduling to specific nodes. You will label a node with a custom key-value pair and deploy a Pod that targets only labeled nodes.",
    commands: "<pre><code><span class='prompt'>$</span> kubectl get nodes --show-labels\n\n<span class='prompt'>$</span> kubectl label nodes worker-1 disk=ssd\nnode/worker-1 labeled\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: ssd-pod\nspec:\n  nodeSelector:\n    disk: ssd\n  containers:\n  - name: nginx\n    image: nginx:1.25\n    resources:\n      requests:\n        cpu: 100m\n        memory: 128Mi\nEOF\npod/ssd-pod created\n\n<span class='prompt'>$</span> kubectl get pod ssd-pod -o wide\nNAME      READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES\nssd-pod   1/1     Running   0          15s   10.244.1.5   worker-1   &lt;none&gt;           &lt;none&gt;\n\n<span class='prompt'>$</span> kubectl label nodes worker-1 disk-\nnode/worker-1 unlabeled\n\n<span class='prompt'>$</span> kubectl delete pod ssd-pod\npod \"ssd-pod\" deleted</code></pre>",
    expected: "The Pod is scheduled exclusively on the node labeled <code>disk=ssd</code>. Removing the label does not evict the running Pod, but new Pods with the same <code>nodeSelector</code> will not schedule on that node."
  },
  {
    title: "Lab 2: Applying Taints and Tolerations",
    description: "Practice applying taints to nodes and configuring tolerations on Pods to control scheduling. You will taint a node, observe scheduling behavior, then add a toleration to allow a Pod on the tainted node.",
    commands: "<pre><code><span class='prompt'>$</span> kubectl taint nodes worker-2 dedicated=gpu:NoSchedule\nnode/worker-2 tainted\n\n<span class='prompt'>$</span> kubectl run test-pod --image=nginx:1.25 --restart=Never\npod/test-pod created\n\n<span class='prompt'>$</span> kubectl get pod test-pod -o wide\nNAME       READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES\ntest-pod   1/1     Running   0          10s   10.244.2.3   worker-1   &lt;none&gt;           &lt;none&gt;\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: gpu-pod\nspec:\n  tolerations:\n  - key: dedicated\n    operator: Equal\n    value: gpu\n    effect: NoSchedule\n  nodeSelector:\n    kubernetes.io/hostname: worker-2\n  containers:\n  - name: cuda\n    image: nginx:1.25\n    resources:\n      requests:\n        cpu: 100m\n        memory: 128Mi\nEOF\npod/gpu-pod created\n\n<span class='prompt'>$</span> kubectl get pod gpu-pod -o wide\nNAME      READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES\ngpu-pod   1/1     Running   0          8s    10.244.3.2   worker-2   &lt;none&gt;           &lt;none&gt;\n\n<span class='prompt'>$</span> kubectl taint nodes worker-2 dedicated=gpu:NoSchedule-\nnode/worker-2 untainted\n\n<span class='prompt'>$</span> kubectl delete pod test-pod gpu-pod\npod \"test-pod\" deleted\npod \"gpu-pod\" deleted</code></pre>",
    expected: "The untolerated Pod avoids the tainted node, while the Pod with a matching toleration and <code>nodeSelector</code> schedules on <code>worker-2</code>. Removing the taint restores normal scheduling."
  },
  {
    title: "Lab 3: Cordoning and Draining a Node",
    description: "Practice the node maintenance workflow: cordon a node to prevent new scheduling, drain it to evict existing Pods, perform maintenance, then uncordon to restore scheduling.",
    commands: "<pre><code><span class='prompt'>$</span> kubectl get nodes\nNAME           STATUS   ROLES           AGE   VERSION\ncontrol-plane  Ready    control-plane   30d   v1.29.0\nworker-1       Ready    &lt;none&gt;          30d   v1.29.0\nworker-2       Ready    &lt;none&gt;          30d   v1.29.0\n\n<span class='prompt'>$</span> kubectl cordon worker-1\nnode/worker-1 cordoned\n\n<span class='prompt'>$</span> kubectl get nodes\nNAME           STATUS                     ROLES           AGE   VERSION\ncontrol-plane  Ready                      control-plane   30d   v1.29.0\nworker-1       Ready,SchedulingDisabled   &lt;none&gt;          30d   v1.29.0\nworker-2       Ready                      &lt;none&gt;          30d   v1.29.0\n\n<span class='prompt'>$</span> kubectl drain worker-1 --ignore-daemonsets --delete-emptydir-data\nnode/worker-1 already cordoned\nevicting pod default/my-app-6b7f8d9c5-x2k4m\nevicting pod default/my-app-6b7f8d9c5-r9p3n\npod/my-app-6b7f8d9c5-x2k4m evicted\npod/my-app-6b7f8d9c5-r9p3n evicted\nnode/worker-1 drained\n\n<span class='prompt'>$</span> kubectl get pods -o wide\nNAME                     READY   STATUS    RESTARTS   AGE   IP           NODE\nmy-app-6b7f8d9c5-abc12   1/1     Running   0          5s    10.244.3.4   worker-2\nmy-app-6b7f8d9c5-def34   1/1     Running   0          5s    10.244.3.5   worker-2\n\n<span class='prompt'>$</span> kubectl uncordon worker-1\nnode/worker-1 uncordoned\n\n<span class='prompt'>$</span> kubectl get nodes\nNAME           STATUS   ROLES           AGE   VERSION\ncontrol-plane  Ready    control-plane   30d   v1.29.0\nworker-1       Ready    &lt;none&gt;          30d   v1.29.0\nworker-2       Ready    &lt;none&gt;          30d   v1.29.0</code></pre>",
    expected: "After cordoning, the node shows <code>SchedulingDisabled</code>. Draining evicts all non-DaemonSet Pods, which are rescheduled on other nodes by their controllers. Uncordoning restores the node to schedulable status."
  },
  {
    title: "Lab 4: Setting Pod Priority and Preemption",
    description: "Create PriorityClasses and observe how high-priority Pods preempt lower-priority ones when resources are constrained.",
    commands: "<pre><code><span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: scheduling.k8s.io/v1\nkind: PriorityClass\nmetadata:\n  name: high-priority\nvalue: 1000000\nglobalDefault: false\npreemptionPolicy: PreemptLowerPriority\ndescription: \"High priority for critical workloads\"\nEOF\npriorityclass.scheduling.k8s.io/high-priority created\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: scheduling.k8s.io/v1\nkind: PriorityClass\nmetadata:\n  name: low-priority\nvalue: 100\nglobalDefault: false\npreemptionPolicy: PreemptLowerPriority\ndescription: \"Low priority for batch workloads\"\nEOF\npriorityclass.scheduling.k8s.io/low-priority created\n\n<span class='prompt'>$</span> kubectl get priorityclasses\nNAME                      VALUE        GLOBAL-DEFAULT   AGE\nhigh-priority             1000000      false            30s\nlow-priority              100          false            15s\nsystem-cluster-critical   2000000000   false            30d\nsystem-node-critical      2000001000   false            30d\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: low-priority-pod\nspec:\n  priorityClassName: low-priority\n  containers:\n  - name: busybox\n    image: busybox:1.36\n    command: [\"sleep\", \"3600\"]\n    resources:\n      requests:\n        cpu: 500m\n        memory: 256Mi\nEOF\npod/low-priority-pod created\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: high-priority-pod\nspec:\n  priorityClassName: high-priority\n  containers:\n  - name: busybox\n    image: busybox:1.36\n    command: [\"sleep\", \"3600\"]\n    resources:\n      requests:\n        cpu: 500m\n        memory: 256Mi\nEOF\npod/high-priority-pod created\n\n<span class='prompt'>$</span> kubectl get pods -o wide\nNAME                READY   STATUS    RESTARTS   AGE   IP           NODE\nhigh-priority-pod   1/1     Running   0          10s   10.244.1.8   worker-1\nlow-priority-pod    1/1     Running   0          30s   10.244.2.4   worker-2\n\n<span class='prompt'>$</span> kubectl delete pod high-priority-pod low-priority-pod\npod \"high-priority-pod\" deleted\npod \"low-priority-pod\" deleted\n\n<span class='prompt'>$</span> kubectl delete priorityclass high-priority low-priority\npriorityclass.scheduling.k8s.io \"high-priority\" deleted\npriorityclass.scheduling.k8s.io \"low-priority\" deleted</code></pre>",
    expected: "PriorityClasses are created with different values. When resources are constrained, the high-priority Pod is scheduled first and can preempt the low-priority Pod if needed."
  },
  {
    title: "Lab 5: Configuring Pod Affinity Rules",
    description: "Use pod affinity and anti-affinity to control how Pods are co-located or spread across nodes. Deploy a web frontend that must be on the same node as its cache, and spread replicas across nodes.",
    commands: "<pre><code><span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: cache\n  labels:\n    app: cache\nspec:\n  containers:\n  - name: redis\n    image: redis:7-alpine\n    resources:\n      requests:\n        cpu: 100m\n        memory: 128Mi\nEOF\npod/cache created\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: web\n  labels:\n    app: web\nspec:\n  affinity:\n    podAffinity:\n      requiredDuringSchedulingIgnoredDuringExecution:\n      - labelSelector:\n          matchExpressions:\n          - key: app\n            operator: In\n            values:\n            - cache\n        topologyKey: kubernetes.io/hostname\n  containers:\n  - name: nginx\n    image: nginx:1.25\n    resources:\n      requests:\n        cpu: 100m\n        memory: 128Mi\nEOF\npod/web created\n\n<span class='prompt'>$</span> kubectl get pods -o wide\nNAME    READY   STATUS    RESTARTS   AGE   IP           NODE\ncache   1/1     Running   0          20s   10.244.1.9   worker-1\nweb     1/1     Running   0          10s   10.244.1.10  worker-1\n\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: spread-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: spread-app\n  template:\n    metadata:\n      labels:\n        app: spread-app\n    spec:\n      affinity:\n        podAntiAffinity:\n          preferredDuringSchedulingIgnoredDuringExecution:\n          - weight: 100\n            podAffinityTerm:\n              labelSelector:\n                matchExpressions:\n                - key: app\n                  operator: In\n                  values:\n                  - spread-app\n              topologyKey: kubernetes.io/hostname\n      containers:\n      - name: nginx\n        image: nginx:1.25\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\nEOF\ndeployment.apps/spread-app created\n\n<span class='prompt'>$</span> kubectl get pods -l app=spread-app -o wide\nNAME                          READY   STATUS    RESTARTS   AGE   IP            NODE\nspread-app-7c8b9d6f4-abc12   1/1     Running   0          10s   10.244.1.11   worker-1\nspread-app-7c8b9d6f4-def34   1/1     Running   0          10s   10.244.2.5    worker-2\nspread-app-7c8b9d6f4-ghi56   1/1     Running   0          10s   10.244.3.6    worker-3\n\n<span class='prompt'>$</span> kubectl delete pod cache web\npod \"cache\" deleted\npod \"web\" deleted\n\n<span class='prompt'>$</span> kubectl delete deployment spread-app\ndeployment.apps \"spread-app\" deleted</code></pre>",
    expected: "The <code>web</code> Pod is co-located on the same node as the <code>cache</code> Pod via pod affinity. The <code>spread-app</code> Deployment distributes replicas across different nodes using pod anti-affinity."
  },
  {
    title: "Lab 6: Backing Up etcd Data",
    description: "Practice taking an etcd snapshot backup and verifying it. This is a critical skill for cluster disaster recovery and is commonly tested in Kubernetes certifications.",
    commands: "<pre><code><span class='prompt'>$</span> kubectl -n kube-system get pods -l component=etcd\nNAME                  READY   STATUS    RESTARTS   AGE\netcd-control-plane    1/1     Running   0          30d\n\n<span class='prompt'>$</span> kubectl -n kube-system exec etcd-control-plane -- etcdctl version\netcdctl version: 3.5.10\nAPI version: 3.5\n\n<span class='prompt'>$</span> ETCDCTL_API=3 etcdctl snapshot save /tmp/etcd-backup.db \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\n  --key=/etc/kubernetes/pki/etcd/server.key\nSnapshot saved at /tmp/etcd-backup.db\n\n<span class='prompt'>$</span> ETCDCTL_API=3 etcdctl snapshot status /tmp/etcd-backup.db --write-out=table\n+----------+----------+------------+------------+\n|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |\n+----------+----------+------------+------------+\n| 3c24e84c |   412683 |       1287 |     5.6 MB |\n+----------+----------+------------+------------+\n\n<span class='prompt'>$</span> ls -lh /tmp/etcd-backup.db\n-rw------- 1 root root 5.6M Feb 16 10:30 /tmp/etcd-backup.db\n\n<span class='prompt'>$</span> ETCDCTL_API=3 etcdctl snapshot restore /tmp/etcd-backup.db \\\n  --data-dir=/tmp/etcd-restore-test \\\n  --initial-cluster-token=etcd-cluster-restore-test\n2024-02-16 10:31:00.123456 I | mvcc: restore compact to 412683\n2024-02-16 10:31:00.234567 I | etcdserver/membership: added member\nSnapshot restored to /tmp/etcd-restore-test\n\n<span class='prompt'>$</span> ls /tmp/etcd-restore-test/\nmember\n\n<span class='prompt'>$</span> rm -rf /tmp/etcd-restore-test /tmp/etcd-backup.db</code></pre>",
    expected: "The etcd snapshot is saved successfully and the status command confirms the backup contains data (revision, key count, and size). The restore command creates a new data directory that could be used to recover the cluster. Always store backups in a secure, remote location."
  }
];
