const knex = require("../db/connection");

function list(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_date": reservation_date })
}

function create(created) {
    return knex("reservations")
        .insert(created)
        .returning("*")
        .then((createdReservation) => createdReservation[0])
}

module.exports = {
    list,
    create,
}