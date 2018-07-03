// @flow
import { createBatchActions } from 'spunky'

import dashboardActions from './dashboardActions'
import claimsActions from './claimsActions'
import transactionHistoryActions from './transactionHistoryActions'

export const ID = 'ACCOUNT'

export default createBatchActions(ID, {
  dashboard: dashboardActions,
  claims: claimsActions,
  transactions: transactionHistoryActions
})
