// @flow
import { compose } from 'recompose'

import Address from './Address'
import withNetworkData from '../../../hocs/withNetworkData'
import withExplorerData from '../../../hocs/withExplorerData'
import withChainData from '../../../hocs/withChainData'

export default compose(
  withNetworkData(),
  withExplorerData(),
  withChainData(),
)(Address)
