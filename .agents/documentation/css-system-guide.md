# CSS System Guide

> **Purpose**: A portable reference for how this project's CSS system works and how to extend it.
> No project-specific components are referenced — the patterns here apply to any project using the
> same stack (Tailwind CSS 4 + `tailwindcss-semantic-colors` + SCSS custom-property theming).
>
> **See also**: `.agents/documentation/colors.md` for the project-specific semantic color cheat sheet
> (concrete class names, aliases, and usage examples).

---

## 1. Overview

The styling stack is built around three ideas:

1. **Tailwind CSS 4, config-free** — no `tailwind.config` file. Everything is declared in CSS with
   native directives (`@import`, `@theme`, `@utility`, `@layer`).
2. **CSS-only plugins** — features are added by importing published CSS packages rather than wiring
   up JavaScript build plugins.
3. **Custom-property theming** — colors are CSS variables. Themes are SCSS files that override those
   variables; dark mode is just another set of variable values.

The entry point is a single stylesheet (conventionally `styles/global.css`) that `@import`s the
framework, the feature plugins, and any local utilities:

```css
@import "tailwindcss";                    /* the framework */
@import "tailwindcss-semantic-colors";    /* semantic color utilities */
@import "tailwindcss-primeui";            /* (optional) component-library utilities */
@import "./local-utilities.css";          /* (optional) project-specific utility classes */
```

Import order matters: later imports win on conflicts, so local utilities go last.

---

## 2. Semantic Color Utilities

The [`tailwindcss-semantic-colors`](https://github.com/synw/tailwindcss-semantic-colors) package
(installed at `node_modules/tailwindcss-semantic-colors/`) is a **CSS-only** Tailwind v4 plugin.
Importing it exposes a set of color utilities that already adapt to light/dark mode.

### How it works internally

The plugin's single `style.css` uses three native Tailwind v4 directives:

```css
/* 1. @theme — map Tailwind color tokens onto your SCSS theme variables */
@theme {
  --color-prim: var(--prim-light-bg);
  --color-on-prim: var(--prim-light-txt);
}

/* 2. @layer base — re-map the same tokens for dark mode */
@layer base {
  .dark,
  [data-theme="dark"] {
    --color-prim: var(--prim-dark-bg);
    --color-on-prim: var(--prim-dark-txt);
  }
}

/* 3. @utility — a class that sets both background and text color */
@utility prim {
  background-color: var(--color-prim);
  color: var(--color-on-prim);
}
```

Because the tokens live in Tailwind's `--color-*` namespace, Tailwind **auto-generates** the
`bg-*` / `text-*` / `border-*` / `on-*` variants — you never write them by hand.

### Full-color utilities

Each utility applies **both** background and text color:

| Utility | Purpose |
|---------|---------|
| `prim` | Primary / brand color |
| `sec` | Secondary color |
| `ter` | Tertiary color |
| `background` | Base page background |
| `light` | Light neutral (borders, inactive states) |
| `semilight` | Semi-light neutral |
| `lighter` | Lighter neutral (cards, elevated surfaces) |
| `superlight` | Super-light neutral (hover states) |
| `success` | Success (green) |
| `warning` | Warning (amber) |
| `danger` | Danger / error (red) |
| `info` | Info (blue) |

```html
<div class="prim p-4 rounded">Primary block</div>
```

**Aliases** (identical output): `l1` → `light`, `l2` → `semilight`, `l3` → `lighter`,
`l4` → `superlight`.

### One-sided variants

Use Tailwind's automatic color prefixes when you need only background, text, or border:

```html
<div class="bg-prim">background only</div>
<div class="text-prim">text only</div>
<div class="border border-prim">border only</div>
<div class="bg-on-prim">uses the on-* token</div>
```

### Interactive variants

`hover:`, `focus:`, etc. work on every utility with **no configuration**:

```html
<button class="bg-prim hover:warning border border-prim">Save</button>
```

---

## 3. Theming

### The variable pattern

Every color is exposed as four CSS custom properties following the pattern
`--{color}-{mode}-{property}`:

| Token | Meaning |
|-------|---------|
| `--{color}-light-bg` | light-mode background |
| `--{color}-light-txt` | light-mode text |
| `--{color}-dark-bg` | dark-mode background |
| `--{color}-dark-txt` | dark-mode text |

`{color}` matches the utility names above (`prim`, `sec`, `ter`, `background`, `light`,
`semilight`, `lighter`, `superlight`, `success`, `warning`, `danger`, `info`). The exact set is
defined by the plugin's `@theme` tokens — define a variable for every token you want to customize.

### Base variables (`:root`)

A base theme file (conventionally `scss/default.scss`) defines the defaults under the `:root`
selector, so the variables always exist:

```scss
:root {
  --prim-light-bg: #0e7490;
  --prim-light-txt: white;
  --prim-dark-bg: #0a0a0a;
  --prim-dark-txt: #f5f5f5;
  /* … one light+dark pair for each color token … */
}
```

### Theme overrides (`.theme-{name}`)

Additional themes override only the variables that change, under a `.theme-{name}` class:

```scss
.theme-ocean {
  --prim-light-bg: #0f4c81;
  --prim-light-txt: white;
  --sec-light-bg: #3b7dd8;
  --background-light-bg: #f8fafc;
  /* … optionally override --*-dark-* for a different dark mode … */
}
```

### Activating a theme

The active theme is a CSS class on the root `<html>` element. Toggle it in your app's state
management (persisted if you want the choice to survive reloads):

```html
<html class="theme-ocean">
```

```js
function setTheme(name) {
  const html = document.documentElement;
  for (const th of html.classList.values()) {
    if (th.startsWith("theme-")) html.classList.remove(th);
  }
  html.classList.add(`theme-${name}`);
}
```

---

## 4. Dark Mode

Dark mode is **not** a media query — it is another set of variable values applied by a selector.
The plugin's `@layer base` block maps every token to its `--*-dark-*` variable when either `.dark`
or `[data-theme="dark"]` is present on an ancestor:

```css
@layer base {
  .dark, [data-theme="dark"] {
    --color-prim: var(--prim-dark-bg);
    --color-on-prim: var(--prim-dark-txt);
    /* … every other token … */
  }
}
```

To enable dark mode, add the class to `<html>`:

```html
<html class="dark theme-ocean">
```

Because utilities read the same `--color-*` tokens in both modes, your markup needs no
dark-specific classes — the variables do the work.

---

## 5. Adding a New Semantic Color

A new color requires two coordinated pieces: a set of CSS variables (the *data*) and a Tailwind
token + utility (the *interface*).

### Step 1 — Define the variables in your base theme

```scss
:root {
  /* light */
  --brand-light-bg: #6d28d9;
  --brand-light-txt: white;
  /* dark */
  --brand-dark-bg: #5b21b6;
  --brand-dark-txt: white;
}
```

### Step 2 — Register the token + utility

Extend the plugin's `style.css` (in `node_modules/tailwindcss-semantic-colors/style.css`, or better,
a local copy / fork you maintain) with three blocks:

```css
@theme {
  --color-brand: var(--brand-light-bg);
  --color-on-brand: var(--brand-light-txt);
}

@layer base {
  .dark, [data-theme="dark"] {
    --color-brand: var(--brand-dark-bg);
    --color-on-brand: var(--brand-dark-txt);
  }
}

@utility brand {
  background-color: var(--color-brand);
  color: var(--color-on-brand);
}
```

Now `class="brand"`, `class="bg-brand"`, `class="hover:brand"`, etc. all work.

> **Tip**: To avoid editing `node_modules`, keep a local CSS file in your project that declares its
> own `@theme` / `@layer` / `@utility` for project-specific colors and import it after the plugin.

---

## 6. Adding a New Theme

1. **Create the file** — `scss/{name}.scss` with a `.theme-{name}` class; override only what
   differs from the base `:root` defaults.
   ```scss
   .theme-{name} {
     --prim-light-bg: #0e599a;
     --prim-light-txt: white;
     --background-light-bg: #eff7ff;
     --background-light-txt: #1f2937;
   }
   ```
2. **Aggregate it** — add an `@use` line to the aggregator (conventionally `scss/main.scss`):
   ```scss
   @use "./default.scss" as *;
   @use "./{name}.scss" as *;
   ```
3. **Register it** — add `"{name}"` to the list of themes your switcher reads (e.g. a `themes`
   array in your config/state).
4. **Activate it** — set the class on `<html>` (see §4).

The theme name in the switcher must match the class suffix: `.theme-{name}` ↔ `"{name}"`.

### Best practices for themes

- **Override only what changes** — unspecified variables fall back to the base defaults.
- **Keep contrast** — ensure each `{color}-bg` vs `{color}-txt` pair meets WCAG AA (≥ 4.5:1).
- **Name classes** `.theme-{descriptive-name}` (e.g. `.theme-ocean`, `.theme-corporate`).
- **Ship both modes** — provide `--*-dark-*` values unless you want light-only themes.

---

## 7. Best Practices

1. **Use semantic utilities** over hardcoded colors for theme compatibility:
   `class="prim"` instead of `class="bg-cyan-700 text-white"`.
2. **Use color prefixes** for one-sided needs: `bg-prim`, `text-prim`, `border-prim`.
3. **Always ship light + dark** — the variable pattern carries both modes automatically.
4. **Prefer variants** (`hover:`, `focus:`) over manual state for interactive styling.
5. **Keep a single base theme** (`:root`) as the source of truth; treat other themes as overrides.
6. **Import local utilities last** so they can override plugin defaults when intended.

---

## 8. Quick Reference

| Concern | Where |
|---------|-------|
| Register the stack | your `styles/global.css` (`@import` order: framework → plugins → local) |
| Semantic color classes | `prim, sec, ter, background, light, semilight, lighter, superlight, success, warning, danger, info` (+ `l1`–`l4`) |
| One-sided colors | `bg-*`, `text-*`, `border-*`, `on-*` auto-prefixes |
| Base color variables | `scss/default.scss` under `:root` |
| Theme overrides | `scss/{name}.scss` under `.theme-{name}` |
| Activate a theme | class on `<html>` |
| Enable dark mode | add `.dark` (or `[data-theme="dark"]`) to `<html>` |
