import * as types from '../actions/types';

// reducer for UI state
export default (state = {sendPane: true, confirmPane: true}, action) => {
  switch (action.type) {
      case types.TOGGLE_SEND_PANE:
          let newState = {};
          newState[action.pane] = !state[action.pane];
          return {...state, ...newState };
      default:
          return state;
  }
};