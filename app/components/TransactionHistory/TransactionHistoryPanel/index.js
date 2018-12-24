// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withData, withActions, withCall } from 'spunky'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import { getPendingTransactionInfo } from '../../../actions/pendingTransactionActions'
import withProgressPanel from '../../../hocs/withProgressPanel'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withLoadingProp from '../../../hocs/withLoadingProp'

const mapTransactionsDataToProps = transactions => ({
  transactions,
})

const mapAccountActionsToProps = (actions, props) => ({
  handleFetchAddtionalTxData: () =>
    actions.call({
      net: props.net,
      address: props.address,
      shouldIncrementPagination: true,
    }),
})

const mapDispatchToProps = dispatch => ({
  getPendingTransactionInfo: ({ address, net }) =>
    dispatch(getPendingTransactionInfo.call({ address, net })),
})

const mapPendingTransactionInfoToProps = pendingTransactions => ({
  pendingTransactions,
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withNetworkData(),
  withProgressPanel(transactionHistoryActions, {
    title: 'Transaction History',
  }),
  withActions(transactionHistoryActions, mapAccountActionsToProps),
  withCall(getPendingTransactionInfo),
  withData(getPendingTransactionInfo, mapPendingTransactionInfoToProps),
  withLoadingProp(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
)(TransactionHistoryPanel)
