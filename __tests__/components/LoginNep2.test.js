import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history'
import LoginNep2 from '../../app/components/LoginNep2';
import { decrypt_wif } from 'neon-js';
import { SEND_TRANSACTION, CLEAR_TRANSACTION } from '../../app/modules/transactions';
import { LOGIN } from '../../app/modules/account';

jest.mock('neon-js');

const initialState = {
  account: {
    decrypting: false
  }
};

const setup = (state = initialState, shallowRender = true) => {
  const store = configureStore()(state);

  let wrapper;
  if (shallowRender) {
    wrapper = shallow(<LoginNep2 store={store} />);
  } else {
    const history = createMemoryHistory('/dashboard')
    wrapper = mount(
      <Provider store={store}>
        <LoginNep2 history={history} />
      </Provider>
    );
  }

  return {
    store,
    wrapper
  };
};

describe('LoginNep2', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    done();
  });
  test('renders correctly with initial state', (done) => {
    const { wrapper } = setup(initialState, false);

    const passwordField = wrapper.find('input[type="password"]');
    const keyField = wrapper.find('input[type="text"]');
    const footerField = wrapper.find('#footer');

    expect(footerField.text()).toEqual('Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A');
    expect(passwordField.text()).toEqual('');
    expect(passwordField.html().includes('Enter your passphrase here')).toEqual(true);
    expect(keyField.text()).toEqual('');
    expect(keyField.html().includes('Enter your encrypted key here')).toEqual(true);
    done();
  });
  test('renders correctly when decrypting is true', (done) => {
    const newState = Object.assign({}, initialState, {
      account: {
        ...initialState.account,
        decrypting: true
      }
    });
    const { wrapper } = setup(newState, false);
    const decryptingText = wrapper.find('.decrypting');

    expect(decryptingText.text()).toEqual('Decrypting keys...');
    done();
  });
  test('the login button is working correctly with no passphrase', (done) => {
    const { wrapper, store } = setup();
    wrapper.dive().find('.loginButton').simulate('click');
    setTimeout(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0]).toEqual({
        type: SEND_TRANSACTION,
        success: false,
        message: 'Passphrase too short'
      });
      done();
    }, 0)
  });
  test('the login button is working correctly with only a passphrase', (done) => {
    const { wrapper, store } = setup(initialState, false);
    const passwordField = wrapper.find('input[type="password"]');
    passwordField.instance().value = 'Th!s1$@FakePassphrase';
    passwordField.simulate('change')

    wrapper.find('.loginButton').simulate('click');
    setTimeout(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      expect(actions[0]).toEqual({
        type: SEND_TRANSACTION,
        success: true,
        message: 'Decrypting encoded key...'
      });
      expect(actions[1]).toEqual({
        type: SEND_TRANSACTION,
        success: false,
        message: 'Wrong passphrase or invalid encrypted key'
      });
      expect(decrypt_wif.mock.calls.length).toBe(1);
      expect(decrypt_wif.mock.calls[0][0]).toBe('');
      done();
    }, 510)
  });
  test('the login button is working correctly with key and passphrase', (done) => {
    const { wrapper, store } = setup(initialState, false);

    const passwordField = wrapper.find('input[type="password"]');
    passwordField.instance().value = 'Th!s1$@FakePassphrase';
    passwordField.simulate('change')

    const keyField = wrapper.find('input[type="text"]');
    keyField.instance().value = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu';
    keyField.simulate('change')

    wrapper.find('.loginButton').simulate('click');
    setTimeout(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(3);
      expect(decrypt_wif.mock.calls.length).toBe(2);
      expect(decrypt_wif.mock.calls[1][0]).toBe('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu');
      expect(actions[0]).toEqual({
        type: SEND_TRANSACTION,
        success: true,
        message: 'Decrypting encoded key...'
      });
      expect(actions[1]).toEqual({
        type: LOGIN,
        wif: 'L4AJ14CNaBWPemRJKC34wyZwbmxg33GETs4Y1F8uK7rRmZ2UHrJn'
      });
      expect(actions[2]).toEqual({
        type: CLEAR_TRANSACTION
      });
      done();
    }, 510)
  });
});
