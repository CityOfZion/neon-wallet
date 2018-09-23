// @flow
import { reject, uniqueId } from 'lodash-es'

import { NOTIFICATION_LEVELS, NOTIFICATION_POSITIONS } from '../core/constants'

type NotificationArgsType = {
  message: string,
  id?: string,
  title?: string,
  position?: $Values<typeof NOTIFICATION_POSITIONS>,
  dismissible?: boolean,
  autoDismiss?: number,
  autoDismiss?: number,
  stack?: boolean
}

type NotificationFactoryArgsType = {
  ...NotificationArgsType,
  level: $Values<typeof NOTIFICATION_LEVELS>
}

type HideNotificationType = {
  ...NotificationFactoryArgsType,
  message?: string
}

// Constants
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
export const HIDE_NOTIFICATIONS = 'HIDE_NOTIFICATIONS'
export const DEFAULT_POSITION = NOTIFICATION_POSITIONS.TOP_CENTER
export const DEFAULT_SUCCESS_TITLE = 'Success'
export const DEFAULT_INFO_TITLE = 'Processing'
export const DEFAULT_ERROR_TITLE = 'Error'
export const DEFAULT_WARNING_TITLE = 'Warning'
export const AUTO_DISMISS_TIMEOUT = 5

// Actions
export const showNotification = (args: NotificationType) => ({
  type: SHOW_NOTIFICATION,
  payload: args
})

export const hideNotification = (id: string) => ({
  type: HIDE_NOTIFICATION,
  payload: {
    id
  }
})

export const hideNotifications = (args: HideNotificationType) => ({
  type: HIDE_NOTIFICATIONS,
  payload: args
})

const notificationFactory = (
  args: NotificationFactoryArgsType,
  dispatch: DispatchType
): string => {
  const {
    autoDismiss = AUTO_DISMISS_TIMEOUT,
    dismissible = true,
    stack = false,
    position = DEFAULT_POSITION,
    id = uniqueId('notification_')
  } = args

  const shouldHideNonDismissibleNotifications = !stack
  if (shouldHideNonDismissibleNotifications) {
    dispatch(hideNotifications({ position, dismissible: true }))
  }

  dispatch(
    showNotification({
      id,
      position,
      dismissible,
      autoDismiss,
      ...args
    })
  )

  return id
}

export const showSuccessNotification = (args: NotificationArgsType) => (
  dispatch: DispatchType
): string =>
  notificationFactory(
    {
      title: DEFAULT_SUCCESS_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.SUCCESS
    },
    dispatch
  )

export const showErrorNotification = (args: NotificationArgsType) => (
  dispatch: DispatchType
): string =>
  notificationFactory(
    {
      title: DEFAULT_ERROR_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.ERROR,
      autoDismiss: 0
    },
    dispatch
  )

export const showWarningNotification = (args: NotificationArgsType) => (
  dispatch: DispatchType
): string =>
  notificationFactory(
    {
      title: DEFAULT_WARNING_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.WARNING
    },
    dispatch
  )

export const showInfoNotification = (args: NotificationArgsType) => (
  dispatch: DispatchType
): string =>
  notificationFactory(
    { title: DEFAULT_INFO_TITLE, ...args, level: NOTIFICATION_LEVELS.INFO },
    dispatch
  )

// state Getters
export const getNotifications = (state: Object) => state.notifications

export default (state: Array<NotificationType> = [], action: ReduxAction) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [...state, { ...action.payload }]
    case HIDE_NOTIFICATION:
      return reject(state, { id: action.payload.id })
    case HIDE_NOTIFICATIONS:
      return reject(state, action.payload)
    default:
      return state
  }
}
