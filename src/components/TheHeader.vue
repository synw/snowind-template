<template>
    <the-header-main>
        <template #mobile-back>
            <back-icon height="24" width="24" class="inline-flex ml-2 text-3xl" v-if="!isHome"></back-icon>
        </template>
        <template #mobile-branding>
            <div class="inline-flex flex-row items-center h-full pt-1 ml-2 text-2xl truncate" @click="router.push('/')">
                <img alt="" src="@/assets/logo.png" v-if="isHome" class="inline-block mx-3" />
                <span class="text-lg">Snowind</span>
            </div>
        </template>
        <template #branding>
            <div class="flex flex-row items-center h-full cursor-pointer" @click="router.push('/')">
                <img alt="" src="@/assets/logo.png" class="inline-block mx-3" />
                <span class="text-lg">Snowind</span>
            </div>
        </template>
        <template #menu>
            <div class="flex flex-row items-center justify-end w-full h-full space-x-1">
                <button class="border-none btn" @click="router.push('/page')">Page 1</button>
                <div class="pr-5 text-lg cursor-pointer txt-lighter dark:txt-light" @click="user.toggleDarkMode()">
                    <moon-icon v-if="!user.isDarkMode.value" height="24" width="24"></moon-icon>
                    <sun-icon v-else height="24" width="24"></sun-icon>
                </div>
            </div>
        </template>
        <template #mobile-menu>
            <div class="flex flex-col p-3 pb-5 space-y-3 lighter border-y-2 bord-primary">
                <div>
                    <button class="border-none btn" @click="router.push('/page')">Page 1</button>
                </div>
                <div class="text-lg cursor-pointer" @click=" user.toggleDarkMode()">
                    <template v-if="!user.isDarkMode.value">
                        <moon-icon></moon-icon height="24" width="24">&nbsp;Dark mode
                    </template>
                    <template v-else>
                        <sun-icon height="24" width="24"></sun-icon>&nbsp;Light mode
                    </template>
                </div>
            </div>
        </template>
    </the-header-main>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import TheHeaderMain from './TheHeaderMain.vue';
import { user } from "@/state";
import { computed } from 'vue';
import BackIcon from '../widgets/icons/BackIcon.vue';
import MoonIcon from '../widgets/icons/MoonIcon.vue';
import SunIcon from '../widgets/icons/SunIcon.vue';

const router = useRouter();

const isHome = computed<boolean>(() => router.currentRoute.value.path == "/");
</script>