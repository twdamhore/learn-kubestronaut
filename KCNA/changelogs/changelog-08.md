# Round 36 Review — set-08.js

**Date:** 2026-02-19
**Issues fixed:** 7

## Changes

### s08-q025 (accuracy)
- **Problem:** The question asked about generic serverless capability, but KEDA is also a valid CNCF graduated project for scale-to-zero, making the Knative answer ambiguous.
- **Fix:** Rephrased the question stem to explicitly mention "HTTP request-driven serverless workloads with built-in scale-to-zero" to make Knative the unambiguous correct answer vs. KEDA.

### s08-q036 (accuracy)
- **Problem:** Option A incorrectly attributed the `Task` CRD to Argo Workflows. Argo Workflows uses `Workflow` and `WorkflowTemplate` CRDs, not `Task`.
- **Fix:** Rewrote option A to: "Argo Workflows -- uses Workflow and WorkflowTemplate CRDs to define multi-step container-native DAG pipelines".

### s08-q046 (length-balance/giveaway)
- **Problem:** Correct answer A (103 chars) was notably longer than option C (88 chars), a 17% gap that could serve as a giveaway.
- **Fix:** Lengthened option C to: "The Pods continue running indefinitely on the isolated node and are never automatically rescheduled to other healthy nodes".

### s08-q049 (accuracy)
- **Problem:** NATS graduated from CNCF in March 2025, but the question still described it as "incubating".
- **Fix:** Updated option A to say "NATS is a CNCF graduated messaging system" and updated the explanation and wrong-answer explanations to reflect NATS's graduated status.

### s08-q083 (length-balance)
- **Problem:** Correct answer D (108 chars) was the shortest option, about 10% shorter than option A (120 chars).
- **Fix:** Extended option D to: "Two separate `from` entries: one with `podSelector: {matchLabels: {role: frontend}}`, and another with `namespaceSelector` for `monitoring`".

### s08-q094 (length-balance)
- **Problem:** Option D (80 chars) was noticeably shorter than others (88-91 chars).
- **Fix:** Extended option D to: "Splitting the monolithic database into horizontal shards while keeping all existing application code unchanged".

### s08-q096 (length-balance/giveaway)
- **Problem:** Option A (82 chars) was significantly shorter than others (99-108 chars), making it easy to eliminate.
- **Fix:** Extended option A to: "It catalogs only officially hosted CNCF projects and strictly filters out all commercial products from the listing entirely".
