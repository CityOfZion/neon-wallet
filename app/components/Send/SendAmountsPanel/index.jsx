import React, { Component } from 'react'

import SendAmountsInfoBox from './SendAmountsInfoBox'

import styles from './SendAmountsPanel.scss'

class SendPageHeader extends Component {
  render() {
    return (
      <section className={styles.sendAmountsPanel}>
        <SendAmountsInfoBox
          assetName="NEO"
          assetPrice={42}
          totalAmount={100}
          remainingAmount={100}
          fiatCurrencySymbol="$"
        />
        <SendAmountsInfoBox
          assetName="RPX"
          assetPrice={5}
          totalAmount={5123}
          remainingAmount={5123}
          fiatCurrencySymbol="$"
        />
      </section>
    )
  }
}
export default SendPageHeader
