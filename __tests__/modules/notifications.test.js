import notificationsReducer, {
  hideNotification,
  hideNotifications,
  showSuccessNotification,
  showErrorNotification,
  showInfoNotification,
  showWarningNotification,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATIONS,
  HIDE_NOTIFICATION,
  DEFAULT_POSITION,
  AUTO_DISMISS_TIMEOUT,
  showNotification
} from '../../app/modules/notifications'
import { NOTIFICATION_LEVELS, NOTIFICATION_POSITIONS } from '../../app/core/constants'

const hideNonDismissibleAction = {
  payload: {
    dismissible: true,
    position: DEFAULT_POSITION
  },
  type: HIDE_NOTIFICATIONS
}

describe('notifications module tests', () => {
  test('showSuccessNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        hideNonDismissibleAction
      ],
      [
        {
          payload: {
            title: 'success',
            autoDismiss: AUTO_DISMISS_TIMEOUT,
            dismissible: true,
            id: 'notification_success_1',
            level: NOTIFICATION_LEVELS.SUCCESS,
            message: 'success',
            position: DEFAULT_POSITION
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showSuccessNotification({
      title: 'success',
      message: 'success',
      id: 'notification_success_1'
    })(dispatch)

    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showSuccessNotification works with stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        {
          payload: {
            title: 'success',
            autoDismiss: 3,
            dismissible: true,
            id: 'notification_success_1',
            level: NOTIFICATION_LEVELS.SUCCESS,
            message: 'first success message',
            position: DEFAULT_POSITION,
            stack: true
          },
          type: SHOW_NOTIFICATION
        }
      ],
      [
        {
          payload: {
            title: 'success',
            autoDismiss: AUTO_DISMISS_TIMEOUT,
            dismissible: false,
            id: 'notification_success_2',
            level: NOTIFICATION_LEVELS.SUCCESS,
            message: 'second success message',
            position: DEFAULT_POSITION,
            stack: true
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showSuccessNotification({
      title: 'success',
      message: 'first success message',
      id: 'notification_success_1',
      stack: true,
      autoDismiss: 3
    })(dispatch)

    showSuccessNotification({
      title: 'success',
      message: 'second success message',
      id: 'notification_success_2',
      stack: true,
      dismissible: false
    })(dispatch)

    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showErrorNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        hideNonDismissibleAction
      ],
      [
        {
          payload: {
            title: 'error',
            autoDismiss: AUTO_DISMISS_TIMEOUT,
            dismissible: false,
            id: 'notification_error_1',
            level: NOTIFICATION_LEVELS.ERROR,
            message: 'error',
            position: DEFAULT_POSITION
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showErrorNotification({
      title: 'error',
      message: 'error',
      id: 'notification_error_1',
      dismissible: false
    })(dispatch)

    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showInfoNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        hideNonDismissibleAction
      ],
      [
        {
          payload: {
            title: 'some info title message',
            autoDismiss: AUTO_DISMISS_TIMEOUT,
            dismissible: true,
            id: 'notification_info_1',
            level: NOTIFICATION_LEVELS.INFO,
            message: 'some info message',
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showInfoNotification({
      title: 'some info title message',
      message: 'some info message',
      id: 'notification_info_1',
      position: NOTIFICATION_POSITIONS.TOP_CENTER
    })(dispatch)

    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showWarningNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        hideNonDismissibleAction
      ],
      [
        {
          payload: {
            title: 'warning',
            autoDismiss: AUTO_DISMISS_TIMEOUT,
            dismissible: true,
            id: 'notification_warning_1',
            level: NOTIFICATION_LEVELS.WARNING,
            message: 'warning',
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showWarningNotification({
      title: 'warning',
      message: 'warning',
      id: 'notification_warning_1',
      position: NOTIFICATION_POSITIONS.TOP_CENTER
    })(dispatch)

    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  describe('showNotification tests', () => {
    const notificationArgs = {
      autoDismiss: AUTO_DISMISS_TIMEOUT,
      dismissible: true,
      id: 'notification_success_1',
      level: NOTIFICATION_LEVELS.SUCCESS,
      message: 'success',
      position: DEFAULT_POSITION
    }

    test('showNotification action works', () => {
      const action = {
        type: SHOW_NOTIFICATION,
        payload: notificationArgs
      }
      expect(showNotification(notificationArgs)).toEqual(action)
    })

    test('showNotification should add the correct notification', () => {
      const action = {
        type: SHOW_NOTIFICATION,
        payload: notificationArgs
      }
      const initialState = []

      const expectedState = [
        notificationArgs
      ]

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('hideNotification tests', () => {
    test('hideNotification action works', () => {
      const action = {
        type: HIDE_NOTIFICATION,
        payload: {
          id: 'notification_id_1'
        }
      }
      expect(hideNotification('notification_id_1')).toEqual(action)
    })

    test('hideNotification removes the correct notification', () => {
      const action = {
        type: HIDE_NOTIFICATION,
        payload: {
          id: 'notification_id_1'
        }
      }
      const initialState = [
        { message: 'some message', id: 'notification_id_1' },
        { message: 'some other message', id: 'notification_id_2' }
      ]

      const expectedState = [
        { message: 'some other message', id: 'notification_id_2' }
      ]

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })
  })

  describe('hideNotifications tests', () => {
    test('hideNotifications action works', () => {
      const action = {
        type: HIDE_NOTIFICATIONS,
        payload: {
          position: DEFAULT_POSITION
        }
      }
      expect(hideNotifications({ position: DEFAULT_POSITION })).toEqual(action)
    })

    test('hideNotifications removes correct notification', () => {
      const action = {
        type: HIDE_NOTIFICATIONS,
        payload: {
          position: DEFAULT_POSITION
        }
      }

      const initialState = [
        { message: 'some message', id: 'notification_id_1', position: DEFAULT_POSITION },
        { message: 'some other message', id: 'notification_id_2', position: NOTIFICATION_POSITIONS.BOTTOM_CENTER }
      ]

      const expectedState = [
        { message: 'some other message', id: 'notification_id_2', position: NOTIFICATION_POSITIONS.BOTTOM_CENTER }
      ]

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })

    test('hideNotifications removes all notification when used without args', () => {
      const action = {
        type: HIDE_NOTIFICATIONS
      }

      const initialState = [
        { message: 'some message', id: 'notification_id_1' },
        { message: 'some other message', id: 'notification_id_2' }
      ]

      const expectedState = []

      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })
  })
})
