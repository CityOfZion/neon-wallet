import claimsActions from '../../app/actions/claimsActions'

describe('claimsActions', () => {
  const net = 'TestNet'
  const address = 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4'

  describe('request', () => {
    test('returns an action object', () => {
      expect(claimsActions.request({ net, address })).toEqual({
        batch: false,
        type: 'CLAIMS/REQ/REQUEST',
        meta: {
          id: 'CLAIMS',
          type: 'REQ/REQUEST'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test("payload function requests the network's block height", async (done) => {
      const request = claimsActions.request({ net, address })
      expect(await request.payload.fn({})).toEqual({ total: '1.59140785' })
      done()
    })
  })

  describe('retry', () => {
    test('returns an action object', () => {
      expect(claimsActions.retry({ net, address })).toEqual({
        batch: false,
        type: 'CLAIMS/REQ/RETRY',
        meta: {
          id: 'CLAIMS',
          type: 'REQ/RETRY'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test("payload function retries request for the network's block height", async (done) => {
      const request = claimsActions.retry({ net, address })
      expect(await request.payload.fn({})).toEqual({ total: '1.59140785' })
      done()
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(claimsActions.cancel()).toEqual({
        batch: false,
        type: 'CLAIMS/REQ/CANCEL',
        meta: {
          id: 'CLAIMS',
          type: 'REQ/CANCEL'
        }
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(claimsActions.reset()).toEqual({
        batch: false,
        type: 'CLAIMS/REQ/RESET',
        meta: {
          id: 'CLAIMS',
          type: 'REQ/RESET'
        }
      })
    })
  })
})
