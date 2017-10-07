// Constants
export const SET_BALANCE = 'SET_BALANCE';
export const SET_MARKET_PRICE = 'SET_MARKET_PRICE';
export const RESET_PRICE = 'RESET_PRICE';
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY';

// Actions
export function setBalance(neo, gas, price){
  return {
    type: SET_BALANCE,
    Neo: neo,
    Gas: gas,
    price: price
  }
}

export function setMarketPrice(price){
  return {
    type: SET_MARKET_PRICE,
    price: price
  }
}

export function resetPrice(){
  return {
    type: RESET_PRICE,
  }
}

export function setTransactionHistory(transactions){
  return {
    type: SET_TRANSACTION_HISTORY,
    transactions
  }
};

// reducer for wallet account balance
export default (state = {Neo: 0, Gas: 0, transactions: [], price: '--'}, action) => {
  switch (action.type) {
      case SET_BALANCE:
      console.log("balance setting...")
          return {...state, 'Neo': action.Neo, 'Gas': action.Gas, 'price': action.price };
      case RESET_PRICE:
          return {...state, 'price': '--'};
      case SET_MARKET_PRICE:  //current market price action type
          let currentPrice;
          if (action.price !== undefined){
              currentPrice = action.price;
          } else {
              currentPrice = '--';
          }
          return {...state, price: currentPrice};
      case SET_TRANSACTION_HISTORY:
          return {...state, transactions: action.transactions};
      default:
          return state;
  }
};
