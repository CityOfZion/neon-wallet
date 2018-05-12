// @flow
import { createBatchActions } from 'spunky'

import balancesActions from './balancesActions'
import claimsActions from './claimsActions'
import transactionHistoryActions from './transactionHistoryActions'

export const ID = 'account'

export default createBatchActions(ID, {
  balances: balancesActions,
  claims: claimsActions,
  transactions: transactionHistoryActions
})
