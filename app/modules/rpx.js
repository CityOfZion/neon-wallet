// @flow

// Constants
export const UPDATE_RPX_BALANCE = 'UPDATE_RPX_BALANCE'

// Actions
export function updateRpxBalance (balance: number) {
  return {
    type: UPDATE_RPX_BALANCE,
    RPX: balance
  }
}

const initialState = {
  RPX: 0
}

// reducer for wallet account balance
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case UPDATE_RPX_BALANCE:
      return {
        ...state,
        RPX: action.RPX
      }
    default:
      return state
  }
}
