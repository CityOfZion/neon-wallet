import React, { Component } from 'react'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import TokenSaleHeader from '../../components/TokenSale/TokenSaleHeader'
import TokenSalePanel from '../../components/TokenSale/TokenSalePanel'

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
        <TokenSalePanel />
      </section>
    )
  }
}

export default TokenSale
