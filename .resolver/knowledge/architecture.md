---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
type: knowledge
scope: global
updated: 2026-08-25 (IONE-959)
captured_sha: 96c7fa924d422a4a04eae3f99bf9f5acf7582ef6
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - src/contacts.ts
  - src/contacts.test.ts
  - README.md
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/contacts.test.ts: 20207f336cc228fdd8d6cc0e2778ec11124c96753589a8fab2f8250ad42cbe98
  src/contacts.ts: ca7b20bd1544ebf379be21f0e38f67a497a5a3f8e381ec72487ff3fda529c650
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The working tree's source is now two independent files — `src/greeter.ts` (plus its test `src/greeter.test.ts`) and `src/contacts.ts` (plus its test `src/contacts.test.ts`) — with no imports between them. There is still no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no services, processes, or multi-module runtime architecture, just two unrelated formatting/greeting modules.

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
    resolveDisplayName["resolveDisplayName(contact): string"]
    formatContactLine["formatContactLine(contact): string"]
    formatDirectory["formatDirectory(contacts): string[]"]
    contactsTest["src/contacts.test.ts"]

    contacts --> resolveDisplayName
    contacts --> formatContactLine
    contacts --> formatDirectory
    formatContactLine --> resolveDisplayName
    formatDirectory --> resolveDisplayName
    formatDirectory --> formatContactLine
    contactsTest --> contacts
```

`src/contacts.ts` is a second, unrelated module (contact-directory formatting) added alongside `greeter.ts`; the two share no code. `formatDirectory` sorts a copy of its input (does not mutate) and delegates display-name resolution to the internal, unexported `resolveDisplayName` helper.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
