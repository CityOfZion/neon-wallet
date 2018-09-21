// @flow

import React from 'react'

import AmountsInfoBox from './AmountsInfoBox'
import { CURRENCIES } from '../../core/constants'

import styles from './AmountsPanel.scss'

type Props = {
  amountsData: Array<*>,
  currencyCode: string
}

const AmountsPanel = ({ amountsData, currencyCode }: Props) => (
  <section className={styles.amountsPanel}>
    {amountsData.map(dataset => (
      <AmountsInfoBox
        key={dataset.symbol}
        assetName={dataset.symbol}
        assetPrice={dataset.price}
        totalAmount={dataset.totalBalance}
        remainingAmount={dataset.currentBalance}
        totalBalanceWorth={dataset.totalBalanceWorth}
        remainingBalanceWorth={dataset.remainingBalanceWorth}
        fiatCurrencySymbol={CURRENCIES[currencyCode].symbol}
      />
    ))}
  </section>
)

export default AmountsPanel
