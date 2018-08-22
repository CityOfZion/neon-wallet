// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import Tooltip from '../../Tooltip'
import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './SendPageHeader.scss'

type Props = {
  loadWalletData: Function,
  loading: boolean
}

export default class SendPageHeader extends Component<Props> {
  render() {
    const { loading, loadWalletData } = this.props
    return (
      <section className={styles.sendPageHeader}>
        <h1 className={styles.sendPageHeading}>Send Assets</h1>
        <Tooltip title="Refresh" className={styles.headerButtonContainer}>
          <span onClick={loading ? null : loadWalletData}> Refresh </span>
          <RefreshIcon
            id="refresh"
            className={classNames(styles.refresh, {
              [styles.loading]: loading
            })}
            onClick={loading ? null : loadWalletData}
          />
        </Tooltip>
      </section>
    )
  }
}
