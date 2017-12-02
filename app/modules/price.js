// @flow
import axios from 'axios'
import asyncWrap from '../core/asyncHelper'
import { DEFAULT_CURRENCY_CODE } from '../core/constants'

/* @todo remove below when we upgrade neon-js and can use their getPrice function */
const CURRENCY = ['aud', 'brl', 'cad', 'chf', 'clp', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hkd', 'huf', 'idr', 'ils', 'inr', 'jpy', 'krw', 'mxn', 'myr', 'nok', 'nzd', 'php', 'pkr', 'pln', 'rub', 'sek', 'sgd', 'thb', 'try', 'twd', 'zar']

/**
 * Returns the price of coin in the symbol given
 * @param {string} coin - Coin name. NEO or GAS.
 * @param {string} currency - Three letter currency symbol.
 * @return {Promise<number>} price
 */
export const getPrice = (coin = 'NEO', currency = DEFAULT_CURRENCY_CODE) => {
  currency = currency.toLowerCase()
  if (currency === 'usd' || CURRENCY.includes(currency)) {
    return axios.get(`https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=${currency}`)
      .then((res) => {
        const data = res.data
        if (data.error) throw new Error(data.error)
        const price = data[0][`price_${currency.toLowerCase()}`]
        if (price) return parseFloat(price)
        else throw new Error(`Something went wrong with the CoinMarketCap API!`)
      })
  } else {
    return Promise.reject(new ReferenceError(`${currency} is not one of the accepted currencies!`))
  }
}

/* Remove above when we upgrade neon-js and can use their getPrice function */

// Constants
export const SET_NEO_PRICE = 'SET_NEO_PRICE'
export const SET_GAS_PRICE = 'SET_GAS_PRICE'
export const RESET_PRICE = 'RESET_PRICE'
export const SET_CURRENCY = 'SET_CURRENCY'

// Actions
export function setNEOPrice (neo: number) {
  return {
    type: SET_NEO_PRICE,
    payload: { neo }
  }
}

export function setGASPrice (gas: number) {
  return {
    type: SET_GAS_PRICE,
    payload: { gas }
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
  const [_err, price] = await asyncWrap(getPrice('NEO', getCurrency(getState()))) // eslint-disable-line
  return dispatch(setNEOPrice(price))
}

export const getGasMarketPriceUSD = () => async (dispatch: DispatchType, getState: GetStateType) => {
  // If API dies, still display balance - ignore _err
  const [_err, price] = await asyncWrap(getPrice('GAS', getCurrency(getState()))) // eslint-disable-line
  return dispatch(setGASPrice(price))
}

// state getters
export const getNEOPrice = (state) => state.price.neo
export const getGASPrice = (state) => state.price.gas
export const getCurrency = (state) => state.price.currency

const initialState = {
  neo: 0,
  gas: 0,
  currency: DEFAULT_CURRENCY_CODE
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_NEO_PRICE:
      const { neo } = action.payload
      return {
        ...state,
        neo
      }
    case SET_GAS_PRICE:
      const { gas } = action.payload
      return {
        ...state,
        gas
      }
    case SET_CURRENCY:
      const { currency } = action.payload
      return {
        ...state,
        neo: 0,
        gas: 0,
        currency
      }
    case RESET_PRICE:
      return {
        ...state,
        neo: 0,
        gas: 0
      }
    default:
      return state
  }
}
