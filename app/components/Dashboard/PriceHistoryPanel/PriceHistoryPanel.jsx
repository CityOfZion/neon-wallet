// @flow
import React from 'react'
import classNames from 'classnames'
import { keys } from 'lodash-es'

import PriceHistoryChart from './PriceHistoryChart'
import Panel from '../../Panel'
import DropdownIcon from '../../../assets/icons/dropdown.svg'
import { ASSETS } from '../../../core/constants'
import styles from './PriceHistoryPanel.scss'

type Duration = '1m' | '1w' | '1d'

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
  setDuration: Function
}

const DURATIONS: { [key: Duration]: string } = {
  '1m': '1 month',
  '1w': '1 week',
  '1d': '1 day'
}

export default class PriceHistoryPanel extends React.Component<Props> {
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
        <DropdownIcon className={styles.icon} />
      </span>
      <span className={styles.duration} onClick={this.handleChangeDuration}>
        {this.getDuration()}
        <DropdownIcon className={styles.icon} />
      </span>
    </div>
  )

  handleChangeAsset = () => {
    this.props.setAsset(
      this.props.asset === ASSETS.NEO ? ASSETS.GAS : ASSETS.NEO
    )
  }

  handleChangeDuration = () => {
    const durations = keys(DURATIONS)
    const index =
      (durations.indexOf(this.props.duration) + 1) % durations.length
    this.props.setDuration(durations[index])
  }

  getDuration = () => DURATIONS[this.props.duration]

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
}
