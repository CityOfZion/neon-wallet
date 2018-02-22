// @flow
import React from 'react'
import classNames from 'classnames'

import PortfolioBreakdownChart from './PortfolioBreakdownChart'
import Panel from '../../Panel'
import styles from './PortfolioPanel.scss'

type Props = {
  className: ?string,
  currency: string,
  balances: { [key: SymbolType]: string }
}

export default class PortfolioPanel extends React.Component<Props> {
  render = () => {
    const { className, balances, currency } = this.props

    return (
      <Panel className={classNames(styles.priceHistoryPanel, className)} renderHeader={this.renderHeader}>
        <PortfolioBreakdownChart balances={balances} currency={currency} />
      </Panel>
    )
  }

  renderHeader = () => {
    return (
      <div className={styles.header}>Portfolio</div>
    )
  }
}
