
exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary().unique().notNullable();
    table.string("table_name").notNullable();
    table.string("status")
      .notNullable()
      .defaultTo("open");
    table.integer("capacity").notNullable();
    table.integer("reservation_id").unsigned()
    table.foreign("reservation_id")
    .references("reservation_id")
    .inTable("reservations")
    .onDelete("CASCADE")
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};