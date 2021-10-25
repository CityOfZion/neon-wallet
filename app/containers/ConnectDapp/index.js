// @flow

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDapp from './ConnectDapp'
import withAuthData from '../../hocs/withAuthData'
import withThemeData from '../../hocs/withThemeData'
import withNetworkData from '../../hocs/withNetworkData'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRouter,
  withAuthData(),
  withNetworkData(),
  withThemeData(),
)(ConnectDapp)
