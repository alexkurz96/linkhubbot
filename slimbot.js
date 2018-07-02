const Slimbot = require('slimbot')
const selectLinks = require('./handlers/selectLinks')
const linkInsert = require('./handlers/linkInsert')
const { selectTags } = require('./handlers/selectTags')
const selectPersons = require('./handlers/selectPersons')
const isUser = require('./handlers/isUser')
const currentPersonId = require('./handlers/currentPersonId')
const checkLogin = require('./handlers/checkLogin')
const signup = require('./handlers/signup')
const { parseMessage } = require('./helpers/messageParse')
const { token } = require('./creditional.json')

const slimbot = new Slimbot(token)

const params = {
  parse_mode: 'markdown',
  disable_web_page_preview: true,
  disable_notification: true
}

const onMessage = async (slimbot, message) => {
  const { title, way, preview, imageUrl, tags } = await parseMessage(
    message.text
  )
  tagsString = tags.reduce((sum, el) => sum + el + '\n', '')
  const answer = `[${title}](${way})\n${preview}\n[${imageUrl}](${imageUrl})\n${tagsString}`
  slimbot.sendMessage(message.chat.id, answer, params)
}

let chain = []
let data = {}

// Register listeners
slimbot.on('message', async message => {
  console.log(message.entities)
  // commands
  try {
    if (message.entities && message.entities[0].type === 'bot_command') {
      const commands = message.entities.filter(el => el.type === 'bot_command') //message.entities.slice(offset, )
      if (commands.length !== 0) {
        const command = message.text.slice(
          commands[0].offset,
          commands[0].length
        )
        switch (command) {
          case '/links':
            const links = await selectLinks(10)
            const res = links.reduce(
              (sum, { title, way, preview }) =>
                `${sum}[${title}](${way})\n${preview}\n\n`,
              ''
            )
            slimbot.sendMessage(
              message.chat.id,
              res === '' ? 'no links' : res,
              params
            )
            break
          case '/tags':
            const tags = await selectTags(50)
            const res_tags = tags.reduce(
              (prev, { id, name }) => `${prev}\n ${id}:${name}\n\n`,
              ''
            )
            slimbot.sendMessage(
              message.chat.id,
              res_tags === '' ? 'no tags' : res_tags,
              params
            )
            break
          case '/persons':
            const persons = await selectPersons(10)
            const res_pers = persons.reduce(
              (prev, { id, first_name }) => `${prev}\n ${id}:${first_name}\n\n`,
              ''
            )
            slimbot.sendMessage(
              message.chat.id,
              res_pers === '' ? 'no persons' : res_pers,
              params
            )
            break
          case '/signup':
            if (await isUser(message.from.id)) {
              slimbot.sendMessage(
                message.chat.id,
                'You are already user',
                params
              )
              break
            } else {
              chain = ['signup']
            }
            break
          default:
            console.log('no handler assigned for the command')
        }
      } else {
        slimbot.sendMessage(message.chat.id, `I don't understand!`, params)
      }
    } else {
      if (await isUser(message.from.id)) {
        try {
          const { title, way, preview, imageUrl, tags } = await parseMessage(
            message.text
          )
          await linkInsert(
            title,
            way,
            await currentPersonId(message.from.id),
            preview,
            imageUrl,
            tags
          )
          slimbot.sendMessage(message.chat.id, `Your link was added!`, params)
        } catch (err) {
          console.err('parseMessage', err)
          slimbot.sendMessage(message.chat.id, `It's not a link`, params)
        }
      } else {
        slimbot.sendMessage(
          message.chat.id,
          'No access to add links! /signup first',
          params
        )
      }
    }

    // chaining
    if (chain.length !== 0) {
      switch (chain[0]) {
        case 'signup':
          switch (chain.slice(-1)[0]) {
            case 'signup':
              chain.push('login')
              slimbot.sendMessage(message.chat.id, 'type your login', params)
              break
            case 'login':
              if (message.text === '') {
                slimbot.sendMessage(
                  message.chat.id,
                  'Empty login is restricted. Input new login',
                  params
                )
                break
              }
              const loginInUse = !(await checkLogin(message.text))
              console.log('LOGIN IN USE: ', loginInUse)
              if (loginInUse) {
                slimbot.sendMessage(
                  message.chat.id,
                  'Login already in use',
                  params
                )
                break
              }
              data.login = message.text
              chain.push('password')
              slimbot.sendMessage(message.chat.id, 'type your password', params)
              break
            case 'password':
              if (message.text === '') {
                slimbot.sendMessage(
                  message.chat.id,
                  'Empty password is restricted. Input new password',
                  params
                )
                break
              }
              data.password = message.text
              const { id, first_name } = message.from
              const person = await signup(
                first_name,
                data.login,
                data.password,
                id
              )
              slimbot.sendMessage(message.chat.id, `Hi ${first_name}`, params)
              break
            default:
              chain = []
          }
          break
        default:
          console.log(`no handler assigned for "${chain_type}" chain type`)
      }
    }
  } catch (error) {
    console.log('message', error)
  }
})

slimbot.on('edited_message', edited_message => {
  try {
    slimbot.sendMessage(message.chat.id, 'Message edited')
  } catch (error) {
    console.log('edited_message', error)
  }
})

slimbot.on('callback_query', query => {
  try {
    if (query.data === 'hello') {
      slimbot.sendMessage(query.message.chat.id, 'Hello to you too!')
    }
  } catch (error) {
    console.log('callback_query', error)
  }
})

// Call API
slimbot.startPolling()

console.log('\x1b[32m', '*** linkhub-bot started ***', '\x1b[37m', '')
