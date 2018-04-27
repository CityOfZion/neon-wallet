// @flow
import React from 'react'
import classNames from 'classnames'

import Panel from '../../Panel'
import Claim from '../../../containers/Claim'
import Tooltip from '../../../components/Tooltip'
import { formatGAS, formatFiat, formatNEO } from '../../../core/formatters'
import { toNumber, toBigNumber } from '../../../core/math'
import { ASSETS, CURRENCIES } from '../../../core/constants'
import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './AssetBalancesPanel.scss'

type Props = {
  className: ?string,
  NEO: string,
  GAS: string,
  neoPrice: number,
  gasPrice: number,
  currencyCode: string,
  refresh: Function
}

export default class AssetBalancesPanel extends React.Component<Props> {
  render = () => {
    const { NEO, GAS, className } = this.props

    return (
      <Panel className={classNames(styles.assetBalancesPanel, className)} renderHeader={this.renderHeader}>
        <div id="balance" className={styles.assets}>
          <div className={styles.asset}>
            <div className={styles.label}>{ASSETS.NEO}</div>
            <div className={styles.quantity} id="amountNeo">{formatNEO(NEO)}</div>
            <div className={styles.value} id="neoWalletValue">
              {this.getFormattedFiatBalance(this.getNEOValue())}
            </div>
          </div>
          <div className={styles.asset}>
            <div className={styles.label}>{ASSETS.GAS}</div>
            <div className={styles.quantity} id="amountGas">
              <Tooltip title={formatGAS(GAS)} disabled={toBigNumber(GAS).eq(0)}>
                {formatGAS(GAS, true)}
              </Tooltip>
            </div>
            <div className={styles.value} id="gasWalletValue">
              {this.getFormattedFiatBalance(this.getGASValue())}
            </div>
          </div>
        </div>
        <div className={styles.totalValue}>
          <div className={styles.label}>Total</div>
          <div id="walletTotal">{this.getFormattedFiatBalance(this.getTotalValue())}</div>
        </div>
        <div className={styles.claim}>
          <Claim className={styles.claimButton} />
        </div>
      </Panel>
    )
  }

  renderHeader = () => {
    return (
      <div className={styles.header}>
        <span>Balances</span>
        <Tooltip title="Refresh">
          <RefreshIcon id="refresh" className={styles.refresh} onClick={this.props.refresh} />
        </Tooltip>
      </div>
    )
  }

  getFormattedFiatBalance = (value: number): string => {
    const { symbol } = CURRENCIES[this.props.currencyCode]
    return `${symbol}${formatFiat(value)}`
  }

  getNEOValue = (): number => {
    const { NEO, neoPrice } = this.props
    return neoPrice && NEO !== '0' ? neoPrice * toNumber(NEO) : 0
  }

  getGASValue = (): number => {
    const { GAS, gasPrice } = this.props
    return gasPrice && GAS !== '0' ? gasPrice * toNumber(GAS) : 0
  }

  getTotalValue = (): number => {
    return this.getNEOValue() + this.getGASValue()
  }
}
