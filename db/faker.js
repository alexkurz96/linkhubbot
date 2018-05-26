const faker = require('faker')

faker.locale = 'en'

const getRandomInt = (min, max) =>
  min + Math.floor(Math.random() * (max - min)) + 1

const postBody = (dis, textPreview) =>
  [...Array(Math.floor(dis.ppf(Math.random()) + 0.1))].reduce(
    (prev, current) => prev + '\n' + faker.lorem.paragraphs(),
    textPreview
  )

const getPerson = (id, dis) => ({
  id,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  patronymic: '',
  date_of_birth: faker.date.between('1970-01-01', '2010-12-31'),
  about: faker.name.title(),
  activity: dis.ppf(Math.random())
})

const getAccount = person => ({
  person_id: person.id,
  login: faker.internet
    .userName()
    .toLocaleLowerCase()
    .match(/[a-z]+[a-z0-9]/g)
    .join(''),
  email: faker.internet.email(),
  password_hash: faker.internet.password(getRandomInt(5, 10)), // need to encrypt in the postgress
  role: 'authorized'
})

const getLink = (id, person_id, minDate, dis) => ({
  id,
  person_id,
  title: faker.lorem.sentence(),
  way: faker.internet.url(),
  created_at: faker.date.between(minDate, new Date()),
  popularity: dis.ppf(Math.random()),
  quality: dis.ppf(Math.random())
})

const getRating = (person_id, link_id, positive) => ({
  link_id,
  person_id,
  positive
})

module.exports = { getPerson, getAccount, getLink, getRating }
