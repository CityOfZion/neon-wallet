import walletReducer, { setNEOPrice, setGASPrice, setCurrency, resetPrice, SET_CURRENCY, SET_GAS_PRICE, SET_NEO_PRICE, RESET_PRICE } from '../../app/modules/price'

describe('wallet module tests', () => {
  const neo = 28.10
  const gas = 18.20
  const currency = 'eur'

  const initialState = {
    neo: 0,
    gas: 0,
    currency: 'usd'
  }

  describe('setNEOPrice tests', () => {
    const expectedAction = {
      type: SET_NEO_PRICE,
      payload: { neo }
    }

    test('setNEOPrice action works', () => {
      expect(setNEOPrice(neo)).toEqual(expectedAction)
    })

    test('setNEOPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_NEO_PRICE', () => {
      const expectedState = {
        ...initialState,
        neo
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setGASPrice tests', () => {
    const expectedAction = {
      type: SET_GAS_PRICE,
      payload: { gas }
    }

    test('setGASPrice action works', () => {
      expect(setGASPrice(gas)).toEqual(expectedAction)
    })

    test('setGASPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_GAS_PRICE', () => {
      const expectedState = {
        ...initialState,
        gas
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setCurrency tests', () => {
    const expectedAction = {
      type: SET_CURRENCY,
      payload: { currency }
    }

    test('setCurrency action works', () => {
      expect(setCurrency(currency)).toEqual(expectedAction)
    })

    test('setCurrency reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_CURRENCY', () => {
      const expectedState = {
        ...initialState,
        currency
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
})
