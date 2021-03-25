<template>
    <div>
        <form class="search search-container" @submit.prevent="submitSearch">
            <input
                type="text"
                id="search"
                class="search"
                placeholder="Type something here..."
                v-model="search"
            />
            <button class="search-btn">
                <i class="fas fa-search"></i>
            </button>
        </form>
        <movie-list :search="searchProp"></movie-list>
    </div>
</template>

<script>
    import MovieList from "../components/layout/MovieList.vue";
    export default {
        components: { MovieList },
        data() {
            return {
                search: "",
                searchProp: "",
            };
        },
        methods: {
            submitSearch() {
                this.searchProp = this.search;
                this.$router.push(`/all?search=${this.search}`);
            },
        },
    };
</script>

<style scoped>
    .search-container {
        margin-top: 2rem;
        margin-right: 8%;
    }
    .search {
        display: flex;
        justify-content: flex-end;
    }

    .search input {
        background-color: #0e193a;
        font-family: inherit;
        padding: 0.5rem 1rem;
        border: none;
        outline: none;
        color: #fff;
        background-color: #162349;
    }

    .search input:focus {
        background-color: #22315e;
    }

    .search-btn {
        font-size: 0.9rem;
        background-color: #e95d6b;
        padding: 0.5rem;
        outline: none;
        border: none;
    }
</style>
