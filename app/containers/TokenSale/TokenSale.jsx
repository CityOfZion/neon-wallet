<<<<<<< HEAD
import React, { Component } from 'react'
=======
import React, { Component, Fragment } from 'react'
>>>>>>> d79a17bafb9b724d97aac16c4f669575a5c67812

import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import TokenSaleHeader from '../../components/TokenSale/TokenSaleHeader'
import TokenSalePanel from '../../components/TokenSale/TokenSalePanel'
import TokenSaleConfirm from '../../components/TokenSale/TokenSaleConfirm'
<<<<<<< HEAD
import TokenSaleSuccess from '../../components/TokenSale/TokenSaleSuccess'

import {
  TOKEN_SALE_PURCHASE,
  TOKEN_SALE_CONFIRM,
  TOKEN_SALE_SUCCESS
} from '../../core/constants'

class TokenSale extends Component {
  state = {
    step: TOKEN_SALE_PURCHASE
=======

class TokenSale extends Component {
  state = {
    step: 'purchase'
>>>>>>> d79a17bafb9b724d97aac16c4f669575a5c67812
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

<<<<<<< HEAD
  renderConfirm = () => <TokenSaleConfirm setStep={this.setStep} />

  renderSuccess = () => <TokenSaleSuccess />

  render() {
    const { step } = this.state
    const displayTokenSalePurchase = step === TOKEN_SALE_PURCHASE
    const displayTokenSaleConfirm = step === TOKEN_SALE_CONFIRM
    const displayTokenSaleSuccess = step === TOKEN_SALE_SUCCESS
=======
  renderConfirm = () => <TokenSaleConfirm />

  render() {
    const { step } = this.state
    const displayTokenSalePurchase = step === 'purchase'
    const displayTokenSaleConfirm = step === 'confirm'
>>>>>>> d79a17bafb9b724d97aac16c4f669575a5c67812

    return (
      <section>
        {displayTokenSalePurchase && this.renderPurchase()}
        {displayTokenSaleConfirm && this.renderConfirm()}
<<<<<<< HEAD
        {displayTokenSaleSuccess && this.renderSuccess()}
=======
>>>>>>> d79a17bafb9b724d97aac16c4f669575a5c67812
      </section>
    )
  }
}

export default TokenSale
