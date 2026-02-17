var EXAM_SET = 10;
var EXAM_TITLE = "KCNA Practice Exam - Set 10: Advanced Mixed Scenarios";
var questions = [
  {
    id: "s10-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet running PostgreSQL replicas uses `volumeClaimTemplates` with a StorageClass that has `reclaimPolicy: Delete`. A developer scales the StatefulSet from 5 to 3 replicas. What happens to the PersistentVolumeClaims (PVCs) associated with the deleted pods?",
    diagram: null,
    options: [
      "A. The PVCs for replicas 3 and 4 are automatically deleted along with the backing PersistentVolumes by the controller",
      "B. The PVCs are orphaned and the StorageClass reclaim policy immediately triggers deletion of the associated PVs",
      "C. The PVCs are marked with a `deletionTimestamp` but remain in the namespace until the StatefulSet is fully deleted",
      "D. The PVCs remain intact and must be manually deleted; underlying PVs are reclaimed only after PVC deletion"
    ],
    answer: 3,
    explanation: "When a StatefulSet is scaled down, Kubernetes does **not** automatically delete the PVCs created by `volumeClaimTemplates`. This is by design to prevent accidental data loss. The PVCs for the removed replicas persist and must be manually deleted by an administrator. Only after a PVC is explicitly deleted does the StorageClass `reclaimPolicy` determine what happens to the underlying PV.\n\nWhy other options are wrong:\n- A: StatefulSet controller does NOT auto-delete PVCs on scale-down; PVCs are retained by design to prevent data loss\n- B: PVCs are not orphaned in the traditional sense; they remain owned but unused, and the reclaim policy only triggers after PVC deletion, not immediately\n- C: PVCs are not marked with a deletionTimestamp; they persist fully intact without any deletion marker until explicitly removed\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage",
    verify: "kubectl get pvc -l app=postgresql --sort-by=.metadata.name"
  },
  {
    id: "s10-q002",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "You configure a Pod Security Admission controller in `enforce` mode with the `restricted` profile at the namespace level. A Deployment specifies `securityContext.runAsNonRoot: true` and `allowPrivilegeEscalation: false` but omits the `seccompProfile` field. What is the result when the Deployment is applied?",
    diagram: null,
    options: [
      "A. The Deployment is created but all pods remain in `Pending` state until a valid seccomp profile is explicitly added to the spec",
      "B. The Deployment is rejected at admission because the `restricted` profile mandates a `seccompProfile` of `RuntimeDefault` or `Localhost`",
      "C. The Deployment object is created, but the `ReplicaSet` fails to create pods because of the missing seccomp profile field",
      "D. The pods are created with a default `RuntimeDefault` seccomp profile automatically injected by the Pod Security Admission controller"
    ],
    answer: 2,
    explanation: "Under Pod Security Admission in `enforce` mode with the `restricted` profile, the `seccompProfile` must be explicitly set to `RuntimeDefault` or `Localhost`. The Deployment object itself is created (it is not a pod-level resource), but when the ReplicaSet controller attempts to create pods, those pods are rejected by the admission controller. This results in the ReplicaSet logging creation failures while the Deployment appears to exist normally.\n\nWhy other options are wrong:\n- A: Pods are not created in Pending state; they are rejected at admission entirely by the PSA controller, never reaching the scheduler\n- B: The Deployment object itself is not rejected because PSA operates at the pod level, not on Deployment resources\n- D: PSA does not inject or modify seccomp profiles; it only validates and rejects non-compliant pods\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
    verify: "kubectl get events -n <namespace> --field-selector reason=FailedCreate"
  },
  {
    id: "s10-q003",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "An organization migrates a monolithic application to microservices. Service A calls Service B synchronously via HTTP REST. Under load, Service B becomes slow, causing Service A to exhaust its connection pool and cascade failures to Service C which depends on A. Which combination of patterns best prevents this cascading failure?",
    diagram: "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='70' width='80' height='40' rx='6' fill='#326CE5' stroke='#fff' stroke-width='1.5'/><text x='50' y='95' text-anchor='middle' fill='#fff' font-size='12'>Service A</text><rect x='160' y='70' width='80' height='40' rx='6' fill='#326CE5' stroke='#fff' stroke-width='1.5'/><text x='200' y='95' text-anchor='middle' fill='#fff' font-size='12'>Service B</text><rect x='160' y='150' width='80' height='40' rx='6' fill='#326CE5' stroke='#fff' stroke-width='1.5'/><text x='200' y='175' text-anchor='middle' fill='#fff' font-size='12'>Service C</text><line x1='90' y1='90' x2='155' y2='90' stroke='#f44' stroke-width='2' marker-end='url(#arr)'/><text x='122' y='82' text-anchor='middle' fill='#f44' font-size='9'>slow</text><line x1='50' y1='110' x2='155' y2='165' stroke='#4CAF50' stroke-width='2' marker-end='url(#arr)'/><text x='80' y='148' fill='#4CAF50' font-size='9'>depends</text><rect x='280' y='30' width='110' height='80' rx='6' fill='#1a1a2e' stroke='#f44' stroke-width='1.5' stroke-dasharray='4'/><text x='335' y='55' text-anchor='middle' fill='#f44' font-size='10'>Cascade</text><text x='335' y='72' text-anchor='middle' fill='#f44' font-size='10'>Failure Zone</text><text x='335' y='89' text-anchor='middle' fill='#f44' font-size='10'>A + C down</text><defs><marker id='arr' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><path d='M0,0 L8,3 L0,6Z' fill='#ccc'/></marker></defs></svg>",
    options: [
      "A. Rate limiting on Service B ingress combined with retry logic using exponential backoff in Service A",
      "B. Circuit breaker in Service A for calls to B, combined with bulkhead isolation to protect calls to C",
      "C. Asynchronous messaging between all three services with a persistent dead-letter queue for failures",
      "D. Increasing the connection pool size in Service A and adding horizontal pod autoscaling to Service B"
    ],
    answer: 1,
    explanation: "A circuit breaker in Service A prevents it from continuously calling a degraded Service B, allowing A to fail fast or return cached/default responses. Bulkhead isolation ensures that the connection pool exhaustion from B calls does not affect A's ability to serve requests to or from Service C. Together these patterns contain the failure. Option D only delays the cascade; option A helps but does not isolate C; option C is a complete redesign, not a targeted prevention.\n\nWhy other options are wrong:\n- A: Rate limiting on B helps but does not isolate A's connection pool from affecting C; lacks bulkhead isolation\n- C: Full async redesign is not a targeted prevention pattern; it requires a complete architecture overhaul\n- D: Increasing connection pool and adding HPA only delays the cascade; does not break the failure propagation chain\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    verify: null
  },
  {
    id: "s10-q004",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster has three nodes labeled `zone=us-east-1a`, `zone=us-east-1b`, and `zone=us-east-1c`. A Deployment with 3 replicas specifies `topologySpreadConstraints` with `maxSkew: 1`, `topologyKey: zone`, `whenUnsatisfiable: DoNotSchedule`, and `nodeTaintsPolicy: Ignore`. Node `us-east-1c` becomes `NotReady`. When the Deployment is scaled to 6 replicas, how are the new pods distributed?",
    diagram: null,
    options: [
      "A. 3 pods on `us-east-1a` and 3 on `us-east-1b`; the topology constraint is satisfied across the two available zones",
      "B. 2 pods on us-east-1a, 2 on us-east-1b, and 2 are Pending because scheduling on us-east-1c would violate the skew",
      "C. 3 pods on each available zone; the NotReady node us-east-1c is excluded from the topology skew calculation entirely",
      "D. 5 pods run across three zones and 1 remains Pending because `maxSkew: 1` includes the unavailable zone in its skew calculation"
    ],
    answer: 3,
    explanation: "With `nodeTaintsPolicy: Ignore`, the scheduler includes tainted (NotReady) nodes in the topology spread calculation even though pods cannot be scheduled there. The original 3 replicas were distributed 1 per zone. When us-east-1c goes NotReady, its pod still counts in the skew calculation. With `maxSkew: 1` and `DoNotSchedule`, the scheduler can place pods on zones a and b until each has 2 pods (skew of 2\u22121=1, within maxSkew). This yields 2+2+1=5 running pods. The 6th pod cannot be scheduled on any healthy zone without exceeding maxSkew (that would create a skew of 3\u22121=2), so 1 pod remains Pending. Note: since K8s 1.27, the default `nodeTaintsPolicy` is `Honor`, which would exclude the NotReady zone and allow 3+3 distribution across the two healthy zones.\n\nWhy other options are wrong:\n- A: With nodeTaintsPolicy: Ignore, the NotReady zone is included in skew calculation, preventing a 3-3 split; maxSkew:1 would be violated\n- B: Two pods are not Pending; the scheduler can still place pods on healthy zones up to the skew limit (2 per zone)\n- C: nodeTaintsPolicy: Ignore means the NotReady node is NOT excluded from calculation; it is still counted in the topology domain\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/#node-taints-policy",
    verify: "kubectl get pods -o wide --sort-by=.spec.nodeName && kubectl get nodes --show-labels"
  },
  {
    id: "s10-q005",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A microservices application uses OpenTelemetry for distributed tracing with a Jaeger backend. Service A (Go) calls Service B (Python) via gRPC. Traces show that spans from Service B are appearing as separate root traces instead of being children of Service A's spans. What is the most likely cause?",
    diagram: null,
    options: [
      "D. Service B's OpenTelemetry SDK is not extracting trace context headers from the incoming gRPC metadata",
      "B. Service A and B use different OpenTelemetry SDK versions, causing incompatible span ID format encodings",
      "C. The gRPC protocol does not support W3C Trace Context propagation natively and requires a custom carrier",
      "A. The Jaeger collector is dropping spans because of sampling rate limits configured at the agent collection level"
    ],
    answer: 0,
    explanation: "When spans appear as disconnected root traces, the most common cause is that the downstream service is not properly extracting context propagation headers from the incoming request. In gRPC, trace context (such as W3C `traceparent`) is propagated via metadata. If Service B's SDK is not configured with the correct propagator or is missing context extraction middleware, it will start new traces. gRPC fully supports standard trace context propagation, and SDK version mismatches do not typically cause this specific symptom.\n\nWhy other options are wrong:\n- B: Different SDK versions do not typically cause disconnected root traces; they use standardized propagation formats like W3C TraceContext\n- C: gRPC fully supports W3C Trace Context propagation via metadata; no custom carrier is needed\n- A: Jaeger sampling drops entire traces, not individual spans; dropped spans would not appear as separate root traces\n\nReference: https://opentelemetry.io/docs/concepts/context-propagation/",
    verify: null
  },
  {
    id: "s10-q006",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service of type `ClusterIP` with `sessionAffinity: ClientIP` is configured with `sessionAffinityConfig.clientIP.timeoutSeconds: 10800`. The backend Deployment has 4 replicas behind this Service. A client pod makes requests every 2 seconds. After a rolling update replaces all backend pods, what happens to the client's session affinity?",
    diagram: null,
    options: [
      "A. Session affinity is preserved because `kube-proxy` migrates the affinity mapping to the new replacement pod endpoint",
      "B. Requests fail with connection refused until the `timeoutSeconds` expires and the client IP affinity table is refreshed",
      "C. The affinity is broken when the old endpoint is removed; the next request is balanced to a new pod with fresh affinity",
      "D. The session affinity entry is migrated to the replacement pod automatically by the EndpointSlice controller on update"
    ],
    answer: 2,
    explanation: "Session affinity in Kubernetes maps a client IP to a specific backend endpoint (pod IP). During a rolling update, when the original pod is terminated and its endpoint removed, the affinity entry becomes stale. On the next request, `kube-proxy` detects the invalid endpoint and selects a new backend pod via its load-balancing algorithm, creating a new affinity binding. There is no mechanism to migrate affinity entries between pods.\n\nWhy other options are wrong:\n- A: kube-proxy does not migrate affinity mappings; there is no mechanism to transfer affinity entries between pod endpoints\n- B: Requests do not fail with connection refused; kube-proxy detects the stale endpoint and selects a new backend immediately\n- D: The EndpointSlice controller does not handle session affinity migration; it only manages endpoint sets\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/#session-affinity",
    verify: "kubectl describe svc <service-name> | grep -A5 'Session Affinity'"
  },
  {
    id: "s10-q007",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A Pod uses an `emptyDir` volume with `medium: Memory` and `sizeLimit: 256Mi`. The container writes 300Mi of data to this volume. What is the expected behavior?",
    diagram: null,
    options: [
      "A. The write succeeds but the pod is evicted by the kubelet when it detects the volume exceeds its size limit",
      "B. The write operation fails with an I/O error at the 256Mi boundary, behaving like a full filesystem on disk",
      "C. The pod continues running since `sizeLimit` on memory-backed `emptyDir` volumes is advisory, not enforced",
      "D. The container is OOM-killed because memory-backed `emptyDir` usage counts against the container memory cgroup"
    ],
    answer: 1,
    explanation: "Since Kubernetes 1.22+ (with the SizeMemoryBackedVolumes feature gate, beta since 1.22 and GA since 1.32), the kubelet mounts memory-backed emptyDir volumes with an explicit tmpfs size matching the sizeLimit. This means the kernel enforces the 256Mi cap at the filesystem level. When the container attempts to write beyond 256Mi, the write syscall fails with ENOSPC (no space left on device), identical to how a full disk-backed filesystem would behave. The pod itself is not evicted — the application receives an I/O error and must handle it. In older Kubernetes versions (without SizeMemoryBackedVolumes), the tmpfs defaulted to 50% of node memory and the kubelet eviction manager enforced sizeLimit asynchronously, but this is no longer the behavior.\n\nWhy other options are wrong:\n- A: The pod is not evicted by kubelet; with SizeMemoryBackedVolumes GA, the tmpfs is sized to the limit and the kernel returns ENOSPC at the boundary\n- C: sizeLimit on memory-backed emptyDir is NOT advisory; since K8s 1.22 (beta, enabled by default), the kernel enforces the limit via tmpfs sizing\n- D: The container is not OOM-killed because memory-backed emptyDir usage counts against the pod's ephemeral storage, not the container memory cgroup directly (the tmpfs is sized to sizeLimit)\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl describe pod <pod-name> | grep -A3 'Volumes' && kubectl get events --field-selector involvedObject.name=<pod-name>"
  },
  {
    id: "s10-q008",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team uses Argo CD to manage deployments. They configure an `Application` resource with `syncPolicy.automated.prune: true` and `syncPolicy.automated.selfHeal: true`. A developer manually runs `kubectl scale deployment/api --replicas=10` in the target namespace. What happens next?",
    diagram: null,
    options: [
      "A. Argo CD detects the drift and reverts the replica count to the value defined in Git within the next sync",
      "B. Argo CD marks the application as `OutOfSync` but does not revert because scaling is excluded from self-heal",
      "C. The manual change persists because Argo CD only watches for Git changes, not for drift in the live cluster",
      "D. Argo CD pushes a new Git commit reverting the replica count to maintain the repository as source of truth"
    ],
    answer: 0,
    explanation: "With `selfHeal: true`, Argo CD continuously monitors the live cluster state and compares it against the desired state in the Git repository. When it detects drift (such as a manual `kubectl scale` command), it automatically syncs the application back to the Git-defined state. This includes reverting the replica count. The self-heal mechanism does not create Git commits; it applies the Git state to the cluster. This is a core GitOps principle enforced by Argo CD.\n\nWhy other options are wrong:\n- B: selfHeal does not exclude scaling; it reverts all drift including replica count changes\n- C: Argo CD monitors both Git and live cluster state; it does not only watch Git changes\n- D: Argo CD never pushes commits to Git; it applies the Git-defined state to the cluster, not the other way around\n\nReference: https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/",
    verify: "argocd app get <app-name> --show-operation"
  },
  {
    id: "s10-q009",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A namespace has a `LimitRange` that sets `default.cpu: 500m` and `defaultRequest.cpu: 250m`. A ResourceQuota in the same namespace sets `limits.cpu: 4` and `requests.cpu: 2`. There are already 6 pods each using `requests.cpu: 250m` and `limits.cpu: 500m`. A new Deployment with 3 replicas is created without any resource specifications in the pod template. What happens?",
    diagram: "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='180' height='75' rx='6' fill='#1a1a2e' stroke='#326CE5' stroke-width='1.5'/><text x='100' y='30' text-anchor='middle' fill='#326CE5' font-size='10'>ResourceQuota</text><text x='100' y='48' text-anchor='middle' fill='#aaa' font-size='9'>requests.cpu: 2 (used: 1500m)</text><text x='100' y='63' text-anchor='middle' fill='#aaa' font-size='9'>limits.cpu: 4 (used: 3000m)</text><rect x='210' y='10' width='180' height='55' rx='6' fill='#1a1a2e' stroke='#4CAF50' stroke-width='1.5'/><text x='300' y='30' text-anchor='middle' fill='#4CAF50' font-size='10'>LimitRange Defaults</text><text x='300' y='48' text-anchor='middle' fill='#aaa' font-size='9'>req: 250m / lim: 500m per pod</text><rect x='10' y='110' width='55' height='35' rx='4' fill='#326CE5' stroke='#fff'/><text x='37' y='132' text-anchor='middle' fill='#fff' font-size='8'>New Pod 1</text><rect x='75' y='110' width='55' height='35' rx='4' fill='#326CE5' stroke='#fff'/><text x='102' y='132' text-anchor='middle' fill='#fff' font-size='8'>New Pod 2</text><rect x='140' y='110' width='55' height='35' rx='4' fill='#326CE5' stroke='#fff'/><text x='167' y='132' text-anchor='middle' fill='#fff' font-size='8'>New Pod 3</text></svg>",
    options: [
      "A. All 3 replicas are created because LimitRange defaults are injected and the total resource usage stays within quota",
      "D. Only 2 replicas are created; the third is blocked because total CPU requests would exceed the ResourceQuota limit",
      "C. The Deployment is rejected entirely because quota availability must be validated for all 3 replicas simultaneously",
      "B. All 3 replicas are created because defaults injected by the LimitRange are completely exempt from ResourceQuota checks"
    ],
    answer: 1,
    explanation: "The existing 6 pods consume `6 * 250m = 1500m` in requests and `6 * 500m = 3000m` in limits. The LimitRange injects `requests.cpu: 250m` and `limits.cpu: 500m` into each new pod. Adding 3 pods would require `750m` more requests (total `2250m`, exceeding the `2` core quota) and `1500m` more limits (total `4500m`, exceeding the `4` core quota). Two pods can be created (bringing totals to `2000m` requests and `4000m` limits), but the third is blocked by the quota.\n\nWhy other options are wrong:\n- A: All 3 replicas cannot be created because the third pod's resource request would exceed the ResourceQuota limits for both CPU requests and limits\n- C: The Deployment is not rejected entirely; pods are created individually by the ReplicaSet controller and quota is checked per-pod at admission time\n- B: LimitRange defaults are NOT exempt from ResourceQuota; injected defaults count toward quota consumption like any explicit resource specification\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: "kubectl describe resourcequota -n <namespace> && kubectl get pods -n <namespace>"
  },
  {
    id: "s10-q010",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A Kubernetes cluster uses Calico with `IPIP` encapsulation mode. A pod on Node A communicates with a pod on Node B in a different subnet. The network team reports that their firewall is blocking traffic between the nodes. Which protocol and port must be allowed for cross-subnet pod-to-pod communication?",
    diagram: null,
    options: [
      "A. UDP port 8472 for VXLAN encapsulation traffic between the Calico-managed cluster nodes",
      "B. TCP port 9099 for Calico health check probes and UDP port 51820 for WireGuard tunnels",
      "C. IP protocol 4 (IP-in-IP) between node IPs, plus TCP port 179 for BGP peering sessions",
      "D. IP protocol 47 (GRE) between node IP addresses and TCP port 179 for BGP route exchange"
    ],
    answer: 2,
    explanation: "When Calico is configured in IPIP encapsulation mode, pod traffic between nodes in different subnets is encapsulated using IP-in-IP (IP protocol number 4, not to be confused with IPv4). Additionally, Calico uses BGP (TCP port 179) for route distribution between nodes. The firewall must allow both IP protocol 4 for the data plane and TCP 179 for the control plane. VXLAN (UDP 8472) is a different encapsulation mode, and GRE is protocol 47, not used by Calico IPIP.\n\nWhy other options are wrong:\n- A: UDP 8472 is for VXLAN encapsulation mode, not IPIP; Calico in IPIP mode uses IP protocol 4, not VXLAN\n- B: TCP 9099 is for health checks and UDP 51820 is for WireGuard; these are not needed for basic IPIP encapsulation mode\n- D: IP protocol 47 is GRE, not IP-in-IP; Calico IPIP uses protocol 4 specifically\n\nReference: https://docs.tigera.io/calico/latest/getting-started/kubernetes/requirements#network-requirements",
    verify: "kubectl exec -n calico-system <calico-node-pod> -- calico-node -show-status"
  },
  {
    id: "s10-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An etcd cluster backing a Kubernetes control plane has 5 members. During maintenance, two etcd members are simultaneously taken offline for upgrades. A new Deployment is submitted to the API server during this window. What is the expected outcome?",
    diagram: null,
    options: [
      "A. The API server queues the request and retries until at least 4 etcd members are available for a supermajority quorum",
      "B. The Deployment creation is rejected with an etcd leader election timeout since the two offline members may include the leader",
      "C. The API server returns a 503 Service Unavailable because it requires all etcd members to be healthy for write operations",
      "D. The Deployment is accepted and persisted because 3 of 5 etcd members form a valid Raft quorum for write operations"
    ],
    answer: 3,
    explanation: "etcd uses the Raft consensus algorithm, which requires a simple majority (quorum) of members for both read and write operations. For a 5-member cluster, the quorum is 3 (`floor(5/2) + 1`). With 3 members still available, the cluster maintains quorum and can process write operations normally. Even if the leader was among the offline members, a new leader election would complete quickly among the remaining 3 members, and the write would succeed.\n\nWhy other options are wrong:\n- A: etcd does not require a supermajority (4 of 5); a simple majority (3 of 5) forms a valid Raft quorum\n- B: The Deployment is not rejected with a timeout; if the leader is offline, the remaining 3 members elect a new leader quickly\n- C: The API server does not require all members healthy; etcd tolerates minority failures and continues serving writes with quorum\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#multi-member-etcd-cluster",
    verify: "etcdctl endpoint status --cluster -w table"
  },
  {
    id: "s10-q012",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team implements the Twelve-Factor App methodology for their Kubernetes-based microservices. They store database credentials in a ConfigMap referenced as environment variables. During a security audit, this is flagged. Which combination of Twelve-Factor principles and Kubernetes best practices should they apply?",
    diagram: null,
    options: [
      "A. Move credentials to a Secret object with `type: Opaque`, mount as a volume, and enable encryption at rest in etcd",
      "B. Store credentials in the container image's environment file following `Factor III` (Config) since it separates config from code",
      "C. Use Factor VI (Processes) by storing credentials in the application's stateless process memory loaded at startup from a vault",
      "D. Apply Factor IV (Backing Services) by hardcoding the database URL as an attached resource reference in the Deployment spec"
    ],
    answer: 0,
    explanation: "Factor III (Config) states that configuration, especially credentials, should be stored in the environment and not in code. However, using a ConfigMap for secrets is insecure because ConfigMaps are not encrypted and are broadly accessible. Moving to a Kubernetes Secret with encryption at rest satisfies both the Twelve-Factor principle of externalizing config and the security requirement. Mounting as a volume rather than environment variables is preferred because env vars can leak into logs and child processes.\n\nWhy other options are wrong:\n- B: Storing credentials in the container image violates both security and Factor III; config should be external to the image artifact\n- C: Factor VI (Processes) states processes should be stateless; storing credentials only in process memory means losing them on restart and does not address secure storage\n- D: Factor IV (Backing Services) says treat them as attached resources via URL/config; it does not advocate hardcoding URLs in Deployment specs\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/",
    verify: "kubectl get secret <secret-name> -o yaml && kubectl describe pod <pod-name> | grep -A5 Mounts"
  },
  {
    id: "s10-q013",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A DaemonSet runs a log collector on every node. The pod template includes `tolerations` for `node-role.kubernetes.io/control-plane:NoSchedule`. After a cluster upgrade, the DaemonSet pods on control-plane nodes are evicted and not rescheduled. Investigation reveals the control-plane nodes now have a custom taint `maintenance=upgrade:NoExecute` applied by the upgrade tooling. What should be added to the DaemonSet?",
    diagram: null,
    options: [
      "A. A toleration for `maintenance=upgrade` with `effect: NoExecute` and an appropriate `tolerationSeconds` value",
      "B. A `nodeSelector` targeting control-plane nodes combined with a `PodDisruptionBudget` to prevent eviction during upgrades",
      "C. A toleration for key `maintenance` with `effect: NoExecute` and `operator: Exists` to tolerate indefinitely",
      "D. An annotation `scheduler.alpha.kubernetes.io/tolerations` with a wildcard to tolerate all taints on control-plane nodes"
    ],
    answer: 2,
    explanation: "The `NoExecute` taint `maintenance=upgrade:NoExecute` causes running pods to be evicted unless they have a matching toleration. Note that the DaemonSet controller automatically adds tolerations for `node.kubernetes.io/not-ready:NoExecute` and `node.kubernetes.io/unreachable:NoExecute`, but it does NOT auto-tolerate custom taints. Using `operator: Exists` on the `maintenance` key matches regardless of the taint value, and omitting `tolerationSeconds` means the pod tolerates the taint indefinitely. Option A with `tolerationSeconds` would only delay eviction. A DaemonSet log collector should remain on the node permanently, so indefinite toleration is correct. The deprecated annotation in option D is not valid.\n\nWhy other options are wrong:\n- A: Using tolerationSeconds with NoExecute only delays eviction temporarily; a log collector DaemonSet needs to remain permanently\n- B: nodeSelector does not prevent eviction from taints; PDBs are not enforced against taint-based evictions\n- D: The annotation scheduler.alpha.kubernetes.io/tolerations is deprecated and no longer valid in modern Kubernetes\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#taints-and-tolerations",
    verify: "kubectl get daemonset <name> -o jsonpath='{.spec.template.spec.tolerations}' | jq ."
  },
  {
    id: "s10-q014",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A multi-container pod has an init container that clones a Git repository into a shared `emptyDir` volume. The main application container mounts the same volume at `/app/config`. The pod is stuck in `Init:CrashLoopBackOff`. Logs show the init container appears to run the git clone but exits with code 128. What is the most likely issue?",
    diagram: null,
    options: [
      "A. Exit code 128 indicates a Git fatal error, meaning the repository URL is unreachable or authentication credentials have failed",
      "B. The `emptyDir` volume is not writable by the init container due to a `readOnlyRootFilesystem: true` security context on the pod",
      "C. Exit code 128 means the init container received SIGKILL, likely because it exceeded its memory limit during the git clone",
      "D. The shared volume mount paths conflict because both containers use the same `mountPath`, causing failures on container restart"
    ],
    answer: 0,
    explanation: "Exit code 128 in a Git context is a Git-specific fatal error code (Git uses 128 for fatal errors). Common causes include unreachable repositories, authentication failures, or invalid references. While exit code 128 can also mean the process received a signal (128 + signal number), in combination with a Git clone operation completing but failing, it strongly indicates a Git authentication or connectivity issue. The `CrashLoopBackOff` occurs because Kubernetes retries the init container on failure.\n\nWhy other options are wrong:\n- B: readOnlyRootFilesystem does not affect mounted emptyDir volumes; volume mounts are writable regardless of the root filesystem setting\n- C: Exit code 128 in a Git context is a Git fatal error, not SIGKILL (which would be 137 = 128+9); the symptom points to a Git-level failure\n- D: Both containers mounting the same volume is valid and expected; mount path conflicts do not occur between init and main containers\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#understanding-init-containers",
    verify: "kubectl logs <pod-name> -c <init-container-name> --previous"
  },
  {
    id: "s10-q015",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Prometheus instance scraping 500 pods experiences high memory usage and slow queries. The team discovers that each pod exposes 2,000 unique time series with a label `request_id` that has unbounded cardinality. What is the correct approach to resolve this while maintaining useful metrics?",
    diagram: null,
    options: [
      "A. Increase Prometheus memory allocation and enable WAL compression to reduce the storage footprint of high-cardinality time series data",
      "B. Switch to a push-based metrics model where pods send metrics directly to a time-series database that handles high cardinality natively",
      "C. Use `metric_relabel_configs` to drop the `request_id` label before ingestion, and use distributed tracing for per-request data",
      "D. Add `sample_limit` to the scrape config to cap time series per target and configure recording rules to aggregate high-cardinality data"
    ],
    answer: 2,
    explanation: "Unbounded cardinality labels like `request_id` are a well-known anti-pattern in Prometheus metrics. Each unique combination of labels creates a new time series, causing memory bloat and slow queries (the \"cardinality explosion\" problem). The correct approach is to use `metric_relabel_configs` to drop or aggregate the problematic label at scrape time, and use a purpose-built tool like distributed tracing (Jaeger, Tempo) for per-request observability. Option D with `sample_limit` would drop entire scrapes when exceeded, causing data loss.\n\nWhy other options are wrong:\n- A: Increasing memory and enabling WAL compression only delays the problem; it does not address the root cause of unbounded cardinality\n- B: Push-based models do not inherently solve cardinality problems; the label explosion would still occur in the receiving database\n- D: sample_limit drops entire scrapes when exceeded, causing complete data loss for that target rather than selectively handling the problematic label\n\nReference: https://prometheus.io/docs/practices/naming/#labels",
    verify: "curl -s http://localhost:9090/api/v1/status/tsdb | jq '.data.seriesCountByMetricName[:10]'"
  },
  {
    id: "s10-q016",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A CronJob with `concurrencyPolicy: Forbid` and `startingDeadlineSeconds: 200` is scheduled to run every 5 minutes (`*/5 * * * *`). The previous job run takes 12 minutes to complete. How many job runs are missed, and what happens when the long-running job finishes?",
    diagram: null,
    options: [
      "A. Two scheduled runs are missed during the 12-minute window; after the job finishes, only the most recent missed schedule triggers a new job",
      "D. All missed runs are queued and execute sequentially after the long-running job completes because `startingDeadlineSeconds` is long enough",
      "C. The CronJob controller counts 2 missed starts, which is below the 100-miss threshold, so it schedules a catch-up run immediately after the long job finishes",
      "B. Two runs are skipped silently due to `Forbid`; after the job finishes, the next run occurs at the next scheduled interval with no catch-up"
    ],
    answer: 0,
    explanation: "With `concurrencyPolicy: Forbid`, the CronJob controller will not create a new Job while a previous one is still running. During the 12-minute execution, two 5-minute scheduled intervals are missed. When the long-running job finishes, the controller checks for missed schedules within the `startingDeadlineSeconds: 200` window. The most recent missed schedule falls within that 200-second deadline, so the controller triggers exactly one catch-up run for it. The CronJob controller never creates multiple catch-up jobs — it only creates one for the most recently missed schedule if it is still within the deadline window.\n\nWhy other options are wrong:\n- D: Missed runs are never queued for sequential execution; the CronJob controller creates at most one catch-up job for the most recent missed schedule\n- C: The 100-miss threshold causes the CronJob to stop scheduling entirely; it does not trigger catch-up runs\n- B: Missed runs are not silently skipped; the controller checks startingDeadlineSeconds and triggers one catch-up for the most recent missed schedule\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-job-limitations",
    verify: "kubectl get cronjob <name> -o jsonpath='{.status}' | jq . && kubectl get jobs --sort-by=.status.startTime"
  },
  {
    id: "s10-q017",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A Kubernetes node uses containerd as its container runtime with a default `RuntimeClass`. The security team requires that certain sensitive workloads run in gVisor sandboxes. A pod is created with `runtimeClassName: gvisor`, but it fails with `RuntimeClass \"gvisor\" not found`. What must be configured?",
    diagram: null,
    options: [
      "D. Add gVisor as a plugin in the kubelet configuration file and restart the kubelet service; the `RuntimeClass` is auto-generated from plugin registration",
      "B. Create a `RuntimeClass` object with `handler: gvisor` and annotate the node with `runtime.kubernetes.io/gvisor=true` to enable the sandbox runtime",
      "C. Install the gVisor admission webhook, which automatically creates the `RuntimeClass` and configures the containerd runtime handler on detection",
      "A. Install gVisor's `runsc` on the node, add a containerd runtime handler for `gvisor`, and create a `RuntimeClass` with `handler: runsc`"
    ],
    answer: 3,
    explanation: "Using gVisor with Kubernetes requires three steps: (1) install the `runsc` binary on each node that will run sandboxed workloads, (2) configure containerd with a runtime handler that uses `runsc` (typically named `runsc` in the containerd config), and (3) create a cluster-level `RuntimeClass` resource whose `handler` field matches the containerd handler name. The `RuntimeClass` object is a cluster-scoped resource that maps the `runtimeClassName` in a pod spec to a specific CRI handler on the node.\n\nWhy other options are wrong:\n- D: gVisor is not a kubelet plugin; it is a container runtime shim that must be configured in containerd and mapped via a RuntimeClass object\n- B: RuntimeClass does not require a node annotation; it maps a handler name to a CRI runtime handler configured in the container runtime\n- C: There is no gVisor admission webhook that auto-creates RuntimeClass resources; both containerd config and RuntimeClass must be created manually\n\nReference: https://kubernetes.io/docs/concepts/containers/runtime-class/",
    verify: "kubectl get runtimeclass && cat /etc/containerd/config.toml | grep -A5 runsc"
  },
  {
    id: "s10-q018",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster operator configures the `kube-apiserver` with `--audit-policy-file` pointing to an audit policy. The policy has a rule with `level: RequestResponse` for all resources in the `secrets` group. After deploying the policy, the audit log file grows rapidly and fills the disk. Which targeted change reduces log volume while still capturing security-relevant secret access?",
    diagram: null,
    options: [
      "A. Change the level to `Metadata` for secrets and add a `RequestResponse` rule only for `delete` and `create` verbs",
      "B. Set `level: None` for secrets accessed by system service accounts and keep `RequestResponse` for user-initiated requests",
      "C. Reduce `--audit-log-maxsize` and `--audit-log-maxbackup` flags to limit disk usage while keeping the same audit level",
      "D. Change to `level: Request` globally and rely on external SIEM tools to reconstruct response bodies from request data"
    ],
    answer: 0,
    explanation: "The `RequestResponse` level captures full request and response bodies, which for Secrets includes the encoded secret data — generating enormous log entries. Changing to `Metadata` level for most secret operations captures who accessed what and when, without logging the actual secret content. Adding a targeted `RequestResponse` rule only for `create` and `delete` verbs captures the full detail for the highest-risk operations while dramatically reducing log volume for routine `get` and `list` operations.\n\nWhy other options are wrong:\n- B: Setting level: None for system service accounts could miss legitimate security events like compromised service accounts accessing secrets\n- C: Reducing maxsize and maxbackup limits disk usage but does not reduce log generation rate; it only causes older logs to be rotated out faster\n- D: Changing to level: Request globally still logs full request bodies for all resources, which is still verbose; it also loses response data for all resources\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/",
    verify: "kubectl logs <kube-apiserver-pod> -n kube-system | head -50"
  },
  {
    id: "s10-q019",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team evaluates CNCF projects for their service mesh needs. They need mTLS between services, traffic splitting for canary deployments, and multi-cluster service discovery. They currently run Envoy sidecars manually. Which CNCF graduated project best fits as a control plane for their existing Envoy proxies?",
    diagram: null,
    options: [
      "A. Linkerd, because it is a graduated CNCF mesh providing mTLS, traffic splitting, and multi-cluster support with its own proxy",
      "B. Open Service Mesh, because it is a CNCF project designed as a lightweight Envoy-based control plane with SMI compatibility",
      "C. Cilium, because it is a graduated CNCF project providing eBPF-based service mesh with mTLS and multi-cluster networking",
      "D. Istio, because it is a graduated CNCF project that uses Envoy as its data plane and provides all three required features"
    ],
    answer: 3,
    explanation: "Istio is a CNCF graduated project that uses Envoy as its data plane proxy, making it the natural choice for a team already running Envoy sidecars. It provides mTLS via its certificate management system, traffic splitting for canary deployments via `VirtualService` resources, and multi-cluster service discovery. Linkerd is also graduated but uses its own proxy (linkerd2-proxy), not Envoy. Cilium provides service mesh features but through eBPF, not Envoy. Open Service Mesh was archived by CNCF.\n\nWhy other options are wrong:\n- A: Linkerd uses its own linkerd2-proxy (written in Rust), not Envoy; it would not leverage the team's existing Envoy sidecars\n- B: Open Service Mesh was archived by CNCF in 2023; it is no longer actively maintained or recommended\n- C: Cilium uses eBPF for its service mesh, not Envoy sidecars; it would not work with existing Envoy infrastructure\n\nReference: https://istio.io/latest/about/service-mesh/",
    verify: null
  },
  {
    id: "s10-q020",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster uses CoreDNS for service discovery. A pod in namespace `team-a` tries to resolve `api-service.team-b.svc.cluster.local` but resolving the FQDN is significantly slower than expected, with DNS debug logs showing unnecessary search-domain lookups. The service exists and has endpoints. Running `nslookup api-service.team-b` from the same pod succeeds quickly. What is the most likely cause of the slow FQDN resolution?",
    diagram: null,
    options: [
      "A. The pod's `ndots:5` setting causes the resolver to try search-domain expansion for the FQDN because it has only 4 dots, which is less than ndots",
      "B. CoreDNS has a network policy blocking DNS queries that include the full `svc.cluster.local` suffix from the `team-a` namespace pods",
      "C. The CoreDNS `Corefile` has a custom zone override for `cluster.local` that does not include `team-b` in its allowed zone list",
      "D. The FQDN query is forwarded to the upstream DNS resolver instead of CoreDNS because it matches the forward plugin catch-all rule"
    ],
    answer: 0,
    explanation: "In Kubernetes, the default `ndots` value is 5. The resolver counts dots in the queried name: if fewer than 5, it first tries appending each search domain before falling back to the literal name. The short name `api-service.team-b` has 1 dot (< 5), so search domains are appended, and one combination — `api-service.team-b.svc.cluster.local` — resolves quickly. However, the seemingly-qualified name `api-service.team-b.svc.cluster.local` has only 4 dots (still < 5), so the resolver first tries search-domain expansions like `api-service.team-b.svc.cluster.local.team-a.svc.cluster.local`, each returning NXDOMAIN, before eventually falling back to the literal name which does resolve. This causes significantly slower resolution due to multiple unnecessary DNS round-trips. Appending a trailing dot (`api-service.team-b.svc.cluster.local.`) marks the name as an absolute FQDN, bypassing all search-domain expansion regardless of `ndots` and resolving immediately.\n\nWhy other options are wrong:\n- B: CoreDNS network policies would block all queries equally, not just those with the full suffix; the issue is DNS search domain expansion\n- C: CoreDNS does not have per-namespace zone allowlists; the cluster.local zone serves all namespaces uniformly\n- D: The FQDN query is not forwarded upstream; it eventually resolves locally after unnecessary search domain attempts\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#ndots",
    verify: "kubectl exec <pod-name> -n team-a -- cat /etc/resolv.conf && kubectl exec <pod-name> -n team-a -- nslookup api-service.team-b.svc.cluster.local."
  },
  {
    id: "s10-q021",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart uses a `pre-install` hook to create a database schema migration Job. The hook has `helm.sh/hook-delete-policy: before-hook-creation`. After a failed `helm install`, the team runs `helm install` again with the same release name. The migration Job from the first attempt still exists in a `Failed` state. What happens?",
    diagram: null,
    options: [
      "B. Helm fails because the release name already exists in `failed` state and must be removed with `helm uninstall` first",
      "A. Helm deletes the failed Job before creating a new one, as `before-hook-creation` removes previous hook resources",
      "C. The existing failed Job blocks new hook Job creation, causing a naming conflict and a `helm install` error message",
      "D. Helm ignores the existing Job and creates a new Job with a randomly generated suffix appended to the resource name"
    ],
    answer: 1,
    explanation: "The `before-hook-creation` delete policy instructs Helm to delete the existing hook resource before creating a new one during the next install or upgrade. Even though the first install failed, running `helm install` with the same release name (which Helm allows if the previous release is in `failed` state) will trigger this policy. Helm detects the existing Failed Job from the previous hook execution, deletes it, and then creates a fresh migration Job. This is specifically why `before-hook-creation` is the recommended delete policy for idempotent operations.\n\nWhy other options are wrong:\n- B: Helm allows re-install with the same release name if the previous release is in failed state; uninstall is not strictly required\n- C: The before-hook-creation policy specifically handles naming conflicts by deleting the old resource before creating a new one\n- D: Helm does not create Jobs with random suffixes; hook resources are created with deterministic names from the chart templates\n\nReference: https://helm.sh/docs/topics/charts_hooks/#hook-deletion-policies",
    verify: "helm list -a && helm history <release-name>"
  },
  {
    id: "s10-q022",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "An application pod requires access to the Kubernetes API to list pods in its own namespace. The pod uses a ServiceAccount with a bound Role and RoleBinding. The security team mandates that the automatically mounted service account token must have a 1-hour expiration and be bound to the pod's identity. Which approach satisfies these requirements?",
    diagram: null,
    options: [
      "A. Disable `automountServiceAccountToken` and use a projected volume with `serviceAccountToken` source, `expirationSeconds: 3600`, and the API audience",
      "B. Use a TokenRequest API call from an init container to generate a short-lived token, store it in a shared `emptyDir`, and read it from the app container",
      "C. Configure the ServiceAccount annotation `kubernetes.io/enforce-mountable-secrets` and set the token `exp` claim via a custom admission webhook",
      "D. Enable the `BoundServiceAccountTokenVolume` feature gate (disabled by default) and set `--service-account-max-token-expiration` to 1 hour on the API server"
    ],
    answer: 0,
    explanation: "Projected volumes with `serviceAccountToken` sources allow fine-grained control over token properties including `expirationSeconds` and `audience`. By setting `automountServiceAccountToken: false` and adding a projected volume, you get a token that is bound to the specific pod (included in the token claims), has a defined expiration (3600 seconds = 1 hour), and targets a specific audience. The `BoundServiceAccountTokenVolume` feature has been GA since Kubernetes 1.22 and is enabled by default, making option D incorrect.\n\nWhy other options are wrong:\n- B: Using an init container with TokenRequest and emptyDir is functional but less clean; it requires custom logic and the token is not auto-rotated by the kubelet\n- C: The annotation kubernetes.io/enforce-mountable-secrets does not control token expiration; it restricts which secrets a ServiceAccount can mount\n- D: BoundServiceAccountTokenVolume has been GA since K8s 1.22 and is enabled by default; the option describes it as disabled by default, which is incorrect\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#serviceaccount-token-volume-projection",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes[*]}' | jq ."
  },
  {
    id: "s10-q023",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node has the following allocatable resources: 8 CPU, 32Gi memory. Currently running pods consume 6 CPU (requests) and 24Gi memory (requests). A new pod requesting 3 CPU and 6Gi memory has a `PriorityClass` with `value: 1000000` (the highest in the cluster). Existing pods have priority values ranging from 100 to 999999. What does the scheduler do?",
    diagram: null,
    options: [
      "A. The scheduler preempts the lowest-priority pod(s) until enough resources are freed for the new pod, with best-effort respect for PodDisruptionBudgets",
      "B. The pod remains Pending because preemption only occurs when no node in the cluster can satisfy the request, even with evictions",
      "C. The scheduler preempts pods starting from the lowest priority, ignoring PodDisruptionBudgets, until at least 3 CPU and 6Gi are available",
      "D. The scheduler places the pod on the node by overcommitting resources since high-priority pods are exempt from resource request enforcement"
    ],
    answer: 0,
    explanation: "When a pod cannot be scheduled on any node, the scheduler evaluates preemption. It identifies the lowest-priority pods on candidate nodes that, if removed, would free sufficient resources for the new high-priority pod. The scheduler applies best-effort PDB enforcement during preemption — it prefers victims whose PDBs would not be violated, but will still preempt if no non-violating option exists. In this scenario, the scheduler would preempt enough low-priority pods to free at least 3 CPU and 6Gi, as long as PDBs allow it.\n\nWhy other options are wrong:\n- B: Preemption does occur on a per-node basis; the scheduler evaluates nodes individually, not globally\n- C: Preemption does consider PDBs (best effort), but does not ignore them; the scheduler tries to avoid PDB violations when possible\n- D: High-priority pods are not exempt from resource requests; preemption frees resources by evicting lower-priority pods, not by overcommitting\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#preemption",
    verify: "kubectl get priorityclass --sort-by=.value && kubectl describe node <node-name> | grep -A20 'Non-terminated Pods'"
  },
  {
    id: "s10-q024",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A Kubernetes cluster runs a Service with `externalTrafficPolicy: Local` of type `LoadBalancer`. The load balancer health checks are configured on the NodePort. Pods are running on only 2 of the 4 nodes. What behavior do clients observe?",
    diagram: "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect x='140' y='5' width='120' height='30' rx='5' fill='#FF9800' stroke='#fff'/><text x='200' y='25' text-anchor='middle' fill='#fff' font-size='11'>Load Balancer</text><rect x='20' y='80' width='70' height='40' rx='5' fill='#326CE5' stroke='#fff'/><text x='55' y='97' text-anchor='middle' fill='#fff' font-size='9'>Node 1</text><text x='55' y='112' text-anchor='middle' fill='#fff' font-size='8'>Pod A</text><rect x='110' y='80' width='70' height='40' rx='5' fill='#326CE5' stroke='#fff'/><text x='145' y='97' text-anchor='middle' fill='#fff' font-size='9'>Node 2</text><text x='145' y='112' text-anchor='middle' fill='#fff' font-size='8'>Pod B</text><rect x='220' y='80' width='70' height='40' rx='5' fill='#326CE5' stroke='#fff'/><text x='255' y='97' text-anchor='middle' fill='#fff' font-size='9'>Node 3</text><text x='255' y='112' text-anchor='middle' fill='#fff' font-size='8'>No Pod</text><rect x='310' y='80' width='70' height='40' rx='5' fill='#326CE5' stroke='#fff'/><text x='345' y='97' text-anchor='middle' fill='#fff' font-size='9'>Node 4</text><text x='345' y='112' text-anchor='middle' fill='#fff' font-size='8'>No Pod</text><line x1='200' y1='35' x2='55' y2='75' stroke='#aaa' stroke-width='1.5'/><line x1='200' y1='35' x2='145' y2='75' stroke='#aaa' stroke-width='1.5'/><line x1='200' y1='35' x2='255' y2='75' stroke='#aaa' stroke-width='1.5'/><line x1='200' y1='35' x2='345' y2='75' stroke='#aaa' stroke-width='1.5'/></svg>",
    options: [
      "A. Traffic is distributed across all 4 nodes; nodes without pods forward traffic to nodes with pods via internal routing",
      "B. The load balancer only sends traffic to nodes 1 and 2 because health checks on nodes 3 and 4 fail, preserving client source IP",
      "C. Clients experience intermittent failures because the load balancer round-robins across all nodes including those without pods",
      "D. The Service automatically updates the load balancer to remove nodes 3 and 4 from the target group, regardless of health check results"
    ],
    answer: 1,
    explanation: "With `externalTrafficPolicy: Local`, kube-proxy only programs iptables/IPVS rules on nodes that have local pods for the Service. The health check endpoint (the `healthCheckNodePort`) returns a 503 on nodes without pods, causing the external load balancer to exclude those nodes from its target pool. This ensures traffic only reaches nodes with backend pods, preserving the client's source IP address by avoiding the extra SNAT hop that occurs with `Cluster` policy.\n\nWhy other options are wrong:\n- A: With externalTrafficPolicy: Local, traffic is NOT forwarded across nodes; only nodes with local pods handle traffic\n- C: Clients do not experience failures because the load balancer health checks remove podless nodes from the target pool before sending traffic\n- D: The Service does not update the load balancer target group directly; the health check mechanism handles node exclusion\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#external-traffic-policy",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.healthCheckNodePort}' && curl -s http://<node-ip>:<healthCheckNodePort>/healthz"
  },
  {
    id: "s10-q025",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team deploys a Knative Serving application that handles webhook events. The application experiences cold start latency of 8 seconds when scaling from zero. The SLA requires responses within 3 seconds. The team wants to minimize resource usage while meeting the SLA. What is the optimal Knative configuration?",
    diagram: null,
    options: [
      "D. Use `minScale: 0` with `target-burst-capacity: -1` to disable activator buffering and let the autoscaler handle scaling",
      "B. Configure `scale-to-zero-grace-period` to 30 minutes globally in the Knative `config-autoscaler` ConfigMap settings",
      "C. Set `initialScale` to 3 and enable `allow-zero-initial-scale` to handle burst traffic after the first cold start event",
      "A. Set `minScale: 1` in the revision template to keep at least one warm instance running at all times for the service"
    ],
    answer: 3,
    explanation: "Setting `minScale: 1` ensures that at least one instance of the application is always running, eliminating cold start latency for at least the first request. While this consumes resources for the idle instance, it is the most straightforward way to meet a strict response time SLA. Option B only delays scale-to-zero, wasting resources during idle periods without guaranteeing warm instances. Option C controls initial scale at deployment time, not ongoing behavior. Option D would actually worsen latency by bypassing the activator's request buffering.\n\nWhy other options are wrong:\n- D: target-burst-capacity: -1 disables activator buffering, which worsens cold start latency by not queueing requests during scale-up\n- B: A 30-minute scale-to-zero-grace-period wastes resources during idle periods and does not guarantee a warm instance at request time\n- C: initialScale controls replicas at deploy time; it does not maintain a minimum during ongoing operation after scale-to-zero occurs\n\nReference: https://knative.dev/docs/serving/autoscaling/scale-bounds/",
    verify: "kubectl get ksvc <service-name> -o jsonpath='{.spec.template.metadata.annotations}'"
  },
  {
    id: "s10-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment with `strategy.type: RollingUpdate`, `maxSurge: 1`, and `maxUnavailable: 0` has 5 replicas. A new image version is rolled out, but the new pods fail readiness probes. What is the state of the rollout?",
    diagram: null,
    options: [
      "A. One new pod (surge) is created but never becomes Ready; the 5 old pods keep running and the rollout stalls",
      "B. The rollout creates new pods one at a time regardless of readiness since `maxUnavailable: 0` only prevents deletions",
      "C. The rollout immediately rolls back to the previous version automatically after `progressDeadlineSeconds` is exceeded",
      "D. The rollout creates 6 pods total (5 old + 1 new) then begins terminating old pods because total exceeds desired count"
    ],
    answer: 0,
    explanation: "With `maxSurge: 1` and `maxUnavailable: 0`, the Deployment controller creates one additional pod with the new version (bringing the total to 6). Since `maxUnavailable: 0` means no old pods can be terminated until a new pod is Ready, and the new pod fails readiness, the rollout stalls. The 5 old pods continue serving traffic. After `progressDeadlineSeconds` (default 600s), the Deployment reports a `Progressing=False` condition, but it does not automatically roll back.\n\nWhy other options are wrong:\n- B: maxUnavailable: 0 prevents old pod termination until new pods are Ready; the rollout does not proceed regardless of readiness\n- C: Kubernetes does not automatically roll back; after progressDeadlineSeconds it reports Progressing=False but the rollout remains stalled\n- D: The controller does not begin terminating old pods just because total exceeds desired; it requires new pods to be Ready first\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl rollout status deployment/<name> && kubectl get pods -l app=<name> --sort-by=.metadata.creationTimestamp"
  },
  {
    id: "s10-q027",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod with two containers — `app` (port 8080) and `sidecar` (port 9090) — is in `Running` state, but the `app` container constantly restarts. The pod is configured with `hostNetwork: true`. Logs show `app` exits with `Error: listen EADDRINUSE :::8080`. The `sidecar` container is configured to listen on port 9090. What is the most likely cause?",
    diagram: null,
    options: [
      "A. The `sidecar` container has a secondary listener binding to port 8080 in addition to its configured primary port 9090",
      "B. A previous `app` container instance has not released port 8080 due to TCP TIME_WAIT, and the restart is too fast",
      "C. The pod has `hostNetwork: true`, and another pod on the same node is already bound to port 8080 on the host",
      "D. Both containers share a network namespace, and the `app` container's liveness probe on port 8080 creates a conflict"
    ],
    answer: 2,
    explanation: "The `EADDRINUSE` error means port 8080 is already in use. Since containers in a pod share the same network namespace, port conflicts can occur between containers. However, if the sidecar is on 9090, the conflict is elsewhere. With `hostNetwork: true`, the pod uses the host's network namespace, meaning another pod or process on the same node using port 8080 would conflict. This is a common issue with `hostNetwork` pods. Liveness probes do not create listeners — they connect to existing ones.\n\nWhy other options are wrong:\n- A: A sidecar secondary listener is possible but unlikely given the explicit config on port 9090; the question points to hostNetwork as the cause\n- B: TCP TIME_WAIT between restarts of the same container is unlikely because the container network namespace is recreated\n- D: Liveness probes do not create listeners; they connect to existing ports and cannot cause EADDRINUSE conflicts\n\nReference: https://kubernetes.io/docs/concepts/configuration/overview/#services",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.hostNetwork}' && kubectl describe pod <pod-name> | grep -A3 'State:'"
  },
  {
    id: "s10-q028",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices platform uses the Saga pattern for distributed transactions. An order service starts a saga that involves payment, inventory, and shipping services. The payment succeeds, the inventory reservation succeeds, but the shipping service fails. How should the saga orchestrator handle this failure?",
    diagram: "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='5' y='80' width='75' height='35' rx='5' fill='#326CE5' stroke='#fff'/><text x='42' y='102' text-anchor='middle' fill='#fff' font-size='9'>Order Svc</text><rect x='105' y='80' width='75' height='35' rx='5' fill='#4CAF50' stroke='#fff'/><text x='142' y='98' text-anchor='middle' fill='#fff' font-size='8'>Payment</text><text x='142' y='109' text-anchor='middle' fill='#0f0' font-size='7'>SUCCESS</text><rect x='210' y='80' width='75' height='35' rx='5' fill='#4CAF50' stroke='#fff'/><text x='247' y='98' text-anchor='middle' fill='#fff' font-size='8'>Inventory</text><text x='247' y='109' text-anchor='middle' fill='#0f0' font-size='7'>SUCCESS</text><rect x='315' y='80' width='75' height='35' rx='5' fill='#f44336' stroke='#fff'/><text x='352' y='98' text-anchor='middle' fill='#fff' font-size='8'>Shipping</text><text x='352' y='109' text-anchor='middle' fill='#f44' font-size='7'>FAILED</text><line x1='80' y1='97' x2='100' y2='97' stroke='#4CAF50' stroke-width='1.5' marker-end='url(#a2)'/><line x1='180' y1='97' x2='205' y2='97' stroke='#4CAF50' stroke-width='1.5' marker-end='url(#a2)'/><line x1='285' y1='97' x2='310' y2='97' stroke='#f44' stroke-width='1.5' marker-end='url(#a2)'/><path d='M352,120 L352,155 L142,155 L142,120' stroke='#FF9800' stroke-width='1.5' fill='none' stroke-dasharray='4' marker-end='url(#a2)'/><text x='247' y='170' text-anchor='middle' fill='#FF9800' font-size='9'>How to handle?</text><defs><marker id='a2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><path d='M0,0 L8,3 L0,6Z' fill='#ccc'/></marker></defs></svg>",
    options: [
      "B. Execute compensating transactions in reverse: release the inventory reservation, then refund the payment",
      "A. Retry the shipping service call with exponential backoff until it succeeds, keeping the saga open indefinitely",
      "C. Mark the saga as partially complete and let eventual consistency reconcile service state asynchronously",
      "D. Roll back using a two-phase commit protocol across all three services to ensure an atomic reversal"
    ],
    answer: 0,
    explanation: "The Saga pattern handles distributed transaction failures through compensating transactions executed in reverse order. When the shipping service fails, the orchestrator must undo the previously completed steps: first release the inventory reservation (compensate inventory), then issue a payment refund (compensate payment). This maintains eventual consistency. Unlike two-phase commit, sagas do not provide atomicity — they rely on compensating actions. Keeping the saga open indefinitely (option A) would leave resources locked.\n\nWhy other options are wrong:\n- A: Retrying indefinitely keeps resources locked and does not address the failure; it can cause resource starvation and timeout cascading\n- C: Marking as partially complete leaves the system in an inconsistent state; compensating transactions are needed to restore consistency\n- D: Two-phase commit is a different pattern than saga; sagas deliberately avoid 2PC because it requires distributed locks and has availability issues\n\nReference: https://microservices.io/patterns/data/saga.html",
    verify: null
  },
  {
    id: "s10-q029",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A cluster administrator creates a custom `PriorityClass` with `globalDefault: true` and `value: 100`. The cluster already has the system-provided `system-cluster-critical` (value 2000000000) and `system-node-critical` (value 2000001000) priority classes. A pod is created without specifying a `priorityClassName`. What priority value is assigned?",
    diagram: null,
    options: [
      "A. Priority 0, because only one `globalDefault` PriorityClass can exist and the system ignores user-created default values",
      "B. Priority 2000000000, because system priority classes always take precedence over any user-defined global default values",
      "C. Priority 100, as the custom PriorityClass with `globalDefault: true` applies to pods without an explicit assignment",
      "D. No priority is assigned and the pod creation fails with a validation error about an ambiguous default priority class"
    ],
    answer: 2,
    explanation: "When a `PriorityClass` is created with `globalDefault: true`, it becomes the default for all pods that do not specify a `priorityClassName`. Only one PriorityClass should have `globalDefault: true`. The system-provided classes (`system-cluster-critical`, `system-node-critical`) do not have `globalDefault: true` — they must be explicitly referenced. Without any `globalDefault` PriorityClass, pods default to priority 0. With the custom class, the default becomes 100.\n\nWhy other options are wrong:\n- A: The system does not ignore user-created globalDefault; only one should exist, and it correctly sets the default for pods without explicit priorityClassName\n- B: System priority classes do not override globalDefault; they must be explicitly referenced by pods needing those priorities\n- D: Pod creation does not fail; Kubernetes accepts exactly one globalDefault PriorityClass and applies it to pods without a priorityClassName\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass",
    verify: "kubectl get priorityclass -o wide && kubectl get pod <pod-name> -o jsonpath='{.spec.priority}'"
  },
  {
    id: "s10-q030",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A StatefulSet uses a PVC with `accessModes: [ReadWriteOnce]` backed by an AWS EBS volume. The pod is rescheduled to a node in a different availability zone. The pod is stuck in `Pending`. What is the root cause and correct resolution?",
    diagram: null,
    options: [
      "D. The StorageClass must have `allowedTopologies` set to all availability zones for the volume to be mountable across zones",
      "B. EBS volumes require `ReadWriteMany` access mode for cross-zone mounting; change the access mode in the PVC specification",
      "C. The PV is still attached to the old node; manually detach it with `kubectl patch pv` removing the volumeattachments finalizer",
      "A. EBS volumes are zone-scoped; add `nodeAffinity` matching the volume's AZ or use `volumeBindingMode: WaitForFirstConsumer`"
    ],
    answer: 3,
    explanation: "AWS EBS volumes are bound to a specific availability zone and cannot be attached to instances in a different zone. When a pod is rescheduled to a node in a different AZ, the volume cannot be mounted, causing the pod to remain Pending. The correct approaches are: (1) use `nodeAffinity` or pod topology constraints to ensure pods stay in the same AZ as their volumes, or (2) use `volumeBindingMode: WaitForFirstConsumer` in the StorageClass to delay volume creation until a pod is scheduled, ensuring the volume is created in the correct AZ.\n\nWhy other options are wrong:\n- D: allowedTopologies restricts which zones can create volumes, but it does not make existing zone-scoped EBS volumes cross-zone mountable\n- B: EBS does not support ReadWriteMany at all; changing access mode would not enable cross-zone mounting\n- C: The issue is zone topology mismatch, not stale attachment; manually detaching the PV does not help if the volume is in a different AZ\n\nReference: https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode",
    verify: "kubectl describe pod <pod-name> | grep -A5 Events && kubectl get pv <pv-name> -o jsonpath='{.spec.nodeAffinity}'"
  },
  {
    id: "s10-q031",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A NetworkPolicy with the following spec is applied to namespace `production`:\n\n```yaml\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes: [Ingress, Egress]\n  ingress:\n  - from:\n    - namespaceSelector:\n        matchLabels:\n          env: production\n      podSelector:\n        matchLabels:\n          role: frontend\n    ports:\n    - port: 443\n  egress:\n  - to:\n    - podSelector:\n        matchLabels:\n          app: database\n```\n\nA pod labeled `role: frontend` in a namespace labeled `env: staging` sends a request to the `api` pod on port 443. Is the traffic allowed?",
    diagram: null,
    options: [
      "A. Yes, the `podSelector` matches the source pod's `role: frontend` label regardless of the originating namespace label",
      "B. No, `namespaceSelector` and `podSelector` under the same `from` entry form an AND condition — both must match",
      "C. Yes, `namespaceSelector` and `podSelector` in the same array element are evaluated as an OR condition by the CNI",
      "D. No, the egress policy does not include a rule allowing return traffic responses back to the frontend pod in staging"
    ],
    answer: 1,
    explanation: "When `namespaceSelector` and `podSelector` appear in the same `from` entry (same YAML map), they form an AND condition — the source pod must match both selectors. The pod must be in a namespace with `env: production` AND have the label `role: frontend`. Since the source pod is in a namespace labeled `env: staging`, the `namespaceSelector` does not match, so traffic is denied. If they were separate list items (separate `-` entries), they would be OR conditions.\n\nWhy other options are wrong:\n- A: podSelector alone does not match across namespaces; when combined with namespaceSelector in the same entry, both must match (AND logic)\n- C: namespaceSelector and podSelector in the same array element are AND, not OR; separate list items would be OR\n- D: NetworkPolicy ingress and egress are independent; return traffic for established connections is not blocked by ingress rules\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#behavior-of-to-and-from-selectors",
    verify: "kubectl describe networkpolicy -n production"
  },
  {
    id: "s10-q032",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A cluster uses a DaemonSet-based Fluentd deployment for log collection. Application pods write structured JSON logs to stdout. The Fluentd configuration parses logs using a regex parser. After a Kubernetes upgrade, logs from some pods appear as raw unparsed strings. Investigation reveals these pods use the containerd runtime. What is the issue?",
    diagram: null,
    options: [
      "A. Containerd uses the CRI log format wrapping JSON output, causing the regex parser to fail on the CRI envelope structure",
      "B. Containerd writes logs in binary protobuf format instead of text, requiring a specialized Fluentd input plugin for decoding",
      "C. The upgrade changed the log path from `/var/log/containers/` to `/var/log/pods/` and Fluentd reads from the old location",
      "D. Containerd rotates log files more aggressively than Docker, and Fluentd loses its file position tracking during rotation"
    ],
    answer: 0,
    explanation: "Containerd uses the CRI log format, where each log line is prefixed with a timestamp, stream identifier (stdout/stderr), and flags (P for partial, F for full), followed by the actual log content. This wrapping means that a JSON log line from the application becomes `2024-01-15T10:30:00.000Z stdout F {\"level\":\"info\",...}`. A regex parser designed for Docker's JSON log format will fail to match this structure. The fix is to use Fluentd's `parser` plugin configured for the CRI format or a multi-format parser.\n\nWhy other options are wrong:\n- B: Containerd writes logs in text format using the CRI log format, not binary protobuf; no special input plugin is needed\n- C: The log path did not change locations; /var/log/containers and /var/log/pods both still exist, with containers being symlinks to pods\n- D: Log rotation differences do not cause parsing failures; the issue is the CRI log format envelope wrapping the application log content\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/logging/#logging-at-the-node-level",
    verify: "kubectl exec -n logging <fluentd-pod> -- cat /var/log/pods/<namespace>_<pod>_<uid>/<container>/0.log | head -5"
  },
  {
    id: "s10-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The `kube-controller-manager` runs multiple controllers in a single process. The `--controllers` flag is set to `*,-bootstrapsigner,-tokencleaner`. A new CRD is installed with a corresponding custom controller deployed as a Deployment. Which statement is correct about the interaction between built-in and custom controllers?",
    diagram: null,
    options: [
      "A. The custom controller must register with the `kube-controller-manager` via the controller registration API to avoid resource conflicts",
      "B. The `--controllers` flag must include the custom controller name prefixed with `+` to enable it alongside the disabled built-in controllers",
      "C. Built-in controllers have priority over custom controllers for the same resource type, potentially causing reconciliation conflicts on CRDs",
      "D. The custom controller operates independently with its own informer cache; the `--controllers` flag only affects built-in controllers"
    ],
    answer: 3,
    explanation: "The `--controllers` flag on `kube-controller-manager` only controls which built-in controllers run within that process. Custom controllers are separate Deployments that maintain their own informer caches and establish independent watch connections to the API server. They do not need to register with `kube-controller-manager`. The `*,-bootstrapsigner,-tokencleaner` syntax means \"run all built-in controllers except bootstrapsigner and tokencleaner.\" Custom controllers have no interaction with this flag.\n\nWhy other options are wrong:\n- A: There is no controller registration API; custom controllers operate independently without registering with kube-controller-manager\n- B: The --controllers flag only controls built-in controllers; the + prefix enables disabled built-in controllers, not custom ones\n- C: Built-in controllers do not have inherent priority over custom controllers; they operate on different resource types with independent reconciliation\n\nReference: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/",
    verify: "kubectl get pods -n kube-system -l component=kube-controller-manager -o jsonpath='{.items[0].spec.containers[0].command}'"
  },
  {
    id: "s10-q034",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team performs a canary deployment using Istio VirtualService traffic splitting. The canary receives 10% of traffic. After monitoring for 30 minutes, error rates on the canary are 5x higher than the stable version. The Istio `VirtualService` weight is updated to send 0% to the canary. However, some users still report errors from the canary for several minutes after the change. Why?",
    diagram: null,
    options: [
      "A. Envoy sidecars cache VirtualService routing config and require a proxy restart to pick up newly updated traffic weights",
      "B. The Istio control plane (istiod) takes time to push the updated routing configuration to all Envoy sidecars in the mesh",
      "C. Long-lived HTTP/2 or gRPC connections established before the weight change continue routing to the canary until closed",
      "D. The VirtualService weight change requires the canary Deployment to be scaled to 0 replicas to stop receiving live traffic"
    ],
    answer: 2,
    explanation: "When traffic weights are updated in an Istio VirtualService, Envoy picks up the new configuration relatively quickly via xDS push from istiod. However, existing long-lived connections (particularly HTTP/2 and gRPC streams) are not affected by routing changes because they were already established to the canary pods. These connections continue to route requests to the canary until they are closed naturally or the canary pods are terminated. This is a well-known characteristic of connection-oriented protocols in service meshes.\n\nWhy other options are wrong:\n- A: Envoy sidecars receive xDS updates from istiod promptly and do not require restart to pick up config changes\n- B: Istiod pushes configuration updates relatively quickly; the propagation delay is typically seconds, not minutes\n- D: VirtualService weight changes are applied at the proxy level; scaling to 0 is not required for the routing change to take effect\n\nReference: https://istio.io/latest/docs/reference/config/networking/virtual-service/",
    verify: "kubectl get virtualservice <name> -o yaml && istioctl proxy-config routes <pod-name>"
  },
  {
    id: "s10-q035",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod spec includes both a `nodeSelector: {gpu: nvidia}` and a `nodeAffinity` with a `requiredDuringSchedulingIgnoredDuringExecution` rule matching nodes with label `zone: us-west-2a`. Node A has labels `gpu: nvidia` and `zone: us-west-2b`. Node B has labels `gpu: nvidia` and `zone: us-west-2a`. Node C has label `zone: us-west-2a` but no `gpu` label. Where is the pod scheduled?",
    diagram: null,
    options: [
      "A. Node A, because `nodeSelector` takes precedence over `nodeAffinity` and Node A satisfies the GPU requirement",
      "B. Node B, because it is the only node satisfying both the `nodeSelector` AND the `nodeAffinity` rule simultaneously",
      "C. Node C, because `nodeAffinity` with `required` rules overrides `nodeSelector` when both are specified",
      "D. The pod remains Pending because `nodeSelector` and `nodeAffinity` cannot be used together and the spec is invalid"
    ],
    answer: 1,
    explanation: "When both `nodeSelector` and `nodeAffinity` are specified, a node must satisfy ALL constraints. The `nodeSelector` requires `gpu: nvidia`, and the `nodeAffinity` requires `zone: us-west-2a`. Only Node B has both labels, making it the sole valid scheduling target. Node A fails the zone affinity, Node C fails the GPU selector. Both mechanisms are valid when used together and form an AND relationship — the pod is only scheduled on nodes matching all criteria.\n\nWhy other options are wrong:\n- A: nodeSelector does not take precedence over nodeAffinity; both constraints are evaluated together as an AND condition\n- C: nodeAffinity does not override nodeSelector; a node must satisfy both simultaneously\n- D: nodeSelector and nodeAffinity can be used together; the pod spec is valid and both constraints are enforced\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector",
    verify: "kubectl get nodes --show-labels | grep -E 'gpu|zone' && kubectl describe pod <pod-name> | grep 'Node:'"
  },
  {
    id: "s10-q036",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "An OPA Gatekeeper `ConstraintTemplate` enforces that all containers must have resource limits set. A pod with an init container specifying resource limits and a main container without limits is submitted. What is the result?",
    diagram: null,
    options: [
      "C. The result depends on the Rego policy — if it only iterates `input.review.object.spec.containers`, init containers are skipped",
      "B. The pod is rejected because Gatekeeper evaluates all containers including init, ephemeral, and regular containers in the spec",
      "A. The pod is admitted because Gatekeeper only validates the primary container specifications, not init containers in the pod spec",
      "D. The pod is admitted but flagged with a warning annotation because Gatekeeper uses `warn` enforcement for partial compliance"
    ],
    answer: 0,
    explanation: "OPA Gatekeeper's behavior depends entirely on the Rego code written in the `ConstraintTemplate`. If the Rego policy only iterates over `input.review.object.spec.containers`, it will not inspect init containers (which are at `input.review.object.spec.initContainers`). The ConstraintTemplate author must explicitly include checks for `initContainers` and `ephemeralContainers` to enforce policies across all container types. This is a common oversight in policy authoring that can lead to security gaps.\n\nWhy other options are wrong:\n- B: Gatekeeper does not automatically evaluate all container types; the Rego policy must explicitly iterate initContainers and ephemeralContainers\n- A: Gatekeeper does not silently skip containers; its behavior depends entirely on what the Rego policy iterates\n- D: Gatekeeper does not use warn enforcement for partial compliance unless explicitly configured with enforcementAction: warn\n\nReference: https://open-policy-agent.github.io/gatekeeper/website/docs/howto/",
    verify: "kubectl get constrainttemplate <name> -o jsonpath='{.spec.targets[0].rego}'"
  },
  {
    id: "s10-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Job with `parallelism: 4`, `completions: 10`, and `backoffLimit: 6` is running. Three pods have completed successfully. Two currently running pods fail simultaneously. How does the Job controller respond?",
    diagram: null,
    options: [
      "A. The controller creates 2 replacement pods immediately, maintaining the parallelism of 4, and increments the failure counter by 2",
      "B. The controller waits for all running pods to complete before creating new pods, as simultaneous failures trigger a serial execution mode",
      "C. The controller creates only 1 replacement pod because the combined running + completed count must not exceed `completions`",
      "D. The controller creates 2 replacement pods with exponential backoff delay, incrementing the total failure count to 2 out of the 6 limit"
    ],
    answer: 3,
    explanation: "When pods fail, the Job controller tracks the total number of failures against `backoffLimit`. With 3 completions and 4 running pods (full parallelism), 2 of the running pods fail simultaneously. This leaves 3 completed, 2 still running, and 2 failed (total failure count now 2 of 6 limit). The controller creates 2 replacement pods with exponential backoff delay to restore parallelism to 4, since 7 more completions are still needed. The backoff starts at 10 seconds and doubles up to 6 minutes.\n\nWhy other options are wrong:\n- A: The controller does not create replacements immediately without backoff; exponential backoff delay is applied to failed pod replacements\n- B: The controller does not switch to serial execution mode on simultaneous failures; it continues managing parallelism normally\n- C: The constraint is that running + pending should not exceed parallelism, not that running + completed should not exceed completions; replacements restore parallelism\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#handling-pod-and-container-failures",
    verify: "kubectl describe job <job-name> | grep -E 'Completions|Parallelism|Failed|Succeeded'"
  },
  {
    id: "s10-q038",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team migrating to cloud native architecture needs to decide on a service communication strategy. Service A (order processing) must call Service B (payment gateway) with guaranteed delivery even if B is temporarily unavailable. Service A also calls Service C (notification) where occasional message loss is acceptable. Which architecture best fits these requirements?",
    diagram: null,
    options: [
      "A. Synchronous REST calls for both B and C with retry middleware and circuit breakers to approximate guaranteed delivery",
      "D. Service mesh sidecars handling automatic retries for both B and C with configurable retry budgets per destination",
      "C. gRPC streaming for A-to-B with server-side retry interceptors, and webhook-based notifications for A-to-C events",
      "B. Async messaging with a persistent queue for A-to-B for guaranteed delivery, and fire-and-forget events for A-to-C"
    ],
    answer: 3,
    explanation: "The requirement for guaranteed delivery to Service B (payment) even during outages necessitates a persistent message queue (such as Kafka or RabbitMQ with durable queues) that retains messages until the consumer acknowledges processing. For Service C (notifications) where loss is acceptable, fire-and-forget async events provide decoupling without the overhead of guaranteed delivery. Synchronous calls (option A) cannot guarantee delivery during outages. Service mesh retries (option D) help with transient failures but do not persist messages across extended outages.\n\nWhy other options are wrong:\n- A: Synchronous REST calls cannot guarantee delivery during B's unavailability; retries have limits and circuit breakers eventually open\n- D: Service mesh retries handle transient failures but do not persist messages across extended outages lasting minutes or hours\n- C: gRPC streaming with server-side retries still fails during extended outages; webhooks for notifications add unnecessary complexity\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    verify: null
  },
  {
    id: "s10-q039",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator creates a `ValidatingWebhookConfiguration` with `failurePolicy: Fail` and a `namespaceSelector` that matches all namespaces. The webhook service goes down. What impact does this have on the cluster?",
    diagram: null,
    options: [
      "A. Only create and update operations on matched resources are blocked; read operations and deletions continue to work normally in all namespaces",
      "B. The API server automatically switches to `Ignore` failure policy after a configurable timeout to prevent total cluster lockout situation",
      "C. All matching API operations are rejected with 500 errors, including in `kube-system`, potentially making the cluster unmanageable",
      "D. Operations are queued by the API server for up to 30 seconds then processed without webhook validation if the service remains down"
    ],
    answer: 2,
    explanation: "With `failurePolicy: Fail`, any matching API request that cannot reach the webhook service is rejected. If the `namespaceSelector` matches all namespaces (including `kube-system`) and the webhook rules match broad resource types, a down webhook can block critical operations across the entire cluster. This is why it is a best practice to exclude `kube-system` from webhook selectors, use `failurePolicy: Ignore` for non-critical webhooks, and ensure webhook services are highly available. The API server does not auto-switch failure policies.\n\nWhy other options are wrong:\n- A: Read operations (GET, LIST) are typically not affected by validating webhooks; but the key issue is that all matching operations including creates in kube-system are blocked\n- B: The API server does not auto-switch failure policies; failurePolicy: Fail remains in effect regardless of webhook availability\n- D: Operations are not queued; they are immediately rejected with an error when the webhook service is unreachable\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
    verify: "kubectl get validatingwebhookconfigurations -o yaml | grep -E 'failurePolicy|namespaceSelector'"
  },
  {
    id: "s10-q040",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A container image built with a multi-stage Dockerfile uses `FROM scratch` as the final stage. The image runs a statically compiled Go binary. When deployed to Kubernetes, `kubectl exec` into the container fails with `OCI runtime exec failed: exec failed: unable to start container process: exec: \"/bin/sh\": stat /bin/sh: no such file or directory`. How should the team enable debugging for this pod?",
    diagram: null,
    options: [
      "B. Use `kubectl debug` to attach an ephemeral debug container with a shell sharing the pod's process namespace",
      "A. Add a `distroless/debug` base image as the final stage instead of `scratch` to include a busybox shell for debugging",
      "C. Mount a ConfigMap containing a statically compiled shell binary at `/bin/sh` in the container volume mount paths",
      "D. Rebuild the image with `FROM alpine` as the final stage and include `RUN apk add --no-cache bash` for shell access"
    ],
    answer: 0,
    explanation: "Ephemeral containers (via `kubectl debug`) are the Kubernetes-native solution for debugging minimal containers. By creating a debug container with `--target=<container>` and an image that includes debugging tools (like `busybox` or `ubuntu`), you get a shell that can share the process namespace of the target container. This allows inspecting processes, filesystem, and network without modifying the original image. Options A and D require rebuilding the image, which changes the production artifact. Option C is impractical.\n\nWhy other options are wrong:\n- A: Adding distroless/debug as the base image requires rebuilding the production image, which changes the production artifact\n- C: Mounting a ConfigMap with a shell binary is impractical; shell binaries have dependencies and ConfigMaps have size limits\n- D: Rebuilding with FROM alpine also requires modifying the production image and includes unnecessary packages in the final artifact\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container",
    verify: "kubectl debug -it <pod-name> --image=busybox --target=<container-name> -- /bin/sh"
  },
  {
    id: "s10-q041",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A Prometheus alerting rule fires when `rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m]) > 0.05` for 10 minutes. The SRE team notices the alert fires during a deployment window when traffic drops to near-zero, even though only 1 request out of 20 returned a 500 error. What adjustment prevents false positives during low-traffic periods?",
    diagram: null,
    options: [
      "A. Change the alert threshold from 5% to 10% to account for statistical insignificance during low-traffic deployment windows",
      "B. Replace `rate()` with `increase()` to use absolute counts instead of per-second rates, which are less sensitive to low volume",
      "C. Increase the `for` duration from 10 to 30 minutes so the alert waits for traffic to normalize before firing during deployments",
      "D. Add a minimum request rate condition: only fire when error ratio exceeds 5% AND `rate(http_requests_total[5m]) > 1`"
    ],
    answer: 3,
    explanation: "At low traffic volumes, error rate percentages can be misleading — 1 error out of 20 requests yields a 5% error rate. Adding a minimum request rate threshold (e.g., `> 1` request per second) ensures the alert only fires when there is sufficient traffic volume for the error rate to be statistically meaningful. This is a standard practice in SRE for preventing alert noise during maintenance windows or low-traffic periods. Simply raising the threshold (option A) would miss real issues at normal traffic levels.\n\nWhy other options are wrong:\n- A: Raising the threshold to 10% masks real issues at normal traffic volumes where 5% errors would be significant\n- B: Using increase() instead of rate() changes the metric to absolute counts but does not address the statistical significance problem at low volumes\n- C: Increasing the for duration delays all alerts equally, not just low-traffic ones; it could miss genuine issues during normal traffic\n\nReference: https://prometheus.io/docs/practices/alerting/",
    verify: "curl -s http://localhost:9090/api/v1/rules | jq '.data.groups[].rules[] | select(.name==\"HighErrorRate\")'"
  },
  {
    id: "s10-q042",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod has a `readinessProbe` with `httpGet` on path `/healthz`, port 8080, `periodSeconds: 5`, `failureThreshold: 3`, and `successThreshold: 2`. The application starts returning 503 from `/healthz`. How long after the first failed probe does the pod stop receiving Service traffic?",
    diagram: null,
    options: [
      "A. 5 seconds — the first probe failure immediately marks the pod as not ready and removes it from service endpoints",
      "B. 15 seconds — three consecutive failures at 5-second intervals are required to trigger the not-ready transition state",
      "C. 10 seconds — three failures occur but the first probe runs at time 0, so it only takes 2 additional intervals total",
      "D. 10 seconds — the second failure at time 10s triggers endpoint removal because the threshold counts from initial success"
    ],
    answer: 2,
    explanation: "The readiness probe runs every `periodSeconds` (5s). Starting from the first failed probe at time T=0, subsequent probes run at T=5 and T=10. After 3 consecutive failures (at T=0, T=5, T=10), the kubelet marks the pod as not ready. The EndpointSlice controller then removes the pod from the Service's endpoints. So the pod stops receiving traffic approximately 10 seconds after the first failed probe (the third failure occurs at T=10). The `successThreshold: 2` only affects how many successes are needed to return to ready state.\n\nWhy other options are wrong:\n- A: The first failure does not immediately mark the pod as not ready; failureThreshold: 3 requires three consecutive failures\n- B: Three failures at 5-second intervals starting at T=0 means the third failure is at T=10, not T=15\n- D: The threshold counts from the first failure, not from a previous success; the second failure at T=5 is not the trigger point\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes",
    verify: "kubectl describe pod <pod-name> | grep -A10 'Readiness:' && kubectl get endpoints <svc-name>"
  },
  {
    id: "s10-q043",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster uses kube-proxy in IPVS mode. A Service with `sessionAffinity: None` has 3 backend pods. The IPVS scheduler is set to `rr` (round-robin). One pod consistently handles 70% of the traffic instead of the expected 33%. Network captures show the traffic comes from a small number of source IPs behind a corporate NAT gateway. What explains this distribution?",
    diagram: null,
    options: [
      "A. IPVS round-robin is per-connection, not per-packet; the NAT gateway reuses connections, skewing pod distribution",
      "B. IPVS in `rr` mode has a warmup period favoring the first registered backend until all backends receive at least one connection",
      "C. The overloaded pod has the lowest IP address and IPVS round-robin starts from the lowest IP for each new connection cycle",
      "D. kube-proxy IPVS uses consistent hashing internally even with `rr` configured, causing sticky routing for same source IPs"
    ],
    answer: 0,
    explanation: "IPVS round-robin distributes connections sequentially across backends. However, the distribution is per-connection, not per-request. When clients behind a NAT gateway use HTTP/1.1 keep-alive or HTTP/2 with connection pooling, a small number of long-lived connections carry many requests. If these connections happen to land on the same backend (which is likely with few connections from few source IPs), that backend handles a disproportionate share of traffic. The solution is to use `lc` (least-connection) scheduler or application-level load balancing.\n\nWhy other options are wrong:\n- B: IPVS round-robin does not have a warmup period that favors the first backend; it distributes connections sequentially from the start\n- C: IPVS round-robin does not start from the lowest IP each cycle; it maintains a circular pointer across all connections\n- D: kube-proxy does not use consistent hashing internally when rr is configured; IPVS strictly follows the configured scheduling algorithm\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/#session-affinity",
    verify: "ipvsadm -Ln --stats && kubectl get svc <name> -o jsonpath='{.spec.sessionAffinity}'"
  },
  {
    id: "s10-q044",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team needs to implement policy-as-code for their Kubernetes clusters. They require policies that can mutate incoming resources (e.g., inject labels), validate them, and generate new resources based on triggers. Which CNCF project provides all three capabilities?",
    diagram: null,
    options: [
      "A. OPA/Gatekeeper — it handles validation and mutation through ConstraintTemplates and can generate resources via its audit controller",
      "B. Falco — it provides runtime security policies that can detect, alert on, and remediate policy violations including resource generation",
      "D. Open Policy Agent standalone — it provides mutation and validation via Rego policies and generates resources through its decision log integration",
      "C. Kyverno — it provides validate, mutate, and generate policy rules within a single policy definition using Kubernetes-native declarative syntax"
    ],
    answer: 3,
    explanation: "Kyverno is a CNCF Incubating project that provides all three capabilities natively: `validate` rules for admission control, `mutate` rules for modifying resources (e.g., injecting labels, setting defaults), and `generate` rules for creating new resources when triggers are matched (e.g., creating a NetworkPolicy whenever a new namespace is created). OPA/Gatekeeper primarily handles validation (and mutation was added later) but does not generate resources. Falco is a runtime security tool, not an admission controller.\n\nWhy other options are wrong:\n- A: OPA/Gatekeeper primarily handles validation; mutation support was added later and it cannot generate resources from triggers\n- B: Falco is a runtime security/threat detection tool, not an admission controller; it cannot mutate, validate, or generate Kubernetes resources\n- D: OPA standalone provides policy decisions but does not have built-in resource generation capability through decision logs\n\nReference: https://kyverno.io/docs/writing-policies/",
    verify: "kubectl get clusterpolicy -o wide && kubectl get policyreport -A"
  },
  {
    id: "s10-q045",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod has `resources.requests.cpu: 4` and `resources.limits.cpu: 4` with `resources.requests.memory: 8Gi` and `resources.limits.memory: 8Gi`. What QoS class is assigned, and what is the eviction priority during node memory pressure?",
    diagram: null,
    options: [
      "C. `Guaranteed` QoS — but it can still be evicted before `BestEffort` pods if actual memory consumption exceeds `limits.memory`",
      "B. `Burstable` QoS — the CPU value of 4 exceeds the typical node allocatable capacity, so the pod is classified as burstable",
      "A. `Guaranteed` QoS — this pod is last to be evicted during memory pressure because requests equal limits for all resources",
      "D. `Guaranteed` QoS — it is evicted after `Burstable` pods but before `BestEffort` pods during node memory pressure events"
    ],
    answer: 2,
    explanation: "When all containers in a pod have matching requests and limits for both CPU and memory, the pod receives the `Guaranteed` QoS class. During node memory pressure, the kubelet evicts pods in order: `BestEffort` first (no requests or limits), then `Burstable` (requests < limits or partially specified), and finally `Guaranteed` as a last resort. A `Guaranteed` pod is the most protected class during eviction. Option C is incorrect because a pod exceeding its memory limit is OOM-killed, not evicted through the standard eviction process.\n\nWhy other options are wrong:\n- C: A Guaranteed pod exceeding memory limits is OOM-killed, not evicted; OOM kill is different from the kubelet eviction process\n- B: CPU value of 4 does not affect QoS classification; QoS depends only on whether requests equal limits, not on absolute values\n- D: BestEffort pods are evicted first during memory pressure, then Burstable, then Guaranteed; the order in option D is reversed\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/#guaranteed",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.qosClass}'"
  },
  {
    id: "s10-q046",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline uses Tekton Pipelines to build and deploy an application. A `Pipeline` has three sequential `Tasks`: `git-clone`, `build-image`, and `deploy`. The `build-image` task needs the source code from `git-clone` and must pass the built image tag to `deploy`. Which Tekton mechanism correctly passes data between these tasks?",
    diagram: null,
    options: [
      "A. Use `PipelineResources` of type `git` and `image` to automatically wire inputs and outputs between the sequential tasks",
      "B. Mount a shared `PersistentVolumeClaim` across all tasks and write data to agreed paths; use env vars for the image tag",
      "D. Use Tekton `Conditions` to evaluate each task output and dynamically inject the parameters into the subsequent task run",
      "C. Use `Workspaces` for sharing cloned source and `Task Results` to pass the image tag from `build-image` to `deploy`"
    ],
    answer: 3,
    explanation: "Tekton's recommended approach for inter-task data sharing combines `Workspaces` and `Results`. Workspaces (backed by PVCs or other volume types) provide shared filesystem access for large data like source code. Task Results are small string outputs (limited to 4096 bytes) stored by a task and consumable as parameters by downstream tasks — perfect for passing an image tag. `PipelineResources` (option A) have been deprecated. Option B works but is less idiomatic because it relies on convention-based file paths rather than Tekton's native Workspace and Result abstractions.\n\nWhy other options are wrong:\n- A: PipelineResources are deprecated in Tekton and should not be used for new pipelines; they lack flexibility and are being removed\n- B: Shared PVC with agreed paths works but is less idiomatic than Workspaces; using env vars for image tags is fragile compared to Results\n- D: Tekton Conditions are deprecated (replaced by WhenExpressions); they were for conditional execution, not for passing parameters\n\nReference: https://tekton.dev/docs/pipelines/pipelines/#using-results",
    verify: "kubectl get pipeline <name> -o yaml | grep -A10 'results\\|workspaces'"
  },
  {
    id: "s10-q047",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Kubernetes cluster runs version 1.29. A CRD is created with two stored versions: `v1alpha1` and `v1beta1`, with `v1beta1` as the served and storage version. A conversion webhook is configured. An existing `v1alpha1` resource is stored in etcd. A client requests the resource via the `v1beta1` API. What happens?",
    diagram: null,
    options: [
      "A. The API server reads the `v1alpha1` object from etcd and returns it directly, since both versions are stored in the CRD spec",
      "B. The API server serves a cached `v1beta1` version that was pre-converted when the CRD storage version was originally updated",
      "C. The request is rejected because `v1alpha1` resources cannot be served via `v1beta1` without first running a storage migration",
      "D. The API server reads the `v1alpha1` object from etcd, calls the conversion webhook to convert it, and returns `v1beta1`"
    ],
    answer: 3,
    explanation: "When a client requests a CRD resource at a version different from its stored version in etcd, the API server uses the configured conversion webhook to transform the object between versions on the fly. The resource remains stored in etcd in its original version (`v1alpha1`) until a storage migration is explicitly run. The conversion webhook handles bidirectional conversion, allowing resources stored in any version to be served at any other served version. This is the core mechanism for CRD version evolution.\n\nWhy other options are wrong:\n- A: The API server does not return the raw stored version directly; it converts to the requested version using the conversion webhook\n- B: The API server does not pre-convert and cache resources; conversion happens on-demand when a different version is requested\n- C: The request is not rejected; the conversion webhook enables serving resources in any served version regardless of stored version\n\nReference: https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning/#webhook-conversion",
    verify: "kubectl get crd <crd-name> -o jsonpath='{.spec.conversion}' && kubectl get <resource> -o yaml | grep apiVersion"
  },
  {
    id: "s10-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A headless Service (`clusterIP: None`) is created for a StatefulSet with 3 replicas named `web-0`, `web-1`, and `web-2` in namespace `default`. The Service name is `web-svc`. A pod in the same namespace performs a DNS lookup for `web-svc.default.svc.cluster.local`. What DNS records are returned?",
    diagram: null,
    options: [
      "A. A single A record pointing to the kube-proxy virtual IP that load-balances across all three backend pod IP addresses",
      "B. A CNAME record pointing to the StatefulSet's stable network identity, which then resolves to the current leader pod IP",
      "C. Three A records, one for each pod IP, allowing the client DNS resolver to perform client-side load balancing",
      "D. Three SRV records mapping to `web-0.web-svc`, `web-1.web-svc`, and `web-2.web-svc` in the default namespace"
    ],
    answer: 2,
    explanation: "A headless Service (with `clusterIP: None`) does not get a virtual IP. When the Service name is queried via DNS, CoreDNS returns individual A records for each ready pod backing the service. For a StatefulSet with 3 replicas, three A records are returned, each containing a pod's IP address. Additionally, each pod gets a stable DNS hostname (`web-0.web-svc.default.svc.cluster.local`), but a direct A-record query for the Service name returns all pod IPs as A records. SRV records are also available for headless Services (via `_<port>._<protocol>.<svc>` queries), but option D is incorrect because a direct name query returns A records, not SRV records.\n\nWhy other options are wrong:\n- A: A headless Service has no virtual IP (clusterIP: None); kube-proxy does not handle its traffic and there is no VIP\n- B: Headless Services do not return CNAME records; they return individual A records for each pod, and there is no leader concept\n- D: A direct name query for a headless Service returns A records, not SRV records; SRV records require a specific query format\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#services",
    verify: "kubectl exec <test-pod> -- nslookup web-svc.default.svc.cluster.local && kubectl get endpoints web-svc"
  },
  {
    id: "s10-q049",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod in state `CrashLoopBackOff` has the following events:\n```\nWarning  BackOff  kubelet  Back-off restarting failed container\nNormal   Pulled   kubelet  Container image already present on machine\nWarning  Failed   kubelet  Error: failed to create containerd task: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: \"app\": executable file not found in $PATH\n```\nThe Dockerfile's last line is `CMD [\"app\"]`. The image was built successfully. What is the root cause?",
    diagram: null,
    options: [
      "A. The binary `app` was compiled for a different CPU architecture (e.g., ARM) than the node's architecture (e.g., AMD64)",
      "B. The `CMD` should use shell form (`CMD app`) instead of exec form (`CMD [\"app\"]`) to resolve the binary via `$PATH`",
      "C. The binary `app` exists in the build stage but was not copied to the final stage in the multi-stage Dockerfile",
      "D. The container's `securityContext` has `readOnlyRootFilesystem: true`, preventing runtime access to the binary path"
    ],
    answer: 2,
    explanation: "The error `executable file not found in $PATH` indicates the binary literally does not exist in the container's filesystem. In multi-stage builds, this commonly occurs when the developer forgets to `COPY --from=builder /app/app /usr/local/bin/app` (or similar) in the final stage. The image builds successfully because the binary exists in the build stage, but the final runtime image does not contain it. Architecture mismatches (option A) produce `exec format error`, not \"file not found.\" Shell form CMD would not help if the binary is missing.\n\nWhy other options are wrong:\n- A: Architecture mismatch produces 'exec format error', not 'executable file not found in $PATH'\n- B: Shell form CMD would invoke /bin/sh -c which also would fail if the binary is missing; switching form does not help\n- D: readOnlyRootFilesystem does not prevent reading existing binaries; it only blocks writes to the root filesystem\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/",
    verify: "kubectl describe pod <pod-name> | grep -A5 'Last State' && docker run --rm --entrypoint ls <image> /usr/local/bin/"
  },
  {
    id: "s10-q050",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team designs their Kubernetes deployment strategy around the principle of immutable infrastructure. Which practice violates this principle?",
    diagram: null,
    options: [
      "A. Using `kubectl exec` to enter a running container and apply a hotfix directly to the application binary",
      "B. Building a new container image for every code change and deploying it through a controlled rolling update",
      "C. Storing application configuration in ConfigMaps mounted as volumes that trigger pod restarts on changes",
      "D. Using init containers to download and cache static assets from a CDN into an `emptyDir` volume at startup"
    ],
    answer: 0,
    explanation: "Immutable infrastructure means that deployed artifacts are never modified in place. Instead, changes require building a new artifact (container image) and deploying it through the standard pipeline. Using `kubectl exec` to modify a running container directly violates this principle because the change is not captured in version control, is not reproducible, and will be lost on pod restart. Options B, C, and D are all consistent with immutable infrastructure — they either deploy new images, use declarative configuration, or perform idempotent initialization.\n\nWhy other options are wrong:\n- B: Building a new image for every code change and deploying via rolling update IS immutable infrastructure; artifacts are never modified in place\n- C: ConfigMaps mounted as volumes providing declarative configuration is consistent with immutable infrastructure principles\n- D: Init containers downloading assets at startup is idempotent initialization, not mutation of a running system\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/",
    verify: null
  },
  {
    id: "s10-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment runs pods with a `preStop` lifecycle hook that sends a SIGTERM to the application and waits for graceful shutdown. The pod also has `terminationGracePeriodSeconds: 30`. The `preStop` hook takes 25 seconds to complete. After the hook finishes, how much time does the application have to respond to the subsequent SIGTERM from the kubelet?",
    diagram: null,
    options: [
      "A. 30 seconds — the `terminationGracePeriodSeconds` counter resets after the `preStop` hook finishes its execution",
      "B. 5 seconds — `terminationGracePeriodSeconds` includes `preStop` hook time, leaving only the remainder for SIGTERM",
      "C. 25 seconds — the kubelet deducts the `preStop` duration and adds a 20-second buffer for SIGTERM signal handling",
      "D. Indefinitely — once the `preStop` hook signals graceful shutdown, the kubelet waits for the process to exit cleanly"
    ],
    answer: 1,
    explanation: "The `terminationGracePeriodSeconds` is a total budget that covers both the `preStop` hook execution and the time after SIGTERM is sent. If the `preStop` hook takes 25 seconds of the 30-second budget, only 5 seconds remain for the container to handle the SIGTERM and shut down gracefully. After the total grace period expires, the kubelet sends SIGKILL to forcefully terminate the container. This is a common source of unexpected forced kills when `preStop` hooks are long-running.\n\nWhy other options are wrong:\n- A: The terminationGracePeriodSeconds does NOT reset after preStop; it is a single budget covering both preStop and SIGTERM handling\n- C: There is no 20-second buffer; the kubelet deducts preStop time from the total grace period with no additional buffer\n- D: The kubelet does not wait indefinitely; after terminationGracePeriodSeconds expires, SIGKILL is sent to forcefully terminate\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
    verify: "kubectl describe pod <pod-name> | grep -E 'Grace Period|preStop'"
  },
  {
    id: "s10-q052",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A pod's container runs as UID 1000 and has `securityContext.readOnlyRootFilesystem: true`. The application needs to write temporary files to `/tmp` and log files to `/var/log/app`. Which volume configuration allows the application to function while maintaining the read-only filesystem security posture?",
    diagram: null,
    options: [
      "A. Mount two `emptyDir` volumes at `/tmp` and `/var/log/app`; the read-only policy does not apply to mounts",
      "B. Add `allowedHostPaths` entries for `/tmp` and `/var/log/app` in PodSecurityPolicy to whitelist writable paths",
      "C. Set `readOnlyRootFilesystem: false` but use an OPA policy to restrict writes to only `/tmp` and `/var/log/app`",
      "D. Use `subPath` mounts from a single `emptyDir` volume to both paths, which bypasses the read-only constraint"
    ],
    answer: 0,
    explanation: "When `readOnlyRootFilesystem: true` is set, the container's root filesystem is mounted read-only. However, volumes mounted into the container are independent of this setting. Mounting `emptyDir` volumes at `/tmp` and `/var/log/app` provides writable directories at those paths while keeping the rest of the filesystem read-only. This is the standard pattern for applications that need specific writable directories. PodSecurityPolicy (option B) is deprecated, and option D's reasoning about bypassing is incorrect — subPath works but the explanation is wrong.\n\nWhy other options are wrong:\n- B: PodSecurityPolicy is deprecated and removed since K8s 1.25; allowedHostPaths is not a current mechanism\n- C: Disabling readOnlyRootFilesystem removes an important security layer; OPA cannot enforce filesystem-level write restrictions\n- D: subPath does not bypass readOnlyRootFilesystem; the explanation is incorrect, and the real reason emptyDir works is that volume mounts are independent of root filesystem settings\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].volumeMounts}' | jq . && kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].securityContext}'"
  },
  {
    id: "s10-q053",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices system uses the API Gateway pattern. The gateway handles authentication, rate limiting, and request routing. During peak traffic, the gateway becomes a bottleneck with p99 latency exceeding 2 seconds. Adding more gateway replicas improves throughput but not latency. What is the most likely architectural issue?",
    diagram: null,
    options: [
      "B. The gateway replicas share a single database connection pool for rate-limiting state, causing lock contention overhead",
      "A. The gateway performs synchronous JWT validation against an external identity provider on each request, adding latency",
      "C. Adding replicas increases total connections to backend services, causing backend connection pool exhaustion issues",
      "D. The gateway load balancer uses layer-4 TCP routing, causing uneven connection distribution among gateway replicas"
    ],
    answer: 1,
    explanation: "When adding replicas improves throughput but not per-request latency, the bottleneck is in the serial processing of each request rather than overall capacity. Synchronous JWT validation against an external identity provider adds a network round-trip to every request's critical path, creating a latency floor that cannot be reduced by horizontal scaling. The solution is to cache validated tokens locally (with appropriate TTL) or use offline JWT validation with a locally cached public key. Options B and D would affect throughput, not per-request latency uniformly.\n\nWhy other options are wrong:\n- B: A shared database connection pool could cause contention but would affect throughput, not uniform per-request latency across all replicas\n- C: Backend connection exhaustion would cause errors, not uniform latency increase; and it would worsen with more replicas\n- D: Layer-4 routing causes uneven distribution which affects some requests but not uniform latency increase for every request\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: null
  },
  {
    id: "s10-q054",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A pod specifies `affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution` with `topologyKey: kubernetes.io/hostname` and a `labelSelector` matching itself. The Deployment has 4 replicas and the cluster has 3 nodes. What happens?",
    diagram: null,
    options: [
      "A. All 4 replicas are scheduled — anti-affinity is per-replica and does not prevent co-location within the same Deployment",
      "B. 3 replicas schedule (one per node) and the 4th remains Pending because no node satisfies the anti-affinity constraint",
      "C. The scheduler ignores anti-affinity for the 4th replica and co-locates it with an existing replica on the least-loaded node",
      "D. All 4 replicas remain Pending because the anti-affinity creates a circular dependency that the scheduler cannot resolve"
    ],
    answer: 1,
    explanation: "Required pod anti-affinity with `topologyKey: kubernetes.io/hostname` ensures that no two pods matching the label selector are placed on the same node. With 3 nodes, only 3 replicas can be scheduled (one per node). The 4th replica cannot find a node without a matching pod, so it remains Pending indefinitely. The `required` level is a hard constraint — the scheduler will not violate it. Using `preferred` anti-affinity would allow the 4th pod to be co-located as a soft preference.\n\nWhy other options are wrong:\n- A: Anti-affinity is not per-replica in a special way; it prevents co-location of any matching pods, including within the same Deployment\n- C: The scheduler does not ignore required anti-affinity; required constraints are hard rules that cannot be violated\n- D: Pods do not all remain Pending; the first three can be scheduled one per node without violating anti-affinity\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity",
    verify: "kubectl get pods -o wide -l app=<name> && kubectl describe pod <pending-pod> | grep -A5 Events"
  },
  {
    id: "s10-q055",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A platform team implements distributed tracing with OpenTelemetry. They configure a `sampling.ratio` of 0.01 (1%) in production. A critical user reports a failed transaction, but the trace for that transaction was not sampled. What tracing strategy would capture this trace while maintaining the low sampling overhead?",
    diagram: null,
    options: [
      "A. Switch to 100% sampling and use tail-based sampling at the collector to retain only traces with errors or high latency",
      "B. Increase head-based sampling ratio to 10% and accept additional overhead for better coverage of error scenarios overall",
      "C. Configure the SDK with a composite sampler: always sample traces with error status and probabilistically sample the rest",
      "D. Use a separate trace pipeline for error cases that sends traces directly to the backend, bypassing sampling configuration"
    ],
    answer: 0,
    explanation: "Tail-based sampling makes the sampling decision after the complete trace is collected, allowing retention of traces that exhibit interesting characteristics (errors, high latency, specific status codes) while dropping routine traces. The services generate 100% of spans but the collector makes the keep/drop decision. This captures all error traces including the user's failed transaction. Option C with head-based composite sampling cannot work because the error status is often only known at the end of the span, not at creation time. The trade-off is higher network and collector processing cost.\n\nWhy other options are wrong:\n- B: Increasing head-based sampling to 10% still misses 90% of traces including potentially all error traces; it does not guarantee error capture\n- C: Head-based composite sampling cannot reliably sample errors because the error status is often unknown at span creation time\n- D: A separate trace pipeline bypassing sampling adds complexity and still requires instrumentation changes; it is not a standard approach\n\nReference: https://opentelemetry.io/docs/concepts/sampling/",
    verify: null
  },
  {
    id: "s10-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A namespace has two ResourceQuotas:\n- `quota-compute`: `requests.cpu: 4, limits.cpu: 8`\n- `quota-objects`: `count/deployments.apps: 10, count/services: 5`\n\nWhen a new Deployment is created, which quotas must have available capacity?",
    diagram: null,
    options: [
      "A. Both quotas reject the Deployment immediately because it references resources tracked by quota-compute",
      "C. Only `quota-objects` is checked at Deployment creation; `quota-compute` is checked when the ReplicaSet creates pods",
      "B. Both quotas are checked simultaneously — `quota-objects` for Deployment count and `quota-compute` for the resulting pods",
      "D. Neither quota is checked at Deployment creation — all resource quota enforcement is deferred to pod scheduling time"
    ],
    answer: 1,
    explanation: "ResourceQuota enforcement happens at admission time for the specific resource being created. When a Deployment is created, only `quota-objects` is checked (for `count/deployments.apps`). The Deployment itself is not a compute resource — it is a controller object. The compute quota (`requests.cpu`, `limits.cpu`) is enforced later when the ReplicaSet controller creates pods. This two-phase enforcement means a Deployment can be created even if compute quota would prevent all its pods from running.\n\nWhy other options are wrong:\n- A: Both quotas do not reject the Deployment; quota-compute is only checked when pods are created, not when the Deployment object is created\n- B: Both quotas are not checked simultaneously at Deployment creation; only the object count quota applies to the Deployment resource\n- D: Quota enforcement is not deferred to scheduling; it happens at admission time when the specific resource (pod) is created\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits",
    verify: "kubectl describe resourcequota -n <namespace>"
  },
  {
    id: "s10-q057",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A multi-tenant cluster uses Cilium as the CNI with `HostPort` support. Tenant A's pod uses `hostPort: 8080`. Tenant B deploys a pod also requesting `hostPort: 8080`. Both pods are scheduled on the same node. What happens?",
    diagram: null,
    options: [
      "A. Both pods start successfully because Cilium uses network namespaces to isolate `hostPort` bindings per tenant context",
      "B. Tenant B's pod fails to schedule on that node because the scheduler checks `hostPort` conflicts during scheduling",
      "C. Both pods are scheduled but Tenant B enters `CrashLoopBackOff` because the port is already bound at the host level",
      "D. Cilium's network policy engine blocks Tenant B's `hostPort` request at the CNI level and returns an error to kubelet"
    ],
    answer: 1,
    explanation: "The Kubernetes scheduler considers `hostPort` declarations during scheduling. When evaluating a node for a pod, the scheduler checks whether the requested `hostPort` is already in use by another pod on that node. If the port conflicts, the node is filtered out during the `NodePorts` filter plugin. If no other node is available with the port free, Tenant B's pod remains Pending. The conflict is detected at scheduling time, not at runtime, preventing the race condition described in option C.\n\nWhy other options are wrong:\n- A: hostPort bindings are not isolated per tenant via network namespaces; they bind to the host network directly\n- C: The scheduler prevents scheduling before the pod starts; hostPort conflicts are detected at scheduling time, not at runtime\n- D: Cilium's network policy engine does not handle hostPort allocation; the scheduler's NodePorts filter plugin handles conflicts\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    verify: "kubectl describe pod <tenant-b-pod> | grep -A5 Events && kubectl get pods -o wide --field-selector spec.nodeName=<node>"
  },
  {
    id: "s10-q058",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A highly available Kubernetes cluster has 3 control-plane nodes, each running `kube-apiserver`, `kube-controller-manager`, and `kube-scheduler`. How do the controller-manager and scheduler coordinate to prevent duplicate work across the 3 instances?",
    diagram: "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='20' width='100' height='70' rx='6' fill='#326CE5' stroke='#fff' stroke-width='1.5'/><text x='80' y='42' text-anchor='middle' fill='#fff' font-size='9'>Control Plane 1</text><text x='80' y='57' text-anchor='middle' fill='#aaa' font-size='8'>kube-cm</text><text x='80' y='72' text-anchor='middle' fill='#aaa' font-size='8'>kube-scheduler</text><rect x='150' y='20' width='100' height='70' rx='6' fill='#326CE5' stroke='#fff' stroke-width='1.5'/><text x='200' y='42' text-anchor='middle' fill='#fff' font-size='9'>Control Plane 2</text><text x='200' y='57' text-anchor='middle' fill='#aaa' font-size='8'>kube-cm</text><text x='200' y='72' text-anchor='middle' fill='#aaa' font-size='8'>kube-scheduler</text><rect x='270' y='20' width='100' height='70' rx='6' fill='#326CE5' stroke='#fff' stroke-width='1.5'/><text x='320' y='42' text-anchor='middle' fill='#fff' font-size='9'>Control Plane 3</text><text x='320' y='57' text-anchor='middle' fill='#aaa' font-size='8'>kube-cm</text><text x='320' y='72' text-anchor='middle' fill='#aaa' font-size='8'>kube-scheduler</text><rect x='100' y='120' width='200' height='40' rx='6' fill='#1a1a2e' stroke='#FF9800' stroke-width='1.5'/><text x='200' y='145' text-anchor='middle' fill='#FF9800' font-size='10'>???</text><line x1='80' y1='90' x2='180' y2='118' stroke='#aaa' stroke-width='1.5'/><line x1='200' y1='90' x2='200' y2='118' stroke='#aaa' stroke-width='1.5'/><line x1='320' y1='90' x2='220' y2='118' stroke='#aaa' stroke-width='1.5'/></svg>",
    options: [
      "A. All three instances process work simultaneously using distributed locking on individual resources stored in `etcd`",
      "D. They use leader election via Lease objects in `kube-system`; only the leader reconciles while others stand by",
      "C. The API server round-robins controller requests across the three instances using an internal load balancer proxy",
      "B. Each instance watches a partitioned subset of namespaces, dividing the workload using consistent hashing strategy"
    ],
    answer: 1,
    explanation: "The `kube-controller-manager` and `kube-scheduler` use leader election to ensure only one active instance at a time. They create and renew `Lease` objects (in the `kube-system` namespace) to claim leadership. The leader performs all reconciliation work, while standby instances continuously attempt to acquire the lease. If the leader fails to renew its lease (due to crash or network partition), a standby instance acquires it and becomes the new leader. This is configured via the `--leader-elect=true` flag (enabled by default in HA setups).\n\nWhy other options are wrong:\n- A: All three instances do NOT process work simultaneously; only the leader performs reconciliation to prevent duplicate work\n- C: The API server does not round-robin controller requests; the controller-manager and scheduler have their own leader election\n- B: Instances do not partition namespaces; a single leader handles all reconciliation across the entire cluster\n\nReference: https://kubernetes.io/docs/concepts/architecture/leases/#leader-election",
    verify: "kubectl get lease -n kube-system && kubectl describe lease kube-controller-manager -n kube-system"
  },
  {
    id: "s10-q059",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team containerizes a legacy application that stores user sessions in local filesystem files under `/var/sessions`. The application runs as a Deployment with 3 replicas behind a ClusterIP Service. Users report that they are randomly logged out. What is the root cause and the best cloud native solution?",
    diagram: null,
    options: [
      "A. Use a `ReadWriteMany` PersistentVolume shared across all replicas so every pod can access the same session files stored on disk",
      "B. Replace filesystem sessions with external Redis or Memcached and use `sessionAffinity: ClientIP` as a transitional step",
      "C. Convert the Deployment to a StatefulSet so each replica gets a dedicated PersistentVolume for storing its own session files",
      "D. Add `sessionAffinity: ClientIP` to the Service to ensure each user always reaches the same pod where their session is stored"
    ],
    answer: 1,
    explanation: "The root cause is that local filesystem sessions are pod-local. When a load-balanced Service routes a user to a different pod, their session file does not exist there. The cloud native solution is to externalize session state to a shared store (Redis, Memcached) following the Twelve-Factor App principle of stateless processes (Factor VI). While `sessionAffinity` (option D) can work short-term, it breaks during rolling updates, pod restarts, or scaling events. Option A introduces I/O contention. Option B correctly combines the long-term fix with a transitional measure.\n\nWhy other options are wrong:\n- A: ReadWriteMany PV creates I/O contention and introduces a shared filesystem dependency; it is not the cloud native approach\n- C: StatefulSet with dedicated PVs means each replica only has its own sessions; users routed to different replicas still lose sessions\n- D: sessionAffinity: ClientIP breaks during rolling updates, pod restarts, or scaling; it is a workaround, not a long-term solution\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies",
    verify: null
  },
  {
    id: "s10-q060",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A CSI driver provides block storage volumes. A pod requests a PVC with `volumeMode: Block` and mounts it using `volumeDevices` instead of `volumeMounts`. Inside the container, the device appears at `/dev/xvda`. The application attempts to mount the device with `mount /dev/xvda /data` and fails with `mount: /dev/xvda: can't find in /etc/fstab`. What is the correct approach?",
    diagram: null,
    options: [
      "A. Add an entry to `/etc/fstab` inside the container image for the block device path and the desired filesystem type",
      "B. Use an init container to run `mkfs.ext4 /dev/xvda` before the app container starts, then mount in the main container",
      "C. Change the PVC to `volumeMode: Filesystem` so the CSI driver formats and mounts the volume automatically via kubelet",
      "D. Add a `formatOptions` field in the StorageClass parameters to have the block device pre-formatted before pod attachment"
    ],
    answer: 2,
    explanation: "When `volumeMode: Block` is used, the raw block device is presented to the container without any filesystem — the application is responsible for all I/O operations directly on the block device. Most applications expect a formatted filesystem. By changing to `volumeMode: Filesystem` (the default), the kubelet instructs the CSI driver to format the volume (if needed) and mount it at the specified path. This is the standard approach for applications that use regular file I/O. Raw block mode is intended for databases or applications that manage their own on-disk format.\n\nWhy other options are wrong:\n- A: Adding fstab entries inside the container does not help; the block device has no filesystem to mount in the first place\n- B: Running mkfs in an init container works but requires elevated privileges and adds unnecessary complexity compared to using Filesystem mode\n- D: There is no formatOptions field in StorageClass parameters; filesystem formatting is handled by kubelet with volumeMode: Filesystem\n\nReference: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#volume-mode",
    verify: "kubectl get pvc <pvc-name> -o jsonpath='{.spec.volumeMode}' && kubectl describe pod <pod-name> | grep -A5 'Volumes:'"
  },
  {
    id: "s10-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An Ingress resource specifies two rules:\n1. `host: api.example.com`, path `/v1` -> Service `api-v1:80`\n2. `host: api.example.com`, path `/v2` -> Service `api-v2:80`\n\nThe Ingress controller is nginx. A request to `https://api.example.com/v2/users` returns a 404 from the `api-v2` service. The same request directly to the `api-v2` Service ClusterIP works. What is the likely issue?",
    diagram: null,
    options: [
      "A. The Ingress forwards the original path `/v2/users`, but `api-v2` expects requests at `/users` without the prefix",
      "B. The Ingress needs `pathType: Prefix` instead of the default `Exact` to match `/v2/users` under the `/v2` path rule",
      "C. The nginx Ingress strips TLS before forwarding and the `api-v2` service rejects non-HTTPS backend connections",
      "D. The Ingress controller cannot route to two different services under the same host with overlapping path prefixes"
    ],
    answer: 0,
    explanation: "By default, the nginx Ingress controller forwards the request with the original path intact. When `/v2/users` matches the `/v2` prefix rule, the full path `/v2/users` is sent to the `api-v2` backend. If the application only handles routes starting at `/` (e.g., `/users`), it returns 404 for `/v2/users`. The fix is to add the `nginx.ingress.kubernetes.io/rewrite-target` annotation to strip the path prefix. Option B is relevant but `pathType: Prefix` is typically already set for this use case.\n\nWhy other options are wrong:\n- B: pathType: Prefix is relevant but is typically already set; the core issue is that the full path including prefix is forwarded to the backend\n- C: TLS termination at the ingress is standard behavior; backends typically receive HTTP, and api-v2 would be configured to accept HTTP on its backend port\n- D: The ingress controller can route to multiple services under the same host with different path prefixes; this is a core ingress feature\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#the-ingress-resource",
    verify: "kubectl describe ingress <ingress-name> && kubectl logs -n ingress-nginx <controller-pod> | grep '/v2/users'"
  },
  {
    id: "s10-q062",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A FinOps team analyzes Kubernetes cluster costs and finds that development namespaces consume 60% of cluster resources but only utilize 15% of what they request. Production namespaces request 30% and utilize 28%. What combination of strategies best optimizes costs without impacting production?",
    diagram: null,
    options: [
      "A. Implement cluster autoscaler with aggressive scale-down settings and use VPA in `UpdateMode: Auto` for all namespaces to right-size pods automatically",
      "B. Apply `LimitRange` in dev namespaces to enforce lower defaults, use VPA in recommendation-only mode for dev, and keep production resource settings unchanged",
      "C. Set ResourceQuotas in development namespaces to cap total CPU requests at 30% of current levels and add `LimitRange` with strict `max` constraints on pods",
      "D. Move dev workloads to spot/preemptible nodes using `taints` and tolerations, and right-size resource requests based on VPA recommendations for each workload"
    ],
    answer: 3,
    explanation: "The optimal approach combines cost savings with appropriate risk tolerance. Development workloads can tolerate interruptions, making spot/preemptible nodes ideal (60-80% cost savings). Using VPA recommendations to right-size resource requests ensures that requested resources match actual usage (closing the 15% utilization vs 60% request gap). Taints and tolerations ensure only dev workloads land on spot nodes, protecting production. Option B only addresses defaults for new pods. Option C aggressively cuts quota without understanding actual needs.\n\nWhy other options are wrong:\n- A: VPA in UpdateMode: Auto for all namespaces could disrupt production by restarting pods; aggressive autoscaler scale-down may evict production workloads\n- B: LimitRange with lower defaults only affects new pods; existing pods keep their current resource settings unchanged\n- C: Cutting quota to 30% of current levels may be too aggressive without understanding actual usage patterns; it could break legitimate workloads\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: "kubectl get nodes --show-labels | grep spot && kubectl top pods -n dev --sort-by=cpu"
  },
  {
    id: "s10-q063",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet with `podManagementPolicy: OrderedReady` and 5 replicas is being updated with `updateStrategy.type: RollingUpdate` and `partition: 3`. What is the effect of the `partition` parameter?",
    diagram: null,
    options: [
      "A. Only pods with ordinal >= 3 (pods 3 and 4) are updated; pods 0, 1, and 2 retain the previous spec",
      "B. The update proceeds in batches of 3 pods at a time, starting from the pod with the highest ordinal",
      "C. Pods 0, 1, and 2 are updated first, then pods 3 and 4 are updated once the first group is ready",
      "D. The partition creates two independent groups that can be updated and rolled back completely separately"
    ],
    answer: 0,
    explanation: "The `partition` field in a StatefulSet's `RollingUpdate` strategy specifies a minimum ordinal. Only pods with an ordinal index greater than or equal to the partition value are updated when the StatefulSet's pod template is changed. Pods below the partition retain the previous version. This enables canary-style updates: set `partition: 3` to update only pods 3 and 4, verify the new version works, then lower the partition progressively (to 2, 1, 0) to roll out to all pods. This is StatefulSet-specific phased rollout control.\n\nWhy other options are wrong:\n- B: The partition value is not a batch size; it is a minimum ordinal threshold for which pods receive updates\n- C: Pods below the partition (0, 1, 2) are NOT updated first; only pods at or above the partition value are updated\n- D: The partition does not create fully independent groups; it controls a single rolling update boundary within one StatefulSet\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions",
    verify: "kubectl get statefulset <name> -o jsonpath='{.spec.updateStrategy}' && kubectl get pods -l app=<name> -o jsonpath='{range .items[*]}{.metadata.name}: {.spec.containers[0].image}{\"\\n\"}{end}'"
  },
  {
    id: "s10-q064",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A node runs containerd with the default `overlayfs` snapshotter. A pod with 3 containers sharing the same base image (`ubuntu:22.04`) is scheduled to this node. How does containerd handle the image layers for these 3 containers?",
    diagram: null,
    options: [
      "A. Each container gets its own full copy of all image layers, consuming 3x the storage of a single container instance",
      "B. Base image layers are shared read-only via overlayfs, with each container getting its own thin read-write upper layer",
      "C. The first container pulls the image and subsequent containers use a copy-on-write clone of the first container's filesystem",
      "D. Containerd deduplicates layers via content-addressable storage but overlayfs extracts separate snapshots per container for isolation"
    ],
    answer: 1,
    explanation: "Containerd with the overlayfs snapshotter leverages the union filesystem's layer-sharing capability. Image layers are stored once in the content store and shared as read-only lower layers across all containers using that image. Each container receives its own read-write upper directory where writes are captured. This means 3 containers sharing `ubuntu:22.04` consume the storage of one base image plus three thin upper layers. Option D describes the content store correctly but mischaracterizes the snapshot behavior — snapshots do share underlying layers.\n\nWhy other options are wrong:\n- A: Each container does NOT get a full copy; overlayfs shares read-only image layers across all containers using that image\n- C: The second container does not clone the first; all containers independently reference the same shared lower layers with their own upper layer\n- D: Content-addressable storage and snapshots do share underlying layers; the characterization that separate snapshots prevent sharing is incorrect\n\nReference: https://kubernetes.io/docs/concepts/containers/images/",
    verify: "ctr -n k8s.io snapshots ls | grep <container-id>"
  },
  {
    id: "s10-q065",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A controller watches Custom Resources and uses `metadata.resourceVersion` for optimistic concurrency. Two controller replicas read the same CR (resourceVersion: \"1000\"), each modify a different field, and attempt to update. What happens?",
    diagram: null,
    options: [
      "A. Both updates succeed because they modify different fields and the API server merges the changes automatically",
      "B. The first update succeeds; the second fails with `409 Conflict` because its resourceVersion \"1000\" is stale",
      "C. The API server queues both updates and applies them sequentially, incrementing resourceVersion for each one",
      "D. Both updates fail because only the resource owner identified by `metadata.ownerReferences` can update CRs"
    ],
    answer: 1,
    explanation: "Kubernetes uses optimistic concurrency control via `resourceVersion`. When an update request includes a `resourceVersion`, the API server compares it against the current stored version. The first update with matching resourceVersion succeeds and increments it. The second update carries the now-stale resourceVersion \"1000\" while the stored version is \"1001\", resulting in a `409 Conflict` error. The second controller must re-read the resource, merge its changes with the current state, and retry. This prevents lost updates in concurrent environments.\n\nWhy other options are wrong:\n- A: The API server does not merge changes from different fields; it uses whole-object replacement with resourceVersion checking\n- C: The API server does not queue updates; they are processed independently and the second fails immediately with a 409 conflict\n- D: ownerReferences do not restrict who can update a resource; RBAC controls access, and resourceVersion handles concurrency\n\nReference: https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions",
    verify: "kubectl get <resource> <name> -o jsonpath='{.metadata.resourceVersion}'"
  },
  {
    id: "s10-q066",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod runs normally for hours, then is suddenly terminated with reason `OOMKilled`. The container's `resources.limits.memory` is set to `512Mi`. The application is a web server that spawns worker processes to handle requests, and `kubectl top pod` shows memory usage at 510Mi while the app's own /metrics endpoint reports 480Mi RSS. What explains the OOM kill despite the application reporting memory usage below the limit?",
    diagram: null,
    options: [
      "A. The kernel's memory cgroup accounting includes page cache from worker processes, which combined with RSS exceeded the limit",
      "B. The kubelet's eviction threshold was triggered before the container reached its limit, killing the largest memory consumer pod",
      "C. The container's child worker processes consume additional memory counted by the cgroup but not by the app's /metrics endpoint",
      "D. Memory fragmentation caused the kernel to report higher memory usage than actual RSS, triggering the OOM kill prematurely"
    ],
    answer: 2,
    explanation: "The container memory limit is enforced at the cgroup level, which accounts for all processes within the cgroup — including child processes, subshells, and forked workers. The application's own `/metrics` endpoint typically reports RSS for the main process only (e.g., by reading `/proc/self/status` or using a language runtime's memory API), so it would show 480Mi. However, if the application spawns child processes that consume additional memory, their RSS is not captured by the main process's self-reported metrics but is counted in the cgroup's total memory. When the combined memory of all processes exceeds 512Mi, the kernel's OOM killer terminates the container. Note that cAdvisor-based metrics (like `container_memory_rss`) would include all processes in the cgroup and would show the true total — this scenario specifically involves application-level self-reported metrics, which only track the main process.\n\nWhy other options are wrong:\n- A: Page cache is typically reclaimable and usually does not trigger OOM kill; the more common cause is unreported child process memory\n- B: Kubelet eviction is triggered by node-level memory pressure, not individual container limits; OOMKilled status indicates cgroup limit, not eviction\n- D: Memory fragmentation does not cause the kernel to report higher RSS than actual; fragmentation affects allocation efficiency but not accounting\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: "kubectl exec <pod-name> -- cat /sys/fs/cgroup/memory.current && kubectl describe pod <pod-name> | grep -A3 'Last State'"
  },
  {
    id: "s10-q067",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team wants to implement a GitOps workflow with automated drift detection, multi-cluster support, and the ability to deploy both Kubernetes manifests and Helm charts. They need the tool to provide a web UI for visualizing application state. Which CNCF project best meets all requirements?",
    diagram: null,
    options: [
      "A. Flux CD — it provides GitOps reconciliation with multi-cluster support, a Helm controller, and a built-in web dashboard",
      "B. Jenkins X — it provides cloud native CI/CD with GitOps capabilities, Helm deployments, and a pipeline visualization UI",
      "D. Keptn — it provides cloud native lifecycle management with GitOps support, multi-cluster control, and quality gate views",
      "C. Argo CD — a CNCF graduated project providing GitOps with drift detection, multi-cluster, Helm support, and a web UI"
    ],
    answer: 3,
    explanation: "Argo CD is a CNCF graduated project that provides all the requested features: GitOps-based continuous delivery with automated drift detection (sync status monitoring), multi-cluster support (managing applications across multiple clusters from a single Argo CD instance), support for Kubernetes manifests, Helm charts, Kustomize, and other templating tools, and a comprehensive web UI for visualizing application state, sync status, and resource health. Flux CD (option A) provides similar GitOps capabilities but does not include a built-in web UI — it requires a separate project (Weave GitOps) for that.\n\nWhy other options are wrong:\n- A: Flux CD does not include a built-in web UI; it requires a separate project like Weave GitOps for visualization\n- B: Jenkins X is not a CNCF project focused on GitOps drift detection; it is a CI/CD platform with limited GitOps capabilities\n- D: Keptn is focused on application lifecycle management and quality gates, not comprehensive GitOps with multi-cluster and Helm support\n\nReference: https://argo-cd.readthedocs.io/en/stable/",
    verify: "argocd app list && argocd cluster list"
  },
  {
    id: "s10-q068",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster uses the `descheduler` to rebalance pods. A Deployment has `podAntiAffinity` with `preferredDuringSchedulingIgnoredDuringExecution` (weight 100) and `topologyKey: kubernetes.io/hostname`. After a node is added to the cluster, 3 of the 4 Deployment replicas remain on 2 nodes while the new node is empty. What does the descheduler's `RemoveDuplicates` strategy do?",
    diagram: null,
    options: [
      "A. It evicts one pod from the node with 2 replicas, allowing the scheduler to place it on the new empty node",
      "B. It evicts all pods entirely and lets the scheduler redistribute them evenly across all three available nodes",
      "C. It does nothing because `RemoveDuplicates` only handles pods from the same ReplicaSet on the same node",
      "D. It evicts pods only if the anti-affinity preference score would measurably improve after the rebalancing run"
    ],
    answer: 0,
    explanation: "The descheduler's `RemoveDuplicates` strategy identifies nodes running multiple pods from the same owner (ReplicaSet, StatefulSet, etc.) and evicts the extras to enable better distribution. In this scenario, the node with 2 replicas has duplicates from the same ReplicaSet. The descheduler evicts one, and the scheduler then places it, considering the anti-affinity preference, likely choosing the empty new node. The strategy works at the node level — it targets nodes with more than one replica of the same workload.\n\nWhy other options are wrong:\n- B: RemoveDuplicates does not evict all pods; it only evicts the minimum necessary to remove duplicates on overloaded nodes\n- C: RemoveDuplicates handles pods from the same ReplicaSet on the same node, which is exactly this scenario; it does apply here\n- D: RemoveDuplicates does not evaluate anti-affinity scores; it simply identifies and evicts duplicate pods from the same owner on the same node\n\nReference: https://github.com/kubernetes-sigs/descheduler#removeduplicates",
    verify: "kubectl get pods -o wide -l app=<name> && kubectl describe configmap descheduler-policy -n kube-system"
  },
  {
    id: "s10-q069",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A container image is signed using `cosign` and pushed to a registry. A Kyverno `ClusterPolicy` with `verifyImages` rule enforces signature verification. A deployment references the image by tag (`:latest`). The image is re-pushed with a different digest but the same tag. Does the existing running pod get affected, and does a new pod creation succeed?",
    diagram: null,
    options: [
      "D. The existing pod continues running; new creation fails because Kyverno detects the digest changed and flags a supply chain risk",
      "B. The existing pod is terminated because its image digest no longer matches the tag; new pod creation is blocked by Kyverno",
      "C. Both existing and new pods are unaffected because Kyverno only checks signatures at policy creation, not pod admission",
      "A. The existing pod is unaffected; new pod creation succeeds only if the re-pushed image has a valid cosign signature"
    ],
    answer: 3,
    explanation: "Running pods are not affected by image tag changes — Kubernetes resolves the image tag to a digest at pull time and records it in the pod status. The container continues running with its original image. For new pod creation, Kyverno's `verifyImages` policy checks the image signature at admission time. If the re-pushed image has a valid cosign signature matching the policy's key or keyless configuration, the pod is admitted. If the new image is unsigned or signed with a different key, it is rejected. The policy does not track tag-to-digest mapping changes.\n\nWhy other options are wrong:\n- D: Kyverno does not detect digest changes as a supply chain risk per se; it verifies the signature of the current image at admission time\n- B: Running pods are not terminated by image tag changes; Kubernetes resolves tags to digests at pull time and does not re-check\n- C: Kyverno checks signatures at pod admission time, not at policy creation time; every new pod creation triggers verification\n\nReference: https://docs.sigstore.dev/cosign/signing/signing_with_containers/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.containerStatuses[0].imageID}' && cosign verify --key <key> <image>"
  },
  {
    id: "s10-q070",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team implements blue-green deployment using two Deployments (`blue` and `green`) and a Service that selects pods by a `version` label. The current production traffic goes to `blue`. After deploying the new version to `green` and running smoke tests, the team switches the Service selector from `version: blue` to `version: green`. Users report brief 503 errors during the switch. What causes the errors?",
    diagram: "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='150' y='5' width='100' height='30' rx='5' fill='#FF9800' stroke='#fff'/><text x='200' y='25' text-anchor='middle' fill='#fff' font-size='11'>Service</text><rect x='40' y='80' width='100' height='45' rx='5' fill='#2196F3' stroke='#fff'/><text x='90' y='100' text-anchor='middle' fill='#fff' font-size='10'>Blue (v1)</text><text x='90' y='116' text-anchor='middle' fill='#aaa' font-size='8'>3 replicas</text><rect x='260' y='80' width='100' height='45' rx='5' fill='#4CAF50' stroke='#fff'/><text x='310' y='100' text-anchor='middle' fill='#fff' font-size='10'>Green (v2)</text><text x='310' y='116' text-anchor='middle' fill='#aaa' font-size='8'>3 replicas</text><line x1='180' y1='35' x2='100' y2='75' stroke='#2196F3' stroke-width='2' stroke-dasharray='4'/><text x='125' y='55' fill='#aaa' font-size='8'>old</text><line x1='220' y1='35' x2='300' y2='75' stroke='#4CAF50' stroke-width='2'/><text x='270' y='55' fill='#4CAF50' font-size='8'>new</text><text x='200' y='170' text-anchor='middle' fill='#f44' font-size='10'>Brief 503s during selector switch</text></svg>",
    options: [
      "A. The EndpointSlice controller takes time to propagate new endpoints to kube-proxy on all nodes, creating stale routing windows",
      "B. The Service selector change causes all existing TCP connections to terminate immediately, and reconnecting clients see 503 errors",
      "C. The Service's `ClusterIP` address is reallocated during the selector change, causing DNS resolution failures until the new VIP propagates",
      "D. The green pods' readiness probes have not yet been verified by the EndpointSlice controller at the moment of the selector switch"
    ],
    answer: 0,
    explanation: "During the propagation window, kube-proxy on some nodes may have removed the old blue pod endpoints but not yet programmed the new green pod endpoints. Requests arriving during this brief gap find no valid backends and receive 503 errors. This is inherent to the eventual consistency of endpoint propagation across nodes.\n\nWhy other options are wrong:\n- B: The Service selector change does not immediately terminate all TCP connections; existing connections may be reset but the primary issue is endpoint propagation delay\n- C: The ClusterIP virtual address is NOT reallocated during a selector change; the VIP remains stable while only the backend endpoints change\n- D: If green pods are already running and passing readiness probes, their endpoints are already known; the issue is propagation timing, not readiness\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services",
    verify: "kubectl get endpointslices -l kubernetes.io/service-name=<svc-name> -o yaml && kubectl describe svc <svc-name>"
  },
  {
    id: "s10-q071",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A pod has two containers: `main` and `sidecar`. The pod is terminating. The `main` container has a `preStop` hook that takes 10 seconds. The `sidecar` has no lifecycle hooks. The pod has `terminationGracePeriodSeconds: 30`. In what order do the termination steps occur?",
    diagram: null,
    options: [
      "A. The `main` container's `preStop` hook runs first, then both containers receive SIGTERM simultaneously after hook completion",
      "B. Both containers receive SIGTERM at the same time; `main`'s `preStop` hook runs concurrently with the SIGTERM signal delivery",
      "C. The `preStop` hook and `sidecar` SIGTERM start simultaneously; after the hook finishes, `main` also receives SIGTERM",
      "D. The `sidecar` container is terminated first, then the `main` `preStop` hook runs, followed by SIGTERM delivery to `main`"
    ],
    answer: 2,
    explanation: "During pod termination, the kubelet processes all containers in parallel. For each container, if a `preStop` hook is defined, it runs before SIGTERM is sent to that container. Since the `sidecar` has no `preStop` hook, it receives SIGTERM immediately. Meanwhile, the `main` container's `preStop` hook begins executing. After the hook completes (10 seconds), SIGTERM is sent to the `main` container. Both container termination sequences start at the same time, but the `preStop` hook delays SIGTERM delivery to the `main` container.\n\nWhy other options are wrong:\n- A: The main container's preStop hook does not run first then both receive SIGTERM; the sidecar receives SIGTERM immediately in parallel\n- B: Both containers do not receive SIGTERM at the same time; the main container's SIGTERM is delayed by its preStop hook execution\n- D: The sidecar is not terminated first before the main preStop; both containers begin their termination sequences simultaneously\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
    verify: "kubectl describe pod <pod-name> | grep -A10 'Containers:'"
  },
  {
    id: "s10-q072",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster uses Kubernetes Service of type `NodePort` with `nodePort: 30080`. The cluster has 10 nodes but only 2 nodes run the backend pods. A client external to the cluster sends a request to Node 5 (which has no backend pod) at port 30080. What is the network path of the request?",
    diagram: null,
    options: [
      "A. Node 5 drops the request because there is no local backend pod and the default `externalTrafficPolicy` is `Local`",
      "B. Node 5's kube-proxy forwards the request to a node with a backend pod via DNAT, adding SNAT for the return path",
      "C. Node 5 responds with a TCP RST because NodePort services only listen on nodes that have local backend pods running",
      "D. The request is forwarded to the ClusterIP which distributes it to a backend pod without performing any NAT at all"
    ],
    answer: 1,
    explanation: "With the default `externalTrafficPolicy: Cluster`, kube-proxy on every node programs iptables/IPVS rules for all NodePort services. When a request arrives at Node 5 on port 30080, kube-proxy performs DNAT to translate the destination to a backend pod IP (on one of the 2 nodes with pods). It also performs SNAT (source NAT) to replace the client's source IP with Node 5's IP, ensuring the response returns through Node 5. This extra hop and SNAT is why `externalTrafficPolicy: Local` exists — to eliminate the hop and preserve the source IP, at the cost of only working on nodes with local pods.\n\nWhy other options are wrong:\n- A: The default externalTrafficPolicy is Cluster, not Local; with Cluster policy, all nodes handle NodePort traffic regardless of local pods\n- C: NodePort services listen on all nodes; kube-proxy programs rules on every node, not just nodes with backend pods\n- D: The request is not forwarded to ClusterIP without NAT; DNAT translates the destination to a pod IP, and SNAT is applied for the return path\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
    verify: "kubectl get svc <svc-name> -o jsonpath='{.spec.externalTrafficPolicy}' && iptables -t nat -L KUBE-NODEPORTS -n"
  },
  {
    id: "s10-q073",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The kubelet on a worker node loses connectivity to the API server. The node's lease in the `kube-node-lease` namespace expires. After `node-monitor-grace-period` (default 40s) passes, what sequence of actions does the control plane take?",
    diagram: null,
    options: [
      "B. The node controller marks the node `Unknown`; after taint-based eviction delay, pods are evicted unless they tolerate `unreachable`",
      "A. The node controller marks the node `NotReady` immediately; after `pod-eviction-timeout` the controller starts evicting pods via deletion entries",
      "C. The node controller deletes the node object entirely; the scheduler immediately reschedules all of the affected pods to other nodes",
      "D. The node controller adds a `node.kubernetes.io/not-ready` taint; pods without matching tolerations are evicted after `tolerationSeconds`"
    ],
    answer: 0,
    explanation: "When the node lease expires and the node controller detects no heartbeat within the `node-monitor-grace-period`, it marks the node condition as `Unknown` (not `NotReady`, which is for specific condition failures). The node controller then adds the `node.kubernetes.io/unreachable:NoExecute` taint. Pods without a toleration for this taint are evicted after a default `tolerationSeconds` of 300 seconds (5 minutes). DaemonSet pods automatically tolerate this taint. The `pod-eviction-timeout` flag was deprecated in favor of taint-based eviction.\n\nWhy other options are wrong:\n- A: The node is marked Unknown (not NotReady) when heartbeat is lost; NotReady is for specific condition failures like kubelet health check failures\n- C: The node controller does not delete the node object; it marks conditions as Unknown and adds the unreachable taint\n- D: The taint added is node.kubernetes.io/unreachable (not not-ready) because the condition is Unknown (connectivity loss), not False\n\nReference: https://kubernetes.io/docs/concepts/architecture/nodes/#condition",
    verify: "kubectl describe node <node-name> | grep -A5 'Conditions:' && kubectl describe node <node-name> | grep -A5 'Taints:'"
  },
  {
    id: "s10-q074",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A KEDA (Kubernetes Event-Driven Autoscaler) `ScaledObject` is configured to scale a Deployment based on an Azure Service Bus queue length. The `ScaledObject` specifies `minReplicaCount: 0` and `maxReplicaCount: 20`. The queue currently has 500 messages and the trigger threshold is 10 messages per replica. How does KEDA determine the target replica count?",
    diagram: null,
    options: [
      "A. KEDA calculates 50 replicas (500 messages / 10 per replica), but the `maxReplicaCount` caps the result at 20",
      "B. KEDA sets the target to 20 replicas immediately because the queue message backlog exceeds `maxReplicaCount`",
      "C. KEDA scales linearly: 1, then 2, then 4, doubling every interval until reaching 20 or the queue is fully drained",
      "D. KEDA computes 50 replicas but scales to 20 in a single step, then pauses scaling until the next evaluation run"
    ],
    answer: 0,
    explanation: "KEDA calculates the desired replica count by dividing the metric value (queue length of 500) by the trigger threshold (10 messages per replica), yielding 50. Since this exceeds `maxReplicaCount: 20`, the target is capped at 20 replicas. KEDA then patches the HPA target or directly scales the Deployment to 20. KEDA uses the Kubernetes HPA external metrics mechanism — it does not implement its own gradual scaling logic. The HPA's built-in scaling behavior (stabilization windows, scaling policies) may further control the actual scaling speed.\n\nWhy other options are wrong:\n- B: KEDA does not blindly set to maxReplicaCount; it calculates the actual desired count first and then caps at max\n- C: KEDA does not scale linearly or double; it calculates the target directly from the metric value divided by the threshold\n- D: KEDA does not pause scaling after reaching max; it continues evaluating metrics on each interval and adjusts as queue drains\n\nReference: https://keda.sh/docs/latest/concepts/scaling-deployments/",
    verify: "kubectl get scaledobject <name> -o yaml && kubectl get hpa -l scaledobject.keda.sh/name=<name>"
  },
  {
    id: "s10-q075",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team configures Prometheus `ServiceMonitor` resources for their application. The `ServiceMonitor` selects services with label `monitoring: enabled`. The Prometheus Operator's `Prometheus` CR has `serviceMonitorSelector: {}` (empty selector, matches all). However, metrics from the application are not being scraped. What is the most likely cause?",
    diagram: null,
    options: [
      "A. The `ServiceMonitor` and `Prometheus` CR are in different namespaces and `serviceMonitorNamespaceSelector` is not configured",
      "B. The empty selector `{}` means \"match nothing\" in the Prometheus operator; it should be omitted entirely to match all monitors",
      "C. The application Service does not have the `monitoring: enabled` label, so the `ServiceMonitor` discovers no matching endpoints",
      "D. Prometheus must be restarted after a new `ServiceMonitor` is created because it does not watch for new monitors dynamically"
    ],
    answer: 0,
    explanation: "The Prometheus Operator uses two selectors: `serviceMonitorSelector` (which ServiceMonitors to pick up) and `serviceMonitorNamespaceSelector` (which namespaces to look in). An empty `serviceMonitorSelector: {}` matches all ServiceMonitors, which is correct. However, if `serviceMonitorNamespaceSelector` is not configured or defaults to the Prometheus CR's own namespace, ServiceMonitors in other namespaces are invisible. Setting `serviceMonitorNamespaceSelector: {}` allows discovery across all namespaces. This cross-namespace configuration is a common oversight.\n\nWhy other options are wrong:\n- B: Empty selector {} means match all in the Prometheus operator, not match nothing; this is correct behavior for selecting all ServiceMonitors\n- C: The Service having the monitoring: enabled label is for ServiceMonitor selection, not for Prometheus discovery; the issue is namespace selection\n- D: Prometheus Operator watches for ServiceMonitor changes dynamically; no restart is needed when new monitors are created\n\nReference: https://prometheus-operator.dev/docs/api-reference/api/#monitoring.coreos.com/v1.PrometheusSpec",
    verify: "kubectl get prometheus -o jsonpath='{.items[0].spec.serviceMonitorNamespaceSelector}' && kubectl get servicemonitor -A"
  },
  {
    id: "s10-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment uses `strategy.type: Recreate`. The Deployment has a `PodDisruptionBudget` (PDB) with `minAvailable: 1`. During an update, the Deployment controller attempts to delete all existing pods before creating new ones. How does the PDB interact with the Recreate strategy?",
    diagram: null,
    options: [
      "A. The PDB prevents Recreate from deleting all pods simultaneously; at least 1 pod remains running throughout the entire update process",
      "B. The PDB is ignored because the Deployment controller is not subject to PDB enforcement; PDBs only apply to the Eviction API",
      "C. The Deployment controller deletes pods one at a time respecting the PDB, effectively converting Recreate to a RollingUpdate",
      "D. The update is blocked entirely because the Recreate strategy conflicts with the PDB, and the Deployment reports a failure condition"
    ],
    answer: 1,
    explanation: "PodDisruptionBudgets are only enforced by the Eviction API (used by `kubectl drain`, cluster autoscaler, and node upgrades). The Deployment controller uses direct pod deletion (the Delete API), not the Eviction API, when implementing the Recreate strategy. Therefore, the PDB has no effect on Deployment-initiated updates. All pods are deleted simultaneously, and new pods are created with the updated spec. This is a critical distinction: PDBs protect against infrastructure-level disruptions, not application-level updates.\n\nWhy other options are wrong:\n- A: PDBs do not prevent Recreate from deleting pods; the Deployment controller uses the Delete API, not the Eviction API\n- C: The Deployment controller does not convert Recreate to RollingUpdate; it deletes all pods simultaneously regardless of PDB\n- D: The update is not blocked; the Recreate strategy proceeds normally because PDBs are only enforced by the Eviction API\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/#pod-disruption-budgets",
    verify: "kubectl get pdb <pdb-name> -o yaml && kubectl rollout status deployment/<name>"
  },
  {
    id: "s10-q077",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod's `livenessProbe` uses `exec` to run a script `/healthcheck.sh` that queries a local database connection. The probe has `timeoutSeconds: 5` and `periodSeconds: 10`. The pod is being restarted frequently. Logs show the application is healthy, but `kubectl describe` shows `Liveness probe failed: command timed out`. Node monitoring shows high CPU load on the node. What is the issue?",
    diagram: null,
    options: [
      "A. The `/healthcheck.sh` script has a database query that occasionally takes longer than 5 seconds due to table lock contention on the node",
      "B. Under high CPU load the kubelet cannot fork the exec process within `timeoutSeconds`, so the probe times out before the script starts",
      "C. The exec probe process competes for CPU with the app container, and under high node pressure it is throttled by the cgroup limit",
      "D. The kubelet probe worker pool is exhausted due to high pod density on the node, delaying probe execution beyond the timeout window"
    ],
    answer: 2,
    explanation: "Exec-based liveness probes run inside the container's cgroup. If the container has CPU limits and the node is under high CPU pressure, the probe's process is subject to CPU throttling. The probe process may not get enough CPU time to complete the health check script within the `timeoutSeconds`. This leads to timeout failures even when the application itself is healthy. The solution is to increase `timeoutSeconds`, switch to an `httpGet` or `tcpSocket` probe (which run in the kubelet's context, not the container's cgroup), or increase the container's CPU limit.\n\nWhy other options are wrong:\n- A: The database query taking long is possible but the question specifically mentions high CPU load on the node, pointing to cgroup throttling\n- B: The kubelet itself can fork the exec process; the timeout occurs during execution within the container's cgroup, not during fork\n- D: The kubelet probe worker pool is not a documented bottleneck; the specific issue is CPU throttling of the exec process within the container cgroup\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
    verify: "kubectl describe pod <pod-name> | grep -A10 'Liveness:' && kubectl top pod <pod-name>"
  },
  {
    id: "s10-q078",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices architecture uses the Strangler Fig pattern to migrate from a monolith. An API gateway routes traffic: `/api/orders/*` goes to the new Orders microservice, while all other paths go to the monolith. The team discovers that the Orders microservice needs data from the monolith's Customers module. What is the recommended approach during migration?",
    diagram: "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'><rect x='140' y='5' width='120' height='30' rx='5' fill='#FF9800' stroke='#fff'/><text x='200' y='25' text-anchor='middle' fill='#fff' font-size='11'>API Gateway</text><rect x='30' y='75' width='120' height='50' rx='5' fill='#9E9E9E' stroke='#fff'/><text x='90' y='97' text-anchor='middle' fill='#fff' font-size='10'>Monolith</text><text x='90' y='115' text-anchor='middle' fill='#fff' font-size='8'>Customers + Others</text><rect x='250' y='75' width='120' height='50' rx='5' fill='#4CAF50' stroke='#fff'/><text x='310' y='97' text-anchor='middle' fill='#fff' font-size='10'>Orders Svc</text><text x='310' y='115' text-anchor='middle' fill='#4CAF50' font-size='8'>(new)</text><line x1='170' y1='35' x2='100' y2='70' stroke='#aaa' stroke-width='1.5'/><text x='120' y='52' fill='#aaa' font-size='8'>/*</text><line x1='230' y1='35' x2='300' y2='70' stroke='#4CAF50' stroke-width='1.5'/><text x='275' y='52' fill='#4CAF50' font-size='8'>/orders/*</text><line x1='250' y1='105' x2='155' y2='105' stroke='#f44' stroke-width='1.5' stroke-dasharray='4' marker-end='url(#a3)'/><text x='200' y='145' text-anchor='middle' fill='#f44' font-size='9'>Needs customer data</text><defs><marker id='a3' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><path d='M0,0 L8,3 L0,6Z' fill='#f44'/></marker></defs></svg>",
    options: [
      "A. The Orders service should directly query the monolith's database for customer data, using a read-only database connection pool",
      "B. Create an Anti-Corruption Layer in Orders that calls the monolith's Customers API, translating between data models",
      "C. Delay the Orders migration until the Customers module is also extracted as a microservice to avoid cross-boundary dependencies",
      "D. Replicate the entire Customers database table into the Orders microservice using Change Data Capture for real-time sync"
    ],
    answer: 1,
    explanation: "The Anti-Corruption Layer (ACL) is a Domain-Driven Design pattern specifically designed for this scenario. It creates a translation boundary between the new microservice and the legacy system. The Orders service calls the monolith's API through the ACL, which translates the monolith's data model into the Orders service's domain model. This prevents the monolith's technical debt from corrupting the new service's clean design. Direct database access (option A) creates tight coupling. Option C stalls migration. Option D creates data synchronization complexity for a temporary need.\n\nWhy other options are wrong:\n- A: Directly querying the monolith's database creates tight coupling between services and violates bounded context principles\n- C: Delaying migration until all dependencies are extracted stalls the entire migration effort and is not practical for large monoliths\n- D: Full database replication via CDC creates data synchronization complexity for what should be a temporary migration dependency\n\nReference: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig",
    verify: null
  },
  {
    id: "s10-q079",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A cluster administrator applies a `MutatingWebhookConfiguration` that injects a sidecar container into every pod. The webhook has `reinvocationPolicy: IfNeeded`. Another mutating webhook modifies the pod's annotations after the sidecar injection. Under what condition does the sidecar injection webhook run again?",
    diagram: null,
    options: [
      "A. It runs again on every subsequent mutating webhook modification, regardless of whether the changes affect the sidecar logic at all",
      "B. It runs again only if the annotation changes from the second webhook would cause the sidecar webhook to produce a different mutation",
      "C. It runs again if any other webhook modifies the pod object after its initial invocation, allowing it to react to those changes",
      "D. It never runs again because mutating webhooks are invoked at most once per admission request, regardless of reinvocation policy"
    ],
    answer: 2,
    explanation: "The `reinvocationPolicy: IfNeeded` setting causes a mutating webhook to be re-invoked if any other mutating webhook modifies the object after the initial invocation. The API server tracks whether the object was modified by subsequent webhooks and, if so, re-invokes earlier webhooks that have `IfNeeded` policy. This ensures that the sidecar injection webhook can inspect the final state of the object after all other mutations. The webhook must be idempotent because it may be called multiple times. With the default `Never` policy, webhooks are invoked only once.\n\nWhy other options are wrong:\n- A: It does not run on every modification; it runs again only if a subsequent webhook modified the object after its initial invocation\n- B: The API server does not evaluate whether changes would produce different mutations; it re-invokes whenever the object was modified by another webhook\n- D: With reinvocationPolicy: IfNeeded, the webhook can be invoked more than once; only the default Never policy limits to one invocation\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#reinvocation-policy",
    verify: "kubectl get mutatingwebhookconfiguration -o yaml | grep reinvocationPolicy"
  },
  {
    id: "s10-q080",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A CSI driver supports volume snapshots. A `VolumeSnapshot` is created from a PVC that is actively being written to by a running pod. The snapshot `readyToUse` becomes `true`. Is the snapshot data guaranteed to be consistent?",
    diagram: null,
    options: [
      "A. Yes, the CSI driver quiesces all I/O to the volume before taking the snapshot, ensuring full application consistency",
      "B. No, the snapshot is crash-consistent; data in flight or in application buffers at snapshot time may not be captured",
      "C. Yes, Kubernetes freezes the filesystem using `fsfreeze` before the CSI snapshot call to ensure data consistency",
      "D. Consistency depends on the `snapshotClass` parameter `consistency: application` which must be set explicitly"
    ],
    answer: 1,
    explanation: "CSI volume snapshots are typically crash-consistent, not application-consistent. The snapshot captures the state of the block device at a point in time, but data that is buffered in the application, OS page cache, or filesystem journal may not be fully flushed. Kubernetes does not perform filesystem quiescing (`fsfreeze`) or application-level checkpointing before taking snapshots. For application-consistent backups, the application should flush its buffers and pause writes before triggering the snapshot. Some storage vendors offer application-consistent snapshots via custom mechanisms, but this is not standard CSI behavior.\n\nWhy other options are wrong:\n- A: The CSI driver does not quiesce all I/O; standard CSI snapshots are crash-consistent, not application-consistent\n- C: Kubernetes does not run fsfreeze before CSI snapshots; filesystem quiescing is not part of the standard CSI snapshot workflow\n- D: There is no snapshotClass consistency parameter in the standard CSI specification; application consistency requires vendor-specific mechanisms\n\nReference: https://kubernetes.io/docs/concepts/storage/volume-snapshots/",
    verify: "kubectl get volumesnapshot <name> -o jsonpath='{.status.readyToUse}' && kubectl describe volumesnapshot <name>"
  },
  {
    id: "s10-q081",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Gateway API `HTTPRoute` resource defines two `backendRefs`: Service A with weight 80 and Service B with weight 20. Both services have `readinessGates` configured. Service B's pods all fail their readiness checks and have no ready endpoints. How does the Gateway controller distribute traffic?",
    diagram: null,
    options: [
      "A. 80% to Service A and 20% is dropped with 503 errors because Service B has no healthy ready endpoints available",
      "B. 100% to Service A because the Gateway controller automatically redistributes traffic away from unhealthy backends",
      "C. The behavior depends on the Gateway controller implementation; the spec does not mandate handling for zero endpoints",
      "D. The HTTPRoute becomes invalid and all traffic is rejected because the route references a backend with zero endpoints"
    ],
    answer: 2,
    explanation: "The Gateway API specification defines the weighted routing semantics but leaves the behavior for backends with no ready endpoints to the specific Gateway controller implementation. Some controllers (like Envoy-based ones) may redistribute traffic to healthy backends, while others may return errors for the unhealthy backend's share. The specification intentionally allows implementation flexibility here. Administrators should check their specific Gateway controller's documentation for its behavior in this scenario and configure appropriate defaults.\n\nWhy other options are wrong:\n- A: Whether 20% is dropped with 503s depends on the implementation; some controllers redistribute rather than returning errors\n- B: Whether 100% goes to Service A depends on the specific Gateway controller; the spec does not mandate automatic redistribution\n- D: The HTTPRoute does not become invalid when a backend has zero endpoints; the route remains valid and behavior is implementation-defined\n\nReference: https://gateway-api.sigs.k8s.io/reference/spec/#gateway.networking.k8s.io/v1.HTTPRoute",
    verify: "kubectl get httproute <name> -o yaml && kubectl get endpointslices -l kubernetes.io/service-name=<svc-b>"
  },
  {
    id: "s10-q082",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A centralized logging system uses Loki for log aggregation. Labels assigned to log streams include `namespace`, `pod`, `container`, and `request_path`. After deployment, Loki's ingester reports `too many active streams` errors and high memory usage. Which label is causing the issue and why?",
    diagram: null,
    options: [
      "A. The `pod` label causes high cardinality because pod names include random suffixes that change on every restart or scaling event",
      "B. The `container` label creates redundant streams when pods have sidecar containers, effectively doubling stream count per pod",
      "C. The `namespace` label is unnecessary since Loki infers it from the log source path automatically, creating duplicate log streams",
      "D. The `request_path` label has unbounded cardinality (unique URLs create unique values), causing stream explosion in the ingester"
    ],
    answer: 3,
    explanation: "Loki's architecture requires low-cardinality labels for efficient stream indexing. Each unique combination of label values creates a distinct stream. The `request_path` label has unbounded cardinality — every unique URL path (e.g., `/users/123`, `/users/456`) creates a new stream. This quickly exhausts Loki's stream limit and memory. Labels like `namespace`, `pod`, and `container` have bounded cardinality (finite number of pods/containers). High-cardinality data like request paths should be stored in the log line content and queried using Loki's log pipeline filters, not as labels.\n\nWhy other options are wrong:\n- A: Pod names have bounded cardinality (finite number of pods); while they change on restart, the total count at any time is bounded\n- B: Sidecar containers double the container count but this is bounded; it does not cause unbounded stream explosion\n- C: Loki does not infer namespace from log path automatically; namespace is a valid and useful label with bounded cardinality\n\nReference: https://grafana.com/docs/loki/latest/get-started/labels/bp-labels/",
    verify: "logcli series --analyze-labels '{namespace=\"production\"}' | sort -t: -k2 -rn | head"
  },
  {
    id: "s10-q083",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster has the `PodTopologySpread` feature enabled. A Deployment with 6 replicas specifies:\n```yaml\ntopologySpreadConstraints:\n- maxSkew: 1\n  topologyKey: topology.kubernetes.io/zone\n  whenUnsatisfiable: ScheduleAnyway\n  labelSelector:\n    matchLabels:\n      app: web\n```\nThe cluster has 3 zones: zone-a (5 nodes), zone-b (2 nodes), zone-c (1 node). All nodes have available capacity. How does `ScheduleAnyway` affect pod distribution?",
    diagram: null,
    options: [
      "A. Pods are distributed 2-2-2 across zones because `ScheduleAnyway` still honors `maxSkew: 1` as a soft preference",
      "B. Pods are distributed based solely on available node capacity: 4 in zone-a, 1 in zone-b, and 1 in zone-c nodes",
      "C. Pods are distributed 2-2-2 across zones, identical to `DoNotSchedule`, because the maximum skew can be satisfied",
      "D. Pods are distributed unevenly because `ScheduleAnyway` makes the constraint purely informational with no effect"
    ],
    answer: 0,
    explanation: "With `whenUnsatisfiable: ScheduleAnyway`, the topology spread constraint acts as a soft preference. The scheduler scores nodes and prefers those that minimize skew, but will not block scheduling if the skew cannot be achieved. Since 6 replicas across 3 zones allows a perfect 2-2-2 distribution with `maxSkew: 1`, the scheduler achieves it as the optimal placement. The difference from `DoNotSchedule` becomes apparent when perfect distribution is impossible — `ScheduleAnyway` would still schedule pods (with reduced score), while `DoNotSchedule` would leave them Pending.\n\nWhy other options are wrong:\n- B: ScheduleAnyway does not distribute solely by capacity; topology spread is still considered as a scoring preference\n- C: The result may appear identical to DoNotSchedule when perfect distribution is possible, but the mechanism differs; ScheduleAnyway uses scoring, not hard constraints\n- D: ScheduleAnyway is not purely informational; it actively influences scheduling through the scoring phase of the scheduler\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    verify: "kubectl get pods -l app=web -o wide --sort-by=.spec.nodeName"
  },
  {
    id: "s10-q084",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Kubernetes cluster uses RBAC. A user has a `ClusterRole` with `get`, `list`, and `watch` permissions on `secrets` in all namespaces via a `ClusterRoleBinding`. The security team argues this is equivalent to cluster-admin access for secrets. Are they correct, and why?",
    diagram: null,
    options: [
      "A. No, `get`/`list`/`watch` only provide read access; the user cannot modify or delete secrets, so it is significantly less privileged than cluster-admin",
      "B. No, secret values are redacted in `list` and `watch` responses by the API server; only a `get` on a specific secret returns actual encoded data",
      "C. Yes, `list` and `watch` return full secret data, giving the user access to all secrets including service account tokens across namespaces",
      "D. Yes, but only if the user also has `get` on the `secrets/data` subresource, which is required for accessing the base64-encoded values"
    ],
    answer: 2,
    explanation: "The security team is correct. In Kubernetes, `list` and `watch` operations on secrets return the full secret data, including values (base64-encoded). This means a user with `list` permission can run `kubectl get secrets -A -o yaml` and see every secret in the cluster, including service account tokens that can be used for privilege escalation. There is no separate subresource for secret data — the values are part of the main Secret object. This is why RBAC permissions on secrets should be tightly scoped to specific namespaces.\n\nWhy other options are wrong:\n- A: While technically true that get/list/watch is read-only, the security concern is that reading all secrets including SA tokens enables privilege escalation\n- B: Secret values are NOT redacted in list and watch responses; the API server returns full secret data including encoded values in all operations\n- D: There is no secrets/data subresource; secret data is part of the main Secret resource and accessible with standard get/list/watch permissions\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i list secrets --all-namespaces --as=<user>"
  },
  {
    id: "s10-q085",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A team uses Flux CD with a `Kustomization` resource that reconciles every 5 minutes. The Git repository has a `kustomization.yaml` that references a remote base from another repository. The remote base is updated with a breaking change. How does Flux handle this?",
    diagram: null,
    options: [
      "A. Flux detects the remote base change on the next reconciliation cycle, applies the breaking change, and the application breaks",
      "B. Flux's built-in kustomize controller validates remote base changes against a schema before applying, rejecting breaking changes",
      "C. Flux pins remote bases to a specific commit SHA, so remote changes are only applied when the SHA reference is explicitly updated",
      "D. Flux only watches the configured Git repository; remote base changes are not detected unless the main repo commit hash changes"
    ],
    answer: 0,
    explanation: "Flux's kustomize controller runs `kustomize build` on every reconciliation cycle (every 5 minutes in this case). During the build, kustomize fetches remote bases from their source repositories. If the remote base has been updated with a breaking change, the next reconciliation will pull the latest version of that base, apply the resulting manifests, and the application will break. Flux does not automatically pin or cache remote bases — it re-fetches them each cycle. This is why pinning remote bases to a specific tag or commit ref in `kustomization.yaml` is a critical best practice.\n\nWhy other options are wrong:\n- B: Flux's kustomize controller does not validate remote base changes against a schema; it applies whatever kustomize build produces\n- C: Flux does not automatically pin remote bases to commit SHAs; it fetches whatever the remote reference points to at build time\n- D: Flux does re-fetch remote bases on each reconciliation; the kustomize build step fetches all remote resources regardless of local repo changes\n\nReference: https://fluxcd.io/flux/components/kustomize/kustomizations/",
    verify: "flux get kustomization <name> && flux reconcile kustomization <name> --with-source"
  },
  {
    id: "s10-q086",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster runs `kube-proxy` in IPVS mode with `strictARP: true` in the `kube-proxy` ConfigMap. This setting was required after deploying MetalLB for bare-metal load balancing. What does `strictARP: true` do and why is it needed for MetalLB?",
    diagram: null,
    options: [
      "A. It prevents kube-proxy from responding to ARP requests for Service VIPs, letting MetalLB be the sole ARP responder for LoadBalancer IPs",
      "B. It enables strict source IP validation in IPVS rules, preventing IP spoofing attacks on Service endpoints at the network interface level",
      "C. It forces kube-proxy to only answer ARP for its own node IP, not for ClusterIPs, preventing conflicts with MetalLB in L2 mode operation",
      "D. It configures interfaces to only answer ARP for addresses on the incoming interface, preventing multi-node MetalLB VIP conflicts"
    ],
    answer: 3,
    explanation: "The `strictARP: true` setting in kube-proxy's IPVS configuration sets `arp_ignore=1` and `arp_announce=2` on the node's network interfaces. `arp_ignore=1` means the interface only responds to ARP requests for addresses configured on the incoming interface. Without this, Linux's default ARP behavior allows any interface to respond to ARP for any local address, which conflicts with MetalLB's L2 mode where only the elected node should respond to ARP for the LoadBalancer VIP. Without `strictARP`, multiple nodes answer ARP for the VIP, breaking MetalLB's failover mechanism.\n\nWhy other options are wrong:\n- A: strictARP does not prevent kube-proxy from responding to ARP for Service VIPs specifically; it configures the kernel's general ARP behavior on interfaces\n- B: strictARP is not about source IP validation or IP spoofing prevention; it controls ARP response behavior at the network interface level\n- C: The setting is about ARP for any address, not just ClusterIPs; it affects the arp_ignore and arp_announce kernel parameters\n\nReference: https://metallb.universe.tf/installation/#preparation",
    verify: "kubectl get configmap kube-proxy -n kube-system -o yaml | grep strictARP"
  },
  {
    id: "s10-q087",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod with `restartPolicy: OnFailure` runs a Job. The container exits with exit code 0 (success). The kubelet observes the exit. What happens next, and what is the final pod phase?",
    diagram: null,
    options: [
      "A. The container is restarted because the kubelet interprets OnFailure as restarting containers on any exit, including successful completion with exit code 0",
      "B. The Job controller creates a new pod because it interprets the completed pod as needing replacement to meet its completions target",
      "C. The container is not restarted, but the pod phase stays `Running` with a `Terminated` container until the Job controller cleans up",
      "D. The container is not restarted (exit 0 = success); the pod transitions to `Succeeded` and remains until Job TTL or deletion"
    ],
    answer: 3,
    explanation: "With `restartPolicy: OnFailure`, containers are only restarted if they exit with a non-zero exit code. An exit code of 0 indicates success, so the kubelet does not restart the container. The pod's phase transitions to `Succeeded`. The pod remains on the node (visible via `kubectl get pods`) until it is cleaned up by the Job controller's TTL mechanism (`ttlSecondsAfterFinished`), the Job is deleted, or the pod is manually deleted. The Job controller recognizes the successful completion and counts it toward the `completions` requirement.\n\nWhy other options are wrong:\n- A: restartPolicy: OnFailure only restarts on non-zero exit; exit code 0 (success) does not trigger a restart\n- B: The Job controller does not create a new pod for a successfully completed pod; it counts it toward completions\n- C: The pod phase transitions to Succeeded, not Running with a Terminated container; the pod lifecycle is complete\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#handling-pod-and-container-failures",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.phase}' && kubectl get job <job-name> -o jsonpath='{.status.succeeded}'"
  },
  {
    id: "s10-q088",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A multi-cluster setup uses Cilium Cluster Mesh to connect two clusters. Cluster A has a Service `backend` in namespace `app`. Cluster B needs to access this service. Both clusters have their own `backend` Service in the `app` namespace with different backends. How does Cilium Cluster Mesh handle service discovery?",
    diagram: null,
    options: [
      "A. Cluster B's local service takes precedence; Cluster Mesh prioritizes local endpoints over remote endpoints by default in merged services",
      "B. Cilium merges endpoints from both clusters into a single global service, load-balancing across all combined endpoints",
      "C. Service names conflict and Cluster Mesh rejects the configuration, requiring globally unique service names across clusters",
      "D. Each cluster maintains its own namespace; cross-cluster access requires explicit `<service>.<cluster>` DNS entry mappings"
    ],
    answer: 1,
    explanation: "Cilium Cluster Mesh performs global service discovery by merging endpoints from services with the same name and namespace across connected clusters. When both clusters have a `backend` service in the `app` namespace, Cilium combines all endpoints into a single global service. Traffic from either cluster is load-balanced across all backends from both clusters. This can be controlled with the `io.cilium/global-service` annotation set to `true` (the default for shared services) or overridden with `io.cilium/shared-service: false` to keep services local.\n\nWhy other options are wrong:\n- A: Local services do not always take precedence by default; Cilium merges endpoints globally when the global-service annotation is set\n- C: Service name conflicts do not cause rejection; Cilium intentionally merges same-name services across clusters as a feature\n- D: Cross-cluster access does not require explicit DNS mappings; Cilium transparently merges endpoints into the existing service\n\nReference: https://docs.cilium.io/en/stable/network/clustermesh/services/",
    verify: "cilium clustermesh status && kubectl get ciliumendpoints -A | grep backend"
  },
  {
    id: "s10-q089",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team implements supply chain security for their container images. They need to: (1) sign images after build, (2) store signatures alongside images in the registry, (3) verify signatures at admission time in Kubernetes. Which combination of CNCF/ecosystem tools provides this end-to-end workflow?",
    diagram: null,
    options: [
      "A. Notary v2 for signing, Docker Content Trust for registry storage, and OPA Gatekeeper for admission verification",
      "B. cosign (Sigstore) for signing and registry storage, combined with Kyverno or a policy controller for admission",
      "C. GPG signing integrated into the Dockerfile build, stored as image labels, and verified by a custom validating webhook",
      "D. TUF (The Update Framework) for signing and distribution, with Falco for runtime image integrity verification"
    ],
    answer: 1,
    explanation: "cosign (part of the Sigstore project, an OpenSSF project under the Linux Foundation) provides keyless or key-based container image signing and stores signatures as OCI artifacts alongside images in any OCI-compliant registry. For Kubernetes admission-time verification, Kyverno (CNCF Incubating) or the Sigstore policy-controller can verify cosign signatures before allowing pod creation. This provides a complete chain: build pipeline signs with cosign, signatures are stored in the registry, and the admission controller verifies signatures. Notary v2 is an alternative signing mechanism but is not as widely adopted for this specific workflow.\n\nWhy other options are wrong:\n- A: Notary v2 and Docker Content Trust are separate mechanisms; DCT is Docker-specific and Gatekeeper does not natively verify Notary signatures\n- C: GPG signing in Dockerfiles stored as labels is non-standard; there is no built-in verification mechanism and custom webhooks add maintenance burden\n- D: TUF handles software update distribution, not container image signing; Falco is runtime security, not admission-time signature verification\n\nReference: https://docs.sigstore.dev/cosign/signing/overview/",
    verify: "cosign verify --key <key-file> <image>:<tag> && kubectl get clusterpolicy -o yaml | grep verifyImages"
  },
  {
    id: "s10-q090",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart's `values.yaml` defines `replicaCount: 3`. A user installs the chart with `helm install myapp ./chart --set replicaCount=5`. Later, they run `helm upgrade myapp ./chart -f custom-values.yaml` where `custom-values.yaml` does not include `replicaCount`. What is the resulting `replicaCount` after the upgrade?",
    diagram: null,
    options: [
      "A. 5, because Helm preserves values from the previous release that are not explicitly overridden in the upgrade command",
      "B. 3, because the upgrade resets to chart defaults and `custom-values.yaml` does not override the `replicaCount` value",
      "C. 5 with `--reuse-values`, or 3 without it; the default resets to chart defaults merged with the provided values",
      "D. Undefined — Helm removes keys not present in upgrade values, leaving `replicaCount` unset in template rendering"
    ],
    answer: 2,
    explanation: "By default, `helm upgrade` does not carry over values from the previous release. It starts with the chart's default `values.yaml` and merges in any provided `-f` or `--set` values. Since `custom-values.yaml` does not include `replicaCount`, the chart default of 3 is used. To preserve the previous release's values, the user must pass `--reuse-values`, which merges previous values with any new overrides. This behavior changed in Helm 3 and is a common source of confusion when `--set` values from install time are lost during upgrades.\n\nWhy other options are wrong:\n- A: Helm does NOT preserve previous release values by default during upgrade; this behavior requires the explicit --reuse-values flag\n- B: While the upgrade does reset to defaults, the full explanation is that --reuse-values changes this behavior, making C the more complete answer\n- D: Helm does not remove keys not present in upgrade values; it uses the chart defaults as the base and merges provided values on top\n\nReference: https://helm.sh/docs/helm/helm_upgrade/",
    verify: "helm get values myapp && helm get values myapp --all"
  },
  {
    id: "s10-q091",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An admission controller chain processes a pod creation request in this order: MutatingAdmission -> ValidatingAdmission. A mutating webhook adds a sidecar container. A validating webhook checks that all containers have resource limits. The sidecar injected by the mutating webhook does not have resource limits. What is the outcome?",
    diagram: "<svg viewBox='0 0 400 160' xmlns='http://www.w3.org/2000/svg'><rect x='5' y='30' width='75' height='35' rx='5' fill='#326CE5' stroke='#fff'/><text x='42' y='52' text-anchor='middle' fill='#fff' font-size='8'>API Request</text><text x='42' y='62' text-anchor='middle' fill='#fff' font-size='7'>Pod (1 ctr)</text><rect x='105' y='30' width='90' height='35' rx='5' fill='#FF9800' stroke='#fff'/><text x='150' y='48' text-anchor='middle' fill='#fff' font-size='8'>Mutating WH</text><text x='150' y='60' text-anchor='middle' fill='#fff' font-size='7'>+sidecar</text><rect x='220' y='30' width='90' height='35' rx='5' fill='#326CE5' stroke='#fff'/><text x='265' y='48' text-anchor='middle' fill='#fff' font-size='8'>Validating WH</text><text x='265' y='60' text-anchor='middle' fill='#aaa' font-size='7'>policy check</text><rect x='335' y='30' width='55' height='35' rx='5' fill='#666' stroke='#fff' stroke-dasharray='3'/><text x='362' y='52' text-anchor='middle' fill='#aaa' font-size='8'>etcd</text><line x1='80' y1='47' x2='100' y2='47' stroke='#4CAF50' stroke-width='1.5' marker-end='url(#a4)'/><line x1='195' y1='47' x2='215' y2='47' stroke='#FF9800' stroke-width='1.5' marker-end='url(#a4)'/><line x1='310' y1='47' x2='330' y2='47' stroke='#aaa' stroke-width='1.5' stroke-dasharray='3'/><text x='320' y='40' fill='#aaa' font-size='7'>?</text><defs><marker id='a4' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><path d='M0,0 L8,3 L0,6Z' fill='#ccc'/></marker></defs></svg>",
    options: [
      "B. The pod is rejected by the validating webhook because it evaluates the final mutated object, which has a sidecar without limits",
      "A. The pod is created with the sidecar but without limits, because validating webhooks cannot see any mutations from mutating webhooks",
      "C. The pod is created because Kubernetes auto-injects default limits from the namespace LimitRange for webhook-injected containers",
      "D. The mutating webhook changes are rolled back when the validating webhook rejects, and the pod is then created without the sidecar"
    ],
    answer: 0,
    explanation: "The admission controller chain processes mutations first, then validations. The validating webhook receives the final mutated object — including the sidecar container added by the mutating webhook. Since the sidecar lacks resource limits, the validating webhook rejects the request. The entire pod creation fails; there is no partial rollback. This is a common operational issue with sidecar injection: the injecting webhook must ensure injected containers comply with all validation policies. The fix is to configure the mutating webhook to include resource limits on injected sidecars.\n\nWhy other options are wrong:\n- A: Validating webhooks DO see mutations from mutating webhooks; the admission chain processes mutations first, then validations on the final object\n- C: Kubernetes does not auto-inject LimitRange defaults for webhook-injected containers in the mutation phase; LimitRange applies at the pod-level admission\n- D: There is no partial rollback mechanism; if validation fails, the entire admission request is rejected and no resource is created\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks",
    verify: "kubectl get events --field-selector reason=FailedCreate && kubectl get mutatingwebhookconfiguration,validatingwebhookconfiguration"
  },
  {
    id: "s10-q092",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A team uses Kubecost to analyze cluster spending. The report shows that 40% of costs come from `Unallocated` resources. What does `Unallocated` represent in Kubecost's cost model, and how should the team address it?",
    diagram: null,
    options: [
      "A. Resources consumed by pods without cost labels; the team should add `cost-center` labels to all deployed workloads",
      "B. The gap between total node capacity and all pod requests; right-size nodes or increase requests to reduce waste",
      "C. Resources consumed by system components (kubelet, kube-proxy, OS) that are not tracked as Kubernetes workloads",
      "D. Idle resources from pods with requests but low utilization; the team should use VPA to right-size resource requests"
    ],
    answer: 1,
    explanation: "In Kubecost's cost model, `Unallocated` represents the difference between the total node resources (what you pay for) and the total pod resource requests (what workloads claim). This gap indicates cluster inefficiency — you are paying for node capacity that no pod has requested. Causes include oversized nodes, low bin-packing efficiency, or workloads without resource requests. The solution is to right-size nodes (use smaller instance types), improve bin-packing with pod topology spread, or ensure all workloads specify appropriate requests. This is distinct from `Idle`, which is requested but unused resources.\n\nWhy other options are wrong:\n- A: Unallocated is not about missing cost labels; it is about the gap between node capacity and pod requests\n- C: System component resources are typically tracked separately and are not the primary driver of Unallocated costs\n- D: Idle resources (requested but unused) are a separate category in Kubecost from Unallocated (unrequested capacity)\n\nReference: https://docs.kubecost.com/using-kubecost/navigating-the-kubecost-ui/cost-allocation",
    verify: null
  },
  {
    id: "s10-q093",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment specifies `revisionHistoryLimit: 2`. Over time, 5 rollouts have been performed (revisions 1 through 5). The current active revision is 5. Which ReplicaSets are retained, and what happens if the operator runs `kubectl rollout undo deployment/<name>`?",
    diagram: null,
    options: [
      "A. ReplicaSets for revisions 3, 4, and 5 are retained by the controller; `rollout undo` reverts to revision 4",
      "B. Revisions 4 and 5 are retained (current + 1 history per limit); undo reverts to revision 4, creating revision 6",
      "C. Revisions 3, 4, and 5 are retained (2 old + 1 current); undo reverts to revision 4, creating revision 6",
      "D. Only the ReplicaSet for revision 5 is retained; `rollout undo` fails because no previous revision is available"
    ],
    answer: 2,
    explanation: "The `revisionHistoryLimit` specifies how many old ReplicaSets to retain (not counting the current active one). With a limit of 2, the current ReplicaSet (revision 5) plus 2 old ones (revisions 3 and 4) are kept — revisions 1 and 2 are garbage collected. Running `kubectl rollout undo` without `--to-revision` reverts to the previous revision (4). This creates a new revision number (6) using revision 4's pod template. After the rollback, the retained ReplicaSets are revisions 3, 5, and 6 (with 6 being the active revision that uses revision 4's pod template). Revision 4 no longer exists as a separate ReplicaSet — it was re-annotated as revision 6 during the undo operation.\n\nWhy other options are wrong:\n- A: Three ReplicaSets are retained: 2 old + 1 current, not 3 old ones; the current active ReplicaSet does not count toward the limit\n- B: The limit of 2 means 2 old ReplicaSets plus the current; not current + 1 history\n- D: The current ReplicaSet is always retained; revision 5 exists as the current active RS, so undo can revert to revision 4\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#revision-history-limit",
    verify: "kubectl rollout history deployment/<name> && kubectl get rs -l app=<name> --sort-by=.metadata.annotations.deployment\\.kubernetes\\.io/revision"
  },
  {
    id: "s10-q094",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A container image uses a non-root user (UID 65534) defined in the Dockerfile with `USER 65534`. The Kubernetes pod spec has `securityContext.runAsUser: 1000`. Inside the running container, what UID does the process run as?",
    diagram: null,
    options: [
      "A. UID 65534, because the Dockerfile `USER` directive takes precedence over the pod's `securityContext` at runtime",
      "B. UID 1000, because the pod `securityContext.runAsUser` overrides the Dockerfile `USER` directive at container start",
      "C. The container fails to start because there is a conflict between the image user config and the pod security context",
      "D. UID 1000 for the main process, but child processes inherit UID 65534 from the original image user configuration"
    ],
    answer: 1,
    explanation: "The pod's `securityContext.runAsUser` always takes precedence over the `USER` directive in the Dockerfile. When the kubelet instructs the container runtime to start the container, it passes the `runAsUser` value from the security context, which overrides the image-level setting. The process (and all child processes) run as UID 1000. This is by design — Kubernetes security contexts provide runtime enforcement that supersedes image-time configurations, allowing cluster administrators to enforce security policies regardless of how images are built.\n\nWhy other options are wrong:\n- A: Dockerfile USER does NOT take precedence; pod securityContext.runAsUser overrides the image-level USER directive at runtime\n- C: There is no conflict error; Kubernetes simply overrides the image setting with the pod security context value\n- D: Child processes inherit the same UID as the parent; they do not use the Dockerfile USER; all processes run as UID 1000\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod",
    verify: "kubectl exec <pod-name> -- id && kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].securityContext.runAsUser}'"
  },
  {
    id: "s10-q095",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A distributed system uses the Outbox Pattern to ensure reliable event publishing from a microservice that writes to a database. The service writes business data and an event record to the outbox table in the same database transaction. A separate process reads the outbox and publishes events to a message broker. What problem does this pattern solve compared to directly publishing events from the service?",
    diagram: null,
    options: [
      "A. It eliminates the need for a message broker by using the database as the event store, reducing overall infrastructure complexity",
      "B. It solves the dual-write problem — ensuring the database write and event publication both happen or neither does",
      "C. It improves event publishing throughput by batching multiple events from the outbox table into a single broker publish call",
      "D. It provides exactly-once delivery by using the database transaction ACID properties to guarantee each event publishes once"
    ],
    answer: 1,
    explanation: "The Outbox Pattern addresses the dual-write problem in microservices. When a service needs to both update its database and publish an event, these are two separate operations that can fail independently. If the database write succeeds but the event publish fails (or vice versa), the system becomes inconsistent. By writing both the business data and the event to the same database in a single transaction, atomicity is guaranteed. The separate outbox reader then reliably publishes events, retrying on failure. This ensures at-least-once delivery (not exactly-once — option D), with consumer-side idempotency handling duplicates.\n\nWhy other options are wrong:\n- A: The outbox pattern still requires a message broker; the database is used as an intermediate reliable store, not as a replacement for the broker\n- C: Batching is a potential optimization but not the core problem the pattern solves; the fundamental issue is atomicity of write + publish\n- D: The outbox provides at-least-once delivery, not exactly-once; consumers must handle duplicates via idempotency\n\nReference: https://microservices.io/patterns/data/transactional-outbox.html",
    verify: null
  },
  {
    id: "s10-q096",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A CI/CD pipeline builds container images and pushes them with tags based on the Git commit SHA. The pipeline then updates a Kubernetes Deployment manifest in a separate GitOps repository by changing the image tag. This triggers Flux CD to deploy the change. Which CI/CD anti-pattern is present in this pipeline, and what is the risk?",
    diagram: null,
    options: [
      "A. The pipeline uses mutable tags since commit SHAs can be rewritten during force pushes, risking deploying the wrong image version",
      "B. The CI pipeline pushes to the GitOps repo, coupling CI and CD; compromised credentials allow deploying arbitrary images",
      "C. The pipeline does not pin base images in the Dockerfile, risking supply chain attacks through uncontrolled base image updates",
      "D. The pipeline stores image tags in Kubernetes manifests instead of Helm values or Kustomize overlays, making rollbacks harder"
    ],
    answer: 1,
    explanation: "Having the CI pipeline directly push to the GitOps repository is a recognized anti-pattern because it grants the CI system write access to the deployment repository. If the CI system is compromised (through a dependency attack, pipeline injection, etc.), the attacker can modify the GitOps repo to deploy malicious images. The recommended approach is to use an image update automation tool (like Flux's Image Automation Controller) that watches the container registry and updates the GitOps repo independently, with its own credentials and policies. This separates the CI and CD trust boundaries.\n\nWhy other options are wrong:\n- A: Git commit SHAs are immutable content hashes; force pushes change the branch pointer but the SHA itself still points to the same content\n- C: Base image pinning is a separate supply chain concern; it is not the anti-pattern described in this pipeline\n- D: Storing image tags in manifests vs Helm values is a tooling choice, not a security anti-pattern; both approaches can support rollbacks\n\nReference: https://fluxcd.io/flux/guides/sortable-image-tags/",
    verify: null
  },
  {
    id: "s10-q097",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster administrator creates a `NetworkPolicy` with `policyTypes: [Ingress, Egress]` that allows ingress to pods labeled `app: db` only from pods labeled `app: api` on port 5432. Only an ingress rule is defined. After applying the policy, the `api` pods can connect to `db` pods. However, the `db` pods cannot initiate connections to any other pod. No other NetworkPolicies exist in the namespace. Why are outbound connections from `db` pods blocked?",
    diagram: "<svg viewBox='0 0 400 180' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='50' width='80' height='40' rx='5' fill='#4CAF50' stroke='#fff'/><text x='70' y='75' text-anchor='middle' fill='#fff' font-size='10'>api pods</text><rect x='170' y='50' width='80' height='40' rx='5' fill='#326CE5' stroke='#fff'/><text x='210' y='75' text-anchor='middle' fill='#fff' font-size='10'>db pods</text><rect x='310' y='50' width='80' height='40' rx='5' fill='#666' stroke='#fff'/><text x='350' y='75' text-anchor='middle' fill='#fff' font-size='10'>other pods</text><line x1='110' y1='65' x2='165' y2='65' stroke='#4CAF50' stroke-width='2' marker-end='url(#a5)'/><text x='137' y='58' text-anchor='middle' fill='#4CAF50' font-size='8'>:5432 OK</text><line x1='250' y1='70' x2='305' y2='70' stroke='#f44' stroke-width='2' stroke-dasharray='4' marker-end='url(#a5)'/><text x='277' y='62' text-anchor='middle' fill='#f44' font-size='8'>BLOCKED</text><defs><marker id='a5' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><path d='M0,0 L8,3 L0,6Z' fill='#ccc'/></marker></defs></svg>",
    options: [
      "A. The NetworkPolicy implicitly blocks egress because any pod selected by a policy has default-deny for unspecified policy types",
      "B. The NetworkPolicy has `policyTypes: [Ingress, Egress]` but only defines ingress rules; the empty egress section denies egress",
      "C. The CNI plugin applies a default-deny-all policy to any pod targeted by at least one NetworkPolicy, affecting both directions",
      "D. The NetworkPolicy has `policyTypes: [Ingress]` only; the `db` pods egress is blocked by a separate cluster default policy"
    ],
    answer: 1,
    explanation: "The key detail is the `policyTypes` field. If the NetworkPolicy includes `Egress` in its `policyTypes` but defines no egress rules, the result is a default-deny for all egress traffic from the selected pods. This is a common misconfiguration: administrators include both `Ingress` and `Egress` in `policyTypes` for completeness, but only define ingress rules. The implicit behavior is that an empty rule list for a declared policy type means \"deny all\" for that direction. If `policyTypes` only listed `[Ingress]`, egress would be unaffected.\n\nWhy other options are wrong:\n- A: NetworkPolicy does not implicitly block unspecified policy types; only policy types listed in policyTypes trigger default-deny behavior\n- C: The CNI plugin does not apply default-deny-all to targeted pods; it only enforces the policy types explicitly declared in the NetworkPolicy\n- D: The question states no other NetworkPolicies exist; the egress block is caused by the current policy's policyTypes including Egress with no rules\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#default-deny-all-egress-traffic",
    verify: "kubectl get networkpolicy -o yaml | grep -A5 policyTypes && kubectl exec <db-pod> -- curl -sI <target-pod-ip>:80"
  },
  {
    id: "s10-q098",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "An OpenTelemetry Collector is deployed as a DaemonSet. It receives traces via OTLP gRPC, processes them with a `batch` processor and `tail_sampling` processor, and exports to Jaeger. The team notices that trace sampling decisions are inconsistent — the same trace ID is sometimes partially sampled (some spans kept, others dropped). What is the architectural flaw?",
    diagram: "<svg viewBox='0 0 400 180' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='80' height='30' rx='5' fill='#326CE5' stroke='#fff'/><text x='50' y='30' text-anchor='middle' fill='#fff' font-size='9'>Svc A (N1)</text><rect x='10' y='55' width='80' height='30' rx='5' fill='#326CE5' stroke='#fff'/><text x='50' y='75' text-anchor='middle' fill='#fff' font-size='9'>Svc B (N2)</text><rect x='10' y='100' width='80' height='30' rx='5' fill='#326CE5' stroke='#fff'/><text x='50' y='120' text-anchor='middle' fill='#fff' font-size='9'>Svc C (N1)</text><rect x='140' y='10' width='90' height='30' rx='5' fill='#FF9800' stroke='#fff'/><text x='185' y='30' text-anchor='middle' fill='#fff' font-size='8'>Collector N1</text><rect x='140' y='55' width='90' height='30' rx='5' fill='#FF9800' stroke='#fff'/><text x='185' y='75' text-anchor='middle' fill='#fff' font-size='8'>Collector N2</text><rect x='280' y='35' width='90' height='40' rx='5' fill='#4CAF50' stroke='#fff'/><text x='325' y='60' text-anchor='middle' fill='#fff' font-size='10'>Jaeger</text><line x1='90' y1='25' x2='135' y2='25' stroke='#aaa' stroke-width='1'/><line x1='90' y1='70' x2='135' y2='70' stroke='#aaa' stroke-width='1'/><line x1='90' y1='115' x2='135' y2='25' stroke='#aaa' stroke-width='1'/><line x1='230' y1='25' x2='275' y2='50' stroke='#aaa' stroke-width='1'/><line x1='230' y1='70' x2='275' y2='60' stroke='#aaa' stroke-width='1'/></svg>",
    options: [
      "A. The `batch` processor reorders spans before `tail_sampling`, causing incomplete trace assembly at the sampling decision point",
      "B. Tail sampling requires all spans of a trace together, but the DaemonSet means spans arrive at different collector instances",
      "C. The `tail_sampling` processor has a too-short `decision_wait` period, causing decisions before all spans have been received",
      "D. The OTLP gRPC receiver does not guarantee span ordering, causing the tail sampler to decide on incomplete trace fragments"
    ],
    answer: 1,
    explanation: "Tail-based sampling needs complete visibility into all spans of a trace to make a correct sampling decision. In a DaemonSet deployment, each node's collector only sees spans from local pods. A trace spanning services on different nodes has its spans split across multiple collector instances, each making independent (and potentially contradictory) sampling decisions. The fix is to use a two-tier architecture: DaemonSet collectors forward all spans to a centralized collector (Deployment or StatefulSet) that performs tail sampling with full trace visibility, using a load balancer with trace-ID-based routing.\n\nWhy other options are wrong:\n- A: The batch processor does not cause inconsistent sampling; it batches spans for efficient export but does not affect sampling decisions\n- C: A short decision_wait is a valid concern but the fundamental issue is that spans are split across DaemonSet instances, not timing\n- D: OTLP ordering is not the issue; tail sampling needs complete trace visibility, which requires all spans at one collector instance\n\nReference: https://opentelemetry.io/docs/collector/deployment/agent/",
    verify: "kubectl get otelcol -o yaml | grep -A20 processors"
  },
  {
    id: "s10-q099",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team implements canary deployments using Flagger with Istio. The canary analysis runs for 5 iterations with 60-second intervals, checking error rate and p99 latency metrics. After 3 successful iterations, the 4th iteration detects an error rate spike. What does Flagger do?",
    diagram: null,
    options: [
      "A. Flagger pauses the canary and waits for manual approval to either continue the rollout or initiate a rollback",
      "B. Flagger immediately scales the canary to zero and routes 100% traffic to the `primary`, marking the canary as failed",
      "C. Flagger retries the failed iteration up to the configured `threshold` count before initiating a full rollback",
      "D. Flagger reduces the canary traffic weight by half and re-runs analysis to confirm the issue before deciding next"
    ],
    answer: 2,
    explanation: "Flagger uses a configurable failure threshold (the `threshold` field in the canary analysis spec, defaulting to 1-5 depending on configuration). When a metric check fails, Flagger increments the failure counter. If the counter reaches the threshold, Flagger initiates a rollback — routing all traffic to the primary and scaling down the canary. If the failure is transient and subsequent iterations succeed, the counter may reset (depending on configuration). This retry mechanism prevents rollbacks due to brief transient issues while still catching persistent problems.\n\nWhy other options are wrong:\n- A: Flagger does not pause for manual approval by default during automated canary analysis; it follows the configured threshold-based automation\n- B: Flagger does not immediately roll back on the first failure; it uses the threshold mechanism to tolerate transient issues\n- D: Flagger does not reduce canary weight by half on failure; it either retries or rolls back based on the failure threshold count\n\nReference: https://docs.flagger.app/usage/how-it-works#canary-analysis",
    verify: "kubectl describe canary <name> -n <namespace> | grep -A10 'Status:' && kubectl get events --field-selector reason=Synced"
  },
  {
    id: "s10-q100",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team defines their cloud native maturity model. They categorize workloads into levels: Level 1 (containerized), Level 2 (orchestrated), Level 3 (observable), Level 4 (declaratively managed), Level 5 (auto-remediated). An application has automated scaling, health checks, structured logging with Loki, Prometheus metrics, distributed tracing with Jaeger, GitOps deployment with Argo CD, and self-healing via liveness probes. Which level does this application achieve?",
    diagram: null,
    options: [
      "A. Level 3 — strong observability stack is in place but the application lacks the declarative management required for Level 4",
      "B. Level 4 — GitOps provides declarative management, but liveness probes alone do not constitute platform-level auto-remediation",
      "C. Level 5 — the application has all required capabilities including auto-remediation through liveness probes and pod autoscaling",
      "D. Level 4 — has observability and declarative management, but auto-remediation needs observability-driven response like Keptn"
    ],
    answer: 3,
    explanation: "The application clearly achieves Level 3 (observable: logging, metrics, tracing) and Level 4 (declaratively managed: GitOps with Argo CD). However, Level 5 auto-remediation requires a closed loop between observability signals and automated corrective actions — for example, automatically rolling back a deployment when error rates spike, scaling based on custom business metrics, or triggering runbook automation. Liveness probes provide basic container-level self-healing, but Level 5 implies platform-level auto-remediation that integrates observability with orchestrated responses, such as through Keptn or custom operators.\n\nWhy other options are wrong:\n- A: The application has observability AND declarative management via GitOps, so it exceeds Level 3\n- B: While liveness probes provide basic self-healing, Level 5 requires observability-driven automated remediation which is not present\n- C: Liveness probes and HPA are not sufficient for Level 5; Level 5 requires closed-loop auto-remediation integrating observability signals with corrective actions\n\nReference: https://www.cncf.io/blog/2024/03/01/cloud-native-maturity-model/",
    verify: null
  }
];

var labExercises = [
  {
    title: "Lab 1: End-to-End Deployment with Probes, Resource Limits, and RBAC",
    description: "Deploy a complete application with health probes, resource constraints, a dedicated ServiceAccount, and RBAC rules granting it access to read ConfigMaps in its namespace. Verify all components work together.",
    commands: "<span class='prompt'>$</span> kubectl create namespace lab10-rbac\n<span class='prompt'>$</span> kubectl create serviceaccount app-reader -n lab10-rbac\n<span class='prompt'>$</span> kubectl create role configmap-reader --verb=get,list,watch --resource=configmaps -n lab10-rbac\n<span class='prompt'>$</span> kubectl create rolebinding app-reader-binding --role=configmap-reader --serviceaccount=lab10-rbac:app-reader -n lab10-rbac\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: secure-app\n  namespace: lab10-rbac\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: secure-app\n  template:\n    metadata:\n      labels:\n        app: secure-app\n    spec:\n      serviceAccountName: app-reader\n      containers:\n      - name: app\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n        resources:\n          requests:\n            cpu: 100m\n            memory: 128Mi\n          limits:\n            cpu: 200m\n            memory: 256Mi\n        livenessProbe:\n          httpGet:\n            path: /\n            port: 80\n          initialDelaySeconds: 5\n          periodSeconds: 10\n        readinessProbe:\n          httpGet:\n            path: /\n            port: 80\n          initialDelaySeconds: 3\n          periodSeconds: 5\n        securityContext:\n          readOnlyRootFilesystem: true\n          runAsNonRoot: true\n          runAsUser: 101\n          allowPrivilegeEscalation: false\n      volumes:\n      - name: tmp\n        emptyDir: {}\n      - name: cache\n        emptyDir: {}\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/secure-app -n lab10-rbac --timeout=60s\n<span class='prompt'>$</span> kubectl auth can-i list configmaps -n lab10-rbac --as=system:serviceaccount:lab10-rbac:app-reader\n<span class='prompt'>$</span> kubectl auth can-i create deployments -n lab10-rbac --as=system:serviceaccount:lab10-rbac:app-reader\n<span class='prompt'>$</span> kubectl get pods -n lab10-rbac -o wide",
    expectedOutput: "deployment.apps/secure-app condition met\nyes\nno\nNAME                          READY   STATUS    RESTARTS   AGE   IP            NODE\nsecure-app-xxxxx-yyyyy        1/1     Running   0          30s   10.244.x.x   node-1\nsecure-app-xxxxx-zzzzz        1/1     Running   0          30s   10.244.x.x   node-2"
  },
  {
    title: "Lab 2: Multi-Service Application with Networking and Observability",
    description: "Deploy a frontend and backend service with a NetworkPolicy restricting traffic. Configure Prometheus annotations for metrics scraping and verify inter-service communication and policy enforcement.",
    commands: "<span class='prompt'>$</span> kubectl create namespace lab10-multiservice\n<span class='prompt'>$</span> kubectl label namespace lab10-multiservice env=lab\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: backend\n  namespace: lab10-multiservice\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: backend\n  template:\n    metadata:\n      labels:\n        app: backend\n      annotations:\n        prometheus.io/scrape: \"true\"\n        prometheus.io/port: \"80\"\n    spec:\n      containers:\n      - name: backend\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: backend-svc\n  namespace: lab10-multiservice\nspec:\n  selector:\n    app: backend\n  ports:\n  - port: 80\n    targetPort: 80\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: frontend\n  namespace: lab10-multiservice\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: frontend\n  template:\n    metadata:\n      labels:\n        app: frontend\n    spec:\n      containers:\n      - name: frontend\n        image: busybox:1.36\n        command: [\"sh\", \"-c\", \"while true; do wget -qO- http://backend-svc; sleep 5; done\"]\n---\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: backend-allow-frontend\n  namespace: lab10-multiservice\nspec:\n  podSelector:\n    matchLabels:\n      app: backend\n  policyTypes:\n  - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - port: 80\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/backend -n lab10-multiservice --timeout=60s\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/frontend -n lab10-multiservice --timeout=60s\n<span class='prompt'>$</span> kubectl logs -l app=frontend -n lab10-multiservice --tail=3\n<span class='prompt'>$</span> kubectl run test-blocked --rm -it --image=busybox -n lab10-multiservice --restart=Never -- wget -qO- --timeout=3 http://backend-svc 2>&1 || true\n<span class='prompt'>$</span> kubectl get networkpolicy -n lab10-multiservice",
    expectedOutput: "<!DOCTYPE html>...(nginx default page from backend)\nwget: download timed out\nNAME                      POD-SELECTOR   AGE\nbackend-allow-frontend    app=backend    30s"
  },
  {
    title: "Lab 3: Blue-Green Deployment with Service Switching",
    description: "Implement a blue-green deployment. Deploy two versions of an application (blue and green), run smoke tests against the green version, then switch the production Service selector to point to green.",
    commands: "<span class='prompt'>$</span> kubectl create namespace lab10-bluegreen\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-blue\n  namespace: lab10-bluegreen\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: myapp\n      version: blue\n  template:\n    metadata:\n      labels:\n        app: myapp\n        version: blue\n    spec:\n      containers:\n      - name: app\n        image: nginx:1.24-alpine\n        ports:\n        - containerPort: 80\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-green\n  namespace: lab10-bluegreen\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: myapp\n      version: green\n  template:\n    metadata:\n      labels:\n        app: myapp\n        version: green\n    spec:\n      containers:\n      - name: app\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: myapp-prod\n  namespace: lab10-bluegreen\nspec:\n  selector:\n    app: myapp\n    version: blue\n  ports:\n  - port: 80\n    targetPort: 80\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: myapp-staging\n  namespace: lab10-bluegreen\nspec:\n  selector:\n    app: myapp\n    version: green\n  ports:\n  - port: 80\n    targetPort: 80\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/app-blue deployment/app-green -n lab10-bluegreen --timeout=60s\n<span class='prompt'>$</span> echo \"--- Smoke test green via staging service ---\"\n<span class='prompt'>$</span> kubectl run smoke-test --rm -it --image=busybox -n lab10-bluegreen --restart=Never -- wget -qO- http://myapp-staging\n<span class='prompt'>$</span> echo \"--- Switching production to green ---\"\n<span class='prompt'>$</span> kubectl patch svc myapp-prod -n lab10-bluegreen -p '{\"spec\":{\"selector\":{\"version\":\"green\"}}}'\n<span class='prompt'>$</span> kubectl get svc myapp-prod -n lab10-bluegreen -o jsonpath='{.spec.selector}'\n<span class='prompt'>$</span> kubectl get endpoints myapp-prod -n lab10-bluegreen",
    expectedOutput: "deployment.apps/app-blue condition met\ndeployment.apps/app-green condition met\n--- Smoke test green via staging service ---\n<!DOCTYPE html>...(nginx response)\n--- Switching production to green ---\nservice/myapp-prod patched\n{\"app\":\"myapp\",\"version\":\"green\"}\nNAME         ENDPOINTS                                AGE\nmyapp-prod   10.244.x.x:80,10.244.x.x:80,10.244.x.x:80   60s"
  },
  {
    title: "Lab 4: Debugging a Complex Multi-Container Pod Issue",
    description: "Deploy a pod with an init container, a main application container, and a sidecar log collector. Introduce a deliberate misconfiguration and use debugging techniques to identify and fix the issue.",
    commands: "<span class='prompt'>$</span> kubectl create namespace lab10-debug\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: complex-app\n  namespace: lab10-debug\nspec:\n  initContainers:\n  - name: init-config\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"echo '{\\\"db_host\\\":\\\"postgres\\\",\\\"port\\\":5432}' > /config/app.json\"]\n    volumeMounts:\n    - name: config-vol\n      mountPath: /config\n  containers:\n  - name: app\n    image: nginx:1.25-alpine\n    ports:\n    - containerPort: 80\n    volumeMounts:\n    - name: config-vol\n      mountPath: /etc/app-config\n      readOnly: true\n    - name: logs\n      mountPath: /var/log/nginx\n    livenessProbe:\n      httpGet:\n        path: /\n        port: 80\n      initialDelaySeconds: 5\n  - name: log-collector\n    image: busybox:1.36\n    command: [\"sh\", \"-c\", \"tail -f /logs/access.log 2>/dev/null || (echo 'Waiting for log file...' && sleep 3600)\"]\n    volumeMounts:\n    - name: logs\n      mountPath: /logs\n      readOnly: true\n  volumes:\n  - name: config-vol\n    emptyDir: {}\n  - name: logs\n    emptyDir: {}\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=Ready pod/complex-app -n lab10-debug --timeout=60s\n<span class='prompt'>$</span> echo \"--- Check init container completed ---\"\n<span class='prompt'>$</span> kubectl get pod complex-app -n lab10-debug -o jsonpath='{.status.initContainerStatuses[*].state}'\n<span class='prompt'>$</span> echo \"\"\n<span class='prompt'>$</span> echo \"--- Verify config was written by init container ---\"\n<span class='prompt'>$</span> kubectl exec complex-app -n lab10-debug -c app -- cat /etc/app-config/app.json\n<span class='prompt'>$</span> echo \"--- Check all containers running ---\"\n<span class='prompt'>$</span> kubectl get pod complex-app -n lab10-debug -o jsonpath='{range .status.containerStatuses[*]}{.name}: {.ready}{\"\\n\"}{end}'\n<span class='prompt'>$</span> echo \"--- Debug with ephemeral container ---\"\n<span class='prompt'>$</span> kubectl debug complex-app -n lab10-debug --image=busybox -it --target=app -- ls /etc/app-config/",
    expectedOutput: "{\"terminated\":{\"exitCode\":0,...}}\n--- Verify config was written by init container ---\n{\"db_host\":\"postgres\",\"port\":5432}\n--- Check all containers running ---\napp: true\nlog-collector: true\n--- Debug with ephemeral container ---\napp.json"
  },
  {
    title: "Lab 5: Setting Up a Complete Monitoring Pipeline",
    description: "Deploy a Prometheus stack with ServiceMonitor, configure a sample application with metrics, set up alerting rules, and verify the complete monitoring pipeline from instrumentation to alerting.",
    commands: "<span class='prompt'>$</span> kubectl create namespace lab10-monitoring\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: metrics-app\n  namespace: lab10-monitoring\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: metrics-app\n  template:\n    metadata:\n      labels:\n        app: metrics-app\n      annotations:\n        prometheus.io/scrape: \"true\"\n        prometheus.io/port: \"80\"\n        prometheus.io/path: \"/metrics\"\n    spec:\n      containers:\n      - name: app\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n          name: http\n        resources:\n          requests:\n            cpu: 50m\n            memory: 64Mi\n          limits:\n            cpu: 100m\n            memory: 128Mi\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: metrics-app-svc\n  namespace: lab10-monitoring\n  labels:\n    app: metrics-app\n    monitoring: enabled\nspec:\n  selector:\n    app: metrics-app\n  ports:\n  - port: 80\n    targetPort: 80\n    name: http\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/metrics-app -n lab10-monitoring --timeout=60s\n<span class='prompt'>$</span> echo \"--- Verify pods have Prometheus annotations ---\"\n<span class='prompt'>$</span> kubectl get pods -n lab10-monitoring -o jsonpath='{range .items[*]}{.metadata.name}: scrape={.metadata.annotations.prometheus\\.io/scrape} port={.metadata.annotations.prometheus\\.io/port}{\"\\n\"}{end}'\n<span class='prompt'>$</span> echo \"--- Verify service has monitoring label ---\"\n<span class='prompt'>$</span> kubectl get svc metrics-app-svc -n lab10-monitoring --show-labels\n<span class='prompt'>$</span> echo \"--- Check endpoints are populated ---\"\n<span class='prompt'>$</span> kubectl get endpoints metrics-app-svc -n lab10-monitoring\n<span class='prompt'>$</span> echo \"--- Verify resource limits for cost management ---\"\n<span class='prompt'>$</span> kubectl top pods -n lab10-monitoring 2>/dev/null || echo \"(metrics-server required for kubectl top)\"",
    expectedOutput: "deployment.apps/metrics-app condition met\n--- Verify pods have Prometheus annotations ---\nmetrics-app-xxxxx: scrape=true port=80\nmetrics-app-yyyyy: scrape=true port=80\n--- Verify service has monitoring label ---\nNAME              TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   LABELS\nmetrics-app-svc   ClusterIP   10.96.x.x     <none>        80/TCP    30s   app=metrics-app,monitoring=enabled\n--- Check endpoints are populated ---\nNAME              ENDPOINTS                       AGE\nmetrics-app-svc   10.244.x.x:80,10.244.x.x:80   30s\n--- Verify resource limits for cost management ---\n(metrics-server required for kubectl top)"
  },
  {
    title: "Lab 6: Implementing a Rolling Update with Canary Verification",
    description: "Perform a rolling update of a Deployment, using a separate canary Deployment to test the new version first. Monitor the rollout status, verify the canary, then proceed with the full rollout.",
    commands: "<span class='prompt'>$</span> kubectl create namespace lab10-canary\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: webapp-stable\n  namespace: lab10-canary\nspec:\n  replicas: 4\n  selector:\n    matchLabels:\n      app: webapp\n      track: stable\n  template:\n    metadata:\n      labels:\n        app: webapp\n        track: stable\n    spec:\n      containers:\n      - name: webapp\n        image: nginx:1.24-alpine\n        ports:\n        - containerPort: 80\n        readinessProbe:\n          httpGet:\n            path: /\n            port: 80\n          periodSeconds: 5\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: webapp-svc\n  namespace: lab10-canary\nspec:\n  selector:\n    app: webapp\n  ports:\n  - port: 80\n    targetPort: 80\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/webapp-stable -n lab10-canary --timeout=60s\n<span class='prompt'>$</span> echo \"--- Deploy canary (1 replica with new version) ---\"\n<span class='prompt'>$</span> cat &lt;&lt;EOF | kubectl apply -f -\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: webapp-canary\n  namespace: lab10-canary\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: webapp\n      track: canary\n  template:\n    metadata:\n      labels:\n        app: webapp\n        track: canary\n    spec:\n      containers:\n      - name: webapp\n        image: nginx:1.25-alpine\n        ports:\n        - containerPort: 80\n        readinessProbe:\n          httpGet:\n            path: /\n            port: 80\n          periodSeconds: 5\nEOF\n<span class='prompt'>$</span> kubectl wait --for=condition=available deployment/webapp-canary -n lab10-canary --timeout=60s\n<span class='prompt'>$</span> echo \"--- Canary receives ~20% traffic (1/5 pods behind service) ---\"\n<span class='prompt'>$</span> kubectl get endpoints webapp-svc -n lab10-canary\n<span class='prompt'>$</span> echo \"--- Verify canary pod is healthy ---\"\n<span class='prompt'>$</span> kubectl get pods -n lab10-canary -l track=canary -o jsonpath='{.items[0].status.containerStatuses[0].ready}'\n<span class='prompt'>$</span> echo \"\"\n<span class='prompt'>$</span> echo \"--- Canary passed - promote to stable ---\"\n<span class='prompt'>$</span> kubectl set image deployment/webapp-stable webapp=nginx:1.25-alpine -n lab10-canary\n<span class='prompt'>$</span> kubectl rollout status deployment/webapp-stable -n lab10-canary --timeout=60s\n<span class='prompt'>$</span> echo \"--- Scale down canary ---\"\n<span class='prompt'>$</span> kubectl scale deployment/webapp-canary --replicas=0 -n lab10-canary\n<span class='prompt'>$</span> echo \"--- Final state ---\"\n<span class='prompt'>$</span> kubectl get pods -n lab10-canary -o custom-columns='NAME:.metadata.name,IMAGE:.spec.containers[0].image,READY:.status.containerStatuses[0].ready,TRACK:.metadata.labels.track'",
    expectedOutput: "deployment.apps/webapp-stable condition met\n--- Deploy canary (1 replica with new version) ---\ndeployment.apps/webapp-canary condition met\n--- Canary receives ~20% traffic (1/5 pods behind service) ---\nNAME         ENDPOINTS                                              AGE\nwebapp-svc   10.244.x.x:80,10.244.x.x:80,...(5 endpoints)          60s\n--- Verify canary pod is healthy ---\ntrue\n--- Canary passed - promote to stable ---\ndeployment \"webapp-stable\" successfully rolled out\n--- Scale down canary ---\ndeployment.apps/webapp-canary scaled\n--- Final state ---\nNAME                             IMAGE                READY   TRACK\nwebapp-stable-xxxxx-yyyyy        nginx:1.25-alpine    true    stable\nwebapp-stable-xxxxx-zzzzz        nginx:1.25-alpine    true    stable\nwebapp-stable-xxxxx-aaaaa        nginx:1.25-alpine    true    stable\nwebapp-stable-xxxxx-bbbbb        nginx:1.25-alpine    true    stable"
  }
];
