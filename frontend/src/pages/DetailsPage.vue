<template>
    <div v-if="movie">
        <div class="details-container">
            <div class="details-pic">
                <img :src="movie.imageUrl" :alt="movie.title" />
            </div>
            <div class="details-content">
                <h2>{{ movie.title }}</h2>
                <ul class="genres">
                    <li v-for="item in movie.genre" :key="item">{{ item }}</li>
                </ul>
                <p class="overview">
                    {{ movie.overview }}
                </p>
                <div class="info">
                    <div class="info-icons">
                        <div class="duration">
                            <i class="far fa-clock"></i>
                            {{ movie.duration }} min
                        </div>
                        <div class="rating">
                            <i class="far fa-star"></i> {{ movie.rating }}/10
                        </div>
                    </div>
                    <div v-if="!alreadyRated">
                        <div class="user-rating" v-if="!rated">
                            <p>Rate this movie:</p>
                            <div class="star">
                                <i
                                    v-for="index in 10"
                                    :key="index"
                                    :class="[
                                        'fas',
                                        'fa-star',
                                        `s${index}`,
                                        {
                                            active:
                                                rated && userRating <= index,
                                        },
                                    ]"
                                    @click="setRating(index)"
                                ></i>
                            </div>
                        </div>
                        <!-- <p v-else class="thank-you">Thank you for your vote!</p> -->
                    </div>
                    <p v-else class="thank-you">
                        {{ message }}
                    </p>
                </div>
                <div v-if="!datesShown && !seatsShown">
                    <base-btn v-if="isAvailable" @click="showDates"
                        >Book a seat</base-btn
                    >
                    <p v-else class="info-notice">
                        This movie is currently off screen.
                    </p>
                </div>
            </div>
        </div>
        <div class="dates-info" v-if="datesShown">
            <div class="dates">
                <h3>Choose dates:</h3>
                <ul>
                    <li
                        v-for="date in datesOnScreen"
                        :key="date"
                        @click="chooseDate(date)"
                        :class="{ selected: selectedDate === date }"
                    >
                        {{ date }}
                    </li>
                </ul>
            </div>
            <div class="time">
                <h3>Available times:</h3>
                <ul>
                    <li
                        v-for="time in availableTimes"
                        :key="time"
                        @click="chooseTime(time)"
                        :class="{ selected: selectedTime === time }"
                    >
                        {{ time }}
                    </li>
                </ul>
            </div>
            <base-btn className="outline-blue" @click="showSeats"
                >Next <i class="fas fa-arrow-right"></i
            ></base-btn>
        </div>
        <p v-if="missingData" class="missing-info">Please select date and time!</p>
        <book-seat
            v-if="seatsShown"
            :seats="seats"
            :price="movie.price"
            @seatsSelected="showModal"
        ></book-seat>
    </div>
    <base-modal v-if="modalVisible" @closeModal="closeModal">
        
        <div class="booking-details">
            <h3>Booking Details</h3>
            <h2 class="confirm-title">{{ movie.title }}</h2>
            <p>
                Time:
                <span class="span-bold"
                    >{{ selectedDate }} - {{ selectedTime }}</span
                >
            </p>
            <p class="selection"><span class="span-bold">{{ selectedSeats.length }}</span> seats selected:</p>
            <ul class="confirm-seats">
                <li v-for="(seat, index) in selectedSeats" :key="index">
                    <i class="fas fa-stream"></i>
                    <p>
                        Row:
                        <span class="span-bold">{{
                            Number(seat.split("-")[0]) + 1
                        }}</span>
                    </p>
                    <p>
                        Seat:
                        <span class="span-bold">{{
                            Number(seat.split("-")[1]) + 1
                        }}</span>
                    </p>
                </li>
            </ul>
            <div class="confirm-buttons">
                <base-btn className="outline" @click="closeModal"
                    >Change selection</base-btn
                >
                <base-btn @click="confirmOrder">Confirm</base-btn>
            </div>
        </div>
    </base-modal>
</template>

<script>
    import BaseBtn from "../components/base/BaseBtn.vue";
    import BookSeat from "../components/movies/BookSeat.vue";
    import movieService from "../services/movie-service";
    import orderService from '../services/order-service'
    import moment from "moment";
    import BaseModal from "../components/base/BaseModal.vue";
    export default {
        components: { BaseBtn, BookSeat, BaseModal },
        data() {
            return {
                userRating: 0,
                rated: false,
                movie: null,
                alreadyRated: false,
                datesOnScreen: [],
                availableTimes: ["10:30", "14:30", "18:30", "21:30"],
                selectedDate: null,
                selectedTime: null,
                selectedSeats: null,
                datesShown: false,
                seatsShown: false,
                modalVisible: false,
                missingData: false
            };
        },
        watch: {
            movie: function(newVal, oldVal) {
                // watch it
                console.log("Prop changed: ", newVal, " | was: ", oldVal);
                this.getRating();
            },
        },
        methods: {
            setRating(i) {
                const id = this.$route.params.id;
                console.log(i, "index");
                this.userRating = i;
                movieService.rate(id, this.rating).then(() => {
                    this.rated = true;
                    //this.alreadyRated = true;
                    this.getMovieData();
                });
            },
            getRating() {
                const userId = this.$store.getters.userId && this.$store.getters.userId;
                if (this.movie) {
                    this.alreadyRated = this.movie.participants
                        .map((p) => p._id)
                        .includes(userId);
                    console.log(this.alreadyRated, "in method");
                    console.log(userId, 'userId');
                }
            },
            getMovieData() {
                const id = this.$route.params.id;
                movieService.details(id).then((movie) => {
                    this.movie = movie;
                    console.log(this.movie.availableSeats);
                    this.getDates();
                });
            },
            getDates() {
                let dateArray = [];
                const today = moment();
                const start = moment(this.movie.startDate);
                const end = moment(this.movie.endDate);
                let current = moment();

                if (today.isSameOrBefore(start)) {
                    current = moment(start);
                } else {
                    current = moment(today);
                }
                while (current <= end) {
                    dateArray.push(moment(current).format("DD MMM"));
                    current = moment(current).add(1, "days");
                }
                this.datesOnScreen = dateArray.slice(0, 7);
            },
            chooseDate(date) {
                this.selectedDate = date;
            },
            chooseTime(time) {
                this.selectedTime = time;
            },
            showDates() {
                this.datesShown = true;
            },
            showSeats() {
                if (this.selectedDate && this.selectedTime) {
                    this.seatsShown = true;
                    this.missingData = false
                }  else {
                    this.missingData = true
                }
                //this.datesShown = false;
            },
            showModal(e) {
                this.modalVisible = true;
                this.selectedSeats = e;
                console.log("show modal");
                console.log(e, "selected seats");
            },
            closeModal() {
                this.modalVisible = false;
                console.log("modal closed");
            },
            confirmOrder() {
                const totalPrice = this.selectedSeats.length * this.movie.price
                orderService.create(this.movie._id, this.movie.price, this.finalDate, this.movie.duration, totalPrice, this.selectedSeats).then(() => {
                    console.log('ordered');
                    this.$router.push('/')
                }).catch((e) => {
                    console.log(e);
                })
            }
        },
        computed: {
            rating() {
                return 11 - this.userRating;
            },
            message() {
                if (this.rated) {
                    return "Thank you for your vote!";
                } else {
                    return "You have already rated this movie.";
                }
            },
            finalDate() {
                if (this.selectedDate && this.selectedTime) {
                    const dateTime = moment(
                        `2021 ${this.selectedDate}T${this.selectedTime}`
                    ).format();
                    return dateTime;
                }
                return null;
            },
            isAvailable() {
                return moment(this.movie.endDate).isAfter(moment());
            },
            seats() {
                return this.movie.availableSeats
                    .filter((d) => d.date === this.selectedDate)
                    .filter((t) => t.time === this.selectedTime)[0].seatsLayout;
            },
        },
        mounted() {
            this.getMovieData();
            this.getRating();
            console.log(this.$store.getters.userId);
        },
        updated() {
            console.log(this.rating);
            console.log(this.alreadyRated, "already");
            console.log(this.finalDate);
        },
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

    .genres li {
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

    .info-notice {
        opacity: 0.8;
        font-weight: 300;
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

    .dates-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 70%;
        margin: 0 0 0 10%;
        padding-top: 2rem;
        padding-bottom: 2rem;
        transition: all 0.3s;
    }

    .dates {
        flex-basis: 60%;
    }

    .dates-info i {
        margin-left: 0.5rem;
        color: rgb(37, 166, 218) !important;
    }

    .dates h3,
    .time h3 {
        text-transform: uppercase;
        font-size: 0.9rem;
        color: rgb(37, 166, 218);
    }

    .dates ul,
    time ul {
        flex-wrap: wrap;
    }

    .dates li,
    .time li {
        color: #fff;
        text-transform: uppercase;
        border: none;
        margin-right: 1rem;
        margin-bottom: 1rem;
        list-style: none;
        border-bottom: 2px solid transparent;
        font-weight: 300;
    }

    .dates li:hover,
    .time li:hover {
        border-bottom: 2px solid #e95d6b;
        cursor: pointer;
    }

    .selected {
        border-bottom: 2px solid #e95d6b !important;
    }

    .booking-details h3 {
        font-size: 0.8rem;
        text-transform: uppercase;
        border-bottom: 1px solid #000;
        padding-bottom: 1rem;
    }

    .confirm-title {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .span-bold {
        font-weight: 700;
    }

    .confirm-seats {
        flex-direction: column;
    }

    .confirm-seats li {
        list-style: none;
        display: flex;
        align-items: center;
    }

    .confirm-seats i {
        font-size: 0.8rem;
        margin-right: 0.5rem;
    }

    .confirm-seats li p {
        margin-right: 1rem;
    }

    .confirm-buttons {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
    }

    .confirm-buttons button {
        min-width: 12.5rem;
    }

    .selection {
        margin-top: 1rem;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: #e95d6b;
    }

    .missing-info {
        color: #fff;
        margin-left: 10%;
        font-weight: 300;
        font-style: italic;
    }

</style>
