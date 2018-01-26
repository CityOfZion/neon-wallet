// @flow
import createBatchActions from '../util/api/createBatchActions'
import balancesActions from './balancesActions'
import claimsActions from './claimsActions'

export const ID = 'ACCOUNT'

export default createBatchActions(ID, {
  balances: balancesActions,
  claims: claimsActions
})
