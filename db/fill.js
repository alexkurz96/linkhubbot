const { getPerson, getAccount, getLink, getRating } = require('./faker')
const writeFiles = require('./writeFiles')
const gaussian = require('gaussian')

const getRandomInt = max => Math.floor(Math.random() * max) + 1

const N_persons = 100 // число пользователей
const N_links = 2000 // число линков
const minDate = new Date(2017, 0, 0, 0, 0, 0, 0) // начало работы сервиса
const M = 5 // матожидание распределения популярности постов и активности пользователей
const dis = gaussian(5, 1.22) // 1.22^2 = 1.5 => 97% всех образцов будут лежать в диапазоне (0.5, 9.5)

const person = [...Array(N_persons)].map((el, i) => getPerson(i + 1, dis))
const account = person.map((el, i) => getAccount(el))
const link = [...Array(N_links)].map((el, i) =>
  getLink(i + 1, getRandomInt(N_persons), minDate, dis)
)
const rating = link.reduce((prev, link) => {
  person.forEach(person => {
    if (person.activity * link.popularity > 25 * M * M * Math.random()) {
      prev.push(
        getRating(person.id, link.id, link.quality > 2 * M * Math.random())
      )
    }
  })
  return prev
}, [])

const dataArray = [
  {
    tableName: 'person',
    person,
    removeFields: ['activity']
  },
  {
    tableName: 'account',
    account
  },
  {
    tableName: 'link',
    link,
    removeFields: ['popularity', 'quality']
  },
  {
    tableName: 'rating',
    rating
  }
]

writeFiles(dataArray)
