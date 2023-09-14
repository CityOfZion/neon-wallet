// @flow
import React from 'react'
import classNames from 'classnames'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { get } from 'lodash-es'

import AxisLabel from './AxisLabel'
import { formatFiat } from '../../../core/formatters'
import { CURRENCIES } from '../../../core/constants'

import styles from './PriceHistoryChart.scss'

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
  className?: string,
  prices: Array<Price>,
  currency: string,
  timeKey: string,
  priceKey: string,
  staticPrice: number,
  formatDate(Date): string,
}

type State = {
  windowHeight: number,
}

const formatDate = (date: Date): string =>
  date.toLocaleString('en-US', { month: 'numeric', day: 'numeric' })

export default class PriceHistoryChart extends React.Component<Props, State> {
  static defaultProps = {
    timeKey: 'time',
    priceKey: 'close',
    formatDate,
  }

  render = (): React$Node => {
    const { className, prices, timeKey, priceKey } = this.props

    return !prices.length ? (
      <div>Oops! Historical market data is not available at this time.</div>
    ) : (
      <ResponsiveContainer
        className={classNames(styles.priceHistoryChart, className)}
      >
        <LineChart
          data={prices}
          margin={{ top: 14, right: 10, bottom: 10, left: 10 }}
        >
          <XAxis
            dataKey={timeKey}
            type="category"
            interval="preserveStart"
            tickLine={false}
            tickFormatter={this.formatDate}
            tickMargin={24}
            minTickGap={75}
            stroke="#9ca0a8"
          />
          <YAxis
            axisLine={false}
            width={70}
            tickLine={false}
            tickFormatter={this.formatPrice}
            tickMargin={20}
            domain={['auto', 'auto']}
            stroke="#9ca0a8"
          />
          <CartesianGrid stroke="#e6e6e6" />
          <Tooltip
            content={this.tooltipContent}
            formatter={this.formatValue}
            labelFormatter={this.formatLabel}
          />
          <Line
            dataKey={priceKey}
            type="monotone"
            stroke="var(--dashboard-market-data-line)"
            strokeWidth={4}
            dot={false}
            animationDuration={500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  tooltipContent = (tooltipProps: Object) =>
    !!get(tooltipProps, 'payload.length') && (
      <div className={styles.tooltipContainer}>
        <div className={styles.tooltipTime}>
          {this.formatLabel(get(tooltipProps.payload[0], 'payload.time', 0))}
        </div>
        <div className={styles.tooltipPrice}>
          {this.formatPrice(
            get(tooltipProps.payload[0], 'payload.close', 0),
            /* $FlowFixMe */
          )}
        </div>
      </div>
    )

  renderAxisLabel = (axisType: string, label: ?string): Function => ({
    viewBox,
  }: {
    viewBox: Object,
  }): React$Node => (
    <AxisLabel axisType={axisType} {...viewBox}>
      {label}
    </AxisLabel>
  )

  formatValue = (value: number): string => value.toString()

  formatLabel = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)

    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }

  formatPrice = (price: number, formatter: Function = formatFiat): string => {
    if (CURRENCIES[this.props.currency]) {
      const { symbol } = CURRENCIES[this.props.currency]
      return formatter ? `${symbol}${formatter(price)}` : `${symbol}${price}`
    }
  }

  formatDate = (timestamp: number): string =>
    this.props.formatDate(new Date(timestamp * 1000))
}
