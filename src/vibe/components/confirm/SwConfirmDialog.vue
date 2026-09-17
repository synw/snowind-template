<template>
  <div v-if="confirmation" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div role="alertdialog" aria-modal="true"
      class="w-full max-w-md rounded-lg border border-lighter p-6 shadow-lg background">
      <div class="text-base font-bold">{{ confirmation.title }}</div>
      <div v-if="confirmation.message" class="mt-2 wrap-break-word text-sm">{{ confirmation.message }}</div>
      <div class="mt-4 flex justify-end gap-2">
        <button type="button" class="btn danger" :disabled="busy" @click="handle('reject')">No</button>
        <button type="button" class="btn success" :disabled="busy" @click="handle('accept')">Yes</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { closeConfirmation, confirmation } from './composable.js';

const busy = ref(false);

async function handle(action: 'accept' | 'reject') {
  const options = confirmation.value;
  if (!options || busy.value) return;
  busy.value = true;
  try {
    await (action === 'accept' ? options.accept() : options.reject?.());
  } finally {
    closeConfirmation();
  }
}
</script>
