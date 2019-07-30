// @flow
import axios from 'axios'
import { createActions } from 'spunky'
import { get, map } from 'lodash-es'

import { getDefaultTokens } from '../core/nep5'
import { getSettings } from './settingsActions'
import { ASSETS } from '../core/constants'

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
  const prices = pricingData.reduce(
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

  return prices
}

const apiCall = async url => {
  const priceDataResponse = await axios.get(url)
  return Object.values(priceDataResponse.data.RAW)
}

const apiCallWrapper = async (url, currency) => {
  const pricingArray = await apiCall(url)
  return mapPrices(pricingArray, currency)
}

async function getPrices() {
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

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`
    const prices = await apiCallWrapper(url, currency)

    // We need to perform a second api call because there may be token that have price listed only in relationship to NEO.
    // As of now, (27.07.2019), for instance NEX price can't be retrieve via the first api call above.
    // Therefore we need a second api call with currency NEO.
    const url2 = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=NEO`
    const neoPrices = await apiCallWrapper(url2, 'NEO')

    // Build final prices map
    Object.entries(neoPrices).forEach(([key, value]) => {
      if (!(key in prices)) {
        prices[key] = parseFloat(value) * prices.NEO
      }
    })

    // Adjust price map keys: within the app we use the token symbol to retrieve the price.
    // Therefore we need to replace the token cryptocompareSimbol key with the corrisponding token
    // Symbol.
    Object.entries(prices).forEach(([key, value]) => {
      prices[get(PRICE_API_SYMBOL_EXCEPTIONS.reverse, key, key)] = value
    })

    return prices
  } catch (error) {
    console.error('An error occurred getting price data', { error })
    return {}
  }
}

export const ID = 'prices'

export default createActions(ID, () => () => getPrices())
