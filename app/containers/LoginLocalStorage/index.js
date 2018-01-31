// @flow
import { compose } from 'recompose'

import withData from '../../hocs/api/withData'
import withActions from '../../hocs/api/withActions'
import withFailureNotification from '../../hocs/withFailureNotification'
import accountsActions from '../../actions/accountsActions'
import { nep2LoginActions } from '../../actions/authActions'

import LoginLocalStorage from './LoginLocalStorage'

const mapAccountsDataToProps = (accounts) => ({
  accounts
})

const mapActionsToProps = (actions) => ({
  loginNep2: (passphrase, encryptedWIF) => actions.request({ passphrase, encryptedWIF })
})

export default compose(
  withData(accountsActions, mapAccountsDataToProps),
  withActions(nep2LoginActions, mapActionsToProps),
  withFailureNotification(nep2LoginActions)
)(LoginLocalStorage)
