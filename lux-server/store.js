var knex = require('knex')(require('./knexfile'));
module.exports = {
  createUser ({ firstname, lastname, email, password }) {
    console.log(`Added user: ${firstname} ${lastname} with email: ${email}`);
    return knex('users').insert({
      firstname,
      lastname,
      email,
      password
    });
  }
};
