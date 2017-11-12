// @flow
import { omit, isNil, reject, uniqueId } from 'lodash'
import { NOTIFICATION_TYPES, NOTIFICATION_POSITIONS, DEFAULT_NOTIFICATION_TIMEOUT } from '../core/constants'

let notificationTimeoutId

type NotificationArgsType = {
  message: string,
  title?: string,
  position?: $Values<typeof NOTIFICATION_POSITIONS>,
  width?: string,
  dismissible?: boolean,
  dismissAfter?: number,
  html?: boolean,
  noAnimation?: boolean,
  onClick?: ?Function,
  fullScreen?: boolean
}

type ShowNotificationType = NotificationArgsType & {
  type: $Values<typeof NOTIFICATION_TYPES>,
  id: string,
}

type NotificationFactoryArgsType = ShowNotificationType & {
  dispatch: DispatchType,
}

const notificationFactory = (args: NotificationFactoryArgsType) => {
  const {
    dispatch,
    dismissible,
    dismissAfter
  } = args

  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId)
  }
  const id = uniqueId('notification_')
  const notificationId = dispatch(showNotification({id, ...omit(args, 'dispatch')}))
  if (dismissible) {
    notificationTimeoutId = setTimeout(() => dispatch(hideNotification({ id })), dismissAfter)
  }
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

const getDefaultNotificationArgs = ({ dismissAfter, dismissible, fullScreen }: NotificationArgsType, dispatch: DispatchType, getState: GetStateType) => ({
  width: fullScreen ? '100%' : '400px',
  position: NOTIFICATION_POSITIONS.TOP_RIGHT,
  dismissAfter: isNil(dismissAfter) ? DEFAULT_NOTIFICATION_TIMEOUT : dismissAfter,
  dismissible: isNil(dismissible) ? true : dismissible,
  dispatch
})

export const showSuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    type: NOTIFICATION_TYPES.SUCCESS
  })
}

export const showStickySuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showSuccessNotification({ ...args, dismissible: false }))
}

export const showErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    type: NOTIFICATION_TYPES.ERROR
  })
}

export const showStickyErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return dispatch(showErrorNotification({ ...args, dismissible: false }))
}

export const showWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    type: NOTIFICATION_TYPES.WARNING
  })
}

export const showStickyWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return dispatch(showErrorNotification({ ...args, dismissible: false }))
}

export const showInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return notificationFactory({
    ...getDefaultNotificationArgs(args, dispatch, getState),
    ...args,
    type: NOTIFICATION_TYPES.INFO
  })
}

export const showStickyInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  return dispatch(showInfoNotification({ ...args, dismissible: false }))
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
