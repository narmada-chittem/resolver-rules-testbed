---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-24 (IONE-959)
captured_sha: bd32a3ff1cd617debfe451e41ea7d321981e0687
sources:
  - src/health.ts
  - src/health.test.ts
  - src/server.ts
  - src/server.test.ts
  - src/greeter.ts
  - src/greeter.test.ts
  - README.md
  - CLAUDE.md
sources_sha256:
  CLAUDE.md: 08fa991dc05a3f3b537033da7a944aef8295e8ceada906a5266ea874aed4831c
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
  src/health.test.ts: 63bcaf96dda9b7af3824bf8b47afd628def936fd32251b1059f99f6a537c9b50
  src/health.ts: 5ebd39f7fa7f490991245092f4952f02d8079dbf4732f79574a0c6f23837d63c
  src/server.test.ts: 69ec5164a8e405dd7e921d49daa1ea71587e45f52371c6a8eff6cac588074b0f
  src/server.ts: 08c745b8573c7b5ee8844be3eb46e357bf9ea06eddbb62c0b8d0ea8babed0d0f
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. `src/` now holds two modules, each with a co-located test file: `greeter.ts` (`capitalizeName`, `greet`, `farewell`) plus `greeter.test.ts`, and a new health-check pair — `health.ts` (`getHealthStatus`) and `server.ts` (`handleRequest`, `createHealthServer`) — plus `health.test.ts` and `server.test.ts`. All test files use Node's built-in `node:test`/`node:assert(/strict)` runner. There is still no `package.json`, build config, or test-runner config, so tests must be run directly (e.g. `node --test src/greeter.test.ts`) and the new server has no start script or dependency manifest of its own — `server.ts` only listens when executed directly, guarded by an `import.meta.url` check against `process.argv[1]`. There is no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`) — including the new bare `node:http` health endpoint, which has no relation to the Dapr/GraphQL/Kubernetes stack CLAUDE.md describes. Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
