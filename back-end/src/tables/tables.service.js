const knex = require("../db/connection");

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id }).first();
}

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((newTable) => newTable[0]);
}

async function update(reservation_id, table_id) {
    return knex("reservations")
        .where({ reservation_id })
        .update({ status: "seated" })
        .then(() =>
            knex("tables")
                .where({ table_id })
                .update({ reservation_id }, [
                    "table_id",
                    "table_name",
                    "capacity",
                    "reservation_id",
                ])
                .then((res) => res[0].status)
        );
}

function finishTable(reservation_id, table_id) {
    return knex("reservations")
        .where({ reservation_id })
        .update({ status: "finished" })
        .returning("*")
        .then(() => {
            return knex("tables")
                .where({ table_id })
                .update({ reservation_id: null });
        });
}

module.exports = {
    list,
    read,
    create,
    update,
    finishTable
};