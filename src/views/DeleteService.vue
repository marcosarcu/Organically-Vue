<script>
import { deleteService, getServiceById } from '../prices/services';
export default{
    'name': 'DeleteService',
    'data': function(){
        return {
            'service': {
                'name': '',
                'price': 0,
                'description': '',
                'image': '',
                'image_alt': '',
                'short_description': '',
            },
            'status': {
                'type': 'success',
                'message': ''
            }
        }
    },
    'created': function() {
        getServiceById(this.$route.params.id).then((doc) => {
            this.service = doc;
        });
    },
    'methods': {
        'handleDelete': function() {
            deleteService(this.$route.params.id)
            .then(() => {
                this.status.type = 'success';
                this.status.message = 'Se ha eliminado el servicio correctamente';
            })
            .catch((error) => {
                this.status.type = 'danger';
                this.status.message = error.message;
            });
        }
    }
}
</script>
<template>
    <div v-if="status.message !== ''" :class="`alert alert-${status.type || info}`">
        {{status.message}}
        <router-link class="btn btn-primary" to="/admin">Volver al panel de administración</router-link>
    </div>
    <section class="row pt-5 pb-5 align-items-center g-5 flex-md-row flex-column-reverse">
        <div class="btn-container d-flex gap-2 col-md-6 flex-column">
            <h1>Estás seguro que querés eliminar el servicio "{{service.name}}"?</h1>
            <div>
                <router-link to="/admin" class="btn btn-primary mb-2">No, volver</router-link>
            <form action="" method="POST" @submit.prevent="handleDelete">
                <button type="submit" class="btn btn-danger">Sí, eliminar</button>
            </form>
            </div>
        </div>
        <img class="image-fluid col-md-6 " :src="`/imgs/${service.image}`" alt="">
    </section>
</template>
