// @flow
import React from 'react'
import { noop } from 'lodash'
import classNames from 'classnames'
import Close from 'react-icons/lib/md/close'
import styles from './Notification.scss'

type Props = {
  notification: NotificationType,
  hideNotification: Function
}

const Notification = ({ notification, hideNotification }: Props) => {
  const { isShown, message, type, width, position, title, html, onClick = noop } = notification
  return (
    <div className={classNames(styles.notification, styles[type.toLowerCase()], styles[position.toLowerCase()], { [styles.shown]: isShown })} style={{ width }} onClick={onClick}>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {html ? <div className={styles.message} dangerouslySetInnerHTML={{ __html: message }} /> : <div className={styles.message}>{message}</div>}
        <div className={styles.close} onClick={(e) => {
          e.stopPropagation()
          hideNotification()
        }}><Close /></div>
      </div>
    </div>
  )
}

export default Notification
