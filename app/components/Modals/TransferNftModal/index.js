// @flow
import { compose } from 'recompose'
import { withData, withCall } from 'spunky'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import contactsActions from '../../../actions/contactsActions'
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

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withCall(contactsActions),
  withData(contactsActions, mapContactsDataToProps),
  injectIntl,
  withNetworkData(),
  withAuthData(),
)(TransferNftModal)
