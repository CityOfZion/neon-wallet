// @flow
import { compose } from 'recompose'
import withChainData from '../../hocs/withChainData'

import withNetworkData from '../../hocs/withNetworkData'
import HeaderBar from './HeaderBar'

export default compose(
  withNetworkData(),
  withChainData(),
)(HeaderBar)
