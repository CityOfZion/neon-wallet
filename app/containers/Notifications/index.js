// @flow
import { connect } from 'react-redux'
import React from 'react'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import { hideNotification, getNotifications } from '../../modules/notifications'

import Notifications from './Notifications'
import withSettingsContext from '../../hocs/withSettingsContext'
import useNotificationsStore from '../../actions-migrated/notifications'

function withZustandNotifications(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { notifications, hideNotification } = useNotificationsStore()

    function conditionalHideNotification(id) {
      const notification = notifications.find(n => n.id === id)
      if (notification?.source === 'zustand') {
        return hideNotification(id)
      }
      return props.hideNotification(id)
    }

    return (
      <WrappedComponent
        notifications={[...notifications, ...props.notifications]}
        hideNotification={conditionalHideNotification}
      />
    )
  }
}

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
)(withZustandNotifications(withSettingsContext(Notifications)))
