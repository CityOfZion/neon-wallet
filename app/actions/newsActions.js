// @flow

import Parser from 'rss-parser'
import { createActions } from 'spunky'

const parser = new Parser()

export const ID = 'news'

async function parseNewsFeedXML() {
  const feed = await parser.parseURL('https://neonewstoday.com/feed/')
  return feed
}

export default createActions(ID, () => async (): Promise<any> => {
  const feed = await parseNewsFeedXML()
  return { feed }
})
