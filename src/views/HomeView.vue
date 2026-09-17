<template>
  <div class="mb-24">

    <!-- Feature cards -->
    <section class="px-4 max-w-5xl mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Explore the template</h2>
      <p class="text-sm text-semilight mb-6">Everything below is live — click through to see it working.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link to="/components"
          class="border border-light rounded-lg p-4 hover:border-semilight transition-colors">
          <h3 class="font-bold mb-1">Component Playground</h3>
          <p class="text-sm text-semilight">Live, interactive demos of every Sw-* component in the kit.</p>
        </router-link>
        <router-link to="/styleguide"
          class="border border-light rounded-lg p-4 hover:border-semilight transition-colors">
          <h3 class="font-bold mb-1">Style Guide</h3>
          <p class="text-sm text-semilight">Brand colors, semantic palettes and utility reference in one widget.</p>
        </router-link>
        <router-link to="/page" class="border border-light rounded-lg p-4 hover:border-semilight transition-colors">
          <h3 class="font-bold mb-1">Typography Demo</h3>
          <p class="text-sm text-semilight">Heading scale, text utilities, cards and alerts using semantic colors.</p>
        </router-link>
        <a href="#themes" class="border border-light rounded-lg p-4 hover:border-semilight transition-colors">
          <h3 class="font-bold mb-1">Themes</h3>
          <p class="text-sm text-semilight">All 12 themes in one place — jump to the showcase below.</p>
        </a>
      </div>
    </section>

    <!-- Theme showcase -->
    <section id="themes" class="px-4 max-w-5xl mx-auto mt-16 scroll-mt-20">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Themes</h2>
      <p class="text-sm text-semilight mb-6">
        12 built-in themes, one click away. Click a theme to apply it across the whole template.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <button v-for="theme in themes" :key="theme" type="button" @click="applyTheme(theme)"
          class="rounded-lg p-4 text-left border transition-colors"
          :class="store.theme === theme ? 'border-light ring-2 ring-prim' : 'border-light hover:border-semilight'">
          <span class="font-medium">{{ theme }}</span>
          <span v-if="store.theme === theme" class="block text-xs text-prim mt-1">Active</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { setTheme, store } from '../state.js';
import { themes } from '../conf.js';

function applyTheme(theme: string) {
  setTheme(theme);
}
</script>
