// @flow
import { wallet, api } from 'neon-js'
import { flatten } from 'lodash'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import { getWIF, LOGOUT, getAddress } from './account'
import { getNetwork } from './metadata'
import { getNEO, getGAS } from './wallet'

import { toNumber } from '../core/math'
import asyncWrap from '../core/asyncHelper'
import { ASSETS } from '../core/constants'
import {
  validateMintTokensInputs,
  validateOldMintTokensInputs
} from '../core/sale'
import { oldMintTokens } from '../core/oldMintTokens'

export const participateInSale = (
  neoToSend: number,
  gasToSend: number,
  scriptHash: string,
  signingFunction: Function
) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const NEO = getNEO(state)
  const GAS = getGAS(state)
  const net = getNetwork(state)

  const account = new wallet.Account(wif)
  const neoToMint = toNumber(neoToSend)
  const gasToMint = toNumber(gasToSend)

  const [isValid, message] = validateMintTokensInputs(
    neoToMint,
    gasToMint,
    scriptHash,
    NEO,
    GAS
  )

  if (!isValid) return dispatch(showErrorNotification({ message }))

  const _scriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  dispatch(
    showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
  )

  const scriptHashAddress = wallet.getAddressFromScriptHash(_scriptHash)

  const intents = [[ASSETS.NEO, neoToMint], [ASSETS.GAS, gasToMint]]
    .filter(([symbol, amount]) => amount > 0)
    .map(([symbol, amount]) =>
      api.makeIntent({ [symbol]: amount }, scriptHashAddress)
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
    intents: flatten(intents),
    script,
    gas: 0
  }

  const [error, response] = await asyncWrap(api.doInvoke(config))
  if (error || !response || !response.response || !response.response.result) {
    return dispatch(
      showErrorNotification({
        message: 'Sale participation failed. Check Script Hash'
      })
    )
  }
  return dispatch(
    showSuccessNotification({ message: 'Sale participation was successful.' })
  )
}

export const oldParticipateInSale = (
  neoToSend: number,
  scriptHash: string,
  signingFunction: Function = null,
  gasCost: number = 0.000001
) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const NEO = getNEO(state)
  const GAS = getGAS(state)
  const net = getNetwork(state)

  const neoToMint = toNumber(neoToSend)
  const [isValid, message] = validateOldMintTokensInputs(
    neoToMint,
    scriptHash,
    NEO,
    GAS
  )

  if (!isValid) return dispatch(showErrorNotification({ message }))

  const _scriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  dispatch(
    showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
  )

  const [error, response] = await asyncWrap(
    oldMintTokens(net, _scriptHash, wif, neoToMint, gasCost, signingFunction)
  )
  if (error || !response || !response.result) {
    return dispatch(
      showErrorNotification({
        message: 'Sale participation failed. Check Script Hash'
      })
    )
  }
  return dispatch(
    showSuccessNotification({ message: 'Sale participation was successful.' })
  )
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
