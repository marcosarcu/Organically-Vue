import { createRouter, createWebHashHistory } from "vue-router";
import { register, subscribeToAuthChanges } from "../services/auth.js";
import Home from "../views/Home.vue";
import Prices from "../views/Prices.vue";
import LogIn from "../views/LogIn.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import EditService from "../views/EditService.vue";
import DeleteService from "../views/DeleteService.vue";

const routes = [
    {
        component: Home,
        path: '/',
    },
    {
        component: Prices,
        path: '/precio',
    },
    {
        component: LogIn,
        path: '/login',
    },
    {
        component: Register,
        path: '/register',
    },
    {
        component: Profile,
        path: '/profile',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: Admin,
        path: '/admin',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: EditService,
        path: '/admin/edit/:id',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: DeleteService,
        path: '/admin/delete/:id',
        meta: {
            requiresAuth: true,
        }
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

// Auth guard

let user = {
    uid: null,
    email: null,
};

subscribeToAuthChanges(newData => user = newData);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && user.uid === null) {
        return {
            path: '/login',
        }
    }
});

export default router;