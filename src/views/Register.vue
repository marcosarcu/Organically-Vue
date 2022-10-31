<script>
import {register, ERROR_MESSAGES} from '../services/auth.js'
export default {
    "name": 'Register',
    "data": () => ({
        "user": {
            "email": "",
            "password": "",
            "password_confirmation": ""
        },
        "status":{
            type: "success",
            message: ""
        }
    }),
    methods: {
        "handleRegister": function() {
            if(!this.user.email || !this.user.password || !this.user.password_confirmation){
                this.status.type = "danger";
                this.status.message = ERROR_MESSAGES['empty_fields'];
                return;
            }
            if(this.user.password !== this.user.password_confirmation){
                this.status.type = "danger";
                this.status.message = ERROR_MESSAGES['passwords_not_match'];
                return;
            }
            register(this.user.email, this.user.password)
            .then(() => {
                this.status.type = "success";
                this.status.message = "Usuario registrado correctamente";
                this.$router.push({name: "profile"});
            })
            .catch(error => {
                this.status.type = "danger";
                this.status.message = ERROR_MESSAGES[error.code] || error.message;
            });
        }
    }
}
</script>

<template>
    
    <section class="row pt-5 pb-5 align-items-center">
        <h1>Registrarse</h1>
        
        <div v-if="status.message !== ''" :class="`alert alert-${status.type || info}`">
            {{status.message}}
        </div>

        <form action="" method="POST" @submit.prevent="handleRegister">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="user.email" class="form-control mb-3" id="email" name="email" placeholder="Email">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" v-model="user.password" class="form-control mb-3" id="password" name="password" placeholder="Contraseña">
            <label for="password_confirmation" class="form-label">Confirmar contraseña</label>
            <input type="password" v-model="user.password_confirmation" class="form-control mb-3" id="password_confirmation" name="password_confirmation" placeholder="Contraseña">
            <button type="submit" class="btn btn-primary mb-3">Registrarse</button>
        </form>
   </section>
        
    
</template>