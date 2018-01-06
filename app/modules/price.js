// @flow
import { api } from 'neon-js'

import asyncWrap from '../core/asyncHelper'
import { DEFAULT_CURRENCY_CODE } from '../core/constants'

// Constants
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICE = 'RESET_PRICE'
export const SET_CURRENCY = 'SET_CURRENCY'

// Actions
export function setNEOPrice (NEO: string) {
  return {
    type: SET_NEO_PRICE,
    payload: { NEO }
  }
}

export function setGASPrice (GAS: string) {
  return {
    type: SET_GAS_PRICE,
    payload: { GAS }
  }
}

export function setCurrency (currency: string) {
  return {
    type: SET_CURRENCY,
    payload: { currency }
  }
}

export function resetPrice () {
  return {
    type: RESET_PRICE
  }
}

export const getMarketPriceUSD = () => async (dispatch: DispatchType, getState: GetStateType) => {
  // If API dies, still display balance - ignore _err
  const [_err, price] = await asyncWrap(api.cmc.getPrice('NEO', getCurrency(getState()))) // eslint-disable-line
  return dispatch(setNEOPrice(price))
}

export const getGasMarketPriceUSD = () => async (dispatch: DispatchType, getState: GetStateType) => {
  // If API dies, still display balance - ignore _err
  const [_err, price] = await asyncWrap(api.cmc.getPrice('GAS', getCurrency(getState()))) // eslint-disable-line
  return dispatch(setGASPrice(price))
}

// state getters
export const getNEOPrice = (state: Object) => state.price.NEO
export const getGASPrice = (state: Object) => state.price.GAS
export const getCurrency = (state: Object) => state.price.currency

const initialState = {
  NEO: 0,
  GAS: 0,
  currency: DEFAULT_CURRENCY_CODE
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_NEO_PRICE:
      const { NEO } = action.payload
      return {
        ...state,
        NEO
      }
    case SET_GAS_PRICE:
      const { GAS } = action.payload
      return {
        ...state,
        GAS
      }
    case SET_CURRENCY:
      const { currency } = action.payload
      return {
        ...state,
        NEO: 0,
        GAS: 0,
        currency
      }
    case RESET_PRICE:
      return {
        ...state,
        NEO: 0,
        GAS: 0
      }
    default:
      return state
  }
}
