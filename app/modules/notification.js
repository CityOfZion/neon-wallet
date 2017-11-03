// @flow
import { omit } from 'lodash'
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
  onClick?: ?Function
}

type HideNotificationType = {
  animate?: boolean
}

type ShowNotificationType = NotificationArgsType & {
  type: $Values<typeof NOTIFICATION_TYPES>,
}

type NotificationFactoryArgsType = ShowNotificationType & {
  dispatch: DispatchType,
  isShown: boolean,
}

const notificationFactory = (args: NotificationFactoryArgsType) => {
  const {
    dispatch,
    dismissible,
    dismissAfter,
    isShown
  } = args

  clearTimeout(notificationTimeoutId)
  if (isShown) {
    dispatch(hideNotification())
  }
  dispatch(showNotification(omit(args, ['dispatch', 'isShown'])))
  if (dismissible) {
    notificationTimeoutId = setTimeout(() => dispatch(hideNotification()), dismissAfter)
  }
}

// Constants
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

// Actions
export function showNotification (args: ShowNotificationType) {
  return {
    type: SHOW_NOTIFICATION,
    payload: args
  }
}

export function hideNotification ({ animate = true }: HideNotificationType) {
  return {
    type: HIDE_NOTIFICATION,
    payload: {
      animate
    }
  }
}

const getDefaultNotificationArgs = (args: NotificationArgsType, dispatch: DispatchType, getState: GetStateType) => {
  const state = getState().notification
  return {
    isShown: state.isShown,
    dismissAfter: args.dismissAfter || state.dismissAfter,
    dismissible: args.dismissible || state.dismissible,
    dispatch
  }
}

export const showSuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.SUCCESS
  })
}

export const showStickySuccessNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showSuccessNotification({ ...args, dismissible: false }))
}

export const showErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.ERROR
  })
}

export const showStickyErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showErrorNotification({ ...args, dismissible: false }))
}

export const showWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.WARNING
  })
}

export const showStickyWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showErrorNotification({ ...args, dismissible: false }))
}

export const showInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.INFO
  })
}

export const showStickyInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showInfoNotification({ ...args, dismissible: false }))
}

const initialState = {
  title: '',
  message: '',
  type: '',
  isShown: false,
  dismissible: true,
  dismissAfter: DEFAULT_NOTIFICATION_TIMEOUT,
  position: NOTIFICATION_POSITIONS.TOP,
  width: '100%',
  html: false,
  onClick: null
}

// reducer for wallet account balance
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
        isShown: true
      }
    case HIDE_NOTIFICATION:
      if (action.payload.animate) {
        return {
          ...initialState,
          message: state.message,
          title: state.title,
          position: state.position,
          width: state.width,
          isShown: false
        }
      }
      return {
        ...initialState
      }
    default:
      return state
  }
}
