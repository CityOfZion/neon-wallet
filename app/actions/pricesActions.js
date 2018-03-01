// @flow
import axios from 'axios'
import { createActions } from 'spunky'

import { DEFAULT_CURRENCY_CODE } from '../core/constants'

type Props = {
  currency?: string
}

function mapPrices (tickers, currency) {
  const mapping = {}

  tickers.forEach((ticker) => {
    mapping[ticker.symbol] = parseFloat(ticker[`price_${currency.toLowerCase()}`])
  })

  return mapping
}

function getPrices (currency) {
  const url = `https://api.coinmarketcap.com/v1/ticker/?limit=0&convert=${currency.toLowerCase()}`

  return axios.get(url).then((response) => {
    const { data } = response
    if (data.error) throw new Error(data.error)
    return mapPrices(data, currency)
  })
}

export const ID = 'PRICES'

export default createActions(ID, ({ currency = DEFAULT_CURRENCY_CODE }: Props = {}) => (state: Object) => {
  return getPrices(currency)
})
