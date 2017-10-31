// @flow
import React from 'react'
import { noop } from 'lodash'
import classNames from 'classnames'
import Close from 'react-icons/lib/md/close'
type Props = {
  notification: NotificationType,
  clearNotification: Function
}

const Notification = ({ notification, clearNotification }: Props) => {
  const { isShown, message, type, width, title, html, onClick = noop } = notification
  return (
    <div className={classNames('notification', type.toLowerCase(), { 'shown': isShown })} style={{ width }} onClick={onClick}>
      <div className='notification-content'>
        {title && <div className='notification-title'>{title}</div>}
        {html ? <div className='notification-message' dangerouslySetInnerHTML={{ __html: message }} /> : <div className='notification-message'>{message}</div>}
        <div className='notification-close' onClick={(e) => {
          e.stopPropagation()
          clearNotification()
        }}><Close /></div>
      </div>
    </div>
  )
}

export default Notification
