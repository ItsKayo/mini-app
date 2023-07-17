/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('id')
    table.string('title')
    table.string('img')
    table.string('description')
    table.string('released')
    table.string('director')
    table.boolean('watched').defaultTo(false)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('movies');
};
