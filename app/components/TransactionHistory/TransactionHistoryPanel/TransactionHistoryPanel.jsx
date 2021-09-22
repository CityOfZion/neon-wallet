// @flow
import React from 'react'
import classNames from 'classnames'
import { intersectionBy } from 'lodash-es'

import Transactions from './Transactions'
import Panel from '../../Panel'
import { pruneConfirmedOrStaleTransaction } from '../../../actions/pendingTransactionActions'
import styles from './TransactionHistoryPanel.scss'

type Props = {
  className: ?string,
  transactions: Array<Object>,
  handleFetchAdditionalTxData: () => void,
  handleGetPendingTransactionInfo: () => void,
  handleRefreshTxData: () => void,
  pendingTransactions: Array<Object>,
  address: string,
  showSuccessNotification: ({ message: string }) => void,
}

const REFRESH_INTERVAL_MS = 30000

export default class TransactionHistory extends React.Component<Props> {
  transactionDataInterval: IntervalID

  static defaultProps = {
    transactions: [],
    pendingTransactions: [],
  }

  componentDidMount() {
    this.addPolling()
  }

  componentWillUnmount() {
    this.removePolling()
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

  addPolling = () => {
    const { showSuccessNotification } = this.props
    this.transactionDataInterval = setInterval(async () => {
      await this.props.handleGetPendingTransactionInfo()
      this.props.handleRefreshTxData()
      showSuccessNotification({
        message: 'Received latest transaction information.',
      })
    }, REFRESH_INTERVAL_MS)
  }

  removePolling = () => {
    if (this.transactionDataInterval) {
      clearInterval(this.transactionDataInterval)
    }
  }

  pruneConfirmedTransactionsFromPending() {
    const { transactions, pendingTransactions } = this.props
    const confirmed = transactions.map(tx => tx.txid)
    return pendingTransactions.reduce((accum, currVal) => {
      if (confirmed.find(tx => tx === currVal.txid)) return accum
      accum.push(currVal)
      return accum
    }, [])
  }

  async pruneReturnedTransactionsFromStorage() {
    const {
      transactions,
      pendingTransactions,
      address,
      handleGetPendingTransactionInfo,
    } = this.props
    const toBePurged = intersectionBy(transactions, pendingTransactions, 'txid')
    // eslint-disable-next-line
    for (const transaction of toBePurged) {
      // eslint-disable-next-line
      await pruneConfirmedOrStaleTransaction(address, transaction.txid)
      handleGetPendingTransactionInfo()
    }
  }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const { handleFetchAdditionalTxData } = this.props
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      handleFetchAdditionalTxData()
    }
  }
}
