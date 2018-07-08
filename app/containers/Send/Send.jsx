// @flow
import React from 'react'
import { uniqueId } from 'lodash'

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
          id: uniqueId()
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
          id: uniqueId()
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
        />
      </section>
    )
  }
}
