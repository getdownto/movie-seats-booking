const mongoose = require('mongoose');
//const timeZone = require('mongoose-timezone');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const movieSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Title is required']
    },

    startDate: {
        type: mongoose.SchemaTypes.Date, 
        required: [true, 'Date is required'],
        default: Date.now
    },

    // startTimes: [{
    //     type: mongoose.SchemaTypes.Date, 
    //     required: [false, 'Time is required'],
    // }],

    endDate: {
        type: mongoose.SchemaTypes.Date, 
        required: [true, 'Date is required'],
        default: Date.now
    },

    imageUrl: {
        type: String,
        required: [true, 'Image is required']
    },

    overview: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },

    genre: {
        type: [String],
        required: true
    },

    price: {
        type: Number,
        required: [true, 'Price is required']
    },

    rating: {
        type: Number,
        default: 0
    },

    participants: [{
        type: ObjectId,
        ref: "User"
    }],

    availableSeats: {
        type: Array
    }

});

//travelSchema.plugin(timeZone, { paths: ['date', 'subDocument.subDate'] });

module.exports = new Model('Movie', movieSchema);