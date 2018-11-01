// @flow
import axios from 'axios'
import { createActions } from 'spunky'

import { getDefaultTokens } from '../core/nep5'
import { getSettings } from './settingsActions'
import { DEFAULT_CURRENCY_CODE, ASSETS } from '../core/constants'

type Props = {
  currency?: string
}

function mapPrices(pricingData: Array<any>, currency) {
  const upperCasedCurrency = currency.toUpperCase()
  return pricingData.reduce(
    (accum: Object, price: { currency: { upperCasedCurrency: Object } }) => {
      const priceInSelectedCurrency = price[upperCasedCurrency]
      if (price && priceInSelectedCurrency) {
        // eslint-disable-next-line
        accum[priceInSelectedCurrency.FROMSYMBOL] = parseFloat(
          priceInSelectedCurrency.PRICE
        )
      }
      return accum
    },
    {}
  )
}

async function getPrices() {
  try {
    const tokens = await getDefaultTokens()
    const settings = await getSettings()
    const { currency } = settings
    const joinedTokens = tokens
      .map(token => token.symbol)
      .concat([ASSETS.NEO, ASSETS.GAS])
      .join(',')

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${joinedTokens}&tsyms=${currency.toUpperCase()}`

    const priceDataResponse = await axios.get(url)
    const pricingArray = Object.values(priceDataResponse.data.RAW)
    return mapPrices(pricingArray, currency)
  } catch (error) {
    console.error('An error occurred getting price data', { error })
    return {}
  }
}

export const ID = 'prices'

export default createActions(
  ID,
  ({ currency = DEFAULT_CURRENCY_CODE }: Props = {}) => (state: Object) =>
    getPrices()
)
