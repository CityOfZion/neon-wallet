// @flow
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InvokeFunction from './InvokeFunction'
import {
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
} from '../../../modules/notifications'
import withAuthData from '../../../hocs/withAuthData'
import withThemeData from '../../../hocs/withThemeData'
import withNetworkData from '../../../hocs/withNetworkData'

const actionCreators = {
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withThemeData(),
  withNetworkData(),
  withRouter,
)(InvokeFunction)
