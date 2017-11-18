// @flow
import React from 'react'
import { formatFiat } from '../../core/formatters'
import styles from './PriceDisplay.scss'
import classNames from 'classnames'

type Props = {
  neoPrice: number,
  gasPrice: number
}

const PriceDisplay = ({ neoPrice, gasPrice }: Props) => {
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
        <span className={classNames('price', styles.price)}>${neoDisplayPrice}</span>
      </span>
      <span id='gasPrice'>
        <span className={styles.label}>GAS</span>
        <span className={classNames('price', styles.price)}>${gasDisplayPrice}</span>
      </span>
    </div>
  )
}

export default PriceDisplay
