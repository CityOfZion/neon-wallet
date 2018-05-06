// @flow
import React from 'react'

import Panel from '../Panel'
import styles from './FailedPanel.scss'

type Props = {
  title: ?string,
  onRetry: ?Function
}

export default class LoadingPanel extends React.Component<Props> {
  static defaultProps = {
    title: 'Failed',
    onRetry: null
  }

  render () {
    return (
      <Panel
        className={styles.failedPanel}
        contentClassName={styles.content}
        renderHeader={this.renderHeader}
      >
        Failed to load.{' '}{this.renderRetry}
      </Panel>
    )
  }

  renderHeader = () => {
    return <span>{this.props.title}</span>
  }

  renderRetry = () => {
    if (this.props.onRetry) {
      return <a href="#" onClick={this.handleRetry}>Retry?</a>
    }
  }

  handleRetry = (event: Object) => {
    event.preventDefault()

    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }
}
