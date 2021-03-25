const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Date, ObjectId } = Schema.Types;

const orderSchema = new Schema({

    movie: {
        type: ObjectId,
        ref: "Movie"
    },

    title: {
        type: String,
        required: true
    },

    moviePrice: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    seats: {
        type: Array,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Order', orderSchema);