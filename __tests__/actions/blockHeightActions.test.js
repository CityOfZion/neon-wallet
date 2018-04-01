import { api } from 'neon-js'

import blockHeightActions from '../../app/actions/blockHeightActions'
import { TEST_NETWORK_ID } from '../../app/core/constants'
import { mockPromiseResolved } from '../testHelpers'

describe('blockHeightActions', () => {
  beforeEach(() => {
    jest.spyOn(api.neoscan, 'getWalletDBHeight').mockImplementation(
      mockPromiseResolved(586435)
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('call', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.call({ networkId: TEST_NETWORK_ID })).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/ACTION/CALL',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'ACTION/CALL'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test("payload function requests the network's block height", async (done) => {
      const call = blockHeightActions.call({ networkId: TEST_NETWORK_ID })
      expect(await call.payload.fn({})).toEqual(586435)
      done()
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.cancel()).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/ACTION/CANCEL',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'ACTION/CANCEL'
        }
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.reset()).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/ACTION/RESET',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'ACTION/RESET'
        }
      })
    })
  })
})
