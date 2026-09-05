<template>
  <div role="region" aria-label="Notifications"
    class="fixed right-4 top-20 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
    <SwNotificationItem v-for="notification in notifications" :key="notification.id" :message="notification" />
  </div>
</template>

<script setup lang="ts">
import SwNotificationItem from './SwNotificationItem.vue';
import { notifications } from './composable.js';
</script>
