import React, { Component } from 'react'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import TokenSaleHeader from '../../components/TokenSale/TokenSaleHeader'
import Panel from '../../components/Panel'

class TokenSale extends Component {
  render() {
    return (
      <section>
        <TokenSaleHeader />
        <SendAmountsPanel
          currencyCode="usd"
          sendAmountsData={[
            {
              symbol: 'NEO',
              totalBalance: 3,
              price: 40,
              currentBalance: 3,
              totalBalanceWorth: 40 * 3,
              remainingBalanceWorth: 40 * 3
            }
          ]}
        />
        <Panel renderHeader={() => <h1>Token Sale</h1>} />
      </section>
    )
  }
}

export default TokenSale
