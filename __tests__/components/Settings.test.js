import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import thunk from 'redux-thunk'
import { progressValues } from 'spunky'
import { MemoryRouter } from 'react-router-dom'
import { cloneDeep } from 'lodash-es'

import { createStore, provideStore, provideState } from '../testHelpers'
import {
  THEMES,
  EXPLORERS,
  MAIN_NETWORK_DEPRECATED_LABEL,
  MAIN_NETWORK_LABEL,
  DEFAULT_LANGUAGE,
  DEFAULT_CURRENCY_CODE,
} from '../../app/core/constants'
import IntlWrapper from '../../app/components/Root/IntlWrapper'
import Settings from '../../app/containers/Settings'

const { LOADED, LOADING } = progressValues

const initialState = {
  spunky: {
    auth: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: {
        isWatchOnly: false,
      },
    },
    settings: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: {
        theme: THEMES.LIGHT,
        blockExplorer: EXPLORERS.NEO_TRACKER,
        language: DEFAULT_LANGUAGE,
        currency: DEFAULT_CURRENCY_CODE,
        soundEnabled: true,
        chain: 'neo3',
      },
    },
  },
}

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)
  const wrapper = mount(
    <Provider store={store}>
      <IntlWrapper>
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <Settings />
        </MemoryRouter>
      </IntlWrapper>
    </Provider>,
  )
  return {
    store,
    wrapper,
  }
}

describe('Settings', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
  })
})
