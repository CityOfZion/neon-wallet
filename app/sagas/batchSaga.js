// @flow
import { map } from 'lodash'
import { put, take, race, all, call } from 'redux-saga/effects'
import { type Saga } from 'redux-saga'

import { actionMatcher } from '../util/api/matchers'
import {
  BATCH_SUCCESS,
  BATCH_FAILURE,
  BATCH_RETRY,
  BATCH_RESET,
  BATCH_CANCEL,
  type Error,
  type ActionMeta,
  type ActionState,
  type ActionStateMap
} from '../values/api'

type SagaActions = {
  request: Function,
  success: Function,
  failure: Function
}

function createSagaActions (meta: ActionMeta): SagaActions {
  function * delegateAction (actionState: ActionState) {
    yield put(actionState)
  }

  function * request (state: Object, requests: ActionStateMap) {
    yield all(map(requests, delegateAction))
    return true
  }

  function success (): ActionState {
    return {
      batch: true,
      type: `${meta.id}/${BATCH_SUCCESS}`,
      meta: { ...meta, type: BATCH_SUCCESS }
    }
  }

  function failure (error: Error): ActionState {
    return {
      batch: true,
      type: `${meta.id}/${BATCH_FAILURE}`,
      meta: { ...meta, type: BATCH_FAILURE },
      payload: error
    }
  }

  return { request, success, failure }
}

export default function * batchSaga (state: Object, actionState: ActionState): Saga<boolean> {
  const { id } = actionState.meta
  const { payload } = actionState

  if (!payload || !payload.requests) {
    return false
  }

  const sagaActions = createSagaActions(actionState.meta)

  try {
    const { cancel } = yield race({
      request: call(sagaActions.request, state, payload.requests),
      retry: take(actionMatcher(BATCH_RETRY, id)),
      cancel: take(actionMatcher(BATCH_CANCEL, id)),
      reset: take(actionMatcher(BATCH_RESET, id))
    })

    if (!cancel) {
      yield put(sagaActions.success())
    }
  } catch (err) {
    console.error(`${id} batch action failed.`, err)
    yield put(sagaActions.failure(err.message))
  }

  return true
}
