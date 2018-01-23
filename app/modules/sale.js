// @flow
import { wallet, api } from 'neon-js'
import { flatten } from 'lodash'

import { showErrorNotification, showInfoNotification, hideNotification } from './notifications'
import {
  getNetwork,
  getWIF,
  getAddress,
  getIsHardwareLogin,
  getSigningFunction,
  getPublicKey
} from '../core/deprecated'
import { getNEO, getGAS } from './wallet'
import { toNumber } from '../core/math'
import asyncWrap from '../core/asyncHelper'
import { ASSETS } from '../core/constants'
import {
  validateMintTokensInputs,
  validateOldMintTokensInputs
} from '../core/sale'
import { oldMintTokens } from '../core/oldMintTokens'

const MESSAGES = {
  PARTICIPATION_FAILED: 'Sale participation failed, please check your script hash again.'
}

export const participateInSale = (
  neoToSend: string,
  gasToSend: string,
  scriptHash: string,
  gasCost: string = '0'
) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const publicKey = getPublicKey(state)
  const NEO = toNumber(getNEO(state))
  const GAS = toNumber(getGAS(state))
  const net = getNetwork(state)
  const address = getAddress(state)
  const isHardwareLogin = getIsHardwareLogin(state)
  const signingFunction = getSigningFunction(state)

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

  if (!isValid) {
    dispatch(showErrorNotification({ message }))
    return false
  }

  const _scriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  let notificationId

  if (isHardwareLogin) {
    notificationId = dispatch(
      showInfoNotification({
        message: 'Please sign the transaction on your hardware device',
        autoDismiss: 0
      })
    )
  } else {
    notificationId = dispatch(
      showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
    )
  }

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
    address,
    privateKey: isHardwareLogin ? null : account.privateKey,
    intents: flatten(intents),
    script,
    gas: 0,
    publicKey: isHardwareLogin ? publicKey : null,
    signingFunction: isHardwareLogin ? signingFunction : null
  }

  const [error, response] = await asyncWrap(api.doInvoke(config))
  if (error || !response || !response.response || !response.response.result) {
    dispatch(
      showErrorNotification({
        message: MESSAGES.PARTICIPATION_FAILED
      })
    )
    return false
  }
  // $FlowFixMe
  dispatch(hideNotification(notificationId))
  return true
}

export const oldParticipateInSale = (
  neoToSend: string,
  scriptHash: string,
  gasCost: string = '0'
) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const NEO = toNumber(getNEO(state))
  const GAS = toNumber(getGAS(state))
  const publicKey = getPublicKey(state)
  const net = getNetwork(state)
  const isHardwareLogin = getIsHardwareLogin(state)
  const signingFunction = getSigningFunction(state)

  const neoToMint = toNumber(neoToSend)
  const [isValid, message] = validateOldMintTokensInputs(
    neoToMint,
    scriptHash,
    NEO,
    GAS
  )

  if (!isValid) {
    dispatch(showErrorNotification({ message }))
    return false
  }

  const _scriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  let notificationId: any

  if (isHardwareLogin) {
    notificationId = dispatch(
      showInfoNotification({
        message: 'Please sign the transaction on your hardware device',
        autoDismiss: 0
      })
    )
  } else {
    notificationId = dispatch(
      showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
    )
  }

  const wifOrPublicKey = isHardwareLogin ? publicKey : wif
  const [error, response] = await asyncWrap(
    oldMintTokens(
      net,
      _scriptHash,
      wifOrPublicKey,
      neoToMint,
      0,
      signingFunction
    )
  )
  if (error || !response || !response.result) {
    dispatch(
      showErrorNotification({
        message: MESSAGES.PARTICIPATION_FAILED
      })
    )
    return false
  }
  // $FlowFixMe
  dispatch(hideNotification(notificationId))
  return true
}
