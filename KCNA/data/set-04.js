var EXAM_SET = 4;
var EXAM_TITLE = "KCNA Practice Exam - Set 04: Storage & Stateful Applications";
var questions = [
  {
    id: "s04-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer creates a PersistentVolumeClaim requesting 5Gi of storage with `ReadWriteOnce` access mode. The cluster has a PersistentVolume of 10Gi with `ReadWriteMany` access mode and status `Available`. Given that Kubernetes uses literal set matching for access modes (not superset matching), what happens when the PVC is created?",
    diagram: null,
    options: [
      "The PVC binds because `ReadWriteMany` on the PV satisfies the `ReadWriteOnce` request from the PVC",
      "The PVC stays `Pending` because the access modes on the PV and PVC do not exactly match each other",
      "The PVC binds but is capped at 5Gi and the remaining 5Gi is split off into a separate new PV object",
      "The PVC fails with an error because Kubernetes does not permit over-provisioning on PV capacity"
    ],
    answer: 1,
    explanation: "A PVC binds to a PV when the PV meets or exceeds the requested capacity AND the PV's accessModes list contains all access modes requested by the PVC. Kubernetes performs literal set matching, not capability-based reasoning. A PV with only [ReadWriteMany] does not contain ReadWriteOnce in its list, so the PVC stays Pending. To satisfy a PVC requesting ReadWriteOnce, the PV must explicitly include ReadWriteOnce in its accessModes array. The capacity difference (10Gi PV vs 5Gi PVC) is not the issue here.\n\nWhy other options are wrong:\n- A: RWX on the PV does not satisfy RWO on the PVC; Kubernetes performs literal set matching on access mode lists, not capability reasoning\n- C: Kubernetes never splits a PV into smaller PVs; the PVC gets the full PV capacity\n- D: Over-provisioning (PV larger than PVC request) is permitted; the PVC simply gets the entire PV\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: "kubectl get pv,pvc"
  },
  {
    id: "s04-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An administrator sets the `persistentVolumeReclaimPolicy` on a PV to `Retain`. A user deletes the PVC bound to this PV. What is the state of the PV after the PVC deletion?",
    diagram: '<svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="15" width="100" height="40" rx="5" fill="#E8F0FE" stroke="#326CE5" stroke-width="2"/><text x="60" y="40" text-anchor="middle" font-size="11" fill="#333">PVC</text><rect x="150" y="15" width="100" height="40" rx="5" fill="#A8D08D" stroke="#6AA84F" stroke-width="2"/><text x="200" y="40" text-anchor="middle" font-size="11" fill="#333">PV (Bound)</text><line x1="110" y1="35" x2="150" y2="35" stroke="#326CE5" stroke-width="2"/><text x="60" y="85" text-anchor="middle" font-size="18" fill="#CC0000">X</text><text x="60" y="100" text-anchor="middle" font-size="9" fill="#CC0000">Deleted</text><line x1="130" y1="85" x2="150" y2="85" stroke="#FFC107" stroke-width="2" stroke-dasharray="5,3"/><rect x="150" y="70" width="120" height="40" rx="5" fill="#FFD966" stroke="#F1C232" stroke-width="2"/><text x="210" y="90" text-anchor="middle" font-size="11" fill="#333">PV (?)</text><text x="210" y="105" text-anchor="middle" font-size="8" fill="#666">Data ???</text><text x="320" y="90" text-anchor="middle" font-size="9" fill="#666">Policy: ???</text></svg>',
    options: [
      "The PV and its underlying storage are permanently deleted from the storage backend by the controller",
      "The PV transitions back to `Available` state and is immediately eligible to be claimed by a new PVC",
      "The PV enters a `Failed` state because the PVC that was previously bound to it no longer exists in etcd",
      "The PV moves to `Released` state and retains its data but cannot bind to a new PVC without admin action"
    ],
    answer: 3,
    explanation: "With the `Retain` reclaim policy, when the bound PVC is deleted, the PV moves to a `Released` state. The data on the volume is preserved but the PV is not automatically made available for a new claim. An administrator must manually clean up the volume and remove the `claimRef` to make it `Available` again.\n\nWhy other options are wrong:\n- A: The Delete policy deletes the PV and storage, not Retain; Retain preserves both\n- B: Released PVs do not return to Available automatically; the claimRef must be manually removed\n- C: There is no Failed state triggered by PVC deletion; Failed occurs only when automatic reclamation fails\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#retain",
    verify: "kubectl get pv -o wide"
  },
  {
    id: "s04-q003",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet named `db` with 3 replicas uses `volumeClaimTemplates` to provision storage. Which of the following correctly describes the PVC naming convention?",
    diagram: null,
    options: [
      "All replicas share a single PVC named `db-pvc` that is created once when the StatefulSet is deployed",
      "PVCs follow the pattern `<volumeClaimTemplate-name>-<statefulset-name>-<ordinal>`, e.g. `data-db-0`",
      "PVCs are named with random suffixes similar to how Deployment pod names are generated by the controller",
      "PVCs follow the pattern `<statefulset-name>-<ordinal>`, for example `db-0`, `db-1`, and `db-2`"
    ],
    answer: 1,
    explanation: "StatefulSet PVCs follow a deterministic naming pattern: `<volumeClaimTemplate-name>-<statefulset-name>-<ordinal>`. If the `volumeClaimTemplates` entry is named `data` and the StatefulSet is named `db`, the PVCs will be `data-db-0`, `data-db-1`, and `data-db-2`. This ensures stable, predictable storage identity across pod reschedules.\n\nWhy other options are wrong:\n- A: StatefulSet replicas do not share a single PVC; each gets its own via volumeClaimTemplates\n- C: PVC names are deterministic, not random; they follow the template-statefulset-ordinal pattern\n- D: The volumeClaimTemplate name is part of the PVC name, not just the StatefulSet name and ordinal\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get pvc -l app=db"
  },
  {
    id: "s04-q004",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A pod specification includes an `emptyDir` volume with `medium: Memory`. What is the operational impact of this configuration?",
    diagram: null,
    options: [
      "The volume uses the node's local SSD for faster I/O performance instead of the default disk-backed storage",
      "The volume uses a memory-mapped file that persists the stored data reliably across container and pod restarts",
      "The volume is backed by tmpfs in RAM, so data is lost on pod restart and usage counts against the memory limit",
      "The volume is backed by RAM (tmpfs) but data written to it does not count against any container resource limits"
    ],
    answer: 2,
    explanation: "Setting `medium: Memory` on an `emptyDir` volume tells Kubernetes to mount a tmpfs (RAM-backed) filesystem. This provides very fast I/O but the data is ephemeral and lost when the pod is removed. The storage consumed by the tmpfs volume counts against the container's memory resource limit.\n\nWhy other options are wrong:\n- A: medium: Memory uses RAM (tmpfs), not local SSD; the default (no medium) uses disk\n- B: tmpfs data does not persist across pod restarts; it is lost when the pod is evicted or deleted\n- D: tmpfs-backed emptyDir usage does count against the container's memory resource limit\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl describe pod <pod-name> | grep -A5 Volumes"
  },
  {
    id: "s04-q005",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team is deploying a distributed database that requires each replica to have its own dedicated persistent storage that survives pod rescheduling. Which workload controller and volume strategy should they use?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="40" rx="6" fill="#326CE5" /><text x="200" y="35" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Controller ???</text><rect x="20" y="70" width="110" height="60" rx="4" fill="#E8F0FE" stroke="#326CE5" /><text x="75" y="95" text-anchor="middle" font-size="11" fill="#333">Pod A</text><rect x="25" y="105" width="100" height="18" rx="3" fill="#A8D08D" /><text x="75" y="117" text-anchor="middle" font-size="9" fill="#333">PVC-A</text><rect x="145" y="70" width="110" height="60" rx="4" fill="#E8F0FE" stroke="#326CE5" /><text x="200" y="95" text-anchor="middle" font-size="11" fill="#333">Pod B</text><rect x="150" y="105" width="100" height="18" rx="3" fill="#A8D08D" /><text x="200" y="117" text-anchor="middle" font-size="9" fill="#333">PVC-B</text><rect x="270" y="70" width="110" height="60" rx="4" fill="#E8F0FE" stroke="#326CE5" /><text x="325" y="95" text-anchor="middle" font-size="11" fill="#333">Pod C</text><rect x="275" y="105" width="100" height="18" rx="3" fill="#A8D08D" /><text x="325" y="117" text-anchor="middle" font-size="9" fill="#333">PVC-C</text><rect x="20" y="155" width="110" height="40" rx="4" fill="#FFF3CD" stroke="#FFC107" /><text x="75" y="180" text-anchor="middle" font-size="10" fill="#333">PV-001 (10Gi)</text><rect x="145" y="155" width="110" height="40" rx="4" fill="#FFF3CD" stroke="#FFC107" /><text x="200" y="180" text-anchor="middle" font-size="10" fill="#333">PV-002 (10Gi)</text><rect x="270" y="155" width="110" height="40" rx="4" fill="#FFF3CD" stroke="#FFC107" /><text x="325" y="180" text-anchor="middle" font-size="10" fill="#333">PV-003 (10Gi)</text><line x1="75" y1="130" x2="75" y2="155" stroke="#326CE5" stroke-width="2" marker-end="url(#arrow)" /><line x1="200" y1="130" x2="200" y2="155" stroke="#326CE5" stroke-width="2" /><line x1="325" y1="130" x2="325" y2="155" stroke="#326CE5" stroke-width="2" /></svg>',
    options: [
      "Deployment with `volumeClaimTemplates` for per-replica storage provisioning",
      "DaemonSet with `hostPath` volumes bound to each node's local disk path",
      "StatefulSet with `volumeClaimTemplates` for per-replica persistent storage",
      "ReplicaSet with a shared PVC mounted read-write across all pod replicas"
    ],
    answer: 2,
    explanation: "StatefulSets are designed for stateful workloads that need stable network identities and dedicated persistent storage. The `volumeClaimTemplates` field in a StatefulSet spec creates a unique PVC for each replica. Deployments do not support `volumeClaimTemplates`, and shared PVCs would not provide per-replica isolation.\n\nWhy other options are wrong:\n- A: Deployments do not support volumeClaimTemplates; this is a StatefulSet-only feature\n- B: DaemonSet with hostPath provides one pod per node but lacks dedicated persistent volume management\n- D: A shared PVC across replicas does not provide per-replica storage isolation\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get statefulset,pvc"
  },
  {
    id: "s04-q006",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud-native application follows the Twelve-Factor App methodology. How does this methodology recommend handling persistent data storage?",
    diagram: null,
    options: [
      "Store all data in local container filesystems for optimal read and write performance at runtime",
      "Embed database drivers directly into the application binary to avoid any external service dependencies",
      "Treat backing services like databases as attached resources swapped without code changes",
      "Treat in-memory caching as the primary data management strategy, avoiding external backing services for simplicity"
    ],
    answer: 2,
    explanation: "The Twelve-Factor App methodology treats backing services (databases, caches, message queues) as attached resources, accessed via configuration. This means a MySQL database should be consumable via a URL and swappable without any code changes. This decouples the application from specific storage implementations.\n\nWhy other options are wrong:\n- A: Storing data in local container filesystems violates factor VI (processes should be stateless) and factor IV (backing services as attached resources)\n- B: Embedding drivers violates the principle of treating backing services as swappable attached resources\n- D: Relying on in-memory caching as the primary strategy avoids external backing services, which directly contradicts factor IV (backing services as attached resources)\n\nReference: https://12factor.net/backing-services",
    verify: null
  },
  {
    id: "s04-q007",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator notices that a PVC has been in `Pending` state for several minutes. The PVC requests `ReadWriteMany` access mode and 50Gi of storage. The cluster has several available PVs with 100Gi capacity but all are configured with `ReadWriteOnce`. What is the most likely cause?",
    diagram: null,
    options: [
      "No PV in the cluster supports the `ReadWriteMany` access mode that the PVC requires, so no binding candidate exists",
      "The PV's `ReadWriteOnce` access mode is compatible with the PVC's `ReadWriteMany` request but capacity mismatch prevents binding",
      "The PVC is waiting for a pod to reference it before the volume binding process can be triggered by the controller",
      "The PVC remains unbound because the scheduler has not yet assigned it to a specific availability zone in the region"
    ],
    answer: 0,
    explanation: "A PVC will remain `Pending` if no PV matches its requirements. While the capacity requirement is met (100Gi >= 50Gi), the access mode is not: `ReadWriteOnce` PVs cannot satisfy a `ReadWriteMany` request. The PVC needs a PV that explicitly supports `ReadWriteMany` to bind successfully.\n\nWhy other options are wrong:\n- B: A PV with greater capacity than the PVC request is eligible for binding; capacity mismatch is not the cause\n- C: PVCs do not wait for pod references before binding (unless WaitForFirstConsumer is set on the StorageClass)\n- D: The scheduler does not assign PVCs to availability zones during binding; PVC pending state here is caused by access mode mismatch, not zone assignment\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding",
    verify: "kubectl describe pvc <pvc-name>"
  },
  {
    id: "s04-q008",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A site reliability engineer wants to set up alerts for persistent volume usage approaching capacity in a Kubernetes cluster. Which metric from the kubelet's metrics endpoint is most relevant for monitoring PV disk usage?",
    diagram: null,
    options: [
      "`container_fs_writes_total` — reports total filesystem writes per running container",
      "`kube_pod_container_resource_requests` — reports container resource request values",
      "`node_filesystem_avail_bytes` — reports available bytes on node local filesystems",
      "`kubelet_volume_stats_available_bytes` — reports bytes available on mounted PVs"
    ],
    answer: 3,
    explanation: "The `kubelet_volume_stats_available_bytes` metric is exposed by the kubelet and reports the available bytes for each mounted PersistentVolume. SREs can create alerts based on this metric to detect when PV usage approaches capacity. The `node_filesystem_avail_bytes` metric reports node-level filesystem info, not specific PV volumes.\n\nWhy other options are wrong:\n- A: container_fs_writes_total tracks filesystem writes per container, not PV-specific disk usage\n- B: kube_pod_container_resource_requests reports resource request values from pod specs, not actual volume usage\n- C: node_filesystem_avail_bytes measures node-level filesystem availability, not per-PV disk usage\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: "kubectl get --raw /api/v1/nodes/<node>/proxy/metrics | grep volume_stats"
  },
  {
    id: "s04-q009",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster administrator needs to understand the lifecycle of a PersistentVolume. Which sequence correctly represents the PV phases?",
    diagram: '<svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="25" width="80" height="35" rx="5" fill="#A8D08D" stroke="#6AA84F" /><text x="45" y="47" text-anchor="middle" font-size="11" fill="#333">Phase 1</text><text x="105" y="47" text-anchor="middle" font-size="16" fill="#666">\u2192</text><rect x="120" y="25" width="70" height="35" rx="5" fill="#6FA8DC" stroke="#3D85C6" /><text x="155" y="47" text-anchor="middle" font-size="11" fill="white">Phase 2</text><text x="210" y="47" text-anchor="middle" font-size="16" fill="#666">\u2192</text><rect x="225" y="25" width="75" height="35" rx="5" fill="#FFD966" stroke="#F1C232" /><text x="262" y="47" text-anchor="middle" font-size="11" fill="#333">Phase 3</text><text x="320" y="47" text-anchor="middle" font-size="16" fill="#666">\u2192</text><rect x="335" y="25" width="60" height="35" rx="5" fill="#E06666" stroke="#CC0000" /><text x="365" y="47" text-anchor="middle" font-size="11" fill="white">Phase 4</text></svg>',
    options: [
      "`Pending` \u2192 `Bound` \u2192 `Released` \u2192 `Terminated`",
      "`Created` \u2192 `Bound` \u2192 `Unbound` \u2192 `Deleted`",
      "`Available` \u2192 `Claimed` \u2192 `Recycled` \u2192 `Available`",
      "`Available` \u2192 `Bound` \u2192 `Released` \u2192 `Failed`"
    ],
    answer: 3,
    explanation: "PersistentVolumes follow a defined lifecycle: `Available` (not yet bound to a claim), `Bound` (bound to a PVC), `Released` (PVC deleted but resource not yet reclaimed), and `Failed` (automatic reclamation failed). These are the actual phase values reported by `kubectl get pv`.\n\nWhy other options are wrong:\n- A: Pending and Terminated are not valid PV phases; PVs start in Available, not Pending\n- B: Created, Unbound, and Deleted are not valid PV phase names in Kubernetes\n- C: Claimed and Recycled are not valid PV phase names; the correct terms are Bound and Released\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#phase",
    verify: "kubectl get pv -o jsonpath='{.items[*].status.phase}'"
  },
  {
    id: "s04-q010",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A pod mounts a `configMap` volume to provide configuration files to the application. After updating the ConfigMap data with `kubectl edit configmap`, how does Kubernetes propagate the change to running pods?",
    diagram: null,
    options: [
      "ConfigMap volume mounts reflect only the state at initial mount time, requiring a pod restart to pick up changes",
      "The API server pushes changes directly to the container filesystem in real time via a streaming API",
      "A new pod is automatically created by the controller to replace the one using the outdated ConfigMap",
      "The kubelet periodically syncs mounted ConfigMap volumes, updating the files without a pod restart"
    ],
    answer: 3,
    explanation: "When a ConfigMap mounted as a volume is updated, the kubelet periodically checks for updates and refreshes the projected files. The update is not instantaneous — it can take up to the kubelet sync period plus the cache propagation delay. The application must handle re-reading the files; the pod itself is not restarted.\n\nWhy other options are wrong:\n- A: ConfigMap volume mounts are updated by the kubelet without pod restart; they are not static after initial mount\n- B: The API server does not push changes directly; the kubelet pulls updates on its sync interval\n- C: No new pod is created by a controller for ConfigMap updates; the kubelet refreshes the files in-place\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: "kubectl exec <pod> -- cat /etc/config/<key>"
  },
  {
    id: "s04-q011",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart for a database includes a `volumeClaimTemplates` section in the StatefulSet template. A user installs the chart with `helm install mydb ./db-chart`. After uninstalling with `helm uninstall mydb`, what happens to the PVCs created by the StatefulSet?",
    diagram: null,
    options: [
      "PVCs from `volumeClaimTemplates` are retained by default and must be deleted manually by the admin",
      "All PVCs created by `volumeClaimTemplates` are automatically deleted along with every other resource managed by the Helm release",
      "Helm converts existing PVCs to `emptyDir` volumes as part of the pre-uninstall cleanup hook process",
      "The PVCs are archived and stored in a Helm backup secret in the release namespace for later recovery"
    ],
    answer: 0,
    explanation: "PVCs created by StatefulSet `volumeClaimTemplates` are not managed by Helm's release lifecycle. When you run `helm uninstall`, the StatefulSet and its pods are deleted, but the PVCs persist. This is a safety feature to prevent accidental data loss. Administrators must manually delete these PVCs if they want to reclaim the storage.\n\nWhy other options are wrong:\n- B: PVCs from volumeClaimTemplates are not managed by Helm's release lifecycle and are not automatically deleted\n- C: Helm does not convert PVCs to emptyDir volumes; there is no such cleanup mechanism\n- D: Helm does not archive PVCs into backup secrets; PVCs simply persist in the namespace\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get pvc"
  },
  {
    id: "s04-q012",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer defines a pod with two containers that need to share temporary files during processing. Neither container needs the data to persist after the pod terminates. Which volume type is most appropriate?",
    diagram: null,
    options: [
      "`emptyDir` mounted in both containers for temporary shared file access",
      "`persistentVolumeClaim` with `Recycle` reclaim policy for short-term use",
      "`hostPath` pointing to `/tmp` on the node for temporary data exchange",
      "`nfs` volume with a temporary export configured for ephemeral sharing"
    ],
    answer: 0,
    explanation: "An `emptyDir` volume is created when a pod is assigned to a node and exists as long as that pod runs. It is ideal for sharing temporary data between containers in the same pod. Unlike `hostPath`, it does not expose host filesystem paths, and unlike PVCs, it requires no external provisioning for ephemeral use cases.\n\nWhy other options are wrong:\n- B: PVCs with Recycle policy are overkill for temporary sharing and Recycle is deprecated\n- C: hostPath exposes the host filesystem and is a security risk; it is not recommended for temporary data\n- D: NFS adds unnecessary complexity for ephemeral intra-pod sharing between two containers\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes}'"
  },
  {
    id: "s04-q013",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team is evaluating CNCF projects for providing persistent storage to Kubernetes workloads. Which CNCF graduated project provides storage orchestration for distributed storage clusters on Kubernetes?",
    diagram: null,
    options: [
      "Longhorn — a lightweight distributed block storage system built for Kubernetes workloads",
      "MinIO — an S3-compatible object storage server for cloud-native data management",
      "Rook — a storage orchestrator that manages Ceph clusters running on Kubernetes",
      "OpenEBS — a container-attached storage solution providing per-pod block volumes"
    ],
    answer: 2,
    explanation: "Rook is a CNCF graduated project that provides storage orchestration for Kubernetes, with its primary use case being managing Ceph clusters. It turns distributed storage into self-managing, self-scaling, and self-healing services. Longhorn is a CNCF incubating project that provides block storage and does not orchestrate Ceph clusters. MinIO is not a CNCF-hosted project. OpenEBS is a CNCF sandbox project, not graduated.\n\nWhy other options are wrong:\n- A: Longhorn is a CNCF incubating project providing block storage but does not orchestrate Ceph clusters\n- B: MinIO is not a CNCF-hosted project; it is a standalone S3-compatible object storage server\n- D: OpenEBS is a CNCF sandbox project, not graduated\n\nReference: https://www.cncf.io/projects/rook/",
    verify: null
  },
  {
    id: "s04-q014",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A StorageClass is configured with `reclaimPolicy: Delete` and `volumeBindingMode: WaitForFirstConsumer`. A PVC is created referencing this StorageClass, but no pod has mounted the PVC yet. What is the current state of the PV?",
    diagram: '<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="120" height="40" rx="5" fill="#B4A7D6" stroke="#8E7CC3"/><text x="80" y="35" text-anchor="middle" font-size="11" fill="white">StorageClass</text><text x="80" y="48" text-anchor="middle" font-size="8" fill="#EEE">WaitForFirstConsumer</text><rect x="20" y="70" width="100" height="40" rx="5" fill="#FFD966" stroke="#F1C232"/><text x="70" y="92" text-anchor="middle" font-size="11" fill="#333">PVC (Pending)</text><line x1="80" y1="50" x2="70" y2="70" stroke="#8E7CC3" stroke-width="1.5" stroke-dasharray="4"/><rect x="180" y="70" width="80" height="40" rx="5" fill="#D9D9D9" stroke="#999" stroke-dasharray="4"/><text x="220" y="92" text-anchor="middle" font-size="11" fill="#999">PV: ???</text><rect x="280" y="70" width="100" height="40" rx="5" fill="#E8F0FE" stroke="#326CE5"/><text x="330" y="88" text-anchor="middle" font-size="10" fill="#333">Event ???</text><text x="330" y="100" text-anchor="middle" font-size="8" fill="#666">What triggers provisioning?</text><line x1="120" y1="90" x2="180" y2="90" stroke="#999" stroke-width="1.5" stroke-dasharray="4"/><text x="150" y="85" text-anchor="middle" font-size="16" fill="#999">?</text></svg>',
    options: [
      "A PV has been dynamically provisioned and is now sitting in `Available` state waiting for the PVC to bind",
      "A PV has been provisioned already and is bound to the PVC immediately upon the PVC creation in the cluster",
      "No PV exists yet because provisioning is deferred until a pod actually mounts the PVC on a scheduled node",
      "The PVC is rejected because `WaitForFirstConsumer` requires a pod reference to be specified at creation time"
    ],
    answer: 2,
    explanation: "`WaitForFirstConsumer` delays the binding and provisioning of a PV until a pod that uses the PVC is scheduled. This ensures the PV is created in the same topology zone as the pod. Until a pod references and uses the PVC, no PV is provisioned, and the PVC remains in `Pending` state with a waiting event.\n\nWhy other options are wrong:\n- A: No PV is provisioned yet, so none can be in Available state; provisioning is deferred\n- B: Provisioning and binding are both deferred until a pod is scheduled; the PVC stays Pending\n- D: WaitForFirstConsumer does not require a pod reference at PVC creation time; it waits for a pod to be scheduled\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode",
    verify: "kubectl describe pvc <pvc-name>"
  },
  {
    id: "s04-q015",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A Kubernetes cluster uses a CSI driver for cloud-based block storage. A pod is scheduled to a node, but the volume attachment takes over 2 minutes and eventually times out. Which component is primarily responsible for attaching CSI volumes to nodes?",
    diagram: null,
    options: [
      "The kube-scheduler, which assigns volumes to nodes during the pod scheduling decision process",
      "The kubelet on the target node, through the CSI node plugin's `NodeStageVolume` and publish RPCs",
      "The kube-controller-manager's PV controller, which manages volume lifecycle and binding state",
      "The external-attacher sidecar, which calls the CSI `ControllerPublishVolume` RPC to attach"
    ],
    answer: 3,
    explanation: "In the CSI architecture, the external-attacher is a sidecar container that watches for `VolumeAttachment` objects and calls the CSI driver's `ControllerPublishVolume` RPC to attach volumes to nodes. The kubelet's CSI node plugin handles mounting after attachment. If the external-attacher has issues, volume attachment will fail or timeout.\n\nWhy other options are wrong:\n- A: The kube-scheduler decides which node a pod runs on but does not attach volumes to nodes\n- B: The kubelet's CSI node plugin handles mounting (NodeStageVolume/NodePublishVolume) after attachment, not the initial attach\n- C: The PV controller manages binding lifecycle, not the volume attachment to specific nodes\n\nReference: https://kubernetes-csi.github.io/docs/external-attacher.html",
    verify: "kubectl get volumeattachment"
  },
  {
    id: "s04-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod uses a PVC backed by a PV that is a local volume on node `worker-03`. When the scheduler attempts to place the pod, what constraint does the local PV introduce?",
    diagram: null,
    options: [
      "The pod can be scheduled to any node because the local volume on `worker-03` is automatically replicated across nodes",
      "The pod is scheduled to a random node and the local volume is transparently migrated via `kubelet` at runtime",
      "The scheduler ignores volume locality and selects the node with the most available CPU and memory headroom",
      "The pod is constrained to `worker-03` because local PVs have node affinity that restricts pod placement"
    ],
    answer: 3,
    explanation: "Local PersistentVolumes include a `nodeAffinity` field that restricts the PV to a specific node. The scheduler evaluates this affinity when placing pods that use the PVC, ensuring the pod runs on the node where the local storage physically exists. This is why `WaitForFirstConsumer` binding mode is recommended with local volumes.\n\nWhy other options are wrong:\n- A: Local volumes are not replicated across nodes; data exists only on the specific node\n- B: Local volumes cannot be migrated transparently; the data is physically tied to the node's disk\n- C: The scheduler respects volume topology constraints; it does not ignore them for resource optimization\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#local",
    verify: "kubectl get pv <pv-name> -o jsonpath='{.spec.nodeAffinity}'"
  },
  {
    id: "s04-q017",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "An e-commerce platform migrating from a monolith to microservices currently stores all session data, product catalog, and order history in a single PostgreSQL database. Which storage pattern best supports a microservices decomposition?",
    diagram: null,
    options: [
      "Continue using a single shared database across all microservices to avoid any data duplication overhead",
      "Store all data in a shared NFS volume accessible by all pods to simplify cross-service data sharing needs",
      "Give each microservice its own dedicated data store following the database-per-service design pattern",
      "Use `emptyDir` volumes in each pod to locally cache the entire database contents for faster access times"
    ],
    answer: 2,
    explanation: "The database-per-service pattern is a core microservices design principle where each service owns its data and other services access that data only through the service's API. This ensures loose coupling and allows each service to choose the most appropriate database technology. Shared databases create tight coupling between services.\n\nWhy other options are wrong:\n- A: A shared database creates tight coupling between services, violating microservices principles\n- B: Shared NFS volumes do not provide data ownership boundaries; they create implicit coupling\n- D: emptyDir volumes are ephemeral and lose data on pod restart; they are unsuitable for databases\n\nReference: https://microservices.io/patterns/data/database-per-service.html",
    verify: null
  },
  {
    id: "s04-q018",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A StatefulSet running Elasticsearch uses PersistentVolumes for data storage. Pods are experiencing I/O errors and data corruption. Which logging approach would best help diagnose the storage issue?",
    diagram: null,
    options: [
      "Examine kubelet logs, CSI driver logs, and `kubectl describe pv/pvc` events for storage errors",
      "Check only the Elasticsearch application logs inside the container for `IOException` stack trace details",
      "Review the kube-scheduler logs for scheduling decisions related to pod placement on specific nodes",
      "Check the kube-apiserver audit logs for PVC creation timestamps and API request latencies"
    ],
    answer: 0,
    explanation: "Storage I/O issues require a multi-layer debugging approach. The kubelet logs contain volume mount/unmount operations and errors. CSI driver logs show low-level storage operations. The events on PV and PVC objects (visible via `kubectl describe`) reveal binding issues, provisioning failures, and attachment errors. Application logs alone miss infrastructure-level problems.\n\nWhy other options are wrong:\n- B: Application logs alone miss infrastructure-level storage issues like CSI driver failures\n- C: Scheduler logs show pod placement decisions, not storage I/O errors or data corruption details\n- D: API server audit logs show API request timing, not storage-level I/O or corruption diagnostics\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
    verify: "kubectl describe pvc <pvc-name> && kubectl logs -n kube-system <csi-driver-pod>"
  },
  {
    id: "s04-q019",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer creates a PVC with `storageClassName: \"\"` (empty string). How does Kubernetes handle this PVC?",
    diagram: null,
    options: [
      "The PVC uses the cluster's default StorageClass as if no storageClassName field was specified at all",
      "The PVC is rejected by the API server because an empty string StorageClass name is considered invalid",
      "The PVC binds only to a PV with no StorageClass set, effectively disabling dynamic provisioning",
      "The PVC triggers dynamic provisioning using whichever available StorageClass has the most free capacity"
    ],
    answer: 2,
    explanation: "Setting `storageClassName: \"\"` explicitly opts out of dynamic provisioning. The PVC will only bind to a PV that has no `storageClassName` or has it set to `\"\"`. This is different from omitting `storageClassName` entirely, which may cause the PVC to use the default StorageClass if one is configured in the cluster.\n\nWhy other options are wrong:\n- A: An empty string is explicitly different from omitting storageClassName; it opts out of the default class\n- B: An empty string is a valid value; the API server does not reject it\n- D: No dynamic provisioning occurs with an empty string StorageClass; only pre-existing classless PVs match\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#class-1",
    verify: "kubectl get pvc -o jsonpath='{.items[*].spec.storageClassName}'"
  },
  {
    id: "s04-q020",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security audit reveals that a pod mounts a `hostPath` volume pointing to `/etc` on the node. What is the primary security concern with this configuration?",
    diagram: null,
    options: [
      "The pod may read or modify sensitive host files like `/etc/shadow`, enabling privilege escalation",
      "The pod can read files from `/etc` but the read-only access poses a limited security concern for node configuration",
      "The `hostPath` volume is encrypted by default so there is no meaningful security concern for the host",
      "The pod can mount `/etc` but gains read-only access due to default securityContext restrictions on hostPath mounts"
    ],
    answer: 0,
    explanation: "Mounting `hostPath` volumes, especially to sensitive directories like `/etc`, is a significant security risk. A container with write access could modify host-level configuration files, create backdoor accounts, or escalate privileges. Pod Security Standards restrict `hostPath` usage, and most production clusters should disallow it except for system-level DaemonSets.\n\nWhy other options are wrong:\n- B: hostPath volumes allow both read and write access by default; they are not read-only\n- C: hostPath volumes are not encrypted; they expose raw host filesystem paths to the container\n- D: There are no default securityContext restrictions that force hostPath mounts to read-only; hostPath volumes are read-write by default unless explicitly configured otherwise\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes[*].hostPath}'"
  },
  {
    id: "s04-q021",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet with `podManagementPolicy: OrderedReady` and 5 replicas is being scaled up. Pod `web-2` is stuck in `Pending` state due to insufficient resources. What happens to `web-3` and `web-4`?",
    diagram: null,
    options: [
      "They are not created until `web-2` reaches `Running` and `Ready` state as required by the policy",
      "They are created in parallel regardless of `web-2`'s current status within the StatefulSet rollout",
      "Only `web-3` waits for `web-2`; `web-4` is created immediately and independently by the controller",
      "The entire StatefulSet is rolled back to 3 replicas automatically when `web-2` fails to schedule"
    ],
    answer: 0,
    explanation: "With `OrderedReady` pod management policy (the default), StatefulSets create pods sequentially. Each pod must be `Running` and `Ready` before the next pod is created. Since `web-2` is stuck in `Pending`, `web-3` and `web-4` will not be created until `web-2` is resolved. This guarantees ordered, predictable deployment.\n\nWhy other options are wrong:\n- B: OrderedReady requires sequential readiness; pods are not created in parallel under this policy\n- C: Both web-3 and web-4 wait; there is no partial ordering where only one waits\n- D: The StatefulSet is not automatically rolled back; it waits for the blocked pod to become ready\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#deployment-and-scaling-guarantees",
    verify: "kubectl get pods -l app=web --sort-by=.metadata.name"
  },
  {
    id: "s04-q022",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team follows cloud-native principles and needs to deploy a stateful application that requires high availability and data replication. Which approach aligns best with cloud-native storage practices?",
    diagram: null,
    options: [
      "Use local node storage combined with manual backup scripts that are run periodically via cron jobs",
      "Deploy a distributed storage solution like Ceph via Rook that provides replication and self-healing",
      "Store all data on a single NFS server located outside the cluster to centralize data management tasks",
      "Use application-managed in-memory replication across pods, avoiding external storage dependencies for simplicity"
    ],
    answer: 1,
    explanation: "Cloud-native storage practices favor distributed, software-defined storage systems that provide replication, self-healing, and are managed declaratively within Kubernetes. Solutions like Ceph (managed by Rook) align with these principles by treating storage as code and automating operations. Single points of failure like a standalone NFS server do not meet HA requirements.\n\nWhy other options are wrong:\n- A: Manual backup scripts with local storage lack self-healing and automated replication\n- C: A single NFS server is a single point of failure and does not provide self-healing distributed storage\n- D: In-memory replication across pods is not durable storage; pod failures would cause data loss for stateful applications\n\nReference: https://rook.io/docs/rook/latest/Getting-Started/intro/",
    verify: null
  },
  {
    id: "s04-q023",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps team manages StatefulSet manifests in Git, including `volumeClaimTemplates`. An engineer modifies the storage size in the `volumeClaimTemplates` from 10Gi to 20Gi and merges the change. What happens when the GitOps controller applies this update?",
    diagram: null,
    options: [
      "The `volumeClaimTemplates` change is applied in-place and all existing PVCs are automatically resized by the controller",
      "New `PVCs` are created at `20Gi` while old PVCs are deleted and their underlying storage is reclaimed",
      "The GitOps controller automatically recreates the entire `StatefulSet` resource with the new PVC size",
      "The update fails because `volumeClaimTemplates` in a StatefulSet are immutable after initial creation"
    ],
    answer: 3,
    explanation: "The `volumeClaimTemplates` field of a StatefulSet is immutable after initial creation. Attempting to update it will result in a validation error from the API server. To change PVC sizes, teams must either expand existing PVCs if the StorageClass supports volume expansion, or perform a manual migration involving StatefulSet recreation.\n\nWhy other options are wrong:\n- A: volumeClaimTemplates are immutable; existing PVCs cannot be resized via StatefulSet spec updates\n- B: Old PVCs are not deleted during spec changes; the update is rejected entirely by the API server\n- C: The GitOps controller cannot automatically recreate the StatefulSet to bypass the immutability constraint\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.volumeClaimTemplates}'"
  },
  {
    id: "s04-q024",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod enters `ContainerCreating` state and stays there for several minutes. Running `kubectl describe pod` shows the event: `FailedMount: Unable to attach or mount volumes: timed out waiting for the condition`. What is the most likely cause?",
    diagram: null,
    options: [
      "The container image is too large to download within the default image pull timeout for the runtime",
      "The PV is unavailable, the CSI driver is malfunctioning, or the volume is attached to another node",
      "The pod's resource requests for CPU or memory exceed the available capacity on the scheduled node",
      "The pod's service account does not have RBAC permissions to create or access volume claim resources"
    ],
    answer: 1,
    explanation: "A `FailedMount` event with a timeout indicates a volume-level issue. Common causes include: the underlying storage being unreachable, the CSI driver pod being down or misconfigured, the volume being stuck attached to a previous node (common with `ReadWriteOnce` volumes), or the PV not existing. This is distinct from image pull or resource scheduling issues.\n\nWhy other options are wrong:\n- A: Image pull issues produce ImagePullBackOff events, not FailedMount events\n- C: Resource scheduling issues cause Pending state, not ContainerCreating with FailedMount\n- D: RBAC permission errors would result in Forbidden API errors, not volume mount timeout events\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/#my-pod-is-stuck-waiting",
    verify: "kubectl describe pod <pod-name> && kubectl get volumeattachment"
  },
  {
    id: "s04-q025",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A StatefulSet named `redis` has 3 replicas and uses a headless Service named `redis-svc`. A client pod needs to connect to the specific replica `redis-1`. What DNS name should the client use?",
    diagram: null,
    options: [
      "`redis-svc.default.svc.cluster.local` — the Service routes traffic to `redis-1` automatically",
      "`redis-1.default.svc.cluster.local` — each pod gets a direct cluster-level DNS entry without a headless Service",
      "`redis-svc-1.default.svc.cluster.local` — replicas are indexed by the Service name and ordinal",
      "`redis-1.redis-svc.default.svc.cluster.local` — the headless Service creates per-pod DNS"
    ],
    answer: 3,
    explanation: "A headless Service (`clusterIP: None`) creates DNS A records for each pod in a StatefulSet. The format is `<pod-name>.<service-name>.<namespace>.svc.cluster.local`. Since StatefulSet pods have stable names (`redis-0`, `redis-1`, `redis-2`), clients can address specific replicas directly via their predictable DNS entries.\n\nWhy other options are wrong:\n- A: The Service DNS resolves to all pods; it does not automatically route to a specific replica\n- B: Pods do not get direct cluster-level DNS entries by name alone; they need the headless Service domain\n- C: The naming format uses pod-name.service-name, not service-name-ordinal\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id",
    verify: "kubectl exec <client-pod> -- nslookup redis-1.redis-svc.default.svc.cluster.local"
  },
  {
    id: "s04-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A PersistentVolume is defined with `capacity: 50Gi`, `accessModes: [ReadWriteOnce]`, and `storageClassName: fast-ssd`. A PVC requests 50Gi with `accessModes: [ReadWriteOnce]` and `storageClassName: standard`. Will the PVC bind to this PV?",
    diagram: null,
    options: [
      "No, because the `storageClassName` values differ between the PV and PVC, preventing binding",
      "Yes, but Kubernetes will convert the PV's StorageClass from `fast-ssd` to `standard` value",
      "Yes, because the capacity and access modes match between the PV and PVC specifications exactly",
      "No, because `storageClassName` must match exactly and the PV capacity must also equal the PVC request"
    ],
    answer: 0,
    explanation: "For a PVC to bind to a PV, the `storageClassName` must match in addition to capacity and access modes. A PVC requesting `standard` will not bind to a PV with `fast-ssd`. The StorageClass acts as a filter during PV selection. If dynamic provisioning is available for the `standard` class, a new PV will be provisioned instead.\n\nWhy other options are wrong:\n- B: Kubernetes does not convert or change a PV's StorageClass to match a PVC\n- C: Matching capacity and access modes is necessary but not sufficient; storageClassName must also match\n- D: The PV capacity does not need to exactly equal the PVC request; a PV with capacity greater than or equal to the PVC request is a valid match\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding",
    verify: "kubectl get pv -o custom-columns=NAME:.metadata.name,CLASS:.spec.storageClassName,STATUS:.status.phase"
  },
  {
    id: "s04-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The `kube-controller-manager` contains a PersistentVolume controller. What is the primary responsibility of this controller?",
    diagram: null,
    options: [
      "Formatting and partitioning the underlying storage devices attached to each cluster node",
      "Scheduling pods that use PVCs to specific nodes based on volume topology constraints",
      "Encrypting data at rest on PersistentVolumes using built-in encryption key management",
      "Matching PVCs to available PVs and managing the binding lifecycle between the two"
    ],
    answer: 3,
    explanation: "The PV controller within the `kube-controller-manager` watches for new PVCs and attempts to find a matching PV based on capacity, access modes, StorageClass, and selectors. It manages the bind/unbind lifecycle and triggers dynamic provisioning when no static PV matches. It does not handle low-level storage operations like formatting.\n\nWhy other options are wrong:\n- A: The PV controller does not format or partition storage devices; that is handled by CSI drivers or kubelet\n- B: Pod scheduling is handled by kube-scheduler, not the PV controller in kube-controller-manager\n- C: Encryption at rest is managed by the API server's EncryptionConfiguration, not the PV controller\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim",
    verify: "kubectl logs -n kube-system kube-controller-manager-<node> | grep pv-controller"
  },
  {
    id: "s04-q028",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A CSI driver implements the `VolumeSnapshot` feature. A user creates a `VolumeSnapshot` object referencing an existing PVC. What additional resource must exist in the cluster for the snapshot to succeed?",
    diagram: null,
    options: [
      "A `SnapshotSchedule` CRD that defines the backup frequency and retention policy rules",
      "A dedicated `snapshot-controller` Deployment running in every namespace of the cluster",
      "A `VolumeSnapshotClass` that specifies the CSI driver name and the deletion policy",
      "A `StorageClass` with the annotation `snapshot: enabled` set on its metadata section"
    ],
    answer: 2,
    explanation: "A `VolumeSnapshotClass` is required to define which CSI driver handles snapshots and what the deletion policy is (similar to how `StorageClass` works for PVs). Without a `VolumeSnapshotClass`, the snapshot controller does not know which driver to invoke. The snapshot controller itself runs cluster-wide, not per namespace.\n\nWhy other options are wrong:\n- A: SnapshotSchedule is not a built-in Kubernetes CRD; scheduling is handled by external tools like Velero\n- B: The snapshot-controller runs cluster-wide as a single deployment, not per namespace\n- D: There is no snapshot: enabled annotation on StorageClass; VolumeSnapshotClass is the required resource\n\nReference: https://kubernetes.io/docs/concepts/storage/volume-snapshot-classes/",
    verify: "kubectl get volumesnapshotclass"
  },
  {
    id: "s04-q029",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team needs a volume that allows multiple pods on different nodes to read and write simultaneously. Which access mode should they configure on the PV?",
    diagram: null,
    options: [
      "`ReadWriteMany` — allows read/write access by many nodes concurrently",
      "`ReadWriteOnce` — allows read/write access by only a single node at once",
      "`ReadOnlyMany` — allows read-only access by many nodes simultaneously",
      "`ReadWriteOncePod` — allows read/write access by only one individual pod"
    ],
    answer: 0,
    explanation: "`ReadWriteMany` (RWX) allows the volume to be mounted as read-write by many nodes simultaneously. This is required for workloads like shared file systems where pods on different nodes need concurrent write access. Not all storage backends support RWX; network filesystems like NFS and CephFS typically do, while block storage usually does not.\n\nWhy other options are wrong:\n- B: ReadWriteOnce limits mounting to a single node, not allowing multi-node read-write access\n- C: ReadOnlyMany allows multi-node access but is read-only; it does not permit write operations\n- D: ReadWriteOncePod restricts to a single pod, not allowing multi-pod or multi-node access\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: "kubectl get pv -o custom-columns=NAME:.metadata.name,ACCESS_MODES:.spec.accessModes"
  },
  {
    id: "s04-q030",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A StatefulSet runs a Cassandra cluster with 3 replicas. Each pod needs to discover the other replicas for gossip-based cluster formation. Which Kubernetes networking feature enables this peer discovery?",
    diagram: null,
    options: [
      "A headless Service (`clusterIP: None`) providing DNS SRV records for each pod in the set",
      "A `ClusterIP` Service with session affinity enabled to route traffic to consistent replicas",
      "An Ingress resource configured with path-based routing rules to direct traffic to each pod",
      "A `NodePort` Service that exposes each Cassandra replica on a unique port on every cluster node"
    ],
    answer: 0,
    explanation: "A headless Service creates DNS records for each pod in the StatefulSet, enabling peer discovery. Cassandra nodes can use DNS lookups against the headless Service to discover all cluster members. SRV records provide both the hostname and port for each pod. A regular `ClusterIP` Service would load-balance and hide individual pod identities.\n\nWhy other options are wrong:\n- B: A ClusterIP Service with session affinity hides individual pod identities behind a virtual IP\n- C: An Ingress handles external HTTP traffic and does not provide internal pod-to-pod discovery\n- D: A NodePort Service exposes pods externally on node ports; it does not provide DNS-based peer discovery\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.clusterIP}'"
  },
  {
    id: "s04-q031",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An application stores user-uploaded files in a PersistentVolume. The operations team wants to ensure the application can scale horizontally across multiple pods on different nodes. What storage constraint must they address?",
    diagram: null,
    options: [
      "The PV must support `ReadWriteMany` access, or the team should use an external object store like S3 instead",
      "The application must switch to using `emptyDir` volumes because horizontal scaling requires ephemeral storage",
      "Horizontal scaling requires each pod to mount a separate copy of the same ReadWriteOnce PV, which the scheduler handles transparently",
      "Each pod replica must write to a separate directory on the same `ReadWriteOnce` volume to avoid conflicts"
    ],
    answer: 0,
    explanation: "Block storage PVs typically support only `ReadWriteOnce`, which limits mounting to a single node. For horizontal scaling across nodes, the team needs either a shared filesystem supporting `ReadWriteMany` (e.g., NFS, CephFS) or an external object store like S3 that is natively multi-client. Using `emptyDir` would lose data on pod restart.\n\nWhy other options are wrong:\n- B: emptyDir volumes are ephemeral and lose data on pod restart; they are not suitable for persistent file storage\n- C: The scheduler does not transparently create separate copies of a ReadWriteOnce PV for each pod; a single RWO PV can only be mounted on one node at a time\n- D: Multiple pods on different nodes cannot mount the same RWO volume; writing to separate directories does not solve the node restriction\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: null
  },
  {
    id: "s04-q032",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet has `podManagementPolicy: Parallel`. How does this change the behavior compared to the default `OrderedReady`?",
    diagram: null,
    options: [
      "Pods are created in ordinal order but terminated in parallel without waiting for readiness checks",
      "Pods share the same PVC instead of having individual PVCs created per replica by the controller",
      "The StatefulSet behaves identically to a Deployment, losing all ordinal ordering of its replicas",
      "Pods are created and terminated all at once without waiting for each to become Running and Ready"
    ],
    answer: 3,
    explanation: "The `Parallel` pod management policy tells the StatefulSet controller to create, delete, or scale all pods simultaneously without waiting for predecessors to become Running and Ready. This is useful for workloads that do not require ordered startup, such as some distributed databases that handle their own initialization ordering. Pods still get stable identities and dedicated PVCs.\n\nWhy other options are wrong:\n- A: Parallel policy affects both creation and termination, not just termination order\n- B: Parallel policy does not change PVC behavior; each replica still gets its own dedicated PVC\n- C: Pods still retain stable ordinal identities and dedicated PVCs, unlike Deployment replicas\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#parallel-pod-management",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.podManagementPolicy}'"
  },
  {
    id: "s04-q033",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform engineer configures Prometheus to scrape kubelet metrics for PV monitoring. Which of the following metrics would help track the total capacity versus used capacity of a mounted PersistentVolume?",
    diagram: null,
    options: [
      "`kubelet_volume_stats_inodes` paired with `kubelet_volume_stats_inodes_free`",
      "`node_disk_io_time_seconds_total` paired with `node_disk_read_bytes_total`",
      "`kubelet_volume_stats_capacity_bytes` paired with `kubelet_volume_stats_used_bytes`",
      "`container_fs_usage_bytes` paired with `container_fs_limit_bytes` from cAdvisor"
    ],
    answer: 2,
    explanation: "The kubelet exposes `kubelet_volume_stats_capacity_bytes` and `kubelet_volume_stats_used_bytes` metrics for each mounted PV. These allow you to calculate usage percentages and set up alerts for volumes approaching full capacity. The `container_fs_*` metrics refer to container filesystem overlays, not PV-mounted volumes.\n\nWhy other options are wrong:\n- A: kubelet_volume_stats_inodes and kubelet_volume_stats_inodes_free track inode usage, not byte-level capacity versus used capacity\n- B: node_disk_io_time_seconds_total and node_disk_read_bytes_total measure node-level disk I/O, not PV capacity/usage\n- D: container_fs_usage_bytes and container_fs_limit_bytes track container overlay filesystem usage, not mounted PV volumes\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: "kubectl get --raw /api/v1/nodes/<node>/proxy/metrics | grep kubelet_volume_stats"
  },
  {
    id: "s04-q034",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer creates a pod with a `secret` volume type to mount TLS certificates. How are the Secret data values stored on the node when mounted as a volume?",
    diagram: '<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="120" height="50" rx="5" fill="#E8F0FE" stroke="#326CE5"/><text x="70" y="32" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">Secret</text><text x="70" y="48" text-anchor="middle" font-size="8" fill="#666">base64-encoded data</text><line x1="130" y1="35" x2="170" y2="35" stroke="#326CE5" stroke-width="2" marker-end="url(#a)"/><text x="150" y="28" text-anchor="middle" font-size="8" fill="#326CE5">kubelet</text><text x="150" y="48" text-anchor="middle" font-size="8" fill="#326CE5">processes</text><rect x="170" y="10" width="100" height="50" rx="5" fill="#D4EDDA" stroke="#28A745"/><text x="220" y="32" text-anchor="middle" font-size="10" fill="#333">??? format</text><text x="220" y="48" text-anchor="middle" font-size="8" fill="#666">on ??? medium</text><line x1="220" y1="60" x2="220" y2="85" stroke="#28A745" stroke-width="1.5"/><rect x="160" y="85" width="120" height="45" rx="5" fill="#FFF3CD" stroke="#FFC107"/><text x="220" y="105" text-anchor="middle" font-size="10" fill="#333">Container</text><text x="220" y="120" text-anchor="middle" font-size="8" fill="#666">/mnt/secrets/tls.crt</text></svg>',
    options: [
      "As encrypted files stored on-disk that require a separate decryption key to read their contents",
      "As base64-encoded files on-disk matching the Secret's original data encoding format from the API",
      "As binary files stored in a protected directory on the node that only the kubelet process can read",
      "As plain-text files in a tmpfs filesystem where the base64 encoding is decoded automatically"
    ],
    answer: 3,
    explanation: "When a Secret is mounted as a volume, the kubelet decodes the base64-encoded values and writes them as plain-text files into a tmpfs (memory-backed) filesystem. The files are readable by the container process. The tmpfs mount ensures Secret data is not written to disk on the node, providing a basic level of protection.\n\nWhy other options are wrong:\n- A: Secret volume files are not encrypted on-disk; they are stored as plain-text on tmpfs in RAM\n- B: Secret data is decoded from base64 before writing to the volume; it is not kept in base64 format\n- C: Secret files are readable by the container process at the standard mount path, not in a protected kubelet-only directory\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets",
    verify: "kubectl exec <pod> -- ls -la /path/to/secret/mount"
  },
  {
    id: "s04-q035",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A cloud provider's CSI driver supports volume expansion. An administrator needs to allow users to resize their PVCs. What must be configured on the StorageClass?",
    diagram: null,
    options: [
      "Set `reclaimPolicy: Expand` on the StorageClass to enable volume expansion for bound PVCs",
      "Add the annotation `resize.kubernetes.io/enabled: \"true\"` to each individual PVC that needs it",
      "Set `volumeBindingMode: Immediate` on the StorageClass to allow resizing upon PVC creation",
      "Set `allowVolumeExpansion: true` on the StorageClass to permit PVC resize via the CSI driver"
    ],
    answer: 3,
    explanation: "The `allowVolumeExpansion: true` field on a StorageClass enables PVC resizing. When set, users can edit their PVC to request a larger size, and the CSI driver will expand the underlying volume. The expansion process may require a pod restart if the filesystem needs to be resized online. Without this field, PVC resize requests are rejected.\n\nWhy other options are wrong:\n- A: There is no reclaimPolicy: Expand value; reclaim policies are Delete, Retain, or Recycle\n- B: Volume expansion is controlled at the StorageClass level, not per-PVC via annotations\n- C: volumeBindingMode controls when provisioning occurs, not whether expansion is allowed\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion",
    verify: "kubectl get storageclass -o custom-columns=NAME:.metadata.name,EXPANSION:.allowVolumeExpansion"
  },
  {
    id: "s04-q036",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A Kubernetes platform team wants to provide container-native storage that replicates data across nodes for high availability. They evaluate Longhorn. Which statement accurately describes Longhorn's architecture?",
    diagram: null,
    options: [
      "Longhorn requires an external Ceph cluster to serve as the backend storage for all provisioned volumes",
      "Longhorn primarily targets `ReadWriteMany` access mode and delegates `ReadWriteOnce` provisioning to a secondary NFS layer",
      "Longhorn replaces the kubelet's volume management entirely with its own node-level storage controller",
      "Longhorn creates replicated block volumes using local disks and manages them via a CSI driver per node"
    ],
    answer: 3,
    explanation: "Longhorn is a CNCF incubating project that creates distributed block storage using local disks on Kubernetes nodes. Each volume has an engine process and configurable replicas spread across different nodes. It implements a CSI driver for seamless Kubernetes integration and provides features like snapshots, backups, and disaster recovery.\n\nWhy other options are wrong:\n- A: Longhorn uses local node disks directly; it does not require an external Ceph cluster as backend\n- B: Longhorn primarily provides ReadWriteOnce block volumes; RWX support is secondary via NFS\n- C: Longhorn does not replace the kubelet; it integrates via a CSI driver alongside the kubelet\n\nReference: https://longhorn.io/docs/",
    verify: null
  },
  {
    id: "s04-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A cluster has two PVs available: PV-A with 100Gi and PV-B with 20Gi. Both have the same StorageClass and access modes. A PVC requests 15Gi. Which PV does Kubernetes bind the PVC to?",
    diagram: null,
    options: [
      "PV-B, because Kubernetes selects the smallest PV that satisfies the request",
      "PV-A, because it has the most available capacity and Kubernetes prefers larger PVs",
      "The PVC is rejected because both PVs exceed the requested size of the claim object",
      "Kubernetes randomly selects between PV-A and PV-B with no preference for either one"
    ],
    answer: 0,
    explanation: "The PV controller selects the smallest PV that satisfies the PVC's requirements (capacity, access mode, StorageClass, selectors). This minimizes wasted storage. PV-B at 20Gi is the smallest volume that meets the 15Gi request. The PVC will be bound to PV-B, and the remaining capacity in PV-B is not reclaimable as a separate volume.\n\nWhy other options are wrong:\n- B: Kubernetes does not prefer larger PVs; it selects the smallest PV that meets the request\n- C: PVs larger than the request are valid matches; the PVC is not rejected for size mismatch\n- D: Selection is not random; the PV controller has a deterministic best-fit algorithm preferring smaller PVs\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding",
    verify: "kubectl get pv --sort-by=.spec.capacity.storage"
  },
  {
    id: "s04-q038",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline builds container images and deploys a StatefulSet to a staging cluster. The pipeline needs to verify that all PVCs are bound before running integration tests. Which approach is most reliable?",
    diagram: null,
    options: [
      "Add a `sleep 60` step after deployment and assume all PVCs will be bound by then in the cluster",
      "Use `kubectl wait --for=jsonpath='{.status.phase}'=Bound pvc --all --timeout=120s` in the pipeline",
      "Skip PVC verification entirely since Kubernetes guarantees immediate binding upon PVC creation time",
      "Check the StatefulSet replica count as a proxy for PVC binding status in the cluster verification step"
    ],
    answer: 1,
    explanation: "The `kubectl wait` command with a JSONPath condition is the most reliable way to wait for PVCs to reach a specific state. Using `--for=jsonpath='{.status.phase}'=Bound` ensures the pipeline pauses until all PVCs are actually bound. Fixed sleep times are unreliable, and replica count does not directly indicate PVC status.\n\nWhy other options are wrong:\n- A: Fixed sleep times are unreliable; PVC binding may take longer or shorter than 60 seconds\n- C: Kubernetes does not guarantee immediate binding, especially with WaitForFirstConsumer or missing PVs\n- D: StatefulSet replica count indicates pod count, not whether the underlying PVCs are bound to PVs\n\nReference: https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait",
    verify: "kubectl wait --for=jsonpath='{.status.phase}'=Bound pvc --all --timeout=120s"
  },
  {
    id: "s04-q039",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet is being scaled down from 5 replicas to 3. In which order are the pods terminated when using the default `OrderedReady` policy?",
    diagram: null,
    options: [
      "Pods are terminated in ascending order starting with `pod-0` and `pod-1` before the higher ordinals",
      "All excess pods (`pod-3` and `pod-4`) are terminated simultaneously without any ordering guarantee",
      "Pods are terminated in reverse ordinal order: `pod-4` is removed first, then `pod-3` is terminated",
      "Kubernetes randomly selects which pods to terminate from the set of pods exceeding the replica count"
    ],
    answer: 2,
    explanation: "With the default `OrderedReady` policy, StatefulSet scale-down proceeds in reverse ordinal order. `pod-4` is terminated first and must be fully shut down before `pod-3` is terminated. This reverse ordering ensures that the highest-numbered (newest) replicas are removed first, which aligns with how most distributed systems expect members to be removed.\n\nWhy other options are wrong:\n- A: Scale-down removes the highest ordinals first, not the lowest; pod-0 and pod-1 are retained\n- B: With OrderedReady, pods are terminated one at a time in reverse order, not simultaneously\n- D: Pod selection for termination is deterministic (reverse ordinal), not random\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#deployment-and-scaling-guarantees",
    verify: "kubectl get pods -l app=<statefulset> -w"
  },
  {
    id: "s04-q040",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Pod Security Standard of `restricted` is enforced on a namespace. A developer tries to deploy a pod with a `hostPath` volume. What happens?",
    diagram: null,
    options: [
      "Pod creation is denied because the `restricted` profile prohibits the use of `hostPath` volumes",
      "The pod is created successfully but the `hostPath` volume is silently ignored by the admission controller",
      "The pod is created with read-only access to the `hostPath` mount enforced by the restricted profile",
      "The `restricted` profile only limits CPU and memory resource usage, it does not restrict volume types"
    ],
    answer: 0,
    explanation: "The `restricted` Pod Security Standard disallows `hostPath` volumes entirely. When enforcement is set to `enforce`, the API server rejects pod creation attempts that include `hostPath` volumes. This prevents containers from accessing the host filesystem, which is a common privilege escalation vector. Only the `privileged` profile allows `hostPath` volumes.\n\nWhy other options are wrong:\n- B: The restricted profile does not silently ignore hostPath; it actively rejects the pod creation\n- C: The restricted profile does not allow read-only hostPath access; hostPath is entirely prohibited\n- D: The restricted profile restricts many settings including volume types, not just CPU and memory\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
    verify: "kubectl label ns <namespace> pod-security.kubernetes.io/enforce=restricted --overwrite"
  },
  {
    id: "s04-q041",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster uses a StorageClass with `volumeBindingMode: WaitForFirstConsumer` for zone-aware provisioning. A pod requests a PVC with this StorageClass and has a `nodeSelector` restricting it to zone `us-east-1a`. Where is the PV provisioned?",
    diagram: null,
    options: [
      "In a random zone outside `us-east-1a` since the `StorageClass` does not consider pod topology constraints",
      "In all zones simultaneously for redundancy, creating a replicated volume that spans multiple regions",
      "In `us-east-1a` because `WaitForFirstConsumer` provisions the PV in the same zone where the pod is scheduled",
      "The PV is provisioned immediately when the `PVC` is created because `WaitForFirstConsumer` only delays binding, not provisioning"
    ],
    answer: 2,
    explanation: "`WaitForFirstConsumer` delays PV provisioning until the pod is scheduled to a node. The scheduler considers the pod's node constraints (like `nodeSelector`) and provisions the PV in the same topology (zone) as the chosen node. This prevents the PV from being created in a zone where the pod cannot run, which would cause a scheduling deadlock.\n\nWhy other options are wrong:\n- A: WaitForFirstConsumer explicitly considers pod topology constraints when provisioning the PV\n- B: PVs are not provisioned in all zones; they are created in the specific zone where the pod is scheduled\n- D: WaitForFirstConsumer delays provisioning until the pod is scheduled; it does not provision immediately\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode",
    verify: "kubectl get pv <pv-name> -o jsonpath='{.spec.nodeAffinity}'"
  },
  {
    id: "s04-q042",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices application uses the Event Sourcing pattern to store state changes. Each microservice writes events to an append-only event store. What is the primary benefit of this pattern for stateful microservices?",
    diagram: null,
    options: [
      "It reduces latency by caching frequently accessed events in memory rather than querying the event store for each read",
      "It reduces storage costs by compressing and deduplicating all events into a single compacted record",
      "It ensures that all microservices share the same database schema for consistent cross-service queries",
      "It provides a full audit trail and enables state reconstruction from the event history at any point"
    ],
    answer: 3,
    explanation: "Event Sourcing stores every state change as an immutable event. This provides a complete audit trail, enables temporal queries (state at any point in time), and supports event replay for debugging or rebuilding state. It is commonly used with CQRS (Command Query Responsibility Segregation) in microservices that require reliable state management.\n\nWhy other options are wrong:\n- A: Caching is a read optimization, not the primary benefit of Event Sourcing; the pattern's core value is the immutable event log itself\n- B: Events are stored individually; they are not compressed or deduplicated into a single record\n- C: Event Sourcing gives each service its own event store; services do not share database schemas\n\nReference: https://microservices.io/patterns/data/event-sourcing.html",
    verify: null
  },
  {
    id: "s04-q043",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An administrator wants to pre-provision PVs that can only be claimed by PVCs matching a specific label selector. From the PVC side, which Kubernetes resource spec field supports label-based selector matching during PV-PVC binding?",
    diagram: null,
    options: [
      "`spec.selector` on the PVC, which accepts `matchLabels` to restrict binding to PVs with matching labels",
      "`spec.claimRef` pre-binds the PV to a specific PVC by name and namespace before the PVC exists",
      "`spec.nodeAffinity` acts as a node-level selector restricting which nodes can mount the PV, not PVC label matching",
      "`spec.storageClassName` ensures only PVCs with the matching class can bind but not by label value"
    ],
    answer: 0,
    explanation: "PVCs can specify a `spec.selector` with `matchLabels` to restrict which PVs they can bind to. When the administrator labels pre-provisioned PVs, PVCs with a matching `spec.selector` will only bind to PVs whose labels satisfy the selector. For pre-binding a PV to a specific PVC by name, the administrator uses `spec.claimRef` on the PV. The `storageClassName` also acts as a filter, but the question asks about label-based selection, which is the `spec.selector` field on the PVC.\n\nWhy other options are wrong:\n- B: claimRef pre-binds by name, not by label selector; it is a different binding mechanism\n- C: nodeAffinity controls node placement for volume access, not PVC-to-PV label matching\n- D: storageClassName is a class-based filter, not a label-based selector mechanism\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#selector",
    verify: "kubectl get pvc <pvc-name> -o jsonpath='{.spec.selector}'"
  },
  {
    id: "s04-q044",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A container runtime uses `overlayfs` for the container's root filesystem. A process in the container writes a 2GB temporary file to `/tmp`. Where is this data actually stored?",
    diagram: null,
    options: [
      "In the container image layer, directly modifying the original image stored in the registry cache",
      "In the overlay's upper writable layer on the node's filesystem, consuming node disk space",
      "In a dedicated PersistentVolume that is automatically created for the container by the kubelet",
      "In memory (RAM) since `/tmp` inside containers is typically backed by a tmpfs mount rather than the overlay filesystem"
    ],
    answer: 1,
    explanation: "OverlayFS uses a layered approach with read-only lower layers (image layers) and a writable upper layer. Any writes to the container filesystem, including `/tmp`, go to the upper layer stored on the node's disk. This consumes node-level storage and can lead to disk pressure. For predictable temporary storage, an `emptyDir` volume is recommended.\n\nWhy other options are wrong:\n- A: Container image layers are read-only; writes go to the overlay upper layer, not the image itself\n- C: No PVC is automatically created for container filesystem writes; PVCs must be explicitly defined\n- D: /tmp inside containers is not backed by tmpfs by default; it uses the overlay writable layer on disk\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: null
  },
  {
    id: "s04-q045",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Grafana dashboard shows that a PersistentVolume is at 95% capacity. The operations team needs to be alerted before the volume reaches 100%. Using Prometheus alerting, which alert rule expression correctly fires when PV usage exceeds 90%?",
    diagram: null,
    options: [
      "`kubelet_volume_stats_used_bytes / kubelet_volume_stats_capacity_bytes > 0.9`",
      "`kube_pod_container_resource_limits / kube_pod_resource_requests > 0.9`",
      "`node_filesystem_size_bytes - node_filesystem_free_bytes > 0.9` (per node)",
      "`container_memory_usage_bytes / container_memory_limit_bytes > 0.9` (per pod)"
    ],
    answer: 0,
    explanation: "The ratio `kubelet_volume_stats_used_bytes / kubelet_volume_stats_capacity_bytes` gives the volume utilization as a fraction. When this exceeds 0.9 (90%), the alert fires. The other expressions monitor container resources or node-level filesystems, not PersistentVolume usage specifically.\n\nWhy other options are wrong:\n- B: kube_pod_container_resource_limits / kube_pod_resource_requests compares pod resource specs, not PV usage\n- C: node_filesystem_size_bytes - node_filesystem_free_bytes measures node filesystem usage, not specific PV volumes\n- D: container_memory_usage_bytes / container_memory_limit_bytes tracks memory utilization, not storage volume usage\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: null
  },
  {
    id: "s04-q046",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A PV is created with `persistentVolumeReclaimPolicy: Recycle`. What does the `Recycle` policy do when the bound PVC is deleted?",
    diagram: null,
    options: [
      "The PV and its underlying storage are deleted from the backend by the controller",
      "The PV is archived to a designated backup location in the cluster before its data is deleted permanently",
      "The PV runs a basic `rm -rf` on the volume contents and returns to `Available` state for new claims",
      "The PV is retained indefinitely in `Released` state until an administrator performs a manual cleanup step"
    ],
    answer: 2,
    explanation: "The `Recycle` reclaim policy performs a basic scrub (`rm -rf /thevolume/*`) on the volume and makes it `Available` for a new claim. However, this policy is deprecated in favor of dynamic provisioning with `Delete` policy. Only NFS and HostPath volumes supported recycling. Modern clusters should use `Delete` or `Retain` policies instead.\n\nWhy other options are wrong:\n- A: The Delete policy permanently removes PV and storage; Recycle scrubs and makes Available instead\n- B: Recycle does not archive data; it performs rm -rf and returns the PV to Available state\n- D: Retain keeps the PV in Released state indefinitely; Recycle actively cleans and recycles the volume\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#recycle",
    verify: "kubectl get pv -o custom-columns=NAME:.metadata.name,RECLAIM:.spec.persistentVolumeReclaimPolicy"
  },
  {
    id: "s04-q047",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart includes a StorageClass template with a configurable provisioner. The `values.yaml` defaults to `kubernetes.io/aws-ebs`. A user deploying to GCP needs to override this. Which Helm command correctly overrides the provisioner?",
    diagram: null,
    options: [
      "`helm install db ./chart --set storageClass.provisioner=pd.csi.storage.gke.io`",
      "`helm install db ./chart --replace-provisioner gcp-pd=pd.csi.storage.gke.io`",
      "`helm install db ./chart --force-value provisioner=pd.csi.storage.gke.io`",
      "`helm install db ./chart --env GCP_PROVISIONER=pd.csi.storage.gke.io`"
    ],
    answer: 0,
    explanation: "Helm's `--set` flag overrides values in `values.yaml` at install time. The path `storageClass.provisioner` navigates the values hierarchy to set the provisioner field. This allows the same chart to be deployed across different cloud providers by changing the storage provisioner without modifying the chart templates.\n\nWhy other options are wrong:\n- B: --replace-provisioner is not a valid Helm flag; Helm uses --set for value overrides\n- C: --force-value is not a valid Helm flag; the correct flag is --set\n- D: --env is not a valid Helm flag; Helm values are set via --set or -f values files\n\nReference: https://helm.sh/docs/helm/helm_install/",
    verify: "helm get values db"
  },
  {
    id: "s04-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster node's kubelet reports `DiskPressure` condition as `True`. What effect does this have on pod scheduling and existing pods?",
    diagram: null,
    options: [
      "No effect on scheduling or eviction; `DiskPressure` is an informational metric only for monitoring",
      "All existing pods on the node are immediately terminated and rescheduled to other available nodes",
      "The node is automatically drained and cordoned by the controller until the disk pressure condition is resolved",
      "The scheduler stops placing new pods on the node, and the kubelet may evict pods to reclaim disk"
    ],
    answer: 3,
    explanation: "When the kubelet detects that disk usage exceeds the eviction threshold (default: nodefs.available < 10%), it sets the `DiskPressure` condition to `True`. The scheduler adds a taint to prevent new pods from being scheduled. The kubelet begins evicting pods, starting with those exceeding ephemeral storage requests, to reclaim disk space. The node is not permanently cordoned.\n\nWhy other options are wrong:\n- A: DiskPressure has real effects on scheduling and eviction; it is not informational-only\n- B: Pods are evicted selectively based on priority and resource usage, not all terminated simultaneously\n- C: The node is not permanently cordoned; the taint is removed when disk pressure is resolved\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
    verify: "kubectl describe node <node-name> | grep -A5 Conditions"
  },
  {
    id: "s04-q049",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A serverless function on Kubernetes (using Knative) needs to process uploaded files stored in a PersistentVolume. What is the primary challenge when combining serverless workloads with PV-based storage?",
    diagram: null,
    options: [
      "Scaling to zero causes PV mount/unmount cycles that add latency, and `ReadWriteOnce` blocks concurrent sharing",
      "Serverless frameworks on Kubernetes default to in-memory scratch space, since PVC mounts are not enabled in Knative pod templates",
      "PersistentVolumes are automatically reclaimed by the platform when serverless functions scale down to zero running pods",
      "Knative defaults to `emptyDir` volumes and requires additional configuration for PersistentVolumeClaim mounts in function pods"
    ],
    answer: 0,
    explanation: "Serverless workloads scale to zero when idle, meaning PVs must be detached and reattached on each cold start, adding latency. Additionally, `ReadWriteOnce` PVs cannot be mounted by multiple pods simultaneously, which conflicts with serverless auto-scaling. This is why serverless architectures typically use object storage (e.g., S3) rather than PV-based storage.\n\nWhy other options are wrong:\n- B: Serverless functions in Kubernetes can technically access persistent and ephemeral storage\n- C: PVs are not automatically deleted when functions scale to zero; PVCs persist independently of pods\n- D: Knative does not restrict volumes to emptyDir only; PVCs can be configured in the pod template\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: null
  },
  {
    id: "s04-q050",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer uses a `projected` volume to combine multiple sources into a single mount point. Which volume types can be projected together in a single `projected` volume?",
    diagram: null,
    options: [
      "`configMap`, `secret`, `downwardAPI`, and `serviceAccountToken` sources can be projected",
      "Only `configMap` and `secret` volumes are supported as sources for projected volume mounts",
      "`persistentVolumeClaim`, `configMap`, and `secret` sources can be combined when projected",
      "`emptyDir`, `hostPath`, and `configMap` sources are valid for use in a projected volume type"
    ],
    answer: 0,
    explanation: "A `projected` volume allows combining `configMap`, `secret`, `downwardAPI`, and `serviceAccountToken` sources into a single directory. This is useful when an application needs configuration, secrets, pod metadata, and a service account token all available at the same mount path. PVCs, `emptyDir`, and `hostPath` cannot be included in projected volumes.\n\nWhy other options are wrong:\n- B: Projected volumes also support downwardAPI and serviceAccountToken, not just configMap and secret\n- C: PersistentVolumeClaims cannot be included in projected volumes; only configMap, secret, downwardAPI, and serviceAccountToken\n- D: emptyDir and hostPath cannot be projected; they are separate volume types with different lifecycles\n\nReference: https://kubernetes.io/docs/concepts/storage/projected-volumes/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes[?(@.projected)]}'"
  },
  {
    id: "s04-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A PVC is configured with a `selector` that uses `matchLabels: { tier: premium }`. The cluster has 5 PVs, but only 2 have the label `tier: premium`. What happens during binding?",
    diagram: null,
    options: [
      "The PVC binds to any of the 5 PVs since labels on PersistentVolumes are purely advisory metadata only",
      "The PVC considers only the 2 PVs labeled `tier: premium` and binds to the best match on capacity",
      "The PVC creates new PVs with the `tier: premium` label automatically via dynamic provisioning logic",
      "The PVC is rejected because label selectors are not supported on PersistentVolumeClaim specifications"
    ],
    answer: 1,
    explanation: "A PVC's `spec.selector.matchLabels` field restricts which PVs are eligible for binding. Only PVs with matching labels are considered. Among those, the PV controller selects the best match based on capacity and access modes. This allows administrators to partition PVs into tiers or classes beyond what `storageClassName` provides.\n\nWhy other options are wrong:\n- A: PV labels are not purely advisory; they are used in PVC selector matching to filter eligible PVs\n- C: Label selectors do not trigger dynamic provisioning; they filter among existing static PVs\n- D: PVC spec.selector is a valid field; label-based selection is fully supported on PVCs\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#selector",
    verify: "kubectl get pv -l tier=premium"
  },
  {
    id: "s04-q052",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A CSI driver specification defines three plugin services: Identity, Controller, and Node. Which operations does the Node plugin service handle?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="10" width="300" height="40" rx="6" fill="#326CE5"/><text x="200" y="35" text-anchor="middle" fill="white" font-size="13" font-weight="bold">CSI Driver Architecture</text><rect x="20" y="70" width="110" height="55" rx="4" fill="#E8F0FE" stroke="#326CE5"/><text x="75" y="90" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">Identity</text><text x="75" y="105" text-anchor="middle" font-size="9" fill="#666">GetPluginInfo</text><text x="75" y="117" text-anchor="middle" font-size="9" fill="#666">GetCapabilities</text><rect x="145" y="70" width="110" height="55" rx="4" fill="#E8F0FE" stroke="#326CE5"/><text x="200" y="90" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">Controller</text><text x="200" y="105" text-anchor="middle" font-size="9" fill="#666">Ctrl Op 1</text><text x="200" y="117" text-anchor="middle" font-size="9" fill="#666">Ctrl Op 2</text><rect x="270" y="70" width="110" height="55" rx="4" fill="#A8D08D" stroke="#6AA84F"/><text x="325" y="90" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">Node</text><text x="325" y="105" text-anchor="middle" font-size="9" fill="#333">Operation 1</text><text x="325" y="117" text-anchor="middle" font-size="9" fill="#333">Operation 2</text><rect x="20" y="155" width="170" height="35" rx="4" fill="#FFF3CD" stroke="#FFC107"/><text x="105" y="177" text-anchor="middle" font-size="10" fill="#333">Runs on Controller Node</text><rect x="210" y="155" width="170" height="35" rx="4" fill="#D4EDDA" stroke="#28A745"/><text x="295" y="177" text-anchor="middle" font-size="10" fill="#333">Runs on Every Worker</text><line x1="75" y1="125" x2="75" y2="155" stroke="#FFC107" stroke-width="1.5" stroke-dasharray="4"/><line x1="200" y1="125" x2="105" y2="155" stroke="#FFC107" stroke-width="1.5" stroke-dasharray="4"/><line x1="325" y1="125" x2="295" y2="155" stroke="#28A745" stroke-width="1.5" stroke-dasharray="4"/></svg>',
    options: [
      "Creating and deleting volumes on the storage backend via the Controller plugin's RPC interface",
      "Registering the CSI driver with the Kubernetes API server using the node-driver-registrar sidecar",
      "Scheduling pods to nodes based on volume topology constraints provided by the CSI driver's reports",
      "Staging (formatting/mounting to a global path) and publishing (bind-mounting into the pod) volumes"
    ],
    answer: 3,
    explanation: "The CSI Node plugin runs on every worker node and handles `NodeStageVolume` (mounting the volume to a staging path, including formatting if needed) and `NodePublishVolume` (bind-mounting from the staging path into the pod's mount namespace). Volume creation and attachment are handled by the Controller plugin, not the Node plugin.\n\nWhy other options are wrong:\n- A: Creating and deleting volumes is handled by the Controller plugin service, not the Node plugin\n- B: Driver registration with the API server is handled by the node-driver-registrar sidecar, not the Node plugin service itself\n- C: Pod scheduling is handled by kube-scheduler; the CSI Node plugin does not schedule pods\n\nReference: https://kubernetes-csi.github.io/docs/deploying.html",
    verify: "kubectl get csinodes"
  },
  {
    id: "s04-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet performs a rolling update with `updateStrategy.type: RollingUpdate` and `partition: 3`. The StatefulSet has 5 replicas (ordinals 0-4). Which pods are updated?",
    diagram: null,
    options: [
      "All pods from `pod-0` through `pod-4` are updated to the new revision simultaneously",
      "Only `pod-3` and `pod-4` are updated; pods with ordinal below 3 keep the old revision",
      "Only `pod-0`, `pod-1`, and `pod-2` are updated because they are below the partition value",
      "No pods are updated at all until the partition value is removed from the update strategy"
    ],
    answer: 1,
    explanation: "The `partition` field in a StatefulSet's rolling update strategy creates a canary-style update. Only pods with an ordinal greater than or equal to the partition value are updated. Pods with ordinals 3 and 4 receive the new revision, while pods 0, 1, and 2 remain on the old revision. Decreasing the partition value gradually rolls the update to more pods.\n\nWhy other options are wrong:\n- A: Not all pods are updated; the partition value determines which ordinals receive the update\n- C: Pods below the partition value (0, 1, 2) keep the old revision; they are not updated\n- D: Pods at or above the partition value are updated immediately; the partition does not block all updates\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions",
    verify: "kubectl rollout status statefulset <name>"
  },
  {
    id: "s04-q054",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A development team uses `subPath` when mounting a ConfigMap volume in a pod. What is the effect of using `subPath` compared to a standard mount?",
    diagram: null,
    options: [
      "`subPath` creates a subdirectory inside the ConfigMap resource itself on the API server storage",
      "`subPath` enables automatic ConfigMap updates to propagate to the mounted file in the container",
      "`subPath` restricts ConfigMap access to read-only mode and blocks any write operations on files",
      "`subPath` mounts a single key as a file without hiding other existing files in the directory"
    ],
    answer: 3,
    explanation: "Using `subPath` mounts a specific key from a ConfigMap (or Secret) as a single file at the mount point, without replacing the entire directory contents. This is useful when you need to add a config file to an existing directory without hiding other files. However, `subPath` mounts do not receive automatic updates when the ConfigMap is changed.\n\nWhy other options are wrong:\n- A: subPath does not create subdirectories inside the ConfigMap resource; it selects a key from the existing ConfigMap\n- B: subPath mounts do NOT receive automatic ConfigMap updates; this is a key limitation\n- C: subPath does not restrict to read-only mode; read-only is controlled separately by the readOnly volumeMount field\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#using-subpath",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[*].volumeMounts}'"
  },
  {
    id: "s04-q055",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud-native application team is deciding between using a managed database service (e.g., AWS RDS) and running a database as a StatefulSet in Kubernetes. Which factor most strongly favors using a managed service?",
    diagram: null,
    options: [
      "Managed database services are typically more cost-effective than self-hosted databases, making cost the primary factor favoring managed options",
      "Managed services handle backups, patching, replication, and failover, reducing the team's operations work",
      "StatefulSets are designed for stateless workloads and require additional operators for database persistent storage",
      "Managed services run inside the Kubernetes cluster alongside application pods for better network latency"
    ],
    answer: 1,
    explanation: "Managed database services offload operational responsibilities like automated backups, security patching, replication, and failover to the cloud provider. This significantly reduces the operational burden on the team. Running databases as StatefulSets is viable but requires the team to manage these operational aspects themselves. Cost and latency vary by scenario.\n\nWhy other options are wrong:\n- A: Managed services are not always cheaper; cost depends on usage patterns and scale\n- C: StatefulSets fully support persistent storage via PVCs and volumeClaimTemplates\n- D: Managed services run outside the Kubernetes cluster in the cloud provider's infrastructure\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
    verify: null
  },
  {
    id: "s04-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The `etcd` datastore in a Kubernetes cluster uses persistent storage for its data directory. What happens to the cluster if etcd's storage becomes corrupted or unavailable?",
    diagram: null,
    options: [
      "The control plane becomes non-functional since all cluster state is stored in the etcd data store",
      "Only new pod creation is affected; the API server falls back to a read-only cache mode and continues serving existing state",
      "The cluster continues operating normally by falling back to locally cached data on each component",
      "The kube-apiserver automatically switches to an in-memory backup store when etcd is unavailable"
    ],
    answer: 0,
    explanation: "etcd is the sole source of truth for all Kubernetes cluster state, including pod definitions, services, secrets, and configuration. If etcd's storage becomes corrupted or unavailable, the kube-apiserver cannot read or write any cluster state. Running containers may continue executing, but no new operations (scheduling, scaling, updates) can occur until etcd is restored.\n\nWhy other options are wrong:\n- B: The API server does not have a read-only cache fallback mode; it depends on etcd for all operations\n- C: Control plane components do not have sufficient local caches to continue operating normally without etcd\n- D: There is no automatic in-memory backup store switchover; etcd must be restored for the cluster to function\n\nReference: https://kubernetes.io/docs/concepts/overview/components/#etcd",
    verify: "kubectl get --raw='/readyz?verbose'"
  },
  {
    id: "s04-q057",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A PVC is stuck in `Pending` state. Running `kubectl describe pvc` shows the event: `waiting for a volume to be created, either by external provisioner or manually`. What does this indicate?",
    diagram: null,
    options: [
      "The PVC has a syntax error in its YAML definition that prevents it from being processed by the API",
      "The cluster has run out of available node disk space and the provisioner cannot allocate new volumes",
      "The PVC references a StorageClass whose dynamic provisioner has not yet created the volume for it",
      "The PVC is already bound to a PV but the event message displayed by describe is stale and outdated"
    ],
    answer: 2,
    explanation: "This event indicates the PVC is waiting for dynamic provisioning. The StorageClass's provisioner (typically an external CSI driver) has not yet created the PV. Common causes include: the provisioner pod is not running, the provisioner does not have the correct permissions, or cloud provider API limits are being hit. Checking the provisioner's logs is the next troubleshooting step.\n\nWhy other options are wrong:\n- A: This event does not indicate a syntax error; the PVC was accepted and is waiting for provisioning\n- B: This event is about volume provisioning, not node disk space; the provisioner exists but has not yet created the PV\n- D: The PVC is in Pending state, not bound; the event message reflects the current waiting condition\n\nReference: https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/",
    verify: "kubectl get events --field-selector involvedObject.kind=PersistentVolumeClaim"
  },
  {
    id: "s04-q058",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "The Container Storage Interface (CSI) specification is a standard adopted by the CNCF ecosystem. What problem does CSI solve?",
    diagram: null,
    options: [
      "CSI provides a uniform interface so storage vendors write one driver that works across orchestrators",
      "CSI standardizes container image formats across all registries used by container runtime environments",
      "CSI defines a network interface specification for container-to-container communication in clusters",
      "CSI specifies CPU and memory resource management standards for containers running in orchestrators"
    ],
    answer: 0,
    explanation: "CSI defines a standard interface between container orchestrators (like Kubernetes) and storage providers. Before CSI, storage drivers were built into Kubernetes core (in-tree), requiring changes to Kubernetes for every storage update. CSI allows vendors to develop, release, and update their drivers independently as out-of-tree plugins.\n\nWhy other options are wrong:\n- B: CSI is not about container image formats; OCI (Open Container Initiative) standardizes image formats\n- C: CSI is not about network policies; CNI (Container Network Interface) handles container networking\n- D: CSI does not specify CPU/memory management; resource management is handled by the kubelet and scheduler\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#csi",
    verify: "kubectl get csidrivers"
  },
  {
    id: "s04-q059",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A PV definition includes `spec.capacity.storage: 100Gi` and `spec.accessModes: [ReadWriteOnce, ReadOnlyMany]`. A PVC requests `ReadOnlyMany` and 50Gi. After binding, can another PVC also bind to the same PV?",
    diagram: '<svg viewBox="0 0 380 140" xmlns="http://www.w3.org/2000/svg"><rect x="150" y="10" width="100" height="50" rx="5" fill="#FFF3CD" stroke="#FFC107" stroke-width="2"/><text x="200" y="32" text-anchor="middle" font-size="11" fill="#333" font-weight="bold">PV (100Gi)</text><text x="200" y="48" text-anchor="middle" font-size="8" fill="#666">RWO + ROX</text><rect x="20" y="90" width="100" height="40" rx="5" fill="#D4EDDA" stroke="#28A745"/><text x="70" y="115" text-anchor="middle" font-size="10" fill="#333">PVC-1 (Bound)</text><rect x="260" y="90" width="100" height="40" rx="5" fill="#F5F5F5" stroke="#999" stroke-dasharray="4"/><text x="310" y="115" text-anchor="middle" font-size="10" fill="#666">PVC-2 (???)</text><line x1="170" y1="60" x2="70" y2="90" stroke="#28A745" stroke-width="2"/><line x1="230" y1="60" x2="310" y2="90" stroke="#999" stroke-width="1.5" stroke-dasharray="5,3"/><text x="290" y="78" text-anchor="middle" font-size="12" fill="#999">?</text><text x="200" y="80" text-anchor="middle" font-size="9" fill="#666">binding result?</text></svg>',
    options: [
      "Yes, because the PV supports multiple access modes so multiple PVCs can bind to it at the same time",
      "No, a PV can only be bound to one PVC at a time regardless of which access modes are configured",
      "Yes, if the second PVC also requests `ReadOnlyMany` access mode matching the PV's capabilities",
      "It depends entirely on the StorageClass configuration and its provisioner's binding behavior rules"
    ],
    answer: 1,
    explanation: "A PersistentVolume in Kubernetes can only be bound to a single PVC at a time. This is a one-to-one relationship regardless of the PV's listed access modes. The access modes on the PV describe what the underlying storage supports, but they do not enable multi-PVC binding. Multiple pods can use the same PVC, subject to the access mode of that PVC.\n\nWhy other options are wrong:\n- A: Multiple access modes on a PV describe capabilities; they do not enable multi-PVC binding\n- C: ReadOnlyMany allows multi-node read access for a single PVC, not multiple PVCs binding to one PV\n- D: StorageClass does not change the one-to-one PV-PVC binding rule; it only affects provisioning\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding",
    verify: "kubectl get pv -o custom-columns=NAME:.metadata.name,CLAIM:.spec.claimRef.name"
  },
  {
    id: "s04-q060",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team wants to use ephemeral CSI volumes that are created and destroyed with the pod lifecycle. Which volume type in the pod spec enables this?",
    diagram: null,
    options: [
      "`persistentVolumeClaim` with `readOnly: true` set on the volume mount to simulate ephemeral behavior",
      "`emptyDir` with a CSI-backed storage medium specified in the volume configuration field of the pod",
      "`hostPath` pointing to the CSI driver's mount directory on the node's local filesystem path",
      "`csi` inline volume in the pod spec, allowing the CSI driver to provision per-pod ephemeral storage"
    ],
    answer: 3,
    explanation: "CSI ephemeral volumes allow defining CSI-backed volumes directly in the pod spec without creating a separate PVC. The volume is created when the pod is scheduled and destroyed when the pod terminates. This is useful for injecting secrets, identity tokens, or temporary scratch space from a CSI driver. Not all CSI drivers support this feature.\n\nWhy other options are wrong:\n- A: readOnly on a PVC mount controls read-write access, not ephemeral lifecycle behavior\n- B: emptyDir does not support a CSI-backed storage medium; medium can be empty (disk) or Memory (tmpfs)\n- C: hostPath mounts a node directory and is not related to CSI ephemeral volume provisioning\n\nReference: https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/#csi-ephemeral-volumes",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes[*].csi}'"
  },
  {
    id: "s04-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An administrator needs to expand an existing PVC from 10Gi to 20Gi. The StorageClass has `allowVolumeExpansion: true`. What is the correct procedure?",
    diagram: '<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="25" width="100" height="50" rx="5" fill="#E8F0FE" stroke="#326CE5"/><text x="60" y="48" text-anchor="middle" font-size="10" fill="#333">PVC: 10Gi</text><text x="60" y="62" text-anchor="middle" font-size="8" fill="#666">needs more space</text><text x="135" y="52" text-anchor="middle" font-size="16" fill="#666">\u2192</text><rect x="155" y="25" width="100" height="50" rx="5" fill="#FFD966" stroke="#F1C232"/><text x="205" y="48" text-anchor="middle" font-size="10" fill="#333">??? Process</text><text x="205" y="62" text-anchor="middle" font-size="8" fill="#666">what happens?</text><text x="280" y="52" text-anchor="middle" font-size="16" fill="#666">\u2192</text><rect x="295" y="25" width="100" height="50" rx="5" fill="#D4EDDA" stroke="#28A745"/><text x="345" y="48" text-anchor="middle" font-size="10" fill="#333">PV: ??? Gi</text><text x="345" y="62" text-anchor="middle" font-size="8" fill="#666">result</text></svg>',
    options: [
      "Delete the `PVC`, create a new one requesting 20Gi, and re-attach it to the pod with updated mounts",
      "Edit the PVC's `spec.resources.requests.storage` to 20Gi; the CSI driver handles the expansion",
      "Edit the `PV` directly to change its capacity to 20Gi; the `PVC` inherits the new size automatically",
      "Create a second `PVC` for the additional 10Gi and mount both volumes inside the application pod"
    ],
    answer: 1,
    explanation: "PVC expansion is triggered by editing the PVC's `spec.resources.requests.storage` field to the desired size. The PV controller detects the change and instructs the CSI driver to expand the underlying volume. Some storage backends require the pod to be restarted for filesystem expansion, while others support online expansion. The PV size is updated automatically.\n\nWhy other options are wrong:\n- A: Deleting and recreating the PVC would lose existing data; in-place expansion is supported\n- C: Editing the PV directly does not trigger CSI expansion; the PVC is the correct resource to modify\n- D: Creating a second PVC adds complexity; volume expansion is the simpler and correct approach\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#expanding-persistent-volumes-claims",
    verify: "kubectl patch pvc <name> -p '{\"spec\":{\"resources\":{\"requests\":{\"storage\":\"20Gi\"}}}}'"
  },
  {
    id: "s04-q062",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A distributed application uses OpenTelemetry for tracing. A request flows through a stateless API gateway, then to a stateful order service backed by a PV. Traces show high latency in the order service. Which trace attribute would help determine if the latency is storage-related?",
    diagram: null,
    options: [
      "Span duration for database write operations showing I/O wait times on the storage backend",
      "HTTP status code of the response returned from the order service to the upstream API gateway",
      "The number of replicas in the Deployment managing the order service's horizontal pod count",
      "The container image tag used by the order service which determines the application version"
    ],
    answer: 0,
    explanation: "Trace spans for database write operations include timing information that reveals I/O wait times. If the spans show long durations for write operations relative to compute operations, the bottleneck is likely storage I/O. Correlating this with storage metrics (IOPS, throughput, latency) from the CSI driver or cloud provider confirms the root cause.\n\nWhy other options are wrong:\n- B: HTTP status codes indicate success/failure but do not reveal whether latency is caused by storage I/O\n- C: Replica count is a configuration value, not a trace attribute that reveals storage performance\n- D: The image tag identifies the version but does not provide runtime performance information about storage\n\nReference: https://opentelemetry.io/docs/concepts/signals/traces/",
    verify: null
  },
  {
    id: "s04-q063",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "When a StatefulSet pod is deleted, the associated PVC is NOT deleted by default. What is the rationale for this behavior?",
    diagram: null,
    options: [
      "It is a bug in the StatefulSet controller that has not been fixed and is tracked in a known issue",
      "Retaining PVCs prevents data loss; when the pod is recreated with the same ordinal it reattaches",
      "PVCs in Lost state are automatically re-created by the StatefulSet controller to restore the previous binding",
      "The kubelet does not have RBAC permissions to delete PVCs so they remain after pod termination"
    ],
    answer: 1,
    explanation: "StatefulSets are designed for stateful workloads where data preservation is critical. When a pod is deleted (intentionally or due to failure), the PVC is retained so that the replacement pod (with the same ordinal and name) can reattach to the same data. This ensures data survives pod rescheduling, node failures, and intentional restarts.\n\nWhy other options are wrong:\n- A: PVC retention is an intentional design feature for data safety, not a bug\n- C: The StatefulSet controller does not auto-recreate PVCs in Lost state; Lost indicates the bound PV was deleted and requires manual intervention\n- D: The kubelet is not involved in PVC deletion; PVCs are API objects managed by the controller-manager\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get pvc -l app=<statefulset>"
  },
  {
    id: "s04-q064",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A pod spec defines a volume using the `downwardAPI` volume type with items referencing `metadata.labels` and `metadata.annotations`. How is this data exposed to the container?",
    diagram: null,
    options: [
      "As environment variables injected into the container at startup time by the kubelet on the node",
      "As a read-only database accessible via a Unix socket created in the container's mount directory",
      "As files in the mounted directory, with each item written to a separate file that auto-updates",
      "As HTTP endpoints served on localhost that return JSON-formatted metadata to the application"
    ],
    answer: 2,
    explanation: "The `downwardAPI` volume type exposes pod metadata (labels, annotations, resource limits, etc.) as files in a mounted directory. Each item specified in the volume definition becomes a file. Unlike environment variables (which are set once at startup), downwardAPI volume files can reflect changes to labels and annotations while the pod is running.\n\nWhy other options are wrong:\n- A: The downwardAPI volume type exposes data as files, not as environment variables (envFrom is separate)\n- B: There is no Unix socket database interface for downwardAPI data; it uses plain files\n- D: There is no HTTP endpoint served by downwardAPI volumes; data is exposed as mounted files\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#downwardapi",
    verify: "kubectl exec <pod> -- ls /etc/podinfo/"
  },
  {
    id: "s04-q065",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is designing a stateful microservice for Kubernetes and must decide on a data persistence strategy. Which principle should guide their choice between local volumes, network-attached storage, and object storage?",
    diagram: null,
    options: [
      "Prioritize the cheapest storage option to minimize infrastructure costs even if performance differs",
      "Match the storage type to the workload's I/O pattern, durability needs, and horizontal scaling goals",
      "Prefer local volumes for their performance advantages and accept the trade-off in availability",
      "Prefer object storage as the default choice given its broad API support and portability across cloud providers"
    ],
    answer: 1,
    explanation: "Cloud-native storage decisions should be driven by workload requirements. Local volumes offer lowest latency but lack replication. Network-attached block storage provides durability with moderate latency. Object storage scales infinitely but has higher latency. The correct choice depends on I/O patterns (random vs. sequential), durability needs, and horizontal scaling requirements.\n\nWhy other options are wrong:\n- A: Cheapest storage may not meet performance or durability requirements for the workload\n- C: Local volumes provide maximum performance but lack availability if the node fails\n- D: Object storage has higher latency and may not suit all workloads that need block-level I/O patterns\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/",
    verify: null
  },
  {
    id: "s04-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A StatefulSet-based MySQL cluster uses a headless Service. The administrator needs to create a separate Service that load-balances read traffic across all replicas while keeping the headless Service for direct pod addressing. Is this possible?",
    diagram: null,
    options: [
      "No, a StatefulSet can only have one associated `Service` defined for it in the cluster at a time",
      "Yes, create a regular `ClusterIP` Service with the same selector to load-balance across pods",
      "Yes, but only if the pods are labeled differently so that each Service selects different targets",
      "No, load balancing across replicas is architecturally incompatible with StatefulSet workloads"
    ],
    answer: 1,
    explanation: "A StatefulSet can have multiple Services pointing to it. The headless Service (used in `spec.serviceName`) provides stable DNS for individual pods. A separate `ClusterIP` Service with the same label selector distributes traffic across all pods. This is a common pattern: headless Service for writes to a specific primary, regular Service for read replicas.\n\nWhy other options are wrong:\n- A: StatefulSets can have multiple Services pointing to the same pods via label selectors\n- C: Both Services can use the same selector; pods do not need different labels\n- D: Load balancing across StatefulSet replicas is a common and valid pattern for read traffic\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
    verify: "kubectl get svc -l app=mysql"
  },
  {
    id: "s04-q067",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team needs to update a StatefulSet that manages a 5-node ZooKeeper ensemble. They want to update one node at a time and verify cluster health between updates. Which update approach should they use?",
    diagram: null,
    options: [
      "Use `RollingUpdate` with `partition` set to progressively lower values, verifying health each step",
      "Use `Recreate` strategy to replace all ZooKeeper nodes simultaneously in a single update batch run",
      "Delete the StatefulSet entirely and recreate it from scratch with the new container image version",
      "Scale the StatefulSet down to 0 replicas, update the spec, verify health, then scale back up"
    ],
    answer: 0,
    explanation: "The `partition` field in StatefulSet `RollingUpdate` strategy enables staged rollouts. Start with `partition: 4` to update only `pod-4`. After verifying health, set `partition: 3` to also update `pod-3`, and continue until all nodes are updated. This canary approach is ideal for clustered applications like ZooKeeper that require quorum maintenance during updates.\n\nWhy other options are wrong:\n- B: Recreate strategy does not exist for StatefulSets; it would also cause total cluster unavailability\n- C: Deleting and recreating the StatefulSet loses stability guarantees and causes full downtime\n- D: Scaling to 0 causes full downtime; the partition approach allows zero-downtime rolling updates\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions",
    verify: "kubectl rollout status statefulset zookeeper"
  },
  {
    id: "s04-q068",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After a node reboot, pods that were using `ReadWriteOnce` PVs on that node are recreated on a different node. The new pods are stuck in `ContainerCreating` with a `Multi-Attach error`. What caused this?",
    diagram: null,
    options: [
      "The pod's container image is not available on the new node and needs to be pulled from the registry",
      "The PVC was accidentally deleted during the node reboot process and no longer exists in the cluster",
      "The PV is still attached to the old node because the `VolumeAttachment` object was not cleaned up",
      "The PV detach from the rebooted node was delayed because the `CSI` driver requires a graceful unmount before reattachment"
    ],
    answer: 2,
    explanation: "A `Multi-Attach` error occurs when a `ReadWriteOnce` volume is still considered attached to the original node. After a node failure, the `VolumeAttachment` object may not be cleaned up immediately, especially if the node is unreachable. The `--force` delete of the old pod or waiting for the node lease to expire resolves this by allowing volume detach.\n\nWhy other options are wrong:\n- A: Image pull issues cause ImagePullBackOff, not Multi-Attach errors in ContainerCreating state\n- B: If the PVC were deleted, the error would be about a missing claim, not Multi-Attach\n- D: The Multi-Attach error is caused by a stale VolumeAttachment object, not a CSI driver design requirement for graceful unmount; the old node was rebooting and could not perform a graceful detach\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes",
    verify: "kubectl get volumeattachment"
  },
  {
    id: "s04-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer specifies `resources.requests.ephemeral-storage: 2Gi` and `resources.limits.ephemeral-storage: 4Gi` on a container. What does this control?",
    diagram: null,
    options: [
      "The size of PersistentVolumes that the container can claim from the cluster's available storage pool",
      "The temporary storage (writable layer + `emptyDir` without medium) the container can use on the node",
      "The maximum size of container images that can be pulled from the registry to the node's image cache",
      "The RAM allocation for tmpfs-backed `emptyDir` volumes mounted inside the container's filesystem"
    ],
    answer: 1,
    explanation: "Ephemeral storage requests and limits control the node's local storage consumed by a container's writable layer, logs, and non-memory-backed `emptyDir` volumes. If the container exceeds the limit, it is evicted. The request is used by the scheduler to ensure the node has enough local disk space. This does not apply to PVs or RAM-backed tmpfs volumes.\n\nWhy other options are wrong:\n- A: Ephemeral storage limits control local node disk usage, not PersistentVolume claim sizes\n- C: Ephemeral storage limits do not constrain container image pull sizes\n- D: Ephemeral storage limits do not apply to tmpfs-backed emptyDir volumes; those count against memory\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#setting-requests-and-limits-for-local-ephemeral-storage",
    verify: "kubectl describe pod <pod-name> | grep ephemeral-storage"
  },
  {
    id: "s04-q070",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A FinOps team notices that multiple `Released` PersistentVolumes backed by cloud provider disks are accumulating costs. These PVs have the `Retain` reclaim policy and their original PVCs were deleted weeks ago. What action should they take?",
    diagram: null,
    options: [
      "Wait for Kubernetes to automatically clean up `Released` PVs through its built-in garbage collection",
      "Change the `reclaimPolicy` on the released PVs to `Delete` — this retroactively deletes them and disks",
      "Restart the kube-controller-manager process to trigger garbage collection of stale PV resources now",
      "Delete the `Released` PVs after verifying data is no longer needed, to stop ongoing cloud disk billing"
    ],
    answer: 3,
    explanation: "PVs in `Released` state with `Retain` policy keep their underlying cloud storage, which incurs ongoing charges. Kubernetes does not automatically delete these PVs. Changing the reclaim policy after release does not retroactively apply. The team must manually review and delete the PVs (and optionally the cloud disks) after confirming the data is no longer required.\n\nWhy other options are wrong:\n- A: Released PVs with Retain policy are not garbage collected automatically; they persist indefinitely\n- B: Changing reclaimPolicy on a Released PV to Delete does not retroactively delete it and its storage\n- C: Restarting kube-controller-manager does not trigger garbage collection of Released PVs with Retain policy\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#retain",
    verify: "kubectl get pv --field-selector status.phase=Released"
  },
  {
    id: "s04-q071",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod requires two PVCs: one backed by a local SSD PV on `node-a` and another backed by a local NVMe PV on `node-b`. Can the scheduler place this pod?",
    diagram: null,
    options: [
      "Yes, the scheduler can mount volumes from both nodes into the pod using cross-node volume access",
      "No, a pod runs on a single node and cannot use local PVs from two different nodes simultaneously",
      "Yes, if both local PVs are configured with `ReadWriteMany` access mode for multi-node mounting",
      "The scheduler splits the pod's containers across both nodes to satisfy the two volume requirements"
    ],
    answer: 1,
    explanation: "A pod is always scheduled to a single node. Local PVs have `nodeAffinity` that ties them to specific nodes. If two local PVs are on different nodes, no single node can satisfy both constraints, making the pod unschedulable. To resolve this, use network-attached storage that is accessible from any node, or consolidate the local storage onto one node.\n\nWhy other options are wrong:\n- A: Local PVs are physically on one node; cross-node volume access is not possible with local volumes\n- C: ReadWriteMany does not help local PVs; local storage is inherently tied to a single node's disk\n- D: Kubernetes does not split a pod's containers across multiple nodes; a pod always runs on one node\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#local",
    verify: "kubectl describe pod <pod-name> | grep -A10 Events"
  },
  {
    id: "s04-q072",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A StatefulSet-based Kafka cluster uses PVCs for log storage and a headless Service for broker discovery. A new broker pod `kafka-3` is added via scaling. How do existing brokers discover the new member?",
    diagram: null,
    options: [
      "The kube-apiserver sends a notification event to all running broker pods about the new cluster member",
      "Kafka brokers perform DNS lookups against the headless Service which returns updated A records for all",
      "The new broker automatically inherits the full cluster configuration from its provisioned PVC contents",
      "Existing brokers must be manually reconfigured with the new pod's IP since headless Services do not update DNS"
    ],
    answer: 1,
    explanation: "Headless Services provide DNS-based discovery for StatefulSet pods. When `kafka-3` becomes Running and Ready, the headless Service's DNS records are updated to include the new pod. Existing Kafka brokers that periodically resolve the Service DNS or use ZooKeeper/KRaft for cluster membership will discover the new member through these updated records.\n\nWhy other options are wrong:\n- A: The kube-apiserver does not send notification events directly to pods about cluster membership changes\n- C: PVCs contain data written by the application, not Kafka cluster configuration for new member discovery\n- D: Headless Services do update DNS records dynamically; brokers discover new members via DNS lookups\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id",
    verify: "kubectl exec kafka-0 -- nslookup kafka-headless.default.svc.cluster.local"
  },
  {
    id: "s04-q073",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team uses Velero (a CNCF project) to back up Kubernetes resources. How does Velero handle PersistentVolume backups?",
    diagram: null,
    options: [
      "Velero only backs up Kubernetes resource manifests (YAML) and does not handle actual PV data at all",
      "Velero replaces PVs with `emptyDir` volumes during backup to reduce the total backup storage size",
      "Velero takes PV snapshots via CSI or uses Restic/Kopia for file-level backups alongside manifests",
      "Velero requires all PVs to be fully unmounted from pods before any backup operation can be started"
    ],
    answer: 2,
    explanation: "Velero provides both resource-level backup (Kubernetes manifests) and data-level backup for PersistentVolumes. It supports CSI volume snapshots for snapshot-capable storage backends and uses Restic or Kopia for file-level backups when snapshots are not available. This allows complete cluster recovery including stateful workload data.\n\nWhy other options are wrong:\n- A: Velero backs up both resource manifests and PV data, not just YAML definitions\n- B: Velero does not replace PVs with emptyDir; it preserves volume configurations during backup\n- D: Velero can perform consistent backups without requiring PVs to be unmounted from pods\n\nReference: https://velero.io/docs/main/file-system-backup/",
    verify: "velero backup describe <backup-name>"
  },
  {
    id: "s04-q074",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A monitoring dashboard tracks the `kube_persistentvolumeclaim_status_phase` metric from kube-state-metrics. What information does this metric provide?",
    diagram: null,
    options: [
      "The I/O throughput of each PVC measured in bytes per second from the `kubelet_volume_stats` endpoint",
      "The current phase (`Pending`, `Bound`, `Lost`) of each PVC exposed as a gauge metric with labels",
      "The total number of PVCs that have been created since the cluster was first started and initialized",
      "The actual storage capacity being consumed by each PVC as reported by the underlying CSI driver"
    ],
    answer: 1,
    explanation: "The `kube_persistentvolumeclaim_status_phase` metric from kube-state-metrics reports the current lifecycle phase of each PVC. It is a gauge metric with labels for the PVC name, namespace, and phase. This enables alerting on PVCs stuck in `Pending` or entering `Lost` state. It does not provide I/O metrics or capacity usage.\n\nWhy other options are wrong:\n- A: This metric reports phase status, not I/O throughput; throughput comes from kubelet_volume_stats metrics\n- C: This metric reports per-PVC phase, not the cumulative count of all PVCs ever created in the cluster\n- D: This metric reports lifecycle phase, not actual storage consumption; capacity usage comes from different metrics\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: "kubectl get --raw /api/v1/namespaces/monitoring/services/kube-state-metrics:http-metrics/proxy/metrics | grep persistentvolumeclaim_status"
  },
  {
    id: "s04-q075",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet has `spec.persistentVolumeClaimRetentionPolicy.whenDeleted: Delete` and `whenScaled: Retain`. What behavior does this configure?",
    diagram: null,
    options: [
      "PVCs are deleted when the StatefulSet is deleted, but retained when pods are scaled down by count",
      "PVCs are converted to standalone PVs with Retain policy when the StatefulSet is deleted, preserving data independently",
      "PVCs are deleted when the StatefulSet is deleted, and also deleted when individual pods are scaled down",
      "This field is not valid in the StatefulSet spec and is rejected by the API server upon submission"
    ],
    answer: 0,
    explanation: "The `persistentVolumeClaimRetentionPolicy` field (beta in Kubernetes 1.27, stable/GA in Kubernetes 1.32) controls PVC lifecycle. `whenDeleted: Delete` means PVCs are cleaned up when the entire StatefulSet is deleted. `whenScaled: Retain` means PVCs are kept when scaling down, allowing data to be preserved if the StatefulSet is scaled back up later.\n\nWhy other options are wrong:\n- B: This is the opposite of what the configuration specifies; whenDeleted is Delete and whenScaled is Retain\n- C: The configuration distinguishes between delete and scale-down operations; not all PVCs are always deleted\n- D: persistentVolumeClaimRetentionPolicy is a valid field (GA in Kubernetes 1.32)\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#persistentvolumeclaim-retention",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.persistentVolumeClaimRetentionPolicy}'"
  },
  {
    id: "s04-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A PV has `spec.claimRef` set to a specific PVC name and namespace. What is the effect of pre-populating `claimRef` on a PV?",
    diagram: null,
    options: [
      "The PV is reserved for that specific PVC; other PVCs cannot bind to it even if they match criteria",
      "The PV is immediately deleted from the cluster as soon as that specific PVC object is first created",
      "The `claimRef` field is informational only and does not affect the binding process in any real way",
      "The PV automatically creates the referenced PVC if it does not already exist in the target namespace"
    ],
    answer: 0,
    explanation: "Setting `spec.claimRef` on a PV pre-binds it to a specific PVC. The PV will only bind to the PVC matching the `claimRef` name and namespace, and it will reject binding attempts from any other PVC. This is useful for reserving storage for specific workloads. The PV shows as `Available` until the referenced PVC is created.\n\nWhy other options are wrong:\n- B: claimRef does not cause PV deletion; it reserves the PV for a specific PVC by name and namespace\n- C: claimRef is functional and enforces binding; it is not merely informational metadata\n- D: The PV does not auto-create the referenced PVC; the PVC must be created separately\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reserving-a-persistentvolume",
    verify: "kubectl get pv <pv-name> -o jsonpath='{.spec.claimRef}'"
  },
  {
    id: "s04-q077",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A CSI driver supports volume cloning. A developer creates a PVC with `dataSource` referencing an existing PVC. What happens?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="20" width="140" height="60" rx="6" fill="#E8F0FE" stroke="#326CE5" stroke-width="2"/><text x="100" y="45" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">Source PVC</text><text x="100" y="62" text-anchor="middle" font-size="10" fill="#666">data-app-0 (10Gi)</text><rect x="230" y="20" width="140" height="60" rx="6" fill="#D4EDDA" stroke="#28A745" stroke-width="2"/><text x="300" y="45" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">Clone PVC</text><text x="300" y="62" text-anchor="middle" font-size="10" fill="#666">data-app-clone (???)</text><line x1="170" y1="50" x2="230" y2="50" stroke="#326CE5" stroke-width="2" stroke-dasharray="6,3"/><text x="200" y="42" text-anchor="middle" font-size="10" fill="#326CE5">clone</text><rect x="30" y="110" width="140" height="45" rx="4" fill="#FFF3CD" stroke="#FFC107"/><text x="100" y="137" text-anchor="middle" font-size="10" fill="#333">PV-source (10Gi)</text><rect x="230" y="110" width="140" height="45" rx="4" fill="#FFF3CD" stroke="#FFC107"/><text x="300" y="137" text-anchor="middle" font-size="10" fill="#333">PV-??? (?Gi)</text><line x1="100" y1="80" x2="100" y2="110" stroke="#326CE5" stroke-width="1.5"/><line x1="300" y1="80" x2="300" y2="110" stroke="#28A745" stroke-width="1.5"/></svg>',
    options: [
      "The new PVC shares the same underlying PV as the source PVC using a symbolic link on the storage backend",
      "A new PV is provisioned with a copy of the source PVC's data and the new PVC binds to that new PV",
      "The source PVC is deleted and its PV is transferred to the new PVC as part of the cloning operation",
      "Volume cloning primarily targets ephemeral `emptyDir` volumes and has limited PersistentVolumeClaim support"
    ],
    answer: 1,
    explanation: "CSI volume cloning creates a new PV that is a duplicate of the source PVC's underlying volume at the point of cloning. The new PVC binds to this new PV, creating two independent volumes. The source PVC and its data remain unchanged. Both PVCs must be in the same namespace and use the same StorageClass.\n\nWhy other options are wrong:\n- A: Cloning creates a new independent PV; it does not share the underlying storage via symbolic links\n- C: The source PVC is not deleted during cloning; both PVCs exist independently after the operation\n- D: Volume cloning is supported for PVCs via CSI drivers; it is not limited to emptyDir volumes\n\nReference: https://kubernetes.io/docs/concepts/storage/volume-pvc-datasource/",
    verify: "kubectl get pvc -o custom-columns=NAME:.metadata.name,DATASOURCE:.spec.dataSource.name"
  },
  {
    id: "s04-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "In a highly available Kubernetes setup, etcd runs as a 3-member cluster with each member storing data on a local SSD PV. One etcd member's disk fails completely. What is the impact on the cluster?",
    diagram: null,
    options: [
      "The etcd cluster keeps quorum with 2 of 3 members and continues; the failed member must be replaced",
      "The entire Kubernetes cluster becomes unavailable immediately because etcd has lost all quorum members",
      "The remaining 2 etcd members automatically replicate data to a new disk provisioned by the controller",
      "Kubernetes switches to an in-memory mode and continues operating until the disk failure is repaired"
    ],
    answer: 0,
    explanation: "A 3-member etcd cluster requires a quorum of 2 members to function. With one member's disk failed, the remaining 2 members still form a quorum and the cluster continues operating. The failed member should be replaced by removing it from the cluster, provisioning new storage, and adding a new member that syncs from the existing data.\n\nWhy other options are wrong:\n- B: A 3-member etcd cluster tolerates 1 failure; quorum (2 of 3) is maintained so the cluster continues\n- C: etcd does not automatically provision new storage or replicate to a replacement disk without admin action\n- D: Kubernetes does not have an in-memory fallback mode; it relies on etcd as the sole state store\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/",
    verify: "kubectl -n kube-system exec etcd-<node> -- etcdctl member list"
  },
  {
    id: "s04-q079",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices application uses the Saga pattern for distributed transactions across services that each have their own database. Why is the Saga pattern preferred over traditional two-phase commit (2PC) for cloud-native applications?",
    diagram: null,
    options: [
      "Saga eliminates the need for any form of data consistency guarantees across distributed service boundaries",
      "Saga avoids distributed locks, maintaining service autonomy while requiring compensating transactions",
      "Saga is faster because it skips all validation and integrity checking steps in the transaction workflow",
      "Two-phase commit does not work with any database technology used in modern cloud-native applications"
    ],
    answer: 1,
    explanation: "The Saga pattern breaks a distributed transaction into a sequence of local transactions, each within a single service's database. If a step fails, compensating transactions undo previous steps. Unlike 2PC, which requires distributed locks and blocks services, Sagas maintain service autonomy and availability, aligning with cloud-native principles of loose coupling.\n\nWhy other options are wrong:\n- A: Saga provides eventual consistency via compensating transactions; it does not eliminate consistency guarantees\n- C: Saga does not skip validation; each local transaction includes its own validation and integrity checks\n- D: 2PC works with modern databases but is less suitable for cloud-native due to distributed lock overhead\n\nReference: https://microservices.io/patterns/data/saga.html",
    verify: null
  },
  {
    id: "s04-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer adds a `volumeMount` with `readOnly: true` to a container that mounts a PVC. The PVC has `ReadWriteOnce` access mode. What is the effect?",
    diagram: null,
    options: [
      "The mount fails because the PVC `ReadWriteOnce` access mode conflicts with the `readOnly` volume flag",
      "The `readOnly` flag is ignored by the kubelet because the PVC's access mode explicitly allows writes",
      "The PVC's access mode is changed automatically to `ReadOnlyMany` to match the `readOnly` mount flag",
      "The container mounts the volume as read-only at the OS level, regardless of the PVC's `accessModes`"
    ],
    answer: 3,
    explanation: "The `readOnly: true` field on a `volumeMount` controls how the volume is mounted inside the specific container. It is independent of the PVC's access mode, which controls node-level access. Even if the PVC allows read-write, the container will have a read-only mount. Other containers in the same pod can mount the same volume as read-write.\n\nWhy other options are wrong:\n- A: readOnly on volumeMount does not conflict with the PVC access mode; they operate at different levels\n- B: The readOnly flag is respected by the kubelet; it is not ignored when the PVC allows writes\n- C: The PVC access mode is not changed; readOnly on the mount is a container-level setting\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#claims-as-volumes",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[*].volumeMounts}'"
  },
  {
    id: "s04-q081",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security team requires that all Secrets used by applications must be encrypted at rest in etcd. Which Kubernetes feature enables this?",
    diagram: null,
    options: [
      "Setting `readOnly: true` on Secret volume mounts in the pod spec to prevent any data modification",
      "Configuring `EncryptionConfiguration` on the kube-apiserver to encrypt Secrets before etcd storage",
      "Using `base64` encoding in Secret manifests, which provides sufficient encryption for data at rest",
      "Enabling TLS on the etcd cluster, which encrypts all data stored on disk by the etcd key-value store"
    ],
    answer: 1,
    explanation: "Kubernetes supports encryption at rest through the `EncryptionConfiguration` resource referenced by the kube-apiserver's `--encryption-provider-config` flag. This encrypts Secret data before writing to etcd using providers like `aescbc`, `aesgcm`, or external KMS. Base64 encoding is not encryption, and TLS only protects data in transit, not at rest.\n\nWhy other options are wrong:\n- A: readOnly on volume mounts prevents container writes but does not encrypt data stored in etcd\n- C: base64 is an encoding scheme, not encryption; it provides no security for data at rest\n- D: TLS on etcd encrypts data in transit between clients and servers, not data stored on disk\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/",
    verify: null
  },
  {
    id: "s04-q082",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI pipeline needs to run database migration scripts against a PostgreSQL StatefulSet before deploying new application pods. Which Kubernetes resource is best suited to run this one-time migration task?",
    diagram: null,
    options: [
      "A Deployment with 1 replica running the migration container that restarts if the script fails on error",
      "A `CronJob` scheduled to run every minute until the database migration script succeeds on the cluster",
      "A Job running the migration, configured as an `initContainer` dependency or Helm pre-upgrade hook",
      "A DaemonSet that runs the migration on every node in the cluster regardless of database pod placement"
    ],
    answer: 2,
    explanation: "A Kubernetes Job is designed for run-to-completion tasks like database migrations. When combined with Helm hooks (`pre-install` or `pre-upgrade`), the Job runs before the main application is deployed. The Job ensures the migration completes successfully (with configurable retries) before new pods are created, preventing applications from running against an unmigrated schema.\n\nWhy other options are wrong:\n- A: A Deployment restarts continuously and does not have run-to-completion semantics for migrations\n- B: A CronJob running every minute is wasteful and does not provide a clean one-time execution model\n- D: A DaemonSet runs on every node, which is unnecessary for a database migration targeting one database\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/",
    verify: "kubectl get jobs"
  },
  {
    id: "s04-q083",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet uses `updateStrategy.type: OnDelete`. An administrator updates the container image in the StatefulSet spec. What happens to existing pods?",
    diagram: null,
    options: [
      "No pods are updated; each pod must be manually deleted to trigger recreation with the new spec",
      "Pods are updated one at a time in reverse ordinal order as part of the standard rolling update",
      "All pods are immediately updated with the new image by the StatefulSet controller in parallel",
      "The StatefulSet rejects the update until all existing pods are drained from their current nodes"
    ],
    answer: 0,
    explanation: "With `OnDelete` update strategy, the StatefulSet controller does not automatically update pods when the spec changes. Each pod continues running with the old spec until it is manually deleted. When a pod is deleted, the controller recreates it with the updated spec. This gives operators full control over the update timing and order.\n\nWhy other options are wrong:\n- B: RollingUpdate updates pods automatically in reverse ordinal order; OnDelete requires manual deletion\n- C: OnDelete does not update any pods automatically; it waits for manual deletion of each pod\n- D: OnDelete does not require draining nodes; it simply delays recreation until the pod is deleted\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#on-delete",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.updateStrategy}'"
  },
  {
    id: "s04-q084",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team is designing a system where each microservice stores data in a different type of database (PostgreSQL for transactions, Redis for caching, Elasticsearch for search). What is this approach called?",
    diagram: null,
    options: [
      "Monolithic data architecture — all services share a single database to avoid duplication overhead",
      "Polyglot persistence — using multiple database technologies matched to each service's data needs",
      "Data mesh — a decentralized sociotechnical approach to analytical and operational data management",
      "Database sharding — splitting a single database across multiple servers for horizontal scalability"
    ],
    answer: 1,
    explanation: "Polyglot persistence means using different database technologies for different microservices based on their specific data needs. Transaction-heavy services use relational databases, caching layers use key-value stores, and search functionality uses document stores. This approach maximizes the strengths of each database technology but increases operational complexity.\n\nWhy other options are wrong:\n- A: Monolithic data architecture is the opposite; it uses a single shared database across all services\n- C: Data mesh is an organizational approach to analytical data; it is broader than database technology choice\n- D: Database sharding splits one database for scalability; polyglot persistence uses different database types\n\nReference: https://microservices.io/patterns/data/database-per-service.html",
    verify: null
  },
  {
    id: "s04-q085",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A PVC is in `Lost` state. What does this indicate, and what should the administrator do?",
    diagram: null,
    options: [
      "The PVC was never successfully created by the API server; the administrator should recreate it from YAML",
      "The PVC is transitioning between namespaces, which temporarily places it in the `Lost` phase during move",
      "The PVC exceeded its storage quota limit and was evicted by the resource quota controller in the cluster",
      "The PV bound to this PVC no longer exists; the administrator must investigate and provision replacement"
    ],
    answer: 3,
    explanation: "A PVC enters `Lost` state when its bound PV is deleted or becomes unavailable. This is a critical condition indicating data loss may have occurred. The administrator should investigate why the PV was removed (accidental deletion, storage backend failure, reclaim policy), assess data recovery options, and provision replacement storage.\n\nWhy other options are wrong:\n- A: Lost state is not a creation failure; it means the PV the PVC was bound to no longer exists\n- B: PVCs do not transition between namespaces; Lost indicates the bound PV is gone, not a migration state\n- C: Lost is not related to ResourceQuota eviction; it specifically indicates a missing bound PV\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#phase",
    verify: "kubectl get pvc --field-selector status.phase=Lost"
  },
  {
    id: "s04-q086",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod mounts a PVC backed by an NFS PV. The pod can read files but cannot write, receiving `Permission denied` errors. The NFS export allows read-write access. What is the most likely cause?",
    diagram: null,
    options: [
      "The PVC access mode is set to `ReadOnlyMany` which prevents write operations from the mounted container",
      "NFS export volumes default to read-only mounts in Kubernetes unless the PVC explicitly requests ReadWriteMany permissions",
      "The container runs as a non-root UID that lacks write permissions on the NFS export's file ownership",
      "The kubelet does not support write operations on NFS volumes mounted via the in-tree volume plugin"
    ],
    answer: 2,
    explanation: "NFS permission issues are commonly caused by UID/GID mismatches. The container process runs as a specific user (often non-root due to security contexts), but the NFS export's files are owned by a different UID. The NFS server enforces Unix permissions, so the container user must have matching ownership or appropriate group permissions to write.\n\nWhy other options are wrong:\n- A: Access mode affects PV-PVC binding, but the question states the pod is already running and reading works; the issue is OS-level permissions\n- B: NFS volumes are not always read-only in Kubernetes; they respect the access mode and NFS export settings\n- D: The kubelet fully supports read and write operations on NFS volumes via the in-tree plugin and CSI\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#nfs",
    verify: "kubectl exec <pod> -- id && kubectl exec <pod> -- ls -la /mnt/nfs/"
  },
  {
    id: "s04-q087",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A centralized logging system collects logs from all pods using a DaemonSet-based log collector (e.g., Fluentd). Logs from StatefulSet pods include the pod name, which contains the ordinal index. Why is this useful for debugging stateful workloads?",
    diagram: null,
    options: [
      "The ordinal is useful for pod scheduling decisions, but log collectors strip ordinal information before indexing",
      "The ordinal in the pod name correlates logs with specific replicas, helping debug per-instance issues",
      "The ordinal index is used by Fluentd to sort collected log entries in strict chronological timestamp order",
      "Fluentd uses the ordinal to determine log rotation frequency and maximum file size per replica instance"
    ],
    answer: 1,
    explanation: "StatefulSet pod names include the ordinal index (e.g., `mysql-0`, `mysql-1`), which is stable across restarts. This allows operators to filter logs by specific instance, track replica-specific issues (like replication lag on `mysql-2`), and correlate application logs with storage metrics for that particular pod's PVC.\n\nWhy other options are wrong:\n- A: Log collectors do not strip ordinal information; they preserve the full pod name (including ordinal) as metadata, which is essential for filtering and correlating logs by replica\n- C: Fluentd does not use ordinal index for sorting log entries; timestamps determine chronological order\n- D: Log rotation is configured by the container runtime or logging agent, not by StatefulSet ordinal indices\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id",
    verify: "kubectl logs <statefulset-pod-name>"
  },
  {
    id: "s04-q088",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster has nodes in three availability zones. A StatefulSet with 3 replicas needs to spread pods across zones for high availability. Which scheduling feature achieves this?",
    diagram: null,
    options: [
      "Set `nodeSelector` to a single zone and rely on the Kubernetes scheduler to auto-distribute across zones",
      "Use `topologySpreadConstraints` with `topologyKey: topology.kubernetes.io/zone` and `maxSkew: 1`",
      "Create three separate StatefulSets, one per availability zone, each managing a single Cassandra replica",
      "Set `podAntiAffinity` with `topologyKey: kubernetes.io/hostname` — this spreads pods across host nodes"
    ],
    answer: 1,
    explanation: "`topologySpreadConstraints` allow fine-grained control over how pods are distributed across topology domains. Setting `topologyKey: topology.kubernetes.io/zone` with `maxSkew: 1` ensures pods are evenly spread across availability zones. `podAntiAffinity` with `hostname` topology only prevents co-location on the same node, not zone-level distribution.\n\nWhy other options are wrong:\n- A: nodeSelector to a single zone places all pods in one zone; it does not distribute across zones\n- C: Three separate StatefulSets add management complexity and break the single-StatefulSet cluster model\n- D: podAntiAffinity with hostname topology prevents node co-location but does not ensure zone-level distribution\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    verify: "kubectl get pods -o wide -l app=<statefulset>"
  },
  {
    id: "s04-q089",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A container image includes a `VOLUME` instruction in the Dockerfile. When this container runs in Kubernetes without any volume mounts defined in the pod spec, what happens?",
    diagram: null,
    options: [
      "The runtime creates an anonymous `emptyDir`-like volume at the path, managed by the container runtime as a Kubernetes-tracked ephemeral volume attached to the pod lifecycle",
      "Kubernetes automatically creates a PersistentVolumeClaim for the VOLUME path declared in the image and binds it to a dynamically provisioned PV via the default StorageClass",
      "The VOLUME instruction is not translated into Kubernetes volume mounts \u2014 the container runtime may create anonymous bind mounts, but these are outside Kubernetes management",
      "The pod fails to start because no explicit volume is configured in the pod spec for the VOLUME path, and the kubelet rejects containers with unmatched VOLUME declarations"
    ],
    answer: 2,
    explanation: "In Kubernetes, the VOLUME instruction from a Dockerfile is not translated into Kubernetes-managed volume mounts. Kubernetes itself does not create PVs, PVCs, or emptyDir volumes for Dockerfile VOLUME paths. However, the container runtime (containerd) does create runtime-managed anonymous bind mounts for VOLUME paths, which exist outside Kubernetes\u2019s awareness. These runtime mounts are not visible as Kubernetes volumes and are not backed by PVs or PVCs. For persistent or shared storage in Kubernetes, volumes must be explicitly defined in the pod spec.\n\nWhy other options are wrong:\n- A: The runtime does create anonymous bind mounts, but these are runtime-managed, not Kubernetes emptyDir volumes\n- B: Kubernetes does not automatically create PVCs for VOLUME instructions in Dockerfiles\n- D: The pod does not fail to start; it runs normally regardless of whether explicit volumes are defined for those paths\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/",
    verify: null
  },
  {
    id: "s04-q090",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team evaluates etcd, the distributed key-value store used by Kubernetes. Which consistency model does etcd implement, and why is this important for Kubernetes?",
    diagram: null,
    options: [
      "Strongly consistent via the Raft consensus protocol, ensuring reads reflect the latest writes",
      "Eventually consistent — etcd prioritizes availability over consistency for better read throughput",
      "Causally consistent — only causally related operations are ordered while others are concurrent",
      "BASE (Basically Available, Soft state, Eventually consistent) — optimized for maximum throughput"
    ],
    answer: 0,
    explanation: "etcd uses the Raft consensus algorithm to provide strong consistency (linearizable reads and writes). This is critical for Kubernetes because cluster state (pod schedules, secrets, configurations) must be consistent across all control plane components. A stale read could cause the scheduler to make incorrect decisions or controllers to act on outdated state.\n\nWhy other options are wrong:\n- B: etcd prioritizes consistency over availability; it is a CP system in CAP theorem terms\n- C: Causal consistency is weaker than etcd's linearizable consistency guarantee\n- D: BASE is an eventual consistency model; etcd's Raft protocol provides strong consistency\n\nReference: https://etcd.io/docs/v3.5/learning/data_model/",
    verify: null
  },
  {
    id: "s04-q091",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An administrator creates a StorageClass with `mountOptions: [\"nfsvers=4.1\", \"hard\"]`. Where are these mount options applied?",
    diagram: null,
    options: [
      "On the node by the kubelet when mounting the PV, passed as options to the `mount` system call",
      "On the storage backend when creating new volumes as part of the `provisioner` workflow",
      "On the kube-apiserver when validating PVC requests and checking storage class parameter syntax",
      "On the PVC object as metadata annotations that describe preferred mount configuration options"
    ],
    answer: 0,
    explanation: "Mount options specified on a StorageClass (or directly on a PV) are passed by the kubelet to the `mount` system call when mounting the volume on the node. For NFS, options like `nfsvers=4.1` and `hard` control the NFS protocol version and retry behavior. Invalid mount options cause the mount to fail, leaving the pod in `ContainerCreating` state.\n\nWhy other options are wrong:\n- B: Mount options are not passed to the storage backend during provisioning; they are used at mount time\n- C: The API server does not use mount options for validation; they are consumed by the kubelet at mount time\n- D: Mount options are not stored as PVC annotations; they are applied by the kubelet when mounting the volume\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#mount-options",
    verify: "kubectl get storageclass <name> -o jsonpath='{.mountOptions}'"
  },
  {
    id: "s04-q092",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps workflow using Argo CD manages a StatefulSet with PVCs. The team needs to migrate data from one StorageClass to another. Since `volumeClaimTemplates` are immutable, what is the recommended GitOps-compatible approach?",
    diagram: null,
    options: [
      "Directly edit the live StatefulSet in the cluster, bypassing GitOps to apply the storage migration changes",
      "Create a migration Job to copy data, deploy a new StatefulSet with the new StorageClass, then clean up",
      "Delete all PVCs and let Argo CD recreate them with the new StorageClass on the next synchronization cycle",
      "Change the StorageClass's provisioner setting — this migrates all existing PVCs to the new storage backend"
    ],
    answer: 1,
    explanation: "Since `volumeClaimTemplates` are immutable, a GitOps-compatible migration involves: creating a data copy Job, defining a new StatefulSet (or recreating the existing one) with the updated StorageClass in Git, and cleaning up old resources. All changes go through Git, maintaining the GitOps single-source-of-truth principle. Direct cluster edits violate GitOps workflows.\n\nWhy other options are wrong:\n- A: Directly editing live resources bypasses GitOps principles of declarative, Git-driven configuration\n- C: Deleting all PVCs causes data loss; PVCs do not get recreated by Argo CD with new settings\n- D: Changing StorageClass provisioner does not migrate existing PVCs; provisioner changes only affect new PVs\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get statefulset,pvc -l app=<name>"
  },
  {
    id: "s04-q093",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet with `revisionHistoryLimit: 5` has been updated 8 times. How many ControllerRevision objects are retained?",
    diagram: null,
    options: [
      "Only the current revision is retained; all previous revisions are immediately deleted after updates",
      "All 9 revisions are retained because revisionHistoryLimit applies to Deployment ReplicaSets, not StatefulSets",
      "6 ControllerRevision objects are retained (5 historical plus the current); the 3 oldest are garbage collected",
      "StatefulSets do not use ControllerRevision objects; they track updates via pod template hashes"
    ],
    answer: 2,
    explanation: "StatefulSets use ControllerRevision objects to track revision history. The revisionHistoryLimit field (default 10) controls how many non-current (historical) revisions are retained. With a limit of 5 and 9 total revisions (1 initial + 8 updates), Kubernetes keeps 5 historical revisions plus the current one (6 total), garbage collecting the 3 oldest. This is analogous to revisionHistoryLimit on Deployments with ReplicaSets.\n\nWhy other options are wrong:\n- A: The revisionHistoryLimit allows retaining multiple historical revisions, not just the current one\n- B: Kubernetes garbage collects old ControllerRevisions beyond the limit; it does not retain all indefinitely\n- D: StatefulSets do use ControllerRevision objects to track revision history, unlike Deployments which use ReplicaSets\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#revision-history-limit",
    verify: "kubectl get controllerrevision -l app=<statefulset>"
  },
  {
    id: "s04-q094",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A team runs multiple StatefulSets across several namespaces, each with dynamically provisioned PVCs. To track storage costs per team, which approach is most effective?",
    diagram: null,
    options: [
      "Monitor total cluster storage costs without any per-team breakdown or allocation tracking in the system",
      "Use PVC labels with a cost tool like Kubecost that maps storage usage to teams via namespace or labels",
      "Assign each team a fixed storage budget with no actual tracking or enforcement of usage against limits",
      "Rely on the cloud provider's billing dashboard, which automatically groups charges by K8s namespace"
    ],
    answer: 1,
    explanation: "Tools like Kubecost integrate with Kubernetes to track storage costs by namespace, label, or other dimensions. By labeling PVCs with team ownership information, organizations can allocate actual storage costs to specific teams. Cloud provider billing shows total disk costs but typically does not map them back to Kubernetes PVCs or namespaces automatically.\n\nWhy other options are wrong:\n- A: Monitoring total cost without per-team breakdown does not support team-level cost allocation or accountability\n- C: Fixed budgets without tracking or enforcement do not provide visibility into actual storage consumption\n- D: Cloud provider billing dashboards typically do not automatically map disk charges to Kubernetes namespaces\n\nReference: https://www.kubecost.com/",
    verify: null
  },
  {
    id: "s04-q095",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A StorageClass has `reclaimPolicy: Delete`. When a PVC using this StorageClass is deleted, what happens to the dynamically provisioned PV and its underlying storage?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="15" width="130" height="45" rx="5" fill="#E8F0FE" stroke="#326CE5" stroke-width="2"/><text x="95" y="42" text-anchor="middle" font-size="12" fill="#333">PVC (Bound)</text><rect x="230" y="15" width="130" height="45" rx="5" fill="#FFF3CD" stroke="#FFC107" stroke-width="2"/><text x="295" y="42" text-anchor="middle" font-size="12" fill="#333">PV (Bound)</text><line x1="160" y1="37" x2="230" y2="37" stroke="#326CE5" stroke-width="2"/><text x="60" y="90" text-anchor="middle" font-size="22" fill="#CC0000">X</text><text x="95" y="95" text-anchor="middle" font-size="11" fill="#CC0000">PVC Deleted</text><line x1="130" y1="90" x2="230" y2="90" stroke="#CC0000" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrowR)"/><rect x="230" y="75" width="130" height="35" rx="5" fill="#F8D7DA" stroke="#CC0000" stroke-width="2"/><text x="295" y="97" text-anchor="middle" font-size="11" fill="#CC0000">PV ???</text><line x1="295" y1="110" x2="295" y2="140" stroke="#CC0000" stroke-width="2" stroke-dasharray="4,2"/><rect x="220" y="140" width="150" height="35" rx="5" fill="#F8D7DA" stroke="#CC0000"/><text x="295" y="162" text-anchor="middle" font-size="10" fill="#CC0000">Cloud Disk ???</text></svg>',
    options: [
      "The PV is retained in `Released` state for manual cleanup by a cluster administrator at a later time",
      "Both the PV object and underlying storage resource (e.g., cloud disk) are automatically deleted",
      "The PV is deleted but the underlying cloud disk is preserved and must be cleaned up manually after",
      "The PV transitions to `Available` state for reuse by another PVC that matches its access modes"
    ],
    answer: 1,
    explanation: "With the `Delete` reclaim policy, deleting a PVC triggers the deletion of both the PV object in Kubernetes and the underlying storage asset (e.g., AWS EBS volume, GCP persistent disk). This ensures no orphaned storage resources accumulate. For data that must survive PVC deletion, use the `Retain` reclaim policy instead.\n\nWhy other options are wrong:\n- A: The Retain policy preserves the PV in Released state; the Delete policy removes both PV and storage\n- C: The Delete policy removes the underlying cloud disk alongside the PV object, not just the PV\n- D: The Delete policy does not make the PV Available for reuse; both PV and storage are permanently removed\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#delete",
    verify: "kubectl get pv"
  },
  {
    id: "s04-q096",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A Kubernetes cluster runs version 1.29 and supports the `ReadWriteOncePod` access mode. How does `ReadWriteOncePod` differ from `ReadWriteOnce`?",
    diagram: null,
    options: [
      "They are identical; `ReadWriteOncePod` is just an alias for the `ReadWriteOnce` access mode in the API",
      "`ReadWriteOncePod` allows multiple pods to mount the volume but only one pod at a time can write to it",
      "`ReadWriteOncePod` targets ephemeral CSI volumes and has limited integration with PersistentVolumeClaim workflows",
      "`ReadWriteOncePod` restricts the volume to exactly one pod across the entire cluster, not just one node"
    ],
    answer: 3,
    explanation: "`ReadWriteOnce` (RWO) restricts the volume to a single node, but multiple pods on that node can mount it. `ReadWriteOncePod` (RWOP), GA since Kubernetes 1.29, restricts the volume to exactly one pod across the entire cluster. This is important for workloads that require exclusive access, such as databases that use file-level locking.\n\nWhy other options are wrong:\n- A: ReadWriteOncePod and ReadWriteOnce are distinct; RWOP restricts to a single pod while RWO restricts to a single node\n- B: ReadWriteOncePod allows only one pod to access the volume, not multiple pods with one writer\n- C: ReadWriteOncePod works with PersistentVolumeClaims via CSI drivers; it is not limited to ephemeral volumes\n\nReference: https://kubernetes.io/blog/2023/12/18/read-write-once-pod-access-mode-ga/",
    verify: "kubectl get pv -o jsonpath='{.items[*].spec.accessModes}'"
  },
  {
    id: "s04-q097",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team deploying serverless functions on Kubernetes needs temporary storage for processing intermediate results during function execution. The data does not need to persist between invocations. Which storage approach is best?",
    diagram: null,
    options: [
      "A PersistentVolumeClaim with `ReadWriteMany` access mode for shared data across function instances",
      "An `emptyDir` volume providing ephemeral storage tied to the pod lifecycle for temp results",
      "A `hostPath` volume pointing to the node's `/tmp` directory for fast local temporary file storage",
      "An NFS volume shared across all function instances for centralized intermediate result management"
    ],
    answer: 1,
    explanation: "For serverless functions that need temporary scratch space, `emptyDir` is ideal. It is created when the pod starts and cleaned up when the pod terminates, matching the ephemeral nature of serverless invocations. PVCs add unnecessary overhead and complexity. `hostPath` introduces security and portability concerns.\n\nWhy other options are wrong:\n- A: PVCs with ReadWriteMany add unnecessary overhead for temporary data that does not need to persist\n- C: hostPath introduces security risks and portability concerns; it is not recommended for temporary storage\n- D: NFS adds network complexity for simple ephemeral scratch space needed only during function execution\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes}'"
  },
  {
    id: "s04-q098",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A team managing a Redis Sentinel StatefulSet wants to speed up rolling updates by allowing more than one pod to be updated at the same time. Which StatefulSet parameter controls update parallelism?",
    diagram: null,
    options: [
      "`spec.minReadySeconds` — ensures each pod is ready for a specified duration before the rolling update proceeds",
      "`spec.updateStrategy.rollingUpdate.maxUnavailable: 2` — allows two pods to be updated simultaneously during the rollout",
      "`spec.replicas: 3` — the replica count itself ensures availability by maintaining the desired pod count",
      "`spec.revisionHistoryLimit` — controls how many old ControllerRevision objects are kept after each update"
    ],
    answer: 1,
    explanation: "Note: `maxUnavailable` for StatefulSets is an alpha feature (as of Kubernetes 1.32) gated behind the `MaxUnavailableStatefulSet` feature gate, which is disabled by default.\n\nThe `maxUnavailable` field for StatefulSet rolling updates was introduced as an alpha feature in Kubernetes 1.24, gated behind the `MaxUnavailableStatefulSet` feature gate. Because it is feature-gated, the cluster administrator must explicitly enable it for the field to take effect. While the default rolling update strategy updates one pod at a time, `maxUnavailable` is the only parameter that lets you explicitly control update parallelism in a StatefulSet spec. Setting `maxUnavailable: 2` allows two pods to be updated simultaneously, speeding up rollouts at the cost of reduced availability during the update window. On clusters where the feature gate is not enabled, this field is silently ignored.\n\nWhy other options are wrong:\n- A: minReadySeconds controls how long a pod must be ready before proceeding, not the maximum unavailable count\n- C: The replica count defines how many pods should run, not how many can be unavailable during updates\n- D: revisionHistoryLimit controls retained ControllerRevision objects, not update parallelism\n\nReference: https://kubernetes.io/blog/2022/05/27/maxunavailable-for-statefulset/",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.updateStrategy}'"
  },
  {
    id: "s04-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer defines a `StorageClass` with `parameters.type: gp3` and `parameters.iops: \"5000\"` for an AWS EBS CSI driver. What do these parameters control?",
    diagram: null,
    options: [
      "The Kubernetes scheduler's disk I/O priority for pods using this StorageClass for their volume claims",
      "The maximum I/O rate that the `kubelet` allows for volume operations performed on the mounted PV path",
      "The provisioned cloud disk characteristics — `gp3` sets the EBS volume type and `iops` sets the IOPS",
      "The replication factor for the PV across availability zones managed by the EBS CSI driver controller"
    ],
    answer: 2,
    explanation: "StorageClass `parameters` are passed directly to the CSI provisioner, which uses them when creating the underlying storage. For the AWS EBS CSI driver, `type: gp3` creates a gp3 EBS volume, and `iops: \"5000\"` provisions 5000 IOPS. These are cloud-provider-specific settings that the CSI driver translates into API calls to the storage backend.\n\nWhy other options are wrong:\n- A: The scheduler does not have a disk I/O priority mechanism controlled by StorageClass parameters\n- B: The kubelet does not enforce I/O rate limits based on StorageClass parameters; IOPS is a cloud disk setting\n- D: StorageClass parameters like type and iops configure the disk itself, not cross-zone replication\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters",
    verify: "kubectl get storageclass <name> -o jsonpath='{.parameters}'"
  },
  {
    id: "s04-q100",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart deploys a StatefulSet with a PVC. The chart includes a `pre-delete` hook that backs up data before uninstalling. The hook Job writes a snapshot to an S3 bucket. If the hook Job fails, what happens to the Helm release?",
    diagram: null,
    options: [
      "The release is uninstalled anyway, with all resources deleted regardless of the hook failure status",
      "The uninstall is aborted; the release and all resources remain intact until the hook is resolved",
      "Helm deletes the StatefulSet but keeps the PVCs to preserve data in case of hook failure events",
      "Helm retries the hook indefinitely using exponential backoff until it eventually succeeds or times out"
    ],
    answer: 1,
    explanation: "Helm hooks follow a strict lifecycle. If a `pre-delete` hook Job fails, Helm aborts the uninstall process and the release remains in its current state. This is a safety mechanism: since the backup did not complete successfully, proceeding with deletion could result in data loss. The operator must investigate the hook failure and either fix it or manually delete the release.\n\nWhy other options are wrong:\n- A: Helm does not proceed with uninstall if a pre-delete hook fails; it aborts to protect data\n- C: Helm does not selectively delete resources; the entire uninstall is aborted on hook failure\n- D: Helm does not retry hooks with exponential backoff; the hook runs once and its failure aborts the operation\n\nReference: https://helm.sh/docs/topics/charts_hooks/",
    verify: "helm list && kubectl get jobs -l helm.sh/hook=pre-delete"
  }
];

var labExercises = [
  {
    title: "Lab 1: Creating a PersistentVolume and PersistentVolumeClaim",
    description: "In this lab you will manually create a PersistentVolume backed by a hostPath, create a PersistentVolumeClaim to bind to it, and verify the binding lifecycle.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: lab-pv\n  labels:\n    type: local\nspec:\n  capacity:\n    storage: 5Gi\n  accessModes:\n    - ReadWriteOnce\n  persistentVolumeReclaimPolicy: Retain\n  hostPath:\n    path: /tmp/lab-pv-data\nEOF",
      "<span class='prompt'>$</span> kubectl get pv lab-pv",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: lab-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 3Gi\n  selector:\n    matchLabels:\n      type: local\nEOF",
      "<span class='prompt'>$</span> kubectl get pv,pvc",
      "<span class='prompt'>$</span> kubectl delete pvc lab-pvc",
      "<span class='prompt'>$</span> kubectl get pv lab-pv -o jsonpath='{.status.phase}'",
      "<span class='prompt'>$</span> kubectl delete pv lab-pv"
    ],
    expectedOutput: "After creating the PV, it should show status `Available`. After creating the PVC, both PV and PVC should show `Bound`. After deleting the PVC, the PV should show `Released` because of the `Retain` reclaim policy. The PV retains its data and must be manually deleted or cleaned up to be reused."
  },
  {
    title: "Lab 2: Deploying a StatefulSet with volumeClaimTemplates",
    description: "Deploy a StatefulSet with volumeClaimTemplates to understand how each replica gets its own dedicated PVC and how the naming convention works.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-headless\nspec:\n  clusterIP: None\n  selector:\n    app: web\n  ports:\n    - port: 80\n---\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: web\nspec:\n  serviceName: web-headless\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.25\n          volumeMounts:\n            - name: data\n              mountPath: /usr/share/nginx/html\n  volumeClaimTemplates:\n    - metadata:\n        name: data\n      spec:\n        accessModes: [\"ReadWriteOnce\"]\n        resources:\n          requests:\n            storage: 1Gi\nEOF",
      "<span class='prompt'>$</span> kubectl get statefulset web",
      "<span class='prompt'>$</span> kubectl get pods -l app=web --sort-by=.metadata.name",
      "<span class='prompt'>$</span> kubectl get pvc -l app=web",
      "<span class='prompt'>$</span> kubectl exec web-0 -- bash -c 'echo \"Hello from web-0\" > /usr/share/nginx/html/index.html'",
      "<span class='prompt'>$</span> kubectl delete pod web-0",
      "<span class='prompt'>$</span> kubectl exec web-0 -- cat /usr/share/nginx/html/index.html",
      "<span class='prompt'>$</span> kubectl delete statefulset web && kubectl delete svc web-headless",
      "<span class='prompt'>$</span> kubectl get pvc -l app=web"
    ],
    expectedOutput: "Pods are created in order: web-0, web-1, web-2. PVCs are named data-web-0, data-web-1, data-web-2. After deleting and recreating web-0, the file written earlier is still present because the PVC persists. After deleting the StatefulSet, PVCs remain and must be manually deleted."
  },
  {
    title: "Lab 3: Working with emptyDir and hostPath Volumes",
    description: "Create pods that use emptyDir and hostPath volumes to understand their lifecycle and data persistence characteristics.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: emptydir-pod\nspec:\n  containers:\n    - name: writer\n      image: busybox\n      command: ['sh', '-c', 'echo \"data from writer\" > /shared/data.txt && sleep 3600']\n      volumeMounts:\n        - name: shared\n          mountPath: /shared\n    - name: reader\n      image: busybox\n      command: ['sh', '-c', 'sleep 5 && cat /shared/data.txt && sleep 3600']\n      volumeMounts:\n        - name: shared\n          mountPath: /shared\n  volumes:\n    - name: shared\n      emptyDir: {}\nEOF",
      "<span class='prompt'>$</span> kubectl exec emptydir-pod -c reader -- cat /shared/data.txt",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: tmpfs-pod\nspec:\n  containers:\n    - name: app\n      image: busybox\n      command: ['sh', '-c', 'df -h /cache && sleep 3600']\n      volumeMounts:\n        - name: cache\n          mountPath: /cache\n  volumes:\n    - name: cache\n      emptyDir:\n        medium: Memory\n        sizeLimit: 64Mi\nEOF",
      "<span class='prompt'>$</span> kubectl logs tmpfs-pod",
      "<span class='prompt'>$</span> kubectl delete pod emptydir-pod tmpfs-pod"
    ],
    expectedOutput: "The reader container sees the file written by the writer container via the shared emptyDir. The tmpfs-pod shows `/cache` mounted as a tmpfs filesystem. When pods are deleted, all emptyDir data is lost permanently."
  },
  {
    title: "Lab 4: Understanding StorageClass and Dynamic Provisioning",
    description: "Examine the default StorageClass in your cluster, create a custom StorageClass, and observe dynamic provisioning in action.",
    commands: [
      "<span class='prompt'>$</span> kubectl get storageclass",
      "<span class='prompt'>$</span> kubectl describe storageclass",
      "<span class='prompt'>$</span> kubectl get storageclass -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.provisioner}{\"\\t\"}{.reclaimPolicy}{\"\\t\"}{.volumeBindingMode}{\"\\n\"}{end}'",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: fast-local\nprovisioner: kubernetes.io/no-provisioner\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Retain\nEOF",
      "<span class='prompt'>$</span> kubectl get storageclass fast-local -o yaml",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: dynamic-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 1Gi\nEOF",
      "<span class='prompt'>$</span> kubectl get pvc dynamic-pvc",
      "<span class='prompt'>$</span> kubectl describe pvc dynamic-pvc",
      "<span class='prompt'>$</span> kubectl delete pvc dynamic-pvc && kubectl delete storageclass fast-local"
    ],
    expectedOutput: "The default StorageClass (marked with `(default)`) is shown with its provisioner and reclaim policy. The custom `fast-local` StorageClass uses `no-provisioner` (manual provisioning). The `dynamic-pvc` uses the default StorageClass. If a dynamic provisioner exists, a PV is automatically created and bound. Otherwise, the PVC stays `Pending`."
  },
  {
    title: "Lab 5: Testing Volume Access Modes",
    description: "Create PVs with different access modes and verify how Kubernetes enforces them by attempting various mount scenarios.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: rwo-pv\nspec:\n  capacity:\n    storage: 2Gi\n  accessModes:\n    - ReadWriteOnce\n  hostPath:\n    path: /tmp/rwo-data\n  persistentVolumeReclaimPolicy: Delete\n---\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: rwo-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: \"\"\nEOF",
      "<span class='prompt'>$</span> kubectl get pv,pvc",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: rwo-pod-1\nspec:\n  containers:\n    - name: app\n      image: busybox\n      command: ['sh', '-c', 'echo pod1 > /data/pod1.txt && sleep 3600']\n      volumeMounts:\n        - name: storage\n          mountPath: /data\n  volumes:\n    - name: storage\n      persistentVolumeClaim:\n        claimName: rwo-pvc\nEOF",
      "<span class='prompt'>$</span> kubectl get pod rwo-pod-1",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: rwx-request\nspec:\n  accessModes:\n    - ReadWriteMany\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: \"\"\nEOF",
      "<span class='prompt'>$</span> kubectl get pvc rwx-request",
      "<span class='prompt'>$</span> kubectl describe pvc rwx-request",
      "<span class='prompt'>$</span> kubectl delete pod rwo-pod-1 && kubectl delete pvc rwo-pvc rwx-request && kubectl delete pv rwo-pv"
    ],
    expectedOutput: "The `rwo-pvc` binds to `rwo-pv` successfully. The pod mounts and writes data. The `rwx-request` PVC stays in `Pending` state because no PV supports `ReadWriteMany`. This demonstrates that access modes are enforced during PV-PVC binding and prevent mismatched configurations."
  },
  {
    title: "Lab 6: Examining PV Reclaim Policies",
    description: "Create PVs with different reclaim policies (Retain and Delete) and observe what happens to each PV when their bound PVCs are deleted.",
    commands: [
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: retain-pv\nspec:\n  capacity:\n    storage: 1Gi\n  accessModes: [ReadWriteOnce]\n  persistentVolumeReclaimPolicy: Retain\n  hostPath:\n    path: /tmp/retain-data\n---\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: delete-pv\nspec:\n  capacity:\n    storage: 1Gi\n  accessModes: [ReadWriteOnce]\n  persistentVolumeReclaimPolicy: Delete\n  hostPath:\n    path: /tmp/delete-data\nEOF",
      "<span class='prompt'>$</span> kubectl get pv",
      "<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: retain-pvc\nspec:\n  accessModes: [ReadWriteOnce]\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: \"\"\n  selector:\n    matchLabels: {}\n  volumeName: retain-pv\n---\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: delete-pvc\nspec:\n  accessModes: [ReadWriteOnce]\n  resources:\n    requests:\n      storage: 1Gi\n  storageClassName: \"\"\n  volumeName: delete-pv\nEOF",
      "<span class='prompt'>$</span> kubectl get pv,pvc",
      "<span class='prompt'>$</span> kubectl delete pvc retain-pvc",
      "<span class='prompt'>$</span> kubectl get pv retain-pv -o jsonpath='Phase: {.status.phase}'",
      "<span class='prompt'>$</span> kubectl delete pvc delete-pvc",
      "<span class='prompt'>$</span> kubectl get pv",
      "<span class='prompt'>$</span> kubectl patch pv retain-pv -p '{\"spec\":{\"claimRef\":null}}'",
      "<span class='prompt'>$</span> kubectl get pv retain-pv -o jsonpath='Phase: {.status.phase}'",
      "<span class='prompt'>$</span> kubectl delete pv retain-pv"
    ],
    expectedOutput: "Both PVCs bind to their respective PVs. After deleting `retain-pvc`, the `retain-pv` enters `Released` state but is NOT deleted. After deleting `delete-pvc`, the `delete-pv` is automatically deleted (for hostPath, the PV object is removed but the directory may remain). Patching `retain-pv` to remove the `claimRef` transitions it back to `Available`."
  }
];
