// @flow
import { getTokenBalance, getAccountFromWIFKey, doMintTokens } from 'neon-js'
import { showErrorNotification, showInfoNotification, showSuccessNotification } from './notifications'
import { getWif, LOGOUT } from './account'
import { getNetwork } from './metadata'
import { getNeo } from './wallet'

export const participateInSale = (neoToSend: number, scriptHash: string) => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWif(state)
  const neo = getNeo(state)
  const net = getNetwork(state)

  const account = getAccountFromWIFKey(wif)
  if (parseFloat(neoToSend) !== parseInt(neoToSend)) {
    dispatch(showErrorNotification({ message: 'You cannot send fractional NEO to a token sale.' }))
    return false
  }
  const toMint = parseInt(neoToSend)

  if (toMint > neo) {
    dispatch(showErrorNotification({ message: 'You do not have enough NEO to send.' }))
    return false
  }
  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    dispatch(showErrorNotification({ message: 'Not a valid script hash.' }))
    return false
  }
  const _scriptHash = scriptHash.slice(2, scriptHash.length)

  dispatch(showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 }))

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
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
