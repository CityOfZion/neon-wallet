// @flow
import axios from 'axios'
import { createActions } from 'spunky'

import { getDefaultTokens } from '../core/nep5'
import { DEFAULT_CURRENCY_CODE, ASSETS } from '../core/constants'

type Props = {
  currency?: string
}

function mapPrices(pricingData: Array<any>, currency) {
  const mapping = {}
  const upperCasedCurrency = currency.toUpperCase()
  pricingData.forEach((price: { currency: { upperCasedCurrency: Object } }) => {
    const priceInSelectedCurrency = price[upperCasedCurrency]
    if (price && priceInSelectedCurrency) {
      mapping[priceInSelectedCurrency.FROMSYMBOL] = parseFloat(
        priceInSelectedCurrency.PRICE
      )
    }
  })

  return mapping
}

async function getPrices(currency) {
  const tokens = await getDefaultTokens()
  const joinedTokens = tokens
    .map(token => token.symbol)
    .concat([ASSETS.NEO, ASSETS.GAS])
    .join(',')
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`

  const priceDataResponse = await axios
    .get(url)
    .catch(e => Promise.reject(new Error(e)))

  const pricingArray = Object.values(priceDataResponse.data.RAW)

  return mapPrices(pricingArray, currency)
}

export const ID = 'prices'

export default createActions(
  ID,
  ({ currency = DEFAULT_CURRENCY_CODE }: Props = {}) => (state: Object) =>
    getPrices(currency)
)
