// @flow
import { get } from 'lodash'

import {
  BATCH_REQUEST, BATCH_RETRY, BATCH_CANCEL, BATCH_SUCCESS, BATCH_FAILURE, BATCH_RESET,
  ACTION_REQUEST, ACTION_RETRY, ACTION_CANCEL, ACTION_SUCCESS, ACTION_FAILURE, ACTION_RESET
} from '../../values/api'

const ACTION_TYPES = [
  BATCH_REQUEST, BATCH_RETRY, BATCH_CANCEL, BATCH_SUCCESS, BATCH_FAILURE, BATCH_RESET,
  ACTION_REQUEST, ACTION_RETRY, ACTION_CANCEL, ACTION_SUCCESS, ACTION_FAILURE, ACTION_RESET
]

function isApiAction (action: Object): boolean {
  const actionType = get(action, 'meta.type')
  return ACTION_TYPES.includes(actionType)
}

export function isBatch (action: Object): boolean {
  return isApiAction(action) && action.batch === true
}

export function isRequest (action: Object): boolean {
  return isApiAction(action) && action.batch === false
}
