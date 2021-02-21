<template>
    <form @submit.prevent="submitForm">
        <div class="form-field">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" v-model="title" />
        </div>
        <div class="form-field">
            <label>First On Screen</label>
            <date-picker
                @update="getStartDate"
                @getCurrent="getStartDate"
            ></date-picker>
        </div>
        <div class="form-field">
            <label>Last On Screen</label>
            <date-picker
                @update="getEndDate"
                @getCurrent="getEndDate"
            ></date-picker>
        </div>
        <div class="form-field">
            <label for="duration">Duration</label>
            <input
                type="number"
                id="duration"
                name="duration"
                v-model="duration"
            />
        </div>
        <!-- add badges -->
        <div class="form-field">
            <label for="duration">Genre</label>
            <input
                type="text"
                id="genre"
                name="genre"
                v-model="genre"
                @keydown.enter.prevent="getBadges"
            />
            <div class="genre-badges">
                <div class="badge" v-for="genre in genreArr" :key="genre">
                    {{ genre }}
                </div>
            </div>
        </div>
        <div class="form-field">
            <label for="image">Image URL</label>
            <input type="text" id="image" name="imageUrl" v-model="imageUrl" />
        </div>
        <div class="form-field">
            <label for="overview">Overview</label>
            <textarea id="overview" rows="5" name="overview" v-model="overview">
            </textarea>
        </div>
        <div class="form-field">
            <label for="shortDescription">Short Description</label>
            <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                v-model="shortDescription"
            />
        </div>
        <div class="form-field">
            <label for="price">Price</label>
            <input type="price" id="price" name="price" v-model="price" />
        </div>
        <base-btn>Submit</base-btn>
    </form>
</template>

<script>
    import BaseBtn from "./BaseBtn.vue";
    import DatePicker from "./DatePicker.vue";
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

                fetch("http://localhost:9999/api/movie/", {
                    method: "POST",
                    headers: {
                        // "Access-Control-Allow-Origin": "*",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newMovie),
                    credentials: "include",
                }).then((res) => console.log(res));
            },
        },
    };
</script>

<style scoped>
    form {
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
    }

    .genre-badges {
        display: flex;
        margin-top: 0.5rem;
    }

    .badge {
        color: rgb(37, 166, 218);
        border: 1px solid rgb(37, 166, 218);
        padding: 0.3rem 0.6rem;
        border-radius: 30px;
        margin-right: 0.3rem;
    }

    p {
        color: rgb(255, 255, 255);
    }
</style>
