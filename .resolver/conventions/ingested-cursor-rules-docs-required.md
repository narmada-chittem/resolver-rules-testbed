---
name: docs-required
description: Documentation and logging boundaries for this repo
type: convention
scope: global
updated: '2026-07-29'
captured_sha: 9200bbccacdc9ae41e3ddab7b447e713ba288db7
sources:
  - .cursor/rules/docs-required.mdc
---

> Ingested verbatim from `.cursor/rules/docs-required.mdc` — the user-owned source of truth. Edit that file, not this page; this page is re-derived when the source changes.

- Every exported function MUST have a JSDoc comment describing params and return value.
- Never use console.log anywhere under src/ — use the logger module instead.
