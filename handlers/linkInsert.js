const DB = require('../db')
const QUERY = require('../sql').link.insert

const linkInsert = async (title, way, person_id, preview, image_url, tags) => {
  try {
    const result = await DB.any(QUERY, {
      title,
      way,
      person_id,
      preview,
      image_url
    })

    // const tags = await DB.any(QUERY)

    // const data = tags.map(el => ({ link_id: result[0].id, tag_id: el }))

    // const cs = new helpers.ColumnSet(['link_id', 'tag_id'], { table })
    // const result = await DB.none(helpers.insert(data, cs))

    console.log('\x1b[31m', 'linkInsert', '\x1b[37m', ' ', result)
    return result
  } catch (err) {
    console.log('\x1b[31m', 'linkInsert error', '\x1b[37m', ' ', err)
    return []
  }
}

module.exports = linkInsert
