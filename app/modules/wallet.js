// Constants
const SET_BALANCE = 'SET_BALANCE';
const SET_MARKET_PRICES = 'SET_MARKET_PRICES';
const RESET_PRICES = 'RESET_PRICES';
const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY';
const SET_CURRENCY = 'SET_CURRENCY';

// Actions
export function setBalance(neo, gas, prices){
  return {
    type: SET_BALANCE,
    Neo: neo,
    Gas: gas,
    prices: prices
  }
}

export function setMarketPrices(prices){
  return {
    type: SET_MARKET_PRICES,
    prices: prices
  }
}

export function resetPrices(){
  return {
    type: RESET_PRICES,
  }
}

export function setTransactionHistory(transactions){
  return {
    type: SET_TRANSACTION_HISTORY,
    transactions
  }
};

export function setCurrency(currencyCode){
  return {
    type: SET_CURRENCY,
    currencyCode
  }
};

// reducer for wallet account balance
export default (state = {Neo: 0, Gas: 0, transactions: [], prices: {Neo: '--', Gas:'--'}, currencyCode: 'usd'}, action) => {
  switch (action.type) {
      case SET_BALANCE:
          return {...state, Neo: action.Neo, Gas: action.Gas, prices: action.prices};
      case RESET_PRICES:
          return {...state, prices: action.prices};
      case SET_MARKET_PRICES:
          return {...state, prices: action.prices};
      case SET_TRANSACTION_HISTORY:
          return {...state, transactions: action.transactions};
      case SET_CURRENCY:
          return {...state, currencyCode: action.currencyCode};
      default:
          return state;
  }
};
