# Snowind Template

## Summary
Vue 3 + TypeScript SPA starter template with multi-theme support, Tailwind CSS v4, and AI inference streaming.

## Dependencies
- `vue` (3.5.39) — Core framework
- `vue-router` (5.1.0) — Client-side routing
- `tailwindcss` (4.3.2) + `@tailwindcss/vite` — Utility CSS framework
- `@snowind/state` — Shared composables (User, useScreenSize)
- `@vueuse/core` — Vue composition utilities (useStorage)
- `@agent-smith/server` + `@agent-smith/wscli` — AI inference server/client
- `markstream-vue` — Streaming markdown rendering
- `sass` — SCSS compilation for themes

## Used By
_N/A — This is the root project._

## Entry Point
- `src/main.ts` — Vue app initialization and router mount
- `src/App.vue` — Root component with layout shell (header, mobile menu, router-view, footer)
- `vite.config.mts` — Vite build configuration with Vue and Tailwind plugins

## Key Files
| File | Purpose |
|------|---------|
| `src/main.ts` | App bootstrap: creates Vue app, mounts router |
| `src/App.vue` | Root layout: fixed header, mobile menu, scrollable content area with router-view and footer |
| `src/router.ts` | Route definitions: `/` (HomeView), `/page` (PageView), `/styleguide` (StyleGuideView) |
| `src/state.ts` | State management: theme store, User composable, mobile menu composable, theme switching |
| `src/conf.ts` | Theme list: array of 12 available theme names |
| `src/server.ts` | AI server entry point: runs @agent-smith/server |
| `vite.config.mts` | Build config: Vue plugin, Tailwind plugin, path alias `@/` → `/src/` |
| `tsconfig.json` | TypeScript config: ESNext target, NodeNext module resolution, strict mode |

### `src/vibe/` — UI Component Kit (design system)
- **Entry Point**: `widgets/StyleGuide.vue` (design-system demo); components used via local `<script setup>` imports
- **Key Files**:
  | File | Purpose |
  |------|---------|
  | `components/inputtext/SwInputText.vue` | Text input (`v-model`) |
  | `components/inputnumber/SwInputNumber.vue` | Number input with step controls |
  | `components/textarea/SwTextarea.vue` | Multi-line text input (`v-model`) |
  | `components/switch/SwSwitch.vue` | Toggle switch |
  | `components/popover/SwPopover.vue` | Popover overlay (emits `hide`) |
  | `components/tooltip/SwTooltip.vue` | Tooltip from `text` prop, wraps default slot |
  | `components/tree/SwTree.vue` | Tree view with per-node slot |
  | `components/listbox/SwListbox.vue` | Selectable listbox |
  | `components/iftalabel/SwIftaLabel.vue` | Label wrapper, wraps default slot |
  | `components/toast/{SwToast,SwToastItem}.vue + composable.ts` | Toast notifications; global `toast.success()/warn()/error()` API |
  | `components/notification/{SwNotification,SwNotificationItem}.vue + composable.ts` | Notification center; `addNotification/removeNotification`, `notifications` ref |
  | `widgets/StyleGuide.vue` | Design-system style guide (colors, buttons, forms, cards, alerts) |
- **Pattern**: `<script setup lang="ts">`; `v-model` via `modelValue` prop + `update:modelValue` emit; default/named slots; toast/notification use module-level composables for global state. Styled with Tailwind semantic color classes (`prim`, `sec`, `ter`, `success`, etc.).

## Architecture
- **Layout Shell**: App.vue wraps content in fixed header (4rem), mobile menu overlay, scrollable main area, and footer
- **Theme System**: 12 SCSS theme files define CSS custom properties; `theme-<name>` class on `<html>` switches themes
- **Service Layer**: Standalone composables (`useMobileMenu`) provide reusable business logic
- **Streaming AI**: `src/services/inference.ts` connects to `@agent-smith/server` for real-time token streaming and markdown rendering

## Related
- See `src/components/` — UI component library (header, footer, theme switcher, icons)
- See `src/views/` — Page-level components (home, page, styleguide)
- See `src/services/` — Business logic composables (mobile_menu, inference)
- See `src/scss/` — 12 theme SCSS files + main.scss aggregator
- See `src/vibe/` — New UI component kit / design system (11 `Sw-*` components + StyleGuide widget); see module section above

## Documentation
- `.agents/documentation/decision-tree.md` — Quick guide: find the right doc for your task
- `.agents/documentation/project-overview.md` — Concise project overview
- `.agents/documentation/project-nav.md` — Detailed navigation map
- `.agents/documentation/colors.md` — Tailwind semantic colors cheat sheet
- `.agents/documentation/css-system-guide.md` — CSS system guide (theming architecture, dark mode, adding new colors/themes)
- `AGENTS.md` — Project conventions and quick start
