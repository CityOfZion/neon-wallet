// @flow
import React from 'react'
import classNames from 'classnames'

import Panel from '../../Panel'
import Tooltip from '../../Tooltip'
import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './TokenBalancesPanel.scss'
import { toFixedDecimals } from '../../../core/formatters'
import { CURRENCIES } from '../../../core/constants'

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
    console.log(this.props)
    return (
      <Panel
        className={classNames(styles.tokenBalancesPanel, className)}
        renderHeader={this.renderHeader}
      >
        <div className={styles.tableHeader}>
          <div className={styles.symbol}>Ticker</div>
          <div className={styles.name}>Token</div>
          <div className={styles.priceLabel}>Price</div>
          <div className={styles.balance}>Holdings</div>
        </div>
        {balances.map(this.renderToken)}
      </Panel>
    )
  }

  formatPrice = (ticker: string): string => {
    console.log(ticker)
    const { prices, currencyCode } = this.props
    const { symbol } = CURRENCIES[currencyCode]

    console.log(symbol)

    const currPriceOfToken = prices[ticker]

    if (!currPriceOfToken) return 'N/A'

    console.log(currPriceOfToken)
    // prices.find(price)
    return `${symbol}${toFixedDecimals(currPriceOfToken, 2)}`
  }

  renderHeader = () => (
    <div className={styles.header}>
      <span>Token Balances</span>
    </div>
  )

  renderToken = (token: TokenBalanceType) => (
    <div key={token.scriptHash} className={styles.tableData}>
      <div className={styles.tickerName}>{token.symbol}</div>
      <div className={styles.tokenName}>{token.name}</div>
      <div className={styles.price}>{this.formatPrice(token.symbol)}</div>
      <div className={styles.balanceValue}>{token.balance}</div>
    </div>
  )
}
