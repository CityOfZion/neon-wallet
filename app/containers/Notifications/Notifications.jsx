// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { isEqual, difference } from 'lodash-es'
import ReactNotificationSystem from 'react-notification-system'
import style from './Notification.scss'
import overrideStyles from './overrideStyles'

import WarningIcon from '../../assets/icons/warning.svg'
import CheckIcon from '../../assets/icons/check.svg'

type Props = {
  notifications: Array<NotificationType>,
  hideNotification: Function,
  theme: string,
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
        notification => notification.id,
      )
      const notificationIds = notifications.map(notification => notification.id)

      difference(systemNotificationsIds, notificationIds).forEach(
        notificationId => this.rnsRef.removeNotification(notificationId),
      )

      difference(notificationIds, systemNotificationsIds).forEach(
        notificationId => {
          const notification = notifications.find(
            notification => notification.id === notificationId,
          )
          if (!notification) return

          this.rnsRef.addNotification({
            ...notification,
            children: (
              <div className={classNames(style.container)}>
                <div
                  className={classNames(
                    style.icon,
                    {
                      [style.warnIcon]: notification.level === 'warning',
                    },
                    { [style.errorIcon]: notification.level === 'error' },
                    {
                      [style.successIcon]: notification.level === 'success',
                    },
                  )}
                >
                  {this.renderIcon(notification.level)}
                </div>

                {typeof notification.message === 'string' ? (
                  <div className={style.message}>
                    <p>{notification.message}</p>
                  </div>
                ) : (
                  notification.message
                )}
              </div>
            ),
            uid: notificationId,
            message: undefined,
            onRemove: () => {
              hideNotification(notificationId)
            },
          })
        },
      )
    } else if (notifications.length === 0) {
      this.rnsRef.clearNotifications()
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props.notifications, nextProps.notifications)
  }

  render() {
    const { theme } = this.props
    return (
      <ReactNotificationSystem
        ref={node => {
          this.rnsRef = node
        }}
        style={overrideStyles(theme)}
        allowHTML
      />
    )
  }

  renderIcon = (level: string) => {
    switch (level) {
      case 'success':
        return <CheckIcon />
      case 'error' || 'warning':
        return <WarningIcon />
      default:
        return null
    }
  }
}

export default Notifications
