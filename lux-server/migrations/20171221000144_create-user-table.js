exports.up = function (knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id').primary();
    t.string('firstname').notNullable();
    t.string('lastname').notNullable();
    t.sting('email').notNullable();
    t.string('password').notNullable();
    t.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
