# Project Navigation Map — Snowind Template

> **Purpose**: Single-reference map for AI coding agents to understand, navigate, and modify the Snowind Template codebase.

## 1. Project Overview

| Repo | Path | Purpose |
|------|------|---------|
| snowind-template | `/` | Vue 3 + TypeScript SPA starter with Tailwind CSS v4 theming, and AI streaming |

**Description**: A starter template for [Snowind](https://github.com/synw/snowind) — a Vue 3 SPA with 12 color themes, Tailwind CSS v4, mobile-responsive layout, and real-time AI inference streaming.

## 2. Architecture Principles

| Principle | Detail | Key Files |
|-----------|--------|-----------|
| Composition API First | All components use `<script setup lang="ts">` | `src/components/*.vue`, `src/views/*.vue` |
| Theme-Driven Styling | CSS custom properties per theme; `theme-<name>` class on `<html>` | `src/scss/*.scss`, `src/state.ts` |
| Tailwind CSS v4 | Utility classes via Tailwind with custom semantic color system | `src/styles/snowind.css`, `src/styles/global.css` |
| Router-Based Navigation | vue-router with dynamic imports for code splitting | `src/router.ts` |
| State via Composition | Reactive state in composables and `@snowind/state` | `src/state.ts`, `src/services/*.ts` |
| Slot-Based Layout | `TheHeader` composes `TheHeaderMain` with named slots | `src/components/TheHeader.vue`, `TheHeaderMain.vue` |
| AI Streaming | Real-time token streaming with markdown rendering | `src/services/inference.ts`, `markstream-vue` |

## 3. Dependency Graph

```
┌─────────────┐    ┌──────────────┐    ┌──────────────────┐
│   Vue 3     │───▶│  vue-router  │    │ @snowind/state   │
│  (Framework)│    │  (Routing)   │    │ (Composables)    │
└──────┬──────┘    └──────────────┘    └──────────────────┘
       │
       ▼
┌──────────────────┐    ┌──────────────────┐
│ Tailwind CSS v4  │◀───│   Vite           │
│  + Semantic      │    │ (Build Tool)     │
│   Colors         │    │                  │
└──────────────────┘    └──────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                  SCSS Themes (12)                        │
│   black, navy, forest, slate, royal, teal, pearl,        │
│   sandstone, cloud, graphite (default), airy-soft        │
└──────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│              @agent-smith/server + wscli                 │
│              markstream-vue (AI streaming)               │
└──────────────────────────────────────────────────────────┘
```

**Prose**: Vite builds the project using Vue and Tailwind plugins. Vue 3 is the core framework with vue-router for navigation. `@snowind/state` provides shared composables (`User`, `useScreenSize`). Themes are SCSS files that override CSS custom properties on `.theme-*` classes applied to `<html>`. AI streaming uses `@agent-smith/server` and `markstream-vue` for real-time markdown rendering.

## 4. Packages/Modules

### `src/` — Application source root
- **Purpose**: All application code lives here
- **Key files**: `main.ts`, `App.vue`, `router.ts`, `state.ts`, `conf.ts`, `server.ts`

### `components/` — Reusable UI components
- **Purpose**: Shared Vue components used across views
- **Key files**: `TheHeader.vue`, `TheFooter.vue`, `TheMobileMenu.vue`, `TheHeaderMain.vue`, `ThemeSwitcher.vue`, `HelloWorld.vue`, `EditAiComponent.vue`
- **Key types/classes**: None (all Vue SFCs)

### `views/` — Page-level components
- **Purpose**: Route-matched page views
- **Key files**: `HomeView.vue`, `PageView.vue`, `StyleGuideView.vue`

### `services/` — Business logic & utilities
- **Purpose**: Standalone composables and services
- **Key files**: `mobile_menu.ts`, `inference.ts`
- **Key types/classes**: `useMobileMenu(router?, autoclose?)` → `{isVisible, forceCloseMenu, closeMenu, toggleMenu, hideMenu, link}`; AI streaming hooks (`onTurnStart`, `onToken`, `onThinkingToken`)

### `widgets/icons/` — Icon SVG components
- **Purpose**: Inline SVG icon components
- **Key files**: `SunIcon.vue`, `MoonIcon.vue`, `MenuIcon.vue`, `BackIcon.vue`

### `scss/` — Theme stylesheets
- **Purpose**: CSS custom property definitions for each theme (light + dark modes)
- **Key files**: `main.scss` (imports all themes), `default.scss` (base variables), `black.scss`, `navy.scss`, `forest.scss`, `slate.scss`, `royal.scss`, `teal.scss`, `pearl.scss`, `sandstone.scss`, `cloud.scss`, `graphite.scss`, `airy-soft.scss`
- **CSS variables**: `--prim-*`, `--sec-*`, `--ter-*`, `--success-*`, `--warning-*`, `--danger-*`, `--info-*`, `--background-*`, `--light-*`, `--lighter-*`, `--semilight-*`, `--superlight-*` (each with `-light-bg`, `-light-txt`, `-dark-bg`, `-dark-txt`)

### `styles/` — Global CSS
- **Purpose**: Tailwind imports and custom utility classes
- **Key files**: `global.css` (imports Tailwind layers), `snowind.css` (`.btn`, slide animations)

### `assets/` — Static assets
- **Key files**: `logo.png`, `index.css`

## 5. Server/API

| Endpoint | Description | Key File |
|----------|-------------|----------|
| AI Inference Server | WebSocket-based AI inference streaming | `src/server.ts`, `@agent-smith/server` |
| Client Features | AI client hooks for token/streaming events | `src/services/inference.ts`, `@agent-smith/wscli` |

## 6. Plugins/Extensions

| Plugin | Category | Purpose | Key File(s) |
|--------|----------|---------|-------------|
| `@vitejs/plugin-vue` | Build | Vue SFC compilation | `vite.config.mts` |
| `@tailwindcss/vite` | Styling | Tailwind CSS v4 integration | `vite.config.mts` |

## 7. UI/Frontend

### Routing

| Route | Component | Meta Title | Lazy Loaded |
|-------|-----------|------------|-------------|
| `/` | `HomeView.vue` | "Home" | No |
| `/page` | `PageView.vue` | "Page" | Yes |
| `/styleguide` | `StyleGuideView.vue` | "Styleguide" | Yes |

### Components

| Component | Purpose | Key Props/Slots | Parent |
|-----------|---------|-----------------|--------|
| `TheHeader` | Main desktop/mobile header | Named slots: `branding`, `mobile-branding`, `mobile-back`, `menu`, `mobile-menu` | `App.vue` |
| `TheHeaderMain` | Header layout with slots | `branding`, `mobile-branding`, `mobile-back`, `menu`, `menuicon`, `extra-mobile-buttons`, `mobile-menu` | Used by `TheHeader` |
| `TheMobileMenu` | Mobile slide-in menu | Default slot | `App.vue` |
| `TheFooter` | Page footer | N/A | `App.vue` |
| `ThemeSwitcher` | Theme dropdown selector | N/A | `TheHeader` |
| `HelloWorld` | Demo counter component | `msg: String` | `PageView.vue` |
| `EditAiComponent` | AI streaming editor | N/A | `StyleGuideView.vue` |

### Themes (12 total)

| Theme | Description | Default? |
|-------|-------------|----------|
| `graphite` | Warm grey neutral | ✅ Yes |
| `black` | Dark slate minimal | |
| `navy` | Classic navy blue | |
| `forest` | Green earth tones | |
| `slate` | Cool grey-blue | |
| `royal` | Rich purple/blue | |
| `teal` | Teal/cyan accent | |
| `pearl` | Soft white/cream | |
| `sandstone` | Warm beige/tan | |
| `cloud` | Light grey-blue | |
| `airy-soft` | Very light pastel | |

### Layout Structure (App.vue)
```
<div class="h-full min-h-svh w-full">
  <the-header class="h-16 prim fixed"></the-header>
  <the-mobile-menu class="top-16 fixed lighter z-50">
    <div class="p-3">Menu</div>
  </the-mobile-menu>
  <div class="w-full top-16 fixed overflow-y-auto z-10 main-h">
    <div class="background flex flex-col w-full h-full">
      <router-view class="container mx-auto grow"></router-view>
      <the-footer></the-footer>
    </div>
  </div>
</div>
```

## 8. Apps/Extensions

_N/A — Single-page application._

## 9. Code Snippets

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
const mobileMenu = useMobileMenu(router, autoclose = true);
mobileMenu.toggleMenu();  // Toggle visibility
mobileMenu.hideMenu();    // Close menu
mobileMenu.link('/path'); // Navigate and close
```

### AI Streaming
```ts
// src/services/inference.ts
import { stream, nodes, srv } from '@/services/inference';
// stream.value contains raw markdown text
// nodes.value contains parsed markdown structure
// srv provides AI client hooks
```

## 10. Navigation Quick Reference

| Task | Go To |
|------|-------|
| Add a new page | `src/router.ts` + `src/views/` |
| Change theme colors | `src/scss/<theme>.scss` |
| Modify header layout | `src/components/TheHeader.vue`, `TheHeaderMain.vue` |
| Add mobile menu item | `src/components/TheHeader.vue` (mobile-menu slot) |
| Toggle dark/light mode | `src/state.ts` → `user.toggleDarkMode()` |
| Change default theme | `src/state.ts` → `store.value.theme` initial value |
| Update build config | `vite.config.mts` |
| Add new icon | `src/widgets/icons/` |
| View style guide demo | Navigate to `/styleguide` in dev mode |
| Add AI streaming component | `src/services/inference.ts` + `src/components/EditAiComponent.vue` |

## 11. Documentation Links

- **Project README**: `/README.md`
- **Package.json**: `/package.json` (dependencies, scripts)
- **Vite Config**: `/vite.config.mts`
- **TypeScript Config**: `/tsconfig.json`
- **Git Ignore**: `/.gitignore`
- **License**: `/LICENSE`

## 12. Key Conventions & Patterns

| Convention | Detail |
|------------|--------|
| Path aliases | `@/` → `/src/` (configured in `vite.config.mts` and `tsconfig.json`) |
| Component naming | PascalCase, file names match component names |
| Theme classes | Applied as `theme-<name>` on `<html>` element |
| CSS variable naming | `--<role>-<mode>-bg/txt` (e.g., `--prim-light-bg`, `--danger-dark-txt`) |
| Role categories | `prim`, `sec`, `ter`, `success`, `warning`, `danger`, `info`, `background`, `light`, `lighter`, `semilight`, `superlight` |
| Route meta | Each route has `meta.title` for document title |
| Mobile-first | `TheHeaderMain` uses `useScreenSize()` to switch between desktop/mobile layouts |
| Auto-close menu | Mobile menu closes on navigation when `autoclose=true` |
| Dark mode toggle | `user.toggleDarkMode()` from `@snowind/state` |
| Build output | `dist/` directory |

## 13. Styling & Colors

- **Tailwind Semantic Colors**: Use `.agents/documentation/colors.md` for the complete cheat sheet
- **Color Classes**: `prim`, `sec`, `ter`, `success`, `warning`, `danger`, `info`, `background`, `light` (l1), `semilight` (l2), `lighter` (l3), `superlight` (l4)
- **Usage**: `text-[color]`, `bg-[color]`, or bare `[color]` for combined text+background
- **Themes**: 12 SCSS files in `src/scss/` define CSS custom properties per theme
- **Default Colors**: Defined in `src/scss/default.scss`

→ **Read `.agents/documentation/colors.md`** for the full Tailwind semantic colors cheat sheet before using color classes.
