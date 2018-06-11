// @flow
import { createBatchActions } from 'spunky'

import accountsActions from './accountsActions'
import settingsActions from './settingsActions'

export const ID = 'APP'

export default createBatchActions(ID, {
  accounts: accountsActions,
  settings: settingsActions
})
