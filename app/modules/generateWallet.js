import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from 'neon-js';
import { encrypt_wif, decrypt_wif } from '../util/Passphrase.js';

// Constants
const NEW_WALLET_KEYS = 'NEW_WALLET_KEYS';
const NEW_WALLET = 'NEW_WALLET';


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

// Reducer used for state necessary to generating a wallet
export default (state = {wif: null, address:null, passphrase: null, encryptedWif: null}, action) => {
  switch (action.type) {
    case NEW_WALLET_KEYS:
      const newPrivateKey = generatePrivateKey();
      const newWif = getWIFFromPrivateKey(newPrivateKey);
      const encryptedWif = encrypt_wif(newWif, action.passphrase);
      const loadAccount = getAccountsFromWIFKey(newWif);
      return {...state, wif:newWif, address:loadAccount[0].address, passphrase: action.passphrase, encryptedWif: encryptedWif};
    case NEW_WALLET:
      return  {...state, wif: action.wif, address: action.address, passphrase: action.passphrase, encryptedWif: action.encryptedWif};
    default:
      return state;
  }
};
