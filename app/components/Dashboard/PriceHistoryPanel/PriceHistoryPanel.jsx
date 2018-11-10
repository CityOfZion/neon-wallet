// @flow
import React from 'react'
import classNames from 'classnames'
import { find } from 'lodash-es'

import PriceHistoryChart from './PriceHistoryChart'
import Panel from '../../Panel'
import BoundingBox from './BoundingBox'
import StyledReactSelect from '../../Inputs/StyledReactSelect/StyledReactSelect'
import {
  ASSETS,
  CURRENCIES,
  DEFAULT_CURRENCY_CODE
} from '../../../core/constants'
import styles from './PriceHistoryPanel.scss'
import { formatFiat, formatThousands } from '../../../core/formatters'

type Duration = '1m' | '1w' | '1d'
// react-select option format
type SelectOption = {
  value: Duration,
  label: string
}

type Price = {
  time: number,
  close: number,
  high: number,
  low: number,
  open: number,
  volumefrom: number,
  volumeto: number
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
  priceKey: string
}

const DURATIONS: Array<[Duration, string]> = [
  ['1d', '1 DAY'],
  ['1w', '1 WEEK'],
  ['1m', '1 MONTH']
]

// convert DURATIONS to react-select option format
const DURATION_OPTIONS: Array<SelectOption> = DURATIONS.map(([k, v]) => ({
  value: k,
  label: v
}))

export default class PriceHistoryPanel extends React.Component<Props> {
  static defaultProps = {
    priceKey: 'close'
  }

  render = () => {
    const { className, prices, currency, staticPrice } = this.props

    return (
      <Panel
        className={classNames(
          styles.priceHistoryPanel,

          className
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
      <span>Market Data</span>
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
      this.props.asset === ASSETS.NEO ? ASSETS.GAS : ASSETS.NEO
    )
  }

  handleChangeDuration = (selected: SelectOption) => {
    this.props.setDuration(selected.value)
  }

  getDuration = (): ?SelectOption =>
    find(DURATION_OPTIONS, ['value', this.props.duration])

  formatDate = (date: Date): string => {
    if (this.props.duration === '1d') {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    }
    return date.toLocaleString('en-US', { month: 'numeric', day: 'numeric' })
  }

  renderLatestPrice = () => {
    const { staticPrice } = this.props
    return (
      <div className={styles.currentPrice}>
        {this.formatPrice(staticPrice, formatFiat)}
      </div>
    )
  }

  formatPrice = (
    price: number,
    formatter: Function = formatThousands
  ): string => {
    const { symbol } = CURRENCIES[this.props.currency]
    return `${symbol || CURRENCIES[DEFAULT_CURRENCY_CODE].symbol}${formatter(
      price
    )}`
  }

  renderPriceChange = () => {
    const change = this.getPriceChange()
    const classes = classNames(styles.change, {
      [styles.increase]: change >= 0,
      [styles.decrease]: change < 0
    })

    return (
      <div className={classes}>
        {change >= 0 && '+'}
        {(change * 100).toFixed(2)}%
      </div>
    )
  }

  getInitialPrice = (): number => {
    const { prices, priceKey } = this.props
    return prices[0][priceKey]
  }

  getPriceChange = () =>
    (this.getLatestPrice() - this.getInitialPrice()) / this.getInitialPrice()

  getLatestPrice = (): number => {
    const { prices, priceKey } = this.props
    return prices.length ? prices[prices.length - 1][priceKey] : 0
  }
}
