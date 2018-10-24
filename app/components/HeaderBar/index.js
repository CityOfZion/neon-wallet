// @flow
import { compose } from 'recompose'

import withNetworkData from '../../hocs/withNetworkData'
import HeaderBar from './HeaderBar'

export default compose(withNetworkData())(HeaderBar)
