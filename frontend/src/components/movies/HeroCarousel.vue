<template>
    <div class="hero" v-if="items">
        <div>
            <i
                class="arrow previous"
                @click="moveCarousel(-1)"
                :disabled="atHeadOfList"
            ></i>
        </div>
        <div class="card-carousel">
            <div class="overflow">
                <div
                    class="card-carousel-cards"
                    :style="{
                        transform:
                            'translateX' + '(' + currentOffset + 'px' + ')',
                    }"
                >
                    <carousel-cart
                        v-for="item in items"
                        :key="item._id"
                        :title="item.title"
                        :url="item.imageUrl"
                        :rating="item.rating"
                        :startDate="item.startDate"
                        :endDate="item.endDate"
                        :duration="item.duration"
                    ></carousel-cart>
                </div>
            </div>
        </div>
        <div>
            <i
                class="arrow next"
                @click="moveCarousel(1)"
                :disabled="atEndOfList"
            ></i>
        </div>
    </div>
</template>

<script>
    const paginationFactor = (window.innerWidth * 0.77) / 5;
    import CarouselCart from "./CarouselCart.vue";
    import moment from "moment";
    export default {
        components: { CarouselCart },
        data() {
            return {
                currentOffset: 0,
                windowSize: 5,
                paginationFactor: paginationFactor,
                items: null,
                loading: false,
            };
        },
        computed: {
            atEndOfList() {
                return (
                    this.currentOffset <=
                    this.paginationFactor *
                        -1 *
                        (this.items.length - this.windowSize)
                );
            },
            atHeadOfList() {
                return this.currentOffset === 0;
            },
        },
        methods: {
            moveCarousel(direction) {
                // Find a more elegant way to express the :style. consider using props to make it truly generic
                if (direction === 1 && !this.atEndOfList) {
                    this.currentOffset -= this.paginationFactor;
                } else if (direction === -1 && !this.atHeadOfList) {
                    this.currentOffset += this.paginationFactor;
                }
            },
            getMovies() {
                this.loading = true;
                const start = moment();
                const end = moment(start).add(7, "days");
                fetch("http://localhost:9999/api/movie/").then((res) => {
                    res.json().then((data) => {
                        this.loading = false;
                        const thisWeeks = data.filter(
                            (d) =>
                                moment(d.startDate).isBetween(start, end) ||
                                moment(d.endDate).isBetween(start, end) ||
                                moment(d.startDate).isSame(start) ||
                                moment(d.endDate).isSame(end) ||
                                moment(start).isBetween(d.startDate, d.endDate) ||
                                moment(end).isBetween(d.startDate, d.endDate)
                        );
                        this.items = thisWeeks
                    });
                });
            },
        },
        mounted() {
            this.getMovies();
        },
    };
</script>

<style scoped>
    .hero {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 80%;
        margin: auto;
    }

    .card-carousel {
        display: flex;
        justify-content: center;
    }

    .overflow {
        overflow: hidden;
    }

    .card-carousel-cards {
        display: flex;
        transition: transform 150ms ease-out;
        transform: translatex(0px);
    }

    .arrow {
        border: solid rgb(245, 245, 245);
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 7px;
        cursor: pointer;
    }

    .next {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .previous {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }
</style>

// [ // { // name: "Kin Khao", // rating: 8.3, // duration: 90, // startDate:
"17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-photo/women-sitting-sofa-staring-while-watching-television_23-2147894375.jpg",
// }, // { // name: "Jū-Ni", // rating: 9.2, // duration: 90, // startDate:
"17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg",
// }, // { // name: "Delfina", // rating: 7.9, // duration: 90, // startDate:
"17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-vector/abstract-poster-template-with-elegant-landscape_1361-2207.jpg",
// }, // { // name: "San Tung", // rating: 4.8, // duration: 90, // startDate:
"17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-photo/attractive-young-caucasian-couple-watching-film-movie-theater-house-cinema_155003-19102.jpg",
// }, // { // name: "Anchor Oyster Bar", // rating: 7.6, // duration: 90, //
startDate: "17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-photo/front-view-young-female-holding-popcorn-red-desk_140725-66237.jpg",
// }, // { // name: "Locanda", // rating: 5.3, // duration: 90, // startDate:
"17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-photo/woman-eating-popcorn-while-watching-movie-laptop_23-2148860647.jpg",
// }, // { // name: "Garden Creamery", // rating: 8.7, // duration: 90, //
startDate: "17th Feb 2021", // endDate: "28th Feb 2021", // url: //
"https://image.freepik.com/free-photo/smiling-couple-watching-film-bed_23-2147771152.jpg",
// }, // ],
