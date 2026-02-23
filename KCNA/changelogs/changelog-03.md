# Round 36 Review - Set 03

**Date:** 2026-02-19
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 15

## Accuracy Fixes

1. **s03-q047** (accuracy): Updated option C metric name from `kube_endpoint_address` with label `ready="true"` to `kube_endpoint_address_available` for more standard naming.

## Giveaway / Ambiguity Fixes

2. **s03-q080** (giveaway/ambiguity): Rewrote option A from a description too similar to option D (both described caching behavior) to a clearly wrong claim that NodeLocal DNS Cache replaces CoreDNS entirely.
3. **s03-q093** (giveaway): Expanded short wrong options A, C, D to match correct answer B length, removing the longest-is-correct signal.
4. **s03-q098** (giveaway): Trimmed correct option C from 104 to ~88 chars, removing qualifying detail that signaled it as the correct answer.

## Length-Balance Fixes

5. **s03-q010**: Padded wrong options A, B, C from ~60 chars to ~100 chars each, closing the 36.8% gap with correct answer D.
6. **s03-q054**: Trimmed options A and B from 115/109 chars to ~82/82 chars, closing the 23.5% gap with correct answer D (88 chars).
7. **s03-q069**: Expanded correct option B from 59 to 82 chars, closing the 25.3% gap with option A (79 chars).
8. **s03-q086**: Normalized all options to ~90-96 chars by trimming A and D and expanding C, closing the 35.2% spread.
9. **s03-q017**: Expanded correct option D from 64 to 79 chars ("resolving to each pod IP"), closing the gap with option A (76 chars).
10. **s03-q031**: Trimmed option A from 72 to 63 chars and expanded correct option C from 58 to 71 chars, reducing the 19.4% gap.
11. **s03-q038**: Expanded correct option C from 59 to 76 chars ("fronting CoreDNS"), closing the 22.4% gap with option D (76 chars).
12. **s03-q058**: Trimmed option A from 103 to 86 chars, closing the gap with correct option C (85 chars).
13. **s03-q060**: Trimmed option C from 111 to 83 chars, closing the gap with correct option B (89 chars).
14. **s03-q081**: Trimmed option C from 117 to 83 chars, closing the gap with correct option D (87 chars).
15. **s03-q085**: Trimmed option A from 104 to 76 chars, closing the gap with correct option D (84 chars).

## Summary

- 1 accuracy fix (metric name correction)
- 3 giveaway/ambiguity fixes (option similarity, longest-is-correct patterns)
- 11 length-balance fixes (normalizing option character counts)
- No answer indices were changed

---

# Round 37 Review - Set 03

**Date:** 2026-02-19
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 10 (11 identified, 1 skipped)

## Accuracy Fixes

1. **s03-q047** (accuracy - HIGH PRIORITY): Metric `kube_endpoint_address_available` was removed from kube-state-metrics (Oct 2024). Changed option C from `kube_endpoint_address_available` to `kube_endpoint_address{ready="true"}`. Updated explanation to reference the correct metric name with label syntax.
2. **s03-q019** (accuracy): Flannel is not a CNCF project. Changed option B from "a CNCF project providing overlay networking" to "a CNI plugin providing overlay networking".

## Explanation Fixes

3. **s03-q052** (explanation): Clarified wrong-option-A explanation from "it is the configurable maximum upper bound" to "it is the upper bound of the `--max-endpoints-per-slice` flag."

## Length-Balance Fixes

4. **s03-q023**: Trimmed option C from "to every container in the distributed system" to "to every container" (removed 31% length gap with correct option A).
5. **s03-q053**: Padded correct option A from 58 to 75 chars ("set to a list of allowed CIDR blocks for access") and padded option D from 58 to 65 chars ("IP address ranges").
6. **s03-q060**: Trimmed option D from 107 to 87 chars, removing redundant words ("overrides", "setting").
7. **s03-q067**: Trimmed option A from 88 to 76 chars and padded option C from 64 to 75 chars, balancing the spread.
8. **s03-q069**: Padded option C from 61 to 78 chars ("across envs") and option D from 59 to 76 chars ("between services"), closing gap with correct option B (83 chars).
9. **s03-q034**: Trimmed option B from 114 to 95 chars, removing "`api.example.com`" from the tail.
10. **s03-q039**: Padded correct option B from 65 to 73 chars ("per pod"), closing gap with other options.

## Skipped

- **s03-q016**: Structural DNS name length issue, low priority. Deferred.

## Summary

- 2 accuracy fixes (deprecated metric, incorrect CNCF attribution)
- 1 explanation fix (EndpointSlice flag name)
- 7 length-balance fixes (normalizing option character counts)
- No answer indices were changed

---

# Round 38 Review - Set 03

**Date:** 2026-02-19
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 9 across 9 questions

## Changes

### s03-q019 (accuracy)
- **Option D:** Removed incorrect "CNCF sandbox project" claim. Changed to "Multus — a meta-CNI plugin that attaches multiple network interfaces to pods".

### s03-q047 (length-balance)
- **Option B:** Expanded. **Option C (correct):** Trimmed tail to reduce 14.4% gap.

### s03-q053 (length-balance)
- **Options C, D:** Padded to close 24.1% spread.

### s03-q031 (length-balance)
- **Options A, B, D:** Padded to close gap with correct answer C.

### s03-q038 (length-balance)
- **Option C (correct):** Trimmed from ~80 to ~74 chars to reduce 15% spread.

### s03-q085 (length-balance)
- **Option A:** Padded with "by default" to close 16.7% gap.

### s03-q058 (length-balance)
- **Option D:** Trimmed from ~98 to ~85 chars.

### s03-q088 (length-balance)
- **Options A, D:** Trimmed to reduce 13.2% spread.

### s03-q046 (accuracy)
- **Option B:** Updated "Ambassador" to "Emissary-Ingress" (rebranded in 2021).

---

# Round 39 Review - Set 03

**Date:** 2026-02-21
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 12 across 12 questions

## Length-Balance Fixes

### MEDIUM priority

1. **s03-q046** (length-balance): Expanded all four options with "Kubernetes" descriptors to balance correct D (was 49ch shortest).
2. **s03-q047** (length-balance): Expanded correct C by adding "over time"; trimmed B by removing "configured" to close gap (C was 74ch, D was 90ch).
3. **s03-q053** (length-balance): Trimmed C from "load balancers" to "LBs"; trimmed B from "loadBalancer source IPs" to "source IP addresses for LB" to close gap (C=88, B=73).
4. **s03-q009** (length-balance): Expanded correct B by adding "unique"; trimmed C by shortening "between pod networks" to "for pods" (B was 90ch, C=105).

### LOW-MEDIUM priority

5. **s03-q027** (length-balance): Trimmed A ("its entry in the Endpoints object" to "its Endpoints entry"); expanded correct B ("stops receiving" to "no longer receives") to close gap (B=87, A=100).
6. **s03-q041** (length-balance): Expanded correct A by adding "the" before "selected pods" (was 66ch, D=74ch).
7. **s03-q091** (length-balance): Expanded correct D by adding "providing" and "network" ("for eBPF-based flow logs" to "providing eBPF-based network flow logs") (was 69ch, A=78).
8. **s03-q059** (length-balance): Trimmed D by removing "by default" to close gap with correct C (B=81, D was 94ch).

### LOW priority

9. **s03-q042** (length-balance): Expanded correct A by adding "lookup" ("hash-based structures" to "hash-based lookup structures") (was 83ch, B=92).
10. **s03-q061** (length-balance): Expanded correct B by adding "watched and" ("independently updated" to "watched and updated independently") (was 85ch, A=95).
11. **s03-q011** (length-balance): Expanded correct A by adding "directly"; trimmed C ("external host and port" to "host and port pair") (A was 43ch, C=50).
12. **s03-q092** (length-balance): Expanded correct D by adding "resource" ("On the Ingress" to "On the Ingress resource") (was 74ch, C=82).

## Summary

- 12 length-balance fixes (normalizing option character counts across 12 questions)
- No answer indices were changed
- No accuracy or explanation changes

---

# Round 40 Review - Set 03

**Date:** 2026-02-21
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 12 across 12 questions

## Changes

### s03-q007 (length-balance)
- **Option A (correct):** Expanded from 84 to 94 chars (changed "`ingress`" to "`Ingress`" and added "its" and "field") to close 10.7% gap with longest D (93ch). Ratio reduced from 1.107 to 1.044.

### s03-q011 (length-balance)
- **Options B, C, D:** Padded by 1-7 chars each ("containing", "for it", "full") to close 13% gap with correct A (52ch). Ratio reduced from 1.130 to 1.019.

### s03-q050 (length-balance)
- **Option B (correct):** Trimmed from 103 to 94 chars (removed "on the Deployment") to eliminate longest-is-correct signal. Ratio reduced from 1.096 to 1.032.

### s03-q055 (length-balance)
- **Option D (correct):** Expanded from 91 to 99 chars (added "Service" before "backend") to close 9.9% gap with longest option A (100ch). Ratio reduced from 1.099 to 1.020.

### s03-q082 (length-balance)
- **Options A, B, C:** Trimmed by 4-9 chars each to close 10.2% gap with correct D (88ch). Ratio reduced from 1.102 to 1.047.

### s03-q065 (length-balance)
- **Option D (correct):** Expanded from 86 to 91 chars (added "that" before "the `kube-dns`") to close 9.3% gap with longest C (94ch). Ratio reduced from 1.093 to 1.033.

### s03-q030 (length-balance)
- **Option C (correct):** Expanded from 66 to 71 chars (changed "namespace only" to "namespace", added "currently") to close 10.6% gap with longest B (73ch). Ratio reduced from 1.106 to 1.090.

### s03-q020 (giveaway)
- **Option A:** Added comma-list structure ("encryption, authentication, and access") to match correct D's comma-list pattern, removing unique structural signal.

### s03-q090 (giveaway + length-balance)
- **Options B, C:** Added comma-list structure to match correct A's pattern. Trimmed D from 96 to 93 chars. Ratio reduced from 1.103 to 1.069.

### s03-q073 (giveaway + length-balance)
- **Option B:** Added semicolon structure to match correct D's semicolon pattern. Trimmed A and D by 4-5 chars. Ratio reduced from 1.032 to 1.033 (neutral); semicolon giveaway removed.

### s03-q094 (giveaway)
- **Option B:** Restructured with semicolon ("re-injects the header automatically; downstream services receive it") to match correct C's semicolon pattern, removing unique structural signal.

### s03-q095 (giveaway)
- **Option D:** Restructured with comma-list ("Restart kube-proxy on all nodes, clear the faulty rules, and restore...") to match correct A's comma-list pattern, removing unique structural signal.

## Summary

- 7 length-balance fixes (normalizing option character counts)
- 5 giveaway fixes (removing unique structural signals: comma-lists, semicolons)
- 3 questions had both giveaway and length-balance fixes
- No answer indices were changed
- No accuracy or explanation changes

---

# Round 41 Review - Set 03

**Date:** 2026-02-21
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 12 across 10 questions

## Changes

### s03-q038 (length-balance)
- **Options A, B, D:** Padded by 1-4 chars each ("worker node", "API traffic", "container image") to close 14.7% gap. Ratio reduced from 1.147 to 1.041.

### s03-q039 (length-balance)
- **Option C:** Padded by 5 chars ("resolution setup") to close 11.6% gap with A (77ch). Ratio reduced from 1.116 to 1.055.

### s03-q047 (length-balance)
- **Options A, B, D:** Rebalanced all four options to close gap where correct C (84ch) had become longest after prior round edits overshot. Ratio reduced from 1.139 to 1.089.

### s03-q054 (length-balance)
- **Options A, B, C:** Adjusted by 1-4 chars each to close 12% spread. Ratio reduced from 1.120 to 1.047.

### s03-q059 (giveaway + length-balance)
- **Options A, B, D:** Added em-dash structure to all options to match correct C's em-dash, removing unique structural signal. Also balanced lengths. Ratio reduced from 1.123 to 1.048.

### s03-q060 (length-balance)
- **Options A, C, D:** Adjusted by 1-4 chars to close 14.5% spread. Ratio reduced from 1.145 to 1.095.

### s03-q064 (length-balance)
- **Option C:** Trimmed by 3 chars ("via BGP" instead of "via BGP peers") to close 11.2% gap. Ratio reduced from 1.112 to 1.091.

### s03-q080 (length-balance)
- **Option A:** Padded by 8 chars ("each cluster node" instead of "each node") to close 10.2% gap where correct D (97ch) was longest. Ratio reduced from 1.102 to 1.021.

### s03-q081 (length-balance)
- **Options A, B:** Trimmed by 3-5 chars each to close 12% gap with shortest C (83ch). Ratio reduced from 1.120 to 1.060.

### s03-q084 (length-balance)
- **Option D:** Padded by 4 chars ("pod identity and API access") to close 11.4% gap. Ratio reduced from 1.114 to 1.043.

### s03-q086 (giveaway)
- **Option C:** Restructured with comma-list ("iptables, kube-proxy, and ip6tables") to match correct B's comma-list pattern, removing unique structural signal.

## Summary

- 10 length-balance fixes (normalizing option character counts)
- 2 giveaway fixes (removing unique structural signals: em-dash, comma-list)
- 1 question had both giveaway and length-balance fixes (s03-q059)
- No answer indices were changed
- No accuracy or explanation changes

---

# Round 42 Review - Set 03

**Date:** 2026-02-21
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 7 across 5 questions

## Changes

### s03-q007 (backtick-density giveaway)
- **Option C:** Added backticks around `Egress` to balance backtick density (was 0 backticks, now 2; correct A has 4).
- **Option D:** Added backticks around `policyTypes` and reworded to "because `policyTypes` must list both directions" (was 0 backticks, now 2).

### s03-q026 (giveaway)
- **Option C:** Reworded from "Switch to `NodePort` because bare-metal clusters lack built-in external load balancer provisioning" to "Switch to a different Service type such as `NodePort` to bypass the external LB provisioning gap", adding "such as" to match correct A's "such as `MetalLB`" pattern and removing unique specificity signal.

### s03-q059 (backtick-density giveaway)
- **Option B:** Added backticks around `Policy B` (was 0 backticks, now 2; correct C has 4).
- **Option D:** Added backtick around `NetworkPolicy` and reworded to "The policies conflict — `NetworkPolicy` rules cancel each other out and deny all ingress" (was 0 backticks, now 2). Ratio reduced from 1.094 to 1.035.

### s03-q073 (giveaway)
- **Option C:** Reworded from "counting container restarts caused by network issues" to "counting restarts such as those from network errors", adding "such as" to match correct D's example pattern.
- **Option D:** Changed "such as Cilium's `Hubble`" to "like Cilium's `Hubble`" so both C and D now have example phrases, removing the unique specificity signal from the correct answer.

### s03-q089 (backtick-density giveaway)
- **Option C:** Added backticks around `egress` (was 2 backticks, now 4; correct B has 6).
- **Option D:** Reworded from "have reduced enforcement within the cluster's internal network" to "with `cidr` in the `10.x.x.x` range have reduced enforcement" (was 2 backticks, now 6), balancing backtick density with correct B.

## Summary

- 5 giveaway fixes (3 backtick-density imbalances, 2 unique-example-phrase signals)
- No answer indices were changed
- No accuracy or explanation changes

---

# Round 43 Review - Set 03

**Date:** 2026-02-21
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 4 across 3 questions

## Changes

### s03-q009 (polarity giveaway)
- **Option C:** Reworded from "Cross-node communication requires a `LoadBalancer` Service to bridge node boundaries for pods" to "Yes — but only through a `LoadBalancer` Service that explicitly bridges the node boundary for pods", adding "Yes —" prefix to match correct B's structure.
- **Option D:** Reworded from "Cross-node communication requires both pods to share the same namespace and network policy selector" to "No — both pods must share the same namespace and network policy selector to allow cross-node traffic", adding "No —" prefix to match A's structure. Now 2 Yes + 2 No options remove the lone-Yes polarity giveaway.

### s03-q073 (polarity giveaway)
- **Option A:** Reworded from "`kube_networkpolicy_labels` showing policy labels attached to the resources in the namespace" to "No single metric captures this; correlate `kube_networkpolicy_labels` with pod traffic counters". Now both A and D start with "No...", removing the unique negative-framing signal on correct D. Updated wrong-answer explanation accordingly.

### s03-q089 (length-balance)
- **Option C:** Trimmed from "the `except` clause is evaluated differently for `egress` than for ingress rules" to "...for `egress` than for ingress" (93ch to 87ch), reducing ratio from 1.120 to 1.060.

## Summary

- 2 polarity giveaway fixes (removing lone Yes/No structural signals from correct answers)
- 1 length-balance fix (reducing option spread)
- No answer indices were changed
- No accuracy changes
