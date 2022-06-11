const knex = require("../db/connection");

function list(reservationDate) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_date": reservationDate })
        .whereNot({ "status": "finished" })
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

function statusUpdate(finishStatus) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: finishStatus.reservation_id })
        .update(finishStatus, "*")
        .then((updatedStatus) => updatedStatus[0]);
}

function create(created) {
    return knex("reservations")
        .insert(created)
        .returning("*")
        .then((createdReservation) => createdReservation[0])
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
    read,
    create,
    update,
    statusUpdate,
    delete: destroy,
    find: search,
}