// @flow
import React from 'react'
import moment from 'moment'

import Panel from '../../components/Panel'
import HeaderBar from '../../components/HeaderBar'
import styles from './News.scss'
import Loader from '../../components/Loader'

const { shell } = require('electron').remote

type Props = {
  feed: {
    items: Array<{
      content: string,
      creator: string,
      isoDate: Date,
      title: string,
      link: string,
    }>,
  },
  loading: boolean,
  networkId: string,
  net: string,
}

export default class News extends React.Component<Props> {
  render() {
    return (
      <div className={styles.newsContainer}>
        <HeaderBar
          networkId={this.props.networkId}
          net={this.props.net}
          label="News"
        />
        <Panel className={styles.newsPanel}>
          {this.props.loading ? <Loader /> : this.parseItems()}
        </Panel>
      </div>
    )
  }

  parseItems() {
    const { items } = this.props.feed
    const imgTagRegex = new RegExp('<s*img[^>]*>(.*?)')

    const imageHrefFromImgTags = img =>
      img
        .split(' ')
        .find(prop => prop.includes('src'))
        // $FlowFixMe
        .replace('src=', '')
        .replace('"', '')

    return (
      <div className={styles.newsItemsContainer}>
        {items.map(item => {
          const imgSrc = imageHrefFromImgTags(
            // $FlowFixMe
            item.content.match(imgTagRegex)[0],
          )
          const { title } = item
          const openLink = () => shell.openExternal(item.link)
          return (
            <div onClick={openLink} className={styles.newsItem} key={title}>
              <img src={imgSrc} alt="" className={styles.newsImage} />
              <small>{moment(item.isoDate).format('YYYY-MM-DD')}</small>
              <p> {title}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
