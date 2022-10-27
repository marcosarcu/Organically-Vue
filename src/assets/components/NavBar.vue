<script>
    import logo from '../imgs/logo.png';
    import { subscribeToAuthChanges, logOut } from '../../services/auth';
    export default {
        name: "NavBar",
        data: () => ({
            logo,
            user : {
                email: null,
                uid: null
            
            },
        }),
        mounted() {
            subscribeToAuthChanges(user => this.user = user);
        },
        methods: {
            handleLogOut() {
                logOut();
            }
        } 
    }
</script>

<template>
    <div class="container-md">
            <router-link class="navbar-brand" to="/"><img id="header-logo" :src="logo" alt=""></router-link>
            <button class="navbar-toggler" id="dropdown" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                    <!-- <li class="nav-item m-1">
                        <a class="btn btn-primary" href="{{route('home')}}">Ir al sitio</a>
                    </li> -->
                    <template v-else>
                        <li class="nav-item m-1">
                            <router-link class="btn btn-primary" to="/admin">Admin</router-link>
                        </li>
                        <li class="nav-item m-1">
                            <router-link class="btn btn-primary" to="/perfil">Mi perfil ({{user.email}})</router-link>
                        </li>
                        <li class="nav-item m-1">
                            <form action="#"  method="post" @submit.prevent="handleLogOut">
                                <button type="submit" class="btn btn-primary">Cerrar sesion</button>
                            </form>
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
</template>