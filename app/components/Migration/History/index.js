// @flow

import { compose } from 'recompose'
import withNetworkData from '../../../hocs/withNetworkData'

import History from './History'

export default compose(withNetworkData())(History)
