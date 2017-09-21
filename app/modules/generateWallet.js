import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from 'neon-js';
import { encrypt_wif, decrypt_wif } from 'neon-js';

// Constants
const NEW_WALLET_KEYS = 'NEW_WALLET_KEYS';
const NEW_WALLET = 'NEW_WALLET';
const SET_GENERATING = 'SET_GENERATING';
const RESET_KEY = 'RESET_KEY';

export function newWalletKeys(passphrase){
  return {
    type: NEW_WALLET_KEYS,
    passphrase
  }
}

export function newWallet(account){
  return {
    type: NEW_WALLET,
    wif: account.wif,
    address: account.address,
    passphrase: account.passphrase,
    encryptedWif: account.encryptedWif
  }
}

export function generating(bool){
  return {
    type: SET_GENERATING,
    state: bool
  }
};

export function resetKey(){
  return {
    type: RESET_KEY,
  }
};

// Reducer used for state necessary to generating a wallet
export default (state = {wif: null, address:null, passphrase: null, encryptedWif: null, generating: false}, action) => {
  switch (action.type) {
    case NEW_WALLET_KEYS:
      const newPrivateKey = generatePrivateKey();
      const newWif = getWIFFromPrivateKey(newPrivateKey);
      const encryptedWif = encrypt_wif(newWif, action.passphrase);
      const loadAccount = getAccountsFromWIFKey(newWif);
      return {...state, wif:newWif, address:loadAccount[0].address, passphrase: action.passphrase, encryptedWif: encryptedWif};
    case NEW_WALLET:
      return  {...state, wif: action.wif, address: action.address, passphrase: action.passphrase, encryptedWif: action.encryptedWif, generating: false};
    case SET_GENERATING:
      return {...state, generating: action.state};
    case RESET_KEY:
      return {wif: null, address:null, passphrase: null, encryptedWif: null, generating: false};
    default:
      return state;
  }
};
