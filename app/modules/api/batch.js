// @flow
import { get, mapValues } from 'lodash'

import {
  BATCH_REQUEST,
  type ActionState
} from '../../values/api'

type State = {
  batch: true,
  mapping: null
}

const initialState: State = {
  batch: true,
  mapping: null
}

function createMapping (actionState: ActionState) {
  const { payload } = actionState

  if (typeof payload === 'object' && typeof payload.requests === 'object') {
    return mapValues(payload.requests, (request) => get(request, 'meta.id', null))
  } else {
    return []
  }
}

function reduceBatch (state: State = initialState, actionState: ActionState): Object {
  switch (actionState.meta.type) {
    case BATCH_REQUEST:
      return { ...state, mapping: createMapping(actionState) }
    default:
      return state
  }
}

export default function (state: Object = {}, actionState: ActionState): Object {
  const { id, type } = actionState.meta

  if (type) {
    return {
      ...state,
      [id]: reduceBatch(state[id], actionState)
    }
  } else {
    return state
  }
}
