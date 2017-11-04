// @flow
import { getTokenBalance, getAccountFromWIFKey, doMintTokens } from 'neon-js'
import { showErrorNotification, showInfoNotification, showSuccessNotification } from './transactions'

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
      dispatch(showErrorNotification({ message: 'Not a valid script hash.' }))
    }
    return false
  }
  getTokenBalance(net, scriptHash.slice(2, scriptHash.length), address).then((balance) => {
    dispatch(updateRpxBalance(balance))
  }).catch((e) => {
    dispatch(updateRpxBalance(0))
    dispatch(showErrorNotification({ message: 'There is no ability to display tokens at that script hash.' }))
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
    dispatch(showErrorNotification({ message: 'You cannot send fractional Neo to a token sale.' }))
    return false
  }
  const toMint = parseInt(neoToSend)

  if (toMint > neo) {
    dispatch(showErrorNotification({ message: 'You do not have enough Neo to send.' }))
    return false
  }
  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    dispatch(showErrorNotification({ message: 'Not a valid script hash.' }))
    return false
  }
  const _scriptHash = scriptHash.slice(2, scriptHash.length)

  dispatch(showInfoNotification({ message: 'Processing...', dismissible: false }))

  return getTokenBalance(net, _scriptHash, account.address).then((balance) => {
    doMintTokens(net, _scriptHash, wif, toMint, 0).then((response) => {
      if (response.result === true) {
        dispatch(showSuccessNotification({ message: 'Sale participation was successful.' }))
        return true
      } else {
        dispatch(showErrorNotification({ message: 'Sale participation failed.' }))
        return false
      }
    })
  }).catch((e) => {
    dispatch(showErrorNotification({ message: 'This script hash cannot mint tokens.' }))
    return false
  })
}

const initialState = {
  RPX: 0
}

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
