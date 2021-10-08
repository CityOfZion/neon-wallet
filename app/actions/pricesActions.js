// @flow
import axios from 'axios'
import { createActions } from 'spunky'
import { get, isEmpty, map } from 'lodash-es'

import { getDefaultTokens } from '../core/nep5'
import { getSettings } from './settingsActions'
import { ASSETS } from '../core/constants'
import { toFixedDecimals } from '../core/formatters'

const getPriceApiSymbolExceptions = (tokens: Array<TokenItemType>) => {
  const directMap = {}
  const reverseMap = {}

  map(tokens, token => {
    if (token.symbol !== undefined && token.cryptocompareSymbol !== undefined) {
      directMap[token.symbol] = token.cryptocompareSymbol
      // $FlowFixMe
      reverseMap[token.cryptocompareSymbol] = token.symbol
    }
  })

  return { direct: directMap, reverse: reverseMap }
}

function mapPrices(pricingData: Array<any>, currency) {
  const upperCasedCurrency = currency.toUpperCase()
  return pricingData.reduce(
    (accum: Object, price: { currency: { upperCasedCurrency: Object } }) => {
      const priceInSelectedCurrency = price[upperCasedCurrency]
      if (price && priceInSelectedCurrency) {
        // eslint-disable-next-line
        accum[priceInSelectedCurrency.FROMSYMBOL] = parseFloat(
          priceInSelectedCurrency.PRICE,
        )
      }
      return accum
    },
    {},
  )
}

const apiCall = async url => {
  const priceDataResponse = await axios.get(url).catch(error => {
    console.error(`Unable to retrieve prices from the api ${url}`, error)
    return undefined
  })

  if (priceDataResponse !== undefined && priceDataResponse !== null) {
    return Object.values(priceDataResponse.data.RAW)
  }

  return []
}

const apiCallWrapper = async (url, currency) => {
  const pricingArray = await apiCall(url)
  if (pricingArray !== []) {
    return mapPrices(pricingArray, currency)
  }
  return {}
}

let PRICE_REQUEST_ATTEMPTS = 0
async function getPrices(useFallbackApi = false) {
  if (!useFallbackApi) PRICE_REQUEST_ATTEMPTS = 0
  try {
    const tokens = await getDefaultTokens()
    const PRICE_API_SYMBOL_EXCEPTIONS = getPriceApiSymbolExceptions(tokens)

    const settings = await getSettings()
    const { currency } = settings
    const joinedTokens = tokens
      .map((token: TokenItemType) =>
        // We pass to the cryptocompare api the token cryptocompareSymbol
        // if they are available. Otherwise we pass the token symbol.
        get(PRICE_API_SYMBOL_EXCEPTIONS.direct, token.symbol, token.symbol),
      )
      .concat([ASSETS.NEO, ASSETS.GAS])
      .join(',')

    const url = useFallbackApi
      ? `http://54.227.25.52:8090/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`
      : `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`
    const prices = await apiCallWrapper(url, currency)

    // We need to perform a second api call because there may be token that have price listed only in relationship to NEO.
    // As of now, (27.07.2019), for instance NEX price can't be retrieve via the first api call above.
    // Therefore we need a second api call with currency NEO.
    const url2 = useFallbackApi
      ? `http://54.227.25.52:8090/data/pricemultifull?fsyms=${joinedTokens}&tsyms=NEO`
      : `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=NEO`
    const neoPrices = await apiCallWrapper(url2, 'NEO')

    // Build final prices map
    Object.entries(neoPrices).forEach(([key, value]) => {
      if (!(key in prices)) {
        prices[key] = toFixedDecimals(parseFloat(value) * prices.NEO, 2)
      }
    })

    // Within the neon-wallet app, we use the token's symbol to retrieve the token's price.
    // Therefore if any key in the price object is a "cryptocompare" symbol,
    // we have to replace it by the corresponding token's symbol.
    Object.entries(prices).forEach(([key, value]) => {
      prices[get(PRICE_API_SYMBOL_EXCEPTIONS.reverse, key, key)] = value
    })

    if (!prices.NEO && PRICE_REQUEST_ATTEMPTS < 2) {
      PRICE_REQUEST_ATTEMPTS += 1
      return getPrices(true)
    }
    return prices
  } catch (error) {
    console.error('An error occurred getting price data', { error })
    return {}
  }
}

export const ID = 'prices'

export default createActions(ID, () => () => getPrices())
