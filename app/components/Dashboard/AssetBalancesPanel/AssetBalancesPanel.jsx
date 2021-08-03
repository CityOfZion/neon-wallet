// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { BigNumber } from 'bignumber.js'
import Panel from '../../Panel'
import Claim from '../../../containers/Claim'
import Tooltip from '../../Tooltip'
import { formatGAS, formatFiat, formatNEO } from '../../../core/formatters'
import { toNumber, toBigNumber } from '../../../core/math'
import { ASSETS, CURRENCIES } from '../../../core/constants'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'
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
  currencyCode: string,
  chain: string,
}

export default class AssetBalancesPanel extends React.Component<Props> {
  static defaultProps = {
    loading: false,
  }

  render = () => {
    const { NEO, GAS, className, chain } = this.props

    const hasAssets = NEO !== '0' || GAS !== '0'

    return (
      <Panel
        className={classNames(styles.assetBalancesPanel, className)}
        contentClassName={styles.centeredContent}
        renderHeader={this.renderHeader}
      >
        <div className={styles.totalValue}>
          <div className={styles.label}>
            <FormattedMessage id="dashboardAssetsTotal" />
          </div>
          <div className={styles.walletTotal} id="walletTotal">
            {this.getFormattedFiatBalance(this.getTotalValue())}
          </div>
        </div>

        {hasAssets ? (
          <div id="balance" className={styles.assets}>
            <div className={styles.asset}>
              <div className={classNames(styles.label, styles.assetName)}>
                {ASSETS.NEO}
              </div>
              <div className={styles.quantity} id="amountNeo">
                {formatNEO(NEO)}
              </div>
              <span className={styles.value} id="neoWalletValue">
                {this.getFormattedFiatBalance(this.getNEOValue())}
              </span>
              {!this.props.neoPriceChange.isNaN() && (
                <span
                  className={classNames(
                    styles.change,
                    styles[this.getNEOPriceChangeDirection()],
                  )}
                  id="priceChangeNeo"
                >
                  {this.getNEOFormattedPriceChange()}
                </span>
              )}
            </div>
            <div className={styles.asset}>
              <div className={classNames(styles.label, styles.assetName)}>
                {ASSETS.GAS}
              </div>
              <div className={styles.quantity} id="amountGas">
                <Tooltip
                  title={formatGAS(GAS)}
                  disabled={toBigNumber(GAS).eq(0)}
                >
                  {formatGAS(GAS, true)}
                </Tooltip>
              </div>
              <span className={styles.value} id="gasWalletValue">
                {this.getFormattedFiatBalance(this.getGASValue())}
              </span>
              {!this.props.gasPriceChange.isNaN() && (
                <span
                  className={classNames(
                    styles.change,
                    styles[this.getGASPriceChangeDirection()],
                  )}
                  id="priceChangeGas"
                >
                  {this.getGASFormattedPriceChange()}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.emptyBalanceContainer}>
            <LogoWithStrikethrough />
          </div>
        )}

        <div className={styles.claim}>
          {chain === 'neo2' && <Claim className={styles.claimButton} />}
        </div>
      </Panel>
    )
  }

  renderHeader = () => (
    <div className={styles.header}>
      <span>
        <FormattedMessage id="dashboardAssetsPanelLabel" />
      </span>
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
