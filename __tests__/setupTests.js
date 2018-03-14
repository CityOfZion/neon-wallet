// @flow
import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import nock from 'nock'
import { api } from 'neon-js'

configure({ adapter: new Adapter() })

beforeAll(() => {
  api.setSwitchFreeze(true)
  nock.disableNetConnect()
})

afterAll(() => {
  api.setSwitchFreeze(false)
  nock.cleanAll()
})
