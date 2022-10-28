<script>
    export default {
        'name': 'TwoColumnsSection',
        data() {
            return {

            }
        },
        props: {
            'image': {
                'type': String,
                'default': ''
            },
            'image_alt': {
                'type': String,
                'default': 'Imagen'
            },
            'image_position': {
                'type': String,
                'default': 'left'
            },
            'image_size': {
                'type': String,
                'default': 'col-md-6'
            },
            'content_size': {
                'type': String,
                'default': 'col-md-6'
            },
        },
    }

</script>

<template>
    <section class="row pt-5 pb-5 align-items-center">
        <div :class="content_size">
            <slot></slot>
        </div>
        <div :class=" 'd-flex ' +  image_size + (image_position == 'left' ? ' order-first order-md-first' : ' order-first order-md-last ')">
            <img :src="'/imgs/' + image" :alt="image_alt" class="hero-img">
        </div>
    </section>
</template>