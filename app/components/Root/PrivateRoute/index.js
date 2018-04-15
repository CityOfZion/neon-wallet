// @flow
import { compose, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { omit } from 'lodash'

import PrivateRoute from './PrivateRoute'
import authActions from '../../../actions/authActions'
import withProgress from '../../../hocs/api/withProgressProp'
import { LOADED } from '../../../values/state'

export default compose(
  withRouter,
  withProgress(authActions, { propName: 'progress' }),
  mapProps((props) => ({ ...omit(props, 'progress'), authenticated: props.progress === LOADED }))
)(PrivateRoute)
