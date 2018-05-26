const DB = require('../db')
const QUERY = require('../sql').auth.signup

const signup = async (first_name, login, password, telegram_id) => {
  try {
    const result = await DB.any(QUERY, {
      first_name,
      login,
      password,
      telegram_id
    })
    return result[0].register_telegram
  } catch (err) {
    console.log('\x1b[31m', 'signup error', '\x1b[37m', ' ', err)
    return false
  }
}

module.exports = signup
