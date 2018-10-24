// @flow
import React from 'react'

import RefreshButton from '../../containers/Buttons/RefreshButton'
import { isMainNetwork } from '../../core/networks'

import styles from './HeaderBar.scss'

type Props = {
  label: string,
  shouldRenderRefresh?: boolean,
  renderLeftContent?: () => any,
  renderRightContent?: () => any,
  networkId: string,
  net: string
}

export default class HeaderBar extends React.PureComponent<Props> {
  static defaultProps = {
    label: ''
  }

  render() {
    const {
      label,
      shouldRenderRefresh = false,
      renderLeftContent = () => null,
      renderRightContent = () => null,
      networkId,
      net
    } = this.props

    return (
      <React.Fragment>
        {!isMainNetwork(networkId) && (
          <div className={styles.currentNetwork}>{net}</div>
        )}
        <div className={styles.headerBar}>
          {label ? <h3> {label}</h3> : renderLeftContent()}
          {shouldRenderRefresh ? <RefreshButton /> : renderRightContent()}
        </div>
      </React.Fragment>
    )
  }
}
