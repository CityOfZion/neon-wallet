// @flow
import { compose } from 'recompose'

import Address from './Address'
import withNetworkData from '../../../hocs/withNetworkData'
// import withExplorerData from '../../../hocs/withExplorerData'
import withSettingsContext from '../../../hocs/withSettingsContext'

export default compose(
  withNetworkData(),
  // withExplorerData(),
)(withSettingsContext(Address))
