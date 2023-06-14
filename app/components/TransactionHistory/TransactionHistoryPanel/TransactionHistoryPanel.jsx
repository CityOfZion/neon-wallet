// @flow
import React from 'react'
import classNames from 'classnames'
import { intersectionBy } from 'lodash-es'
import { Center, Box } from '@chakra-ui/react'

import Transactions from './Transactions'
import Panel from '../../Panel'
import { pruneConfirmedOrStaleTransaction } from '../../../actions/pendingTransactionActions'
import styles from './TransactionHistoryPanel.scss'
import Button from '../../Button'
import Loader from '../../Loader'

type Props = {
  className: ?string,
  transactions: Array<Object>,
  count: number,
  handleFetchAdditionalTxData: () => void,
  handleGetPendingTransactionInfo: () => void,
  handleRefreshTxData: () => void,
  pendingTransactions: Array<Object>,
  address: string,
  showSuccessNotification: ({ message: string }) => void,
  loading: boolean,
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
    const {
      className,
      transactions,
      handleFetchAdditionalTxData,
      loading,
      count,
    } = this.props
    const filteredPendingTransactions = this.pruneConfirmedTransactionsFromPending()
    this.pruneReturnedTransactionsFromStorage()
    return (
      <>
        <Panel
          className={classNames(styles.transactionHistoryPanel, className)}
        >
          {loading && !transactions.length ? (
            <Center height="10000px">
              <Loader />
            </Center>
          ) : (
            <Transactions
              className={styles.transactions}
              transactions={transactions}
              pendingTransactions={filteredPendingTransactions || []}
            />
          )}
        </Panel>

        {!!transactions.length && (
          <Center
            width="300px"
            margin="auto"
            paddingTop="12px"
            paddingBottom="12px"
            display="flex"
            flexDirection="column"
          >
            <Box fontSize="14px" opacity={0.5} marginBottom="12px">
              Displaying {transactions.length} of {count} transactions
            </Box>

            <Button
              onClick={handleFetchAdditionalTxData}
              primary
              disabled={transactions.length === count}
              className={styles.loadMoreButton}
            >
              {loading ? (
                <Loader className={styles.buttonLoadingIndicator} />
              ) : (
                'Load more'
              )}
            </Button>
          </Center>
        )}
      </>
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
}
