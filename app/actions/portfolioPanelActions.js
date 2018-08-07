// @flow
import { createBatchActions } from 'spunky'

import pricesActions from './pricesActions'
import settingsActions from './settingsActions'

export const ID = 'portfolioPanel'

export default createBatchActions(ID, {
  prices: pricesActions,
  balances: settingsActions
})
