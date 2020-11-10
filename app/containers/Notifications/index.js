// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import { hideNotification, getNotifications } from '../../modules/notifications'
import withThemeData from '../../hocs/withThemeData'

import Notifications from './Notifications'

const mapStateToProps = (state: Object) => ({
  notifications: getNotifications(state),
})

const actionCreators = {
  hideNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withThemeData(),
)(Notifications)
