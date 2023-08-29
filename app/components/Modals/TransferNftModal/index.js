// @flow
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TransferNftModal from './TransferNftModal'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
} from '../../../modules/notifications'

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
  injectIntl,
  withNetworkData(),
  withAuthData,
)(TransferNftModal)
