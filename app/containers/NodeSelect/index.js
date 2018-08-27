// @flow
import { compose, withState } from 'recompose'
import NodeSelect from './NodeSelect'

export default compose(
  withState('sort', 'setSort', 'highToLow'),
  withState('nodesShown', 'setNodesShown', 15)
)(NodeSelect)
