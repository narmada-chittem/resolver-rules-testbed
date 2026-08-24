---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-24 (IONE-959)
captured_sha: 296e595d5e418225831bc88c389c8a43b4a89a56
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - src/connect/http-retry.ts
  - src/connect/http-retry.test.ts
  - README.md
  - CLAUDE.md
sources_sha256:
  CLAUDE.md: 08fa991dc05a3f3b537033da7a944aef8295e8ceada906a5266ea874aed4831c
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/connect/http-retry.test.ts: d32e2cfe13ecdb306bd69c4854b9fb061f14eb7ce29dbf0176dababeaecc118a
  src/connect/http-retry.ts: cf85ae2347eb732ca2af25b1d9f8b0fcd1cb7e1172405d0f21403eeceea9ff96
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. The source now spans two standalone modules: `src/greeter.ts`, exporting `capitalizeName(name)`, `greet(name)` (delegates to `capitalizeName`), and `farewell(name)`; and `src/connect/http-retry.ts`, exporting `retryRequest(requestFn, delayFn?)`, a fixed-attempt (3x) exponential-backoff retry wrapper for requests that fail transiently (a thrown error or a 5xx response). Each module has its own test file (`src/greeter.test.ts`, `src/connect/http-retry.test.ts`) using Node's built-in `node:test`/`node:assert/strict` — there is still no `package.json`, build config, or test-runner config, so tests must be run directly (e.g. `node --test src/greeter.test.ts src/connect/http-retry.test.ts`). There is no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`). Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
