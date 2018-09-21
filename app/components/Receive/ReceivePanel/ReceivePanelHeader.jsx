// @flow
import React from 'react'

import CopyToClipboard from '../../CopyToClipboard'

import styles from './styles.scss'

type Props = {
  address: string
}

const ReceivePanelHeader = ({ address }: Props) => (
  <section className={styles.receivePanelHeader}>
    <div className={styles.receivePanelHeaderInfo}>Select Deposit Method</div>
    <div className={styles.walletAddressContainer}>
      <div className={styles.description}>Wallet Address</div>
      <div className={styles.address}>{address}</div>
      <CopyToClipboard text={address} />
    </div>
  </section>
)

export default ReceivePanelHeader
