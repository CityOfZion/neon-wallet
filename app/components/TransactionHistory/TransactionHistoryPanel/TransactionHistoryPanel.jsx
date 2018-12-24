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
  getPendingTransactionInfo: ({ address: string, net: string }) => void,
  address: string,
  net: string,
}

export default class TransactionHistory extends React.Component<Props> {
  render() {
    this.pruneReturnedTransactionsFromStorage()
    const { className, transactions, pendingTransactions } = this.props
    return (
      <Panel
        className={classNames(styles.transactionHistoryPanel, className)}
        onScroll={this.handleScroll}
      >
        <Transactions
          className={styles.transactions}
          transactions={transactions}
          pendingTransactions={pendingTransactions || []}
        />
      </Panel>
    )
  }

  async pruneReturnedTransactionsFromStorage() {
    const {
      transactions,
      pendingTransactions,
      address,
      net,
      getPendingTransactionInfo,
    } = this.props
    if (
      transactions &&
      transactions.length &&
      pendingTransactions &&
      pendingTransactions.length
    ) {
      const confirmed = transactions.map(tx => tx.txid)
      // NOTE: removes the '0x' prepended to every txId
      const pending = pendingTransactions.map(tx => tx.txid.substring(2))
      const toBePurged = intersection(confirmed, pending)
      // eslint-disable-next-line
      for (const id of toBePurged) {
        // eslint-disable-next-line
        await pruneConfirmedOrStaleTransaction(address, id)
        getPendingTransactionInfo({ address, net })
      }
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
