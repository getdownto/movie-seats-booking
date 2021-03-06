<template>
    <div class="main-container" v-if="filteredMovies">
        <movie-cart
            v-for="movie in filteredMovies"
            :key="movie._id"
            :title="movie.title"
            :image="movie.imageUrl"
            :rating="movie.rating"
            :genre="movie.genre"
        ></movie-cart>
    </div>
</template>

<script>
    import MovieCart from "../movies/MovieCart.vue";
    import movieService from "../../services/movie-service";
    import moment from "moment";
    export default {
        components: { MovieCart },
        props: {
            filter: {
                type: String,
                required: false,
            },
            search: {
                type: String,
                required: false,
            }
        },
        data() {
            return {
                movies: null,
                loading: false,
                filteredMovies: null,
            };
        },
        computed: {},
        watch: {
            filter: function(newVal, oldVal) {
                // watch it
                console.log("Prop changed: ", newVal, " | was: ", oldVal);
                this.filterMovies();
            },
            search: function(newVal, oldVal) {
                // watch it
                console.log("Prop changed: ", newVal, " | was: ", oldVal);
                this.searchMovies(this.search);
            }
        },
        methods: {
            loadAll() {
                this.loading = true;
                movieService.load().then((movies) => {
                    this.movies = movies;
                    this.loading = false;
                    this.filterMovies();
                });
            },
            filterMovies() {
                console.log("received filter", this.filter);
                const now = moment();
                const timelimit = moment(now).add(12, "days");
                if (this.filter === "recent") {
                    const recent = this.movies.filter((m) =>
                        moment(m.startDate).isBefore(timelimit)
                    );
                    this.filteredMovies = recent.slice(0, 7);
                    console.log("filtered recent");
                } else if (this.filter === "popular") {
                    const popular = this.movies.filter((m) => m.rating > 8);
                    this.filteredMovies = popular.slice(0, 7);
                } else if (this.filter === "random") {
                    // Shuffle array
                    const shuffled = this.movies.sort(
                        () => 0.5 - Math.random()
                    );
                    // Get sub-array of first n elements after shuffled
                    this.filteredMovies = shuffled.slice(0, 10);
                } else {
                    this.searchMovies(this.$route.query.search || '')
                }
            },
            searchMovies(search) {
                this.filteredMovies = this.movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
            }
        },
        mounted() {
            this.loadAll();
            console.log(this.filter);
        },
        updated() {
            console.log(this.filter, "updated");
        },
    };
</script>
<style scoped>
    .main-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 90%;
        margin: 1rem auto;
    }
</style>
