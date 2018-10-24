import { wifLoginActions } from '../../app/actions/authActions'

describe('authActions', () => {
  describe('wifLoginActions', () => {
    describe('call', () => {
      const wif = 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU'
      const address = 'ASJQLBnhAs6fSgBv2R7KtRZjC8A9fAmcNW'
      const privateKey =
        '1c7a992d0e68b7b23cb430ba596bd68cecde042410d81e9e95ee19dc1bcd739d'

      test('returns an action object', () => {
        expect(wifLoginActions.call({ wif })).toEqual({
          batch: false,
          type: 'auth/ACTION/CALL',
          meta: {
            id: 'auth',
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
          expect(call.payload.fn({})).toEqual({
            wif,
            address,
            isHardwareLogin: false
          })
        })
      })

      describe('with valid private key', () => {
        test('returns authenticated account data', () => {
          const call = wifLoginActions.call({ wif: privateKey })
          expect(call.payload.fn({})).toEqual({
            wif,
            address,
            isHardwareLogin: false
          })
        })
      })

      describe('with invalid private key', () => {
        test('throws an error', () => {
          const call = wifLoginActions.call({ wif: 'invalid' })
          expect(() => call.payload.fn({})).toThrowError(
            'Invalid private key entered'
          )
        })
      })
    })

    describe('cancel', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.cancel()).toEqual({
          batch: false,
          type: 'auth/ACTION/CANCEL',
          meta: {
            id: 'auth',
            type: 'ACTION/CANCEL'
          }
        })
      })
    })

    describe('reset', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.reset()).toEqual({
          batch: false,
          type: 'auth/ACTION/RESET',
          meta: {
            id: 'auth',
            type: 'ACTION/RESET'
          }
        })
      })
    })
  })
})
