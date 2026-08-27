---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-27 (IONE-959)
captured_sha: 2e7bc445a2c5e3fb2410a63134571856d08ea76f
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
  src/contacts.test.ts: 48fb0ba9d6064b2eeaeec9858e597ee5affcbaaa7cda7e1b5bf7b410fa51db51
  src/contacts.ts: 5862765bc9f3ef8e70ac3df66f4066d0bac088759e5f86529112f731e35eb29c
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. Source now spans two independent, unrelated files under `src/`, each with its own test file, using Node's built-in `node:test`/`node:assert/strict`:

- `src/greeter.ts` exports `capitalizeName(name)`, `greet(name)` (delegates to `capitalizeName`), and `farewell(name)`. Tested by `src/greeter.test.ts`.
- `src/contacts.ts` exports `formatContactLine(contact)` and `formatDirectory(contacts)` for rendering a `ContactRecord[]` as directory lines (name-and-email, optional phone, case-insensitive sort with email-prefix fallback for blank names). Tested by `src/contacts.test.ts`.

There is still no `package.json`, build config, or test-runner config, so tests must be run directly (e.g. `node --test src/greeter.test.ts src/contacts.test.ts`). There is no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`). Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
