// @flow
import React, { Component } from 'react'
import { isEqual, difference } from 'lodash'
import ReactNotificationSystem from 'react-notification-system'
import style from './Notification.scss'

import WarningIcon from '../../assets/icons/warning.svg'
import CheckIcon from '../../assets/icons/check.svg'

type Props = {
  notifications: Array<NotificationType>,
  hideNotification: Function
}

const defaultWidth = 480
const marginLeft = -(defaultWidth / 2)

const overrideStyles = {
  Containers: {
    DefaultStyle: {
      width: defaultWidth
    },
    tc: {
      marginLeft
    },
    bc: {
      marginLeft
    }
  },

  NotificationItem: {
    DefaultStyle: {
      borderTop: 'none',
      height: '60px',
      marginTop: 0,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '60px',
      color: '#FFF'
    },

    success: {
      backgroundColor: '#5ABF6B'
    },
    error: {
      backgroundColor: '#EE6D66'
    }
  },

  Title: {
    DefaultStyle: {
      display: 'none'
    }
  },

  Dismiss: {
    DefaultStyle: {
      top: '22.5px',
      right: '25px',
      height: '22px',
      width: '22px',
      fontSize: '22px',
      fontWeight: 500,
      backgroundColor: 'none',
      opacity: '0.75'
    }
  }
}

class Notifications extends Component<Props> {
  rnsRef: any

  componentWillReceiveProps(nextProps: Props) {
    // Adapted from https://github.com/gor181/react-notification-system-redux/blob/master/src/notifications.js
    const { hideNotification } = this.props
    const { notifications } = nextProps

    if (notifications.length > 0) {
      const systemNotifications = this.rnsRef.state.notifications || []
      const systemNotificationsIds = systemNotifications.map(
        notification => notification.id
      )
      const notificationIds = notifications.map(notification => notification.id)

      difference(systemNotificationsIds, notificationIds).forEach(
        notificationId => this.rnsRef.removeNotification(notificationId)
      )

      difference(notificationIds, systemNotificationsIds).forEach(
        notificationId => {
          this.rnsRef.addNotification({
            children: (
              <div className={style.icon}>
                <WarningIcon />
              </div>
            ),
            uid: notificationId,
            ...notifications.find(
              notification => notification.id === notificationId
            ),
            onRemove: () => {
              hideNotification(notificationId)
            }
          })
        }
      )
    } else if (notifications.length === 0) {
      this.rnsRef.clearNotifications()
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props.notifications, nextProps.notifications)
  }

  render() {
    return (
      <ReactNotificationSystem
        ref={node => {
          this.rnsRef = node
        }}
        style={overrideStyles}
        allowHTML
      />
    )
  }
}

export default Notifications
