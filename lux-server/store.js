const crypto = require('crypto');
//crypto doesn't need to be npm installed
const knex = require('knex')(require('./knexfile'));
module.exports = {
  // saltHashPassword,
  createUser ({ firstname, lastname, email, password }) {
    console.log(`Adding user: ${firstname} ${lastname} with email: ${email}`);
    const { salt, hash } = saltHashPassword({ password });
    return knex('users').insert({
      salt,
      encrypted_password: hash,
      firstname,
      lastname,
      email,
    })
  },

  authenticate ({ email, password }) {
    console.log(`Authenticating user: ${email}`)
    return knex('users').where({ email })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        //check newly hashed password against original hashed password
        return { success: hash === user.encrypted_password}
      })

  }

};

function saltHashPassword ({ password, salt = getRandomString() })
{
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
