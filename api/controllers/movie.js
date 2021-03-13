const models = require("../models");
const moment = require("moment");

module.exports = {
    get: {
        all: (req, res, next) => {
            models.Movie.find()
                .populate("participants")
                .then((movies) => res.send(movies))
                .catch(next);
        },
        single: (req, res, next) => {
            const id = req.params.id;

            models.Movie.findOne({ _id: id })
                .populate("participants")
                .then((movie) => res.send(movie))
                .catch(next);
        },
    },

    post: (req, res, next) => {
        const {
            title,
            startDate,
            endDate,
            imageUrl,
            overview,
            shortDescription,
            duration,
            genre,
            price,
        } = req.body;
        //const { _id } = req.user;

        const seatsLayout = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const times = ["10:30", "14:30", "18:30", "21:30"]

        let dateArray = [];
        let dateTimeArray = []
        const start = moment(startDate);
        const end = moment(endDate);
        let current = start;

        while (current <= end) {
            dateArray.push(moment(current).format("DD MMM"));
            current = moment(current).add(1, "days");
        }

        dateArray.forEach(date => {
            times.forEach(time => {
                dateTimeArray.push({
                    date,
                    time,
                    seatsLayout
                })
            });
        });

        models.Movie.create({
            title,
            startDate,
            endDate,
            imageUrl,
            overview,
            shortDescription,
            duration,
            genre,
            price,
            rating: 0,
            participants: [],
            availableSeats: dateTimeArray
        })
            // .then((created) => {
            //     return Promise.all([
            //         models.User.updateOne({ _id }, { $push: { posts: createdOrigami } }),
            //         models.Origami.findOne({ _id: createdOrigami._id })
            //     ]);
            // })
            .then((createdMovie) => res.send(createdMovie))
            .catch(next);
    },

    put: {
        // edit: (req, res, next) => {
        //     const id = req.params.id;
        //     const {
        //         destination,
        //         startDate,
        //         imageUrl,
        //         description,
        //         duration,
        //         price,
        //         additionalTrips,
        //     } = req.body;
        //     models.Travel.update(
        //         { _id: id },
        //         {
        //             destination,
        //             startDate,
        //             imageUrl,
        //             description,
        //             duration,
        //             price,
        //             additionalTrips: [...additionalTrips],
        //             participants: [],
        //         }
        //     )
        //         .then((updatedTravel) => res.send(updatedTravel))
        //         .catch(next);
        // },
        rate: (req, res, next) => {
            const id = req.params.id;
            const userId = req.user._id;
            const { rating } = req.body;
            models.Movie.findOne({ _id: id }).then((movie) => {
                const participants = movie.participants;
                const currentRating = movie.rating;
                participants.push(userId);
                const newRating =
                    (currentRating * (participants.length - 1) + rating) /
                    participants.length;

                models.Movie.update(
                    { _id: id },
                    { rating: Math.round(newRating * 10) / 10, participants }
                )
                    .then((ratedMovie) => res.send(ratedMovie))
                    .catch(next);
            });
        },
    },

    // delete: (req, res, next) => {
    //     const id = req.params.id;
    //     models.Travel.deleteOne({ _id: id })
    //         .then((removedTravel) => res.send(removedTravel))
    //         .catch(next)
    // }
};
