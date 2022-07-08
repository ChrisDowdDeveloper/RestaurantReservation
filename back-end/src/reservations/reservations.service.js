const knex = require("../db/connection");

function list() {
    return knex("reservations").select("*").whereNot({ status: "finished" });
}

function listByDate(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .whereNot({ status: "finished" })
        .orderBy("reservation_time");
}

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((res) => res[0]);
}

function listByPhone(mobile_number) {
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .returning("*")
        .orderBy("reservation_date")
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
}

function updateStatus(status, reservation_id) {
    return knex("reservations")
        .where({ reservation_id })
        .update({ status: status })
        .returning("*")
        .then(result => result[0])
}

function update(updatedReservation, reservation_id) {
    return knex("reservations")
        .where({ reservation_id })
        .update({ ...updatedReservation })
        .returning("*")
        .then(res => res[0])
}

module.exports = {
    list,
    listByDate,
    listByPhone,
    create,
    read,
    updateStatus,
    update
};