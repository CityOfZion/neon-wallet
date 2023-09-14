// @flow
import React from 'react'
import type { Node } from 'react'
import classNames from 'classnames'
import { find, get } from 'lodash-es'
import { FormattedMessage } from 'react-intl'

import PriceHistoryChart from './PriceHistoryChart'
import Panel from '../../Panel'
import StyledReactSelect from '../../Inputs/StyledReactSelect/StyledReactSelect'
import {
  ASSETS,
  CURRENCIES,
  DEFAULT_CURRENCY_CODE,
} from '../../../core/constants'
import styles from './PriceHistoryPanel.scss'
import { formatFiat, formatThousands } from '../../../core/formatters'

type Duration = '1m' | '1w' | '1d'
// react-select option format
type DurationSelectOption = {
  label: string | Node,
  value: Duration,
}

type Price = {
  time: number,
  close: number,
  high: number,
  low: number,
  open: number,
  volumefrom: number,
  volumeto: number,
}

type Props = {
  className: ?string,
  asset: string,
  duration: Duration,
  currency: string,
  prices: Array<Price>,
  staticPrice: number,
  setAsset: Function,
  setDuration: Function,
  getPriceHistory: Funnction,
  priceKey: string,
}

const DURATIONS: Array<[Duration, Node]> = [
  ['1d', <FormattedMessage id="dashboardMarketData1Day" />],
  ['1w', <FormattedMessage id="dashboardMarketData1Week" />],
  ['1m', <FormattedMessage id="dashboardMarketData1Month" />],
]

// convert DURATIONS to react-select option format
const DURATION_OPTIONS: Array<DurationSelectOption> = DURATIONS.map(
  ([k, v]) => ({
    value: k,
    label: v,
  }),
)

export default class PriceHistoryPanel extends React.Component<Props> {
  static defaultProps = {
    priceKey: 'close',
  }

  render = () => {
    const { className, prices, currency, staticPrice } = this.props

    return (
      <Panel
        className={classNames(
          styles.priceHistoryPanel,

          className,
        )}
        contentClassName={styles.flexContainer}
        renderHeader={this.renderHeader}
      >
        <PriceHistoryChart
          prices={prices}
          currency={currency}
          staticPrice={staticPrice}
          formatDate={this.formatDate}
        />
      </Panel>
    )
  }

  renderHeader = () => (
    <div className={styles.header}>
      <span>
        <FormattedMessage id="dashboardMarketDataLabel" />
      </span>
      <span className={styles.asset} onClick={this.handleChangeAsset}>
        {this.props.asset}
        {this.renderLatestPrice()}
        {this.renderPriceChange()}
      </span>
      <span className={styles.duration}>
        <StyledReactSelect
          defaultValue={this.getDuration()}
          onChange={this.handleChangeDuration}
          options={DURATION_OPTIONS}
          isSearchable={false}
          fontWeight="normal"
          transparent
          hideHighlight
          textAlign="right"
        />
      </span>
    </div>
  )

  handleChangeAsset = () => {
    this.props.setAsset(
      this.props.asset === ASSETS.NEO ? ASSETS.GAS : ASSETS.NEO,
    )
  }

  handleChangeDuration = (selected: DurationSelectOption) => {
    this.props.setDuration(selected.value)
    this.props.getPriceHistory({
      duration: selected.value,
      currency: this.props.currency,
    })
    // this.props.setDuration(selected.value)
  }

  getDuration = (): ?DurationSelectOption =>
    find(DURATION_OPTIONS, ['value', this.props.duration])

  formatDate = (date: Date): string => {
    if (this.props.duration === '1d') {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    }
    return date.toLocaleString('en-US', { month: 'numeric', day: 'numeric' })
  }

  renderLatestPrice = () => {
    const { staticPrice } = this.props
    console.log({ staticPrice })
    return (
      <div className={styles.currentPrice}>
        {this.formatPrice(staticPrice, formatFiat)}
      </div>
    )
  }

  formatPrice = (
    price: number,
    formatter: Function = formatThousands,
  ): string => {
    if (CURRENCIES[this.props.currency]) {
      const { symbol } = CURRENCIES[this.props.currency]
      return `${symbol || CURRENCIES[DEFAULT_CURRENCY_CODE].symbol}${formatter(
        price,
      )}`
    }
  }

  renderPriceChange = () => {
    const change = this.getPriceChange()
    const classes = classNames(styles.change, {
      [styles.increase]: change >= 0,
      [styles.decrease]: change < 0,
    })

    return (
      !Number.isNaN(change) && (
        <div className={classes}>
          {change >= 0 && '+'}
          {(change * 100).toFixed(2)}%
        </div>
      )
    )
  }

  getInitialPrice = (): number => {
    const { prices, priceKey } = this.props
    return get(prices, `[0][${priceKey}]`)
  }

  getPriceChange = () =>
    (this.getLatestPrice() - this.getInitialPrice()) / this.getInitialPrice()

  getLatestPrice = (): number => {
    const { prices, priceKey } = this.props
    return prices.length ? prices[prices.length - 1][priceKey] : 0
  }
}
