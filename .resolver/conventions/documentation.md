---
name: documentation
description: JSDoc, logging, and const-vs-let rules for src/ — read before adding or editing exported functions
type: convention
scope: global
updated: 2026-08-06 (IONE-959)
captured_sha: 977f31969c192bbef8d922ac757d573b019e230a
sources:
  - src/greeter.ts
  - .cursor/rules/docs-required.mdc
sources_sha256:
  .cursor/rules/docs-required.mdc: 308217676fe8e94971b7c762a454a51398766a4bfaee6f9b756e4d55d315e9ad
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

See `.cursor/rules/docs-required.mdc` (alwaysApply) for the full rule set: every exported function under `src/` must carry a JSDoc comment, `console.log` is banned under `src/` (use the logger module), and `const` is preferred over `let`.

`src/greeter.ts` now fully complies: both `greet` and the newly added `farewell` carry JSDoc comments.
