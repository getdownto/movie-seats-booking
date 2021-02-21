const models = require('../models');
const moment = require('moment')

module.exports = {
    get: {
        all: (req, res, next) => {
            models.Movie.find().populate('participants')
                .then((movies) => res.send(movies))
                .catch(next);
        },
        single: (req, res, next) => {
            const id = req.params.id;

            models.Movie.findOne({_id: id}).populate('participants')
                .then((movie) => res.send(movie))
                .catch(next);
        },
    },

    post: (req, res, next) => {
        const { title, startDate, endDate, imageUrl, overview, shortDescription, duration, genre, price } = req.body;
        //const { _id } = req.user;

        models.Movie.create({ title, startDate, endDate, imageUrl, overview, shortDescription, duration, genre, price, rating: 0, participants: [] })
            // .then((created) => {
            //     return Promise.all([
            //         models.User.updateOne({ _id }, { $push: { posts: createdOrigami } }),
            //         models.Origami.findOne({ _id: createdOrigami._id })
            //     ]);
            // })
            .then((createdMovie) => res.send(createdMovie))
            .catch(next)
    },

    // put: (req, res, next) => {
    //     const id = req.params.id;
    //     const { destination, startDate, imageUrl, description, duration, price, additionalTrips } = req.body;
    //     models.Travel.update({ _id: id }, { destination, startDate, imageUrl, description, duration, price, additionalTrips: [...additionalTrips], participants: [] })
    //         .then((updatedTravel) => res.send(updatedTravel))
    //         .catch(next)
    // },

    // delete: (req, res, next) => {
    //     const id = req.params.id;
    //     models.Travel.deleteOne({ _id: id })
    //         .then((removedTravel) => res.send(removedTravel))
    //         .catch(next)
    // }
};