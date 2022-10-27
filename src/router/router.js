import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Prices from "../views/Prices.vue";

const routes = [
    {
        component: Home,
        path: '/',
    },
    {
        component: Prices,
        path: '/precio',
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;