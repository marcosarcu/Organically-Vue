<script>
    export default{
        'name': 'TestimonialCard',
        props: {
            'name': {
                'type': String,
                'default': 'Nombre'
            },
            'image': {
                'type': String,
                'default': 'default.png'
            },
            'image_alt': {
                'type': String,
                'default': 'Foto del autor del testimonio'
            },
            'text': {
                'type': String,
                'default': 'Texto'
            },
        }
    }

</script>

<template>
    <div class="col-md-6">
        <article class="card">
            <div class="card-body">
                <p class="card-text">"{{text}}"</p>
                <div class="d-flex flex-direction-row gap-2 align-items-center">
                    <img class="testimonialImg" :src="'/imgs/' + image" :alt="image_alt">
                    <p class="card-text">- <b>{{name}}</b></p>
                </div>
            </div>
        </article>
    </div>
</template>

