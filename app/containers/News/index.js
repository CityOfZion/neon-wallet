import React from 'react'
import Parser from 'rss-parser'

const parser = new Parser()

/*
  - Write parsing logic for headline / image
  - modularize this directory
  - cache in state via spunky or vanilla redux
*/

async function parseStuff() {
  const feed = await parser.parseURL('https://neonewstoday.com/feed/')
  feed.items.forEach(item => {
    console.log({ item })
  })
}

export default function() {
  parseStuff()
  return <div> hello world</div>
}
