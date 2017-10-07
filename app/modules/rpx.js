// Constants
export const UPDATE_RPX_BALANCE = 'UPDATE_RPX_BALANCE';

// Actions
export function updateRpxBalance(balance){
  return {
    type: UPDATE_RPX_BALANCE,
    RPX: balance
  }
}

// reducer for wallet account balance
export default (state = {RPX: 0}, action) => {
  switch (action.type) {
      case UPDATE_RPX_BALANCE:
          return {...state, 'RPX': action.RPX };
      default:
          return state;
  }
};
