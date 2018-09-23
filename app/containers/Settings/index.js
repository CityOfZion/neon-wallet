// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import Settings from './Settings'
import withExplorerData from '../../hocs/withExplorerData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withThemeData from '../../hocs/withThemeData'
import withPricesData from '../../hocs/withPricesData'
import accountsActions, {
  updateAccountsActions
} from '../../actions/accountsActions'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import {
  showErrorNotification,
  showSuccessNotification
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'

const mapStateToProps = () => ({
  networks: getNetworks()
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapAccountsDataToProps = accounts => ({
  accounts
})

const mapAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts)
})

const mapSettingsActionsToProps = actions => ({
  setCurrency: currency =>
    actions.call({
      currency
    }),
  setBlockExplorer: blockExplorer =>
    actions.call({
      blockExplorer
    }),
  setTheme: theme =>
    actions.call({
      theme
    })
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withData(accountsActions, mapAccountsDataToProps),
  withPricesData(),
  withExplorerData(),
  withCurrencyData(),
  withThemeData(),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps)
)(Settings)
