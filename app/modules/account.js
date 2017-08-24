import { getAccountsFromWIFKey } from 'neon-js';
const settings = require('electron-settings');

// Constants
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REMEMBER_LOGIN = 'REMEMBER_LOGIN';
const SETTING_PRIVATE_KEY = 'account.privateKey';

// Actions
export function getStoredPrivateKey() {
  return settings.get(SETTING_PRIVATE_KEY);
}

export function setStoredPrivateKey(value) {
  return settings.set(SETTING_PRIVATE_KEY, value);
}

export function deleteStoredPrivateKey() {
  return settings.delete(SETTING_PRIVATE_KEY);
}

export function setRememberLogin(value){
  return {
    type: REMEMBER_LOGIN,
    value: value
  }
};

export function login(wif){
  return {
    type: LOGIN,
    wif: wif
  }
};

export function logout(){
  return {
    type: LOGOUT,
  }
};

// Reducer that manages account state (account now = private key)
export default (state = {wif: null, address:null, loggedIn: false, rememberLogin: false}, action) => {
  switch (action.type) {
    case REMEMBER_LOGIN:
      return {...state, rememberLogin: action.value};
    case LOGIN:
      let loadAccount;
      try {
        loadAccount = getAccountsFromWIFKey(action.wif)[0];
      }
      catch (e){ loadAccount = -1; }
      if(loadAccount === -1 || loadAccount === -2 || loadAccount === undefined){
        return {...state, wif:action.wif,  loggedIn:false};
      }

      // Store private key for automatic login?
      if (state.rememberLogin)
        setStoredPrivateKey(action.wif);

      return {...state, wif:action.wif, address:loadAccount.address, loggedIn:true};
    case LOGOUT:
      // Delete our stored private key to forget any automatic login
      deleteStoredPrivateKey();

      return {'wif': null, address: null, 'loggedIn': false};
    default:
      return state;
  }
};