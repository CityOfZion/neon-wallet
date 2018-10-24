// @flow
import React, { Component, Fragment } from 'react'

import {
  isZero,
  isNumber,
  toBigNumber,
  addNumber,
  minusNumber,
  multiplyNumber
} from '../../core/math'

import AmountsPanel from '../../components/AmountsPanel'
import HeaderBar from '../../components/HeaderBar'
import ZeroAssets from '../../components/ZeroAssets/ZeroAssets'
import TokenSalePanel from '../../components/TokenSale/TokenSalePanel/TokenSalePanel'
import TokenSaleConfirm from '../../components/TokenSale/TokenSaleConfirm/TokenSaleConfirm'
import TokenSaleSuccess from '../../components/TokenSale/TokenSaleSuccess/TokenSaleSuccess'
import TokenSaleError from '../../components/TokenSale/TokenSaleError/TokenSaleError'
import Loader from '../../components/Loader'
import {
  TOKEN_SALE_PURCHASE,
  TOKEN_SALE_CONFIRM,
  TOKEN_SALE_SUCCESS,
  TOKEN_SALE_FAILURE,
  PRICE_UNAVAILABLE,
  ROUTES
} from '../../core/constants'

import styles from './TokenSale.scss'

const conditions = [
  'I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company.',
  'I understand that some sales may only accept NEO or GAS, and I have verified which is accepted.',
  'I understand that if I send NEO or GAS to a token sale that has already ended, I will lose my NEO/GAS and will not be refunded.',
  "I understand that City of Zion (CoZ) is not responsible for my usage of this feature, and I have consulted this software's licenses." // eslint-disable-line
]

type Props = {
  assetBalances: Object,
  icoTokens: Array<Object>,
  prices: Object,
  address: string,
  history: Object,
  showModal: Function,
  participateInSale: (
    neoToSend: string,
    gasToSend: string,
    scriptHash: string,
    gasCost: string
  ) => Promise<any>
}

type State = {
  step: string,
  assetToPurchaseWith: string,
  amountToPurchaseFor: number,
  assetToPurchase: string,
  conditions: Array<string>,
  loading: boolean,
  gasFee: number,
  acceptedConditions: Array<string>,
  inputErrorMessage: string,
  tokenSaleError: Object,
  hasAssets: boolean,
  amountsData: Array<Object>
}

class TokenSale extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      step: TOKEN_SALE_PURCHASE,
      assetToPurchaseWith: Object.keys(this.props.assetBalances)[0],
      amountToPurchaseFor: 0,
      assetToPurchase: '',
      conditions: [...conditions],
      loading: false,
      gasFee: 0,
      acceptedConditions: [],
      inputErrorMessage: '',
      hasAssets: false,
      tokenSaleError: {},
      amountsData: []
    }
  }

  componentDidMount() {
    const { assetBalances } = this.props
    const amountsData = this.createAmountsData()
    const hasAssets = Object.keys(assetBalances).some(asset =>
      toBigNumber(assetBalances[asset]).greaterThan(0)
    )

    this.setState({ amountsData, hasAssets })
  }

  setStep = (step: string) => this.setState({ step })

  getAssetsToPurchaseWith = () => {
    const { assetBalances } = this.props
    if (assetBalances && assetBalances.length > 0) {
      // $FlowFixMe
      return Object.keys(assetBalances)
    }
    return ['NEO', 'GAS']
  }

  createAmountsData = () => {
    const { prices, assetBalances } = this.props
    const { amountToPurchaseFor } = this.state
    // TODO: Move this logic to AmountsPanel / Centralized place
    // $FlowFixMe
    return Object.keys(assetBalances).map((token: string) => {
      const price = prices[token]
      const balance = assetBalances[token]
      const currentBalance = minusNumber(balance, amountToPurchaseFor)

      const amountsObject = {
        symbol: token,
        totalBalance: balance,
        price,
        currentBalance,
        totalBalanceWorth: price
          ? multiplyNumber(balance, price)
          : PRICE_UNAVAILABLE
      }

      return amountsObject
    })
  }

  getPurchaseableAssets = () => {
    const { icoTokens } = this.props
    if (!icoTokens) return []
    return icoTokens.map(item => item.token)
  }

  getTokenToPurchaseInformation = () => {
    const { icoTokens } = this.props
    if (!icoTokens) return {}
    const { assetToPurchase } = this.state
    return icoTokens.find(tokenObj => tokenObj.token === assetToPurchase)
  }

  updateField = (item: { name: string, value: string | number }) => {
    const { name, value } = item

    this.setState({ [name]: value })
  }

  updateConditions = (condition: string) => {
    const { acceptedConditions } = this.state
    const conditionAccepted = acceptedConditions.find(
      (element: string) => element === condition
    )

    if (conditionAccepted) {
      this.setState({
        acceptedConditions: [...acceptedConditions].filter(
          (item: string) => item !== condition
        )
      })
    } else {
      this.setState({ acceptedConditions: [...acceptedConditions, condition] })
    }
  }

  isValid = () => {
    const { amountToPurchaseFor, assetToPurchaseWith, gasFee } = this.state
    const { assetBalances } = this.props

    const amountWithoutCommas = amountToPurchaseFor.toString().replace(/,/g, '')

    if (!isNumber(Number(amountToPurchaseFor))) {
      this.setState({ inputErrorMessage: 'Amount must be a number.' })
      return false
    }

    if (isZero(amountWithoutCommas)) {
      this.setState({ inputErrorMessage: 'Amount must be greater than 0.' })
      return false
    }

    if (
      assetToPurchaseWith === 'NEO' &&
      !toBigNumber(amountWithoutCommas).isInteger()
    ) {
      this.setState({
        inputErrorMessage: "You can't send fractional amounts of NEO" // eslint-disable-line
      })
      return false
    }

    const assetBalance = toBigNumber(assetBalances[assetToPurchaseWith])

    const gasBalance = toBigNumber(assetBalances.GAS)

    if (gasFee) {
      if (toBigNumber(gasFee).greaterThan(gasBalance)) {
        this.setState({
          inputErrorMessage:
            'You do not have enough GAS to prioritize this transaction' // eslint-disable-line
        })
        return false
      }
    }

    if (assetToPurchaseWith === 'GAS') {
      if (
        toBigNumber(addNumber(amountWithoutCommas, gasFee)).greaterThan(
          gasBalance
        )
      ) {
        this.setState({
          inputErrorMessage:
            'You do not have enough GAS to prioritize this transaction' // eslint-disable-line
        })
        return false
      }
    }

    if (toBigNumber(amountWithoutCommas).greaterThan(assetBalance)) {
      this.setState({
        inputErrorMessage: `You don't have enough ${assetToPurchaseWith}.`
      })
      return false
    }

    return true
  }

  handleAddPriorityFee = (gasFee: number) => this.setState({ gasFee })

  handlePurchase = () => {
    this.setState({ inputErrorMessage: '' }, () => {
      const validFields = this.isValid()

      if (validFields) {
        this.setStep(TOKEN_SALE_CONFIRM)
        this.props.history.push(ROUTES.TOKEN_SALE_CONFIRMATION)
      }
    })
  }

  setPurchaseStep = () => {
    this.setStep(TOKEN_SALE_PURCHASE)
    this.props.history.push(ROUTES.TOKEN_SALE)
  }

  handleConfirm = () => {
    const { participateInSale } = this.props
    const { assetToPurchaseWith, amountToPurchaseFor, gasFee } = this.state

    this.setState({ loading: true }, async () => {
      const neoToSend =
        assetToPurchaseWith === 'NEO' ? amountToPurchaseFor : '0'
      const gasToSend =
        assetToPurchaseWith === 'GAS' ? amountToPurchaseFor : '0'

      const token = this.getTokenToPurchaseInformation()

      // $FlowFixMe
      const { scriptHash } = token

      try {
        const success = await participateInSale(
          String(neoToSend),
          String(gasToSend),
          String(scriptHash),
          String(gasFee)
        )

        if (success) this.setState({ step: TOKEN_SALE_SUCCESS, loading: false })
        this.props.history.push(ROUTES.TOKEN_SALE_SUCCESS)
      } catch (err) {
        this.setState({
          step: TOKEN_SALE_FAILURE,
          loading: false,
          tokenSaleError: err
        })
        this.props.history.push(ROUTES.TOKEN_SALE_FAILURE)
      }
    })
  }

  getOnClickHandler = () => {
    const { step } = this.state
    switch (step) {
      case TOKEN_SALE_PURCHASE:
        return this.handlePurchase
      case TOKEN_SALE_CONFIRM:
        return this.handleConfirm
      case TOKEN_SALE_SUCCESS:
        return this.setPurchaseStep
      case TOKEN_SALE_FAILURE:
        return this.setPurchaseStep
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
      inputErrorMessage,
      gasFee,
      amountsData
    } = this.state

    const { assetBalances, showModal } = this.props
    const disabledButton = !(acceptedConditions.length === conditions.length)
    const availableGas = assetBalances.GAS
    return (
      <Fragment>
        <HeaderBar shouldRenderRefresh label="Token Sale" />
        <section className={styles.purchaseSection}>
          <AmountsPanel currencyCode="usd" amountsData={amountsData} />
          <TokenSalePanel
            showModal={showModal}
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
            inputErrorMessage={inputErrorMessage}
            handleAddPriorityFee={this.handleAddPriorityFee}
            gasFee={gasFee}
            availableGas={availableGas}
          />
        </section>
      </Fragment>
    )
  }

  renderConfirm = () => {
    const { assetToPurchaseWith, amountToPurchaseFor, gasFee } = this.state

    const tokenInformation = this.getTokenToPurchaseInformation()
    if (!tokenInformation) return null

    return (
      <TokenSaleConfirm
        onClickHandler={this.getOnClickHandler()}
        handleBack={this.setPurchaseStep}
        tokenInfo={tokenInformation}
        assetToPurchaseWith={assetToPurchaseWith}
        amountToPurchaseFor={amountToPurchaseFor}
        gasFee={gasFee}
      />
    )
  }

  renderSuccess = () => {
    const tokenInformation = this.getTokenToPurchaseInformation()
    if (!tokenInformation) return null
    return (
      <TokenSaleSuccess
        onClickHandler={this.getOnClickHandler()}
        token={tokenInformation.token}
      />
    )
  }

  renderFailure = () => {
    const { tokenSaleError } = this.state
    return (
      <TokenSaleError
        error={tokenSaleError}
        retryHandler={this.handlePurchase}
        backHandler={this.getOnClickHandler()}
      />
    )
  }

  render() {
    const { step, loading, hasAssets } = this.state
    const { address } = this.props

    const displayTokenSalePurchase = step === TOKEN_SALE_PURCHASE
    const displayTokenSaleConfirm = step === TOKEN_SALE_CONFIRM
    const displayTokenSaleSuccess = step === TOKEN_SALE_SUCCESS
    const displayTokenSaleFailure = step === TOKEN_SALE_FAILURE

    if (!hasAssets) {
      return (
        <Fragment>
          <HeaderBar shouldRenderRefresh label="Token Sale" />
          <ZeroAssets address={address} />
        </Fragment>
      )
    }

    return (
      <section className={styles.tokenSaleContainer}>
        <div className={styles.tokenSaleContentContainer}>
          {loading && <Loader />}
          {!loading && displayTokenSalePurchase && this.renderPurchase()}
          {!loading && displayTokenSaleConfirm && this.renderConfirm()}
          {!loading && displayTokenSaleSuccess && this.renderSuccess()}
          {!loading && displayTokenSaleFailure && this.renderFailure()}
        </div>
      </section>
    )
  }
}

export default TokenSale
