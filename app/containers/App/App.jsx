// @flow
import React, { Component } from 'react'
import ModalRenderer from '../ModalRenderer'
import Notification from '../../components/Notification'
import classNames from 'classnames'
import { NOTIFICATION_POSITIONS } from '../../core/constants'
import styles from './App.scss'

type Props = {
  children: React$Node,
  notification: NotificationType,
  hideNotification: Function,
  checkVersion: Function
}

class App extends Component<Props> {
  componentDidMount () {
    const { checkVersion } = this.props
    checkVersion()
  }

  render () {
    const { children, notification, hideNotification } = this.props
    const { position, isShown, noAnimation } = notification
    const shouldPushTop = isShown && position === NOTIFICATION_POSITIONS.TOP
    return (
      <div>
        <Notification notification={notification} hideNotification={hideNotification} />
        <div className={classNames(styles.container, {
          [styles.pushTop]: shouldPushTop,
          [styles.noAnimation]: noAnimation
        })}>{children}</div>
        <ModalRenderer />
      </div>
    )
  }
}

export default App
