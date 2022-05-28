const knex = require("../db/connection");

function list(reservationDate) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_date": reservationDate })
        .orderBy("reservation_time")
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_id": reservation_id })
        .first();
}

function create(created) {
    return knex("reservations")
        .insert(created)
        .returning("*")
        .then((createdReservation) => createdReservation[0])
}

module.exports = {
    list,
    read,
    create,
}