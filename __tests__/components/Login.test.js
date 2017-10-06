import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Login from '../../app/components/LoginPrivateKey';

const setup = (state = { account: {
  loggedIn: true,
  wif: undefined
}}) => {
  const store = configureStore()(state);
  const wrapper = shallow(<Login store={store} />);

  return {
    store,
    wrapper
  };
};

describe('Login', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('clicking show key icon toggles private key visibility', () => {
    const { wrapper } = setup();
    const deeperWrapper = wrapper.shallow();

    expect(deeperWrapper.state("showKey")).toEqual(false);

    deeperWrapper
      .find('.viewKey')
      .simulate('click');

    expect(deeperWrapper.state("showKey")).toEqual(true);
  });

  // test('private key field input onChange dispatches LOGIN action', () => {
  //   const { store, wrapper } = setup();
  //   let preventDefault = jest.fn();
  //   const deeperWrapper = wrapper.shallow();
  //
  //   const someWif = 'L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A'
  //   deeperWrapper
  //     .find('input')
  //     .simulate('change', { target: { value: someWif } })
  //     .find('button')
  //     .simulate('click');
  //
  //   expect(store.getActions()).toEqual([
  //     { wif: someWif, type: 'LOGIN' }
  //   ]);
  // });
});
