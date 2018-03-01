// @flow
import React from 'react'
import classNames from 'classnames'
import { map, times } from 'lodash'

import COLORS from './colors'
import PortfolioRow from './PortfolioRow'
import { toNumber } from '../../../core/math'
// import { formatThousands } from '../../../core/formatters' // formatFiat

import styles from './PortfolioTable.scss'

type Props = {
  className?: string,
  prices: { [key: SymbolType]: number },
  balances: { [key: SymbolType]: string },
  currency: string,
  total: number
}

export default class PortfolioTable extends React.Component<Props> {
  render = (): React$Node => {
    const { className, currency } = this.props
    const data = this.getData()

    return (
      <div className={classNames(styles.portfolioTable, className)}>
        {times(data.length, (index) => (
          <PortfolioRow
            key={data[index].symbol}
            {...data[index]}
            color={COLORS[index % COLORS.length]}
            currency={currency}
          />
        ))}
      </div>
    )
  }

  getData = () => {
    const { prices, total } = this.props

    return map(this.props.balances, (tokenBalance, symbol) => {
      const balance = toNumber(tokenBalance)
      const value = balance * (prices[symbol] || 0)
      const percent = value / total

      return { symbol, balance, value, percent }
    })
  }
}
