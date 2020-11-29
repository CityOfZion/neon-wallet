// @flow
import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Panel from '../Panel'
import styles from './FailedPanel.scss'
import { ROUTES } from '../../core/constants'
import Loader from '../Loader'

type Props = {
  className: ?string,
  title: ?string,
  onRetry: ?Function,
  loading: boolean,
}

export default class LoadingPanel extends React.Component<Props> {
  static defaultProps = {
    title: 'Failed',
    onRetry: null,
    loading: false,
  }

  render() {
    const { loading, className } = this.props

    return (
      <Panel
        className={className}
        contentClassName={classNames([
          styles.content,
          { [styles.loadingContent]: loading },
        ])}
        renderHeader={this.renderHeader}
      >
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            Failed to load. {this.renderRetry()} or{' '}
            <Link
              to={{
                pathname: ROUTES.NODE_SELECT,
              }}
              className={styles.settingsDonations}
            >
              select a different node.
            </Link>
          </React.Fragment>
        )}
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
    return null
  }

  handleRetry = (event: Object) => {
    event.preventDefault()

    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }
}
