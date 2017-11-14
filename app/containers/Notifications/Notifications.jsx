// @flow
import React, { Component } from 'react'
import { isEqual, difference } from 'lodash'
import ReactNotificationSystem from 'react-notification-system'

type Props = {
  notifications: Array<NotificationType>,
  hideNotifications: Function,
}

const overrideStyles = {
  Containers: {
    DefaultStyle: {
      width: 480
    },
    tc: {
      marginLeft: -240
    },
    bc: {
      marginLeft: -240
    }
  }
}

class Notifications extends Component<Props> {
  componentWillReceiveProps (nextProps: Props) {
    // Adapted from https://github.com/gor181/react-notification-system-redux/blob/master/src/notifications.js
    const { hideNotifications } = this.props
    const { notifications } = nextProps
    const notificationIds = notifications.map(notification => notification.id)

    if (notifications.length > 0) {
      const systemNotifications = this.rnsRef.state.notifications || []
      const systemNotificationsIds = systemNotifications.map(notification => notification.id)

      difference(systemNotificationsIds, notificationIds).forEach(notificationId =>
        this.rnsRef.removeNotification(notificationId))

      difference(notificationIds, systemNotificationsIds).forEach(notificationId => {
        this.rnsRef.addNotification({
          uid: notificationId,
          ...notifications.find(notification => notification.id === notificationId),
          onRemove: () => {
            hideNotifications({ id: notificationId })
          }
        })
      })
    } else if (notifications.length === 0) {
      this.rnsRef.clearNotifications()
    }
  }

  shouldComponentUpdate (nextProps: Props) {
    return !isEqual(this.props.notifications, nextProps.notifications)
  }

  render () {
    return (
      <ReactNotificationSystem ref={(node) => { this.rnsRef = node }} style={overrideStyles} allowHTML />
    )
  }
}

export default Notifications
