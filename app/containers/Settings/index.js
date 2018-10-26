// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import {
  withData,
  withActions,
  type Actions,
  withCall,
  withRecall,
  withReset
} from 'spunky'

import Settings from './Settings'
import withExplorerData from '../../hocs/withExplorerData'
import withCurrencyData from '../../hocs/withCurrencyData'
import withThemeData from '../../hocs/withThemeData'
import withSoundEnabledData from '../../hocs/withSoundEnabledData'
import accountsActions, {
  updateAccountsActions
} from '../../actions/accountsActions'
import pricesActions from '../../actions/pricesActions'
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
import dashboardActions from '../../actions/dashboardActions'

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
    }),
  setSoundSetting: soundEnabled => actions.call({ soundEnabled })
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
  withNetworkData(),
  withCall(nodeStorageActions),
  withData(accountsActions, mapAccountsDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  withExplorerData(),
  withCurrencyData(),
  withThemeData(),
  withSoundEnabledData(),
  withActions(networkActions, mapActionsToProps),
  withRecall(nodeStorageActions, ['networkId']),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  withReset(dashboardActions, ['currency']),
  withReset(pricesActions, ['currency']),
  withRecall(dashboardActions, ['currency'])
)(Settings)
