import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import { SET_HEIGHT, SET_NETWORK } from '../../app/modules/metadata'
import { SET_CLAIM } from '../../app/modules/claim'
import { SET_BALANCE, SET_TRANSACTION_HISTORY } from '../../app/modules/wallet'
import { LOADING_TRANSACTIONS } from '../../app/modules/transactions'
import NetworkSwitch from '../../app/containers/NetworkSwitch'

// TODO research how to move the axios mock code which is repeated in NetworkSwitch to a helper or config file
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { version } from '../../package.json'

const axiosMock = new MockAdapter(axios)
axiosMock
  .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
  .reply(200, { version })
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/neo/', { params: { convert: 'USD' } })
  .reply(200, [ { price_usd: 24.50 } ])
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/gas/', { params: { convert: 'USD' } })
  .reply(200, [ { price_usd: 18.20 } ])
jest.mock('neon-js')

const initialState = {
  account: {
    address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh'
  },
  metadata: {
    network: 'MainNet'
  }
}

const setup = (state = initialState) => {
  const store = configureStore([thunk])(state)
  const wrapper = shallow(<NetworkSwitch store={store} />)

  return {
    store,
    wrapper
  }
}

describe('NetworkSwitch', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('correctly renders MainNet initially', (done) => {
    const { wrapper, store } = setup()
    const state = store.getState()
    expect(wrapper.dive().find('.netName').text()).toEqual(state.metadata.network)
    done()
  })

  test('switches to TestNet when clicked', async () => {
    const { wrapper, store } = setup()
    const state = store.getState()
    const deepWrapper = wrapper.dive()
    expect(deepWrapper.find('.netName').text()).toEqual(state.metadata.network)
    const actionTypes = [
      SET_NETWORK,
      SET_HEIGHT,
      SET_CLAIM,
      SET_TRANSACTION_HISTORY,
      SET_BALANCE,
      LOADING_TRANSACTIONS
    ]
    deepWrapper.find('.netName').simulate('click')

    await Promise.resolve().then().then().then()
    const actions = store.getActions()
    expect(actions.length).toEqual(7)
    actions.forEach(action => {
      expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
    })
  })
})
