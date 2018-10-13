// @flow
import { compose, withProps } from 'recompose'
import {
  withData,
  withCall,
  withActions,
  alreadyLoadedStrategy,
  progressValues,
  withProgressComponents,
  withReset
} from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

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
  loadNodesData: () => actions.call(count)
})

const mapSaveNodeActionsToProps = actions => ({
  saveSelectedNode: url => actions.call(url)
})

export default compose(
  withProps(mapNodesShownToProps),
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
  withReset(accountActions, ['selectedNode']),
  withLoadingProp(nodeNetworkActions)
)(NodeSelectPanel)
