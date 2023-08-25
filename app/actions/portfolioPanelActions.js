// @flow
import { createBatchActions } from 'spunky'

import pricesActions from './pricesActions'

export const ID = 'portfolioPanel'

export default createBatchActions(ID, {
  prices: pricesActions,
})
