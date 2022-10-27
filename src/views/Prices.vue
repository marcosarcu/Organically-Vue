<script>

import {getServices} from '../prices/services.js';
import serviceCard from '../assets/components/ServiceCard.vue';
import { Skeletor } from 'vue-skeletor';

export default {
    name: "Prices",
    components: {serviceCard, Skeletor},
    data: () => ({
        services: []
    }),
    methods: {

    },
    created() {
        getServices().then((docs) => {
            this.services = docs;
        });
    },
    computed: {
        loading() {
            return this.services.length === 0;
        }
    }
}


</script>

<template>
    <section id="precios" class="row pt-5 pb-5 align-items-center">
        <div class="col-md-12">
            <h2 class="text-center">Conocé nuestros planes</h2>
            <article class="cards-container">
                <serviceCard v-for="service in services" :service="service"/>
                <Skeletor height="500px" width="100%" v-for="i in 3" v-if="loading" class=""></Skeletor>
            </article>
        </div>
    </section>
</template>