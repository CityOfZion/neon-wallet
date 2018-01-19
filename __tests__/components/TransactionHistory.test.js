import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'

import TransactionHistory from '../../app/containers/TransactionHistory'
import { setTransactionHistory } from '../../app/modules/wallet'
import { setIsLoadingTransaction } from '../../app/modules/transactions'
import { MAIN_NETWORK_ID } from '../../app/core/constants'
import { LOADED } from '../../app/values/state'

const initialState = {
  api: {
    NETWORK: {
      batch: false,
      state: LOADED,
      data: MAIN_NETWORK_ID
    }
  },
  account: {
    loggedIn: true,
    wif: 'L4SLRcPgqNMAMwM3nFSxnh36f1v5omjPg3Ewy1tg2PnEon8AcHou',
    address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh'
  },
  metadata: {
  },
  wallet: {
    transactions: []
  },
  transactions: {
    isLoadingTransactions: false
  }
}

const transactions = {
  wallet: {
    transactions: [
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
  }
}

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore([thunk])(state)

  let wrapper
  if (shallowRender) {
    wrapper = shallow(<TransactionHistory store={store} />)
  } else {
    wrapper = mount(
      <Provider store={store}>
        <TransactionHistory />
      </Provider>
    )
  }

  return {
    store,
    wrapper
  }
}

describe('TransactionHistory', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('calls syncTransactionHistory after rendering', async () => {
    const { store } = setup(initialState, false)
    await Promise.resolve('Pause').then().then().then()
    const actions = store.getActions()
    expect(actions[0]).toEqual(setIsLoadingTransaction(true))
    expect(actions[1]).toEqual(setIsLoadingTransaction(false))
    expect(actions[2]).toEqual(setTransactionHistory(initialState.wallet.transactions))
  })

  test('correctly renders no transaction history', (done) => {
    const { wrapper } = setup(initialState, false)

    const columnHeader = wrapper.find('#columnHeader')
    expect(columnHeader.text()).toEqual('Transaction History ')

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(0)
    done()
  })

  test('correctly renders with NEO and GAS transaction history', (done) => {
    const transactionState = Object.assign({}, initialState, transactions)
    const { wrapper } = setup(transactionState, false)

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(2)
    expect(transactionList.childAt(0).find('.txid').first().text()).toEqual(transactions.wallet.transactions[0].txid)
    expect(transactionList.childAt(1).find('.txid').first().text()).toEqual(transactions.wallet.transactions[1].txid)
    expect(transactionList.childAt(0).find('.amountNEO').text()).toEqual('50 NEO')
    expect(transactionList.childAt(1).find('.amountGAS').text()).toEqual('0.40000000 GAS')
    done()
  })
})
