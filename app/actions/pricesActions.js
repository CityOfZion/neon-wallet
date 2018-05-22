// @flow
import { api } from 'neon-js'
import { createActions } from 'spunky'

import { ASSETS, DEFAULT_CURRENCY_CODE } from '../core/constants'

type Props = {
  symbols?: Array<string>,
  currency?: string
}

export const ID = 'PRICES'

export default createActions(
  ID,
  ({
    symbols = [ASSETS.NEO, ASSETS.GAS],
    currency = DEFAULT_CURRENCY_CODE
  }: Props = {}) => (state: Object): ?Prices => {
    return api.cmc.getPrices(symbols, currency)
  }
)
