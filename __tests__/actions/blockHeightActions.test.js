import { rpc } from '@cityofzion/neon-js-legacy'

import main, {
  blockHeightActions,
  getBlockHeight,
} from '../../app/actions/blockHeightActions'
import { TEST_NETWORK_ID } from '../../app/core/constants'
import { mockPromiseResolved } from '../testHelpers'

describe('blockHeightActions', () => {
  beforeEach(() => {
    jest
      .spyOn(main, 'getBlockHeight')
      .mockImplementation(mockPromiseResolved(36))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('call', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.call({ networkId: TEST_NETWORK_ID })).toEqual({
        batch: false,
        type: 'blockHeight/ACTION/CALL',
        meta: {
          id: 'blockHeight',
          type: 'ACTION/CALL',
        },
        payload: {
          fn: expect.any(Function),
        },
      })
    })

    test("payload function requests the network's block height", async done => {
      const spy = jest.spyOn(main, 'getBlockHeight')
      const call = await blockHeightActions.call({ networkId: TEST_NETWORK_ID })
      expect(await call.payload.fn({})).toEqual(36)
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.cancel()).toEqual({
        batch: false,
        type: 'blockHeight/ACTION/CANCEL',
        meta: {
          id: 'blockHeight',
          type: 'ACTION/CANCEL',
        },
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.reset()).toEqual({
        batch: false,
        type: 'blockHeight/ACTION/RESET',
        meta: {
          id: 'blockHeight',
          type: 'ACTION/RESET',
        },
      })
    })
  })
})
