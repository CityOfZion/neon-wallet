// @flow
import { compose } from 'recompose'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import TransactionHistoryPanel from './TransactionHistoryPanel'

import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'

import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
} from '../../../modules/notifications'
import withTransactionHistory from '../../../hocs/withTransactionHistory'
import withPendingTransactions from '../../../hocs/withPendingTransactionsData'

const mapTransactionsDataToProps = data => ({
  transactions: data?.entries ?? [],
  count: data?.count ?? 0,
})

// const mapAccountActionsToProps = (actions, { net, address }) => ({
//   handleFetchAdditionalTxData: () =>
//     actions.call({
//       net,
//       address,
//       shouldIncrementPagination: true,
//     }),
//   handleRefreshTxData: () =>
//     actions.call({
//       net,
//       address,
//       shouldIncrementPagination: false,
//     }),
// })

// const mapPendingTransactionActionsToProps = (actions, { net, address }) => ({
//   handleGetPendingTransactionInfo: () =>
//     actions.call({
//       net,
//       address,
//     }),
// })

const mapPendingTransactionInfoToProps = pendingTransactions => ({
  pendingTransactions: pendingTransactions || [],
})

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData,
  withNetworkData(),

  // withActions(transactionHistoryActions, mapAccountActionsToProps),
  // withActions(getPendingTransactionInfo, mapPendingTransactionActionsToProps),
  // withCall(getPendingTransactionInfo),
  // withData(getPendingTransactionInfo, mapPendingTransactionInfoToProps),
  // withLoadingProp(transactionHistoryActions),
  // withData(transactionHistoryActions, mapTransactionsDataToProps),
  withTransactionHistory(mapTransactionsDataToProps),
  withPendingTransactions(mapPendingTransactionInfoToProps),
)(TransactionHistoryPanel)
