---
name: documentation
description: JSDoc, logging, and const-vs-let rules for src/ — read before adding or editing exported functions
type: convention
scope: global
updated: 2026-08-24 (IONE-959)
captured_sha: 296e595d5e418225831bc88c389c8a43b4a89a56
sources:
  - src/greeter.ts
  - src/connect/http-retry.ts
  - .cursor/rules/docs-required.mdc
sources_sha256:
  .cursor/rules/docs-required.mdc: 308217676fe8e94971b7c762a454a51398766a4bfaee6f9b756e4d55d315e9ad
  src/connect/http-retry.ts: cf85ae2347eb732ca2af25b1d9f8b0fcd1cb7e1172405d0f21403eeceea9ff96
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

See `.cursor/rules/docs-required.mdc` (alwaysApply) for the full rule set: every exported function under `src/` must carry a JSDoc comment, `console.log` is banned under `src/` (use the logger module), and `const` is preferred over `let`.

`src/greeter.ts` and `src/connect/http-retry.ts` both comply: all exported functions (`greet`, `farewell`, `capitalizeName`, `retryRequest`) carry JSDoc comments. Unexported helpers in `http-retry.ts` (`sleep`, `isTransientStatus`, `computeBackoffMs`) aren't documented, which the rule doesn't require since it only applies to exported functions.
