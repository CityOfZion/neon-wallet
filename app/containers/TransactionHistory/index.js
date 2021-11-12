// @flow
import { compose } from 'recompose'
import { withCall } from 'spunky'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import TransactionHistory from './TransactionHistory'
import transactionHistoryActions from '../../actions/transactionHistoryActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import balancesActions from '../../actions/balancesActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withFailureNotification from '../../hocs/withFailureNotification'
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
} from '../../modules/notifications'

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withNetworkData(),
  withAuthData(),
  withLoadingProp(balancesActions),
  withSuccessNotification(
    balancesActions,
    'notifications.success.receivedBlockchainInfo',
    {},
    true,
  ),
  withFailureNotification(
    balancesActions,
    'notifications.failure.blockchainInfoFailure',
    {},
    true,
  ),
  withCall(transactionHistoryActions),
  injectIntl,
)(TransactionHistory)
