var EXAM_SET = 2;
var EXAM_TITLE = "KCNA Practice Exam - Set 02: Configuration & Resource Management";
var questions = [
  // ───────────────────────────────────────────────
  // BATCH 1: q001–q025
  // K8s Fundamentals=11, Container Orchestration=6,
  // Cloud Native Architecture=4, Observability=2, App Delivery=2
  // ───────────────────────────────────────────────

  // ── Kubernetes Fundamentals (11) ──────────────
  {
    id: "s02-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A development team wants to inject database connection strings into their pods without baking them into the container image. The values are non-sensitive and may change between environments. Which Kubernetes resource is the most appropriate choice?",
    diagram: null,
    options: [
      "A Secret with `type: Opaque` storing base64-encoded connection strings for sensitive workloads",
      "An annotation on the Deployment manifest that holds the connection string as metadata",
      "A PersistentVolumeClaim that stores configuration data on a provisioned disk volume",
      "A ConfigMap referenced as environment variables or mounted as a volume in the pod"
    ],
    answer: 3,
    explanation: "ConfigMaps are designed to hold non-confidential configuration data that can be consumed as environment variables, command-line arguments, or volume-mounted files. Secrets would work but are intended for sensitive data. PersistentVolumeClaims are for persistent storage, not configuration injection. Annotations are metadata and cannot be directly consumed by containers as environment variables.\n\nWhy other options are wrong:\n- A: Secrets are for sensitive data; the question specifies non-sensitive values\n- B: Annotations are metadata on resources and cannot be injected into containers as env vars or files\n- C: PVCs provision disk storage for persistent data, not lightweight configuration injection\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: "kubectl get configmaps"
  },
  {
    id: "s02-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator notices that a ConfigMap was updated, but the application pod still serves stale configuration. The ConfigMap is consumed as environment variables. What explains this behavior?",
    diagram: null,
    options: [
      "ConfigMaps are immutable by default so the update was silently rejected by the API server",
      "Env vars from a ConfigMap are set at pod creation; the pod must restart to see changes",
      "The kubelet refreshes env vars every 60 seconds so the operator just needs to wait longer",
      "The container runtime caches ConfigMap data and requires a full `kubectl rollout restart`"
    ],
    answer: 1,
    explanation: "When a ConfigMap is consumed via `envFrom` or `env.valueFrom`, the values are injected into the container's environment at startup. They are not updated dynamically. The pod must be recreated to pick up changes. Volume-mounted ConfigMaps, by contrast, are eventually updated by the kubelet. ConfigMaps are not immutable by default (though they can be made so), and the container runtime does not cache ConfigMap data separately.\n\nWhy other options are wrong:\n- A: ConfigMaps are mutable by default; the immutable field must be explicitly set to true\n- C: The kubelet does not refresh env vars at all; only volume-mounted ConfigMaps get periodic updates\n- D: The container runtime does not cache ConfigMap data separately from the kubelet\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: null
  },
  {
    id: "s02-q003",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A platform engineer needs to store a TLS certificate and private key so that an Ingress controller can terminate HTTPS. Which Secret type should they use?",
    diagram: null,
    options: [
      "`kubernetes.io/tls` — requires `tls.crt` and `tls.key` fields for certificate data",
      "`Opaque` — the general-purpose Secret type that accepts any arbitrary key-value pair",
      "`kubernetes.io/dockerconfigjson` — intended for storing container registry credentials",
      "`kubernetes.io/ssh-auth` — the standard type for any key-based authentication method"
    ],
    answer: 0,
    explanation: "The `kubernetes.io/tls` Secret type is specifically designed for TLS certificates and requires the `tls.crt` and `tls.key` fields. Ingress controllers look for this type when configured for TLS termination. `Opaque` could technically hold the data but lacks the validation and semantic meaning. `dockerconfigjson` is for container registry credentials. `ssh-auth` is for SSH private keys, not TLS certificates.\n\nWhy other options are wrong:\n- B: Opaque is general-purpose and lacks the tls.crt/tls.key validation that Ingress controllers expect\n- C: dockerconfigjson is specifically for container registry pull credentials, not TLS certificates\n- D: ssh-auth stores SSH private keys for SSH authentication, not X.509 TLS certificates\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets",
    verify: "kubectl create secret tls --help"
  },
  {
    id: "s02-q004",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment specifies `resources.requests.memory: 256Mi` and `resources.limits.memory: 256Mi` for its single container. A second container in the same pod specifies `resources.requests.cpu: 500m` and `resources.limits.cpu: 500m` but no memory requests or limits. What QoS class will Kubernetes assign to this pod?",
    diagram: null,
    options: [
      "`Guaranteed` — because at least one container has equal requests and limits set for resources",
      "`Burstable` — not every container specifies both CPU and memory requests equal to limits",
      "`BestEffort` — because one container is entirely missing memory request specifications",
      "`Burstable` — the scheduler assigns this class based on current node resource availability at scheduling time"
    ],
    answer: 1,
    explanation: "For a pod to receive the `Guaranteed` QoS class, every container must specify both CPU and memory requests, and each request must equal its corresponding limit. Here, the first container lacks CPU specs and the second lacks memory specs, so the pod cannot be `Guaranteed`. Since at least one container has some resource specifications, it is not `BestEffort` either. The pod is classified as `Burstable`. QoS classification is independent of node resource availability.\n\nWhy other options are wrong:\n- A: Guaranteed requires every container to set both CPU and memory with requests equal to limits, not just one container\n- C: BestEffort requires zero resource specs on all containers; this pod has some specs set\n- D: QoS classification is determined solely by resource spec completeness, not by node availability\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/#guaranteed",
    verify: "kubectl describe pod <pod-name> | grep 'QoS Class'"
  },
  {
    id: "s02-q005",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team mounts a ConfigMap as a volume at `/etc/config` inside a container. The ConfigMap has two keys: `app.properties` and `logging.conf`. What will the container see at `/etc/config`?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">ConfigMap Volume Mount</text><rect x="30" y="50" width="150" height="70" rx="5" fill="#16213e" stroke="#326CE5" stroke-width="1"/><text x="105" y="70" text-anchor="middle" fill="#326CE5" font-size="11" font-weight="bold">ConfigMap: app-config</text><text x="105" y="90" text-anchor="middle" fill="#ccc" font-size="10">key: app.properties</text><text x="105" y="106" text-anchor="middle" fill="#ccc" font-size="10">key: logging.conf</text><line x1="180" y1="85" x2="230" y2="85" stroke="#555" stroke-width="1.5" marker-end="url(#arrow)"/><text x="205" y="78" text-anchor="middle" fill="#e0e0e0" font-size="12">?</text><defs><marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#555"/></marker></defs><rect x="235" y="60" width="140" height="50" rx="5" fill="#16213e" stroke="#326CE5" stroke-width="1"/><text x="305" y="82" text-anchor="middle" fill="#e0e0e0" font-size="11">/etc/config</text><text x="305" y="100" text-anchor="middle" fill="#aaa" font-size="10">contents = ?</text><text x="200" y="165" text-anchor="middle" fill="#aaa" font-size="11">What does the container see at the mount path?</text></svg>',
    options: [
      "A single file called `configmap.yaml` that combines both keys and their corresponding values",
      "A directory with two files, `app.properties` and `logging.conf`, each holding its value",
      "Two subdirectories named after the keys, each containing an `index` file with the data",
      "A single JSON file at `/etc/config/data.json` containing both key-value pairs merged"
    ],
    answer: 1,
    explanation: "When a ConfigMap is mounted as a volume, each key in the ConfigMap becomes a file in the mount directory, and the file's content is the key's value. So `/etc/config/app.properties` and `/etc/config/logging.conf` will each exist as regular files. Kubernetes does not merge keys into a single file, create subdirectories per key, or produce JSON output.\n\nWhy other options are wrong:\n- A: Kubernetes does not merge ConfigMap keys into a single configmap.yaml file\n- C: ConfigMap keys become files directly in the mount directory, not subdirectories with index files\n- D: No data.json file is produced; each key becomes its own separate file\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#add-configmap-data-to-a-volume",
    verify: "kubectl exec <pod-name> -- ls /etc/config"
  },
  {
    id: "s02-q006",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A cluster administrator creates a ResourceQuota in the `dev` namespace that sets `requests.cpu: 4` and `limits.cpu: 8`. A developer tries to create a pod without specifying any CPU requests or limits. What happens?",
    diagram: null,
    options: [
      "The pod is created and Kubernetes auto-assigns default CPU values derived from the ResourceQuota",
      "The pod is scheduled but placed in pending state until the administrator adds a LimitRange object",
      "The pod is created with `BestEffort` QoS class and its resources do not count against the quota",
      "Pod creation is rejected because CPU quota exists but the pod specifies no CPU requests/limits"
    ],
    answer: 3,
    explanation: "When a ResourceQuota is active for compute resources in a namespace, every pod must specify the corresponding requests and limits for those resources. If a pod omits them, the API server rejects the creation. To allow pods without explicit resource specs, administrators should create a LimitRange with default values, which the admission controller will inject automatically. BestEffort pods are not exempt from quotas.\n\nWhy other options are wrong:\n- A: ResourceQuota does not auto-assign defaults; a LimitRange is needed for that\n- B: The pod is not placed in pending; it is outright rejected by the admission controller\n- C: BestEffort pods are not exempt from quota enforcement when compute quotas are active\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits",
    verify: "kubectl describe resourcequota -n dev"
  },
  {
    id: "s02-q007",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A security-conscious team wants to ensure that a particular ConfigMap can never be modified after creation. Which field should they set on the ConfigMap manifest?",
    diagram: null,
    options: [
      "`metadata.annotations: {\"immutable\": \"true\"}` set on the ConfigMap resource definition",
      "`immutable: true` at the top level of the ConfigMap spec to prevent any future changes",
      "`spec.readOnly: true` declared at the top level of the ConfigMap resource specification",
      "`data.locked: \"true\"` as a reserved key that prevents further edits to the ConfigMap"
    ],
    answer: 1,
    explanation: "Kubernetes supports the `immutable` field on ConfigMaps (and Secrets) at the top level of the resource spec. When set to `true`, any attempt to modify the ConfigMap's `data` or `binaryData` fields is rejected by the API server. This also improves cluster performance by allowing the kubelet to skip periodic re-watches. Annotations do not enforce immutability, ConfigMaps have no `spec.readOnly`, and there is no reserved `data.locked` key.\n\nWhy other options are wrong:\n- A: Annotations are metadata and do not enforce immutability at the API level\n- C: ConfigMaps do not have a spec.readOnly field; immutable is a top-level boolean field\n- D: There is no reserved data.locked key; arbitrary data keys have no enforcement behavior\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#configmap-immutable",
    verify: "kubectl get configmap <name> -o jsonpath='{.immutable}'"
  },
  {
    id: "s02-q008",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An application pod mounts a Secret as a volume. A colleague asks where the actual Secret data is stored at rest in the cluster. Which component holds this data?",
    diagram: null,
    options: [
      "The kubelet's local cache on the node where the pod is currently running and scheduled",
      "The kube-apiserver's in-memory store which is cleared each time the server is restarted",
      "etcd, the cluster's key-value store that persists all Kubernetes API objects at rest",
      "The container runtime's internal image layer filesystem storage on the scheduling node"
    ],
    answer: 2,
    explanation: "All Kubernetes API objects, including Secrets, are stored in etcd. While the kubelet may cache Secret data locally for volume mounts, the authoritative storage is etcd. This is why enabling etcd encryption at rest is recommended for sensitive data. The API server reads from and writes to etcd but does not store objects only in memory. The container runtime filesystem stores image layers, not Kubernetes API objects.\n\nWhy other options are wrong:\n- A: The kubelet caches Secret data locally for mounts, but this is not the authoritative at-rest store\n- B: The API server reads from and writes to etcd; it does not hold objects only in volatile memory\n- D: The container runtime stores image layers, not Kubernetes API objects like Secrets\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#information-security-for-secrets",
    verify: null
  },
  {
    id: "s02-q009",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod is running with `resources.requests.memory: 128Mi` and `resources.limits.memory: 512Mi`. Under memory pressure on the node, Kubernetes needs to evict pods. How does the scheduler treat this pod compared to a `Guaranteed` pod?",
    diagram: null,
    options: [
      "`Burstable` pods are evicted before `Guaranteed` pods when the node is under memory pressure from workloads",
      "Both pods have equal eviction priority since they both have resource values explicitly specified in their `spec`",
      "This pod is protected from eviction because it has a memory limit set which prevents any OOM killing action",
      "The pod with the higher absolute memory limit is always evicted first, regardless of its assigned `QoS` class"
    ],
    answer: 0,
    explanation: "Kubernetes evicts pods based on QoS class priority: `BestEffort` pods are evicted first, then `Burstable`, and `Guaranteed` pods last. This pod has unequal requests and limits, making it `Burstable`. Under node memory pressure, it would be evicted before a `Guaranteed` pod. Having a memory limit does not prevent eviction — it prevents the container from using more than the limit. Eviction order considers QoS class, not just absolute resource values.\n\nWhy other options are wrong:\n- B: Having resource specs does not make eviction priority equal; QoS class determines the order\n- C: Memory limits prevent usage beyond the cap but do not protect pods from node-level eviction\n- D: Eviction priority is based on QoS class first, not absolute resource limit values\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/#burstable",
    verify: null
  },
  {
    id: "s02-q010",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A microservice reads its backend URL from an environment variable `BACKEND_URL`. The team stores this URL in a ConfigMap called `app-config` under the key `backend.url`. Which pod spec snippet correctly injects this value?",
    diagram: null,
    options: [
      "`env: [{name: BACKEND_URL, valueFrom: {configMapKeyRef: {name: app-config, key: backend.url}}}]`",
      "`env: [{name: BACKEND_URL, value: configMap.app-config.backend.url}]` with inline dot-path resolution",
      "`envFrom: [{configMapRef: {name: app-config, key: backend.url}}]` to import with direct key selection",
      "`env: [{name: BACKEND_URL, valueFrom: {secretKeyRef: {name: app-config, key: backend.url}}}]`"
    ],
    answer: 0,
    explanation: "The correct way to reference a specific key from a ConfigMap as an environment variable is using `configMapKeyRef` within `valueFrom`. Option B uses an invalid syntax — `value` takes a literal string, not a reference. Option C is incorrect because `envFrom` with `configMapRef` imports all keys and does not accept a `key` field. Option D uses `secretKeyRef`, which references Secrets, not ConfigMaps.\n\nWhy other options are wrong:\n- B: The value field accepts only a literal string, not a dot-path reference to a ConfigMap\n- C: envFrom with configMapRef imports all keys and does not accept a key selector field\n- D: secretKeyRef references Secrets, not ConfigMaps; using it with a ConfigMap name would fail\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#define-a-container-environment-variable-with-data-from-a-single-configmap",
    verify: "kubectl explain pod.spec.containers.env.valueFrom.configMapKeyRef"
  },
  {
    id: "s02-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An engineer creates a ConfigMap from a file using `kubectl create configmap nginx-conf --from-file=nginx.conf`. Later they mount this ConfigMap into a pod. What will be the key name in the ConfigMap's `data` field?",
    diagram: null,
    options: [
      "The key will be `data` since `--from-file` always uses a generic key name by default",
      "The key will be auto-generated as a SHA hash of the file contents for uniqueness",
      "The key will be `nginx-conf`, matching the ConfigMap name that was specified on create",
      "The key will be `nginx.conf` because the filename becomes the key name by default"
    ],
    answer: 3,
    explanation: "When using `--from-file` without specifying a custom key, kubectl uses the filename as the key. So the ConfigMap will have `data: {\"nginx.conf\": \"<file-contents>\"}`. You can override this with `--from-file=custom-key=nginx.conf`. The key is never auto-generated as a hash, nor does it default to `data` or the ConfigMap name.\n\nWhy other options are wrong:\n- A: The key is never defaulted to the generic string \"data\"; the filename is used\n- B: Keys are not auto-generated as SHA hashes; the filename is used as-is\n- C: The key is the filename, not the ConfigMap name specified in the create command\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_configmap/",
    verify: "kubectl create configmap test --from-file=nginx.conf --dry-run=client -o yaml"
  },

  // ── Container Orchestration (6) ────────────────
  {
    id: "s02-q012",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A stateful application requires a configuration file to be available at `/app/config/settings.yaml` inside the container, but the file must be read-only. The configuration is stored in a ConfigMap. What is the most straightforward Kubernetes-native approach?",
    diagram: null,
    options: [
      "Mount the ConfigMap volume with `readOnly: true` and use `subPath` to target `settings.yaml`",
      "Use an init container to copy ConfigMap data to an emptyDir, then mount that volume read-only",
      "Set `immutable: true` on the ConfigMap and mount normally since immutability implies read-only",
      "Mount the ConfigMap volume at /app/config using items to select settings.yaml, implying read-only"
    ],
    answer: 0,
    explanation: "Using `subPath` allows mounting a single key from a ConfigMap as a specific file path without replacing the entire directory. Adding `readOnly: true` on the volume mount ensures the container cannot write to it. While ConfigMap volume mounts are effectively read-only by default (writes are not persisted), explicitly setting `readOnly: true` provides defense in depth. Using an init container adds unnecessary complexity. ConfigMap immutability controls API-level changes, not mount permissions.\n\nWhy other options are wrong:\n- B: Using an init container adds unnecessary complexity when readOnly + subPath solves the requirement directly\n- C: ConfigMap immutability prevents API-level modifications but does not control filesystem mount permissions\n- D: While items can select specific keys, this approach does not explicitly enforce read-only access via the readOnly mount flag\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#configmap",
    verify: "kubectl explain pod.spec.containers.volumeMounts.readOnly"
  },
  {
    id: "s02-q013",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security audit reveals that Secrets in the cluster are stored in etcd without encryption. An attacker with etcd access could read them in plaintext. What is the recommended mitigation?",
    diagram: null,
    options: [
      "Enable etcd encryption at rest by configuring an `EncryptionConfiguration` on the API server",
      "Run `kubectl encrypt secret <name>` to individually encrypt each Secret with cluster-level keys",
      "Set `encoded: true` on each Secret manifest to enable automatic AES-256 encryption at storage",
      "Switch all Secrets to ConfigMaps since ConfigMaps provide built-in encryption at rest by default"
    ],
    answer: 0,
    explanation: "Kubernetes supports encryption at rest for etcd data through an `EncryptionConfiguration` file specified via the `--encryption-provider-config` flag on the API server. This encrypts Secret data before writing it to etcd. ConfigMaps do not have built-in encryption and are less appropriate for sensitive data. There is no `encoded: true` field or `kubectl encrypt` command in Kubernetes.\n\nWhy other options are wrong:\n- B: There is no kubectl encrypt command in Kubernetes\n- C: There is no encoded: true field on Secret manifests\n- D: ConfigMaps do not provide built-in encryption and are intended for non-sensitive data\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/",
    verify: null
  },
  {
    id: "s02-q014",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod's container needs to know the IP address of the node it is running on to register itself with an external service. The team wants to avoid hardcoding. Which approach correctly exposes the node IP as an environment variable?",
    diagram: null,
    options: [
      "Use `env.valueFrom.fieldRef` with `fieldPath: status.hostIP` to expose the node's IP address",
      "Use `env.valueFrom.configMapKeyRef` pointing to a system-managed ConfigMap named `node-info`",
      "Use `env.valueFrom.resourceFieldRef` with `resource: node.ip` to reference the node address",
      "Set `hostNetwork: true` on the pod so the container reads the node's network interfaces directly"
    ],
    answer: 0,
    explanation: "The Downward API allows pods to access information about themselves and their environment. Using `fieldRef` with `fieldPath: status.hostIP` exposes the node's IP address as an environment variable. There is no system-managed `node-info` ConfigMap. `resourceFieldRef` is for container resource requests and limits, not node information. While `hostNetwork: true` gives access to the node's network namespace, it is a security risk and does not directly provide the IP as an environment variable.\n\nWhy other options are wrong:\n- B: There is no system-managed ConfigMap called node-info in Kubernetes\n- C: resourceFieldRef is for CPU and memory resource values, not node network information\n- D: hostNetwork gives access to the node network namespace but does not directly provide an env var with the IP\n\nReference: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/",
    verify: "kubectl explain pod.spec.containers.env.valueFrom.fieldRef"
  },
  {
    id: "s02-q015",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod enters `CrashLoopBackOff`. The logs show `Error: secret \"db-credentials\" not found`. The Secret exists in the `production` namespace but the pod runs in the `staging` namespace. What is the root cause?",
    diagram: null,
    options: [
      "Secrets are cluster-scoped, so the namespace should not matter — the issue is likely RBAC",
      "Secrets are namespace-scoped; the pod can only reference Secrets in its own namespace",
      "The Secret name must be prefixed with the namespace, e.g., `production/db-credentials`",
      "The pod needs a `secretNamespace` field to reference cross-namespace Secrets"
    ],
    answer: 1,
    explanation: "Secrets (like ConfigMaps) are namespace-scoped resources. A pod can only reference Secrets that exist in the same namespace. The team must either create the Secret in the `staging` namespace or use a tool to sync Secrets across namespaces. There is no `secretNamespace` field or namespace prefix syntax for cross-namespace Secret references. Secrets are not cluster-scoped.\n\nWhy other options are wrong:\n- A: Secrets are namespace-scoped, not cluster-scoped; RBAC is not the issue here\n- C: There is no namespace/name prefix syntax for cross-namespace Secret references\n- D: There is no secretNamespace field in the pod spec for cross-namespace Secret access\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#restriction-names-data",
    verify: "kubectl get secrets -n staging"
  },
  {
    id: "s02-q016",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A container image includes a hardcoded configuration file at `/etc/app/config.json`. The operations team wants to override this file at runtime without rebuilding the image. Which Kubernetes mechanism should they use?",
    diagram: null,
    options: [
      "Add a `configOverride` annotation to the pod spec that points to the new file content to inject",
      "Pass the new configuration as a command-line argument using the `args` field in container spec",
      "Use the `image.config.override` field in the container spec to specify runtime replacement files",
      "Mount a ConfigMap as a volume at `/etc/app` so ConfigMap data replaces the directory contents"
    ],
    answer: 3,
    explanation: "Mounting a ConfigMap as a volume at the same path as the built-in configuration file replaces the directory contents with the ConfigMap's keys as files. This is a standard pattern for overriding baked-in configuration without modifying the image. There is no `configOverride` annotation or `image.config.override` field. While `args` can pass some configuration, it is not suitable for replacing a full JSON file.\n\nWhy other options are wrong:\n- A: There is no configOverride annotation in Kubernetes\n- B: args can pass small values but is not suitable for replacing entire configuration files\n- C: There is no image.config.override field in the container spec\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#add-configmap-data-to-a-volume",
    verify: "kubectl explain pod.spec.volumes.configMap"
  },
  {
    id: "s02-q017",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A developer mounts a ConfigMap as a volume using `subPath: app.conf` to place a single file at `/etc/myapp/app.conf`. After updating the ConfigMap, the file inside the pod does not change even after waiting several minutes. Why?",
    diagram: null,
    options: [
      "ConfigMap volume mounts are typically not updated after creation; restarting the pod is the standard fix",
      "The kubelet update interval defaults to 10 minutes, so the developer needs to wait longer",
      "Volumes mounted with `subPath` do not receive automatic updates from ConfigMap changes",
      "A `subPath` mount requires `immutable: false` on the ConfigMap to allow live updates"
    ],
    answer: 2,
    explanation: "This is an important caveat: when a ConfigMap is mounted using `subPath`, the kubelet does not update the file when the ConfigMap changes. Only full directory mounts (without `subPath`) receive automatic updates. The developer must restart the pod or switch to a full volume mount to get updates. ConfigMaps do not require `immutable: false` for updates — they are mutable by default. The kubelet sync period is typically around 60 seconds, not 10 minutes.\n\nWhy other options are wrong:\n- A: ConfigMap volume mounts without subPath do receive automatic updates from the kubelet\n- B: The kubelet sync period is around 60 seconds plus cache TTL, not 10 minutes\n- D: ConfigMaps are mutable by default; immutable: false is not a real setting and subPath mounts simply do not auto-update regardless\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: null
  },

  // ── Cloud Native Architecture (4) ─────────────
  {
    id: "s02-q018",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A company migrating to Kubernetes wants to follow the twelve-factor app methodology. Their legacy application reads configuration from a hardcoded file path inside the binary. What change aligns with twelve-factor principles for configuration management?",
    diagram: null,
    options: [
      "Store config in environment variables injected at runtime via ConfigMaps or Secrets",
      "Embed all possible configurations in the container image, building one per each environment",
      "Use a shared NFS mount across all pods to store a single centralized configuration file path",
      "Hardcode the production configuration and use compile-time build flags for other environments"
    ],
    answer: 0,
    explanation: "The twelve-factor app methodology (Factor III) states that configuration should be stored in the environment, not in code. Kubernetes ConfigMaps and Secrets align perfectly with this by injecting configuration as environment variables or mounted files at runtime. Embedding configuration in the image violates this principle. Shared NFS mounts add unnecessary coupling, and hardcoding with build flags conflates configuration with code.\n\nWhy other options are wrong:\n- B: Building a separate image per environment violates the twelve-factor principle of one codebase, many deploys\n- C: Shared NFS mounts couple services to a shared filesystem and are not cloud-native\n- D: Hardcoding with compile-time flags embeds config in code, violating Factor III\n\nReference: https://12factor.net/config",
    verify: null
  },
  {
    id: "s02-q019",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices platform has 30 services, each requiring slightly different configurations per environment. The team is spending significant time managing ConfigMaps manually. Which cloud-native pattern would best address this at scale?",
    diagram: null,
    options: [
      "Merge all 30 services into a monolith to reduce the total number of ConfigMaps needed in the cluster",
      "Use a centralized config tool like Spring Cloud Config or Consul, integrated with Kubernetes APIs",
      "Store all configurations in a single large ConfigMap shared across every service in the namespace",
      "Eliminate ConfigMaps entirely and hardcode all configuration values in each service's Dockerfile"
    ],
    answer: 1,
    explanation: "Centralized configuration management tools like Spring Cloud Config, HashiCorp Consul, or similar solutions provide a single source of truth for configuration across many services and environments. They can integrate with Kubernetes to dynamically provide configuration. Merging into a monolith defeats microservices benefits. A single shared ConfigMap creates tight coupling. Hardcoding in Dockerfiles violates configuration externalization principles.\n\nWhy other options are wrong:\n- A: Merging into a monolith defeats the benefits of microservices architecture\n- C: A single shared ConfigMap creates tight coupling between all 30 services\n- D: Hardcoding in Dockerfiles violates the principle of externalizing configuration\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: null
  },
  {
    id: "s02-q020",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "An organization wants to manage Secrets securely across multiple Kubernetes clusters without storing them in Git as plaintext. Which CNCF ecosystem tool is purpose-built for external secret management integration?",
    diagram: null,
    options: [
      "External Secrets Operator syncs secrets from stores like AWS Secrets Manager into clusters",
      "Argo CD encrypts Secrets during GitOps synchronization when deploying to target clusters",
      "Fluentd collects Secret data from application logs and injects them into destination pods",
      "Prometheus can monitor and rotate Secrets automatically across multiple cluster environments"
    ],
    answer: 0,
    explanation: "The External Secrets Operator is a Kubernetes operator that integrates with external secret management systems (AWS Secrets Manager, HashiCorp Vault, Google Secret Manager, Azure Key Vault, etc.) and automatically creates Kubernetes Secrets from externally stored data. Prometheus is for monitoring, Fluentd is for logging, and while Argo CD handles GitOps deployment, it does not natively encrypt or manage Secrets.\n\nWhy other options are wrong:\n- B: Argo CD is a GitOps deployment tool and does not natively encrypt or manage Secrets\n- C: Fluentd is a log aggregation tool and does not handle Secret injection\n- D: Prometheus is a monitoring system and cannot rotate or manage Secrets\n\nReference: https://external-secrets.io/",
    verify: null
  },
  {
    id: "s02-q021",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A development team practices immutable infrastructure. A new configuration change needs to be deployed. Following immutable infrastructure principles, what is the correct process?",
    diagram: null,
    options: [
      "SSH into each running pod and manually update the configuration files in place on the filesystem",
      "Use `kubectl edit` to modify the running Deployment and let pods pick up the changes dynamically",
      "Build a new container image with the updated configuration baked in for every environment",
      "Create a new versioned ConfigMap, then trigger a Deployment rollout by updating the pod template reference"
    ],
    answer: 3,
    explanation: "Immutable infrastructure means not modifying running instances. While option C (rebuilding the image) follows immutable principles for application code, for configuration changes, creating a new ConfigMap and updating the Deployment reference (e.g., changing a ConfigMap name hash annotation) triggers a rollout that replaces pods with new ones using the updated configuration. This avoids SSH access and in-place edits. Using `kubectl edit` to modify running resources can work but modifying only the ConfigMap without triggering a rollout may leave pods with stale configuration.\n\nWhy other options are wrong:\n- A: SSH into pods violates immutable infrastructure principles and is a security anti-pattern\n- B: kubectl edit modifies the running resource but may not trigger a pod rollout for ConfigMap changes\n- C: Rebuilding the image for every config change is wasteful when ConfigMaps separate config from code\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: null
  },

  // ── Cloud Native Observability (2) ─────────────
  {
    id: "s02-q022",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform team wants to alert when any namespace exceeds 80% of its ResourceQuota for CPU requests. Which monitoring approach is most appropriate in a Kubernetes-native stack?",
    diagram: null,
    options: [
      "Write a CronJob that runs `kubectl describe resourcequota` and parses output with a shell script",
      "Use Prometheus `kube_resourcequota` metrics and create alerting rules on usage-to-hard ratios",
      "Enable the Kubernetes audit log, then configure filters to capture ResourceQuota-related events",
      "Deploy a sidecar container in every pod that reports its own CPU usage to a central database"
    ],
    answer: 1,
    explanation: "Prometheus with kube-state-metrics exposes `kube_resourcequota` metrics that include both `hard` (limit) and `used` values for each resource type. An alerting rule can compare these to fire when usage exceeds a threshold. A CronJob with shell parsing is fragile and not scalable. Audit logs capture API events, not quota utilization. Sidecar containers report per-pod usage, not namespace-level quota consumption.\n\nWhy other options are wrong:\n- A: CronJob with shell script parsing is fragile, not scalable, and not Kubernetes-native monitoring\n- C: Audit logs capture API events but not quota utilization percentages\n- D: Per-pod sidecars report individual pod usage, not namespace-level quota consumption ratios\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: null
  },
  {
    id: "s02-q023",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A finance team wants to track cloud costs per Kubernetes namespace. Each namespace corresponds to a team. Which resource management features help attribute compute costs?",
    diagram: null,
    options: [
      "Network Policies track inter-namespace data transfer which serves as the primary cost driver metric",
      "ResourceQuotas and requests define per-namespace compute allocations that map to cost attribution",
      "Pod Disruption Budgets control pod replacement rates which directly affects compute billing costs",
      "Service accounts carry billing identifiers attached automatically by the underlying cloud provider"
    ],
    answer: 1,
    explanation: "ResourceQuotas define the maximum resources a namespace can consume, and resource requests define what each pod asks for. Together, they provide the data needed to attribute compute costs to teams. Tools like Kubecost use this data. Network Policies control traffic flow, not cost tracking. Pod Disruption Budgets manage availability during disruptions. Service accounts handle authentication, not billing.\n\nWhy other options are wrong:\n- A: Network Policies control traffic flow rules, not cost tracking or data transfer accounting\n- C: PDBs manage availability during disruptions and are unrelated to compute billing\n- D: Service accounts handle authentication, not billing; cloud providers do not auto-attach billing IDs to them\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: "kubectl describe resourcequota -n <namespace>"
  },

  // ── Cloud Native Application Delivery (2) ──────
  {
    id: "s02-q024",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A team uses Helm to deploy their application. Configuration values like replica count, image tag, and resource limits vary per environment. Where should these environment-specific values be stored?",
    diagram: null,
    options: [
      "In the `Chart.yaml` file, which supports per-environment overrides natively within Helm's schema",
      "In a ConfigMap that Helm reads at install time using the `--config-from` flag for each release",
      "Directly in manifests inside `templates/` with `if/else` blocks to handle each environment path",
      "In separate values files (e.g., `values-dev.yaml`, `values-prod.yaml`) passed with `-f` flag"
    ],
    answer: 3,
    explanation: "Helm supports multiple values files that can be passed during install or upgrade with the `-f` flag. This allows maintaining separate files per environment (dev, staging, prod) while sharing the same chart templates. `Chart.yaml` contains chart metadata, not deployable values. Hardcoding conditions in templates defeats the purpose of Helm's templating. There is no `--config-from` flag in Helm.\n\nWhy other options are wrong:\n- A: Chart.yaml contains chart metadata (name, version, dependencies), not deployable configuration values\n- B: There is no --config-from flag in Helm\n- C: Hardcoding if/else in templates defeats Helm's values-based templating purpose\n\nReference: https://helm.sh/docs/chart_template_guide/values_files/",
    verify: "helm install --help | head -30"
  },
  {
    id: "s02-q025",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps team stores all Kubernetes manifests in Git, including ConfigMaps with database URLs. They want to manage Secrets without committing plaintext credentials to the repository. Which approach follows GitOps best practices?",
    diagram: null,
    options: [
      "Commit Secrets as base64-encoded values since Git does not display binary data in plain diffs",
      "Use Sealed Secrets (Bitnami) to encrypt Secrets before committing; only the cluster decrypts",
      "Store Secrets in a separate private Git repository with tightly restricted team access controls",
      "Avoid storing Secrets in Git entirely and create them manually via `kubectl create secret` each time"
    ],
    answer: 1,
    explanation: "Sealed Secrets encrypts Secret data with a public key so that the encrypted form can be safely stored in Git. Only the Sealed Secrets controller in the cluster holds the private key to decrypt them. Base64 encoding is not encryption and is trivially decoded. A separate private repo still stores plaintext. Manual creation via `kubectl` breaks the GitOps principle of Git as the single source of truth.\n\nWhy other options are wrong:\n- A: Base64 is trivially reversible encoding, not encryption; committing base64 Secrets is insecure\n- C: A separate private repo still stores plaintext credentials, which is a security risk\n- D: Manual kubectl create breaks GitOps principle of Git as the single source of truth\n\nReference: https://github.com/bitnami-labs/sealed-secrets",
    verify: null
  },

  // ───────────────────────────────────────────────
  // BATCH 2: q026–q050
  // K8s Fundamentals=12, Container Orchestration=5,
  // Cloud Native Architecture=4, Observability=2, App Delivery=2
  // ───────────────────────────────────────────────

  // ── Kubernetes Fundamentals (12) ──────────────
  {
    id: "s02-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team creates a Secret using `kubectl create secret generic api-keys --from-literal=stripe=sk_live_abc123`. When they run `kubectl get secret api-keys -o yaml`, the value appears as `c2tfbGl2ZV9hYmMxMjM=`. A junior engineer asks if the data is encrypted. What is the correct explanation?",
    diagram: null,
    options: [
      "Yes, Kubernetes encrypts Secret data with `AES-256` before storing it in the manifest output format",
      "No, the value is only base64-encoded, not encrypted; anyone can decode it with `base64 --decode`",
      "Yes, it is encrypted with the cluster `TLS` certificate and can only be decoded by the API server",
      "No, but the data is hashed using `SHA-256`, meaning the original value cannot ever be recovered"
    ],
    answer: 1,
    explanation: "Kubernetes Secrets store data as base64-encoded strings, not encrypted. Base64 is an encoding scheme, not encryption — it is trivially reversible. Running `echo 'c2tfbGl2ZV9hYmMxMjM=' | base64 --decode` returns the original value. To achieve actual encryption, administrators must configure etcd encryption at rest. The data is not hashed or encrypted with TLS certificates by default.\n\nWhy other options are wrong:\n- A: Kubernetes does not encrypt Secret data with AES-256 by default; base64 is encoding, not encryption\n- C: Secrets are not encrypted with TLS certificates; they are simply base64-encoded in the data field\n- D: Secret values are not hashed; they are base64-encoded and fully reversible\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets",
    verify: "kubectl get secret api-keys -o jsonpath='{.data.stripe}' | base64 --decode"
  },
  {
    id: "s02-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A platform team needs to pass a multi-line configuration file (50 lines of YAML) to an application pod. The data must be stored in a ConfigMap. Which approach is most practical?",
    diagram: null,
    options: [
      "Use `--from-literal` with the entire file content pasted as a single escaped string on the CLI",
      "Convert the YAML to JSON and store it as a Secret since Secrets support larger data payloads",
      "Split the file into 50 individual keys, one per line, and reassemble them inside the container",
      "Use `--from-file=config.yaml` to create the ConfigMap; file content stored under that key"
    ],
    answer: 3,
    explanation: "The `--from-file` flag reads the contents of a file and stores it as a single key-value pair in the ConfigMap, where the key defaults to the filename. This is the standard way to handle multi-line configuration data. Using `--from-literal` with 50 lines would be unwieldy and error-prone. Splitting into individual keys adds unnecessary complexity. Secrets do not support larger data sizes than ConfigMaps — both are limited to about 1 MiB.\n\nWhy other options are wrong:\n- A: Pasting a 50-line file as a single --from-literal value is impractical and error-prone\n- B: Secrets have the same ~1 MiB size limit as ConfigMaps; converting to JSON for a Secret gains nothing\n- C: Splitting into 50 individual keys adds unnecessary complexity and reassembly logic\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_configmap/",
    verify: "kubectl create configmap test-cfg --from-file=config.yaml --dry-run=client -o yaml"
  },
  {
    id: "s02-q028",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod specification sets `resources.requests.cpu: 250m` and `resources.limits.cpu: 1` for a container. During a CPU-intensive workload, what happens when the container tries to use 1.5 CPU cores?",
    diagram: null,
    options: [
      "The container is OOM-killed because it exceeded its CPU limit beyond the allowed specification",
      "The pod is evicted from the node and rescheduled to a node with more available CPU capacity",
      "The container freely uses 1.5 cores because CPU limits are advisory and not strictly enforced",
      "The container is throttled to 1 CPU core; limits are enforced via CFS throttling, not killing"
    ],
    answer: 3,
    explanation: "CPU is a compressible resource in Kubernetes. When a container tries to exceed its CPU limit, the kernel's Completely Fair Scheduler (CFS) throttles the process — it does not kill or evict the container. This is different from memory, which is incompressible: exceeding memory limits results in OOM killing. CPU limits are enforced, not advisory, through CFS quota and period settings.\n\nWhy other options are wrong:\n- A: CPU is a compressible resource; exceeding CPU limits causes throttling, not OOM killing\n- B: CPU limit violations do not cause pod eviction or rescheduling\n- C: CPU limits are enforced via CFS quota, not advisory; the container is throttled, not allowed to exceed\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: null
  },
  {
    id: "s02-q029",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer wants to use `envFrom` to load all keys from a ConfigMap as environment variables. The ConfigMap contains a key called `database.host`. What issue might arise?",
    diagram: null,
    options: [
      "No issue arises because environment variables in Linux fully support any characters including periods in key names",
      "`envFrom` only supports keys starting with a letter containing alphanumeric characters; the pod will fail to start",
      "The period is automatically converted to an underscore by the kubelet, creating the key `database_host` in the env",
      "The period in `database.host` is invalid for env var names, so this key is skipped with a warning event on the pod"
    ],
    answer: 3,
    explanation: "Environment variable names in POSIX must consist of uppercase letters, digits, and underscores. While Linux technically allows periods in environment variable names, Kubernetes skips ConfigMap keys that are not valid environment variable names when using `envFrom`. An event is generated on the pod indicating the key was skipped. Kubernetes does not automatically convert periods to underscores. The pod still starts — only the invalid key is skipped.\n\nWhy other options are wrong:\n- A: Linux technically allows periods in env var names but Kubernetes skips them via envFrom validation\n- B: The pod still starts; only the invalid key is skipped with a warning, not a pod startup failure\n- C: Kubernetes does not auto-convert periods to underscores; the key is simply skipped\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#use-envfrom-to-define-all-of-the-configmaps-data-as-container-environment-variables",
    verify: "kubectl describe pod <pod-name> | grep -i warning"
  },
  {
    id: "s02-q030",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A namespace has a LimitRange that sets `default.memory: 256Mi` and `defaultRequest.memory: 128Mi`. A developer creates a pod in this namespace without specifying any memory values. What memory request and limit will the pod receive?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">LimitRange Defaults</text><line x1="200" y1="50" x2="200" y2="170" stroke="#555" stroke-width="1" stroke-dasharray="5,5"/><text x="100" y="70" text-anchor="middle" fill="#e0e0e0" font-size="12">Request</text><rect x="40" y="80" width="120" height="40" rx="5" fill="#2d6a4f"/><text x="100" y="105" text-anchor="middle" fill="white" font-size="14">???</text><text x="300" y="70" text-anchor="middle" fill="#e0e0e0" font-size="12">Limit</text><rect x="240" y="80" width="120" height="40" rx="5" fill="#e63946"/><text x="300" y="105" text-anchor="middle" fill="white" font-size="14">???</text><text x="200" y="155" text-anchor="middle" fill="#aaa" font-size="11">What values are applied?</text></svg>',
    options: [
      "Request: 256Mi, Limit: 256Mi — the default limit value is used for both fields automatically",
      "Request: 0, Limit: 256Mi — requests default to zero when not specified by the pod specification",
      "Request: 128Mi, Limit: 256Mi — the LimitRange injects defaults for unspecified resource fields",
      "The pod creation fails because the LimitRange requires the developer to explicitly specify resource values"
    ],
    answer: 2,
    explanation: "A LimitRange with `default` and `defaultRequest` values automatically injects these into containers that do not specify their own resource values. `defaultRequest.memory` sets the request to 128Mi and `default.memory` sets the limit to 256Mi. Requests do not default to zero or to the limit value. The pod creation does not fail — LimitRanges are specifically designed to provide defaults so that ResourceQuotas can be enforced.\n\nWhy other options are wrong:\n- A: The request defaults to the defaultRequest value (128Mi), not the limit value (256Mi)\n- B: Requests do not default to zero; the LimitRange defaultRequest field sets the value\n- D: Pod creation does not fail because LimitRange is specifically designed to inject defaults\n\nReference: https://kubernetes.io/docs/concepts/policy/limit-range/",
    verify: "kubectl describe limitrange -n <namespace>"
  },
  {
    id: "s02-q031",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An application reads its configuration from a file at `/config/app.yaml`. The team mounts a ConfigMap as a volume at `/config`. They later notice that other files they placed in `/config` inside the Dockerfile are gone. What happened?",
    diagram: null,
    options: [
      "A bug in the kubelet accidentally deleted the extra files during the ConfigMap mount process on the node",
      "The container runtime performs a security cleanup of any directory where a ConfigMap volume is mounted",
      "Mounting a volume at a path replaces the directory contents; only the ConfigMap data exists there",
      "The files still exist but are hidden beneath the mount point; running `ls -a /config` would show them"
    ],
    answer: 2,
    explanation: "When a volume is mounted at a path in a container, it completely overlays (replaces) whatever was at that path in the image. From the container's perspective, the volume mount completely replaces the directory. The original files from the Dockerfile exist in the image layer but are completely inaccessible once the volume is mounted over the path — no command run inside the container can see them. This is standard Linux mount overlay behavior. To mount a single file without replacing the directory, use `subPath`.\n\nWhy other options are wrong:\n- A: This is standard mount overlay behavior, not a kubelet bug\n- B: The container runtime does not perform security cleanup; this is normal Linux mount behavior\n- D: Files beneath a mount point are inaccessible, including with ls -a; the mount fully overlays the path\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#configmap",
    verify: null
  },
  {
    id: "s02-q032",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod has three containers, each with the following resource specifications:\n- Container A: requests.cpu=100m, limits.cpu=100m, requests.memory=64Mi, limits.memory=64Mi\n- Container B: requests.cpu=200m, limits.cpu=200m, requests.memory=128Mi, limits.memory=128Mi\n- Container C: requests.cpu=300m, limits.cpu=300m, requests.memory=256Mi, limits.memory=256Mi\n\nWhat QoS class is assigned to this pod?",
    diagram: null,
    options: [
      "`Guaranteed` — every container has requests equal to limits for both CPU and memory",
      "`Burstable` — because the containers each have different resource values from one another",
      "`Guaranteed` — but only because the total sum of requests equals the total sum of limits",
      "`Burstable` — because more than one container definition is specified inside the pod spec"
    ],
    answer: 0,
    explanation: "The `Guaranteed` QoS class requires that every container in the pod has CPU and memory requests set, and each request equals its corresponding limit. The values do not need to be the same across containers — only requests must equal limits within each container. All three containers meet this criterion. Multiple containers in a pod do not affect QoS classification, and it is the per-container equality that matters, not the totals.\n\nWhy other options are wrong:\n- B: Different absolute values across containers do not affect QoS; only per-container request=limit equality matters\n- C: The QoS class is determined by per-container request=limit equality, not by sum totals\n- D: Multiple containers in a pod do not prevent Guaranteed QoS classification\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/#guaranteed",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.qosClass}'"
  },
  {
    id: "s02-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer sets an environment variable in a pod using the Downward API: `fieldRef: {fieldPath: metadata.name}`. What value will this environment variable contain at runtime?",
    diagram: null,
    options: [
      "The name of the parent controller (e.g., `myapp` from a Deployment named `myapp`)",
      "The name of the specific container defined within the pod's specification manifest",
      "The actual pod name with the generated suffix (e.g., `myapp-7d4b8c6f9-x2k4p`)",
      "The namespace the pod runs in (e.g., `default` or `kube-system`) rather than its name"
    ],
    answer: 2,
    explanation: "The Downward API `metadata.name` field returns the pod's own name as assigned by Kubernetes, which for pods created by a ReplicaSet includes the generated random suffix. It does not return the Deployment name, container name, or namespace. To get the namespace, you would use `metadata.namespace`. To get labels or annotations, you would use `metadata.labels` or `metadata.annotations` respectively.\n\nWhy other options are wrong:\n- A: metadata.name returns the pod name, not the Deployment or ReplicaSet controller name\n- B: metadata.name returns the pod name, not the container name from the spec\n- D: metadata.name returns the pod name; for namespace, use metadata.namespace\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/",
    verify: "kubectl exec <pod-name> -- printenv"
  },
  {
    id: "s02-q034",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A cluster has etcd encryption at rest enabled using the `aescbc` provider. An administrator needs to rotate the encryption key. What is the correct procedure?",
    diagram: null,
    options: [
      "Add the new key first in `EncryptionConfiguration`, restart the API server, then re-encrypt all Secrets with a replace command",
      "Delete all existing Secrets and recreate them from scratch — Kubernetes will re-encrypt on creation using the new key automatically",
      "Run `kubectl rotate-keys --provider=aescbc` which handles the full key rotation process automatically without any manual steps",
      "Replace the old key with the new one in the `EncryptionConfiguration` and restart the API server; data re-encrypts on the next read"
    ],
    answer: 0,
    explanation: "Key rotation for etcd encryption requires adding the new key as the first (active) entry while keeping the old key for decrypting existing data. After restarting the API server, all existing Secrets must be rewritten so they are re-encrypted with the new key. A common method is to read and replace all Secrets. There is no `kubectl rotate-keys` command. Simply replacing the key without rewriting data would leave existing Secrets unreadable. Data is not re-encrypted on read.\n\nWhy other options are wrong:\n- B: Deleting and recreating all Secrets is destructive and unnecessary when key rotation can preserve them\n- C: There is no kubectl rotate-keys command in Kubernetes\n- D: Simply replacing the key without rewriting data leaves existing Secrets encrypted with the old key, not re-encrypted on read\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#rotating-a-decryption-key",
    verify: null
  },
  {
    id: "s02-q035",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team notices their ConfigMap has reached its maximum size. They need to store a large dataset (approximately 2 MiB) that an application pod must read at startup. What alternative should they consider?",
    diagram: null,
    options: [
      "Use a PersistentVolume to store the large dataset, since ConfigMaps are limited to approximately 1 MiB of data",
      "Split the data across two ConfigMaps and merge them inside the container at startup using an init container script",
      "Increase the ConfigMap size limit by modifying the API server's `--max-configmap-size` startup configuration flag",
      "Use a Secret instead of a ConfigMap, which supports up to 10 MiB of data storage for larger configuration files"
    ],
    answer: 0,
    explanation: "ConfigMaps (and Secrets) are limited to approximately 1 MiB (1,048,576 bytes) of data. For larger datasets, a PersistentVolume, an init container that downloads data, or an external data store are appropriate alternatives. There is no `--max-configmap-size` API server flag to increase this limit. Secrets have the same size limit as ConfigMaps. While splitting across two ConfigMaps is technically possible, it adds complexity and is not the recommended approach for large data.\n\nWhy other options are wrong:\n- B: Splitting across two ConfigMaps adds complexity and is not the recommended approach for large data\n- C: There is no --max-configmap-size API server flag; the 1 MiB limit is hardcoded\n- D: Secrets have the same ~1 MiB size limit as ConfigMaps, not 10 MiB\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#motivation",
    verify: null
  },
  {
    id: "s02-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A namespace has a ResourceQuota that limits total memory requests to 2Gi. Currently, pods in the namespace have consumed 1.5Gi of memory requests. A developer tries to deploy a pod requesting 700Mi of memory. What happens?",
    diagram: null,
    options: [
      "The pod is created but placed in `Pending` state until other pods are evicted to free up namespace quota",
      "The pod is created and the ResourceQuota is automatically increased to accommodate the new pod request",
      "The pod creation is rejected by the admission controller because 1.5Gi + 700Mi exceeds the 2Gi quota",
      "The pod is created but with its memory request automatically reduced to 500Mi to fit within the quota"
    ],
    answer: 2,
    explanation: "ResourceQuotas are enforced by an admission controller at creation time. If creating a pod would cause the namespace to exceed its quota, the request is immediately rejected — the pod is not created at all. Kubernetes does not queue pods waiting for quota, auto-increase quotas, or reduce requested resources. The developer must either reduce the pod's resource request, delete other pods to free up quota, or ask an administrator to increase the quota.\n\nWhy other options are wrong:\n- A: ResourceQuota does not queue pods in Pending state; it immediately rejects creation\n- B: ResourceQuota limits are not automatically increased\n- D: Kubernetes does not auto-reduce resource requests to fit within quota\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: "kubectl describe resourcequota -n <namespace>"
  },
  {
    id: "s02-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod specification sets `resources.requests.memory: 512Mi` and `resources.limits.memory: 512Mi` for its only container, but specifies no CPU requests or limits. What QoS class does Kubernetes assign?",
    diagram: null,
    options: [
      "`Guaranteed` — because memory requests are equal to memory limits for the container",
      "`Burstable` — because CPU requests and limits are not specified for the container",
      "`BestEffort` — because CPU has no specifications at all in the pod's resource spec",
      "`Guaranteed` — because Kubernetes defaults CPU values to match memory specifications"
    ],
    answer: 1,
    explanation: "For the `Guaranteed` QoS class, every container must have both CPU and memory requests set, and each must equal its corresponding limit. This pod only specifies memory, not CPU. Since at least one resource is specified (memory), it is not `BestEffort`. Therefore it receives the `Burstable` class. Kubernetes does not automatically set CPU defaults based on memory specifications — a LimitRange would be needed for default injection.\n\nWhy other options are wrong:\n- A: Guaranteed requires both CPU and memory requests equal to limits, not just memory\n- C: BestEffort requires zero resource specs on all containers; this pod specifies memory\n- D: Kubernetes does not auto-set CPU values from memory specs; a LimitRange would be needed\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/#burstable",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.qosClass}'"
  },

  // ── Container Orchestration (5) ────────────────
  {
    id: "s02-q038",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A container needs to read a TLS private key from a Secret mounted as a file. The security team requires that the file permissions inside the container are set to `0400` (owner read-only). How can this be achieved?",
    diagram: null,
    options: [
      "Run `chmod 0400` in a postStart lifecycle hook after the Secret volume has been mounted in place",
      "Secret volume file permissions default to 0644 and can only be changed by the container runtime configuration",
      "Add a `securityContext.filePermissions: 0400` field to the container spec to override mount mode",
      "Set `defaultMode: 0400` on the Secret volume definition in the pod spec to control permissions"
    ],
    answer: 3,
    explanation: "When defining a Secret (or ConfigMap) volume, you can set `defaultMode` to control the file permissions of the mounted files. Setting `defaultMode: 0400` ensures files are created with owner read-only permissions. There is no `securityContext.filePermissions` field. While a postStart hook could change permissions, it is a less clean approach and may have race conditions. Secret volume file permissions are configurable and default to `0644`, but this can be overridden.\n\nWhy other options are wrong:\n- A: A postStart hook could work but has race conditions and is less clean than defaultMode\n- B: Secret volume file permissions default to 0644 but are configurable via defaultMode\n- C: There is no securityContext.filePermissions field in the Kubernetes API\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#secret",
    verify: "kubectl explain pod.spec.volumes.secret.defaultMode"
  },
  {
    id: "s02-q039",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "An organization mandates that no pod in the `restricted` namespace can mount Secrets as environment variables — only volume mounts are permitted. Which Kubernetes mechanism can enforce this policy?",
    diagram: null,
    options: [
      "A NetworkPolicy that blocks all access to the Kubernetes Secrets API from pods in the namespace",
      "Setting `allowEnvSecrets: false` in the namespace's ResourceQuota spec to block env var mounts",
      "A validating admission webhook or policy engine like OPA Gatekeeper or Kyverno for enforcement",
      "Configuring RBAC to deny `get` verb access to Secrets for all users within the namespace scope"
    ],
    answer: 2,
    explanation: "Validating admission webhooks and policy engines like OPA Gatekeeper or Kyverno can inspect pod specifications and reject those that reference Secrets in `env` or `envFrom` fields. NetworkPolicies control network traffic, not API access patterns. There is no `allowEnvSecrets` field in ResourceQuota. RBAC controls who can access Secrets but cannot distinguish between how pods consume them (env vs volume).\n\nWhy other options are wrong:\n- A: NetworkPolicies control network traffic between pods, not API access patterns for Secrets\n- B: There is no allowEnvSecrets field in ResourceQuota\n- D: RBAC controls who can access Secrets but cannot distinguish how pods consume them (env vs volume)\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
    verify: null
  },
  {
    id: "s02-q040",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod is stuck in `Pending` state. Running `kubectl describe pod` shows the event: `0/3 nodes are available: 3 Insufficient memory`. The pod requests 4Gi of memory. Each node has 8Gi total, but existing pods already request 6Gi on each node. What is the most direct fix?",
    diagram: null,
    options: [
      "Reduce the pod's memory request to 2Gi or less, or add a node with enough memory",
      "Increase the pod's memory limit to allow Kubernetes to compress memory usage on the node",
      "Delete the ResourceQuota in the namespace to remove the memory restriction from the pods",
      "Set `priorityClassName: system-cluster-critical` to preempt lower-priority existing pods"
    ],
    answer: 0,
    explanation: "The scheduler uses resource requests (not limits) to determine if a pod fits on a node. With 6Gi already requested on each 8Gi node, only 2Gi is allocatable. A 4Gi request cannot be scheduled. The fix is to either reduce the request or add capacity. Memory is incompressible and cannot be compressed by increasing limits. The issue is scheduling based on requests, not a ResourceQuota. While preemption could work, it would disrupt running workloads and is not the most direct fix.\n\nWhy other options are wrong:\n- B: Memory is incompressible and cannot be compressed by increasing limits\n- C: The issue is node-level scheduling based on requests, not a namespace-level ResourceQuota\n- D: Preemption disrupts running workloads and is not the most direct fix for an oversized request\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-requests-are-scheduled",
    verify: "kubectl describe nodes | grep -A5 'Allocated resources'"
  },
  {
    id: "s02-q041",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A team needs to combine multiple ConfigMaps and a Secret into the same directory inside a pod. Using separate volume mounts at the same path would cause conflicts. Which volume type solves this?",
    diagram: null,
    options: [
      "An `emptyDir` volume with an init container that copies data from each ConfigMap and Secret source",
      "A `persistentVolumeClaim` that aggregates data from multiple ConfigMap and Secret sources together",
      "A `hostPath` volume that maps to a pre-populated directory on the node's local disk filesystem path",
      "A `projected` volume combining ConfigMaps, Secrets, Downward API, and token sources in one mount"
    ],
    answer: 3,
    explanation: "The `projected` volume type allows combining multiple volume sources — ConfigMaps, Secrets, Downward API fields, and ServiceAccountToken — into a single directory. This avoids the conflict of mounting multiple volumes at the same path. An emptyDir with init containers works but is more complex. hostPath introduces node dependency. PersistentVolumeClaims provide persistent storage, not configuration aggregation.\n\nWhy other options are wrong:\n- A: emptyDir with init containers works but adds unnecessary complexity compared to projected volumes\n- B: PVCs provide persistent storage, not configuration source aggregation\n- C: hostPath creates node dependency and is not for combining multiple config sources\n\nReference: https://kubernetes.io/docs/concepts/storage/projected-volumes/",
    verify: "kubectl explain pod.spec.volumes.projected"
  },
  {
    id: "s02-q042",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod needs to construct a self-referencing URL that includes its own IP address. The application reads this from the environment variable `POD_IP`. Which pod spec configuration correctly provides this?",
    diagram: null,
    options: [
      "`env: [{name: POD_IP, valueFrom: {fieldRef: {fieldPath: status.podIP}}}]` via Downward API",
      "`env: [{name: POD_IP, valueFrom: {resourceFieldRef: {resource: network.ip}}}]` for network data",
      "`env: [{name: POD_IP, value: \"$(POD_NETWORK_IP)\"}]` referencing the built-in network variable",
      "`env: [{name: POD_IP, valueFrom: {configMapKeyRef: {name: kube-system-info, key: pod-ip}}}]`"
    ],
    answer: 0,
    explanation: "The Downward API provides `status.podIP` through `fieldRef`, which exposes the pod's IP address as an environment variable. `resourceFieldRef` is for CPU and memory resource values, not network information. There is no built-in `POD_NETWORK_IP` variable. No system ConfigMap exists that holds individual pod IPs — each pod gets its own IP dynamically.\n\nWhy other options are wrong:\n- B: resourceFieldRef is for CPU and memory resource values, not network information like pod IP\n- C: There is no built-in POD_NETWORK_IP variable in Kubernetes\n- D: No system ConfigMap exists that holds individual pod IPs; each pod IP is assigned dynamically\n\nReference: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/",
    verify: "kubectl explain pod.spec.containers.env.valueFrom.fieldRef"
  },

  // ── Cloud Native Architecture (4) ─────────────
  {
    id: "s02-q043",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "In a microservices architecture, each service has its own ConfigMap for configuration. Service A needs to know the database port that Service B uses. A developer proposes sharing Service B's ConfigMap with Service A. What is the architectural concern?",
    diagram: null,
    options: [
      "ConfigMaps cannot be shared between pods that belong to different Deployments within a namespace",
      "Sharing ConfigMaps creates tight coupling; changes to Service B's config could break Service A",
      "Kubernetes rate-limits ConfigMap read operations so sharing would cause pod performance degradation",
      "Shared ConfigMaps are automatically replicated across namespaces causing eventual data inconsistency"
    ],
    answer: 1,
    explanation: "Sharing configuration directly between services creates coupling, which violates the microservices principle of loose coupling. If Service B changes its ConfigMap, Service A might break. A better approach is to use service discovery, APIs, or dedicated shared configuration that both services explicitly depend on. ConfigMaps can be shared between pods in the same namespace. There is no rate limiting on ConfigMap reads, and ConfigMaps are not automatically replicated.\n\nWhy other options are wrong:\n- A: ConfigMaps can be shared between any pods in the same namespace regardless of Deployment ownership\n- C: Kubernetes does not rate-limit ConfigMap read operations\n- D: ConfigMaps are not automatically replicated across namespaces\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: null
  },
  {
    id: "s02-q044",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team evaluating secret management solutions for Kubernetes compares HashiCorp Vault with native Kubernetes Secrets. Which statement accurately describes a key advantage of Vault?",
    diagram: null,
    options: [
      "Vault stores secrets in etcd alongside Kubernetes Secrets so there is no real architectural difference between them",
      "Vault fully replaces Kubernetes RBAC by managing all access control policies for the entire cluster independently",
      "Vault provides dynamic secret generation, fine-grained access control, audit logging, and automatic rotation",
      "Vault is the only CNCF-graduated project for secret management and is a mandatory requirement for CKS certification"
    ],
    answer: 2,
    explanation: "HashiCorp Vault provides capabilities that go far beyond Kubernetes native Secrets: dynamic secret generation (e.g., temporary database credentials), detailed audit logging, automatic rotation, multiple authentication backends, and fine-grained policies. Vault uses its own storage backend, not etcd. It complements RBAC rather than replacing it. Vault is not a CNCF project (it is a HashiCorp product) and is not required for any certification.\n\nWhy other options are wrong:\n- A: Vault uses its own storage backend, not etcd; it has a fundamentally different architecture\n- B: Vault complements Kubernetes RBAC; it does not replace cluster-level access control\n- D: Vault is a HashiCorp product, not a CNCF project, and is not required for any Kubernetes certification\n\nReference: https://www.vaultproject.io/docs/what-is-vault",
    verify: null
  },
  {
    id: "s02-q045",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A team runs event-driven functions on Kubernetes using Knative. Their functions need API keys for external services. Following cloud-native best practices, how should these API keys be provided to the function pods?",
    diagram: null,
    options: [
      "Store keys in Kubernetes Secrets and reference them as env vars in the Knative Service spec",
      "Embed the API keys directly in the function source code so they are always available at runtime",
      "Pass the API keys as query parameters in the event trigger URL for the Knative function endpoint",
      "Store the API keys in a public ConfigMap so all serverless functions in the namespace can share"
    ],
    answer: 0,
    explanation: "Knative Services support the same pod spec fields as regular Kubernetes workloads, including environment variables from Secrets. This keeps credentials separate from code and follows the principle of least privilege. Embedding keys in source code is a security anti-pattern. Passing keys in URLs risks exposure in logs. ConfigMaps are for non-sensitive data — API keys should use Secrets.\n\nWhy other options are wrong:\n- B: Embedding API keys in source code is a major security anti-pattern\n- C: Passing keys in URLs risks exposure in logs, browser history, and server-side logs\n- D: API keys are sensitive data and should use Secrets, not ConfigMaps\n\nReference: https://knative.dev/docs/serving/",
    verify: null
  },
  {
    id: "s02-q046",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud-native application needs to handle configuration changes without downtime. The current approach requires a pod restart for every ConfigMap update. Which pattern enables dynamic configuration reloading?",
    diagram: null,
    options: [
      "Enable the `DynamicConfigReload` feature gate on the kubelet to allow automatic config propagation to pods",
      "Set `restartPolicy: OnConfigChange` on the pod spec to make Kubernetes restart it automatically on updates",
      "Use `kubectl apply --live-reload` to push ConfigMap changes directly into running container processes",
      "Use a sidecar that watches the mounted ConfigMap volume and signals (e.g., `SIGHUP`) the main process"
    ],
    answer: 3,
    explanation: "A sidecar pattern is a proven cloud-native approach: mount the ConfigMap as a volume (not with subPath), and a sidecar watches for file changes. When detected, it sends a signal (like SIGHUP) to the main process to reload configuration. There is no `restartPolicy: OnConfigChange`, no `kubectl apply --live-reload` flag, and no `DynamicConfigReload` feature gate in Kubernetes.\n\nWhy other options are wrong:\n- A: There is no DynamicConfigReload feature gate in Kubernetes\n- B: There is no restartPolicy: OnConfigChange in the Kubernetes pod spec\n- C: There is no kubectl apply --live-reload flag\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: null
  },

  // ── Cloud Native Observability (2) ─────────────
  {
    id: "s02-q047",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A pod mounts a Secret containing a database password as an environment variable `DB_PASS`. The application logs all environment variables at startup for debugging. What observability concern does this create?",
    diagram: null,
    options: [
      "The Secret value appears in plaintext in logs, potentially exposing it through log aggregation pipelines",
      "No concern — Kubernetes automatically redacts Secret values from all container log output by default",
      "The kubelet intercepts container log output and replaces any Secret values with `[REDACTED]` markers",
      "Env vars from Secrets are not visible to the application process so they cannot be logged by the app"
    ],
    answer: 0,
    explanation: "Kubernetes does not perform any log redaction. Once a Secret is injected as an environment variable, the application process has full access to its plaintext value. If the application logs environment variables, the secret appears in plaintext in container logs, which may be forwarded to centralized logging systems like Elasticsearch or Loki. Applications should be configured to avoid logging sensitive environment variables. Neither the kubelet nor the container runtime performs automatic redaction.\n\nWhy other options are wrong:\n- B: Kubernetes does not automatically redact Secret values from container logs\n- C: The kubelet does not intercept or modify container log output for Secret redaction\n- D: Env vars from Secrets are fully visible to the application process as regular environment variables\n\nReference: https://kubernetes.io/docs/concepts/security/secrets-good-practices/",
    verify: null
  },
  {
    id: "s02-q048",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A team wants to monitor the actual memory consumption of containers versus their configured limits to identify pods at risk of OOM killing. Which Prometheus metric pair is most relevant?",
    diagram: null,
    options: [
      "`container_memory_working_set_bytes` and `kube_pod_container_resource_limits` for memory data",
      "`node_memory_MemTotal_bytes` and `node_memory_MemFree_bytes` for node-level memory availability data",
      "`kube_pod_status_phase` and `kube_pod_container_status_restarts_total` for pod lifecycle monitoring",
      "`container_cpu_usage_seconds_total` and `container_cpu_cfs_throttled_seconds_total` for CPU metrics"
    ],
    answer: 0,
    explanation: "`container_memory_working_set_bytes` shows the actual memory being used by a container (the metric Kubernetes uses for OOM kill decisions), while `kube_pod_container_resource_limits` with the memory resource label shows the configured limit. Comparing these identifies pods approaching their limits. Node-level metrics do not show per-container data. Pod status metrics show restarts after the fact, not risk prediction. CPU metrics are irrelevant for memory monitoring.\n\nWhy other options are wrong:\n- B: Node-level memory metrics do not show per-container usage or identify which container is at risk\n- C: Pod lifecycle metrics show restarts after the fact, not predictive risk of OOM killing\n- D: CPU metrics are irrelevant for monitoring memory usage and OOM kill risk\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: null
  },

  // ── Cloud Native Application Delivery (2) ──────
  {
    id: "s02-q049",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline builds a new container image and needs to deploy it to Kubernetes with updated configuration. The team wants to ensure that both the image tag and the ConfigMap reference change atomically. What approach prevents configuration drift?",
    diagram: null,
    options: [
      "Use a Helm chart that templates both the image tag and ConfigMap name, deploying them as a single release",
      "Update the image tag with `kubectl set image` and the ConfigMap with `kubectl apply` in two separate steps",
      "Edit the running Deployment manually with `kubectl edit` to update both fields simultaneously",
      "Rely on Kubernetes eventual consistency — both changes will be applied within seconds of each other"
    ],
    answer: 0,
    explanation: "Helm releases are atomic — all resources in a chart are applied together, and if any fail, the entire release can be rolled back. Templating both the image tag and ConfigMap reference in the same chart ensures they change together. Separate `kubectl` commands create a window where the Deployment may reference the old ConfigMap with the new image or vice versa. `kubectl edit` is manual and error-prone. Eventual consistency does not guarantee atomic multi-resource updates.\n\nWhy other options are wrong:\n- B: Two separate kubectl commands create a window of inconsistency between image and config\n- C: Manual kubectl edit is error-prone and not suitable for CI/CD automation\n- D: Eventual consistency does not guarantee atomic multi-resource updates\n\nReference: https://helm.sh/docs/intro/using_helm/",
    verify: "helm list"
  },
  {
    id: "s02-q050",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team performs a canary deployment where 10% of traffic goes to the new version. The new version requires a different ConfigMap with updated feature flags. How should they manage the configuration for both versions?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="230" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Canary Deployment Scenario</text><rect x="30" y="55" width="150" height="70" rx="5" fill="#2d6a4f" stroke="#4caf50" stroke-width="1"/><text x="105" y="80" text-anchor="middle" fill="white" font-size="12">Stable (v1)</text><text x="105" y="100" text-anchor="middle" fill="#ccc" font-size="10">config = ???</text><text x="105" y="115" text-anchor="middle" fill="#ccc" font-size="10">90% traffic</text><rect x="220" y="55" width="150" height="70" rx="5" fill="#e63946" stroke="#ff6b6b" stroke-width="1"/><text x="295" y="80" text-anchor="middle" fill="white" font-size="12">Canary (v2)</text><text x="295" y="100" text-anchor="middle" fill="#ccc" font-size="10">config = ???</text><text x="295" y="115" text-anchor="middle" fill="#ccc" font-size="10">10% traffic</text><rect x="80" y="155" width="240" height="40" rx="5" fill="#16213e" stroke="#326CE5" stroke-width="1"/><text x="200" y="180" text-anchor="middle" fill="#e0e0e0" font-size="11">How should configuration be managed?</text><text x="200" y="220" text-anchor="middle" fill="#aaa" font-size="10">Each version needs different feature flags</text></svg>',
    options: [
      "Create versioned ConfigMaps (`config-v1`, `config-v2`) and have each Deployment reference its own",
      "Store both versions' config in one ConfigMap with keys prefixed by version (e.g., `v1-flags`, `v2-flags`)",
      "Use a single ConfigMap and toggle feature flags with environment variables set on each individual pod",
      "Use a single ConfigMap and rely on the application to detect its own version and load correct flags"
    ],
    answer: 0,
    explanation: "Creating separate versioned ConfigMaps ensures that each Deployment version has an independent, clearly defined configuration. This avoids the complexity of version detection logic in the application and prevents accidental configuration changes from affecting the wrong version. A single ConfigMap with version-prefixed keys adds parsing complexity. Relying on application-level version detection violates the separation of concerns principle.\n\nWhy other options are wrong:\n- B: Version-prefixed keys in one ConfigMap adds parsing complexity and risk of accidental cross-version changes\n- C: Toggling flags via env vars in a single ConfigMap creates coupling between versions\n- D: Application-level version detection violates separation of concerns between config and code\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: "kubectl get configmaps"
  },

  // ───────────────────────────────────────────────
  // BATCH 3: q051–q075
  // K8s Fundamentals=12, Container Orchestration=6,
  // Cloud Native Architecture=4, Observability=2, App Delivery=1
  // ───────────────────────────────────────────────

  // ── Kubernetes Fundamentals (12) ──────────────
  {
    id: "s02-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer wants to create a ConfigMap from multiple files in a directory. The directory contains `db.conf`, `cache.conf`, and `README.md`. They only want the `.conf` files. Which command achieves this?",
    diagram: null,
    options: [
      "`kubectl create configmap app-config --from-file=./configs/` which automatically filters non-config files",
      "`kubectl create configmap app-config --from-file=./configs/ --exclude=*.md` to skip markdown files",
      "`kubectl create configmap app-config --from-file=db.conf --from-file=cache.conf` for specific files",
      "`kubectl create configmap app-config --from-directory=./configs/ --pattern=*.conf` with glob filter"
    ],
    answer: 2,
    explanation: "To include only specific files, you must specify each file individually using multiple `--from-file` flags. Using `--from-file` with a directory path includes all files in the directory without filtering. There is no `--exclude`, `--from-directory`, or `--pattern` flag in `kubectl create configmap`. If the directory approach is used, the README.md would also be included as a key in the ConfigMap.\n\nWhy other options are wrong:\n- A: --from-file with a directory path includes all files without filtering capabilities\n- B: There is no --exclude flag in kubectl create configmap\n- D: There is no --from-directory or --pattern flag in kubectl create configmap\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_configmap/",
    verify: "kubectl create configmap app-config --from-file=db.conf --from-file=cache.conf --dry-run=client -o yaml"
  },
  {
    id: "s02-q052",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A container's `resources.limits.memory` is set to `256Mi` but no `resources.requests.memory` is specified. What memory request does Kubernetes assign?",
    diagram: null,
    options: [
      "Zero is assigned as the request and the pod becomes `BestEffort` quality of service class",
      "The request is automatically set equal to the limit: `256Mi` when only limits are specified",
      "Kubernetes defaults to half the limit for requests, so the request would be set to `128Mi`",
      "The pod creation fails because requests must be explicitly specified whenever limits are set"
    ],
    answer: 1,
    explanation: "When a container specifies a limit but no request for a resource, Kubernetes automatically sets the request equal to the limit. This means the container effectively gets `requests.memory: 256Mi` and `limits.memory: 256Mi`. The pod does not become BestEffort (it has resource specifications) and creation does not fail. Kubernetes does not use a half-of-limit default.\n\nWhy other options are wrong:\n- A: The request is not zero; it is set equal to the limit, so the pod is not BestEffort\n- C: Kubernetes does not use a half-of-limit default for requests\n- D: Pod creation does not fail; Kubernetes auto-sets requests to match limits\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: "kubectl run test --image=nginx --limits=memory=256Mi --dry-run=client -o yaml"
  },
  {
    id: "s02-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team configures a policy that rejects any pod in the `production` namespace that lacks resource limits. A pod without limits is submitted to the API server. At which stage is the pod rejected?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">API Server Request Flow</text><rect x="20" y="55" width="80" height="35" rx="5" fill="#326CE5"/><text x="60" y="77" text-anchor="middle" fill="white" font-size="10">AuthN</text><line x1="100" y1="72" x2="120" y2="72" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/><rect x="120" y="55" width="80" height="35" rx="5" fill="#326CE5"/><text x="160" y="77" text-anchor="middle" fill="white" font-size="10">AuthZ</text><line x1="200" y1="72" x2="220" y2="72" stroke="#555" stroke-width="2"/><rect x="220" y="55" width="80" height="35" rx="5" fill="#326CE5"/><text x="260" y="77" text-anchor="middle" fill="white" font-size="10">Admission</text><line x1="300" y1="72" x2="320" y2="72" stroke="#555" stroke-width="2"/><rect x="320" y="55" width="60" height="35" rx="5" fill="#326CE5"/><text x="350" y="77" text-anchor="middle" fill="white" font-size="10">etcd</text><text x="200" y="120" text-anchor="middle" fill="#aaa" font-size="11">Where is the pod rejected? (?)</text></svg>',
    options: [
      "During authentication — the API server checks resource specs before authenticating the user identity",
      "During authorization — RBAC evaluates whether the user is allowed to create pods without limits set",
      "During admission control — validating webhooks inspect the pod spec after authn and authz complete",
      "After admission and persistence — etcd rejects the pod because it detects the policy violation itself"
    ],
    answer: 2,
    explanation: "The API server processes requests in order: authentication, authorization, then admission control. Admission controllers (including webhooks, LimitRanger, and ResourceQuota) inspect and potentially modify or reject requests after they pass authentication and authorization. etcd does not enforce policies — it stores whatever the API server sends. Authentication verifies identity, and authorization checks permissions, neither of which validates resource specifications.\n\nWhy other options are wrong:\n- A: Authentication verifies identity and does not inspect resource specifications\n- B: Authorization checks permissions (RBAC) and does not validate resource spec content\n- D: etcd stores data without policy enforcement; validation happens before persistence\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
    verify: null
  },
  {
    id: "s02-q054",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team creates a ConfigMap with `kubectl create configmap feature-flags --from-literal=dark-mode=true --from-literal=beta-api=false`. They want to update the `beta-api` flag to `true` without affecting `dark-mode`. Which command achieves this?",
    diagram: null,
    options: [
      "`kubectl patch configmap feature-flags -p '{\"data\":{\"beta-api\":\"true\"}}'` to update the key",
      "`kubectl set configmap feature-flags beta-api=true` to directly set the value on the resource",
      "`kubectl update configmap feature-flags --from-literal=beta-api=true` for in-place value update",
      "`kubectl apply configmap feature-flags --key=beta-api --value=true` for targeted field changes"
    ],
    answer: 0,
    explanation: "`kubectl patch` performs a strategic merge patch on the resource, updating only the specified fields while leaving others intact. This changes `beta-api` to `true` without modifying `dark-mode`. There is no `kubectl set configmap`, `kubectl update configmap`, or `kubectl apply configmap --key` command. Alternatively, `kubectl edit configmap feature-flags` could be used for interactive editing.\n\nWhy other options are wrong:\n- B: There is no kubectl set configmap command in Kubernetes\n- C: There is no kubectl update configmap command in Kubernetes\n- D: There is no kubectl apply configmap --key command in Kubernetes\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_patch/",
    verify: "kubectl patch configmap feature-flags -p '{\"data\":{\"beta-api\":\"true\"}}' --dry-run=client"
  },
  {
    id: "s02-q055",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A LimitRange in a namespace sets `max.cpu: 2` for containers. A developer tries to create a pod with `resources.limits.cpu: 4`. What happens?",
    diagram: null,
    options: [
      "The pod is created but the CPU limit is automatically capped at 2 cores by the LimitRange enforcer",
      "The LimitRange is ignored because it only applies to memory resources, not CPU specifications",
      "The pod is created in `Pending` state until a node with 4 CPUs becomes available for scheduling",
      "Pod creation is rejected because the container CPU limit exceeds the LimitRange max of 2 cores"
    ],
    answer: 3,
    explanation: "LimitRanges enforce minimum and maximum resource constraints per container (or pod). If a container specifies a CPU limit that exceeds the `max.cpu` defined by the LimitRange, the API server rejects the pod creation. LimitRanges do not automatically adjust values to fit — they enforce strict boundaries. LimitRanges apply to both CPU and memory. The issue is policy enforcement, not scheduling.\n\nWhy other options are wrong:\n- A: LimitRanges do not auto-cap values to fit; they enforce strict boundaries and reject violations\n- B: LimitRanges apply to both CPU and memory resources, not just memory\n- C: The issue is policy enforcement at admission, not scheduling; the pod never reaches the scheduler\n\nReference: https://kubernetes.io/docs/concepts/policy/limit-range/",
    verify: "kubectl describe limitrange -n <namespace>"
  },
  {
    id: "s02-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses `binaryData` in a ConfigMap to store a small gzipped configuration archive. What format must the value be stored in?",
    diagram: null,
    options: [
      "Raw binary bytes — Kubernetes handles the encoding transparently on behalf of the user",
      "Hexadecimal string representation of the binary data with no additional encoding needed",
      "Base64-encoded string — `binaryData` fields must be base64-encoded before submission",
      "URL-encoded string using `percent-encoding` for all non-ASCII bytes in the binary content"
    ],
    answer: 2,
    explanation: "The `binaryData` field in a ConfigMap stores binary data as base64-encoded strings. This is because the Kubernetes API uses JSON/YAML serialization, which cannot represent raw binary data. When the ConfigMap is mounted as a volume, the data is automatically decoded back to its original binary form. Neither hex, URL-encoding, nor raw binary are supported formats for this field.\n\nWhy other options are wrong:\n- A: The Kubernetes API uses JSON/YAML serialization and cannot handle raw binary bytes in data fields\n- B: Hexadecimal encoding is not a supported format for binaryData fields\n- D: URL percent-encoding is not a supported format for binaryData fields\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#configmap-object",
    verify: "kubectl explain configmap.binaryData"
  },
  {
    id: "s02-q057",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A DaemonSet needs to run a monitoring agent on every node. The agent requires at least 100m CPU and 64Mi memory to function. If no resource requests are specified, what risk does this create?",
    diagram: null,
    options: [
      "The DaemonSet controller will refuse to create any pods without explicit resource specifications in the spec",
      "Kubernetes automatically assigns default resources to DaemonSet pods based on the node's total capacity",
      "The agent pods could be scheduled on nodes with insufficient resources and get OOM-killed or CPU-starved",
      "Without resource requests the pods run with host-level privileges and gain unlimited resource access rights"
    ],
    answer: 2,
    explanation: "Without resource requests, the scheduler treats the pods as requesting 0 resources, allowing them to be placed on any node regardless of available capacity. The pods will receive `BestEffort` QoS and are first in line for eviction under pressure. They may also be starved of CPU or OOM-killed if the node runs low on memory. The DaemonSet controller does not enforce resource specifications. Kubernetes does not auto-assign defaults unless a LimitRange is present. No host privileges are granted by omitting resources.\n\nWhy other options are wrong:\n- A: The DaemonSet controller does not require or enforce resource specifications on pods\n- B: Kubernetes does not auto-assign defaults unless a LimitRange exists in the namespace\n- D: Omitting resource requests does not grant host-level privileges; those require securityContext settings\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/",
    verify: "kubectl describe daemonset <name> | grep -A5 'Resources'"
  },
  {
    id: "s02-q058",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod injects the name of the Service it belongs to as an environment variable using the Downward API. The developer tries `fieldRef: {fieldPath: metadata.labels['app.kubernetes.io/name']}`. What does this expose?",
    diagram: null,
    options: [
      "The name of the Kubernetes Service object that is associated with and routes traffic to this pod",
      "This is invalid — `fieldRef` does not support label selectors using bracket notation in fieldPath",
      "The pod's hostname as derived from the Service DNS entry registered in the cluster's CoreDNS",
      "The value of the `app.kubernetes.io/name` label that is set on the pod itself at creation"
    ],
    answer: 3,
    explanation: "The Downward API `metadata.labels['key']` syntax exposes the value of a specific label on the pod. If the pod has the label `app.kubernetes.io/name: my-service`, the environment variable will contain `my-service`. This is the pod's own label, not a Service object's name. The syntax is valid — the Downward API supports both `metadata.labels` and `metadata.annotations` with bracket notation for specific keys.\n\nWhy other options are wrong:\n- A: The Downward API exposes the pod's own label value, not the name of a Service object\n- B: The syntax is valid; the Downward API supports metadata.labels['key'] bracket notation\n- C: The value is the label string, not a hostname derived from DNS\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/",
    verify: "kubectl explain pod.spec.containers.env.valueFrom.fieldRef"
  },
  {
    id: "s02-q059",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod with no resource requests or limits is running on a node. The node comes under memory pressure. In which order does Kubernetes evict pods?",
    diagram: null,
    options: [
      "Pods are evicted alphabetically by name to ensure deterministic and repeatable behavior on every node",
      "Pods are evicted randomly — there is no guaranteed or deterministic order during node pressure events",
      "`BestEffort` pods are evicted first, then `Burstable` exceeding requests, then `Guaranteed` pods",
      "`Guaranteed` pods are evicted first because they consume the most predictable and reserved resources"
    ],
    answer: 2,
    explanation: "The kubelet's eviction manager uses QoS class as a primary factor. `BestEffort` pods (no requests or limits) are evicted first. Then `Burstable` pods that are using more than their requests. `Guaranteed` pods are evicted last and only if system daemons need more resources. Within the same QoS class, pods using more resources relative to their requests are evicted first. Eviction is not random or alphabetical.\n\nWhy other options are wrong:\n- A: Pod eviction is not alphabetical; QoS class and resource usage determine the order\n- B: Eviction follows a deterministic priority based on QoS class, not random selection\n- D: Guaranteed pods are evicted last, not first; they consume the most reserved resources\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
    verify: null
  },
  {
    id: "s02-q060",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses `kubectl create configmap` with `--from-env-file=app.env` where the file contains `DB_HOST=postgres\\nDB_PORT=5432`. How are the keys stored differently compared to `--from-file=app.env`?",
    diagram: null,
    options: [
      "There is no difference — both flags produce the same ConfigMap structure with identical keys and values in output",
      "`--from-env-file` creates one key per line (e.g., `DB_HOST`); `--from-file` stores the whole file as one key",
      "`--from-env-file` only supports `.env` file extensions while `--from-file` supports any arbitrary file extension",
      "`--from-env-file` encrypts the values before storing them while `--from-file` stores them in plaintext as given"
    ],
    answer: 1,
    explanation: "The `--from-env-file` flag parses the file as environment variable definitions (key=value pairs, one per line) and creates separate ConfigMap keys for each line. The `--from-file` flag stores the entire file content as a single value under a key named after the filename. Both support any file extension, neither encrypts data, and they produce structurally different ConfigMaps.\n\nWhy other options are wrong:\n- A: The two flags produce structurally different ConfigMaps with different key structures\n- C: Both flags support any file extension; --from-env-file is not restricted to .env files\n- D: Neither flag encrypts data; both store values in plaintext in the ConfigMap\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_configmap/",
    verify: "kubectl create configmap test --from-env-file=app.env --dry-run=client -o yaml"
  },
  {
    id: "s02-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The kube-controller-manager runs the ResourceQuota controller. What happens if the kube-controller-manager is temporarily unavailable?",
    diagram: null,
    options: [
      "All ResourceQuotas are immediately removed from the cluster and pods can be created without any limits",
      "The scheduler takes over ResourceQuota enforcement as a fallback mechanism until recovery completes",
      "All pod creation is blocked across the entire cluster until the controller manager fully recovers",
      "The API server still enforces quotas via admission control, but quota usage tracking may go stale"
    ],
    answer: 3,
    explanation: "ResourceQuota enforcement happens at two levels: the ResourceQuota admission controller (in the API server) blocks requests that would exceed the quota, and the ResourceQuota controller (in the controller manager) tracks actual usage. If the controller manager is down, the admission controller still enforces based on its last known usage data, but the usage tracking may become inaccurate. Quotas are not removed, pod creation is not globally blocked, and the scheduler does not handle quota enforcement.\n\nWhy other options are wrong:\n- A: ResourceQuotas are API objects stored in etcd; they are not removed when the controller manager is down\n- B: The scheduler does not take over quota enforcement; the API server admission controller handles it\n- C: Pod creation is not globally blocked; the API server admission controller continues enforcing quotas\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    verify: null
  },
  {
    id: "s02-q062",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A node has 4 CPU cores allocatable. Three pods are running with requests of 1 CPU, 1.5 CPU, and 0.5 CPU respectively. A new pod requests 1.5 CPU. Can it be scheduled on this node?",
    diagram: null,
    options: [
      "No — the total requested would be 4.5 CPU, exceeding the 4 CPU allocatable capacity on this node",
      "Yes — the scheduler looks at actual usage, not requests, and the node likely has spare CPU available",
      "Yes — CPU is compressible, so the scheduler ignores CPU requests when making scheduling decisions",
      "It depends on whether the existing pods have CPU limits set in addition to their resource requests"
    ],
    answer: 0,
    explanation: "The scheduler uses resource requests, not actual usage or limits, to determine if a pod fits on a node. Current requests total 3 CPU (1 + 1.5 + 0.5), and adding 1.5 would require 4.5 CPU, exceeding the 4 CPU allocatable. The scheduler will not place the pod on this node. While CPU is compressible at runtime, the scheduler still uses requests for placement decisions. Limits do not affect scheduling — only requests matter.\n\nWhy other options are wrong:\n- B: The scheduler uses requests, not actual usage, for placement decisions\n- C: While CPU is compressible at runtime, the scheduler still uses CPU requests for scheduling\n- D: CPU limits do not affect scheduling decisions; only requests matter for node placement\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-requests-are-scheduled",
    verify: "kubectl describe node <node-name> | grep -A5 'Allocated resources'"
  },

  // ── Container Orchestration (6) ────────────────
  {
    id: "s02-q063",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A container runs as a non-root user (UID 1000) and mounts a Secret volume. The files in the mount are owned by root with mode `0600`. The application cannot read the files. What is the fix?",
    diagram: null,
    options: [
      "Set `runAsUser: 0` in the securityContext so the container runs as root and matches file ownership",
      "Use `defaultMode: 0444` on the Secret volume to make files world-readable, or set `fsGroup` in securityContext",
      "Secrets mounted in non-root containers require a ServiceAccount with elevated RBAC permissions to read",
      "Add `privileged: true` to the container securityContext to inherit the host filesystem permission model"
    ],
    answer: 1,
    explanation: "Setting `defaultMode: 0444` makes the files readable by all users. Alternatively, setting `fsGroup` in the pod's `securityContext` changes the group ownership of volume files to the specified GID, allowing the non-root user to read them. Running as root or privileged mode is unnecessary and violates security best practices. Secrets can absolutely be mounted into non-root containers — the permissions just need to be configured correctly.\n\nWhy other options are wrong:\n- A: Running as root is unnecessary and violates security best practices when permission fixes exist\n- C: RBAC and ServiceAccounts control API access, not filesystem permissions inside a container\n- D: Privileged mode grants full host access and is far more than needed for a file permission issue\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#secret",
    verify: "kubectl explain pod.spec.securityContext.fsGroup"
  },
  {
    id: "s02-q064",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A team wants to pass a Kubernetes Secret value to a container's entrypoint command as an argument. They try using `$(SECRET_VAR)` in the `args` field. The Secret is injected as environment variable `SECRET_VAR`. Does this work?",
    diagram: null,
    options: [
      "No — `args` does not support variable substitution; the `command` field is the supported location in pod specs",
      "No — variable substitution in `args` only works with ConfigMap values, not with Secret-sourced values",
      "Yes — Kubernetes performs `$(VAR_NAME)` substitution in both `command` and `args` using env vars",
      "Yes — but the `enableServiceLinks` field must be explicitly set to `true` on the pod specification"
    ],
    answer: 2,
    explanation: "Kubernetes supports `$(VAR_NAME)` variable substitution in both the `command` and `args` fields of a container spec. The substitution uses environment variables defined for that container, regardless of whether they come from ConfigMaps, Secrets, or literal values. This is a Kubernetes-level substitution performed before the container starts, not a shell expansion. `enableServiceLinks` controls service-related environment variables and is unrelated to this feature.\n\nWhy other options are wrong:\n- A: Both command and args support $(VAR_NAME) substitution, not just command\n- B: Variable substitution works with env vars from any source including Secrets, not just ConfigMaps\n- D: enableServiceLinks controls service-related env vars and is unrelated to $(VAR_NAME) substitution\n\nReference: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#use-environment-variables-to-define-arguments",
    verify: "kubectl explain pod.spec.containers.args"
  },
  {
    id: "s02-q065",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod fails to start with the error: `Error: couldn't find key username in ConfigMap default/app-config`. The ConfigMap `app-config` exists in the `default` namespace. What is the most likely cause?",
    diagram: null,
    options: [
      "The ConfigMap is immutable and new keys like `username` cannot be added after the initial creation",
      "The pod and ConfigMap are in different namespaces despite both appearing to be in `default` namespace",
      "The ConfigMap was created with `--from-file` so the key is the filename, not `username` as expected",
      "ConfigMaps created with `kubectl apply` do not support direct key references from pod specifications"
    ],
    answer: 2,
    explanation: "When a ConfigMap is created with `--from-file`, the key is the filename (e.g., `credentials.txt`), not the content within the file. The pod spec references key `username`, but the actual key in the ConfigMap might be something like `credentials.txt`. The fix is to either create the ConfigMap with the correct key name using `--from-literal=username=value` or `--from-file=username=path-to-file`. Immutability prevents modifications, not key references. `kubectl apply` works the same as other creation methods for key references.\n\nWhy other options are wrong:\n- A: Immutability prevents modifications after creation but does not affect key references from pods\n- B: The error message explicitly states the ConfigMap is in the default namespace\n- D: kubectl apply creates ConfigMaps that support key references identically to other creation methods\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: "kubectl get configmap app-config -o yaml"
  },
  {
    id: "s02-q066",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A pod uses a projected volume to combine a ConfigMap and a Secret into the same directory at `/etc/combined`. Both the ConfigMap and Secret have a key called `config.yaml`. What happens?",
    diagram: null,
    options: [
      "The pod fails to start because duplicate keys are not allowed in projected volume source definitions",
      "Both files are created with automatic suffixes: `config.yaml.configmap` and `config.yaml.secret`",
      "The last source in the projected volume `sources` list wins; its `config.yaml` overwrites the other",
      "Kubernetes automatically merges the contents of both `config.yaml` files into a single combined file"
    ],
    answer: 2,
    explanation: "When multiple sources in a projected volume define the same key (filename), the last source listed in the `sources` array takes precedence. The file at `/etc/combined/config.yaml` will contain the data from whichever source is listed last. Kubernetes does not fail, add suffixes, or merge file contents. This behavior is documented and is important to be aware of when combining multiple sources.\n\nWhy other options are wrong:\n- A: Duplicate keys in projected volumes do not cause pod startup failure\n- B: Kubernetes does not add automatic suffixes like .configmap or .secret to filenames\n- D: Kubernetes does not merge file contents from multiple sources into a single file\n\nReference: https://kubernetes.io/docs/concepts/storage/projected-volumes/",
    verify: null
  },
  {
    id: "s02-q067",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A microservice uses the Downward API to expose its resource limits as environment variables. The developer sets `resourceFieldRef: {resource: limits.memory, divisor: 1Mi}`. What value will the environment variable contain if the limit is `512Mi`?",
    diagram: null,
    options: [
      "`0.5Gi` — the value converted to the largest convenient unit",
      "`536870912` — the value in bytes regardless of the divisor",
      "`512Mi` — the value with the original unit suffix preserved",
      "`512` — the value in the unit specified by the divisor"
    ],
    answer: 3,
    explanation: "The `divisor` field in `resourceFieldRef` divides the resource value to produce the output. With a limit of `512Mi` and a divisor of `1Mi`, the result is `512` (a plain number). This is useful for applications that expect numeric values without unit suffixes. Without a divisor (or divisor of 1), the value would be in bytes (536870912). The divisor does not preserve unit suffixes or convert to other units.\n\nWhy other options are wrong:\n- A: The divisor produces a plain number, not a converted unit like 0.5Gi\n- B: With a divisor of 1Mi, the value is divided accordingly, not returned in raw bytes\n- C: The divisor strips the unit suffix and returns a plain numeric value\n\nReference: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/#use-container-fields-as-values-for-environment-variables",
    verify: "kubectl explain pod.spec.containers.env.valueFrom.resourceFieldRef.divisor"
  },
  {
    id: "s02-q068",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "An application needs to authenticate to a container registry to pull a private image. The team stores registry credentials in a Kubernetes Secret. What Secret type and pod field are used?",
    diagram: null,
    options: [
      "Secret type `kubernetes.io/tls` referenced in the pod's `imagePullSecrets` field for registry authentication",
      "Secret type `kubernetes.io/dockerconfigjson` referenced in the pod's `imagePullSecrets` field at spec level",
      "Secret type `Opaque` referenced in the pod's `volumes` field with a mount at `/root/.docker/config.json` path",
      "Secret type `kubernetes.io/basic-auth` referenced in the pod's `serviceAccountName` field for authentication"
    ],
    answer: 1,
    explanation: "Docker registry credentials are stored in Secrets of type `kubernetes.io/dockerconfigjson`, which contains a `.dockerconfigjson` key with the registry authentication data. This Secret is referenced in the pod's `imagePullSecrets` field. The `kubernetes.io/tls` type is for TLS certificates. While you could mount an Opaque Secret, the kubelet specifically uses `imagePullSecrets` for image pulling. `basic-auth` Secrets are for basic authentication, not registry access.\n\nWhy other options are wrong:\n- A: kubernetes.io/tls is for TLS certificates, not container registry authentication\n- C: While an Opaque Secret could hold docker config, imagePullSecrets expects dockerconfigjson type\n- D: basic-auth is for basic authentication and serviceAccountName references a ServiceAccount, not a Secret\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets",
    verify: "kubectl create secret docker-registry --help"
  },

  // ── Cloud Native Architecture (4) ─────────────
  {
    id: "s02-q069",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team follows the principle of \"configuration as code\" and stores all ConfigMaps and Secrets manifests in version control. A new developer asks why they use separate ConfigMaps per environment instead of if/else logic in the application. What is the cloud-native rationale?",
    diagram: null,
    options: [
      "Kubernetes does not support conditional logic inside ConfigMaps so if/else is not valid for configuration management at all",
      "Externalizing config separates concerns: app logic stays environment-agnostic while config is managed independently",
      "Using if/else logic in the application would require a full code review for every single environment configuration change",
      "ConfigMaps per environment use less cluster memory and etcd storage than a single ConfigMap with embedded conditionals"
    ],
    answer: 1,
    explanation: "The cloud-native approach of externalizing configuration follows separation of concerns. The application code handles business logic while configuration is managed by the platform. This means the same container image runs in all environments — only the configuration changes. While code reviews (option C) are a secondary benefit, the primary rationale is architectural separation. ConfigMaps do not support conditional logic (option A is true but not the rationale). Memory usage is negligible either way.\n\nWhy other options are wrong:\n- A: While ConfigMaps do not support conditional logic, that is not the primary cloud-native rationale\n- C: Code reviews are a secondary benefit, not the primary architectural rationale for config externalization\n- D: Memory and etcd storage differences between approaches are negligible and not the design motivation\n\nReference: https://12factor.net/config",
    verify: null
  },
  {
    id: "s02-q070",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices platform uses a service mesh (Istio). Configuration for sidecar proxies is managed automatically by the mesh control plane. A developer asks if they still need Kubernetes ConfigMaps for their application configuration. What is the correct answer?",
    diagram: null,
    options: [
      "Yes — the mesh handles network config (routing, mTLS, retries) but app config (DB URLs, flags) still needs ConfigMaps",
      "No — the service mesh manages all configuration including application-specific settings like database URLs and feature flags",
      "No — Istio's VirtualService resources replace ConfigMaps for all configuration needs across every service in the mesh",
      "Yes — but only for services that do not have an Envoy sidecar proxy injected by the Istio control plane component"
    ],
    answer: 0,
    explanation: "Service meshes like Istio manage infrastructure-level concerns: traffic routing, mutual TLS, retries, circuit breaking, and observability. They do not manage application-specific configuration such as database connection strings, feature flags, or business logic parameters. ConfigMaps and Secrets remain necessary for application configuration regardless of whether a service mesh is deployed. VirtualServices define routing rules, not application config.\n\nWhy other options are wrong:\n- B: Service meshes manage infrastructure concerns (routing, mTLS), not app-specific config like DB URLs\n- C: VirtualServices define traffic routing rules and do not replace application configuration\n- D: ConfigMaps are needed for all services regardless of sidecar injection status\n\nReference: https://istio.io/latest/docs/concepts/what-is-istio/",
    verify: null
  },
  {
    id: "s02-q071",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team needs to replicate Kubernetes Secrets from one cluster to another for a multi-cluster deployment. Which approach aligns with the CNCF ecosystem?",
    diagram: null,
    options: [
      "Use an external secrets operator that syncs from a shared store (e.g., Vault) into each cluster independently",
      "Manually export Secrets with `kubectl get secret -o yaml` and apply them to the other target cluster",
      "Configure etcd replication between clusters so Secrets are automatically shared across all nodes",
      "Store Secrets in a shared NFS volume that is mounted by both clusters for synchronized access"
    ],
    answer: 0,
    explanation: "Using an external secrets operator with a shared external store (like HashiCorp Vault or a cloud provider's secret manager) is the CNCF-aligned approach. Each cluster's operator independently syncs secrets from the central store, ensuring consistency without direct cluster-to-cluster coupling. Manual export is error-prone and not scalable. etcd replication between clusters is not a supported pattern. NFS for secrets is insecure and impractical.\n\nWhy other options are wrong:\n- B: Manual kubectl export/apply is error-prone, not scalable, and risks Secret exposure\n- C: etcd replication between clusters is not a supported or recommended Kubernetes pattern\n- D: NFS for Secrets is insecure and introduces a single point of failure\n\nReference: https://external-secrets.io/",
    verify: null
  },
  {
    id: "s02-q072",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A serverless function running on Knative needs to process messages from a Kafka topic. The Kafka broker credentials (username and password) are stored in a Kubernetes Secret. How should the function access these credentials?",
    diagram: null,
    options: [
      "The Knative Eventing system automatically injects credentials for all configured event sources by default",
      "Store credentials in the Kafka topic metadata where the Knative eventing system reads them on connect",
      "Hard-code the credentials in the Knative Service YAML as environment variable literals in the spec",
      "Reference the Secret in the KafkaSource CR, which passes credentials to the event source connector"
    ],
    answer: 3,
    explanation: "Knative Eventing's KafkaSource custom resource supports referencing Kubernetes Secrets for authentication credentials. The KafkaSource component uses these credentials to connect to the Kafka broker and forward events to the Knative Service. Knative does not automatically inject credentials. Hard-coding credentials violates security practices. Kafka topic metadata does not store consumer credentials.\n\nWhy other options are wrong:\n- A: Knative Eventing does not automatically inject credentials; they must be explicitly configured\n- B: Kafka topic metadata does not store consumer authentication credentials\n- C: Hard-coding credentials violates security best practices and separation of concerns\n\nReference: https://knative.dev/docs/eventing/sources/kafka-source/",
    verify: null
  },

  // ── Cloud Native Observability (2) ─────────────
  {
    id: "s02-q073",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "An application propagates trace context headers through microservices. The tracing configuration (collector endpoint, sampling rate) is stored in a ConfigMap. A trace shows high latency in one service. The team increases the sampling rate by updating the ConfigMap. The ConfigMap is volume-mounted. What must the application support for this change to take effect without restart?",
    diagram: null,
    options: [
      "Nothing extra is needed — the tracing SDK automatically detects file changes and reloads its configuration",
      "The app must watch the mounted file for changes and reinitialize the tracing provider when it updates",
      "The kubelet must be restarted on the node to propagate ConfigMap changes to the volume mount inside",
      "The tracing collector must be restarted — application-side configuration changes are entirely irrelevant"
    ],
    answer: 1,
    explanation: "While Kubernetes automatically updates volume-mounted ConfigMaps (without subPath), the application must implement file-watching logic to detect changes and reconfigure itself. Most tracing SDKs do not automatically reload configuration from files. The kubelet does not need to be restarted — it periodically syncs ConfigMap data to volumes. The tracing collector endpoint may be separate, but the sampling rate is an application-side configuration.\n\nWhy other options are wrong:\n- A: Most tracing SDKs do not automatically detect and reload configuration from files\n- C: The kubelet does not need to be restarted; it periodically syncs ConfigMap data to volumes\n- D: Sampling rate is an application-side setting; restarting only the collector does not change it\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: null
  },
  {
    id: "s02-q074",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform team wants to set up alerts for pods that are repeatedly being OOM-killed. They suspect some containers have memory limits set too low. Which combination of metrics and Kubernetes resource information is most useful?",
    diagram: null,
    options: [
      "`kube_pod_container_status_restarts_total` with `kube_pod_container_status_last_terminated_reason` for OOMKilled, plus `kube_pod_container_resource_limits` for memory",
      "`node_memory_MemAvailable_bytes` and `node_cpu_seconds_total` to track overall node health, capacity, and resource saturation levels across the cluster",
      "`container_network_receive_bytes_total` and `container_network_transmit_bytes_total` for pod-level network throughput analysis and bandwidth consumption tracking",
      "`kube_deployment_spec_replicas` and `kube_deployment_status_replicas_available` for deployment-level replica availability and desired state reconciliation tracking"
    ],
    answer: 0,
    explanation: "To identify OOM-killed containers, `kube_pod_container_status_restarts_total` tracks restart counts, and `kube_pod_container_status_last_terminated_reason` can filter for `OOMKilled`. Combining this with `kube_pod_container_resource_limits{resource=\"memory\"}` shows which containers have low limits relative to their needs. Node-level metrics do not identify specific containers. Network and replica metrics are unrelated to memory issues.\n\nWhy other options are wrong:\n- B: Node-level memory and CPU metrics do not identify specific containers being OOM-killed\n- C: Network traffic metrics are unrelated to memory OOM issues\n- D: Deployment replica metrics track availability, not memory-related container terminations\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: null
  },

  // ── Cloud Native Application Delivery (1) ──────
  {
    id: "s02-q075",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart uses the template function `{{ .Values.database.password | b64enc }}` to base64-encode a database password before placing it in a Secret manifest. A security engineer points out a risk. What is it?",
    diagram: null,
    options: [
      "The `b64enc` function uses weak encoding that can be easily broken by modern decoding tools and scripts",
      "The plaintext password is stored in the Helm release secret, which contains rendered manifests and values",
      "Helm templates cannot access `.Values` inside Secret manifests due to template rendering restrictions",
      "Base64 encoding in templates causes Helm to double-encode the value when creating the Kubernetes Secret"
    ],
    answer: 1,
    explanation: "Helm stores release information (including rendered manifests and user-supplied values) as Secrets in the cluster. This means the plaintext password from `values.yaml` is stored in the Helm release Secret, even though it is base64-encoded in the rendered Secret manifest. This is a known security consideration. `b64enc` is standard base64, not weak encoding. Helm templates can access `.Values` anywhere. Kubernetes does not double-encode values that are already base64-encoded in the manifest.\n\nWhy other options are wrong:\n- A: b64enc is standard base64 encoding, not a weak or breakable cipher; the risk is elsewhere\n- C: Helm templates can access .Values anywhere, including inside Secret manifest templates\n- D: Kubernetes does not double-encode values that are already base64-encoded in the YAML manifest\n\nReference: https://helm.sh/docs/chart_best_practices/secrets/",
    verify: "helm get values <release-name>"
  },

  // ───────────────────────────────────────────────
  // BATCH 4: q076–q100
  // K8s Fundamentals=11, Container Orchestration=5,
  // Cloud Native Architecture=4, Observability=2, App Delivery=3
  // ───────────────────────────────────────────────

  // ── Kubernetes Fundamentals (11) ──────────────
  {
    id: "s02-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team wants to use a single ConfigMap to provide different configuration files to different containers in the same pod. Container A needs `app-a.conf` and container B needs `app-b.conf`. Both files are keys in the same ConfigMap. How should the volumes and mounts be configured?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="230" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Selective ConfigMap Mounting</text><rect x="130" y="50" width="140" height="40" rx="5" fill="#326CE5"/><text x="200" y="75" text-anchor="middle" fill="white" font-size="12">ConfigMap: app-config</text><line x1="160" y1="90" x2="90" y2="130" stroke="#555" stroke-width="1"/><line x1="240" y1="90" x2="310" y2="130" stroke="#555" stroke-width="1"/><rect x="30" y="130" width="130" height="50" rx="5" fill="#2d6a4f"/><text x="95" y="150" text-anchor="middle" fill="white" font-size="11">Container A</text><text x="95" y="168" text-anchor="middle" fill="#ccc" font-size="10">needs app-a.conf</text><rect x="240" y="130" width="130" height="50" rx="5" fill="#2d6a4f"/><text x="305" y="150" text-anchor="middle" fill="white" font-size="11">Container B</text><text x="305" y="168" text-anchor="middle" fill="#ccc" font-size="10">needs app-b.conf</text><text x="200" y="215" text-anchor="middle" fill="#aaa" font-size="10">How can each container receive only its own config file?</text></svg>',
    options: [
      "Define one volume with the full ConfigMap and mount it in both containers; each reads only its own file from the directory",
      "Use `subPath` in the ConfigMap definition to split the ConfigMap into per-container sections based on container name",
      "Define two volumes from the same ConfigMap, each using `items` to select the needed key, then mount respectively",
      "Create two separate ConfigMaps because a single ConfigMap cannot be mounted selectively in different containers"
    ],
    answer: 2,
    explanation: "You can define multiple volumes referencing the same ConfigMap, each using the `items` field to select specific keys. Volume A selects `app-a.conf` and volume B selects `app-b.conf`. Each volume is then mounted in the appropriate container. `subPath` is a volume mount property, not a ConfigMap property. A single ConfigMap can absolutely be used selectively. Mounting the full ConfigMap in both containers would expose unnecessary files.\n\nWhy other options are wrong:\n- A: Mounting the full ConfigMap in both containers exposes unnecessary files to each container\n- B: subPath is a volumeMount property, not a ConfigMap-level property for splitting by container\n- D: A single ConfigMap can be mounted selectively using the items field on the volume definition\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#configmap",
    verify: "kubectl explain pod.spec.volumes.configMap.items"
  },
  {
    id: "s02-q077",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A container has `resources.requests.cpu: 100m`. In practical terms, what does `100m` mean for CPU scheduling?",
    diagram: null,
    options: [
      "100 megabytes of CPU cache memory available to the container for processing workloads",
      "100 millicores, equivalent to 10% of one CPU core's total available processing time",
      "100 minutes of CPU time allocated to the container per hour of scheduled runtime",
      "100 millihertz, meaning the container's CPU runs at 100 cycles per second of clock"
    ],
    answer: 1,
    explanation: "In Kubernetes, CPU is measured in millicores (m). `100m` means 100 millicores, which is 0.1 of a CPU core, or 10% of one core's time. This is implemented using Linux CFS (Completely Fair Scheduler) bandwidth control. It does not refer to cache size, time allocation in minutes, or clock frequency. `1000m` equals 1 full CPU core.\n\nWhy other options are wrong:\n- A: The m suffix means millicores, not megabytes of CPU cache memory\n- C: CPU is measured in core fractions, not time allocation in minutes per hour\n- D: Millihertz is not a Kubernetes CPU unit; m stands for millicores\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu",
    verify: null
  },
  {
    id: "s02-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An operator wants to verify that a ConfigMap change was successfully picked up by a volume-mounted pod (not using subPath). The ConfigMap was updated 5 minutes ago. Which verification approach is correct?",
    diagram: null,
    options: [
      "`kubectl describe configmap <name>` to compare the update timestamp with the pod creation time",
      "`kubectl logs <pod>` to verify whether the application logged the new configuration values at load",
      "`kubectl exec <pod> -- cat /path/to/file` to check if the mounted file reflects the updated data",
      "`kubectl get events` to find a ConfigMapUpdated event associated with the pod in the namespace"
    ],
    answer: 2,
    explanation: "Executing `cat` on the mounted file directly confirms whether the kubelet has propagated the ConfigMap update to the volume. The kubelet syncs ConfigMap updates to mounted volumes periodically (typically within the sync period plus cache propagation delay). Application logs depend on the application's behavior. ConfigMap timestamps do not relate to pod-level propagation. There is no `ConfigMapUpdated` event type in Kubernetes.\n\nWhy other options are wrong:\n- A: ConfigMap timestamps show when the CM was updated, not when the pod received the change\n- B: Application logs depend on the app's behavior and may not show config changes\n- D: There is no ConfigMapUpdated event type in Kubernetes\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/#mounted-configmaps-are-updated-automatically",
    verify: "kubectl exec <pod-name> -- cat /path/to/config"
  },
  {
    id: "s02-q079",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A ResourceQuota in a namespace limits `count/configmaps: 10`. The namespace already has 9 ConfigMaps. A Helm install attempts to create 3 ConfigMaps as part of a release. What happens?",
    diagram: null,
    options: [
      "All 3 ConfigMaps are created because Helm releases are exempt from ResourceQuota enforcement",
      "Only 1 ConfigMap is created and the remaining 2 are queued until additional quota is freed",
      "The Helm install fails because ConfigMap creations are rejected by the quota admission controller",
      "The ResourceQuota automatically increases its count limit to accommodate the new Helm release"
    ],
    answer: 2,
    explanation: "ResourceQuotas enforce object count limits strictly. With 9 existing ConfigMaps and a limit of 10, only 1 more can be created. When Helm tries to create 3, the second or third creation will be rejected by the admission controller, causing the Helm install to fail. Helm releases are not exempt from quotas. Objects are not queued — they are immediately rejected. ResourceQuotas do not auto-increase.\n\nWhy other options are wrong:\n- A: Helm releases are not exempt from ResourceQuota enforcement; quotas apply to all API requests\n- B: Objects are not queued; creation requests are immediately rejected by the admission controller\n- D: ResourceQuotas do not auto-increase their limits to accommodate new resources\n\nReference: https://kubernetes.io/docs/concepts/policy/resource-quotas/#object-count-quota",
    verify: "kubectl describe resourcequota -n <namespace>"
  },
  {
    id: "s02-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod uses the Downward API to expose its namespace as an environment variable with `fieldRef: {fieldPath: metadata.namespace}`. The team then constructs a full Service DNS name within the application. What is the standard DNS format for a Service in Kubernetes?",
    diagram: null,
    options: [
      "`<service-name>.<namespace>.svc.cluster.local` is the fully qualified DNS format",
      "`<namespace>.<service-name>.kubernetes.local` following namespace-first DNS convention",
      "`<service-name>.default.svc.internal` using the internal DNS resolution subdomain",
      "`svc.<namespace>.<service-name>.cluster.local` with the svc prefix leading the name"
    ],
    answer: 0,
    explanation: "The standard DNS format for a Kubernetes Service is `<service-name>.<namespace>.svc.cluster.local`. This is resolved by the cluster DNS (CoreDNS). By exposing the namespace via the Downward API, the application can dynamically construct these DNS names. The order is service name first, then namespace, then `svc`, then the cluster domain (typically `cluster.local`).\n\nWhy other options are wrong:\n- B: The DNS format is service-first, not namespace-first; kubernetes.local is not the domain\n- C: The domain is cluster.local, not internal; and default is a namespace name, not a fixed component\n- D: svc does not lead the DNS name; the order is service.namespace.svc.cluster.local\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl exec <pod> -- nslookup <service-name>"
  },
  {
    id: "s02-q081",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team has a ConfigMap containing a JSON configuration file. They want to update a single JSON field without replacing the entire file. Can they use `kubectl patch` for this?",
    diagram: null,
    options: [
      "Yes — `kubectl patch` can target individual fields within a ConfigMap data value using JSON path expression syntax",
      "No — ConfigMap data values are immutable after creation and can only be replaced by deleting and recreating them",
      "Yes — but only if the ConfigMap was originally created with the `--structured-data` flag to enable nested patching",
      "No — `kubectl patch` operates on Kubernetes fields, not data value contents; the entire value must be replaced"
    ],
    answer: 3,
    explanation: "`kubectl patch` modifies the Kubernetes resource's fields (like `data.config-key`), but treats each data value as an opaque string. It cannot parse and modify individual fields within a JSON string stored as a ConfigMap value. To update a single JSON field, you must read the value, modify the JSON, and replace the entire data key. ConfigMap values are not immutable by default, and there is no `--structured-data` flag.\n\nWhy other options are wrong:\n- A: kubectl patch modifies Kubernetes resource fields but cannot parse JSON values stored as strings\n- B: ConfigMap data values are not immutable by default; they can be modified through API operations\n- C: There is no --structured-data flag in kubectl create configmap\n\nReference: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_patch/",
    verify: null
  },
  {
    id: "s02-q082",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A team wants to understand which component enforces LimitRange defaults on pods that do not specify resource values. Where does this enforcement happen?",
    diagram: null,
    options: [
      "The kube-scheduler checks LimitRanges during pod scheduling and injects default resource values",
      "The kubelet on the target node applies default resource values when starting the container runtime",
      "The LimitRanger admission controller in the API server mutates the pod spec during creation time",
      "The kube-controller-manager monitors pods and patches them with default values after pod creation"
    ],
    answer: 2,
    explanation: "The LimitRanger admission controller runs in the kube-apiserver and mutates incoming pod creation requests. When a pod does not specify resource values but a LimitRange exists in the namespace with defaults, the LimitRanger injects those defaults into the pod spec before it is persisted. This happens before scheduling, not during or after. The kubelet does not modify pod specs, and the controller manager does not patch pods with resource defaults.\n\nWhy other options are wrong:\n- A: The scheduler does not check LimitRanges; it schedules pods based on resource requests already set\n- B: The kubelet runs containers but does not modify pod specs or apply LimitRange defaults\n- D: The controller manager does not patch pods with default values; this is an admission controller function\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#limitranger",
    verify: "kubectl get pods <pod-name> -o yaml | grep -A3 resources"
  },
  {
    id: "s02-q083",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A container exceeds its memory limit by allocating more memory than `resources.limits.memory` allows. What is the immediate consequence?",
    diagram: null,
    options: [
      "The container is throttled and its memory allocations are slowed down until usage drops below the configured `limits.memory`",
      "The excess memory allocation silently fails and returns `null` to the application without killing the container process",
      "The container continues running but Kubernetes logs a warning and triggers an alert to the cluster administrator",
      "The container process is killed by the OOM killer, and the pod's `restartPolicy` determines if it gets restarted"
    ],
    answer: 3,
    explanation: "Memory is an incompressible resource. Unlike CPU (which can be throttled), memory cannot be reclaimed from a running process without killing it. When a container exceeds its memory limit, the Linux OOM killer terminates the container's process. Kubernetes then applies the pod's `restartPolicy` (Always, OnFailure, or Never) to determine if the container should be restarted. The container is not throttled, warned, or silently limited.\n\nWhy other options are wrong:\n- A: Memory is incompressible and cannot be throttled like CPU; exceeding limits results in killing\n- B: Memory allocations do not silently fail; the process is terminated by the OOM killer\n- C: There is no warning-only mode for memory limit violations; the consequence is immediate termination\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: "kubectl describe pod <pod-name> | grep -A3 'Last State'"
  },
  {
    id: "s02-q084",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer creates a Secret using `kubectl create secret generic creds --from-literal=user=admin --from-literal=pass=s3cret`. They then export it with `kubectl get secret creds -o yaml`. What will the `data` section look like?",
    diagram: null,
    options: [
      "`data: {user: admin, pass: s3cret}` — values appear in plaintext",
      "`data: {user: YWRtaW4=, pass: czNjcmV0}` — values are base64-encoded",
      "`data: {user: *****, pass: *****}` — values are masked for security",
      "`data: {user: <sha256-hash>, pass: <sha256-hash>}` — values are hashed"
    ],
    answer: 1,
    explanation: "When viewing a Secret with `kubectl get -o yaml`, the `data` field shows base64-encoded values. `YWRtaW4=` is the base64 encoding of `admin` and `czNjcmV0` is the base64 encoding of `s3cret`. Kubernetes does not mask, hash, or display Secret values in plaintext in the `data` field. To see the original values, use `kubectl get secret creds -o jsonpath='{.data.user}' | base64 --decode`.\n\nWhy other options are wrong:\n- A: Secret data values are never shown in plaintext in the data field of kubectl get -o yaml output\n- C: Kubernetes does not mask Secret values with asterisks in kubectl output\n- D: Secret values are base64-encoded, not SHA-256 hashed; they are fully recoverable\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets",
    verify: "kubectl create secret generic creds --from-literal=user=admin --from-literal=pass=s3cret --dry-run=client -o yaml"
  },
  {
    id: "s02-q085",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A namespace has both a LimitRange (setting default memory request to 128Mi) and a ResourceQuota (total memory requests limited to 1Gi). A developer creates a pod without specifying memory. What is the sequence of events?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Admission Control Sequence</text><rect x="20" y="55" width="100" height="45" rx="5" fill="#2d6a4f"/><text x="70" y="73" text-anchor="middle" fill="white" font-size="10">Step 1</text><text x="70" y="88" text-anchor="middle" fill="#ccc" font-size="9">???</text><line x1="120" y1="77" x2="155" y2="77" stroke="#4caf50" stroke-width="2" marker-end="url(#a)"/><rect x="155" y="55" width="100" height="45" rx="5" fill="#e6a817"/><text x="205" y="73" text-anchor="middle" fill="white" font-size="10">Step 2</text><text x="205" y="88" text-anchor="middle" fill="#ccc" font-size="9">???</text><line x1="255" y1="77" x2="290" y2="77" stroke="#e6a817" stroke-width="2"/><rect x="290" y="55" width="80" height="45" rx="5" fill="#326CE5"/><text x="330" y="73" text-anchor="middle" fill="white" font-size="10">Persist</text><text x="330" y="88" text-anchor="middle" fill="#ccc" font-size="9">to etcd</text><text x="200" y="145" text-anchor="middle" fill="#e0e0e0" font-size="11">What is the sequence of admission control?</text></svg>',
    options: [
      "The ResourceQuota rejects the pod because it has no memory specification, and the LimitRange never runs its admission logic",
      "The pod is created with no memory request and does not count against the ResourceQuota since no memory was requested",
      "Both admission controllers run simultaneously and the LimitRange default conflicts with the ResourceQuota check logic",
      "The LimitRanger first injects the 128Mi default, then the ResourceQuota controller checks if the total fits in 1Gi"
    ],
    answer: 3,
    explanation: "Mutating admission controllers (like LimitRanger) run before validating admission controllers (like ResourceQuota). The LimitRanger first injects the default 128Mi memory request into the pod spec. Then the ResourceQuota controller validates whether the namespace can accommodate the additional 128Mi. If the quota has room, the pod is created. They do not run simultaneously or conflict. Pods always count against quotas when resource values are present.\n\nWhy other options are wrong:\n- A: LimitRanger (mutating) runs before ResourceQuota (validating), not the other way around\n- B: The pod gets the LimitRange default injected, so it does have a memory request and counts against quota\n- C: Mutating admission controllers run before validating ones; they do not run simultaneously\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
    verify: "kubectl describe limitrange -n <namespace> && kubectl describe resourcequota -n <namespace>"
  },
  {
    id: "s02-q086",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team uses `stringData` in a Secret manifest instead of `data`. What is the difference?",
    diagram: null,
    options: [
      "`stringData` stores values as encrypted strings while `data` stores them as plaintext without any encoding applied",
      "`stringData` supports larger values up to 10 MiB compared to `data` which has a 1 MiB limit per Secret resource",
      "`stringData` is only available in Secret version `v2` while `data` is the legacy `v1` field from earlier releases",
      "`stringData` accepts plaintext that Kubernetes auto-encodes to base64 before storage; `data` needs pre-encoded values"
    ],
    answer: 3,
    explanation: "The `stringData` field is a convenience: you provide plaintext values, and Kubernetes base64-encodes them before storing the Secret. The `data` field requires you to provide already base64-encoded values. Both result in the same stored Secret. When you read the Secret back with `kubectl get -o yaml`, only the `data` field (with base64 values) is shown. There is no version difference, size difference, or encryption difference between the two fields.\n\nWhy other options are wrong:\n- A: stringData is not encryption; it is a convenience field for providing plaintext that gets base64-encoded\n- B: Both stringData and data share the same ~1 MiB size limit per Secret\n- C: Both fields exist in the same Secret API version v1; there is no v2 distinction\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#editing-a-secret",
    verify: "kubectl explain secret.stringData"
  },

  // ── Container Orchestration (5) ────────────────
  {
    id: "s02-q087",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A pod is in `CreateContainerConfigError` state. Running `kubectl describe pod` shows: `Error: configmap \"app-settings\" not found`. A colleague deleted and recreated the ConfigMap with the same name. Running `kubectl get configmap app-settings` shows the ConfigMap exists, yet the Pod remains in CreateContainerConfigError. What likely happened?",
    diagram: null,
    options: [
      "Kubernetes caches ConfigMap references and the internal cache has not been invalidated yet after the recreation",
      "The ConfigMap was recreated in a different namespace than the pod, so the reference cannot be resolved by name",
      "The pod was created before the ConfigMap was recreated and the kubelet ConfigMap cache has a propagation delay",
      "The ConfigMap name is case-sensitive and it was likely recreated with different capitalization in the name field"
    ],
    answer: 1,
    explanation: "The most likely cause of `configmap not found` after recreation is a namespace mismatch. ConfigMaps are namespace-scoped, and if the ConfigMap was recreated in a different namespace (e.g., `default` instead of the pod's namespace), the pod cannot find it. While cache delays exist, they would not produce a `not found` error for a ConfigMap that exists in the correct namespace. ConfigMap names are indeed case-sensitive, but the question states it was recreated with the same name.\n\nWhy other options are wrong:\n- A: Cache invalidation delay would not produce a persistent configmap not found error\n- C: kubelet cache propagation delay is transient and would not produce a persistent not found error\n- D: The question states the ConfigMap was recreated with the same name, ruling out case sensitivity\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: "kubectl get configmap app-settings -n <pod-namespace>"
  },
  {
    id: "s02-q088",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "An init container needs to download configuration from an external service and make it available to the main container. What volume type should they share?",
    diagram: null,
    options: [
      "A `hostPath` volume pointing to a shared directory on the node filesystem for data exchange between containers",
      "A `configMap` volume that the init container populates at runtime by writing data into the mounted path",
      "An `emptyDir` volume shared between the init container and the main container within the same pod",
      "A `persistentVolumeClaim` that the init container writes to and the main container reads from at startup"
    ],
    answer: 2,
    explanation: "An `emptyDir` volume is created when a pod is assigned to a node and is shared among all containers in the pod, including init containers. The init container can download data into the emptyDir, and the main container can read it after the init container completes. `hostPath` creates node dependency. ConfigMap volumes are read-only and cannot be written to by containers. While a PVC would work, it is over-engineered for ephemeral data that only needs to last for the pod's lifetime.\n\nWhy other options are wrong:\n- A: hostPath creates node dependency and is not recommended for ephemeral data sharing\n- B: ConfigMap volumes are read-only and cannot be written to by init containers\n- D: PVC is over-engineered for ephemeral data that only needs to last for the pod's lifetime\n\nReference: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
    verify: "kubectl explain pod.spec.volumes.emptyDir"
  },
  {
    id: "s02-q089",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A container image's `Dockerfile` defines `ENV DATABASE_URL=postgres://localhost:5432/db`. The Kubernetes pod spec also sets `DATABASE_URL` via a ConfigMap reference. Which value does the container see?",
    diagram: null,
    options: [
      "The Dockerfile `ENV` value takes precedence because it is part of the immutable container image layer",
      "The Kubernetes-defined environment variable overrides the Dockerfile `ENV` value at container start",
      "The container sees both values concatenated with a colon separator at the environment variable key",
      "An error occurs because duplicate environment variable names are not allowed in container runtimes"
    ],
    answer: 1,
    explanation: "Environment variables set in the Kubernetes pod spec override those defined in the container image's Dockerfile. When the container starts, the Kubernetes-defined `DATABASE_URL` from the ConfigMap replaces the image's default value. This is by design and is a core feature of configuration management in Kubernetes. Duplicate names are allowed — the Kubernetes value simply takes precedence. Values are not concatenated.\n\nWhy other options are wrong:\n- A: Dockerfile ENV values are overridden by Kubernetes-defined env vars, not the other way around\n- C: Values are not concatenated; the Kubernetes value replaces the Dockerfile value entirely\n- D: Duplicate environment variable names are allowed; the Kubernetes-set value takes precedence\n\nReference: https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/",
    verify: "kubectl exec <pod-name> -- printenv DATABASE_URL"
  },
  {
    id: "s02-q090",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security team discovers that developers can view Secret data using `kubectl get secret -o yaml`. They want to restrict this without removing the ability to create and reference Secrets in pod specs. Which RBAC configuration achieves this?",
    diagram: null,
    options: [
      "Remove `get` and `list` verbs for Secrets from the Role, but keep `create` and pod creation that references Secrets",
      "Set `readOnly: true` on the namespace metadata to prevent reading any resource data including Secret contents",
      "Enable Secret encryption at rest on the cluster — this prevents `kubectl get` from displaying decoded values",
      "Remove all Secret permissions from the Role — pods can still mount Secrets without RBAC user authorization"
    ],
    answer: 0,
    explanation: "RBAC Roles can grant fine-grained permissions. Removing `get` and `list` verbs for Secrets prevents developers from reading Secret data directly via `kubectl`. However, they can still `create` Secrets and create pods that reference Secrets. The kubelet (using its own credentials) fetches the Secret data for pod mounts. There is no `readOnly` namespace setting. Encryption at rest protects etcd, not API access. Pods cannot mount Secrets if the kubelet lacks permission, but developers' RBAC is separate from the kubelet's.\n\nWhy other options are wrong:\n- B: There is no readOnly metadata field on Kubernetes namespaces\n- C: Encryption at rest protects etcd storage, not API server output; kubectl get still decodes base64\n- D: Removing all Secret permissions would prevent developers from creating Secrets needed for pods\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i get secrets --as=developer"
  },
  {
    id: "s02-q091",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After upgrading a Deployment, pods restart but crash with `OOMKilled`. The application has not changed — only the resource limits were reduced from `512Mi` to `256Mi`. The application's baseline memory usage is approximately 300Mi. What is the immediate fix?",
    diagram: null,
    options: [
      "Add a memory swap configuration to the container runtime to handle the overflow beyond the set limit",
      "Reduce the memory request to zero so Kubernetes does not track or enforce memory usage on the pod",
      "Set `oomScoreAdj: -1000` on the container security context to prevent the OOM killer from acting",
      "Increase the memory limit to at least 300Mi to match baseline usage and account for runtime spikes"
    ],
    answer: 3,
    explanation: "If the application's baseline memory usage (300Mi) exceeds the configured limit (256Mi), the container will be OOM-killed every time. The fix is to increase the limit to at least match the application's memory needs, with headroom for spikes. Kubernetes containers do not support swap by default. `oomScoreAdj` is not a container spec field (QoS class influences OOM score). Setting requests to 0 does not affect limits or prevent OOM kills.\n\nWhy other options are wrong:\n- A: Kubernetes containers do not support memory swap by default; swap is typically disabled on nodes\n- B: Setting requests to zero does not affect limits; the OOM killer enforces the memory limit regardless\n- C: oomScoreAdj is not a container spec field; QoS class influences OOM score automatically\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-limits-are-run",
    verify: "kubectl describe pod <pod-name> | grep -i oom"
  },

  // ── Cloud Native Architecture (4) ─────────────
  {
    id: "s02-q092",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A company's cloud-native strategy document states that \"configuration must be treated as a first-class artifact.\" In practical Kubernetes terms, what does this mean?",
    diagram: null,
    options: [
      "Configuration files should be compiled into the application binary for maximum runtime performance and efficiency",
      "All configuration must be stored in environment variables only — file-based configuration is not cloud-native",
      "Configuration should only be managed by a dedicated operations team using manual `kubectl` commands directly",
      "ConfigMaps and Secrets should be version-controlled, reviewed, tested, and deployed via the CI/CD pipeline"
    ],
    answer: 3,
    explanation: "Treating configuration as a first-class artifact means applying the same engineering rigor to configuration as to code: storing it in version control, requiring peer review for changes, testing it, and deploying it through automated pipelines. This ensures auditability, reproducibility, and reduces configuration drift. Manual management is error-prone. Both environment variables and file-based configuration are valid cloud-native approaches.\n\nWhy other options are wrong:\n- A: Compiling configuration into the binary makes it impossible to change without rebuilding\n- B: File-based configuration is a valid cloud-native approach; env vars are not the only option\n- C: Manual kubectl management is error-prone and does not follow engineering best practices\n\nReference: https://12factor.net/config",
    verify: null
  },
  {
    id: "s02-q093",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team wants to validate that their Kubernetes manifests (including ConfigMaps, Secrets, and resource specifications) conform to organizational policies before they are applied. Which CNCF ecosystem approach is best suited?",
    diagram: null,
    options: [
      "Use `kubectl apply --dry-run=server` which validates all resources against organizational policies automatically",
      "Use Helm's built-in policy validation engine that checks all manifests before deployment to the cluster",
      "Use Prometheus to alert when non-conforming resources are detected running inside the Kubernetes cluster",
      "Use OPA Gatekeeper or Kyverno to evaluate resources against custom policies during admission control"
    ],
    answer: 3,
    explanation: "OPA Gatekeeper and Kyverno are Kubernetes-native policy engines that run as admission controllers. They evaluate resources against custom policies (e.g., requiring resource limits, restricting Secret types, enforcing ConfigMap naming conventions) before the resources are persisted. `--dry-run=server` validates syntax and basic API rules but not custom organizational policies. Prometheus monitors after deployment. Helm does not have built-in policy validation.\n\nWhy other options are wrong:\n- A: --dry-run=server validates API schema rules but not custom organizational policies\n- B: Helm does not have a built-in policy validation engine for organizational policies\n- C: Prometheus monitors after deployment; it cannot prevent non-conforming resources from being created\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
    verify: null
  },
  {
    id: "s02-q094",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices team discovers that 15 of their 20 services share the same Redis connection configuration (host, port, password). Currently each has its own ConfigMap with duplicated values. The team needs to roll out Redis configuration changes per-service for A/B testing of a new Redis cluster. What is the recommended approach to reduce configuration duplication while supporting per-service overrides?",
    diagram: null,
    options: [
      "Create a single shared ConfigMap referenced by all 15 services, accepting the coupling trade-off to reduce duplication",
      "Continue with per-service ConfigMaps to maintain loose coupling — configuration duplication is acceptable as a trade-off",
      "Use Helm library templates or Kustomize overlays to generate per-service ConfigMaps from a shared base definition",
      "Store the Redis configuration in an annotation on the namespace object and read it via the Downward API in each pod"
    ],
    answer: 2,
    explanation: "Using Helm library charts or Kustomize overlays allows defining the Redis configuration once (single source of truth) while generating separate per-service ConfigMaps at deployment time. This maintains loose coupling (each service has its own ConfigMap) while eliminating manual duplication. A shared ConfigMap creates tight coupling. Pure duplication risks drift. Namespace annotations cannot be consumed as pod configuration.\n\nWhy other options are wrong:\n- A: A single shared ConfigMap creates tight coupling; changes affect all 15 services simultaneously\n- B: Per-service duplication risks configuration drift when shared values need to be updated\n- D: Namespace annotations cannot be consumed as pod configuration via the Downward API\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: null
  },
  {
    id: "s02-q095",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A stateful application stores its configuration in a database table rather than using Kubernetes ConfigMaps. The operations team finds it difficult to track configuration changes and perform rollbacks. How would adopting Kubernetes-native configuration management improve this?",
    diagram: null,
    options: [
      "ConfigMaps are stored in etcd which automatically versions all changes, enabling `kubectl rollback configmap` to restore prior versions",
      "ConfigMaps in Git provide version history, diff capability, and rollback through Git ops, while Deployment rollbacks restore config versions",
      "Kubernetes automatically creates ConfigMap snapshots before every change, stored in a dedicated backup volume attached to the cluster",
      "There is no advantage over database-stored configuration — it provides the same versioning and rollback capabilities as ConfigMaps do"
    ],
    answer: 1,
    explanation: "When ConfigMaps are managed declaratively and stored in Git, the team gains version history, code review workflows, diff capabilities, and rollback through standard Git operations. Coupled with Kubernetes Deployment rollbacks (which reference specific ConfigMap versions or checksums), the entire configuration lifecycle becomes auditable and reversible. etcd does not automatically version resources or support `kubectl rollback configmap`. Kubernetes does not create automatic snapshots.\n\nWhy other options are wrong:\n- A: etcd does not auto-version resources; there is no kubectl rollback configmap command\n- C: Kubernetes does not create automatic ConfigMap snapshots; version control must be external\n- D: Database-stored config lacks the Git-based diff, review, and rollback workflows\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: null
  },

  // ── Cloud Native Observability (2) ─────────────
  {
    id: "s02-q096",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A platform team uses Fluentd to collect logs from all pods. They want to enrich log entries with the pod's resource limits to correlate application errors with resource constraints. Where can Fluentd obtain this information?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Log Enrichment Pipeline</text><rect x="20" y="55" width="90" height="40" rx="5" fill="#2d6a4f"/><text x="65" y="80" text-anchor="middle" fill="white" font-size="11">Pod Logs</text><line x1="110" y1="75" x2="140" y2="75" stroke="#555" stroke-width="2"/><rect x="140" y="55" width="110" height="40" rx="5" fill="#e6a817"/><text x="195" y="80" text-anchor="middle" fill="white" font-size="11">Fluentd DaemonSet</text><line x1="250" y1="75" x2="280" y2="75" stroke="#555" stroke-width="2"/><rect x="280" y="55" width="100" height="40" rx="5" fill="#326CE5"/><text x="330" y="80" text-anchor="middle" fill="white" font-size="11">Enriched Logs</text><rect x="140" y="115" width="110" height="35" rx="5" fill="#16213e" stroke="#e6a817" stroke-width="1"/><text x="195" y="137" text-anchor="middle" fill="#e0e0e0" font-size="10">?</text><line x1="195" y1="95" x2="195" y2="115" stroke="#e6a817" stroke-width="1" stroke-dasharray="3,3"/></svg>',
    options: [
      "Fluentd reads resource limits directly from the container's `/proc/cgroups` file on the node filesystem for enrichment",
      "The Fluentd Kubernetes metadata filter plugin queries the API to enrich logs with pod metadata and resource specs",
      "Resource limits are automatically included in every log line by the container runtime without extra configuration",
      "Fluentd reads the node's kubelet configuration file to determine pod resource limits for log enrichment purposes"
    ],
    answer: 1,
    explanation: "The Fluentd Kubernetes metadata filter plugin enriches log entries by querying the Kubernetes API for pod metadata, including labels, annotations, and resource specifications. This allows correlating logs with resource constraints. Container runtimes do not add resource limits to log output. While cgroup files contain resource constraints, Fluentd typically uses the Kubernetes API for this data. The kubelet config does not contain per-pod resource limits.\n\nWhy other options are wrong:\n- A: While cgroup files contain resource constraints, Fluentd typically uses the Kubernetes API for this\n- C: Container runtimes do not automatically include resource limits in log output\n- D: The kubelet config does not contain per-pod resource limits; the API server stores this data\n\nReference: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter",
    verify: null
  },
  {
    id: "s02-q097",
    domain: "Cloud Native Observability",
    subsection: "Cost Management",
    text: "A team deploys Kubecost to monitor cluster costs. They notice that many pods have resource requests significantly higher than their actual usage. What cost management action should they take?",
    diagram: null,
    options: [
      "Remove all resource requests to reduce costs — Kubernetes bills infrastructure based on requested resources only",
      "Set all resource limits to the maximum node capacity to ensure no compute resource waste across the cluster",
      "Right-size resource requests based on observed usage data, reducing over-provisioning with a safety margin",
      "Move all workloads to spot instances since over-provisioning only matters when using on-demand instances"
    ],
    answer: 2,
    explanation: "Right-sizing involves adjusting resource requests to match actual usage patterns with appropriate headroom for spikes. Over-provisioned requests waste cluster capacity (and potentially cloud costs) because the scheduler reserves those resources even if they are not used. Removing all requests creates BestEffort pods vulnerable to eviction. Setting limits to max does not reduce requests. Spot instances help with cost but do not address over-provisioning.\n\nWhy other options are wrong:\n- A: Removing all requests creates BestEffort pods vulnerable to eviction; Kubernetes does not bill directly\n- B: Setting limits to max does not reduce requests, which determine scheduling and cost attribution\n- D: Spot instances help with pricing but do not address the over-provisioning of resource requests\n\nReference: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    verify: null
  },

  // ── Cloud Native Application Delivery (3) ──────
  {
    id: "s02-q098",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps team using Argo CD notices that updating a ConfigMap in Git does not trigger a new rollout of the Deployment that uses it. The pods continue with the old configuration. What is the standard GitOps solution?",
    diagram: null,
    options: [
      "Configure Argo CD to force-restart all pods after every sync operation completes on the target cluster",
      "Argo CD does not support ConfigMap change detection — switch to Flux which has this feature built in",
      "Use a checksum annotation on the pod template so ConfigMap changes alter the spec and trigger rollout",
      "Manually run `kubectl rollout restart` after each ConfigMap change to update pods with new config"
    ],
    answer: 2,
    explanation: "A common GitOps pattern is to include a checksum of the ConfigMap data as an annotation on the Deployment's pod template. When the ConfigMap changes, the checksum changes, which modifies the pod template spec and triggers a rolling update. This works with both Argo CD and Flux. Force-restarting all pods is wasteful. Both Argo CD and Flux support this pattern. Manual restarts break the GitOps automation model.\n\nWhy other options are wrong:\n- A: Force-restarting all pods after every sync is wasteful and disrupts stable workloads unnecessarily\n- B: Both Argo CD and Flux support the checksum annotation pattern; switching is not needed\n- D: Manual kubectl rollout restart breaks GitOps automation and requires human intervention\n\nReference: https://helm.sh/docs/howto/charts_tips_and_tricks/#automatically-roll-deployments",
    verify: null
  },
  {
    id: "s02-q099",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI pipeline generates a dynamic configuration file (containing build metadata, commit SHA, and build timestamp) that must be available to the application at runtime. The team does not want to bake it into the container image. What is the best approach?",
    diagram: null,
    options: [
      "Create a ConfigMap from the generated file in CI and reference it in the Deployment before applying",
      "Pass the entire generated file content as a command-line argument to the container's entrypoint cmd",
      "Store the file in a cloud storage bucket and have the container download it at startup on each boot",
      "Use Docker build arguments to embed the file in a hidden layer of the image during the build stage"
    ],
    answer: 0,
    explanation: "Creating a ConfigMap from the dynamically generated file during the CI pipeline keeps configuration out of the image while making it available at runtime. The CI pipeline can run `kubectl create configmap build-meta --from-file=build-info.json` and then apply the Deployment that references it. Command-line arguments have size limits. Cloud storage adds external dependencies. Docker build arguments bake data into the image, which violates the requirement.\n\nWhy other options are wrong:\n- B: Command-line arguments have size limits and are unsuitable for full configuration files\n- C: Cloud storage adds external dependencies and latency at container startup\n- D: Docker build arguments embed data into the image, violating the requirement to keep it external\n\nReference: https://kubernetes.io/docs/concepts/configuration/configmap/",
    verify: "kubectl create configmap build-meta --from-file=build-info.json --dry-run=client -o yaml"
  },
  {
    id: "s02-q100",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart creates a ConfigMap and a Deployment. The team wants to ensure that whenever the ConfigMap content changes, the Deployment pods are automatically restarted. They add the annotation `checksum/config: {{ include (print $.Template.BasePath \"/configmap.yaml\") . | sha256sum }}` to the pod template. What does this achieve?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="230" rx="8" fill="#1a1a2e" stroke="#326CE5" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">Helm Checksum Pattern</text><rect x="40" y="55" width="140" height="50" rx="5" fill="#326CE5"/><text x="110" y="75" text-anchor="middle" fill="white" font-size="12">ConfigMap</text><text x="110" y="92" text-anchor="middle" fill="#ccc" font-size="10">content changes</text><line x1="110" y1="105" x2="110" y2="125" stroke="#aaa" stroke-width="2"/><rect x="40" y="125" width="320" height="50" rx="5" fill="#16213e" stroke="#aaa" stroke-width="1"/><text x="200" y="155" text-anchor="middle" fill="#aaa" font-size="13">??? mechanism ???</text><line x1="200" y1="175" x2="200" y2="195" stroke="#aaa" stroke-width="2"/><rect x="130" y="195" width="140" height="35" rx="5" fill="#2d6a4f"/><text x="200" y="217" text-anchor="middle" fill="white" font-size="12">Rolling update occurs</text></svg>',
    options: [
      "It embeds the ConfigMap content directly in the pod template, eliminating the need for a separate ConfigMap resource entirely",
      "Any change to ConfigMap content changes the hash annotation, which alters the pod template spec and triggers a rolling update",
      "It encrypts the ConfigMap data using SHA-256 for security purposes so that sensitive configuration is protected at rest",
      "It validates ConfigMap content against a known checksum and blocks the deployment if the content is corrupted or tampered"
    ],
    answer: 1,
    explanation: "This is a well-known Helm pattern. The `sha256sum` function generates a hash of the rendered ConfigMap template. This hash is stored as a pod template annotation. When the ConfigMap content changes during a Helm upgrade, the hash changes, which modifies the pod template spec. Kubernetes detects the template change and performs a rolling update. SHA-256 is used here for change detection, not encryption or validation. The ConfigMap remains a separate resource.\n\nWhy other options are wrong:\n- A: The sha256sum generates a hash as an annotation; the ConfigMap remains a separate resource\n- C: SHA-256 is used for change detection, not encryption of the ConfigMap data\n- D: The checksum triggers a rollout on change; it does not validate or block for corruption\n\nReference: https://helm.sh/docs/howto/charts_tips_and_tricks/#automatically-roll-deployments",
    verify: "helm template <chart> | grep checksum"
  },

];

var labExercises = [
  {
    title: "Lab 1: Creating and Consuming ConfigMaps",
    description: "Learn how to create ConfigMaps from literal values and files, then consume them in pods as environment variables and mounted volumes.",
    commands: "<span class='prompt'>$</span> kubectl create configmap app-config --from-literal=APP_ENV=production --from-literal=LOG_LEVEL=info<br><span class='prompt'>$</span> kubectl create configmap nginx-conf --from-file=nginx.conf=./nginx.conf<br><span class='prompt'>$</span> kubectl run config-test --image=busybox --restart=Never --dry-run=client -o yaml -- sh -c 'echo $APP_ENV && cat /etc/config/nginx.conf && sleep 3600' > pod.yaml<br><span class='prompt'>$</span> # Edit pod.yaml to add envFrom referencing app-config and a volume mount for nginx-conf<br><span class='prompt'>$</span> kubectl apply -f pod.yaml<br><span class='prompt'>$</span> kubectl exec config-test -- env | grep APP_ENV<br><span class='prompt'>$</span> kubectl exec config-test -- cat /etc/config/nginx.conf<br><span class='prompt'>$</span> kubectl get configmap app-config -o yaml",
    expected: "APP_ENV=production\n\nThe nginx.conf file contents will be displayed from the volume mount. The ConfigMap YAML shows both keys stored as data entries."
  },
  {
    title: "Lab 2: Working with Secrets",
    description: "Create Secrets using different methods, understand base64 encoding, and mount Secrets into pods securely.",
    commands: "<span class='prompt'>$</span> kubectl create secret generic db-creds --from-literal=username=dbadmin --from-literal=password=S3cur3P@ss!<br><span class='prompt'>$</span> kubectl get secret db-creds -o yaml<br><span class='prompt'>$</span> kubectl get secret db-creds -o jsonpath='{.data.password}' | base64 --decode<br><span class='prompt'>$</span> kubectl run secret-test --image=busybox --restart=Never --dry-run=client -o yaml -- sh -c 'echo \"User: $DB_USER\" && cat /etc/secrets/password && sleep 3600' > secret-pod.yaml<br><span class='prompt'>$</span> # Edit secret-pod.yaml to add env DB_USER from secretKeyRef and a volume mount for the password key<br><span class='prompt'>$</span> kubectl apply -f secret-pod.yaml<br><span class='prompt'>$</span> kubectl exec secret-test -- echo $DB_USER<br><span class='prompt'>$</span> kubectl exec secret-test -- cat /etc/secrets/password<br><span class='prompt'>$</span> kubectl create secret tls my-tls --cert=tls.crt --key=tls.key --dry-run=client -o yaml",
    expected: "The Secret YAML shows base64-encoded values in the data field. Decoding the password returns 'S3cur3P@ss!'. The pod shows DB_USER=dbadmin and the password file contents. The TLS Secret dry-run shows the kubernetes.io/tls type with tls.crt and tls.key fields."
  },
  {
    title: "Lab 3: Setting Resource Requests and Limits",
    description: "Configure CPU and memory requests and limits on a pod and observe how Kubernetes enforces them.",
    commands: "<span class='prompt'>$</span> kubectl run resource-demo --image=nginx --restart=Never --dry-run=client -o yaml --requests='cpu=100m,memory=128Mi' --limits='cpu=500m,memory=256Mi' > resource-pod.yaml<br><span class='prompt'>$</span> kubectl apply -f resource-pod.yaml<br><span class='prompt'>$</span> kubectl describe pod resource-demo | grep -A6 'Requests\\|Limits'<br><span class='prompt'>$</span> kubectl top pod resource-demo<br><span class='prompt'>$</span> # Create a pod that exceeds its memory limit to observe OOM kill:<br><span class='prompt'>$</span> kubectl run oom-test --image=polinux/stress --restart=Never --requests='memory=50Mi' --limits='memory=100Mi' -- stress --vm 1 --vm-bytes 200M --vm-hang 0<br><span class='prompt'>$</span> kubectl get pod oom-test -w<br><span class='prompt'>$</span> kubectl describe pod oom-test | grep -A3 'Last State'",
    expected: "The resource-demo pod shows Requests (cpu: 100m, memory: 128Mi) and Limits (cpu: 500m, memory: 256Mi). kubectl top shows actual usage. The oom-test pod enters OOMKilled state because it tries to allocate 200M against a 100Mi limit. The Last State shows reason: OOMKilled."
  },
  {
    title: "Lab 4: Understanding QoS Classes",
    description: "Create pods with different resource specifications and observe how Kubernetes assigns QoS classes (Guaranteed, Burstable, BestEffort).",
    commands: "<span class='prompt'>$</span> # Guaranteed: requests = limits for both CPU and memory<br><span class='prompt'>$</span> kubectl run qos-guaranteed --image=nginx --restart=Never --requests='cpu=250m,memory=128Mi' --limits='cpu=250m,memory=128Mi'<br><span class='prompt'>$</span> kubectl get pod qos-guaranteed -o jsonpath='{.status.qosClass}'<br><span class='prompt'>$</span> # Burstable: requests != limits or missing one resource spec<br><span class='prompt'>$</span> kubectl run qos-burstable --image=nginx --restart=Never --requests='cpu=100m,memory=64Mi' --limits='cpu=500m,memory=256Mi'<br><span class='prompt'>$</span> kubectl get pod qos-burstable -o jsonpath='{.status.qosClass}'<br><span class='prompt'>$</span> # BestEffort: no requests or limits<br><span class='prompt'>$</span> kubectl run qos-besteffort --image=nginx --restart=Never<br><span class='prompt'>$</span> kubectl get pod qos-besteffort -o jsonpath='{.status.qosClass}'<br><span class='prompt'>$</span> kubectl describe pod qos-guaranteed | grep 'QoS Class'<br><span class='prompt'>$</span> kubectl describe pod qos-burstable | grep 'QoS Class'<br><span class='prompt'>$</span> kubectl describe pod qos-besteffort | grep 'QoS Class'",
    expected: "QoS classes displayed: qos-guaranteed → Guaranteed, qos-burstable → Burstable, qos-besteffort → BestEffort. The describe output confirms each pod's QoS class assignment based on its resource specifications."
  },
  {
    title: "Lab 5: Creating LimitRange and ResourceQuota",
    description: "Set up a LimitRange with default resource values and a ResourceQuota to cap total namespace resource consumption, then observe enforcement behavior.",
    commands: "<span class='prompt'>$</span> kubectl create namespace quota-lab<br><span class='prompt'>$</span> cat <<EOF | kubectl apply -f -<br>apiVersion: v1<br>kind: LimitRange<br>metadata:<br>  name: default-limits<br>  namespace: quota-lab<br>spec:<br>  limits:<br>  - default:<br>      cpu: 500m<br>      memory: 256Mi<br>    defaultRequest:<br>      cpu: 100m<br>      memory: 128Mi<br>    max:<br>      cpu: \"1\"<br>      memory: 512Mi<br>    min:<br>      cpu: 50m<br>      memory: 64Mi<br>    type: Container<br>EOF<br><span class='prompt'>$</span> cat <<EOF | kubectl apply -f -<br>apiVersion: v1<br>kind: ResourceQuota<br>metadata:<br>  name: namespace-quota<br>  namespace: quota-lab<br>spec:<br>  hard:<br>    requests.cpu: \"2\"<br>    requests.memory: 1Gi<br>    limits.cpu: \"4\"<br>    limits.memory: 2Gi<br>    count/pods: 5<br>    count/configmaps: 10<br>EOF<br><span class='prompt'>$</span> kubectl describe limitrange default-limits -n quota-lab<br><span class='prompt'>$</span> kubectl describe resourcequota namespace-quota -n quota-lab<br><span class='prompt'>$</span> # Create a pod without resource specs — LimitRange injects defaults:<br><span class='prompt'>$</span> kubectl run test-defaults --image=nginx --restart=Never -n quota-lab<br><span class='prompt'>$</span> kubectl get pod test-defaults -n quota-lab -o jsonpath='{.spec.containers[0].resources}'<br><span class='prompt'>$</span> # Try creating a pod exceeding LimitRange max:<br><span class='prompt'>$</span> kubectl run test-exceed --image=nginx --restart=Never -n quota-lab --limits='memory=1Gi'<br><span class='prompt'>$</span> kubectl describe resourcequota namespace-quota -n quota-lab",
    expected: "The LimitRange shows default, defaultRequest, max, and min values. The test-defaults pod receives injected defaults (cpu: 100m/500m, memory: 128Mi/256Mi). The test-exceed pod is rejected because 1Gi exceeds the LimitRange max of 512Mi. The ResourceQuota shows Used vs Hard values updating as pods are created."
  },
  {
    title: "Lab 6: Environment Variables from ConfigMaps and Secrets",
    description: "Practice different methods of injecting configuration from ConfigMaps and Secrets into containers as environment variables, including envFrom, valueFrom, and the Downward API.",
    commands: "<span class='prompt'>$</span> kubectl create configmap app-settings --from-literal=APP_NAME=my-service --from-literal=APP_PORT=8080 --from-literal=CACHE_TTL=300<br><span class='prompt'>$</span> kubectl create secret generic app-secrets --from-literal=API_KEY=abc123xyz --from-literal=DB_PASSWORD=p@ssw0rd<br><span class='prompt'>$</span> cat <<EOF | kubectl apply -f -<br>apiVersion: v1<br>kind: Pod<br>metadata:<br>  name: env-demo<br>  labels:<br>    app: env-demo<br>    version: v1<br>spec:<br>  containers:<br>  - name: app<br>    image: busybox<br>    command: ['sh', '-c', 'env | sort && sleep 3600']<br>    envFrom:<br>    - configMapRef:<br>        name: app-settings<br>    - secretRef:<br>        name: app-secrets<br>    env:<br>    - name: POD_NAME<br>      valueFrom:<br>        fieldRef:<br>          fieldPath: metadata.name<br>    - name: POD_NAMESPACE<br>      valueFrom:<br>        fieldRef:<br>          fieldPath: metadata.namespace<br>    - name: POD_IP<br>      valueFrom:<br>        fieldRef:<br>          fieldPath: status.podIP<br>    - name: MEMORY_LIMIT<br>      valueFrom:<br>        resourceFieldRef:<br>          resource: limits.memory<br>          divisor: 1Mi<br>    - name: CUSTOM_VAR<br>      value: \"Hello from $(POD_NAME) in $(POD_NAMESPACE)\"<br>  restartPolicy: Never<br>EOF<br><span class='prompt'>$</span> kubectl logs env-demo | grep -E 'APP_NAME|API_KEY|POD_NAME|POD_IP|MEMORY_LIMIT|CUSTOM_VAR'<br><span class='prompt'>$</span> kubectl exec env-demo -- printenv APP_NAME<br><span class='prompt'>$</span> kubectl exec env-demo -- printenv API_KEY<br><span class='prompt'>$</span> kubectl exec env-demo -- printenv CUSTOM_VAR",
    expected: "The pod's environment shows all ConfigMap keys (APP_NAME=my-service, APP_PORT=8080, CACHE_TTL=300), Secret keys (API_KEY=abc123xyz, DB_PASSWORD=p@ssw0rd), Downward API values (POD_NAME=env-demo, POD_NAMESPACE=default, POD_IP=<actual-ip>), the memory limit as a number, and CUSTOM_VAR with the interpolated pod name and namespace."
  }
];
