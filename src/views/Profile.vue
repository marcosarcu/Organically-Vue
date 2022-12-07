<script>
    import { subscribeToAuthChanges, updateUserProfile } from '../services/auth';
    import HeroSection from '../assets/components/HeroSection.vue';
    import StatusBar from '../assets/components/StatusBar.vue';
    import {getUserProfile, updateUserService} from '../services/user-profiles.js';
    import {getServiceById} from '../prices/services.js';
    import { Skeletor } from 'vue-skeletor';

    export default {
        'name': 'Profile',
        'components': { HeroSection, StatusBar, Skeletor },
        'data': function () {
            return {
                'user': {
                    'email': null,
                    'uid': null,
                    'displayName': null,
                    'userRole': null,
                    'contractedServiceId': null,
                },
                'status': {
                    'type': 'success',
                    'message': ''
                },
                unsuscribeFn: () => {},
                'contractedService': null,
            };
        },
        'mounted': function () {
            this.unsuscribeFn = subscribeToAuthChanges(user => this.user = user);
            getUserProfile(this.user.uid).then((user) => {
                this.user = user;
                getServiceById(this.user.contractedServiceId).then((service) => {
                    this.contractedService = service;
                });
            });
        },
        'unmounted': function () {
            this.unsuscribeFn();
        },
        'methods': {
            'handleSubmit': function () {
                updateUserProfile(this.user.displayName).then(() => {
                    if(this.user.displayName === ''){
                        this.status.type = 'danger';
                        this.status.message = 'El campo nombre es obligatorio';
                        return;
                    }
                    this.status.type = 'success';
                    this.status.message = 'Perfil actualizado';
                }).catch((error) => {
                    this.status.type = 'danger';
                    this.status.message = error ? error : 'Error al actualizar el perfil';
                });
            },
            cancel: function () {
                updateUserService(this.user.uid, null).then(() => {
                    this.status.type = 'success';
                    this.status.message = 'Servicio cancelado';
                    this.user.contractedServiceId = null;
                    this.contractedService = null;
                }).catch((error) => {
                    this.status.type = 'danger';
                    this.status.message = error ? error : 'Error al cancelar el servicio';
                });
            },
        },

    }
</script>

<template>
    <HeroSection 
    :title="`¡Bienvenido a tu perfil${user.displayName ? ', ' + user.displayName : ''}!`"
    image="hero.svg"
    image_alt="Ilustración de un celular con una campaña de marketing"
    >
        <p class="lead">Aquí podrás ver tus datos y editarlos.</p>
        <StatusBar :type="status.type" :message="status.message" />
        <form action="POST" @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="user.email" class="form-control" id="email" disabled>
            </div>
            <div class="mb-3">
                <label for="displayName" class="form-label">Nombre de usuario</label>
                <input type="text" v-model="user.displayName" class="form-control" placeholder="Nombre de usuario" id="displayName">
            </div>
            <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
    </HeroSection>
    <section class="row pb-5 pt-3 align-items-center">
        <div class="col-12">
            <h2 class="text-center">Servicios contratados</h2>
            <Skeletor class="col-6 m-auto" v-if="!contractedService" :height="700" :width="700" />
            <article v-if="contractedService" class="card col-6 m-auto">
                <img class="card-img-top" :src="`./imgs/${contractedService.image}`" :alt="contractedService.image_alt">
                <div class="card-body">
                    <h3 class="card-title text-center">{{contractedService.name}}</h3>
                    <p class="card-text text-center">{{contractedService.short_description}}</p>
                    <div class="price text-center">${{contractedService.price}} <small>por mes</small></div>
                    <div class="m-auto d-flex align-items-center justify-content-center">
                        <a class="btn btn-danger m-2" @click="cancel">Cancelar servicio</a>
                        <router-link class="btn btn-primary m-2" to="/chat/nkzCGlwFmZMkxIJLZROxgAcNOGS2/">Solicitar ayuda</router-link>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
