// @flow
import { isNil, reject, uniqueId } from 'lodash'
import { NOTIFICATION_LEVELS, NOTIFICATION_POSITIONS } from '../core/constants'
import { Dispatch } from 'redux';

type NotificationArgsType = {
  message: string,
  title?: string,
  position?: $Values<typeof NOTIFICATION_POSITIONS>,
  dismissible?: boolean,
  autoDismiss?: number,
  soloInGroup?: boolean
}

type ShowNotificationType = NotificationArgsType & {
  level: $Values<typeof NOTIFICATION_LEVELS>,
  id: string
}

const DEFAULT_POSITION = NOTIFICATION_POSITIONS.TOP_CENTER

const notificationFactory = (args: NotificationArgsType, level: $Values<typeof NOTIFICATION_LEVELS>, dispatch: DispatchType) => {
  const position = args.position || DEFAULT_POSITION
  if (args.soloInGroup) {
    dispatch(hideNotifications({ position }))
  }
  return dispatch(showNotification({
    ...getDefaultNotificationArgs(args),
    ...args,
    position,
    level
  }))
}

// Constants
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATIONS = 'HIDE_NOTIFICATIONS'

// Actions
export const showNotification = (args: ShowNotificationType) => (dispatch: DispatchType) => {
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: args
  })
  return args.id
}

export const hideNotifications = (args: ShowNotificationType) => ({
  type: HIDE_NOTIFICATIONS,
  payload: args
})

const FIVE_SECONDS = 5

const getDefaultNotificationArgs = ({ autoDismiss, dismissible }: NotificationArgsType) => ({
  id: uniqueId('notification_'),
  autoDismiss: isNil(autoDismiss) ? FIVE_SECONDS : autoDismiss,
  dismissible: isNil(dismissible) ? true : dismissible
})

export const showSuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType) =>
  notificationFactory(args, NOTIFICATION_LEVELS.SUCCESS, dispatch)

export const showErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType) =>
  notificationFactory(args, NOTIFICATION_LEVELS.ERROR, dispatch)

export const showWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType) =>
  notificationFactory(args, NOTIFICATION_LEVELS.WARNING, dispatch)

export const showInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType) =>
  notificationFactory(args, NOTIFICATION_LEVELS.INFO, dispatch)

// state Getters
export const getNotifications = (state: Object) => state.notifications

export default (state: Array<NotificationArgsType> = [], action: Object) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [
        ...state,
        { ...action.payload }
      ]
    case HIDE_NOTIFICATIONS:
      return reject(state, action.payload)
    default:
      return state
  }
}
