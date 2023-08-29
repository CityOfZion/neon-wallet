// @flow
import { compose } from 'recompose'

import Address from './Address'
import withNetworkData from '../../../hocs/withNetworkData'
import withSettingsContext from '../../../hocs/withSettingsContext'

export default compose(
  withNetworkData(),
  withSettingsContext,
)(Address)
