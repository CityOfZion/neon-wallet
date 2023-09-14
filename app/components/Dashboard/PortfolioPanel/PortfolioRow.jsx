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
  currency: string,
  index: number,
}

export default class PortfolioRow extends React.Component<Props> {
  render = (): React$Node => {
    const {
      className,
      symbol,
      balance,
      value,
      percent,
      color,
      index,
    } = this.props
    return (
      <div
        className={classNames(styles.portfolioRow, className, {
          [styles.oddColor]: index % 2 !== 0,
          [styles.evenColor]: index % 2 === 0,
        })}
      >
        <span className={styles.color} style={{ background: color }} />
        <span className={styles.percent} style={{ color }}>
          {(percent * 100).toFixed(1)}%
        </span>
        <span className={styles.symbol}>{symbol}</span>
        <span className={styles.balance}>{this.processBalance(balance)}</span>
        <span className={styles.value}>{this.formatPrice(value)}</span>
      </div>
    )
  }

  formatPrice = (price: number): string => {
    if (CURRENCIES[this.props.currency]) {
      const { symbol } = CURRENCIES[this.props.currency]
      return `${symbol}${formatThousands(price)}`
    }
  }

  processBalance = (balance: string) => {
    const balanceAsNumber = Number(balance)
    if (balanceAsNumber % 1 !== 0) {
      return balanceAsNumber.toFixed(3)
    }
    return balanceAsNumber
  }
}
