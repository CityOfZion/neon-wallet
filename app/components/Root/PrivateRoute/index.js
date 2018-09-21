// @flow
import { compose, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withProgress, progressValues } from 'spunky'
import { omit } from 'lodash-es'

import PrivateRoute from './PrivateRoute'
import authActions from '../../../actions/authActions'

const { LOADED } = progressValues

export default compose(
  withRouter,
  withProgress(authActions, { propName: 'progress' }),
  mapProps(props => ({
    ...omit(props, 'progress'),
    authenticated: props.progress === LOADED
  }))
)(PrivateRoute)
