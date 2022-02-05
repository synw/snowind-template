<template>
  <div :class="{ dark: user.isDarkMode.value == true }">
    <the-header></the-header>
    <div class="p-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { user } from "@/state";
</script>

<style>
body {
  margin: 0;
}
</style>
