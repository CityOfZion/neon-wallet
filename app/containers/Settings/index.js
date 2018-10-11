// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions, type Actions } from 'spunky'

import Settings from './Settings'
import withExplorerData from '../../hocs/withExplorerData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withThemeData from '../../hocs/withThemeData'
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
import networkActions from '../../actions/networkActions'
import withNetworkData from '../../hocs/withNetworkData'
import nodeStorageActions from '../../actions/nodeStorageActions'

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

const mapActionsToProps = (actions: Actions, props: Object): Object => ({
  handleNetworkChange: networkId => actions.call({ networkId })
})

const mapSelectedNodeDataToProps = url => ({
  selectedNode: url
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withData(accountsActions, mapAccountsDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  withNetworkData(),
  withExplorerData(),
  withCurrencyData(),
  withThemeData(),
  withActions(networkActions, mapActionsToProps),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps)
)(Settings)
