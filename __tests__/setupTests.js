// @flow
import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import nock from 'nock'
import { api } from '@cityofzion/neon-js'

configure({ adapter: new Adapter() })

beforeAll(() => {
  api.setSwitchFreeze(true)

  jest.doMock('../node_modules/usb/usb.js', () => {
    return {
      __esModule: true,
      default: '',
    }
  })
})

afterAll(() => {
  api.setSwitchFreeze(false)
  nock.cleanAll()
})
