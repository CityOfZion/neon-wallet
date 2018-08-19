// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import accountsActions, {
  updateAccountsActions
} from '../../actions/accountsActions'

import { updateLabelActions } from '../../actions/walletLabelActions'
// import { getNotifications } from '../../modules/notifications'
import {
  showErrorNotification,
  showSuccessNotification
} from '../../modules/notifications'
import withLoadingProp from '../../hocs/withLoadingProp'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withFailureNotification from '../../hocs/withFailureNotification'
import pureStrategy from '../../hocs/helpers/pureStrategy'
import withAuthData from '../../hocs/withAuthData'

import { showModal } from '../../modules/modal'

import EditWallet from './EditWallet'

const mapAccountsDataToProps = accounts => ({
  accounts
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification
}

const mapSaveAccountActionsToProps = actions => ({
  saveAccount: ({ label, address }) => actions.call({ label, address })
})

const mapSaveAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withAuthData(),
  withData(accountsActions, mapAccountsDataToProps),
  withActions(updateAccountsActions, mapSaveAccountsActionsToProps),
  withActions(updateLabelActions, mapSaveAccountActionsToProps),
  // withLoadingProp(updateLabelActions, { strategy: pureStrategy }),
  // updateAccountsActions(
  //   updateLabelActions,
  //   'Succesfully updated wallet name.'
  // ),
  withFailureNotification(updateLabelActions),
  withSuccessNotification(
    updateLabelActions,
    'Succesfully updated wallet name.'
  )
)(EditWallet)
