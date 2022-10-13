// @flow
import { createBatchActions } from 'spunky'

import balancesActions from './balancesActions'
import claimsActions from './claimsActions'
import pricesActions from './pricesActions'
import transactionHistoryActions from './transactionHistoryActions'
import { getPendingTransactionInfo } from './pendingTransactionActions'
import { blockHeightActions } from './blockHeightActions'
import nftActions from './nftActions'
import nftGalleryActions from './nftGalleryActions'

export const ID = 'account'

export default createBatchActions(ID, {
  balances: balancesActions,
  claims: claimsActions,
  transactions: transactionHistoryActions,
  pendingTransactionsInfo: getPendingTransactionInfo,
  prices: pricesActions,
  blockHeight: blockHeightActions,
  nft: nftActions,
  nftGallery: nftGalleryActions,
})
