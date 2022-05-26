const knex = require("../db/connection");

function list() {
    return knex("tables").select("*")
}

function create(created) {
    return knex("tables")
        .insert(created)
        .returning("*")
        .then((createdTable) => createdTable[0])
}

module.exports = {
    list,
    create,
}