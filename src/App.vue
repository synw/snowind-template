<template>
  <div class="h-full min-h-svh w-full">
    <the-header class="h-16 prim fixed"></the-header>
    <the-mobile-menu class="top-16 fixed lighter z-50">
      <div class="p-3">Menu</div>
    </the-mobile-menu>
    <div class="w-full top-16 fixed overflow-y-auto main-h z-10">
      <div class="background flex flex-col w-full">
        <router-view class="container mx-auto"></router-view>
        <the-footer></the-footer>
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
import { onBeforeMount, onMounted } from 'vue';
import TheHeader from "@/components/TheHeader.vue";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import { initNotifyService } from "@/services/notify";
import TheFooter from './components/TheFooter.vue';
import TheMobileMenu from './components/TheMobileMenu.vue';
import { initState } from './state.js';

onBeforeMount(() => initState());
onMounted(() => initNotifyService())
</script>
<style lang="scss">
@use "./scss/main.scss";
</style>
<style lang="css">
@import "./styles/global.css";

.main-h {
  height: calc(100% - 4rem)
}
</style>
