// @flow
import React from 'react'

import { formatFiat } from '../../../../core/formatters'
import { CURRENCIES } from '../../../../core/constants'

import styles from './PriceDisplay.scss'

type Props = {
  neoPrice: number,
  gasPrice: number,
  currencyCode: string
}

const PriceDisplay = ({ neoPrice, gasPrice, currencyCode }: Props) => {
  const neoDisplayPrice = neoPrice ? formatFiat(neoPrice) : '-'
  const gasDisplayPrice = gasPrice ? formatFiat(gasPrice) : '-'
  const currencySymbol = CURRENCIES[currencyCode].symbol

  return [
    <div key='neoPriceDisplay' id='neoPrice' className={styles.navBarItem}>
      <span className={styles.navBarItemLabel}>NEO</span>
      <span className='price'>{currencySymbol}{neoDisplayPrice}</span>
    </div>,
    <div key='gasPriceDisplay' id='gasPrice' className={styles.navBarItem}>
      <span className={styles.navBarItemLabel}>GAS</span>
      <span className='price'>{currencySymbol}{gasDisplayPrice}</span>
    </div>
  ]
}

export default PriceDisplay
