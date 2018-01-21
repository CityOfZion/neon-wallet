// @flow
import { compose } from 'recompose'

import Address from './Address'
import withNetworkData from '../../../hocs/withNetworkData'
import withExplorerData from '../../../hocs/withExplorerData'

export default compose(
  withNetworkData(),
  withExplorerData()
)(Address)
