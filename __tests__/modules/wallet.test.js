import walletReducer, { setBalance, setNeoPrice, setGasPrice, resetPrice, setTransactionHistory, SET_BALANCE, SET_GAS_PRICE, SET_NEO_PRICE, RESET_PRICE, SET_TRANSACTION_HISTORY } from '../../app/modules/wallet'

describe('wallet module tests', () => {
  const Neo = 1
  const Gas = 1
  const neoPrice = 28.10
  const gasPrice = 18.20
  const initialState = {
    Neo: 0,
    Gas: 0,
    neoPrice: 0,
    gasPrice: 0,
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

  describe('setNeoPrice tests', () => {
    const expectedAction = {
      type: SET_NEO_PRICE,
      payload: { neoPrice }
    }

    test('setNeoPrice action works', () => {
      expect(setNeoPrice(neoPrice)).toEqual(expectedAction)
    })

    test('setNeoPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_NEO_PRICE', () => {
      const expectedState = {
        ...initialState,
        neoPrice
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setGasPrice tests', () => {
    const expectedAction = {
      type: SET_GAS_PRICE,
      payload: { gasPrice }
    }

    test('setGASPrice action works', () => {
      expect(setGasPrice(gasPrice)).toEqual(expectedAction)
    })

    test('setGasPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_GAS_PRICE', () => {
      const expectedState = {
        ...initialState,
        gasPrice
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('resetPrice tests', () => {
    const expectedAction = {
      type: RESET_PRICE
    }

    test('resetPrice action works', () => {
      expect(resetPrice()).toEqual(expectedAction)
    })

    test('wallet reducer should handle RESET_PRICE', () => {
      expect(walletReducer(undefined, expectedAction)).toEqual(initialState)
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
