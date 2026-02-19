var EXAM_SET = 5;
var EXAM_TITLE = "KCNA Practice Exam - Set 05: Security & Access Control";
var questions = [
  {
    id: "s05-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A junior admin creates a Role in the `payments` namespace granting `get`, `list`, and `watch` on Pods. They bind it to a user via a ClusterRoleBinding. What happens when the user tries to list Pods in the `payments` namespace?",
    diagram: null,
    options: [
      "Access is denied because a Role cannot be referenced by a ClusterRoleBinding",
      "The user can list Pods across every namespace including `payments` in the cluster",
      "The user can list Pods only in the `payments` namespace using the bound Role",
      "The ClusterRoleBinding escalates the Role permissions to apply cluster-wide"
    ],
    answer: 0,
    explanation: "A ClusterRoleBinding can only reference a ClusterRole, not a namespaced Role. Attempting to bind a Role via a ClusterRoleBinding results in an API error. The admin should use a RoleBinding instead to grant access within the `payments` namespace.\n\nWhy other options are wrong:\n- B: A ClusterRoleBinding with a ClusterRole would grant cluster-wide access, but the scenario uses a Role (not ClusterRole) which cannot be referenced by a ClusterRoleBinding\n- C: The binding itself is invalid; a ClusterRoleBinding cannot reference a namespace-scoped Role, so no access is granted\n- D: No escalation occurs because the binding is rejected by the API server\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding",
    verify: "kubectl auth can-i list pods --namespace=payments --as=jane 2>&1"
  },
  {
    id: "s05-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "You need to allow traffic from Pods labeled `app: frontend` in the `web` namespace to reach Pods labeled `app: api` in the `backend` namespace on port 8443. Which NetworkPolicy spec is correct?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="170" height="140" rx="8" fill="#1a1a2e" stroke="#4cc9f0" stroke-width="2"/><text x="95" y="22" text-anchor="middle" fill="#4cc9f0" font-size="12">ns: web</text><rect x="30" y="60" width="130" height="40" rx="5" fill="#16213e" stroke="#f72585" stroke-width="1.5"/><text x="95" y="85" text-anchor="middle" fill="#f8f8f2" font-size="11">app: frontend</text><rect x="220" y="30" width="170" height="140" rx="8" fill="#1a1a2e" stroke="#4cc9f0" stroke-width="2"/><text x="305" y="22" text-anchor="middle" fill="#4cc9f0" font-size="12">ns: backend</text><rect x="240" y="60" width="130" height="40" rx="5" fill="#16213e" stroke="#f72585" stroke-width="1.5"/><text x="305" y="85" text-anchor="middle" fill="#f8f8f2" font-size="11">app: api</text><line x1="160" y1="80" x2="240" y2="80" stroke="#7b2ff7" stroke-width="2" marker-end="url(#arrowhead)"/><text x="200" y="72" text-anchor="middle" fill="#b5179e" font-size="10">:8443</text><defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#7b2ff7"/></marker></defs></svg>',
    options: [
      "An ingress policy in `backend` with `namespaceSelector` for `web` and `podSelector` for `app: frontend`",
      "An egress NetworkPolicy in `web` namespace with `podSelector` matching the label `app: api` on port 8443",
      "An ingress NetworkPolicy in the `web` namespace selecting Pods matching `app: frontend` for this traffic",
      "An egress NetworkPolicy in `backend` using `namespaceSelector` matching the `web` namespace on port 8443"
    ],
    answer: 0,
    explanation: "NetworkPolicy is applied in the namespace of the target Pods. An ingress policy in the `backend` namespace selects Pods with `app: api` and allows ingress from the `web` namespace Pods labeled `app: frontend` on port 8443. The `namespaceSelector` identifies the source namespace.\n\nWhy other options are wrong:\n- B: An egress policy in the source namespace controls outbound traffic but does not use namespaceSelector to identify cross-namespace targets correctly here\n- C: The ingress policy must be in the destination namespace (backend), not the source namespace (web)\n- D: An egress policy in the destination namespace does not control traffic flowing into that namespace\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n backend -o yaml"
  },
  {
    id: "s05-q003",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Pod spec sets `runAsNonRoot: true` at the pod-level `securityContext`, but one container image has `USER root` in its Dockerfile. What occurs when this Pod is scheduled?",
    diagram: null,
    options: [
      "The container runs as root, overriding the pod-level `securityContext` setting",
      "The Pod is rejected at the admission stage with a security warning",
      "The container fails to start with a `RunAsNonRoot` validation error",
      "Kubernetes automatically remaps root UID to the `nobody` UID 65534"
    ],
    answer: 2,
    explanation: "When `runAsNonRoot: true` is set and the container image specifies UID 0 (root), the kubelet rejects the container at startup. It does not override the security setting or remap the user. The error message indicates the container attempted to run as root.\n\nWhy other options are wrong:\n- A: The container does not override the pod-level runAsNonRoot setting; the kubelet enforces it\n- B: Rejection happens at container startup by the kubelet, not at the admission stage\n- D: Kubernetes does not automatically remap UIDs; no UID remapping mechanism exists for this\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod",
    verify: "kubectl describe pod <pod-name> | grep -i error"
  },
  {
    id: "s05-q004",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "Your cluster runs the PodSecurity admission controller with the `restricted` profile enforced on the `production` namespace. A developer submits a Pod with `privileged: true`. At which stage is the Pod rejected?",
    diagram: '<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="40" width="80" height="40" rx="5" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="50" y="65" text-anchor="middle" fill="#f8f8f2" font-size="10">kubectl</text><rect x="110" y="40" width="90" height="40" rx="5" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="155" y="58" text-anchor="middle" fill="#f8f8f2" font-size="9">API Server</text><text x="155" y="72" text-anchor="middle" fill="#f8f8f2" font-size="9">AuthN/AuthZ</text><text x="155" y="100" text-anchor="middle" fill="#f1fa8c" font-size="14">?</text><rect x="220" y="40" width="80" height="40" rx="5" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="260" y="58" text-anchor="middle" fill="#f8f8f2" font-size="9">Admission</text><text x="260" y="72" text-anchor="middle" fill="#f8f8f2" font-size="9">(???)</text><text x="260" y="100" text-anchor="middle" fill="#f1fa8c" font-size="14">?</text><rect x="320" y="40" width="70" height="40" rx="5" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="355" y="65" text-anchor="middle" fill="#f8f8f2" font-size="10">etcd</text><text x="355" y="100" text-anchor="middle" fill="#f1fa8c" font-size="14">?</text><line x1="90" y1="60" x2="110" y2="60" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#a4)"/><line x1="200" y1="60" x2="220" y2="60" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#a4)"/><line x1="300" y1="60" x2="320" y2="60" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#a4)"/><defs><marker id="a4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4cc9f0"/></marker></defs></svg>',
    options: [
      "During scheduling, after passing through the PodSecurity admission phase",
      "During the image pull phase by the node kubelet",
      "During admission by the PodSecurity admission plugin",
      "At runtime enforcement by the container runtime"
    ],
    answer: 2,
    explanation: "The PodSecurity admission controller evaluates Pods during the admission phase of the API server request lifecycle. A Pod with `privileged: true` violates the `restricted` profile and is rejected before it is persisted to etcd. This happens before scheduling.\n\nWhy other options are wrong:\n- A: The scheduler is not involved; rejection happens before the Pod is persisted to etcd\n- B: The image pull phase occurs after admission; the Pod never reaches the node\n- D: Runtime enforcement is too late; PSA operates at the API server admission stage\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-admission/",
    verify: "kubectl label ns production pod-security.kubernetes.io/enforce=restricted"
  },
  {
    id: "s05-q005",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A security team wants to scan container images for known CVEs before they are deployed into the cluster. Which open-source tool is specifically designed for container image vulnerability scanning?",
    diagram: null,
    options: [
      "Falco runtime monitor",
      "Open Policy Agent (OPA)",
      "cert-manager by Jetstack",
      "Trivy by Aqua Security"
    ],
    answer: 3,
    explanation: "Trivy (by Aqua Security) is a widely adopted open-source vulnerability scanner for container images, filesystems, and Git repositories. Falco focuses on runtime threat detection, OPA handles policy enforcement, and cert-manager manages TLS certificates.\n\nWhy other options are wrong:\n- A: Falco monitors runtime syscall activity, not container image vulnerabilities\n- B: OPA evaluates admission policies, not vulnerability scanning\n- C: cert-manager automates TLS certificate management, unrelated to CVE scanning\n\nReference: https://aquasecurity.github.io/trivy/",
    verify: "trivy image nginx:latest"
  },
  {
    id: "s05-q006",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "You create a ServiceAccount named `deployer` in the `staging` namespace and mount its token into a Pod. In Kubernetes 1.24+, what must you do to obtain a long-lived token for this ServiceAccount?",
    diagram: null,
    options: [
      "Create a Secret of type `kubernetes.io/service-account-token` annotated with the SA name",
      "Set `automountServiceAccountToken: true` in the Pod spec to get a long-lived token",
      "Projected tokens mounted via `automountServiceAccountToken` are long-lived and do not require separate Secret creation",
      "Run `kubectl token create deployer` to generate an OIDC-based token for the account"
    ],
    answer: 0,
    explanation: "Starting in Kubernetes 1.24, the `LegacyServiceAccountTokenNoAutoGeneration` feature means Secrets are no longer auto-created for ServiceAccounts. To obtain a long-lived token, you must manually create a Secret of type `kubernetes.io/service-account-token` with the appropriate annotation referencing the ServiceAccount name.\n\nWhy other options are wrong:\n- B: automountServiceAccountToken controls whether a projected token is mounted in Pods, not whether a long-lived token Secret is created\n- C: Projected tokens are short-lived (not long-lived) and are not a substitute for Secret-based tokens\n- D: kubectl create token generates a short-lived TokenRequest token, not a long-lived Secret-based one\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/#manual-secret-management-for-serviceaccounts",
    verify: "kubectl get secrets -n staging -o yaml"
  },
  {
    id: "s05-q007",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A ClusterRole grants `create` and `delete` on `deployments` in the `apps` API group. A RoleBinding in the `dev` namespace binds this ClusterRole to user `alice`. What can Alice do?",
    diagram: null,
    options: [
      "Create and delete Deployments across all namespaces in the cluster",
      "Create and delete Deployments only in the `dev` namespace scope",
      "Nothing, because ClusterRoles are only valid when bound by ClusterRoleBindings",
      "Create Deployments in `dev` but delete them across all other namespaces"
    ],
    answer: 1,
    explanation: "A RoleBinding can reference a ClusterRole, but the permissions are scoped to the RoleBinding's namespace. Alice can only create and delete Deployments in the `dev` namespace, not cluster-wide. This pattern is commonly used to reuse ClusterRoles across multiple namespaces.\n\nWhy other options are wrong:\n- A: A RoleBinding scopes permissions to its own namespace, not cluster-wide\n- C: ClusterRoles can be bound by RoleBindings; this is a common and valid pattern for reuse\n- D: RBAC does not split verbs across different scopes; all granted verbs apply to the same namespace\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding",
    verify: "kubectl auth can-i create deployments --as=alice -n dev"
  },
  {
    id: "s05-q008",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "You suspect an unauthorized process is running inside a production container. Which approach provides real-time detection of anomalous system calls within running containers?",
    diagram: null,
    options: [
      "Prometheus metrics scraping combined with custom alerting rules",
      "Fluentd log aggregation paired with regex pattern matching",
      "Jaeger distributed tracing along with detailed span analysis",
      "Falco with custom rules for runtime security monitoring"
    ],
    answer: 3,
    explanation: "Falco is a CNCF runtime security project that monitors system calls made by containers and triggers alerts based on customizable rules. Prometheus monitors metrics, Fluentd aggregates logs, and Jaeger handles distributed tracing -- none of which directly inspect syscall behavior.\n\nWhy other options are wrong:\n- A: Prometheus scrapes metrics but does not inspect syscalls within containers\n- B: Fluentd aggregates logs; regex matching on logs is reactive and does not detect syscall anomalies\n- C: Jaeger traces distributed request paths, not container-level system call behavior\n\nReference: https://falco.org/docs/",
    verify: "falco --list | grep syscall"
  },
  {
    id: "s05-q009",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Pod has the following `securityContext` at the container level: `readOnlyRootFilesystem: true`. The application inside needs to write temporary files. What is the recommended approach?",
    diagram: null,
    options: [
      "Set `readOnlyRootFilesystem: false` to allow container filesystem writes",
      "Use an `initContainer` to pre-create all needed temporary file paths",
      "Set `allowPrivilegeEscalation: true` to bypass filesystem restrictions",
      "Mount an `emptyDir` volume at the path where temporary writes are needed"
    ],
    answer: 3,
    explanation: "Mounting an `emptyDir` volume at the required write path preserves the security benefit of a read-only root filesystem while providing a writable area. Disabling the read-only filesystem weakens security, and `allowPrivilegeEscalation` is unrelated to filesystem write access.\n\nWhy other options are wrong:\n- A: Disabling readOnlyRootFilesystem weakens security and is not recommended\n- B: An initContainer cannot pre-create files on a read-only filesystem; the constraint applies to the overlay\n- C: allowPrivilegeEscalation controls setuid/setgid, not filesystem write permissions\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.volumes}'"
  },
  {
    id: "s05-q010",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "Your CI pipeline builds container images and pushes them to a registry. To prevent deploying images with critical vulnerabilities, which step should be integrated into the pipeline?",
    diagram: null,
    options: [
      "Sign all images with cosign after pushing them to the container registry",
      "Set `imagePullPolicy: Always` on all Pod specs across every namespace",
      "Run a vulnerability scanner and fail the build on critical CVE findings",
      "Deploy the image to a staging namespace first before promoting to production"
    ],
    answer: 2,
    explanation: "Integrating a vulnerability scanner (such as Trivy or Grype) into the CI pipeline and failing the build on critical CVEs prevents vulnerable images from reaching the registry. Image signing verifies provenance but does not block vulnerabilities. Pull policies and staging do not inherently scan for CVEs.\n\nWhy other options are wrong:\n- A: Image signing verifies provenance but does not detect or block vulnerabilities\n- B: imagePullPolicy: Always ensures fresh pulls but does not scan for CVEs\n- D: Staging deployments test functionality but do not inherently scan for vulnerabilities\n\nReference: https://kubernetes.io/docs/concepts/security/supply-chain-security/",
    verify: "trivy image --exit-code 1 --severity CRITICAL myapp:latest"
  },
  {
    id: "s05-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Deployment creates Pods that need to read Secrets from the Kubernetes API. The Pods use the `default` ServiceAccount. In a hardened cluster with `automountServiceAccountToken: false` set on the `default` ServiceAccount, what happens?",
    diagram: null,
    options: [
      "The Pods still receive a projected token volume from the kubelet by default",
      "No token is mounted and API calls from the Pods fail with 401 Unauthorized",
      "The kubelet injects a static token sourced from its local credential store",
      "The Pods are rejected at the admission stage because no valid token exists"
    ],
    answer: 1,
    explanation: "When `automountServiceAccountToken: false` is set on the ServiceAccount and no override is present in the Pod spec, the kubelet does not mount a token volume. Any attempt to reach the Kubernetes API from within the Pod results in a 401 Unauthorized error.\n\nWhy other options are wrong:\n- A: With automountServiceAccountToken: false on the SA, the kubelet does not inject a projected token unless overridden in the Pod spec\n- C: The kubelet does not inject tokens from a local credential store\n- D: The Pod is not rejected at admission; it starts successfully but has no token mounted\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting",
    verify: "kubectl get sa default -o jsonpath='{.automountServiceAccountToken}'"
  },
  {
    id: "s05-q012",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team adopts a zero-trust security model for their cloud native application. Which principle does this model emphasize?",
    diagram: null,
    options: [
      "Verify every request regardless of its source network location or trust level",
      "Authenticate external traffic at the perimeter and trust internal service-to-service calls",
      "Encrypt only external-facing traffic at the ingress gateway layer",
      "Combine perimeter firewalls with namespace isolation to secure the cluster network"
    ],
    answer: 0,
    explanation: "Zero-trust security requires that every request is authenticated, authorized, and encrypted regardless of whether it originates from inside or outside the network perimeter. This contrasts with perimeter-based models that implicitly trust internal traffic.\n\nWhy other options are wrong:\n- B: Zero-trust requires verifying every call, including internal service-to-service traffic, not just external requests\n- C: Zero-trust requires encryption of all traffic, not just external-facing traffic\n- D: Zero-trust requires per-request verification and does not rely on perimeter firewalls or namespace boundaries alone\n\nReference: https://kubernetes.io/docs/concepts/security/overview/",
    verify: null
  },
  {
    id: "s05-q013",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A container in a Pod attempts to use `CAP_NET_ADMIN` to modify network interfaces. The Pod spec does not include any `capabilities` configuration. What is the default behavior?",
    diagram: null,
    options: [
      "Most common capabilities including `CAP_NET_ADMIN` are granted by the default runtime config",
      "`CAP_NET_ADMIN` is granted because it is included in the runtime default list",
      "The container runs with a default set that does not include `CAP_NET_ADMIN`",
      "The kubelet adds all `NET_*` capabilities automatically to each new container"
    ],
    answer: 2,
    explanation: "By default, containers run with a limited set of Linux capabilities defined by the container runtime (e.g., containerd). `CAP_NET_ADMIN` is not in this default set. To use it, you must explicitly add it via `securityContext.capabilities.add` in the container spec.\n\nWhy other options are wrong:\n- A: CAP_NET_ADMIN is not among the common capabilities granted by default; the default set is deliberately minimal\n- B: CAP_NET_ADMIN is not in the default capability set granted by container runtimes\n- D: The kubelet does not automatically add NET_* capabilities to containers\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container",
    verify: "kubectl exec <pod> -- cat /proc/1/status | grep Cap"
  },
  {
    id: "s05-q014",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "You have a Pod Security Admission policy that enforces `baseline` on the `apps` namespace. A new Pod requests `hostNetwork: true`. What is the outcome?",
    diagram: null,
    options: [
      "The Pod is scheduled normally but the kubelet logs a warning event",
      "The Pod is admitted because the `baseline` profile allows host networking",
      "The Pod is rejected because `baseline` prohibits `hostNetwork: true`",
      "The Pod spec is mutated by the controller to set `hostNetwork: false`"
    ],
    answer: 2,
    explanation: "The `baseline` Pod Security Standard prohibits `hostNetwork: true`. When enforcement is enabled, the admission controller rejects the Pod. The `baseline` profile is designed to prevent known privilege escalations, and host networking allows a Pod to access the node's network stack directly.\n\nWhy other options are wrong:\n- A: The Pod is rejected outright when enforce mode is active, not just logged as a warning\n- B: The baseline profile prohibits hostNetwork: true; it does not allow it\n- D: PSA does not mutate Pod specs; it only validates and rejects or allows\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/",
    verify: "kubectl run test --image=nginx --overrides='{\"spec\":{\"hostNetwork\":true}}' -n apps --dry-run=server"
  },
  {
    id: "s05-q015",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Role in the `finance` namespace grants `get` and `list` on the `secrets` resource. A RoleBinding binds this Role to user `bob`. An administrator is concerned about security. Why might this be problematic?",
    diagram: null,
    options: [
      "Roles granting Secret access require additional approval from a cluster administrator",
      "Bob can read all Secrets in `finance`, potentially exposing sensitive credentials",
      "RoleBindings that reference Secret access require cluster-admin level approval",
      "The `get` verb on Secrets only returns object metadata, not the actual data values"
    ],
    answer: 1,
    explanation: "Granting `get` and `list` on Secrets allows the user to retrieve the full Secret data, including sensitive values like passwords and API keys. Secret data is base64-encoded but not encrypted at the RBAC level. This is a common security concern that should be carefully scoped.\n\nWhy other options are wrong:\n- A: Roles can grant access to Secrets; there is no restriction on this resource type\n- C: RoleBindings referencing Secret access do not require cluster-admin approval\n- D: The get verb on Secrets returns the full object including base64-encoded data values\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i get secrets --as=bob -n finance"
  },
  {
    id: "s05-q016",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "You need to restrict a container to only use capabilities `NET_BIND_SERVICE` and nothing else. Which `securityContext` configuration achieves this?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><text x="200" y="20" text-anchor="middle" fill="#4cc9f0" font-size="12">Capabilities Configuration</text><rect x="20" y="35" width="170" height="65" rx="6" fill="#1a1a2e" stroke="#ff5555" stroke-width="2"/><text x="105" y="55" text-anchor="middle" fill="#ff5555" font-size="11">drop: [?]</text><text x="105" y="75" text-anchor="middle" fill="#6272a4" font-size="9">Which caps to drop?</text><rect x="210" y="35" width="170" height="65" rx="6" fill="#1a1a2e" stroke="#50fa7b" stroke-width="2"/><text x="295" y="55" text-anchor="middle" fill="#50fa7b" font-size="11">add: [?]</text><text x="295" y="80" text-anchor="middle" fill="#6272a4" font-size="9">Which caps to add?</text><rect x="100" y="120" width="200" height="45" rx="6" fill="#16213e" stroke="#f1fa8c" stroke-width="2"/><text x="200" y="140" text-anchor="middle" fill="#f1fa8c" font-size="11">Effective: ?</text><text x="200" y="155" text-anchor="middle" fill="#f8f8f2" font-size="9">???</text><line x1="105" y1="100" x2="175" y2="120" stroke="#ff5555" stroke-width="1.5"/><line x1="295" y1="100" x2="225" y2="120" stroke="#50fa7b" stroke-width="1.5"/></svg>',
    options: [
      "Set `capabilities: { add: [NET_BIND_SERVICE] }` without dropping any others",
      "Set `capabilities: { drop: [ALL], add: [NET_BIND_SERVICE] }` in the spec",
      "Set `privileged: true` and then `capabilities: { drop: [ALL] }` combined",
      "Set `capabilities: { drop: [NET_ADMIN, SYS_ADMIN] }` in the container spec"
    ],
    answer: 1,
    explanation: "To restrict a container to only the `NET_BIND_SERVICE` capability, you must first drop `ALL` capabilities and then add back only `NET_BIND_SERVICE`. Simply adding the capability does not remove the default set. Setting `privileged: true` grants all capabilities regardless of the drop list.\n\nWhy other options are wrong:\n- A: Only adding NET_BIND_SERVICE leaves the default runtime capabilities intact\n- C: Setting privileged: true grants all capabilities regardless of drop list\n- D: Dropping only NET_ADMIN and SYS_ADMIN leaves many other default capabilities active\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.containers[0].securityContext.capabilities}'"
  },
  {
    id: "s05-q017",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A service mesh like Istio or Linkerd automatically provides mutual TLS (mTLS) between services. What security benefit does mTLS provide that standard TLS does not?",
    diagram: null,
    options: [
      "mTLS encrypts traffic using stronger cipher suites than standard TLS",
      "mTLS eliminates the need for network policies between mesh services",
      "mTLS automatically rotates all secrets stored in the etcd data store",
      "mTLS authenticates both client and server, not just the server side"
    ],
    answer: 3,
    explanation: "Mutual TLS requires both parties to present certificates, authenticating both client and server. Standard TLS only authenticates the server to the client. This provides identity verification for service-to-service communication, which is critical in zero-trust architectures.\n\nWhy other options are wrong:\n- A: mTLS uses the same cipher suites as TLS; the difference is in mutual authentication\n- B: mTLS provides identity verification but does not replace network policies for traffic control\n- C: mTLS has no relationship with etcd secrets rotation\n\nReference: https://kubernetes.io/docs/concepts/services-networking/",
    verify: "istioctl proxy-config secret <pod-name> -n <namespace>"
  },
  {
    id: "s05-q018",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "Audit logging is enabled on the kube-apiserver. A security analyst wants to capture which users accessed Secrets without logging the Secret data itself. Which audit level should they configure?",
    diagram: null,
    options: [
      "`None` — disables all audit logging for the matched resource",
      "`Request` — logs the request metadata along with the request body",
      "`Metadata` — logs request metadata without request or response body",
      "`RequestResponse` — logs metadata plus request body and response body"
    ],
    answer: 2,
    explanation: "The `Metadata` audit level records who made the request, what resource was accessed, and the result, but excludes the request and response bodies. This captures user access patterns to Secrets without exposing the Secret data itself in audit logs.\n\nWhy other options are wrong:\n- A: None disables audit logging entirely and captures no information\n- B: Request level logs the request body, which would include Secret data in create/update requests\n- D: RequestResponse logs both request and response bodies, exposing Secret data\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/",
    verify: "kubectl get --raw /apis/audit.k8s.io/v1"
  },
  {
    id: "s05-q019",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You want to grant a ServiceAccount the ability to `get` Pods across all namespaces. Which combination of resources do you need?",
    diagram: '<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="60" y="35" text-anchor="middle" fill="#f8f8f2" font-size="10">Role</text><rect x="10" y="70" width="100" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="60" y="95" text-anchor="middle" fill="#f8f8f2" font-size="10">ClusterRole</text><rect x="170" y="10" width="110" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="225" y="35" text-anchor="middle" fill="#f8f8f2" font-size="10">RoleBinding</text><rect x="170" y="70" width="130" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="235" y="95" text-anchor="middle" fill="#f8f8f2" font-size="9">ClusterRoleBinding</text><rect x="160" y="160" width="120" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="220" y="185" text-anchor="middle" fill="#f8f8f2" font-size="10">ServiceAccount</text><line x1="110" y1="30" x2="170" y2="30" stroke="#4cc9f0" stroke-width="1.5"/><text x="140" y="24" text-anchor="middle" fill="#f1fa8c" font-size="10">?</text><line x1="110" y1="90" x2="170" y2="90" stroke="#4cc9f0" stroke-width="1.5"/><text x="140" y="84" text-anchor="middle" fill="#f1fa8c" font-size="10">?</text><line x1="110" y1="90" x2="170" y2="35" stroke="#4cc9f0" stroke-width="1.5"/><text x="130" y="55" text-anchor="middle" fill="#f1fa8c" font-size="10">?</text><line x1="225" y1="50" x2="220" y2="160" stroke="#4cc9f0" stroke-width="1.5"/><text x="230" y="110" text-anchor="middle" fill="#f1fa8c" font-size="10">?</text><line x1="235" y1="110" x2="220" y2="160" stroke="#4cc9f0" stroke-width="1.5"/><text x="236" y="140" text-anchor="middle" fill="#f1fa8c" font-size="10">?</text><text x="220" y="215" text-anchor="middle" fill="#6272a4" font-size="9">Which combination grants cluster-wide access?</text></svg>',
    options: [
      "A Role and a RoleBinding in each individual namespace",
      "A ClusterRole and a ClusterRoleBinding for the account",
      "A ClusterRole and a RoleBinding in the SA's own namespace",
      "A namespace-scoped Role and a cluster-level RoleBinding"
    ],
    answer: 1,
    explanation: "To grant cluster-wide access, you need a ClusterRole defining the permissions and a ClusterRoleBinding that binds the ClusterRole to the ServiceAccount. A RoleBinding would scope the permissions to a single namespace, and a Role cannot provide cluster-wide access.\n\nWhy other options are wrong:\n- A: Creating Role+RoleBinding per namespace works but is not the most efficient approach for cluster-wide access\n- C: A ClusterRole + RoleBinding scopes permissions to only the RoleBinding's namespace, not all namespaces\n- D: A namespace-scoped Role cannot be referenced by a ClusterRoleBinding\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding",
    verify: "kubectl get clusterrolebinding -o wide | grep <sa-name>"
  },
  {
    id: "s05-q020",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps workflow stores Kubernetes manifests in a Git repository. An engineer commits a Deployment that mounts a Secret as an environment variable. What security concern arises?",
    diagram: null,
    options: [
      "The Secret data may be stored in plaintext within the Git repository history",
      "GitOps controllers are unable to apply Secret resources synced from Git repos",
      "Environment variables are encrypted at rest by Kubernetes engine automatically",
      "Secrets mounted as environment variables are visible only to the init container"
    ],
    answer: 0,
    explanation: "Storing Secret manifests in Git means the base64-encoded (not encrypted) Secret data is visible to anyone with repository access and persists in Git history. Tools like Sealed Secrets or SOPS are recommended to encrypt Secret data before committing to Git.\n\nWhy other options are wrong:\n- B: GitOps controllers can apply Secret resources from Git repositories without issue\n- C: Kubernetes does not encrypt environment variables automatically; Secrets are base64-encoded only\n- D: Secrets mounted as env vars are visible to the main container, not only initContainers\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#risks",
    verify: "git log --all -p -- '*secret*'"
  },
  {
    id: "s05-q021",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The kube-apiserver uses which authentication method to verify requests from the kubelet by default?",
    diagram: null,
    options: [
      "Basic authentication using a username and password pair",
      "Bearer token sourced from a static token file on disk",
      "OIDC tokens obtained from an external identity provider",
      "Client certificate authentication using X.509 certificates"
    ],
    answer: 3,
    explanation: "By default, kubelets authenticate to the API server using client certificates (X.509). The kubelet presents a certificate signed by the cluster CA, and the API server verifies it. Basic auth and static token files are deprecated, and OIDC is typically used for user authentication.\n\nWhy other options are wrong:\n- A: Basic auth is deprecated and not the default kubelet authentication method\n- B: Static token files are deprecated and not used by default for kubelet auth\n- C: OIDC is typically used for human user authentication, not kubelet-to-apiserver communication\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/kubelet-authn-authz/",
    verify: "kubectl config view --raw -o jsonpath='{.users[0].user.client-certificate}'"
  },
  {
    id: "s05-q022",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A default-deny NetworkPolicy is applied to the `secure` namespace. After applying it, existing Pods in the namespace can no longer communicate with each other. Which NetworkPolicy spec creates this default-deny behavior for ingress?",
    diagram: null,
    options: [
      "A policy with `podSelector: {}` and `ingress: [{}]` allowing traffic from all sources",
      "A policy with `podSelector: {}`, `policyTypes: [Ingress]`, and no `ingress` field",
      "A policy with `podSelector: {matchLabels: {deny: all}}` and no ingress rule list",
      "A policy with `podSelector: {}` and `ingress: [{from: []}]` allowing empty source"
    ],
    answer: 1,
    explanation: "A default-deny ingress policy uses an empty `podSelector: {}` to select all Pods in the namespace, specifies `policyTypes: [Ingress]`, and omits the `ingress` field entirely. This means no ingress traffic is allowed to any Pod. Note that `ingress: [{}]` (an array with one empty rule) is very different -- it allows all ingress traffic from all sources.\n\nWhy other options are wrong:\n- A: ingress: [{}] (array with empty object) allows all ingress traffic from all sources\n- C: A podSelector with specific matchLabels only selects Pods with that label, not all Pods\n- D: ingress: [{from: []}] is equivalent to allowing no sources, but the standard default-deny pattern omits ingress entirely\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#default-deny-all-ingress-traffic",
    verify: "kubectl get networkpolicy default-deny -n secure -o yaml"
  },
  {
    id: "s05-q023",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "An attacker gains access to a container and tries to escalate privileges using `setuid` binaries. Which `securityContext` field prevents this?",
    diagram: null,
    options: [
      "The `readOnlyRootFilesystem: true` setting",
      "The `runAsNonRoot: true` security setting",
      "The `privileged: false` container setting",
      "The `allowPrivilegeEscalation: false` setting"
    ],
    answer: 3,
    explanation: "Setting `allowPrivilegeEscalation: false` prevents a process from gaining more privileges than its parent, which blocks `setuid` and `setgid` binaries. `readOnlyRootFilesystem` prevents writes but not privilege escalation. `runAsNonRoot` ensures a non-root UID but does not block setuid.\n\nWhy other options are wrong:\n- A: readOnlyRootFilesystem prevents filesystem writes but does not block setuid privilege escalation\n- B: runAsNonRoot prevents running as root but does not block setuid binaries from escalating\n- C: privileged: false disables privileged mode but a non-privileged container can still use setuid\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/",
    verify: "kubectl get pod <pod> -o jsonpath='{.spec.containers[0].securityContext.allowPrivilegeEscalation}'"
  },
  {
    id: "s05-q024",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Role grants only the `get` verb on Secrets with `resourceNames: [\"db-credentials\"]`. Which statement about this restriction is correct?",
    diagram: null,
    options: [
      "The `list` verb still returns all Secrets that exist in the namespace",
      "The `get` verb can only retrieve the named `db-credentials` Secret",
      "The `resourceNames` field is ignored when applied to Secret resources",
      "The restriction applies to all resource types, not just the named one"
    ],
    answer: 1,
    explanation: "When `resourceNames` is specified, verbs like `get`, `update`, and `delete` are restricted to the named resources. However, `list` and `watch` cannot be effectively restricted by `resourceNames` because they return collections. The `get` verb is properly scoped to only the `db-credentials` Secret.\n\nWhy other options are wrong:\n- A: If the Role grants only get (not list), the list verb is not granted regardless of resourceNames\n- C: resourceNames is a valid field and is enforced on the specified resources\n- D: The restriction applies only to the resources listed in the same rule, not all resource types\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources",
    verify: "kubectl get role -n <ns> -o yaml"
  },
  {
    id: "s05-q025",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "Kubernetes Secrets are base64-encoded by default. An operations team wants to ensure Secrets are encrypted at rest in etcd. What must they configure?",
    diagram: null,
    options: [
      "Enable TLS encryption on the etcd client connection endpoints",
      "Set the `--etcd-encryption=true` flag on the node-level kubelet",
      "Use the `kubectl create secret --encrypt` command-line flag",
      "Configure an `EncryptionConfiguration` on the kube-apiserver"
    ],
    answer: 3,
    explanation: "To encrypt Secrets at rest in etcd, you must create an `EncryptionConfiguration` file specifying encryption providers (like `aescbc`, `secretbox`, or a KMS provider) and pass it to the kube-apiserver via `--encryption-provider-config`. TLS on etcd protects data in transit, not at rest.\n\nWhy other options are wrong:\n- A: TLS on etcd endpoints protects data in transit, not data at rest\n- B: There is no --etcd-encryption flag on the kubelet; encryption is configured on the apiserver\n- C: kubectl create secret does not have an --encrypt flag\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/",
    verify: "ps aux | grep kube-apiserver | grep encryption-provider-config"
  },
  {
    id: "s05-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team creates multiple Roles in the same namespace, each granting different permissions. User `carol` is bound to two of them via separate RoleBindings. How does Kubernetes evaluate her access?",
    diagram: null,
    options: [
      "Permissions from all bound Roles are combined additively together",
      "The most restrictive Role takes precedence over all the others",
      "Only the first RoleBinding created takes effect for user carol",
      "Kubernetes returns an error for conflicting overlapping bindings"
    ],
    answer: 0,
    explanation: "RBAC in Kubernetes is additive. There are no deny rules. All permissions from all Roles bound to a user or ServiceAccount are combined. If any Role grants the permission, the action is allowed. This means multiple RoleBindings expand the user's effective permissions.\n\nWhy other options are wrong:\n- B: RBAC has no deny rules; permissions are additive, not restrictive\n- C: All RoleBindings take effect simultaneously, not just the first created\n- D: Kubernetes does not error on overlapping or multiple bindings\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings",
    verify: "kubectl auth can-i --list --as=carol -n <namespace>"
  },
  {
    id: "s05-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The kube-apiserver flag `--anonymous-auth=true` is set. A request arrives without any authentication credentials. How is it handled?",
    diagram: null,
    options: [
      "The request is rejected with a 401 Unauthorized HTTP response status code",
      "The request is forwarded to an external identity provider for authentication",
      "The request inherits the `default` ServiceAccount permissions in the namespace",
      "The request is processed as `system:anonymous` in `system:unauthenticated`"
    ],
    answer: 3,
    explanation: "When anonymous authentication is enabled, unauthenticated requests are assigned the username `system:anonymous` and the group `system:unauthenticated`. These identities can then be used in RBAC policies. By default, anonymous users have very limited access.\n\nWhy other options are wrong:\n- A: With anonymous-auth enabled, unauthenticated requests are not rejected but processed as system:anonymous\n- B: The request is not forwarded to an external provider; it is handled locally\n- C: Anonymous requests do not inherit the default ServiceAccount permissions\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/authentication/#anonymous-requests",
    verify: "kubectl auth can-i --list --as=system:anonymous"
  },
  {
    id: "s05-q028",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security audit finds that containers in the `analytics` namespace are running with `seccompProfile: Unconfined`. The team wants to enforce the `RuntimeDefault` seccomp profile. Which resource enforces this at the namespace level?",
    diagram: null,
    options: [
      "A `LimitRange` resource that targets container security context settings",
      "Pod Security Admission with the `restricted` profile on the namespace",
      "A `ResourceQuota` configured to limit allowed seccomp profile types",
      "A `MutatingWebhookConfiguration` that patches Pod security context"
    ],
    answer: 1,
    explanation: "The Pod Security Admission controller with the `restricted` profile requires containers to set `seccompProfile.type` to `RuntimeDefault` or `Localhost`. Enforcing this on the namespace rejects Pods that use `Unconfined`. LimitRange and ResourceQuota do not govern security contexts.\n\nWhy other options are wrong:\n- A: LimitRange controls resource limits and defaults, not security context settings\n- C: ResourceQuota manages resource consumption quotas, not seccomp profiles\n- D: A MutatingWebhookConfiguration could enforce this but is not a built-in Kubernetes resource for this purpose\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
    verify: "kubectl label ns analytics pod-security.kubernetes.io/enforce=restricted --overwrite"
  },
  {
    id: "s05-q029",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A NetworkPolicy allows egress only to port 443 from Pods in the `frontend` namespace. A Pod tries to resolve a DNS name before connecting. What happens?",
    diagram: null,
    options: [
      "DNS resolution works because NetworkPolicy does not affect DNS traffic",
      "DNS resolution uses the node's resolver, fully bypassing the egress policy",
      "DNS fails because UDP port 53 is not permitted by the egress rule",
      "The kubelet resolves DNS on behalf of the Pod before the connection"
    ],
    answer: 2,
    explanation: "DNS queries use UDP (and sometimes TCP) port 53. If the egress NetworkPolicy only allows port 443, DNS traffic to CoreDNS is blocked. You must explicitly allow egress to the kube-dns Service on port 53 (UDP and TCP) for DNS resolution to work.\n\nWhy other options are wrong:\n- A: NetworkPolicy does affect DNS traffic; DNS uses UDP/TCP port 53 which must be explicitly allowed\n- B: Pods use CoreDNS via the cluster network, not the node's resolver directly\n- D: The kubelet does not resolve DNS on behalf of Pods; DNS queries go through the Pod's network namespace\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n frontend -o yaml"
  },
  {
    id: "s05-q030",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Open Policy Agent (OPA) Gatekeeper is deployed in a cluster. How does it enforce policies on Kubernetes resources?",
    diagram: '<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="50" width="80" height="40" rx="5" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="50" y="75" text-anchor="middle" fill="#f8f8f2" font-size="10">Request</text><rect x="110" y="50" width="90" height="40" rx="5" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="155" y="75" text-anchor="middle" fill="#f8f8f2" font-size="10">API Server</text><rect x="230" y="30" width="80" height="35" rx="5" fill="#16213e" stroke="#f1fa8c" stroke-width="2"/><text x="270" y="52" text-anchor="middle" fill="#f1fa8c" font-size="9">Gatekeeper</text><rect x="230" y="80" width="80" height="35" rx="5" fill="#16213e" stroke="#bd93f9" stroke-width="1.5"/><text x="270" y="102" text-anchor="middle" fill="#bd93f9" font-size="9">Policy Engine</text><rect x="340" y="35" width="50" height="25" rx="4" fill="#16213e" stroke="#50fa7b" stroke-width="1.5"/><text x="365" y="52" text-anchor="middle" fill="#50fa7b" font-size="9">Allow</text><rect x="340" y="70" width="50" height="25" rx="4" fill="#16213e" stroke="#ff5555" stroke-width="1.5"/><text x="365" y="87" text-anchor="middle" fill="#ff5555" font-size="9">Deny</text><line x1="90" y1="70" x2="110" y2="70" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#a30)"/><line x1="200" y1="65" x2="230" y2="48" stroke="#f1fa8c" stroke-width="1.5" marker-end="url(#a30b)"/><line x1="270" y1="65" x2="270" y2="80" stroke="#bd93f9" stroke-width="1" stroke-dasharray="3,2"/><line x1="310" y1="48" x2="340" y2="48" stroke="#50fa7b" stroke-width="1.5"/><line x1="310" y1="83" x2="340" y2="83" stroke="#ff5555" stroke-width="1.5"/><defs><marker id="a30" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4cc9f0"/></marker><marker id="a30b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f1fa8c"/></marker></defs></svg>',
    options: [
      "It acts as a validating admission webhook evaluating Rego policies",
      "It runs as a sidecar in each Pod to intercept container syscalls",
      "It modifies the kube-apiserver binary to add built-in policy checks",
      "It replaces the RBAC system with attribute-based access control rules"
    ],
    answer: 0,
    explanation: "OPA Gatekeeper registers as a validating admission webhook with the Kubernetes API server. When resources are created or updated, the API server sends the request to Gatekeeper, which evaluates it against Rego policies defined in ConstraintTemplate and Constraint CRDs.\n\nWhy other options are wrong:\n- B: Gatekeeper runs as a centralized admission webhook, not as a sidecar in each Pod\n- C: Gatekeeper does not modify the apiserver binary; it integrates via the webhook mechanism\n- D: Gatekeeper supplements RBAC with policy enforcement; it does not replace RBAC\n\nReference: https://open-policy-agent.github.io/gatekeeper/website/docs/",
    verify: "kubectl get validatingwebhookconfigurations | grep gatekeeper"
  },
  {
    id: "s05-q031",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Pod spec sets `serviceAccountName: custom-sa`. The ServiceAccount `custom-sa` does not exist in the namespace. What happens when the Pod is created?",
    diagram: null,
    options: [
      "The Pod is created with the `default` ServiceAccount as a fallback",
      "The Pod is created but remains in `Pending` until the SA is created",
      "The kubelet creates the missing ServiceAccount resource automatically",
      "The API server rejects the Pod creation request with a clear error"
    ],
    answer: 3,
    explanation: "If the referenced ServiceAccount does not exist in the namespace, the API server rejects the Pod creation with an error indicating the ServiceAccount was not found. There is no fallback to the `default` ServiceAccount, and the kubelet does not create ServiceAccounts.\n\nWhy other options are wrong:\n- A: There is no fallback to the default ServiceAccount when a named SA is missing\n- B: The Pod is not created at all; the API server rejects the request immediately\n- C: The kubelet does not create ServiceAccount resources automatically\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/",
    verify: "kubectl run test --image=nginx --overrides='{\"spec\":{\"serviceAccountName\":\"nonexistent\"}}' --dry-run=server"
  },
  {
    id: "s05-q032",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You create an aggregated ClusterRole with the label selector `rbac.authorization.k8s.io/aggregate-to-admin: \"true\"`. What effect does this have?",
    diagram: null,
    options: [
      "Matching ClusterRole rules are automatically merged into the `admin` ClusterRole",
      "It creates a new ClusterRole definition that overrides the built-in `admin` role",
      "It grants admin-level permissions to all ServiceAccounts in every namespace",
      "It merges the matching ClusterRole rules into the `cluster-admin` built-in role"
    ],
    answer: 0,
    explanation: "Kubernetes uses ClusterRole aggregation to automatically combine rules from ClusterRoles matching specific label selectors into an aggregated ClusterRole. The built-in `admin`, `edit`, and `view` ClusterRoles use this mechanism to allow extensions to add their permissions to these default roles.\n\nWhy other options are wrong:\n- B: It does not override the admin role; rules are merged additively\n- C: It does not grant permissions to ServiceAccounts; it extends the admin ClusterRole definition\n- D: The label aggregate-to-admin merges into admin, not cluster-admin\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#aggregated-clusterroles",
    verify: "kubectl get clusterrole admin -o yaml | grep aggregation"
  },
  {
    id: "s05-q033",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A security team sets up alerts for failed authentication attempts to the Kubernetes API server. Which metric from the apiserver exposes this information?",
    diagram: null,
    options: [
      "`apiserver_request_total` filtered with the HTTP code label `401`",
      "`apiserver_audit_event_total` filtered with the stage label `ResponseComplete`",
      "`etcd_request_failed_total` tracking failed etcd store operations",
      "`scheduler_binding_errors_total` tracking Pod scheduling errors"
    ],
    answer: 0,
    explanation: "The `apiserver_request_total` metric tracks all API server requests and includes a `code` label indicating the HTTP status code. Filtering for code `401` identifies failed authentication attempts. The other metrics track kubelet, etcd, or scheduler operations, not API authentication.\n\nWhy other options are wrong:\n- B: apiserver_audit_event_total tracks audit events, not authentication failures specifically\n- C: etcd_request_failed_total tracks etcd operation failures, not auth failures\n- D: scheduler_binding_errors_total tracks scheduling errors, not authentication failures\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: "kubectl get --raw /metrics | grep apiserver_request_total"
  },
  {
    id: "s05-q034",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An organization implements the principle of least privilege for their Kubernetes workloads. Which practice best exemplifies this principle?",
    diagram: null,
    options: [
      "Granting `cluster-admin` to all developers for convenient broad access",
      "Using a single shared ServiceAccount for all Pods across the cluster",
      "Creating namespace-scoped Roles with only the specific verbs needed",
      "Disabling RBAC and using ABAC for simpler overall policy management"
    ],
    answer: 2,
    explanation: "Least privilege means granting only the minimum permissions required to perform a task. Creating namespace-scoped Roles with specific verbs and resources for each workload prevents unnecessary access. Cluster-admin and shared ServiceAccounts violate this principle.\n\nWhy other options are wrong:\n- A: cluster-admin grants excessive permissions and violates least privilege\n- B: A shared ServiceAccount means all Pods have the same permissions, violating least privilege\n- D: Disabling RBAC removes fine-grained access control entirely\n\nReference: https://kubernetes.io/docs/concepts/security/rbac-good-practices/",
    verify: "kubectl get roles -A -o wide"
  },
  {
    id: "s05-q035",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A container image is pulled from a private registry that requires authentication. Where should the image pull credentials be configured in Kubernetes?",
    diagram: null,
    options: [
      "In a ConfigMap referenced by `imagePullConfigMap` in the Pod specification",
      "In the kubelet configuration file present on each individual worker node",
      "In the container runtime config file under `/etc/containerd/creds.json`",
      "In a `kubernetes.io/dockerconfigjson` Secret via `imagePullSecrets` field"
    ],
    answer: 3,
    explanation: "Kubernetes uses Secrets of type `kubernetes.io/dockerconfigjson` to store registry credentials. These are referenced in the Pod spec via `imagePullSecrets` or can be linked to a ServiceAccount. While kubelet and runtime configs can also hold credentials, the Kubernetes-native approach is through Secrets.\n\nWhy other options are wrong:\n- A: There is no imagePullConfigMap field; ConfigMaps are not used for registry credentials\n- B: Kubelet config can hold credentials but is not the Kubernetes-native approach\n- C: Container runtime config files are node-level and not managed via Kubernetes resources\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/",
    verify: "kubectl get secret regcred -o jsonpath='{.type}'"
  },
  {
    id: "s05-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A NetworkPolicy in the `database` namespace allows ingress only from Pods with label `role: backend` in the same namespace. A Pod in a different namespace with the same label tries to connect. Is it allowed?",
    diagram: '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="180" height="90" rx="8" fill="#1a1a2e" stroke="#4cc9f0" stroke-width="2"/><text x="100" y="14" text-anchor="middle" fill="#4cc9f0" font-size="11">ns: database</text><rect x="30" y="45" width="140" height="35" rx="5" fill="#16213e" stroke="#f72585" stroke-width="1.5"/><text x="100" y="67" text-anchor="middle" fill="#f8f8f2" font-size="10">role: db (target)</text><rect x="10" y="130" width="180" height="80" rx="8" fill="#1a1a2e" stroke="#4cc9f0" stroke-width="2"/><text x="100" y="125" text-anchor="middle" fill="#4cc9f0" font-size="11">ns: database</text><rect x="30" y="150" width="140" height="35" rx="5" fill="#16213e" stroke="#bd93f9" stroke-width="1.5"/><text x="100" y="172" text-anchor="middle" fill="#f8f8f2" font-size="10">role: backend</text><rect x="220" y="130" width="170" height="80" rx="8" fill="#1a1a2e" stroke="#4cc9f0" stroke-width="2"/><text x="305" y="125" text-anchor="middle" fill="#4cc9f0" font-size="11">ns: other</text><rect x="240" y="150" width="130" height="35" rx="5" fill="#16213e" stroke="#bd93f9" stroke-width="1.5"/><text x="305" y="172" text-anchor="middle" fill="#f8f8f2" font-size="10">role: backend</text><line x1="100" y1="150" x2="100" y2="80" stroke="#bd93f9" stroke-width="2" marker-end="url(#arr2)"/><line x1="305" y1="150" x2="130" y2="80" stroke="#bd93f9" stroke-width="2" marker-end="url(#arr3)"/><text x="260" y="108" fill="#f1fa8c" font-size="10">?</text><text x="70" y="118" fill="#f1fa8c" font-size="10">?</text><defs><marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#bd93f9"/></marker><marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#bd93f9"/></marker></defs></svg>',
    options: [
      "No, because `podSelector` only matches Pods in the policy's namespace",
      "Yes, because the Pod label matches regardless of the source `namespace`",
      "Yes, if the originating namespace has exactly the same namespace name",
      "No, because `NetworkPolicy` resources block all cross-namespace traffic"
    ],
    answer: 0,
    explanation: "A `podSelector` in a NetworkPolicy ingress rule only matches Pods within the same namespace as the policy. To allow traffic from a different namespace, you must add a `namespaceSelector` in the `from` block. Without it, only Pods in the `database` namespace with the matching label are permitted.\n\nWhy other options are wrong:\n- B: A podSelector alone only matches Pods in the policy's own namespace, not other namespaces\n- C: Namespace name matching is irrelevant; podSelector does not cross namespace boundaries\n- D: NetworkPolicies do not blanket-block cross-namespace traffic; they require proper selectors\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#behavior-of-to-and-from-selectors",
    verify: "kubectl describe networkpolicy -n database"
  },
  {
    id: "s05-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A security-sensitive workload requires that its Pods only run on nodes with an encrypted filesystem. The nodes are labeled `disk-encryption: enabled`. Which mechanism ensures the Pods are scheduled only on these nodes?",
    diagram: null,
    options: [
      "A `nodeSelector` with `disk-encryption: enabled` on the Pod spec to match nodes",
      "A Pod affinity rule that prefers co-location with `disk-encryption: enabled` Pods",
      "A taint `disk-encryption=enabled:NoSchedule` applied to the eligible worker nodes",
      "A PriorityClass with a high priority value assigned to the sensitive workload Pod"
    ],
    answer: 0,
    explanation: "Using `nodeSelector` with `disk-encryption: enabled` ensures the scheduler only places the Pod on nodes with that label. Pod affinity rules match based on other Pods, not node labels. Taints repel Pods unless they have matching tolerations, which is the inverse approach.\n\nWhy other options are wrong:\n- B: Pod affinity matches based on Pod labels on nodes, not node labels for hardware features\n- C: Taints repel Pods that lack tolerations; they do not attract specific workloads to nodes\n- D: PriorityClass affects preemption priority, not node selection\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector",
    verify: "kubectl get pods -o wide --field-selector spec.nodeName=<node>"
  },
  {
    id: "s05-q038",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart for a microservice includes a Secret template. A developer stores the chart in a public Helm repository. What security concern should be addressed?",
    diagram: null,
    options: [
      "Helm automatically encrypts all Secret values embedded in the chart package",
      "Helm charts in public repositories require signed TLS certificates to install",
      "The default values file may contain sensitive data visible to anyone with access",
      "Public Helm repositories enforce RBAC-based access control on chart downloads"
    ],
    answer: 2,
    explanation: "Helm values files included in the chart are plaintext and visible to anyone who can access the repository. If default values contain passwords or tokens, they are exposed. Sensitive values should be overridden at install time or managed with tools like Helm Secrets plugin.\n\nWhy other options are wrong:\n- A: Helm does not automatically encrypt Secret values in chart packages\n- B: Public Helm repositories do not require signed TLS certificates to install charts\n- D: Public Helm repositories do not enforce RBAC; anyone with network access can download charts\n\nReference: https://helm.sh/docs/chart_best_practices/values/",
    verify: "helm show values <chart> | grep -i secret"
  },
  {
    id: "s05-q039",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A team uses gVisor (runsc) as the container runtime for their sensitive workloads. What security benefit does gVisor provide compared to the default runc runtime?",
    diagram: null,
    options: [
      "gVisor provides hardware-level isolation using dedicated physical CPU cores",
      "gVisor intercepts syscalls in user-space, reducing host kernel attack surface",
      "gVisor encrypts all container filesystem data at rest using built-in keys",
      "gVisor eliminates the need for Linux namespaces and cgroups for isolation"
    ],
    answer: 1,
    explanation: "gVisor provides an additional layer of isolation by implementing a user-space kernel (Sentry) that intercepts and handles system calls from containers. This reduces the attack surface of the host kernel, as containers do not directly interact with it. It still uses namespaces and cgroups for resource isolation.\n\nWhy other options are wrong:\n- A: gVisor does not use dedicated physical CPU cores; it runs in user space\n- C: gVisor does not encrypt container filesystem data at rest\n- D: gVisor still uses Linux namespaces and cgroups alongside its user-space kernel\n\nReference: https://gvisor.dev/docs/",
    verify: "kubectl get runtimeclass"
  },
  {
    id: "s05-q040",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A ClusterRole has a rule with `apiGroups: [\"\"]` and `resources: [\"pods/exec\"]`. A ClusterRoleBinding binds it to user `dave`. What can Dave do?",
    diagram: null,
    options: [
      "Execute commands inside any Pod in any namespace via exec",
      "Execute commands only in Pods that he originally created",
      "View Pod execution logs across the entire cluster scope",
      "Create Pods but not execute commands inside existing containers"
    ],
    answer: 0,
    explanation: "The `pods/exec` subresource controls access to `kubectl exec` functionality. A ClusterRoleBinding with this permission grants Dave the ability to exec into any Pod in any namespace. This is a highly privileged permission that should be carefully restricted.\n\nWhy other options are wrong:\n- B: pods/exec access is not restricted to self-created Pods; it applies to all Pods\n- C: pods/exec grants exec access, not log viewing (that would be pods/log)\n- D: The rule grants exec access specifically via pods/exec, not Pod creation which requires the `create` verb on `pods`\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources",
    verify: "kubectl auth can-i create pods/exec --as=dave --all-namespaces"
  },
  {
    id: "s05-q041",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A security incident response requires tracing the origin of an API call that deleted a critical ConfigMap. Which Kubernetes feature helps reconstruct the sequence of events?",
    diagram: null,
    options: [
      "Kubernetes audit logs with the `RequestResponse` audit level",
      "Container `stdout` and `stderr` logs from the affected Pod output",
      "Prometheus time-series metrics tracking ConfigMap operations",
      "Distributed tracing spans captured from the running application"
    ],
    answer: 0,
    explanation: "Kubernetes audit logs record details about API requests including the user, timestamp, resource, verb, and response status. The `RequestResponse` level captures the full request and response bodies. This provides the forensic data needed to trace who deleted the ConfigMap and when.\n\nWhy other options are wrong:\n- B: Container logs capture application output, not API server request details\n- C: Prometheus metrics track counters and gauges, not individual API call details with user identity\n- D: Distributed tracing spans track application request flows, not Kubernetes API operations\n\nReference: https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/",
    verify: "kubectl logs -n kube-system kube-apiserver-<node> | grep configmap"
  },
  {
    id: "s05-q042",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A CronJob is configured to run a backup script that requires access to the Kubernetes API. The CronJob's Pod template specifies `serviceAccountName: backup-sa`. When does the projected token for `backup-sa` expire by default?",
    diagram: null,
    options: [
      "After the Pod completes and is garbage collected by the system",
      "After 1 hour, the default projected token expiration time",
      "After 90 minutes, matching the projected token rotation cycle",
      "After 24 hours following the initial token issuance time"
    ],
    answer: 1,
    explanation: "In Kubernetes 1.21+, the default projected ServiceAccount token has a lifetime of approximately 1 hour (3600 seconds) and is automatically rotated by the kubelet before expiration. This is a significant security improvement over the legacy non-expiring tokens. The token is also bound to the Pod and audience-scoped.\n\nWhy other options are wrong:\n- A: Token expiration is time-based (approximately 1 hour), not tied to Pod lifecycle or garbage collection\n- C: The default projected token lifetime is approximately 1 hour (3600s), not 90 minutes\n- D: The default is approximately 1 hour (3600s), not 24 hours\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/#bound-service-account-tokens",
    verify: "kubectl get pod <pod> -o jsonpath='{.spec.volumes[*].projected.sources[*].serviceAccountToken.expirationSeconds}'"
  },
  {
    id: "s05-q043",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "In a microservices architecture, each service has its own database. How does this design pattern enhance security compared to a shared database?",
    diagram: null,
    options: [
      "Individual databases use inherently stronger encryption algorithms",
      "Shared databases are harder to secure because every service needs broad access",
      "A breach in one service's database does not expose other services' data",
      "Individual databases reduce the number of network connections that must be monitored"
    ],
    answer: 2,
    explanation: "The database-per-service pattern limits the blast radius of a security breach. If an attacker compromises one service, they only access that service's data. With a shared database, compromising any service could expose data from all services.\n\nWhy other options are wrong:\n- A: Database encryption strength is independent of whether the database is shared or per-service\n- B: Shared databases can be secured with network policies and access controls; the concern is blast radius, not securability\n- D: Per-service databases actually increase the total number of connections to monitor; the security benefit is blast-radius reduction, not fewer connections\n\nReference: https://kubernetes.io/docs/concepts/security/overview/",
    verify: null
  },
  {
    id: "s05-q044",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Role grants `watch` on `secrets` in the `monitoring` namespace. A RoleBinding binds it to ServiceAccount `prometheus`. What can Prometheus do with this permission?",
    diagram: null,
    options: [
      "Receive a stream of Secret objects including full data as changes occur",
      "Only receive notifications when Secrets change, not their actual data values",
      "List all Secrets once at startup but only receive metadata in subsequent updates",
      "Read Secret metadata only, without access to the encoded data values"
    ],
    answer: 0,
    explanation: "The `watch` verb allows establishing a long-lived connection that streams updates for the resource. For Secrets, this includes the full Secret data (base64-encoded values) in the watch events. This is functionally equivalent to reading Secrets continuously and should be granted with the same caution as `get` and `list`.\n\nWhy other options are wrong:\n- B: Watch events include the full Secret object data, not just change notifications\n- C: Watch is a streaming verb that continuously receives full updates, not just metadata\n- D: Watch events include the full Secret object, not just metadata; there is no metadata-only watch mode\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i watch secrets --as=system:serviceaccount:monitoring:prometheus -n monitoring"
  },
  {
    id: "s05-q045",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "A Pod mounts a Secret as a volume at `/etc/creds`. The Secret is updated via `kubectl edit secret`. When does the Pod see the updated values?",
    diagram: null,
    options: [
      "Immediately, because the volume is directly backed by the API server",
      "Only after the Pod is manually restarted by an administrator or tool",
      "After the kubelet sync period, which is up to a few minutes by default",
      "After the Secret is deleted and recreated as a new resource in the namespace"
    ],
    answer: 2,
    explanation: "When a Secret is mounted as a volume, the kubelet periodically syncs the mounted content with the API server. The update delay depends on the kubelet's sync period and cache propagation delay, typically up to a couple of minutes. Secrets mounted as environment variables require a Pod restart.\n\nWhy other options are wrong:\n- A: Updates are not immediate; there is a kubelet sync delay\n- B: Volume-mounted Secrets update without Pod restart (unlike env var-mounted Secrets)\n- D: Deleting and recreating is unnecessary; the kubelet picks up changes to the existing Secret automatically\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-files-from-a-pod",
    verify: "kubectl exec <pod> -- cat /etc/creds/<key>"
  },
  {
    id: "s05-q046",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "An etcd cluster used by Kubernetes stores all cluster state. Which security measure protects etcd communication between peers?",
    diagram: null,
    options: [
      "RBAC policies applied to etcd API endpoints for access restriction",
      "Peer TLS certificates for mutual authentication between etcd members",
      "IPsec tunnels established by the CNI plugin between cluster members",
      "Kubernetes NetworkPolicies configured to target the etcd Pod traffic"
    ],
    answer: 1,
    explanation: "Etcd peers communicate using mutual TLS (mTLS) with peer certificates. Each etcd member presents a certificate signed by a trusted CA, and peers verify each other's identity. This prevents unauthorized nodes from joining the etcd cluster and encrypts data in transit between members.\n\nWhy other options are wrong:\n- A: RBAC policies are a Kubernetes concept; etcd uses its own auth mechanisms and TLS\n- C: IPsec tunnels from the CNI plugin are for Pod networking, not etcd peer communication\n- D: Kubernetes NetworkPolicies apply to Pod traffic, not etcd daemon communication\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#securing-etcd-clusters",
    verify: "kubectl -n kube-system get pod etcd-<node> -o yaml | grep peer"
  },
  {
    id: "s05-q047",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline uses a Kubernetes ServiceAccount token to deploy workloads. The token is stored as a pipeline variable. Which improvement reduces the risk if the token is compromised?",
    diagram: null,
    options: [
      "Use short-lived tokens from `kubectl create token` with limited expiration",
      "Store the token in a ConfigMap instead of using a pipeline secret variable",
      "Grant the ServiceAccount `cluster-admin` to simplify permission management",
      "Use a long-lived token to reduce the frequency of credential rotation"
    ],
    answer: 0,
    explanation: "Short-lived tokens created via `kubectl create token` expire after a configurable duration, limiting the window of exposure if compromised. Long-lived tokens remain valid indefinitely, ConfigMaps are not encrypted, and `cluster-admin` violates least privilege.\n\nWhy other options are wrong:\n- B: ConfigMaps are not encrypted and are worse than pipeline secret variables for storing tokens\n- C: cluster-admin violates least privilege and increases the impact of a token compromise\n- D: Long-lived tokens increase the window of exposure when compromised\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/#token-requests",
    verify: "kubectl create token deploy-sa --duration=1h"
  },
  {
    id: "s05-q048",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "You need to allow a user read-only access to resources across all namespaces without any modification rights. Which built-in ClusterRole is appropriate?",
    diagram: null,
    options: [
      "`admin` — grants read-only and write access within a namespace",
      "`edit` — grants read-write access without role management",
      "`view` — grants read-only access to most resources",
      "`cluster-admin` — grants unrestricted cluster-wide access"
    ],
    answer: 2,
    explanation: "The built-in `view` ClusterRole grants read-only access to most resources in a namespace. When bound via a ClusterRoleBinding, it allows viewing resources across all namespaces. The `admin` and `edit` roles grant modification permissions, and `cluster-admin` grants full access.\n\nWhy other options are wrong:\n- A: admin grants read and write access, exceeding the read-only requirement\n- B: edit allows modification of resources, exceeding the read-only requirement\n- D: cluster-admin grants full unrestricted access, far exceeding what is needed\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles",
    verify: "kubectl describe clusterrole view"
  },
  {
    id: "s05-q049",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud native application uses short-lived, immutable containers. How does immutability improve security?",
    diagram: null,
    options: [
      "Immutable containers run faster than mutable ones, reducing exposure time",
      "Immutable containers automatically encrypt their underlying filesystems",
      "Attackers cannot install persistent backdoors since changes are lost on restart",
      "Immutable containers do not need RBAC policies for access control purposes"
    ],
    answer: 2,
    explanation: "Immutable containers prevent runtime modifications from persisting. If an attacker gains access and installs malware or a backdoor, the changes are lost when the container restarts. Combined with `readOnlyRootFilesystem`, this significantly reduces the persistence of attacks.\n\nWhy other options are wrong:\n- A: Immutability does not inherently make containers run faster\n- B: Immutability does not encrypt filesystems; it prevents persistent modifications\n- D: Immutable containers still need RBAC for API access control\n\nReference: https://kubernetes.io/docs/concepts/security/overview/",
    verify: null
  },
  {
    id: "s05-q050",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod with `runAsUser: 1000` fails to start because the application cannot bind to port 80. The container's `securityContext` has `capabilities: { drop: [ALL] }`. What is the most secure fix?",
    diagram: null,
    options: [
      "Set `privileged: true` on the container to grant all capabilities",
      "Add `NET_BIND_SERVICE` to `capabilities.add` and keep dropping all",
      "Change `runAsUser` to `0` to allow the process to run as root user",
      "Remove the `capabilities` block entirely from the security context"
    ],
    answer: 1,
    explanation: "Binding to ports below 1024 requires the `NET_BIND_SERVICE` capability. The most secure fix is to add only this specific capability while keeping `drop: [ALL]`. Running as root or privileged mode grants far more permissions than needed, and removing the capabilities block restores defaults.\n\nWhy other options are wrong:\n- A: privileged: true grants all capabilities, far exceeding the minimum needed\n- C: Running as root is overly permissive and unnecessary for port binding\n- D: Removing the capabilities block restores default capabilities but grants more than needed\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container",
    verify: "kubectl get pod <pod> -o jsonpath='{.spec.containers[0].securityContext.capabilities}'"
  },
  {
    id: "s05-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A developer attempts to create a RoleBinding in the `staging` namespace that references a ClusterRole granting `delete` on `nodes`. The developer only has `admin` access to the `staging` namespace. What happens?",
    diagram: null,
    options: [
      "The RoleBinding is created and grants node deletion permissions within the `staging` namespace",
      "The request is denied because the developer cannot escalate beyond their existing permissions",
      "The RoleBinding is created but the `delete nodes` permission is silently ignored by the API",
      "The API server automatically downgrades the referenced ClusterRole to a namespace-scoped Role"
    ],
    answer: 1,
    explanation: "Kubernetes RBAC prevents privilege escalation by default. A user can only create RoleBindings that grant permissions they already possess. Since the developer does not have `delete` on `nodes`, the API server rejects the RoleBinding creation. This is enforced by the RBAC escalation prevention mechanism. Additionally, nodes are cluster-scoped resources, and a namespace-scoped RoleBinding cannot effectively grant permissions on cluster-scoped resources.\n\nWhy other options are wrong:\n- A: Nodes are cluster-scoped; a namespace RoleBinding cannot effectively grant node permissions, and escalation prevention blocks this\n- C: Permissions are not silently ignored; the API server actively rejects the escalation attempt\n- D: The API server does not downgrade ClusterRoles to namespace-scoped Roles\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#privilege-escalation-prevention-and-bootstrapping",
    verify: "kubectl auth can-i create rolebindings --as=developer -n staging"
  },
  {
    id: "s05-q052",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The kube-apiserver is configured with multiple authentication methods: client certificates, bearer tokens, and OIDC. In which order does the API server evaluate these authenticators?",
    diagram: null,
    options: [
      "In a fixed order: certificates first, then bearer tokens, then OIDC",
      "The evaluation order is randomized differently for each request",
      "All configured authenticators are tried; the first success is used",
      "Each authenticator is assigned to specific API groups and evaluated per-group"
    ],
    answer: 2,
    explanation: "The Kubernetes API server evaluates all configured authentication plugins for each request. The first authenticator that successfully validates the credentials determines the identity. If none succeed, the request is rejected with 401. Multiple authenticators can coexist to support different client types.\n\nWhy other options are wrong:\n- A: While authenticators are evaluated in a deterministic order based on configuration, there is no single canonical sequence; the key behavior is that all are tried and the first success wins\n- B: The order is not randomized; authenticators are tried in a deterministic, configuration-dependent order\n- D: Authenticators are not scoped to API groups; they operate cluster-wide on every request\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/authentication/",
    verify: "kubectl get pods -n kube-system kube-apiserver-<node> -o yaml | grep auth"
  },
  {
    id: "s05-q053",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A Pod runs with `securityContext.runAsUser: 1000` at the pod level, but one of its containers specifies `securityContext.runAsUser: 2000`. Which UID does that container use?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="340" height="180" rx="10" fill="#1a1a2e" stroke="#4cc9f0" stroke-width="2"/><text x="200" y="35" text-anchor="middle" fill="#4cc9f0" font-size="12">Pod securityContext</text><text x="200" y="55" text-anchor="middle" fill="#f8f8f2" font-size="11">runAsUser: 1000</text><rect x="50" y="75" width="130" height="100" rx="6" fill="#16213e" stroke="#50fa7b" stroke-width="1.5"/><text x="115" y="100" text-anchor="middle" fill="#50fa7b" font-size="11">Container A</text><text x="115" y="120" text-anchor="middle" fill="#f8f8f2" font-size="10">container-level override</text><text x="115" y="155" text-anchor="middle" fill="#f1fa8c" font-size="11">UID = ?</text><rect x="220" y="75" width="130" height="100" rx="6" fill="#16213e" stroke="#ff79c6" stroke-width="1.5"/><text x="285" y="100" text-anchor="middle" fill="#ff79c6" font-size="11">Container B</text><text x="285" y="120" text-anchor="middle" fill="#f8f8f2" font-size="10">(no override)</text><text x="285" y="155" text-anchor="middle" fill="#f1fa8c" font-size="11">UID = ?</text></svg>',
    options: [
      "UID 1000, because pod-level settings take precedence over container-level settings",
      "UID 2000, because container-level settings override pod-level settings",
      "An error occurs due to conflicting UID specifications in the Pod spec",
      "The container runtime selects the UID based on what the image specifies"
    ],
    answer: 1,
    explanation: "Container-level `securityContext` settings override pod-level settings. The container with `runAsUser: 2000` runs as UID 2000, while other containers without a container-level override inherit the pod-level UID 1000. This allows fine-grained control per container.\n\nWhy other options are wrong:\n- A: Pod-level settings are defaults, not overrides; container-level takes precedence\n- C: Conflicting UIDs between pod and container levels are valid and do not cause errors\n- D: When a container-level runAsUser is set, the image's USER directive is overridden\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod",
    verify: "kubectl exec <pod> -c <container> -- id"
  },
  {
    id: "s05-q054",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A NetworkPolicy selects Pods using `podSelector: {matchLabels: {app: db}}` and specifies both `Ingress` and `Egress` in `policyTypes` with explicit ingress rules but no egress rules. What egress behavior applies to the selected Pods?",
    diagram: null,
    options: [
      "All egress is denied because `Egress` is in `policyTypes` with no rules defined",
      "All egress traffic is allowed because no explicit `egress` rules were specified",
      "Egress is unaffected because only `ingress` rules were defined in this policy",
      "Egress defaults to whatever the namespace-level default network policy allows"
    ],
    answer: 0,
    explanation: "When `Egress` is listed in `policyTypes` but no egress rules are provided, all egress traffic from the selected Pods is denied. The `policyTypes` field explicitly declares which directions the policy governs. Including `Egress` without rules creates a default-deny for egress on the selected Pods.\n\nWhy other options are wrong:\n- B: Egress is not allowed when Egress is explicitly listed in policyTypes with no rules\n- C: Listing Egress in policyTypes means egress IS governed by this policy, so it is affected\n- D: There is no namespace-level default policy inheritance mechanism for NetworkPolicies\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -o yaml | grep -A5 policyTypes"
  },
  {
    id: "s05-q055",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team uses Sealed Secrets (Bitnami) to manage Secrets in their GitOps repository. How does Sealed Secrets protect Secret data?",
    diagram: null,
    options: [
      "It stores Secret data in a separate encrypted Git branch for secure access",
      "It replaces Kubernetes Secrets with references to an external vault service",
      "It base64-encodes Secret data twice for an additional layer of security",
      "It encrypts data with a public key; only the in-cluster controller decrypts"
    ],
    answer: 3,
    explanation: "Sealed Secrets uses asymmetric encryption. Developers encrypt Secrets using the public key (available to anyone), producing a SealedSecret custom resource safe to commit to Git. Only the Sealed Secrets controller running in the cluster holds the private key to decrypt and create the actual Secret.\n\nWhy other options are wrong:\n- A: Sealed Secrets does not use encrypted Git branches; it uses CRDs in the same branch\n- B: Sealed Secrets creates actual Kubernetes Secrets in-cluster, not external vault references\n- C: Double base64 encoding provides no security benefit; Sealed Secrets uses asymmetric encryption\n\nReference: https://github.com/bitnami-labs/sealed-secrets",
    verify: "kubectl get sealedsecrets -A"
  },
  {
    id: "s05-q056",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform team wants to detect when a Pod is running as root in production namespaces. Which approach enables automated detection?",
    diagram: null,
    options: [
      "Review `kubectl get pods -o yaml` output manually each day for root usage",
      "Configure a Prometheus alert rule on `kube_pod_container_status_running` labels",
      "Use an OPA Gatekeeper constraint that audits existing Pods running as root",
      "Enable verbose logging on the kubelet process to capture security context data"
    ],
    answer: 2,
    explanation: "OPA Gatekeeper supports an audit mode that periodically evaluates existing resources against constraints. A constraint requiring `runAsNonRoot: true` would flag Pods currently running as root. Prometheus metrics do not expose security context details directly.\n\nWhy other options are wrong:\n- A: Manual daily review is not automated detection\n- B: kube_pod_container_status_running does not expose security context details like runAsUser\n- D: Verbose kubelet logging is not a structured or automated detection mechanism\n\nReference: https://open-policy-agent.github.io/gatekeeper/website/docs/audit/",
    verify: "kubectl get constraints -o yaml"
  },
  {
    id: "s05-q057",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A StatefulSet runs a database that stores encryption keys in a projected volume combining a Secret and a ConfigMap. If the Secret is deleted while the Pod is running, what happens to the mounted data?",
    diagram: null,
    options: [
      "The mounted Secret files immediately disappear from the running container's filesystem",
      "The Pod is immediately terminated by the kubelet because the Secret reference is invalid",
      "The projected volume controller detects the deletion and recreates the Secret automatically",
      "Existing mounted data remains temporarily; the kubelet logs errors on the next sync attempt"
    ],
    answer: 3,
    explanation: "When a Secret referenced by a projected volume is deleted, the kubelet will fail to refresh the volume on its next sync cycle. The existing mounted data remains temporarily, but the kubelet eventually triggers an error and the Pod may fail or the volume becomes stale.\n\nWhy other options are wrong:\n- A: Mounted files do not immediately disappear; the kubelet uses cached data temporarily\n- B: The Pod is not immediately terminated; the kubelet logs errors but does not kill the Pod right away\n- C: There is no projected volume controller that recreates deleted Secrets\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/",
    verify: "kubectl describe pod <pod> | grep -A5 Volumes"
  },
  {
    id: "s05-q058",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Role has two rules: one grants `get` on `pods` and another grants `create` on `pods/exec`. What effective permissions does a user bound to this Role have?",
    diagram: null,
    options: [
      "The user can only view Pods because `pods/exec` requires write access",
      "The two rules conflict with each other and neither one takes effect",
      "The user can execute commands inside Pods but cannot view Pod details",
      "The user can view Pods and also execute commands inside them directly"
    ],
    answer: 3,
    explanation: "RBAC rules are additive. The user gets `get` on `pods` (view Pod details) and `create` on `pods/exec` (execute commands inside Pods). These are independent permissions that combine. The `pods/exec` subresource requires `create` verb to initiate an exec session.\n\nWhy other options are wrong:\n- A: pods/exec requires the create verb (which is granted), so exec is possible\n- B: RBAC rules are additive and do not conflict with each other\n- C: The user has get on pods, so they can view Pod details in addition to exec\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i create pods/exec --as=<user> -n <namespace>"
  },
  {
    id: "s05-q059",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security policy requires that all containers use image digests instead of tags. Why is this practice recommended?",
    diagram: null,
    options: [
      "Tags are mutable and can be repointed to a different image; digests are immutable",
      "Digests download significantly faster than tags when pulling from registries",
      "Digests enable automatic vulnerability scanning during the image pull phase",
      "Digests are required by default admission controllers and tags are being deprecated"
    ],
    answer: 0,
    explanation: "Image tags are mutable references that can be updated to point to a different image. An attacker could push a malicious image with the same tag. Digests (SHA256 hashes) are immutable and uniquely identify a specific image layer, ensuring you always get the exact image you expect.\n\nWhy other options are wrong:\n- B: Digests do not download faster than tags; pull speed depends on image size and network\n- C: Digests do not enable vulnerability scanning; scanning is a separate process\n- D: Tags are fully supported and not being deprecated; admission controllers can enforce digests but do not require them by default\n\nReference: https://kubernetes.io/docs/concepts/containers/images/",
    verify: "kubectl get pod <pod> -o jsonpath='{.status.containerStatuses[0].imageID}'"
  },
  {
    id: "s05-q060",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "An API gateway sits in front of multiple microservices and handles authentication. What security risk does this centralized pattern introduce?",
    diagram: null,
    options: [
      "Each microservice must implement its own TLS termination at the service level",
      "If the gateway is compromised, all backend services are accessible unauthenticated",
      "Microservices behind the gateway are unable to use service mesh capabilities",
      "The gateway adds latency that offsets the security benefits of centralized auth"
    ],
    answer: 1,
    explanation: "Centralizing authentication at the gateway creates a single point of failure. If the gateway is compromised or bypassed, backend services that trust the gateway without performing their own verification are exposed. Defense in depth recommends each service also validates identity tokens.\n\nWhy other options are wrong:\n- A: TLS termination is handled by the gateway, not individual microservices in this pattern\n- C: Microservices behind a gateway can still use service mesh capabilities\n- D: Gateway latency is minimal and does not offset the security benefits of centralized auth\n\nReference: https://kubernetes.io/docs/concepts/security/overview/",
    verify: null
  },
  {
    id: "s05-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A NetworkPolicy allows ingress to Pods labeled `app: web` on port 443 from any source. A new Pod labeled `app: web` is created without port 443 open. Does the NetworkPolicy still apply to this new Pod?",
    diagram: null,
    options: [
      "No, because a NetworkPolicy only applies to Pods with the specified port actively open",
      "Yes, the policy selects Pods by label regardless of which ports the container exposes",
      "No, because the NetworkPolicy is only evaluated once at the time of Pod creation",
      "Yes, but the NetworkPolicy forces port 443 to open on the Pod's network interface"
    ],
    answer: 1,
    explanation: "NetworkPolicy selects target Pods based on labels, not on the ports the containers actually expose. The policy will apply to any Pod matching the selector. However, even if traffic is allowed by the policy, it will be dropped at the network level if no process is listening on port 443.\n\nWhy other options are wrong:\n- A: NetworkPolicy selects Pods by label, not by which ports are actively open\n- C: NetworkPolicies are continuously evaluated, not just at Pod creation time\n- D: NetworkPolicies do not force ports to open; they only control traffic flow\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -o jsonpath='{.items[*].spec.podSelector}'"
  },
  {
    id: "s05-q062",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A cluster uses RuntimeClass to run certain Pods in Kata Containers instead of the default runtime. What security advantage does Kata Containers provide?",
    diagram: null,
    options: [
      "Kata runs containers in lightweight VMs, providing hardware-level isolation",
      "Kata encrypts all container images at rest before allowing their execution",
      "Kata replaces Linux namespaces with a proprietary isolation mechanism",
      "Kata eliminates the need for enforcing Pod Security Standards on workloads"
    ],
    answer: 0,
    explanation: "Kata Containers runs each Pod inside a lightweight virtual machine, using hardware virtualization (VT-x/AMD-V) to provide stronger isolation than Linux namespaces alone. This creates an additional boundary between the container and the host kernel, reducing the blast radius of container escapes.\n\nWhy other options are wrong:\n- B: Kata does not encrypt container images at rest\n- C: Kata uses hardware virtualization in addition to Linux namespaces, not as a replacement\n- D: Kata provides additional isolation but does not eliminate the need for Pod Security Standards\n\nReference: https://katacontainers.io/",
    verify: "kubectl get runtimeclass kata -o yaml"
  },
  {
    id: "s05-q063",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A webhook admission controller is configured as `failurePolicy: Fail`. The webhook endpoint becomes unreachable. What happens to new Pod creation requests?",
    diagram: null,
    options: [
      "Pod creation requests are rejected until the webhook endpoint becomes available",
      "Pods are created normally by the API server, completely bypassing the endpoint",
      "The API server queues incoming requests and retries for 30 seconds on failure",
      "The kube-controller-manager handles the admission in place of the failed webhook"
    ],
    answer: 0,
    explanation: "With `failurePolicy: Fail`, the API server rejects any request that cannot be evaluated by the webhook. This is the more secure option as it prevents resources from being created without policy evaluation. The alternative, `failurePolicy: Ignore`, would allow requests through.\n\nWhy other options are wrong:\n- B: With failurePolicy: Fail, Pods are not created normally; requests are rejected\n- C: The API server does not queue requests; it immediately rejects or allows based on the failure policy\n- D: The kube-controller-manager does not handle admission in place of webhooks\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
    verify: "kubectl get validatingwebhookconfigurations -o yaml | grep failurePolicy"
  },
  {
    id: "s05-q064",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An administrator needs to grant a group of developers read access to all resources in the `testing` namespace except Secrets. How can this be achieved with RBAC?",
    diagram: null,
    options: [
      "Create a Role with a deny rule for Secrets and allow rules for all other resources",
      "Create a custom Role that explicitly lists each allowed resource excluding Secrets",
      "Use the `resourceNames` field in the Role to exclude specific Secret object names",
      "Set a namespace annotation that hides Secrets from non-admin users by convention"
    ],
    answer: 1,
    explanation: "RBAC has no deny rules; permissions are purely additive. Since Kubernetes 1.14, the built-in view ClusterRole excludes Secrets. However, creating a custom Role provides fine-grained control to specify exactly which resource types are accessible.\n\nWhy other options are wrong:\n- A: RBAC has no deny rules; you cannot create a deny rule for Secrets\n- C: resourceNames restricts access to specific named resources, not excludes resource types\n- D: Namespace annotations do not control RBAC access to resources\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl describe clusterrole view | grep secrets"
  },
  {
    id: "s05-q065",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A company implements image provenance verification in their cluster using Sigstore cosign. What does this verification confirm?",
    diagram: null,
    options: [
      "That the container image has no known CVEs in its dependency layers",
      "That the container image uses a read-only filesystem configuration",
      "That the image was built and signed by a trusted entity or pipeline",
      "That the container image is smaller than the registry size limit rule"
    ],
    answer: 2,
    explanation: "Cosign (part of the Sigstore project) verifies that a container image was signed by a trusted key or identity. This confirms the image's provenance -- that it came from a known build pipeline and has not been tampered with. It does not scan for vulnerabilities or enforce runtime settings.\n\nWhy other options are wrong:\n- A: Cosign verifies provenance, not vulnerabilities; use Trivy/Grype for CVE scanning\n- B: Cosign does not check filesystem configuration of container images\n- D: Cosign does not enforce size or format requirements for registry storage\n\nReference: https://docs.sigstore.dev/cosign/signing/signing_with_containers/",
    verify: "cosign verify --key cosign.pub <image>"
  },
  {
    id: "s05-q066",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "A Pod is configured with a service mesh sidecar. The security team needs to log all requests denied by the sidecar's authorization policy. Where should they look for these logs?",
    diagram: null,
    options: [
      "In the application container's stdout log stream for request data",
      "In the kube-apiserver audit logs for API-level request tracking",
      "In the CoreDNS query logs for service name resolution details",
      "In the Istio proxy (Envoy) container's access logs for denials"
    ],
    answer: 3,
    explanation: "The Istio sidecar proxy (Envoy) handles all inbound and outbound traffic for the Pod. Authorization policy denials are logged in the Envoy access logs, which can be accessed via `kubectl logs <pod> -c istio-proxy`. The application container does not see denied requests.\n\nWhy other options are wrong:\n- A: The application container does not see requests denied by the sidecar proxy\n- B: API server audit logs track Kubernetes API calls, not service mesh traffic\n- C: CoreDNS logs track DNS queries, not authorization policy denials\n\nReference: https://istio.io/latest/docs/tasks/observability/logs/access-log/",
    verify: "kubectl logs <pod> -c istio-proxy | grep RBAC"
  },
  {
    id: "s05-q067",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Pod spec includes `automountServiceAccountToken: true` at the pod level, but the associated ServiceAccount has `automountServiceAccountToken: false`. Which setting takes effect?",
    diagram: null,
    options: [
      "The ServiceAccount setting takes precedence and no token is mounted",
      "An error is raised because of the conflicting automount settings",
      "The Pod spec setting takes precedence and the token is mounted",
      "The token is mounted into the Pod but it is expired immediately"
    ],
    answer: 2,
    explanation: "The Pod spec's `automountServiceAccountToken` field takes precedence over the ServiceAccount's setting. This allows individual Pods to override the default behavior of their ServiceAccount. If the Pod spec explicitly sets it to `true`, the token will be mounted.\n\nWhy other options are wrong:\n- A: The Pod spec setting takes precedence over the ServiceAccount setting, not the other way around\n- B: No error is raised; the Pod spec override is the designed behavior\n- D: The token is mounted normally and is not expired immediately\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting",
    verify: "kubectl get pod <pod> -o jsonpath='{.spec.automountServiceAccountToken}'"
  },
  {
    id: "s05-q068",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A DaemonSet runs a log collector on every node. The collector needs access to host paths `/var/log` and `/var/lib/docker/containers`. Under the `restricted` Pod Security Standard, is this allowed?",
    diagram: null,
    options: [
      "Yes, because DaemonSets are fully exempt from Pod Security Standards",
      "No, the `restricted` profile prohibits mounting `hostPath` volumes",
      "Yes, if the `hostPath` volumes are configured as read-only mounts",
      "No, and the `baseline` profile also restricts hostPath volumes to read-only access"
    ],
    answer: 1,
    explanation: "The restricted Pod Security Standard prohibits hostPath volumes entirely. The baseline profile also prohibits hostPath volumes; hostPath is forbidden at both baseline and restricted levels. Only the privileged profile allows hostPath volumes. For log collectors requiring host access, the namespace must use the privileged profile, or the Pods must be exempted.\n\nWhy other options are wrong:\n- A: DaemonSets are not exempt from Pod Security Standards\n- C: The restricted profile prohibits hostPath volumes entirely, regardless of readOnly setting\n- D: While the baseline profile does prohibit hostPath volumes, it does not merely restrict them to read-only access — it forbids them outright\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-standards/",
    verify: "kubectl label ns logging pod-security.kubernetes.io/enforce=restricted --dry-run=server"
  },
  {
    id: "s05-q069",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A ClusterRole includes the `impersonate` verb for `users` and `groups`. What security risk does this permission carry?",
    diagram: '<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="75" width="100" height="50" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="70" y="105" text-anchor="middle" fill="#f8f8f2" font-size="11">User A</text><rect x="160" y="75" width="120" height="50" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="220" y="105" text-anchor="middle" fill="#f8f8f2" font-size="11">API Server</text><line x1="120" y1="100" x2="160" y2="100" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#arr4)"/><text x="140" y="93" text-anchor="middle" fill="#f1fa8c" font-size="9">impersonate</text><rect x="320" y="15" width="110" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="375" y="32" text-anchor="middle" fill="#f8f8f2" font-size="10">User B</text><text x="375" y="48" text-anchor="middle" fill="#f1fa8c" font-size="12">?</text><rect x="320" y="75" width="110" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="375" y="92" text-anchor="middle" fill="#f8f8f2" font-size="10">Group X</text><text x="375" y="108" text-anchor="middle" fill="#f1fa8c" font-size="12">?</text><rect x="320" y="135" width="110" height="40" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="1.5"/><text x="375" y="152" text-anchor="middle" fill="#f8f8f2" font-size="10">ServiceAccount Y</text><text x="375" y="168" text-anchor="middle" fill="#f1fa8c" font-size="12">?</text><line x1="280" y1="90" x2="320" y2="35" stroke="#4cc9f0" stroke-width="1.5"/><line x1="280" y1="100" x2="320" y2="95" stroke="#4cc9f0" stroke-width="1.5"/><line x1="280" y1="110" x2="320" y2="155" stroke="#4cc9f0" stroke-width="1.5"/><defs><marker id="arr4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4cc9f0"/></marker></defs></svg>',
    options: [
      "The user can only impersonate ServiceAccounts within their own namespace",
      "The user can act as any user or group, effectively gaining cluster-admin",
      "The impersonate verb only works when combined with the `--dry-run` flag",
      "Impersonation requests are logged but do not grant actual API permissions"
    ],
    answer: 1,
    explanation: "The `impersonate` verb allows a user to make API requests as any other user or group, including `system:masters` (cluster-admin). This effectively grants unlimited access and should be treated as equivalent to cluster-admin. It is one of the most privileged permissions in Kubernetes.\n\nWhy other options are wrong:\n- A: The impersonate verb on users/groups is cluster-scoped, not limited to a single namespace\n- C: Impersonation works with normal API requests, not just dry-run\n- D: Impersonation grants actual API permissions, not just logged requests\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources",
    verify: "kubectl auth can-i impersonate users --as=<user>"
  },
  {
    id: "s05-q070",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "During a canary deployment, a new version is found to have a vulnerability that exposes user data. Which action should be taken immediately?",
    diagram: null,
    options: [
      "Roll back the canary to the previous version and stop routing new traffic",
      "Increase the canary percentage to gather more data about the vulnerability",
      "Apply a NetworkPolicy to block the canary Pods from all internet traffic",
      "Patch the vulnerability directly in the production environment without rollback"
    ],
    answer: 0,
    explanation: "When a security vulnerability is discovered in a canary deployment, the immediate response is to roll back to the known-good version and stop routing traffic to the vulnerable Pods. This minimizes exposure. The vulnerability should then be fixed and re-tested before another deployment attempt.\n\nWhy other options are wrong:\n- B: Increasing canary percentage exposes more users to the vulnerability\n- C: Blocking internet traffic alone does not fix the vulnerability or protect data already exposed\n- D: Patching in production without rollback risks further exposure during the fix\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment",
    verify: "kubectl rollout undo deployment/<name>"
  },
  {
    id: "s05-q071",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A multi-tenant cluster uses separate namespaces per tenant. Each tenant's Pods run with a dedicated ServiceAccount. What additional isolation mechanism prevents one tenant from accessing another tenant's API resources?",
    diagram: null,
    options: [
      "Kubernetes automatically isolates tenant namespaces at the API level",
      "Node affinity rules that pin different tenants to separate worker nodes",
      "Container runtime sandboxing with gVisor applied to each tenant's Pods",
      "RBAC Roles and RoleBindings scoped to each individual tenant namespace"
    ],
    answer: 3,
    explanation: "Namespaces provide a scope for names but do not automatically isolate API access. RBAC Roles and RoleBindings must be configured per namespace to ensure each tenant's ServiceAccount can only access resources in its own namespace. Without RBAC, the `default` ServiceAccount may have broader access.\n\nWhy other options are wrong:\n- A: Kubernetes namespaces do not automatically isolate API access; RBAC must be configured\n- B: Node affinity provides compute isolation but not API-level access control\n- C: gVisor provides runtime isolation but does not control API resource access between tenants\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    verify: "kubectl auth can-i --list --as=system:serviceaccount:tenant-a:default -n tenant-b"
  },
  {
    id: "s05-q072",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A NetworkPolicy allows egress from Pods labeled `app: worker` to an external CIDR `10.0.0.0/8` on port 5432. The cluster Pod CIDR is `192.168.0.0/16`. Can the worker Pods reach other Pods in the cluster?",
    diagram: null,
    options: [
      "Yes, because intra-cluster Pod traffic is exempt from egress rules",
      "No, because the egress rule only allows traffic to `10.0.0.0/8`",
      "Yes, because NetworkPolicies do not affect traffic to `192.168.0.0/16`",
      "No, unless UDP DNS port 53 is also explicitly allowed by a rule"
    ],
    answer: 1,
    explanation: "When an egress NetworkPolicy is applied, only the explicitly allowed destinations are permitted. Since the rule only allows `10.0.0.0/8`, traffic to the Pod CIDR `192.168.0.0/16` is blocked. NetworkPolicies affect both internal and external traffic. The worker Pods can only reach the specified CIDR on port 5432.\n\nWhy other options are wrong:\n- A: Intra-cluster Pod-to-Pod traffic is subject to egress NetworkPolicy rules just like external traffic\n- C: NetworkPolicies affect traffic to all CIDRs including `192.168.0.0/16`; there is no exemption for internal ranges\n- D: While DNS would also be blocked, the primary reason is the CIDR restriction blocking Pod CIDR traffic\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -o jsonpath='{.items[*].spec.egress}'"
  },
  {
    id: "s05-q073",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A security-hardened node has the taint `security=high:NoSchedule`. A Pod for a sensitive workload needs to be scheduled on this node. What must the Pod spec include?",
    diagram: null,
    options: [
      "A `nodeSelector` entry matching the `security: high` node label",
      "A `toleration` matching the taint `security=high:NoSchedule`",
      "A `nodeAffinity` with a required scheduling rule to bypass the taint",
      "An annotation `scheduler.alpha.kubernetes.io/tolerations` on the Pod"
    ],
    answer: 1,
    explanation: "To be scheduled on a node with a `NoSchedule` taint, a Pod must include a matching toleration. The toleration must match the taint's key, value, and effect. A `nodeSelector` or `nodeAffinity` alone does not override taints. Note that a toleration does not guarantee scheduling on that node; a `nodeSelector` can be added for that.\n\nWhy other options are wrong:\n- A: A nodeSelector selects nodes by label but does not override taint repulsion\n- C: nodeAffinity selects nodes but does not override taints; a toleration is still required\n- D: The annotation-based toleration approach is deprecated in favor of the spec.tolerations field\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    verify: "kubectl describe node <node> | grep Taints"
  },
  {
    id: "s05-q074",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A serverless platform like Knative runs user functions in Kubernetes Pods that scale to zero. What security challenge does scale-to-zero introduce for functions that access Secrets?",
    diagram: null,
    options: [
      "Cold-start Pods must re-authenticate and fetch Secrets, increasing startup latency",
      "Secrets are automatically deleted from etcd whenever Pods scale down to zero replicas",
      "Scale-to-zero disables RBAC for the namespace until a new Pod instance is launched",
      "Cold-start Pods use cached credentials from the previous instance, risking stale tokens"
    ],
    answer: 0,
    explanation: "When a serverless function scales to zero and a new Pod is created on the next request, it must re-authenticate with any external secret stores or API endpoints. This increases cold-start latency and requires that tokens and credentials are still valid. Projected ServiceAccount tokens handle this by issuing fresh tokens.\n\nWhy other options are wrong:\n- B: Secrets remain in etcd regardless of Pod scaling; they are not deleted when Pods scale down\n- C: Scale-to-zero does not affect RBAC configuration for the namespace\n- D: Cold-start Pods receive fresh projected tokens; they do not reuse cached credentials from previous instances\n\nReference: https://knative.dev/docs/serving/autoscaling/scale-to-zero/",
    verify: "kubectl get ksvc -A"
  },
  {
    id: "s05-q075",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A security team receives excessive alerts from the cluster's monitoring system about Pod Security Standards violations. Many are false positives from system workloads. What is the recommended approach to reduce noise?",
    diagram: null,
    options: [
      "Reduce security alert volume by raising all threshold levels to their maximum values",
      "Configure exemptions for system namespaces and tune alert thresholds properly",
      "Move all system workloads to a separate dedicated cluster to avoid conflicts",
      "Replace the automated monitoring with periodic manual security audit processes"
    ],
    answer: 1,
    explanation: "Pod Security Admission supports namespace-level exemptions for known system workloads. Configuring exemptions for `kube-system` and other infrastructure namespaces, along with tuning alert thresholds, reduces false positives while maintaining visibility for application namespaces.\n\nWhy other options are wrong:\n- A: Raising all thresholds to maximum effectively silences meaningful alerts and removes security visibility\n- C: Moving system workloads to a separate cluster is excessive and operationally complex\n- D: Manual audits are not scalable and do not provide continuous monitoring\n\nReference: https://kubernetes.io/docs/concepts/security/pod-security-admission/#exemptions",
    verify: "kubectl get ns kube-system -o yaml | grep pod-security"
  },
  {
    id: "s05-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A team configures an RBAC Role with `verbs: [\"*\"]` on `resources: [\"pods\"]`. What does the wildcard grant?",
    diagram: null,
    options: [
      "Only the standard CRUD verbs: `get`, `list`, `create`, `update`, `delete`",
      "All current and future verbs including subresources like `pods/exec`",
      "All current verbs on Pods but not on any Pod subresources like `exec`",
      "An error because wildcard characters are not valid in the `verbs` field"
    ],
    answer: 2,
    explanation: "The wildcard `*` in the `verbs` field grants all verbs (`get`, `list`, `watch`, `create`, `update`, `patch`, `delete`) on the specified resource. However, subresources like `pods/exec` and `pods/log` are treated as separate resources in RBAC and must be listed explicitly in their own rule with their own verbs. The verb wildcard on `pods` does not extend to `pods/exec` or any other subresource.\n\nWhy other options are wrong:\n- A: The wildcard grants all verbs, not just CRUD verbs (includes watch, patch, etc.)\n- B: Subresources like pods/exec must be listed separately; the verb wildcard on pods does not extend to them\n- D: The wildcard * is valid in the verbs field and does not cause an error\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole",
    verify: "kubectl get role <role> -o yaml"
  },
  {
    id: "s05-q077",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "The Kubernetes API server supports webhook token authentication. A request includes a bearer token, and the API server sends it to an external webhook for validation. What must the webhook return for successful authentication?",
    diagram: null,
    options: [
      "An HTTP 302 redirect response pointing to the external identity provider",
      "A signed `JWT` containing the authenticated user's identity claim fields",
      "An HTTP 200 with a `TokenReview` response containing user identity",
      "An HTTP 200 response with a plain-text `username` string in the body"
    ],
    answer: 2,
    explanation: "The webhook token authenticator sends a `TokenReview` request to the external endpoint. The webhook must respond with HTTP 200 and a `TokenReview` response that includes the authenticated user's username, UID, and groups. This integrates Kubernetes with external identity systems.\n\nWhy other options are wrong:\n- A: The webhook does not return an HTTP redirect; it returns a TokenReview response\n- B: The webhook does not return a JWT; it returns a structured TokenReview API object\n- D: The response is not plain text; it must be a JSON TokenReview object\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/authentication/#webhook-token-authentication",
    verify: "kubectl get --raw /apis/authentication.k8s.io/v1"
  },
  {
    id: "s05-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Pod uses `fsGroup: 2000` in its `securityContext`. What effect does this have on mounted volumes?",
    diagram: null,
    options: [
      "The filesystem is encrypted with a key derived from group ID 2000 value",
      "All files in mounted volumes are owned by GID 2000 and new files inherit it",
      "Only processes running as GID 2000 can access the Pod network and volumes",
      "The volume is mounted as read-only for any process not in the group 2000"
    ],
    answer: 1,
    explanation: "Setting `fsGroup: 2000` causes Kubernetes to change the group ownership of all files in mounted volumes to GID 2000 and set the `setgid` bit on directories. This ensures all containers in the Pod can access the files via the supplemental group, regardless of their primary group.\n\nWhy other options are wrong:\n- A: fsGroup does not encrypt filesystems; it changes group ownership\n- C: fsGroup adds a supplemental group for volume access, not a requirement for network access\n- D: fsGroup changes ownership, not mount permissions; processes can still write if they are in the group\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod",
    verify: "kubectl exec <pod> -- ls -la /mounted-volume"
  },
  {
    id: "s05-q079",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A Pod fails to start with the error `Error: secret \"tls-cert\" not found`. The Secret exists in the `default` namespace, but the Pod runs in the `production` namespace. What is the issue?",
    diagram: null,
    options: [
      "Secrets cannot be used across namespaces; it must exist in the Pod's namespace",
      "The Secret name contains a typo preventing the kubelet from locating the resource",
      "TLS-type Secrets require a special RBAC role to access from within Pod containers",
      "The Pod's ServiceAccount lacks permission to read Secrets from another namespace"
    ],
    answer: 0,
    explanation: "Kubernetes Secrets are namespace-scoped resources. A Pod can only reference Secrets within its own namespace. The Secret `tls-cert` must be created in the `production` namespace for the Pod to mount it. Cross-namespace Secret access is not supported natively.\n\nWhy other options are wrong:\n- B: The error message clearly states the Secret name, so a typo is not the issue here\n- C: TLS-type Secrets do not require special RBAC roles for Pod mounting\n- D: The Pod references the Secret in its spec; the SA permissions are for API access, not volume mounts\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/",
    verify: "kubectl get secrets -n production"
  },
  {
    id: "s05-q080",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team evaluates SPIFFE/SPIRE for workload identity in their Kubernetes cluster. What does SPIFFE provide?",
    diagram: null,
    options: [
      "A vulnerability scanning framework specifically built for container images",
      "A network policy engine for controlling service-to-service communications",
      "A standard for issuing and verifying cryptographic identities to workloads",
      "A workload secrets management system designed to replace native Kubernetes Secrets"
    ],
    answer: 2,
    explanation: "SPIFFE (Secure Production Identity Framework For Everyone) defines a standard for workload identity, and SPIRE is its runtime implementation. It issues SPIFFE Verifiable Identity Documents (SVIDs) as X.509 certificates or JWT tokens, enabling workloads to authenticate to each other without application-level credential management.\n\nWhy other options are wrong:\n- A: SPIFFE is an identity framework, not a vulnerability scanner\n- B: SPIFFE provides workload identity, not network policy enforcement\n- D: SPIFFE issues cryptographic identities, not secrets management\n\nReference: https://spiffe.io/docs/latest/spiffe-about/overview/",
    verify: "kubectl get spiffeids -A"
  },
  {
    id: "s05-q081",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Pod has two containers: `app` and `sidecar`. The `app` container sets `runAsUser: 1000` and the `sidecar` has no `securityContext`. The pod-level `securityContext` sets `runAsUser: 3000`. What UID does the sidecar use?",
    diagram: null,
    options: [
      "UID 0 (root) because no container-level setting is specified for it",
      "UID 1000, inheriting from the `app` container's security context",
      "UID 3000, inheriting from the pod-level `securityContext` setting",
      "The UID defined in the sidecar's container image Dockerfile entry"
    ],
    answer: 2,
    explanation: "When a container does not specify its own `runAsUser`, it inherits the pod-level `securityContext` value. The `sidecar` container has no override, so it runs as UID 3000. The `app` container's setting of 1000 applies only to itself. Container-level settings do not affect sibling containers.\n\nWhy other options are wrong:\n- A: Without a container-level override, the sidecar inherits the pod-level UID, not root\n- B: Container-level settings do not propagate to sibling containers\n- D: The pod-level runAsUser overrides the Dockerfile USER directive when no container-level override exists\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/",
    verify: "kubectl exec <pod> -c sidecar -- id"
  },
  {
    id: "s05-q082",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud native application follows the 12-factor methodology and stores configuration in environment variables. Why is storing Secrets as environment variables considered less secure than using volume mounts?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><text x="200" y="18" text-anchor="middle" fill="#4cc9f0" font-size="12">Secret Delivery Methods</text><rect x="15" y="30" width="175" height="140" rx="8" fill="#1a1a2e" stroke="#bd93f9" stroke-width="2"/><text x="102" y="55" text-anchor="middle" fill="#bd93f9" font-size="11">Env Vars</text><text x="102" y="85" fill="#f8f8f2" font-size="10" text-anchor="middle">injected at</text><text x="102" y="100" fill="#f8f8f2" font-size="10" text-anchor="middle">container start</text><text x="102" y="145" fill="#f1fa8c" font-size="14" text-anchor="middle">?</text><rect x="210" y="30" width="175" height="140" rx="8" fill="#1a1a2e" stroke="#bd93f9" stroke-width="2"/><text x="297" y="55" text-anchor="middle" fill="#bd93f9" font-size="11">Volume Mount</text><text x="297" y="85" fill="#f8f8f2" font-size="10" text-anchor="middle">mounted as</text><text x="297" y="100" fill="#f8f8f2" font-size="10" text-anchor="middle">files in tmpfs</text><text x="297" y="145" fill="#f1fa8c" font-size="14" text-anchor="middle">?</text></svg>',
    options: [
      "Environment variables are not encrypted by Kubernetes while in transit between components",
      "Volume mounts automatically encrypt Secret data before writing it to the container disk",
      "Environment variables are injected only once and are stale if the Secret is rotated",
      "Env vars are visible in process listings, crash dumps, and logs; volume files are not"
    ],
    answer: 3,
    explanation: "Environment variables are exposed through `/proc/<pid>/environ`, may appear in crash dumps, and can be logged by application frameworks. Volume-mounted Secrets are stored as files with restricted permissions and are less likely to be accidentally exposed through these channels.\n\nWhy other options are wrong:\n- A: Neither env vars nor volume mounts are encrypted in transit between components by default\n- B: Volume mounts do not automatically encrypt Secret data; they use tmpfs with file permissions\n- C: While env vars are indeed injected at start and do not auto-update, the primary security concern is exposure in process listings and logs\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-files-from-a-pod",
    verify: "kubectl exec <pod> -- env | grep SECRET"
  },
  {
    id: "s05-q083",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster uses Calico as the CNI plugin with NetworkPolicy support. An administrator creates an `allow-dns` NetworkPolicy permitting UDP egress on port 53. The policy uses `namespaceSelector: {}` in the egress `to` block. What does this allow?",
    diagram: null,
    options: [
      "DNS queries are restricted only to CoreDNS Pods in `kube-system`",
      "UDP port 53 traffic is allowed to any Pod in any namespace scope",
      "DNS queries are allowed to external DNS servers outside the cluster",
      "UDP port 53 traffic is restricted only within the same namespace"
    ],
    answer: 1,
    explanation: "An empty `namespaceSelector: {}` matches all namespaces. Combined with port 53 UDP, this allows DNS traffic to any Pod in any namespace, including CoreDNS in `kube-system`. To also reach external DNS servers, you would need an `ipBlock` rule in addition.\n\nWhy other options are wrong:\n- A: An empty namespaceSelector matches all namespaces, not just kube-system\n- C: An empty namespaceSelector matches Pods in namespaces, not external IPs; ipBlock is needed for external DNS\n- D: An empty namespaceSelector matches all namespaces, not just the local namespace\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy allow-dns -o yaml"
  },
  {
    id: "s05-q084",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A platform team monitors RBAC-related events in the cluster. They notice frequent `Forbidden` events in the API server logs. Which metric helps quantify the rate of authorization failures?",
    diagram: null,
    options: [
      "`apiserver_request_total{code=\"403\"}`",
      "`kubelet_runtime_operations_errors_total`",
      "`etcd_server_proposals_failed_total`",
      "`rest_client_requests_total{code=\"500\"}`"
    ],
    answer: 0,
    explanation: "HTTP 403 Forbidden responses from the API server indicate authorization failures. The `apiserver_request_total` metric with the `code=\"403\"` label tracks these denied requests. This can be used in Prometheus alerting rules to detect excessive RBAC denials.\n\nWhy other options are wrong:\n- B: kubelet_runtime_operations_errors_total tracks container runtime errors, not authorization failures\n- C: etcd_server_proposals_failed_total tracks etcd consensus failures, not API auth\n- D: rest_client_requests_total tracks outbound client requests, not API server authorization\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: "kubectl get --raw /metrics | grep apiserver_request_total | grep 403"
  },
  {
    id: "s05-q085",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "An administrator creates a ClusterRole with `nonResourceURLs: [\"/healthz\", \"/metrics\"]` and verb `get`. What access does this grant?",
    diagram: null,
    options: [
      "Access to Pod health check endpoints and `/metrics` scraping targets",
      "Access to health check resources across all namespaces in the cluster",
      "Access to the API server's `/healthz` and `/metrics` HTTP endpoints",
      "Read-only access to all `CustomResourceDefinition` objects across the cluster"
    ],
    answer: 2,
    explanation: "The `nonResourceURLs` field in a ClusterRole grants access to API server endpoints that are not backed by Kubernetes resources. `/healthz` provides API server health status and `/metrics` exposes Prometheus-format metrics. These can only be used in ClusterRoles, not namespace-scoped Roles.\n\nWhy other options are wrong:\n- A: nonResourceURLs access API server HTTP endpoints, not Pod health checks or metrics targets\n- B: nonResourceURLs are URL paths, not Kubernetes resource types across namespaces\n- D: nonResourceURLs grant access to specific API server HTTP paths, not to custom resource definitions\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole",
    verify: "kubectl auth can-i get /healthz --as=<user>"
  },
  {
    id: "s05-q086",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Pod in the `app` namespace needs to communicate with a Service in the `database` namespace. A NetworkPolicy in `database` allows ingress only from namespaces matching the custom selector `matchLabels: {team: app}`. Which label must be applied to the `app` namespace?",
    diagram: null,
    options: [
      "`kubernetes.io/name: app` is set automatically by the Kubernetes control plane",
      "A custom label `app.kubernetes.io/managed-by: networkpolicy` on the source namespace",
      "The custom label `team: app` matching the policy's `namespaceSelector`",
      "No label is needed; `namespaceSelector` resolves namespace names to IPs automatically"
    ],
    answer: 2,
    explanation: "NetworkPolicy `namespaceSelector` matches namespaces by labels, not by name. The policy specifies `matchLabels: {team: app}`, so the `app` namespace must carry the label `team: app` for the selector to match and allow ingress traffic. While Kubernetes 1.22+ auto-assigns the `kubernetes.io/metadata.name` label to every namespace, the policy here uses a custom label that must be applied manually.\n\nWhy other options are wrong:\n- A: kubernetes.io/name is not a standard auto-label; the auto-label is kubernetes.io/metadata.name, and neither matches the custom `team: app` selector\n- B: app.kubernetes.io/managed-by: networkpolicy is not a standard label and does not match the policy's `team: app` selector\n- D: namespaceSelector works via labels, not by resolving names to IP ranges; the namespace must carry the matching label\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/#behavior-of-to-and-from-selectors",
    verify: "kubectl get ns app --show-labels"
  },
  {
    id: "s05-q087",
    domain: "Container Orchestration",
    subsection: "Storage",
    text: "An application stores database credentials in a Kubernetes Secret and mounts it as a volume. The Secret has `immutable: true` set. What happens when someone tries to update the Secret?",
    diagram: null,
    options: [
      "The update succeeds but triggers an automatic Pod restart cycle",
      "The Secret is versioned and both old and new values coexist together",
      "The `immutable` field is advisory only and does not enforce any restriction",
      "The update is rejected by the API server because the Secret is immutable"
    ],
    answer: 3,
    explanation: "When a Secret has `immutable: true`, the API server rejects any update to the Secret's `data` or `stringData` fields. This protects against accidental or malicious modifications. To change the values, you must delete and recreate the Secret. Immutable Secrets also improve cluster performance by reducing API server watch load.\n\nWhy other options are wrong:\n- A: Updates are rejected, so there is no Pod restart triggered\n- B: Secrets are not versioned; the update is simply rejected\n- C: The immutable field is enforced by the API server, not advisory\n\nReference: https://kubernetes.io/docs/concepts/configuration/secret/#secret-immutable",
    verify: "kubectl get secret <name> -o jsonpath='{.immutable}'"
  },
  {
    id: "s05-q088",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A GitOps tool (Flux or ArgoCD) detects drift between the desired state in Git and the actual cluster state. A Secret was manually modified in the cluster. How does the GitOps tool respond?",
    diagram: null,
    options: [
      "It reverts the Secret to the Git-defined state, overwriting the manual change",
      "It ignores Secrets because they are excluded from reconciliation by default",
      "It creates a new Secret resource alongside the one that was manually modified",
      "It raises an alert to administrators but does not modify the cluster state"
    ],
    answer: 0,
    explanation: "GitOps tools continuously reconcile the desired state in Git with the actual cluster state. When drift is detected, the tool reverts the resource to match the Git repository. This ensures that manual changes are automatically corrected, maintaining the Git repository as the single source of truth.\n\nWhy other options are wrong:\n- B: Secrets are not excluded from reconciliation by default in Flux or ArgoCD\n- C: GitOps tools update the existing resource, not create duplicate resources\n- D: GitOps tools actively reconcile state, not just alert; auto-correction is the default behavior\n\nReference: https://fluxcd.io/flux/concepts/",
    verify: "kubectl get events --field-selector reason=ReconciliationSucceeded"
  },
  {
    id: "s05-q089",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A Job creates a Pod that processes sensitive data and then completes. The Pod remains in `Completed` state. What security consideration applies to completed Pods?",
    diagram: null,
    options: [
      "Completed Pods are immediately removed from the cluster after job finishes",
      "Completed Pods have their mounted volumes automatically encrypted at rest",
      "Completed Pods have their environment variables redacted from describe output for security",
      "Env vars and volume mounts with sensitive data remain accessible via kubectl"
    ],
    answer: 3,
    explanation: "Completed Pods remain in the cluster until garbage collected. Their logs can still be viewed with `kubectl logs`, and `kubectl describe` shows their full spec including environment variables referencing Secrets. Setting `ttlSecondsAfterFinished` on the Job ensures timely cleanup.\n\nWhy other options are wrong:\n- A: Completed Pods are not immediately removed; they persist until garbage collected or TTL expires\n- B: Volumes are not automatically encrypted at rest for completed Pods\n- C: Completed Pods can be inspected with kubectl describe and kubectl logs\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/job/#ttl-mechanism-for-finished-jobs",
    verify: "kubectl get pods --field-selector=status.phase=Succeeded"
  },
  {
    id: "s05-q090",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A blue-green deployment switches traffic from the blue (current) to the green (new) environment. Before switching, the security team wants to verify the green environment. Which validation should be performed?",
    diagram: null,
    options: [
      "Run a vulnerability scan on the existing blue environment containers first",
      "Verify green environment images are signed and pass security policy checks",
      "Disable all NetworkPolicies during the blue-green transition period window",
      "Grant cluster-admin access to the deployment pipeline service temporarily"
    ],
    answer: 1,
    explanation: "Before routing production traffic to the green environment, the security team should verify that all container images are signed by trusted entities and pass admission policy checks (Pod Security Standards, OPA/Gatekeeper). This ensures the new deployment meets security requirements before it serves traffic.\n\nWhy other options are wrong:\n- A: Scanning the old blue environment does not validate the new green deployment\n- C: Disabling NetworkPolicies during transition weakens security\n- D: Granting cluster-admin to the pipeline violates least privilege\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment",
    verify: "cosign verify --key cosign.pub <green-image>"
  },
  {
    id: "s05-q091",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A team uses cert-manager in their Kubernetes cluster. What is the primary function of cert-manager?",
    diagram: null,
    options: [
      "Provisioning and renewing TLS certificates from issuers like Let's Encrypt",
      "Managing RBAC certificates used for user authentication to the API server",
      "Encrypting etcd data at rest using X.509 certificates and key management",
      "Scanning container images for expired or misconfigured SSL certificates"
    ],
    answer: 0,
    explanation: "Cert-manager is a CNCF project that automates the management and issuance of TLS certificates in Kubernetes. It works with various issuers including Let's Encrypt, HashiCorp Vault, and Venafi. It handles certificate lifecycle including issuance, renewal, and revocation.\n\nWhy other options are wrong:\n- B: cert-manager manages TLS certificates for workloads, not RBAC authentication certificates\n- C: cert-manager does not encrypt etcd data; that requires EncryptionConfiguration\n- D: cert-manager does not scan images for certificate issues\n\nReference: https://cert-manager.io/docs/",
    verify: "kubectl get certificates -A"
  },
  {
    id: "s05-q092",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "A PodDisruptionBudget (PDB) is configured for a security-critical Deployment with `minAvailable: 2`. During a node drain, what happens if draining would reduce available replicas below 2?",
    diagram: null,
    options: [
      "The drain proceeds regardless of the PDB configuration and evicts the Pod",
      "The drain is blocked until another replica is available or the PDB is changed",
      "The Pod is live-migrated transparently to another available node in the cluster",
      "The PDB is automatically adjusted by the controller to allow the drain to proceed"
    ],
    answer: 1,
    explanation: "PodDisruptionBudgets prevent voluntary disruptions from reducing available replicas below the specified minimum. The `kubectl drain` command respects PDBs and will wait until the disruption can occur without violating the budget. This ensures security-critical workloads maintain availability.\n\nWhy other options are wrong:\n- A: kubectl drain respects PDBs by default and will wait if the budget would be violated\n- C: Kubernetes does not support live migration of Pods between nodes\n- D: PDBs are not automatically adjusted; they are honored as configured\n\nReference: https://kubernetes.io/docs/tasks/run-application/configure-pdb/",
    verify: "kubectl get pdb -o wide"
  },
  {
    id: "s05-q093",
    domain: "Container Orchestration",
    subsection: "Container Runtimes",
    text: "A cluster is configured with a validating admission webhook that enforces `runtimeClassName` on all new Pods. A developer submits a Pod without this field. What is the outcome?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="30" width="100" height="45" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="2"/><text x="70" y="57" text-anchor="middle" fill="#f8f8f2" font-size="11">Pod (no RC)</text><rect x="160" y="30" width="100" height="45" rx="6" fill="#16213e" stroke="#f1fa8c" stroke-width="2"/><text x="210" y="57" text-anchor="middle" fill="#f8f8f2" font-size="11">Webhook</text><rect x="300" y="30" width="90" height="45" rx="6" fill="#16213e" stroke="#4cc9f0" stroke-width="2"/><text x="345" y="57" text-anchor="middle" fill="#f1fa8c" font-size="14">?</text><line x1="120" y1="52" x2="160" y2="52" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#arr5)"/><line x1="260" y1="52" x2="300" y2="52" stroke="#4cc9f0" stroke-width="1.5" marker-end="url(#arr6)"/><defs><marker id="arr5" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4cc9f0"/></marker><marker id="arr6" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4cc9f0"/></marker></defs></svg>',
    options: [
      "The Pod is created with the cluster default runtime class applied",
      "The API server rejects the Pod creation request before it is persisted",
      "The webhook mutates the Pod spec to add a default runtime class value",
      "The Pod enters a pending state until a runtime class value is assigned"
    ],
    answer: 1,
    explanation: "A validating admission webhook that requires `runtimeClassName` will reject Pods that do not specify it. This is a common pattern for enforcing that all workloads explicitly declare their runtime, ensuring security-sensitive workloads use hardened runtimes like gVisor or Kata.\n\nWhy other options are wrong:\n- A: The validating webhook rejects the Pod, so it is not created with a default runtime class\n- C: A validating webhook does not mutate Pod specs; that requires a mutating webhook\n- D: The Pod is rejected immediately, not put in a pending state\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
    verify: "kubectl get validatingwebhookconfigurations -o yaml"
  },
  {
    id: "s05-q094",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A team implements distributed tracing with OpenTelemetry in a Kubernetes cluster. How can trace data help with security incident investigation?",
    diagram: null,
    options: [
      "Traces encrypt sensitive data in transit between communicating services",
      "Traces serve as the primary source for regulatory compliance auditing",
      "Traces automatically block requests detected as malicious in real time",
      "Traces show the full request path, helping identify compromised services"
    ],
    answer: 3,
    explanation: "Distributed tracing captures the flow of requests across service boundaries. During a security incident, trace data reveals which services a request touched, the latency at each hop, and any anomalous patterns. This helps identify the compromised service and the extent of the breach.\n\nWhy other options are wrong:\n- A: Traces do not encrypt data in transit; encryption is handled by mTLS or network-layer security\n- B: Traces complement audit logs but are not the primary source for regulatory compliance\n- C: Traces are observability data; they do not block or intercept malicious requests\n\nReference: https://opentelemetry.io/docs/concepts/observability-primer/",
    verify: "kubectl get pods -l app=otel-collector"
  },
  {
    id: "s05-q095",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Kubernetes cluster uses OIDC tokens for user authentication. The kube-apiserver is configured with `--oidc-issuer-url`, `--oidc-client-id`, and `--oidc-username-claim`. What role does the `--oidc-groups-claim` flag serve?",
    diagram: null,
    options: [
      "It maps a JWT claim to Kubernetes groups for use in RBAC policies",
      "It specifies which OIDC scope to request from the identity provider",
      "It creates Kubernetes Group resources as objects in the API server",
      "It restricts which groups are allowed to access the cluster at all"
    ],
    answer: 0,
    explanation: "The `--oidc-groups-claim` flag tells the API server which claim in the OIDC JWT token contains the user's group memberships. These groups are then available for RBAC RoleBindings and ClusterRoleBindings, enabling group-based access control without managing individual user bindings.\n\nWhy other options are wrong:\n- B: --oidc-groups-claim specifies the JWT claim name, not an OIDC scope\n- C: It maps JWT claims to group identities; it does not create Group API objects\n- D: It identifies groups in the token, not restricts which groups can access the cluster\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens",
    verify: "kubectl get pods -n kube-system kube-apiserver-<node> -o yaml | grep oidc"
  },
  {
    id: "s05-q096",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservice communicates with an external payment API using a bearer token stored in a Kubernetes Secret. The token is rotated monthly by the payment provider. What is the best practice for handling rotation?",
    diagram: null,
    options: [
      "Hardcode the token in the application source code and redeploy it monthly",
      "Store the token in a ConfigMap or external config file for easier updates",
      "Use an external secrets operator to sync the token from a vault automatically",
      "Create a new namespace for each monthly token rotation from the payment provider"
    ],
    answer: 2,
    explanation: "An external secrets operator (such as External Secrets Operator) syncs secrets from external vaults (HashiCorp Vault, AWS Secrets Manager, etc.) into Kubernetes Secrets. This automates rotation without requiring redeployment or manual intervention, and keeps the source of truth in the vault.\n\nWhy other options are wrong:\n- A: Hardcoding tokens in source code is insecure and requires redeployment for rotation\n- B: ConfigMaps are not encrypted and are less secure than Secrets for token storage\n- D: Creating a new namespace per rotation is unnecessary overhead and does not solve the rotation problem\n\nReference: https://external-secrets.io/latest/",
    verify: "kubectl get externalsecrets -A"
  },
  {
    id: "s05-q097",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A Role grants `get` on `configmaps` with `resourceNames: [\"app-config\"]`. A user bound to this Role runs `kubectl get configmaps`. What happens?",
    diagram: null,
    options: [
      "Only `app-config` is returned because `resourceNames` filters the listing",
      "The request returns 403 Forbidden because `list` is required",
      "All ConfigMaps in the namespace are returned ignoring `resourceNames`",
      "An empty list with zero items is returned to the requesting user"
    ],
    answer: 1,
    explanation: "The `kubectl get configmaps` command uses the `list` verb, which is not granted by this Role. The `get` verb with `resourceNames` only works when the specific resource name is requested (e.g., `kubectl get configmap app-config`). Without `list`, the user cannot enumerate ConfigMaps.\n\nWhy other options are wrong:\n- A: Only the named resource is accessible via get; list requires its own verb grant\n- C: get does not implicitly include list; they are separate verbs in RBAC\n- D: The request returns a Forbidden error (403), not an empty list\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources",
    verify: "kubectl auth can-i list configmaps --as=<user> -n <namespace>"
  },
  {
    id: "s05-q098",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A container image is stored in a registry with content trust enabled (Docker Content Trust / Notary). What does content trust verify?",
    diagram: null,
    options: [
      "That the container image has no known vulnerabilities in its trusted base layers",
      "That the image meets size and format requirements for the registry",
      "That the container image uses a non-root user in its configuration",
      "That the image was signed by a trusted publisher and is untampered"
    ],
    answer: 3,
    explanation: "Content trust (via Notary or similar signing frameworks) uses digital signatures to verify that an image was published by a trusted entity and has not been modified since signing. This addresses supply chain integrity but does not scan for vulnerabilities or enforce runtime security settings.\n\nWhy other options are wrong:\n- A: Content trust verifies provenance and integrity, not vulnerability status\n- B: Content trust does not check image size or format requirements\n- C: Content trust does not inspect container runtime user configuration\n\nReference: https://docs.docker.com/engine/security/trust/",
    verify: "docker trust inspect <image>"
  },
  {
    id: "s05-q099",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart uses `lookup` functions to read existing Secrets during template rendering. What security implication does this have?",
    diagram: null,
    options: [
      "The `lookup` function caches Secret data in the Helm release Secret object",
      "The user running `helm install` must have RBAC permissions to read Secrets",
      "`lookup` functions are disabled by default in all Helm 3 chart templates",
      "The `lookup` function only reads Secret metadata fields, not actual data"
    ],
    answer: 1,
    explanation: "Helm's `lookup` function queries the Kubernetes API during template rendering. If a chart uses `lookup` to read Secrets, the user or ServiceAccount executing `helm install` must have `get` permissions on Secrets in the target namespace. This is a security consideration when granting Helm access.\n\nWhy other options are wrong:\n- A: The lookup function reads data at render time; it does not cache Secret data in the release object\n- C: lookup functions are available by default in Helm 3, not disabled\n- D: The lookup function reads the full resource including data fields, not just metadata\n\nReference: https://helm.sh/docs/chart_template_guide/functions_and_pipelines/",
    verify: "helm install test-release <chart> --dry-run=server 2>&1"
  },
  {
    id: "s05-q100",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline runs `kubectl apply` using a ServiceAccount bound to a custom ClusterRole. The ClusterRole grants `create`, `update`, and `delete` on Deployments, Services, ConfigMaps, and ClusterRoleBindings. A developer modifies the pipeline to also deploy a ClusterRoleBinding granting `cluster-admin`. What happens?",
    diagram: null,
    options: [
      "The ClusterRoleBinding is created successfully without any restriction or warning",
      "The request is denied because the ServiceAccount cannot escalate its permissions",
      "The pipeline execution pauses and waits for a manual approval step to continue",
      "The ClusterRoleBinding is created but marked as pending administrative review"
    ],
    answer: 1,
    explanation: "Kubernetes RBAC prevents privilege escalation. A user or ServiceAccount can only create RoleBindings or ClusterRoleBindings that grant permissions they already possess. Since the pipeline's ServiceAccount does not have `cluster-admin`, it cannot create a ClusterRoleBinding granting that role.\n\nWhy other options are wrong:\n- A: RBAC escalation prevention blocks the creation of bindings granting unowned permissions\n- C: There is no built-in manual approval step for RBAC escalation attempts\n- D: The request is denied outright, not created in a pending state\n\nReference: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#privilege-escalation-prevention-and-bootstrapping",
    verify: "kubectl auth can-i create clusterrolebindings --as=system:serviceaccount:<ns>:<sa>"
  },
];

var labExercises = [
  {
    title: "Lab 1: Creating RBAC Roles and RoleBindings",
    description: "Create a Role that grants read access to Pods and Services in a namespace, then bind it to a user. Verify the user's permissions using `kubectl auth can-i`.",
    commands: "<span class='prompt'>$</span> kubectl create namespace rbac-lab\n<span class='prompt'>$</span> kubectl create role pod-reader --verb=get,list,watch --resource=pods,services -n rbac-lab\n<span class='prompt'>$</span> kubectl create rolebinding pod-reader-binding --role=pod-reader --user=jane -n rbac-lab\n<span class='prompt'>$</span> kubectl auth can-i get pods --as=jane -n rbac-lab\n<span class='prompt'>$</span> kubectl auth can-i create pods --as=jane -n rbac-lab\n<span class='prompt'>$</span> kubectl auth can-i get pods --as=jane -n default\n<span class='prompt'>$</span> kubectl get role pod-reader -n rbac-lab -o yaml",
    expectedOutput: "The `pod-reader` Role is created with verbs `get`, `list`, `watch` on `pods` and `services`. The RoleBinding `pod-reader-binding` binds it to user `jane`. Running `kubectl auth can-i get pods --as=jane -n rbac-lab` returns `yes`. Running `kubectl auth can-i create pods --as=jane -n rbac-lab` returns `no` (create not granted). Running the same in the `default` namespace also returns `no` (permissions scoped to `rbac-lab`)."
  },
  {
    title: "Lab 2: Working with ServiceAccounts",
    description: "Create a ServiceAccount, generate a short-lived token, and verify its identity. Demonstrate how to disable automatic token mounting for security hardening.",
    commands: "<span class='prompt'>$</span> kubectl create namespace sa-lab\n<span class='prompt'>$</span> kubectl create serviceaccount app-sa -n sa-lab\n<span class='prompt'>$</span> kubectl create token app-sa -n sa-lab --duration=10m\n<span class='prompt'>$</span> kubectl patch serviceaccount default -n sa-lab -p '{\"automountServiceAccountToken\": false}'\n<span class='prompt'>$</span> kubectl run test-pod --image=nginx -n sa-lab --overrides='{\"spec\":{\"serviceAccountName\":\"app-sa\"}}'\n<span class='prompt'>$</span> kubectl get pod test-pod -n sa-lab -o jsonpath='{.spec.serviceAccountName}'\n<span class='prompt'>$</span> kubectl exec test-pod -n sa-lab -- cat /var/run/secrets/kubernetes.io/serviceaccount/token | head -c 50\n<span class='prompt'>$</span> kubectl auth can-i --list --as=system:serviceaccount:sa-lab:app-sa -n sa-lab",
    expectedOutput: "A ServiceAccount `app-sa` is created. `kubectl create token` generates a JWT valid for 10 minutes. The `default` SA is patched to disable auto-mount. The `test-pod` runs with `app-sa` and has a projected token mounted. The `auth can-i --list` shows the SA's effective permissions (minimal by default)."
  },
  {
    title: "Lab 3: Applying Pod Security Standards",
    description: "Label a namespace to enforce the `restricted` Pod Security Standard. Test which Pods are admitted and which are rejected based on their security configurations.",
    commands: "<span class='prompt'>$</span> kubectl create namespace pss-lab\n<span class='prompt'>$</span> kubectl label namespace pss-lab pod-security.kubernetes.io/enforce=restricted\n<span class='prompt'>$</span> kubectl label namespace pss-lab pod-security.kubernetes.io/warn=restricted\n<span class='prompt'>$</span> kubectl run privileged-pod --image=nginx -n pss-lab --overrides='{\"spec\":{\"containers\":[{\"name\":\"nginx\",\"image\":\"nginx\",\"securityContext\":{\"privileged\":true}}]}}' 2>&1\n<span class='prompt'>$</span> kubectl run safe-pod --image=nginx -n pss-lab --overrides='{\"spec\":{\"containers\":[{\"name\":\"nginx\",\"image\":\"nginx\",\"securityContext\":{\"runAsNonRoot\":true,\"runAsUser\":1000,\"allowPrivilegeEscalation\":false,\"capabilities\":{\"drop\":[\"ALL\"]},\"seccompProfile\":{\"type\":\"RuntimeDefault\"}}}]}}'\n<span class='prompt'>$</span> kubectl get pods -n pss-lab\n<span class='prompt'>$</span> kubectl get ns pss-lab --show-labels",
    expectedOutput: "The namespace is labeled with `restricted` enforcement. The privileged Pod is rejected with an error: `pods \"privileged-pod\" is forbidden: violates PodSecurity \"restricted:latest\"`. The `safe-pod` with proper security context (non-root, no privilege escalation, dropped capabilities, seccomp profile) is admitted successfully."
  },
  {
    title: "Lab 4: Setting SecurityContext on Pods",
    description: "Create a Pod with a comprehensive security context including non-root user, read-only filesystem, dropped capabilities, and an emptyDir for writable temp storage.",
    commands: "<span class='prompt'>$</span> kubectl create namespace secctx-lab\n<span class='prompt'>$</span> cat &lt;&lt;'EOF' | kubectl apply -n secctx-lab -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-pod\nspec:\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 1000\n    runAsGroup: 3000\n    fsGroup: 2000\n    seccompProfile:\n      type: RuntimeDefault\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\", \"echo secured > /tmp/data/test.txt && sleep 3600\"]\n    securityContext:\n      allowPrivilegeEscalation: false\n      readOnlyRootFilesystem: true\n      capabilities:\n        drop: [\"ALL\"]\n    volumeMounts:\n    - name: tmp-storage\n      mountPath: /tmp/data\n  volumes:\n  - name: tmp-storage\n    emptyDir: {}\nEOF\n<span class='prompt'>$</span> kubectl exec secure-pod -n secctx-lab -- id\n<span class='prompt'>$</span> kubectl exec secure-pod -n secctx-lab -- cat /tmp/data/test.txt\n<span class='prompt'>$</span> kubectl exec secure-pod -n secctx-lab -- touch /root-test.txt 2>&1\n<span class='prompt'>$</span> kubectl exec secure-pod -n secctx-lab -- ls -la /tmp/data/",
    expectedOutput: "The Pod runs as UID 1000, GID 3000. `id` shows `uid=1000 gid=3000 groups=2000`. The `emptyDir` at `/tmp/data` is writable (shows `secured` content). Attempting to write to the root filesystem fails with `Read-only file system`. Files in `/tmp/data/` show group ownership of GID 2000 due to `fsGroup`."
  },
  {
    title: "Lab 5: Creating a NetworkPolicy to Restrict Traffic",
    description: "Create a default-deny NetworkPolicy and then add specific allow rules. Verify that only permitted traffic flows between Pods.",
    commands: "<span class='prompt'>$</span> kubectl create namespace netpol-lab\n<span class='prompt'>$</span> kubectl run backend --image=nginx --labels=app=backend -n netpol-lab\n<span class='prompt'>$</span> kubectl expose pod backend --port=80 -n netpol-lab\n<span class='prompt'>$</span> kubectl run frontend --image=busybox --labels=app=frontend -n netpol-lab -- sleep 3600\n<span class='prompt'>$</span> kubectl run attacker --image=busybox --labels=app=attacker -n netpol-lab -- sleep 3600\n<span class='prompt'>$</span> cat &lt;&lt;'EOF' | kubectl apply -n netpol-lab -f -\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny-ingress\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\nEOF\n<span class='prompt'>$</span> kubectl exec frontend -n netpol-lab -- wget -qO- --timeout=3 http://backend 2>&1\n<span class='prompt'>$</span> cat &lt;&lt;'EOF' | kubectl apply -n netpol-lab -f -\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-frontend-to-backend\nspec:\n  podSelector:\n    matchLabels:\n      app: backend\n  policyTypes:\n  - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - port: 80\nEOF\n<span class='prompt'>$</span> kubectl exec frontend -n netpol-lab -- wget -qO- --timeout=3 http://backend\n<span class='prompt'>$</span> kubectl exec attacker -n netpol-lab -- wget -qO- --timeout=3 http://backend 2>&1\n<span class='prompt'>$</span> kubectl get networkpolicy -n netpol-lab",
    expectedOutput: "After applying default-deny, `frontend` cannot reach `backend` (connection timeout). After applying the allow policy, `frontend` successfully retrieves the nginx page. The `attacker` Pod still times out because only `app=frontend` is allowed. `kubectl get networkpolicy` shows both policies active."
  },
  {
    title: "Lab 6: Managing Secrets Securely",
    description: "Create Secrets using different methods, mount them securely in Pods, and demonstrate best practices for Secret management including immutable Secrets.",
    commands: "<span class='prompt'>$</span> kubectl create namespace secrets-lab\n<span class='prompt'>$</span> kubectl create secret generic db-creds --from-literal=username=admin --from-literal=password=s3cur3P@ss -n secrets-lab\n<span class='prompt'>$</span> kubectl get secret db-creds -n secrets-lab -o jsonpath='{.data.password}' | base64 -d\n<span class='prompt'>$</span> cat &lt;&lt;'EOF' | kubectl apply -n secrets-lab -f -\napiVersion: v1\nkind: Pod\nmetadata:\n  name: secret-pod\nspec:\n  containers:\n  - name: app\n    image: busybox\n    command: [\"sh\", \"-c\", \"cat /etc/creds/username && echo && cat /etc/creds/password && sleep 3600\"]\n    volumeMounts:\n    - name: creds\n      mountPath: /etc/creds\n      readOnly: true\n  volumes:\n  - name: creds\n    secret:\n      secretName: db-creds\nEOF\n<span class='prompt'>$</span> kubectl exec secret-pod -n secrets-lab -- ls -la /etc/creds/\n<span class='prompt'>$</span> kubectl exec secret-pod -n secrets-lab -- cat /etc/creds/password\n<span class='prompt'>$</span> kubectl patch secret db-creds -n secrets-lab -p '{\"immutable\": true}'\n<span class='prompt'>$</span> kubectl patch secret db-creds -n secrets-lab -p '{\"data\":{\"password\":\"bmV3cGFzcw==\"}}' 2>&1\n<span class='prompt'>$</span> kubectl create token default -n secrets-lab --duration=5m",
    expectedOutput: "The Secret `db-creds` is created with username and password. Base64 decoding shows `s3cur3P@ss`. The Pod mounts the Secret as files at `/etc/creds/` (symlinked files). After patching the Secret to `immutable: true`, attempting to update the password fails with `field is immutable`. A short-lived token is generated for the `default` SA."
  }
];
