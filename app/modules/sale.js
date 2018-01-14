// @flow
import { wallet, api } from 'neon-js'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import { getWIF, LOGOUT } from './account'
import { getNetwork } from './metadata'
import { getNEO, getGAS } from './wallet'
import { toNumber, toBigNumber } from '../core/math'
import asyncWrap from '../core/asyncHelper'

export const participateInSale = (
  neoToSend: number,
  gasToSend: number,
  scriptHash: string
) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const NEO = getNEO(state)
  const GAS = getGAS(state)
  const net = getNetwork(state)

  const account = new wallet.Account(wif)
  if (neoToSend && parseFloat(neoToSend) !== parseInt(neoToSend)) {
    dispatch(
      showErrorNotification({
        message: 'You cannot send fractional NEO to a token sale.'
      })
    )
    return false
  }

  const neoToMint = toNumber(neoToSend)
  const gasToMint = toNumber(gasToSend)

  if ((neoToMint && isNan(neoToMint)) || (gasToMint && isNan(gasToMint))) {
    dispatch(
      showErrorNotification({ message: 'Please enter valid numbers only' })
    )
    return false
  }

  if (neoToMint > NEO) {
    dispatch(
      showErrorNotification({ message: 'You do not have enough NEO to send.' })
    )
    return false
  }

  if (gasToMint > GAS) {
    dispatch(
      showErrorNotification({ message: 'You do not have enough GAS to send.' })
    )
    return false
  }

  if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
    dispatch(showErrorNotification({ message: 'Not a valid script hash.' }))
    return false
  }
  const _scriptHash = scriptHash.slice(2, scriptHash.length)

  dispatch(
    showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
  )

  const [error, rpcEndpoint] = await asyncWrap(api.neonDB.getRPCEndpoint(net)) // eslint-disable-line
  const [err, balance] = await asyncWrap(
    api.nep5.getTokenBalance(rpcEndpoint, _scriptHash, account.address)
  ) // eslint-disable-line

  const intents = [[NEO, neoToMint], [GAS, gasToMint]]
    .filter(([symbol, amount]) => amount > 0)
    .map(([symbol, amount]) =>
      api.makeIntent(
        { [symbol]: amount },
        wallet.getAddressFromScriptHash(_scriptHash)
      )
    )

  const script = {
    scriptHash: _scriptHash,
    operation: 'mintTokens',
    args: []
  }
  const config = {
    net,
    address: account.address,
    privateKey: account.privateKey,
    intents,
    script,
    gas: 0
  }

  const [e, response] = await asyncWrap(api.doInvoke(config))
  if (error || err || e) {
    dispatch(
      showErrorNotification({ message: 'This script hash cannot mint tokens.' })
    )
    return false
  }
  // TODO test this response out
  if (response.result === true) {
    dispatch(
      showSuccessNotification({ message: 'Sale participation was successful.' })
    )
    return true
  } else {
    dispatch(showErrorNotification({ message: 'Sale participation failed.' }))
    return false
  }
}

const initialState = {}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
