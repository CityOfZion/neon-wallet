// @flow

import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import App from './App'
import withAuthData from '../../hocs/withAuthData'

export default compose(
  withAuthData,
  withRouter,
)(App)
