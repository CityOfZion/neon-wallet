// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'
import { injectIntl } from 'react-intl'

import walletLabelActions, {
  updateLabelActions,
} from '../../actions/walletLabelActions'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withFailureNotification from '../../hocs/withFailureNotification'
import withAuthData from '../../hocs/withAuthData'
import { showModal } from '../../modules/modal'
import EditWallet from './EditWallet'
import withSettingsContext from '../../hocs/withSettingsContext'
import withAccountsData from '../../hocs/withAccountsData'

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapSaveAccountActionsToProps = actions => ({
  saveAccount: ({ label, address }) => actions.call({ label, address }),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withData(walletLabelActions, mapAccountsDataToProps),
  withActions(updateLabelActions, mapSaveAccountActionsToProps),
  withFailureNotification(updateLabelActions),
  withSuccessNotification(
    updateLabelActions,
    'notifications.success.updatedWalletName',
    {},
    true,
  ),
  injectIntl,
)(withAccountsData(withSettingsContext(EditWallet)))
