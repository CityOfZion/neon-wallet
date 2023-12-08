// @flow
import { compose } from 'recompose'
import { withData, withActions, withCall } from 'spunky'
import { connect } from 'react-redux'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import { getPendingTransactionInfo } from '../../../actions/pendingTransactionActions'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withLoadingProp from '../../../hocs/withLoadingProp'

const mapTransactionsDataToProps = data => ({
  transactions: data?.entries ?? [],
  count: data?.count ?? 0,
})

const mapAccountActionsToProps = (actions, { net, address }) => ({
  handleFetchAdditionalTxData: () =>
    actions.call({
      net,
      address,
      shouldIncrementPagination: true,
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
  connect(null),
  withAuthData(),
  withNetworkData(),
  withActions(transactionHistoryActions, mapAccountActionsToProps),
  withActions(getPendingTransactionInfo, mapPendingTransactionActionsToProps),
  withCall(getPendingTransactionInfo),
  withData(getPendingTransactionInfo, mapPendingTransactionInfoToProps),
  withLoadingProp(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
)(TransactionHistoryPanel)
