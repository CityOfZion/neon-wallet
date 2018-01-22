// @flow
import { some, every } from 'lodash'

import { LOADING, LOADED, FAILED, type ProgressState } from '../../../values/state'

function anyFailed (actionStates: Array<Object>): boolean {
  return some(actionStates, (actionState) => actionState.state === FAILED)
}

function alreadyLoaded (actionStates: Array<Object>): boolean {
  return every(actionStates, (actionState) => actionState.loadedCount > 0)
}

export default function alreadyLoadedStrategy (actions: Array<Object>): ProgressState {
  if (anyFailed(actions)) {
    return FAILED
  } else if (alreadyLoaded(actions)) {
    return LOADED
  } else {
    return LOADING
  }
}
