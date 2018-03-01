// @flow
import React from 'react'

import ReceivePanel from '../../components/Receive/ReceivePanel'
import WarningPanel from '../../components/Receive/WarningPanel'

import styles from './Receive.scss'

type Props = {
  address: string
}

export default class Dashboard extends React.Component<Props> {
  walletDataInterval: ?number

  render () {
    const { address } = this.props

    return (
      <div className={styles.receive}>
        <ReceivePanel className={styles.panel} address={address} />
        <WarningPanel className={styles.panel} />
      </div>
    )
  }
}
