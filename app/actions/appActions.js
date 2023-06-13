// @flow
import { createBatchActions } from 'spunky'

import accountsActions from './accountsActions'
import settingsActions from './settingsActions'
import n3AccountsActions from './n3AccountsActions'

export const ID = 'app'

export default createBatchActions(ID, {
  accounts: accountsActions,
  n3Accounts: n3AccountsActions,
  settings: settingsActions,
})
