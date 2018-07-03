// @flow
import { createBatchActions } from 'spunky'

import balancesAndBlockHeightActions from './balancesAndBlockHeightActions'
import claimsActions from './claimsActions'
import transactionHistoryActions from './transactionHistoryActions'

export const ID = 'ACCOUNT'

export default createBatchActions(ID, {
  balances: balancesAndBlockHeightActions,
  claims: claimsActions,
  transactions: transactionHistoryActions
})
