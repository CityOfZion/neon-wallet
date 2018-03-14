import { wallet } from 'neon-js'

import { wifLoginActions } from '../../app/actions/authActions'

describe('authActions', () => {
  describe('wifLoginActions', () => {
    describe('request', () => {
      const wif = 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU'
      const address = 'ASJQLBnhAs6fSgBv2R7KtRZjC8A9fAmcNW'
      const privateKey = '1c7a992d0e68b7b23cb430ba596bd68cecde042410d81e9e95ee19dc1bcd739d'

      test('returns an action object', () => {
        expect(wifLoginActions.request({ wif })).toEqual({
          batch: false,
          type: 'AUTH/REQ/REQUEST',
          meta: {
            id: 'AUTH',
            type: 'REQ/REQUEST'
          },
          payload: {
            fn: expect.any(Function)
          }
        })
      })

      describe('with valid WIF', () => {
        let wifMock, keyMock, accountMock

        beforeEach(() => {
          wifMock = jest.spyOn(wallet, 'isWIF').mockImplementation((str) => false)
          keyMock = jest.spyOn(wallet, 'isPrivateKey').mockImplementation((str) => true)
          accountMock = jest.spyOn(wallet, 'Account').mockImplementation((str) => ({ WIF: wif, address }))
        })

        afterEach(() => {
          wifMock.mockRestore()
          keyMock.mockRestore()
          accountMock.mockRestore()
        })

        test('returns authenticated account data', () => {
          const request = wifLoginActions.request({ wif })
          expect(request.payload.fn({})).toEqual({ wif, address, isHardwareLogin: false })
        })
      })

      describe('with valid private key', () => {
        let wifMock, keyMock, accountMock

        beforeEach(() => {
          wifMock = jest.spyOn(wallet, 'isWIF').mockImplementation((str) => false)
          keyMock = jest.spyOn(wallet, 'isPrivateKey').mockImplementation((str) => true)
          accountMock = jest.spyOn(wallet, 'Account').mockImplementation((str) => ({ WIF: wif, address }))
        })

        afterEach(() => {
          wifMock.mockRestore()
          keyMock.mockRestore()
          accountMock.mockRestore()
        })

        test('returns authenticated account data', () => {
          const request = wifLoginActions.request({ wif: privateKey })
          expect(request.payload.fn({})).toEqual({ wif, address, isHardwareLogin: false })
        })
      })

      describe('with invalid private key', () => {
        let wifMock, keyMock

        beforeEach(() => {
          wifMock = jest.spyOn(wallet, 'isWIF').mockImplementation((str) => false)
          keyMock = jest.spyOn(wallet, 'isPrivateKey').mockImplementation((str) => false)
        })

        afterEach(() => {
          wifMock.mockRestore()
          keyMock.mockRestore()
        })

        test('throws an error', () => {
          const request = wifLoginActions.request({ wif })
          expect(() => request.payload.fn({})).toThrowError('That is not a valid private key')
        })
      })
    })

    describe('retry', () => {
      const wif = 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU'

      test('returns an action object', () => {
        expect(wifLoginActions.retry({ wif })).toEqual({
          batch: false,
          type: 'AUTH/REQ/RETRY',
          meta: {
            id: 'AUTH',
            type: 'REQ/RETRY'
          },
          payload: {
            fn: expect.any(Function)
          }
        })
      })
    })

    describe('cancel', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.cancel()).toEqual({
          batch: false,
          type: 'AUTH/REQ/CANCEL',
          meta: {
            id: 'AUTH',
            type: 'REQ/CANCEL'
          }
        })
      })
    })

    describe('reset', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.reset()).toEqual({
          batch: false,
          type: 'AUTH/REQ/RESET',
          meta: {
            id: 'AUTH',
            type: 'REQ/RESET'
          }
        })
      })
    })
  })
})
