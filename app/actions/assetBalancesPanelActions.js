// @flow
import { createBatchActions } from 'spunky'

import pricesActions from './pricesActions'
import priceHistoryActions from './priceHistoryActions'
import claimsActions from './claimsActions'
import balancesActions from './balancesActions'

export const ID = 'assetBalancesPanel'

export default createBatchActions(ID, {
  prices: pricesActions,
  priceHistory: priceHistoryActions,
  claims: claimsActions,
  // balances: balancesActions,
})
