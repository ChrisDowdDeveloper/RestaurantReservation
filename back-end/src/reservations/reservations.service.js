const knex = require("../db/connection");

function list() {
    return knex("reservations").select("*")
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