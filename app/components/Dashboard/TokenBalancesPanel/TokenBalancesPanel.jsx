// @flow
import React from 'react'
import classNames from 'classnames'

import Panel from '../../Panel'
import Tooltip from '../../Tooltip'
import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './TokenBalancesPanel.scss'

type Props = {
  className: ?string,
  balances: Array<TokenBalanceType>,
  loading: ?boolean,
  refresh: Function
}

export default class TokenBalancesPanel extends React.Component<Props> {
  static defaultProps = {
    loading: false
  }

  render = () => {
    const { className, balances } = this.props

    return (
      <Panel
        className={classNames(styles.tokenBalancesPanel, className)}
        renderHeader={this.renderHeader}
      >
        <div className={styles.tableHeader}>
          <div className={styles.symbol}>Code</div>
          <div className={styles.name}>Token</div>
          <div className={styles.balance}>Balance</div>
        </div>
        {balances.map(this.renderToken)}
      </Panel>
    )
  }

  renderHeader = () => {
    const { refresh, loading } = this.props

    return (
      <div className={styles.header}>
        <span>Token Balances</span>
        <Tooltip title="Refresh">
          <RefreshIcon
            id="refresh"
            className={classNames(styles.refresh, {
              [styles.loading]: loading
            })}
            onClick={loading ? null : refresh}
          />
        </Tooltip>
      </div>
    )
  }

  renderToken = (token: TokenBalanceType) => {
    return (
      <div key={token.scriptHash} className={styles.tableData}>
        <div className={styles.symbol}>{token.symbol}</div>
        <div className={styles.name}>{token.name}</div>
        <div className={styles.balance}>{token.balance}</div>
      </div>
    )
  }
}
