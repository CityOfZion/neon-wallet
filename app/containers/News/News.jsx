// @flow
import React, { Fragment } from 'react'
import Panel from '../../components/Panel'
import HeaderBar from '../../components/HeaderBar'

import styles from './News.scss'
import Loader from '../../components/Loader'

type Props = {
  feed: {
    items: Array<{
      content: String,
      creator: String,
    }>,
  },
  loading: boolean,
}

export default class News extends React.Component<Props> {
  render() {
    console.log(this.props.feed)
    return (
      <div className={styles.newsContainer}>
        <HeaderBar
          // networkId={this.props.networkId}
          // net={this.props.net}
          label="News"
          // renderRightContent={this.renderHeaderBarRightContent}
        />
        <Panel className={styles.newsPanel}>
          {this.props.loading ? <Loader /> : this.parseItems()}
        </Panel>
      </div>
    )
  }

  // REGEX for <a> tags <\s*a[^>]*>(.*?)<\s*/\s*a>

  // REGEX for <p> tags <\s*p[^>]*>(.*?)<\s*/\s*p>

  // REGEX for <\s*img[^>]*>(.*?)

  parseItems() {
    const { items } = this.props.feed

    const linkTagRegex = new RegExp('<s*a[^>]*>(.*?)<s*/s*a>')
    const pTagRegex = new RegExp('<s*p[^>]*>(.*?)<s*/s*p>')
    const imgTagRegex = new RegExp('<s*img[^>]*>(.*?)')

    function createMarkup(markdown) {
      return { __html: markdown }
    }

    const imageHrefFromImgTags = img =>
      img
        .split(' ')
        .find(prop => prop.includes('src'))
        .replace('src=', '')

    return items.map(
      item =>
        console.log(
          imageHrefFromImgTags(item.content.match(imgTagRegex)[0]),
        ) || <div dangerouslySetInnerHTML={createMarkup(item.content)} />,
    )
  }
}
