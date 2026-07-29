---
name: overview
description: What this repository is and its single production file
type: knowledge
scope: global
updated: '2026-07-29'
captured_sha: 9200bbccacdc9ae41e3ddab7b447e713ba288db7
sources:
  - README.md
  - src/greeter.ts
---

# Repository Overview

`resolver-rules-testbed` is a minimal seed repo created for the combined Resolver + ingestion manual test matrix (S1/S2/S3). Its purpose is to exercise Resolver's rule-ingestion and plan-execution pipelines — not to ship production software.

## Production code

The entire working codebase is one file:

- `src/greeter.ts` — exports a single function `greet(name: string): string` that returns the string `` `Hello, ${name}` ``.

There are no build scripts, test runner configs, `package.json`, CI manifests, or `tsconfig.json` in the tree. The repo is intentionally skeletal.

## Divergences from CLAUDE.md

`CLAUDE.md` describes a large Nx/pnpm monorepo (7pace Timetracker) with Jira, monday.com services, .NET microservices, Dapr, PostgreSQL, etc. **None of that structure exists in this repository.** The `CLAUDE.md` content was seeded verbatim from a different codebase and does not reflect this repo. Treat `CLAUDE.md` claims about project layout, tooling, and architecture as inapplicable here; the working tree is the arbiter.
