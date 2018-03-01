// @flow
import React from 'react'
import classNames from 'classnames'

import { formatThousands } from '../../../core/formatters'
import { CURRENCIES } from '../../../core/constants'

import styles from './PortfolioRow.scss'

type Props = {
  className?: string,
  symbol: string,
  balance: string,
  value: number,
  percent: number,
  color: string,
  currency: string
}

export default class PortfolioRow extends React.Component<Props> {
  render = (): React$Node => {
    const { className, symbol, balance, value, percent, color } = this.props

    return (
      <div className={classNames(styles.portfolioRow, className)}>
        <span className={styles.color} style={{ background: color }} />
        <span className={styles.symbol}>{symbol}</span>
        <span className={styles.balance}>{balance}</span>
        <span className={styles.value}>{this.formatPrice(value)}</span>
        <span className={styles.percent}>{(percent * 100).toFixed(1)}%</span>
      </div>
    )
  }

  formatPrice = (price: number): string => {
    const { symbol } = CURRENCIES[this.props.currency]
    return `${symbol}${formatThousands(price)}`
  }
}
