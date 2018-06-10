// @flow
import { createBatchActions } from 'spunky'

import priceHistoryActions from './priceHistoryActions'
import pricesActions from './pricesActions'

export const ID = 'priceHistoryPanel'

export default createBatchActions(ID, {
  prices: priceHistoryActions,
  staticPrices: pricesActions
})
