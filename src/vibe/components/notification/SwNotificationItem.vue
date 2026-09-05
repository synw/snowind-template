<template>
  <div role="alert" class="flex items-start gap-2 rounded-lg p-3 shadow-md transition-all duration-300"
    :class="[severityClass[message.severity], visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0']"
    @mouseenter="pauseTimer" @mouseleave="startTimer">
    <div class="min-w-0 flex-1">
      <div class="text-sm font-bold">{{ message.title }}</div>
      <div v-if="message.detail" class="wrap-break-word text-sm">{{ message.detail }}</div>
    </div>
    <button type="button" aria-label="Close notification"
      class="-m-1 p-1 text-lg leading-none opacity-70 hover:opacity-100" @click="dismiss">×</button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { promiseTimeout } from '@vueuse/core';
import { removeNotification } from './composable.js';
import type { NotificationMessage, NotificationSeverity } from './composable.js';

const props = defineProps<{ message: NotificationMessage }>();

const severityClass: Record<NotificationSeverity, string> = {
  info: 'info',
  success: 'success',
  warn: 'warning',
  error: 'danger',
};

const visible = ref(false);
let remaining = props.message.life;
let startedAt = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
let leaving = false;

function startTimer() {
  if (leaving || !props.message.life) return;
  startedAt = Date.now();
  timer = setTimeout(dismiss, remaining);
}

function pauseTimer() {
  if (leaving || timer === undefined) return;
  clearTimeout(timer);
  timer = undefined;
  remaining = Math.max(0, remaining - (Date.now() - startedAt));
}

async function dismiss() {
  if (leaving) return;
  leaving = true;
  if (timer !== undefined) clearTimeout(timer);
  visible.value = false;
  await promiseTimeout(300); // transition out delay
  removeNotification(props.message.id);
}

onMounted(() => {
  visible.value = true;
  startTimer();
});

onBeforeUnmount(() => {
  if (timer !== undefined) clearTimeout(timer);
});
</script>
