import React, { Component, Fragment } from 'react'

import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import TokenSaleHeader from '../../components/TokenSale/TokenSaleHeader'
import TokenSalePanel from '../../components/TokenSale/TokenSalePanel'
import TokenSaleConfirm from '../../components/TokenSale/TokenSaleConfirm'

class TokenSale extends Component {
  state = {
    step: 'purchase'
  }

  setStep = step => this.setState({ step })

  renderPurchase = () => (
    <section>
      {' '}
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
      <TokenSalePanel setStep={this.setStep} />
    </section>
  )

  renderConfirm = () => <TokenSaleConfirm />

  render() {
    const { step } = this.state
    const displayTokenSalePurchase = step === 'purchase'
    const displayTokenSaleConfirm = step === 'confirm'

    return (
      <section>
        {displayTokenSalePurchase && this.renderPurchase()}
        {displayTokenSaleConfirm && this.renderConfirm()}
      </section>
    )
  }
}

export default TokenSale
