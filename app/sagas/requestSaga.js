// @flow
import { get } from 'lodash'
import { call, put, race, take } from 'redux-saga/effects'
import { type Saga } from 'redux-saga'

import { actionMatcher } from '../util/api/matchers'
import {
  ACTION_SUCCESS,
  ACTION_FAILURE,
  ACTION_RETRY,
  ACTION_RESET,
  ACTION_CANCEL,
  type Error,
  type Payload,
  type ActionMeta,
  type ActionState
} from '../values/api'

type SagaActions = {
  request: Function,
  success: Function,
  failure: Function
}

function createSagaActions (meta: ActionMeta): SagaActions {
  function * request (state: Object, payload: Payload, actions: SagaActions) {
    const { fn } = payload

    try {
      const result = yield call(fn, state)
      yield put(actions.success(result))
    } catch (err) {
      yield put(actions.failure(err.message))
    }
  }

  function success (result: any): ActionState {
    return {
      batch: false,
      type: `${meta.id}/${ACTION_SUCCESS}`,
      meta: { ...meta, type: ACTION_SUCCESS },
      payload: result
    }
  }

  function failure (error: Error): ActionState {
    return {
      batch: false,
      type: `${meta.id}/${ACTION_FAILURE}`,
      meta: { ...meta, type: ACTION_FAILURE },
      payload: error
    }
  }

  return { request, success, failure }
}

function retryAction (id: string): Function {
  return (actionState: ActionState) => {
    return actionMatcher(ACTION_RETRY, id)(actionState)
  }
}

export default function * requestSaga (state: Object, actionState: ActionState): Saga<boolean> {
  const id = get(actionState, 'meta.id')
  const sagaActions = createSagaActions(actionState.meta)

  yield race({
    request: call(sagaActions.request, state, actionState.payload, sagaActions),
    retry: take(retryAction(id)),
    cancel: take(actionMatcher(ACTION_CANCEL, id)),
    reset: take(actionMatcher(ACTION_RESET, id))
  })

  return true
}
