---
name: documentation
description: JSDoc, logging, and const-vs-let rules for src/ — read before adding or editing exported functions
type: convention
scope: global
updated: 2026-08-06 (IONE-959)
captured_sha: ecd80ef8a68c3f3215febaa6906216040e76f258
sources:
  - src/greeter.ts
  - .cursor/rules/docs-required.mdc
---

See `.cursor/rules/docs-required.mdc` (alwaysApply) for the full rule set: every exported function under `src/` must carry a JSDoc comment, `console.log` is banned under `src/` (use the logger module), and `const` is preferred over `let`.

`src/greeter.ts` now fully complies: both `greet` and the newly added `farewell` carry JSDoc comments.
