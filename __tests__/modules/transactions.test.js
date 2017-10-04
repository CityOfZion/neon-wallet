import transactionReducer, { sendEvent, clearTransactionEvent, toggleAsset, CLEAR_TRANSACTION, SEND_TRANSACTION, TOGGLE_ASSET } from '../../app/modules/transactions';

describe('transactions module tests', () => {
  const success = true;
  const message = 'Sending Neo to Yourself...';
  const newAsset = 'Gas';
  const initialState = {
    success: null,
    message: null,
    selectedAsset: 'Neo'
  };

  describe('sendEvent tests', () => {
    const expectedAction = {
      type: SEND_TRANSACTION,
      success,
      message
    };

    test('sendEvent action works', () => {
      expect(sendEvent(success, message)).toEqual(expectedAction);
    });

    test('sendEvent reducer should return the initial state', () => {
      expect(transactionReducer(undefined, {})).toEqual(initialState);
    });

    test('transactions reducer should handle SEND_TRANSACTION', () => {
      const expectedState = {
        ...initialState,
        success,
        message
      };
      expect(transactionReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('clearTransactionEvent tests', () => {
    const expectedAction = {
      type: CLEAR_TRANSACTION
    };

    test('clearTransactionEvent action works', () => {
      expect(clearTransactionEvent()).toEqual(expectedAction);
    });

    test('transactions reducer should handle CLEAR_TRANSACTION', () => {
      expect(transactionReducer(undefined, expectedAction)).toEqual(initialState);
    });
  });

  describe('toggleAsset tests', () => {
    const expectedAction = {
      type: TOGGLE_ASSET
    };

    test('toggleAsset action works', () => {
      expect(toggleAsset()).toEqual(expectedAction);
    });

    test('transactions reducer should handle TOGGLE_ASSET', () => {
      const expectedState = {
        ...initialState,
        selectedAsset: newAsset
      };
      expect(transactionReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });
});
