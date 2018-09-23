import React from 'react'
import nock from 'nock'
import { merge } from 'lodash-es'
import { mount, shallow } from 'enzyme'
import { progressValues } from 'spunky'
import { expect } from 'chai'

import { createStore, provideStore, provideState } from '../../testHelpers'
import AssetBalancesPanel from '../../../app/components/Dashboard/PortfolioPanel'
import {
  DEFAULT_CURRENCY_CODE,
  MAIN_NETWORK_ID,
  ASSETS
} from '../../../app/core/constants'
import PortfolioPanel from '../../../app/components/Dashboard/PortfolioPanel'
import PortfolioRow from '../../../app/components/Dashboard/PortfolioPanel/PortfolioRow'
import PortfolioTable from '../../../app/components/Dashboard/PortfolioPanel/PortfolioTable'
import PortfolioBreakdownChart from '../../../app/components/Dashboard/PortfolioPanel/PortfolioBreakdownChart'

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

describe('PortfolioPanel', () => {
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
    const wrapper = shallow(<PortfolioPanel store={store} />)
    expect(wrapper).toMatchSnapshot()
  })

  test.only('renders <PortfolioBreakDownChart/>', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<PortfolioPanel />, store))
    expect(wrapper.find(PortfolioBreakdownChart)).to.have.length(1)
  })

  test.only('renders 2 <PortfolioRow/> for two assets saturated from store', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<PortfolioPanel />, store))
    expect(wrapper.find(PortfolioRow)).to.have.length(2)
  })

  test('account data refreshes when refresh button is clicked', () => {
    const store = createStore(initialState)
    const wrapper = mount(provideStore(<PortfolioPanel />, store))

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
})
