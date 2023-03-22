import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import { progressValues } from 'spunky'
import { MemoryRouter } from 'react-router-dom'

import {
  THEMES,
  EXPLORERS,
  MAIN_NETWORK_LABEL,
  DEFAULT_LANGUAGE,
} from '../../app/core/constants'
import NetworkConfigurationTooltip, { renderNode } from '../../app/components/NetworkConfigurationTooltip'
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
          <NetworkConfigurationTooltip />
        </MemoryRouter>
      </IntlWrapper>
    </Provider>,
  )
  return {
    store,
    wrapper,
  }
}

const renderNodeSetup = (
  node: Array<any>,
  state = initialState,
  shallowRender = true,
) => {
  const store = configureStore([thunk])(state)
  const wrapper = mount(
    <Provider store={store}>
      <IntlWrapper lang="en">
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <div>{renderNode(node)}</div>
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

describe('renderNode with no vote', () => {
  test('renders warningicon with no vote', () => {
    const node = []
    const { wrapper } = renderNodeSetup(node)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('renderNode with a vote', () => {
  test('renders warningicon with no vote', () => {
    const node = ['test node', 1]
    const { wrapper } = renderNodeSetup(node)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.text().includes('test node #1')).toBe(true)
  })
})

describe('renderNode with a node that has fallen out of top 21', () => {
  test('renders warningicon with no vote', () => {
    const node = ['test node', 22]
    const { wrapper } = renderNodeSetup(node)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.text().includes('test node')).toBe(true)
    expect(wrapper.text().includes('#22')).toBe(false)
  })
})
