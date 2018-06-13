const urlRegex = require('url-regex')

const selectTags = require('../handlers/selectTags')

const { parseLink } = require('./openGraph')
const { getTags } = require('./tags')

const content1 = `https://medium.com/@vncnt/the-easy-way-to-stop-using-sketch-and-switch-to-figma-578e02f55443`

const separateLink = content => {
  const urls = content.match(urlRegex({ strict: false }))
  const text =
    urls.length > 0
      ? urls.reduce((sum, el) => sum.replace(el, ''), content)
      : urls
  return { url: urls.length > 0 ? urls[0] : undefined, text }
}

const parseMessage = async messageText => {
  const LinkAndText = separateLink(messageText)
  if (LinkAndText.url) {
    openGraph = await parseLink(LinkAndText.url)
    const allTags = await selectTags()
    const tags = getTags(
      openGraph.error
        ? LinkAndText.text
        : LinkAndText.text +
          ' ' +
          openGraph.data.ogTitle +
          ' ' +
          openGraph.data.ogDescription,
      allTags
    )
    if (openGraph.error) {
      return {
        title: LinkAndText.url,
        way: LinkAndText.url,
        preview: LinkAndText.text,
        imageUrl: undefined,
        tags
      }
    } else {
      return {
        title: openGraph.data.ogTitle,
        way: LinkAndText.url,
        preview: openGraph.data.ogDescription,
        imageUrl: openGraph.data.ogImage
          ? openGraph.data.ogImage.url
          : undefined,
        tags
      }
    }
  }
}

module.exports = { parseMessage }
// const a = {
//   data: {
//     ogLocale: 'ru_RU',
//     ogType: 'article',
//     ogUrl: 'https://habrahabr.ru/company/tinkoff/blog/337940/',
//     ogTitle: 'Пишем телеграм бота-парсера вакансий на JS',
//     ogDescription:
//       'Тема создания ботов для Telegram становится все более популярной, привлекая программистов попробовать свои силы на этом поприще. У каждого периодически...',
//     twitterDescription:
//       'Тема создания ботов для Telegram становится все более популярной, привлекая программистов попробовать свои силы на этом поприще. У каждого периодически...',
//     twitterTitle: 'Пишем телеграм бота-парсера вакансий на JS',
//     twitterCard: 'summary_large_image',
//     twitterSite: '@habrahabr',
//     ogImage: {
//       url: 'https://habrastorage.org/webt/59/d3/86/59d3867ce9243909001139.jpeg',
//       width: null,
//       height: null,
//       type: null
//     },
//     twitterImage: {
//       url: 'https://habrastorage.org/webt/59/d3/86/59d3867ce9243909001139.jpeg',
//       width: null,
//       height: null,
//       alt: null
//     }
//   },
//   success: true,
//   requestUrl: 'https://habrahabr.ru/company/tinkoff/blog/337940/'
// }

// const testParse = async () => {
//   const r = await parseMessage(content1)
//   console.log(r)
// }

// testParse()
