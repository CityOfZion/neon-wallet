// @flow
import { select, all, takeEvery } from 'redux-saga/effects'
import { type Saga } from 'redux-saga'

import batchSaga from './batchSaga'
import requestSaga from './requestSaga'
import { actionTypeMatcher } from '../util/api/matchers'
import {
  ACTION_REQUEST,
  BATCH_REQUEST,
  BATCH_RETRY,
  BATCH_RESET,
  BATCH_CANCEL,
  type ActionState
} from '../values/api'

const createMatchers = (actionTypes) => actionTypes.map(actionTypeMatcher)

const batchMatchers = createMatchers([BATCH_REQUEST, BATCH_RETRY, BATCH_RESET, BATCH_CANCEL])
const requestMatchers = createMatchers([ACTION_REQUEST])

function batchAction (actionState: ActionState) {
  return batchMatchers.some((matcher) => matcher(actionState))
}

function requestAction (actionState: ActionState) {
  return requestMatchers.some((matcher) => matcher(actionState))
}

export default function * root (): Saga<void> {
  const state = yield select()

  yield all([
    takeEvery(batchAction, batchSaga, state),
    takeEvery(requestAction, requestSaga, state)
  ])
}
