// @flow
import React, { Component } from 'react'
import Notification from '../../components/Notification'
import classNames from 'classnames'
import { NOTIFICATION_POSITIONS } from '../../core/constants'
import './App.scss'

type Props = {
  children: React$Node,
  notification: NotificationType,
  clearNotification: Function,
  checkVersion: Function
}

class App extends Component<Props> {
  componentDidMount () {
    const { checkVersion } = this.props
    checkVersion()
  }

  render () {
    const { children, notification, clearNotification } = this.props
    return (
      <div>
        <Notification notification={notification} clearNotification={clearNotification} />
        <div className={classNames(
          'app-content', {
            'app-content-push': notification.isShown && notification.position === NOTIFICATION_POSITIONS.TOP
          })}>{children}</div>
      </div>
    )
  }
}

export default App
