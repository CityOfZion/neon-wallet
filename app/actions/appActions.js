// @flow
import createBatchActions from '../util/api/createBatchActions'

import blockHeightActions from './blockHeightActions'
import settingsActions from './settingsActions'

export const ID = 'APP'

export default createBatchActions(ID, {
  blockHeight: blockHeightActions,
  settings: settingsActions
})
