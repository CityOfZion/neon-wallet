import React from 'react'

import TransactionHistoryPanel from '../../components/TransactionHistory/TransactionHistoryPanel'

import styles from './TransactionHistory.scss'

export default function TransactionHistory() {
  return (
    <div className={styles.transactionHistory}>
      <TransactionHistoryPanel className={styles.transactionHistoryPanel} />
    </div>
  )
}
