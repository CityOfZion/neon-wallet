import walletReducer, { setNEOPrice, setGASPrice, resetPrice, SET_GAS_PRICE, SET_NEO_PRICE, RESET_PRICE } from '../../app/modules/price'

describe('wallet module tests', () => {
  const NEO = 28.10
  const GAS = 18.20

  const initialState = {
    NEO: 0,
    GAS: 0
  }

  describe('setNEOPrice tests', () => {
    const expectedAction = {
      type: SET_NEO_PRICE,
      payload: { NEO }
    }

    test('setNEOPrice action works', () => {
      expect(setNEOPrice(NEO)).toEqual(expectedAction)
    })

    test('setNEOPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_NEO_PRICE', () => {
      const expectedState = {
        ...initialState,
        NEO
      }
      expect(walletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setGASPrice tests', () => {
    const expectedAction = {
      type: SET_GAS_PRICE,
      payload: { GAS }
    }

    test('setGASPrice action works', () => {
      expect(setGASPrice(GAS)).toEqual(expectedAction)
    })

    test('setGASPrice reducer should return the initial state', () => {
      expect(walletReducer(undefined, {})).toEqual(initialState)
    })

    test('wallet reducer should handle SET_GAS_PRICE', () => {
      const expectedState = {
        ...initialState,
        GAS
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
