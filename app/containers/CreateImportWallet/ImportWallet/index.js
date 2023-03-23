// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions, withCall } from 'spunky'

import ImportWallet from './ImportWallet'
import nodeStorageActions from '../../../actions/nodeStorageActions'
import accountsActions, {
  updateAccountsActions,
} from '../../../actions/accountsActions'

import { updateAccountsActions as updateN3AccountsActions } from '../../../actions/n3AccountsActions'

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'
import withSettingsContext from '../../../hocs/withSettingsContext'

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const mapAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts),
})

const mapN3AccountsActionsToProps = actions => ({
  setN3Accounts: accounts => actions.call(accounts),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withCall(nodeStorageActions),
  withData(accountsActions, mapAccountsDataToProps),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateN3AccountsActions, mapN3AccountsActionsToProps),
)(withSettingsContext(ImportWallet))
