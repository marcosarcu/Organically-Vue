<script>

import {getServices} from '../prices/services.js';
import serviceCard from '../assets/components/ServiceCard.vue';

export default {
    name: "Prices",
    components: {serviceCard},
    data: () => ({
        services: []
    }),
    methods: {

    },
    created() {
        getServices().then((docs) => {
            this.services = docs;
        });
    }
}


</script>

<template>
    <section id="precios" class="row pt-5 pb-5 align-items-center g-5">
        <div class="col-md-12">
            <h2 class="text-center">Conocé nuestros planes</h2>
            <article v-for="service in services" class="cards-container">
                <serviceCard :service="service"/>
            </article>
            
        </div>
    </section>
</template>