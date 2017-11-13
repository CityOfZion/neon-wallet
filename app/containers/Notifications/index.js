// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideNotifications, getNotifications } from '../../modules/notifications'
import Notifications from './notifications'

const mapStateToProps = (state: Object) => ({
  notifications: getNotifications(state)
})

const actionCreators = {
  hideNotifications
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
