// const onlyUnique = (value, index, self) => self.indexOf(value) === index

const getTagsFromArray = (content, allTags) =>
  allTags
    .map(({ name, id }) => (content.search(name) !== -1 ? id : undefined))
    .filter(s => !!s)

const getTags = (content, allTags) =>
  getTagsFromArray(content.toLowerCase(), allTags)

module.exports = { getTags }
