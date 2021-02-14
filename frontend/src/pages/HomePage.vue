<template>
    <h2>On screen now</h2>
    <hero-carousel></hero-carousel>
    <div class="container">
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
        <movie-cart></movie-cart>
    </div>
</template>

<script>
import HeroCarousel from '../components/movies/HeroCarousel.vue'
import MovieCart from '../components/movies/MovieCart.vue'
    export default {
  components: { MovieCart, HeroCarousel },

    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        max-width: 90%;
        margin: auto;
    }
</style>