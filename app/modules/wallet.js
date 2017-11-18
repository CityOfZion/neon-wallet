// @flow
import { ASSETS_LABELS } from '../core/constants'
import axios from 'axios'
import { getBalance } from 'neon-js'
import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight } from './metadata'
import asyncWrap from '../core/asyncHelper'
import { LOGOUT } from './account'

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICE = 'RESET_PRICE'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'

// Actions
export function setBalance (Neo: number, Gas: number) {
  return {
    type: SET_BALANCE,
    payload: { Neo, Gas }
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
  return dispatch(retrieveBalance(net, address))
}

// state getters
export const getNeo = (state) => state.wallet.Neo
export const getGas = (state) => state.wallet.Gas
export const getTransactions = (state) => state.wallet.transactions
export const getNeoPrice = (state) => state.wallet.neoPrice
export const getGasPrice = (state) => state.wallet.gasPrice

const initialState = {
  Neo: 0,
  Gas: 0,
  transactions: [],
  neoPrice: 0,
  gasPrice: 0
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_BALANCE:
      const { Neo, Gas } = action.payload
      return {
        ...state,
        [ASSETS_LABELS.NEO]: Neo,
        [ASSETS_LABELS.GAS]: Gas
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
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
