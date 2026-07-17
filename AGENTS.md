# Snowind Template

## Mission
A Vue 3 + TypeScript starter template with multi-theme support, Tailwind CSS v4, and a mobile-responsive layout.

## Repositories

| Repo | Path | Purpose |
|------|------|---------|
| snowind-template | `/` | Vue 3 + TypeScript SPA starter with Tailwind CSS theming |

## Conventions (for AI Agents)

- **Composition API First**: All components use `<script setup lang="ts">` — no Options API
- **Theme-Driven Styling**: CSS custom properties per theme (`--prim-*`, `--sec-*`, etc.) applied via `theme-<name>` class on `<html>`; themes live in `src/scss/`
- **Path Alias `@/`**: Resolves to `/src/` — configured in both `vite.config.mts` and `tsconfig.json`
- **Router-Based Navigation**: vue-router with dynamic imports for code splitting; each route has `meta.title` for document title
- **State via Composition**: Reactive state via `@snowind/state` (User, useScreenSize) and `@vueuse/core` (useStorage); no Vuex/Pinia

## Quick Start for AI Agents

1. Read `.agents/documentation/decision-tree.md` to find the right doc for your task
2. Read `.agents/documentation/project-overview.md` for high-level context
3. Read `.agents/documentation/colors.md` for Tailwind semantic color cheat sheet
4. Read `.agents/documentation/project-nav.md` for detailed navigation and dependency graph
5. Navigate to the relevant repo/package and read its `.agents/documentation/codebase-summary.md`

## Documentation

- `.agents/documentation/decision-tree.md` — Quick guide: find the right doc for your task
- `.agents/documentation/codebase-summary.md` — Top-level codebase summary (structured, machine-readable)
- `.agents/documentation/project-overview.md` — Concise project overview (~1 page)
- `.agents/documentation/project-nav.md` — Detailed navigation map with dependency graph
- `.agents/documentation/colors.md` — Tailwind semantic colors cheat sheet (prim, sec, ter, success, warning, danger, info, etc.)
- `src/` — Application source root (see codebase-summary.md for module breakdown)

Each package or library directory has `.agents/documentation/codebase-summary.md`. Use them to navigate in the codebase easily.
