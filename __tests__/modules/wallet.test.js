import walletReducer, {
  setBalance,
  setTransactionHistory,
  SET_BALANCE,
  SET_TRANSACTION_HISTORY
} from '../../app/modules/wallet'

describe('wallet module tests', () => {
  const NEO = '1'
  const GAS = '1'
  const initialState = {
    loaded: false,
    NEO: '0',
    GAS: '0',
    tokens: {
      QLC: {
        balance: '0',
        scriptHash: '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5',
        symbol: 'QLC'
      },
      DBC: {
        balance: '0',
        scriptHash: 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf',
        symbol: 'DBC'
      },
      RPX: {
        balance: '0',
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
