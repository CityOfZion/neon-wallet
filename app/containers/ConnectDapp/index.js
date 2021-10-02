// @flow

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import ConnectDapp from './ConnectDapp'

import withAuthData from '../../hocs/withAuthData'

export default compose(
  withRouter,
  withAuthData(),
)(ConnectDapp)
