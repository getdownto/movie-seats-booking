<template>
    <div class="booking-container">
        <div class="seats-info">
            <p>Number of seats selected:</p>
            <h3 class="number">{{ selectedSeats.length }}</h3>
        </div>
        <div class="seats-info">
            <p>Total price:</p>
            <h3 class="number">{{ totalPrice }}</h3>
        </div>
        <div class="container">
            <p class="screen-caption">Screen</p>
            <div class="screen"></div>

            <div
                :class="['row', indexRow === 0 && 'first']"
                v-for="(row, indexRow) in seats"
                :key="indexRow"
            >
                <div
                    v-for="(seat, index) in row"
                    :key="index"
                    :class="[
                        'seat',
                        seat === 1 && 'occupied',
                        selectedSeats.includes(`${indexRow}-${index}`) &&
                            'selected',
                    ]"
                    @click="selectSeat(`${indexRow}-${index}`)"
                ></div>
            </div>
        </div>

        <ul class="legend">
            <li>
                <div class="seat"></div>
                <small>Available</small>
            </li>
            <li>
                <div class="seat selected"></div>
                <small>Selected</small>
            </li>
            <li>
                <div class="seat occupied"></div>
                <small>Occupied</small>
            </li>
        </ul>
        <p v-if="warning" class="warning">Please select seats!</p>
        <base-btn @click="submitSeats()" className="outline"
            >Next <i class="fas fa-arrow-right"></i
        ></base-btn>
    </div>
</template>

<script>
    export default {
        props: ["seats", "price"],
        data() {
            return {
                selectedSeats: [],
                warning: false,
                //currentSelection: null,
            };
        },
        computed: {
            totalPrice() {
                return this.selectedSeats.length * this.price;
            },
        },
        methods: {
            selectSeat(index) {
                this.warning = false;
                if (!this.selectedSeats.includes(index)) {
                    // this.currentSelection = index;
                    this.selectedSeats.push(index);
                } else {
                    const indexCurr = this.selectedSeats.indexOf(index);
                    if (indexCurr > -1) {
                        this.selectedSeats.splice(indexCurr, 1);
                    }
                }
            },
            submitSeats() {
                if (this.selectedSeats.length > 0) {
                    this.warning = false;
                    this.$emit("seatsSelected", this.selectedSeats);
                } else {
                    this.warning = true;
                }
            },
        },
        // mounted() {
        //     console.log(this.props && this.props.seats);
        // },
    };
</script>

<style scoped>
    .booking-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
        margin: 0;
        background-color: rgba(11, 38, 88, 0.603);
    }

    .seats-info {
        display: flex;
        margin-bottom: 1rem;
        align-items: center;
    }

    .seats-info p {
        text-transform: uppercase;
        font-size: 0.7rem;
        color: #999999;
    }

    .number {
        color: #e95d6b;
        margin-left: 1rem;
        font-weight: 700;
        font-size: 1rem;
    }

    .container {
        perspective: 1000px;
        margin-bottom: 30px;
    }

    .seat {
        background-color: #fbfbfb;
        height: 17px;
        width: 25px;
        margin: 11px 6px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    .seat.selected {
        background-color: #e95d6b;
    }

    .seat.occupied {
        background-color: #646464;
    }

    .seat.invisible {
        background-color: transparent;
    }

    .row:not(.first) .seat:nth-of-type(3) {
        margin-right: 45px;
    }

    .row:not(.first) .seat:nth-last-of-type(3) {
        margin-left: 45px;
    }

    .first .seat:nth-of-type(2) {
        margin-right: 45px;
    }

    .first .seat:nth-last-of-type(2) {
        margin-left: 45px;
    }

    .seat:not(.occupied):hover {
        cursor: pointer;
        transform: scale(1.2);
    }

    .legend .seat:not(.occupied):hover {
        cursor: default;
        transform: scale(1);
    }

    .legend {
        padding: 5px 10px;
        border-radius: 5px;
        color: #999999;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
    }

    .legend li {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
    }

    .legend li small {
        margin-left: 2px;
        text-transform: uppercase;
        font-size: 0.7rem;
    }

    .row {
        display: flex;
        justify-content: center;
    }

    .screen {
        background-color: #494949;
        height: 1.5px;
        width: 80%;
        margin: 10px auto 30px auto;
    }

    p.text {
        margin: 5px 0;
    }

    p.text span {
        color: #6feaf6;
    }

    .screen-caption {
        text-align: center;
        text-transform: uppercase;
        color: #646464;
        margin-top: 10px;
        margin-bottom: 0;
        letter-spacing: 1.5px;
        font-size: 0.9rem;
    }

    button {
        margin-top: 2rem;
    }

    .warning {
        color: #fff;
        font-weight: 300;
        font-style: italic;
    }
</style>
