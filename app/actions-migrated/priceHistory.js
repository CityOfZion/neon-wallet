// @flow
import axios from 'axios'
import { toUpper } from 'lodash-es'
import create from 'zustand'

import { ASSETS, DEFAULT_CURRENCY_CODE } from '../core/constants'

type Duration = '1m' | '1w' | '1d'

type Props = {
  currency?: string,
  duration: Duration,
}

const usePriceHistoryStore = create(set => ({
  priceHistory: {},
  fetchPriceHistory: async (symbol, currency, duration) => {
    const createFetch = (call, options) =>
      axios.get(`https://min-api.cryptocompare.com/data/${call}`, {
        params: {
          ...options,
          fsym: toUpper(symbol),
          tsym: toUpper(currency),
        },
      })

    switch (duration) {
      case '1d':
        return createFetch('histohour', { limit: 24 })
      case '1w':
        return createFetch('histohour', { limit: 168 })
      case '1m':
      default:
        return createFetch('histoday', { limit: 30 })
    }
  },
  getPriceHistory: async (
    currency = DEFAULT_CURRENCY_CODE,
    duration = '1d',
  ) => {
    const [neo, gas] = await Promise.all([
      usePriceHistoryStore
        .getState()
        .fetchPriceHistory(ASSETS.NEO, currency, duration),
      usePriceHistoryStore
        .getState()
        .fetchPriceHistory(ASSETS.GAS, currency, duration),
    ])

    set({
      priceHistory: {
        [ASSETS.NEO]: neo.data.Data,
        [ASSETS.GAS]: gas.data.Data,
      },
    })
  },
}))

export default usePriceHistoryStore
