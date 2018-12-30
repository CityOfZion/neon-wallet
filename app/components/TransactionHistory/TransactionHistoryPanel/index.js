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
  withCall(getPendingTransactionInfo),
  withData(getPendingTransactionInfo, mapPendingTransactionInfoToProps),
  withLoadingProp(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
)(TransactionHistoryPanel)
