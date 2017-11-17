// @flow
import React, { Component } from 'react'
import { formatFiat } from '../../core/formatters'
import styles from './PriceDisplay.scss'

type Props = {
  neoPrice: number,
  gasPrice: number
}

export default class PriceDisplay extends Component<Props> {
  render () {
    const { neoPrice, gasPrice } = this.props

    let neoDisplayPrice = '-'
    let gasDisplayPrice = '-'

    if (neoPrice) {
      neoDisplayPrice = formatFiat(neoPrice)
    }

    if (gasPrice) {
      gasDisplayPrice = formatFiat(gasPrice)
    }

    return (
      <div className={styles.container}>
        <span id='neoPrice' className={styles.neoPriceDisplay}>
          <span className={styles.label}>NEO</span>
          <span className={styles.price}>${neoDisplayPrice}</span>
        </span>
        <span id='gasPrce'>
          <span className={styles.label}>GAS</span>
          <span className={styles.price}>${gasDisplayPrice}</span>
        </span>
      </div>
    )
  }
}
