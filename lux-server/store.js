const crypto = require('crypto');
//crypto doesn't need to be npm installed
const knex = require('knex')(require('./knexfile'));
module.exports = {
  saltHashPassword,
  createUser ({ firstname, lastname, email, password }) {
    console.log(`Adding user: ${firstname} ${lastname} with email: ${email}`);
    const { salt, hash } = saltHashPassword(password);
    return knex('users').insert({
      salt,
      encrypted_password: hash,
      firstname,
      lastname,
      email,
    });
  }
};

function saltHashPassword (password) {
  let salt = getRandomString();
  let hash = crypto
  //hashing algorith sha512
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function getRandomString () {
  return crypto.randomBytes(4).toString('hex')
}
