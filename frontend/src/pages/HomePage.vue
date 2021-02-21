<template>
    <h2>On Screen This Week</h2>
    <hero-carousel></hero-carousel>
    <section class="movies-list">
        <secondary-nav></secondary-nav>
        <div class="main-container">
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
            <movie-cart></movie-cart>
        </div>
    </section>
</template>

<script>
    import SecondaryNav from "../components/layout/SecondaryNav.vue";
    import HeroCarousel from "../components/movies/HeroCarousel.vue";
    import MovieCart from "../components/movies/MovieCart.vue";
    export default {
        components: { MovieCart, HeroCarousel, SecondaryNav },
    };
</script>

<style scoped>
    .main-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 90%;
        margin: 1rem auto;
    }

    h2 {
        font-size: 2.2rem;
        color: #e95d6b;
        font-weight: 100;
        text-align: center;
        margin-top: 2rem;
    }

    .movies-list {
        border-top: 1px solid #2a3454;
        margin-top: 1rem;
        padding: 3rem 0;
    }

</style>
