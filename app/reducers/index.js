import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey } from 'neon-js';
import * as types from '../actions/types';
import account from './account'
import generateWallet from './generateWallet'
import transactionState from './transactionState'
import metadata from './metadata'
import wallet from './wallet'
import claimState from './claimState'
import dashboard from './dashboard'

const rootReducer = combineReducers({
    account,
    generateWallet,
    wallet,
    transactionState,
    dashboard,
    metadata,
    claimState
});

export default rootReducer;
