---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
type: knowledge
scope: global
updated: 2026-08-16 (IONE-959)
captured_sha: 32773c3c3a8a8a257417aee9868dd483e0e4abb4
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - README.md
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The working tree's source is one file, `src/greeter.ts`, plus a test file `src/greeter.test.ts` that imports from it. There is still no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no services, processes, or multi-module architecture to diagram.

```mermaid
flowchart TD
    greeter["src/greeter.ts"]
    capitalizeName["capitalizeName(name): string"]
    greet["greet(name): string"]
    farewell["farewell(name): string"]
    test["src/greeter.test.ts"]

    greeter --> capitalizeName
    greeter --> greet
    greeter --> farewell
    greet --> capitalizeName
    test --> greeter
```

`greet` now delegates to the extracted `capitalizeName` helper (both verb-first, per the naming rule in [[ingested-agents]] AGENTS.md). `src/greeter.test.ts` is the first in-repo consumer of `greeter.ts`'s exports, using Node's built-in `node:test`/`node:assert` runner.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
