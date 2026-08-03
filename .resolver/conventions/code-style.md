---
name: code-style
description: Package manager, function-length, UI, and naming rules pulled from AGENTS.md/frontend AGENTS.md
type: convention
scope: global
updated: 2026-08-03 (IONE-959)
captured_sha: 2476ffcd503ae45ee7783786200d829bfe38f606
sources:
  - AGENTS.md
  - frontend/AGENTS.md
  - .cursor/rules/ui-scope.mdc
---

See ../../AGENTS.md (pnpm required, functions under 40 lines) and ../../frontend/AGENTS.md
(component files kebab-case) — both current rules stand as written; nothing in the code contradicts
them yet (`src/greeter.ts`'s two functions are 3 lines each).

`.cursor/rules/ui-scope.mdc` scopes "components must be pure functions; state lives in hooks only" to
`src/ui/**`, but no `src/ui/` directory exists yet. This is not a contradiction — just note the rule
has nothing to apply to until UI code is added under that path.
