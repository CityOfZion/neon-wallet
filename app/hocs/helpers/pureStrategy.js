// @flow
import { progressValues, type Progress } from 'spunky'
import { map, uniq, find } from 'lodash'

const { INITIAL, LOADING, LOADED, FAILED } = progressValues

export default function pureStrategy (actionStates: Array<Object>): Progress {
  const currentProgresses = uniq(map(actionStates, 'progress'))

  const prioritizedProgress = find([INITIAL, FAILED, LOADING, LOADED], (progress) => {
    return currentProgresses.includes(progress)
  })

  return prioritizedProgress || INITIAL
}
