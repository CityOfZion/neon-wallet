import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { SET_TRANSACTION_HISTORY, SET_BALANCE } from '../../app/modules/wallet';
import { SEND_TRANSACTION, CLEAR_TRANSACTION } from '../../app/modules/transactions';
import { SET_HEIGHT } from '../../app/modules/metadata';
import { SET_CLAIM } from '../../app/modules/claim';
import WalletInfo from '../../app/components/WalletInfo';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { clipboard } from 'electron';

jest.mock('electron', () => ({
  clipboard: {
    writeText: jest.fn(),
  },
}));

jest.unmock('qrcode');
import QRCode from 'qrcode';
QRCode.toCanvas = jest.fn();

const initialState = {
  account: {
    address: 'ANqUrhv99rwCiFTL6N1An9NH5UVkPYxTuw'
  },
  metadata: {
    network: 'TestNet'
  },
  wallet: {
    Neo: 10,
    Gas: 1.0001,
    price: 25.48
  },
  claim: {
    claimAmount: 0.5
  }
};

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore()(state);

  let wrapper;
  if (shallowRender) {
    wrapper = shallow(<WalletInfo store={store} />);
  } else {
    wrapper = mount(
      <Provider store={store}>
        <WalletInfo />
      </Provider>
    );
  }

  return {
    store,
    wrapper
  };
};


describe('WalletInfo', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    done();
  });
  test('correctly renders data from state', (done) => {
    const { wrapper } = setup(initialState, false);

    const addressField = wrapper.find('.address');
    const fiatField = wrapper.find('.fiat');
    const neoField = wrapper.find('.amountNeo');
    const gasField = wrapper.find('.amountGas');

    expect(fiatField.text()).toEqual(`US ${initialState.wallet.price}`);
    expect(addressField.text().split('<')[0]).toEqual(initialState.account.address);
    expect(neoField.text()).toEqual(`${initialState.wallet.Neo}`);
    expect(gasField.text()).toEqual(`${Math.floor(initialState.wallet.Gas * 10000) / 10000}`);
    done();
  });
  test('copy to clipboard is getting called on click', (done) => {
    const { wrapper } = setup();
    const deepWrapper = wrapper.dive();

    expect(clipboard.writeText.mock.calls.length).toBe(0);
    deepWrapper.find('.copyKey').simulate('click');
    setTimeout(() => {
      try {
        expect(clipboard.writeText.mock.calls.length).toBe(1);
        done();
      } catch(e) {
        done.fail(e);
      }
    }, 10)
  });
  test('refreshBalance is getting called on click', (done) => {
    const { wrapper, store } = setup();
    const state = store.getState();
    const deepWrapper = wrapper.dive();

    const actionTypes = [
      SEND_TRANSACTION,
      SET_TRANSACTION_HISTORY,
      SET_HEIGHT,
      SET_BALANCE,
      CLEAR_TRANSACTION,
      SET_CLAIM
    ];
    deepWrapper.find('.refreshBalance').simulate('click');
    setTimeout(() => {
      try {
        const actions = store.getActions();
        // TODO investigate why the actions length fluctuates here and test the length(s)
        // Also, I got an error once so I suspect it might not always be 6 or 7 but I can't reproduce a different length
        // console.log('actions.length', actions.length);
        // expect(actions.length === 6 || actions.length === 7).toEqual(true);
        actions.forEach(action => {
          expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
        });
        done();
      } catch(e) {
        done.fail(e);
      }
    }, 1500)
  });
  test('calls the correct number of actions after mounting', (done) => {
    const mock = new MockAdapter(axios);
    const data = { result: { Last: 24.50 } };
    mock.onGet('https://bittrex.com/api/v1.1/public/getticker?market=USDT-NEO').reply(200, data);

    const { wrapper, store } = setup(initialState, false);
    const actionTypes = [
      SET_TRANSACTION_HISTORY,
      SET_HEIGHT,
      SET_BALANCE,
      SET_CLAIM
    ];
    setTimeout(() => {
      try {
        const actions = store.getActions();
        expect(actions.length).toEqual(4);
        actions.forEach(action => {
          expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
        });
        done();
      } catch(e) {
        done.fail(e);
      }
    }, 1500);
  });
});
