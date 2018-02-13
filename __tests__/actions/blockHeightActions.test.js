import blockHeightActions from '../../app/actions/blockHeightActions'
import { TEST_NETWORK_ID } from '../../app/core/constants'

describe('blockHeightActions', () => {
  describe('request', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.request({ networkId: TEST_NETWORK_ID })).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/REQ/REQUEST',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'REQ/REQUEST'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test("payload function requests the network's block height", async (done) => {
      const request = blockHeightActions.request({ networkId: TEST_NETWORK_ID })
      expect(await request.payload.fn({})).toEqual(586435)
      done()
    })
  })

  describe('retry', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.retry({ networkId: TEST_NETWORK_ID })).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/REQ/RETRY',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'REQ/RETRY'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test("payload function retries request for the network's block height", async (done) => {
      const request = blockHeightActions.retry({ networkId: TEST_NETWORK_ID })
      expect(await request.payload.fn({})).toEqual(586435)
      done()
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.cancel()).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/REQ/CANCEL',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'REQ/CANCEL'
        }
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.reset()).toEqual({
        batch: false,
        type: 'BLOCK_HEIGHT/REQ/RESET',
        meta: {
          id: 'BLOCK_HEIGHT',
          type: 'REQ/RESET'
        }
      })
    })
  })
})
