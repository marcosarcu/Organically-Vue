<script>
import HeroSection from '../assets/components/HeroSection.vue';
import TwoColumnsSection from '../assets/components/TwoColumnsSection.vue';
import TestimonialCard from '../assets/components/TestimonialCard.vue';

export default {
    name: "Home",
    components: {
        HeroSection,
        TwoColumnsSection,
        TestimonialCard

    }
}



</script>

<template>
    
    <HeroSection
    title="Administrar redes sociales nunca fue tan fácil"
    image="hero.svg"
    image_alt="Ilustración de un celular con una campaña de marketing"
    >
        <p class="lead">Sabemos lo dificil que puede ser gestionar las diferentes redes sociales de una marca. Por eso te venimos a ayudar.</p>
        <router-link to="/register" class="btn btn-primary">Empeza ya</router-link>
    </HeroSection>

    <TwoColumnsSection
    image="manage.svg"
    image_alt="Ilustración de unas macetas con iconos de redes sociales siendo regadas" 
    image_position="left"
    >
    <h2>Gestioná todas tus redes desde un solo lugar</h2>
            <p>Desde nuestra plataforma podrás administrar todos tus perfiles desde un mismo lugar. Tendrás acceso a una
                <b>bandeja de entrada unificada y podrás programar contenido en todos tus perfiles facilmente.</b>
            </p>
            <div class="btn-container d-flex ">
                <router-link to="/precio" class="btn btn-primary">Empezá Ya</router-link>
            </div>
    </TwoColumnsSection>

    <TwoColumnsSection
    image="help.svg"
    image_alt="Ilustración de una flecha en ascenso con una persona ayudando a otra a subir." 
    image_position="right"
    >
        <h2>Obtené la ayuda y asesoramiento de expertos</h2>
            <p>Nuestro sistema es <b>muy fácil de usar y esta repleto de tips para ayudarte a crecer más rapido.</b></p>
            <p>Además, tendrás acceso a nuestro <b>equipo de expertos que estan para ayudarte con cualquier duda.</b>
            </p>
            <div class="btn-container d-flex">
                <router-link to="/precio" class="btn btn-primary">Empezá Ya</router-link>
            </div>
    </TwoColumnsSection>


    <section id="precios" class="row pt-5 pb-5 mt-5 mb-5 align-items-center cta">
        <div class="col-md-12">
            <h2 class="text-center">Conocé nuestros planes</h2>
            <p class="text-center">Tenemos planes para todos los bolsillos. Elige el que más se adapte a tus
                necesidades.</p>
            <router-link class="btn btn-primary centerbtn" to="/precio">Ver opciones</router-link>
        </div>
    </section>

    <section class="row pt-5 pb-5 align-items-center">
        <div class="col-md-12">
            <h2 class="text-center">¿Qué dicen nuestros clientes?</h2>
            <p class="text-center">Estos son algunos de los comentarios que nuestros clientes nos han dejado.</p>
            <div class="container-fluid testimonial-container">
                <div class="row">
                    <TestimonialCard
                    name="Juan Perez"
                    image="juanperez.jpg"
                    image_alt="Foto de Juan Perez"
                    text="Me encanta esta plataforma. Es muy fácil de usar y me ayuda a gestionar mis redes sociales de una manera muy sencilla."
                    />
                    <TestimonialCard
                    name="Carla Rodriguez"
                    image="carlarodriguez.jpg"
                    image_alt="Foto de Carla Rodriguez"
                    text="Gracias a Organically pude crecer orgánicamente y aumentar mis ventas"
                    />
                </div>
            </div>
        </div>
    </section>


</template>
