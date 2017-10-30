// @flow
import { getTokenBalance, getAccountFromWIFKey, doMintTokens } from 'neon-js'
import { sendEvent, clearTransactionEvent } from './transactions'

// Constants
export const UPDATE_RPX_BALANCE = 'UPDATE_RPX_BALANCE'

// Actions
export function updateRpxBalance (balance: number) {
  return {
    type: UPDATE_RPX_BALANCE,
    RPX: balance
  }
}

export const refreshTokenBalance = (scriptHash: string, silent: boolean = false) => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const address = state.account.address
  const net = state.metadata.network

  // TODO: add other check
  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    if (!silent) {
      dispatch(sendEvent(false, 'Not a valid script hash.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    }
    return false
  }
  getTokenBalance(net, scriptHash.slice(2, scriptHash.length), address).then((balance) => {
    dispatch(updateRpxBalance(balance))
  }).catch((e) => {
    dispatch(updateRpxBalance(0))
    dispatch(sendEvent(false, 'There is no ability to display tokens at that script hash.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  })
}

export const participateInSale = (neoToSend: number, scriptHash: string) => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = state.account.wif
  const neo = state.wallet.Neo
  const net = state.metadata.network

  const account = getAccountFromWIFKey(wif)
  if (parseFloat(neoToSend) !== parseInt(neoToSend)) {
    dispatch(sendEvent(false, 'You cannot send fractional Neo to a token sale.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  const toMint = parseInt(neoToSend)

  if (toMint > neo) {
    dispatch(sendEvent(false, 'You do not have enough Neo to send.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    dispatch(sendEvent(false, 'Not a valid script hash.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  const _scriptHash = scriptHash.slice(2, scriptHash.length)
  return getTokenBalance(net, _scriptHash, account.address).then((balance) => {
    dispatch(sendEvent(true, 'Processing...'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    doMintTokens(net, _scriptHash, wif, toMint, 0).then((response) => {
      dispatch(sendEvent(true, 'Processing...'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      if (response.result === true) {
        dispatch(sendEvent(true, 'Sale participation was successful.'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
        return true
      } else {
        dispatch(sendEvent(false, 'Sale participation failed.'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
        return false
      }
    })
  }).catch((e) => {
    dispatch(sendEvent(false, 'This script hash cannot mint tokens.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  })
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
