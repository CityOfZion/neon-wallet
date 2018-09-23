import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import { merge } from 'lodash-es'
import { progressValues } from 'spunky'

import TransactionHistoryPanel from '../../app/components/TransactionHistory/TransactionHistoryPanel'
import { MAIN_NETWORK_ID, EXPLORERS } from '../../app/core/constants'

const { LOADED } = progressValues

const initialState = {
  spunky: {
    auth: {
      batch: false,
      progress: LOADED,
      data: {
        address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh',
        wif: 'L4SLRcPgqNMAMwM3nFSxnh36f1v5omjPg3Ewy1tg2PnEon8AcHou'
      }
    },
    network: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: MAIN_NETWORK_ID
    },
    settings: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: {
        blockExplorer: EXPLORERS.NEO_TRACKER
      }
    },
    transactionHistory: {
      batch: false,
      progress: LOADED,
      loadedCount: 1,
      data: []
    }
  }
}

const transactions = [
  {
    to: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    from: 'claim',
    txid: '6ab0391ee237c7b2516f13d47f09a30844da64fefefc006877b40542d34a705b',
    time: 1537278057,
    amount: '0.11988459',
    asset: { symbol: 'GAS' },
    label: 'Gas Claim',
    iconType: 'CLAIM',
    id: '_ymelbt8mb'
  },
  {
    to: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    from: 'AXmzKD3dvj7dPUQKkBeNZmRDYF6AhrwrtQ',
    txid: '1ec4446bac87fca59abff2ccf96283547a5ebec64b7c1aba7a31fb91b93c9b63',
    time: 1537234593,
    amount: '0',
    asset: {
      symbol: 'MCT'
    },
    label: 'MCT',
    iconType: 'RECEIVE',
    id: '_r3mihxg36'
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
      spunky: { transactionHistory: { data: transactions } }
    })
    const { wrapper } = setup(transactionState, false)

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(2)

    expect(
      transactionList
        .childAt(0)
        .find('.txidLink')
        .hostNodes()
        .text()
    ).toEqual(transactions[0].txid.substring(0, 32))

    expect(
      transactionList
        .childAt(1)
        .find('.txidLink')
        .hostNodes()
        .text()
    ).toEqual(transactions[1].txid.substring(0, 32))

    expect(
      transactionList
        .childAt(0)
        .find('.txAmountContainer')
        .text()
    ).toEqual('0.11988459')

    expect(
      transactionList
        .childAt(1)
        .find('.txAmountContainer')
        .text()
    ).toEqual('0')

    expect(
      transactionList
        .childAt(1)
        .find('.txLabelContainer')
        .text()
    ).toEqual('MCT')

    expect(
      transactionList
        .childAt(0)
        .find('.txLabelContainer')
        .text()
    ).toEqual('Gas Claim')

    expect(
      transactionList
        .childAt(0)
        .find('.txToContainer')
        .text()
    ).toEqual(transactions[0].to)

    expect(
      transactionList
        .childAt(1)
        .find('.txToContainer')
        .text()
    ).toEqual(transactions[1].to)
  })
})
