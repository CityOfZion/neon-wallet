// @flow
import React from 'react'
import { uniqueId } from 'lodash'
import { wallet } from 'neon-js'
import { toNumber, toBigNumber } from '../../core/math'

import { isBlacklisted } from '../../core/wallet'

import SendPageHeader from '../../components/Send/SendPageHeader'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import SendPanel from '../../components/Send/SendPanel'

export default class Send extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showConfirmSend: false,
      sendSuccess: false,
      txid: '',
      sendRowDetails: [
        {
          asset: 'NEO',
          amount: 0,
          address: '',
          note: '',
          max: this.getMaxValue('NEO'),
          id: uniqueId(),
          errors: {}
        }
      ]
    }
  }

  getMaxValue = assetSymbol => {
    const { sendableAssets } = this.props

    const asset = sendableAssets[assetSymbol]

    if (asset) return asset.balance
    return 0
  }

  removeRow = index => {
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
        newState.push({
          asset: 'NEO',
          amount: 0,
          address: '',
          note: '',
          max: this.calculateMaxValue('NEO'),
          id: uniqueId(),
          errors: {}
        })

        return { sendRowDetails: newState }
      }
    })
  }

  updateRowField = (index, field, value) => {
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

  calculateMaxValue = asset => {
    const rows = [...this.state.sendRowDetails]
    const { sendableAssets } = this.props

    const existingAmounts = rows
      .filter(row => row.asset === asset)
      .map(row => row.amount)
      .reduce(
        (accumulator, currentValue) => accumulator.plus(currentValue || 0),
        toBigNumber(0)
      )

    if (sendableAssets[asset]) {
      return toBigNumber(this.props.sendableAssets[asset].balance)
        .minus(existingAmounts)
        .toNumber()
    }
    return 0
  }

  resetViews = () => {
    this.setState(() => {
      const newState = []

      newState.push({
        asset: 'NEO',
        amount: 0,
        address: '',
        note: '',
        max: this.calculateMaxValue('NEO'),
        id: uniqueId(),
        errors: {}
      })

      return {
        showConfirmSend: false,
        sendSuccess: false,
        sendRowDetails: newState
      }
    })
  }

  handleSubmit = () => {
    const rows = [...this.state.sendRowDetails]

    const isValid = rows
      .map((row, index) => this.validateRow(row, index))
      .every(result => result === true)

    if (isValid) {
      this.setState({ showConfirmSend: true })
    }
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
      .catch(() => console.log('something went wrong'))
  }

  handleEditRecipientsClick = () => this.setState({ showConfirmSend: false })

  validateRow = (row, index) => {
    const validAmount = this.validateAmount(
      row.amount,
      row.max,
      row.asset,
      index
    )
    const validAddress = this.validateAddress(row.address, index)

    return validAmount && validAddress
  }

  validateAmount = (amount, max, asset, index) => {
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
      errors.amount = `You do not have enough balance to send ${amount} ${asset}`
    }

    if (errors.amount) {
      this.updateRowField(index, 'errors', errors)
      return false
    }
    return true
  }

  validateAddress = (address, index) => {
    if (!wallet.isAddress(address)) {
      const { errors } = this.state.sendRowDetails[index]
      errors.address = 'You need to specify a valid NEO Address.'

      this.updateRowField(index, 'errors', errors)
      return false
    }

    return true
  }

  clearErrors = (index, field) => {
    this.setState(prevState => {
      const newState = [...prevState.sendRowDetails]

      const objectToClear = newState[index]

      if (objectToClear.errors[field]) {
        objectToClear.errors[field] = null
      }
    })
  }

  render() {
    const { sendRowDetails, showConfirmSend, sendSuccess, txid } = this.state
    const { sendableAssets, contacts } = this.props

    return (
      <section>
        <SendPageHeader />
        <SendAmountsPanel />
        <SendPanel
          sendRowDetails={sendRowDetails}
          sendableAssets={sendableAssets}
          addRow={this.addRow}
          removeRow={this.removeRow}
          updateRowField={this.updateRowField}
          contacts={contacts}
          clearErrors={this.clearErrors}
          handleSubmit={this.handleSubmit}
          showConfirmSend={showConfirmSend}
          sendSuccess={sendSuccess}
          handleEditRecipientsClick={this.handleEditRecipientsClick}
          handleSend={this.handleSend}
          resetViews={this.resetViews}
          txid={txid}
        />
      </section>
    )
  }
}
