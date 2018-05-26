const DB = require('../db')
const QUERY = require('../sql').auth.checkLogin

const checkLogin = async login => {
  try {
    const result = await DB.any(QUERY, { login })
    return result[0].login_is_awailable
  } catch (err) {
    console.log('\x1b[31m', 'checkLogin error', '\x1b[37m', ' ', err)
    return false
  }
}

module.exports = checkLogin
