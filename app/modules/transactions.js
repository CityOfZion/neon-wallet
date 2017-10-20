// @flow
import { ASSETS_LABELS, ASSETS } from '../core/constants'
import { getTransactionHistory } from 'neon-js'
import { setTransactionHistory } from '../modules/wallet'

// Constants
export const SEND_TRANSACTION = 'SEND_TRANSACTION'
export const CLEAR_TRANSACTION = 'CLEAR_TRANSACTION'
export const TOGGLE_ASSET = 'TOGGLE_ASSET'

// Actions
export function sendEvent (success: boolean, message: string) {
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

export const syncTransactionHistory = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  getTransactionHistory(net, address).then((transactions) => {
    let txs = []
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].neo_sent === true) {
        txs = txs.concat([{ type: ASSETS.NEO, amount: transactions[i].NEO, txid: transactions[i].txid, block_index: transactions[i].block_index }])
      }
      if (transactions[i].gas_sent === true) {
        txs = txs.concat([{ type: ASSETS.GAS, amount: transactions[i].GAS, txid: transactions[i].txid, block_index: transactions[i].block_index }])
      }
    }
    dispatch(setTransactionHistory(txs))
  })
}

// Reducer for state used when performing a transaction
export default (state: Object = { success: null, message: null, selectedAsset: ASSETS_LABELS.NEO }, action: Object) => {
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
