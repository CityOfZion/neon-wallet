import React from 'react'
import { merge } from 'lodash'
import { mount, shallow } from 'enzyme'
import { progressValues } from 'spunky'

import { createStore, provideStore, provideState } from '../testHelpers'
import WalletInfo from '../../app/containers/WalletInfo'
import { DEFAULT_CURRENCY_CODE, MAIN_NETWORK_ID } from '../../app/core/constants'

const { LOADED } = progressValues

const initialState = {
  spunky: {
    NETWORK: {
      batch: false,
      progress: LOADED,
      data: MAIN_NETWORK_ID
    },
    AUTH: {
      batch: false,
      progress: LOADED,
      data: {
        address: 'ANqUrhv99rwCiFTL6N1An9NH5UVkPYxTuw'
      }
    },
    SETTINGS: {
      batch: false,
      progress: LOADED,
      data: {
        currency: DEFAULT_CURRENCY_CODE,
        tokens: []
      }
    },
    PRICES: {
      batch: false,
      progress: LOADED,
      data: {
        NEO: 25.48,
        GAS: 18.1
      }
    },
    BALANCES: {
      batch: false,
      progress: LOADED,
      data: {
        NEO: '100001',
        GAS: '1000.0001601'
      }
    },
    CLAIMS: {
      batch: false,
      progress: LOADED,
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
      type: 'BATCH/CALL',
      meta: expect.objectContaining({ id: 'ACCOUNT' })
    }))
  })

  test('correctly renders data from state with non-default currency', () => {
    const testState = merge(initialState, {
      spunky: {
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
