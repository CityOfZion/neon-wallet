// @flow
import React from 'react'

type Props = {
  feed: {
    items: Array<{
      content: String,
      creator: String,
    }>,
  },
}

export default class News extends React.Component<Props> {
  render() {
    return this.parseItems()
  }

  parseItems() {
    const { items } = this.props.feed
    return items.map(item => <div>{item.creator}</div>)
  }
}
