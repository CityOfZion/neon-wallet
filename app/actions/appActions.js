// @flow
import { createBatchActions } from 'spunky'

import accountsActions from './accountsActions'
import blockHeightActions from './blockHeightActions'
import priceHistoryActions from './priceHistoryActions'
import settingsActions from './settingsActions'

export const ID = 'APP'

export default createBatchActions(ID, {
  accounts: accountsActions,
  blockHeight: blockHeightActions,
  priceHistory: priceHistoryActions,
  settings: settingsActions
})
