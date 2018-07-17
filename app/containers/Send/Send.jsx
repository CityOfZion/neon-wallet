// @flow
import React from 'react'
import { uniqueId } from 'lodash'
import { wallet } from 'neon-js'
import {
  toNumber,
  toBigNumber,
  multiplyNumber,
  minusNumber
} from '../../core/math'

import { isBlacklisted } from '../../core/wallet'

import blacklist from '../../util/blacklist'

import SendPageHeader from '../../components/Send/SendPageHeader'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import SendPanel from '../../components/Send/SendPanel'

type Props = {
  sendableAssets: Object,
  prices: Object,
  sendTransaction: (Array<SendEntryType>) => Object,
  contacts: Object
}

export default class Send extends React.Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      showConfirmSend: false,
      sendSuccess: false,
      sendError: false,
      sendErrorMessage: '',
      txid: '',
      sendRowDetails: []
    }
  }

  componentDidMount() {
    this.setState(prevState => {
      const newState = [...prevState.sendRowDetails]

      newState.push(this.generateRow())

      return { sendRowDetails: newState }
    })
  }

  generateRow = () => {
    const { sendableAssets } = this.props
    const sendableAssetNames = Object.keys(sendableAssets)
    const firstSendableAssetName = sendableAssetNames[0]

    if (sendableAssetNames.length > 0) {
      return {
        asset: firstSendableAssetName,
        amount: 0,
        address: '',
        note: '',
        max: this.calculateMaxValue(firstSendableAssetName),
        id: uniqueId(),
        errors: {}
      }
    }

    return null
  }

  createSendAmountsData = () => {
    const { sendableAssets, prices } = this.props
    const { showConfirmSend, sendSuccess, sendRowDetails } = this.state

    let assets = Object.keys(sendableAssets)

    if (showConfirmSend || sendSuccess) {
      assets = assets.filter(asset =>
        sendRowDetails
          .reduce((accumulator, row) => accumulator.concat(row.asset), [])
          .includes(asset)
      )
    }

    return assets.map(asset => {
      const { balance } = sendableAssets[asset]
      const currentBalance = minusNumber(
        balance,
        this.calculateRowAmounts(asset)
      )
      const price = prices[asset]

      const totalBalanceWorth = price ? multiplyNumber(balance, price) : 0
      const remainingBalanceWorth = price ? multiplyNumber(currentBalance, price) : 0

      return {
        symbol: asset,
        totalBalance: balance,
        price,
        currentBalance,
        totalBalanceWorth,
        remainingBalanceWorth
      }
    })
  }

  removeRow = (index: number) => {
    this.setState(prevState => {
      const newState = [...prevState.sendRowDetails]

      if (newState.length > 1) {
        newState.splice(index, 1)
      }
      return { sendRowDetails: newState }
    })
  }

  addRow = () => {
    this.setState(prevState => {
      const newState = [...prevState.sendRowDetails]

      if (newState.length < 5) {
        newState.push(this.generateRow())

        return { sendRowDetails: newState }
      }
    })
  }

  updateRowField = (index: number, field: string, value: string) => {
    this.setState(prevState => {
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
      return rows
        .filter(row => row.asset === asset)
        .map(row => row.amount)
        .reduce(
          (accumulator, currentValue) => accumulator.plus(currentValue || 0),
          toBigNumber(0)
        )
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
        sendRowDetails: newState
      }
    })
  }

  handleSubmit = () => {
    const rows = [...this.state.sendRowDetails]
    
    const promises = rows.map((row, index) => this.validateRow(row, index))
    
    Promise.all(promises).then(values => {
      const isValid = values.every(result => result === true)

      if (isValid) {
        this.setState({ showConfirmSend: true })
      }
    })
  }

  handleSend = () => {
    const { sendTransaction } = this.props
    const { sendRowDetails } = this.state

    const entries = sendRowDetails.map(row => ({
      address: row.address,
      amount: toNumber(row.amount),
      symbol: row.asset,
      note: row.note
    }))

    sendTransaction(entries)
      .then(result => {
        this.setState({ sendSuccess: true, txid: result.txid })
      })
      .catch(error => {
        this.setState({ sendError: true, sendErrorMessage: error.message })
      })
  }

  handleEditRecipientsClick = () => this.setState({ showConfirmSend: false })

  validateRow = async (row: object, index: number) => {
    const validAmount = this.validateAmount(
      row.amount,
      row.max,
      row.asset,
      index
    )
    const validAddress = await this.validateAddress(row.address, index)

    console.log(validAmount, validAddress)

    return validAmount && validAddress
  }

  validateAmount = (
    amount: number,
    max: number,
    asset: string,
    index: number
  ) => {
    const { errors } = this.state.sendRowDetails[index]

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

    if (errors.amount) {
      this.updateRowField(index, 'errors', errors)
      return false
    }
    return true
  }

  validateAddress = async (formAddress: string, index: number) => {
    const { address } = this.props
    const { errors } = this.state.sendRowDetails[index]

    if (!wallet.isAddress(formAddress)) {
      errors.address = 'You need to specify a valid NEO address.'
    }

    if (formAddress === address) {
      errors.address = "You can't send to your own address."
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
    this.setState(prevState => {
      const newState = [...prevState.sendRowDetails]

      const objectToClear = newState[index]
      if (objectToClear.errors[field]) {
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
      txid
    } = this.state
    const { sendableAssets, contacts } = this.props
    const noSendableAssets = Object.keys(sendableAssets).length === 0

    return (
      <section>
        <SendPageHeader />
        {!noSendableAssets && (
          <SendAmountsPanel sendAmountsData={this.createSendAmountsData()} />
        )}
        <SendPanel
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
          resetViewsAfterError={this.resetViewsAfterError}
          handleEditRecipientsClick={this.handleEditRecipientsClick}
          handleSend={this.handleSend}
          resetViews={this.resetViews}
        />
      </section>
    )
  }
}
