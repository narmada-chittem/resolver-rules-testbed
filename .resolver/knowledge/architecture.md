---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
type: knowledge
scope: global
updated: 2026-08-25 (IONE-959)
captured_sha: 65ea937805412de8d0539ee5fe18b5f910ea0064
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - src/contacts.ts
  - src/contacts.test.ts
  - README.md
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/contacts.test.ts: c797091c1786b220befe4c11cb69e8b5df24df578a127f5540028b2949213ec1
  src/contacts.ts: 174aefc6b7de0131dff89e271604c9b3567b40ef4e32b9f6902aeac3fa572405
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The working tree's source is now two independent single-file modules — `src/greeter.ts` (with `src/greeter.test.ts`) and `src/contacts.ts` (with `src/contacts.test.ts`) — neither imports the other. There is still no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no services, processes, or multi-module runtime architecture to diagram, just two sibling script modules.

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

    contacts["src/contacts.ts"]
    formatContactLine["formatContactLine(contact): string"]
    formatDirectory["formatDirectory(contacts): string[]"]
    contactsTest["src/contacts.test.ts"]

    contacts --> formatContactLine
    contacts --> formatDirectory
    formatDirectory --> formatContactLine
    contactsTest --> contacts
```

`greet` delegates to the extracted `capitalizeName` helper (both verb-first, per the naming rule in [[ingested-agents]] AGENTS.md). `formatDirectory` similarly composes `formatContactLine` (via the unexported `displayName` helper) rather than duplicating formatting logic. Each test file is the sole in-repo consumer of its sibling module's exports, using Node's built-in `node:test`/`node:assert` runner.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
