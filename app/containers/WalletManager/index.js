// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import accountsActions, {
  updateAccountsActions,
  updateLabelActions
} from '../../actions/accountsActions'
import {
  showErrorNotification,
  showSuccessNotification
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'

import WalletManager from './WalletManager.jsx'

const mapAccountsDataToProps = accounts => ({
  accounts
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification
}

const mapAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts),
  saveAccount: ({ label, address }) => actions.call({ label, address })
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapStateToProps = (state: Object) => ({})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(accountsActions, mapAccountsDataToProps),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateLabelActions, mapAccountsActionsToProps)
)(WalletManager)
