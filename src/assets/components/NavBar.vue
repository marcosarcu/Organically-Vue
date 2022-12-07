<script>
import logo from '../imgs/logo.png';
import { subscribeToAuthChanges, logOut } from '../../services/auth';
import { getUserRole } from '../../services/user-profiles';


export default {
    name: "NavBar",
    data: () => ({
        logo,
        user: {
            email: null,
            uid: null,
        },
        role: 'user',
    }),
    mounted() {
        let callback = (user) => {
            this.user = user;
            getUserRole(user.uid).then((role) => {
                this.role = role;
            }).catch((error) => {
                // Da un error, si no se ha logueado. Lo ignoro.
                // uncaught (in promise) TypeError: Cannot read properties of null (reading 'indexOf')
            });
        };
        subscribeToAuthChanges(callback);       
    },
    methods: {
        handleLogOut() {
            logOut();
            this.role = 'user';
            this.$router.push({path: '/login'});
        }
    },
    computed: {
        isAdmin() {
            return this.role === 'admin';
        },
        isUser() {
            return this.role === 'user';
        },
    }
}
</script>

<template>
    <div class="container-md">
        <router-link class="navbar-brand" to="/"><img id="header-logo" :src="logo" alt=""></router-link>
        <button class="navbar-toggler" id="dropdown" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <nav class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item m-1">
                    <router-link class="nav-link" to="/">Inicio</router-link>
                </li>
                <li class="nav-item m-1">
                    <router-link class="nav-link" to="/precio">Precios</router-link>
                </li>
                <template v-if="user.uid === null">
                    <li class="nav-item m-1">
                        <router-link class="btn btn-primary" to="/login">Iniciar sesion</router-link>
                    </li>
                    <li class="nav-item m-1">
                        <router-link class="btn btn-primary" to="/register">Registrarse</router-link>
                    </li>
                </template>
                <template v-else>
                    <template v-if="isUser">
                        <li class="nav-item m-1">
                            <router-link class="nav-link" to="/chat/nkzCGlwFmZMkxIJLZROxgAcNOGS2/">Chat de ayuda</router-link>
                        </li>
                    </template>
                    <template v-if="isAdmin">
                        <li class="nav-item m-1">
                            <router-link class="nav-link" to="/chatAdmin/">Buzón de chat</router-link>
                        </li>
                    </template>
                    <li v-if="isAdmin" class="nav-item m-1">
                        <router-link class="btn btn-primary" to="/admin">Admin Servicio</router-link>
                    </li>
                    <li v-if="isAdmin" class="nav-item m-1">
                        <router-link class="btn btn-primary" to="/adminUsers">Admin Usuarios</router-link>
                    </li>
                    <li class="nav-item m-1">
                        <router-link class="btn btn-primary" to="/perfil">Mi perfil ({{user.displayName ? user.displayName : user.email }})</router-link>
                    </li>
                    <li class="nav-item m-1">
                        <form action="#" method="post" @submit.prevent="handleLogOut">
                            <button type="submit" class="btn btn-primary">Cerrar sesion</button>
                        </form>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>