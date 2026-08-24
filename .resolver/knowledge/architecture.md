---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
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
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/connect/http-retry.test.ts: d32e2cfe13ecdb306bd69c4854b9fb061f14eb7ce29dbf0176dababeaecc118a
  src/connect/http-retry.ts: cf85ae2347eb732ca2af25b1d9f8b0fcd1cb7e1172405d0f21403eeceea9ff96
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The working tree's source now spans two independent modules with no imports between them: `src/greeter.ts` (+ `src/greeter.test.ts`) and `src/connect/http-retry.ts` (+ `src/connect/http-retry.test.ts`). There is still no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no wired-together services or multi-module architecture to diagram; each module is a standalone script exercised only by its own test file.

```mermaid
flowchart TD
    subgraph greeter[src/greeter.ts]
        capitalizeName["capitalizeName(name): string"]
        greet["greet(name): string"]
        farewell["farewell(name): string"]
    end
    greeterTest["src/greeter.test.ts"]

    subgraph connect[src/connect/http-retry.ts]
        retryRequest["retryRequest(requestFn, delayFn?): Promise"]
    end
    connectTest["src/connect/http-retry.test.ts"]

    greet --> capitalizeName
    greeterTest --> greeter
    connectTest --> connect
```

`greet` delegates to the extracted `capitalizeName` helper (both verb-first, per the naming rule in [[ingested-agents]] AGENTS.md). `retryRequest` wraps a request function with fixed-attempt (3x) exponential backoff for transient failures (thrown errors or 5xx responses), taking an injectable `delayFn` seam so tests can skip real timers.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
