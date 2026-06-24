<template>
    <div class="flex flex-row items-center w-full">
        <div class="flex-none" v-if="!isMobile">
            <slot name="branding"></slot>
        </div>
        <div class="inline-flex flex-row items-center grow h-full" v-if="isMobile">
            <div @click="back()">
                <slot name="mobile-back"></slot>
            </div>
            <slot name="mobile-branding"></slot>
        </div>
        <div class="grow h-full w-full flex flex-row items-center" v-if="!isMobile">
            <slot name="menu"></slot>
        </div>
        <div class="flex items-center justify-end h-full mr-5 cursor-pointer" v-else>
            <slot name="extra-mobile-buttons"></slot>
            <div class="border-none btn" ref="ignoreElRef" @click="mobileMenu.toggleMenu()">
                <slot name="menuicon">
                    <div class="text-3xl">
                        <menu-icon height="24" width="24"></menu-icon>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { mobileMenu } from '../state.js';
import MenuIcon from '../widgets/icons/MenuIcon.vue';
import { useScreenSize } from "@snowind/state";

const { isMobile } = useScreenSize();

function back() {
    if (history.length > 0) {
        history.back();
    }
}
</script>