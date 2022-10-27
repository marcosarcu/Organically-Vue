<template>
    <div class="card">
        <img class="card-img-top" :src="`./imgs/${service.image}`" :alt="service.image_alt">
        <div class="card-body">
            <h3 class="card-title">{{service.name}}</h3>
            <p>{{service.description}}</p>
            <div class="price">${{service.price}}</div>
            <div class="btn-container d-flex gap-2">
                <a href="" class="btn btn-primary">Empezá Ya</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "serviceCard",
    data: () => ({   
    }),
    props: ['service']
}
</script>