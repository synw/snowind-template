<template>
  <div class="h-full min-h-svh w-full">
    <the-header class="h-16 prim fixed"></the-header>
    <the-mobile-menu class="top-16 fixed lighter z-50">
      <div class="p-3">Menu</div>
    </the-mobile-menu>
    <div class="w-full top-16 fixed overflow-y-auto z-10 main-h">
      <div class="background flex flex-col w-full h-full">
        <router-view class="container mx-auto grow"></router-view>
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
import { initState } from './state.js';

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
