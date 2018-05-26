const tagNames = require('./tagNames.json')
// const сontent = `Раздача фронтенда react через CDN habrahabr.ru/post/304414/
// В мире современных веб-технологий все стремительно развивается и меняется. Пару лет назад совершенно нормальным было по запросу `

const onlyUnique = (value, index, self) => self.indexOf(value) === index

const getTagsFromArray = tokens =>
  tokens
    .map(s => s.toLowerCase().replace('-', '_'))
    .map(name => tagNames[name])
    .filter(s => !!s)
    .filter(onlyUnique)

const getTags = content => getTagsFromArray(content.split(' '))

module.exports = { getTags }
