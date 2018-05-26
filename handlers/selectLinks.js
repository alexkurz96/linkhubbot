const DB = require('../db')
const QUERY = require('../sql').link.select

const selectLinks = async count => {
  try {
    const result = await DB.any(QUERY, { count })
    return result
  } catch (err) {
    console.log('\x1b[31m', 'selectLinks error', '\x1b[37m', ' ', err)
    return []
  }
}

module.exports = selectLinks

// const params = {
//   parse_mode: 'markdown',
//   disable_web_page_preview: true,
//   disable_notification: true
// }

// const itremToMDList = (sum, { title, way }) =>
//   `${sum}${title} [${way}](${way})\n\n`

// const execQuery = async (query, params) => {
//   try {
//   const result = await db.any(query, params)
//   const answer = result.reduce(itremToMDList, '')
//   return answer || 'no links'
//   } catch (err) {
//     slimbot.sendMessage(message.chat.id, 'fail', params)
//   }
// }

// const readLinks = async (slimbot, message) => {
//   try {
//   const answer = await execQuery(QUERY, { count: 3 })
//   slimbot.sendMessage(message.chat.id, answer, params)
//   } catch (err) {
//     console.log(err)
//     slimbot.sendMessage(message.chat.id, 'fail', params)
//   }
// }
