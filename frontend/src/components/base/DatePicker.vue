<template>
    <div class="date-picker">
        <div class="custom-select">
            <select @change="editValue('date', $event)" ref="date">
                <option v-for="i in daysInMonth" :key="i" :value="i">
                    {{ i }}
                </option>
            </select>
        </div>
        <div class="custom-select">
            <select @change="editValue('months', $event)" ref="month">
                <option
                    v-for="(month, index) in months"
                    :key="month"
                    :value="index"
                >
                    {{ month }}
                </option>
            </select>
        </div>
        <div class="custom-select">
            <select @change="editValue('year', $event)" ref="year">
                <option
                    v-for="i in numberofYears"
                    :key="i"
                    :value="startingYear + (i - 1)"
                >
                    {{ startingYear + (i - 1) }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from "vue";
    import moment from "moment";

    export default {
        setup(props, context) {
            const dateValue = moment();
            const daysInMonth = ref(dateValue.daysInMonth());
            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            const month = ref(null);
            const date = ref(null);
            const year = ref(null);

            const startingYear = 2021;
            const numberofYears = 2;

            const updateElements = () => {
                month.value.value = dateValue.month();
                date.value.value = dateValue.date();
                year.value.value = dateValue.format("YYYY");
                context.emit("getCurrent", dateValue);

                // console.log(
                //     month.value.value,
                //     date.value.value,
                //     year.value.value
                // );
                // console.log(month.value);
            };

            const editValue = (unit, evt) => {
                dateValue.set(unit, evt.target.value);
                daysInMonth.value = dateValue.daysInMonth();
                updateElements();
                context.emit("update", dateValue);
                console.log(dateValue);
            };

            onMounted(() => {
                updateElements();
            });

            return {
                months,
                numberofYears,
                startingYear,
                daysInMonth,
                editValue,
                month,
                date,
                year,
            };
        },
    };
</script>

<style scoped>
    /* wrapper-div for including arrow */
    .custom-select {
        background-color: transparent;
        float: left;
        margin-right: 10px;
        position: relative;
        border: 2px solid #414141;
    }

    .custom-select select {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none; /* remove default styling */
        background-color: inherit;
        border: none;
        color: rgb(218, 218, 218);
        display: block;
        font-size: 16px;
        height: 32px;
        padding: 5px 30px 5px 10px;
        margin: 0;
        outline: none;
    }

    option {
        color: #333;
    }

    /* drop arrow */
    .custom-select:after {
        content: "\25bc";
        color: #aaa;
        font-size: 12px;
        position: absolute;
        right: 8px;
        top: 10px;
    }
</style>
