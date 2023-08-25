// @flow
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import LoginLocalStorage from './LoginLocalStorage'
import { nep2LoginActions } from '../../actions/authActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import withFailureNotification from '../../hocs/withFailureNotification'
import pureStrategy from '../../hocs/helpers/pureStrategy'
import newMigrationWalletActions from '../../actions/newMigrationWalletActions'
import withSettingsContext from '../../hocs/withSettingsContext'
import withAccountsData from '../../hocs/withAccountsData'

type NewWalletProps = {
  newWalletCreated: Function,
}

const mapActionsToProps = actions => ({
  loginNep2: (passphrase, encryptedWIF, chain) =>
    actions.call({ passphrase, encryptedWIF, chain }),
})

const mapNewWalletDataToProps = (name: string) => ({
  newMigratedWalletName: name,
})

const mapNewWalletActionsToProps = (actions): NewWalletProps => ({
  newWalletCreated: name => actions.call({ name }),
})

export default compose(
  withActions(nep2LoginActions, mapActionsToProps),
  withLoadingProp(nep2LoginActions, { strategy: pureStrategy }),
  withData(newMigrationWalletActions, mapNewWalletDataToProps),
  withActions(newMigrationWalletActions, mapNewWalletActionsToProps),
  withFailureNotification(nep2LoginActions),
)(withAccountsData(withSettingsContext(LoginLocalStorage)))
