// @flow
/* eslint-disable camelcase */
import { ASSETS, TOKENS } from '../core/constants'
import { validateTransactionBeforeSending, obtainTokenBalance } from '../core/wallet'
import { getTransactionHistory, doSendAsset, hardwareDoSendAsset, doTransferToken } from 'neon-js'
import { setTransactionHistory, getNEO, getGAS, getTokens } from './wallet'
import { log } from '../util/Logs'
import { showErrorNotification, showInfoNotification, showSuccessNotification } from './notifications'
import { getWif, getPublicKey, getSigningFunction, getAddress, LOGOUT } from './account'
import { getNetwork } from './metadata'
import { capitalize } from 'lodash'
import asyncWrap from '../core/asyncHelper'

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
  const [err, transactions] = await asyncWrap(getTransactionHistory(net, address))
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

export const sendTransaction = (sendAddress: string, sendAmount: string, symbol: TokenSymbolType) => async (dispatch: DispatchType, getState: GetStateType): Promise<*> => {
  const state = getState()
  const wif = getWif(state)
  const address = getAddress(state)
  const net = getNetwork(state)
  const neo = getNEO(state)
  const gas = getGAS(state)
  const tokens = getTokens(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)

  const rejectTransaction = (message: string) => dispatch(showErrorNotification({ message }))
  const tokenBalance = obtainTokenBalance(tokens, symbol)

  const { error, valid } = validateTransactionBeforeSending(neo, gas, tokenBalance, symbol, sendAddress, sendAmount)
  if (valid) {
    const selfAddress = address
    // We have to capitalize NEO/GAS because neon-wallet-db is using capitalized asset name
    const assetName = capitalize(symbol === ASSETS.NEO ? ASSETS.NEO : ASSETS.GAS)
    let sendAsset = {}
    sendAsset[assetName] = sendAmount

    dispatch(showInfoNotification({ message: 'Sending Transaction...', autoDismiss: 0 }))
    log(net, 'SEND', selfAddress, { to: sendAddress, asset: symbol, amount: sendAmount })

    const isHardwareSend = !!publicKey

    let sendAssetFn
    if (isHardwareSend) {
      dispatch(showInfoNotification({ message: 'Please sign the transaction on your hardware device', autoDismiss: 0 }))
      sendAssetFn = () => hardwareDoSendAsset(net, sendAddress, publicKey, sendAsset, signingFunction)
    } else {
      if (symbol === ASSETS.NEO || symbol === ASSETS.GAS) {
        sendAssetFn = () => doSendAsset(net, sendAddress, wif, sendAsset)
      } else {
        const scriptHash = TOKENS[symbol]
        sendAssetFn = () => doTransferToken(net, scriptHash, wif, sendAddress, parseFloat(sendAmount))
      }
    }

    const [err, response] = await asyncWrap(sendAssetFn())
    if (err || response.result === undefined || response.result === false) {
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
