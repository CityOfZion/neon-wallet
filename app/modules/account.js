import { getAccountsFromWIFKey } from 'neon-js';

// Constants
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Actions
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
export default (state = {wif: null, address:null, loggedIn: false}, action) => {
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
    default:
      return state;
  }
};