import nock from 'nock'

import { checkVersion } from '../../app/modules/metadata'
import * as notifications from '../../app/modules/notifications'
import { TEST_NETWORK_ID } from '../../app/core/constants'
import { version } from '../../package.json'

describe('metadata module tests', () => {
  describe('checkVersion tests', () => {
    const dispatch = jest.fn()
    const getState = () => ({ spunky: { NETWORK: { data: TEST_NETWORK_ID } } })

    const generateNewerVersion = (version) => {
      const parts = version.split('.')
      const last = parts.pop()
      return [...parts, parseInt(last) + 1].join('.')
    }

    test('it does not show a warning when the versions match', async (done) => {
      const spy = jest.spyOn(notifications, 'showWarningNotification')

      nock('http://testnet-api.wallet.cityofzion.io')
        .get('/v2/version')
        .reply(200, { version }, { 'Access-Control-Allow-Origin': '*' })

      await checkVersion()(dispatch, getState)
      expect(spy).not.toHaveBeenCalled()
      done()
    })

    test("it shows a warning when the versions don't match", async (done) => {
      const spy = jest.spyOn(notifications, 'showWarningNotification')

      nock('http://testnet-api.wallet.cityofzion.io')
        .get('/v2/version')
        .reply(200, { version: generateNewerVersion(version) }, { 'Access-Control-Allow-Origin': '*' })

      await checkVersion()(dispatch, getState)
      expect(spy).toHaveBeenCalled()
      done()
    })
  })
})
