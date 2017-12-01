// @flow
import React from 'react'
import { formatFiat } from '../../core/formatters'
import styles from './PriceDisplay.scss'
import classNames from 'classnames'
import { CURRENCIES } from '../../core/constants'

type Props = {
  neoPrice: number,
  gasPrice: number,
  currencyCode: string
}

const PriceDisplay = ({ neoPrice, gasPrice, currencyCode }: Props) => {
  let neoDisplayPrice = '-'
  let gasDisplayPrice = '-'
  const currencySymbol = CURRENCIES[currencyCode].symbol

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
        <span className={classNames('price', styles.price)}>{currencySymbol}{neoDisplayPrice}</span>
      </span>
      <span id='gasPrice'>
        <span className={styles.label}>GAS</span>
        <span className={classNames('price', styles.price)}>{currencySymbol}{gasDisplayPrice}</span>
      </span>
    </div>
  )
}

export default PriceDisplay
