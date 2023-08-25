// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withActions, type Actions, withRecall } from 'spunky'

import Settings from './NewSettings'

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import networkActions from '../../actions/networkActions'
import withNetworkData from '../../hocs/withNetworkData'
import nodeStorageActions from '../../actions/nodeStorageActions'
import accountActions from '../../actions/accountActions'
import { getNetworks } from '../../core/networks'
import withAuthData from '../../hocs/withAuthData'
import withAccountsData from '../../hocs/withAccountsData'

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts),
})

const mapN3AccountsActionsToProps = actions => ({
  setN3Accounts: accounts => actions.call(accounts),
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

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: ({ url, net, label }) => actions.call({ url, net, label }),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNetworkData(),
  withAuthData(),

  withRecall(accountActions, ['net']),
  withActions(accountActions, mapAccountActionsToProps),
  withActions(networkActions, mapNetworkActionsToProps),
  withActions(nodeStorageActions, mapSaveNodeActionsToProps),
)(withAccountsData(Settings))
