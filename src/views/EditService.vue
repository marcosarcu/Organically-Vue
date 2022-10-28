<script>
import { getServiceById, updateService } from '../prices/services.js'
    export default{
        'name': 'EditService',
        'data': () => ({
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
        }),
        'created': function() {
            getServiceById(this.$route.params.id).then((doc) => {
                this.service = doc;
            });
        },
        'methods': {
            'handleUpdate': function() {
                if (this.service.name === '' || this.service.price === 0 || this.service.description === '' || this.service.image === '' || this.service.image_alt === '' || this.service.short_description === '') {
                    this.status.type = 'danger';
                    this.status.message = 'Todos los campos son obligatorios';
                    return
                }
                updateService(this.$route.params.id, this.service)
                .then(() => {
                    this.status.type = 'success';
                    this.status.message = 'Se ha actualizado el servicio correctamente';
                })
                .catch((error) => {
                    this.status.type = 'danger';
                    this.status.message = error;
                });
            }
        }
    }
</script>

<template>
    <div class="row pt-5 pb-5 align-items-center g-5">
        <h1>Editar Servicio</h1>
        <div>
            <div v-if="status.message !== ''" :class="`alert alert-${status.type || info}`">
            {{status.message}}
            </div>
            <form action="" method="POST" @submit.prevent="handleUpdate">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" v-model="service.name" class="form-control mb-3" id="name" name="name" placeholder="Nombre">
                <label for="price" class="form-label">Precio</label>
                <input type="number" step="0.01" v-model="service.price" class="form-control mb-3" id="price" name="price" placeholder="Precio">
                <label for="description" class="form-label">Descripción</label>
                <textarea v-model="service.description" class="form-control mb-3" id="description" name="description" placeholder="Descripción"></textarea>
                <label for="image" class="form-label">Imagen</label>
                <input type="text" v-model="service.image" class="form-control mb-3" id="image" name="image" placeholder="Imagen">
                <label for="image_alt" class="form-label">Texto Alternativo de la Imagen</label>
                <input type="text" v-model="service.image_alt" class="form-control mb-3" id="image_alt" name="image_alt" placeholder="Texto Alternativo de la Imagen">
                <label for="short_description" class="form-label">Descripción Corta</label>
                <textarea v-model="service.short_description" class="form-control mb-3" id="short_description" name="short_description" placeholder="Descripción Corta"></textarea>
                <button type="submit" class="btn btn-primary mb-3">Guardar</button>
            </form>
        </div>
    </div>
</template>