// @flow
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import LoginLocalStorage from './LoginLocalStorage'
import accountsActions from '../../actions/accountsActions'
import n3AccountsActions from '../../actions/n3AccountsActions'
import { nep2LoginActions } from '../../actions/authActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import withFailureNotification from '../../hocs/withFailureNotification'
import pureStrategy from '../../hocs/helpers/pureStrategy'
import withChainData from '../../hocs/withChainData'
import newMigrationWalletActions from '../../actions/newMigrationWalletActions'
import { updateSettingsActions } from '../../actions/settingsActions'

type NewWalletProps = {
  newWalletCreated: Function,
}

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const mapN3AccountsDataToProps = accounts => ({
  n3Accounts: accounts,
})

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

const mapSettingsActionsToProps = actions => ({
  setChain: chain =>
    actions.call({
      chain,
    }),
})

export default compose(
  withChainData(),
  withData(accountsActions, mapAccountsDataToProps),
  withData(n3AccountsActions, mapN3AccountsDataToProps),
  withActions(nep2LoginActions, mapActionsToProps),
  withLoadingProp(nep2LoginActions, { strategy: pureStrategy }),
  withData(newMigrationWalletActions, mapNewWalletDataToProps),
  withActions(newMigrationWalletActions, mapNewWalletActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  withFailureNotification(nep2LoginActions),
)(LoginLocalStorage)
