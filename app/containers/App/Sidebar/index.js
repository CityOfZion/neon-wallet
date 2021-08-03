// @flow
import { compose } from 'recompose'
import { get } from 'lodash-es'
import { withData, withCall } from 'spunky'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import { addPendingTransaction } from '../../../actions/pendingTransactionActions'
import withAuthData from '../../../hocs/withAuthData'
import { blockHeightActions } from '../../../actions/blockHeightActions'
import withNetworkData from '../../../hocs/withNetworkData'

const mapPendingTransactionsDataToProps = (
  pendingTransactions: Array<PendingTransactions>,
) => ({
  pendingTransactionsCount: get(pendingTransactions, 'length', 0),
})

const mapBlockHeightDataToProps = (count: Number) => ({
  count,
})

export default compose(
  withRouter, // allow `NavLink` components to re-render when the window location changes
  withAuthData(),
  withNetworkData(),
  withData(addPendingTransaction, mapPendingTransactionsDataToProps),
  // withCall(blockHeightActions, mapBlockHeightDataToProps),
  withData(blockHeightActions, mapBlockHeightDataToProps),
)(Sidebar)
