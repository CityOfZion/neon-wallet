// @flow
import { compose } from 'recompose'

import withNetworkData from '../../hocs/withNetworkData'
import withSettingsContext from '../../hocs/withSettingsContext'
import HeaderBar from './HeaderBar'

export default compose(withNetworkData())(withSettingsContext(HeaderBar))
