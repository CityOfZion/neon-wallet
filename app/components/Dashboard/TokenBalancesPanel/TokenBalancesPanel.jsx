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
          <div className={styles.symbol}>Ticker</div>
          <div className={styles.name}>Token</div>
          <div className={styles.balance}>Holdings</div>
        </div>
        {balances.map(this.renderToken)}
      </Panel>
    )
  }

  renderHeader = () => (
    <div className={styles.header}>
      <span>Token Balances</span>
    </div>
  )

  renderToken = (token: TokenBalanceType) => (
    <div key={token.scriptHash} className={styles.tableData}>
      <div className={styles.symbol}>{token.symbol}</div>
      <div className={styles.tokenName}>{token.name}</div>
      <div className={styles.balance}>{token.balance}</div>
    </div>
  )
}
