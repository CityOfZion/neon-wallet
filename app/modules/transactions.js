import { ASSETS_LABELS } from '../core/constants'
// Constants
export const SEND_TRANSACTION = 'SEND_TRANSACTION'
export const CLEAR_TRANSACTION = 'CLEAR_TRANSACTION'
export const TOGGLE_ASSET = 'TOGGLE_ASSET'

// Actions
export function sendEvent (success, message) {
  return {
    type: SEND_TRANSACTION,
    success: success,
    message: message
  }
}

export function clearTransactionEvent () {
  return {
    type: CLEAR_TRANSACTION
  }
}

export function toggleAsset () {
  return {
    type: TOGGLE_ASSET
  }
}

// Reducer for state used when performing a transaction
export default (state = { success: null, message: null, selectedAsset: ASSETS_LABELS.NEO }, action) => {
  switch (action.type) {
    case SEND_TRANSACTION:
      return {...state, success: action.success, message: action.message}
    case CLEAR_TRANSACTION:
      return {...state, success: null, message: null}
    case TOGGLE_ASSET:
      let asset
      if (state.selectedAsset === ASSETS_LABELS.NEO) {
        asset = ASSETS_LABELS.GAS
      } else {
        asset = ASSETS_LABELS.NEO
      }
      return {...state, success: null, selectedAsset: asset}
    default:
      return state
  }
}
