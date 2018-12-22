import nock from 'nock'

import { checkVersion, RETRY_CONFIG } from '../../app/modules/metadata'
import * as notifications from '../../app/modules/notifications'
import { TEST_NETWORK_ID } from '../../app/core/constants'
import { version } from '../../package.json'

describe('metadata module tests', () => {
  describe('checkVersion tests', () => {
    const dispatch = jest.fn()
    const getState = () => ({ spunky: { network: { data: TEST_NETWORK_ID } } })

    const generateNewerVersion = version => {
      const parts = version.split('.')
      const last = parts.pop()
      return [...parts, parseInt(last) + 1].join('.')
    }

    test('it does not show a warning when the versions match', async done => {
      const spy = jest.spyOn(notifications, 'showWarningNotification')

      nock('https://api.github.com/repos/CityOfZion/neon-wallet')
        .get('/releases/latest')
        .reply(
          200,
          { tag_name: version },
          { 'Access-Control-Allow-Origin': '*' },
        )

      await checkVersion()(dispatch, getState)
      expect(spy).not.toHaveBeenCalled()
      done()
    })

    // prettier-ignore
    test('it shows a warning when the versions don\'t match', async done => {
      const spy = jest.spyOn(notifications, 'showWarningNotification')

      nock('https://api.github.com/repos/CityOfZion/neon-wallet')
        .get('/releases/latest')
        .reply(
          200,
          { tag_name: generateNewerVersion(version) },
          { 'Access-Control-Allow-Origin': '*' }
        )

      await checkVersion()(dispatch, getState)
      expect(spy).toHaveBeenCalled()
      done()
    })

    test('it retries when getting server error', async done => {
      // original request
      nock('https://api.github.com/repos/CityOfZion/neon-wallet')
        .get('/releases/latest')
        .reply(500, {}, { 'Access-Control-Allow-Origin': '*' })

      // retries
      nock('https://api.github.com/repos/CityOfZion/neon-wallet')
        .get('/releases/latest')
        .times(RETRY_CONFIG.retries)
        .reply(500, {}, { 'Access-Control-Allow-Origin': '*' })

      await checkVersion()(dispatch, getState)
      expect(nock.isDone()).toBeTruthy()
      done()
    })
  })
})
