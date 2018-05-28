import { api } from 'neon-js'
import nock from 'nock'

import blockHeightActions from '../../app/actions/blockHeightActions'
import { TEST_NETWORK_ID } from '../../app/core/constants'
import { mockPromiseResolved } from '../testHelpers'

describe('blockHeightActions', () => {
  beforeEach(() => {
    const rpcHost = 'http://seed1.cityofzion.io:8080'

    jest.spyOn(api.neoscan, 'getRPCEndpoint').mockImplementation(mockPromiseResolved(rpcHost))

    nock(rpcHost)
      .post('/', (body) => body.method === 'getblockcount')
      .reply(200, { id: 1234, jsonrpc: '2.0', result: 586435 }, { 'Access-Control-Allow-Origin': '*' })
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
