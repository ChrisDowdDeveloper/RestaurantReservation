const knex = require("../db/connection");
const reservationsService = require("../reservations/reservations.service");


// list all tables - sorted by table_name
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

// post a new table
function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((res) => res[0]);
}

// read a table by table_id - exists for validation purposes only
function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .then((readTables) => readTables[0]);
}

// seat a reservation at a table
function update(table, reservation) {
    return knex("tables")
        .select("*")
        .where({ "table_id": table.table_id })
        .update({ "reservation_id": reservation.reservation_id })
        .then(() => read(table.table_id))
}

async function destroy(table) {
    return await knex("tables")
        .where({ "table_id": table.table_id })
        .update({ "reservation_id": null })
        .then(() => read(table.table_id));
}

module.exports = {
    create,
    list,
    read,
    update,
    delete: destroy,
};