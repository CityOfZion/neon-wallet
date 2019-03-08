// @flow
import { compose } from 'recompose'
import { withData, withActions, withCall } from 'spunky'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import { getPendingTransactionInfo } from '../../../actions/pendingTransactionActions'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withLoadingProp from '../../../hocs/withLoadingProp'
import withSuccessNotification from '../../../hocs/withSuccessNotification'

const mapTransactionsDataToProps = transactions => ({
  transactions,
})

const mapAccountActionsToProps = (actions, { net, address }) => ({
  handleFetchAdditionalTxData: () =>
    actions.call({
      net,
      address,
      shouldIncrementPagination: true,
    }),
  handleRefreshTxData: () =>
    actions.call({
      net,
      address,
      shouldIncrementPagination: false,
    }),
})

const mapPendingTransactionActionsToProps = (actions, { net, address }) => ({
  handleGetPendingTransactionInfo: () =>
    actions.call({
      net,
      address,
    }),
})

const mapPendingTransactionInfoToProps = pendingTransactions => ({
  pendingTransactions: pendingTransactions || [],
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withProgressPanel(transactionHistoryActions, {
    title: 'Transaction History',
  }),
  withActions(transactionHistoryActions, mapAccountActionsToProps),
  withActions(getPendingTransactionInfo, mapPendingTransactionActionsToProps),
  withCall(getPendingTransactionInfo),
  withData(getPendingTransactionInfo, mapPendingTransactionInfoToProps),
  withLoadingProp(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
)(TransactionHistoryPanel)
