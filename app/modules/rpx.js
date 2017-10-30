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
      sendEvent(false, 'Not a valid script hash.')
      setTimeout(() => clearTransactionEvent(), 5000)
    }
    return false
  }
  getTokenBalance(net, scriptHash.slice(2, scriptHash.length), address).then((balance) => {
    dispatch(updateRpxBalance(balance))
  }).catch((e) => {
    dispatch(updateRpxBalance(0))
    sendEvent(false, 'There is no ability to display tokens at that script hash.')
    setTimeout(() => clearTransactionEvent(), 5000)
    return false
  })
}

export const participateInSale = (neoToSend: number, scriptHash: string) => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = state.account.wif
  const neo = state.wallet.Neo
  const net = state.metadata.network

  if (!neoToSend || !scriptHash) { return null }

  const account = getAccountFromWIFKey(wif)
  if (parseFloat(neoToSend) !== parseInt(neoToSend)) {
    sendEvent(false, 'You cannot send fractional Neo to a token sale.')
    setTimeout(() => clearTransactionEvent(), 5000)
    return false
  }
  const toMint = parseInt(neoToSend)

  if (toMint > neo) {
    sendEvent(false, 'You do not have enough Neo to send.')
    setTimeout(() => clearTransactionEvent(), 5000)
    return false
  }
  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    sendEvent(false, 'Not a valid script hash.')
    setTimeout(() => clearTransactionEvent(), 5000)
    return false
  }
  const _scriptHash = scriptHash.slice(2, scriptHash.length)
  return getTokenBalance(net, _scriptHash, account.address).then((balance) => {
    sendEvent(true, 'Processing...')
    setTimeout(() => clearTransactionEvent(), 5000)
    doMintTokens(net, _scriptHash, wif, toMint, 0).then((response) => {
      sendEvent(true, 'Processing...')
      setTimeout(() => clearTransactionEvent(), 5000)
      if (response.result === true) {
        sendEvent(true, 'Sale participation was successful.')
        setTimeout(() => clearTransactionEvent(), 5000)
        return true
      } else {
        sendEvent(false, 'Sale participation failed.')
        setTimeout(() => clearTransactionEvent(), 5000)
        return false
      }
    })
  }).catch((e) => {
    sendEvent(false, 'This script hash cannot mint tokens.')
    setTimeout(() => clearTransactionEvent(), 5000)
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
