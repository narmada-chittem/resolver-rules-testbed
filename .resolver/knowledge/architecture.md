---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
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
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
  src/health.test.ts: 63bcaf96dda9b7af3824bf8b47afd628def936fd32251b1059f99f6a537c9b50
  src/health.ts: 5ebd39f7fa7f490991245092f4952f02d8079dbf4732f79574a0c6f23837d63c
  src/server.test.ts: 69ec5164a8e405dd7e921d49daa1ea71587e45f52371c6a8eff6cac588074b0f
  src/server.ts: 08c745b8573c7b5ee8844be3eb46e357bf9ea06eddbb62c0b8d0ea8babed0d0f
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application — but it now contains two independent modules under `src/` instead of one. `src/greeter.ts` (name-formatting helpers) is unchanged. New this run: `src/health.ts` exports `getHealthStatus()` (returns `{ status: 'ok' }`), and `src/server.ts` builds on it — `handleRequest(req, res)` serves `GET /health` as a 200 JSON payload and 404s every other method/path, and `createHealthServer()` wraps it in a `node:http` server. `server.ts` also has a direct-execution guard (`import.meta.url === file://${process.argv[1]}`) that calls `.listen(process.env.PORT || 3000)` when run as the entrypoint — so there is now a real, if minimal, server process in this tree. There is still no `package.json`, no build config, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — the server has no dependency manifest, no start script, and must be invoked directly (e.g. via a TypeScript runner since there's no compiled JS).

```mermaid
flowchart TD
    greeter["src/greeter.ts"]
    capitalizeName["capitalizeName(name): string"]
    greet["greet(name): string"]
    farewell["farewell(name): string"]
    greeterTest["src/greeter.test.ts"]

    greeter --> capitalizeName
    greeter --> greet
    greeter --> farewell
    greet --> capitalizeName
    greeterTest --> greeter

    health["src/health.ts"]
    getHealthStatus["getHealthStatus(): status"]
    server["src/server.ts"]
    handleRequest["handleRequest(req, res)"]
    createHealthServer["createHealthServer(): Server"]
    healthTest["src/health.test.ts"]
    serverTest["src/server.test.ts"]

    health --> getHealthStatus
    server --> handleRequest
    server --> createHealthServer
    handleRequest --> getHealthStatus
    createHealthServer --> handleRequest
    healthTest --> health
    serverTest --> server
```

`greet` still delegates to the extracted `capitalizeName` helper (both verb-first, per the naming rule in [[ingested-agents]] AGENTS.md); `handleRequest` and `createHealthServer` follow the same verb-first convention. `src/greeter.test.ts`, `src/health.test.ts`, and `src/server.test.ts` all use Node's built-in `node:test`/`node:assert` runner — `server.test.ts` listens on port `0` (OS-assigned) and drives real HTTP requests via `node:http`'s client rather than mocking `handleRequest`.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). The new `src/server.ts` is a bare `node:http` health endpoint, not a service in the CLAUDE.md sense. This mirrors the broader divergence already recorded in [[overview]].
