// @flow

// Constants
export const TOGGLE_SEND_PANE = 'TOGGLE_SEND_PANE'

// Actions
export function togglePane (pane: string) {
  return {
    type: TOGGLE_SEND_PANE,
    pane
  }
}

const initialState = {
  sendPane: true,
  confirmPane: true
}

// reducer for UI state
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case TOGGLE_SEND_PANE:
      let newState = {}
      newState[action.pane] = !state[action.pane]
      return { ...state, ...newState }
    default:
      return state
  }
}
