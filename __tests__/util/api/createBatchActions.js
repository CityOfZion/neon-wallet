import createBatchActions from '../../../app/util/api/createBatchActions'
import createRequestActions from '../../../app/util/api/createRequestActions'

describe('createBatchActions', () => {
  const REQ1_ID = 'TEST_REQ1'
  const REQ2_ID = 'TEST_REQ2'
  const BATCH_ID = 'TEST_BATCH'

  const reqActions1 = createRequestActions(REQ1_ID, (arg) => (state) => 'foo')
  const reqActions2 = createRequestActions(REQ2_ID, (arg) => (state) => 'bar')
  const actions = createBatchActions(BATCH_ID, {
    one: reqActions1,
    two: reqActions2
  })

  it('defines an object with an appropriate actions structure', () => {
    expect(actions.id).toEqual(BATCH_ID)
    expect(actions.request).toBeInstanceOf(Function)
    expect(actions.retry).toBeInstanceOf(Function)
    expect(actions.reset).toBeInstanceOf(Function)
    expect(actions.cancel).toBeInstanceOf(Function)
    expect(actions.actionTypes).toEqual({
      REQUEST: 'BATCH/REQUEST',
      RETRY: 'BATCH/RETRY',
      RESET: 'BATCH/RESET',
      CANCEL: 'BATCH/CANCEL',
      SUCCESS: 'BATCH/SUCCESS',
      FAILURE: 'BATCH/FAILURE'
    })
  })

  it('defines a request function', () => {
    reqActions1.request = jest.fn()
    reqActions2.request = jest.fn()

    expect(actions.request('arg')).toEqual({
      batch: true,
      type: 'BATCH/REQUEST',
      meta: { id: BATCH_ID, type: 'BATCH/REQUEST' },
      payload: { requests: { one: reqActions1.request('arg'), two: reqActions2.request('arg') } }
    })
  })

  it('defines a retry function', () => {
    reqActions1.retry = jest.fn()
    reqActions2.retry = jest.fn()

    expect(actions.retry('arg')).toEqual({
      batch: true,
      type: 'BATCH/RETRY',
      meta: { id: BATCH_ID, type: 'BATCH/RETRY' },
      payload: { requests: { one: reqActions1.retry('arg'), two: reqActions2.retry('arg') } }
    })
  })

  it('defines a reset function', () => {
    expect(actions.reset()).toEqual({
      batch: true,
      type: 'BATCH/RESET',
      meta: { id: BATCH_ID, type: 'BATCH/RESET' },
      payload: { requests: { one: reqActions1.reset(), two: reqActions2.reset() } }
    })
  })

  it('defines a cancel function', () => {
    expect(actions.cancel()).toEqual({
      batch: true,
      type: 'BATCH/CANCEL',
      meta: { id: BATCH_ID, type: 'BATCH/CANCEL' },
      payload: { requests: { one: reqActions1.cancel(), two: reqActions2.cancel() } }
    })
  })
})
