// @flow
import React, { Component } from 'react'
import { groupBy, map } from 'lodash'
import classNames from 'classnames'
import Notification from '../../components/Notification'
import styles from './Notifications.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    appear
    timeout={300}
    classNames='fade'
  >
    {children}
  </CSSTransition>
)

type Props = {
  notifications: Array<NotificationType>,
  hideNotification: Function,
}

class Notifications extends Component<Props> {
  render () {
    const { notifications, hideNotification } = this.props
    const groupsNotifications = groupBy(notifications, 'position')
    return (
      <div>
        {map(groupsNotifications, (groupNotifications, position) =>
          <div key={`notification-position-${position}`} className={classNames(styles.container, styles[position.toLowerCase()])}>
            <TransitionGroup>
              {groupNotifications.map((notification: NotificationType) =>
                <Fade key={notification.id} position={position.toLowerCase()}>
                  <Notification
                    notification={notification}
                    hideNotification={() => hideNotification({ id: notification.id })}
                  />
                </Fade>
              )}
            </TransitionGroup>
          </div>
        )}
      </div>
    )
  }
}

export default Notifications
