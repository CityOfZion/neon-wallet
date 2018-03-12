import React from 'react'
import { shallow } from 'enzyme'

import NetworkSwitch from '../../app/containers/App/Header/NetworkSwitch/NetworkSwitch'
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from '../../app/core/constants'

// TODO research how to move the axios mock code which is repeated in NetworkSwitch to a helper or config file
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { version } from '../../package.json'

const axiosMock = new MockAdapter(axios)
axiosMock
  .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
  .reply(200, { version })
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/NEO/', { params: { convert: 'USD' } })
  .reply(200, [ { price_usd: 24.50 } ])
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/GAS/', { params: { convert: 'USD' } })
  .reply(200, [ { price_usd: 18.20 } ])
jest.mock('neon-js')

const setup = () => {
  const props = {
    networkId: MAIN_NETWORK_ID,
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
    ],
    onChange: jest.fn()
  }
  const wrapper = shallow(<NetworkSwitch {...props} />)

  return {
    wrapper
  }
}

describe('NetworkSwitch', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('correctly renders MainNet initially', () => {
    const { wrapper } = setup()
    const networkSelectorElement = wrapper.find('.networkSelector').getElement()

    expect(networkSelectorElement.props.defaultValue).toEqual(MAIN_NETWORK_ID)
  })

  test('switches to the correct network when chosen from the dropdown', () => {
    const { wrapper } = setup()
    const instance = wrapper.instance()
    const networkSelector = wrapper.find('.networkSelector')

    networkSelector.simulate('change', { target: { value: TEST_NETWORK_ID } })
    expect(instance.props.onChange).toHaveBeenCalledWith(TEST_NETWORK_ID)

    networkSelector.simulate('change', { target: { value: MAIN_NETWORK_ID } })
    expect(instance.props.onChange).toHaveBeenCalledWith(MAIN_NETWORK_ID)
  })
})
