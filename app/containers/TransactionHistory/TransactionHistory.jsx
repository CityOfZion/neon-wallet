// @flow
import React, { Component } from 'react'
import Loader from '../../components/Loader'
import Transactions from './Transactions'
import styles from './TransactionHistory.scss'
import classNames from 'classnames'

type Props = {
  address: string,
  net: NetworkType,
  transactions: Object,
  explorer: ExplorerType,
  syncTransactionHistory: Function,
  isLoadingTransactions: boolean
}

export default class TransactionHistory extends Component<Props> {
  componentDidMount () {
    const { net, address, syncTransactionHistory } = this.props
    syncTransactionHistory(net, address)
  }

  render () {
    const { transactions, net, explorer, isLoadingTransactions } = this.props
    return (
      <div id='transactionInfo' className={styles.transactionInfo}>
        <div className={classNames(styles.columnHeader, 'columnHeader')}>Transaction History</div>
        <div className={classNames(styles.headerSpacer, 'headerSpacer')} />
        {isLoadingTransactions
          ? <Loader />
          : <Transactions
            transactions={transactions}
            net={net}
            explorer={explorer}
          />
        }
      </div>
    )
  }
}
