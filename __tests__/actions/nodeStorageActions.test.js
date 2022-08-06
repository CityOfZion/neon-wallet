import { api } from '@cityofzion/neon-js'
import nock from 'nock'
import { ipcRenderer, app } from 'electron'

import nodeStorageActions, {
  determineIfCacheIsExpired,
  getRPCEndpoint,
  buildNodeUrl,
} from '../../app/actions/nodeStorageActions'
import {
  TEST_NETWORK_ID,
  TEST_NETWORK_LABEL,
  NODES_TEST_NET,
  TEST_NETWORK_DEPRECATED_LABEL,
} from '../../app/core/constants'

jest.mock(
  'electron',
  () => {
    const mElectron = {
      ipcRenderer: {
        invoke: jest.fn(async () => `${app.getPath('userData')}/storage`),
      },
    }
    return mElectron
  },
  { virtual: true },
)

const MINUTES_AS_MS =
  25 /* minutes */ * 60 /* seconds */ * 1000 /* milliseconds */

describe('nodeStorageActions', () => {
  describe('cancel', () => {
    test('returns an action object', () => {
      expect(nodeStorageActions.cancel()).toEqual({
        batch: false,
        type: 'nodeStorage/ACTION/CANCEL',
        meta: {
          id: 'nodeStorage',
          type: 'ACTION/CANCEL',
        },
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(nodeStorageActions.reset()).toEqual({
        batch: false,
        type: 'nodeStorage/ACTION/RESET',
        meta: {
          id: 'nodeStorage',
          type: 'ACTION/RESET',
        },
      })
    })
  })

  describe('call', () => {
    test('returns an action object', () => {
      expect(nodeStorageActions.call({ networkId: TEST_NETWORK_ID })).toEqual({
        batch: false,
        type: 'nodeStorage/ACTION/CALL',
        meta: {
          id: 'nodeStorage',
          type: 'ACTION/CALL',
        },
        payload: {
          fn: expect.any(Function),
        },
      })
    })
    test('payload function returns an empty string with no node in storage', async done => {
      const call = nodeStorageActions.call({ networkId: TEST_NETWORK_ID })
      expect(await call.payload.fn({})).toEqual('')
      done()
    })
  })

  describe('cacheReset', () => {
    test('returns true when current date is AFTER default expiration', () => {
      expect(
        determineIfCacheIsExpired(new Date().getTime() - MINUTES_AS_MS),
      ).toEqual(true)
    })

    test('returns false when current date is BEFORE default expiration', () => {
      expect(determineIfCacheIsExpired(new Date().getTime())).toEqual(false)
    })
  })

  describe('getRPCEndpoint', () => {
    test('returns an RPC endpoint', async () => {
      nock.enableNetConnect()
      const selectedNode = await getRPCEndpoint(TEST_NETWORK_DEPRECATED_LABEL)
      const arrOfCandidates = NODES_TEST_NET.map(buildNodeUrl)
      expect(arrOfCandidates).toContain(selectedNode)
      nock.disableNetConnect()
    })
  })
})
