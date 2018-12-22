// @flow
import React from 'react'

import styles from './WalletVersion.scss'

type Props = {
  version: number,
}

const WalletVersion = ({ version }: Props) => (
  <div className={styles.walletVersion}>
    <span className={styles.label}>Version</span>
    <span>{version}</span>
  </div>
)

export default WalletVersion
