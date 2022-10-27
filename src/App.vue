<script>
import router from './router/router';
import NavBar from './assets/components/NavBar.vue';
import { subscribeToAuthChanges } from './services/auth';
export default {
    name: "App",
    components: { router, NavBar },
    data: () => ({
        // user : {
        //     email: null,
        //     uid: null
        // },
    }),
    mounted() {
        // subscribeToAuthChanges((user) => {
        //     this.user = user;
        // });
    },
};
</script>

<template>
    <header class="navbar navbar-expand-lg navbar-light bg-light">
        <NavBar/>
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