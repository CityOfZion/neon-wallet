import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { checkVersion } from '../../app/modules/metadata'
import * as notifications from '../../app/modules/notifications'
import { TEST_NETWORK_ID } from '../../app/core/networks'
import { version } from '../../package.json'

const axiosMock = new MockAdapter(axios)

describe('metadata module tests', () => {
  describe('checkVersion tests', () => {
    const dispatch = jest.fn()
    const getState = () => ({ api: { NETWORK: TEST_NETWORK_ID } })

    const generateNewerVersion = (version) => {
      const parts = version.split('.')
      const last = parts.pop()
      return [...parts, parseInt(last) + 1].join('.')
    }

    test('it does not show a warning when the versions match', async (done) => {
      const spy = jest.spyOn(notifications, 'showWarningNotification')

      axiosMock
        .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
        .reply(200, { version })

      await checkVersion()(dispatch, getState)
      expect(spy).not.toHaveBeenCalled()

      axiosMock.restore()
      done()
    })

    test.only("it shows a wraning when the versions don't match", async (done) => {
      const spy = jest.spyOn(notifications, 'showWarningNotification')

      axiosMock
        .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
        .reply(200, { version: generateNewerVersion(version) })

      await checkVersion()(dispatch, getState)
      expect(spy).toHaveBeenCalled()

      axiosMock.restore()
      done()
    })
  })
})
