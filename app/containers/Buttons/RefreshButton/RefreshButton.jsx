// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import RefreshIcon from '../../../assets/icons/refresh.svg'

import styles from './RefreshButton.scss'

type Props = {
  loadWalletData: () => void,
  loading?: boolean
}

class RefreshButton extends Component<Props> {
  render() {
    const { loadWalletData, loading } = this.props

    return (
      <div className={styles.refreshButton}>
        <span
          onClick={loading ? null : loadWalletData}
          className={styles.refreshButtonSpan}
        >
          Refresh
        </span>
        <RefreshIcon
          id="refresh"
          className={classNames(styles.refresh, {
            [styles.loading]: loading
          })}
          onClick={loading ? null : loadWalletData}
        />
      </div>
    )
  }
}

export default RefreshButton
