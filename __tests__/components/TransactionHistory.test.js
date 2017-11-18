import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import { setTransactionHistory } from '../../app/modules/wallet'
import { setIsLoadingTransaction } from '../../app/modules/transactions'

import TransactionHistory from '../../app/containers/TransactionHistory'

const initialState = {
  account: {
    loggedIn: true,
    wif: 'L4SLRcPgqNMAMwM3nFSxnh36f1v5omjPg3Ewy1tg2PnEon8AcHou',
    address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh'
  },
  metadata: {
    network: 'TestNet'
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
        type: 'NEO',
        amount: '50',
        txid: '76938979'
      },
      {
        type: 'GAS',
        amount: '0.4000000',
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

    const columnHeader = wrapper.find('.columnHeader')
    expect(columnHeader.text()).toEqual('Transaction History')

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(0)
    done()
  })

  test('correctly renders with NEO and GAS transaction history', (done) => {
    const transactionState = Object.assign({}, initialState, transactions)
    const { wrapper } = setup(transactionState, false)

    const transactionList = wrapper.find('#transactionList')
    expect(transactionList.children().length).toEqual(2)
    expect(transactionList.childAt(0).find('.txid').text()).toEqual(transactions.wallet.transactions[0].txid)
    expect(transactionList.childAt(1).find('.txid').text()).toEqual(transactions.wallet.transactions[1].txid)
    expect(transactionList.childAt(0).find('.amount').text()).toEqual(`${transactions.wallet.transactions[0].amount} ${transactions.wallet.transactions[0].type}`)
    expect(transactionList.childAt(1).find('.amount').text()).toEqual(`${transactions.wallet.transactions[1].amount} ${transactions.wallet.transactions[1].type}`)
    done()
  })
})
