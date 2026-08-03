---
name: overview
description: What this repo actually contains — read first before trusting other docs
type: knowledge
scope: global
updated: 2026-08-03 (IONE-959)
captured_sha: 2476ffcd503ae45ee7783786200d829bfe38f606
sources:
  - README.md
  - src/greeter.ts
  - AGENTS.md
  - CLAUDE.md
---

See ../../README.md for the stated purpose: this is a seeded testbed for the resolver+ingestion
manual test matrix (S1/S2/S3), not a production application.

The entire working tree is:
- `src/greeter.ts` — two standalone pure functions, `greet` and `farewell`, no imports, no cross-file
  calls, no other modules.
- `AGENTS.md`, `CLAUDE.md`, `README.md`, `frontend/AGENTS.md`, `.cursor/rules/*.mdc` — agent/rule docs.

There is no `package.json`, lockfile, `tsconfig.json`, test files, or `src/ui/` directory anywhere in
the repo. Any instruction that assumes tooling (package manager, build config, test runner) has no
backing manifest to verify against — treat those as aspirational until such a manifest is added.

## Diverges from ../../CLAUDE.md

`CLAUDE.md` describes a completely different codebase — a "7pace Timetracker monorepo" with `jira/`,
`monday/`, `npm-packages/`, `nuget-packages/`, Nx build orchestration, .NET microservices, Dapr,
PostgreSQL, etc. None of that exists in this repository; the only source file is `src/greeter.ts`.
Do not follow `CLAUDE.md`'s commands, paths, or architecture claims — they do not apply here.
