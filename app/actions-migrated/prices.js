// @flow
import create from 'zustand'
import axios from 'axios'
import { get } from 'lodash-es'

import { ASSETS } from '../core/constants'
import { toFixedDecimals } from '../core/formatters'
import { getSettings } from '../context/settings/SettingsContext'
import { getDefaultTokens } from '../core/nep5'

const usePricesStore = create(set => ({
  prices: {},
  priceRequestAttempts: 0,
  getPriceApiSymbolExceptions: tokens => {
    const directMap = {}
    const reverseMap = {}

    tokens.forEach(token => {
      if (
        token.symbol !== undefined &&
        token.cryptocompareSymbol !== undefined
      ) {
        directMap[token.symbol] = token.cryptocompareSymbol
        reverseMap[token.cryptocompareSymbol] = token.symbol
      }
    })

    set({ directMap, reverseMap })
  },
  mapPrices: (pricingData, currency) => {
    const upperCasedCurrency = currency.toUpperCase()
    const prices = pricingData.reduce((accum, price) => {
      const priceInSelectedCurrency = price[upperCasedCurrency]
      if (price && priceInSelectedCurrency) {
        accum[priceInSelectedCurrency.FROMSYMBOL] = parseFloat(
          priceInSelectedCurrency.PRICE,
        )
      }
      return accum
    }, {})
    set({ prices })
  },
  apiCall: async url => {
    try {
      const priceDataResponse = await axios.get(url)
      if (priceDataResponse !== undefined && priceDataResponse !== null) {
        return Object.values(priceDataResponse.data.RAW)
      }
    } catch (error) {
      console.error(`Unable to retrieve prices from the api ${url}`, error)
    }
    return []
  },
  apiCallWrapper: async (url, currency) => {
    const pricingArray = await usePricesStore.getState().apiCall(url)
    if (pricingArray !== []) {
      usePricesStore.getState().mapPrices(pricingArray, currency)
    }
  },
  getPrices: async (useFallbackApi = false) => {
    if (!useFallbackApi) set({ priceRequestAttempts: 0 })
    try {
      const tokens = await getDefaultTokens()
      usePricesStore.getState().getPriceApiSymbolExceptions(tokens)

      const settings = await getSettings()
      const { currency } = settings
      const joinedTokens = tokens
        .map(token =>
          get(usePricesStore.getState().directMap, token.symbol, token.symbol),
        )
        .concat([ASSETS.NEO, ASSETS.GAS])
        .join(',')

      const url = useFallbackApi
        ? `https://dora.coz.io/data/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`
        : `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`
      await usePricesStore.getState().apiCallWrapper(url, currency)

      const neoPricesUrl = useFallbackApi
        ? `https://dora.coz.io/data/data/pricemultifull?fsyms=${joinedTokens}&tsyms=NEO`
        : `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=NEO`
      await usePricesStore.getState().apiCallWrapper(neoPricesUrl, 'NEO')

      const { prices, reverseMap } = usePricesStore.getState()

      Object.entries(prices).forEach(([key, value]) => {
        prices[get(reverseMap, key, key)] = value
      })

      if (!prices.NEO && usePricesStore.getState().priceRequestAttempts < 2) {
        set({
          priceRequestAttempts:
            usePricesStore.getState().priceRequestAttempts + 1,
        })
        await usePricesStore.getState().getPrices(true)
      }

      set({ prices })
    } catch (error) {
      if (usePricesStore.getState().priceRequestAttempts < 2) {
        set({
          priceRequestAttempts:
            usePricesStore.getState().priceRequestAttempts + 1,
        })
        await usePricesStore.getState().getPrices(true)
      }
      console.error('An error occurred getting price data', { error })
    }
  },
  getPricesFromFlamingo: async () => {
    const settings = await getSettings()
    const { currency } = settings
    const EXCHANGE_RATE_URL = `https://api.flamingo.finance/fiat/exchange-rate?pair=USD_${currency.toUpperCase()}`
    let exchangeRate = 1

    if (currency !== 'usd') {
      const results = await axios.get(EXCHANGE_RATE_URL).catch(error => {
        console.error(
          `Unable to retrieve prices from the api ${EXCHANGE_RATE_URL}`,
          error,
        )
        return 1
      })
      exchangeRate = results.data || 1
    }

    // Because all pairs are returned in their USD value
    // we first check the exchange rate for all currency other than USD
    const url = 'https://api.flamingo.finance/token-info/prices'
    const results = await axios.get(url).catch(error => {
      console.error(`Unable to retrieve prices from the api ${url}`, error)
      return undefined
    })
    if (!results) {
      return set({ prices: {} })
    }
    const prices = results.data.reduce((accum, curr) => {
      accum[curr.symbol] = curr.usd_price * exchangeRate
      return accum
    }, {})
    return set({ prices })
  },
}))

export default usePricesStore
