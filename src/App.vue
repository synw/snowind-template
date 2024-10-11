<template>
  <div class="h-full min-h-svh w-full  background" :class="`theme-${theme}`">
    <the-header class="h-16"></the-header>
    <div class="flex flex-row w-full h-full">
      <div class="container p-3 pb-8 mx-auto background">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Toast />
  <ConfirmDialog>
    <template #message="slotProps">
      <div class="flex flex-row items-center p-4">
        <!-- div>
          <named-icon :icon="`${slotProps.message.icon}`" class="text-3xl"></named-icon>
        </div -->
        <div class="pl-2">{{ slotProps.message.message }}</div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TheHeader from "@/components/TheHeader.vue";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import { initNotifyService } from "@/services/notify";
import { theme } from './state';

onMounted(() => initNotifyService())
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>
