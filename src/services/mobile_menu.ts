import { ref } from "vue";

const useMobileMenu = (router?: any, autoclose = true) => {
  const isVisible = ref(false);
  let forceCloseMenu = ref(false);

  const closeMenu = () => {
    isVisible.value = false;
  }

  const toggleMenu = () => {
    isVisible.value = !isVisible.value
  }

  const hideMenu = () => {
    isVisible.value = false;
    if (autoclose) {
      forceCloseMenu.value = true;
      setTimeout(() => {
        forceCloseMenu.value = false;
      }, 1);
    }
  }

  const link = (url: string) => {
    hideMenu();
    if (router) {
      router.push(url);
    } else {
      throw new Error("Please provide a router before at useTopbar initialization to use this function")
    }
  }

  return {
    isVisible,
    forceCloseMenu,
    closeMenu,
    toggleMenu,
    hideMenu,
    link,
  }
}

export { useMobileMenu }