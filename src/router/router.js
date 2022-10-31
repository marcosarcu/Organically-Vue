import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuthChanges } from "../services/auth.js";
import Home from "../views/Home.vue";
import Prices from "../views/Prices.vue";
import LogIn from "../views/LogIn.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import EditService from "../views/EditService.vue";
import DeleteService from "../views/DeleteService.vue";
import NotFound from "../views/NotFound.vue";
import Chat from "../views/Chat.vue";
import ChatAdmin from "../views/ChatAdmin.vue";

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
        name: 'profile',
        path: '/perfil',
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
    },
    {
        path: "/chat/:id",
        name: "Chat",
        component: Chat,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/chatadmin/",
        name: "ChatAdmin",
        component: ChatAdmin,
        meta: {
            requiresAuth: true,
        }
    },
    {
        // Página 404
        path: "/:catchAll(.*)",
        component: NotFound 
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        // make it work with anchor links
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
        return { top: 0 }
    }
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