---
name: overview
description: What this repo actually contains — read before trusting CLAUDE.md's project description
type: knowledge
scope: global
updated: 2026-08-06 (IONE-959)
captured_sha: ecd80ef8a68c3f3215febaa6906216040e76f258
sources:
  - src/greeter.ts
  - README.md
  - CLAUDE.md
sources_sha256:
  CLAUDE.md: 08fa991dc05a3f3b537033da7a944aef8295e8ceada906a5266ea874aed4831c
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/greeter.ts: 1159d8a1a4522df223ec4499348a8c7304c265ae6de89e59430a5882c5b83f4b
---

Per `README.md`, this is a seeded testbed repo ("resolver-rules-testbed") for a resolver+ingestion manual test matrix. The entire codebase is one file, `src/greeter.ts`, exporting two functions: `greet(name)` and `farewell(name)`. There is no `package.json`, no build config, no test runner, and no `src/ui/` directory — despite guidance files referencing pnpm, component conventions, and UI-layer rules.

## Diverges from CLAUDE.md

`CLAUDE.md` in this repo's root describes a large, unrelated monorepo — Nx 22.7.5 + pnpm workspaces, `jira/`/`monday/` service directories, .NET microservices, Dapr, PostgreSQL, GraphQL gateways, etc. None of that structure exists in this working tree (no `nx.json`, no `jira/`/`monday/` paths, no `package.json`). Treat `CLAUDE.md` as non-authoritative boilerplate for this repo; rely on the actual file listing and this overlay instead.
