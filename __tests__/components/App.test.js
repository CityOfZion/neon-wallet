import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import storage from 'electron-json-storage'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import { progressValues } from 'spunky'

import App from '../../app/containers/App'
import { MAIN_NETWORK_ID } from '../../app/core/constants'

const { LOADED } = progressValues

const initialState = {
  spunky: {
    APP: {
      batch: true,
      mapping: ['ACCOUNTS', 'BLOCK_HEIGHT', 'SETTINGS']
    },
    ACCOUNTS: {
      batch: false,
      progress: LOADED,
      data: [],
      loadedCount: 1
    },
    BLOCK_HEIGHT: {
      batch: false,
      progress: LOADED,
      data: 2000000,
      loadedCount: 1
    },
    NETWORK: {
      batch: false,
      progress: LOADED,
      data: MAIN_NETWORK_ID,
      loadedCount: 1
    },
    PRICES: {
      batch: false,
      progress: LOADED,
      data: {
        NEO: 40.5,
        GAS: 19.8
      },
      loadedCount: 1
    },
    SETTINGS: {
      batch: false,
      progress: LOADED,
      data: {},
      loadedCount: 1
    }
  },
  account: {
  },
  wallet: {
    transactions: []
  },
  modal: {
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
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
  }

  return { wrapper, store }
}

describe('App', () => {
  test('app initializes settings', (done) => {
    storage.get = jest.fn((key, callback) => {
      expect(key).toEqual('userWallet')
      done()
    })
    setup(initialState, false)
  })
})
