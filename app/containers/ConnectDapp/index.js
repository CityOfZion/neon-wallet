// @flow

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import ConnectDapp from './ConnectDapp'

import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'

export default compose(
  withRouter,
  withAuthData(),
  withNetworkData(),
)(ConnectDapp)
