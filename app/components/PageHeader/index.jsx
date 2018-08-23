// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import Tooltip from '../Tooltip'
import RefreshIcon from '../../assets/icons/refresh.svg'
import styles from './PageHeader.scss'

type Props = {
  loadWalletData: Function,
  loading: boolean,
  title: string,
}

export default class PageHeader extends Component<Props> {
  render() {
    const { loading, loadWalletData, title } = this.props
    return (
      <section className={styles.pageHeader}>
        <h1 className={styles.pageHeading}>{title}</h1>
        <Tooltip title="Refresh" className={styles.headerButtonContainer}>
          <RefreshIcon
            id="refresh"
            className={classNames(styles.refresh, {
              [styles.loading]: loading
            })}
            onClick={loading ? null : loadWalletData}
          />
          <span onClick={loading ? null : loadWalletData}> Refresh </span>
        </Tooltip>
      </section>
    )
  }
}
