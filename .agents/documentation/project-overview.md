# Snowind Template — Project Overview

> **Role**: Concise "what is this" for context loading (~1 page overview).
> **See also**: `.agents/documentation/decision-tree.md` to find the right doc for your task.
> **See also**: `.agents/documentation/colors.md` for Tailwind semantic colors cheat sheet.
> **See also**: `.agents/documentation/css-system-guide.md` for how the CSS/theming system works and how to extend it.
> **See also**: `.agents/documentation/project-nav.md` for detailed navigation and task references.

---

## What is Snowind Template?

A Vue 3 + TypeScript single-page application starter template for [Snowind](https://github.com/synw/snowind). It provides a complete foundation with multi-theme support (12 themes), Tailwind CSS v4 utility classes, mobile-responsive layout, and AI inference streaming integration via `@agent-smith` packages.

---

## Core Capabilities

- **Multi-Theme System** — 12 color themes (light + dark) using CSS custom properties; theme switching persisted in localStorage
- **Mobile-Responsive Layout** — Adaptive header with mobile slide-in menu, responsive breakpoints via `useScreenSize()`
- **AI Streaming Integration** — Real-time markdown streaming from AI inference service (`@agent-smith/server`, `markstream-vue`)
- **Composition API State** — Reactive state management via `@snowind/state` and `@vueuse/core` (no Vuex/Pinia)

---

## Repository Structure

| Repo | Path | Purpose |
|------|------|---------|
| snowind-template | `/` | Vue 3 + TypeScript SPA with themes and AI streaming |

---

## Key Architecture Patterns

- **Theme-Driven Styling**: CSS custom properties (`--prim-*`, `--sec-*`, `--background-*`, etc.) override per theme; `.theme-<name>` class on `<html>` triggers theme
- **Slot-Based Component Layout**: `TheHeader` composes `TheHeaderMain` with named slots for branding, menu, mobile-back, and mobile-menu
- **Service Composables**: Business logic extracted to standalone composables (`useMobileMenu`)
- **Lazy Route Loading**: Non-home routes use dynamic `import()` for code splitting

---

## Quick Reference: Common Tasks

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

---

## Code Snippets

### Theme Switching
```ts
// src/state.ts
import { useStorage } from '@vueuse/core';
const store = useStorage<{ theme: string }>('store', { theme: "graphite" });
function setTheme(t?: string) {
    const currentTheme = store.value.theme;
    store.value.theme = t ?? currentTheme;
    document.querySelector('html')?.classList.remove(`theme-${currentTheme}`);
    document.querySelector('html')?.classList.add(`theme-${store.value.theme}`);
}
```

### Mobile Menu Composable
```ts
import { useMobileMenu } from '@/services/mobile_menu';
const mobileMenu = useMobileMenu(router);
mobileMenu.toggleMenu();  // Toggle visibility
mobileMenu.hideMenu();    // Close menu
mobileMenu.link('/path'); // Navigate and close
```

---

## Documentation Links

| Resource | Path |
|----------|------|
| Project README | `/README.md` |
| Package.json | `/package.json` |
| Vite Config | `/vite.config.mts` |
| TypeScript Config | `/tsconfig.json` |
| Git Ignore | `/.gitignore` |
| License | `/LICENSE` |
| Tailwind Semantic Colors | `.agents/documentation/colors.md` |
| CSS System Guide | `.agents/documentation/css-system-guide.md` |
