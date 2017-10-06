import generateWalletReducer, { newWalletKeys, newWallet, generating, resetKey, NEW_WALLET_KEYS, NEW_WALLET, SET_GENERATING, RESET_KEY } from '../../app/modules/generateWallet';
import { getAccountFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from 'neon-js';

jest.mock('neon-js');

describe('generateWallet module tests', () => {
  // TODO when looking into pulling axios mock adapter into helper file to stay DRY
  // do the same for commonly used test variables like wif and address, etc...
  const wif = 'L4AJ14CNaBWPemRJKC34wyZwbmxg33GETs4Y1F8uK7rRmZ2UHrJn';
  const address = 'AM22coFfbe9N6omgL9ucFBLkeaMNg9TEyL';
  const passphrase = 'Th!s1$@FakePassphrase';
  const encryptedWif = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu';

  const initialState = {
    wif: null,
    address:null,
    passphrase: null,
    encryptedWif: null,
    generating: false
  };

  const account = {
    wif,
    address,
    passphrase,
    encryptedWif
  }

  describe('newWallet tests', () => {
    const expectedAction = Object.assign({}, account, { type: NEW_WALLET });

    test('newWallet action works', () => {
      expect(newWallet(account)).toEqual(expectedAction);
    });

    test('newWallet reducer should return the initial state', () => {
      expect(generateWalletReducer(undefined, {})).toEqual(initialState);
    });

    test('generateWallet reducer should handle NEW_WALLET', () => {
      const expectedState = Object.assign({}, initialState, account)
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('newWalletKeys tests', () => {
    const expectedAction = {
      type: NEW_WALLET_KEYS,
      passphrase
    };

    test('newWalletKeys action works', () => {
      expect(newWalletKeys(passphrase)).toEqual(expectedAction);
    });

    test('generateWallet reducer should handle NEW_WALLET_KEYS', () => {
      const expectedState = Object.assign({}, initialState, account)
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('generating tests', () => {
    const expectedAction = {
      type: SET_GENERATING,
      state: true
    };

    test('generating action works', () => {
      expect(generating(true)).toEqual(expectedAction);
    });

    test('generateWallet reducer should handle SET_GENERATING', () => {
      const expectedState = Object.assign({}, initialState, { generating: true })
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('resetKey tests', () => {
    const expectedAction = { type: RESET_KEY };

    test('resetKey action works', () => {
      expect(resetKey()).toEqual(expectedAction);
    });

    test('generateWallet reducer should handle RESET_KEY', () => {
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(initialState);
    });
  });
});
