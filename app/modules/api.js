// @flow
import { get } from 'lodash'

import {
  ACTION_REQUEST,
  ACTION_SUCCESS,
  ACTION_FAILURE,
  ACTION_RESET,
  ACTION_CANCEL,
  type Data,
  type Error,
  type ActionState
} from '../values/api'

import {
  INITIAL,
  LOADING,
  LOADED,
  FAILED,
  type ProgressState
} from '../values/state'

type State = {
  state: ProgressState,
  rollbackState: ProgressState | null,
  data: Data,
  error: Error
}

const initialState: State = {
  state: INITIAL,
  rollbackState: null,
  data: null,
  error: null
}

function reduceRequest (state: State = initialState, actionState: ActionState): Object {
  const requestType = get(actionState, 'meta.type')

  switch (requestType) {
    case ACTION_REQUEST:
      return { ...state, state: LOADING, rollbackState: state.state }
    case ACTION_SUCCESS:
      return { ...state, state: LOADED, rollbackState: LOADED, data: actionState.payload }
    case ACTION_FAILURE:
      return { ...state, state: FAILED, rollbackState: FAILED, error: actionState.payload }
    case ACTION_RESET:
      return { ...state, ...initialState }
    case ACTION_CANCEL:
      return { ...state, state: state.rollbackState }
    default:
      return state
  }
}

export default function apiReducer (state: Object = {}, actionState: ActionState): Object {
  const requestId = get(actionState, 'meta.id')
  const requestType = get(actionState, 'meta.type')

  if (requestType) {
    return {
      ...state,
      [requestId]: reduceRequest(state[requestId], actionState)
    }
  } else {
    return state
  }
}
