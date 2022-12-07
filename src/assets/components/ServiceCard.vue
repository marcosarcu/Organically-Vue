<template>
    <div class="card">
        <img class="card-img-top" :src="`./imgs/${service.image}`" :alt="service.image_alt">
        <div class="card-body">
            <h3 class="card-title">{{service.name}}</h3>
            <p>{{service.description}}</p>
            <div class="price">${{service.price}} <small>por mes</small></div>
            <div class="btn-container d-flex gap-2">
                <form action="POST" @submit="handleSubmit">
                    <input type="hidden" name="contractedServiceId" :value="service.id">
                    <button type="submit" class="btn btn-primary">Contratar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {updateUserService} from '../../services/user-profiles.js';
import {subscribeToAuthChanges} from '../../services/auth.js';
export default {
    name: "serviceCard",
    data: () => ({   
        user: null,
        unsubscribeAuthFn: () => { },
    }),
    props: ['service'],
    mounted() {
        this.unsubscribeAuthFn = subscribeToAuthChanges((user) => {
            this.user = user;
        });
    },
    unmounted() {
        this.unsubscribeAuthFn();
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            const contractedServiceId = e.target.contractedServiceId.value;
            if(this.user.uid === null){
                this.$emit('alert', 'Debes estar logueado para contratar un servicio');
                return;
            }
            updateUserService(this.user.uid, contractedServiceId).then(() => {
                this.$emit('success', 'Servicio contratado con exito, gracias por confiar en nosotros');
            });
        }
    }
}
</script>