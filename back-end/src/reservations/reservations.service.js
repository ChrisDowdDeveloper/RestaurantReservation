const knex = require("../db/connection");

function list() {
    return knex("reservations")
        .select("*")
        .orderBy("reservation_time");
}

function listByDate(reservationDate) {
    return knex("reservations")
        .select("*")
        .where({ reservationDate })
        .whereNot({ "status": "finished" })
        .whereNot({ "status": "cancelled" })
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
        .update(updatedReservation, "*")
        .then((res) => res[0]);
}

function statusUpdate(reservation_id, status) {
    return knex("reservations")
        .where({ reservation_id })
        .update({ status })
        .then(() => read(reservation_id));
}

function create(created) {
    return knex("reservations")
        .insert(created)
        .returning("*")
        .then((res) => res[0])
}

function destroy(reservation_id) {
    return knex("reservations")
        .where({ "reservation_id": reservation_id })
        .del()
}

function search(mobile_number) {
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date");
}

module.exports = {
    list,
    listByDate,
    read,
    create,
    update,
    statusUpdate,
    delete: destroy,
    find: search,
}