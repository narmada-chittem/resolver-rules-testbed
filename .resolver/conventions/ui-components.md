---
name: ui-components
description: Pure-function/hooks-only rule for src/ui — read before adding any file under src/ui/
type: convention
scope:
  - src/ui/**
updated: 2026-08-12 (IONE-959)
captured_sha: 8aef8a3ba47b862bfccdac05591e88c6912db492
sources:
  - .cursor/rules/ui-scope.mdc
---


See `.cursor/rules/ui-scope.mdc`: UI components under `src/ui/**` must be pure functions, with state kept in hooks only.

No `src/ui/` directory exists yet in the working tree — this rule currently applies to zero files. It's dormant, not obsolete: apply it the moment any file is added under `src/ui/`.
