// @flow
/* eslint-disable camelcase */
import { api, sc, u, wallet } from 'neon-js'
import { flatMap, keyBy } from 'lodash'

import { setTransactionHistory, getBalances, getTokenBalances } from './wallet'
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
  getIsHardwareLogin
} from '../core/deprecated'
import { isToken, validateTransactionsBeforeSending } from '../core/wallet'
import { ASSETS } from '../core/constants'
import asyncWrap from '../core/asyncHelper'
import { toNumber, toBigNumber } from '../core/math'
import { toFixedDecimals, COIN_DECIMAL_LENGTH } from '../core/formatters'

import { log } from '../util/Logs'

// Constants
export const LOADING_TRANSACTIONS = 'LOADING_TRANSACTIONS'

export const setIsLoadingTransaction = (isLoading: boolean) => ({
  type: LOADING_TRANSACTIONS,
  payload: {
    isLoadingTransactions: isLoading
  }
})

export const syncTransactionHistory = (
  net: NetworkType,
  address: string
) => async (dispatch: DispatchType) => {
  dispatch(setIsLoadingTransaction(true))
  const [err, transactions] = await asyncWrap(
    api.neonDB.getTransactionHistory(net, address)
  )
  if (!err && transactions) {
    const txs = transactions.map(
      ({ NEO, GAS, txid, block_index }: TransactionHistoryType) => ({
        txid,
        [ASSETS.NEO]: toFixedDecimals(NEO, 0),
        [ASSETS.GAS]: toBigNumber(GAS)
          .round(COIN_DECIMAL_LENGTH)
          .toString()
      })
    )
    dispatch(setIsLoadingTransaction(false))
    dispatch(setTransactionHistory(txs))
  } else {
    dispatch(setIsLoadingTransaction(false))
  }
}

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

const buildIntentsForInvocation = (
  sendEntries: Array<SendEntryType>,
  fromAddress: string
) => {
  const intents = buildIntents(sendEntries)

  if (intents.length > 0) {
    return intents
  } else {
    return buildIntents([
      {
        address: fromAddress,
        amount: '0.00000001',
        symbol: ASSETS.GAS
      }
    ])
  }
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
    return api.sendAsset({ ...config, intents: buildIntents(sendEntries) })
  } else {
    return api.doInvoke({
      ...config,
      intents: buildIntentsForInvocation(sendEntries, config.address),
      script,
      gas: 0
    })
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
  const balances = getBalances(state)
  const tokensBalanceMap = keyBy(getTokenBalances(state), 'symbol')
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

  log(
    net,
    'SEND',
    fromAddress,
    // $FlowFixMe
    sendEntries.map(({ address, amount, symbol }) => ({
      to: address,
      asset: symbol,
      amount: parseFloat(amount)
    }))
  )

  if (isHardwareSend) {
    dispatch(
      showInfoNotification({
        message: 'Please sign the transaction on your hardware device',
        autoDismiss: 0
      })
    )
  }

  const [err, config] = await asyncWrap(
    makeRequest(sendEntries, {
      net,
      tokensBalanceMap,
      address: fromAddress,
      publicKey,
      privateKey: new wallet.Account(wif).privateKey,
      signingFunction: isHardwareSend ? signingFunction : null
    })
  )

  if (err || !config || !config.response || !config.response.result) {
    console.log(err)
    return rejectTransaction('Transaction failed!')
  } else {
    return dispatch(
      showSuccessNotification({
        message:
          'Transaction complete! Your balance will automatically update when the blockchain has processed it.'
      })
    )
  }
}

// state getters
export const getIsLoadingTransactions = (state: Object) =>
  state.transactions.isLoadingTransactions

const initialState = {
  isLoadingTransactions: false
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case LOADING_TRANSACTIONS:
      const { isLoadingTransactions } = action.payload
      return {
        ...state,
        isLoadingTransactions
      }
    default:
      return state
  }
}
