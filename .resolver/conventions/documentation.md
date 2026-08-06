---
name: documentation
description: JSDoc, logging, and const-vs-let rules for src/ — read before adding or editing exported functions
type: convention
scope: global
updated: 2026-08-06 (IONE-959)
captured_sha: 2476ffcd503ae45ee7783786200d829bfe38f606
sources:
  - .cursor/rules/docs-required.mdc
  - src/greeter.ts
---

See `.cursor/rules/docs-required.mdc` (alwaysApply) for the full rule set: every exported function under `src/` must carry a JSDoc comment, `console.log` is banned under `src/` (use the logger module), and `const` is preferred over `let`.

## Diverges from .cursor/rules/docs-required.mdc

The rule states every exported function must have a JSDoc comment. In `src/greeter.ts`, `farewell` has one but `greet` does not — the existing code does not fully comply with its own rule. When editing this file, add the missing JSDoc to `greet` rather than treating its absence as precedent.
