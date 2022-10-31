<script>
import {logIn, ERROR_MESSAGES} from '../services/auth.js'
export default {
    "name": "LogIn",
    "data": () => ({
        "user": {
            "email": "",
            "password": ""
        },
        "status":{
            type: "success",
            message: ""
        }
    }),
    "methods": {
        "handleSubmit": function() {
            if(!this.user.email || !this.user.password){
                this.status.type = "danger";
                this.status.message = ERROR_MESSAGES['empty_fields'];
                return;
            }
            logIn(this.user.email, this.user.password)
            .then(() =>{
                this.status.type = "success";
                this.status.message = "Se ha iniciado sesión correctamente";
                this.$router.push({name: "profile"});
            }) 
            .catch((error) => {
                this.status.type = "danger";
                this.status.message = ERROR_MESSAGES[error.code] || error.message;
            });
        }
    }
}
</script>

<template>
    <section class="row pt-5 pb-5 align-items-center">
        <h1>Iniciar sesión</h1>
        <div v-if="status.message !== ''" :class="`alert alert-${status.type || info}`">
            {{status.message}}
        </div>
        <form action="" method="POST" @submit.prevent="handleSubmit">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="user.email" class="form-control mb-3" id="email" name="email" placeholder="Email">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" v-model="user.password" class="form-control mb-3" id="password" name="password" placeholder="Contraseña">
            <button type="submit" class="btn btn-primary mb-3">Ingresar</button>
        </form>
   </section>
</template>