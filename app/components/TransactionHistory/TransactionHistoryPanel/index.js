// @flow
import { compose } from 'recompose'
import { withData, withActions, withCall } from 'spunky'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import { getPendingTransactionInfo } from '../../../actions/pendingTransactionActions'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withLoadingProp from '../../../hocs/withLoadingProp'
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
} from '../../../modules/notifications'

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
  withAuthData(),
  withNetworkData(),
  // withProgressPanel(transactionHistoryActions, {
  //   title: '',
  // }),
  withActions(transactionHistoryActions, mapAccountActionsToProps),
  withActions(getPendingTransactionInfo, mapPendingTransactionActionsToProps),
  withCall(getPendingTransactionInfo),
  withData(getPendingTransactionInfo, mapPendingTransactionInfoToProps),
  withLoadingProp(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
)(TransactionHistoryPanel)
