import { getAccountsFromWIFKey } from 'neon-js';

// Constants
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SHOWKEY = 'SHOWKEY';

// Actions
export function login(wif, showKey){
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

export function showKey(isToggled) {
  return {
    type: SHOWKEY,
    showKey: isToggled,
  }
}

// Reducer that manages account state (account now = private key)
export default (state = {wif: null, address:null, loggedIn: false, showKey: false}, action) => {
  switch (action.type) {
    case LOGIN:
      let loadAccount;
      try {
        loadAccount = getAccountsFromWIFKey(action.wif)[0];
      }
      catch (e){ loadAccount = -1; }
      if(loadAccount === -1 || loadAccount === -2 || loadAccount === undefined){
        return {...state, wif:action.wif,  loggedIn:false};
      }
      return {...state, wif:action.wif, address:loadAccount.address, loggedIn:true};
    case LOGOUT:
      return {'wif': null, address: null, 'loggedIn': false};
    case SHOWKEY:
      return {showKey: action.showKey};
    default:
      return state;
  }
};