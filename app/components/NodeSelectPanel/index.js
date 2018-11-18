// @flow
import { compose, withProps } from 'recompose'
import {
  withData,
  withCall,
  withActions,
  alreadyLoadedStrategy,
  progressValues,
  withProgressComponents,
  withRecall
} from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'

import NodeSelectPanel from './NodeSelectPanel'
import nodeNetworkActions from '../../actions/nodeNetworkActions'
import accountActions from '../../actions/accountActions'
import nodeStorageActions from '../../actions/nodeStorageActions'
import Loading from '../../containers/App/Loading'

const { LOADING } = progressValues

const count = 15

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

const mapNodesShownToProps = () => ({
  nodesShown: count
})

const mapNodesDataToProps = nodes => ({
  nodes: nodes ? nodes.sort(sortByBlockCountThenLatency) : []
})

const mapSelectedNodeDataToProps = url => ({
  selectedNode: url
})

const mapNodesActionsToProps = actions => ({
  loadNodesData: ({ networkId }) => actions.call({ networkId })
})

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: ({ url, net }) => actions.call({ url, net })
})

export default compose(
  withProps(mapNodesShownToProps),
  withAuthData(),
  withNetworkData(),
  withCall(nodeNetworkActions),
  withActions(nodeNetworkActions, mapNodesActionsToProps),
  withActions(nodeStorageActions, mapSaveNodeActionsToProps),
  withProgressComponents(
    nodeNetworkActions,
    {
      [LOADING]: Loading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(nodeNetworkActions, mapNodesDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  withRecall(accountActions, ['selectedNode']),
  withLoadingProp(nodeNetworkActions)
)(NodeSelectPanel)
