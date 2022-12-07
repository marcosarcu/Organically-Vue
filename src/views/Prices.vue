<script>

import {getServices} from '../prices/services.js';
import serviceCard from '../assets/components/ServiceCard.vue';
import { Skeletor } from 'vue-skeletor';
import StatusBar from '../assets/components/StatusBar.vue';

export default {
    name: "Prices",
    components: {serviceCard, Skeletor, StatusBar},
    data: () => ({
        services: [],
        status: {
            type: 'success',
            message: ''
        }
    }),
    methods: {
        alert(message) {
            this.status.type = 'warning';
            this.status.message = message;
        },
        success(message) {
            this.status.type = 'success';
            this.status.message = message;
        }
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
            <StatusBar :type="status.type" :message="status.message"/>
            <h1 class="text-center">Conocé nuestros planes</h1>
            <article class="cards-container">
                <serviceCard v-for="service in services" :service="service" @alert="alert" @success="success"/>
                <Skeletor height="500px" width="100%" v-for="i in 3" v-if="loading" class=""></Skeletor>
            </article>
        </div>
    </section>
</template>