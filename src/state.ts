import { User } from "@snowind/state";
import { useStorage } from '@vueuse/core';
import { useRouter } from "vue-router";
import { useMobileMenu } from "./services/mobile_menu";

const router = useRouter();

const user = new User();
const mobileMenu = useMobileMenu(router);
const store = useStorage<{ theme: string }>('store', {
    theme: "bluestar"
});

function initState() {
    setTheme()
}

function setTheme(t?: string) {
    const currentTheme = store.value.theme;
    store.value.theme = t ?? currentTheme;
    const th = document.getElementsByTagName("html")[0];
    //console.log("Current theme", currentTheme);
    //console.log("Switching to theme:", store.value.theme);
    th?.classList.remove("theme-" + currentTheme);
    th?.classList.add("theme-" + store.value.theme);
}

export {
    initState, mobileMenu, setTheme, store, user
};
