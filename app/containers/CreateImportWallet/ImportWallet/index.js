// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions, withCall } from 'spunky'

import ImportWallet from './ImportWallet'
import nodeStorageActions from '../../../actions/nodeStorageActions'

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'
import withSettingsContext from '../../../hocs/withSettingsContext'
import withAccountsData from '../../../hocs/withAccountsData'

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
)(withAccountsData(withSettingsContext(ImportWallet)))
