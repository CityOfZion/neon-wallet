import create from 'zustand'
import { uniqueId } from 'lodash-es'

import { NOTIFICATION_LEVELS, NOTIFICATION_POSITIONS } from '../core/constants'

// Constants
export const DEFAULT_POSITION = NOTIFICATION_POSITIONS.TOP_CENTER
export const DEFAULT_SUCCESS_TITLE = 'Success'
export const DEFAULT_INFO_TITLE = 'Processing'
export const DEFAULT_ERROR_TITLE = 'Error'
export const DEFAULT_WARNING_TITLE = 'Warning'
export const AUTO_DISMISS_TIMEOUT = 5

// State
const useNotificationsStore = create((set, get) => ({
  notifications: [],
  showNotification: args => {
    const {
      autoDismiss = AUTO_DISMISS_TIMEOUT,
      dismissible = true,
      stack = false,
      position = DEFAULT_POSITION,
      id = uniqueId('notification_'),
    } = args

    const shouldHideNonDismissibleNotifications = !stack
    if (shouldHideNonDismissibleNotifications) {
      get().hideNotifications({ position, dismissible: true })
    }

    set(state => ({
      notifications: [
        ...state.notifications,
        {
          id,
          position,
          dismissible,
          autoDismiss,
          ...args,
          source: 'zustand',
        },
      ],
    }))

    return id
  },
  hideNotification: id =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),
  hideNotifications: ({ position, dismissible }) =>
    set(state => ({
      notifications: state.notifications.filter(
        n => n.position !== position || n.dismissible !== dismissible,
      ),
    })),
  showSuccessNotification: args =>
    get().showNotification({
      title: DEFAULT_SUCCESS_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.SUCCESS,
    }),
  showErrorNotification: args =>
    get().showNotification({
      title: DEFAULT_ERROR_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.ERROR,
      autoDismiss: args.autoDismiss ? args.autoDismiss : 5,
    }),
  showWarningNotification: args =>
    get().showNotification({
      title: DEFAULT_WARNING_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.WARNING,
    }),
  showInfoNotification: args =>
    get().showNotification({
      title: DEFAULT_INFO_TITLE,
      ...args,
      level: NOTIFICATION_LEVELS.INFO,
    }),
}))

export default useNotificationsStore
