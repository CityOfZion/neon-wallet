import * as types from '../../app/actions/types';
import account from '../../app/reducers/account';

describe('accounts reducer', () => {
  let state = { wif: null, address: null, loggedIn: false }, action;

  beforeEach(() => {
    action = {
      wif: 'L1xpshXfzF6iQTq42onA5km8qwyzBaNQzPADhfTt2jzzcQSVoP5A',
      type: types.LOGIN
    }
  });

  describe('LOGIN', () => {
    test('with invalid loadAccount', () => {
      action.wif = null;
      let received = account(state, action);
      let expected = { 'wif': null, address: null, 'loggedIn': false };

      expect(received).toEqual(expected);
    });

    test('with valid loadAccount', () => {
      let received = account(state, action);
      let expected = { 'wif': action.wif, address: 'AMg5pC6PryhWoWWbcETq3kt4GC5Pj1i5kQ', 'loggedIn': true };

      expect(received).toEqual(expected);
    });
  });

  test('LOGOUT', () => {
    action.type = types.LOGOUT;
    let received = account(state, action);
    let expected = { 'wif': null, address: null, 'loggedIn': false };

    expect(received).toEqual(expected);
  });
});
