import walletReducer, { setBalance, setTransactionHistory, SET_BALANCE, SET_TRANSACTION_HISTORY } from '../../app/modules/wallet'

describe('wallet module tests', () => {
  const Neo = 1
  const Gas = 1
  const initialState = {
    Neo: 0,
    Gas: 0,
    transactions: []
  }

  describe('setBalance tests', () => {
    const expectedAction = {
      type: SET_BALANCE,
      payload: { Neo, Gas }
    }

    test('setBalance action works', () => {
      expect(setBalance(Neo, Gas)).toEqual(expectedAction)
    })

    test('setBalance reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_BALANCE', () => {
      const expectedState = {
        ...initialState,
        Neo,
        Gas
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setTransactionHistory tests', () => {
    const transactions = ['random array', 'of any items', 'for this test']
    const expectedAction = {
      type: SET_TRANSACTION_HISTORY,
      payload: {
        transactions
      }
    }

    test('setTransactionHistory action works', () => {
      expect(setTransactionHistory(transactions)).toEqual(expectedAction)
    })

    test('wallet reducer should handle SET_TRANSACTION_HISTORY', () => {
      const expectedState = {
        ...initialState,
        transactions
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })
})
