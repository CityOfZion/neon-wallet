// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideNotification, getNotifications } from '../../modules/notification'
import Notifications from './Notifications'

const mapStateToProps = (state: Object) => ({
  notifications: getNotifications(state)
})

const actionCreators = {
  hideNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
