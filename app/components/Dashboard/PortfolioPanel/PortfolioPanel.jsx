// @flow
import React from 'react'
import classNames from 'classnames'

import PortfolioBreakdownChart from './PortfolioBreakdownChart'
import PortfolioTable from './PortfolioTable'
import Panel from '../../Panel'
import styles from './PortfolioPanel.scss'

type Props = {
  className: ?string,
  currency: string,
  prices: { [key: SymbolType]: number },
  balances: { [key: SymbolType]: string },
  total: number
}

export default class PortfolioPanel extends React.Component<Props> {
  render = () => {
    const { className, prices, balances, currency, total } = this.props

    return (
      <Panel className={classNames(styles.portfolioPanel, className)} renderHeader={this.renderHeader}>
        <div className={styles.container}>
          <PortfolioBreakdownChart
            className={styles.chart}
            balances={balances}
            currency={currency}
          />
          <PortfolioTable
            className={styles.table}
            prices={prices}
            balances={balances}
            currency={currency}
            total={total}
          />
        </div>
      </Panel>
    )
  }

  renderHeader = () => {
    return (
      <div className={styles.header}>Portfolio</div>
    )
  }
}
