// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'

import LoginNep2 from './LoginNep2'
import withFailureNotification from '../../hocs/withFailureNotification'
import { nep2LoginActions } from '../../actions/authActions'
import { updateAccountsActions } from '../../actions/accountsActions'

const mapLoginActionsToProps = (actions) => ({
  loginNep2: (passphrase, encryptedWIF, label, callback) => actions.call({ passphrase, encryptedWIF, label, callback })
})

const mapAccountsActionsToProps = (actions) => ({
  updateAccounts: (accounts) => actions.call(accounts)
})

export default compose(
  withActions(nep2LoginActions, mapLoginActionsToProps),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withFailureNotification(nep2LoginActions)
)(LoginNep2)
