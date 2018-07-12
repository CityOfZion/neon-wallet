// @flow

import React from 'react'

import SendAmountsInfoBox from './SendAmountsInfoBox'

import styles from './SendAmountsPanel.scss'

type Props = {
  sendAmountsData: Array
}

const SendAmountsPanel = ({ sendAmountsData }) => (
  <section className={styles.sendAmountsPanel}>
    {sendAmountsData.map(dataset => (
      <SendAmountsInfoBox
        assetName={dataset.symbol}
        assetPrice={dataset.price}
        totalAmount={dataset.totalBalance}
        remainingAmount={dataset.currentBalance}
        totalBalanceWorth={dataset.totalBalanceWorth}
        remainingBalanceWorth={dataset.remainingBalanceWorth}
        fiatCurrencySymbol="$"
      />
    ))}
  </section>
)

export default SendAmountsPanel
