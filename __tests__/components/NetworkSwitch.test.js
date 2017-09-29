import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import networkReducer, { setNetwork, SET_HEIGHT, SET_NETWORK } from '../../app/modules/metadata';
import { SET_CLAIM } from '../../app/modules/claim';
import { SET_BALANCE, SET_TRANSACTION_HISTORY } from '../../app/modules/wallet';
import { NetworkSwitch, resetBalanceSync } from '../../app/components/NetworkSwitch';

// TODO research how to move the axios mock code which is repeated in NetworkSwitch to a helper or config file
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { version } from '../../package.json';

const axiosMock = new MockAdapter(axios);
axiosMock
  .onGet('http://testnet-api.wallet.cityofzion.io/v2/version')
  .reply(200, { version });
axiosMock
  .onGet('https://bittrex.com/api/v1.1/public/getticker?market=USDT-NEO')
  .reply(200, { result: { Last: 24.50 } });

jest.mock('neon-js');

const initialState = {
  account: {
    address: 'AWy7RNBVr9vDadRMK9p7i7Z1tL7GrLAxoh'
  },
  metadata: {
    network: 'MainNet'
  }
};

const setup = (state = initialState) => {
  const store = configureStore()(state);
  const wrapper = shallow(<NetworkSwitch store={store} />);

  return {
    store,
    wrapper
  };
};

describe('NetworkSwitch', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    done();
  });

  test('calls resetBalanceSync after rendering', (done) => {
    const { wrapper, store } = setup();
    const state = store.getState();
    expect(store.getActions()[0]).toEqual(resetBalanceSync(store.dispatch, state.metadata.network, state.account.address));
    done();
  });

  test('correctly renders MainNet initially', (done) => {
    const { wrapper, store } = setup();
    const state = store.getState();
    expect(wrapper.dive().find('.netName').text()).toEqual(state.metadata.network);
    done();
  });

  test('switches to TestNet when clicked', (done) => {
    const { wrapper, store } = setup();
    const state = store.getState();
    const testNet = 'TestNet';
    const deepWrapper = wrapper.dive();
    expect(deepWrapper.find('.netName').text()).toEqual(state.metadata.network);
    const actionTypes = [
      SET_NETWORK,
      SET_HEIGHT,
      SET_CLAIM,
      SET_TRANSACTION_HISTORY,
      SET_BALANCE
    ]
    deepWrapper.find('.netName').simulate('click');
    setTimeout(() => {
      const actions = store.getActions();
      actions.forEach(action => {
        expect(actionTypes.indexOf(action.type) > -1).toEqual(true)
      });
      expect(actions.length).toEqual(5);
      done();
    }, 0)
  });
});
