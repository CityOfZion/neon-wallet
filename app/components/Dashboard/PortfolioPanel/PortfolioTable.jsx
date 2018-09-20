// @flow
import React from 'react'
import classNames from 'classnames'
import { values, times } from 'lodash-es'

import COLORS from './colors'
import PortfolioRow from './PortfolioRow'

import styles from './PortfolioTable.scss'

type BalanceType = {
  symbol: SymbolType,
  balance: string,
  value: number,
  percent: number
}

type Props = {
  className?: string,
  balances: { [key: SymbolType]: BalanceType },
  currency: string
}

export default class PortfolioTable extends React.Component<Props> {
  render = (): React$Node => {
    const { className, currency } = this.props
    const data = values(this.props.balances)

    return (
      <div className={classNames(styles.portfolioTable, className)}>
        {times(data.length, index => (
          <PortfolioRow
            {...data[index]}
            key={data[index].symbol}
            index={index}
            color={COLORS[index % COLORS.length]}
            currency={currency}
          />
        ))}
      </div>
    )
  }
}
