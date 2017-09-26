import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { SEND_TRANSACTION } from '../../app/modules/transactions';
import { SET_TRANSACTION_HISTORY } from '../../app/modules/wallet';
import WalletInfo from '../../app/components/WalletInfo';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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


// TODO figure out how to test the clipboard functionality is working correctly (see commented test below)
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
  // test('copy to clipboard is getting called on click', (done) => {
  //   const { wrapper } = setup();
  //   const deepWrapper = wrapper.dive();
  //
  //   deepWrapper.find('.copyKey').simulate('click');
  //   NOTE: having problems figuring out how to access the clipboard or mocking electron's clipboard.writeText function and making sure it is called here.
  // });
  test('refreshBalance is getting called on click', (done) => {
    const { wrapper, store } = setup();
    const state = store.getState();
    const deepWrapper = wrapper.dive();

    deepWrapper.find('.refreshBalance').simulate('click');
    setTimeout(() => {
      const actions = store.getActions();
      // NOTE the rest of these actions are non-deterministic and for some reason,
      // looping inside this setTimeout to check each action.type causes the test to fail
      expect(store.getActions()[0].type).toEqual(SEND_TRANSACTION);
      expect(store.getActions()[1].type).toEqual(SET_TRANSACTION_HISTORY);
      expect(store.getActions().length).toEqual(7);
      done();
    }, 1500)
  });
  test('calls the correct number of actions after mounting', (done) => {
    const mock = new MockAdapter(axios);
    const data = { result: { Last: 24.50 } };
    mock.onGet('https://bittrex.com/api/v1.1/public/getticker?market=USDT-NEO').reply(200, data);

    const { wrapper, store } = setup(initialState, false);
    setTimeout(() => {
      const actions = store.getActions();
      // NOTE these actions are non-deterministic and for some reason,
      // looping inside this setTimeout to check each action.type causes the test to fail
      expect(actions.length).toEqual(4);
      done();
    }, 1500);
  });
});
