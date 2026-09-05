<template>
    <span class="relative block text-semilight">
        <slot />
        <label :for="labelFor" class="pointer-events-none absolute top-2 left-3 text-xs leading-none">{{ label }}</label>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
    labelFor?: string;
}>();
</script>
