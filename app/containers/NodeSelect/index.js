// @flow
import { compose, withState } from 'recompose'
import {
  withData,
  withCall,
  alreadyLoadedStrategy,
  progressValues,
  withProgressComponents
} from 'spunky'

import NodeSelect from './NodeSelect'
import nodeDataActions from '../../actions/nodeDataActions'
import Loading from '../App/Loading'

const { LOADING } = progressValues

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

export default compose(
  withState('sort', 'setSort', 'highToLow'),
  withState('nodesShown', 'setNodesShown', 15),
  withCall(nodeDataActions),
  withProgressComponents(
    nodeDataActions,
    {
      [LOADING]: Loading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(nodeDataActions, mapNodesDataToProps)
)(NodeSelect)
