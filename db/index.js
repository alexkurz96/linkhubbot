const initOptions = {
  // initialization options
}

const pgp = require('pg-promise')(initOptions)

const { user, password } = require('../creditional.json')


const db = pgp({
  user,
  password,
  host: 'localhost',
  database: 'linkhub',
  port: 5432
})

module.exports = db
