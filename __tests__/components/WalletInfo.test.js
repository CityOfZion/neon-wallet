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
import WalletInfo from '../../app/containers/WalletInfo'

// TODO research how to move the axios mock code which is repeated in NetworkSwitch to a helper or config file
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { clipboard } from 'electron'
import { version } from '../../package.json'
import { formatFiat } from '../../app/core/formatters'

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
  clipboard: {
    writeText: jest.fn()
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
    Neo: 10,
    Gas: 1.0001001,
    neoPrice: 25.48,
    gasPrice: 18.10
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

    const addressField = wrapper.find('.address')
    const neoWalletValue = wrapper.find('.neoWalletValue')
    const gasWalletValue = wrapper.find('.gasWalletValue')
    const walletValue = wrapper.find('.walletTotal')
    const expectedNeoWalletValue = formatFiat(initialState.wallet.neoPrice * initialState.wallet.Neo)
    const expectedGasWalletValue = formatFiat(initialState.wallet.gasPrice * initialState.wallet.Gas)
    const expectedWalletValue = formatFiat(initialState.wallet.neoPrice * initialState.wallet.Neo + initialState.wallet.gasPrice * initialState.wallet.Gas)
    const neoField = wrapper.find('.amountNeo')
    const gasField = wrapper.find('.amountGas')

    expect(neoWalletValue.text()).toEqual(`US $${expectedNeoWalletValue}`)
    expect(gasWalletValue.text()).toEqual(`US $${expectedGasWalletValue}`)
    expect(walletValue.text()).toEqual(`Total US $${expectedWalletValue}`)
    expect(addressField.text().split('<')[0]).toEqual(initialState.account.address)
    expect(neoField.text()).toEqual(`${initialState.wallet.Neo}`)
    // TODO: Test the gas tooltip value, this is testing the display value, truncated to 4 decimals
    expect(gasField.text()).toEqual('1.0001')
    done()
  })
  test('copy to clipboard is getting called on click', async () => {
    const { wrapper } = setup()
    const deepWrapper = wrapper.dive()

    expect(clipboard.writeText.mock.calls.length).toBe(0)
    deepWrapper.find('.copyKey').simulate('click')
    await Promise.resolve('Pause').then()
    expect(clipboard.writeText.mock.calls.length).toBe(1)
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
    expect(actions.length).toEqual(16)
    // expect(actions.length).toEqual(12)
    actions.forEach(action => {
      expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
    })
  })
  test('calls the correct number of actions after mounting', async () => {
    const { store } = setup(initialState, false)
    const actionTypes = [
      SET_TRANSACTION_HISTORY,
      SET_HEIGHT,
      SET_CLAIM,
      SET_BALANCE,
      LOADING_TRANSACTIONS
    ]

    jest.runAllTimers()
    await Promise.resolve('Pause').then().then().then()
    const actions = store.getActions()
    expect(actions.length).toEqual(6)
    actions.forEach(action => {
      expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
    })
  })
})
