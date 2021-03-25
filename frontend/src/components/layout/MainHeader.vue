<template>
    <header>
        <nav>
            <div class="container">
                <div class="logo">Book a seat</div>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/all">Movies</router-link></li>
                </ul>
                <base-btn link to="/login" v-if="!isAuth">Login</base-btn>
                <router-link to="/user/profile" v-else-if="isAdmin"
                    ><i class="far fa-user-circle"></i> Admin Panel</router-link
                >
                <router-link to="/user/profile" v-else-if="!isAdmin"
                    ><i class="far fa-user-circle"></i> Profile</router-link
                >
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        computed: {
            isAuth() {
                return this.$store.getters.isLoggedIn;
            },
            isAdmin() {
                return this.$store.getters.isAdmin;
            },
        },
        methods: {},
    };
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
        color: #d8ddf0;
        list-style: none;
        text-decoration: none;
        padding: 2.2rem 0;
        font-size: 1.1rem;
        letter-spacing: 0.5px;
    }

    li a:hover {
        border-bottom: 3px solid #e95d6b;
    }

    a {
        color: #d8ddf0;
        list-style: none;
        text-decoration: none;
    }

    a:hover {
        color: #e95d6b;
    }
</style>
