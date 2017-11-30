import generateWalletReducer, {
  newWallet,
  resetKey,
  NEW_WALLET,
  RESET_KEY
} from '../../app/modules/generateWallet'

describe('generateWallet module tests', () => {
  // TODO when looking into pulling axios mock adapter into helper file to stay DRY
  // do the same for commonly used test variables like wif and address, etc...
  const wif = 'L4AJ14CNaBWPemRJKC34wyZwbmxg33GETs4Y1F8uK7rRmZ2UHrJn'
  const address = 'AM22coFfbe9N6omgL9ucFBLkeaMNg9TEyL'
  const passphrase = 'Th!s1$@FakePassphrase'
  const encryptedWIF = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu'

  const initialState = {
    wif: null,
    address: null,
    passphrase: null,
    encryptedWIF: null
  }

  const account = {
    wif,
    address,
    passphrase,
    encryptedWIF
  }

  describe('newWallet tests', () => {
    const payload = account
    const expectedAction = Object.assign({}, { payload }, { type: NEW_WALLET })

    test('newWallet action works', () => {
      expect(newWallet(account)).toEqual(expectedAction)
    })

    test('newWallet reducer should return the initial state', () => {
      expect(generateWalletReducer(undefined, {})).toEqual(initialState)
    })

    test('generateWallet reducer should handle NEW_WALLET', () => {
      const expectedState = Object.assign({}, initialState, account)
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('resetKey tests', () => {
    const expectedAction = { type: RESET_KEY }

    test('resetKey action works', () => {
      expect(resetKey()).toEqual(expectedAction)
    })

    test('generateWallet reducer should handle RESET_KEY', () => {
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(initialState)
    })
  })
})
