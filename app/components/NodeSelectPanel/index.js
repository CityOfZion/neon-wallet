// @flow
import { compose } from 'recompose'
import { withData, withCall, withActions, withRecall } from 'spunky'
import { injectIntl } from 'react-intl'

import withLoadingProp from '../../hocs/withLoadingProp'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import NodeSelectPanel from './NodeSelectPanel'
import nodeNetworkActions from '../../actions/nodeNetworkActions'
// import accountActions from '../../actions/accountActions'
import nodeStorageActions from '../../actions/nodeStorageActions'
import withSettingsContext from '../../hocs/withSettingsContext'

const sortByBlockCountThenLatency = (a, b) => {
  if (a.blockCount < b.blockCount) {
    return 1
  }
  if (a.blockCount > b.blockCount) {
    return -1
  }

  if (a.latency < b.latency) {
    return -1
  }
  if (a.latency > b.latency) {
    return 1
  }

  if (a.url < b.url) {
    return -1
  }
  if (a.url > b.url) {
    return 1
  }
  return 0
}

const mapNodesDataToProps = nodes => ({
  nodes: nodes ? nodes.sort(sortByBlockCountThenLatency) : [],
})

const mapSelectedNodeDataToProps = url => ({
  selectedNode: url,
})

const mapNodesActionsToProps = actions => ({
  loadNodesData: ({ networkId }) => actions.call({ networkId }),
})

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: ({ url, net }) => actions.call({ url, net }),
})

export default compose(
  withAuthData,
  withNetworkData(),
  withCall(nodeNetworkActions),
  withActions(nodeNetworkActions, mapNodesActionsToProps),
  withActions(nodeStorageActions, mapSaveNodeActionsToProps),
  withData(nodeNetworkActions, mapNodesDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  // withRecall(accountActions, ['selectedNode']),
  withLoadingProp(nodeNetworkActions),
  injectIntl,
)(withSettingsContext(NodeSelectPanel))
