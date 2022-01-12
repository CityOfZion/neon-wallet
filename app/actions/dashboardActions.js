// @flow
import { createBatchActions } from 'spunky'

import balancesActions from './balancesActions'
import claimsActions from './claimsActions'
import pricesActions from './pricesActions'
import priceHistoryActions from './priceHistoryActions'
import { blockHeightActions } from './blockHeightActions'
import { getPendingTransactionInfo } from './pendingTransactionActions'
import nftActions from './nftActions'

export const ID = 'dashboard'

export default createBatchActions(ID, {
  balances: balancesActions,
  nft: nftActions,
  claims: claimsActions,
  prices: pricesActions,
  priceHistory: priceHistoryActions,
  getPendingTransactionInfo,
  height: blockHeightActions,
})
