The Tailwind semantic colors plugin is available, here is how it works:

<cheatset>
The following semantic colors are available: 

- `prim`: main color (primary)
- `sec`: secondary main color
- `ter`: tertiary color
- `success`: a color for success/positive actions
- `warning`: a color for cautionary/warning actions
- `danger`: a color for destructive/dangerous actions
- `info`: an informational color
- `background`: the page background color
- `light`: a light neutral color
- `semilight`: a semi-light neutral color
- `lighter`: a very light neutral color
- `superlight`: the lightest neutral color

Aliases: `l1` (alias for `light`), `l2` (alias for `semilight`), `l3` (alias for `lighter`), `l4` (alias for `superlight`)

For text color use: `<div class="text-[color_name]">`
For background only use: `<div class="bg-[color_name]">`
For background and text colors combined use: `<div class="[color_name]">`
For a border color use: `<div class="border border-[color_name]">`

Examples:

```html
<!-- div blocks -->
<div class="prim">A primary text and background colored block</div>
<div class="text-sec">A secondary text color</div>
<!-- buttons -->
<button class="danger btn">Delete</button>
<button class="success btn">Save</button>
<button class="light btn">Action</button>
```
</cheatset>

The default color classes can be found in `src/scss/default.scss`