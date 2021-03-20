<template>
    <div class="order-card">
        <div class="cart-header">
            <h2 class="confirm-title">{{ order.movie.title }}</h2>
            <div class="icons" v-if="isAdmin">
                <i class="far fa-edit" @click="openEdit"></i>
                <i class="far fa-trash-alt" @click="showModal"></i>
            </div>
        </div>
        <p>
            Time:
            <span class="span-bold"
                >{{ selectedDate }} - {{ selectedTime }}</span
            >
        </p>
        <p class="selection">
            <span class="span-bold">{{ order.seats.length }}</span> seats:
        </p>
        <ul class="confirm-seats">
            <li v-for="(seat, index) in order.seats" :key="index">
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
        <div class="lower">
            <p>
                Total:
                <span class="span-bold">{{ order.totalPrice.toFixed(2) }}</span>
            </p>
            <p v-if="!editMode">
                Status: <span class="span-bold">{{ status }}</span>
            </p>
            <p v-else>
                Status:
                <select name="status" v-model="status">
                    <option id="0">NEW</option>
                    <option id="1">CONFIRMED</option>
                    <option id="2">CANCELLED</option>
                </select>
            </p>
        </div>
        <base-btn v-if="editMode" className="outline-blue" @click="updateOrder"
            >save changes</base-btn
        >
    </div>
    <base-modal v-if="modalVisible" @closeModal="closeModal">
        <div class="booking-details">
            <h3>Confirm action</h3>
        </div>
        <h3>Are you sure you want to delete this item?</h3>
        <div class="btn-container">
            <base-btn className="outline" @click="closeModal">Cancel</base-btn>
            <base-btn @click="deleteOrder">Confirm</base-btn>
        </div>
    </base-modal>
</template>

<script>
    import moment from "moment";
    import orderService from "../../services/order-service";
    import BaseModal from "../base/BaseModal.vue";

    export default {
        components: { BaseModal },
        emits: ["orderDeleted"],
        props: ["order"],
        data() {
            return {
                status: this.order.status,
                editMode: false,
                modalVisible: false,
            };
        },
        computed: {
            selectedDate() {
                return moment(this.order.date).format("DD MMM");
            },
            selectedTime() {
                return moment(this.order.date).format("HH:mm");
            },
            isAdmin() {
                return this.$store.getters.isAdmin;
            },
        },
        methods: {
            updateOrder() {
                orderService.update(this.order._id, this.status).then(() => {
                    this.editMode = false;
                });
            },
            deleteOrder() {
                this.modalVisible = false;
                this.$emit("orderDeleted", this.order._id);
            },
            openEdit() {
                this.editMode = true;
            },
            showModal() {
                this.modalVisible = true;
            },
            closeModal() {
                this.modalVisible = false;
            },
        },
    };
</script>

<style scoped>
    .order-card {
        background-color: rgba(30, 60, 116, 0.322);
        padding: 1rem 2rem;
        box-shadow: 0 1rem 2rem rgba(3, 22, 58, 0.664);
        width: 100%;
        margin-top: 1rem;
    }

    .confirm-title {
        margin-bottom: 0.9rem;
        font-size: 1rem;
        text-transform: uppercase;
        color: #fff;
        font-weight: 400;
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

    .selection {
        margin-top: 1rem;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: rgb(37, 166, 218);
    }

    .lower {
        display: flex;
        justify-content: flex-end;
    }

    .lower p {
        margin-left: 1rem;
        font-size: 0.9rem;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icons i {
        margin-left: 0.5rem;
    }

    .icons i:hover {
        color: rgb(37, 166, 218);
        cursor: pointer;
    }

    .btn-container {
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
    }

    .booking-details h3 {
        font-size: 0.8rem;
        text-transform: uppercase;
        border-bottom: 1px solid #000;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
    }
</style>
