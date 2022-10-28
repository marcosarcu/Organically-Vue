<script>
import {addService, getServices} from '../prices/services.js'
import { Skeletor } from 'vue-skeletor';
    export default {
        name: 'Admin',
        components: {Skeletor},
        data() {
            return {
                newService: {
                    name: '',
                    price: 0,
                    description: '',
                    image: '',
                    image_alt: '',
                    short_description: '',
                },
                status: {
                    type: 'success',
                    message: ''
                },
                showAddForm: false,
                services: [],
                
            }
        },
        created() {
            getServices().then((docs) => {
                this.services = docs;
            });
        },
        methods: {
            handleAdd() {
                if (this.newService.name === '' || this.newService.price === 0 || this.newService.description === '' || this.newService.image === '' || this.newService.image_alt === '' || this.newService.short_description === '') {
                    this.status.type = 'danger';
                    this.status.message = 'Todos los campos son obligatorios';
                    return
                }
                
                addService(this.newService)

                
                this.newService = {
                    name: '',
                    price: 0,
                    description: '',
                    image: '',
                    image_alt: '',
                    short_description: '',
                }
            },
            toggleAddForm() {
                this.showAddForm = !this.showAddForm;
            }
        },
        computed: {
            isLoading() {
                return this.services.length === 0;
            }
        }
    }
</script>

<template>
    <div class="row pt-5 pb-5 align-items-center g-5">
        <h1 class="text-center">Administrar servicios</h1>
        <div class="row">
            <a href="#" @click.prevent="toggleAddForm" class="btn btn-primary centerbtn">{{!showAddForm ? 'Nuevo Servicio' : 'Cerrar'}}</a>
        </div>
        <div v-if="showAddForm" class="admin__form col-md-6 bg-light p-5">
            <div v-if="status.message !== ''" :class="`alert alert-${status.type || info}`">
                {{status.message}}
            </div>
            <form @submit.prevent="handleAdd">
                <div class="mb-3">
                    <label class="form-label" for="name">Nombre</label>
                    <input class="form-control" name="name" id="name" type="text" v-model="newService.name" placeholder="Nombre del servicio">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="image">Imagen</label>
                    <input class="form-control" name="image" id="image" type="text" v-model="newService.image" placeholder="Imagen del servicio">
                </div>
                <div class="mb-3">
                    <label for="image_alt" class="form-label">Texto alternativo de imagen.</label>
                    <input type="text" class="form-control" id="image_alt" name="image_alt" v-model="newService.image_alt" placeholder="Texto alternativo de imagen">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Precio</label>
                    <input type="number" step=".01" class="form-control" id="price" name="price" v-model="newService.price" placeholder="Service price">
                </div>
                <div class="mb-3">
                    <label for="short_description" class="form-label">Descripción corta</label>
                    <input type="text" class="form-control" id="short_description" name="short_description" v-model="newService.short_description" placeholder="Descripción corta">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Descripción</label>
                    <textarea class="form-control" id="description" name="description" v-model="newService.description" placeholder="Descripción"></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Agregar Servicio</button>
            </form>
        </div>

        <!-- To Do: Cambiar tabla por cards, usando componentes.  -->
        <table class="table table-responsive-md table-hover mb-5">
            <thead>
                <tr class="align-items-center">
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isLoading">
                    <tr v-for="i in 3">
                        <td v-for="i in 4"><Skeletor width="70%" height="125px"></Skeletor></td>
                    </tr>
                </template>
                
                <tr v-for="service in services" class="align-items-center">
                    <td><img class="admin-img" :src="`./imgs/${service.image}`" :alt="service.image_alt"></td>
                    <td><p>{{service.name}}</p></td>
                    <td><p>${{service.price}}</p></td>
                    <td>
                        <div class="d-grid">
                            <router-link :to="`/admin/edit/${service.id}`" class="btn btn-primary mb-2">Editar</router-link>
                            <router-link :to="`/admin/delete/${service.id}`" class="btn btn-danger">Eliminar</router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>