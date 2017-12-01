import walletReducer, {
  setBalance,
  setNEOPrice,
  setGASPrice,
  resetPrices,
  setTransactionHistory,
  SET_BALANCE,
  SET_GAS_PRICE,
  SET_NEO_PRICE,
  RESET_PRICES,
  SET_TRANSACTION_HISTORY
} from '../../app/modules/wallet'

describe('wallet module tests', () => {
  const NEO = 1
  const GAS = 1
  const neoPrice = 28.10
  const gasPrice = 18.20
  const initialState = {
    loaded: false,
    NEO: 0,
    GAS: 0,
    prices: {
      NEO: 0,
      GAS: 0
    },
    tokens: {
      RPX: {
        balance: 0,
        scriptHash: 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9',
        symbol: 'RPX'
      }
    },
    transactions: []
  }

  describe('setBalance tests', () => {
    const expectedAction = {
      type: SET_BALANCE,
      payload: { NEO, GAS }
    }

    test('setBalance action works', () => {
      expect(setBalance(NEO, GAS)).toEqual(expectedAction)
    })

    test('setBalance reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_BALANCE', () => {
      const expectedState = {
        ...initialState,
        NEO,
        GAS
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setNEOPrice tests', () => {
    const expectedAction = {
      type: SET_NEO_PRICE,
      payload: { price: neoPrice }
    }

    test('setNEOPrice action works', () => {
      expect(setNEOPrice(neoPrice)).toEqual(expectedAction)
    })

    test('setNEOPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_NEO_PRICE', () => {
      const expectedState = {
        ...initialState,
        prices: {
          ...initialState.prices,
          NEO: neoPrice
        }
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setGASPrice tests', () => {
    const expectedAction = {
      type: SET_GAS_PRICE,
      payload: { price: gasPrice }
    }

    test('setGASPrice action works', () => {
      expect(setGASPrice(gasPrice)).toEqual(expectedAction)
    })

    test('setGASPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_GAS_PRICE', () => {
      const expectedState = {
        ...initialState,
        prices: {
          ...initialState.prices,
          GAS: gasPrice
        }
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('resetPrices tests', () => {
    const expectedAction = {
      type: RESET_PRICES
    }

    test('resetPrices action works', () => {
      expect(resetPrices()).toEqual(expectedAction)
    })

    test('wallet reducer should handle RESET_PRICES', () => {
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
