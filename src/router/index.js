import { createRouter, createWebHistory } from "vue-router";
import home from "../views/Home.vue";
import about from "@/components/about.vue";
import contact from "@/components/contact.vue";
import login from "@/components/login.vue";
import register from "@/components/register.vue";
import Deal from "@/components/Deal.vue";
import { auth } from "../firebase";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/about",
      name: "about",
      component: about,
    },
    {
      path: "/contact",
      name: "contact",
      component: contact,
    },
    {
      path: "/deal",
      name: "deal",
      component: Deal,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  //if you are already loged in and you try to access login page then it will redirect to home page
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }
  // Down below check which router is require authentication
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }
  next();
});

export default router;
