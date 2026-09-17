<template>
  <div class="mb-24">
    <!-- Page title -->
    <section class="px-4 max-w-5xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">Typography &amp; Content</h1>
      <p class="text-semilight mb-8 max-w-2xl">
        A realistic content page built from Snowind's heading scale, text utilities and semantic
        color classes. Every line of copy on this page is real — the same tone you'd ship in a
        product's documentation or marketing site.
      </p>
    </section>

    <!-- Typography -->
    <section class="px-4 max-w-5xl mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Typography</h2>
      <p class="text-sm text-semilight mb-6">
        The heading scale, body copy and inline emphasis patterns used across the template.
      </p>
      <div class="border border-light rounded-lg p-4 space-y-5">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-ter mb-2">Heading scale</p>
          <h3 class="text-xl font-bold mb-1">Heading level 3 — section titles</h3>
          <h4 class="text-lg font-semibold mb-1">Heading level 4 — subsections and card groups</h4>
          <p class="text-base leading-relaxed">
            Body text carries the page. It stays on the default color for maximum contrast, while
            secondary lines drop to <code class="bg-semilight px-1 rounded text-sm">text-semilight</code>
            and captions to a lighter neutral tone.
          </p>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-ter mb-2">Emphasis &amp; inline styles</p>
          <p class="leading-relaxed">
            Use <span class="text-prim font-medium">primary accent text</span> for brand-aligned
            highlights, <span class="text-sec font-medium">secondary accents</span> for supporting
            details and <span class="text-light">light neutrals</span> for de-emphasized metadata.
            Inline code such as <code class="bg-semilight px-1 rounded text-sm">prim</code> or
            <code class="bg-semilight px-1 rounded text-sm">rounded-lg</code> keeps API names readable,
            while badges like <span class="success p-1 rounded text-xs font-semibold">stable</span>
            and <span class="ter p-1 rounded text-xs font-semibold">beta</span> mark status at a glance.
          </p>
        </div>
      </div>
    </section>

    <!-- Alerts & feedback -->
    <section class="px-4 max-w-5xl mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Alerts &amp; feedback</h2>
      <p class="text-sm text-semilight mb-6">
        Four callout severities, each a single semantic color class — no custom CSS required.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="success p-3 rounded flex items-start gap-2">
          <span class="font-bold shrink-0">Success</span>
          <span>Your theme choice was saved and will persist across browser sessions.</span>
        </div>
        <div class="warning p-3 rounded flex items-start gap-2">
          <span class="font-bold shrink-0">Warning</span>
          <span>You have 3 unsaved form values — leaving the page now discards them.</span>
        </div>
        <div class="danger p-3 rounded flex items-start gap-2">
          <span class="font-bold shrink-0">Danger</span>
          <span>Deleting this workspace removes its components permanently. This cannot be undone.</span>
        </div>
        <div class="info p-3 rounded flex items-start gap-2">
          <span class="font-bold shrink-0">Info</span>
          <span>Snowind ships 12 built-in themes — switch from the header at any time.</span>
        </div>
      </div>
    </section>

    <!-- Progress -->
    <section class="px-4 max-w-5xl mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Progress</h2>
      <p class="text-sm text-semilight mb-6">
        A thin track plus a semantic-color fill is the whole pattern — width is just an inline style.
      </p>
      <div class="border border-light rounded-lg p-4 space-y-5">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="font-medium">Component kit coverage</span>
            <span class="text-semilight">10 of 12 Sw-* components demoed · 83%</span>
          </div>
          <div class="bg-light rounded-full h-2.5">
            <div class="success rounded-full h-2.5" style="width: 83%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="font-medium">Theme system adoption</span>
            <span class="text-semilight">12 of 12 themes wired · 100%</span>
          </div>
          <div class="bg-light rounded-full h-2.5">
            <div class="prim rounded-full h-2.5" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cards -->
    <section class="px-4 max-w-5xl mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Content cards</h2>
      <p class="text-sm text-semilight mb-6">
        The standard card — title, short body, one action — in a responsive 1/2/3-column grid.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="card in cards" :key="card.title" class="border border-light rounded-lg p-4 flex flex-col">
          <h3 class="font-bold mb-1">{{ card.title }}</h3>
          <p class="text-sm text-semilight mb-4 flex-1">{{ card.body }}</p>
          <router-link
            :to="card.to"
            class="success btn px-3 py-1 rounded self-start"
          >
            {{ card.action }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface FeatureCard {
  title: string;
  body: string;
  action: string;
  to: string;
}

const cards: FeatureCard[] = [
  {
    title: 'Component kit',
    body: 'Twelve Sw-* components — inputs, switches, tooltips, popovers, trees and listboxes — ready to drop into any view.',
    action: 'Browse the playground',
    to: '/components',
  },
  {
    title: 'Theme system',
    body: 'One class on <html> swaps all twelve themes. The header switcher and the home page showcase both write to the same store.',
    action: 'Open the style guide',
    to: '/styleguide',
  },
  {
    title: 'Semantic colors',
    body: 'prim, sec, success, warning, danger and info utilities mean your markup says what it does, not which hex it uses.',
    action: 'See it on the home page',
    to: '/',
  },
];
</script>
