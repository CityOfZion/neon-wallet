// @flow
import axios from 'axios'
import { createActions } from 'spunky'
import { toUpper } from 'lodash-es'

import { ASSETS, DEFAULT_CURRENCY_CODE } from '../core/constants'

type Duration = '1m' | '1w' | '1d'

type Props = {
  currency?: string,
  duration: Duration
}

export const ID = 'priceHistory'

const createFetch = (
  symbol: SymbolType,
  currency: string,
  call: string,
  options: Object
) =>
  axios.get(`https://min-api.cryptocompare.com/data/${call}`, {
    params: {
      ...options,
      fsym: toUpper(symbol),
      tsym: toUpper(currency)
    }
  })

const fetchPriceHistory = (
  symbol: SymbolType,
  currency: string,
  duration: Duration
): Promise<Object> => {
  switch (duration) {
    case '1d':
      return createFetch(symbol, currency, 'histohour', { limit: 24 })
    case '1w':
      return createFetch(symbol, currency, 'histohour', { limit: 168 })
    case '1m':
    default:
      return createFetch(symbol, currency, 'histoday', { limit: 30 })
  }
}

export default createActions(
  ID,
  ({
    currency = DEFAULT_CURRENCY_CODE,
    duration = '1d'
  }: Props = {}) => async () => {
    const [neo, gas] = await Promise.all([
      fetchPriceHistory(ASSETS.NEO, currency, duration),
      fetchPriceHistory(ASSETS.GAS, currency, duration)
    ])

    return {
      [ASSETS.NEO]: neo.data.Data,
      [ASSETS.GAS]: gas.data.Data
    }
  }
)
