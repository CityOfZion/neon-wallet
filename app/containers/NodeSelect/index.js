// @flow
import { compose, withState } from 'recompose'
import {
  withData,
  withCall,
  withActions,
  alreadyLoadedStrategy,
  progressValues,
  withProgressComponents
} from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

import NodeSelect from './NodeSelect'
import nodeDataActions from '../../actions/nodeDataActions'
import Loading from '../App/Loading'

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
  return 0
}

const mapNodesDataToProps = (nodes: Object) => ({
  nodes: nodes.sort(sortByBlockCountThenLatency)
})

const mapNodesActionsToProps = actions => ({
  loadNodesData: () => actions.call()
})

export default compose(
  withState('sort', 'setSort', 'highToLow'),
  withState('nodesShown', 'setNodesShown', count),
  withCall(nodeDataActions),
  withActions(nodeDataActions, mapNodesActionsToProps),
  withProgressComponents(
    nodeDataActions,
    {
      [LOADING]: Loading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(nodeDataActions, mapNodesDataToProps),
  withLoadingProp(nodeDataActions)
)(NodeSelect)
