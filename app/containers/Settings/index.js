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

import Settings from './NewSettings'
import accountsActions, {
  updateAccountsActions,
} from '../../actions/accountsActions'
import pricesActions from '../../actions/pricesActions'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import networkActions from '../../actions/networkActions'
import withNetworkData from '../../hocs/withNetworkData'
import nodeStorageActions from '../../actions/nodeStorageActions'
import dashboardActions from '../../actions/dashboardActions'
import { updateAccountsActions as updateN3AccountsActions } from '../../actions/n3AccountsActions'
import withSettingsContext from '../../hocs/withSettingsContext'
import { updateSettingsActions } from '../../actions/settingsActions'
import accountActions from '../../actions/accountActions'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import { getNetworks } from '../../core/networks'
import withAuthData from '../../hocs/withAuthData'

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: ({ url, net }) => actions.call({ url, net }),
})

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: (net: string, chain: string) =>
    actions.call({
      net,
      address: props.address,
      tokens: props.tokens,
      chain,
    }),
})

const mapNetworkActionsToProps = (actions: Actions): Object => ({
  handleNetworkChange: networkId => actions.call({ networkId }),
})

const mapStateToProps = () => ({
  networks: getNetworks(),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNetworkData(),
  withAuthData(),
  withActions(nodeStorageActions, mapSaveNodeActionsToProps),
  withRecall(accountActions, ['net']),
  withActions(accountActions, mapAccountActionsToProps),
  withActions(networkActions, mapNetworkActionsToProps),
)(Settings)
