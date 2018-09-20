import React, { Component } from 'react'

import { isZero, isNumber, toBigNumber } from '../../core/math'

import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import TokenSalePanel from '../../components/TokenSale/TokenSalePanel/TokenSalePanel'
import TokenSaleConfirm from '../../components/TokenSale/TokenSaleConfirm/TokenSaleConfirm'
import TokenSaleSuccess from '../../components/TokenSale/TokenSaleSuccess/TokenSaleSuccess'
import Loader from '../../components/Loader'

import {
  TOKEN_SALE_PURCHASE,
  TOKEN_SALE_CONFIRM,
  TOKEN_SALE_SUCCESS,
  TOKEN_SALE_FAILURE
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
      loading: false,
      gasFee: 0,
      acceptedConditions: [],
      errorMessage: ''
    }
  }

  setStep = step => this.setState({ step })

  getAssetsToPurchaseWith = () => {
    const { assetBalances } = this.props
    if (assetBalances && assetBalances.length > 0) {
    return Object.keys(assetBalances)
    } 
      return ['NEO', 'GAS']
    
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
    const { amountToPurchaseFor, assetToPurchaseWith } = this.state
    const { assetBalances } = this.props

    if (!isNumber(amountToPurchaseFor)) {
      this.setState({ errorMessage: 'Amount must be a number.' })
      return false
    }

    if (isZero(amountToPurchaseFor)) {
      this.setState({ errorMessage: 'Amount must be greater than 0.' })
      return false
    }

    if (
      assetToPurchaseWith === 'NEO' &&
      !toBigNumber(amountToPurchaseFor).isInteger()
    ) {
      this.setState({
        errorMessage: "You can't send fractional amounts of NEO"
      })
      return false
    }

    const assetBalance = toBigNumber(assetBalances[assetToPurchaseWith])
    if (toBigNumber(amountToPurchaseFor).greaterThan(assetBalance)) {
      this.setState({
        errorMessage: `You don't have enough ${assetToPurchaseWith}.`
      })
      return false
    }

    return true
  }

  handleAddPriorityFee = (gasFee: number) => this.setState({ gasFee })

  handlePurchase = () => {
    this.setState({ errorMessage: '' }, () => {
      const validFields = this.isValid()

      if (validFields) this.setStep(TOKEN_SALE_CONFIRM)
    })
  }

  handleConfirm = () => {
    const { participateInSale, tokenBalances } = this.props
    const {
      assetToPurchase,
      assetToPurchaseWith,
      amountToPurchaseFor,
      gasFee
    } = this.state

    this.setState({ loading: true }, async () => {
      const neoToSend =
        assetToPurchaseWith === 'NEO' ? amountToPurchaseFor : '0'
      const gasToSend =
        assetToPurchaseWith === 'GAS' ? amountToPurchaseFor : '0'
      const token = tokenBalances.find(
        tokenObj => tokenObj.token === assetToPurchase
      )
      const scriptHash = token.scriptHash


      try {
        const success = await participateInSale(
          neoToSend,
          gasToSend,
          scriptHash,
          gasFee
        )

        if (success) this.setState({ step: TOKEN_SALE_SUCCESS, loading: false })
      } catch (err) {
        this.setState({ step: TOKEN_SALE_FAILURE, loading: false })
      }
    })
  }

  handleSuccess = () => this.setStep(TOKEN_SALE_PURCHASE)

  handleFailure = () => console.log('Try again')

  getOnClickHandler = () => {
    const { step } = this.state
    switch (step) {
      case TOKEN_SALE_PURCHASE:
        return this.handlePurchase
      case TOKEN_SALE_CONFIRM:
        return this.handleConfirm
      case TOKEN_SALE_SUCCESS:
        return this.handleSuccess
      case TOKEN_SALE_FAILURE:
        return this.handleFailure
      default:
        return this.handlePurchase
    }
  }

  renderPurchase = () => {
    const {
      assetToPurchaseWith,
      assetToPurchase,
      amountToPurchaseFor,
      acceptedConditions,
      conditions,
      errorMessage,
      gasFee
    } = this.state

    const { assetBalances } = this.props
    const disabledButton = !(acceptedConditions.length === conditions.length)
    const availableGas = assetBalances['GAS']
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
          onClickHandler={this.getOnClickHandler()}
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
          errorMessage={errorMessage}
          handleAddPriorityFee={this.handleAddPriorityFee}
          gasFee={gasFee}
          availableGas={availableGas}
        />
      </section>
    )
  }

  renderConfirm = () => {
    const { tokenBalances } = this.props
    const {
      assetToPurchaseWith,
      assetToPurchase,
      amountToPurchaseFor
    } = this.state

    const tokenInfo = tokenBalances.find(
      tokenObj => tokenObj.token === assetToPurchase
    )
    return (
      <TokenSaleConfirm
        onClickHandler={this.getOnClickHandler()}
        tokenInfo={tokenInfo}
        assetToPurchaseWith={assetToPurchaseWith}
        amountToPurchaseFor={amountToPurchaseFor}
      />
    )
  }

  renderSuccess = () => <TokenSaleSuccess />

  render() {
    const { step, loading } = this.state
    const displayTokenSalePurchase = step === TOKEN_SALE_PURCHASE
    const displayTokenSaleConfirm = step === TOKEN_SALE_CONFIRM
    const displayTokenSaleSuccess = step === TOKEN_SALE_SUCCESS
    const displayTokenSaleFailure = step === TOKEN_SALE_FAILURE

    return (
      <section>
        {loading && <Loader />}
        {!loading && displayTokenSalePurchase && this.renderPurchase()}
        {!loading && displayTokenSaleConfirm && this.renderConfirm()}
        {!loading && displayTokenSaleSuccess && this.renderSuccess()}
        {!loading && displayTokenSaleFailure && <div>Error</div>}
      </section>
    )
  }
}

export default TokenSale
