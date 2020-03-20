// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'
import { injectIntl } from 'react-intl'

import accountsActions, {
  updateAccountsActions,
} from '../../actions/accountsActions'
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

const mapSaveAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withData(accountsActions, mapAccountsDataToProps),
  withData(walletLabelActions, mapAccountsDataToProps),
  withActions(updateAccountsActions, mapSaveAccountsActionsToProps),
  withActions(updateLabelActions, mapSaveAccountActionsToProps),
  withFailureNotification(updateLabelActions),
  withSuccessNotification(
    updateLabelActions,
    'Succesfully updated wallet name.',
  ),
  injectIntl,
)(EditWallet)
