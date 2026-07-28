# CLAUDE.md
```Now I have a complete picture. Here is the generated CLAUDE.md:

```
# CLAUDE.md

This file provides essential context for Claude when working in the 7pace Timetracker monorepo.

## Repository Overview

7pace Timetracker is a monorepo for time-tracking integrations with **Jira** and **monday.com**. It contains:

- `jira/` — Timetracker for Jira (TypeScript/Node.js services + .NET C# microservices + Forge app)
- `monday/` — Timetracker for monday.com (TypeScript/Node.js services + .NET C# microservices)
- `npm-packages/` — Shared npm libraries (`client/`, `server/`, `common/`)
- `nuget-packages/` — Shared .NET NuGet packages
- `tools/` — Internal Nx plugins and dev tooling
- `adr/` — Architecture Decision Records (check `adr/INDEX.md` before starting work)
- `docs/` — Developer guides and principles
- `.agents/` — AI agent tools, skills, and per-project context

All build orchestration is managed by **Nx 22.7.5** with pnpm workspaces.

---

## Required Node/pnpm Versions

```
node: 24.14.1
pnpm:  11.4.0
```

Run `nvm install` to switch to the correct version.

---

## Common Commands

### Nx (primary interface for everything)

```bash
# Build a project
npx nx build <project-name>
npx nx build _7pace.Types --configuration Debug  # .NET with config

# Run tests
npx nx test <project-name> --tui=false

# Start a service
npx nx start @7pace/atd

# Run a named target on multiple projects
npx nx run-many --projects="tag:nuget:*" -t build   # NuGet only
npx nx run-many --projects="tag:npm:*" -t build      # npm only

# Affected-only (CI optimization)
npx nx affected -t build
npx nx affected --exclude="*,\!tag:nuget:*" -t build  # affected NuGet only

# Clear Nx cache
npx nx reset

# Visualize dependency graph
npx nx graph
```

### pnpm workspaces

```bash
# Install a package into a specific workspace
pnpm i <package-name> -w <project-name>

# Example
pnpm i ramda -w @7pace/atd
```

### Linting

```bash
pnpm run lint:eslint            # Lint everything
pnpm run lint:eslint:fix        # Lint + auto-fix
pnpm run lint:staged            # Lint staged files (pre-commit)
pnpm run lint:committed         # Lint all commits since origin/main
```

### Creating a new pnpm library

```bash
pnpm run library   # runs the custom @7pace/npm-packages-nx-plugin generator
```

### Environment setup (run once per machine)

```bash
./setup-env.ps1                         # interactive (prompts for tokens)
./setup-env.ps1 -token aa -nexusToken bb  # non-interactive
```

---

## Project Tags (Nx filtering)

| Tag | Meaning |
|-----|---------|
| `platform:jira` | Jira-specific project |
| `platform:monday` | monday.com-specific project |
| `nuget:external` | publishable NuGet package |
| `nuget:internal` | internal-only NuGet package |
| `npm` | npm package |

---

## Architecture

### Infrastructure

- **Dapr** — pub/sub messaging between microservices (Azure Service Bus in production, Redis locally)
- **PostgreSQL** — primary data store (per-tenant schemas via EF Core)
- **GraphQL** — API gateway via GraphGateway and MultiService modular monolith
- **Kubernetes (AKS)** — deployment target
- **Azure Key Vault** — secrets management (requires Netskope VPN locally)
- **Forge** — Atlassian serverless platform for Jira frontend

### Key Jira services

| Service | Path | Type |
|---------|------|------|
| `@jira/ui` | `jira/services/Jira-UI/` | React (Vite, TypeScript) |
| `@jira/forge` | `jira/services/Forge/` | Forge app (TypeScript) |
| Worklogs API | `jira/services/Worklogs/` | .NET (ASP.NET Core) |
| MultiService | `jira/services/MultiService/` | .NET (modular monolith with GraphQL) |
| Identity | `jira/services/Identity/` | .NET |
| GraphGateway | `jira/services/GraphGateway/` | .NET |
| JiraWorklogSync | `jira/services/JiraWorklogSync/` | Node.js |

### Jira Sync V2 (active development)

All JiraSync code lives under `jira/services/Worklogs/Worklogs.API/JiraSync/`. Operation modes:
- `V1` — full legacy Node.js
- `Hybrid` (**default**) — v1 import, v2 export
- `V2` — full v2 .NET (not yet production-ready)

Before touching JiraSync, read `.agents/projects/jira-sync-v2/jira-sync.llm-context.md` for detailed conventions.

---

## Foundational Documents (read before reviewing or implementing)

1. **`adr/INDEX.md`** — Scan this first to find relevant ADRs for your task. Load only those files.
2. **`docs/principles/code-quality-and-design-principles.md`** — C# & .NET code quality rules. When reviewing .NET code, follow the AI Review Protocol & Checklist section strictly.
3. **`docs/principles/frontend-coding-conventions.md`** — TypeScript/React naming and formatting conventions.
4. **`docs/architecture/jira_solution.svg`** — High-level Jira solution diagram.

---

## Code Style

### TypeScript / JavaScript

- **Prettier** (`.prettierrc.json`): `semi: true`, `tabWidth: 4`, `printWidth: 125`, `trailingComma: "es5"`, `useTabs: false`
- **ESLint** (`@7pace/eslint-config`): import sorting, unused imports, double quotes, curly braces, 1TBS brace style, semicolons in type members
- Formatting is enforced on staged files via `lint-staged` (Prettier then ESLint)

### Naming conventions

- File name must match the main exported function/component/hook
- Booleans: `is*` (singular), `are*` (plural) — exceptions for `can*`, `has*`
- Event handler props: `on*` prefix
- **"Worklog"** is one word — `Worklog` (PascalCase), `worklog` (camelCase). Never `WorkLog`/`workLog`
- Styled components: prefix with `Styled` (e.g., `StyledContainer`)
  - In `jira/services/Jira-UI/`: separate `*.styled.tsx` files, imported explicitly
  - Elsewhere: co-locate in same file unless shared
  - Follow FE rules defined in .cursor/rules/frontend

### C# / .NET

- SOLID principles at all times; composition over inheritance
- Methods ≤ 20–30 lines; max 3 levels of nesting; prefer early returns
- `async` methods must be suffixed with `Async`; never `async void` (except event handlers)
- Use typed Value Objects over raw primitives (e.g., `AccountIdentifier`, `UserIdentifier`) — at API boundaries too
- Rich Domain Model: encapsulate business logic in entities; handlers are thin orchestrators only
- No dead code — delete unused methods, fields, local variables immediately
- No hardcoded secrets
- Use `IDisposable`/`using` correctly; do not dispose injected dependencies
- Naming conventions: use known pattern names as suffixes (e.g., `WorklogRepository`, `WorklogAddedEventHandler`)
- Follow rules defined in .cursor/rules/backend

---

## Dependency Management Rules

**Do NOT update `@opentelemetry/*` or `@atlaskit/*` versions in individual `package.json` files.** These are centrally pinned in the root `package.json` `overrides` section. Individual packages must use `"*"` as the version placeholder.

To update: edit the `overrides` section in root `package.json` only. Coordinate with the platform team.

---

## Testing

### TypeScript

- **Jest** (v30) for unit and integration tests (`jest.config.cts` in each package)
- **Vitest** for some packages (`vitest.config.mts`)
- **Testing Library** (`@testing-library/react`) for React component tests
- Run via Nx: `npx nx test <project-name>`

### .NET

- Unit tests: `<ServiceName>.UnitTests` project alongside each service
- Integration tests: `<ServiceName>.IntegrationTests` project
- Run via Nx: `npx nx test <project-name>`
- Or directly: `dotnet test <path-to.csproj> --filter "TestNameFilter"`

### Test conventions (JiraSync)

- Prefer `Given...`/`When...` naming for test methods (read like a sentence)
- Use double blank lines to separate AAA (Arrange/Act/Assert) sections
- Place JSON fixtures under `TestInfrastructure/TestData/JiraSync/Scenarios/<scenario>/`
- Shared test utilities go in `Worklogs.Tests.Common`
- Use `InMemoryDistributedLockService` from `TestDoubles/` in unit tests

---

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

- **`build.yml`** — Main pipeline; detects changed areas and runs only affected builds
- **`lint.verify.yml`** / **`lint.fix.yml`** — ESLint/Prettier checks
- **`npm-packages.build.yml`** / **`nuget-packages.build.yml`** — Package builds + publish
- **`jira.services.yml`** / **`monday.services.aks.yml`** — Service builds and deployments
- Nx cache is stored in **Azure Blob Storage** (`jiracisa` account, `nx-cache` container)

---

## Local Development Setup

### Prerequisites

- Docker Desktop (≥ 40 GB memory for Jira services)
- PowerShell (`pwsh`)
- NVM (node 24.14.1)
- Azure PowerShell module + Netskope VPN (for Key Vault access)
- `jq`, `d2` (for Jira diagramming tools)
- PgAdmin (PostgreSQL client)

### First-time setup

```bash
nvm install
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "[REDACTED]"
sudo pwsh ./setup-env.ps1          # provide GitHub PAT + Nexus token when prompted
```

### Running Jira services locally

```bash
cd jira/debug
sudo pwsh
.\dapr-local.ps1                   # first time only
.\local-debug.ps1 -RunAll -Build
```

### Adding a new solution to the root

```bash
dotnet sln add <new_solution_folder>
```

---

## AI Agent Context (.agents/)

The `.agents/` directory contains AI-specific resources:

- **`.agents/skills/`** — Pre-written scripts for common tasks (query PostgreSQL, manage local services, call authenticated endpoints). See `.agents/skills/README.md`.
- **`.agents/projects/<feature>/`** — Per-feature specs, implementation plans, and LLM context files. When working on a feature, check if a spec or context file exists here.
- **`.agents/examples/`** — Example prompts and rules for AI agent workflows.

To use agent skills from a skill definition file, reference the scripts in `.agents/skills/scripts/`.

---

## Key Paths Quick Reference

| What | Where |
|------|-------|
| ADR index | `adr/INDEX.md` |
| Code quality principles (C#) | `docs/principles/code-quality-and-design-principles.md` |
| Frontend conventions | `docs/principles/frontend-coding-conventions.md` |
| Jira architecture diagram | `docs/architecture/jira_solution.svg` |
| Prettier config | `.prettierrc.json` |
| Nx config | `nx.json` |
| Root dependencies / overrides | `package.json` |
| Shared dependency rules | `docs/shared-dependencies-management.md` |
| JiraSync LLM context | `.agents/projects/jira-sync-v2/jira-sync.llm-context.md` |
| Agent skills | `.agents/skills/` |
| Jira service READMEs | `jira/README.md`, `jira/services/Jira-UI/README.md` |
| Monday service README | `monday/README.md` |
```
