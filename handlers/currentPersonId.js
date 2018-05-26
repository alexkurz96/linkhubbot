const DB = require('../db')
const QUERY = require('../sql').auth.currentPersonId

const currentPersonId = async telegram_id => {
  try {
    const result = await DB.any(QUERY, { telegram_id })
    return result[0].current_person_id_telegram
  } catch (err) {
    console.log('\x1b[31m', 'currentPersonId error', '\x1b[37m', ' ', err)
    return false
  }
}

module.exports = currentPersonId
