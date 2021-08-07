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
  withReset,
} from 'spunky'
import { injectIntl } from 'react-intl'

import NetworkConfiguration from './NetworkConfiguration'
import withExplorerData from '../../hocs/withExplorerData'
import withLoadingProp from '../../hocs/withLoadingProp'
import accountsActions, {
  updateAccountsActions,
} from '../../actions/accountsActions'
import pricesActions from '../../actions/pricesActions'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import networkActions from '../../actions/networkActions'
import withNetworkData from '../../hocs/withNetworkData'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withAuthData from '../../hocs/withAuthData'
import nodeStorageActions from '../../actions/nodeStorageActions'
import dashboardActions from '../../actions/dashboardActions'
import accountActions from '../../actions/accountActions'
import withChainData from '../../hocs/withChainData'

const mapStateToProps = () => ({
  networks: getNetworks(),
})

const actionCreators = {
  showModal,
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

const mapSettingsActionsToProps = actions => ({
  setBlockExplorer: blockExplorer =>
    actions.call({
      blockExplorer,
    }),
})

const mapActionsToProps = (actions: Actions): Object => ({
  handleNetworkChange: networkId => actions.call({ networkId }),
})

const mapSelectedNodeDataToProps = url => ({
  selectedNode: url,
})

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens,
    }),
})

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: ({ url, net }) => actions.call({ url, net }),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthData(),
  withNetworkData(),
  withChainData(),
  withCall(nodeStorageActions),
  withData(accountsActions, mapAccountsDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  withExplorerData(),
  withActions(networkActions, mapActionsToProps),
  withRecall(nodeStorageActions, ['networkId']),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  withReset(dashboardActions, ['currency']),
  withReset(pricesActions, ['currency']),
  withRecall(dashboardActions, ['currency']),
  withActions(nodeStorageActions, mapSaveNodeActionsToProps),
  withActions(accountActions, mapAccountActionsToProps),
  withSuccessNotification(
    dashboardActions,
    'notifications.success.receivedBlockchainInfo',
    {},
    true,
  ),
  withLoadingProp(dashboardActions),

  injectIntl,
)(NetworkConfiguration)
