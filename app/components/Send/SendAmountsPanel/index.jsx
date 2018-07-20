// @flow

import React from 'react'

import SendAmountsInfoBox from './SendAmountsInfoBox'
import { CURRENCIES } from '../../../core/constants'

import styles from './SendAmountsPanel.scss'

type Props = {
  sendAmountsData: Array<*>,
  currencyCode: string
}

const SendAmountsPanel = ({ sendAmountsData, currencyCode }: Props) => (
  <section className={styles.sendAmountsPanel}>
    {sendAmountsData.map(dataset => (
      <SendAmountsInfoBox
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

export default SendAmountsPanel
