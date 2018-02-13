// @flow
import React from 'react'
import classNames from 'classnames'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import AxisLabel from './AxisLabel'
import BoundingBox from './BoundingBox'
import { formatFiat, formatThousands } from '../../../core/formatters'
import { CURRENCIES } from '../../../core/constants'

import styles from './PriceHistoryChart.scss'

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
  className?: string,
  prices: Array<Price>,
  currency: string,
  timeKey: string,
  priceKey: string,
  formatDate(Date): string
}

const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', { month: 'numeric', day: 'numeric' })
}

export default class PriceHistoryChart extends React.Component<Props> {
  static defaultProps = {
    timeKey: 'time',
    priceKey: 'close',
    formatDate
  }

  render = (): React$Node => {
    const { className, prices, timeKey, priceKey } = this.props

    return (
      <ResponsiveContainer width='100%' height={250} className={classNames(styles.priceHistoryChart, className)}>
        <LineChart data={prices} margin={{ top: 14, right: 10, bottom: 10, left: 10 }}>
          <XAxis
            dataKey={timeKey}
            type='category'
            interval='preserveStartEnd'
            stroke='#9ca0a8'
            tickLine={false}
            tickFormatter={this.formatDate}
            tickMargin={24}
            minTickGap={50} />
          <YAxis
            stroke='#9ca0a8'
            axisLine={false}
            tickLine={false}
            tickFormatter={this.formatPrice}
            tickMargin={20}
            domain={['auto', 'auto']} />
          <CartesianGrid
            stroke='#e6e6e6' />
          <Tooltip
            formatter={this.formatValue}
            labelFormatter={this.formatLabel} />
          <Line
            dataKey={priceKey}
            type='monotone'
            stroke='#dc6b87'
            strokeWidth={4}
            dot={false}
            animationDuration={500}
            animationEasing='ease-out' />
          {this.renderLatestPrice()}
          {this.renderPriceChange()}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  renderLatestPrice = () => {
    return (
      <text className={styles.current} x='50%' y={0} textAnchor='middle' alignmentBaseline='hanging' fill='#282828'>
        {this.formatPrice(this.getLatestPrice(), formatFiat)}
      </text>
    )
  }

  renderPriceChange = () => {
    const change = this.getPriceChange()
    const classes = classNames(styles.change, {
      [styles.increase]: change >= 0,
      [styles.decrease]: change < 0
    })

    return (
      <BoundingBox className={classes} roundedX={3} roundedY={3} paddingX={3} paddingY={1}>
        <text className={styles.changeText} x='50%' y={35} textAnchor='middle' alignmentBaseline='hanging' fill='#282828'>
          {change >= 0 && '+'}{(change * 100).toFixed(2)}%
        </text>
      </BoundingBox>
    )
  }

  renderAxisLabel = (axisType: string, label: ?string): Function => {
    return ({ viewBox }: { viewBox: Object }): React$Node => (
      <AxisLabel axisType={axisType} {...viewBox}>{label}</AxisLabel>
    )
  }

  formatValue = (value: number): string => {
    return value.toString()
  }

  formatLabel = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)

    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  formatPrice = (price: number, formatter: Function = formatThousands): string => {
    const { symbol } = CURRENCIES[this.props.currency]
    return `${symbol}${formatter(price)}`
  }

  formatDate = (timestamp: number): string => {
    return this.props.formatDate(new Date(timestamp * 1000))
  }

  getInitialPrice = (): number => {
    const { prices, priceKey } = this.props
    return prices[0][priceKey]
  }

  getLatestPrice = (): number => {
    const { prices, priceKey } = this.props
    return prices[prices.length - 1][priceKey]
  }

  getPriceChange = () => {
    return (this.getLatestPrice() - this.getInitialPrice()) / this.getInitialPrice()
  }
}
