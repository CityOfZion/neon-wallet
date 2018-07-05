// @flow
import React from 'react'

import SendPageHeader from '../../components/Send/SendPageHeader'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import SendPanel from '../../components/Send/SendPanel'
// import styles from './Send.scss'

export default class Send extends React.Component {
  state = {
    sendRowDetails: {
      1: {
        asset: 'NEO',
        amount: 0,
        address: '',
        note: ''
      },
      2: {
        asset: 'RPX',
        amount: 1000,
        address: '',
        note: ''
      }
    }
  }

  render() {
    const { numRows, sendRowDetails } = this.state

    return (
      <section>
        <SendPageHeader />
        <SendAmountsPanel />
        <SendPanel sendRowDetails={sendRowDetails} />
      </section>
    )
  }
}
