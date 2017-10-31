// @flow
import { ASSETS_LABELS } from '../core/constants'
import axios from 'axios'
import { getBalance } from 'neon-js'
import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight } from './metadata'

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICE = 'RESET_PRICE'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'

// Actions
export function setBalance (neo: number, gas: number) {
  return {
    type: SET_BALANCE,
    Neo: neo,
    Gas: gas
  }
}

export function setNeoPrice (neoPrice: number) {
  return {
    type: SET_NEO_PRICE,
    neoPrice: neoPrice
  }
}

export function setGasPrice (gasPrice: number) {
  return {
    type: SET_GAS_PRICE,
    gasPrice: gasPrice
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
    transactions
  }
}

export const getMarketPriceUSD = () => (dispatch: DispatchType) => {
  return axios.get('https://api.coinmarketcap.com/v1/ticker/neo/?convert=USD').then((response) => {
    let lastUSDNEO = Number(response.data[0].price_usd)
    dispatch(setNeoPrice(lastUSDNEO))
  }).catch((e) => {
    // If API dies, still display balance
  })
}

export const getGasMarketPriceUSD = () => (dispatch: DispatchType) => {
  return axios.get('https://api.coinmarketcap.com/v1/ticker/gas/?convert=USD').then((response) => {
    let lastUSDGAS = Number(response.data[0].price_usd)
    dispatch(setGasPrice(lastUSDGAS))
  }).catch((e) => {
    // If API dies, still display balance
  })
}

export const retrieveBalance = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  return getBalance(net, address).then((resultBalance) => {
    dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance))
  }).catch((result) => {
    // If API dies, still display balance
  })
}

export const initiateGetBalance = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  dispatch(syncTransactionHistory(net, address))
  dispatch(syncAvailableClaim(net, address))
  dispatch(syncBlockHeight(net))
  dispatch(getMarketPriceUSD())
  dispatch(getGasMarketPriceUSD())
  return dispatch(retrieveBalance(net, address))
}

const initialState = {
  Neo: 0,
  Gas: 0,
  transactions: [],
  price: '--'
}

// reducer for wallet account balance
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_BALANCE:
      return {
        ...state,
        [ASSETS_LABELS.NEO]: action.Neo,
        [ASSETS_LABELS.GAS]: action.Gas,
        price: action.price
      }
    case SET_NEO_PRICE:
      return {
        ...state,
        neoPrice: action.neoPrice
      }
    case SET_GAS_PRICE:
      return {
        ...state,
        gasPrice: action.gasPrice
      }
    case RESET_PRICE:
      return {
        ...state,
        neoPrice: 0,
        gasPrice: 0
      }
    case SET_TRANSACTION_HISTORY:
      return {
        ...state,
        transactions: action.transactions
      }
    default:
      return state
  }
}
