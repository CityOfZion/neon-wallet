// @flow
import React from 'react'
import { uniqueId } from 'lodash'
import { wallet } from 'neon-js'
import { toBigNumber } from '../../core/math'

import SendPageHeader from '../../components/Send/SendPageHeader'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import SendPanel from '../../components/Send/SendPanel'
// import styles from './Send.scss'

export default class Send extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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

      newState.splice(index, 1)

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
          max: this.getMaxValue('NEO'),
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
        objectToModify.max = this.props.sendableAssets[value].balance
      }

      return { sendRowDetails: newState }
    })
  }

  handleSubmit = () => {
    const rows = [...this.state.sendRowDetails]

    rows.forEach((row, index) => {
      this.validateRow(row, index)
    })

    const isValid = this.checkErrors()

    if (isValid) {
      console.log('valid')
      // Set state to show next step
    }
  }

  checkErrors() {
    let errors = []
    const rows = [...this.state.sendRowDetails]

    rows.forEach(row => {
      errors = [errors, ...Object.keys(row.errors)]
    })

    return !errors.length
  }

  validateRow = (row, index) => {
    this.validateAmount(row.amount, row.max, row.asset, index)
    this.validateAddress(row.address, index)
  }

  validateAmount = (amount, max, asset, index) => {
    const { errors } = this.state.sendRowDetails[index]

    if (typeof Number(amount) !== 'number') {
      errors.amount = 'Amount must be a number.'
    }

    if (asset === 'NEO' && !toBigNumber(Number(amount)).isInteger()) {
      errors.amount = 'You cannot send fractional amounts of NEO.'
    }

    if (Number(amount) < 0) {
      errors.amount = `You cannot send negative amounts of ${asset}.`
    }

    if (Number(amount) === 0) {
      errors.amount = `Can not send 0 ${asset}.`
    }

    if (Number(amount) > max) {
      errors.amount = `You do not have enough balance to send ${amount} ${asset}`
    }

    this.updateRowField(index, 'errors', errors)
  }

  validateAddress = (address, index) => {
    if (!wallet.isAddress(address)) {
      const { errors } = this.state.sendRowDetails[index]
      errors.address = 'You need to specify a valid NEO Address.'

      this.updateRowField(index, 'errors', errors)
    }
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
    const { sendRowDetails } = this.state
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
        />
      </section>
    )
  }
}
