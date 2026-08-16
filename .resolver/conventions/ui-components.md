---
name: ui-components
description: Pure-function/hooks-only rule for src/ui — read before adding any file under src/ui/
type: convention
scope:
  - src/ui/**
updated: 2026-08-06 (IONE-959)
captured_sha: ecd80ef8a68c3f3215febaa6906216040e76f258
sources:
  - .cursor/rules/ui-scope.mdc
sources_sha256:
  .cursor/rules/ui-scope.mdc: 580377ddf5f207c19df89d72e586bd584c1695fef992d1bf21fc616c4b19217e
---

See `.cursor/rules/ui-scope.mdc`: UI components under `src/ui/**` must be pure functions, with state kept in hooks only.

No `src/ui/` directory exists yet in the working tree — this rule currently applies to zero files. It's dormant, not obsolete: apply it the moment any file is added under `src/ui/`.
