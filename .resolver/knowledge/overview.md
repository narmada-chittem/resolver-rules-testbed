---
name: overview
description: What this repository is and its single production file
type: knowledge
scope: global
updated: 2026-07-29 (IONE-959)
captured_sha: f9d4b6f947a5de8084e9416cda0627b26b14e020
sources:
  - src/greeter.ts
---

# Repository Overview

`resolver-rules-testbed` is a minimal seed repo created for the combined Resolver + ingestion manual test matrix (S1/S2/S3). Its purpose is to exercise Resolver's rule-ingestion and plan-execution pipelines — not to ship production software.

## Production code

The entire working codebase is one file:

- `src/greeter.ts` — exports three functions:
  - `greet(name: string): string` — returns `` `Hello, ${name}` ``
  - `farewell(name: string): string` — returns `` `Goodbye, ${name}` `` (has JSDoc; `greet` does not)
  - `whisper(msg: string): string` — returns `msg.toLowerCase()` (has JSDoc)

There are no build scripts, test runner configs, `package.json`, CI manifests, or `tsconfig.json` in the tree. The repo is intentionally skeletal.

## Divergences from CLAUDE.md

`CLAUDE.md` describes a large Nx/pnpm monorepo (7pace Timetracker) with Jira, monday.com services, .NET microservices, Dapr, PostgreSQL, etc. **None of that structure exists in this repository.** The `CLAUDE.md` content was seeded verbatim from a different codebase and does not reflect this repo. Treat `CLAUDE.md` claims about project layout, tooling, and architecture as inapplicable here; the working tree is the arbiter.
