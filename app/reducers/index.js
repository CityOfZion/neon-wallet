import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';


const wallet = (state = {'coins': 0 }, action) => {
    switch (action.type) {
        case types.UPDATE_COINS:
            return {...state, 'coins': action.coins};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    wallet
});

export default rootReducer;
