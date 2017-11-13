// @flow
import { omit, isNil, reject, uniqueId } from 'lodash'
import { NOTIFICATION_LEVELS, NOTIFICATION_POSITIONS } from '../core/constants'

type NotificationArgsType = {
  message: string,
  title?: string,
  position?: $Values<typeof NOTIFICATION_POSITIONS>,
  dismissible?: boolean,
  autoDismiss?: number,
  html?: boolean,
}

type ShowNotificationType = NotificationArgsType & {
  level: $Values<typeof NOTIFICATION_LEVELS>,
  id: string,
}

type NotificationFactoryArgsType = ShowNotificationType & {
  dispatch: DispatchType,
}

const notificationFactory = (args: NotificationFactoryArgsType) => {
  const {
    dispatch
  } = args

  const id = uniqueId('notification_')
  const notificationId = dispatch(showNotification({id, ...omit(args, 'dispatch')}))
  return notificationId
}

// Constants
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

// Actions
export const showNotification = (args: ShowNotificationType) => (dispatch: DispatchType) => {
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: args
  })
  return args.id
}

export const hideNotification = (args: ShowNotificationType) => ({
  type: HIDE_NOTIFICATION,
  payload: args
})

const FIVE_SECONDS = 5

const getDefaultNotificationArgs = ({ autoDismiss, dismissible, fullScreen }: NotificationArgsType, dispatch: DispatchType, getState: GetStateType) => ({
  position: NOTIFICATION_POSITIONS.TOP_CENTER,
  autoDismiss: isNil(autoDismiss) ? FIVE_SECONDS : autoDismiss,
  dismissible: isNil(dismissible) ? true : dismissible,
  dispatch
})

export const showSuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    level: NOTIFICATION_LEVELS.SUCCESS
  })
}

export const showStickySuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showSuccessNotification({ ...args, autoDismiss: 0 }))
}

export const showErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    level: NOTIFICATION_LEVELS.ERROR
  })
}

export const showStickyErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return dispatch(showErrorNotification({ ...args, autoDismiss: 0 }))
}

export const showWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    level: NOTIFICATION_LEVELS.WARNING
  })
}

export const showStickyWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return dispatch(showErrorNotification({ ...args, autoDismiss: 0 }))
}

export const showInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    level: NOTIFICATION_LEVELS.INFO
  })
}

export const showStickyInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return dispatch(showInfoNotification({ ...args, autoDismiss: 0 }))
}

// state Getters
export const getNotifications = (state: Object) => state.notification

export default (state: Array<NotificationArgsType> = [], action: Object) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [
        ...state,
        { ...action.payload }
      ]
    case HIDE_NOTIFICATION:
      return reject(state, action.payload)
    default:
      return state
  }
}
