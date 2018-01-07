// @flow
import React, { Component } from 'react'

import Loader from '../../components/Loader'

import Transactions from './Transactions'

import styles from './TransactionHistory.scss'

type Props = {
  address: string,
  net: NetworkType,
  transactions: Array<Object>,
  syncTransactionHistory: Function,
  isLoadingTransactions: boolean
}

export default class TransactionHistory extends Component<Props> {
  componentDidMount () {
    const { net, address, syncTransactionHistory } = this.props
    syncTransactionHistory(net, address)
  }

  render () {
    const { transactions, isLoadingTransactions } = this.props

    return (
      <div id='transactionInfo' className={styles.transactionInfo}>
        <div id='columnHeader' className={styles.columnHeader}>
          Transaction History {isLoadingTransactions && <Loader className={styles.updateLoader} />}
        </div>
        <div className={styles.headerSpacer} />
        <Transactions className={styles.transactions} transactions={transactions} />
      </div>
    )
  }
}
