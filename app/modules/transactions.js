// @flow
/* eslint-disable camelcase */
import { api, sc, u, wallet } from 'neon-js'
import { flatMap, keyBy } from 'lodash'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import {
  getNetwork,
  getWIF,
  getPublicKey,
  getSigningFunction,
  getAddress,
  getIsHardwareLogin,
  getAssetBalances,
  getTokenBalances
} from '../core/deprecated'
import { isToken, validateTransactionsBeforeSending, getTokenBalancesMap } from '../core/wallet'
import { toNumber } from '../core/math'

const extractTokens = (sendEntries: Array<SendEntryType>) => {
  return sendEntries.filter(({ symbol }) => isToken(symbol))
}

const extractAssets = (sendEntries: Array<SendEntryType>) => {
  return sendEntries.filter(({ symbol }) => !isToken(symbol))
}

const buildIntents = (sendEntries: Array<SendEntryType>) => {
  const assetEntries = extractAssets(sendEntries)
  // $FlowFixMe
  return flatMap(assetEntries, ({ address, amount, symbol }) =>
    api.makeIntent(
      {
        [symbol]: toNumber(amount)
      },
      address
    )
  )
}

const buildTransferScript = (
  net: NetworkType,
  sendEntries: Array<SendEntryType>,
  fromAddress: string,
  tokensBalanceMap: {
    [key: string]: TokenBalanceType
  }
) => {
  const tokenEntries = extractTokens(sendEntries)
  const fromAcct = new wallet.Account(fromAddress)
  const scriptBuilder = new sc.ScriptBuilder()

  tokenEntries.forEach(({ address, amount, symbol }) => {
    const toAcct = new wallet.Account(address)
    const { scriptHash, decimals } = tokensBalanceMap[symbol]
    const args = [
      u.reverseHex(fromAcct.scriptHash),
      u.reverseHex(toAcct.scriptHash),
      sc.ContractParam.byteArray(toNumber(amount), 'fixed8', decimals)
    ]

    scriptBuilder.emitAppCall(scriptHash, 'transfer', args)
  })

  return scriptBuilder.str
}

const makeRequest = (sendEntries: Array<SendEntryType>, config: Object) => {
  const script = buildTransferScript(
    config.net,
    sendEntries,
    config.address,
    config.tokensBalanceMap
  )

  if (script === '') {
    return api.sendAsset({ ...config, intents: buildIntents(sendEntries) }, api.neoscan)
  } else {
    return api.doInvoke({
      ...config,
      intents: buildIntents(sendEntries),
      script,
      gas: 0
    }, api.neoscan)
  }
}

export const sendTransaction = (sendEntries: Array<SendEntryType>) => async (
  dispatch: DispatchType,
  getState: GetStateType
): Promise<*> => {
  const state = getState()
  const wif = getWIF(state)
  const fromAddress = getAddress(state)
  const net = getNetwork(state)
  const tokenBalances = getTokenBalances(state)
  const tokensBalanceMap = keyBy(tokenBalances, 'symbol')
  const balances = { ...getAssetBalances(state), ...getTokenBalancesMap(tokenBalances) }
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)
  const isHardwareSend = getIsHardwareLogin(state)

  const rejectTransaction = (message: string) =>
    dispatch(showErrorNotification({ message }))

  const error = validateTransactionsBeforeSending(balances, sendEntries)

  if (error) {
    return rejectTransaction(error)
  }

  dispatch(
    showInfoNotification({ message: 'Sending Transaction...', autoDismiss: 0 })
  )

  if (isHardwareSend) {
    dispatch(
      showInfoNotification({
        message: 'Please sign the transaction on your hardware device',
        autoDismiss: 0
      })
    )
  }

  try {
    const { response } = await makeRequest(sendEntries, {
      net,
      tokensBalanceMap,
      address: fromAddress,
      publicKey,
      privateKey: new wallet.Account(wif).privateKey,
      signingFunction: isHardwareSend ? signingFunction : null
    })

    if (!response.result) {
      throw new Error('Transaction failed')
    }

    return dispatch(showSuccessNotification({
      message: 'Transaction complete! Your balance will automatically update when the blockchain has processed it.'
    }))
  } catch (err) {
    return rejectTransaction(`Transaction failed: ${err.message}`)
  }
}
