import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount, shallow } from 'enzyme'
import { SET_TRANSACTION_HISTORY, SET_BALANCE, SET_GAS_PRICE, SET_NEO_PRICE } from '../../app/modules/wallet'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATIONS } from '../../app/modules/notifications'
import { LOADING_TRANSACTIONS } from '../../app/modules/transactions'
import { SET_HEIGHT } from '../../app/modules/metadata'
import { SET_CLAIM } from '../../app/modules/claim'
import { DEFAULT_CURRENCY_CODE } from '../../app/core/constants'
import WalletInfo from '../../app/containers/WalletInfo'
import * as neonjs from 'neon-js'

// TODO research how to move the axios mock code which is repeated in NetworkSwitch to a helper or config file
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { version } from '../../package.json'

const axiosMock = new MockAdapter(axios)
axiosMock
  .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
  .reply(200, { version })
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/neo/?convert=USD')
  .reply(200, [ { price_usd: 24.50 } ])
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/gas/?convert=USD')
  .reply(200, [ { price_usd: 18.20 } ])

jest.mock('electron', () => ({
  app: {
    getPath: () => {
      return 'C:\\tmp\\mock_path'
    }
  }
}))
jest.useFakeTimers()

jest.unmock('qrcode')
import QRCode from 'qrcode/lib/browser' // eslint-disable-line
QRCode.toCanvas = jest.fn()

const initialState = {
  account: {
    address: 'ANqUrhv99rwCiFTL6N1An9NH5UVkPYxTuw'
  },
  metadata: {
    network: 'TestNet'
  },
  wallet: {
    NEO: 100001,
    GAS: 1.0001601
  },
  price: {
    neo: 25.48,
    gas: 18.10,
    currency: DEFAULT_CURRENCY_CODE
  },
  claim: {
    claimAmount: 0.5
  }
}

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<WalletInfo store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <WalletInfo />
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('WalletInfo', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })
  test('correctly renders data from state', (done) => {
    const { wrapper } = setup(initialState, false)

    const neoWalletValue = wrapper.find('.neoWalletValue')
    const gasWalletValue = wrapper.find('.gasWalletValue')
    const walletValue = wrapper.find('.walletTotal')

    const expectedNeoWalletValue = '2,548,025.48'
    const expectedGasWalletValue = '18.10'
    const expectedWalletValue = '2,548,043.58'
    const neoField = wrapper.find('.amountNeo')
    const gasField = wrapper.find('.amountGas')

    expect(neoWalletValue.text()).toEqual(`$${expectedNeoWalletValue} USD`)
    expect(gasWalletValue.text()).toEqual(`$${expectedGasWalletValue} USD`)
    expect(walletValue.text()).toEqual(`Total $${expectedWalletValue} USD`)
    expect(neoField.text()).toEqual(`${initialState.wallet.NEO}`)
    // TODO: Test the gas tooltip value, this is testing the display value, truncated to 4 decimals
    expect(gasField.text()).toEqual('1.0001')
    done()
  })
  test('refreshBalance is getting called on click', async () => {
    const { wrapper, store } = setup()
    const deepWrapper = wrapper.dive()

    const actionTypes = [
      HIDE_NOTIFICATIONS,
      SHOW_NOTIFICATION,
      LOADING_TRANSACTIONS,
      SET_TRANSACTION_HISTORY,
      SET_HEIGHT,
      SET_NEO_PRICE,
      SET_GAS_PRICE,
      SET_BALANCE,
      SET_CLAIM
    ]
    deepWrapper.find('.refreshBalance').simulate('click')
    jest.runAllTimers()
    await Promise.resolve('Pause').then().then().then().then()
    const actions = store.getActions()
    expect(actions.length).toEqual(20)
    // expect(actions.length).toEqual(12)
    actions.forEach(action => {
      expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
    })
  })
  test('correctly renders data from state with non-default currency', (done) => {
    const testState = { ...initialState, price: { neo: 1.11, gas: 0.55, currency: 'eur' } }
    const { wrapper } = setup(testState, false)

    const neoWalletValue = wrapper.find('.neoWalletValue')
    const gasWalletValue = wrapper.find('.gasWalletValue')
    const walletValue = wrapper.find('.walletTotal')

    const expectedNeoWalletValue = '111,001.11'
    const expectedGasWalletValue = '0.55'
    const expectedWalletValue = '111,001.66'

    expect(neoWalletValue.text()).toEqual(`€${expectedNeoWalletValue} EUR`)
    expect(gasWalletValue.text()).toEqual(`€${expectedGasWalletValue} EUR`)
    expect(walletValue.text()).toEqual(`Total €${expectedWalletValue} EUR`)

    done()
  })
  test('calls the correct number of actions after mounting', async () => {
    const { store } = setup(initialState, false)
    const actionTypes = [
      HIDE_NOTIFICATIONS,
      SHOW_NOTIFICATION,
      SET_TRANSACTION_HISTORY,
      SET_HEIGHT,
      SET_CLAIM,
      SET_BALANCE,
      LOADING_TRANSACTIONS
    ]

    jest.runAllTimers()
    await Promise.resolve('Pause').then().then().then()
    const actions = store.getActions()
    expect(actions.length).toEqual(10)
    actions.forEach(action => {
      expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
    })
  })
  test('network error is shown with connectivity error', async () => {
    neonjs.getBalance = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const { wrapper, store } = setup()
    wrapper.dive()

    jest.runAllTimers()
    await Promise.resolve('Pause').then().then().then().then()

    const actions = store.getActions()
    let notifications = []
    actions.forEach(action => {
      if (action.type === SHOW_NOTIFICATION) {
        notifications.push(action)
      }
    })

    // let's make sure the last notification show was an error.
    expect(notifications.pop().payload.level).toEqual('error')
  })
})
