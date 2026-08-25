---
name: documentation
description: JSDoc, logging, and const-vs-let rules for src/ — read before adding or editing exported functions
type: convention
scope: global
updated: 2026-08-25 (IONE-959)
captured_sha: baeebe29421b6bd7c6a242aeb3296db52232e8c2
sources:
  - src/contacts.ts
  - .cursor/rules/docs-required.mdc
sources_sha256:
  .cursor/rules/docs-required.mdc: 308217676fe8e94971b7c762a454a51398766a4bfaee6f9b756e4d55d315e9ad
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

`src/contacts.ts` also fully complies with `.cursor/rules/docs-required.mdc`: every exported member (`ContactRecord`, `formatContactLine`, `formatDirectory`) carries a JSDoc comment, no `console.log` is used, and all bindings are `const`.
