---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
type: knowledge
scope: global
updated: 2026-08-27 (IONE-959)
captured_sha: 2e7bc445a2c5e3fb2410a63134571856d08ea76f
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - src/contacts.ts
  - src/contacts.test.ts
  - README.md
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/contacts.test.ts: 48fb0ba9d6064b2eeaeec9858e597ee5affcbaaa7cda7e1b5bf7b410fa51db51
  src/contacts.ts: 5862765bc9f3ef8e70ac3df66f4066d0bac088759e5f86529112f731e35eb29c
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The working tree's source is two small, mutually-independent files under `src/` — `src/greeter.ts` and `src/contacts.ts` — each paired with its own test file. There is still no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no services, processes, or multi-module architecture to diagram, just two standalone utility modules.

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

`greeter.ts` and `contacts.ts` share no imports or dependencies — they are separate, independently-testable utility modules that happen to live side by side in `src/`.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
