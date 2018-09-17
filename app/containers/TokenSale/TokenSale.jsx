import React, { Component } from 'react'

import { isZero, isNumber } from '../../core/math'

import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import TokenSalePanel from '../../components/TokenSale/TokenSalePanel/TokenSalePanel'
import TokenSaleConfirm from '../../components/TokenSale/TokenSaleConfirm/TokenSaleConfirm'
import TokenSaleSuccess from '../../components/TokenSale/TokenSaleSuccess/TokenSaleSuccess'

import {
  TOKEN_SALE_PURCHASE,
  TOKEN_SALE_CONFIRM,
  TOKEN_SALE_SUCCESS
} from '../../core/constants'

const conditions = [
  'I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company',
  'I understand that some sales may only accept NEO or GAS, and I have verified which is accepted. Sure thing.',
  'I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company. My company.',
  'I understand that some sales may only accept NEO or GAS, and I have verified which is accepted. Ok then.'
]

class TokenSale extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: TOKEN_SALE_PURCHASE,
      assetToPurchaseWith: Object.keys(this.props.assetBalances)[0],
      amountToPurchaseFor: 0,
      assetToPurchase: this.props.tokenBalances[0].token,
      conditions: [...conditions],
      acceptedConditions: [],
      errorMessage: ''
    }
  }

  setStep = step => this.setState({ step })

  getAssetsToPurchaseWith = () => {
    const { assetBalances } = this.props
    return Object.keys(assetBalances)
  }

  getPurchaseableAssets = () => {
    const { tokenBalances } = this.props
    return tokenBalances.map(item => item.token)
  }

  updateField = item => {
    const { name, value } = item

    this.setState({ [name]: value })
  }

  updateConditions = condition => {
    const { acceptedConditions } = this.state
    const conditionAccepted = acceptedConditions.find(
      element => element === condition
    )

    if (conditionAccepted) {
      this.setState({
        acceptedConditions: [...acceptedConditions].filter(
          item => item !== condition
        )
      })
    } else {
      this.setState({ acceptedConditions: [...acceptedConditions, condition] })
    }
  }

  isValid = () => {
    const { amountToPurchaseFor } = this.state

    if (!isNumber(amountToPurchaseFor)) {
      this.setState({ errorMessage: 'Amount must be a number.' })
    }

    if (isZero(amountToPurchaseFor)) {
      this.setState({ errorMessage: 'Amount must be greater than 0.' })
    }

    return true
  }

  renderPurchase = () => {
    const {
      assetToPurchaseWith,
      assetToPurchase,
      amountToPurchaseFor,
      acceptedConditions,
      conditions
    } = this.state

    const { assetBalances } = this.props
    const disabledButton = !(acceptedConditions.length === conditions.length)
    return (
      <section>
        {' '}
        <HeaderBar shouldRenderRefresh label="Token Sale" />
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
        <TokenSalePanel
          setStep={this.setStep}
          getAssetsToPurchaseWith={this.getAssetsToPurchaseWith}
          assetBalances={assetBalances}
          assetToPurchaseWith={assetToPurchaseWith}
          assetToPurchase={assetToPurchase}
          amountToPurchaseFor={amountToPurchaseFor}
          updateField={this.updateField}
          getPurchaseableAssets={this.getPurchaseableAssets}
          disabledButton={disabledButton}
          conditions={conditions}
          updateConditions={this.updateConditions}
          acceptedConditions={acceptedConditions}
        />
      </section>
    )
  }

  renderConfirm = () => <TokenSaleConfirm setStep={this.setStep} />

  renderSuccess = () => <TokenSaleSuccess />

  render() {
    const { step } = this.state
    const displayTokenSalePurchase = step === TOKEN_SALE_PURCHASE
    const displayTokenSaleConfirm = step === TOKEN_SALE_CONFIRM
    const displayTokenSaleSuccess = step === TOKEN_SALE_SUCCESS

    return (
      <section>
        {displayTokenSalePurchase && this.renderPurchase()}
        {displayTokenSaleConfirm && this.renderConfirm()}
        {displayTokenSaleSuccess && this.renderSuccess()}
      </section>
    )
  }
}

export default TokenSale
