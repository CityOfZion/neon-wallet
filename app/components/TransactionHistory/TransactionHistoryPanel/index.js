// @flow
import { compose } from 'recompose'
import { withCall, withData } from 'spunky'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import withProgressPanel from '../../../hocs/withProgressPanel'

const mapTransactionsDataToProps = (transactions) => ({
  transactions
})

export default compose(
  withNetworkData(),
  withAuthData(),
  withCall(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
  withProgressPanel(transactionHistoryActions, { title: 'Transaction History' })
)(TransactionHistoryPanel)
