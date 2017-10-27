// @flow
import { ASSETS_LABELS } from '../core/constants'
import axios from 'axios'
import { getBalance } from 'neon-js'
import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight } from './metadata'

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const RESET_PRICE = 'RESET_PRICE'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'

// Actions
export function setBalance (neo: number, gas: number, price: string) {
  return {
    type: SET_BALANCE,
    Neo: neo,
    Gas: gas,
    price: price
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

function getMarketPriceUSD (amount: number) {
  return axios.get('https://bittrex.com/api/v1.1/public/getticker?market=USDT-NEO').then((response) => {
    let lastUSDNEO = Number(response.data.result.Last)
    return ('$' + (lastUSDNEO * amount).toFixed(2).toString())
  })
}

export const retrieveBalance = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  return getBalance(net, address).then((resultBalance) => {
    return getMarketPriceUSD(resultBalance.NEO.balance).then((resultPrice) => {
      if (resultPrice === undefined || resultPrice === null) {
        dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance, '--'))
      } else {
        dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance, resultPrice))
      }
      return true
    }).catch((e) => {
      dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance, '--'))
    })
  }).catch((result) => {
    // If API dies, still display balance
  })
}

export const initiateGetBalance = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  dispatch(syncTransactionHistory(net, address))
  dispatch(syncAvailableClaim(net, address))
  dispatch(syncBlockHeight(net))
  return dispatch(retrieveBalance(net, address))
}

// reducer for wallet account balance
export default (state: Object = { Neo: 0, Gas: 0, transactions: [], price: '--' }, action: Object) => {
  switch (action.type) {
    case SET_BALANCE:
      return { ...state, [ASSETS_LABELS.NEO]: action.Neo, [ASSETS_LABELS.GAS]: action.Gas, price: action.price }
    case RESET_PRICE:
      return {...state, price: '--'}
    case SET_TRANSACTION_HISTORY:
      return {...state, transactions: action.transactions}
    default:
      return state
  }
}
