<template>
    <div class="w-full flex flex-col sm:visible md:invisible" :class="css">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { mobileMenu } from '../state';

const css = computed<Record<string, boolean>>(() => {
    const cl: Record<string, boolean> = {
        'slide-y': true,
        'slideup': mobileMenu.isVisible.value === false,
        'slidedown': mobileMenu.isVisible.value === true,
    };
    return cl;
});
</script>