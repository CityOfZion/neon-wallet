// @flow
import { ASSETS_LABELS } from '../core/constants'
import { getBalance } from 'neon-js'
import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight } from './metadata'
import asyncWrap from '../core/asyncHelper'
import { LOGOUT } from './account'
import { getMarketPriceUSD, getGasMarketPriceUSD } from './price'

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'

// Actions
export function setBalance (Neo: number, Gas: number) {
  return {
    type: SET_BALANCE,
    payload: { Neo, Gas }
  }
}

export function setTransactionHistory (transactions: Array<Object>) {
  return {
    type: SET_TRANSACTION_HISTORY,
    payload: { transactions }
  }
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

const initialState = {
  Neo: 0,
  Gas: 0,
  transactions: []
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
