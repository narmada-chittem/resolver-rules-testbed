---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-27 (IONE-959)
captured_sha: a1c1c76e1d859457b4066c06a77df04200a6f078
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - src/contacts.ts
  - src/contacts.test.ts
  - README.md
  - CLAUDE.md
sources_sha256:
  CLAUDE.md: 08fa991dc05a3f3b537033da7a944aef8295e8ceada906a5266ea874aed4831c
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/contacts.test.ts: c5732d76eb0ddcea60d2393daf8ff165714fef03e4a0b873ef96414ffa8dee9b
  src/contacts.ts: 63c59ff7123b9ba7bd07b02c1f21bfcf98bddea9169ced54651ae67f3a185519
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. The source now spans two sibling files under `src/`, each with its own test file, and neither imports the other:

- `src/greeter.ts` exports `capitalizeName(name)`, `greet(name)` (delegates to `capitalizeName`), and `farewell(name)`. Tested by `src/greeter.test.ts`.
- `src/contacts.ts` exports the `ContactRecord` type plus `formatContactLine(contact)` and `formatDirectory(contacts)` (both delegate to the unexported `resolveDisplayName` helper, which falls back to the email local-part when `fullName` is blank). Tested by `src/contacts.test.ts`.

Both test files use Node's built-in `node:test`/`node:assert/strict` — there is still no `package.json`, build config, or test-runner config, so tests must be run directly (e.g. `node --test src/greeter.test.ts src/contacts.test.ts`). There is no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`). Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
