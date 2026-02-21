var EXAM_SET = 3;
var EXAM_TITLE = "KCNA Practice Exam - Set 03: Networking Deep Dive";
var questions = [
  {
    id: "s03-q001",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A development team deploys a microservice consisting of three replicas. Other pods within the same cluster need to reach these replicas using a single stable IP address, but no external access is required. Which Service type satisfies this requirement with the least exposure?",
    diagram: null,
    options: [
      "`ClusterIP` — provides a virtual IP reachable only inside the cluster",
      "`NodePort` — opens a static port on every node for external access only",
      "`LoadBalancer` — provisions a cloud-managed LB scoped to the VPC network",
      "`ExternalName` — maps a DNS CNAME record to an external endpoint target"
    ],
    answer: 0,
    explanation: "`ClusterIP` is the default Service type and allocates an internal-only virtual IP, making it the least-exposure option for in-cluster communication. `NodePort` exposes the service on every node's IP at a static port, adding unnecessary external surface. `LoadBalancer` provisions an external cloud load balancer, which is overkill here. `ExternalName` does not route to pods at all — it returns a CNAME record pointing to an external DNS name.\n\nWhy other options are wrong:\n- B: NodePort opens a static port on every node, adding external attack surface beyond what is needed for in-cluster communication.\n- C: LoadBalancer provisions a cloud-managed external LB, adding unnecessary exposure and cost.\n- D: ExternalName maps a DNS CNAME to an external endpoint and does not route to in-cluster pods at all.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.type}'"
  },
  {
    id: "s03-q002",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An operator notices that a `NodePort` Service is accessible on port 32100 of every node, but the backend pods run on only two of five nodes. What explains traffic arriving at a node that has no local pod?",
    diagram: null,
    options: [
      "The kubelet on the receiving node spawns a temporary proxy pod to relay each inbound request onward",
      "kube-proxy on each node programs iptables/IPVS rules that forward traffic to any pod endpoint",
      "CoreDNS redirects the request at the DNS layer to a node that currently hosts the target pod replica",
      "The container runtime tunnels the packet back to the API server which then routes it to the pod"
    ],
    answer: 1,
    explanation: "kube-proxy runs on every node and maintains iptables or IPVS rules that can forward traffic to pod endpoints across the cluster, regardless of whether a pod is local. Kubelet does not spawn proxy pods. CoreDNS resolves names but does not redirect live TCP/UDP connections. The API server is a control-plane component and is not in the data path for service traffic.\n\nWhy other options are wrong:\n- A: The kubelet does not spawn temporary proxy pods; it manages pod lifecycle, not service traffic routing.\n- C: CoreDNS resolves DNS names but does not redirect live TCP/UDP connections at the packet level.\n- D: The API server is a control-plane component and is not in the data path for service traffic.\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s03-q003",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team wants to route external HTTPS traffic to two different backend services based on the URL path — `/api` to `api-svc` and `/web` to `web-svc`. Both services are `ClusterIP`. Which resource is designed for this?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="30" rx="4" fill="#326CE5" /><text x="200" y="25" text-anchor="middle" fill="#fff" font-size="12">?</text><line x1="170" y1="35" x2="80" y2="100" stroke="#999" stroke-width="1.5" /><line x1="230" y1="35" x2="320" y2="100" stroke="#999" stroke-width="1.5" /><text x="110" y="70" fill="#ccc" font-size="10">/api</text><text x="270" y="70" fill="#ccc" font-size="10">/web</text><rect x="20" y="100" width="120" height="30" rx="4" fill="#4CAF50" /><text x="80" y="120" text-anchor="middle" fill="#fff" font-size="11">api-svc (ClusterIP)</text><rect x="260" y="100" width="120" height="30" rx="4" fill="#FF9800" /><text x="320" y="120" text-anchor="middle" fill="#fff" font-size="11">web-svc (ClusterIP)</text><rect x="20" y="150" width="50" height="25" rx="3" fill="#555" /><text x="45" y="167" text-anchor="middle" fill="#fff" font-size="9">Pod</text><rect x="90" y="150" width="50" height="25" rx="3" fill="#555" /><text x="115" y="167" text-anchor="middle" fill="#fff" font-size="9">Pod</text><rect x="260" y="150" width="50" height="25" rx="3" fill="#555" /><text x="285" y="167" text-anchor="middle" fill="#fff" font-size="9">Pod</text><rect x="330" y="150" width="50" height="25" rx="3" fill="#555" /><text x="355" y="167" text-anchor="middle" fill="#fff" font-size="9">Pod</text><line x1="45" y1="130" x2="45" y2="150" stroke="#999" stroke-width="1" /><line x1="115" y1="130" x2="115" y2="150" stroke="#999" stroke-width="1" /><line x1="285" y1="130" x2="285" y2="150" stroke="#999" stroke-width="1" /><line x1="355" y1="130" x2="355" y2="150" stroke="#999" stroke-width="1" /></svg>',
    options: [
      "A `NetworkPolicy` that selectively forwards external traffic based on URL path and destination",
      "Two separate `LoadBalancer` Services with custom path annotations to split traffic by URL",
      "A single `NodePort` Service with `sessionAffinity` and per-path routing configuration set",
      "An `Ingress` resource with path-based rules and an Ingress controller deployed in the cluster"
    ],
    answer: 3,
    explanation: "An `Ingress` resource lets you define host- and path-based routing rules that direct traffic to different backend Services. An Ingress controller (e.g., NGINX, Traefik) implements these rules. `LoadBalancer` Services operate at L4 and cannot inspect URL paths. `NodePort` does not support path-based routing. `NetworkPolicy` controls which pods can communicate but does not perform L7 routing.\n\nWhy other options are wrong:\n- A: NetworkPolicy controls access between pods but cannot perform L7 URL path-based routing.\n- B: LoadBalancer Services operate at L4 and have no built-in mechanism for inspecting URL paths.\n- C: NodePort does not support path-based routing; it simply opens a port on each node.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: "kubectl get ingress"
  },
  {
    id: "s03-q004",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod named `frontend` in namespace `store` needs to call a Service named `payment` in namespace `finance`. Which DNS name should the application use?",
    diagram: null,
    options: [
      "`payment.store.svc.cluster.local`",
      "`finance.payment.svc.cluster.local`",
      "`payment.cluster.local.finance`",
      "`payment.finance.svc.cluster.local`"
    ],
    answer: 3,
    explanation: "Kubernetes DNS follows the pattern `<service>.<namespace>.svc.cluster.local`. Since the `payment` Service is in the `finance` namespace, the correct FQDN is `payment.finance.svc.cluster.local`. The first option uses the wrong namespace (store instead of finance). The second option reverses the service and namespace. The third option has an invalid DNS format.\n\nWhy other options are wrong:\n- A: Uses the wrong namespace (`store` instead of `finance`), so the DNS name would not resolve to the payment Service.\n- B: Reverses the service and namespace order; the correct pattern is `<service>.<namespace>`, not `<namespace>.<service>`.\n- C: Invalid DNS format; `cluster.local` must precede `svc`, not follow the namespace.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl exec frontend -n store -- nslookup payment.finance.svc.cluster.local"
  },
  {
    id: "s03-q005",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "After creating a `ClusterIP` Service, an SRE checks `kubectl get endpoints` and sees `<none>` for the Service. The pods are running. What is the most likely cause?",
    diagram: null,
    options: [
      "The pods are running but kube-proxy has not yet started on their assigned nodes",
      "The `ClusterIP` has not yet been allocated by the API server for the Service",
      "CoreDNS has not propagated the endpoint records into etcd for this Service",
      "The Service's `selector` labels do not match the labels on the running pods"
    ],
    answer: 3,
    explanation: "A Service with `<none>` endpoints almost always indicates a selector mismatch — the labels in `spec.selector` do not match any pod's `metadata.labels`. The ClusterIP is allocated synchronously at creation time. CoreDNS reads Service/Endpoint objects but does not write them. kube-proxy programs forwarding rules but does not affect endpoint registration.\n\nWhy other options are wrong:\n- A: kube-proxy programs forwarding rules but does not affect endpoint registration; endpoints exist even before kube-proxy starts.\n- B: The ClusterIP is allocated synchronously when the Service is created; it is never in a pending state.\n- C: CoreDNS reads Service/Endpoint objects for DNS resolution but does not write or manage them.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#services-without-selectors",
    verify: "kubectl describe svc <service-name> | grep Selector"
  },
  {
    id: "s03-q006",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster administrator wants kube-proxy to use IPVS mode instead of the default iptables mode. Which component's configuration must be changed?",
    diagram: null,
    options: [
      "The kubelet configuration on every node, setting the `proxyMode: ipvs` field",
      "The CNI plugin configuration files under `/etc/cni/net.d/` on each node",
      "The kube-controller-manager startup flag `--proxy-mode=ipvs` in the manifest",
      "The kube-proxy `ConfigMap` or startup flags, setting the `mode: ipvs` field"
    ],
    answer: 3,
    explanation: "kube-proxy's proxy mode is configured in its own `ConfigMap` (typically `kube-proxy` in `kube-system`) or via its `--proxy-mode` flag. Kubelet does not control kube-proxy's mode. kube-controller-manager has no `--proxy-mode` flag. The CNI plugin handles pod network interface setup, not service proxying.\n\nWhy other options are wrong:\n- A: The kubelet manages pod lifecycle on the node; it has no `proxyMode` configuration field.\n- B: CNI plugin configuration handles pod network interface setup, not service proxying mode.\n- C: The kube-controller-manager does not have a `--proxy-mode` flag; it manages cluster-level controllers.\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/",
    verify: "kubectl get configmap kube-proxy -n kube-system -o yaml | grep mode"
  },
  {
    id: "s03-q007",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer creates a `NetworkPolicy` that specifies only `ingress` rules with a `podSelector` matching `app: db`. No `egress` rules are defined in the policy. What happens to outbound traffic from the `app: db` pods?",
    diagram: null,
    options: [
      "All egress is still allowed because the policy only lists `Ingress` in its `policyTypes` field",
      "All egress is blocked because any `NetworkPolicy` implicitly denies all traffic directions",
      "Egress to the internet is blocked but egress within the cluster namespace is still permitted",
      "The policy is rejected by the API server because it must define both ingress and egress rules"
    ],
    answer: 0,
    explanation: "When a `NetworkPolicy` only lists `Ingress` in `policyTypes` (or omits `policyTypes` and only defines ingress rules), it restricts inbound traffic according to its rules but does not affect egress at all — egress remains fully open. A policy does not implicitly deny directions it does not cover. Partial egress blocking is not a default behavior. The policy is syntactically valid.\n\nWhy other options are wrong:\n- B: A NetworkPolicy does not implicitly deny directions not covered by its policyTypes list.\n- C: Partial egress blocking (e.g., internet-only block) is not a default behavior of any NetworkPolicy.\n- D: The API server accepts policies that define only ingress or only egress rules; both are not required.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -o yaml"
  },
  {
    id: "s03-q008",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "Which component is responsible for assigning an IP address to a newly created pod on a node?",
    diagram: null,
    options: [
      "The kube-scheduler when it selects the target node and binds the pod to it",
      "The CNI plugin invoked by the container runtime during pod sandbox setup",
      "The kube-apiserver when it persists the Pod object into the etcd data store",
      "CoreDNS when it registers the pod's A record and assigns a virtual address"
    ],
    answer: 1,
    explanation: "The CNI (Container Network Interface) plugin is called by the container runtime when setting up the pod's network namespace. It allocates an IP from the node's pod CIDR and configures the interface. The scheduler selects a node but does not assign IPs. The API server stores the pod spec but IP assignment happens at runtime. CoreDNS reads pod IPs after they are assigned; it does not assign them.\n\nWhy other options are wrong:\n- A: The kube-scheduler selects a target node for the pod but does not assign IP addresses.\n- C: The kube-apiserver persists the Pod object but IP assignment occurs at container runtime, not at API write time.\n- D: CoreDNS reads pod IPs after assignment to create DNS records; it does not assign addresses.\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.status.podIP}'"
  },
  {
    id: "s03-q009",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "A cluster runs Calico as its CNI. An engineer asks whether pods on different nodes can communicate without NAT. What is the correct answer?",
    diagram: null,
    options: [
      "No — pods on different nodes traverse kube-proxy which performs source NAT on cross-node packets",
      "Yes — the Kubernetes networking model requires every pod to have a unique routable IP without NAT",
      "Cross-node communication requires a `LoadBalancer` Service to bridge node boundaries for pods",
      "Cross-node communication requires both pods to share the same namespace and network policy selector"
    ],
    answer: 1,
    explanation: "The Kubernetes networking model mandates that every pod gets a unique, routable IP and that pods can communicate directly across nodes without NAT. CNI plugins like Calico implement this requirement using BGP, VXLAN, or IP-in-IP overlays. kube-proxy handles Service traffic, not direct pod-to-pod traffic. Neither Services nor namespace boundaries affect this fundamental guarantee.\n\nWhy other options are wrong:\n- A: kube-proxy handles Service-level traffic (ClusterIP, NodePort), not direct pod-to-pod communication, and does not perform source NAT on pod traffic.\n- C: A LoadBalancer Service is for external access; it is not needed for basic pod-to-pod communication across nodes.\n- D: Namespace boundaries and network policy selectors do not affect the fundamental pod-to-pod networking guarantee.\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    verify: null
  },
  {
    id: "s03-q010",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "You need to expose a legacy application that requires clients to connect to the same pod for the duration of their session. Which Service field enables this?",
    diagram: null,
    options: [
      "`spec.selector.sticky: true` to pin each client session to a single pod backend for the session duration",
      "`spec.externalTrafficPolicy: Local` to route only to local pods and maintain client session stickiness",
      "`spec.type: StatefulSet` to enable persistent session handling with stable network identity for pods",
      "`spec.sessionAffinity: ClientIP` to route repeat requests from the same source to a fixed backend"
    ],
    answer: 3,
    explanation: "`sessionAffinity: ClientIP` configures the Service to route all requests from the same client IP to the same backend pod for a configurable timeout. There is no `selector.sticky` field. `externalTrafficPolicy: Local` avoids extra hops for external traffic but does not guarantee session stickiness. `StatefulSet` is a workload kind, not a Service field.\n\nWhy other options are wrong:\n- A: There is no `spec.selector.sticky` field in the Kubernetes Service API.\n- B: `externalTrafficPolicy: Local` avoids extra hops for external traffic but does not guarantee session stickiness.\n- C: `StatefulSet` is a workload controller kind, not a Service type or field; it cannot be used in `spec.type`.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#proxy-mode-userspace",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.sessionAffinity}'"
  },
  {
    id: "s03-q011",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An `ExternalName` Service is defined with `externalName: db.legacy.corp`. When a pod resolves this Service's DNS name, what does CoreDNS return?",
    diagram: null,
    options: [
      "A CNAME record pointing to `db.legacy.corp` directly",
      "An A record containing the `ClusterIP` of the Service",
      "An `SRV` record listing the host and port pair for it",
      "A `TXT` record containing the full connection string"
    ],
    answer: 0,
    explanation: "`ExternalName` Services work exclusively at the DNS level — CoreDNS returns a CNAME record that maps the Service's cluster DNS name to the value in `spec.externalName`. No ClusterIP is allocated for `ExternalName` Services, so there is no A record with a virtual IP. SRV and TXT records are not used for this purpose.\n\nWhy other options are wrong:\n- B: ExternalName Services do not get a ClusterIP allocation, so there is no A record with a virtual IP.\n- C: SRV records are not returned for ExternalName Services; only a CNAME is provided.\n- D: TXT records are not used by Kubernetes DNS for Service resolution.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#externalname",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.externalName}'"
  },
  {
    id: "s03-q012",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod running a sidecar proxy intercepts all outbound traffic by modifying iptables rules inside the pod's network namespace. This pattern is commonly used by which type of technology?",
    diagram: null,
    options: [
      "A CNI plugin such as Flannel or Calico for overlay networking setup",
      "A `PodDisruptionBudget` controller for pod availability management",
      "The kube-proxy component running in IPVS mode on each cluster node",
      "A service mesh such as Istio or Linkerd for traffic management"
    ],
    answer: 3,
    explanation: "Service meshes like Istio inject a sidecar proxy (e.g., Envoy) into each pod and configure iptables rules within the pod's network namespace to intercept traffic for mutual TLS, retries, and observability. CNI plugins configure pod-level networking at creation time but do not inject proxies. kube-proxy manages Service-level rules on the node, not inside pod namespaces. PodDisruptionBudgets control voluntary disruptions, not traffic.\n\nWhy other options are wrong:\n- A: CNI plugins like Flannel configure pod networking at creation time but do not inject sidecar proxies into pods.\n- B: PodDisruptionBudgets control voluntary disruptions (e.g., node drain) and have nothing to do with traffic interception.\n- C: kube-proxy manages Service-level forwarding rules on the node, not iptables rules inside individual pod network namespaces.\n\nReference: https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/",
    verify: null
  },
  {
    id: "s03-q013",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A platform engineer observes that a Flannel-based cluster uses VXLAN encapsulation. What is the primary purpose of this encapsulation?",
    diagram: null,
    options: [
      "To tunnel pod traffic across nodes whose underlying network cannot route the pod CIDR",
      "To encrypt all pod-to-pod traffic with TLS by default when traversing the overlay network",
      "To enforce `NetworkPolicy` rules at the kernel level using VXLAN metadata and identifiers",
      "To load-balance traffic across Service endpoints by wrapping packets in VXLAN encapsulation"
    ],
    answer: 0,
    explanation: "VXLAN encapsulation wraps pod-to-pod packets in UDP so they can traverse a physical network that is unaware of the pod CIDR ranges. It does not provide encryption — that requires additional configuration like WireGuard or IPsec. NetworkPolicy enforcement depends on the CNI's data plane (iptables, eBPF), not VXLAN itself. Load balancing across endpoints is handled by kube-proxy.\n\nWhy other options are wrong:\n- B: VXLAN does not provide encryption by default; TLS or WireGuard must be configured separately.\n- C: NetworkPolicy enforcement depends on the CNI's data plane (iptables, eBPF), not on VXLAN metadata.\n- D: Load balancing across Service endpoints is handled by kube-proxy, not VXLAN encapsulation.\n\nReference: https://kubernetes.io/docs/concepts/cluster-administration/networking/",
    verify: null
  },
  {
    id: "s03-q014",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "An operator sets `externalTrafficPolicy: Local` on a `LoadBalancer` Service. What is the primary effect of this setting?",
    diagram: null,
    options: [
      "The cloud load balancer is restricted to forward traffic within a single availability zone only",
      "kube-proxy disables SNAT for all cluster-internal traffic routed through the Service endpoints",
      "Traffic forwards only to pods on the receiving node, preserving the original client source IP",
      "Only pods configured with `hostNetwork: true` are eligible to receive the Service's traffic flow"
    ],
    answer: 2,
    explanation: "`externalTrafficPolicy: Local` tells kube-proxy to only forward external traffic to pods on the local node, avoiding an extra network hop and preserving the original client source IP. It does not restrict the load balancer to a zone. It affects external-to-Service SNAT, not all internal traffic. `hostNetwork` is unrelated to this policy.\n\nWhy other options are wrong:\n- A: The setting does not restrict the cloud LB to a single availability zone; it controls how kube-proxy routes traffic.\n- B: The setting affects external-to-Service SNAT behavior, not all cluster-internal traffic.\n- D: `hostNetwork: true` is a pod spec setting unrelated to `externalTrafficPolicy`.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#external-traffic-policy",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.externalTrafficPolicy}'"
  },
  {
    id: "s03-q015",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A security team mandates that only the `api-gateway` pods (label `role: gateway`) in namespace `web` can send traffic to `payment` pods (label `app: payment`) in namespace `finance` on port 8443. Which `NetworkPolicy` target and rule combination achieves this?",
    diagram: null,
    options: [
      "Apply a policy in `finance` on `app: payment` pods allowing ingress from `web` namespace with `role: gateway` on port 8443",
      "Apply a policy in `web` on `role: gateway` allowing egress to `finance` namespace on port 8443 for payment services",
      "Apply a policy in `finance` on all pods allowing ingress from any pod in the cluster on port 8443 regardless of labels",
      "Apply a policy in `finance` on `app: payment` allowing ingress from `ipBlock: 0.0.0.0/0` on port 8443 for all sources"
    ],
    answer: 0,
    explanation: "The policy should be applied to the target pods (`app: payment` in `finance`) and allow ingress only from pods matching `role: gateway` in the `web` namespace on port 8443. Option B applies an egress policy on the source side but does not restrict who can reach payment pods. Option C is too broad — it allows any pod. Option D allows any IP including external traffic, violating least-privilege.\n\nWhy other options are wrong:\n- B: An egress policy on the source side does not restrict who else can reach the payment pods from other namespaces.\n- C: Allowing ingress from any pod on port 8443 is too broad and violates the least-privilege requirement.\n- D: Allowing ingress from `ipBlock: 0.0.0.0/0` permits any IP including external traffic, violating the security mandate.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n finance -o yaml"
  },
  {
    id: "s03-q016",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster uses CoreDNS. A pod in namespace `alpha` resolves the short name `my-svc`. According to the default `resolv.conf` search domains, which FQDN does the resolver try first?",
    diagram: null,
    options: [
      "`my-svc.default.svc.cluster.local`",
      "`my-svc.alpha.cluster.local`",
      "`my-svc.svc.cluster.local`",
      "`my-svc.alpha.svc.cluster.local`"
    ],
    answer: 3,
    explanation: "The kubelet injects search domains into each pod's `/etc/resolv.conf` in this order: `<namespace>.svc.cluster.local`, `svc.cluster.local`, `cluster.local`. A short name is appended to the first search domain first, yielding `my-svc.alpha.svc.cluster.local`. The first option uses the default namespace, which is wrong for a pod in alpha.\n\nWhy other options are wrong:\n- A: Uses the `default` namespace, but the pod is in `alpha`; the first search domain uses the pod's own namespace.\n- B: `my-svc.alpha.cluster.local` skips the `svc` segment; this is not a valid search domain.\n- C: `my-svc.svc.cluster.local` omits the namespace; the first search domain is `<namespace>.svc.cluster.local`.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl exec <pod> -n alpha -- cat /etc/resolv.conf"
  },
  {
    id: "s03-q017",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "An engineer creates a headless Service (`clusterIP: None`) for a StatefulSet with 3 replicas named `cache`. What DNS records are created for individual pods?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="120" y="10" width="160" height="30" rx="4" fill="#326CE5"/><text x="200" y="30" text-anchor="middle" fill="#fff" font-size="11">cache (headless svc)</text><text x="200" y="55" text-anchor="middle" fill="#ccc" font-size="9">clusterIP: None</text><line x1="120" y1="40" x2="60" y2="100" stroke="#999" stroke-width="1"/><line x1="200" y1="55" x2="200" y2="100" stroke="#999" stroke-width="1"/><line x1="280" y1="40" x2="340" y2="100" stroke="#999" stroke-width="1"/><rect x="10" y="100" width="100" height="30" rx="3" fill="#4CAF50"/><text x="60" y="120" text-anchor="middle" fill="#fff" font-size="9">cache-0</text><rect x="150" y="100" width="100" height="30" rx="3" fill="#4CAF50"/><text x="200" y="120" text-anchor="middle" fill="#fff" font-size="9">cache-1</text><rect x="290" y="100" width="100" height="30" rx="3" fill="#4CAF50"/><text x="340" y="120" text-anchor="middle" fill="#fff" font-size="9">cache-2</text><text x="60" y="150" text-anchor="middle" fill="#aaa" font-size="8">?</text><text x="200" y="150" text-anchor="middle" fill="#aaa" font-size="8">?</text><text x="340" y="150" text-anchor="middle" fill="#aaa" font-size="8">?</text></svg>',
    options: [
      "SRV records only, with no A records created for the individual pod endpoints",
      "CNAME records that map `cache-0` through `cache-2` to the node's IP address",
      "A single A record for `cache` that resolves to all three pod IPs at one time",
      "A records like `cache-0.cache.<ns>.svc.cluster.local` resolving to each pod IP"
    ],
    answer: 3,
    explanation: "A headless Service combined with a StatefulSet creates individual A records for each pod following the pattern `<pod-name>.<service-name>.<namespace>.svc.cluster.local`. This gives each pod a stable DNS identity. CNAME records to node IPs are not created. While a DNS query on the Service name returns all pod IPs, individual pod A records are the distinguishing feature. SRV records exist too, but A records are also created.\n\nWhy other options are wrong:\n- A: Both SRV and A records are created for StatefulSet pods behind a headless Service; A records are not omitted.\n- B: CNAME records mapping to node IPs are not created; the A records point to individual pod IPs.\n- C: While the Service-level DNS query returns all pod IPs, the distinguishing feature is individual per-pod A records.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#srv-records",
    verify: "kubectl exec <pod> -- nslookup cache-0.cache.<namespace>.svc.cluster.local"
  },
  {
    id: "s03-q018",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A company migrating to Kubernetes wants each microservice to be independently deployable and to communicate over the network. To minimize coupling, which approach best aligns with cloud native networking principles?",
    diagram: null,
    options: [
      "All microservices share a single pod so they can communicate over the `localhost` interface directly",
      "Microservices write to a shared NFS volume and poll for changes as an inter-process mechanism",
      "Each microservice exposes a Kubernetes Service and communicates via well-defined APIs over HTTP",
      "Each microservice opens a direct TCP socket to every other microservice pod IP for communication"
    ],
    answer: 2,
    explanation: "Cloud native principles favor loose coupling through well-defined Service abstractions and APIs. Kubernetes Services provide stable endpoints that decouple consumers from individual pod IPs. Sharing a pod eliminates independent deployability. Shared NFS polling is fragile and slow. Direct pod IP connections break when pods reschedule and bypass the Service abstraction.\n\nWhy other options are wrong:\n- A: Placing all microservices in a single pod eliminates independent deployability and scalability.\n- B: Shared NFS polling is fragile, slow, and tightly couples services through a filesystem interface.\n- D: Direct pod IP connections break when pods reschedule and bypass the Service abstraction for stable endpoints.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s03-q019",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "A platform team evaluates CNI plugins for their new production cluster. They need support for NetworkPolicy enforcement and a high-performance kernel-level dataplane. Which CNCF project fits this requirement?",
    diagram: null,
    options: [
      "Cilium — a CNCF project with eBPF dataplane and NetworkPolicy support",
      "Flannel — a CNI plugin providing overlay networking with a basic dataplane",
      "kube-router — a networking project using BGP with NetworkPolicy via iptables",
      "Multus — a meta-CNI plugin that attaches multiple network interfaces to pods"
    ],
    answer: 0,
    explanation: "Cilium is a CNCF graduated project that uses eBPF for high-performance networking and has full `NetworkPolicy` support plus extended policy features. Flannel is a simple overlay CNI that does not enforce `NetworkPolicy`. kube-router supports policies via iptables but does not use eBPF. Multus is not a CNCF project; it is a meta-CNI plugin that attaches multiple interfaces to pods but delegates actual networking to other plugins.\n\nWhy other options are wrong:\n- B: Flannel is a simple overlay CNI focused on basic connectivity; it does not enforce NetworkPolicy.\n- C: kube-router supports NetworkPolicy via iptables but does not use an eBPF dataplane.\n- D: Multus is a meta-CNI plugin (not a CNCF project) that attaches multiple network interfaces to pods but delegates actual networking to other CNI plugins.\n\nReference: https://www.cncf.io/projects/cilium/",
    verify: null
  },
  {
    id: "s03-q020",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices application has 20 services communicating over mTLS. The team struggles with managing certificates, retries, and circuit breaking at the application level. Which infrastructure pattern offloads these cross-cutting concerns from application code?",
    diagram: null,
    options: [
      "Adding a `NetworkPolicy` for each service pair to enforce encryption, authentication, and access",
      "Configuring `readinessProbe` on each pod to handle retries and circuit breaking automatically",
      "Using a `CronJob` to rotate certificates and restart affected pods on a periodic schedule run",
      "Deploying a `service mesh` that handles mTLS, retries, and circuit breaking via sidecar proxies"
    ],
    answer: 3,
    explanation: "A service mesh (e.g., Istio, Linkerd) injects sidecar proxies that transparently handle mTLS, retries, circuit breaking, and observability without application code changes. `NetworkPolicy` controls access but does not handle encryption, retries, or circuit breaking. Readiness probes determine if a pod can serve traffic but do not perform retries. CronJob certificate rotation does not address retries or circuit breaking.\n\nWhy other options are wrong:\n- A: NetworkPolicy controls pod-to-pod access at L3/L4 but cannot handle mTLS, retries, or circuit breaking.\n- B: readinessProbe determines if a pod can serve traffic; it does not perform retries or circuit breaking.\n- C: A CronJob for certificate rotation addresses only one concern and does not handle retries or circuit breaking.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s03-q021",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "An application behind a `LoadBalancer` Service experiences intermittent 503 errors when backend pods are scaling down. Which Kubernetes mechanism helps pods finish in-flight requests before termination?",
    diagram: null,
    options: [
      "The `terminationGracePeriodSeconds` combined with proper SIGTERM handling in the app",
      "Setting `spec.minReadySeconds` to a high value on the Deployment's rolling update strategy",
      "Configuring a `PodDisruptionBudget` with `maxUnavailable: 0` to prevent pod terminations",
      "Increasing the Service's `spec.sessionAffinity` timeout to keep connections routed properly"
    ],
    answer: 0,
    explanation: "`terminationGracePeriodSeconds` gives a pod time to shut down gracefully after receiving SIGTERM, allowing it to drain in-flight requests. `minReadySeconds` delays marking new pods as available but does not help terminating pods. A PDB with `maxUnavailable: 0` prevents voluntary disruptions entirely but does not address graceful draining during scaling. Session affinity timeout governs routing stickiness, not shutdown behavior.\n\nWhy other options are wrong:\n- B: `minReadySeconds` delays marking new pods as available during rollouts; it does not help terminating pods drain requests.\n- C: A PDB with `maxUnavailable: 0` prevents voluntary disruptions entirely but does not address graceful draining during scaling.\n- D: Session affinity timeout governs routing stickiness for client IP binding, not pod shutdown behavior.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.terminationGracePeriodSeconds}'"
  },
  {
    id: "s03-q022",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "An SRE wants to monitor the latency of requests flowing through a `ClusterIP` Service. Which approach provides per-request latency metrics without modifying application code?",
    diagram: null,
    options: [
      "Query `kubectl top service` to retrieve per-service request latency metrics directly from nodes",
      "Deploy a service mesh that captures L7 metrics from sidecar proxies and exports to Prometheus",
      "Enable verbose logging on kube-proxy to extract request timing data from iptables rule matches",
      "Set `spec.publishNotReadyAddresses: true` on the Service to expose latency response headers"
    ],
    answer: 1,
    explanation: "Service mesh sidecar proxies intercept all traffic and can report L7 metrics such as request latency, status codes, and throughput to Prometheus without code changes. `kubectl top service` does not exist. kube-proxy operates at L4 and iptables logs do not contain request latency. `publishNotReadyAddresses` controls whether not-ready pods appear in DNS, not latency measurement.\n\nWhy other options are wrong:\n- A: `kubectl top service` does not exist as a command; `kubectl top` works only for pods and nodes.\n- C: kube-proxy operates at L4 and iptables logs do not contain HTTP request latency information.\n- D: `publishNotReadyAddresses` controls whether not-ready pods appear in DNS; it does not expose latency headers.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s03-q023",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "A distributed application uses an Ingress controller, three microservices, and a database. Requests sometimes take over 10 seconds. Which observability practice helps identify which service introduces the latency?",
    diagram: null,
    options: [
      "Distributed tracing with propagated `trace-context` headers across services",
      "Increasing the log level to `DEBUG` on all pods and reading aggregated output",
      "Adding `livenessProbe` checks with a 2-second timeout to every container",
      "Creating a `NetworkPolicy` that logs all denied connections between services"
    ],
    answer: 0,
    explanation: "Distributed tracing (e.g., using OpenTelemetry, Jaeger) propagates trace IDs across service boundaries, allowing you to see a waterfall view of where time is spent per service. Debug logs are verbose and hard to correlate across services. Liveness probes detect failures but do not measure latency. NetworkPolicy logging shows denied traffic, not latency sources.\n\nWhy other options are wrong:\n- B: DEBUG-level logs are verbose and very difficult to correlate across multiple services for latency analysis.\n- C: livenessProbe checks detect failures and trigger restarts but do not measure or report latency between services.\n- D: NetworkPolicy logging shows denied connections, not latency sources or timing data.\n\nReference: https://opentelemetry.io/docs/concepts/signals/traces/",
    verify: null
  },
  {
    id: "s03-q024",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A team performs a canary deployment of a new version of their Service. They want 10% of traffic routed to the canary pods. The standard Kubernetes `Service` object load-balances equally across all endpoints. How can they achieve percentage-based routing?",
    diagram: null,
    options: [
      "Set `spec.weight: 10` on the canary Deployment's Service annotation for traffic splitting",
      "Create a `NetworkPolicy` that limits 10% of connections to the canary pod endpoints only",
      "Scale the canary Deployment to 10% of the main Deployment's replica count for rough split",
      "Use a service mesh or Ingress controller that supports weighted traffic splitting rules"
    ],
    answer: 3,
    explanation: "A service mesh (e.g., Istio VirtualService) or advanced Ingress controller (e.g., NGINX with canary annotations) can split traffic by weight. There is no `spec.weight` field on a Service. NetworkPolicy cannot perform traffic shaping or percentage-based routing. Scaling to 10% replicas approximates the ratio but is imprecise and couples deployment with traffic management.\n\nWhy other options are wrong:\n- A: There is no `spec.weight` field on a Kubernetes Service resource.\n- B: NetworkPolicy cannot perform traffic shaping or percentage-based routing; it only allows or denies traffic.\n- C: Scaling to 10% replicas roughly approximates the ratio but is imprecise and tightly couples deployment with traffic management.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s03-q025",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart templates a `Service` and an `Ingress` resource. During `helm upgrade`, the team wants to switch from `ClusterIP` to `NodePort` without editing the template files. How should they pass this change?",
    diagram: null,
    options: [
      "`helm upgrade <release> <chart> --set service.type=NodePort` to override the value",
      "`kubectl patch svc <name> -p '{\"spec\":{\"type\":\"NodePort\"}}'` after the helm upgrade",
      "`helm upgrade <release> <chart> --reuse-values --force` to reapply with existing values",
      "`helm rollback <release> 0` then redeploy with the new type set in a values override"
    ],
    answer: 0,
    explanation: "Helm's `--set` flag overrides chart values at upgrade time, letting you change `service.type` without editing template files. Patching with kubectl after the upgrade works but bypasses Helm's state tracking. `--reuse-values --force` reuses previous values without changing the type. Rolling back to revision 0 (the previous release) would restore the old values and not set the new Service type.\n\nWhy other options are wrong:\n- B: Patching with kubectl after an upgrade works but bypasses Helm's state tracking, causing drift.\n- C: `--reuse-values --force` reuses the previous values without changing the Service type.\n- D: Rolling back to revision 0 restores the prior state and does not set the new Service type.\n\nReference: https://helm.sh/docs/helm/helm_upgrade/",
    verify: "helm get values <release>"
  },
  {
    id: "s03-q026",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer deploys a `LoadBalancer` Service in a bare-metal cluster without a cloud provider. The Service remains in `Pending` state for the external IP. What is the most likely solution?",
    diagram: null,
    options: [
      "Install a bare-metal load balancer implementation such as `MetalLB` to allocate external IPs",
      "Restart the kube-controller-manager with the `--cloud-provider=external` flag for LB support",
      "Switch to `NodePort` because bare-metal clusters lack built-in external load balancer provisioning",
      "Add the annotation `service.beta.kubernetes.io/load-balancer-type: internal` to the Service"
    ],
    answer: 0,
    explanation: "On bare-metal clusters, there is no cloud provider to provision an external load balancer, so `LoadBalancer` Services stay `Pending`. MetalLB is a widely used solution that allocates IPs from a configured pool and announces them via ARP or BGP. Switching to `NodePort` is a workaround but does not solve the `LoadBalancer` requirement. Restarting kube-controller-manager does not help without an actual provider. The `internal` annotation is for cloud environments to create internal LBs.\n\nWhy other options are wrong:\n- B: Restarting the kube-controller-manager with `--cloud-provider=external` does not help without an actual LB provider implementation.\n- C: Switching to NodePort is a workaround, not a solution for the LoadBalancer requirement.\n- D: The `internal` annotation is for cloud environments to create internal LBs; it has no effect on bare-metal.\n\nReference: https://metallb.universe.tf/",
    verify: "kubectl get svc -o wide"
  },
  {
    id: "s03-q027",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod defines `readinessProbe` on port 8080. When the probe fails, what happens to the pod's IP in the Service's Endpoints object?",
    diagram: null,
    options: [
      "The pod is terminated and its Endpoints entry is permanently deleted by the controller",
      "The pod's IP is removed from the Endpoints object so it no longer receives Service traffic",
      "The Service switches to a different port automatically to reach a healthy pod on the node",
      "kube-proxy doubles the health check frequency for that endpoint until the probe succeeds"
    ],
    answer: 1,
    explanation: "When a readiness probe fails, the Endpoints controller removes the pod's IP from the associated Endpoints object, causing kube-proxy to stop forwarding traffic to that pod. The pod is not terminated — that would require a failed liveness probe. Services do not switch ports. kube-proxy does not control probe frequency; the kubelet does.\n\nWhy other options are wrong:\n- A: The pod is not terminated when a readiness probe fails; only a failed liveness probe triggers termination. The Endpoints entry is temporarily removed, not permanently deleted.\n- C: Services do not automatically switch ports; they forward to the configured targetPort.\n- D: kube-proxy does not control probe frequency; the kubelet manages probe scheduling.\n\nReference: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s03-q028",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "CoreDNS in a Kubernetes cluster is typically deployed as which kind of workload?",
    diagram: null,
    options: [
      "A DaemonSet ensuring one DNS pod runs on every node",
      "A StatefulSet with persistent storage for DNS records",
      "A Deployment with a corresponding ClusterIP Service",
      "A static pod managed directly by kubelet on each node"
    ],
    answer: 2,
    explanation: "CoreDNS is deployed as a `Deployment` (usually with 2 replicas for HA) fronted by a `ClusterIP` Service named `kube-dns` in the `kube-system` namespace. It is not a DaemonSet because it does not need to run on every node. It is not a StatefulSet because DNS state is ephemeral. While some control-plane components run as static pods, CoreDNS uses a standard Deployment.\n\nWhy other options are wrong:\n- A: CoreDNS is not a DaemonSet; it does not need to run on every node.\n- B: CoreDNS is not a StatefulSet; DNS state is ephemeral and does not require persistent storage.\n- D: CoreDNS is not a static pod; it is managed by a standard Deployment in `kube-system`.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/coredns/",
    verify: "kubectl get deployment coredns -n kube-system"
  },
  {
    id: "s03-q029",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An administrator configures an Ingress resource with TLS termination. Where is the TLS certificate stored?",
    diagram: null,
    options: [
      "In a `ConfigMap` in the same namespace as the Ingress resource for TLS data",
      "In the Ingress controller's container filesystem at the `/etc/ssl/` directory",
      "In a `Secret` of type `kubernetes.io/tls` referenced by the Ingress resource",
      "In etcd directly, accessible only by the kube-apiserver component at runtime"
    ],
    answer: 2,
    explanation: "Ingress TLS configuration references a Kubernetes `Secret` of type `kubernetes.io/tls` that contains `tls.crt` and `tls.key` fields. The Ingress controller reads this Secret to configure TLS. ConfigMaps are for non-sensitive data. Storing certs directly on the controller filesystem is not the standard approach. While Secrets are stored in etcd, they are accessed through the API server as Secret objects, not directly.\n\nWhy other options are wrong:\n- A: ConfigMaps are for non-sensitive configuration data; TLS certificates and keys are sensitive and belong in Secrets.\n- B: Storing certs directly on the controller filesystem is not the standard Kubernetes approach; it bypasses declarative management.\n- D: While Secrets are stored in etcd, they are accessed through the API server as Secret objects, not accessed directly from etcd.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#tls",
    verify: "kubectl get secret <tls-secret-name> -o yaml"
  },
  {
    id: "s03-q030",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team configures a `NetworkPolicy` with an empty `podSelector: {}` in namespace `production`. What is the scope of this policy?",
    diagram: null,
    options: [
      "It applies to all pods across every namespace in the entire cluster",
      "It applies only to pods that have no labels in the `production` namespace",
      "It applies to every pod currently running in the `production` namespace",
      "The policy is invalid and will be rejected by the Kubernetes API server"
    ],
    answer: 2,
    explanation: "An empty `podSelector: {}` matches all pods within the namespace where the `NetworkPolicy` is created — in this case, `production`. NetworkPolicies are namespace-scoped, so it never applies to other namespaces. An empty selector matches all pods, not just unlabeled ones. The syntax is valid.\n\nWhy other options are wrong:\n- A: NetworkPolicies are namespace-scoped and never apply across all namespaces in the cluster.\n- B: An empty `podSelector: {}` matches all pods in the namespace, not just unlabeled ones.\n- D: An empty podSelector is valid syntax and is accepted by the API server.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n production"
  },
  {
    id: "s03-q031",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A `NodePort` Service is created without specifying a port number. Which range does Kubernetes use to auto-assign the node port?",
    diagram: null,
    options: [
      "80–443 reserved for standard HTTP and HTTPS traffic on the host machines",
      "1024–65535 which covers the entire non-privileged port range on nodes",
      "30000–32767 which is the default NodePort allocation range for Services",
      "49152–65535 which is the IANA dynamic and private port range on hosts"
    ],
    answer: 2,
    explanation: "The default `NodePort` range is 30000–32767, as defined by the kube-apiserver's `--service-node-port-range` flag. Ports 80–443 are well-known ports typically reserved for web servers. The range 1024–65535 covers unprivileged ports but is too broad. The ephemeral port range 49152–65535 is used by the OS for outbound connections, not by Kubernetes for NodePort Services.\n\nWhy other options are wrong:\n- A: Ports 80-443 are well-known ports for HTTP/HTTPS, not the NodePort allocation range.\n- B: 1024-65535 covers the entire non-privileged port range, which is far broader than the NodePort range.\n- D: 49152-65535 is the IANA dynamic/private port range used by the OS for outbound connections, not by Kubernetes.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.ports[0].nodePort}'"
  },
  {
    id: "s03-q032",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "You create a Service with `spec.clusterIP: None`. When you perform a DNS lookup for the Service, what do you get?",
    diagram: null,
    options: [
      "A single A record with the IP `0.0.0.0` representing no valid cluster endpoint",
      "No DNS record is created because headless Services bypass CoreDNS entirely",
      "A set of A records, one for each pod endpoint matched by the Service selector",
      "A CNAME record pointing to the first ready pod in the endpoint list for the svc"
    ],
    answer: 2,
    explanation: "A headless Service (`clusterIP: None`) causes CoreDNS to return A records for each individual pod endpoint rather than a single virtual IP. This allows clients to discover all backend pod IPs directly. It does not return `0.0.0.0`. DNS records are still created. CNAME records are used by `ExternalName` Services, not headless ones.\n\nWhy other options are wrong:\n- A: A headless Service does not return `0.0.0.0`; it returns actual pod endpoint IPs.\n- B: DNS records are still created for headless Services; they are not bypassed.\n- D: CNAME records are used by ExternalName Services, not by headless Services.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
    verify: "kubectl exec <pod> -- nslookup <headless-service>.<namespace>.svc.cluster.local"
  },
  {
    id: "s03-q033",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "Which Kubernetes component watches for Service and Endpoint changes and updates the network rules on each node?",
    diagram: '<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="30" rx="4" fill="#326CE5"/><text x="200" y="25" text-anchor="middle" fill="#fff" font-size="11">API Server</text><line x1="200" y1="35" x2="200" y2="60" stroke="#999" stroke-width="1.5"/><text x="210" y="52" fill="#ccc" font-size="9">watch</text><rect x="130" y="60" width="140" height="30" rx="4" fill="#FF9800"/><text x="200" y="80" text-anchor="middle" fill="#fff" font-size="11">? (component)</text><line x1="140" y1="90" x2="60" y2="120" stroke="#999" stroke-width="1"/><line x1="200" y1="90" x2="200" y2="120" stroke="#999" stroke-width="1"/><line x1="260" y1="90" x2="340" y2="120" stroke="#999" stroke-width="1"/><rect x="10" y="120" width="100" height="25" rx="3" fill="#555"/><text x="60" y="137" text-anchor="middle" fill="#fff" font-size="9">network rules</text><rect x="150" y="120" width="100" height="25" rx="3" fill="#555"/><text x="200" y="137" text-anchor="middle" fill="#fff" font-size="9">network rules</text><rect x="290" y="120" width="100" height="25" rx="3" fill="#555"/><text x="340" y="137" text-anchor="middle" fill="#fff" font-size="9">network rules</text><text x="60" y="155" text-anchor="middle" fill="#aaa" font-size="8">Node 1</text><text x="200" y="155" text-anchor="middle" fill="#aaa" font-size="8">Node 2</text><text x="340" y="155" text-anchor="middle" fill="#aaa" font-size="8">Node 3</text></svg>',
    options: [
      "kubelet — the primary node agent that manages pod lifecycle on nodes",
      "kube-proxy — the component that programs network forwarding rules",
      "kube-controller-manager — the component running reconciliation loops",
      "kube-scheduler — the component that assigns pods to nodes in a cluster"
    ],
    answer: 1,
    explanation: "kube-proxy watches the API server for Service and Endpoint changes and updates iptables, IPVS, or userspace proxy rules on each node to implement service routing. The kubelet manages pod lifecycle. The scheduler assigns pods to nodes. The kube-controller-manager runs controllers like the Endpoints controller but does not program node-level forwarding rules.\n\nWhy other options are wrong:\n- A: The kubelet manages pod lifecycle on nodes but does not program network forwarding rules.\n- C: The kube-controller-manager runs controllers (including the Endpoints controller) but does not program node-level forwarding rules.\n- D: The kube-scheduler assigns pods to nodes and has no role in network forwarding rule programming.\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/",
    verify: "kubectl get daemonset kube-proxy -n kube-system"
  },
  {
    id: "s03-q034",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An Ingress resource specifies `host: api.example.com` with a backend pointing to service `api-svc` on port 80. The Ingress controller is running, but requests to `api.example.com` time out or fail to connect. Which is the most likely cause?",
    diagram: null,
    options: [
      "The DNS record for `api.example.com` does not resolve to the Ingress controller's external IP address",
      "The `api-svc` Service is of type `LoadBalancer` instead of `ClusterIP`, conflicting with routing",
      "The Ingress controller in use does not support host-based routing, only path-based routing rules",
      "A `NetworkPolicy` is blocking traffic from the Ingress controller namespace to the `api-svc` pods"
    ],
    answer: 0,
    explanation: "If the DNS for `api.example.com` does not resolve to the Ingress controller's IP, the request will either not arrive or arrive at a different server. When DNS does not point to the Ingress controller, requests either time out or fail to connect. The Service type does not prevent Ingress routing. Most Ingress controllers support host-based routing by default. While a NetworkPolicy could block traffic, a DNS misconfiguration is the most common cause of this symptom.\n\nWhy other options are wrong:\n- B: Using a LoadBalancer Service type for the backend does not prevent Ingress routing; Ingress can route to any Service type.\n- C: Most Ingress controllers support both host-based and path-based routing by default.\n- D: While a NetworkPolicy could theoretically block traffic, DNS misconfiguration is the most common cause of this symptom.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: "kubectl get ingress -o wide"
  },
  {
    id: "s03-q035",
    domain: "Kubernetes Fundamentals",
    subsection: "Core Concepts",
    text: "Two containers in the same pod need to communicate. Which network interface do they share?",
    diagram: null,
    options: [
      "They share the pod's network namespace and communicate via `localhost`",
      "They each get a separate IP address and must use a Service to connect",
      "They communicate only through a shared `emptyDir` volume on the node",
      "The CNI plugin creates a virtual bridge between the two container endpoints"
    ],
    answer: 0,
    explanation: "All containers in a pod share the same network namespace, meaning they share the same IP address and can reach each other on `localhost` using different ports. They do not get separate IPs. While shared volumes are a valid communication method, the network namespace is the networking answer. The CNI plugin assigns the pod IP but does not create bridges between co-located containers.\n\nWhy other options are wrong:\n- B: Containers in the same pod share a single IP address; they do not get separate IPs.\n- C: Shared volumes (like emptyDir) are a valid IPC method but not the networking mechanism; the question asks about network interfaces.\n- D: The CNI plugin assigns the pod IP but does not create virtual bridges between co-located containers within the same pod.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/#pod-networking",
    verify: null
  },
  {
    id: "s03-q036",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service of type `ClusterIP` has the annotation `service.kubernetes.io/topology-mode: Auto`. What behavior does this enable?",
    diagram: null,
    options: [
      "Traffic between topology zones is encrypted automatically by kube-proxy using IPsec tunnels",
      "kube-proxy prefers routing traffic to endpoints in the same topology zone as the client",
      "The Service is replicated across multiple clusters for geographic high availability setup",
      "Pods are scheduled only in the zone with the most available resources for the workload"
    ],
    answer: 1,
    explanation: "Topology-aware routing (previously called Topology Aware Hints) allows kube-proxy to prefer endpoints in the same zone as the requesting pod, reducing cross-zone traffic and latency. It does not encrypt traffic. It does not replicate Services across clusters. Scheduling decisions are made by the kube-scheduler based on different criteria, not Service annotations.\n\nWhy other options are wrong:\n- A: Topology-aware routing does not encrypt traffic; IPsec requires separate configuration.\n- C: The setting does not replicate Services across clusters; it affects endpoint preference within a single cluster.\n- D: Scheduling decisions are made by the kube-scheduler, not influenced by Service annotations.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/topology-aware-routing/",
    verify: "kubectl get svc <service-name> -o yaml | grep topology"
  },
  {
    id: "s03-q037",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An operator needs to expose a TCP service on port 3306 (MySQL) externally. The cluster is on AWS. Which Service configuration requests an internal-only load balancer?",
    diagram: null,
    options: [
      "Type `ClusterIP` with `externalIPs` set to the VPC subnet range for internal load balancing purposes",
      "Type `NodePort` with annotation `service.beta.kubernetes.io/aws-load-balancer-type: nlb` set on it",
      "Type `LoadBalancer` with annotation `service.beta.kubernetes.io/aws-load-balancer-internal: \"true\"`",
      "Type `ExternalName` with `externalName` set to the NLB DNS name for direct internal DNS resolution "
    ],
    answer: 2,
    explanation: "To create an internal AWS load balancer, you use a `LoadBalancer` Service with the `aws-load-balancer-internal` annotation set to `\"true\"`. `NodePort` does not provision cloud load balancers regardless of annotations. `ClusterIP` with `externalIPs` requires manual IP management and does not create a cloud load balancer. `ExternalName` maps DNS but does not provision infrastructure.\n\nWhy other options are wrong:\n- A: ClusterIP with `externalIPs` requires manual IP management and does not provision a cloud load balancer.\n- B: NodePort does not provision cloud load balancers regardless of annotations applied to it.\n- D: ExternalName maps DNS but does not provision any infrastructure or load balancer.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#internal-load-balancer",
    verify: "kubectl get svc <service-name> -o jsonpath='{.metadata.annotations}'"
  },
  {
    id: "s03-q038",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod's `/etc/resolv.conf` shows `nameserver 10.96.0.10`. What does this IP address typically represent?",
    diagram: null,
    options: [
      "The IP of the node's local `DNS cache daemon` running on each worker",
      "The `kube-apiserver`'s `ClusterIP` used for cluster management traffic",
      "The ClusterIP of the `kube-dns` Service fronting CoreDNS in `kube-system`",
      "A hardcoded Google Public DNS address (`8.8.8.8`) configured in the base image"
    ],
    answer: 2,
    explanation: "The `nameserver` entry in a pod's `resolv.conf` points to the `ClusterIP` of the `kube-dns` Service (which fronts CoreDNS) in the `kube-system` namespace. This is typically `10.96.0.10` in default kubeadm clusters. It is not a node-local cache by default. The API server uses a different IP. Google DNS uses `8.8.8.8`, not `10.96.0.10`.\n\nWhy other options are wrong:\n- A: By default, Kubernetes does not run a node-local DNS cache daemon; the nameserver entry points to the cluster DNS Service.\n- B: The kube-apiserver has its own ClusterIP (often 10.96.0.1 in kubeadm), which is different from the DNS Service IP.\n- D: Google Public DNS uses 8.8.8.8 and 8.8.4.4, not addresses in the 10.96.x.x service CIDR range.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    verify: "kubectl get svc kube-dns -n kube-system"
  },
  {
    id: "s03-q039",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A platform engineer wants to attach a second network interface to a pod for a specialized VLAN. Which component enables this?",
    diagram: null,
    options: [
      "kube-proxy configured with dual-stack support for multiple network interfaces",
      "Multus CNI, a meta-plugin that delegates to multiple CNI backends per pod",
      "CoreDNS with a custom zone file for VLAN-specific DNS name resolution",
      "A dedicated `NetworkPolicy` using a VLAN selector for interface isolation"
    ],
    answer: 1,
    explanation: "Multus is a CNI meta-plugin that enables attaching multiple network interfaces to a pod by delegating to different CNI plugins for each interface. kube-proxy handles Service forwarding, not pod interfaces. CoreDNS manages DNS resolution. NetworkPolicy controls traffic flow rules but cannot attach additional interfaces.\n\nWhy other options are wrong:\n- A: kube-proxy handles Service forwarding rules; dual-stack support is about IP address families, not multiple network interfaces.\n- C: CoreDNS manages DNS resolution and has no capability to attach network interfaces to pods.\n- D: NetworkPolicy controls traffic flow rules at L3/L4 but cannot attach additional network interfaces to pods.\n\nReference: https://github.com/k8snetworkplumbingwg/multus-cni",
    verify: null
  },
  {
    id: "s03-q040",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "After upgrading the CNI plugin, all new pods get stuck in `ContainerCreating` state. Existing pods still work. What should the engineer check first?",
    diagram: null,
    options: [
      "Whether kube-proxy is running in IPVS mode instead of iptables mode on the affected nodes",
      "Whether CNI binaries and config under `/etc/cni/net.d/` and `/opt/cni/bin/` are installed",
      "Whether the kubelet has the `--network-plugin=cni` flag removed from its startup arguments",
      "Whether CoreDNS pods are in `CrashLoopBackOff` and unable to resolve pod DNS registrations"
    ],
    answer: 1,
    explanation: "When new pods fail at `ContainerCreating`, the most common cause after a CNI upgrade is missing or misconfigured CNI binaries (`/opt/cni/bin/`) or config files (`/etc/cni/net.d/`). Existing pods retain their network setup. kube-proxy mode does not affect pod creation. The `--network-plugin` flag was removed in Kubernetes 1.24 along with dockershim; in current versions the kubelet has no such flag. CoreDNS issues would cause DNS failures, not pod creation failures.\n\nWhy other options are wrong:\n- A: kube-proxy mode (IPVS vs. iptables) does not affect pod creation or the ContainerCreating state.\n- C: The `--network-plugin=cni` flag was removed in Kubernetes 1.24; in current versions the kubelet has no such flag.\n- D: CoreDNS issues cause DNS failures in running pods, not pod creation failures at the ContainerCreating stage.\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
    verify: "kubectl describe pod <pod-name> | grep -A5 Events"
  },
  {
    id: "s03-q041",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A `NetworkPolicy` with `spec.policyTypes: [\"Ingress\", \"Egress\"]` is applied to `app: web` pods but defines no `ingress` or `egress` rules. What is the effect?",
    diagram: '<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg"><rect x="130" y="50" width="140" height="50" rx="4" fill="#f44336"/><text x="200" y="72" text-anchor="middle" fill="#fff" font-size="11">app: web</text><text x="200" y="88" text-anchor="middle" fill="#fff" font-size="9">NetworkPolicy applied</text><line x1="50" y1="75" x2="130" y2="75" stroke="#999" stroke-width="2"/><text x="90" y="65" text-anchor="middle" fill="#ccc" font-size="14">?</text><text x="50" y="110" fill="#ccc" font-size="9">Ingress</text><line x1="270" y1="75" x2="360" y2="75" stroke="#999" stroke-width="2"/><text x="315" y="65" text-anchor="middle" fill="#ccc" font-size="14">?</text><text x="340" y="110" fill="#ccc" font-size="9">Egress</text><text x="200" y="140" text-anchor="middle" fill="#ff9800" font-size="10">policyTypes: [Ingress, Egress]</text></svg>',
    options: [
      "All ingress and egress traffic to and from the selected pods is denied",
      "All ingress and egress is allowed because no explicit deny rules exist",
      "Only egress is denied while ingress defaults to allow with no rules set",
      "The policy has no effect because it has no rules and is treated as a no-op"
    ],
    answer: 0,
    explanation: "When a NetworkPolicy selects pods and lists both `Ingress` and `Egress` in `policyTypes` but defines no rules, it acts as a default-deny for both directions. Kubernetes NetworkPolicy is whitelist-based: once a pod is selected, only explicitly allowed traffic is permitted. An empty rule set means nothing is allowed. The policy absolutely has an effect.\n\nWhy other options are wrong:\n- B: Kubernetes NetworkPolicy is whitelist-based; once a pod is selected with policyTypes, only explicitly allowed traffic is permitted.\n- C: Both directions are denied, not just egress; the policy lists both Ingress and Egress in policyTypes.\n- D: The policy has a clear effect (default deny both directions); it is not a no-op.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -o yaml"
  },
  {
    id: "s03-q042",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "In IPVS mode, kube-proxy creates a virtual server for each Service ClusterIP. What advantage does IPVS mode have over iptables mode for large clusters?",
    diagram: null,
    options: [
      "IPVS uses hash-based lookup structures providing O(1) routing regardless of endpoint count",
      "IPVS supports TLS termination at the kernel level for improved security on each cluster node",
      "IPVS automatically encrypts inter-node traffic using kernel-level IPsec tunnels by default",
      "IPVS eliminates the need for a CNI plugin by handling all pod networking within the kernel"
    ],
    answer: 0,
    explanation: "IPVS uses hash tables in the Linux kernel for O(1) lookup time when routing connections to backends, whereas iptables uses sequential chain evaluation that degrades linearly with the number of rules. This makes IPVS significantly better for clusters with thousands of Services. IPVS does not provide TLS termination or encryption. A CNI plugin is still required for pod networking.\n\nWhy other options are wrong:\n- B: IPVS does not provide TLS termination at the kernel level; it is a Layer 4 load balancer.\n- C: IPVS does not encrypt inter-node traffic; encryption requires separate mechanisms like IPsec or WireGuard.\n- D: A CNI plugin is still required for pod networking; IPVS only handles Service-level load balancing.\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/",
    verify: "kubectl get configmap kube-proxy -n kube-system -o yaml | grep mode"
  },
  {
    id: "s03-q043",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "An organization wants to implement network-level identity and segmentation using a kernel-level dataplane, eliminating a standard networking component. Which CNCF project supports this?",
    diagram: null,
    options: [
      "Flannel with its VXLAN overlay dataplane for pod networking",
      "Calico with its iptables dataplane for policy enforcement",
      "Cilium with its eBPF-based kube-proxy replacement feature",
      "CoreDNS with endpoint slices for service name resolution"
    ],
    answer: 2,
    explanation: "Cilium can fully replace kube-proxy by implementing Service load balancing directly in eBPF, offering better performance and richer identity-based policies. Flannel is a simple overlay and cannot replace kube-proxy. Calico with iptables dataplane still relies on kube-proxy for Service routing. CoreDNS is a DNS server and does not handle packet forwarding.\n\nWhy other options are wrong:\n- A: Flannel is a simple overlay CNI that cannot replace kube-proxy.\n- B: Calico with iptables dataplane still relies on kube-proxy for Service routing.\n- D: CoreDNS is a DNS server for name resolution; it does not handle packet forwarding or replace kube-proxy.\n\nReference: https://docs.cilium.io/en/stable/network/kubernetes/kubeproxy-free/",
    verify: null
  },
  {
    id: "s03-q044",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A cloud native application uses a `ClusterIP` Service for internal communication and a `LoadBalancer` Service for external access. The team wants to add rate limiting. Where should this concern be implemented according to cloud native best practices?",
    diagram: null,
    options: [
      "Inside each application container as custom middleware logic for rate control",
      "As a `NetworkPolicy` rule that limits the number of connections per second",
      "At the Ingress controller or API gateway layer, external to the application",
      "By setting resource `limits` on the pod to throttle CPU and request handling"
    ],
    answer: 2,
    explanation: "Cloud native best practices push cross-cutting concerns like rate limiting to infrastructure components such as Ingress controllers or API gateways, keeping application code focused on business logic. NetworkPolicy cannot perform rate limiting — it only allows or denies traffic. CPU limits throttle compute, not request rates. Application-level middleware works but couples the concern to code.\n\nWhy other options are wrong:\n- A: Implementing rate limiting as custom middleware in each container couples the cross-cutting concern to application code.\n- B: NetworkPolicy only allows or denies traffic; it cannot perform rate limiting or count connections per second.\n- D: CPU resource limits throttle compute resources, not request rates; a pod can still accept unlimited requests within its CPU budget.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: null
  },
  {
    id: "s03-q045",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A microservices architecture experiences cascading failures when the `inventory` service becomes slow. Requests back up in the `order` service. Which resilience pattern, typically implemented at the network layer by a service mesh, prevents this cascade?",
    diagram: '<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="70" width="100" height="40" rx="4" fill="#326CE5"/><text x="60" y="95" text-anchor="middle" fill="#fff" font-size="11">order-svc</text><rect x="150" y="70" width="100" height="40" rx="4" fill="#FF5722"/><text x="200" y="95" text-anchor="middle" fill="#fff" font-size="11">inventory-svc</text><text x="200" y="60" text-anchor="middle" fill="#f44" font-size="10">SLOW</text><line x1="110" y1="90" x2="150" y2="90" stroke="#999" stroke-width="2"/><rect x="280" y="25" width="110" height="30" rx="4" fill="#78909C"/><text x="335" y="45" text-anchor="middle" fill="#fff" font-size="10">Pattern 1</text><rect x="280" y="70" width="110" height="30" rx="4" fill="#78909C"/><text x="335" y="90" text-anchor="middle" fill="#fff" font-size="10">Pattern 2</text><rect x="280" y="115" width="110" height="30" rx="4" fill="#78909C"/><text x="335" y="135" text-anchor="middle" fill="#fff" font-size="10">Pattern 3</text></svg>',
    options: [
      "The timeout pattern, which limits how long the order service waits for a response from inventory",
      "The circuit breaker pattern, which stops sending requests to a failing upstream past a threshold",
      "The retry pattern, which sends the request again immediately on any failure from the downstream",
      "The bulkhead pattern, which limits the number of pods in a Deployment to isolate the failures"
    ],
    answer: 1,
    explanation: "The circuit breaker pattern monitors failure rates and temporarily stops sending requests to a failing or slow service after a threshold is exceeded, preventing cascading failures. Timeouts help but requests still attempt the slow service. Retries without a circuit breaker would make the problem worse by adding load to the struggling service. Bulkhead isolates resource pools but does not stop traffic to failing services — and it is not about pod count limits.\n\nWhy other options are wrong:\n- A: Timeouts limit wait time but still allow requests to reach the slow service; they do not stop the cascade.\n- C: Retries without a circuit breaker would make the problem worse by adding load to the already struggling service.\n- D: Bulkhead isolates resource pools but does not stop traffic to failing services; and it is not about limiting pod count.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: null
  },
  {
    id: "s03-q046",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Which CNCF project provides a role-oriented API for configuring advanced traffic routing in Kubernetes, designed as the successor to the Ingress resource?",
    diagram: null,
    options: [
      "Envoy Gateway — an Envoy-based API gateway and ingress project",
      "Emissary-Ingress — a developer-focused Kubernetes API gateway",
      "Contour — an Envoy-powered Kubernetes Ingress routing controller",
      "Gateway API — the standards-based Kubernetes routing API project"
    ],
    answer: 3,
    explanation: "Gateway API is the CNCF/Kubernetes SIG-Network project that provides a role-oriented, expressive API for routing as the evolution of the Ingress resource. It supports advanced features like traffic splitting, header-based routing, and cross-namespace references. Envoy Gateway is an implementation of Gateway API, not the specification itself. Contour and Emissary-Ingress are Ingress controllers/implementations, not the standard API.\n\nWhy other options are wrong:\n- A: Envoy Gateway is an implementation of Gateway API, not the specification/standard itself.\n- B: Emissary-Ingress is an Ingress controller/API gateway product, not the standards-based routing API.\n- C: Contour is an Envoy-powered Ingress controller implementation, not the successor standard to the Ingress API.\n\nReference: https://gateway-api.sigs.k8s.io/",
    verify: null
  },
  {
    id: "s03-q047",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A cluster operator wants to alert when a Service has zero ready endpoints for more than 5 minutes. Which kube-state-metrics metric best serves this use case?",
    diagram: null,
    options: [
      "`kube_service_info` filtered by service name and namespace labels in the dashboard",
      "`kube_endpoint_ready_count` with an alert threshold of zero ready endpoints set",
      "`kube_endpoint_address{ready=\"true\"}` equal to zero for the target Service over time",
      "`container_network_receive_bytes_total` dropping to zero on the target pods in the cluster"
    ],
    answer: 2,
    explanation: "kube-state-metrics exposes `kube_endpoint_address` with a `ready` label (`true` or `false`). Alerting when `kube_endpoint_address{ready=\"true\"}` equals zero for a sustained period catches Services with no healthy backends. `kube_service_info` provides metadata but not endpoint readiness. `kube_endpoint_ready_count` is not a standard kube-state-metrics metric. `container_network_receive_bytes_total` measures container traffic, not endpoint availability.\n\nWhy other options are wrong:\n- A: `kube_service_info` provides metadata about Services (labels, annotations) but not endpoint readiness or count.\n- B: `kube_endpoint_ready_count` is not a standard kube-state-metrics metric name.\n- D: `container_network_receive_bytes_total` measures container network traffic volume, not endpoint availability.\n\nReference: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/",
    verify: null
  },
  {
    id: "s03-q048",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "An SRE needs to correlate network connectivity issues with application errors. Pod logs show connection timeouts. Which additional data source provides the most useful network-level context?",
    diagram: null,
    options: [
      "kube-proxy logs showing iptables rule updates and endpoint changes on each node",
      "The kube-scheduler logs showing pod placement decisions for the affected workload",
      "The etcd audit log showing key-value store operations for the Service resources",
      "The kubelet logs showing image pull progress and container start events on nodes"
    ],
    answer: 0,
    explanation: "kube-proxy logs show when iptables or IPVS rules are updated and when endpoint changes occur, which directly correlates with network connectivity changes. Scheduler logs show placement decisions, which are relevant only at scheduling time. etcd audit logs are about API-level operations. Kubelet image pull logs are about container images, not network connectivity.\n\nWhy other options are wrong:\n- B: kube-scheduler logs show pod placement decisions, which are relevant only at scheduling time, not during network issues.\n- C: etcd audit logs are about API-level key-value operations, not network connectivity.\n- D: Kubelet image pull logs are about container image downloading, not network connectivity between pods.\n\nReference: https://kubernetes.io/docs/reference/networking/virtual-ips/",
    verify: "kubectl logs -n kube-system -l k8s-app=kube-proxy --tail=50"
  },
  {
    id: "s03-q049",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps tool like Argo CD manages an Ingress resource in a Git repository. An engineer manually edits the Ingress via `kubectl edit`. What happens on the next Argo CD sync?",
    diagram: null,
    options: [
      "Argo CD keeps the manual change and updates the Git repository to match the live state",
      "Argo CD detects drift and reverts the Ingress to match the Git-defined desired state",
      "The manual change persists because Argo CD only manages resources at initial creation time",
      "Argo CD deletes the Ingress resource entirely and creates a new one from the Git definition"
    ],
    answer: 1,
    explanation: "Argo CD continuously compares the live cluster state with the desired state in Git. When it detects drift from a manual edit, it reverts the resource to match the Git source of truth on the next sync. Argo CD does not push changes to Git. It manages resources throughout their lifecycle, not just at creation. It patches in place rather than deleting and recreating.\n\nWhy other options are wrong:\n- A: Argo CD does not push changes to Git; Git is the source of truth and Argo CD only reads from it.\n- C: Argo CD manages resources throughout their lifecycle, not just at initial creation time.\n- D: Argo CD patches resources in place to match the Git state; it does not delete and recreate them.\n\nReference: https://argo-cd.readthedocs.io/en/stable/",
    verify: null
  },
  {
    id: "s03-q050",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI pipeline builds a new container image and needs to update a Kubernetes `Deployment` to use it. The cluster uses an Ingress to route traffic. Which approach ensures zero-downtime deployment?",
    diagram: null,
    options: [
      "Delete the `Deployment` and recreate it with the new image tag specified in the pod template spec",
      "Use `kubectl set image` with a `RollingUpdate` strategy to replace pods incrementally in place",
      "Scale the `Deployment` to zero replicas, update the image tag, then scale back up to the count",
      "Edit the `Ingress` to point to a new Service while the old Deployment is still running and ready"
    ],
    answer: 1,
    explanation: "`kubectl set image` combined with a `RollingUpdate` strategy incrementally replaces old pods with new ones, ensuring continuous availability. Deleting and recreating causes downtime. Scaling to zero before updating guarantees downtime. Editing the Ingress alone does not update the pod image and creates a split configuration that is hard to manage.\n\nWhy other options are wrong:\n- A: Deleting and recreating a Deployment causes downtime while old pods are removed and new ones start.\n- C: Scaling to zero before updating guarantees a period of zero availability (downtime).\n- D: Editing the Ingress alone does not update the pod image; it only changes routing without deploying new code.\n\nReference: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment",
    verify: "kubectl rollout status deployment/<name>"
  },
  {
    id: "s03-q051",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A developer creates a Service with `spec.ports` containing `port: 80` and `targetPort: 8080`. A client pod sends a request to the Service's ClusterIP on port 80. Where does the traffic ultimately arrive?",
    diagram: null,
    options: [
      "Port 80 on the backend pod's running container process",
      "Port 8080 on the node that is running the backend pod",
      "Port 8080 on the backend pod's container application",
      "Port 80 on the Ingress controller's listening socket"
    ],
    answer: 2,
    explanation: "The `port` field is the Service's listening port, while `targetPort` is the port on the backend pod's container where traffic is forwarded. A request to ClusterIP:80 is routed to pod-IP:8080. It does not arrive on port 80 of the pod. The node port is only relevant for `NodePort` Services. The Ingress controller is a separate resource.\n\nWhy other options are wrong:\n- A: Traffic does not arrive on port 80 of the backend pod; the `targetPort` field (8080) determines the destination port.\n- B: The node port is only relevant for NodePort Services; the request goes directly to the pod's container, not to a node port.\n- D: The Ingress controller is a separate resource; this question is about direct ClusterIP Service routing.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.ports[0].targetPort}'"
  },
  {
    id: "s03-q052",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service has 1000 pod endpoints. The engineer notices multiple EndpointSlice objects were created for this Service. What is the default maximum number of endpoints per EndpointSlice?",
    diagram: null,
    options: [
      "1000 endpoints per slice",
      "100 endpoints per slice",
      "250 endpoints per slice",
      "500 endpoints per slice"
    ],
    answer: 1,
    explanation: "The default maximum number of endpoints per EndpointSlice is 100. When a Service has more endpoints, the EndpointSlice controller creates additional slices. This design improves scalability by allowing incremental updates to smaller objects. 1000, 250, and 500 are not the default limits.\n\nWhy other options are wrong:\n- A: 1000 endpoints per slice is not the default; it is the upper bound of the `--max-endpoints-per-slice` flag.\n- C: 250 is not the default maximum endpoints per EndpointSlice.\n- D: 500 is not the default maximum endpoints per EndpointSlice.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/",
    verify: "kubectl get endpointslices -l kubernetes.io/service-name=<service>"
  },
  {
    id: "s03-q053",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster administrator wants to restrict which external IPs can reach a `LoadBalancer` Service. Which Service field provides this capability?",
    diagram: null,
    options: [
      "`spec.loadBalancerSourceRanges` set to a list of allowed CIDR blocks for access",
      "`spec.externalTrafficPolicy: Restricted` to limit source IP addresses for LB",
      "`metadata.annotations.allowed-ips` to define allowed client IP ranges for LBs",
      "`spec.selector.sourceIP` matching allowed external client IP address ranges"
    ],
    answer: 0,
    explanation: "`spec.loadBalancerSourceRanges` accepts a list of CIDR blocks and instructs the cloud load balancer (or kube-proxy on bare metal) to only allow traffic from those ranges. There is no `Restricted` value for `externalTrafficPolicy`. `allowed-ips` is not a standard annotation. Selectors match pod labels, not source IPs.\n\nWhy other options are wrong:\n- B: There is no `externalTrafficPolicy: Restricted` value; valid values are `Cluster` and `Local`.\n- C: `metadata.annotations.allowed-ips` is not a standard Kubernetes annotation for source IP restriction.\n- D: `spec.selector` matches pod labels for backend selection, not client source IP ranges.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#restricting-traffic-to-specific-clients",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.loadBalancerSourceRanges}'"
  },
  {
    id: "s03-q054",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A `NetworkPolicy` allows ingress from pods labeled `role: frontend` to pods labeled `app: backend` on port 443. A pod labeled both `role: frontend` and `app: backend` sends traffic to another `app: backend` pod on port 443. Is this traffic allowed?",
    diagram: null,
    options: [
      "No, because the policy excludes pods matching both source and destination selectors",
      "Yes, but only if an explicit egress rule allowing port 443 outbound is also defined",
      "No, because the policy only allows traffic from pods that lack the `app: backend` label value",
      "Yes, because the sending pod matches `role: frontend` which is allowed by the ingress rule"
    ],
    answer: 3,
    explanation: "NetworkPolicy rules evaluate based on label matching. The sending pod matches `role: frontend` in the ingress rule's `from.podSelector`, so traffic is allowed. There is no restriction preventing a pod from matching both the source and target selectors. NetworkPolicy does not perform set exclusion. Ingress rules do not require corresponding egress rules to function (unless egress is separately restricted).\n\nWhy other options are wrong:\n- A: There is no restriction preventing a pod from matching both the source and destination selectors of the same policy.\n- B: Ingress rules do not require corresponding egress rules to function unless egress is separately restricted by another policy.\n- C: NetworkPolicy does not perform set exclusion; it evaluates label matching independently for each selector.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: null
  },
  {
    id: "s03-q055",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An Ingress resource specifies a `defaultBackend` pointing to `fallback-svc:80`. What is the purpose of this configuration?",
    diagram: null,
    options: [
      "It serves as a health check endpoint for the `Ingress` controller to verify backend pod availability",
      "It redirects all HTTPS traffic to HTTP on port 80 for unencrypted `backend` service communications",
      "It makes `fallback-svc` the primary backend that takes higher priority over all other Ingress rules",
      "It routes requests not matching any defined host or path rule to the `fallback-svc` Service backend"
    ],
    answer: 3,
    explanation: "The `defaultBackend` in an Ingress resource acts as a catch-all, handling any request that does not match a specific host or path rule defined in the Ingress rules. It is not a health check endpoint. It does not perform protocol redirects. It has the lowest priority, not the highest — specific rules are evaluated first.\n\nWhy other options are wrong:\n- A: The defaultBackend is not a health check endpoint; it is a catch-all routing target.\n- B: It does not redirect HTTPS to HTTP; it routes unmatched requests to the specified backend.\n- C: The defaultBackend has the lowest priority, not the highest; specific host/path rules are evaluated first.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#default-backend",
    verify: "kubectl get ingress <name> -o jsonpath='{.spec.defaultBackend}'"
  },
  {
    id: "s03-q056",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "In a kubeadm-bootstrapped cluster, which component typically allocates the pod CIDR range for each node?",
    diagram: null,
    options: [
      "The kube-controller-manager's node IPAM controller process",
      "The kube-apiserver during the initial node registration phase",
      "CoreDNS when it creates DNS records for each registered node",
      "The kubelet when it joins the cluster during the boot process"
    ],
    answer: 0,
    explanation: "The kube-controller-manager runs the node IPAM controller, which allocates a pod CIDR range from the cluster CIDR to each node. The API server stores this allocation but does not perform the assignment logic. CoreDNS handles DNS, not IP allocation. The kubelet reports node status but does not determine the pod CIDR.\n\nWhy other options are wrong:\n- B: The kube-apiserver stores the pod CIDR allocation but does not perform the assignment logic itself.\n- C: CoreDNS handles DNS resolution; it does not allocate IP address ranges to nodes.\n- D: The kubelet reports node status but does not determine or assign the pod CIDR range.\n\nReference: https://kubernetes.io/docs/concepts/architecture/controller/",
    verify: "kubectl get node <node-name> -o jsonpath='{.spec.podCIDR}'"
  },
  {
    id: "s03-q057",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service is configured with `spec.internalTrafficPolicy: Local`. What does this setting control?",
    diagram: null,
    options: [
      "It forces the Service to use a `ClusterIP` from the local node's subnet for pod-level routing",
      "It prevents the Service from being accessible outside the current namespace's network boundary",
      "It configures kube-proxy to use iptables instead of IPVS for this particular Service's rules",
      "It restricts internal pod-to-Service traffic to endpoints on the same node as the client pod"
    ],
    answer: 3,
    explanation: "`internalTrafficPolicy: Local` tells kube-proxy to only route cluster-internal traffic to endpoints running on the same node as the client pod, similar to `externalTrafficPolicy: Local` but for internal traffic. It does not affect ClusterIP allocation, namespace accessibility, or kube-proxy mode selection.\n\nWhy other options are wrong:\n- A: The setting does not force the Service to use a ClusterIP from a local subnet; ClusterIP allocation is separate.\n- B: The setting does not affect namespace-level network boundaries; it controls kube-proxy endpoint selection.\n- C: The setting does not change kube-proxy's proxy mode (iptables vs. IPVS); it only affects endpoint filtering.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/",
    verify: "kubectl get svc <service-name> -o jsonpath='{.spec.internalTrafficPolicy}'"
  },
  {
    id: "s03-q058",
    domain: "Kubernetes Fundamentals",
    subsection: "Workloads",
    text: "A pod specification includes `dnsPolicy: ClusterFirst`. The pod needs to resolve both cluster-internal service names and external hostnames like `example.com`. Which behavior results from this policy?",
    diagram: null,
    options: [
      "Cluster-internal names are resolved but external names may time out without forwarding",
      "The pod uses the node DNS settings by default, querying CoreDNS for cluster-local names",
      "Queries go to CoreDNS first, which forwards unresolved external names to upstream DNS",
      "The pod queries CoreDNS and the node resolver in round-robin order for each DNS lookup"
    ],
    answer: 2,
    explanation: "`ClusterFirst` sends all DNS queries to the cluster DNS server (CoreDNS) first. CoreDNS resolves cluster names (e.g., `*.svc.cluster.local`) directly and forwards all other queries to configured upstream resolvers (typically from the node's `/etc/resolv.conf`). External names are not blocked. `Default` policy uses node DNS directly. There is no random alternation.\n\nWhy other options are wrong:\n- A: External names are not merely dependent on upstream configuration; CoreDNS actively forwards unresolved queries to upstream DNS servers.\n- B: `ClusterFirst` sends queries to CoreDNS first, not to the node DNS by default; the `Default` policy uses node DNS settings.\n- D: There is no round-robin order between CoreDNS and the node resolver; `ClusterFirst` always queries CoreDNS first.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy",
    verify: "kubectl get pod <pod-name> -o jsonpath='{.spec.dnsPolicy}'"
  },
  {
    id: "s03-q059",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "Two `NetworkPolicy` objects exist in the same namespace: Policy A allows ingress from `app: web` on port 80, and Policy B allows ingress from `app: api` on port 443. Both select the same target pod `app: server`. What is the combined effect?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="90" height="35" rx="4" fill="#326CE5"/><text x="55" y="52" text-anchor="middle" fill="#fff" font-size="10">app: web</text><rect x="10" y="130" width="90" height="35" rx="4" fill="#FF9800"/><text x="55" y="152" text-anchor="middle" fill="#fff" font-size="10">app: api</text><rect x="250" y="75" width="110" height="40" rx="4" fill="#4CAF50"/><text x="305" y="100" text-anchor="middle" fill="#fff" font-size="11">app: server</text><line x1="100" y1="48" x2="250" y2="90" stroke="#326CE5" stroke-width="1.5" stroke-dasharray="6,3"/><text x="170" y="58" fill="#326CE5" font-size="9">port 80 ?</text><line x1="100" y1="148" x2="250" y2="100" stroke="#FF9800" stroke-width="1.5" stroke-dasharray="6,3"/><text x="170" y="140" fill="#FF9800" font-size="9">port 443 ?</text><text x="145" y="15" fill="#ccc" font-size="10">Policy A</text><text x="145" y="185" fill="#ccc" font-size="10">Policy B</text></svg>',
    options: [
      "Only `Policy A` takes effect because it was created first and has priority in the namespace",
      "Policy B overrides Policy A because it was created more recently in the namespace",
      "Both policies merge additively — ingress from `web` on 80 AND from `api` on 443 is allowed",
      "The policies conflict with each other and therefore all `ingress` traffic is denied"
    ],
    answer: 2,
    explanation: "Multiple NetworkPolicies selecting the same pod are unioned (merged additively). The pod receives the combined set of allowed ingress rules from both policies. There is no priority based on creation order or port number. Policies do not conflict — they always add permissions, never subtract.\n\nWhy other options are wrong:\n- A: There is no priority based on creation order; multiple NetworkPolicies are always unioned.\n- B: There is no priority based on creation time; multiple NetworkPolicies are always unioned regardless of when they were created.\n- D: Policies never conflict; they always add permissions additively and never subtract.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n <namespace>"
  },
  {
    id: "s03-q060",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod uses `dnsConfig` to add a custom search domain `legacy.internal`. Combined with the default `ClusterFirst` DNS policy, what happens to DNS resolution?",
    diagram: null,
    options: [
      "The custom search domain replaces all default cluster search domains in the pod's `resolv.conf`",
      "The custom search domain is appended to the default cluster search domains in `resolv.conf`",
      "The `dnsConfig` entries are overridden because `ClusterFirst` takes full precedence",
      "The pod enters an error state because `dnsConfig` conflicts with `ClusterFirst` policy"
    ],
    answer: 1,
    explanation: "`dnsConfig` fields are merged with the settings generated by the `dnsPolicy`. When using `ClusterFirst`, the default search domains are preserved, and custom entries from `dnsConfig` (such as additional search domains or nameservers) are appended. They are not replaced or ignored. `dnsConfig` and `dnsPolicy` are designed to work together.\n\nWhy other options are wrong:\n- A: Custom search domains are appended, not replaced; the default cluster domains are preserved.\n- C: `dnsConfig` is not ignored; it is designed to work with any `dnsPolicy` to add custom DNS settings.\n- D: `dnsConfig` and `dnsPolicy` are designed to be used together; the pod does not enter an error state.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config",
    verify: "kubectl exec <pod> -- cat /etc/resolv.conf"
  },
  {
    id: "s03-q061",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster uses `EndpointSlices` instead of the legacy `Endpoints` resource. What primary scalability problem do `EndpointSlices` solve?",
    diagram: null,
    options: [
      "They allow Services to span multiple clusters for cross-region federation and service discovery",
      "They split large endpoint lists into smaller slices that can be watched and updated independently",
      "They cache endpoint data on each node to reduce the number of direct API server watch queries",
      "They replace kube-proxy by routing traffic directly to pods using kernel-level eBPF forwarding"
    ],
    answer: 1,
    explanation: "The legacy `Endpoints` resource stores all endpoints in a single object. For Services with many backends, any single pod change triggers a full object update and watch notification. `EndpointSlices` split endpoints into smaller chunks (default 100), so updates only affect the relevant slice. They do not enable multi-cluster. They do not cache on nodes or replace kube-proxy.\n\nWhy other options are wrong:\n- A: EndpointSlices do not enable multi-cluster Service spanning; that requires federation or multi-cluster tools.\n- C: EndpointSlices do not cache data on nodes; they are API objects stored in etcd and watched by kube-proxy.\n- D: EndpointSlices do not replace kube-proxy; kube-proxy watches EndpointSlices to program forwarding rules.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/",
    verify: "kubectl get endpointslices -l kubernetes.io/service-name=<svc>"
  },
  {
    id: "s03-q062",
    domain: "Kubernetes Fundamentals",
    subsection: "Scheduling",
    text: "An operator wants pods of a network-intensive application to be distributed across different failure zones to survive a zone outage. Which scheduling feature achieves this?",
    diagram: null,
    options: [
      "`nodeSelector` with a specific zone label to place pods on nodes in the target zone",
      "`topologySpreadConstraints` with `topologyKey: topology.kubernetes.io/zone` set",
      "`affinity.podAffinity` with `topologyKey: kubernetes.io/hostname` configured",
      "`tolerations` matching the zone taint to allow pods on nodes in specific zones"
    ],
    answer: 1,
    explanation: "`topologySpreadConstraints` distribute pods evenly across topology domains like zones. Setting `topologyKey: topology.kubernetes.io/zone` ensures pods are spread across zones. `nodeSelector` pins pods to one specific zone label value. Pod affinity with hostname key co-locates pods on the same node. Tolerations allow pods to run on tainted nodes but do not control distribution.\n\nWhy other options are wrong:\n- A: `nodeSelector` pins pods to nodes with a specific label value, concentrating them in one zone instead of spreading.\n- C: `podAffinity` with hostname topologyKey co-locates pods on the same node, the opposite of spreading across zones.\n- D: `tolerations` allow pods to run on tainted nodes but do not control distribution across topology domains.\n\nReference: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    verify: "kubectl get pod <pod> -o jsonpath='{.spec.topologySpreadConstraints}'"
  },
  {
    id: "s03-q063",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A container runtime calls the CNI `ADD` operation when creating a pod sandbox. Which of the following is NOT a responsibility of the CNI plugin during this operation?",
    diagram: null,
    options: [
      "Allocating an IP address from the node's pod CIDR for the new pod sandbox",
      "Creating a veth pair and attaching one end to the pod's network namespace",
      "Programming kube-proxy iptables rules for the newly created pod sandbox",
      "Configuring routing so the pod can reach other pods across cluster nodes"
    ],
    answer: 2,
    explanation: "kube-proxy manages iptables/IPVS rules for Service routing, not the CNI plugin. During a CNI `ADD`, the plugin allocates an IP, creates veth pairs (or equivalent), attaches them to the pod and host namespaces, and configures routes. Programming Service-level forwarding rules is kube-proxy's responsibility.\n\nWhy other options are wrong:\n- A: Allocating an IP address is a responsibility of the CNI plugin during the ADD operation.\n- B: Creating a veth pair is a responsibility of the CNI plugin during the ADD operation.\n- D: Configuring routing is a responsibility of the CNI plugin during the ADD operation.\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
    verify: null
  },
  {
    id: "s03-q064",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A Calico cluster uses BGP peering with the physical network's top-of-rack routers. What advantage does this provide over VXLAN overlay mode?",
    diagram: null,
    options: [
      "BGP peering allows pod IPs to be natively routable on the physical network without encapsulation",
      "BGP peering encrypts all inter-node traffic across the physical network using IPsec by default",
      "BGP peering reduces reliance on kube-proxy by handling some service routing decisions via BGP peers",
      "BGP peering is primarily needed for IPv6 addressing, which VXLAN handles less efficiently"
    ],
    answer: 0,
    explanation: "With BGP peering, Calico advertises pod CIDR routes to physical routers, making pod IPs natively routable without the overhead of VXLAN encapsulation (extra headers, MTU reduction). BGP does not provide encryption — that requires separate configuration. kube-proxy is still needed for Service routing. Both BGP and VXLAN modes support IPv6.\n\nWhy other options are wrong:\n- B: BGP peering does not encrypt traffic by default; encryption requires separate configuration like WireGuard or IPsec.\n- C: BGP peering does not reduce reliance on kube-proxy for service routing; kube-proxy is still needed for Service-level load balancing.\n- D: Both BGP and VXLAN modes support IPv6; BGP is not required exclusively for IPv6 addressing.\n\nReference: https://docs.tigera.io/calico/latest/networking/configuring/bgp",
    verify: null
  },
  {
    id: "s03-q065",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "An application pod cannot resolve any DNS names. Running `nslookup kubernetes.default` from inside the pod fails. Which step should the engineer take first?",
    diagram: null,
    options: [
      "Increase the pod's `memory` limit to allow DNS caching and larger response buffer allocation",
      "Delete and recreate the pod's `Service` to force re-registration of the DNS endpoint records",
      "Restart the `kube-apiserver` to ensure DNS-related resources are properly synced and available",
      "Check that the CoreDNS pods are running and that the `kube-dns` Service has valid endpoints"
    ],
    answer: 3,
    explanation: "If a pod cannot resolve any DNS names, the first check should be the health of CoreDNS pods and the `kube-dns` Service endpoints. If CoreDNS is not running or the Service has no endpoints, DNS resolution will fail cluster-wide. Restarting the API server is drastic and unlikely to help. The pod's Service is unrelated to DNS resolution. Memory limits on the application pod do not affect DNS resolution.\n\nWhy other options are wrong:\n- A: Increasing the pod's memory limit does not affect DNS resolution; DNS queries are handled by CoreDNS, not the pod's memory.\n- B: Deleting and recreating the pod's Service does not fix DNS resolution; the issue is with the DNS server, not the Service.\n- C: Restarting the kube-apiserver is drastic and unlikely to fix DNS issues; CoreDNS operates independently.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/",
    verify: "kubectl get pods -n kube-system -l k8s-app=kube-dns"
  },
  {
    id: "s03-q066",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod has `hostNetwork: true` set in its spec. How does this affect the pod's networking?",
    diagram: null,
    options: [
      "The pod gets its own network namespace with a dedicated IP from the host's subnet range",
      "The pod is automatically assigned a `NodePort` Service for external traffic by the kubelet",
      "The pod can only communicate with other pods that are co-located on the same cluster node",
      "The pod shares the node's network namespace and uses the node's IP address for traffic"
    ],
    answer: 3,
    explanation: "Setting `hostNetwork: true` causes the pod to share the host's network namespace. The pod uses the node's IP address and sees all network interfaces on the host. It does not get a separate namespace. No Service is created automatically. The pod can communicate with any reachable network, not just local pods.\n\nWhy other options are wrong:\n- A: With `hostNetwork: true`, the pod does NOT get its own network namespace; it shares the host's.\n- B: No Service is automatically created; hostNetwork pods use the node's IP directly.\n- C: The pod can communicate with any reachable network endpoint, not just pods on the same node.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/#pod-networking",
    verify: "kubectl get pod <pod> -o jsonpath='{.spec.hostNetwork}'"
  },
  {
    id: "s03-q067",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A `NetworkPolicy` allows egress only to a specific CIDR block `10.0.5.0/24` on port 5432. A pod selected by this policy tries to connect to a database at `10.0.5.10:5432` and to an external API at `203.0.113.50:443`. What happens?",
    diagram: null,
    options: [
      "Both connections succeed because the CIDR rule implicitly permits all traffic",
      "The database connection is blocked; the external API connection succeeds",
      "Both connections are blocked because the CIDR is a private IP address range",
      "The database connection succeeds; the external API connection is blocked"
    ],
    answer: 3,
    explanation: "The policy allows egress only to `10.0.5.0/24` on port 5432. The database at `10.0.5.10:5432` falls within this CIDR and port, so it succeeds. The external API at `203.0.113.50:443` is outside the allowed CIDR and port, so it is blocked. NetworkPolicy applies to both TCP and UDP. Private vs. public CIDR is irrelevant to policy enforcement.\n\nWhy other options are wrong:\n- A: The CIDR allow rule does not implicitly permit all destinations; only `10.0.5.0/24` on port 5432 is allowed.\n- B: The database connection succeeds because `10.0.5.10:5432` falls within the allowed CIDR and port.\n- C: Both connections are not blocked; the one matching the CIDR and port rule succeeds.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: null
  },
  {
    id: "s03-q068",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "Which file system path on a Kubernetes node contains the CNI plugin configuration that the container runtime reads?",
    diagram: null,
    options: [
      "`/var/lib/kubelet/cni/` on each node",
      "`/etc/kubernetes/cni/` on each node",
      "`/etc/cni/net.d/` on each worker node",
      "`/opt/cni/config/` on each worker node"
    ],
    answer: 2,
    explanation: "The standard CNI configuration directory is `/etc/cni/net.d/`. The container runtime (e.g., containerd, CRI-O) reads configuration files from this directory to determine which CNI plugin to invoke and with what parameters. CNI binaries are stored in `/opt/cni/bin/`. The other paths are not standard CNI locations.\n\nWhy other options are wrong:\n- A: `/var/lib/kubelet/cni/` is not the standard CNI configuration directory.\n- B: `/etc/kubernetes/cni/` is not the standard CNI configuration directory.\n- D: `/opt/cni/config/` does not exist; CNI binaries are in `/opt/cni/bin/` and config is in `/etc/cni/net.d/`.\n\nReference: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
    verify: null
  },
  {
    id: "s03-q069",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A team designs a cloud native application where each component exposes its health via a `/healthz` endpoint. The Ingress controller routes traffic only to healthy instances. Which cloud native principle does this primarily exemplify?",
    diagram: null,
    options: [
      "Infrastructure as Code for declarative health-endpoint configuration management",
      "Observability and health signaling for self-healing systems with automatic recovery",
      "Immutable infrastructure ensuring reproducible deployment patterns across envs",
      "Event-driven architecture for asynchronous message handling between services"
    ],
    answer: 1,
    explanation: "Exposing health endpoints and using them for traffic routing exemplifies observability and health signaling, which enables self-healing behavior — unhealthy instances are automatically removed from the load balancing pool. Infrastructure as Code concerns declarative provisioning. Immutable infrastructure means not modifying running instances. Event-driven architecture is about asynchronous message passing.\n\nWhy other options are wrong:\n- A: Infrastructure as Code concerns declarative provisioning and configuration management, not health signaling.\n- C: Immutable infrastructure means not modifying running instances; it is not about health endpoints.\n- D: Event-driven architecture is about asynchronous message passing, not health-based routing.\n\nReference: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes",
    verify: null
  },
  {
    id: "s03-q070",
    domain: "Cloud Native Architecture",
    subsection: "Serverless",
    text: "A Knative Serving deployment scales a Service to zero pods when there is no traffic, and scales up when a request arrives. What happens to the first request when pods are scaled to zero?",
    diagram: null,
    options: [
      "The request is immediately rejected with a 503 error because no backend pod is available",
      "Knative's activator component holds the request while a pod is created then forwards it",
      "The request is queued in the Knative CoreDNS layer until the pod IP becomes available in DNS",
      "The Ingress controller retries the request indefinitely until a backend pod finally appears"
    ],
    answer: 1,
    explanation: "When a Knative service is scaled to zero, the activator component (part of the Knative data plane) buffers incoming requests while signaling the autoscaler to create pods. Once a pod is ready, the activator forwards the buffered request. Requests are not rejected. CoreDNS does not queue requests. The Ingress controller does not handle this logic — Knative has its own routing layer.\n\nWhy other options are wrong:\n- A: The request is not immediately rejected with 503; Knative's activator buffers it while scaling up.\n- C: CoreDNS does not queue requests; DNS simply resolves names and has no request buffering capability.\n- D: The Ingress controller does not handle scale-to-zero logic; Knative has its own routing and activator layer.\n\nReference: https://knative.dev/docs/serving/autoscaling/scale-to-zero/",
    verify: null
  },
  {
    id: "s03-q071",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Which CNCF project provides a lightweight service mesh focused on simplicity and minimal resource overhead, using a purpose-built sidecar proxy designed for low latency?",
    diagram: null,
    options: [
      "Istio — a full-featured service mesh using Envoy sidecar proxies",
      "Consul Connect — HashiCorp's service mesh with built-in discovery",
      "Linkerd — a CNCF graduated mesh using a Rust-based sidecar proxy",
      "Open Service Mesh — a lightweight SMI-compatible service mesh tool"
    ],
    answer: 2,
    explanation: "Linkerd is a CNCF graduated service mesh that uses a lightweight Rust-based proxy (linkerd2-proxy) designed for minimal latency and resource consumption. Istio uses Envoy, a C++-based proxy. Consul Connect is a HashiCorp product, not a CNCF project. Open Service Mesh was archived and also used Envoy sidecars.\n\nWhy other options are wrong:\n- A: Istio uses Envoy (C++-based proxy), not a Rust-based micro-proxy.\n- B: Consul Connect is a HashiCorp product, not a CNCF project.\n- D: Open Service Mesh was archived and also used Envoy sidecars, not a Rust-based proxy.\n\nReference: https://www.cncf.io/projects/linkerd/",
    verify: null
  },
  {
    id: "s03-q072",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A development team splits a monolith into microservices. They notice that inter-service calls now add significant latency. Which networking optimization reduces the overhead of east-west traffic within the cluster?",
    diagram: null,
    options: [
      "Using `gRPC` with `HTTP/2` connection multiplexing instead of REST for inter-service communication",
      "Replacing all `ClusterIP` Services with `NodePort` Services for more direct inter-service routing",
      "Setting all pod `dnsPolicy` to `None` to bypass DNS resolution latency on each service call",
      "Running all microservices in a single pod to use `localhost` and avoid network overhead entirely"
    ],
    answer: 0,
    explanation: "gRPC uses HTTP/2 with multiplexed streams over a single connection, reducing connection overhead and latency compared to REST with HTTP/1.1. Switching to `NodePort` adds extra hops. Setting `dnsPolicy: None` without alternatives breaks name resolution. Putting all services in one pod defeats the purpose of microservices and eliminates independent scaling.\n\nWhy other options are wrong:\n- B: Replacing ClusterIP with NodePort adds extra network hops and does not reduce east-west latency.\n- C: Setting `dnsPolicy: None` without proper alternatives breaks name resolution entirely.\n- D: Running all microservices in a single pod defeats the purpose of microservices and eliminates independent scaling.\n\nReference: https://grpc.io/docs/what-is-grpc/introduction/",
    verify: null
  },
  {
    id: "s03-q073",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A network engineer wants to detect when a `NetworkPolicy` is misconfigured and blocking legitimate traffic. Which metric from kube-state-metrics is most useful?",
    diagram: null,
    options: [
      "`kube_networkpolicy_labels` showing policy labels attached to the resources in the namespace",
      "`kube_pod_status_phase` tracking pods stuck in `Pending` state; helpful for scheduling issues",
      "`kube_pod_container_status_restarts_total` counting container restarts caused by network issues",
      "No built-in metric exists; the engineer should use CNI-level tools such as Cilium's `Hubble`"
    ],
    answer: 3,
    explanation: "kube-state-metrics exposes metadata about NetworkPolicy objects but does not track actual traffic blocked by policies. To detect blocked legitimate traffic, engineers need CNI-level tools such as Cilium's flow logs (Hubble), Calico flow logs, or eBPF-based monitoring. Pod phase and restart metrics may show symptoms but do not directly indicate policy misconfiguration.\n\nWhy other options are wrong:\n- A: `kube_networkpolicy_labels` shows labels on policy objects but cannot detect blocked traffic from misconfigured policies.\n- B: `kube_pod_status_phase` tracks pod phases like Pending but does not indicate network connectivity issues from policies.\n- C: `kube_pod_container_status_restarts_total` counts container restarts but restarts may have many causes unrelated to NetworkPolicy.\n\nReference: https://docs.cilium.io/en/stable/observability/hubble/",
    verify: null
  },
  {
    id: "s03-q074",
    domain: "Cloud Native Observability",
    subsection: "Logging",
    text: "An SRE wants to capture all DNS queries made by pods in the cluster for security auditing. Where should they enable query logging?",
    diagram: null,
    options: [
      "On the kube-apiserver by enabling the `--dns-audit-log` flag in the manifest",
      "In the `NetworkPolicy` resource by adding a `log: true` annotation to the spec",
      "On each pod's container by setting `DNS_LOG=true` environment variable at startup",
      "In the CoreDNS configuration by adding the `log` plugin to the Corefile config"
    ],
    answer: 3,
    explanation: "CoreDNS supports query logging through its `log` plugin, which can be added to the Corefile (stored as a ConfigMap in `kube-system`). This logs all DNS queries processed by the cluster DNS. There is no universal `DNS_LOG` environment variable. The API server does not log DNS queries. NetworkPolicy does not have a standard `log` annotation for DNS.\n\nWhy other options are wrong:\n- A: There is no `--dns-audit-log` flag on the kube-apiserver.\n- B: NetworkPolicy does not have a standard `log: true` annotation for DNS query logging.\n- C: There is no universal `DNS_LOG` environment variable that enables DNS query logging in containers.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/coredns/",
    verify: "kubectl get configmap coredns -n kube-system -o yaml"
  },
  {
    id: "s03-q075",
    domain: "Cloud Native Application Delivery",
    subsection: "GitOps",
    text: "A GitOps pipeline manages `NetworkPolicy` resources in Git. A new microservice is added but its `NetworkPolicy` is missing from the repository. In a cluster with default-deny policies, what happens to the new service?",
    diagram: null,
    options: [
      "The service works normally because GitOps only manages Deployments and not NetworkPolicies",
      "The service's pods cannot receive any traffic because no allow rule exists for them yet",
      "The Ingress controller automatically creates a permissive NetworkPolicy for new workloads",
      "Argo CD generates a default allow-all policy for any new workloads it detects in the repo"
    ],
    answer: 1,
    explanation: "In a cluster with default-deny NetworkPolicies, any pod without an explicit allow policy will have all ingress (and/or egress) traffic blocked. GitOps manages whatever resources are in the repository, including NetworkPolicies. Ingress controllers do not create NetworkPolicies. Argo CD deploys what is in Git — it does not auto-generate policies.\n\nWhy other options are wrong:\n- A: GitOps manages any Kubernetes resources stored in the repository, not just Deployments.\n- C: Ingress controllers do not auto-create NetworkPolicies for new workloads.\n- D: Argo CD deploys exactly what is in Git; it does not auto-generate default allow-all policies.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n <namespace>"
  },
  {
    id: "s03-q076",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A pod spec sets `spec.hostname: myhost` and `spec.subdomain: mysubdomain`. A headless Service named `mysubdomain` exists in the same namespace. What stable DNS A record does this pod get?",
    diagram: '<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="10" width="200" height="30" rx="4" fill="#326CE5"/><text x="200" y="30" text-anchor="middle" fill="#fff" font-size="10">Headless Svc: mysubdomain</text><line x1="200" y1="40" x2="200" y2="65" stroke="#999" stroke-width="1.5"/><rect x="120" y="65" width="160" height="35" rx="4" fill="#4CAF50"/><text x="200" y="82" text-anchor="middle" fill="#fff" font-size="10">Pod: hostname=myhost</text><text x="200" y="95" text-anchor="middle" fill="#fff" font-size="8">subdomain=mysubdomain</text></svg>',
    options: [
      "`myhost.mysubdomain.<namespace>.svc.cluster.local` for the pod",
      "`mysubdomain.myhost.<namespace>.svc.cluster.local` for the pod",
      "`myhost.<namespace>.pod.cluster.local` resolving to the pod IP",
      "`mysubdomain.<namespace>.svc.cluster.local` resolving to pod IP"
    ],
    answer: 0,
    explanation: "When a pod sets `hostname` and `subdomain`, and a headless Service matching the subdomain name exists, Kubernetes creates an A record at `<hostname>.<subdomain>.<namespace>.svc.cluster.local`. The order is hostname first, then subdomain. The pod DNS format (`*.pod.cluster.local`) exists but uses the pod IP with dashes, not the hostname. The Service-level record resolves to all matching pods, not just this one.\n\nWhy other options are wrong:\n- B: The order is hostname first, then subdomain; `mysubdomain.myhost` reverses the correct order.\n- C: The pod DNS format `*.pod.cluster.local` uses dashes in the pod IP, not the hostname set in the spec.\n- D: The Service-level record resolves to all matching pods; it is not the per-pod stable DNS record.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods-hostname-and-subdomain-fields",
    verify: "kubectl exec <pod> -- nslookup myhost.mysubdomain.<namespace>.svc.cluster.local"
  },
  {
    id: "s03-q077",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An application team has a `ClusterIP` Service that works correctly. They now need to make it accessible from outside the cluster without changing the Service type. Which approach works?",
    diagram: null,
    options: [
      "Add an Ingress resource that routes external traffic to the `ClusterIP` Service backend",
      "Manually assign a public IP to the `ClusterIP` using `kubectl patch` on the spec field",
      "Add a `readinessGate` configuration to expose the Service externally via the kubelet API",
      "Set the `spec.externalIPs` field to the node's private IP and configure a `NodePort` entry"
    ],
    answer: 0,
    explanation: "An Ingress resource (with an Ingress controller already deployed) can route external HTTP/HTTPS traffic to a `ClusterIP` Service without changing the Service type. Patching a public IP onto a ClusterIP is not valid — ClusterIPs are from the service CIDR. ReadinessGates control pod readiness, not external access. Setting `externalIPs` is possible but the option incorrectly mentions also configuring a NodePort, which changes the type.\n\nWhy other options are wrong:\n- B: ClusterIPs are from the service CIDR; you cannot patch a public IP onto a ClusterIP.\n- C: readinessGates control pod readiness conditions; they do not expose Services externally.\n- D: The option incorrectly combines `externalIPs` with configuring a NodePort, which would change the Service type.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: "kubectl get ingress"
  },
  {
    id: "s03-q078",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An SRE notices that DNS lookups from pods occasionally take 5 seconds. What is the most likely cause in Linux-based clusters?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="100" height="35" rx="4" fill="#326CE5"/><text x="80" y="32" text-anchor="middle" fill="#fff" font-size="10">App Pod</text><rect x="30" y="80" width="100" height="35" rx="4" fill="#FF9800"/><text x="80" y="102" text-anchor="middle" fill="#fff" font-size="10">CoreDNS</text><rect x="30" y="150" width="100" height="35" rx="4" fill="#4CAF50"/><text x="80" y="172" text-anchor="middle" fill="#fff" font-size="10">Upstream DNS</text><line x1="80" y1="45" x2="80" y2="80" stroke="#999" stroke-width="1.5"/><line x1="80" y1="115" x2="80" y2="150" stroke="#999" stroke-width="1.5"/><text x="130" y="35" fill="#ccc" font-size="9">DNS queries</text><text x="130" y="105" fill="#ccc" font-size="9">DNS queries</text><text x="250" y="90" fill="#f44" font-size="10">intermittent</text><text x="250" y="105" fill="#f44" font-size="10">slow queries</text></svg>',
    options: [
      "CoreDNS is configured with too many upstream resolvers causing slow query forwarding chain lookups",
      "kube-proxy iptables rules throttle DNS traffic to prevent DDoS overload on the CoreDNS endpoints",
      "The `ndots` setting in `resolv.conf` causes excessive search domain lookups before external queries",
      "The Linux conntrack table races between simultaneous A and AAAA queries, causing one to drop"
    ],
    answer: 3,
    explanation: "A well-known Linux DNS issue in Kubernetes involves the glibc resolver sending A and AAAA queries simultaneously on the same UDP socket. A conntrack race condition can cause one packet to be dropped, resulting in a 5-second timeout before a retry succeeds. This is mitigated by using `single-request-reopen` in `resolv.conf` or NodeLocal DNS Cache. Too many upstream resolvers is unusual. A high `ndots` value causes extra DNS query attempts, adding latency, but does not explain the characteristic intermittent 5-second delays that match the DNS retry timeout triggered by conntrack race conditions. kube-proxy does not throttle DNS.\n\nWhy other options are wrong:\n- A: Too many upstream resolvers is an unusual configuration and would not cause the characteristic intermittent 5-second delays.\n- B: kube-proxy does not throttle or rate-limit DNS traffic; it manages Service-level forwarding rules.\n- C: A high `ndots` value causes extra DNS query attempts but does not explain the specific 5-second timeout pattern from conntrack races.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/",
    verify: "kubectl exec <pod> -- cat /etc/resolv.conf"
  },
  {
    id: "s03-q079",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A multi-tenant cluster needs to ensure that pods in namespace `tenant-a` cannot communicate with pods in namespace `tenant-b`. Which is the most effective approach?",
    diagram: null,
    options: [
      "Create `ResourceQuotas` in each namespace to limit network bandwidth between tenant workloads",
      "Apply `NetworkPolicy` in each namespace with default deny-all and allow only within namespace",
      "Set different `dnsPolicy` values for each namespace to isolate tenant DNS name resolution paths",
      "Deploy separate CoreDNS instances per namespace so tenants cannot resolve each other's services"
    ],
    answer: 1,
    explanation: "NetworkPolicy with a default deny-all rule in each namespace, combined with ingress/egress rules that only allow traffic from/to pods within the same namespace, effectively isolates tenants. ResourceQuotas limit resource consumption, not network communication. DNS policies do not restrict traffic flow. Separate CoreDNS instances add complexity without enforcing isolation.\n\nWhy other options are wrong:\n- A: ResourceQuotas limit resource consumption (CPU, memory, pod count), not network communication between namespaces.\n- C: `dnsPolicy` controls which DNS server a pod uses; it does not restrict network traffic flow between namespaces.\n- D: Separate CoreDNS instances add complexity but do not enforce network-level traffic isolation between tenants.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: "kubectl get networkpolicy -n tenant-a"
  },
  {
    id: "s03-q080",
    domain: "Kubernetes Fundamentals",
    subsection: "Cluster Architecture",
    text: "A NodeLocal DNS Cache DaemonSet is deployed to improve DNS performance. How does it reduce load on CoreDNS?",
    diagram: null,
    options: [
      "It replaces CoreDNS entirely, serving all DNS records from a local database on each node",
      "It pre-populates all DNS records from etcd into node memory at startup to avoid CoreDNS queries",
      "It bypasses the `kube-dns` Service and sends queries directly to the CoreDNS pod IP on the node",
      "It runs a local caching agent on each node that serves cached responses and falls back to CoreDNS"
    ],
    answer: 3,
    explanation: "NodeLocal DNS Cache runs as a DaemonSet with a DNS caching agent on each node. Pods query the local cache first. Cache hits are served without contacting CoreDNS, reducing its load and improving latency. It does not replace CoreDNS. It does not pre-populate all records. While it may avoid the Service VIP, the key benefit is caching, not just direct IP routing.\n\nWhy other options are wrong:\n- A: NodeLocal DNS Cache does not replace CoreDNS or intercept all queries; it caches locally and falls back to CoreDNS for cache misses.\n- B: It does not pre-populate all DNS records from etcd; it caches records as they are queried on demand.\n- C: While it may bypass the kube-dns Service VIP, the primary benefit is caching, not just direct IP routing.\n\nReference: https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/",
    verify: "kubectl get daemonset node-local-dns -n kube-system"
  },
  {
    id: "s03-q081",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A `LoadBalancer` Service on GKE shows two IP addresses: one in `status.loadBalancer.ingress[0].ip` and the ClusterIP. A pod inside the cluster sends a request to the external load balancer IP. Where is the request routed?",
    diagram: null,
    options: [
      "To the cloud load balancer, which then forwards the traffic back into the cluster for routing",
      "To the kube-apiserver, which acts as a proxy and forwards the request to the correct backend",
      "To the cloud load balancer, which drops it because the pod source IP is not allowed",
      "Directly to Service endpoints via kube-proxy hairpin rules, without leaving the cluster"
    ],
    answer: 3,
    explanation: "kube-proxy programs rules (often called hairpin or loopback NAT) that intercept traffic destined for the Service's external load balancer IP from within the cluster and route it directly to the endpoints without the traffic leaving the cluster. The request does not go to the actual cloud LB. It does not fail. The API server is not in the data path.\n\nWhy other options are wrong:\n- A: The request does not go to the cloud load balancer; kube-proxy intercepts it locally with hairpin NAT rules.\n- B: The kube-apiserver is a control-plane component and is not in the data path for service traffic.\n- C: The request does not leave the cluster to reach the cloud LB; kube-proxy handles hairpin routing for in-cluster access to external LB IPs.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: "kubectl get svc <service-name> -o jsonpath='{.status.loadBalancer.ingress}'"
  },
  {
    id: "s03-q082",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A team configures an Ingress with `ingressClassName: nginx`. The cluster has two Ingress controllers: one with class `nginx` and another with class `traefik`. What determines which controller processes this Ingress?",
    diagram: null,
    options: [
      "The controller matching the `IngressClass` installed first in the cluster takes priority",
      "Both `nginx` and `traefik` controllers process the `Ingress` and the first to respond wins",
      "The `kube-apiserver` assigns the Ingress to the controller with the least current load",
      "The controller whose `IngressClass` resource name matches `nginx` processes this Ingress"
    ],
    answer: 3,
    explanation: "The `ingressClassName` field references an `IngressClass` resource. The controller that manages that class processes the Ingress. Only the NGINX controller with class `nginx` will handle it; the Traefik controller ignores it. The API server does not load-balance Ingress assignments. Installation order is irrelevant.\n\nWhy other options are wrong:\n- A: Installation order does not determine which controller processes an Ingress; the IngressClass name match does.\n- B: Both controllers do not process the same Ingress simultaneously; only the matching class controller handles it.\n- C: The kube-apiserver does not assign Ingress resources based on controller load.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-class",
    verify: "kubectl get ingressclass"
  },
  {
    id: "s03-q083",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service has `spec.publishNotReadyAddresses: true`. What is the effect on the Endpoints/EndpointSlice for this Service?",
    diagram: null,
    options: [
      "Only pods in `CrashLoopBackOff` state are included in the Endpoints for the Service",
      "The Service publishes the node IP addresses instead of pod IPs in the Endpoints object",
      "Pods not yet passing their readiness probe are included in the Endpoints for this svc",
      "The Service stops performing health checks on backend pods and includes all endpoints"
    ],
    answer: 2,
    explanation: "Setting `publishNotReadyAddresses: true` causes the Endpoints controller to include all pods matching the selector, even those that have not passed their readiness probe. This is useful for StatefulSet headless Services where peers need to discover each other before becoming ready. It does not include only crashing pods. It does not publish node IPs. Readiness probes still run; the difference is whether unready pods appear in Endpoints.\n\nWhy other options are wrong:\n- A: All matching pods are included in Endpoints, not only those in CrashLoopBackOff.\n- B: The Service still publishes pod IPs, not node IPs, in the Endpoints object.\n- D: Readiness probes still run; the setting controls whether unready pods appear in Endpoints, not whether probes execute.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services",
    verify: "kubectl get svc <svc> -o jsonpath='{.spec.publishNotReadyAddresses}'"
  },
  {
    id: "s03-q084",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "Which Kubernetes resource stores the mapping between a pod's IP address and the Service it belongs to, enabling kube-proxy to program forwarding rules?",
    diagram: null,
    options: [
      "`ConfigMap` storing key-value configuration data",
      "`Secret` storing sensitive credential information",
      "`Endpoints` or `EndpointSlice` resource objects",
      "`ServiceAccount` for pod identity management"
    ],
    answer: 2,
    explanation: "The `Endpoints` (and the newer `EndpointSlice`) resources store the IP addresses of pods that back a Service. kube-proxy watches these resources and updates iptables/IPVS rules accordingly. ConfigMaps store configuration data. Secrets store sensitive data. ServiceAccounts provide pod identity for API access.\n\nWhy other options are wrong:\n- A: ConfigMaps store generic key-value configuration data, not service-to-pod endpoint mappings.\n- B: Secrets store sensitive credential data, not service endpoint IP mappings.\n- D: ServiceAccounts provide pod identity for API access, not service endpoint routing information.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/",
    verify: "kubectl get endpoints <service-name>"
  },
  {
    id: "s03-q085",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A developer sets `spec.ports[0].appProtocol: kubernetes.io/h2c` on a Service. What does this indicate to consuming infrastructure?",
    diagram: null,
    options: [
      "The Service enables TLS 1.2 encryption for proxy-to-backend pod connections by default",
      "kube-proxy will use HTTP/2 to communicate with the API server for this Service endpoint",
      "The Service will automatically upgrade HTTP/1.1 clients to HTTP/2 via protocol negotiation",
      "Backend pods speak cleartext HTTP/2 (h2c), letting protocol-aware proxies use HTTP/2"
    ],
    answer: 3,
    explanation: "The `appProtocol` field is a hint to load balancers and proxies about the protocol spoken by the backend. `kubernetes.io/h2c` indicates cleartext HTTP/2, allowing Ingress controllers or service meshes to establish HTTP/2 connections to the backends. It does not mandate TLS. It does not upgrade clients. kube-proxy operates at L4 and does not use this field.\n\nWhy other options are wrong:\n- A: `appProtocol` does not mandate TLS; `h2c` specifically means cleartext HTTP/2 without TLS.\n- B: kube-proxy operates at L4 and does not use the `appProtocol` field for its communication with the API server.\n- C: The field is a hint to proxies, not an automatic upgrade mechanism for clients.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#application-protocol",
    verify: "kubectl get svc <svc> -o jsonpath='{.spec.ports[0].appProtocol}'"
  },
  {
    id: "s03-q086",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A cluster operator wants to implement dual-stack networking so pods receive both IPv4 and IPv6 addresses. Which configuration is required?",
    diagram: null,
    options: [
      "Only the CNI plugin needs dual-stack configuration; other components auto-detect address families",
      "The apiserver, controller-manager, kube-proxy, and CNI must all be configured with dual CIDRs",
      "Dual-stack performs best with IPVS mode because iptables mode has limited IPv6 forwarding support",
      "Each pod explicitly requests an IPv6 address in its spec alongside the default IPv4 address"
    ],
    answer: 1,
    explanation: "Dual-stack requires coordinated configuration across multiple components: the API server needs dual-stack service CIDRs, the controller-manager needs dual pod CIDRs, kube-proxy needs to handle both address families, and the CNI plugin must assign both IPv4 and IPv6 addresses. Configuring only the CNI is insufficient. iptables supports IPv6 via ip6tables. Pods receive both addresses automatically when dual-stack is enabled.\n\nWhy other options are wrong:\n- A: Configuring only the CNI plugin is insufficient; multiple control-plane components also need dual-stack configuration.\n- C: iptables supports IPv6 via ip6tables; dual-stack is not limited to IPVS mode.\n- D: Pods receive both addresses automatically when dual-stack is enabled cluster-wide; no per-pod spec is needed.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dual-stack/",
    verify: "kubectl get nodes -o jsonpath='{.items[0].spec.podCIDRs}'"
  },
  {
    id: "s03-q087",
    domain: "Container Orchestration",
    subsection: "Troubleshooting",
    text: "A `NodePort` Service is accessible on port 31000 from within the cluster but not from an external machine. Pods are healthy and endpoints are populated. What is the most likely external cause?",
    diagram: null,
    options: [
      "kube-proxy is not running on the nodes, preventing iptables rules from being programmed at all",
      "The Service's `sessionAffinity` is set to `ClientIP`, which blocks connections from external IPs",
      "A firewall or security group rule blocks inbound traffic on port 31000 to the cluster's nodes",
      "The CNI plugin does not support `NodePort` Services and drops traffic at the network overlay"
    ],
    answer: 2,
    explanation: "If the NodePort works internally but not externally, the most common cause is a firewall or cloud security group blocking external traffic on that port. kube-proxy must be running since it works internally. Session affinity does not block clients. All CNI plugins support NodePort since it is handled by kube-proxy, not the CNI.\n\nWhy other options are wrong:\n- A: kube-proxy must be running since the Service works internally; if it were down, internal access would also fail.\n- B: `sessionAffinity: ClientIP` only controls routing stickiness; it does not block connections from any source.\n- D: CNI plugins do not interfere with NodePort Services; NodePort is handled by kube-proxy at the node level.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport",
    verify: null
  },
  {
    id: "s03-q088",
    domain: "Container Orchestration",
    subsection: "Networking",
    text: "A pod uses `dnsPolicy: None` and provides custom `dnsConfig` with `nameservers: [\"8.8.8.8\"]`. Can this pod resolve cluster-internal Service names?",
    diagram: null,
    options: [
      "Yes, because kube-proxy intercepts cluster-internal DNS queries regardless of nameserver",
      "Yes, because all DNS queries in Kubernetes are first routed through CoreDNS by the container",
      "No, because queries go to `8.8.8.8` which has no knowledge of cluster-internal Service names",
      "No, because `dnsPolicy: None` disables all kubelet-injected DNS settings for the pod entirely"
    ],
    answer: 2,
    explanation: "With `dnsPolicy: None`, the pod uses only the nameservers specified in `dnsConfig`. Since `8.8.8.8` (Google Public DNS) has no knowledge of `*.svc.cluster.local` names, cluster-internal Service names will fail to resolve. kube-proxy does not intercept DNS. Not all queries go through CoreDNS when `None` is set. `dnsPolicy: None` does not disable DNS — it requires explicit configuration via `dnsConfig`.\n\nWhy other options are wrong:\n- A: kube-proxy does not intercept DNS queries; it manages Service-level iptables/IPVS forwarding rules.\n- B: With `dnsPolicy: None`, queries are NOT routed through CoreDNS; they go only to the specified nameservers.\n- D: `dnsPolicy: None` does not disable DNS; it requires the user to provide explicit DNS configuration via `dnsConfig`.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy",
    verify: "kubectl exec <pod> -- nslookup kubernetes.default.svc.cluster.local"
  },
  {
    id: "s03-q089",
    domain: "Container Orchestration",
    subsection: "Security",
    text: "A `NetworkPolicy` specifies an `ipBlock` with `cidr: 10.0.0.0/8` and `except: [10.0.5.0/24]`. A connection from `10.0.5.15` attempts to reach the selected pods. Is it allowed?",
    diagram: null,
    options: [
      "Yes, because `10.0.5.15` is within the `10.0.0.0/8` CIDR and matches the allow rule",
      "No, because `10.0.5.15` falls within the `except` block `10.0.5.0/24` and is excluded",
      "Yes, because the `except` clause is evaluated differently for egress than for ingress rules",
      "No, because `ipBlock` rules have reduced enforcement within the cluster's internal network"
    ],
    answer: 1,
    explanation: "The `except` field in an `ipBlock` excludes a subset of the CIDR. While `10.0.5.15` is within `10.0.0.0/8`, it is also within the excepted `10.0.5.0/24` range, so it is blocked. The `except` field applies to both ingress and egress. `ipBlock` works with any valid CIDR regardless of whether it is private or public.\n\nWhy other options are wrong:\n- A: While `10.0.5.15` is within `10.0.0.0/8`, it falls within the `except` block and is therefore excluded.\n- C: The `except` clause applies to both ingress and egress rules, not just egress.\n- D: `ipBlock` rules apply to any valid CIDR regardless of whether it is a private or public IP range.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: null
  },
  {
    id: "s03-q090",
    domain: "Cloud Native Architecture",
    subsection: "Cloud Native Principles",
    text: "A platform team implements a zero-trust network model in their Kubernetes cluster. Which combination of features best supports this model?",
    diagram: '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><text x="200" y="20" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Zero-Trust Network</text><rect x="20" y="40" width="160" height="40" rx="4" fill="#326CE5"/><text x="100" y="65" text-anchor="middle" fill="#fff" font-size="10">Layer 1 — ?</text><rect x="220" y="40" width="160" height="40" rx="4" fill="#4CAF50"/><text x="300" y="65" text-anchor="middle" fill="#fff" font-size="10">Layer 2 — ?</text><rect x="20" y="110" width="160" height="40" rx="4" fill="#FF9800"/><text x="100" y="135" text-anchor="middle" fill="#fff" font-size="10">Layer 3 — ?</text><rect x="220" y="110" width="160" height="40" rx="4" fill="#9C27B0"/><text x="300" y="135" text-anchor="middle" fill="#fff" font-size="10">Layer 4 — ?</text><rect x="120" y="180" width="160" height="40" rx="4" fill="#f44336"/><text x="200" y="205" text-anchor="middle" fill="#fff" font-size="10">Layer 5 — ?</text></svg>',
    options: [
      "Default-deny `NetworkPolicy`, mTLS via a service mesh, and identity-based authorization rules",
      "`NodePort` Services with strong passwords, firewall rules, and IP allowlists on each node",
      "`ResourceQuotas` to limit pod counts, CPU shares, and memory in every cluster namespace",
      "`PodSecurityAdmission` in enforce mode with `readOnlyRootFilesystem` set on every cluster pod"
    ],
    answer: 0,
    explanation: "Zero-trust networking assumes no implicit trust within the network. This requires default-deny policies (no communication unless explicitly allowed), mutual TLS for encrypted and authenticated service-to-service communication, and identity-based authorization. NodePort with passwords is perimeter-based, not zero-trust. ResourceQuotas and LimitRanges address resource management. PodSecurityAdmission handles pod security contexts, not network trust.\n\nWhy other options are wrong:\n- B: NodePort with passwords is a perimeter-based approach, not zero-trust; it relies on network boundary security.\n- C: ResourceQuotas and LimitRanges address resource management, not network trust or identity verification.\n- D: PodSecurityAdmission handles pod security contexts (filesystem, capabilities), not network-level trust or authentication.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    verify: null
  },
  {
    id: "s03-q091",
    domain: "Cloud Native Architecture",
    subsection: "CNCF Ecosystem",
    text: "Which CNCF ecosystem tool provides network observability for Kubernetes, including traffic visibility and a service dependency map, without requiring sidecar proxies?",
    diagram: null,
    options: [
      "Prometheus — a metrics collection and alerting toolkit for Kubernetes clusters",
      "Thanos — a long-term storage and global querying layer for Prometheus data",
      "Fluentd — a unified logging layer for collecting and routing log data feeds",
      "Hubble — a Cilium component providing eBPF-based network flow logs and maps"
    ],
    answer: 3,
    explanation: "Hubble is the observability component of Cilium that uses eBPF to provide flow visibility, DNS monitoring, and service dependency maps without sidecar injection. Prometheus collects metrics but does not capture network flows. Fluentd aggregates logs. Thanos extends Prometheus for long-term storage and multi-cluster queries.\n\nWhy other options are wrong:\n- A: Prometheus collects and stores metrics but does not generate network flow logs or service dependency maps.\n- B: Thanos provides long-term storage and global querying for Prometheus data, not network flow visibility.\n- C: Fluentd is a log aggregation tool that collects and routes log data, not network flow data.\n\nReference: https://docs.cilium.io/en/stable/observability/hubble/",
    verify: null
  },
  {
    id: "s03-q092",
    domain: "Cloud Native Architecture",
    subsection: "Microservices",
    text: "A team deploys multiple microservices behind an Ingress with path-based routing. They need different timeout values for `/api` (30s) and `/uploads` (300s). Where should this configuration be set?",
    diagram: null,
    options: [
      "In the CoreDNS configuration by adding per-path TTL values for the route entries",
      "In the `terminationGracePeriodSeconds` of each backend Deployment for each path",
      "On the `ClusterIP` Services backing each path using a timeout annotation field set",
      "On the Ingress resource using controller-specific annotations for per-path timeouts"
    ],
    answer: 3,
    explanation: "Ingress controllers like NGINX support annotations (e.g., `nginx.ingress.kubernetes.io/proxy-read-timeout`) or per-path configuration snippets that allow different timeout values. ClusterIP Services do not have timeout settings. `terminationGracePeriodSeconds` controls pod shutdown, not request timeouts. CoreDNS handles DNS, not HTTP timeouts.\n\nWhy other options are wrong:\n- A: CoreDNS handles DNS resolution; it has no per-path TTL configuration for HTTP timeouts.\n- B: `terminationGracePeriodSeconds` controls pod shutdown duration, not HTTP request timeouts.\n- C: ClusterIP Services do not have timeout settings; timeouts are configured at the proxy/ingress layer.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: "kubectl get ingress <name> -o yaml | grep -i timeout"
  },
  {
    id: "s03-q093",
    domain: "Cloud Native Observability",
    subsection: "Monitoring",
    text: "A cluster uses Prometheus to monitor networking. The metric `kubelet_http_requests_duration_seconds_bucket` shows increasing p99 latency for health checks. Which component is most likely under pressure?",
    diagram: null,
    options: [
      "The kube-scheduler dispatching pods to nodes in the cluster, overloaded by scheduling decisions",
      "The kubelet's HTTP server on the affected node, responding slowly due to high pod count",
      "CoreDNS handling DNS resolution queries forwarded by the kubelet for health check lookups",
      "The Ingress controller proxying external requests to backend pods under heavy traffic load"
    ],
    answer: 1,
    explanation: "The `kubelet_http_requests_duration_seconds_bucket` metric is exposed by the kubelet. Increasing latency for health check requests indicates the kubelet's HTTP server on that node is overloaded, possibly due to high pod count, disk I/O, or resource contention. The scheduler, CoreDNS, and Ingress controller have their own separate metrics.\n\nWhy other options are wrong:\n- A: The kube-scheduler has its own metrics; `kubelet_http_requests_duration_seconds_bucket` is a kubelet metric.\n- C: CoreDNS has its own DNS-specific metrics, not kubelet HTTP metrics.\n- D: The Ingress controller has its own latency metrics; this metric is specifically from the kubelet's HTTP server.\n\nReference: https://kubernetes.io/docs/reference/instrumentation/metrics/",
    verify: null
  },
  {
    id: "s03-q094",
    domain: "Cloud Native Observability",
    subsection: "Tracing",
    text: "An Ingress controller propagates the `X-Request-ID` header to backend services. One backend does NOT forward this header when calling downstream services. What impact does this have on distributed tracing?",
    diagram: null,
    options: [
      "No impact — tracing frameworks ignore `X-Request-ID` headers in the request pipeline flow",
      "The Ingress controller re-injects the header automatically; downstream services receive it",
      "The trace breaks at that service; downstream spans appear as separate uncorrelated traces",
      "kube-proxy adds the missing header using iptables MARK rules on the packet metadata fields"
    ],
    answer: 2,
    explanation: "Distributed tracing relies on context propagation headers being forwarded by every service in the call chain. If one service drops the header, downstream spans cannot be correlated with the upstream trace, resulting in broken traces. Tracing frameworks do use request ID or trace context headers. The Ingress controller only handles the initial request. kube-proxy operates at L4 and cannot inject HTTP headers.\n\nWhy other options are wrong:\n- A: Tracing frameworks rely on context propagation headers like `X-Request-ID`; they do not ignore them.\n- B: The Ingress controller only handles the initial request; it does not re-inject headers for downstream service calls.\n- D: kube-proxy operates at L4 and cannot inspect or inject HTTP headers into application-level traffic.\n\nReference: https://opentelemetry.io/docs/concepts/signals/traces/",
    verify: null
  },
  {
    id: "s03-q095",
    domain: "Cloud Native Application Delivery",
    subsection: "CI/CD",
    text: "A CI/CD pipeline deploys a new `NetworkPolicy` that accidentally blocks traffic between the frontend and backend services. The team uses Argo Rollouts for progressive delivery. How should they respond?",
    diagram: null,
    options: [
      "Fix the NetworkPolicy in Git, push the change, and let the GitOps tool sync the correction",
      "Wait for the Argo Rollout to automatically detect the NetworkPolicy issue and trigger rollback",
      "Delete all NetworkPolicies in the namespace to restore connectivity between all the services",
      "Restart kube-proxy on all nodes, clear the faulty rules, and restore the prior configuration"
    ],
    answer: 0,
    explanation: "Following GitOps practices, the correct response is to fix the faulty NetworkPolicy in the Git repository and let the GitOps tool (e.g., Argo CD) sync the corrected version. Argo Rollouts monitors application metrics but does not directly detect NetworkPolicy issues. Deleting all policies is too broad and removes intentional restrictions. Restarting kube-proxy does not affect NetworkPolicy enforcement, which is handled by the CNI plugin.\n\nWhy other options are wrong:\n- B: Argo Rollouts monitors application metrics (like error rates) but does not directly detect NetworkPolicy issues.\n- C: Deleting all NetworkPolicies is too broad and removes intentional security restrictions.\n- D: Restarting kube-proxy does not affect NetworkPolicy enforcement, which is handled by the CNI plugin.\n\nReference: https://argo-cd.readthedocs.io/en/stable/",
    verify: null
  },
  {
    id: "s03-q096",
    domain: "Cloud Native Application Delivery",
    subsection: "Deployment Strategies",
    text: "A blue/green deployment uses two Deployments (blue and green) with separate `ClusterIP` Services. An Ingress resource routes all traffic to the blue Service. To switch traffic to green, what change is needed?",
    diagram: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="140" y="5" width="120" height="30" rx="4" fill="#326CE5"/><text x="200" y="25" text-anchor="middle" fill="#fff" font-size="12">Ingress</text><line x1="170" y1="35" x2="80" y2="80" stroke="#4CAF50" stroke-width="2"/><line x1="230" y1="35" x2="320" y2="80" stroke="#999" stroke-width="1" stroke-dasharray="4"/><rect x="20" y="80" width="120" height="30" rx="4" fill="#2196F3"/><text x="80" y="100" text-anchor="middle" fill="#fff" font-size="11">blue-svc (active)</text><rect x="260" y="80" width="120" height="30" rx="4" fill="#4CAF50"/><text x="320" y="100" text-anchor="middle" fill="#fff" font-size="11">green-svc (standby)</text><rect x="20" y="130" width="120" height="30" rx="4" fill="#555"/><text x="80" y="150" text-anchor="middle" fill="#fff" font-size="10">Blue Pods v1</text><rect x="260" y="130" width="120" height="30" rx="4" fill="#555"/><text x="320" y="150" text-anchor="middle" fill="#fff" font-size="10">Green Pods v2</text><line x1="80" y1="110" x2="80" y2="130" stroke="#999" stroke-width="1"/><line x1="320" y1="110" x2="320" y2="130" stroke="#999" stroke-width="1"/></svg>',
    options: [
      "Update the Ingress backend to point to the green Service instead of blue",
      "Scale the blue Deployment to zero replicas and wait for traffic to drain",
      "Delete the blue `ClusterIP` Service to force traffic to the green backend",
      "Change the blue Service's selector to match the green pods' label values"
    ],
    answer: 0,
    explanation: "In a blue/green deployment with separate Services, switching traffic is done by updating the Ingress resource to route to the green Service. This provides an instant cutover. Scaling blue to zero removes the fallback option. Deleting the blue Service also removes rollback capability. Changing the blue Service's selector is essentially Option A but done at the Service level rather than Ingress level and can be confusing.\n\nWhy other options are wrong:\n- B: Scaling blue to zero removes the fallback option if the green deployment has issues.\n- C: Deleting the blue Service removes rollback capability and is irreversible without recreation.\n- D: Changing the blue Service's selector works but is confusing and less clean than updating the Ingress.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/",
    verify: "kubectl get ingress <name> -o yaml"
  },
  {
    id: "s03-q097",
    domain: "Cloud Native Application Delivery",
    subsection: "Helm",
    text: "A Helm chart includes a `NetworkPolicy` template that is conditionally rendered based on `{{ if .Values.networkPolicy.enabled }}`. The default `values.yaml` sets `networkPolicy.enabled: false`. An operator wants to deploy with the policy enabled. What is the correct command?",
    diagram: null,
    options: [
      "`helm install <release> <chart> --set networkPolicy.enabled=true`",
      "`helm install <release> <chart> --enable-network-policy` as a flag",
      "`kubectl apply -f values.yaml --set networkPolicy.enabled=true`",
      "`helm template <chart> | kubectl apply -f -` to render and apply"
    ],
    answer: 0,
    explanation: "`helm install --set` overrides values at install time, enabling conditional templates like NetworkPolicy rendering. There is no `--enable-network-policy` flag in Helm. `kubectl apply` does not accept `--set` flags. `helm template` followed by `kubectl apply` would use defaults and not enable the policy unless values are also overridden.\n\nWhy other options are wrong:\n- B: There is no `--enable-network-policy` flag in the Helm CLI.\n- C: `kubectl apply` does not accept Helm's `--set` flags; it is not a Helm command.\n- D: `helm template` followed by `kubectl apply` uses default values and would not enable the NetworkPolicy unless values are overridden.\n\nReference: https://helm.sh/docs/helm/helm_install/",
    verify: "helm get values <release>"
  },
  {
    id: "s03-q098",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A Service's `spec.ipFamilyPolicy` is set to `PreferDualStack`. The cluster supports dual-stack. What ClusterIP addresses does this Service receive?",
    diagram: null,
    options: [
      "An IPv4 ClusterIP is assigned as the primary, with IPv6 available via a separate Service",
      "An IPv6 ClusterIP is assigned as primary because dual-stack clusters prioritize IPv6 addressing",
      "An IPv4 and IPv6 ClusterIP are assigned, with the primary family set by cluster defaults",
      "No ClusterIP is assigned — PreferDualStack turns it into a headless Service automatically"
    ],
    answer: 2,
    explanation: "`PreferDualStack` requests both IPv4 and IPv6 ClusterIPs when the cluster supports dual-stack. The primary IP family (listed first in `spec.ipFamilies`) is determined by the cluster's default configuration. If dual-stack is not available, it gracefully falls back to single-stack. It does not force single-family or become headless.\n\nWhy other options are wrong:\n- A: `PreferDualStack` requests both families when available; it does not default to only IPv4.\n- B: `PreferDualStack` does not default to IPv6 only; the primary family depends on cluster configuration.\n- D: `PreferDualStack` does not turn the Service into a headless Service; ClusterIPs are still assigned.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/dual-stack/",
    verify: "kubectl get svc <svc> -o jsonpath='{.spec.clusterIPs}'"
  },
  {
    id: "s03-q099",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "An engineer creates an Ingress with multiple TLS entries, each specifying a different `secretName` for hosts `a.example.com` and `b.example.com`. How does the Ingress controller determine which certificate to present?",
    diagram: null,
    options: [
      "It presents the certificate from the first TLS entry listed in the Ingress spec by default",
      "It selects the certificate based on the SNI header in the TLS ClientHello from the client",
      "It combines all certificates into a single SAN certificate dynamically at the proxy TLS layer",
      "It presents a self-signed certificate and lets the backend handle TLS termination on its own"
    ],
    answer: 1,
    explanation: "The Ingress controller uses the SNI field from the TLS ClientHello to determine which hostname the client is requesting, then selects the matching TLS Secret to present the correct certificate. It does not always use the first entry. Certificates are not dynamically combined. The Ingress controller handles TLS termination, not the backend.\n\nWhy other options are wrong:\n- A: The controller does not always use the first TLS entry; it matches based on the requested hostname via SNI.\n- C: Certificates are not dynamically combined into a single SAN certificate by the Ingress controller.\n- D: The Ingress controller handles TLS termination; it does not present a self-signed cert and delegate to backends.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/ingress/#tls",
    verify: "kubectl get ingress <name> -o jsonpath='{.spec.tls}'"
  },
  {
    id: "s03-q100",
    domain: "Kubernetes Fundamentals",
    subsection: "Services & Networking",
    text: "A cluster administrator notices that the Endpoints object for a Service with 5000 pods is very large and causes slow API responses. Which feature should they ensure is enabled?",
    diagram: null,
    options: [
      "Horizontal Pod Autoscaler to reduce the pod count and shrink the Endpoints object size",
      "Pod topology spread constraints to distribute pods evenly and reduce endpoint churn rate",
      "`EndpointSlices`, which split endpoints into smaller objects for efficient update handling",
      "`ServiceTopology` to filter endpoints by zone and reduce the overall Endpoints object size"
    ],
    answer: 2,
    explanation: "`EndpointSlices` were introduced to solve the scalability problem of large Endpoints objects. They split the endpoint list into smaller slices (default 100 per slice), allowing incremental updates instead of rewriting a single large object. HPA reduces pods but does not solve the API efficiency issue. Topology spread is for scheduling. ServiceTopology (deprecated in favor of topology-aware hints) filters endpoints but does not solve the object size problem.\n\nWhy other options are wrong:\n- A: HPA adjusts pod count based on load metrics but does not solve the API efficiency issue of large Endpoints objects.\n- B: Topology spread constraints distribute pods across failure domains for scheduling, not for API object efficiency.\n- D: ServiceTopology (deprecated) filtered endpoints by zone for routing, not for reducing Endpoints object size.\n\nReference: https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/",
    verify: "kubectl get endpointslices -l kubernetes.io/service-name=<svc>"
  },
];

var labExercises = [
  {
    title: "Lab 1: Creating Different Service Types and Testing Connectivity",
    description: "In this lab you will create ClusterIP, NodePort, and LoadBalancer Services, then test connectivity from within the cluster and externally. You will observe how each Service type exposes pods differently.",
    commands: "<span class='prompt'>$</span> kubectl create deployment web --image=nginx --replicas=3\n<span class='prompt'>$</span> kubectl expose deployment web --port=80 --target-port=80 --type=ClusterIP --name=web-clusterip\n<span class='prompt'>$</span> kubectl get svc web-clusterip\n<span class='prompt'>$</span> kubectl run test-pod --image=busybox --rm -it --restart=Never -- wget -qO- http://web-clusterip\n<span class='prompt'>$</span> kubectl expose deployment web --port=80 --target-port=80 --type=NodePort --name=web-nodeport\n<span class='prompt'>$</span> kubectl get svc web-nodeport\n<span class='prompt'>$</span> NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type==\"InternalIP\")].address}')\n<span class='prompt'>$</span> NODE_PORT=$(kubectl get svc web-nodeport -o jsonpath='{.spec.ports[0].nodePort}')\n<span class='prompt'>$</span> curl http://$NODE_IP:$NODE_PORT\n<span class='prompt'>$</span> kubectl expose deployment web --port=80 --target-port=80 --type=LoadBalancer --name=web-lb\n<span class='prompt'>$</span> kubectl get svc web-lb\n<span class='prompt'>$</span> kubectl describe svc web-lb\n<span class='prompt'>$</span> kubectl get endpoints web-clusterip web-nodeport web-lb",
    expectedOutput: "You should see: (1) ClusterIP Service with an internal IP, accessible only from within the cluster via test-pod. (2) NodePort Service with a port in the 30000-32767 range, accessible via any node's IP. (3) LoadBalancer Service with an external IP (or Pending on bare metal). All three Services share the same backend endpoints (the 3 nginx pod IPs)."
  },
  {
    title: "Lab 2: Setting Up an Ingress Resource",
    description: "In this lab you will deploy an NGINX Ingress controller, create two backend services, and configure an Ingress resource with path-based routing to direct traffic to different backends based on the URL path.",
    commands: "<span class='prompt'>$</span> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml\n<span class='prompt'>$</span> kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s\n<span class='prompt'>$</span> kubectl create deployment app1 --image=hashicorp/http-echo -- -text=\"Hello from app1\"\n<span class='prompt'>$</span> kubectl expose deployment app1 --port=5678\n<span class='prompt'>$</span> kubectl create deployment app2 --image=hashicorp/http-echo -- -text=\"Hello from app2\"\n<span class='prompt'>$</span> kubectl expose deployment app2 --port=5678\n<span class='prompt'>$</span> cat <<'EOF' | kubectl apply -f -\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: demo-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: demo.local\n    http:\n      paths:\n      - path: /app1\n        pathType: Prefix\n        backend:\n          service:\n            name: app1\n            port:\n              number: 5678\n      - path: /app2\n        pathType: Prefix\n        backend:\n          service:\n            name: app2\n            port:\n              number: 5678\nEOF\n<span class='prompt'>$</span> kubectl get ingress demo-ingress\n<span class='prompt'>$</span> INGRESS_IP=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}')\n<span class='prompt'>$</span> curl -H \"Host: demo.local\" http://$INGRESS_IP/app1\n<span class='prompt'>$</span> curl -H \"Host: demo.local\" http://$INGRESS_IP/app2",
    expectedOutput: "The Ingress controller routes /app1 requests to the app1 Service (returning 'Hello from app1') and /app2 requests to the app2 Service (returning 'Hello from app2'). The `kubectl get ingress` output shows the host, paths, and backend services."
  },
  {
    title: "Lab 3: Examining DNS Resolution Inside a Pod",
    description: "In this lab you will launch a debug pod and explore DNS resolution for various Service types, inspect the pod's /etc/resolv.conf, and understand how CoreDNS handles different query types.",
    commands: "<span class='prompt'>$</span> kubectl create deployment dns-test --image=nginx\n<span class='prompt'>$</span> kubectl expose deployment dns-test --port=80 --name=dns-test-svc\n<span class='prompt'>$</span> kubectl run debug --image=busybox:1.36 --rm -it --restart=Never -- sh -c '\n  echo \"=== /etc/resolv.conf ===\"\n  cat /etc/resolv.conf\n  echo \"\"\n  echo \"=== Resolve dns-test-svc (short name) ===\"\n  nslookup dns-test-svc\n  echo \"\"\n  echo \"=== Resolve FQDN ===\"\n  nslookup dns-test-svc.default.svc.cluster.local\n  echo \"\"\n  echo \"=== Resolve kubernetes API ===\"\n  nslookup kubernetes.default.svc.cluster.local\n  echo \"\"\n  echo \"=== Resolve external name ===\"\n  nslookup example.com\n  echo \"\"\n  echo \"=== SRV record lookup ===\"\n  nslookup -type=srv dns-test-svc.default.svc.cluster.local\n'",
    expectedOutput: "The resolv.conf shows nameserver (CoreDNS ClusterIP), search domains (default.svc.cluster.local, svc.cluster.local, cluster.local), and ndots:5. Short name resolution appends search domains. The FQDN resolves to the Service ClusterIP. The kubernetes API resolves to the API server ClusterIP. External names (example.com) are forwarded to upstream DNS. SRV records show the port and hostname of the service."
  },
  {
    title: "Lab 4: Creating and Testing a NetworkPolicy",
    description: "In this lab you will create a default-deny NetworkPolicy, verify that it blocks traffic, then add a specific allow rule and confirm connectivity is restored only for the permitted source.",
    commands: "<span class='prompt'>$</span> kubectl create namespace netpol-lab\n<span class='prompt'>$</span> kubectl run backend --image=nginx --labels='app=backend' -n netpol-lab\n<span class='prompt'>$</span> kubectl expose pod backend --port=80 -n netpol-lab\n<span class='prompt'>$</span> kubectl run allowed --image=busybox --labels='role=frontend' -n netpol-lab --command -- sleep 3600\n<span class='prompt'>$</span> kubectl run blocked --image=busybox --labels='role=other' -n netpol-lab --command -- sleep 3600\n<span class='prompt'>$</span> kubectl wait --for=condition=Ready pod/allowed pod/blocked pod/backend -n netpol-lab --timeout=60s\n<span class='prompt'>$</span> echo \"--- Test before policy (should succeed) ---\"\n<span class='prompt'>$</span> kubectl exec -n netpol-lab allowed -- wget -qO- --timeout=3 http://backend\n<span class='prompt'>$</span> cat <<'EOF' | kubectl apply -f -\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: deny-all-ingress\n  namespace: netpol-lab\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\nEOF\n<span class='prompt'>$</span> echo \"--- Test after default-deny (should timeout) ---\"\n<span class='prompt'>$</span> kubectl exec -n netpol-lab allowed -- wget -qO- --timeout=3 http://backend || echo \"Connection timed out as expected\"\n<span class='prompt'>$</span> cat <<'EOF' | kubectl apply -f -\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-frontend\n  namespace: netpol-lab\nspec:\n  podSelector:\n    matchLabels:\n      app: backend\n  policyTypes:\n  - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          role: frontend\n    ports:\n    - port: 80\nEOF\n<span class='prompt'>$</span> echo \"--- Test allowed pod (should succeed) ---\"\n<span class='prompt'>$</span> kubectl exec -n netpol-lab allowed -- wget -qO- --timeout=3 http://backend\n<span class='prompt'>$</span> echo \"--- Test blocked pod (should timeout) ---\"\n<span class='prompt'>$</span> kubectl exec -n netpol-lab blocked -- wget -qO- --timeout=3 http://backend || echo \"Connection timed out as expected\"\n<span class='prompt'>$</span> kubectl get networkpolicy -n netpol-lab",
    expectedOutput: "Before the policy, both pods can reach backend. After the default-deny policy, neither pod can connect. After adding the allow-frontend policy, only the 'allowed' pod (role=frontend) can reach backend on port 80, while the 'blocked' pod (role=other) still times out."
  },
  {
    title: "Lab 5: Inspecting kube-proxy and CNI Configuration",
    description: "In this lab you will examine the kube-proxy configuration, identify its proxy mode, inspect the CNI plugin configuration on a node, and observe the iptables/IPVS rules created by kube-proxy for a Service.",
    commands: "<span class='prompt'>$</span> kubectl get configmap kube-proxy -n kube-system -o yaml | grep -A5 'mode\\|clusterCIDR\\|metricsBindAddress'\n<span class='prompt'>$</span> kubectl get daemonset kube-proxy -n kube-system\n<span class='prompt'>$</span> kubectl get pods -n kube-system -l k8s-app=kube-proxy -o wide\n<span class='prompt'>$</span> kubectl logs -n kube-system -l k8s-app=kube-proxy --tail=20\n<span class='prompt'>$</span> kubectl create deployment probe-svc --image=nginx\n<span class='prompt'>$</span> kubectl expose deployment probe-svc --port=80\n<span class='prompt'>$</span> kubectl get svc probe-svc -o wide\n<span class='prompt'>$</span> SVC_IP=$(kubectl get svc probe-svc -o jsonpath='{.spec.clusterIP}')\n<span class='prompt'>$</span> echo \"Service ClusterIP: $SVC_IP\"\n<span class='prompt'>$</span> kubectl get endpoints probe-svc\n<span class='prompt'>$</span> kubectl get endpointslices -l kubernetes.io/service-name=probe-svc\n<span class='prompt'>$</span> # Inspect iptables rules on a node (requires node access):\n<span class='prompt'>$</span> # ssh <node> sudo iptables -t nat -L KUBE-SERVICES | grep $SVC_IP\n<span class='prompt'>$</span> # Inspect CNI configuration on a node:\n<span class='prompt'>$</span> # ssh <node> ls /etc/cni/net.d/\n<span class='prompt'>$</span> # ssh <node> cat /etc/cni/net.d/*.conflist\n<span class='prompt'>$</span> # ssh <node> ls /opt/cni/bin/\n<span class='prompt'>$</span> kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.spec.podCIDR}{\"\\n\"}{end}'",
    expectedOutput: "You should see: (1) kube-proxy ConfigMap showing the proxy mode (iptables or ipvs), cluster CIDR, and metrics bind address. (2) kube-proxy running as a DaemonSet with one pod per node. (3) Service ClusterIP and matching endpoints. (4) On nodes (if accessible): iptables NAT rules for the Service ClusterIP, CNI config files in /etc/cni/net.d/, CNI binaries in /opt/cni/bin/, and each node's allocated podCIDR."
  },
  {
    title: "Lab 6: Debugging Service Connectivity Issues",
    description: "In this lab you will simulate and debug common service connectivity problems: selector mismatch, wrong target port, missing endpoints, and DNS resolution failure. You will use kubectl commands to identify and fix each issue.",
    commands: "<span class='prompt'>$</span> kubectl create namespace debug-lab\n<span class='prompt'>$</span> kubectl run web --image=nginx --labels='app=web,version=v1' -n debug-lab\n<span class='prompt'>$</span> kubectl wait --for=condition=Ready pod/web -n debug-lab --timeout=60s\n<span class='prompt'>$</span> echo \"=== Issue 1: Selector Mismatch ===\"\n<span class='prompt'>$</span> cat <<'EOF' | kubectl apply -f -\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-broken\n  namespace: debug-lab\nspec:\n  selector:\n    app: web-typo\n  ports:\n  - port: 80\n    targetPort: 80\nEOF\n<span class='prompt'>$</span> kubectl get endpoints web-broken -n debug-lab\n<span class='prompt'>$</span> echo \"Endpoints show <none> - selector does not match any pod\"\n<span class='prompt'>$</span> kubectl get pods -n debug-lab --show-labels\n<span class='prompt'>$</span> echo \"Fix: selector should be app=web, not app=web-typo\"\n<span class='prompt'>$</span> kubectl patch svc web-broken -n debug-lab -p '{\"spec\":{\"selector\":{\"app\":\"web\"}}}'\n<span class='prompt'>$</span> kubectl get endpoints web-broken -n debug-lab\n<span class='prompt'>$</span> echo \"\"\n<span class='prompt'>$</span> echo \"=== Issue 2: Wrong Target Port ===\"\n<span class='prompt'>$</span> cat <<'EOF' | kubectl apply -f -\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-wrongport\n  namespace: debug-lab\nspec:\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 9999\nEOF\n<span class='prompt'>$</span> kubectl run test --image=busybox --rm -it --restart=Never -n debug-lab -- wget -qO- --timeout=3 http://web-wrongport || echo \"Connection refused - wrong targetPort\"\n<span class='prompt'>$</span> kubectl get svc web-wrongport -n debug-lab -o jsonpath='Port: {.spec.ports[0].port} -> TargetPort: {.spec.ports[0].targetPort}'\n<span class='prompt'>$</span> echo \"\"\n<span class='prompt'>$</span> echo \"Fix: targetPort should be 80 (nginx default port)\"\n<span class='prompt'>$</span> kubectl patch svc web-wrongport -n debug-lab -p '{\"spec\":{\"ports\":[{\"port\":80,\"targetPort\":80}]}}'\n<span class='prompt'>$</span> echo \"\"\n<span class='prompt'>$</span> echo \"=== Issue 3: DNS Debug ===\"\n<span class='prompt'>$</span> kubectl run dns-debug --image=busybox:1.36 --rm -it --restart=Never -n debug-lab -- sh -c '\n  echo \"--- resolv.conf ---\"\n  cat /etc/resolv.conf\n  echo \"\"\n  echo \"--- Resolve web-broken ---\"\n  nslookup web-broken.debug-lab.svc.cluster.local\n  echo \"\"\n  echo \"--- Check CoreDNS ---\"\n  nslookup kubernetes.default\n'\n<span class='prompt'>$</span> echo \"=== Verify all fixes ===\"\n<span class='prompt'>$</span> kubectl get svc,endpoints -n debug-lab",
    expectedOutput: "Issue 1: The web-broken Service initially shows <none> endpoints because the selector 'app: web-typo' does not match the pod label 'app: web'. After patching the selector, endpoints populate. Issue 2: web-wrongport has endpoints but connections are refused because targetPort 9999 does not match nginx's port 80. After patching, connections succeed. Issue 3: DNS debug confirms resolv.conf points to CoreDNS and service names resolve correctly. Final verification shows all Services with correct endpoints."
  }
];
