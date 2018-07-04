// @flow
import React from 'react'

import SendPageHeader from '../../components/Send/SendPageHeader'
import SendAmountsPanel from '../../components/Send/SendAmountsPanel'
import SendPanel from '../../components/Send/SendPanel'
// import styles from './Send.scss'

export default class Send extends React.Component {
  render() {
    return (
      <section>
        <SendPageHeader />
        <SendAmountsPanel />
        <SendPanel />
      </section>
    )
  }
}
