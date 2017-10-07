// Constants
export const TOGGLE_SEND_PANE = 'TOGGLE_SEND_PANE';

// Actions
export function togglePane(pane) {
  return {
    type: TOGGLE_SEND_PANE,
    pane,
  };
}

// reducer for UI state
export default (state = { sendPane: true, confirmPane: true }, action) => {
  switch (action.type) {
    case TOGGLE_SEND_PANE:
      const newState = {};
      newState[action.pane] = !state[action.pane];
      return { ...state, ...newState };
    default:
      return state;
  }
};
