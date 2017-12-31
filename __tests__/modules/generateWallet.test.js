import storage from 'electron-json-storage'

import generateWalletReducer, {
  newWalletAccount,
  resetKey,
  convertOldWalletAccount,
  upgradeUserWalletNEP6,
  recoverWallet,
  NEW_WALLET_ACCOUNT,
  RESET_WALLET_ACCOUNT
} from '../../app/modules/generateWallet'

import { DEFAULT_WALLET } from '../../app/core/constants'

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
    const expectedAction = { payload, type: NEW_WALLET_ACCOUNT }

    test('newWallet action works', () => {
      expect(newWalletAccount(account)).toEqual(expectedAction)
    })

    test('newWallet reducer should return the initial state', () => {
      expect(generateWalletReducer(undefined, {})).toEqual(initialState)
    })

    test('generateWallet reducer should handle NEW_WALLET_ACCOUNT', () => {
      const expectedState = Object.assign({}, initialState, account)
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('resetKey tests', () => {
    const expectedAction = { type: RESET_WALLET_ACCOUNT }

    test('resetKey action works', () => {
      expect(resetKey()).toEqual(expectedAction)
    })

    test('generateWallet reducer should handle RESET_WALLET_ACCOUNT', () => {
      expect(generateWalletReducer(undefined, expectedAction)).toEqual(initialState)
    })
  })

  describe('test upgrade keys file', () => {
    jest.useFakeTimers()

    test('test upgrade empty keys file', (done) => {
      storage.get = jest.fn((key, callback) => {
        callback(null, null)
      })

      storage.set = jest.fn((key, wallet) => {
        if (key === 'userWallet') {
          expect(wallet.version).toEqual('1.0')
          expect(wallet.accounts.length).toEqual(0)
          done()
        }
      })

      upgradeUserWalletNEP6()
      jest.runAllTimers()
    })

    test('test update keys file with accounts in it', (done) => {
      storage.get = jest.fn((key, callback) => {
        if (key === 'keys') {
          const mockKeys = {
            'Key 1': '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu',
            'Key 2': '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCW2'
          }
          callback(null, mockKeys)
        } else {
          callback(null, null)
        }
      })

      storage.set = jest.fn((key, wallet) => {
        if (key === 'userWallet') {
          expect(wallet.version).toEqual('1.0')
          expect(wallet.accounts.length).toEqual(2)
          expect(wallet.accounts[0].label).toEqual('Key 1')
          expect(wallet.accounts[0].key).toEqual('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu')
          expect(wallet.accounts[1].label).toEqual('Key 2')
          expect(wallet.accounts[1].key).toEqual('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCW2')
          done()
        }
      })

      upgradeUserWalletNEP6()
      jest.runAllTimers()
    })
  })

  describe('test recovery functionality', () => {
    test('test recover old keys file', (done) => {
      const mockKeys = {
        'Key 1': '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu',
        'Key 2': '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCW2'
      }

      storage.set = jest.fn((key, wallet) => {
        if (key === 'userWallet') {
          expect(wallet.version).toEqual('1.0')
          expect(wallet.accounts.length).toEqual(2)
          expect(wallet.accounts[0].label).toEqual('Key 1')
          expect(wallet.accounts[0].key).toEqual('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu')
          expect(wallet.accounts[1].label).toEqual('Key 2')
          expect(wallet.accounts[1].key).toEqual('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCW2')
          done()
        }
      })

      recoverWallet(mockKeys)
    })

    test('test recover NEP-6 wallet file', (done) => {
      storage.get = jest.fn((key, callback) => {
        if (key === 'userWallet') {
          const mockNEP6Wallet = {...DEFAULT_WALLET}
          mockNEP6Wallet.accounts = [
            convertOldWalletAccount(
              'Existing Account',
              '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu',
              true
            )
          ]

          callback(null, mockNEP6Wallet)
        } else {
          callback(null, null)
        }
      })

      storage.set = jest.fn((key, wallet) => {
        if (key === 'userWallet') {
          expect(wallet.version).toEqual('1.0')
          expect(wallet.accounts.length).toEqual(2)
          expect(wallet.accounts[0].label).toEqual('Existing Account')
          expect(wallet.accounts[0].key).toEqual('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu')
          expect(wallet.accounts[1].label).toEqual('Recovery Account')
          expect(wallet.accounts[1].key).toEqual('6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCW2')
          done()
        }
      })

      const mockNEP6WalletRecovery = {...DEFAULT_WALLET}
      mockNEP6WalletRecovery.accounts = [
        convertOldWalletAccount(
          'Recovery Account',
          '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCW2',
          false
        )
      ]

      recoverWallet(mockNEP6WalletRecovery)
    })
    test('test recovery does not add duplicate keys', (done) => {
      storage.get = jest.fn((key, callback) => {
        if (key === 'userWallet') {
          const mockNEP6Wallet = {...DEFAULT_WALLET}
          mockNEP6Wallet.accounts = [
            convertOldWalletAccount(
              'Existing Account',
              '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu',
              true
            )
          ]

          callback(null, mockNEP6Wallet)
        } else {
          callback(null, null)
        }
      })

      storage.set = jest.fn((key, wallet) => {
        if (key === 'userWallet') {
          expect(wallet.version).toEqual('1.0')
          expect(wallet.accounts.length).toEqual(1)
          done()
        }
      })

      const mockNEP6WalletRecovery = {...DEFAULT_WALLET}
      mockNEP6WalletRecovery.accounts = [
        convertOldWalletAccount(
          'Recovery Account',
          '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu',
          false
        )
      ]

      recoverWallet(mockNEP6WalletRecovery)
    })
  })
})
