// @flow
import { progressValues, type Progress } from 'spunky'
import { every } from 'lodash'

const { LOADING, LOADED } = progressValues

function everLoaded (actionStates: Array<Object>): boolean {
  return every(actionStates, (actionState) => actionState.loadedCount > 0)
}

export default function everLoadedStrategy (actions: Array<Object>): Progress {
  if (everLoaded(actions)) {
    return LOADED
  } else {
    return LOADING
  }
}
