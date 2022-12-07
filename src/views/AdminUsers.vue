<script>
import { getUsers } from '../services/user-profiles';
import { getServiceById } from '../prices/services';
import { Skeletor } from 'vue-skeletor';

export default {
    name: 'AdminUsers',
    components: {Skeletor},
    data() {
        return {
            users: [],
            status: {
                type: 'success',
                message: ''
            },
        }
    },
    created() {
        getUsers().then((docs) => {
            this.users = docs;
        }).then(() => {
            this.users.forEach((user) => {
                if(!user.contractedServiceId) return;
                getServiceById(user.contractedServiceId).then((doc) => {
                    user.contractedService = doc;
                });
            });
        });

    },
    methods: {

    },
    computed: {
        isLoading() {
            return this.users.length === 0;
        }
    }
}

</script>

<template>
    <div class="row pt-5 pb-5 align-items-center g-5">
        <h1 class="text-center">Administrar Usuarios</h1>
        <div class="col-md-12">
            <StatusBar :type="status.type" :message="status.message"/>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre de usuario</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Email</th>
                        <th scope="col">Servicio contratado</th>
                    </tr>
                </thead>
                <tbody v-if="isLoading">
                    <tr v-for="i in 3">
                        <td v-for="i in 4">
                            <Skeletor :height="30" :width="100" />
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!isLoading">
                    <tr v-for="user in users" :key="user.uid">
                        <td>{{user.displayName ? user.displayName : "No disponible"}}</td>
                        <td>{{user.userRole}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.contractedService ? user.contractedService.name : "No tiene servicio contratado"}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>