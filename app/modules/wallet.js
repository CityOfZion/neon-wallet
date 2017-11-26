// @flow
import axios from 'axios'
import { getBalance, getTokenBalance, getTokenInfoType } from 'neon-js'

import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight, getNetwork } from './metadata'
import { LOGOUT, getAddress } from './account'

import { TOKENS } from '../core/constants'
import asyncWrap from '../core/asyncHelper'

const TOKEN_PAIRS = Object.entries(TOKENS)
const INITIAL_TOKENS_BALANCE = Object.keys(TOKENS).map((token) => ({ symbol: token, balance: 0 }))

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICES = 'RESET_PRICES'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'
export const SET_TOKENS_BALANCE = 'SET_TOKENS_BALANCE'
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

export function setTokensBalance (tokens: Array<TokenType>) {
  return {
    type: SET_TOKENS_BALANCE,
    payload: { tokens }
  }
}

export function setTokenInfoType (symbol: TokenSymbolType, info: TokenInfoType) {
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
  const [_err, resultBalance] = await asyncWrap(getBalance(net, address)) // eslint-disable-line
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

  const tokensBalance = INITIAL_TOKENS_BALANCE
  for (const [symbol, scriptHash] of TOKEN_PAIRS) {
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

export const retrieveTokenInfoType = (symbol: TokenSymbolType) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)

  const scriptHash = TOKENS[symbol]
  let [_err, results] = await asyncWrap(getTokenInfoType(net, scriptHash)) // eslint-disable-line  
  return dispatch(setTokenInfoType(symbol, results))
}

// state getters
export const getNEO = (state: Object) => state.wallet.NEO
export const getGAS = (state: Object) => state.wallet.GAS
export const getTransactions = (state: Object) => state.wallet.transactions
export const getNEOPrice = (state: Object) => state.wallet.prices.NEO
export const getGASPrice = (state: Object) => state.wallet.prices.GAS
export const getTokens = (state: Object) => state.wallet.tokens

const initialState = {
  NEO: 0,
  GAS: 0,
  transactions: [],
  prices: {
    NEO: 0,
    GAS: 0
  },
  tokens: INITIAL_TOKENS_BALANCE
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_BALANCE:
      const { Neo, Gas } = action.payload
      return {
        ...state,
        NEO: Neo,
        GAS: Gas
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
        price: {
          NEO: 0,
          GAS: 0
        }
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
        tokens
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
