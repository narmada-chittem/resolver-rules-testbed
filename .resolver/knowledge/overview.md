---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-25 (IONE-959)
captured_sha: 65ea937805412de8d0539ee5fe18b5f910ea0064
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
  src/contacts.test.ts: c797091c1786b220befe4c11cb69e8b5df24df578a127f5540028b2949213ec1
  src/contacts.ts: 174aefc6b7de0131dff89e271604c9b3567b40ef4e32b9f6902aeac3fa572405
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. The source is now two independent single-file modules: `src/greeter.ts`, exporting `capitalizeName(name)`, `greet(name)` (delegates to `capitalizeName`), and `farewell(name)`; and `src/contacts.ts`, exporting `formatContactLine(contact)` and `formatDirectory(contacts)` for a contact-directory listing (sorted case-insensitively by display name, falling back to the email's local part when `fullName` is blank). Each module has a matching test file (`src/greeter.test.ts`, `src/contacts.test.ts`) using Node's built-in `node:test`/`node:assert/strict` — there is still no `package.json`, build config, or test-runner config, so tests must be run directly (e.g. `node --test src/greeter.test.ts src/contacts.test.ts`). There is no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`). Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
