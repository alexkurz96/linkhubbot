const util = require('util')
const ogs = require('open-graph-scraper')

const ogsParse = util.promisify(ogs)

const parseLink = async url => {
  try {
    const options = { url }
    const results = await ogsParse(options)
    // console.log(results)
    return results
  } catch (err) {
    // console.log(err)

    return { error: true }
  }
}
// console.log('https://habrahabr.ru/company/tinkoff/blog/337940/')
// parseLink('https://habrahabr.ru/company/tinkoff/blog/337940/')
module.exports = { parseLink }
