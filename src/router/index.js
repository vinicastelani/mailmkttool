import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/HomeDashboard.vue";
import Create from "../views/Create/CreateDashboard.vue";
import Emails from "../views/Emails/EmailsDashboard.vue";
Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create email",
    component: Create,
  },
  {
    path: "/emails",
    name: "Emails created",
    component: Emails,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
