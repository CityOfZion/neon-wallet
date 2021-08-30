// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withCall, withData, withActions } from 'spunky'
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
import n3AccountsActions, {
  updateAccountsActions as updateN3AccountsActions,
} from '../../actions/n3AccountsActions'
import withChainData from '../../hocs/withChainData'

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const mapN3AccountsDataToProps = n3Accounts => ({
  n3Accounts,
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

const mapSaveN3AccountsActionsToProps = actions => ({
  setN3Accounts: accounts => actions.call(accounts),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withChainData(),
  withCall(accountsActions),
  withCall(n3AccountsActions),
  withData(accountsActions, mapAccountsDataToProps),
  withData(n3AccountsActions, mapN3AccountsDataToProps),
  withData(walletLabelActions, mapAccountsDataToProps),
  withActions(updateAccountsActions, mapSaveAccountsActionsToProps),
  withActions(updateN3AccountsActions, mapSaveN3AccountsActionsToProps),
  withActions(updateLabelActions, mapSaveAccountActionsToProps),
  withFailureNotification(updateLabelActions),
  withSuccessNotification(
    updateLabelActions,
    'notifications.success.updatedWalletName',
    {},
    true,
  ),
  injectIntl,
)(EditWallet)
