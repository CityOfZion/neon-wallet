import * as types from '../actions/types';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from '../wallet/index.js';

// reducer used for state necessary to generating a wallet
export default (state = {wif: null, address:null}, action) => {
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