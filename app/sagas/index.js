// @flow
import { select, all, takeEvery } from 'redux-saga/effects'
import { type Saga } from 'redux-saga'

import batchSaga from './batchSaga'
import requestSaga from './requestSaga'
import { actionTypeMatcher } from '../util/api/matchers'
import { ACTION_REQUEST, BATCH_REQUEST, type ActionState } from '../values/api'

function batchAction (actionState: ActionState) {
  return actionTypeMatcher(BATCH_REQUEST)(actionState)
}

function requestAction (actionState: ActionState) {
  return actionTypeMatcher(ACTION_REQUEST)(actionState)
}

export default function * root (): Saga<void> {
  const state = yield select()

  yield all([
    takeEvery(batchAction, batchSaga, state),
    takeEvery(requestAction, requestSaga, state)
  ])
}
