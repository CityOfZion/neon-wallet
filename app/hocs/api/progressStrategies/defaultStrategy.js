// @flow
import { some, every } from 'lodash'

import { LOADING, LOADED, FAILED, type ProgressState } from '../../../values/state'

function anyFailed (actionStates: Array<Object>): boolean {
  return some(actionStates, (actionState) => actionState.state === FAILED)
}

function allLoaded (actionStates: Array<Object>): boolean {
  return every(actionStates, (actionState) => actionState.state === LOADED)
}

export default function defaultStrategy (actions: Array<Object>): ProgressState {
  if (anyFailed(actions)) {
    return FAILED
  } else if (allLoaded(actions)) {
    return LOADED
  } else {
    return LOADING
  }
}
