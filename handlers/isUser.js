const DB = require('../db')
const QUERY = require('../sql').auth.isUser

const isUser = async telegram_id => {
  try {
    const result = await DB.any(QUERY, { telegram_id })
    return result[0].is_user_telegram
  } catch (err) {
    console.log('\x1b[31m', 'isUser error', '\x1b[37m', ' ', err)
    return false
  }
}

module.exports = isUser
