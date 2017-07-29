import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { BLOCKCHAIN_EXPLORERS } from '../utils/constants';
import electronStore from '../utils/electronStore';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from '../wallet/index.js';
import * as types from '../actions/types';

const transactionState = (state = {'success': null, message: null, selectedAsset: 'NEO'}, action) => {
  switch (action.type) {
      case types.SEND_TRANSACTION:
          return {...state, success:action.success, message: action.message};
      case types.CLEAR_TRANSACTION:
          return {...state, success: null, message: null};
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
            let loadAccount;
            try {
              loadAccount = getAccountsFromWIFKey(action.wif)[0];
            }
            catch (e){ loadAccount = -1; }
            if(loadAccount === -1 || loadAccount === -2 || loadAccount === undefined){
              return {...state, wif:action.wif,  loggedIn:false};
            }
            return {...state, wif:action.wif, address:loadAccount.address, loggedIn:true};
        case types.LOGOUT:
            return {'wif': null, address: null, 'loggedIn': false};
        default:
            return state;
    }
};

const wallet = (state = {'ANS': 0, 'ANC': 0, 'net': 'TestNet', 'transactions': [], 'price': '--', claimAmount: 0}, action) => {
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
        case types.SET_CLAIM:
            return {...state, 'claimAmount': action.amount};
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


const SETTINGS_EXPLORER = 'settings.explorer';
if (!electronStore.has(SETTINGS_EXPLORER)) {
  const explorerIDs = Object.keys(BLOCKCHAIN_EXPLORERS);
  const random = Math.max(
    Math.floor(Math.random() * explorerIDs.length),
    // In case Math.random() === 1
    explorerIDs.length - 1,
  );
  electronStore.set(SETTINGS_EXPLORER, explorerIDs[random]);
}
const settingsDefault = {
  explorer: BLOCKCHAIN_EXPLORERS[electronStore.get(SETTINGS_EXPLORER)],
};
const settings = (state = settingsDefault, action) => {
  switch (action.type) {
      case types.SET_BLOCKCHAIN_EXPLORER:
          electronStore.set(SETTINGS_EXPLORER, action.explorer.id);
          return {...state, explorer: action.explorer};
      default:
          return state;
  }
};

const rootReducer = combineReducers({
    account,
    generateWallet,
    wallet,
    transactionState,
    dashboard,
    settings
});

export default rootReducer;
