const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const pgp = require('pg-promise')({
  /* initialization options */
})

const { helpers } = pgp

const { dir } = require('./settings.json')

const db = pgp({
  user: 'postgres',
  host: 'localhost',
  database: 'linkhub',
  port: 5432
})

const fill = async tables => {
  for (const table of tables) {
    const data_string = await readFile(dir + table + '.json', 'utf8')
    const data = JSON.parse(data_string)
    if (data.length > 0) {
      // our set of columns, to be created only once, and then shared/reused,
      // to let it cache up its formatting templates for high performance:
      const cs = new helpers.ColumnSet(Object.keys(data[0]), { table })
      // generating a multi-row insert query:
      const result = await db.none(helpers.insert(data, cs))
      console.log(table, result)
    }
  }
}

const tableNames = ['person', 'account', 'link', 'rating']

try {
  fill(tableNames)
} catch (error) {
  // executing the query:
  console.log('catch', error)
}
