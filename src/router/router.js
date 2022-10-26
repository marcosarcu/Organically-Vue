import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        component: Home,
        path: '/',
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;