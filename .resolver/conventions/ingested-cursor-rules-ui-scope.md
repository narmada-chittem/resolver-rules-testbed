---
name: ui-scope
description: UI-layer conventions
type: convention
scope:
  - src/ui/**
updated: '2026-07-29'
captured_sha: 9200bbccacdc9ae41e3ddab7b447e713ba288db7
sources:
  - .cursor/rules/ui-scope.mdc
---

> Ingested verbatim from `.cursor/rules/ui-scope.mdc` — the user-owned source of truth. Edit that file, not this page; this page is re-derived when the source changes.

UI components must be pure functions; state lives in hooks only.
