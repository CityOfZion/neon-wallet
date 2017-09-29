import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { syncTransactionHistory } from '../../app/components/NetworkSwitch';

import TransactionHistory from '../../app/components/TransactionHistory';

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
  }
};

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
        amount: '0.4',
        txid: '76938980'
      }
    ]
  }
}

const setup = (state = initialState) => {
  const store = configureStore()(state);
  const wrapper = shallow(<TransactionHistory store={store} />);

  return {
    store,
    wrapper
  };
};

// TODO test the external call to neotracker.io
describe('TransactionHistory', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    done();
  });

  test('calls syncTransactionHistory after rendering', (done) => {
    const { store } = setup();
    const state = store.getState();
    expect(store.getActions()[0]).toEqual(syncTransactionHistory(store.dispatch, state.metadata.network, state.account.address));
    done();
  });

  test('correctly renders no transaction history', (done) => {
    const { store, wrapper } = setup();
    const deepWrapper = wrapper.dive();

    const columnHeader = deepWrapper.find('.columnHeader');
    expect(columnHeader.text()).toEqual('Transaction History');

    const transactionList = deepWrapper.find('#transactionList');
    expect(transactionList.children().length).toEqual(0);
    done();
  });

  test('correctly renders with NEO and GAS transaction history', (done) => {
    const transactionState = Object.assign({}, initialState, transactions);
    const { store, wrapper } = setup(transactionState);
    const deepWrapper = wrapper.dive();

    const transactionList = deepWrapper.find('#transactionList');
    expect(transactionList.children().length).toEqual(2);
    expect(transactionList.childAt(0).find('.txid').text()).toEqual(transactions.wallet.transactions[0].txid);
    expect(transactionList.childAt(1).find('.txid').text()).toEqual(transactions.wallet.transactions[1].txid);
    expect(transactionList.childAt(0).find('.amount').text()).toEqual(`${transactions.wallet.transactions[0].amount} ${transactions.wallet.transactions[0].type}`);
    expect(transactionList.childAt(1).find('.amount').text()).toEqual(`${transactions.wallet.transactions[1].amount} ${transactions.wallet.transactions[1].type}`);
    done();
  });
});
