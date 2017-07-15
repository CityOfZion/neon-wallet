import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from '../wallet/index.js';
import * as types from '../actions/types';

const transactionState = (state = {'success': null}, action) => {
  switch (action.type) {
      case types.SEND_TRANSACTION:
          return {...state, success:action.success};
      case types.CLEAR_TRANSACTION:
          return {...state, success: null};
      default:
          return state;
  }
};

const generateWallet = (state = {'wif': null, 'address':null}, action) => {
    switch (action.type) {
        case types.NEW_WALLET:
            const newPrivateKey = generatePrivateKey();
            const newWif = getWIFFromPrivateKey(newPrivateKey);
            const loadAccount = getAccountsFromWIFKey(newWif);
            console.log(loadAccount);
            return {...state, wif:newWif, address:loadAccount[0].address};
        default:
            return state;
    }
};

const account = (state = {'wif': null, 'address':null, 'loggedIn': false}, action) => {
    switch (action.type) {
        case types.LOGIN:
            const loadAccount = getAccountsFromWIFKey(action.wif)[0];
            console.log(loadAccount);
            if(loadAccount === -1 || loadAccount === -2){
              return {...state, wif:action.wif,  loggedIn:false};
            }
            return {...state, wif:action.wif, address:loadAccount.address, loggedIn:true};
        default:
            return state;
    }
};

const wallet = (state = {'ANS': 0, 'ANC': 0, 'net': 'TestNet' }, action) => {
    switch (action.type) {
        case types.SET_BALANCE:
            let ansValue, ancValue;
            if (action.ANS !== undefined){
              ansValue = action.ANS.balance;
            } else {
              ansValue = 0;
            }
            if (action.ANC !== undefined){
              ancValue = action.ANC.balance;
            } else {
              ancValue = 0;
            }
            return {...state, 'ANS': ansValue, 'ANC': ancValue };
        case types.SET_NETWORK:
            return {...state, net:action.net};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    account,
    generateWallet,
    wallet,
    transactionState,
});

export default rootReducer;
