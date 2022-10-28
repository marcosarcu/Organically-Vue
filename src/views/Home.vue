<template>
    <section class="row pt-5 pb-5 align-items-center g-5">
        <div class="col-md-6">
            <h1>Administrar redes sociales nunca fue tan fácil</h1>
            <p>Sabemos lo dificil que puede ser gestionar las diferente redes sociales de una marca. Por eso te venimos
                a ayudar.</p>
            <p>Con nuestra plataforma vas a poder gestionar tus redes sociales de una manera sencilla y rápida.</p>
            <div class="btn-container d-flex gap-2">
                <router-link to="/precio" class="btn btn-primary">Empezá Ya</router-link>
            </div>
        </div>
        <div class="col-md-6 order-first order-md-last d-flex">
            <img src="/imgs/hero.svg" alt="" class="hero-img">
        </div>
    </section>

    <section id="more" class="row pt-5 pb-5 align-items-center g-5">
        <div class="col-md-6">
            <h2>Gestioná todas tus redes desde un solo lugar</h2>
            <p>Desde nuestra plataforma podrás administrar todos tus perfiles desde un mismo lugar. Tendrás acceso a una
                <b>bandeja de entrada unificada y podrás programar contenido en todos tus perfiles facilmente.</b></p>
            <div class="btn-container d-flex gap-2">
                <router-link to="/precio" class="btn btn-primary">Empezá Ya</router-link>
            </div>
        </div>
        <div class="col-md-6 order-first order-md-first d-flex">
            <img src="/imgs/manage.svg" alt="" class="hero-img">
        </div>
    </section>

    <section class="row pt-5 pb-5 align-items-center g-5">
        <div class="col-md-6">
            <h2>Obtené la ayuda y asesoramiento de expertos</h2>
            <p>Nuestro sistema es <b>muy fácil de usar y esta repleto de tips para ayudarte a crecer más rapido.</b></p>
            <p>Además, tendrás acceso a nuestro <b>equipo de expertos que estan para ayudarte con cualquier duda.</b>
            </p>
            <div class="btn-container d-flex gap-2">
                <router-link to="/precio" class="btn btn-primary">Empezá Ya</router-link>
            </div>
        </div>
        <div class="col-md-6 order-first order-md-last d-flex">
            <img src="/imgs/help.svg" alt="" class="help-img">
        </div>
    </section>

    <section id="precios" class="row pt-5 pb-5 align-items-center g-5">
        <div class="col-md-12">
            <h2 class="text-center">Conocé nuestros planes</h2>
            <p class="text-center">Tenemos planes para todos los bolsillos. Elige el que más se adapte a tus
                necesidades.</p>
            <router-link class="btn btn-primary centerbtn" to="/precio">Ver opciones</router-link>
        </div>



    </section>

    <section class="row pt-5 pb-5 align-items-center g-5">
        <div class="col-md-12">
            <h2 class="text-center">¿Qué dicen nuestros clientes?</h2>
            <p class="text-center">Estos son algunos de los comentarios que nuestros clientes nos han dejado.</p>
            <div class="container-fluid testimonial-container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">"Me encanta esta plataforma. Es muy fácil de usar y me ayuda a
                                    gestionar mis redes sociales de una manera muy sencilla."</p>
                                <p class="card-text">- Juan Perez</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">"Gracias a Organically pude crecer orgánicamente y aumentar mis
                                    ventas"</p>
                                <p class="card-text">- Carla Rodriguez</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


</template>

<script>
export default {
    name: "Home"
}


</script>