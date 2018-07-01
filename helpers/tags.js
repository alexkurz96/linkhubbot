const onlyUnique = (value, index, self) => self.indexOf(value) === index
const searchTag = content => ({ word, tag_id }) =>
  content.search(word) !== -1 ? tag_id : undefined

const getTagsFromArray = (content, allWords) =>
  allWords
    .map(searchTag(content))
    .filter(s => !!s)
    .filter(onlyUnique)

const getTags = (content, allWords) =>
  getTagsFromArray(content.toLowerCase(), allWords)

module.exports = { getTags }
