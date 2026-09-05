# Snowind Template

A ready-to-use [Vue 3](https://vuejs.org/) + [Tailwind CSS v4](https://tailwindcss.com/) template with multi-theme support and AI inference streaming. Part of the [Snowind](https://github.com/synw/snowind) project.

[![License](https://img.shields.io/github/license/synw/snowind-template)](LICENSE)

## Features

- ⚡ **Vue 3 + TypeScript** — built with the Composition API (`<script setup lang="ts">`)
- 🎨 **Multi-theme support** — 12 themes applied via CSS custom properties, switchable at runtime
- 🌗 **Tailwind CSS v4** — utility styling plus a semantic-colors layer (`prim`, `sec`, `ter`, `success`, `warning`, `danger`, `info`, …)
- 📱 **Mobile-responsive layout** — fixed header, collapsible mobile menu, scrollable content area, footer
- 🧭 **Client-side routing** — vue-router with dynamic imports and automatic document titles
- 🧩 **UI component kit** — a `Sw-*` design-system library (inputs, textarea, switch, popover, tooltip, tree, toast, notification, …)
- 🧠 **AI inference streaming** — real-time token streaming to markdown rendering via [Agent Smith](https://github.com/lynxai-team/agent-smith) and `markstream-vue`

## Documentation

### For AI Agents
- [Codebase Summary](.agents/documentation/codebase-summary.md) — Architecture, key files, and patterns (structured, machine-readable)
- [Project Overview](.agents/documentation/project-overview.md) — Concise project overview (~1 page)
- [Project Navigation](.agents/documentation/project-nav.md) — Detailed navigation map with dependency graph
- [Decision Tree](.agents/documentation/decision-tree.md) — Quick guide: find the right doc for your task
- [Colors Cheat Sheet](.agents/documentation/colors.md) — Tailwind semantic colors cheat sheet
- [CSS System Guide](.agents/documentation/css-system-guide.md) — Theming architecture, dark mode, and how to add new colors/themes

## Get Started

### 1. Clone the repo

```bash
git clone https://github.com/synw/snowind-template.git
cd snowind-template
```

### 2. Install dependencies

This project ships with a `package-lock.json`, so `npm` is the recommended package manager:

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

Open <http://localhost:5173>. The app boots at `src/main.ts` and mounts the root layout in `src/App.vue`.

### 4. Build for production

```bash
npm run build
```

A static build is generated in `dist/`. Preview it locally with `npm run preview`.

## Adding a Page

Pages are Vue components registered as routes in [`src/router.ts`](src/router.ts). Each route sets the document title via `meta.title`.

1. Create a new view component, e.g. `src/views/AboutView.vue`:

   ```vue
   <template>
     <div class="container mx-auto">
       <h1 class="text-2xl prim">About</h1>
       <p>Your content here.</p>
     </div>
   </template>
   ```

2. Register it in `src/router.ts`:

   ```ts
   {
     path: "/about",
     component: () => import("./views/AboutView.vue"),
     meta: { title: "About" }
   }
   ```

That's it — the page is live at `/about` with its document title set automatically.

## Creating Components

Components follow the `<script setup lang="ts">` convention and are styled with Tailwind utility classes plus the semantic-color classes (`prim`, `sec`, `ter`, `success`, …) that recolor based on the active theme.

- **Layout components** live in [`src/components/`](src/components/) (header, footer, theme switcher, icons).
- **Page-level views** live in [`src/views/`](src/views/).
- The reusable `Sw-*` design-system kit lives in [`src/vibe/`](src/vibe/).

### Using the theme switcher

The active theme is persisted to `localStorage`. Switch themes programmatically from `src/state.ts`:

```ts
import { setTheme } from "@/state.js";

setTheme("forest"); // swaps the <html> class and recolors everything
```

Twelve themes are available (defined in [`src/conf.ts`](src/conf.ts)): `black`, `navy`, `forest`, `slate`, `royal`, `teal`, `pearl`, `sandstone`, `cloud`, `graphite` (default), and `airy-soft`.

## Theming

Each theme lives in its own SCSS file under [`src/scss/`](src/scss/) and defines CSS custom properties for both light and dark variants. The active theme is toggled by applying a `theme-<name>` class on the `<html>` element, and the semantic-color Tailwind classes automatically adapt to whichever theme is active — so your components stay consistent across themes without extra work.

## Important Notes

- **Runtime**: Node.js 18+ is recommended (Vite + ESM). Requires a browser to run.
- **Module system**: ESM only (`"type": "module"`). The `@/` path alias resolves to `/src/`.
- **Private template**: `snowind-template` is marked `private` in `package.json` and is not published to any registry.
- **Build tooling**: `npm run buildserver` compiles the TypeScript server entry (`tsconfig_bin.json`); `npm run server` runs it in watch mode, `npm run local` runs the compiled `dist/bin/index.js`.

## License

This project is licensed under the [MIT License](LICENSE) — Copyright (c) 2022 synw.
