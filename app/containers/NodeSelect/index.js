// @flow
import { compose, withState } from 'recompose'
import { withData, withCall } from 'spunky'

import NodeSelect from './NodeSelect'
import nodeDataActions from '../../actions/nodeDataActions'

const mapNodesDataToProps = (nodes: Object) => ({ nodes })

export default compose(
  withState('sort', 'setSort', 'highToLow'),
  withState('nodesShown', 'setNodesShown', 15),
  withCall(nodeDataActions),
  // TODO loading state
  withData(nodeDataActions, mapNodesDataToProps)
)(NodeSelect)
