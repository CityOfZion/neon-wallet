import React from 'react'
import * as neonjs from 'neon-js'
import { merge } from 'lodash'
import { mount, shallow } from 'enzyme'

import { createStore, provideStore, provideState } from '../testHelpers'
import WalletInfo from '../../app/containers/WalletInfo'
import { SHOW_NOTIFICATION } from '../../app/modules/notifications'
import { NOTIFICATION_LEVELS, DEFAULT_CURRENCY_CODE, MAIN_NETWORK_ID } from '../../app/core/constants'
import { LOADED } from '../../app/values/state'

// TODO research how to move the axios mock code which is repeated in NetworkSwitch to a helper or config file
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { version } from '../../package.json'

const axiosMock = new MockAdapter(axios)
axiosMock
  .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
  .reply(200, { version })
axiosMock
  .onGet('https://api.coinmarketcap.com/v1/ticker/?limit=0&convert=USD')
  .reply(200, [{ symbol: 'NEO', price_usd: 24.5 }, { symbol: 'GAS', price_usd: 18.2 }])

jest.mock('electron', () => ({
  app: {
    getPath: () => 'C:\\tmp\\mock_path'
  }
}))
jest.useFakeTimers()

jest.unmock('qrcode')
import QRCode from 'qrcode/lib/browser' // eslint-disable-line
QRCode.toCanvas = jest.fn()

const initialState = {
  api: {
    NETWORK: {
      batch: false,
      state: LOADED,
      data: MAIN_NETWORK_ID
    },
    AUTH: {
      batch: false,
      state: LOADED,
      data: {
        address: 'ANqUrhv99rwCiFTL6N1An9NH5UVkPYxTuw'
      }
    },
    SETTINGS: {
      batch: false,
      state: LOADED,
      data: {
        currency: DEFAULT_CURRENCY_CODE,
        tokens: []
      }
    },
    PRICES: {
      batch: false,
      state: LOADED,
      data: {
        NEO: 25.48,
        GAS: 18.1
      }
    },
    BALANCES: {
      batch: false,
      state: LOADED,
      data: {
        NEO: '100001',
        GAS: '1000.0001601'
      }
    },
    CLAIMS: {
      batch: false,
      state: LOADED,
      data: {
        total: '0.5'
      }
    }
  },
  claim: {
    claimRequest: false,
    disableClaimButton: false
  }
}

describe('WalletInfo', () => {
  test('renders without crashing', () => {
    const store = createStore(initialState)
    const wrapper = shallow(<WalletInfo store={store} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('correctly renders data from state', () => {
    const wrapper = mount(provideState(<WalletInfo />, initialState))

    const neoWalletValue = wrapper.find('.neoWalletValue')
    const gasWalletValue = wrapper.find('.gasWalletValue')
    const walletValue = wrapper.find('.walletTotal')

    const expectedNeoWalletValue = '2,548,025.48'
    const expectedGasWalletValue = '18,100.00'
    const expectedWalletValue = '2,566,125.48'
    const neoField = wrapper.find('.amountNeo')
    const gasField = wrapper.find('.amountGas')

    expect(neoWalletValue.text()).toEqual(`$${expectedNeoWalletValue} USD`)
    expect(gasWalletValue.text()).toEqual(`$${expectedGasWalletValue} USD`)
    expect(walletValue.text()).toEqual(`Total $${expectedWalletValue} USD`)
    expect(neoField.text()).toEqual('100,001')
    // TODO: Test the GAS tooltip value, this is testing the display value, truncated to 4 decimals
    expect(gasField.text()).toEqual('1,000.0002')
  })

  test('account data refreshes when refresh button is clicked', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<WalletInfo />, store))

    wrapper.find('.refreshBalance').simulate('click')

    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'BATCH/REQUEST',
      meta: expect.objectContaining({ id: 'ACCOUNT' })
    }))
  })

  test('correctly renders data from state with non-default currency', () => {
    const testState = merge(initialState, {
      api: {
        SETTINGS: { data: { currency: 'eur' } },
        PRICES: { data: { NEO: 1.11, GAS: 0.55 } }
      }
    })
    const wrapper = mount(provideState(<WalletInfo />, testState))

    const neoWalletValue = wrapper.find('.neoWalletValue')
    const gasWalletValue = wrapper.find('.gasWalletValue')
    const walletValue = wrapper.find('.walletTotal')

    const expectedNeoWalletValue = '111,001.11'
    const expectedGasWalletValue = '550.00'
    const expectedWalletValue = '111,551.11'

    expect(neoWalletValue.text()).toEqual(`€${expectedNeoWalletValue} EUR`)
    expect(gasWalletValue.text()).toEqual(`€${expectedGasWalletValue} EUR`)
    expect(walletValue.text()).toEqual(`Total €${expectedWalletValue} EUR`)
  })
})
