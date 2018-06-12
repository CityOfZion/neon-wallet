// @flow
import { createBatchActions } from 'spunky'

import networkActions from './networkActions'
import accountsActions from './accountsActions'
import settingsActions from './settingsActions'
import contactsActions from './contactsActions'

export const ID = 'app'

export default createBatchActions(ID, {
  network: networkActions,
  accounts: accountsActions,
  settings: settingsActions,
  contacts: contactsActions
})
