// @flow
import React from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import Panel from '../../components/Panel'
import HeaderBar from '../../components/HeaderBar'
import styles from './News.scss'
import Loader from '../../components/Loader'

const electron = require('electron')

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

type State = {
  currentPage: number,
}

export default class News extends React.Component<Props, State> {
  state = {
    currentPage: 1,
  }

  render() {
    return (
      <div className={styles.newsContainer}>
        <HeaderBar
          networkId={this.props.networkId}
          net={this.props.net}
          label={<FormattedMessage id="newsPageLabel" />}
        />
        <Panel
          onScroll={this.handleScroll}
          contentClassName={styles.newsPanelContent}
          className={styles.newsPanel}
        >
          {this.props.loading ? <Loader /> : this.parseItems()}
        </Panel>
      </div>
    )
  }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      setTimeout(() => {
        this.setState(state => ({ currentPage: state.currentPage + 1 }))
      }, 500)
    }
  }

  parseItems = () => {
    const { items } = this.props.feed
    const imgTagRegex = new RegExp('<s*img[^>]*>(.*?)')

    const imageHrefFromImgTags = img =>
      img
        .split(' ')
        .find(prop => prop.includes('src'))
        // $FlowFixMe
        .replace('src=', '')
        .replace('.png', '')
        .replace('"', '')
        .replace('"', '')

    const reducedItems = items.slice(0, this.state.currentPage * 15)

    return (
      <div className={styles.newsItemsContainer}>
        {reducedItems.map(item => {
          const imgSrc = `${imageHrefFromImgTags(
            // $FlowFixMe
            item.content.match(imgTagRegex)[0],
          )}-300x169.png`
          const { title } = item
          const openLink = () => electron.shell.openExternal(item.link)
          return (
            <div onClick={openLink} className={styles.newsItem} key={title}>
              <img src={imgSrc} alt={title} className={styles.newsImage} />
              <div className={styles.content}>
                <small>{moment(item.isoDate).format('YYYY-MM-DD')}</small>
                <p> {title}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
