const tagNames = require('./tagNames.json')
// const сontent = `Раздача фронтенда react через CDN habrahabr.ru/post/304414/
// В мире современных веб-технологий все стремительно развивается и меняется. Пару лет назад совершенно нормальным было по запросу `

const onlyUnique = (value, index, self) => self.indexOf(value) === index

const getTagsFromArray = (words, allTags) =>
  words
    .map(word => word.toLowerCase().replace('-', '_'))
    .map(word => allTags.find(({ name }) => name === word))
    .filter(s => !!s)
    .map(el => el.id)
    .filter(onlyUnique)

const getTags = (content, allTags) =>
  getTagsFromArray(content.split(' '), allTags)

module.exports = { getTags }
