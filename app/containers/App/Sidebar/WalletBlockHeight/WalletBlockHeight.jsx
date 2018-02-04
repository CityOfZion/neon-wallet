// @flow
import React from 'react'

import styles from './WalletBlockHeight.scss'

type Props = {
  blockHeight: number
}

const WalletBlockHeight = ({ blockHeight }: Props) => (
  <div className={styles.blockHeight}>
    <span className={styles.label}>Block</span>
    <span>{blockHeight}</span>
  </div>
)

export default WalletBlockHeight
