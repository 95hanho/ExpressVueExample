import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/LoginView";
import Ment from "@/components/MentMain";
import User from "@/components/UserMain";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/ment",
      name: "Ment",
      component: Ment,
    },
    {
      path: "/user",
      name: "User",
      component: User,
    },
  ],
});
