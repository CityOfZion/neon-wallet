// @flow
import axios from 'axios'
import { api } from 'neon-js'
import { merge } from 'lodash'

import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight, getNetwork } from './metadata'
import { LOGOUT, getAddress } from './account'

import { TOKENS, TOKENS_TEST, NETWORK } from '../core/constants'
import asyncWrap from '../core/asyncHelper'

const TOKEN_PAIRS = Object.entries(TOKENS)
// const INITIAL_TOKENS_BALANCE = Object.keys(TOKENS).map((token) => ({ symbol: token, balance: 0 }))

export const getScriptHashForNetwork = (net: NetworkType, symbol: TokenSymbolType) => {
  if (net === NETWORK.TEST && TOKENS_TEST[symbol]) {
    return TOKENS_TEST[symbol]
  }
  return TOKENS[symbol]
}

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICES = 'RESET_PRICES'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'
export const SET_TOKENS = 'SET_TOKENS'
export const SET_TOKEN_INFO = 'SET_TOKEN_INFO'

// Actions
export function setBalance (NEO: number, GAS: number) {
  return {
    type: SET_BALANCE,
    payload: { NEO, GAS }
  }
}

export function setNEOPrice (price: number) {
  return {
    type: SET_NEO_PRICE,
    payload: { price }
  }
}

export function setGASPrice (price: number) {
  return {
    type: SET_GAS_PRICE,
    payload: { price }
  }
}

export function resetPrices () {
  return {
    type: RESET_PRICES
  }
}

export function setTransactionHistory (transactions: Array<Object>) {
  return {
    type: SET_TRANSACTION_HISTORY,
    payload: { transactions }
  }
}

export function setTokens (tokens: Object) {
  return {
    type: SET_TOKENS,
    payload: { tokens }
  }
}

export function setTokenInfo (symbol: TokenSymbolType, info: TokenInfoType) {
  return {
    type: SET_TOKEN_INFO,
    payload: { symbol, info }
  }
}

export const getNEOMarketPriceUSD = () => async (dispatch: DispatchType) => {
  // If API dies, still display balance - ignore _err
  const [_err, response] = await asyncWrap(axios.get('https://api.coinmarketcap.com/v1/ticker/neo/?convert=USD')) // eslint-disable-line
  let lastUSDNEO = Number(response.data[0].price_usd)
  return dispatch(setNEOPrice(lastUSDNEO))
}

export const getGASMarketPriceUSD = () => async (dispatch: DispatchType) => {
  // If API dies, still display balance - ignore _err
  const [_err, response] = await asyncWrap(axios.get('https://api.coinmarketcap.com/v1/ticker/gas/?convert=USD')) // eslint-disable-line
  let lastUSDGAS = Number(response.data[0].price_usd)
  return dispatch(setGASPrice(lastUSDGAS))
}

export const retrieveBalance = (net: NetworkType, address: string) => async (dispatch: DispatchType) => {
  // If API dies, still display balance - ignore _err
  const [_err, resultBalance] = await asyncWrap(api.neonDB.getBalance(net, address)) // eslint-disable-line
  return dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance))
}

export const loadWalletData = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  dispatch(syncTransactionHistory(net, address))
  dispatch(syncAvailableClaim(net, address))
  dispatch(syncBlockHeight(net))
  dispatch(getNEOMarketPriceUSD())
  dispatch(getGASMarketPriceUSD())
  dispatch(retrieveTokensBalance())
  return dispatch(retrieveBalance(net, address))
}

export const retrieveTokensBalance = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)
  const address = getAddress(state)
  const tokensFromState = getTokens(state)

  const tokens = {}
  for (let [symbol] of TOKEN_PAIRS) {
    const scriptHash = getScriptHashForNetwork(net, symbol)
    // override scripthash with test if on test net
    const [_error, rpcEndpoint] = await asyncWrap(api.neonDB.getRPCEndpoint(net)) // eslint-disable-line
    const [_err, results] = await asyncWrap(api.nep5.getTokenBalance(rpcEndpoint, scriptHash, address)) // eslint-disable-line
    if (results) {
      let info = tokensFromState[symbol].info
      if (!info) {
        await dispatch(retrieveTokenInfo(symbol))
      }
      tokens[symbol] = {
        symbol,
        balance: results,
        scriptHash
      }
    }
  }

  return dispatch(setTokens(tokens))
}

export const retrieveTokenInfo = (symbol: TokenSymbolType) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)

  const [_error, rpcEndpoint] = await asyncWrap(api.neonDB.getRPCEndpoint(net)) // eslint-disable-line
  const [_err, results] = await asyncWrap(api.nep5.getTokenInfo(rpcEndpoint, getScriptHashForNetwork(net, symbol))) // eslint-disable-line
  dispatch(setTokenInfo(symbol, results))
  return results
}

// state getters
export const getNEO = (state: Object) => state.wallet.NEO
export const getGAS = (state: Object) => state.wallet.GAS
export const getTransactions = (state: Object) => state.wallet.transactions
export const getNEOPrice = (state: Object) => state.wallet.prices.NEO
export const getGASPrice = (state: Object) => state.wallet.prices.GAS
export const getTokens = (state: Object) => state.wallet.tokens

const getInitialTokenBalance = () => {
  const tokens = {}
  Object.keys(TOKENS).forEach(symbol => {
    tokens[symbol] = {
      symbol,
      scriptHash: TOKENS[symbol],
      balance: 0
    }
  })
  return tokens
}

const initialState = {
  NEO: 0,
  GAS: 0,
  transactions: [],
  prices: {
    NEO: 0,
    GAS: 0
  },
  tokens: getInitialTokenBalance()
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_BALANCE:
      const { NEO, GAS } = action.payload
      return {
        ...state,
        NEO,
        GAS
      }
    case SET_NEO_PRICE:
      return {
        ...state,
        prices: {
          ...state.prices,
          NEO: action.payload.price
        }
      }
    case SET_GAS_PRICE:
      return {
        ...state,
        prices: {
          ...state.prices,
          GAS: action.payload.price
        }
      }
    case RESET_PRICES:
      return {
        ...state,
        prices: {
          ...initialState.prices
        }
      }
    case SET_TRANSACTION_HISTORY:
      const { transactions } = action.payload
      return {
        ...state,
        transactions
      }
    case SET_TOKENS:
      const { tokens } = action.payload
      return {
        ...state,
        tokens: merge({}, state.tokens, tokens)
      }
    case SET_TOKEN_INFO:
      const { symbol, info } = action.payload
      return {
        ...state,
        tokens: {
          ...state.tokens,
          [symbol]: {
            ...state.tokens[symbol],
            info
          }
        }
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
