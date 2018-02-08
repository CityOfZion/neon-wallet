// @flow
import React from 'react'
import classNames from 'classnames'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

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
  volumeto: number
}

type Props = {
  className?: string,
  prices: Array<Price>,
  currency: string,
  timeKey: string,
  priceKey: string
}

export default class PriceHistoryChart extends React.Component<Props> {
  static defaultProps = {
    timeKey: 'time',
    priceKey: 'close'
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
            tickFormatter={this.renderDate}
            tickMargin={24}
            minTickGap={50} />
          <YAxis
            stroke='#9ca0a8'
            axisLine={false}
            tickLine={false}
            tickFormatter={this.renderPrice}
            tickMargin={20}
            domain={['auto', 'auto']} />
          <CartesianGrid
            stroke='#e6e6e6' />
          <Tooltip
            formatter={this.handleFormatValue}
            labelFormatter={this.handleFormatLabel} />
          <Line
            dataKey={priceKey}
            type='monotone'
            stroke='#dc6b87'
            strokeWidth={4}
            dot={false}
            animationDuration={500}
            animationEasing='ease-out' />
          <text className={styles.current} x='50%' y={0} textAnchor='middle' alignmentBaseline='hanging' fill='##282828'>
            {this.renderPrice(this.getLatestPrice())}
          </text>
        </LineChart>
      </ResponsiveContainer>
    )
  }

  renderAxisLabel = (axisType: string, label: ?string): Function => {
    return ({ viewBox }: { viewBox: Object }): React$Node => (
      <AxisLabel axisType={axisType} {...viewBox}>{label}</AxisLabel>
    )
  }

  renderDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  renderPrice = (price: number): string => {
    const { symbol } = CURRENCIES[this.props.currency]
    return `${symbol}${formatFiat(price)}`
  }

  handleFormatValue = (value: number): string => {
    return value.toString()
  }

  handleFormatLabel = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)

    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  getLatestPrice = () => {
    const { prices, priceKey } = this.props
    return prices[prices.length - 1][priceKey]
  }
}
