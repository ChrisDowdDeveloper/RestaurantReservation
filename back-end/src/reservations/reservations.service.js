const list = (reservationDate) =>
    knex('reservations')
        .select('*')
        .where({ reservation_date: reservationDate })
        .orderBy('reservation_time')


module.exports = {
    list,
}