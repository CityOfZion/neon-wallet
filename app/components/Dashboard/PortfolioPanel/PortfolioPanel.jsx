// @flow
import React from 'react'
import classNames from 'classnames'

import PortfolioBreakdownChart from './PortfolioBreakdownChart'
import PortfolioTable from './PortfolioTable'
import Panel from '../../Panel'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'
import styles from './PortfolioPanel.scss'

type BalanceType = {
  symbol: SymbolType,
  balance: string,
  value: number,
  percent: number
}

type Props = {
  className: ?string,
  currency: string,
  balances: { [key: SymbolType]: BalanceType }
}

export default class PortfolioPanel extends React.Component<Props> {
  render = () => {
    const { className, balances, currency } = this.props
    const shouldRenderChart = Array.isArray(balances) && balances.length
    return (
      <Panel
        className={classNames(styles.portfolioPanel, className)}
        contentClassName={styles.content}
        renderHeader={this.renderHeader}
      >
        {shouldRenderChart ? (
          // $FlowFixMe
          <React.Fragment>
            <PortfolioBreakdownChart
              className={styles.chart}
              balances={balances}
              currency={currency}
            />
            <PortfolioTable
              className={styles.table}
              balances={balances}
              currency={currency}
            />
          </React.Fragment>
        ) : (
          <div className={styles.emptyBalanceContainer}>
            <LogoWithStrikethrough />
          </div>
        )}
      </Panel>
    )
  }

  renderHeader = () => <div className={styles.header}>Total Wallet Value</div>
}
