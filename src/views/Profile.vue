<script>
    import { subscribeToAuthChanges, updateUserProfile } from '../services/auth';
    import HeroSection from '../assets/components/HeroSection.vue';
    import StatusBar from '../assets/components/StatusBar.vue';
    export default {
        'name': 'Profile',
        'components': { HeroSection, StatusBar },
        'data': function () {
            return {
                'user': {
                    'email': null,
                    'uid': null,
                    'displayName': null,
                },
                'status': {
                    'type': 'success',
                    'message': ''
                },
                unsuscribeFn: () => {},
            };
        },
        'mounted': function () {
            this.unsuscribeFn = subscribeToAuthChanges(user => this.user = user);
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
            }
        }
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
</template>
