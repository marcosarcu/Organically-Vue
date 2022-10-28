<script>
export default {
    name: "HeroSection",
    data: () => ({
        // ...
    }),
    methods: {
        // ...
    },
    props: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        image_alt: {
            type: String,
            required: true
        },
    },
}
</script>


<template>
    <section class="row pb-5 pt-3 align-items-center">
        <div class="col-md-6">
            <h1>{{title}}</h1>
            <slot></slot>
        </div>
        <div class="col-md-6 order-first order-md-last d-flex">
            <img :src="`/imgs/${image}`" :alt="image_alt" class="hero-img">
        </div>
    </section>
</template>