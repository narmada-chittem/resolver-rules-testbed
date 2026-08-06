---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-06 (IONE-959)
captured_sha: 2476ffcd503ae45ee7783786200d829bfe38f606
sources:
  - src/greeter.ts
  - README.md
  - CLAUDE.md
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. The entire codebase is one file, `src/greeter.ts`, exporting two functions: `greet(name)` and `farewell(name)`. There is no `package.json`, no build config, no test runner, and no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`). Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
