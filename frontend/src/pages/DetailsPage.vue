<template>
    <div v-if="movie">
        <div class="details-container">
            <div class="details-pic">
                <img
                    :src="movie.imageUrl"
                    :alt="movie.title"
                />
            </div>
            <div class="details-content">
                <h2>{{movie.title}}</h2>
                <ul>
                    <li v-for="item in movie.genre" :key="item">{{item}}</li>
                </ul>
                <p class="overview">
                    {{movie.overview}}
                </p>
                <div class="info">
                    <div class="info-icons">
                        <div class="duration">
                            <i class="far fa-clock"></i> {{movie.duration}} min
                        </div>
                        <div class="rating">
                            <i class="far fa-star"></i> {{movie.rating}}/10
                        </div>
                    </div>
                    <div class="user-rating" v-if="!rated">
                        <p>Rate this movie:</p>
                        <div class="star">
                            <i
                                v-for="index in 10"
                                :key="index"
                                :class="['fas', 'fa-star', `s${index}`, {active: rated && userRating <= index}]"
                                @click="setRating(index)"
                            ></i>
                        </div>
                    </div>
                    <p v-else class="thank-you">Thank you for your vote!</p>
                </div>
                <base-btn>Book a seat</base-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseBtn from "../components/base/BaseBtn.vue";
    import movieService from "../services/movie-service";
    export default {
        components: { BaseBtn },
        data() {
            return {
                userRating: 0,
                rated: false,
                movie: null
            }
        },
        methods: {
            setRating(i) {
                console.log(i, 'index');
                this.userRating =  i
                this.rated = true
            },
            getMovieData() {
                const id = this.$route.params.id
                movieService.details(id).then((movie) => {
                    this.movie = movie;
                });
            }
        },
        computed: {
            rating() {
                return 11 - this.userRating
            }
        },
        mounted() {
            this.getMovieData()
        },
        updated() {
            console.log(this.rating);
        }
    };
</script>

<style scoped>
    .details-container {
        display: flex;
        max-width: 80%;
        margin: 2rem auto;
    }

    .details-pic {
        flex-basis: 25%;
        height: 57vh;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
    }

    .details-content {
        flex-basis: 50%;
        color: rgba(255, 255, 255);
        margin-left: 5%;
    }

    h2,
    i {
        color: #e95d6b;
    }

    ul {
        display: flex;
        margin-top: 1rem;
    }

    li {
        list-style: none;
        margin-right: 1rem;
        color: rgb(37, 166, 218);
        border: 1px solid rgb(37, 166, 218);
        padding: 0.1rem 0.6rem;
        border-radius: 30px;
        margin-right: 0.3rem;
        font-size: 0.9rem;
    }

    .overview {
        margin-top: 2rem;
        font-weight: 300;
        font-size: 1.1rem;
    }

    .info {
        display: flex;
        justify-content: space-between;
        margin: 3rem 0;
    }

    .info-icons {
        display: flex;
    }

    .rating,
    .duration {
        margin-right: 3rem;
    }

    .user-rating {
        display: flex;
        justify-self: flex-end;
    }

    .thank-you {
        transition: all 0.3s;
        color: rgb(37, 166, 218);
    }

    .star {
        display: flex;
        margin-left: 1rem;
        direction: rtl;
    }

    .star i {
        color: rgba(255, 255, 255, 0.322);
        transition: all 0.3s;
    }

    .star i:hover {
        color: #e95d6b;
    }

    .s1:hover ~ i {
        color: #e95d6b;
    }
    .s2:hover ~ i {
        color: #e95d6b;
    }
    .s3:hover ~ i {
        color: #e95d6b;
    }
    .s4:hover ~ i {
        color: #e95d6b;
    }
    .s5:hover ~ i {
        color: #e95d6b;
    }

    .s6:hover ~ i {
        color: #e95d6b;
    }
    .s7:hover ~ i {
        color: #e95d6b;
    }
    .s8:hover ~ i {
        color: #e95d6b;
    }
    .s9:hover ~ i {
        color: #e95d6b;
    }
    .s10:hover ~ i {
        color: #e95d6b;
    }

    .active {
        color: #e95d6b !important;
    }
</style>
