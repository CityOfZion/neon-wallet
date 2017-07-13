import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from '../wallet/index.js';
import * as types from '../actions/types';

const generateWallet = (state = {'wif': null }, action) => {
    switch (action.type) {
        case types.NEW_WALLET:
            const newPrivateKey = generatePrivateKey();
            const newWif = getWIFFromPrivateKey(newPrivateKey);
            return {...state, wif:newWif};
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

const wallet = (state = {'ANS': 0, 'ANC': 0 }, action) => {
    switch (action.type) {
        case types.SET_BALANCE:
            console.log(action);
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
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    account,
    generateWallet,
    wallet
});

export default rootReducer;
