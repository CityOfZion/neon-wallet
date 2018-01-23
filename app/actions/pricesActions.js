// @flow
import { api } from 'neon-js'

import createRequestActions from '../util/api/createRequestActions'
import { ASSETS, DEFAULT_CURRENCY_CODE } from '../core/constants'

type Props = {
  symbols?: Array<string>,
  currency?: string
}

export const ID = 'PRICES'

export default createRequestActions(ID, ({ symbols = [ASSETS.NEO, ASSETS.GAS], currency = DEFAULT_CURRENCY_CODE }: Props = {}) => (state: Object) => {
  return api.cmc.getPrices(symbols, currency)
})
