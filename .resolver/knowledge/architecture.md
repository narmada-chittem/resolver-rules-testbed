---
name: architecture
description: The system's real shape — a single-module script repo with no services, build, or runtime to diagram
type: knowledge
scope: global
updated: 2026-08-27 (IONE-959)
captured_sha: a1c1c76e1d859457b4066c06a77df04200a6f078
sources:
  - src/greeter.ts
  - src/greeter.test.ts
  - src/contacts.ts
  - src/contacts.test.ts
  - README.md
sources_sha256:
  README.md: 8b2ce17aca559e64a260327be1cb60fdf3da02c3bf2a55e5e178433ef2e828d1
  src/contacts.test.ts: c5732d76eb0ddcea60d2393daf8ff165714fef03e4a0b873ef96414ffa8dee9b
  src/contacts.ts: 63c59ff7123b9ba7bd07b02c1f21bfcf98bddea9169ced54651ae67f3a185519
  src/greeter.test.ts: 61148d49e06ac9d184f1401c819b7dcc3f8c1bcff36aa6491bf15ab215a57d32
  src/greeter.ts: a3c557cd3696b631b9f42d1fdb5dcd69fcfdebe90318715ad96c358485cd1559
---

Per `README.md` and [[overview]] (`knowledge/overview.md`), this repo is a seeded testbed for a resolver+ingestion test matrix, not a running application. The working tree's source is now two independent files under `src/`: `src/greeter.ts` (with `src/greeter.test.ts`) and `src/contacts.ts` (with `src/contacts.test.ts`). Neither file imports the other — there is no cross-module dependency, just two sibling script modules sharing the same JSDoc/test conventions. There is still no `package.json`, no build config, no entrypoint, no server process, and no `frontend/` source (only `frontend/AGENTS.md`, a guidance doc with no code alongside it) — so there are no services, processes, or multi-module architecture to diagram beyond these two flat modules.

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
    formatDirectory --> formatContactLine
    formatDirectory --> resolveDisplayName
    contactsTest --> contacts
```

`greet` delegates to the extracted `capitalizeName` helper; similarly in `contacts.ts`, `formatContactLine` and `formatDirectory` both delegate to the unexported `resolveDisplayName` helper (falls back to the email local-part when `fullName` is blank). Both modules follow verb-first naming per [[ingested-agents]] AGENTS.md, and each has an in-repo test file using Node's built-in `node:test`/`node:assert` runner.

## Divergences

Diverges from CLAUDE.md: the "Architecture" section describes Dapr pub/sub, PostgreSQL, a GraphQL gateway, and Kubernetes (AKS) deployment → none of that infrastructure exists in this working tree (no `nx.json`, no service directories, no Dockerfiles or k8s manifests, no dependency manifests of any kind). This mirrors the broader divergence already recorded in [[overview]].
