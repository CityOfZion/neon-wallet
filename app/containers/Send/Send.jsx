// @flow
import React from 'react'

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
        note: ''
      },
      {
        asset: 'RPX',
        amount: 1000,
        address: '',
        note: ''
      }
    ]
  }

  removeRow = index => {
    const newState = [...this.state.sendRowDetails]

    newState.splice(index, 1)

    this.setState({ sendRowDetails: newState })
  }

  addRow = () => {
    const newState = [...this.state.sendRowDetails]

    if (newState.length < 5) {
      newState.push({ asset: 'NEO', amount: 0, address: '', note: '' })

      this.setState({ sendRowDetails: newState })
    }
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
        />
      </section>
    )
  }
}
