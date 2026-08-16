---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
type: knowledge
scope: global
updated: 2026-08-16 (IONE-959)
captured_sha: ecd80ef8a68c3f3215febaa6906216040e76f258
sources:
  - src/greeter.ts
  - README.md
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/greeter.ts: 1159d8a1a4522df223ec4499348a8c7304c265ae6de89e59430a5882c5b83f4b
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The entire working tree's code is one file, `src/greeter.ts`. There is no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no services, processes, or cross-module imports to draw an architecture diagram around.

```mermaid
flowchart TD
    greeter["src/greeter.ts"]
    greet["greet(name): string"]
    farewell["farewell(name): string"]

    greeter --> greet
    greeter --> farewell
```

Both `greet` and `farewell` are standalone pure functions exported from the same module; neither calls the other, and no other file in the repo imports from `greeter.ts`, so the module currently has zero in-repo consumers.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
