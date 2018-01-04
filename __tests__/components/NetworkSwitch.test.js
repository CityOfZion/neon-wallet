import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'

import { SET_HEIGHT, SET_NETWORK } from '../../app/modules/metadata'
import { SET_BALANCE, SET_TRANSACTION_HISTORY, SET_IS_LOADED } from '../../app/modules/wallet'
import { LOADING_TRANSACTIONS } from '../../app/modules/transactions'
import NetworkSwitch from '../../app/containers/App/Header/NetworkSwitch'

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
    net: 'MainNet',
    setNetwork: jest.fn(),
    loadWalletData: jest.fn()
  }
  const wrapper = shallow(<NetworkSwitch {...props} />)

  return {
    wrapper
  }
}

describe('NetworkSwitch', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('correctly renders MainNet initially', () => {
    const { wrapper } = setup()

    const networkSelectorElement = wrapper.find('.networkSelector').getElement()

    expect(networkSelectorElement.props.defaultValue).toEqual('MainNet')
  })

  test('switches to the correct network when chosen from the dropdown', async () => {
    const { wrapper } = setup()

    const instance = wrapper.instance()
    const networkSelector = wrapper.find('.networkSelector')
    networkSelector.simulate('change', { target: { value: 'TestNet' } })

    expect(instance.props.setNetwork).toHaveBeenCalledWith('TestNet')
    expect(instance.props.loadWalletData).toHaveBeenCalled()

    networkSelector.simulate('change', { target: { value: 'MainNet' } })

    expect(instance.props.setNetwork).toHaveBeenCalledWith('MainNet')
    expect(instance.props.loadWalletData).toHaveBeenCalled()
  })
})
