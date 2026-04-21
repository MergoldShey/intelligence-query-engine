
exports.up = function(knex) {
  return knex.schema.createTable('profiles', (table) => {
    table.uuid('id').primary(); // We will generate UUID v7 in the seed/logic
    table.string('name').unique().notNullable();
    table.string('gender').notNullable();
    table.float('gender_probability').notNullable();
    table.integer('age').notNullable();
    table.string('age_group').notNullable();
    table.string('country_id', 2).notNullable();
    table.string('country_name').notNullable();
    table.float('country_probability').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles');
};