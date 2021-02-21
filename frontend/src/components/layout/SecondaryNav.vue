<template>
    <div class="container">
        <h2>Discover Movies</h2>
        <ul class="filters">
            <li>Random</li>
            <li>Popular</li>
            <li>Recent</li>
        </ul>
        <div class="search">
            <input
                type="text"
                id="search"
                class="search"
                placeholder="Type something here..."
            />
            <i class="fas fa-search"></i>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #d8ddf0;
        max-width: 88%;
        margin: auto;
    }

    h2 {
        font-size: 1.5rem;
    }

    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    li {
        margin: 0 0.7rem;
        color: #d8ddf0;
        list-style: none;
        padding: 0.5rem 0;
        font-size: 1.1rem;
        letter-spacing: 0.5px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
    }

    li:hover {
        border-bottom: 3px solid #e95d6b;
    }

    .search {
        display: flex;
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

    i {
        font-size: 0.9rem;
        background-color: #e95d6b;
        padding: 0.5rem;
    }
</style>
