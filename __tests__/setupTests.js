// @flow
import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { api } from 'neon-js'

configure({ adapter: new Adapter() })

beforeAll(() => {
  api.setSwitchFreeze(true)
})

afterAll(() => {
  api.setSwitchFreeze(false)
})
