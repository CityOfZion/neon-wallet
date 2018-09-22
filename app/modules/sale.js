// @flow
import { wallet, api } from 'neon-js'
import { flatten } from 'lodash-es'

import {
  showErrorNotification,
  showInfoNotification,
  hideNotification
} from './notifications'
import {
  getNetwork,
  getWIF,
  getAddress,
  getIsHardwareLogin,
  getSigningFunction,
  getPublicKey,
  getNEO,
  getGAS
} from '../core/deprecated'
import { toNumber } from '../core/math'
import { ASSETS } from '../core/constants'
import { validateMintTokensInputs } from '../core/sale'

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
    throw new Error(`Invalid parameters: ${message}`)
  }

  const formattedScriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  const notificationId = dispatch(
    showInfoNotification({
      message: isHardwareLogin
        ? 'Please sign the transaction on your hardware device'
        : 'Sending transaction',
      autoDismiss: 0
    })
  )

  const scriptHashAddress = wallet.getAddressFromScriptHash(formattedScriptHash)

  const intents = [[ASSETS.NEO, neoToMint], [ASSETS.GAS, gasToMint]]
    .filter(([symbol, amount]) => amount > 0)
    .map(([symbol, amount]) =>
      api.makeIntent({ [symbol]: amount }, scriptHashAddress)
    )

  const script = {
    scriptHash: formattedScriptHash,
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

  try {
    const response = await api.doInvoke(config, api.neoscan)

    if (!response || !response.response || !response.response.result) {
      throw new Error('Rejected by RPC server.')
    }
  } catch (err) {
    dispatch(
      showErrorNotification({
        message: `Sale participation failed: ${err.message}`
      })
    )
    return false
  }

  // $FlowFixMe
  dispatch(hideNotification(notificationId))
  return true
}
