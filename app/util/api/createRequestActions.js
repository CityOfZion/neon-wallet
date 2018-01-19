// @flow
import {
  ACTION_REQUEST,
  ACTION_RETRY,
  ACTION_CANCEL,
  ACTION_SUCCESS,
  ACTION_FAILURE,
  ACTION_RESET,
  type Actions,
  type ActionState,
  type ActionTypeMap
} from '../../values/api'

const createActionTypes = (statePath: string): ActionTypeMap => ({
  REQUEST: `${statePath}/${ACTION_REQUEST}`,
  RETRY: `${statePath}/${ACTION_RETRY}`,
  CANCEL: `${statePath}/${ACTION_CANCEL}`,
  SUCCESS: `${statePath}/${ACTION_SUCCESS}`,
  FAILURE: `${statePath}/${ACTION_FAILURE}`,
  RESET: `${statePath}/${ACTION_RESET}`
})

export default function createRequestActions (id: string, createAdaptor: Function): Actions {
  const actionTypes = createActionTypes(id)

  const request = (props: Object): ActionState => ({
    batch: false,
    type: actionTypes.REQUEST,
    meta: { type: ACTION_REQUEST, id },
    payload: { fn: createAdaptor(props) }
  })

  const retry = (props: Object): ActionState => ({
    batch: false,
    type: actionTypes.RETRY,
    meta: { type: ACTION_RETRY, id },
    payload: { fn: createAdaptor(props) }
  })

  const cancel = (): ActionState => ({
    batch: false,
    type: actionTypes.CANCEL,
    meta: { type: ACTION_CANCEL, id }
  })

  const reset = (): ActionState => ({
    batch: false,
    type: actionTypes.RESET,
    meta: { type: ACTION_RESET, id }
  })

  return { id, request, retry, cancel, reset, actionTypes }
}
