<template>
    <h2>On Screen This Week</h2>
    <hero-carousel></hero-carousel>
    <section class="welcome">
        <h3>Your best-ever movie experience is only threee steps away.</h3>
        <div class="icons-container">
            <div class="icons-cart">
                <i class="fas fa-film"></i>
                <p>Pick a movie</p>
            </div>
            <div class="icons-cart">
                <i class="fas fa-ticket-alt"></i>
                <p>Choose your seats</p>
            </div>
            <div class="icons-cart">
                <i class="fab fa-gratipay"></i>
                <p>Enjoy the movie</p>
            </div>
        </div>
        <div class="center-btn">
            <base-btn class="outline-blue"
                >Discover Movies <i class="fas fa-arrow-right"></i
            ></base-btn>
        </div>
    </section>
    <section class="movies-list">
        <secondary-nav @selected="setFilter"></secondary-nav>
        <movie-list :filter="filter()"></movie-list>
        <div class="center-btn">
            <base-btn link to="/all"
                >see all <i class="fas fa-arrow-right"></i
            ></base-btn>
        </div>
    </section>
</template>

<script>
    import MovieList from "../components/layout/MovieList.vue";
    import SecondaryNav from "../components/layout/SecondaryNav.vue";
    import HeroCarousel from "../components/movies/HeroCarousel.vue";
    export default {
        components: { HeroCarousel, SecondaryNav, MovieList },
        data() {
            return {
                selectedFilter: 'random',
            };
        },
        computed: {},
        methods: {
            setFilter(e) {
                this.selectedFilter = e;
                console.log("emitted in home", this.selectedFilter);
            },
            filter() {
                return this.selectedFilter;
            },
        },
    };
</script>

<style scoped>
    h2 {
        font-size: 2.2rem;
        color: #e95d6b;
        font-weight: 100;
        text-align: center;
        margin-top: 2rem;
    }

    .movies-list {
        border-top: 1px solid #2a3454;
        padding: 3rem 0;
    }

    .center-btn {
        text-align: center;
    }

    i {
        margin-left: 5px;
    }

    .welcome {
        color: #fff;
        text-align: center;
        background-color: rgba(11, 38, 88, 0.603);
        padding: 2rem;
        border-top: 1px solid #2a3454;
    }

    .welcome h3 {
        font-size: 1.2rem;
        font-weight: 300;
        text-transform: uppercase;
    }

    .icons-container {
        display: flex;
        justify-content: space-between;
        max-width: 40%;
        margin: 3rem auto;
        color: #fff;
    }

    .icons-cart {
        flex-basis: 33%;
    }

    .icons-cart i {
        font-size: 3rem;
        color: rgb(66, 194, 245);
        margin-bottom: 1rem;
    }
</style>
