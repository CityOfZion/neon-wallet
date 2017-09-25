import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import networkReducer, { setNetwork } from '../../app/modules/metadata';

import { NetworkSwitch, resetBalanceSync } from '../../app/components/NetworkSwitch';

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

describe.only('NetworkSwitch', () => {
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
    deepWrapper.find('.netName').simulate('click');
    setTimeout(() => {
      expect(store.getActions()[0]).toEqual(setNetwork(testNet));
      expect(store.getActions().length).toEqual(5);
      done();
    }, 1000)
  });
});
