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
  showNotification
} from '../../app/modules/notifications'
import { NOTIFICATION_LEVELS, NOTIFICATION_POSITIONS } from '../../app/core/constants'

describe('notifications module tests', () => {
  test('showSuccessNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        {
          payload: {
            dismissible: true,
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: HIDE_NOTIFICATIONS
        }
      ],
      [
        {
          payload: {
            autoDismiss: 5,
            dismissible: true,
            id: 'successId',
            level: NOTIFICATION_LEVELS.SUCCESS,
            message: 'success',
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showSuccessNotification({ message: 'success', id: 'successId' })(dispatch)
    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showErrorNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        {
          payload: {
            dismissible: true,
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: HIDE_NOTIFICATIONS
        }
      ],
      [
        {
          payload: {
            autoDismiss: 5,
            dismissible: true,
            id: 'errorId',
            level: NOTIFICATION_LEVELS.ERROR,
            message: 'error',
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showErrorNotification({ message: 'error', id: 'errorId' })(dispatch)
    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showInfoNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        {
          payload: {
            dismissible: true,
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: HIDE_NOTIFICATIONS
        }
      ],
      [
        {
          payload: {
            autoDismiss: 5,
            dismissible: true,
            id: 'infoId',
            level: NOTIFICATION_LEVELS.INFO,
            message: 'info',
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showInfoNotification({ message: 'info', id: 'infoId' })(dispatch)
    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  test('showWarningNotification works without stacking', () => {
    const dispatch = jest.fn()
    const expectedActions = [
      [
        {
          payload: {
            dismissible: true,
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: HIDE_NOTIFICATIONS
        }
      ],
      [
        {
          payload: {
            autoDismiss: 5,
            dismissible: true,
            id: 'warningId',
            level: NOTIFICATION_LEVELS.WARNING,
            message: 'warning',
            position: NOTIFICATION_POSITIONS.TOP_CENTER
          },
          type: SHOW_NOTIFICATION
        }
      ]
    ]

    showWarningNotification({ message: 'warning', id: 'warningId' })(dispatch)
    expect(dispatch.mock.calls[0]).toEqual(expectedActions[0])
    expect(dispatch.mock.calls[1]).toEqual(expectedActions[1])
  })

  describe('showNotification tests', () => {
    const notificationArgs = {
      autoDismiss: 5,
      dismissible: true,
      id: 'successId',
      level: NOTIFICATION_LEVELS.SUCCESS,
      message: 'success',
      position: NOTIFICATION_POSITIONS.TOP_CENTER
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
          position: NOTIFICATION_POSITIONS.TOP_CENTER
        }
      }
      expect(hideNotifications({ position: NOTIFICATION_POSITIONS.TOP_CENTER })).toEqual(action)
    })

    test('hideNotifications removes correct notification', () => {
      const action = {
        type: HIDE_NOTIFICATIONS,
        payload: {
          position: NOTIFICATION_POSITIONS.TOP_CENTER
        }
      }

      const initialState = [
        { message: 'some message', id: 'notification_id_1', position: NOTIFICATION_POSITIONS.TOP_CENTER },
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
