import React from 'react'
import { shallow } from 'enzyme'
import { progressValues } from 'spunky'

import { provideState } from '../testHelpers'
import App from '../../app/containers/App'
import { MAIN_NETWORK_ID } from '../../app/core/constants'

const { LOADED } = progressValues

const initialState = {
  spunky: {
    app: {
      batch: true,
      mapping: ['accounts', 'blockHeight', 'settings']
    },
    accounts: {
      batch: false,
      progress: LOADED,
      data: [],
      loadedCount: 1
    },
    blockHeight: {
      batch: false,
      progress: LOADED,
      data: 2000000,
      loadedCount: 1
    },
    network: {
      batch: false,
      progress: LOADED,
      data: MAIN_NETWORK_ID,
      loadedCount: 1
    },
    prices: {
      batch: false,
      progress: LOADED,
      data: {
        NEO: 40.5,
        GAS: 19.8
      },
      loadedCount: 1
    },
    settings: {
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

describe('App', () => {
  test('should render without crashing', () => {
    const wrapper = shallow(provideState(<App />, initialState))
    expect(wrapper).toMatchSnapshot()
  })
})
