import { wifLoginActions } from '../../app/actions/authActions'

describe('authActions', () => {
  describe('wifLoginActions', () => {
    describe('call', () => {
      const wif = 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU'
      const address = 'ASJQLBnhAs6fSgBv2R7KtRZjC8A9fAmcNW'
      const privateKey = '1c7a992d0e68b7b23cb430ba596bd68cecde042410d81e9e95ee19dc1bcd739d'

      test('returns an action object', () => {
        expect(wifLoginActions.call({ wif })).toEqual({
          batch: false,
          type: 'AUTH/ACTION/CALL',
          meta: {
            id: 'AUTH',
            type: 'ACTION/CALL'
          },
          payload: {
            fn: expect.any(Function)
          }
        })
      })

      describe('with valid WIF', () => {
        test('returns authenticated account data', () => {
          const call = wifLoginActions.call({ wif })
          expect(call.payload.fn({})).toEqual({ wif, address, isHardwareLogin: false })
        })
      })

      describe('with valid private key', () => {
        test('returns authenticated account data', () => {
          const call = wifLoginActions.call({ wif: privateKey })
          expect(call.payload.fn({})).toEqual({ wif, address, isHardwareLogin: false })
        })
      })

      describe('with invalid private key', () => {
        test('throws an error', () => {
          const request = wifLoginActions.call({ wif: 'invalid' })
          expect(() => request.payload.fn({})).toThrowError('That is not a valid private key')
        })
      })
    })

    describe('cancel', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.cancel()).toEqual({
          batch: false,
          type: 'AUTH/ACTION/CANCEL',
          meta: {
            id: 'AUTH',
            type: 'ACTION/CANCEL'
          }
        })
      })
    })

    describe('reset', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.reset()).toEqual({
          batch: false,
          type: 'AUTH/ACTION/RESET',
          meta: {
            id: 'AUTH',
            type: 'ACTION/RESET'
          }
        })
      })
    })
  })
})
