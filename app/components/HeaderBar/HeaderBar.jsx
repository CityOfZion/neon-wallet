// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import RefreshIcon from '../../assets/icons/refresh.svg'

import styles from './HeaderBar.scss'

type Props = {
  label: string,
  shouldRenderRefresh: boolean,
  renderLeftContent: () => any,
  renderRightContent: () => any,
  loadWalletData: Function,
  loading: boolean
}

export default class HeaderBar extends React.Component<Props> {
  static defaultProps = {
    label: ''
  }

  render() {
    const {
      label,
      shouldRenderRefresh = false,
      renderLeftContent,
      renderRightContent,
      loadWalletData,
      loading
    } = this.props

    const Refresh = () => (
      <div className={styles.refreshButton}>
        <span onClick={loading ? null : loadWalletData}> Refresh </span>
        <RefreshIcon
          id="refresh"
          className={classNames(styles.refresh, {
            [styles.loading]: loading
          })}
          onClick={loading ? null : loadWalletData}
        />
      </div>
    )

    return (
      <div className={styles.headerBar}>
        {label ? <h3> {label}</h3> : renderLeftContent()}
        {shouldRenderRefresh ? <Refresh /> : renderRightContent()}
      </div>
    )
  }
}
