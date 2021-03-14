<template>
    <div class="user-profile" v-if="username">
        <div class="header">
            <h2>User Profile</h2>
            <p class="hello">Hello {{ username }}!</p>
        </div>
        <div class="profile-content">
            <div class="aside">
                <ul>
                    <li :class="{active: currentTab === 'orders'}">My orders</li>
                    <li>Upcoming movies</li>
                    <li>Past movies</li>
                    <li @click="logout" class="logout">Logout</li>
                </ul>
            </div>
            <div class="orders" v-if="currentTab === 'orders'">
                <h3>My orders</h3>
                <order-card :order="order" v-for="order in allOrders" :key="order._id"></order-card>
            </div>
        </div>
    </div>
</template>

<script>
import OrderCard from '../components/order/OrderCard.vue';
import orderService from '../services/order-service';
    export default {
  components: { OrderCard },
        data() {
            return {
                allOrders: null,
                currentTab: 'orders'
            };
        },
        computed: {
            username() {
                return (
                    this.$store.getters.username && this.$store.getters.username
                );
            },
        },
        methods: {
            async logout() {
                await this.$store.dispatch("logout");
                this.$router.replace("/");
            },
            loadAll() {
                //const userId = this.$store.getters.userId && this.$store.getters.userId;
                orderService.load().then(orders => {
                    this.allOrders = orders
                    console.log(this.allOrders, 'all orders');
                })
            }
        },
        mounted() {
            this.loadAll()
        }
    };
</script>

<style scoped>
    .user-profile {
        color: rgba(255, 255, 255, 0.966);
        max-width: 80%;
        margin: auto;
        padding: 3rem 0;
    }

    .profile-content {
        display: flex;
    }

    .hello {
        font-weight: 300;
        color: rgb(37, 166, 218);
    }

    .aside {
        flex-basis: 30%;
    }

    li {
        cursor: pointer;
        margin-top: 1rem;
        text-transform: uppercase;
        font-weight: 400;
        list-style: none;
    }

    h2 {
        margin-bottom: 1rem;
        text-transform: uppercase;
        font-weight: 400;
        padding-bottom: 0.5rem;
    }

    .orders {
        flex-basis: 70%;
    }

    .logout {
        margin-top: 3rem;
        text-transform: capitalize;
    }

    li:hover,
    .active {
        color: rgb(37, 166, 218);
    }

    .header {
        display: flex;
        justify-content: space-between;
    }
</style>
