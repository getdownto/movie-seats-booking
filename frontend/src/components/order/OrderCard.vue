<template>
    <div class="order-card">
        <h2 class="confirm-title">{{ order.movie.title }}</h2>
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
            <p>Total: <span class="span-bold">{{order.totalPrice.toFixed(2)}}</span></p>
            <p>Status: <span class="span-bold">{{order.status}}</span> </p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
    export default {
        props: ["order"],
        computed: {
            selectedDate() {
                return moment(this.order.date).format('DD MMM')
            },
            selectedTime() {
                return moment(this.order.date).format('HH:mm')
            }
        }
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
</style>
