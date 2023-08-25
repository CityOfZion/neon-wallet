// @flow
import { createBatchActions } from 'spunky'

import settingsActions from './settingsActions'

export const ID = 'app'

export default createBatchActions(ID, {
  settings: settingsActions,
})
