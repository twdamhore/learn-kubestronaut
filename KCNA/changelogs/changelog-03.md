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

---

## Round 44 — 2026-02-23
**File**: `set-03.js`
**Issues found**: 6

### s03-q016 — length-balance (DNS name options)
- Added brief descriptive suffixes to all four DNS name options ("using the default NS", "skipping the svc segment", "omitting the namespace", "using the pod's NS") to reduce the 30.8% length ratio caused by inherently different DNS string lengths. Ratio reduced from 1.308 to 1.122.

### s03-q017 — giveaway (unique "like" in correct)
- Changed correct option D from "A records like `cache-0.cache.<ns>...`" to "A records `cache-0.cache.<ns>...`" to remove the unique "like" example phrase that signaled the correct answer.

### s03-q042 — giveaway (unique parenthetical in correct)
- Added parenthetical "(L4)" to distractor B ("at the kernel level (L4)") to balance the unique parenthetical "O(1)" in correct option A, removing the structural signal.

### s03-q073 — giveaway (unique "like" in correct)
- Changed correct option D from "CNI-level tools like Cilium's `Hubble`" to "CNI-level flow tools such as Cilium's `Hubble`" to remove the unique "like" keyword. Now both C ("such as those from") and D ("such as Cilium's") share the example phrase pattern.

### s03-q085 — giveaway (unique parenthetical in correct)
- Added parenthetical "(1.2)" to distractor A ("TLS (1.2) encryption") to balance the unique parenthetical "(h2c)" in correct option D, removing the structural signal.

### s03-q090 — giveaway (backtick-start pattern mismatch)
- Restructured correct option A from "Default-deny `NetworkPolicy`, mTLS via..." to "`NetworkPolicy` default-deny rules, mTLS via..." so it starts with a backtick like all three distractors, removing the unique structural standout.

## Summary

- 1 length-balance fix (DNS name option padding)
- 5 giveaway fixes (2 unique "like" keywords, 2 unique parentheticals, 1 backtick-start mismatch)
- No answer indices were changed
- No accuracy or explanation changes

---

## Round 45 — 2026-02-23
**File**: `set-03.js`
**Issues found**: 0

No issues found. All 100 questions passed review for option length balance (max/min ratio threshold 1.15), giveaway patterns (unique structural signals, phrase patterns, backtick density, polarity), factual accuracy (CNCF project statuses, Kubernetes features, metric names), and explanation quality. Answer distribution is well-balanced (A=25, B=24, C=25, D=26). This set has been through 9 prior review rounds (Rounds 36-44) with 72+ cumulative fixes applied.

---

## Round 46 — 2026-02-24
**File**: `set-03.js`
**Issues found**: 4

### s03-q029 — giveaway (backtick-density gap, option D had 0 backticks)
- Added backticks around `etcd` and `kube-apiserver` in option D (was 0 backticks, now 4) to reduce the gap with correct option C (4 backticks). Previously option D was the only option with zero backtick-wrapped terms.

### s03-q037 — giveaway (unique double quotes in correct answer)
- Added escaped double quotes around `"nlb"` in distractor B's annotation value to match the `"true"` quote pattern in correct option C, removing the unique double-quote structural signal from the correct answer.

### s03-q040 — giveaway (backtick-density gap, option A had 0 backticks)
- Added backticks around `kube-proxy` and `iptables` in option A (was 0 backticks, now 4) to reduce the gap with correct option B (4 backticks). Previously option A was the only option with zero backtick-wrapped terms.

### s03-q047 — giveaway (unique double quotes in correct answer)
- Changed option A from `kube_service_info` to `kube_service_info{service="<name>"}` to add Prometheus label-selector syntax with double quotes, matching the `{ready="true"}` pattern in correct option C. Removes the unique double-quote structural signal.

## Summary

- 4 giveaway fixes (2 unique double-quote signals, 2 backtick-density gaps with 0-backtick distractors)
- No answer indices were changed
- No accuracy or explanation changes
- All 100 questions pass length-balance check (no ratio > 1.15)
- Answer distribution unchanged: A=25, B=24, C=25, D=26

---

# Round 47 Review - set-03.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 4

---

## s03-q015 (backtick-density giveaway)

**Problem:** Option C had only 2 backticks while the correct answer A had 8 and options B/D had 6 each. Option C's low backtick count made it visually distinct and easier to eliminate.
**Change:** Added backticks around `ingress` and `cluster` in option C ("allowing `ingress` from any pod in the `cluster`"), raising its backtick count from 2 to 6, matching B and D.

---

## s03-q093 (length-balance)

**Problem:** Correct answer B (87ch) was the shortest option while A (95ch) was the longest, creating a 1.092 ratio with the correct answer at the short extreme.
**Change:** Expanded B from "due to high pod count" to "due to high pod count or load" (87ch to 95ch), closing the gap. Ratio reduced from 1.092 to 1.067.

---

## s03-q019 (length-balance)

**Problem:** Correct answer A (69ch) was the shortest option while C and D (76ch) were the longest, creating a 1.101 ratio with the correct answer at the short extreme.
**Change:** Changed "with eBPF dataplane" to "with an eBPF-based dataplane" (69ch to 78ch), closing the gap. Ratio reduced from 1.101 to 1.054.

---

## s03-q064 (length-balance)

**Problem:** Correct answer A (96ch) was the longest option while C (88ch) was the shortest, creating a 1.091 ratio with the correct answer at the long extreme.
**Change:** Changed "natively routable on the physical network without encapsulation" to "directly routable on the physical network without overlay" (96ch to 90ch), reducing the gap. Ratio reduced from 1.091 to 1.068.

---

## Summary

- 1 backtick-density giveaway fix (option C had 2 backticks vs 6-8 for others)
- 3 length-balance fixes (correct answer at short or long extreme)
- No answer indices were changed
- No accuracy or explanation changes
- Answer distribution unchanged: A=25, B=24, C=25, D=26

---

## Round 47c — 2026-02-25
**File**: `set-03.js`
**Issues fixed**: 6

### s03-q048 — first-word giveaway (correct starts with "kube-proxy", distractors all start with "The")
- **Option B:** Changed "The kube-scheduler logs showing pod placement decisions" to "kube-scheduler logs showing pod placement decisions" to break the 3-same "The" first-word pattern among distractors.

### s03-q058 — keyword giveaway (only correct contains `, which`)
- **Option A:** Changed "Cluster-internal names are resolved but external names may time out without forwarding" to "Cluster-internal names are resolved, which is the default, but external names may time out" to add `, which` to a distractor.

### s03-q059 — keyword giveaway (only correct contains "both")
- **Option D:** Changed "The policies conflict — `NetworkPolicy` rules cancel each other out" to "The policies conflict — both `NetworkPolicy` rules cancel each other out" to add "both" to a distractor.

### s03-q070 — first-word giveaway + keyword giveaway ("while")
- **Correct B:** Changed "Knative's activator component" to "The Knative activator component" so the correct answer starts with "The" like the distractors, breaking the first-word giveaway.
- **Option D:** Changed "retries the request indefinitely until a backend pod finally appears" to "retries the request indefinitely while waiting for a backend pod to appear" to add "while" to a distractor.

### s03-q081 — first-word giveaway (correct starts with "Directly", distractors all start with "To")
- **Option A:** Changed "To the cloud load balancer, which forwards" to "Through the cloud load balancer, which forwards" to break the 3-same "To" first-word pattern among distractors.

### s03-q100 — keyword giveaway (only correct contains `, which`)
- **Option D:** Changed "`ServiceTopology` to filter endpoints by zone" to "`ServiceTopology`, which filters endpoints by zone" to add `, which` to a distractor.

### Summary
- 3 first-word giveaway fixes (breaking 3-same distractor patterns)
- 3 keyword giveaway fixes (`, which` x2, "both" x1, "while" x1)
- No answer indices were changed
- No accuracy or explanation changes

---

## Round 47d — 2026-02-25
**File**: `set-03.js`
**Issues fixed**: 11 (backtick-balance)

### s03-q005 — backtick balance (A had 0 backtick-terms, correct D had 1)
- **Option A:** Added backticks around `kube-proxy` (0 -> 1 term).

### s03-q006 — backtick balance (A had 1 backtick-term, correct D had 2)
- **Option A:** Added backticks around `kubelet` (1 -> 2 terms).

### s03-q007 — backtick balance (B had 1 backtick-term, correct A had 2)
- **Option B:** Added backticks around `egress` (1 -> 2 terms).

### s03-q030 — backtick balance (A had 0 backtick-terms, correct C had 1)
- **Option A:** Added backticks around `namespace` (0 -> 1 term).

### s03-q035 — backtick balance (B had 0 backtick-terms, correct A had 1)
- **Option B:** Added backticks around `Service` (0 -> 1 term).

### s03-q050 — backtick balance (D had 1 backtick-term, correct B had 2)
- **Option D:** Added backticks around `Service` (1 -> 2 terms).

### s03-q054 — backtick balance (A had 0 backtick-terms, correct D had 1)
- **Option A:** Added backticks around `selectors` (0 -> 1 term).

### s03-q059 — backtick balance (B had 1 backtick-term, correct C had 2)
- **Option B:** Added backticks around `Policy A` (1 -> 2 terms).

### s03-q084 — backtick balance (D had 1 backtick-term, correct C had 2)
- **Option D:** Added backticks around `pod` (1 -> 2 terms).

### s03-q088 — backtick balance (A had 0 backtick-terms, correct C had 1)
- **Option A:** Added backticks around `kube-proxy` (0 -> 1 term).

### s03-q100 — backtick balance (A had 0 backtick-terms, correct C had 1)
- **Option A:** Added backticks around `pod` (0 -> 1 term).

### Summary
- 11 backtick-balance fixes (adding backtick formatting to distractors to reduce correct-answer signal)
- No answer indices were changed
- No accuracy or explanation changes

---

# Round 48 Review - set-03.js

**Date:** 2026-02-25
**File:** `KCNA/data/set-03.js`
**Issues fixed:** 0

---
No issues found. All 100 questions passed review for option length balance (max/min ratio threshold 1.15), giveaway patterns (unique structural signals, keyword patterns, backtick density, polarity, first-word patterns), factual accuracy, and explanation quality. All three automated checkers (length balance, giveaway, backtick balance) report 0 flags across all sets. Answer distribution remains well-balanced (A=25, B=24, C=25, D=26). This set has been through 12 prior review rounds (Rounds 36-47d) with 90+ cumulative fixes applied.

---

## Round 48b — 2026-02-25
**File**: `set-03.js`
**Issues fixed**: 10 (first-word and keyword giveaway patterns)

### s03-q002 — first-word giveaway (correct "kube-proxy", distractors cluster "The" 2x)
- **Option D:** Changed "The container runtime tunnels the packet back to the API server which then routes it to the pod" to "Container runtime tunnels the packet back to the API server, which then routes it to the pod" to break the 2x "The" cluster among distractors.

### s03-q003 — first-word giveaway (correct "An", distractors cluster "A" 2x)
- **Option A:** Changed "A `NetworkPolicy` that selectively forwards..." to "One `NetworkPolicy` that selectively forwards..." to break the 2x "A" cluster among distractors.

### s03-q048 — first-word giveaway (correct "kube-proxy", distractors cluster "The" 2x)
- **Option C:** Changed "The etcd audit log showing key-value store operations for the Service resources" to "Etcd audit log entries showing key-value store operations for the Service resources" to break the 2x "The" cluster among distractors.

### s03-q058 — first-word giveaway (correct "Queries", distractors cluster "The" 2x)
- **Option D:** Changed "The pod queries CoreDNS and the node resolver in round-robin order for each DNS lookup" to "Each pod queries CoreDNS and the node resolver in round-robin order for every DNS lookup" to break the 2x "The" cluster among distractors.

### s03-q072 — keyword giveaway (only correct contains "instead of")
- **Option D:** Changed "Running all microservices in a single pod to use `localhost` and avoid network overhead entirely" to "Running all microservices in a single pod to use `localhost` instead of the network and avoid overhead" to add "instead of" to a distractor.

### s03-q081 — first-word giveaway (correct "Directly", distractors cluster "To" 2x)
- **Option C:** Changed "To the cloud load balancer, which drops it because the pod source IP is not allowed" to "Back to the cloud load balancer, which drops it because the pod source IP is not allowed" to break the 2x "To" cluster among distractors.

### s03-q083 — first-word giveaway (correct "Pods", distractors cluster "The" 2x)
- **Option B:** Changed "The Service publishes the node IP addresses instead of pod IPs in the Endpoints object" to "Node IP addresses are published instead of pod IPs in the Endpoints object for the Service" to break the 2x "The" cluster among distractors.

### s03-q085 — first-word giveaway (correct "Backend", distractors cluster "The" 2x)
- **Option A:** Changed "The Service enables TLS (1.2) encryption for proxy-to-backend pod connections by default" to "TLS (1.2) encryption is enabled by the Service for proxy-to-backend pod connections by default" to break the 2x "The" cluster among distractors.

### s03-q087 — first-word giveaway (correct "A", distractors cluster "The" 2x)
- **Option D:** Changed "The CNI plugin does not support `NodePort` Services and drops traffic at the network overlay" to "No CNI plugin supports `NodePort` Services and traffic is dropped at the network overlay level" to break the 2x "The" cluster among distractors.

### s03-q096 — keyword giveaway (only correct contains "instead of")
- **Option C:** Changed "Delete the blue `ClusterIP` Service to force traffic to the green backend" to "Delete the blue `ClusterIP` Service instead of updating it to force green traffic" to add "instead of" to a distractor.

### Summary
- 8 first-word giveaway fixes (breaking 2x distractor first-word clusters)
- 2 keyword giveaway fixes (adding "instead of" to distractors)
- No answer indices were changed
- No accuracy or explanation changes
- All three checkers report 0 flags for set-03

---

## Round 49 — 2026-02-25
**File**: `set-03.js`
**Issues fixed**: 1

### s03-q037 — trailing whitespace in option D
- **Option D:** Removed trailing space character from "Type `ExternalName` with `externalName` set to the NLB DNS name for direct internal DNS resolution ". Cosmetic fix only; no content change.

### Summary
- 1 cosmetic fix (trailing whitespace removal)
- No answer indices were changed
- No accuracy or explanation changes
- All five checkers (length balance, giveaway, backtick balance, first-word, keyword unique) report 0 flags

---

## Round 50 — 2026-02-25
**File**: `set-03.js`
**Issues fixed**: 0

No issues found. All 100 questions passed review for option length balance (max/min ratio threshold 1.15), giveaway patterns (unique structural signals, keyword patterns, backtick density, polarity, first-word patterns, unique punctuation), factual accuracy (CNCF project statuses, Kubernetes API fields, metric names, networking concepts), and explanation quality. All five automated checkers (length balance, giveaway, backtick balance, first-word, keyword unique) report 0 flags. Answer distribution remains well-balanced (A=25, B=24, C=25, D=26). This set has been through 14 prior review rounds (Rounds 36-49) with 90+ cumulative fixes applied.
