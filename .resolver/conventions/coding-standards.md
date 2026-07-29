---
name: coding-standards
description: Active coding rules enforced by agent guidance files in this repo
type: convention
scope: global
updated: '2026-07-29'
captured_sha: 9200bbccacdc9ae41e3ddab7b447e713ba288db7
sources:
  - AGENTS.md
  - frontend/AGENTS.md
  - .cursor/rules/docs-required.mdc
  - .cursor/rules/ui-scope.mdc
---

# Coding Standards

Rules derived from the agent guidance files present in this repo. These apply to any code written here.

## General (AGENTS.md — root)

- Use **pnpm** (not npm or yarn).
- Keep functions **under 40 lines**.

## TypeScript / src/

- Every **exported function must have a JSDoc comment** describing params and return value (`.cursor/rules/docs-required.mdc`, `alwaysApply: true`).
- **Never use `console.log`** anywhere under `src/` — use the logger module instead (`.cursor/rules/docs-required.mdc`).

> Note: `src/greeter.ts` currently has no JSDoc on `greet()`. Any modification to that function must add JSDoc to comply with the `docs-required` rule.

## UI layer (`src/ui/**`)

- UI components must be **pure functions**; state lives in hooks only (`.cursor/rules/ui-scope.mdc`).

## Frontend (frontend/AGENTS.md)

- Component files are **kebab-case**.
