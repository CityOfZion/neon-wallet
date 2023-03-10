import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import thunk from 'redux-thunk'
import { progressValues } from 'spunky'
import { MemoryRouter } from 'react-router-dom'
import { cloneDeep } from 'lodash-es'

import { createStore, provideStore, provideState } from '../testHelpers'
import Sidebar from '../../app/containers/App/Sidebar'
import {
  THEMES,
  EXPLORERS,
  MAIN_NETWORK_DEPRECATED_LABEL,
  MAIN_NETWORK_LABEL,
  DEFAULT_LANGUAGE,
} from '../../app/core/constants'
import NetworkConfigurationTooltip from '../../app/components/NetworkConfigurationTooltip'
import IntlWrapper from '../../app/components/Root/IntlWrapper'

const { LOADED, LOADING } = progressValues

const TEST_ADDRESS = 'TOOLTIP_TEST'

const initialState = {
  spunky: {
    auth: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: {
        isWatchOnly: false,
        address: TEST_ADDRESS,
      },
    },
    blockHeight: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: 300,
    },
    network: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: 1,
    },
    settings: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: {
        theme: THEMES.LIGHT,
        blockExplorer: EXPLORERS.NEO_TRACKER,
        language: DEFAULT_LANGUAGE,
      },
    },
  },
}

const networkConfigTooltipSetup = (
  state = initialState,
  shallowRender = true,
) => {
  const store = configureStore([thunk])(state)
  const wrapper = mount(
    <Provider store={store}>
      <IntlWrapper lang="en">
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <NetworkConfigurationTooltip settings={{ blockExplorer: 'Dora' }} />
        </MemoryRouter>
      </IntlWrapper>
    </Provider>,
  )
  return {
    store,
    wrapper,
  }
}

describe('Sidebar', () => {
  test('renders without crashing', () => {
    const { wrapper } = networkConfigTooltipSetup()
    expect(wrapper).toMatchSnapshot()
  })

  test('Renders the config tooltip with appropriate data based on state', () => {
    const { wrapper } = networkConfigTooltipSetup()
    expect(wrapper.text().includes(MAIN_NETWORK_LABEL.toUpperCase())).toBe(true)
    expect(wrapper.text().includes(TEST_ADDRESS)).toBe(true)
  })
})
