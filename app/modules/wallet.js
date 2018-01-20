// @flow
import { api } from 'neon-js'
import { isNil } from 'lodash'

import { syncTransactionHistory } from './transactions'
import { syncAvailableClaim } from './claim'
import { syncBlockHeight, getTokensForNetwork } from './metadata'
import { LOGOUT, getAddress } from './account'
import { getMarketPriceUSD, getGasMarketPriceUSD } from './price'
import { showErrorNotification } from './notifications'

import { ASSETS } from '../core/constants'
import { getNetwork } from '../core/deprecated'
import asyncWrap from '../core/asyncHelper'
import { getTokenBalancesMap } from '../core/wallet'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'
import { toBigNumber } from '../core/math'

// Constants
export const SET_BALANCE = 'SET_BALANCE'
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICES = 'RESET_PRICES'
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'
export const SET_TOKENS_BALANCE = 'SET_TOKENS_BALANCE'
export const SET_IS_LOADED = 'SET_IS_LOADED'

export const setIsLoaded = (loaded: boolean) => ({
  type: SET_IS_LOADED,
  payload: {
    loaded
  }
})

// Actions
export function setBalance (NEO: string, GAS: string) {
  return {
    type: SET_BALANCE,
    payload: { NEO, GAS }
  }
}

export function setTransactionHistory (transactions: Array<Object>) {
  return {
    type: SET_TRANSACTION_HISTORY,
    payload: { transactions }
  }
}

export function setTokenBalances (tokenBalances: Array<TokenBalanceType>) {
  return {
    type: SET_TOKENS_BALANCE,
    payload: { tokenBalances }
  }
}

export const retrieveBalance = (net: NetworkType, address: string) => async (
  dispatch: DispatchType
) => {
  // If API dies, still display balance - ignore _err
  const [_err, resultBalance] = await asyncWrap(
    api.neonDB.getBalance(net, address)
  ) // eslint-disable-line
  if (_err) {
    return dispatch(
      showErrorNotification({
        message: `Could not retrieve NEO/GAS balance`,
        stack: true
      })
    )
  } else {
    return dispatch(
      setBalance(
        String(resultBalance.NEO.balance),
        toBigNumber(resultBalance.GAS.balance)
          .round(COIN_DECIMAL_LENGTH)
          .toString()
      )
    )
  }
}

export const loadWalletData = (silent: boolean = true) => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const net = getNetwork(state)
  const address = getAddress(state)

  if (!silent) {
    dispatch(setIsLoaded(false))
  }
  dispatch(syncTransactionHistory(net, address))
  dispatch(syncAvailableClaim(net, address))
  dispatch(syncBlockHeight(net))
  dispatch(getMarketPriceUSD())
  dispatch(getGasMarketPriceUSD())
  await Promise.all([
    dispatch(retrieveTokenBalances()),
    dispatch(retrieveBalance(net, address))
  ])
  dispatch(setIsLoaded(true))
  return true
}

export const retrieveTokenBalances = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const net = getNetwork(state)
  const address = getAddress(state)

  const tokens = getTokensForNetwork(state)
  const tokenBalances = []

  for (const token of tokens) {
    const { scriptHash } = token

    try {
      const [rpcError, tokenRpcEndpoint] = await asyncWrap(
        api.neonDB.getRPCEndpoint(net)
      )
      const [tokenError, tokenResults] = await asyncWrap(
        api.nep5.getToken(tokenRpcEndpoint, scriptHash, address)
      )

      if (!rpcError && !tokenError) {
        tokenBalances.push({
          ...tokenResults,
          balance:
            isNil(tokenResults.balance)
              ? '0'
              : toBigNumber(tokenResults.balance)
                .round(COIN_DECIMAL_LENGTH)
                .toString(),
          scriptHash
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  return dispatch(setTokenBalances(tokenBalances))
}

// state getters
export const getNEO = (state: Object): string => state.wallet.NEO
export const getGAS = (state: Object): string => state.wallet.GAS
export const getTransactions = (state: Object) => state.wallet.transactions
export const getTokenBalances = (state: Object) => state.wallet.tokenBalances
export const getIsLoaded = (state: Object) => state.wallet.loaded

export const getBalances = (state: Object) => {
  const neoBalance = getNEO(state)
  const gasBalance = getGAS(state)
  const tokenBalances = getTokenBalances(state)
  const tokenBalancesMap = getTokenBalancesMap(tokenBalances)

  return {
    [ASSETS.NEO]: neoBalance,
    [ASSETS.GAS]: gasBalance,
    ...tokenBalancesMap
  }
}

type State = {
  loaded: boolean,
  NEO: string,
  GAS: string,
  transactions: Array<TransactionHistoryType>,
  tokenBalances: Array<TokenBalanceType>
}

const initialState = {
  loaded: false,
  NEO: '0',
  GAS: '0',
  transactions: [],
  tokenBalances: []
}

export default (state: State = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_BALANCE:
      const { NEO, GAS } = action.payload
      return {
        ...state,
        NEO,
        GAS
      }
    case SET_TRANSACTION_HISTORY:
      const { transactions } = action.payload
      return {
        ...state,
        transactions
      }
    case SET_TOKENS_BALANCE:
      const { tokenBalances } = action.payload
      return {
        ...state,
        tokenBalances
      }
    case SET_IS_LOADED:
      const { loaded } = action.payload
      return {
        ...state,
        loaded
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
