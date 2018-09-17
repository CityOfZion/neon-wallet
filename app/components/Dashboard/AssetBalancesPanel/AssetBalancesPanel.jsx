// @flow
import React from 'react'
import classNames from 'classnames'

import { BigNumber } from 'bignumber.js'
import Panel from '../../Panel'
import Claim from '../../../containers/Claim'
import Tooltip from '../../Tooltip'
import { formatGAS, formatFiat, formatNEO } from '../../../core/formatters'
import { toNumber, toBigNumber } from '../../../core/math'
import { ASSETS, CURRENCIES } from '../../../core/constants'
import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './AssetBalancesPanel.scss'

type PriceDirection = 'increase' | 'decrease'

type Props = {
  className: ?string,
  NEO: string,
  GAS: string,
  neoPrice: number,
  gasPrice: number,
  neoPriceChange: BigNumber,
  gasPriceChange: BigNumber,
  currencyCode: string
}

export default class AssetBalancesPanel extends React.Component<Props> {
  static defaultProps = {
    loading: false
  }

  render = () => {
    const { NEO, GAS, className } = this.props

    return (
      <Panel
        className={classNames(styles.assetBalancesPanel, className)}
        contentClassName={styles.centeredContent}
        renderHeader={this.renderHeader}
      >
        <div className={styles.totalValue}>
          <div className={styles.label}>Total</div>
          <div id="walletTotal">
            {this.getFormattedFiatBalance(this.getTotalValue())}
          </div>
        </div>
        <div id="balance" className={styles.assets}>
          <div className={styles.asset}>
            <div className={styles.label}>{ASSETS.NEO}</div>
            <div className={styles.quantity} id="amountNeo">
              {formatNEO(NEO)}
            </div>
            <span className={styles.value} id="neoWalletValue">
              {this.getFormattedFiatBalance(this.getNEOValue())}
            </span>
            <span
              className={classNames(
                styles.change,
                styles[this.getNEOPriceChangeDirection()]
              )}
              id="priceChangeNeo"
            >
              {this.getNEOFormattedPriceChange()}
            </span>
          </div>
          <div className={styles.asset}>
            <div className={styles.label}>{ASSETS.GAS}</div>
            <div className={styles.quantity} id="amountGas">
              <Tooltip title={formatGAS(GAS)} disabled={toBigNumber(GAS).eq(0)}>
                {formatGAS(GAS, true)}
              </Tooltip>
            </div>
            <span className={styles.value} id="gasWalletValue">
              {this.getFormattedFiatBalance(this.getGASValue())}
            </span>
            <span
              className={classNames(
                styles.change,
                styles[this.getGASPriceChangeDirection()]
              )}
              id="priceChangeGas"
            >
              {this.getGASFormattedPriceChange()}
            </span>
          </div>
        </div>
        <div className={styles.claim}>
          <Claim className={styles.claimButton} />
        </div>
      </Panel>
    )
  }

  renderHeader = () => (
    <div className={styles.header}>
      <span>Holdings</span>
    </div>
  )

  getFormattedFiatBalance = (value: number): string => {
    const { symbol } = CURRENCIES[this.props.currencyCode]
    return `${symbol}${formatFiat(value)}`
  }

  getFormattedPriceChange = (priceChange: BigNumber): string =>
    `${(priceChange.isNegative() ? '' : '+') +
      priceChange
        .times(100)
        .toFixed(2)
        .toString()}%`

  getPriceChangeDirection = (priceChange: BigNumber): PriceDirection =>
    priceChange.isNegative() ? 'decrease' : 'increase'

  getNEOValue = (): number => {
    const { NEO, neoPrice } = this.props
    return neoPrice && NEO !== '0' ? neoPrice * toNumber(NEO) : 0
  }

  getNEOFormattedPriceChange = (): string =>
    this.getFormattedPriceChange(this.props.neoPriceChange)

  getNEOPriceChangeDirection = (): PriceDirection =>
    this.getPriceChangeDirection(this.props.neoPriceChange)

  getGASValue = (): number => {
    const { GAS, gasPrice } = this.props
    return gasPrice && GAS !== '0' ? gasPrice * toNumber(GAS) : 0
  }

  getGASFormattedPriceChange = (): string =>
    this.getFormattedPriceChange(this.props.gasPriceChange)

  getGASPriceChangeDirection = (): PriceDirection =>
    this.getPriceChangeDirection(this.props.gasPriceChange)

  getTotalValue = (): number => this.getNEOValue() + this.getGASValue()
}
