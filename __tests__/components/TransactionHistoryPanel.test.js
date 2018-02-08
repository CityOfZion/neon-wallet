import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import { merge } from 'lodash'

import TransactionHistoryPanel from '../../app/components/TransactionHistory/TransactionHistoryPanel'
import { MAIN_NETWORK_ID, EXPLORERS } from '../../app/core/constants'
import { LOADED } from '../../app/values/state'

const initialState = {
  api: {
    AUTH: {
      address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh',
      wif: 'L4SLRcPgqNMAMwM3nFSxnh36f1v5omjPg3Ewy1tg2PnEon8AcHou'
    },
    NETWORK: {
      batch: false,
      state: LOADED,
      loadedCount: 1,
      data: MAIN_NETWORK_ID
    },
    SETTINGS: {
      batch: false,
      state: LOADED,
      loadedCount: 1,
      data: {
        blockExplorer: EXPLORERS.NEO_TRACKER
      }
    },
    TRANSACTION_HISTORY: {
      batch: false,
      state: LOADED,
      loadedCount: 1,
      data: []
    }
  }
}

const transactions = [
  {
    NEO: '50',
    GAS: '0.00000000',
    txid: '76938979'
  },
  {
    NEO: '0',
    GAS: '0.40000000',
    txid: '76938980'
  }
]

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<TransactionHistoryPanel store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <TransactionHistoryPanel />
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('TransactionHistoryPanel', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('correctly renders no transaction history', () => {
    const { wrapper } = setup(initialState, false)

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(0)
  })

  test('correctly renders with NEO and GAS transaction history', () => {
    const transactionState = merge({}, initialState, {
      api: { TRANSACTION_HISTORY: { data: transactions } }
    })
    const { wrapper } = setup(transactionState, false)

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(2)
    expect(transactionList.childAt(0).find('.txid').first().text()).toEqual(transactions[0].txid)
    expect(transactionList.childAt(1).find('.txid').first().text()).toEqual(transactions[1].txid)
    expect(transactionList.childAt(0).find('.amountNEO').text()).toEqual('50 NEO')
    expect(transactionList.childAt(1).find('.amountGAS').text()).toEqual('0.40000000 GAS')
  })
})
