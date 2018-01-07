// @flow
import React from 'react'

import { formatFiat } from '../../../../core/formatters'
import { CURRENCIES } from '../../../../core/constants'

import headerStyles from '../Header.scss'

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

  return [
    <div key='neoPriceDisplay' id='neoPrice' className={headerStyles.navBarItem}>
      <span className={headerStyles.navBarItemLabel}>NEO</span>
      <span className='price'>{currencySymbol}{neoDisplayPrice}</span>
    </div>,
    <div key='gasPriceDisplay' id='gasPrice' className={headerStyles.navBarItem}>
      <span className={headerStyles.navBarItemLabel}>GAS</span>
      <span className='price'>{currencySymbol}{gasDisplayPrice}</span>
    </div>
  ]
}

export default PriceDisplay
