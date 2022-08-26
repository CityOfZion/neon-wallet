// @flow
import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import nock from 'nock'
import { api } from '@cityofzion/neon-js'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

configure({ adapter: new Adapter() })

beforeAll(() => {
  api.setSwitchFreeze(true)
})

afterAll(() => {
  api.setSwitchFreeze(false)
  nock.cleanAll()
})
