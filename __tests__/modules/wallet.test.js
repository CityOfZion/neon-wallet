import walletReducer, { setBalance, setMarketPrice, resetPrice, setTransactionHistory, SET_MARKET_PRICE, SET_BALANCE, RESET_PRICE, SET_TRANSACTION_HISTORY } from '../../app/modules/wallet';

describe('wallet module tests', () => {
  const Neo = 1;
  const Gas = 1;
  const price = '$10.00';
  const initialState = {
    Neo: 0,
    Gas: 0,
    transactions: [],
    price: '--'
  };

  describe('setBalance tests', () => {
    const expectedAction = {
      type: SET_BALANCE,
      Neo,
      Gas,
      price
    };

    test('setBalance action works', () => {
      expect(setBalance(Neo, Gas, price)).toEqual(expectedAction);
    });

    test('setBalance reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState);
    });

    test('wallet reducer should handle SET_BALANCE', () => {
      const expectedState = {
        ...initialState,
        Neo,
        Gas,
        price
      };
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('setMarketPrice tests', () => {
    const expectedAction = {
      type: SET_MARKET_PRICE,
      price
    };

    test('setMarketPrice action works', () => {
      expect(setMarketPrice(price)).toEqual(expectedAction);
    });

    test('wallet reducer should handle SET_MARKET_PRICE', () => {
      const expectedState = {
        ...initialState,
        price
      };
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('resetPrice tests', () => {
    const expectedAction = {
      type: RESET_PRICE
    };

    test('resetPrice action works', () => {
      expect(resetPrice()).toEqual(expectedAction);
    });

    test('wallet reducer should handle RESET_PRICE', () => {
      expect(walletReducer(undefined, expectedAction)).toEqual(initialState);
    });
  });

  describe('setTransactionHistory tests', () => {
    const transactions = ['random array', 'of any items', 'for this test'];
    const expectedAction = {
      type: SET_TRANSACTION_HISTORY,
      transactions
    };

    test('setTransactionHistory action works', () => {
      expect(setTransactionHistory(transactions)).toEqual(expectedAction);
    });

    test('wallet reducer should handle SET_TRANSACTION_HISTORY', () => {
      const expectedState = {
        ...initialState,
        transactions
      };
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });
});
