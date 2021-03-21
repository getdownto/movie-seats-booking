<template>
    <!-- <p v-if="loading">Loading...</p> -->
    <div class="user-profile" v-if="allOrders">
        <div class="header">
            <h2 v-if="!isAdmin">User Profile</h2>
            <h2 v-else>Admin Panel</h2>
            <p class="hello">Hello {{ username }}!</p>
        </div>
        <div class="profile-content">
            <div class="aside">
                <ul v-if="!isAdmin">
                    <li
                        :class="{ active: currentTab === 'orders' }"
                        @click="selectTab('orders')"
                    >
                        My orders
                    </li>
                    <li
                        :class="{ active: currentTab === 'upcoming' }"
                        @click="selectTab('upcoming')"
                    >
                        Upcoming movies
                    </li>
                    <li
                        :class="{ active: currentTab === 'past' }"
                        @click="selectTab('past')"
                    >
                        Past movies
                    </li>
                    <li @click="logout" class="logout">Logout</li>
                </ul>
                <ul v-else>
                    <li
                        :class="{ active: currentTab === 'orders' && isAdmin }"
                        @click="selectTab('orders')"
                    >
                        All orders
                    </li>
                    <li>
                        <router-link to="/movie/create">
                            Add new movie
                        </router-link>
                    </li>
                    <li
                        :class="{ active: currentTab === 'make-admin' }"
                        @click="selectTab('make-admin')"
                    >
                        Make admin
                    </li>
                    <li @click="logout" class="logout">Logout</li>
                </ul>
            </div>
            <div class="orders" v-if="currentTab === 'orders' && !isAdmin">
                <h3>My orders</h3>
                <order-card
                    :order="order"
                    v-for="order in allOrders"
                    :key="order._id"
                ></order-card>
            </div>
            <div class="orders" v-if="currentTab === 'upcoming'">
                <h3>My Upcoming Movies</h3>
                <order-card
                    :order="order"
                    v-for="order in upcoming"
                    :key="order._id"
                ></order-card>
            </div>
            <div class="orders" v-if="currentTab === 'past'">
                <h3>My Past Movies</h3>
                <order-card
                    :order="order"
                    v-for="order in past"
                    :key="order._id"
                ></order-card>
            </div>
            <div class="orders" v-if="currentTab === 'orders' && isAdmin">
                <h3>All Orders</h3>
                <order-card
                    :order="order"
                    v-for="order in allAdminOrders"
                    :key="order._id"
                    @orderDeleted="deleteOrder"
                ></order-card>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import OrderCard from "../components/order/OrderCard.vue";
    import orderService from "../services/order-service";
    export default {
        components: { OrderCard },
        data() {
            return {
                allAdminOrders: null,
                allOrders: null,
                upcoming: null,
                past: null,
                loading: false,
                currentTab: this.isAdmin ? "orders-admin" : "orders"
            };
        },
        computed: {
            username() {
                return this.$store.getters.username;
            },
            userId() {
                return this.$store.getters.userId && this.$store.getters.userId;
            },
            isAdmin() {
                return this.$store.getters.isAdmin;
            },
            // currentTab() {
            //     return this.isAdmin ? "orders-admin" : "orders";
            // },
        },
        watch: {
            userId: function(newVal, oldVal) {
                // watch it
                console.log("Prop changed: ", newVal, " | was: ", oldVal);
                this.loadAll();
            },
        },
        methods: {
            async logout() {
                await this.$store.dispatch("logout");
                this.$router.replace("/");
            },
            loadAll() {
                if (this.userId) {
                    const id = this.userId;
                    console.log(id, "id");
                    orderService.load().then((order) => {
                        console.log(order, "order");
                        this.allAdminOrders = order;
                        this.allOrders = order.filter((o) => o.user === id);
                        this.upcoming = this.allOrders.filter((a) =>
                            moment(a.date).isSameOrAfter(moment())
                        );
                        this.past = this.allOrders.filter((a) =>
                            moment(a.date).isBefore(moment())
                        );
                        console.log(this.allOrders, "all orders");
                    });
                }
            },
            selectTab(tab) {
                this.currentTab = tab;
            },
            deleteOrder(e) {
                orderService.delete(e).then(() => {
                    console.log("deleted");
                    this.loadAll();
                });
            },
        },
        mounted() {
            //!this.iserId ? this.loading = true : this.loading = false
            console.log(this.userId, "user id");
            this.loadAll();
        },
        created() {
            console.log(this.userId, "user id");
            this.loadAll();
        },
        // updated() {
        //     this.loadAll()
        // }
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

    li a {
        color: #fff;
        text-decoration: none;
    }

    li a:hover {
        color: rgb(37, 166, 218);
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
