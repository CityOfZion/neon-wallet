// @flow
import { mapValues } from 'lodash'

import {
  BATCH_REQUEST,
  BATCH_RETRY,
  BATCH_CANCEL,
  BATCH_SUCCESS,
  BATCH_FAILURE,
  BATCH_RESET,
  type Actions,
  type ActionState,
  type ActionTypeMap,
  type RequestMapping
} from '../../values/api'

const actionTypes: ActionTypeMap = {
  REQUEST: BATCH_REQUEST,
  RETRY: BATCH_RETRY,
  CANCEL: BATCH_CANCEL,
  SUCCESS: BATCH_SUCCESS,
  FAILURE: BATCH_FAILURE,
  RESET: BATCH_RESET
}

function mapActions (actionsMap: Object, actionName: string, props: Object = {}): RequestMapping {
  return mapValues(actionsMap, (actions: Actions) => actions[actionName](props))
}

export default function createBatchActions (id: string, actionsMap: Object): Actions {
  const request = (props: Object): ActionState => ({
    batch: true,
    type: actionTypes.REQUEST,
    meta: { type: BATCH_REQUEST, id },
    payload: { requests: mapActions(actionsMap, 'request', props) }
  })

  const retry = (props: Object): ActionState => ({
    batch: true,
    type: actionTypes.RETRY,
    meta: { type: BATCH_RETRY, id },
    payload: { requests: mapActions(actionsMap, 'retry', props) }
  })

  const cancel = (): ActionState => ({
    batch: true,
    type: actionTypes.CANCEL,
    meta: { type: BATCH_CANCEL, id }
  })

  const reset = (): ActionState => ({
    batch: true,
    type: actionTypes.RESET,
    meta: { type: BATCH_RESET, id }
  })

  return { id, request, retry, cancel, reset, actionTypes }
}
