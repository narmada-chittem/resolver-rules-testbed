---
name: documentation
description: JSDoc and logging rules for src/ — required before touching exported functions there
type: convention
scope:
  - src/**
updated: 2026-08-03 (IONE-959)
captured_sha: 2476ffcd503ae45ee7783786200d829bfe38f606
sources:
  - .cursor/rules/docs-required.mdc
  - src/greeter.ts
---

See ../../.cursor/rules/docs-required.mdc for the rule: every exported function under `src/` must
have a JSDoc comment describing params and return value, `console.log` is banned under `src/` (use
the logger module instead), and `const` is preferred over `let`.

## Diverges from ../../.cursor/rules/docs-required.mdc

`greet` (`src/greeter.ts:1`) has no JSDoc comment, contradicting the "every exported function MUST
have a JSDoc comment" rule. `farewell` (`src/greeter.ts:9`) does comply. When editing this file, add
a JSDoc block to `greet` matching the style already used on `farewell` rather than treating the
existing gap as precedent.
