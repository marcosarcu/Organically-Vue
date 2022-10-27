<script>
import router from './router/router';
import logo from './assets/imgs/logo.png';
export default {
    name: "App",
    components: { router },
    data: () => ({
        logo
    })
};
</script>

<template>
<header class="navbar navbar-expand-lg navbar-light bg-light">
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
                <!-- <li class="nav-item m-1">
                    <a class="nav-link" href="{{route('home')}}#blog">Novedades</a>
                </li>
                    <li class="nav-item m-1">
                        <a class="btn btn-primary" href="{{route('login')}}">Iniciar sesion</a>
                    </li>
                        <li class="nav-item m-1">
                            <a class="btn btn-primary" href="{{route('home')}}">Ir al sitio</a>
                        </li>
                        <li class="nav-item m-1">
                            <a class="btn btn-primary" href="{{route('admin')}}">Panel de administración</a>
                        </li>
                    <li class="nav-item m-1">
                        <form action="{{route('logout')}}" method="POST">
                            <button type="submit" class="btn btn-primary">Cerrar sesión</button>
                        </form>
                    </li> -->
                </ul>
            </nav>
        </div>
    </header>
    <main class="container-md">
        <router-view/>
    </main>
    <footer class="bg-light">
        <div class="container-md">
            <div class="row">
                <div class="col-12">
                    <p class="text-center m-1">&copy Marcos Arcusin - DWT4AV | Portales y Comercio Electrónico</p>
                </div>
            </div>
        </div>
    </footer>
</template>