// @flow
import { compose } from 'recompose'
import { get } from 'lodash-es'
import { withData } from 'spunky'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import { addPendingTransaction } from '../../../actions/pendingTransactionActions'
import withAuthData from '../../../hocs/withAuthData'

const mapPendingTransactionsDataToProps = (
  pendingTransactions: Array<PendingTransactions>,
) => ({
  pendingTransactionsCount: get(pendingTransactions, 'length', 0),
})

export default compose(
  withRouter, // allow `NavLink` components to re-render when the window location changes
  withAuthData(),
  withData(addPendingTransaction, mapPendingTransactionsDataToProps),
)(Sidebar)
