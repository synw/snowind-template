<template>
  <div :class="{ dark: user.isDarkMode.value == true }" class="flex flex-col h-screen">
    <the-header></the-header>
    <div class="flex flex-row w-full h-full">
      <the-sidebar></the-sidebar>
      <div class="container p-3 background">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import { user } from "@/state";
</script>




