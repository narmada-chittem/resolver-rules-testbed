---
name: architecture
description: System shape and module relationships — read when onboarding or tracing data flow
type: knowledge
scope: global
updated: '2026-08-12'
captured_sha: ecd80ef8a68c3f3215febaa6906216040e76f258
sources:
  - src/greeter.ts
---

# Architecture

This repository is a minimal TypeScript library with a single module and no runtime services, databases, or external dependencies.

```mermaid
flowchart LR
    caller["Consumer (any caller)"]
    greeter["src/greeter.ts\n(greet / farewell)"]
    caller -->|imports| greeter
```

## Module: `src/greeter.ts`

The entire codebase is one file exporting two pure functions:

| Function | Signature | Behaviour |
|---|---|---|
| `greet` | `(name: string) → string` | Returns `"Hello, ${name}"` |
| `farewell` | `(name: string) → string` | Returns `"Goodbye, ${name}"` |

Both functions are stateless, synchronous, and have no side effects. There are no HTTP servers, queues, databases, or inter-service calls in this repo.
