<template>
    <header>
        <nav>
            <div class="container">
                <div class="logo">Book a seat</div>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">On Screen</a></li>
                    <li><a href="#">Popular</a></li>
                    <li><a href="#">Coming Soon</a></li>
                </ul>
                <base-btn link to="/login">Login</base-btn>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    nav {
        background-color: #0e193a;
        padding: 2rem;
        border-bottom: 1px solid #2a3454;
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 90%;
        margin: auto;
    }

    .logo {
        color: #a2acce;
        text-transform: uppercase;
        font-size: 0.9rem;
    }

    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    li {
        margin: 0 0.7rem;
    }

    li a {
        color:#d8ddf0;
        list-style: none;
        text-decoration: none;
        padding: 2.2rem 0;
        font-size: 1.1rem;
        letter-spacing: 0.5px;
    }

    li a:hover {
        border-bottom: 3px solid #e95d6b;
    }

</style>