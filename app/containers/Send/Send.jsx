// @flow
import React from 'react'
import { uniqueId, get } from 'lodash-es'
import { wallet } from 'neon-js'
import {
  toNumber,
  toBigNumber,
  multiplyNumber,
  minusNumber,
  isNumber
} from '../../core/math'

import { isBlacklisted } from '../../core/wallet'
import { PRICE_UNAVAILABLE } from '../../core/constants'

import AmountsPanel from '../../components/AmountsPanel'
import SendPanel from '../../components/Send/SendPanel'
import HeaderBar from '../../components/HeaderBar'
import styles from './Send.scss'

const MAX_NUMBER_OF_RECIPIENTS = 10

type Props = {
  sendableAssets: Object,
  prices: Object,
  sendTransaction: ({
    sendEntries: Array<SendEntryType>,
    fees: number
  }) => Object,
  contacts: Object,
  currencyCode: string,
  address: string,
  shouldRenderHeaderBar: boolean,
  location: Object,
  showSendModal: (props: Object) => any,
  tokens: Array<TokenItemType>,
  networkId: string
}

type State = {
  showConfirmSend: boolean,
  sendSuccess: boolean,
  sendError: boolean,
  sendErrorMessage: string,
  txid: string,
  fees: number,
  sendRowDetails: Array<Object>,
  address?: string
}

export default class Send extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showConfirmSend: false,
      sendSuccess: false,
      sendError: false,
      sendErrorMessage: '',
      txid: '',
      sendRowDetails: [],
      fees: 0
    }
  }

  static defaultProps = {
    shouldRenderHeaderBar: true
  }

  componentDidMount() {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      newState.push(this.generateRow())

      return { sendRowDetails: newState }
    })
    if (this.props.location && this.props.location.state) {
      const { address } = this.props.location.state
      if (address) {
        this.updateRowField(0, 'address', address)
      }
    }
  }

  pushQRCodeData = (data: Object) => {
    const { sendRowDetails } = this.state
    const { asset, address, amount } = data
    const firstRowEmpty =
      sendRowDetails.length === 1 && !parseInt(sendRowDetails[0].amount, 10)

    if (firstRowEmpty) {
      if (asset) this.updateRowField(0, 'asset', asset)
      if (address) this.updateRowField(0, 'address', address)
      if (amount) this.updateRowField(0, 'amount', amount)
    } else {
      this.addRow(data)
    }
  }

  generateRow = (row: Object = {}) => {
    const { sendableAssets } = this.props
    const sendableAssetNames = Object.keys(sendableAssets)
    const firstSendableAssetName = sendableAssetNames[0]

    if (sendableAssetNames.length > 0) {
      return {
        asset: row.asset || firstSendableAssetName,
        amount: row.amount || 0,
        address: row.address || '',
        max: this.calculateMaxValue(row.asset || firstSendableAssetName),
        id: uniqueId(),
        errors: {}
      }
    }
    return {
      errors: {}
    }
  }

  // TODO: Move this logic to AmountsPanel / Centralized place
  createSendAmountsData = () => {
    const { sendableAssets, prices } = this.props

    const assets = Object.keys(sendableAssets)

    return (assets.map((asset: string) => {
      const { balance } = sendableAssets[asset]
      const currentBalance = minusNumber(
        balance,
        this.calculateRowAmounts(asset)
      )
      const price = prices[asset]

      const totalBalanceWorth = price
        ? multiplyNumber(balance, price)
        : PRICE_UNAVAILABLE

      return {
        symbol: asset,
        totalBalance: balance,
        price,
        currentBalance,
        totalBalanceWorth
      }
    }): Array<*>)
  }

  removeRow = (index: number) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      if (newState.length > 1) {
        newState.splice(index, 1)
      }
      return { sendRowDetails: newState }
    })
  }

  addRow = (row?: Object) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      if (newState.length < MAX_NUMBER_OF_RECIPIENTS) {
        newState.push(this.generateRow(row))

        return { sendRowDetails: newState }
      }
    })
  }

  updateRowField = (index: number, field: string, value: string) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      const objectToModify = newState[index]

      objectToModify[field] = value

      if (field === 'asset') {
        objectToModify.amount = 0
        const maxValue = this.calculateMaxValue(objectToModify.asset)
        objectToModify.max = maxValue
      }

      if (field === 'amount') {
        const maxValue =
          this.calculateMaxValue(objectToModify.asset) + Number(value)
        objectToModify.max = maxValue
      }

      if (field === 'address') {
        objectToModify.address = value
      }

      return { sendRowDetails: newState }
    })
  }

  calculateMaxValue = (asset: string) => {
    const { sendableAssets } = this.props

    const existingAmounts = this.calculateRowAmounts(asset)

    if (sendableAssets[asset]) {
      return minusNumber(sendableAssets[asset].balance, existingAmounts)
    }
    return 0
  }

  calculateRowAmounts = (asset: string) => {
    const rows = [...this.state.sendRowDetails]

    if (rows.length > 0) {
      return (rows
        .filter((row: Object) => row.asset === asset)
        .map((row: Object) => Number(row.amount))
        .reduce(
          (accumulator: Object, currentValue: number | void) =>
            accumulator.plus(currentValue || 0),
          toBigNumber(0)
        ): number)
    }
    return 0
  }

  resetViews = () => {
    this.setState(() => {
      const newState = []

      newState.push(this.generateRow())

      return {
        showConfirmSend: false,
        sendSuccess: false,
        sendRowDetails: newState,
        fees: 0
      }
    })
  }

  handleSubmit = () => {
    const rows = [...this.state.sendRowDetails]
    const promises = rows.map((row: Object, index: number) =>
      this.validateRow(row, index)
    )

    Promise.all(promises).then(values => {
      const isValid = values.every((result: boolean) => result)

      if (isValid) {
        this.setState({ showConfirmSend: true })
      }
    })
  }

  handleSend = () => {
    const { sendTransaction } = this.props
    const { sendRowDetails, fees } = this.state

    const entries = sendRowDetails.map((row: Object) => ({
      address: row.address,
      amount: toNumber(row.amount.toString().replace(/,/g, '')),
      symbol: row.asset
    }))

    sendTransaction({ sendEntries: entries, fees })
      .then((result: Object) => {
        this.setState({ sendSuccess: true, txid: result.txid })
      })
      .catch((error: Object) => {
        this.setState({ sendError: true, sendErrorMessage: error.message })
      })
  }

  handleEditRecipientsClick = () => this.setState({ showConfirmSend: false })

  handleAddPriorityFee = (fees: number) => this.setState({ fees })

  validateRow = async (row: Object, index: number) => {
    const validAmount = this.validateAmount(
      row.amount,
      row.max,
      row.asset,
      index
    )
    const validAddress = await this.validateAddress(row.address, index)

    return validAmount && validAddress
  }

  validateAmount = (
    amount: number,
    max: number,
    asset: string,
    index: number
  ) => {
    const { errors } = this.state.sendRowDetails[index]
    const { tokens, networkId } = this.props

    const amountNum = Number(amount)

    if (typeof amountNum !== 'number') {
      errors.amount = 'Amount must be a number.'
    }

    if (asset === 'NEO' && !toBigNumber(amountNum).isInteger()) {
      errors.amount = 'You cannot send fractional amounts of NEO.'
    }

    if (amountNum < 0) {
      errors.amount = `You cannot send negative amounts of ${asset}.`
    }

    if (amountNum === 0) {
      errors.amount = `Can not send 0 ${asset}.`
    }

    if (amountNum > max) {
      errors.amount = `You do not have enough balance to send ${amount} ${asset}.`
    }

    if (asset !== 'NEO' && asset !== 'GAS') {
      const decpoint =
        amountNum.toString().length - 1 - amountNum.toString().indexOf('.')

      const foundToken: TokenItemType | void = tokens.find(
        token => token.symbol === asset && token.networkId === networkId
      )

      if (foundToken && decpoint > toNumber(get(foundToken, 'decimals', 8))) {
        errors.amount = `You can only send ${asset} up to ${get(
          foundToken,
          'decimals',
          8
        )} decimals.`
      }
    }

    if (errors.amount) {
      this.updateRowField(index, 'errors', errors)
      return false
    }
    return true
  }

  validateAddress = async (formAddress: string, index: number) => {
    const { errors } = this.state.sendRowDetails[index]

    if (!wallet.isAddress(formAddress)) {
      errors.address = 'You need to specify a valid NEO address.'
    }

    const blackListedAddress = await isBlacklisted(formAddress)
    if (blackListedAddress) {
      errors.address =
        'Address is blacklisted. This is a known phishing address.'
    }

    if (errors.address) {
      this.updateRowField(index, 'errors', errors)
      return false
    }

    return true
  }

  clearErrors = (index: number, field: string) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      const objectToClear = newState[index]

      if (get(objectToClear, ['errors', field])) {
        objectToClear.errors[field] = null
      }

      return newState
    })
  }

  resetViewsAfterError = () =>
    this.setState({ sendError: false, sendErrorMessage: '' })

  render() {
    const {
      sendRowDetails,
      showConfirmSend,
      sendSuccess,
      sendError,
      sendErrorMessage,
      txid,
      fees
    } = this.state
    const {
      sendableAssets,
      contacts,
      currencyCode,
      shouldRenderHeaderBar,
      address,
      showSendModal
    } = this.props
    const noSendableAssets = Object.keys(sendableAssets).length === 0

    return (
      <section className={styles.sendContainer}>
        {shouldRenderHeaderBar && (
          <HeaderBar label="Send Assets" shouldRenderRefresh />
        )}
        {!noSendableAssets && (
          <AmountsPanel
            amountsData={this.createSendAmountsData()}
            currencyCode={currencyCode}
          />
        )}
        <SendPanel
          maxNumberOfRecipients={MAX_NUMBER_OF_RECIPIENTS}
          sendRowDetails={sendRowDetails}
          sendableAssets={sendableAssets}
          showConfirmSend={showConfirmSend}
          sendSuccess={sendSuccess}
          sendError={sendError}
          sendErrorMessage={sendErrorMessage}
          noSendableAssets={noSendableAssets}
          contacts={contacts}
          txid={txid}
          addRow={this.addRow}
          removeRow={this.removeRow}
          updateRowField={this.updateRowField}
          clearErrors={this.clearErrors}
          handleSubmit={this.handleSubmit}
          handleAddPriorityFee={this.handleAddPriorityFee}
          fees={fees}
          address={address}
          resetViewsAfterError={this.resetViewsAfterError}
          handleEditRecipientsClick={this.handleEditRecipientsClick}
          handleSend={this.handleSend}
          resetViews={this.resetViews}
          showSendModal={showSendModal}
          pushQRCodeData={this.pushQRCodeData}
        />
      </section>
    )
  }
}
