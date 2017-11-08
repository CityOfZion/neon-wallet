import dashboardReducer, { togglePane, TOGGLE_SEND_PANE } from '../../app/modules/dashboard'

describe('dashboard module tests', () => {
  const pane = 'confirmPane'

  describe('togglepane tests', () => {
    test('togglePane action works', () => {
      const expectedAction = {
        type: TOGGLE_SEND_PANE,
        payload: { pane }
      }
      expect(togglePane(pane)).toEqual(expectedAction)
    })

    test('togglePane reducer should return the initial state', () => {
      expect(dashboardReducer(undefined, {})).toEqual({
        sendPane: true,
        confirmPane: true
      })
    })

    test('togglePane reducer should handle TOGGLE_SEND_PANE', () => {
      expect(dashboardReducer(undefined, {
        type: TOGGLE_SEND_PANE,
        payload: { pane }
      })).toEqual({
        sendPane: true,
        confirmPane: false
      })
    })
  })
})
