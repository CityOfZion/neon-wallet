import { api, u } from 'neon-js'

import claimsActions from '../../app/actions/claimsActions'
import { mockPromiseResolved } from '../testHelpers'

describe('claimsActions', () => {
  const net = 'TestNet'
  const address = 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4'

  beforeEach(() => {
    jest.spyOn(api.neoscan, 'getMaxClaimAmount').mockImplementation(
      mockPromiseResolved(new u.Fixed8('1.59140785'))
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('call', () => {
    test('returns an action object', () => {
      expect(claimsActions.call({ net, address })).toEqual({
        batch: false,
        type: 'CLAIMS/ACTION/CALL',
        meta: {
          id: 'CLAIMS',
          type: 'ACTION/CALL'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test("payload function requests the network's block height", async (done) => {
      const call = claimsActions.call({ net, address })
      expect(await call.payload.fn({})).toEqual({ total: '1.59140785' })
      done()
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(claimsActions.cancel()).toEqual({
        batch: false,
        type: 'CLAIMS/ACTION/CANCEL',
        meta: {
          id: 'CLAIMS',
          type: 'ACTION/CANCEL'
        }
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(claimsActions.reset()).toEqual({
        batch: false,
        type: 'CLAIMS/ACTION/RESET',
        meta: {
          id: 'CLAIMS',
          type: 'ACTION/RESET'
        }
      })
    })
  })
})
