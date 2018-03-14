import { call, take } from 'redux-saga/effects'
import { cloneDeep, each, isFunction, isArray, isObject } from 'lodash'

import requestSaga, { createSagaActions } from '../../app/sagas/requestSaga'
import createRequestActions from '../../app/util/api/createRequestActions'
import { actionMatcher } from '../../app/util/api/matchers'
import { ACTION_RETRY, ACTION_RESET, ACTION_CANCEL } from '../../app/values/api'

// treat functions in an object or array as equivalent in tests
const matchFunctions = items => {
  return each(cloneDeep(items), (value, key) => {
    if (isFunction(value)) {
      items[key] = expect.any(Function)
    } else if (isArray(value) || isObject(value)) {
      items[key] = matchFunctions(value)
    }
  })
}

describe('requestSaga', () => {
  const ID = 'TEST'
  const actions = createRequestActions(ID, (arg) => (state) => `my ${arg} ${state.bar}`)
  const actionState = actions.request('foo')
  const storeState = { bar: 'baz' }
  const saga = requestSaga(storeState, actionState)
  const step = saga.next().value

  it('moves to the next state', () => {
    expect(step).toEqual({
      '@@redux-saga/IO': true,
      'RACE': {
        request: expect.any(Object),
        retry: expect.any(Object),
        reset: expect.any(Object),
        cancel: expect.any(Object)
      }
    })
  })

  it('returns true', () => {
    expect(saga.next().value).toBe(true)
  })

  describe('request action', () => {
    const requestState = step.RACE.request.CALL
    const sagaActions = createSagaActions(actionState.meta)

    it('contains the correct arguments', () => {
      const request = call(requestState.fn, storeState, actionState.payload, sagaActions)
      expect(matchFunctions(request.CALL.args)).toEqual(matchFunctions(requestState.args))
    })

    it('performs the action', () => {
      const request = call(requestState.fn, storeState, actionState.payload, sagaActions)
      const fn = request.CALL.fn(...request.CALL.args)
      fn.next() // account for delay
      const response = fn.next().value
      const result = response.CALL.fn(...response.CALL.args)
      expect(result).toEqual('my foo baz')
    })
  })

  describe('retry action', () => {
    const retryState = step.RACE.retry.TAKE
    const retry = take(actionMatcher(ACTION_RETRY, ID))

    it('performs valid actions', () => {
      const validAction = actions.retry('foo')
      expect(retryState.pattern(validAction)).toBe(true)
      expect(retryState.pattern(validAction)).toEqual(retry.TAKE.pattern(validAction))
    })

    it('does not perform invalid actions', () => {
      const invalidAction = { type: 'INVALID' }
      expect(retryState.pattern(invalidAction)).toBe(false)
      expect(retryState.pattern(invalidAction)).toEqual(retry.TAKE.pattern(invalidAction))
    })
  })

  describe('reset action', () => {
    const resetState = step.RACE.reset.TAKE
    const reset = take(actionMatcher(ACTION_RESET, ID))

    it('performs valid actions', () => {
      const validAction = actions.reset()
      expect(resetState.pattern(validAction)).toBe(true)
      expect(resetState.pattern(validAction)).toEqual(reset.TAKE.pattern(validAction))
    })

    it('does not perform invalid actions', () => {
      const invalidAction = { type: 'INVALID' }
      expect(resetState.pattern(invalidAction)).toBe(false)
      expect(resetState.pattern(invalidAction)).toEqual(reset.TAKE.pattern(invalidAction))
    })
  })

  describe('cancel action', () => {
    const cancelState = step.RACE.cancel.TAKE
    const cancel = take(actionMatcher(ACTION_CANCEL, ID))

    it('performs valid actions', () => {
      const validAction = actions.cancel()
      expect(cancelState.pattern(validAction)).toBe(true)
      expect(cancelState.pattern(validAction)).toEqual(cancel.TAKE.pattern(validAction))
    })

    it('does not perform invalid actions', () => {
      const invalidAction = { type: 'INVALID' }
      expect(cancelState.pattern(invalidAction)).toBe(false)
      expect(cancelState.pattern(invalidAction)).toEqual(cancel.TAKE.pattern(invalidAction))
    })
  })
})
