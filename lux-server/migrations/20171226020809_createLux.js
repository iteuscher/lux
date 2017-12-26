exports.up = function (knex) {
  return knex.schema.createTable('luxes', function (table) {
    //console.log(`making new lux in knex migration`);
      table.increments('id').primary()
      table.string('adminname').notNullable()
      table.string('adminemail').notNullable()
      table.string('luxname').notNullable()
      table.string('luxdescription').notNullable()
      table.string('q1').notNullable()
      table.string('q2').notNullable()
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('luxes');
};
