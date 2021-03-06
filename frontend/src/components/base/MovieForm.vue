<template>
    <div class="form-container">
        <h2>Add New Movie</h2>
        <p>Use this form to add new movie to database</p>
        <form @submit.prevent="submitForm">
            <div class="form-field">
                <input
                    type="text"
                    id="title"
                    name="title"
                    v-model="title"
                    placeholder="Title"
                />
                <label for="title">Title</label>
            </div>
            <div class="form-field">
                <date-picker
                    @update="getStartDate"
                    @getCurrent="getStartDate"
                ></date-picker>
                <label>First On Screen</label>
            </div>
            <div class="form-field">
                <date-picker
                    @update="getEndDate"
                    @getCurrent="getEndDate"
                ></date-picker>
                <label>Last On Screen</label>
            </div>
            <div class="form-field">
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    v-model="duration"
                    placeholder="Duration"
                />
                <label for="duration">Duration</label>
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
                />
                <label for="duration">Genre</label>
                <div class="genre-badges">
                    <div class="badge" v-for="genre in genreArr" :key="genre">
                        {{ genre }}
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
                />
                <label for="image">Image URL</label>
            </div>
            <div class="form-field">
                <label class="overview-label" for="overview">Overview</label>
                <textarea
                    id="overview"
                    rows="5"
                    name="overview"
                    v-model="overview"
                >
                </textarea>
            </div>
            <div class="form-field">
                <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    v-model="shortDescription"
                    placeholder="Short Description"
                />
                <label for="shortDescription">Short Description</label>
            </div>
            <div class="form-field">
                <input
                    type="price"
                    id="price"
                    name="price"
                    v-model="price"
                    placeholder="Price"
                />
                <label for="price">Price</label>
            </div>
            <base-btn>Submit</base-btn>
        </form>
    </div>
</template>

<script>
    import BaseBtn from "./BaseBtn.vue";
    import DatePicker from "./DatePicker.vue";
    import movieService from "../../services/movie-service";
    export default {
        components: { DatePicker, BaseBtn },
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
            };
        },
        methods: {
            getStartDate(data) {
                this.startDate = data;
            },
            getEndDate(data) {
                this.endDate = data;
            },
            getBadges(e) {
                console.log(e.keyCode);
                this.genreArr.push(this.genre);
                this.genre = "";
            },
            submitForm() {
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
                    .create(newMovie)
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
    };
</script>

<style scoped>
    /* form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        max-width: 70%;
        margin: auto;
    }

    .form-field {
        color: whitesmoke;
        display: flex;
        flex-direction: column;
        margin: 1rem auto;
        width: 70%;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.5rem 1rem;
        font-family: inherit;
        margin: auto;
        background-color: #eee;
    }

    input:focus,
    textarea:focus {
        background-color: #fff;
        outline: none;
        border: 2px solid rgb(37, 166, 218);
    }

    label {
        margin-bottom: 0.5rem;
    } */

    .genre-badges {
        display: flex;
        margin-top: -1rem;
    }

    .badge {
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
</style>
