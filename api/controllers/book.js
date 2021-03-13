const models = require("../models");
const mongoose = require("mongoose");
const moment = require("moment");

module.exports = {
    get: {
        all: (req, res, next) => {
            models.Order.find()
                .populate("user")
                .then((orders) => res.send(orders))
                .catch(next);
        },
        single: (req, res, next) => {
            const id = req.params.id;

            models.Order.findOne({ _id: id })
                .populate("user")
                .then((order) => res.send(order))
                .catch(next);
        },
    },

    post: (req, res, next) => {
        const {
            movie,
            moviePrice,
            date,
            duration,
            totalPrice,
            seats,
        } = req.body;
        const { _id } = req.user;
        console.log(_id);

        models.Order.create({
            movie,
            moviePrice,
            date,
            duration,
            totalPrice,
            seats,
            status: "NEW",
            user: _id,
        })
            .then((created) => {
                return Promise.all([
                    models.User.updateOne(
                        { _id },
                        { $push: { movies: created } }
                    ),
                    models.Movie.findOne({ _id: created.movie }).then(
                        (movie) => {
                            const seatsLayout = movie.availableSeats
                                .filter(
                                    (a) =>
                                        a.date ===
                                        moment(created.date).format("DD MMM")
                                )
                                .filter(
                                    (a) =>
                                        a.time ===
                                        moment(created.date).format("HH:mm")
                                )[0].seatsLayout;

                            console.log(seatsLayout, "seats layout");
                            created.seats.forEach((seat) => {
                                seatsLayout[seat.split("-")[0]][
                                    seat.split("-")[1]
                                ] = 1;
                            });
                            movie.availableSeats.seatsLayout = seatsLayout;
                            const updatedSeats = movie.availableSeats;

                            console.log(updatedSeats, "updated seats");
                            console.log(created.movie);

                            return Promise.all([
                                models.Movie.updateOne(
                                    { _id: created.movie },
                                    { $set: { availableSeats: updatedSeats } }
                                ),
                            ]);
                        }
                    ),
                ]);
            })
            .then((createdOrder) => {
                res.send(createdOrder);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { status } = req.body;
        models.Order.update({ _id: id }, { status })
            .then((updatedTOrder) => res.send(updatedTOrder))
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        const { _id, trips } = req.user;
        const index = trips.indexOf(id);
        console.log(req.body);
        models.Order.findOneAndDelete({ _id: id })
            .then((deleted) => {
                console.log("deleted", deleted);
                return Promise.all([
                    models.User.updateOne(
                        { _id: deleted.user },
                        { $pull: { trips: id } }
                    ),
                ]);
            })
            .then((removedOrder) => res.send(removedOrder))
            .catch(next);
    },
};
