// @flow
import { LOGOUT } from './account'

// Constants
export const TOGGLE_SEND_PANE = 'TOGGLE_SEND_PANE'

// Actions
export function togglePane (pane: string) {
  return {
    type: TOGGLE_SEND_PANE,
    payload: { pane }
  }
}

// state getters
export const getSendPane = (state) => state.dashboard.sendPane
export const getConfirmPane = (state) => state.dashboard.confirmPane

const initialState = {
  sendPane: true,
  confirmPane: true
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case TOGGLE_SEND_PANE:
      const { pane } = action.payload
      let newState = {}
      newState[pane] = !state[pane]
      return {
        ...state,
        ...newState
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
