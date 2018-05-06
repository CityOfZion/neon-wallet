// @flow
import React from 'react'

import Panel from '../Panel'
import Loader from '../Loader'
import styles from './LoadingPanel.scss'

type Props = {
  title: ?string
}

export default class LoadingPanel extends React.Component<Props> {
  static defaultProps = {
    title: 'Loading'
  }

  render () {
    return (
      <Panel
        className={styles.loadingPanel}
        contentClassName={styles.content}
        renderHeader={this.renderHeader}
      >
        <Loader />
      </Panel>
    )
  }

  renderHeader = () => {
    return <span>{this.props.title}</span>
  }
}
