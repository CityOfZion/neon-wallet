// @flow
import { compose } from 'recompose'
import { withCall } from 'spunky'

import TransactionHistory from './TransactionHistory'
import transactionHistoryActions from '../../actions/transactionHistoryActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'

export default compose(
  withNetworkData(),
  withAuthData(),
  withCall(transactionHistoryActions)
)(TransactionHistory)
