// @flow
import { compose } from 'recompose'
import { withActions, type Actions } from 'spunky'

import NetworkSwitchModal from './NetworkSwitchModal'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import networkActions from '../../../actions/networkActions'
import nodeStorageActions from '../../../actions/nodeStorageActions'

const mapActionsToProps = (actions: Actions): Object => ({
  switchNetworks: networkId => actions.call({ networkId }),
})

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: ({ url, net, label }) => actions.call({ url, net, label }),
})

export default compose(
  withNetworkData(),
  withAuthData(),
  withActions(networkActions, mapActionsToProps),
  withActions(nodeStorageActions, mapSaveNodeActionsToProps),
)(NetworkSwitchModal)
