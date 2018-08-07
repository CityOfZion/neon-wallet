// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import withProgressPanel from '../../../hocs/withProgressPanel'

const mapTransactionsDataToProps = transactions => ({
  transactions
})

export default compose(
  withProgressPanel(transactionHistoryActions, {
    title: 'Transaction History'
  }),
  withData(transactionHistoryActions, mapTransactionsDataToProps)
)(TransactionHistoryPanel)
