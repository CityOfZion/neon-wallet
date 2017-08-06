import * as types from '../actions/types';

// reducer for wallet account balance
export default (state = {Neo: 0, Gas: 0, transactions: [], price: '--'}, action) => {
  switch (action.type) {
      case types.SET_BALANCE:
          return {...state, 'Neo': action.Neo, 'Gas': action.Gas, 'price': action.price };
      case types.RESET_PRICE:
          return {...state, 'price': '--'};
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