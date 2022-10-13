// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import RefreshIcon from '../../../assets/icons/refresh.svg'

import styles from './RefreshButton.scss'

type Props = {
  loadWalletData?: () => void,
  loading?: boolean,
}

class RefreshButton extends Component<Props> {
  render() {
    const { loadWalletData, loading } = this.props
    return (
      <div
        className={styles.refreshButton}
        onClick={loading ? null : loadWalletData}
      >
        <RefreshIcon
          id="refresh"
          className={classNames(styles.refresh, {
            [styles.loading]: loading,
          })}
        />
        <span className={styles.refreshButtonSpan}>
          <FormattedMessage id="dashboardRefresh" />
        </span>
      </div>
    )
  }
}

export default RefreshButton
