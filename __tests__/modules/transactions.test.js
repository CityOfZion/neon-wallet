import transactionReducer, { toggleAsset, TOGGLE_ASSET } from '../../app/modules/transactions'

describe('transactions module tests', () => {
  const newAsset = 'Gas'
  const initialState = {
    selectedAsset: 'Neo',
    isLoadingTransactions: false
  }

  describe('toggleAsset tests', () => {
    const expectedAction = {
      type: TOGGLE_ASSET
    }

    test('toggleAsset action works', () => {
      expect(toggleAsset()).toEqual(expectedAction)
    })

    test('transactions reducer should handle TOGGLE_ASSET', () => {
      const expectedState = {
        ...initialState,
        selectedAsset: newAsset
      }
      expect(transactionReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })
})
