import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'

import App from '../../../components/app'
import thunk from 'redux-thunk'

Enzyme.configure({ adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

test('renders without crashing', () => {
  const tree = shallow(
    <Provider
      store={mockStore({
        settings: {},
      })}
    >
      <App>
        <div />
      </App>
    </Provider>,
  )
  expect(toJson(tree)).toMatchSnapshot()
})
