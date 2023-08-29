// @flow
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import LoginLocalStorage from './LoginLocalStorage'
import newMigrationWalletActions from '../../actions/newMigrationWalletActions'
import withSettingsContext from '../../hocs/withSettingsContext'
import withAccountsData from '../../hocs/withAccountsData'
import withAuthData from '../../hocs/withAuthData'

type NewWalletProps = {
  newWalletCreated: Function,
}

const mapNewWalletDataToProps = (name: string) => ({
  newMigratedWalletName: name,
})

const mapNewWalletActionsToProps = (actions): NewWalletProps => ({
  newWalletCreated: name => actions.call({ name }),
})

export default compose(
  withData(newMigrationWalletActions, mapNewWalletDataToProps),
  withActions(newMigrationWalletActions, mapNewWalletActionsToProps),
  withAuthData,
  withAccountsData,
  withSettingsContext,
)(LoginLocalStorage)
