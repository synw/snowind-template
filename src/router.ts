import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomeView from "./views/HomeView.vue"

const baseTitle = "Snowind"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomeView,
    meta: {
      title: "Home"
    }
  },
  {
    path: "/page",
    component: () => import("./views/PageView.vue"),
    meta: {
      title: "Page"
    }
  },
  {
    path: "/components",
    component: () => import("./views/ComponentsView.vue"),
    meta: {
      title: "Components"
    }
  },
  {
    path: "/styleguide",
    component: () => import("@/vibe/widgets/StyleGuide.vue"),
    meta: {
      title: "Styleguide"
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.afterEach((to, from) => { // eslint-disable-line
  document.title = `${baseTitle} - ${to.meta?.title}`
});

export default router
