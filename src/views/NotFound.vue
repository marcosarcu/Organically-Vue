<template>
    <section class="pt-5 pb-5">
        <h1 class="text-center">No se ha encontrado la página solicitada</h1>
        <div class="text-center">
            <router-link to="/" class="btn btn-primary">Volver al inicio</router-link>
        </div>
    </section>
</template>

<script>
export default{
    name: "NotFound",
    data(){
        return{

        }
    },
}

</script>