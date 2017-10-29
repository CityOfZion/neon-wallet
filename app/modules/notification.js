// @flow
import { omit } from 'lodash'
import { NOTIFICATION_TYPES, NOTIFICATION_POSITIONS, DEFAULT_NOTIFICATION_TIMEOUT } from '../core/constants'

let notificationTimeoutId

type NotificationArgsType = {
  message: string,
  title?: string,
  position?: $Values<typeof NOTIFICATION_POSITIONS>,
  width?: string,
  dismissble?: boolean,
  dismissAfter?: number,
  html?: boolean,
  onClick?: ?Function
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
    dismissble,
    dismissAfter,
    isShown
  } = args

  clearTimeout(notificationTimeoutId)
  if (isShown) {
    dispatch(clearNotification())
  }
  dispatch(showNotification(omit(args, ['dispatch', 'isShown'])))
  if (dismissble) {
    notificationTimeoutId = setTimeout(() => dispatch(clearNotification()), dismissAfter)
  }
}

// Constants
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

// Actions
export function showNotification ({
  message,
  title,
  type,
  position = NOTIFICATION_POSITIONS.TOP,
  width,
  dismissble,
  dismissAfter,
  html,
  onClick
}: ShowNotificationType) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      message,
      title,
      type,
      position,
      width,
      dismissble,
      dismissAfter,
      html,
      onClick
    }
  }
}

const getDefaultNotificationArgs = (args: NotificationArgsType, dispatch: DispatchType, getState: GetStateType) => {
  const state = getState().notification
  return {
    isShown: state.isShown,
    dismissAfter: args.dismissAfter || state.dismissAfter,
    dismissble: args.dismissble || state.dismissble,
    dispatch
  }
}

export function clearNotification () {
  return {
    type: CLEAR_NOTIFICATION
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
  dispatch(showSuccessNotification({ ...args, dismissble: false }))
}

export const showErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.ERROR
  })
}

export const showStickyErrorNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showErrorNotification({ ...args, dismissble: false }))
}

export const showWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.WARNING
  })
}

export const showStickyWarningNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showErrorNotification({ ...args, dismissble: false }))
}

export const showInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  notificationFactory({
    ...args,
    ...getDefaultNotificationArgs(args, dispatch, getState),
    type: NOTIFICATION_TYPES.INFO
  })
}

export const showStickyInfoNotification = (args: NotificationArgsType) => (dispatch: DispatchType, getState: GetStateType) => {
  dispatch(showInfoNotification({ ...args, dismissble: false }))
}

const initialState = {
  title: '',
  message: '',
  type: '',
  isShown: false,
  dismissble: true,
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
    case CLEAR_NOTIFICATION:
      return {
        ...initialState
      }
    default:
      return state
  }
}
