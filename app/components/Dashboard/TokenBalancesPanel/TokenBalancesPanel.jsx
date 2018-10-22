// @flow
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import TextInput from '../../Inputs/TextInput'
import CopyToClipboard from '../../CopyToClipboard'
import Panel from '../../Panel'
import styles from './TokenBalancesPanel.scss'
import {
  toFixedDecimals,
  formatToRoundedShortNumber
} from '../../../core/formatters'
import Nothing from '../../../assets/icons/nothing.svg'
import { CURRENCIES, ROUTES, PRICE_UNAVAILABLE } from '../../../core/constants'

type Props = {
  className: ?string,
  balances: Array<TokenBalanceType>,
  prices: Object,
  currencyCode: string,
  address: string
}

export default class TokenBalancesPanel extends React.Component<Props> {
  static defaultProps = {
    loading: false
  }

  render = () => {
    const { className, balances } = this.props
    return (
      <Panel
        className={classNames(styles.tokenBalancesPanel, className)}
        contentClassName={classNames(styles.tokenBalancesPanelContent, {
          [styles.emptyBalanceContent]: !balances.length
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
    const { address } = this.props
    return (
      <div className={styles.emptyBalanceContainer}>
        <div className={styles.headerContainer}>
          <Nothing /> <h1> Nothing to see here! </h1>
        </div>
        <p>
          You’ll need to <b>transfer compatible NEP-5 assets</b> to this wallet
          using{' '}
          <NavLink id="wallet-manager" exact to={ROUTES.RECEIVE}>
            <span> receive </span>
          </NavLink>{' '}
          or your public address:
        </p>
        <div className={styles.address}>
          <TextInput value={address} disabled />
          {/* <Address className={styles.link} address={address} /> */}
          <CopyToClipboard
            className={styles.copy}
            text={address}
            tooltip="Copy Public Address"
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
    b: TokenBalanceType
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

  renderHeader = () => {
    const { balances } = this.props
    return (
      <div>
        <div className={styles.header}>
          <span>Token Balances</span>
        </div>
      </div>
    )
  }

  renderTokenBalances = () => {
    const { balances } = this.props
    return (
      <div className={styles.tokenBalancesPanelContent}>
        <div className={styles.gridContainer}>
          <div className={classNames(styles.columnCell, styles.symbol)}>
            Ticker
          </div>
          <div className={classNames(styles.columnCell, styles.name)}>
            Token
          </div>
          <div className={classNames(styles.columnCell, styles.priceLabel)}>
            Price
          </div>
          <div className={classNames(styles.columnCell, styles.balance)}>
            Holdings
          </div>
          {balances.sort(this.sortByValueInPortfolio).map(token => (
            <React.Fragment key={token.scriptHash}>
              <span className={classNames(styles.rowCell, styles.tickerName)}>
                {!!token.image && (
                  <div className={styles.tokenImageContainer}>
                    <img
                      className={styles.tokenImage}
                      src={token.image}
                      alt=""
                    />
                  </div>
                )}
                {token.symbol}
              </span>
              <span className={classNames(styles.rowCell, styles.tokenName)}>
                {token.name}
              </span>
              <span className={classNames(styles.rowCell, styles.price)}>
                {this.formatPrice(token.symbol)}
              </span>
              <span className={classNames(styles.rowCell, styles.balanceValue)}>
                {token.balance}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
}
