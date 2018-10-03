import React from 'react'

import HeaderBar from '../../components/HeaderBar'
import TransactionHistoryPanel from '../../components/TransactionHistory/TransactionHistoryPanel'

import styles from './TransactionHistory.scss'

export default function TransactionHistory() {
  return (
    <div className={styles.transactionHistory}>
      <HeaderBar label="All Activity" shouldRenderRefresh />
      <TransactionHistoryPanel className={styles.transactionHistoryPanel} />
    </div>
  )
}
