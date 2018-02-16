import createRequestActions from '../../../app/util/api/createRequestActions'

describe('createRequestActions', () => {
  const ID = 'TEST'
  const actions = createRequestActions(ID, (arg) => (state) => 'foo')

  it('defines an object with an appropriate actions structure', () => {
    expect(actions.id).toEqual(ID)
    expect(actions.request).toBeInstanceOf(Function)
    expect(actions.retry).toBeInstanceOf(Function)
    expect(actions.reset).toBeInstanceOf(Function)
    expect(actions.cancel).toBeInstanceOf(Function)
    expect(actions.actionTypes).toEqual({
      REQUEST: 'TEST/REQ/REQUEST',
      RETRY: 'TEST/REQ/RETRY',
      RESET: 'TEST/REQ/RESET',
      CANCEL: 'TEST/REQ/CANCEL',
      SUCCESS: 'TEST/REQ/SUCCESS',
      FAILURE: 'TEST/REQ/FAILURE'
    })
  })

  it('defines a request function', () => {
    expect(actions.request('arg')).toEqual({
      batch: false,
      type: 'TEST/REQ/REQUEST',
      meta: { id: ID, type: 'REQ/REQUEST' },
      payload: { fn: expect.any(Function) }
    })
  })

  it('defines a retry function', () => {
    expect(actions.retry('arg')).toEqual({
      batch: false,
      type: 'TEST/REQ/RETRY',
      meta: { id: ID, type: 'REQ/RETRY' },
      payload: { fn: expect.any(Function) }
    })
  })

  it('defines a reset function', () => {
    expect(actions.reset()).toEqual({
      batch: false,
      type: 'TEST/REQ/RESET',
      meta: { id: ID, type: 'REQ/RESET' }
    })
  })

  it('defines a cancel function', () => {
    expect(actions.cancel()).toEqual({
      batch: false,
      type: 'TEST/REQ/CANCEL',
      meta: { id: ID, type: 'REQ/CANCEL' }
    })
  })
})
