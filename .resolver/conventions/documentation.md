---
broken_yaml: [unclosed
name: documentation
description: JSDoc, logging, and const-vs-let rules for src/ — read before adding or editing exported functions
type: convention
scope: global
updated: 2026-08-06 (IONE-959)
captured_sha: 1c58a7d3772254d3911b0da477493a067f85efec
sources:
  - src/greeter.ts
  - .cursor/rules/docs-required.mdc
sources_sha256:
  .cursor/rules/docs-required.mdc: 308217676fe8e94971b7c762a454a51398766a4bfaee6f9b756e4d55d315e9ad
  src/greeter.ts: db016d708a48255d4b44898694700f66604dd7464ac90094f245a4d7d0644ba1
---

See `.cursor/rules/docs-required.mdc` (alwaysApply) for the full rule set: every exported function under `src/` must carry a JSDoc comment, `console.log` is banned under `src/` (use the logger module), and `const` is preferred over `let`.

`src/greeter.ts` now fully complies: both `greet` and the newly added `farewell` carry JSDoc comments.
