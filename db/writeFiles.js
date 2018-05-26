const fs = require('fs')
const json2csv = require('json2csv')
const { dir } = require('./settings.json')

const callback = fileName => err => {
  if (err) throw err
  console.log(`The file ${fileName} has been saved!`)
}

const writeTable = ({ tableName, removeFields = [], ...el }) => {
  const data = el[tableName]
  if (data.length < 1) return
  const fields = Object.keys(data[0]).filter(
    field => !removeFields.includes(field)
  )
  const fileName = dir + tableName
  fs.writeFile(
    fileName + '.csv',
    json2csv({ data, fields }),
    callback(tableName + '.csv')
  )
  fs.writeFile(
    fileName + '.json',
    JSON.stringify(data, fields, 2),
    callback(tableName + '.json')
  )
}

module.exports = dataArray => {
  dataArray.forEach(writeTable)
}
