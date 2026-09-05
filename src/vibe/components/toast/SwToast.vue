<template>
  <div class="fixed bottom-12 left-0 right-0 mx-auto max-w-xs space-y-2 px-4 z-50 text-center">
    <SwToastItem v-for="toast in toasts" :key="toast.id" :message="toast.message" :type="toast.type" :show="true"
      :delay="toast.delay" />
  </div>
</template>
<script setup lang="ts">
import SwToastItem from './SwToastItem.vue';

defineProps<{
  toasts: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    delay: number
  }>
}>();
</script>