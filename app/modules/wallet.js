// @flow
import { ASSETS, TOKENS } from '../core/constants'
import { merge } from 'lodash'
import axios from 'axios'
import { getBalance, getTokenBalance, getTokenInfo } from 'neon-js'
import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight, getNetwork } from './metadata'
import asyncWrap from '../core/asyncHelper'
import { LOGOUT, getAddress } from './account'

const TOKEN_PAIRS = Object.entries(TOKENS)

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICE = 'RESET_PRICE'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'
export const SET_TOKENS_BALANCE = 'SET_TOKENS_BALANCE'
export const SET_TOKENS_INFO = 'SET_TOKENS_INFO'

// Actions
export function setBalance (NEO: number, GAS: number) {
  return {
    type: SET_BALANCE,
    payload: { NEO, GAS }
  }
}

export function setNeoPrice (neoPrice: number) {
  return {
    type: SET_NEO_PRICE,
    payload: { neoPrice }
  }
}

export function setGasPrice (gasPrice: number) {
  return {
    type: SET_GAS_PRICE,
    payload: { gasPrice }
  }
}

export function resetPrice () {
  return {
    type: RESET_PRICE
  }
}

export function setTransactionHistory (transactions: Array<Object>) {
  return {
    type: SET_TRANSACTION_HISTORY,
    payload: { transactions }
  }
}

export function setTokensBalance (tokens: Array<Object>) {
  return {
    type: SET_TOKENS_BALANCE,
    payload: { tokens }
  }
}

export function setTokensInfo (tokensInfo: Array<Object>) {
  return {
    type: SET_TOKENS_INFO,
    payload: { tokensInfo }
  }
}

export const getMarketPriceUSD = () => async (dispatch: DispatchType) => {
  // If API dies, still display balance - ignore _err
  const [_err, response] = await asyncWrap(axios.get('https://api.coinmarketcap.com/v1/ticker/neo/?convert=USD')) // eslint-disable-line
  let lastUSDNEO = Number(response.data[0].price_usd)
  return dispatch(setNeoPrice(lastUSDNEO))
}

export const getGasMarketPriceUSD = () => async (dispatch: DispatchType) => {
  // If API dies, still display balance - ignore _err
  const [_err, response] = await asyncWrap(axios.get('https://api.coinmarketcap.com/v1/ticker/gas/?convert=USD')) // eslint-disable-line
  let lastUSDGAS = Number(response.data[0].price_usd)
  return dispatch(setGasPrice(lastUSDGAS))
}

export const retrieveBalance = (net: NetworkType, address: string) => async (dispatch: DispatchType) => {
  // If API dies, still display balance - ignore _err
  const [_err, resultBalance] = await asyncWrap(getBalance(net, address)) // eslint-disable-line
  return dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance))
}

export const initiateGetBalance = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  dispatch(syncTransactionHistory(net, address))
  dispatch(syncAvailableClaim(net, address))
  dispatch(syncBlockHeight(net))
  dispatch(getMarketPriceUSD())
  dispatch(getGasMarketPriceUSD())
  dispatch(retrieveTokensBalance())
  dispatch(retrieveTokensInfo())
  return dispatch(retrieveBalance(net, address))
}

export const retrieveTokensBalance = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)
  const address = getAddress(state)
  const tokensBalance = []
  for (const [symbol, scriptHash] of Object.entries(TOKENS)) {
    let [_err, results] = await asyncWrap(getTokenBalance(net, scriptHash, address)) // eslint-disable-line
    if (results) {
      tokensBalance.push({
        symbol,
        balance: results
      })
    }
  }

  return dispatch(setTokensBalance(tokensBalance))
}

export const retrieveTokensInfo = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)
  const tokensInfo = []
  for (const [symbol, scriptHash] of TOKEN_PAIRS) {
    let [_err, results] = await asyncWrap(getTokenInfo(net, scriptHash)) // eslint-disable-line
    if (results) {
      tokensInfo.push({
        symbol,
        info: results
      })
    }
  }
  return dispatch(setTokensInfo(tokensInfo))
}

// state getters
export const getNeo = (state) => state.wallet.NEO
export const getGas = (state) => state.wallet.GAS
export const getTransactions = (state) => state.wallet.transactions
export const getNeoPrice = (state) => state.wallet.neoPrice
export const getGasPrice = (state) => state.wallet.gasPrice
export const getTokens = (state) => state.wallet.tokens

const initialState = {
  NEO: 0,
  GAS: 0,
  transactions: [],
  neoPrice: 0,
  gasPrice: 0,
  tokens: []
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_BALANCE:
      const { Neo, Gas } = action.payload
      return {
        ...state,
        NEO: Neo,
        GAS: Gas
      }
    case SET_NEO_PRICE:
      const { neoPrice } = action.payload
      return {
        ...state,
        neoPrice
      }
    case SET_GAS_PRICE:
      const { gasPrice } = action.payload
      return {
        ...state,
        gasPrice
      }
    case RESET_PRICE:
      return {
        ...state,
        neoPrice: 0,
        gasPrice: 0
      }
    case SET_TRANSACTION_HISTORY:
      const { transactions } = action.payload
      return {
        ...state,
        transactions
      }
    case SET_TOKENS_BALANCE:
      const { tokens } = action.payload
      return {
        ...state,
        tokens: merge(state.tokens, tokens)
      }
    case SET_TOKENS_INFO:
      const { tokensInfo } = action.payload
      return {
        ...state,
        tokens: merge(state.tokens, tokensInfo)
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
