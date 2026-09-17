<template>
  <div class="h-full min-h-svh w-full">
    <the-header class="h-16 prim fixed">
      <template #menu>
        <router-link to="/" class="border-none btn hover:light">Home</router-link>
        <router-link to="/components" class="border-none btn hover:light">Components</router-link>
        <router-link to="/styleguide" class="border-none btn hover:light">Style Guide</router-link>
      </template>
    </the-header>
    <the-mobile-menu class="top-16 fixed lighter z-50">
      <div class="flex flex-col p-3 pb-5 space-y-3 border-y-2 bord-primary">
        <router-link to="/" class="btn" @click="mobileMenu.closeMenu()">Home</router-link>
        <router-link to="/components" class="btn" @click="mobileMenu.closeMenu()">Components</router-link>
        <router-link to="/styleguide" class="btn" @click="mobileMenu.closeMenu()">Style Guide</router-link>
      </div>
    </the-mobile-menu>
    <SwToast :toasts="toasts" />
    <SwNotification />
    <div class="w-full top-16 fixed overflow-y-auto z-10 main-h">
      <div class="background flex flex-col w-full h-full">
        <router-view class="w-full grow"></router-view>
        <the-footer></the-footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from './components/TheFooter.vue';
import TheMobileMenu from './components/TheMobileMenu.vue';
import SwToast from '@/vibe/components/toast/SwToast.vue';
import SwNotification from '@/vibe/components/notification/SwNotification.vue';
import { toasts } from '@/vibe/components/toast/composable.js';
import { initState, mobileMenu } from './state.js';

onBeforeMount(() => initState());
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
