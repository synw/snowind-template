<template>
  <span class="group relative inline-flex">
    <slot />
    <div role="tooltip"
      class="lighter pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      v-html="text">
    </div>
  </span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
