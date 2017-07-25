import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from '../wallet/index.js';
import * as types from '../actions/types';

const transactionState = (state = {'success': null, selectedAsset: 'NEO'}, action) => {
  switch (action.type) {
      case types.SEND_TRANSACTION:
          return {...state, success:action.success};
      case types.CLEAR_TRANSACTION:
          return {...state, success: null};
      case types.TOGGLE_ASSET:
          let asset;
          if (state.selectedAsset == "NEO"){
            asset = "GAS";
          } else {
            asset = "NEO";
          }
          return {...state, success: null, selectedAsset: asset};
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
            return {...state, wif:newWif, address:loadAccount[0].address};
        default:
            return state;
    }
};

const account = (state = {'wif': null, 'address':null, 'loggedIn': false}, action) => {
    switch (action.type) {
        case types.LOGIN:
            const loadAccount = getAccountsFromWIFKey(action.wif)[0];
            if(loadAccount === -1 || loadAccount === -2){
              return {...state, wif:action.wif,  loggedIn:false};
            }
            return {...state, wif:action.wif, address:loadAccount.address, loggedIn:true};
        case types.LOGOUT:
            return {'wif': null, address: null, 'loggedIn': false};
        default:
            return state;
    }
};

const wallet = (state = {'ANS': 0, 'ANC': 0, 'net': 'TestNet', 'transactions': [], 'price': '--'}, action) => {
    switch (action.type) {
        case types.SET_BALANCE:
            let ansValue, ancValue;
            if (action.ANS !== undefined){
              ansValue = action.ANS;
            } else {
              ansValue = 0;
            }
            if (action.ANC !== undefined){
              ancValue = action.ANC;
            } else {
              ancValue = 0;
            }
            return {...state, 'ANS': ansValue, 'ANC': ancValue, 'price': action.price };
        case types.RESET_PRICE:
            return {...state, 'price': '--'};
        case types.SET_NETWORK:
            return {...state, net:action.net};
        case types.SET_MARKET_PRICE:  //current market price action type
            let currentPrice;
            if (action.price !== undefined){
                currentPrice = action.price;
            } else {
                currentPrice = '--';
            }
            return {...state, price: currentPrice};
        case types.SET_TRANSACTION_HISTORY:
            return {...state, transactions: action.transactions};
        default:
            return state;
    }
};

const dashboard = (state = {sendPane: true, confirmPane: true}, action) => {
  switch (action.type) {
      case types.TOGGLE_SEND_PANE:
          let newState = {};
          newState[action.pane] = !state[action.pane];
          return {...state, ...newState };
      default:
          return state;
  }
};

const rootReducer = combineReducers({
    account,
    generateWallet,
    wallet,
    transactionState,
    dashboard
});

export default rootReducer;
