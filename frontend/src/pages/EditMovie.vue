<template>
    <div class="form-container" v-if="title">
        <h2>Add New Movie</h2>
        <p>Use this form to add new movie to database</p>
        <form @submit.prevent="validateForm">
            <div class="form-field">
                <input
                    type="text"
                    id="title"
                    name="title"
                    v-model="title"
                    placeholder="Title"
                    :class="{ invalid: invalid && errors.title.length > 0 }"
                    @blur="validateTitle"
                />
                <label for="title">Title</label>
                <p v-if="invalid && errors.title.length > 0" class="error">
                    {{ errors.title[0] }}
                </p>
            </div>
            <div class="form-field">
                <date-picker
                    @update="getStartDate"
                    @getCurrent="getStartDate"
                    :dates="dates.startDate"
                ></date-picker>
                <label>First On Screen</label>
            </div>
            <div class="form-field">
                <date-picker
                    @update="getEndDate"
                    @getCurrent="getEndDate"
                    :dates="dates.endDate"
                ></date-picker>
                <label>Last On Screen</label>
                <p v-if="invalid && errors.endDate.length > 0" class="error">
                    {{ errors.endDate[0] }}
                </p>
            </div>
            <div class="form-field">
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    v-model="duration"
                    placeholder="Duration"
                    :class="{ invalid: invalid && errors.duration.length > 0 }"
                    @blur="validateDuration"
                />
                <label for="duration">Duration</label>
                <p v-if="invalid && errors.duration.length > 0" class="error">
                    {{ errors.duration[0] }}
                </p>
            </div>
            <!-- add badges -->
            <div class="form-field">
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    v-model="genre"
                    @keydown.enter.prevent="getBadges"
                    placeholder="Genre"
                    :class="{ invalid: invalid && errors.genres.length > 0 }"
                    @blur="validateGenre"
                />
                <label for="duration">Genre</label>
                <p v-if="invalid && errors.genres.length > 0" class="error">
                    {{ errors.genres[0] }}
                </p>
                <div class="genre-badges">
                    <div class="badge" v-for="genre in genreArr" :key="genre">
                        {{ genre }}
                        <div class="close" @click="deleteBadge(index)"></div>
                    </div>
                </div>
            </div>
            <div class="form-field">
                <input
                    type="text"
                    id="image"
                    name="imageUrl"
                    v-model="imageUrl"
                    placeholder="Image URL"
                    :class="{ invalid: invalid && errors.imageUrl.length > 0 }"
                    @blur="validateTitle"
                />
                <label for="image">Image URL</label>
                <p v-if="invalid && errors.imageUrl.length > 0" class="error">
                    {{ errors.imageUrl[0] }}
                </p>
            </div>
            <div class="form-field">
                <label class="overview-label" for="overview">Overview</label>
                <textarea
                    id="overview"
                    rows="5"
                    name="overview"
                    v-model="overview"
                    :class="{ invalid: invalid && errors.overview.length > 0 }"
                    @blur="validateOverview"
                >
                </textarea>
                <p v-if="invalid && errors.overview.length > 0" class="error">
                    {{ errors.overview[0] }}
                </p>
            </div>
            <div class="form-field">
                <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    v-model="shortDescription"
                    placeholder="Short Description"
                    :class="{
                        invalid: invalid && errors.shortDescription.length > 0,
                    }"
                    @blur="validateShortDescription"
                />
                <label for="shortDescription">Short Description</label>
                <p
                    v-if="invalid && errors.shortDescription.length > 0"
                    class="error"
                >
                    {{ errors.shortDescription[0] }}
                </p>
            </div>
            <div class="form-field">
                <input
                    type="price"
                    id="price"
                    name="price"
                    v-model="price"
                    placeholder="Price"
                    :class="{ invalid: invalid && errors.price.length > 0 }"
                    @blur="validateprice"
                />
                <label for="price">Price</label>
                <p v-if="invalid && errors.price.length > 0" class="error">
                    {{ errors.price[0] }}
                </p>
            </div>
            <base-btn>Submit</base-btn>
        </form>
    </div>
</template>

<script>
    import DatePicker from "../components/base/DatePicker";
    import movieService from "../services/movie-service";
    import moment from "moment";
    export default {
        components: { DatePicker },
        data() {
            return {
                title: null,
                startDate: null,
                endDate: null,
                duration: null,
                imageUrl: null,
                overview: "",
                shortDescription: "",
                genre: "",
                price: null,
                genreArr: [],
                errors: {
                    title: [],
                    duration: [],
                    startDate: [],
                    endDate: [],
                    imageUrl: [],
                    overview: [],
                    shortDescription: [],
                    genres: [],
                    price: [],
                    dates: null,
                },
                invalid: false,
            };
        },
        computed: {
            // dates() {
            //     console.log(this.endDate && this.endDate);
            //     return {
            //         startDate: {
            //             day: moment(this.startDate).format("DD"),
            //             month: Number(moment(this.startDate).format("M")) - 1,
            //             year: moment(this.startDate).format("YYYY"),
            //         },
            //         endDate: {
            //             day: moment(this.endDate).format("DD"),
            //             month: Number(moment(this.endDate).format("M")) - 1,
            //             year: moment(this.endDate).format("YYYY"),
            //         },
            //     };
            // },
        },
        methods: {
            loadData() {
                const id = this.$route.params.id;
                movieService.details(id).then((movie) => {
                    this.title = movie.title;
                    this.startDate = movie.startDate;
                    this.endDate = movie.endDate;
                    this.duration = movie.duration;
                    this.imageUrl = movie.imageUrl;
                    this.overview = movie.overview;
                    this.shortDescription = movie.shortDescription;
                    this.price = movie.price;
                    this.genreArr = movie.genre;
                    this.dates = {
                        startDate: {
                            day: moment(this.startDate).format("D"),
                            month:
                                Number(moment(this.startDate).format("M")) - 1,
                            year: moment(this.startDate).format("YYYY"),
                        },
                        endDate: {
                            day: moment(this.endDate).format("D"),
                            month: Number(moment(this.endDate).format("M")) - 1,
                            year: moment(this.endDate).format("YYYY"),
                        },
                    };
                });
            },
            getStartDate(data) {
                this.startDate = data;
            },
            getEndDate(data) {
                this.endDate = data;
            },
            getBadges() {
                //console.log(e.keyCode);
                this.genreArr.push(this.genre);
                this.genre = "";
            },
            deleteBadge(index) {
                this.genreArr.splice(index, 1);
            },
            submitForm() {
                if (!this.invalid) {
                    const id = this.$route.params.id;
                    const newMovie = {
                        title: this.title,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        imageUrl: this.imageUrl,
                        overview: this.overview,
                        shortDescription: this.shortDescription,
                        duration: this.duration,
                        genre: this.genreArr,
                        price: this.price,
                    };

                    movieService
                        .update(id, newMovie)
                        .then(() => {
                            this.$router.push("/");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            },
            validateTitle() {
                this.invalid = false;
                this.errors.title = [];
                console.log(this.title, "title");
                if (this.title === null || this.title === "") {
                    this.errors["title"].push("Title is required!");
                    this.invalid = true;
                    //console.log(this.errors, "errors");
                }
            },

            validateDate() {
                this.invalid = false;
                this.errors.endDate = [];
                if (moment(this.startDate).isAfter(moment(this.endDate))) {
                    this.errors["endDate"].push(
                        "End date should be after start date!"
                    );
                    this.invalid = true;
                }
            },

            validateDuration() {
                this.invalid = false;
                this.errors.duration = [];
                if (this.duration === null || this.duration === "") {
                    this.errors["duration"].push("Duration is required!");
                    this.invalid = true;
                }
            },

            validateImage() {
                this.invalid = false;
                this.errors.imageUrl = [];
                if (this.imageUrl === null || this.imageUrl === "") {
                    this.errors["imageUrl"].push("Image is required!");
                    this.invalid = true;
                }
            },

            validateOverview() {
                this.invalid = false;
                this.errors.overview = [];
                if (this.overview === "") {
                    this.errors["overview"].push("Movie overview is required!");
                    this.invalid = true;
                }
                if (this.overview.length < 20) {
                    this.errors["overview"].push(
                        "Movie overview should be at least 20 characters long!"
                    );
                    this.invalid = true;
                }
            },

            validateShortDescription() {
                this.invalid = false;
                this.errors.shortDescription = [];
                if (this.shortDescription === "") {
                    this.errors["shortDescription"].push(
                        "Short descriiption is required!"
                    );
                    this.invalid = true;
                }
            },

            validateGenre() {
                //console.log(this.genreArr, "genre arr");
                this.invalid = false;
                this.errors.genres = [];
                if (this.genreArr.length <= 0) {
                    this.errors["genres"].push(
                        "Please add at least one genre category!"
                    );
                    this.invalid = true;
                }
            },

            validateprice() {
                this.invalid = false;
                this.errors.price = [];
                if (this.price <= 0) {
                    this.errors["price"].push(
                        "Price should be bigger than zero!"
                    );
                    this.invalid = true;
                }
            },

            validateForm() {
                this.invalid = false;
                this.validateTitle();
                this.validateDate();
                this.validateDuration();
                this.validateImage();
                this.validateOverview();
                this.validateShortDescription();
                this.validateGenre();
                this.validateprice();
                this.submitForm();
            },
        },
        mounted() {
            this.loadData();
        },
    };
</script>

<style scoped>
    .genre-badges {
        display: flex;
        margin-top: -1rem;
    }

    .badge {
        display: flex;
        color: rgb(37, 166, 218);
        border: 1px solid rgb(37, 166, 218);
        padding: 0.3rem 0.6rem;
        border-radius: 30px;
        margin-right: 0.3rem;
    }

    textarea {
        width: 100%;
        padding: 0.5rem 1rem;
        font-family: inherit;
        margin: auto;
        margin-bottom: 1.5rem;
        background-color: transparent;
        border: 2px solid #414141;
        color: #fff;
        transition: all 0.3s;
    }

    textarea:focus {
        outline: none;
        border: 2px solid #e95d6b;
    }

    p {
        color: rgb(255, 255, 255);
    }

    .form-container {
        background-color: rgba(104, 104, 104, 0.178);
        padding: 1.5rem;
        max-width: 50%;
        margin: 3rem auto;
        border-radius: 30px;
        text-align: center;
        color: rgb(241, 241, 241);
    }

    p {
        color: rgb(104, 104, 104);
        margin-top: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        text-align: left;
    }

    .form-field {
        display: flex;
        flex-direction: column;
        margin: 1rem;
        text-align: left;
    }

    button {
        margin-top: 2rem;
    }

    input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #414141;
        font-family: inherit;
        color: #fff;
        padding: 0.5rem;
        outline: none;
        width: 100%;
        transition: all 0.3s;
    }

    input:focus {
        border-bottom: 2px solid #e95d6b;
    }

    input:focus:invalid {
        border-bottom: 3px solid #e00202;
    }

    input::placeholder {
        color: rgba(228, 228, 228, 0.603);
    }

    input:placeholder-shown + label {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-2.2rem);
    }

    label {
        display: block;
        font-size: 0.85rem;
        padding: 0.5rem;
        color: rgba(228, 228, 228, 0.603);
        transition: all 0.3s;
        transform: translateY(-4rem);
    }

    .overview-label {
        transform: translateY(-1rem);
    }

    a {
        margin-top: 1rem;
        color: #fff;
        text-decoration: none;
        font-size: 0.9rem;
        text-align: center;
    }

    span {
        color: #e95d6b;
        margin-left: 0.3rem;
    }

    .invalid,
    input:focus.invalid {
        border-bottom: 3px solid #ad033c;
        color: #ad033c;
    }

    .invalid + label {
        color: #ad033c;
    }

    .error {
        color: #ad033c;
        font-style: italic;
        font-size: 0.8rem;
        margin-top: -1.5rem;
    }

    .close:after {
        content: "\00d7"; /* This will render the 'X' */
        cursor: pointer;
        color: rgb(37, 166, 218);
        margin-left: 0.5rem;
        font-size: 1.2rem;
    }
</style>
