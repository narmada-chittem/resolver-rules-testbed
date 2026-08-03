---
name: docs-required
description: Documentation and logging boundaries for this repo
type: convention
scope: global
updated: '2026-08-03'
captured_sha: 2476ffcd503ae45ee7783786200d829bfe38f606
sources:
  - .cursor/rules/docs-required.mdc
---

> Ingested verbatim from `.cursor/rules/docs-required.mdc` — the user-owned source of truth. Edit that file, not this page; this page is re-derived when the source changes.

- Every exported function MUST have a JSDoc comment describing params and return value.
- Never use console.log anywhere under src/ — use the logger module instead.
- Prefer const over let for immutable bindings.
