// @flow
import { compose } from 'recompose'

import Transaction from './Transaction'
import withNetworkData from '../../../hocs/withNetworkData'
import withExplorerData from '../../../hocs/withExplorerData'

export default compose(
  withNetworkData(),
  withExplorerData()
)(Transaction)
