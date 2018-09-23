import React from 'react'
import nock from 'nock'
import { merge } from 'lodash-es'
import { mount, shallow } from 'enzyme'
import { progressValues } from 'spunky'

import { createStore, provideStore, provideState } from '../../testHelpers'
import AssetBalancesPanel from '../../../app/components/Dashboard/AssetBalancesPanel'
import {
  DEFAULT_CURRENCY_CODE,
  MAIN_NETWORK_ID,
  ASSETS
} from '../../../app/core/constants'

const { LOADED } = progressValues

const initialState = {
  spunky: {
    network: {
      batch: false,
      progress: LOADED,
      data: MAIN_NETWORK_ID,
      loadedCount: 1
    },
    auth: {
      batch: false,
      progress: LOADED,
      data: {
        address: 'ANqUrhv99rwCiFTL6N1An9NH5UVkPYxTuw'
      },
      loadedCount: 1
    },
    settings: {
      batch: false,
      progress: LOADED,
      data: {
        currency: DEFAULT_CURRENCY_CODE,
        tokens: []
      },
      loadedCount: 1
    },
    prices: {
      batch: false,
      progress: LOADED,
      data: {
        NEO: 25.48,
        GAS: 18.1
      },
      loadedCount: 1
    },
    priceHistory: {
      batch: false,
      progress: LOADED,
      data: {
        [ASSETS.NEO]: [
          {
            close: 5
          },
          ...new Array(29).fill({}),
          {
            close: 10
          }
        ],
        [ASSETS.GAS]: [
          {
            close: 10
          },
          ...new Array(29).fill({}),
          {
            close: 5
          }
        ]
      },
      loadedCount: 1
    },
    balances: {
      batch: false,
      progress: LOADED,
      data: {
        NEO: '100001',
        GAS: '1000.0001601'
      },
      loadedCount: 1
    },
    claims: {
      batch: false,
      progress: LOADED,
      data: {
        total: '0.5'
      },
      loadedCount: 1
    }
  },
  claim: {
    claimRequest: false,
    disableClaimButton: false
  }
}

describe('AssetBalancesPanel', () => {
  beforeEach(() => {
    const response = [
      { symbol: 'NEO', price_usd: 24.5 },
      { symbol: 'GAS', price_usd: 18.2 }
    ]
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/')
      .query({ limit: 0, convert: 'USD' })
      .reply(200, response, { 'Access-Control-Allow-Origin': '*' })
  })

  test('renders without crashing', () => {
    const store = createStore(initialState)
    const wrapper = shallow(<AssetBalancesPanel store={store} />)
    expect(wrapper).toMatchSnapshot()
  })

  test.only('correctly renders data from state', () => {
    const wrapper = mount(provideState(<AssetBalancesPanel />, initialState))

    expect(wrapper.find('#neoWalletValue').text()).toEqual('$2,548,025.48')
    expect(wrapper.find('#gasWalletValue').text()).toEqual('$18,100.00')
    expect(wrapper.find('#walletTotal').text()).toEqual('$2,566,125.48')
    expect(wrapper.find('#amountNeo').text()).toEqual('100,001')
    expect(wrapper.find('#amountGas').text()).toEqual('1,000.0002')
    expect(wrapper.find('#priceChangeNeo').text()).toEqual('+100.00%')
    expect(wrapper.find('#priceChangeGas').text()).toEqual('-50.00%')
  })

  test('account data refreshes when refresh button is clicked', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<AssetBalancesPanel />, store))

    wrapper
      .find('#refresh')
      .hostNodes()
      .simulate('click')

    expect(store.getActions()).toContainEqual(
      expect.objectContaining({
        type: 'balances/ACTION/CALL',
        meta: expect.objectContaining({ id: 'balances' })
      })
    )
  })

  test('correctly renders data from state with non-default currency', () => {
    const state = merge(initialState, {
      spunky: {
        settings: { data: { currency: 'eur' } },
        prices: { data: { NEO: 1.11, GAS: 0.55 } }
      }
    })
    const wrapper = mount(provideState(<AssetBalancesPanel />, state))

    expect(wrapper.find('#neoWalletValue').text()).toEqual('€111,001.11')
    expect(wrapper.find('#gasWalletValue').text()).toEqual('€550.00')
    expect(wrapper.find('#walletTotal').text()).toEqual('€111,551.11')
  })
})
