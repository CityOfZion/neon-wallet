import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import storage from 'electron-json-storage'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'

import App from '../../app/containers/App'
import { TEST_NETWORK_ID, MAIN_NETWORK_ID } from '../../app/core/constants'

const initialState = {
  account: {
  },
  metadata: {
    networkId: TEST_NETWORK_ID,
    networks: [
      {
        id: MAIN_NETWORK_ID,
        label: 'MainNet',
        network: 'MainNet'
      },
      {
        id: TEST_NETWORK_ID,
        label: 'TestNet',
        network: 'TestNet'
      }
    ]
  },
  wallet: {
    transactions: []
  },
  modal: {

  },
  price: {
    NEO: 40.5,
    GAS: 19.8
  }
}
const setup = (state, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<App store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }

  return { wrapper, store }
}

describe('App', () => {
  test('app initializes settings', (done) => {
    storage.get = jest.fn((key, callback) => {
      const receivedKeys = []
      receivedKeys[key] = true

      storage.get = jest.fn((key, callback) => {
        receivedKeys[key] = true
        expect(receivedKeys['settings']).toEqual(true)
        expect(receivedKeys['userWallet']).toEqual(true)
        done()
      })
    })
    setup(initialState, false)
  })
})
