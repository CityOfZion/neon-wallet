// @flow
import { compose } from 'recompose'
import { get } from 'lodash-es'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withSettingsContext from '../../../hocs/withSettingsContext'
import withPendingTransactions from '../../../hocs/withPendingTransactionsData'

const mapPendingTransactionsDataToProps = (
  pendingTransactions: Array<PendingTransactions>,
) => ({
  pendingTransactionsCount: get(pendingTransactions, 'length', 0),
})

export default compose(
  withRouter, // allow `NavLink` components to re-render when the window location changes
  withAuthData,
  withNetworkData(),
  withPendingTransactions(mapPendingTransactionsDataToProps),
  // withData(addPendingTransaction, mapPendingTransactionsDataToProps),
)(withSettingsContext(Sidebar))
