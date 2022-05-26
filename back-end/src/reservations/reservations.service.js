const knex = require("../db/connection");

function list(reservationDate) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_date": reservationDate })
    .orderBy("reservation_time")
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