// @flow
import React from 'react'
import classNames from 'classnames'
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts'
// $FlowFixMe
import { map, times } from 'lodash-es'

import COLORS from './colors'
import { formatThousands } from '../../../core/formatters'
import { CURRENCIES } from '../../../core/constants'

import styles from './PortfolioBreakdownChart.scss'

type BalanceType = {
  symbol: SymbolType,
  balance: string,
  value: number,
  percent: number,
}

type Props = {
  className?: string,
  balances: { [key: SymbolType]: BalanceType },
  currency: string,
}

export default class PortfolioBreakdownChart extends React.Component<Props> {
  render = (): React$Node => {
    const { className } = this.props
    const data = this.getData()

    return (
      <ResponsiveContainer
        width={200}
        className={classNames(styles.portfolioBreakdownChart, className)}
      >
        <PieChart width={200} height={180}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="symbol"
            innerRadius={71}
            outerRadius={81}
          >
            {times(data.length, index => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index]}
              />
            ))}
            <Label
              fontSize={22}
              value={this.getTotalValueWithPrice()}
              position="center"
              id="totalWalletValue"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
  }

  getTotalValueWithPrice = () => {
    const balanceInfo = map(this.props.balances, ({ value }, symbol) => ({
      symbol,
      value,
    }))

    const total = balanceInfo.reduce(
      (accum, current) => accum + current.value,
      0,
    )
    return this.formatPrice(total, formatThousands)
  }

  getData = () =>
    // $FlowFixMe
    map(this.props.balances, ({ value }, symbol) => ({ symbol, value }))

  formatPrice = (
    price: number,
    formatter: Function = formatThousands,
  ): string => {
    const { symbol } = CURRENCIES[this.props.currency]
    return `${symbol}${formatter(price)}`
  }
}
