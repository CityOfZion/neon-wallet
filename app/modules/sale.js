// @flow
import { wallet, api } from 'neon-js'

import { showErrorNotification, showInfoNotification, showSuccessNotification } from './notifications'
import { getWIF, LOGOUT } from './account'
import { getNetwork } from './metadata'
import { getNEO } from './wallet'
import asyncWrap from '../core/asyncHelper'

// TODO: Rewrite this function

export const participateInSale = (neoToSend: number, scriptHash: string) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const NEO = getNEO(state)
  const net = getNetwork(state)

  const account = new wallet.Account(wif)
  if (parseFloat(neoToSend) !== parseInt(neoToSend)) {
    dispatch(showErrorNotification({ message: 'You cannot send fractional NEO to a token sale.' }))
    return false
  }
  const toMint = parseInt(neoToSend)
  // $FlowFixMe
  if (toMint > NEO) {
    dispatch(showErrorNotification({ message: 'You do not have enough NEO to send.' }))
    return false
  }
  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    dispatch(showErrorNotification({ message: 'Not a valid script hash.' }))
    return false
  }
  const _scriptHash = scriptHash.slice(2, scriptHash.length)

  dispatch(showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 }))

  const [error, rpcEndpoint] = await asyncWrap(api.neonDB.getRPCEndpoint(net)) // eslint-disable-line
  const [err, balance] = await asyncWrap(api.nep5.getTokenBalance(rpcEndpoint, _scriptHash, account.address)) // eslint-disable-line
  const [e, response] = await asyncWrap(api.neonDB.doMintTokens(net, _scriptHash, wif, toMint, 0))
  if (error || err || e) {
    dispatch(showErrorNotification({ message: 'This script hash cannot mint tokens.' }))
    return false
  }
  if (response.result === true) {
    dispatch(showSuccessNotification({ message: 'Sale participation was successful.' }))
    return true
  } else {
    dispatch(showErrorNotification({ message: 'Sale participation failed.' }))
    return false
  }
}

const initialState = {
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
