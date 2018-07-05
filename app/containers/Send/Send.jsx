// @flow
import React from 'react'
import { uniqueId } from 'lodash'

import SendPageHeader from '../../components/Send/SendPageHeader'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import SendPanel from '../../components/Send/SendPanel'
// import styles from './Send.scss'

export default class Send extends React.Component {
  state = {
    sendRowDetails: [
      {
        asset: 'NEO',
        amount: 0,
        address: '',
        note: '',
        id: uniqueId()
      }
    ]
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

      return { sendRowDetails: newState }
    })
  }

  render() {
    const { sendRowDetails } = this.state

    return (
      <section>
        <SendPageHeader />
        <SendAmountsPanel />
        <SendPanel
          sendRowDetails={sendRowDetails}
          addRow={this.addRow}
          removeRow={this.removeRow}
          updateRowField={this.updateRowField}
        />
      </section>
    )
  }
}
