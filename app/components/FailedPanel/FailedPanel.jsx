// @flow
import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Panel from '../Panel'
import styles from './FailedPanel.scss'
import { ROUTES } from '../../core/constants'

type Props = {
  className: ?string,
  title: ?string,
  onRetry: ?Function
}

export default class LoadingPanel extends React.Component<Props> {
  static defaultProps = {
    title: 'Failed',
    onRetry: null
  }

  render() {
    return (
      <Panel
        className={classNames(styles.loadingPanel, this.props.className)}
        contentClassName={styles.content}
        renderHeader={this.renderHeader}
      >
        Failed to load. {this.renderRetry()} or{' '}
        <Link
          to={{
            pathname: ROUTES.NODE_SELECT
          }}
          className={styles.settingsDonations}
        >
          select a different node.
        </Link>
      </Panel>
    )
  }

  renderHeader = () => <span>{this.props.title}</span>

  renderRetry = () => {
    if (this.props.onRetry) {
      return (
        <a href="#" onClick={this.handleRetry}>
          Retry
        </a>
      )
    }
  }

  handleRetry = (event: Object) => {
    event.preventDefault()

    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }
}
