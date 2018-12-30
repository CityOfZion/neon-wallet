// @flow
import React from 'react'
import classNames from 'classnames'
import { intersection } from 'lodash-es'

import Transactions from './Transactions'
import Panel from '../../Panel'
import { pruneConfirmedOrStaleTransaction } from '../../../actions/pendingTransactionActions'
import styles from './TransactionHistoryPanel.scss'

type Props = {
  className: ?string,
  transactions: Array<Object>,
  pendingTransactions: Array<Object>,
  handleFetchAddtionalTxData: () => any,
  address: string,
}

export default class TransactionHistory extends React.Component<Props> {
  static defaultProps = {
    transactions: [],
    pendingTransactions: [],
  }

  render() {
    const { className, transactions } = this.props
    const filteredPendingTransactions = this.pruneConfirmedTransactionsFromPending()
    this.pruneReturnedTransactionsFromStorage()
    return (
      <Panel
        className={classNames(styles.transactionHistoryPanel, className)}
        onScroll={this.handleScroll}
      >
        <Transactions
          className={styles.transactions}
          transactions={transactions}
          pendingTransactions={filteredPendingTransactions || []}
        />
      </Panel>
    )
  }

  pruneConfirmedTransactionsFromPending() {
    const { transactions, pendingTransactions } = this.props
    const confirmed = transactions.map(tx => tx.txid)
    return pendingTransactions.reduce((accum, currVal) => {
      if (confirmed.find(tx => tx === currVal.txid.substring(2))) return accum
      accum.push(currVal)
      return accum
    }, [])
  }

  async pruneReturnedTransactionsFromStorage() {
    const { transactions, pendingTransactions, address } = this.props
    const confirmed = transactions.map(tx => tx.txid)
    // NOTE: removes the '0x' prepended to every txId
    const pending = pendingTransactions.map(tx => tx.txid.substring(2))
    const toBePurged = intersection(confirmed, pending)
    // eslint-disable-next-line
    for (const id of toBePurged) {
      // eslint-disable-next-line
      await pruneConfirmedOrStaleTransaction(address, id)
    }
  }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const { handleFetchAddtionalTxData } = this.props
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      handleFetchAddtionalTxData()
    }
  }
}
