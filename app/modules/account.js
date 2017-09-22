import { getAccountsFromWIFKey, getPublicKeyEncoded, getAccountsFromPublicKey } from 'neon-js';

import { ledgerNanoS_PublicKey } from './ledgerNanoS'

// Constants
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_DECRYPTING = 'SET_DECRYPTING';
const SET_KEYS = 'SET_KEYS';


// Actions
export function login(wif){
  return {
    type: LOGIN,
    wif: wif
  }
};


export function ledgerNanoS_Login () {
    return {
        type: LOGIN,
        ledgerNanoS: true,
        publicKey: ledgerNanoS_PublicKey
    }
};
export function logout(){
  return {
    type: LOGOUT,
  }
};

export function decrypting(bool){
  return {
    type: SET_DECRYPTING,
    state: bool
  }
};

export function setKeys(keys){
  return {
    type: SET_KEYS,
    keys
  }
};

// Reducer that manages account state (account now = private key)
export default (state = {wif: null, address:null, loggedIn: false, redirectUrl: null, decrypting: false, accountKeys: []}, action) => {
  switch (action.type) {
    case LOGIN:
      let loadAccount;
      try {
    	    if(action.ledgerNanoS) {
    	      loadAccount = getAccountsFromPublicKey(getPublicKeyEncoded(action.publicKey))[0];
    	    } else {
    	      loadAccount = getAccountsFromWIFKey(action.wif)[0];
    	    }
    	    console.log("loadAccount address \"" + loadAccount.address + "\"");
      }
      catch (e){ loadAccount = -1; }
      if(loadAccount === -1 || loadAccount === -2 || loadAccount === undefined){
        return {...state, wif:action.wif,  loggedIn:false};
      }
      return {...state, wif:action.wif, address:loadAccount.address, loggedIn:true, decrypting: false};
    case LOGOUT:
      return {...state, 'wif': null, address: null, 'loggedIn': false, decrypting: false};
    case SET_DECRYPTING:
      return {...state, decrypting: action.state};
    case SET_KEYS:
      return {...state, accountKeys: action.keys};
    default:
      return state;
  }
};
