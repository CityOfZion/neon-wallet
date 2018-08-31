/* eslint-disable */
import { api } from 'neon-js'

import blockHeightActions from '../../app/actions/blockHeightActions'
import { TEST_NETWORK_ID } from '../../app/core/constants'
import { mockPromiseResolved } from '../testHelpers'

const apiClone = Object.assign({}, api.neoscan)

describe('blockHeightActions', () => {
  beforeEach(() => {
    jest
      .spyOn(apiClone, 'getWalletDBHeight')
      .mockImplementation(mockPromiseResolved(586435))
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
          type: 'ACTION/CALL'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    // TODO: FIX ME!!!!
    // test("payload function requests the network's block height", async done => {
    //   const call = blockHeightActions.call({ networkId: TEST_NETWORK_ID })
    //   expect(await call.payload.fn({})).toEqual(586435)
    //   done()
    // })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(blockHeightActions.cancel()).toEqual({
        batch: false,
        type: 'blockHeight/ACTION/CANCEL',
        meta: {
          id: 'blockHeight',
          type: 'ACTION/CANCEL'
        }
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
          type: 'ACTION/RESET'
        }
      })
    })
  })
})
