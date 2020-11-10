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
import LightLogoWithoutText from '../../../assets/images/logo-without-text-black.png'
import DarkLogoWithoutText from '../../../assets/images/logo-without-text.png'
import Tooltip from '../../app/components/Tooltip'
import NetworkConfigurationTooltip from '../../app/components/NetworkConfigurationTooltip'
import IntlWrapper from '../../app/components/Root/IntlWrapper'

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

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)
  const wrapper = mount(
    <Provider store={store}>
      <IntlWrapper>
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <Sidebar />
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
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('renders block height when count has been loaded into redux store', () => {
    const { wrapper } = setup()
    const height = wrapper.find('#block-height')
    expect(height.text()).toEqual('300')
  })

  test('HTML element containing count will not render any text until count has been loaded', () => {
    const testState = cloneDeep(initialState)
    testState.spunky.blockHeight.progress = LOADING
    testState.spunky.blockHeight.data = undefined
    const { wrapper } = setup(testState)
    const container = wrapper.find('#block-height-container')
    expect(container.text()).toEqual('')
  })

  // TODO 2.6.0: this probably should go away from the main navigation
  // test('does render the token sale navigation option when NOT in watch only mode', () => {
  //   const { wrapper } = setup()
  //   const label = wrapper.find('#token-sale-label')
  //   expect(label.text()).toEqual(' Token Sale ')

  //   const container = wrapper.find('#tokensale')
  //   expect(container.length).toEqual(3)
  // })

  test('does not render the token sale navigation option when in watch only mode', () => {
    const testState = cloneDeep(initialState)
    testState.spunky.auth.data.isWatchOnly = true
    const { wrapper } = setup(testState)
    const container = wrapper.find('#tokensale')
    expect(container.length).toEqual(0)
  })

  test('renders the correct logo based on selected theme (Light)', () => {
    const { wrapper } = setup()
    const image = wrapper.find('#neon-logo')
    expect(image.prop('src')).toEqual(LightLogoWithoutText)
  })

  test('renders the correct logo based on selected theme (Dark)', () => {
    const testState = cloneDeep(initialState)
    testState.spunky.settings.data.theme = THEMES.DARK
    const { wrapper } = setup()
    const image = wrapper.find('#neon-logo')
    expect(image.prop('src')).toEqual(DarkLogoWithoutText)
  })
})
