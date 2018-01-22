// @flow
import { api } from 'neon-js'

import asyncWrap from '../core/asyncHelper'
import { getCurrency } from '../core/deprecated'

// Constants
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICE = 'RESET_PRICE'

// Actions
export const setNEOPrice = (NEO: string) => ({
  type: SET_NEO_PRICE,
  payload: { NEO }
})

export const setGASPrice = (GAS: string) => ({
  type: SET_GAS_PRICE,
  payload: { GAS }
})

export function resetPrice () {
  return {
    type: RESET_PRICE
  }
}

export const getMarketPriceUSD = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  // If API dies, still display balance - ignore _err
  // eslint-disable-next-line
  const [_err, price] = await asyncWrap(
    api.cmc.getPrice('NEO', getCurrency(getState()))
  )
  return dispatch(setNEOPrice(price))
}

export const getGasMarketPriceUSD = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  // If API dies, still display balance - ignore _err
  // eslint-disable-next-line
  const [_err, price] = await asyncWrap(
    api.cmc.getPrice('GAS', getCurrency(getState()))
  )
  return dispatch(setGASPrice(price))
}

// state getters
export const getNEOPrice = (state: Object) => state.price.NEO
export const getGASPrice = (state: Object) => state.price.GAS

const initialState = {
  NEO: 0,
  GAS: 0
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
