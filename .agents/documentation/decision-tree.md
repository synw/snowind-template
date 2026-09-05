# Documentation Decision Tree

> Quick guide: What to read based on your task

## I need to understand the project

- High-level overview → `.agents/documentation/project-overview.md`
- Full navigation map → `.agents/documentation/project-nav.md`
- Structured summary → `.agents/documentation/codebase-summary.md`

## I need to work on a specific module

| Module | Go To |
|--------|-------|
| App shell & layout | `src/App.vue` + `.agents/documentation/codebase-summary.md` |
| Routing | `src/router.ts` + `.agents/documentation/codebase-summary.md` |
| State management | `src/state.ts` + `.agents/documentation/codebase-summary.md` |
| Theme switching | `src/scss/` + `.agents/documentation/codebase-summary.md` |
| Mobile menu | `src/services/mobile_menu.ts` + `.agents/documentation/codebase-summary.md` |
| AI inference/streaming | `src/services/inference.ts` + `.agents/documentation/codebase-summary.md` |

## I need to use Tailwind semantic colors

→ Read `.agents/documentation/colors.md` for the full cheat sheet (prim, sec, ter, success, warning, danger, info, background, light variants)

- How the color/theming system works (plugin internals, variable pattern, dark mode) → `.agents/documentation/css-system-guide.md`
- Add a new semantic color or a new theme → `.agents/documentation/css-system-guide.md` (§5 / §6)

## I need to add a new page

→ Add route in `src/router.ts`, create component in `src/views/`

## I need to change the theme

→ Edit or add SCSS files in `src/scss/`; update theme class on `<html>` via `state.ts`

## I need to modify the header

→ Edit `src/components/TheHeader.vue` and `src/components/TheHeaderMain.vue`

## Common Tasks (Quick Reference)

| Task | Go To |
|------|-------|
| Add a new page | `src/router.ts` + `src/views/` |
| Change theme colors | `src/scss/<theme>.scss` |
| Add new theme or semantic color (how-to) | `.agents/documentation/css-system-guide.md` (§5 / §6) |
| Modify header layout | `src/components/TheHeader.vue`, `TheHeaderMain.vue` |
| Add mobile menu item | `src/components/TheHeader.vue` (mobile-menu slot) |
| Toggle dark/light mode | `src/state.ts` → `user.toggleDarkMode()` |
| Change default theme | `src/state.ts` → `store.value.theme` initial value |
| Update build config | `vite.config.mts` |
| Add new icon | `src/widgets/icons/` |
| View style guide demo | Navigate to `/styleguide` in dev mode |

## Conventions

- All components use `<script setup lang="ts">` (Composition API)
- Path alias `@/` → `/src/`
- Themes applied as `theme-<name>` class on `<html>` element
- CSS variables follow `--<role>-<mode>-bg/txt` pattern

→ See `AGENTS.md` for full conventions summary.
