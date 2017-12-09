// @flow
/* eslint-disable camelcase */
import { api } from 'neon-js'

import { setTransactionHistory, getNEO, getGAS, getTokens, getScriptHashForNetwork } from './wallet'
import { showErrorNotification, showInfoNotification, showSuccessNotification } from './notifications'
import { getWIF, getPublicKey, getSigningFunction, getAddress, LOGOUT, getHardwareLogin } from './account'
import { getNetwork } from './metadata'

import { validateTransactionBeforeSending, obtainTokenBalance, isToken } from '../core/wallet'
import { ASSETS } from '../core/constants'
import { adjustDecimalAmountForTokenTransfer } from '../core/nep5'
import asyncWrap from '../core/asyncHelper'

import { log } from '../util/Logs'

// Constants
export const LOADING_TRANSACTIONS = 'LOADING_TRANSACTIONS'

export const setIsLoadingTransaction = (isLoading: boolean) => ({
  type: LOADING_TRANSACTIONS,
  payload: {
    isLoadingTransactions: isLoading
  }
})

export const syncTransactionHistory = (net: NetworkType, address: string) => async (dispatch: DispatchType) => {
  dispatch(setIsLoadingTransaction(true))
  const [err, transactions] = await asyncWrap(api.neonDB.getTransactionHistory(net, address))
  if (!err && transactions) {
    const txs = transactions.map(({ NEO, GAS, txid, block_index, neo_sent, neo_gas }: TransactionHistoryType) => ({
      type: neo_sent ? ASSETS.NEO : ASSETS.GAS,
      amount: neo_sent ? NEO : GAS,
      txid,
      block_index
    }))
    dispatch(setIsLoadingTransaction(false))
    dispatch(setTransactionHistory(txs))
  } else {
    dispatch(setIsLoadingTransaction(false))
  }
}

export const sendTransaction = (sendAddress: string, sendAmount: string, symbol: SymbolType) => async (dispatch: DispatchType, getState: GetStateType): Promise<*> => {
  const state = getState()
  const wif = getWIF(state)
  const address = getAddress(state)
  const net = getNetwork(state)
  const NEO = getNEO(state)
  const GAS = getGAS(state)
  const tokens = getTokens(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)
  const isHardwareSend = getHardwareLogin(state)

  const rejectTransaction = (message: string) => dispatch(showErrorNotification({ message }))
  const tokenBalance = isToken(symbol) && obtainTokenBalance(tokens, symbol)
  const parsedSendAmount = parseFloat(sendAmount)

  const { error, valid } = validateTransactionBeforeSending(NEO, GAS, tokenBalance, symbol, sendAddress, parsedSendAmount)
  if (valid) {
    const selfAddress = address
    let sendAsset = {}
    sendAsset[symbol] = parseFloat(parsedSendAmount)

    dispatch(showInfoNotification({ message: 'Sending Transaction...', autoDismiss: 0 }))
    log(net, 'SEND', selfAddress, { to: sendAddress, asset: symbol, amount: parsedSendAmount })

    const asyncSigningFunction = isHardwareSend ? signingFunction : null
    const publicKeyOrWif = isHardwareSend ? publicKey : wif

    let sendAssetFn
    if (symbol === ASSETS.NEO || symbol === ASSETS.GAS) {
      sendAssetFn = () => api.neonDB.doSendAsset(net, sendAddress, publicKeyOrWif, sendAsset, asyncSigningFunction)
    } else {
      const scriptHash = getScriptHashForNetwork(net, symbol)
      sendAssetFn = () => api.nep5.doTransferToken(net, scriptHash, publicKeyOrWif, sendAddress, adjustDecimalAmountForTokenTransfer(parsedSendAmount), 0, asyncSigningFunction)
    }

    if (isHardwareSend) dispatch(showInfoNotification({ message: 'Please sign the transaction on your hardware device', autoDismiss: 0 }))

    const [err, response] = await asyncWrap(sendAssetFn())
    if (err || response.result === undefined || response.result === false) {
      console.log(err)
      return rejectTransaction('Transaction failed!')
    } else {
      return dispatch(showSuccessNotification({ message: 'Transaction complete! Your balance will automatically update when the blockchain has processed it.' }))
    }
  } else {
    return rejectTransaction(error)
  }
}

// state getters
export const getIsLoadingTransactions = (state: Object) => state.transactions.isLoadingTransactions

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
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
