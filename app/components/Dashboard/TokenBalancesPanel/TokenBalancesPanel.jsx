// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage, FormattedHTMLMessage, IntlShape } from 'react-intl'

import TextInput from '../../Inputs/TextInput'
import CopyToClipboard from '../../CopyToClipboard'
import Panel from '../../Panel'
import styles from './TokenBalancesPanel.scss'
import { toFixedDecimals } from '../../../core/formatters'
import { toBigNumber } from '../../../core/math'
import Nothing from '../../../assets/icons/nothing.svg'
import { CURRENCIES, PRICE_UNAVAILABLE } from '../../../core/constants'
import { imageMap } from '../../../assets/nep5/svg'

imageMap

type Props = {
  className: ?string,
  balances: Array<TokenBalanceType>,
  prices: Object,
  currencyCode: string,
  address: string,
  intl: IntlShape,
}

export default class TokenBalancesPanel extends React.Component<Props> {
  static defaultProps = {
    loading: false,
  }

  render = () => {
    const { className, balances } = this.props
    return (
      <Panel
        className={classNames(styles.tokenBalancesPanel, className)}
        contentClassName={classNames(styles.tokenBalancesPanelContent, {
          [styles.emptyBalanceContent]: !balances.length,
        })}
        headerClassName={styles.headerStyle}
        renderHeader={this.renderHeader}
      >
        {balances.length
          ? this.renderTokenBalances()
          : this.renderEmptyBalanceInfo()}
      </Panel>
    )
  }

  renderEmptyBalanceInfo = () => {
    const { address, intl } = this.props
    return (
      <div className={styles.emptyBalanceContainer}>
        <div className={styles.headerContainer}>
          <Nothing />
          <h1>
            <FormattedMessage id="nothingToSeeHere" />
          </h1>
        </div>
        <p>
          <FormattedHTMLMessage id="depositAssets" />
        </p>
        <div className={styles.address}>
          <TextInput value={address} disabled />
          <CopyToClipboard
            className={styles.copy}
            text={address}
            tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
          />
        </div>
      </div>
    )
  }

  formatPrice = (ticker: string): string => {
    const { prices, currencyCode } = this.props
    const { symbol } = CURRENCIES[currencyCode]
    let currPriceOfToken
    if (prices) currPriceOfToken = prices[ticker]
    if (!currPriceOfToken) return PRICE_UNAVAILABLE
    if (currPriceOfToken < 1.0) {
      return `${symbol}${toFixedDecimals(currPriceOfToken, 4)}`
    }
    return `${symbol}${toFixedDecimals(currPriceOfToken, 2)}`
  }

  sortByValueInPortfolio = (
    a: TokenBalanceType,
    b: TokenBalanceType,
  ): number => {
    const { prices } = this.props
    if (prices) {
      let aValue = 0
      if (prices[a.symbol]) {
        aValue = prices[a.symbol] * Number(a.balance)
      }
      let bValue = 0
      if (prices[b.symbol]) {
        bValue = prices[b.symbol] * Number(b.balance)
      }

      if (aValue > bValue) return -1
      if (aValue < bValue) return 1
      return 0
    }
    return 0
  }

  renderHeader = () => (
    <div>
      <div className={styles.header}>
        <span>
          <FormattedMessage id="dashboardBalancePanelLabel" />
        </span>
      </div>
    </div>
  )

  renderTokenBalances = () => {
    const { balances } = this.props
    return (
      <div className={styles.tokenBalancesPanelContent}>
        <div className={styles.gridContainer}>
          <div className={classNames(styles.columnCell, styles.symbol)}>
            <FormattedMessage id="dashboardTokenBalancesToken" />
          </div>
          <div className={classNames(styles.columnCell, styles.priceLabel)}>
            <FormattedMessage id="dashboardTokenBalancesPrice" />
          </div>
          <div className={classNames(styles.columnCell, styles.balance)}>
            <FormattedMessage id="dashboardTokenBalancesHoldings" />
          </div>
          {balances.sort(this.sortByValueInPortfolio).map(token => (
            <React.Fragment key={token.scriptHash}>
              <span className={classNames(styles.rowCell, styles.tickerName)}>
                {(!!token.image || imageMap[token.symbol]) && (
                  <div className={styles.tokenImageContainer}>
                    <img
                      className={styles.tokenImage}
                      src={token.image || imageMap[token.symbol]}
                      alt=""
                    />
                  </div>
                )}
                {token.symbol}
              </span>
              <span className={classNames(styles.rowCell, styles.price)}>
                {this.formatPrice(token.symbol)}
              </span>
              <span className={classNames(styles.rowCell, styles.balanceValue)}>
                {toBigNumber(token.balance).toString()}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
}
