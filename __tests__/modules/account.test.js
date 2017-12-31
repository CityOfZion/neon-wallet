import storage from 'electron-json-storage'

import { loginNep2 } from '../../app/modules/account'
import { DEFAULT_WALLET } from '../../app/core/constants'
import { convertOldWalletAccount } from '../../app/modules/generateWallet'

jest.useFakeTimers()

describe('Account module', () => {
  test('login into account with no address adds address to NEP-6 wallet', (done) => {
    storage.get = jest.fn((key, callback) => {
      if (key === 'userWallet') {
        const testWallet = {...DEFAULT_WALLET}
        const testAccount = convertOldWalletAccount(
          'my label',
          '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu',
          false
        )

        testWallet.accounts = [ testAccount ]
        callback(null, testWallet)
      }
    })

    storage.set = jest.fn((key, wallet) => {
      if (key === 'userWallet') {
        expect(wallet.accounts[0].address).toEqual('AM22coFfbe9N6omgL9ucFBLkeaMNg9TEyL')
        done()
      }
    })

    loginNep2('Th!s1$@FakePassphrase', '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu', [])(() => {})
    jest.runAllTimers()
  })
})
