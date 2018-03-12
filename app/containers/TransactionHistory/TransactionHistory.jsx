// @flow
import React, { Component } from 'react'

import Loader from '../../components/Loader'

import Transactions from './Transactions'

import styles from './TransactionHistory.scss'

type Props = {
  transactions: Array<Object>,
  loading: boolean
}

export default class TransactionHistory extends Component<Props> {
  render () {
    const { transactions, loading } = this.props

    return (
      <div id='transactionInfo' className={styles.transactionInfo}>
        <div id='columnHeader' className={styles.columnHeader}>
          Transaction History {loading && <Loader className={styles.updateLoader} />}
        </div>
        <div className={styles.headerSpacer} />
        {!loading && (
          <Transactions className={styles.transactions} transactions={transactions} />
        )}
      </div>
    )
  }
}
