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

function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*");
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
    update,
}