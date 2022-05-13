const knex = require("../db/connection");

function getReservationByDate(daySelected) {
    return knex("reservations as r")
        .select("*")
        .where({ "r.reservation_date": daySelected })
        .orderBy("r.reservation_time");
}

module.exports = {
    getReservationByDate,
};