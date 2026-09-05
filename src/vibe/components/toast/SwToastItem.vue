<template>
  <div class="px-4 py-2 text-sm duration-300 rounded-xl" :class="[
    'transition-all',
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0',
    toastClass
  ]">
    <div class="toast-content">
      <div v-html="message"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { promiseTimeout } from '@vueuse/core';

const props = defineProps<{
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
  delay: number;
}>();

const toastClass = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'sec border border-light',
}[props.type];

const isVisible = ref(false);

async function pop() {
  isVisible.value = true;
  await promiseTimeout(300); // transition in delay
  await promiseTimeout(props.delay);
  isVisible.value = false;
  await promiseTimeout(300); // transition out delay
}

watchEffect(async () => {
  if (props.show) {
    await pop();
  }
});
</script>
